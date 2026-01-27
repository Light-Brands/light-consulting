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

async function searchRepos() {
  console.log(`Searching for repos in org: ${orgName}\n`);

  // Use search API
  const url = `https://api.github.com/search/repositories?q=org:${orgName}&per_page=100`;
  console.log(`URL: ${url}\n`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    console.error(`Error: ${response.status}`);
    const body = await response.text();
    console.error(body);
    return;
  }

  const data = await response.json();
  console.log(`Search returned: ${data.total_count} total repos`);
  console.log(`Incomplete results: ${data.incomplete_results}`);
  console.log(`Items in response: ${data.items?.length}\n`);

  if (data.items) {
    console.log('Repos found via search:');
    const sorted = data.items.sort((a: any, b: any) => a.name.localeCompare(b.name));
    for (const repo of sorted) {
      const flags = [];
      if (repo.private) flags.push('private');
      if (repo.archived) flags.push('archived');
      if (repo.fork) flags.push('fork');
      console.log(`  ${repo.name}${flags.length ? ` (${flags.join(', ')})` : ''}`);
    }
  }

  // Also check the installation/repos endpoint for GitHub Apps
  console.log('\n=== Checking token access ===');
  const installationResponse = await fetch('https://api.github.com/installation/repositories', {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (installationResponse.ok) {
    const installData = await installationResponse.json();
    console.log(`Installation has access to: ${installData.total_count} repos`);
  } else {
    console.log(`Installation endpoint: ${installationResponse.status} (not a GitHub App token)`);
  }
}

searchRepos().catch(console.error);
