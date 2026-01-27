// GitHub Sync Service
// Orchestrates syncing data from GitHub API to Supabase

import { supabaseAdmin } from '@/lib/supabase';
import { GitHubClient, getRateLimitState } from '@/lib/github-api';
import type {
  SyncType,
  GitHubRepositoryInsert,
  GitHubCommitInsert,
  GitHubPullRequestInsert,
  GitHubContributorInsert,
  GitHubDailyStatsInsert,
  GitHubSyncLogInsert,
  GitHubSyncLogUpdate,
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

async function createSyncLog(syncType: SyncType): Promise<string> {
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
// Repository Sync
// ============================================================================

async function syncRepositories(client: GitHubClient): Promise<number> {
  const repos = await client.getOrgRepositories(true);
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

  return syncedCount;
}

// ============================================================================
// Commits Sync
// ============================================================================

async function syncCommits(
  client: GitHubClient,
  repositoryId?: string,
  since?: Date,
  maxPerRepo: number = 500
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

  for (const repo of repos as RepoRow[]) {
    const [owner, repoName] = repo.full_name.split('/');

    try {
      const commits = await client.getCommits(owner, repoName, {
        since: since?.toISOString(),
        maxPages: Math.ceil(maxPerRepo / 100),
      });

      for (const commit of commits.slice(0, maxPerRepo)) {
        // Get commit details for stats if not present
        let additions = 0;
        let deletions = 0;
        let changedFiles = 0;

        if (commit.stats) {
          additions = commit.stats.additions;
          deletions = commit.stats.deletions;
          changedFiles = commit.files?.length || 0;
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
      }
    } catch (e) {
      console.error(`Failed to sync commits for ${repo.full_name}:`, e);
    }
  }

  return totalSynced;
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
    // Aggregate commits by date
    const { data: commits } = await supabaseAdmin
      .from('github_commits')
      .select('committed_at, additions, deletions, author_github_login')
      .eq('repository_id', repo.id);

    if (!commits) continue;

    // Group by date
    const dailyData: Record<string, GitHubDailyStatsInsert> = {};

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
      }

      dailyData[date].commits_count = (dailyData[date].commits_count || 0) + 1;
      dailyData[date].additions = (dailyData[date].additions || 0) + (commit.additions || 0);
      dailyData[date].deletions = (dailyData[date].deletions || 0) + (commit.deletions || 0);
    }

    // Calculate unique contributors per day
    const contributorsByDate: Record<string, Set<string>> = {};
    for (const commit of commits as CommitRow[]) {
      const date = new Date(commit.committed_at).toISOString().split('T')[0];
      if (!contributorsByDate[date]) {
        contributorsByDate[date] = new Set();
      }
      if (commit.author_github_login) {
        contributorsByDate[date].add(commit.author_github_login);
      }
    }

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

    // Upsert daily stats
    for (const stats of Object.values(dailyData)) {
      await supabaseAdmin
        .from('github_daily_stats')
        .upsert(
          { ...stats, synced_at: new Date().toISOString() } as never,
          { onConflict: 'repository_id,stat_date' }
        );
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
  const { syncType, repositoryId, since, maxCommitsPerRepo } = options;

  const syncLogId = await createSyncLog(syncType);

  const result: SyncResult = {
    success: false,
    syncLogId,
    repositoriesSynced: 0,
    commitsSynced: 0,
    prsSynced: 0,
    contributorsSynced: 0,
  };

  try {
    // Always sync repositories first for full sync
    if (syncType === 'full' || syncType === 'repositories') {
      result.repositoriesSynced = await syncRepositories(client);
      await updateSyncLog(syncLogId, { repositories_synced: result.repositoriesSynced });
    }

    // Sync commits
    if (syncType === 'full' || syncType === 'incremental' || syncType === 'commits') {
      result.commitsSynced = await syncCommits(client, repositoryId, since, maxCommitsPerRepo);
      await updateSyncLog(syncLogId, { commits_synced: result.commitsSynced });
    }

    // Sync PRs
    if (syncType === 'full' || syncType === 'incremental' || syncType === 'pull_requests') {
      result.prsSynced = await syncPullRequests(client, repositoryId);
      await updateSyncLog(syncLogId, { prs_synced: result.prsSynced });
    }

    // Sync contributors
    if (syncType === 'full' || syncType === 'incremental' || syncType === 'contributors') {
      result.contributorsSynced = await syncContributors(client, repositoryId);
      await updateSyncLog(syncLogId, { contributors_synced: result.contributorsSynced });
    }

    // Aggregate daily stats
    if (syncType === 'full' || syncType === 'incremental') {
      await aggregateDailyStats(repositoryId);
    }

    result.success = true;
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
