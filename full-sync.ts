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
const orgNames = (process.env.GITHUB_ORG_NAMES || process.env.GITHUB_ORG_NAME || '').split(',').map(s => s.trim()).filter(Boolean);

const supabase = createClient(supabaseUrl, supabaseKey);

// Rate limit tracking
let rateLimitRemaining = 5000;

async function fetchGitHub(url: string): Promise<any> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  const remaining = response.headers.get('x-ratelimit-remaining');
  if (remaining) rateLimitRemaining = parseInt(remaining, 10);

  if (response.status === 202) {
    // GitHub computing stats, wait and retry
    await new Promise(resolve => setTimeout(resolve, 2000));
    return fetchGitHub(url);
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

async function syncRepositoriesForOrg(orgName: string): Promise<Map<string, string>> {
  console.log(`\n=== Syncing ${orgName} ===`);
  const repoIdMap = new Map<string, string>();

  let page = 1;
  let allRepos: any[] = [];

  while (true) {
    const repos = await fetchGitHub(
      `https://api.github.com/orgs/${orgName}/repos?type=all&per_page=100&page=${page}`
    );
    if (repos.length === 0) break;
    allRepos.push(...repos);
    if (repos.length < 100) break;
    page++;
  }

  console.log(`Found ${allRepos.length} repositories`);

  for (const repo of allRepos) {
    // Get languages
    let languages: Record<string, number> = {};
    try {
      languages = await fetchGitHub(
        `https://api.github.com/repos/${repo.full_name}/languages`
      );
    } catch (e) {
      // Ignore language fetch errors
    }

    const totalLines = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

    const { data, error } = await supabase
      .from('github_repositories')
      .upsert(
        {
          github_id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          is_private: repo.private,
          default_branch: repo.default_branch,
          language: repo.language,
          languages_breakdown: languages,
          total_lines_of_code: totalLines,
          stars_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          open_issues_count: repo.open_issues_count,
          created_at_github: repo.created_at,
          pushed_at: repo.pushed_at,
          synced_at: new Date().toISOString(),
        },
        { onConflict: 'github_id' }
      )
      .select('id')
      .single();

    if (data) {
      repoIdMap.set(repo.full_name, data.id);
      const marker = repo.private ? '[PRIVATE]' : '';
      console.log(`  ✓ ${repo.name} ${marker}`);
    } else if (error) {
      console.error(`  ✗ ${repo.name}: ${error.message}`);
    }
  }

  return repoIdMap;
}

async function syncCodeFrequency(repoIdMap: Map<string, string>) {
  console.log('\nSyncing code frequency (weekly line stats)...');

  for (const [fullName, repoId] of repoIdMap) {
    process.stdout.write(`  ${fullName}...`);

    try {
      const codeFrequency = await fetchGitHub(
        `https://api.github.com/repos/${fullName}/stats/code_frequency`
      );

      if (!codeFrequency || codeFrequency.length === 0) {
        console.log(' no data');
        continue;
      }

      let additions = 0;
      let deletions = 0;

      for (const [timestamp, add, del] of codeFrequency) {
        const weekDate = new Date(timestamp * 1000);
        const dateStr = weekDate.toISOString().split('T')[0];

        additions += add;
        deletions += Math.abs(del);

        await supabase
          .from('github_daily_stats')
          .upsert(
            {
              repository_id: repoId,
              stat_date: dateStr,
              additions: add,
              deletions: Math.abs(del),
              synced_at: new Date().toISOString(),
            },
            { onConflict: 'repository_id,stat_date' }
          );
      }

      console.log(` +${additions.toLocaleString()} / -${deletions.toLocaleString()}`);
    } catch (e: any) {
      console.log(` error: ${e.message}`);
    }
  }

  console.log(`  Rate limit remaining: ${rateLimitRemaining}`);
}

async function main() {
  console.log(`Full sync for orgs: ${orgNames.join(', ')}\n`);

  const allRepoIds = new Map<string, string>();

  // Sync each org
  for (const orgName of orgNames) {
    const repoIdMap = await syncRepositoriesForOrg(orgName);
    for (const [k, v] of repoIdMap) {
      allRepoIds.set(k, v);
    }
  }

  // Sync code frequency for all repos
  await syncCodeFrequency(allRepoIds);

  console.log('\n' + '='.repeat(60));
  console.log('Sync complete!');
  console.log(`  Total repositories: ${allRepoIds.size}`);
}

main().catch(console.error);
