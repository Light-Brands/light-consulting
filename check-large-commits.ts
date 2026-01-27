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

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLargeCommits() {
  // Get tracked repos
  const { data: repos } = await supabase
    .from('github_repositories')
    .select('id, name, full_name')
    .eq('is_tracked', true);

  if (!repos) {
    console.log('No repos found');
    return;
  }

  const repoIds = repos.map(r => r.id);

  // Find commits with largest additions
  const { data: largeCommits } = await supabase
    .from('github_commits')
    .select('sha, message, additions, deletions, committed_at, repository_id')
    .in('repository_id', repoIds)
    .order('additions', { ascending: false })
    .limit(20);

  console.log('\n=== TOP 20 COMMITS BY ADDITIONS ===\n');

  for (const commit of largeCommits || []) {
    const repo = repos.find(r => r.id === commit.repository_id);
    const date = new Date(commit.committed_at).toLocaleDateString();
    const msg = commit.message.split('\n')[0].slice(0, 50);
    console.log(`+${commit.additions.toLocaleString().padStart(10)} | ${date.padStart(10)} | ${repo?.name?.padEnd(25)} | ${msg}`);
  }

  // Get commits by time period
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  // Last 6 months
  const { data: recent } = await supabase
    .from('github_commits')
    .select('additions, deletions')
    .in('repository_id', repoIds)
    .gte('committed_at', sixMonthsAgo.toISOString());

  // 6-12 months ago
  const { data: older } = await supabase
    .from('github_commits')
    .select('additions, deletions')
    .in('repository_id', repoIds)
    .gte('committed_at', oneYearAgo.toISOString())
    .lt('committed_at', sixMonthsAgo.toISOString());

  const recentTotal = (recent || []).reduce((sum, c) => sum + (c.additions || 0), 0);
  const olderTotal = (older || []).reduce((sum, c) => sum + (c.additions || 0), 0);

  console.log('\n=== ADDITIONS BY TIME PERIOD ===\n');
  console.log(`Last 6 months:     ${recentTotal.toLocaleString().padStart(15)} lines (${(recent || []).length} commits)`);
  console.log(`6-12 months ago:   ${olderTotal.toLocaleString().padStart(15)} lines (${(older || []).length} commits)`);
  console.log(`Total (1 year):    ${(recentTotal + olderTotal).toLocaleString().padStart(15)} lines`);

  // Check for initial commits (commits with very large additions that might be imports)
  const threshold = 100000; // 100k lines
  const { data: bulkCommits } = await supabase
    .from('github_commits')
    .select('sha, message, additions, committed_at, repository_id')
    .in('repository_id', repoIds)
    .gte('additions', threshold);

  if (bulkCommits && bulkCommits.length > 0) {
    const bulkTotal = bulkCommits.reduce((sum, c) => sum + c.additions, 0);
    console.log(`\n=== BULK COMMITS (>${threshold.toLocaleString()} lines) ===\n`);
    console.log(`Found ${bulkCommits.length} commits totaling ${bulkTotal.toLocaleString()} lines:\n`);

    for (const commit of bulkCommits) {
      const repo = repos.find(r => r.id === commit.repository_id);
      const date = new Date(commit.committed_at).toLocaleDateString();
      const msg = commit.message.split('\n')[0].slice(0, 60);
      console.log(`  +${commit.additions.toLocaleString().padStart(10)} | ${date} | ${repo?.name} | ${msg}`);
    }

    console.log(`\nThese bulk commits account for ${((bulkTotal / (recentTotal + olderTotal)) * 100).toFixed(1)}% of your 1-year total.`);
  }
}

checkLargeCommits().catch(console.error);
