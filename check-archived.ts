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

async function checkArchived() {
  console.log('Token starts with:', githubToken.substring(0, 30) + '...');
  console.log('');

  // Get all repos including archived
  let allRepos: any[] = [];
  let page = 1;

  while (true) {
    // Note: archived repos should be included in type=all
    const url = `https://api.github.com/orgs/${orgName}/repos?type=all&per_page=100&page=${page}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      break;
    }

    const repos = await response.json();
    if (repos.length === 0) break;

    allRepos.push(...repos);
    if (repos.length < 100) break;
    page++;
  }

  console.log(`Total repos found: ${allRepos.length}`);

  // Count by type
  const archived = allRepos.filter(r => r.archived);
  const privateRepos = allRepos.filter(r => r.private);
  const forks = allRepos.filter(r => r.fork);

  console.log(`  Archived: ${archived.length}`);
  console.log(`  Private: ${privateRepos.length}`);
  console.log(`  Forks: ${forks.length}`);

  // List all with details
  console.log('\nAll repos:');
  for (const repo of allRepos.sort((a, b) => a.name.localeCompare(b.name))) {
    const flags = [];
    if (repo.private) flags.push('PRIVATE');
    if (repo.archived) flags.push('ARCHIVED');
    if (repo.fork) flags.push('fork');
    console.log(`  ${repo.name}${flags.length ? ` [${flags.join(', ')}]` : ''}`);
  }

  // Also try to list user repos that might be org-owned
  console.log('\n\n=== Checking user repos in org ===');
  const userReposUrl = `https://api.github.com/user/repos?affiliation=organization_member&per_page=100`;
  const userReposResponse = await fetch(userReposUrl, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (userReposResponse.ok) {
    const userRepos = await userReposResponse.json();
    const orgRepos = userRepos.filter((r: any) => r.owner.login === orgName);
    console.log(`User has access to ${orgRepos.length} repos in ${orgName}`);

    // Find any that aren't in our list
    const currentNames = new Set(allRepos.map(r => r.name));
    const additional = orgRepos.filter((r: any) => !currentNames.has(r.name));
    if (additional.length > 0) {
      console.log('\nAdditional repos found via user/repos:');
      for (const repo of additional) {
        console.log(`  ${repo.name} [${repo.private ? 'PRIVATE' : 'public'}]`);
      }
    }
  }
}

checkArchived().catch(console.error);
