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
const orgName = process.env.GITHUB_ORG_NAME!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchAllReposFromGitHub(): Promise<any[]> {
  const allRepos: any[] = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `https://api.github.com/orgs/${orgName}/repos?type=all&sort=pushed&per_page=100&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      break;
    }

    const repos = await response.json();
    if (repos.length === 0) break;

    allRepos.push(...repos);

    if (repos.length < 100) break;
    page++;
  }

  return allRepos;
}

async function checkRepos() {
  console.log(`Organization: ${orgName}\n`);

  // Fetch from GitHub
  console.log('Fetching repos from GitHub API...');
  const githubRepos = await fetchAllReposFromGitHub();
  console.log(`GitHub API returned: ${githubRepos.length} repositories\n`);

  // List all repos from GitHub
  console.log('All repos from GitHub:');
  for (const repo of githubRepos.sort((a, b) => a.name.localeCompare(b.name))) {
    const flags = [];
    if (repo.private) flags.push('private');
    if (repo.archived) flags.push('archived');
    if (repo.fork) flags.push('fork');
    console.log(`  ${repo.name}${flags.length ? ` (${flags.join(', ')})` : ''}`);
  }

  // Fetch from database
  console.log('\n\nFetching repos from database...');
  const { data: dbRepos, error } = await supabase
    .from('github_repositories')
    .select('name, is_tracked')
    .order('name');

  if (error) {
    console.error('Database error:', error.message);
    return;
  }

  console.log(`Database has: ${dbRepos?.length || 0} repositories\n`);

  // Find repos in GitHub but not in database
  const dbRepoNames = new Set((dbRepos || []).map(r => r.name));
  const githubRepoNames = new Set(githubRepos.map(r => r.name));

  const missingFromDb = githubRepos.filter(r => !dbRepoNames.has(r.name));
  const extraInDb = (dbRepos || []).filter(r => !githubRepoNames.has(r.name));

  if (missingFromDb.length > 0) {
    console.log('Repos in GitHub but NOT in database:');
    for (const repo of missingFromDb) {
      const flags = [];
      if (repo.private) flags.push('private');
      if (repo.archived) flags.push('archived');
      if (repo.fork) flags.push('fork');
      console.log(`  - ${repo.name}${flags.length ? ` (${flags.join(', ')})` : ''}`);
    }
  }

  if (extraInDb.length > 0) {
    console.log('\nRepos in database but NOT in GitHub:');
    for (const repo of extraInDb) {
      console.log(`  - ${repo.name}`);
    }
  }
}

checkRepos().catch(console.error);
