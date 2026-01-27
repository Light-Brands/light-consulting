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

async function checkVibeup() {
  console.log('Checking access to vibeup-org...\n');

  const response = await fetch(
    'https://api.github.com/orgs/vibeup-org/repos?type=all&per_page=100',
    {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    console.log(`Error: ${response.status} ${response.statusText}`);
    const body = await response.text();
    console.log(body);
    console.log('\nYou may need to authorize the token for this org.');
    console.log('Go to: https://github.com/settings/tokens');
    console.log('Click on your token, scroll to "Organization access"');
    console.log('And authorize "vibeup-org"');
    return;
  }

  const repos = await response.json();
  console.log(`Found ${repos.length} repositories in vibeup-org:\n`);

  for (const repo of repos.sort((a: any, b: any) => a.name.localeCompare(b.name))) {
    const flags = [];
    if (repo.private) flags.push('PRIVATE');
    if (repo.archived) flags.push('ARCHIVED');
    if (repo.fork) flags.push('fork');
    console.log(`  ${repo.name}${flags.length ? ` [${flags.join(', ')}]` : ''}`);
  }
}

checkVibeup().catch(console.error);
