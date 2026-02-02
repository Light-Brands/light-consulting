// GitHub Sync Service
// Orchestrates syncing data from GitHub API to Supabase

import { supabaseAdmin } from '@/lib/supabase';
import { GitHubClient, getRateLimitState, hasLegacyOrgConfig } from '@/lib/github-api';
import type {
  SyncType,
  GitHubRepositoryInsert,
  GitHubCommitInsert,
  GitHubPullRequestInsert,
  GitHubContributorInsert,
  GitHubDailyStatsInsert,
  GitHubSyncLogInsert,
  GitHubSyncLogUpdate,
  GitHubOrganizationInsert,
  PRState,
} from '@/types/github-analytics';

// ============================================================================
// Types
// ============================================================================

interface SyncResult {
  success: boolean;
  syncLogId: string;
  repositoriesSynced: number;
  commitsSynced: number;
  prsSynced: number;
  contributorsSynced: number;
  error?: string;
}

interface SyncOptions {
  syncType: SyncType;
  repositoryId?: string;
  since?: Date;
  maxCommitsPerRepo?: number;
  syncLogId?: string;
  skipCommitDetails?: boolean;
}

// Row types for Supabase queries (until typed DB is generated)
interface RepoRow {
  id: string;
  full_name: string;
}

interface CommitRow {
  committed_at: string;
  additions: number | null;
  deletions: number | null;
  author_github_login: string | null;
}

interface PRRow {
  created_at_github: string;
  merged_at: string | null;
}

// ============================================================================
// Sync Log Management
// ============================================================================

export async function createSyncLog(syncType: SyncType): Promise<string> {
  const insert: GitHubSyncLogInsert = {
    sync_type: syncType,
    status: 'running',
    started_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin
    .from('github_sync_log')
    .insert(insert as never)
    .select('id')
    .single();

  if (error) {
    throw new Error(`Failed to create sync log: ${error.message}`);
  }

  return (data as { id: string }).id;
}

async function updateSyncLog(
  id: string,
  update: GitHubSyncLogUpdate
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('github_sync_log')
    .update(update as never)
    .eq('id', id);

  if (error) {
    console.error('Failed to update sync log:', error);
  }
}

async function completeSyncLog(
  id: string,
  result: Partial<SyncResult>,
  error?: string
): Promise<void> {
  const { data: syncLog } = await supabaseAdmin
    .from('github_sync_log')
    .select('started_at')
    .eq('id', id)
    .single();

  const syncLogTyped = syncLog as { started_at: string } | null;
  const startedAt = syncLogTyped?.started_at ? new Date(syncLogTyped.started_at) : new Date();
  const completedAt = new Date();
  const durationSeconds = Math.floor((completedAt.getTime() - startedAt.getTime()) / 1000);

  const rateLimit = getRateLimitState();

  const update: GitHubSyncLogUpdate = {
    status: error ? 'failed' : 'completed',
    repositories_synced: result.repositoriesSynced || 0,
    commits_synced: result.commitsSynced || 0,
    prs_synced: result.prsSynced || 0,
    contributors_synced: result.contributorsSynced || 0,
    rate_limit_remaining: rateLimit.remaining,
    error_message: error || null,
    completed_at: completedAt.toISOString(),
    duration_seconds: durationSeconds,
  };

  await updateSyncLog(id, update);
}

// ============================================================================
// Organization Sync
// ============================================================================

interface OrgRow {
  id: string;
  login: string;
}

export async function syncOrganizations(client: GitHubClient): Promise<number> {
  const orgs = await client.getUserOrganizations();
  let syncedCount = 0;

  for (const org of orgs) {
    const insert: GitHubOrganizationInsert = {
      github_id: org.id,
      login: org.login,
      name: org.name,
      avatar_url: org.avatar_url,
      description: org.description,
    };

    // Upsert organization
    const { error } = await supabaseAdmin
      .from('github_orgs')
      .upsert(
        { ...insert, synced_at: new Date().toISOString() } as never,
        { onConflict: 'github_id' }
      );

    if (error) {
      console.error(`Failed to sync organization ${org.login}:`, error);
    } else {
      syncedCount++;
    }
  }

  return syncedCount;
}

// Get tracked orgs from DB, or fall back to env var
async function getOrgsToSync(): Promise<{ orgId: string | null; orgLogin: string }[]> {
  // Check for tracked orgs in DB
  const { data: trackedOrgs } = await supabaseAdmin
    .from('github_orgs')
    .select('id, login')
    .eq('is_tracked', true);

  if (trackedOrgs && trackedOrgs.length > 0) {
    return (trackedOrgs as OrgRow[]).map(org => ({
      orgId: org.id,
      orgLogin: org.login,
    }));
  }

  // Fall back to legacy env var
  if (hasLegacyOrgConfig()) {
    const orgName = process.env.GITHUB_ORG_NAME!;
    return [{ orgId: null, orgLogin: orgName }];
  }

  return [];
}

// ============================================================================
// Repository Sync
// ============================================================================

async function syncRepositoriesForOrg(
  client: GitHubClient,
  orgId: string | null,
  orgLogin: string
): Promise<number> {
  const repos = await client.getOrgRepositories(true, orgLogin);
  let syncedCount = 0;

  for (const repo of repos) {
    // Get language breakdown
    const [owner, repoName] = repo.full_name.split('/');
    let languages: Record<string, number> = {};
    try {
      languages = await client.getRepositoryLanguages(owner, repoName);
    } catch (e) {
      console.warn(`Failed to get languages for ${repo.full_name}:`, e);
    }

    const totalLines = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

    const insert: GitHubRepositoryInsert = {
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
      org_id: orgId,
    };

    // Upsert repository
    const { error } = await supabaseAdmin
      .from('github_repositories')
      .upsert(
        { ...insert, synced_at: new Date().toISOString() } as never,
        { onConflict: 'github_id' }
      );

    if (error) {
      console.error(`Failed to sync repository ${repo.full_name}:`, error);
    } else {
      syncedCount++;
    }
  }

  // Update org repos_count
  if (orgId) {
    await supabaseAdmin
      .from('github_orgs')
      .update({ repos_count: syncedCount, synced_at: new Date().toISOString() } as never)
      .eq('id', orgId);
  }

  return syncedCount;
}

async function syncRepositories(client: GitHubClient): Promise<number> {
  const orgsToSync = await getOrgsToSync();
  let totalSynced = 0;

  for (const { orgId, orgLogin } of orgsToSync) {
    try {
      const count = await syncRepositoriesForOrg(client, orgId, orgLogin);
      totalSynced += count;
    } catch (e) {
      console.error(`Failed to sync repositories for org ${orgLogin}:`, e);
    }
  }

  return totalSynced;
}

// ============================================================================
// Commits Sync
// ============================================================================

async function syncCommits(
  client: GitHubClient,
  repositoryId?: string,
  since?: Date,
  maxPerRepo: number = 500,
  syncLogId?: string,
  skipCommitDetails: boolean = true
): Promise<number> {
  // Get repositories to sync
  let query = supabaseAdmin.from('github_repositories').select('*').eq('is_tracked', true);
  if (repositoryId) {
    query = query.eq('id', repositoryId);
  }

  const { data: repos, error: repoError } = await query;
  if (repoError || !repos) {
    throw new Error(`Failed to get repositories: ${repoError?.message}`);
  }

  let totalSynced = 0;
  const repoList = repos as RepoRow[];
  const totalRepos = repoList.length;

  for (let i = 0; i < repoList.length; i++) {
    const repo = repoList[i];
    const [owner, repoName] = repo.full_name.split('/');

    // Update progress
    if (syncLogId) {
      await updateSyncLog(syncLogId, {
        progress_message: `Syncing commits from ${repo.full_name}`,
        current_repo: repo.full_name,
        current_repo_index: i + 1,
        total_repos: totalRepos,
        commits_synced: totalSynced,
      });
    }

    try {
      const commits = await client.getCommits(owner, repoName, {
        since: since?.toISOString(),
        maxPages: Math.ceil(maxPerRepo / 100),
      });

      const commitsToSync = commits.slice(0, maxPerRepo);

      for (let j = 0; j < commitsToSync.length; j++) {
        const commit = commitsToSync[j];

        // Fetch commit details to get line stats (list commits API doesn't include stats)
        // When skipCommitDetails is true, we rely on code frequency for line stats instead
        let additions = 0;
        let deletions = 0;
        let changedFiles = 0;

        if (!skipCommitDetails) {
          try {
            const details = await client.getCommitDetails(owner, repoName, commit.sha);
            if (details.stats) {
              additions = details.stats.additions || 0;
              deletions = details.stats.deletions || 0;
              changedFiles = details.files?.length || 0;
            }
          } catch (e) {
            // If we can't get details, continue with zeros
            console.warn(`Could not fetch details for commit ${commit.sha.slice(0, 7)}`);
          }
        }

        const insert: GitHubCommitInsert = {
          repository_id: repo.id,
          sha: commit.sha,
          message: commit.commit.message,
          author_name: commit.commit.author.name,
          author_email: commit.commit.author.email,
          author_github_login: commit.author?.login || null,
          committed_at: commit.commit.author.date,
          additions,
          deletions,
          changed_files: changedFiles,
        };

        const { error } = await supabaseAdmin
          .from('github_commits')
          .upsert(insert as never, { onConflict: 'repository_id,sha' });

        if (!error) {
          totalSynced++;
        }

        // Update progress periodically
        if (syncLogId && j % 10 === 0) {
          await updateSyncLog(syncLogId, {
            progress_message: `Syncing commits from ${repo.full_name} (${j + 1}/${commitsToSync.length})`,
            commits_synced: totalSynced,
          });
        }
      }
    } catch (e) {
      console.error(`Failed to sync commits for ${repo.full_name}:`, e);
    }
  }

  return totalSynced;
}

// ============================================================================
// Code Frequency Sync (for accurate line stats)
// ============================================================================

async function syncCodeFrequency(
  client: GitHubClient,
  repositoryId?: string
): Promise<void> {
  let query = supabaseAdmin.from('github_repositories').select('*').eq('is_tracked', true);
  if (repositoryId) {
    query = query.eq('id', repositoryId);
  }

  const { data: repos, error: repoError } = await query;
  if (repoError || !repos) {
    throw new Error(`Failed to get repositories: ${repoError?.message}`);
  }

  for (const repo of repos as RepoRow[]) {
    const [owner, repoName] = repo.full_name.split('/');

    try {
      // Get code frequency (weekly additions/deletions)
      const codeFrequency = await client.getCodeFrequency(owner, repoName);

      if (!codeFrequency || codeFrequency.length === 0) {
        continue;
      }

      // Process each week's data into daily stats
      for (const [timestamp, additions, deletions] of codeFrequency) {
        const weekDate = new Date(timestamp * 1000);
        const dateStr = weekDate.toISOString().split('T')[0];

        // Upsert into daily stats with the weekly data
        // We store at week granularity since that's what GitHub provides
        const { error } = await supabaseAdmin
          .from('github_daily_stats')
          .upsert(
            {
              repository_id: repo.id,
              stat_date: dateStr,
              additions: additions,
              deletions: Math.abs(deletions), // GitHub returns deletions as negative
              synced_at: new Date().toISOString(),
            } as never,
            { onConflict: 'repository_id,stat_date' }
          );

        if (error) {
          console.error(`Failed to upsert daily stats for ${repo.full_name}:`, error);
        }
      }
    } catch (e) {
      console.error(`Failed to sync code frequency for ${repo.full_name}:`, e);
    }
  }
}

// ============================================================================
// Pull Requests Sync
// ============================================================================

async function syncPullRequests(
  client: GitHubClient,
  repositoryId?: string
): Promise<number> {
  let query = supabaseAdmin.from('github_repositories').select('*').eq('is_tracked', true);
  if (repositoryId) {
    query = query.eq('id', repositoryId);
  }

  const { data: repos, error: repoError } = await query;
  if (repoError || !repos) {
    throw new Error(`Failed to get repositories: ${repoError?.message}`);
  }

  let totalSynced = 0;

  for (const repo of repos as RepoRow[]) {
    const [owner, repoName] = repo.full_name.split('/');

    try {
      const prs = await client.getPullRequests(owner, repoName, 'all', 5);

      for (const pr of prs) {
        // Determine state
        let state: PRState = 'open';
        if (pr.merged_at) {
          state = 'merged';
        } else if (pr.state === 'closed') {
          state = 'closed';
        }

        const insert: GitHubPullRequestInsert = {
          repository_id: repo.id,
          github_id: pr.id,
          number: pr.number,
          title: pr.title,
          state,
          author_github_login: pr.user.login,
          created_at_github: pr.created_at,
          merged_at: pr.merged_at,
          closed_at: pr.closed_at,
          additions: pr.additions || 0,
          deletions: pr.deletions || 0,
          changed_files: pr.changed_files || 0,
          comments_count: pr.comments || 0,
          commits_count: pr.commits || 0,
        };

        const { error } = await supabaseAdmin
          .from('github_pull_requests')
          .upsert(insert as never, { onConflict: 'repository_id,number' });

        if (!error) {
          totalSynced++;
        }
      }
    } catch (e) {
      console.error(`Failed to sync PRs for ${repo.full_name}:`, e);
    }
  }

  return totalSynced;
}

// ============================================================================
// Contributors Sync
// ============================================================================

async function syncContributors(
  client: GitHubClient,
  repositoryId?: string
): Promise<number> {
  let query = supabaseAdmin.from('github_repositories').select('*').eq('is_tracked', true);
  if (repositoryId) {
    query = query.eq('id', repositoryId);
  }

  const { data: repos, error: repoError } = await query;
  if (repoError || !repos) {
    throw new Error(`Failed to get repositories: ${repoError?.message}`);
  }

  let totalSynced = 0;

  for (const repo of repos as RepoRow[]) {
    const [owner, repoName] = repo.full_name.split('/');

    try {
      const stats = await client.getContributorStats(owner, repoName);

      for (const contributor of stats) {
        // Calculate totals from weekly data
        let totalAdditions = 0;
        let totalDeletions = 0;
        let firstCommitAt: Date | null = null;
        let lastCommitAt: Date | null = null;

        for (const week of contributor.weeks) {
          totalAdditions += week.a;
          totalDeletions += week.d;

          if (week.c > 0) {
            const weekDate = new Date(week.w * 1000);
            if (!firstCommitAt || weekDate < firstCommitAt) {
              firstCommitAt = weekDate;
            }
            if (!lastCommitAt || weekDate > lastCommitAt) {
              lastCommitAt = weekDate;
            }
          }
        }

        const insert: GitHubContributorInsert = {
          repository_id: repo.id,
          github_login: contributor.author.login,
          github_id: contributor.author.id,
          avatar_url: contributor.author.avatar_url,
          total_commits: contributor.total,
          total_additions: totalAdditions,
          total_deletions: totalDeletions,
          first_commit_at: firstCommitAt?.toISOString() || null,
          last_commit_at: lastCommitAt?.toISOString() || null,
        };

        const { error } = await supabaseAdmin
          .from('github_contributors')
          .upsert(
            { ...insert, synced_at: new Date().toISOString() } as never,
            { onConflict: 'repository_id,github_login' }
          );

        if (!error) {
          totalSynced++;
        }
      }
    } catch (e) {
      console.error(`Failed to sync contributors for ${repo.full_name}:`, e);
    }
  }

  return totalSynced;
}

// ============================================================================
// Daily Stats Aggregation
// ============================================================================

async function aggregateDailyStats(repositoryId?: string): Promise<void> {
  // Get repositories to aggregate
  let query = supabaseAdmin.from('github_repositories').select('id').eq('is_tracked', true);
  if (repositoryId) {
    query = query.eq('id', repositoryId);
  }

  const { data: repos } = await query;
  if (!repos) return;

  for (const repo of repos as { id: string }[]) {
    // Aggregate commits by date - always use commit-level data for daily granularity
    const { data: commits } = await supabaseAdmin
      .from('github_commits')
      .select('committed_at, additions, deletions, author_github_login')
      .eq('repository_id', repo.id);

    if (!commits || commits.length === 0) continue;

    // Group by date
    const dailyData: Record<string, GitHubDailyStatsInsert> = {};
    const contributorsByDate: Record<string, Set<string>> = {};

    for (const commit of commits as CommitRow[]) {
      const date = new Date(commit.committed_at).toISOString().split('T')[0];

      if (!dailyData[date]) {
        dailyData[date] = {
          repository_id: repo.id,
          stat_date: date,
          commits_count: 0,
          additions: 0,
          deletions: 0,
          prs_opened: 0,
          prs_merged: 0,
          unique_contributors: 0,
        };
        contributorsByDate[date] = new Set();
      }

      dailyData[date].commits_count = (dailyData[date].commits_count || 0) + 1;
      dailyData[date].additions = (dailyData[date].additions || 0) + (commit.additions || 0);
      dailyData[date].deletions = (dailyData[date].deletions || 0) + (commit.deletions || 0);

      if (commit.author_github_login) {
        contributorsByDate[date].add(commit.author_github_login);
      }
    }

    // Set unique contributors count
    for (const [date, contributors] of Object.entries(contributorsByDate)) {
      if (dailyData[date]) {
        dailyData[date].unique_contributors = contributors.size;
      }
    }

    // Get PR stats by date
    const { data: prs } = await supabaseAdmin
      .from('github_pull_requests')
      .select('created_at_github, merged_at')
      .eq('repository_id', repo.id);

    if (prs) {
      for (const pr of prs as PRRow[]) {
        const openedDate = new Date(pr.created_at_github).toISOString().split('T')[0];
        if (dailyData[openedDate]) {
          dailyData[openedDate].prs_opened = (dailyData[openedDate].prs_opened || 0) + 1;
        }

        if (pr.merged_at) {
          const mergedDate = new Date(pr.merged_at).toISOString().split('T')[0];
          if (dailyData[mergedDate]) {
            dailyData[mergedDate].prs_merged = (dailyData[mergedDate].prs_merged || 0) + 1;
          }
        }
      }
    }

    // Upsert daily stats - preserve existing code frequency data when commit details were skipped
    for (const stats of Object.values(dailyData)) {
      const hasCommitLineStats = (stats.additions || 0) > 0 || (stats.deletions || 0) > 0;

      if (hasCommitLineStats) {
        // Commit-level data available, do a full upsert
        await supabaseAdmin
          .from('github_daily_stats')
          .upsert(
            { ...stats, synced_at: new Date().toISOString() } as never,
            { onConflict: 'repository_id,stat_date' }
          );
      } else {
        // No commit-level line stats (details were skipped) - upsert but preserve existing additions/deletions
        // First check if row exists with code frequency data
        const { data: existing } = await supabaseAdmin
          .from('github_daily_stats')
          .select('additions, deletions')
          .eq('repository_id', stats.repository_id)
          .eq('stat_date', stats.stat_date)
          .single();

        const existingRow = existing as { additions: number; deletions: number } | null;
        const preservedAdditions = existingRow?.additions || 0;
        const preservedDeletions = existingRow?.deletions || 0;

        await supabaseAdmin
          .from('github_daily_stats')
          .upsert(
            {
              ...stats,
              additions: preservedAdditions,
              deletions: preservedDeletions,
              synced_at: new Date().toISOString(),
            } as never,
            { onConflict: 'repository_id,stat_date' }
          );
      }
    }
  }
}

// ============================================================================
// Main Sync Function
// ============================================================================

export async function runSync(
  client: GitHubClient,
  options: SyncOptions
): Promise<SyncResult> {
  const { syncType, repositoryId, since, maxCommitsPerRepo, skipCommitDetails = true } = options;

  const syncLogId = options.syncLogId || await createSyncLog(syncType);

  const result: SyncResult = {
    success: false,
    syncLogId,
    repositoriesSynced: 0,
    commitsSynced: 0,
    prsSynced: 0,
    contributorsSynced: 0,
  };

  try {
    // Always sync repositories for full/incremental syncs to pick up new repos
    if (syncType === 'full' || syncType === 'incremental' || syncType === 'repositories') {
      await updateSyncLog(syncLogId, { progress_message: 'Discovering repositories...' });
      result.repositoriesSynced = await syncRepositories(client);
      await updateSyncLog(syncLogId, {
        repositories_synced: result.repositoriesSynced,
        progress_message: `Found ${result.repositoriesSynced} repositories`,
      });
    }

    // Sync commits
    if (syncType === 'full' || syncType === 'incremental' || syncType === 'commits') {
      await updateSyncLog(syncLogId, { progress_message: 'Starting commit sync...' });
      result.commitsSynced = await syncCommits(client, repositoryId, since, maxCommitsPerRepo, syncLogId, skipCommitDetails);
      await updateSyncLog(syncLogId, {
        commits_synced: result.commitsSynced,
        progress_message: `Synced ${result.commitsSynced} commits`,
      });
    }

    // Sync PRs
    if (syncType === 'full' || syncType === 'incremental' || syncType === 'pull_requests') {
      await updateSyncLog(syncLogId, { progress_message: 'Syncing pull requests...' });
      result.prsSynced = await syncPullRequests(client, repositoryId);
      await updateSyncLog(syncLogId, {
        prs_synced: result.prsSynced,
        progress_message: `Synced ${result.prsSynced} pull requests`,
      });
    }

    // Sync contributors
    if (syncType === 'full' || syncType === 'incremental' || syncType === 'contributors') {
      await updateSyncLog(syncLogId, { progress_message: 'Syncing contributors...' });
      result.contributorsSynced = await syncContributors(client, repositoryId);
      await updateSyncLog(syncLogId, {
        contributors_synced: result.contributorsSynced,
        progress_message: `Synced ${result.contributorsSynced} contributors`,
      });
    }

    // Sync code frequency for accurate line stats (1 API call per repo)
    if (syncType === 'full' || syncType === 'incremental') {
      await updateSyncLog(syncLogId, { progress_message: 'Syncing code frequency stats...' });
      await syncCodeFrequency(client, repositoryId);
    }

    // Aggregate daily stats
    if (syncType === 'full' || syncType === 'incremental') {
      await updateSyncLog(syncLogId, { progress_message: 'Aggregating daily statistics...' });
      await aggregateDailyStats(repositoryId);
    }

    result.success = true;
    await updateSyncLog(syncLogId, { progress_message: 'Sync complete!' });
    await completeSyncLog(syncLogId, result);

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    result.error = errorMessage;
    await completeSyncLog(syncLogId, result, errorMessage);
    return result;
  }
}

// ============================================================================
// Get Latest Sync Status
// ============================================================================

export async function getLatestSyncStatus(): Promise<{
  lastSync: { completed_at: string; status: string; duration_seconds: number } | null;
  isRunning: boolean;
}> {
  // First, auto-clear any stuck syncs (running for more than 10 minutes)
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  await supabaseAdmin
    .from('github_sync_log')
    .update({
      status: 'failed',
      error_message: 'Sync timed out or was interrupted',
      completed_at: new Date().toISOString(),
    } as never)
    .eq('status', 'running')
    .lt('started_at', tenMinutesAgo);

  // Check for running sync
  const { data: running } = await supabaseAdmin
    .from('github_sync_log')
    .select('id')
    .eq('status', 'running')
    .limit(1)
    .single();

  // Get last completed sync
  const { data: lastSync } = await supabaseAdmin
    .from('github_sync_log')
    .select('completed_at, status, duration_seconds')
    .in('status', ['completed', 'failed'])
    .order('completed_at', { ascending: false })
    .limit(1)
    .single();

  type SyncLogRow = { completed_at: string; status: string; duration_seconds: number };
  return {
    lastSync: lastSync ? {
      completed_at: (lastSync as SyncLogRow).completed_at,
      status: (lastSync as SyncLogRow).status,
      duration_seconds: (lastSync as SyncLogRow).duration_seconds,
    } : null,
    isRunning: !!running,
  };
}
