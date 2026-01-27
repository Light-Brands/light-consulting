import * as fs from 'fs';

// Load env manually
const envFile = fs.readFileSync('.env.local', 'utf8');
for (const line of envFile.split('\n')) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    process.env[match[1]] = match[2];
  }
}

const githubToken = process.env.GITHUB_ACCESS_TOKEN!;
const orgName = process.env.GITHUB_ORG_NAME!;

async function fetchRepos(type: string): Promise<any[]> {
  const allRepos: any[] = [];
  let page = 1;

  while (true) {
    const url = `https://api.github.com/orgs/${orgName}/repos?type=${type}&per_page=100&page=${page}`;
    console.log(`  Fetching: ${url}`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const remaining = response.headers.get('x-ratelimit-remaining');
    console.log(`  Rate limit remaining: ${remaining}`);

    if (!response.ok) {
      console.error(`  Error: ${response.status} ${response.statusText}`);
      const body = await response.text();
      console.error(`  Body: ${body}`);
      break;
    }

    const repos = await response.json();
    console.log(`  Got ${repos.length} repos on page ${page}`);

    if (repos.length === 0) break;
    allRepos.push(...repos);
    if (repos.length < 100) break;
    page++;
  }

  return allRepos;
}

async function checkAllRepos() {
  console.log(`Organization: ${orgName}\n`);
  console.log('Token scopes check...');

  // Check token
  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const scopes = userResponse.headers.get('x-oauth-scopes');
  console.log(`Token scopes: ${scopes}\n`);

  // Try different type filters
  console.log('=== Trying type=all ===');
  const allRepos = await fetchRepos('all');
  console.log(`Total with type=all: ${allRepos.length}\n`);

  console.log('=== Trying type=public ===');
  const publicRepos = await fetchRepos('public');
  console.log(`Total with type=public: ${publicRepos.length}\n`);

  console.log('=== Trying type=private ===');
  const privateRepos = await fetchRepos('private');
  console.log(`Total with type=private: ${privateRepos.length}\n`);

  console.log('=== Trying type=forks ===');
  const forkRepos = await fetchRepos('forks');
  console.log(`Total with type=forks: ${forkRepos.length}\n`);

  console.log('=== Trying type=sources ===');
  const sourceRepos = await fetchRepos('sources');
  console.log(`Total with type=sources: ${sourceRepos.length}\n`);

  // Combine all unique repos
  const allUniqueRepos = new Map<string, any>();
  for (const repo of [...allRepos, ...publicRepos, ...privateRepos, ...forkRepos, ...sourceRepos]) {
    allUniqueRepos.set(repo.name, repo);
  }

  console.log('='.repeat(60));
  console.log(`Total unique repos found: ${allUniqueRepos.size}`);
  console.log('\nAll repos:');

  const sortedRepos = Array.from(allUniqueRepos.values()).sort((a, b) => a.name.localeCompare(b.name));
  for (const repo of sortedRepos) {
    const flags = [];
    if (repo.private) flags.push('private');
    if (repo.archived) flags.push('archived');
    if (repo.fork) flags.push('fork');
    console.log(`  ${repo.name}${flags.length ? ` (${flags.join(', ')})` : ''}`);
  }

  // Check org membership
  console.log('\n=== Checking org membership ===');
  const memberResponse = await fetch(`https://api.github.com/orgs/${orgName}/members`, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (memberResponse.ok) {
    const members = await memberResponse.json();
    console.log(`Org members visible: ${members.length}`);
  } else {
    console.log(`Cannot list members: ${memberResponse.status}`);
  }
}

checkAllRepos().catch(console.error);
