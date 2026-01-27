import * as fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Load env manually
const envFile = fs.readFileSync('.env.local', 'utf8');
for (const line of envFile.split('\n')) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    process.env[match[1]] = match[2];
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const githubToken = process.env.GITHUB_ACCESS_TOKEN!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Rate limit tracking
let rateLimitRemaining = 5000;
let rateLimitReset = Date.now() + 3600000;

async function fetchCommitDetails(owner: string, repo: string, sha: string): Promise<{ additions: number; deletions: number } | null> {
  // Check rate limit
  if (rateLimitRemaining < 100) {
    const waitMs = Math.max(0, rateLimitReset - Date.now() + 1000);
    if (waitMs > 0) {
      console.log(`  Rate limit low (${rateLimitRemaining}), waiting ${Math.ceil(waitMs / 1000)}s...`);
      await new Promise(resolve => setTimeout(resolve, waitMs));
    }
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`,
    {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  // Update rate limit
  const remaining = response.headers.get('x-ratelimit-remaining');
  const reset = response.headers.get('x-ratelimit-reset');
  if (remaining) rateLimitRemaining = parseInt(remaining, 10);
  if (reset) rateLimitReset = parseInt(reset, 10) * 1000;

  if (!response.ok) {
    console.log(`  Failed to get commit ${sha.slice(0, 7)}: ${response.status}`);
    return null;
  }

  const data = await response.json();
  return {
    additions: data.stats?.additions || 0,
    deletions: data.stats?.deletions || 0,
  };
}

async function backfillCommitStats() {
  console.log('Fetching tracked repositories...');
  const { data: repos, error: repoError } = await supabase
    .from('github_repositories')
    .select('id, name, full_name')
    .eq('is_tracked', true);

  if (repoError || !repos) {
    console.error('Failed to get repos:', repoError);
    return;
  }

  console.log(`Found ${repos.length} tracked repositories\n`);

  let totalUpdated = 0;
  let totalAdditions = 0;
  let totalDeletions = 0;

  for (const repo of repos) {
    console.log(`\nProcessing ${repo.name}...`);
    const [owner, repoName] = repo.full_name.split('/');

    // Get commits without stats (additions = 0 AND deletions = 0)
    const { data: commits, error: commitError } = await supabase
      .from('github_commits')
      .select('id, sha, additions, deletions')
      .eq('repository_id', repo.id)
      .eq('additions', 0)
      .eq('deletions', 0);

    if (commitError) {
      console.error(`  Error fetching commits:`, commitError.message);
      continue;
    }

    if (!commits || commits.length === 0) {
      console.log(`  No commits need updating`);
      continue;
    }

    console.log(`  Found ${commits.length} commits to update`);
    let repoUpdated = 0;
    let repoAdditions = 0;
    let repoDeletions = 0;

    for (const commit of commits) {
      const stats = await fetchCommitDetails(owner, repoName, commit.sha);

      if (stats && (stats.additions > 0 || stats.deletions > 0)) {
        const { error: updateError } = await supabase
          .from('github_commits')
          .update({
            additions: stats.additions,
            deletions: stats.deletions,
          })
          .eq('id', commit.id);

        if (!updateError) {
          repoUpdated++;
          repoAdditions += stats.additions;
          repoDeletions += stats.deletions;
        }
      }

      // Small delay to be nice to the API
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    console.log(`  Updated ${repoUpdated} commits: +${repoAdditions.toLocaleString()} / -${repoDeletions.toLocaleString()}`);
    console.log(`  Rate limit remaining: ${rateLimitRemaining}`);

    totalUpdated += repoUpdated;
    totalAdditions += repoAdditions;
    totalDeletions += repoDeletions;
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Total updated: ${totalUpdated} commits`);
  console.log(`Total lines: +${totalAdditions.toLocaleString()} / -${totalDeletions.toLocaleString()}`);

  // Now re-aggregate daily stats
  console.log('\nRe-aggregating daily stats...');
  await aggregateDailyStats();
  console.log('Done!');
}

async function aggregateDailyStats() {
  const { data: repos } = await supabase
    .from('github_repositories')
    .select('id, name')
    .eq('is_tracked', true);

  if (!repos) return;

  for (const repo of repos) {
    console.log(`  Aggregating daily stats for ${repo.name}...`);

    // Get all commits for this repo
    const { data: commits } = await supabase
      .from('github_commits')
      .select('committed_at, additions, deletions, author_github_login')
      .eq('repository_id', repo.id);

    if (!commits || commits.length === 0) continue;

    // Group by date
    const dailyData: Record<string, {
      commits_count: number;
      additions: number;
      deletions: number;
      contributors: Set<string>;
    }> = {};

    for (const commit of commits) {
      const date = new Date(commit.committed_at).toISOString().split('T')[0];

      if (!dailyData[date]) {
        dailyData[date] = {
          commits_count: 0,
          additions: 0,
          deletions: 0,
          contributors: new Set(),
        };
      }

      dailyData[date].commits_count++;
      dailyData[date].additions += commit.additions || 0;
      dailyData[date].deletions += commit.deletions || 0;
      if (commit.author_github_login) {
        dailyData[date].contributors.add(commit.author_github_login);
      }
    }

    // Delete old daily stats for this repo to remove stale weekly data
    await supabase
      .from('github_daily_stats')
      .delete()
      .eq('repository_id', repo.id);

    // Insert fresh daily stats
    for (const [date, data] of Object.entries(dailyData)) {
      await supabase
        .from('github_daily_stats')
        .upsert(
          {
            repository_id: repo.id,
            stat_date: date,
            commits_count: data.commits_count,
            additions: data.additions,
            deletions: data.deletions,
            unique_contributors: data.contributors.size,
            synced_at: new Date().toISOString(),
          },
          { onConflict: 'repository_id,stat_date' }
        );
    }

    console.log(`    Created ${Object.keys(dailyData).length} daily records`);
  }
}

backfillCommitStats().catch(console.error);
