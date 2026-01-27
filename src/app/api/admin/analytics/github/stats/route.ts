/**
 * GitHub Stats API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github/stats - Get aggregated statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { GitHubSummaryStats } from '@/types/github-analytics';
import { getDateRangeFromTimeRange, type TimeRange } from '@/types/github-analytics';

/**
 * GET /api/admin/analytics/github/stats
 * Get aggregated statistics for dashboard
 */
export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get('time_range') || '30d') as TimeRange;
    const repositoryId = searchParams.get('repository_id');

    const { start: startDate, end: endDate } = getDateRangeFromTimeRange(timeRange);

    // Build base query conditions
    const trackedReposQuery = supabaseAdmin
      .from('github_repositories')
      .select('id')
      .eq('is_tracked', true);

    const { data: trackedRepos } = await trackedReposQuery;
    const trackedRepoIds = (trackedRepos as { id: string }[] | null)?.map(r => r.id) || [];

    // If specific repository, check if it's tracked
    if (repositoryId && !trackedRepoIds.includes(repositoryId)) {
      return NextResponse.json({
        data: null,
        error: 'Repository not found or not tracked',
      }, { status: 404 });
    }

    const repoIdsToQuery = repositoryId ? [repositoryId] : trackedRepoIds;

    if (repoIdsToQuery.length === 0) {
      // No repos to query
      const emptyStats: GitHubSummaryStats = {
        total_commits: 0,
        total_additions: 0,
        total_deletions: 0,
        open_prs: 0,
        merged_prs: 0,
        total_repositories: 0,
        tracked_repositories: 0,
        total_contributors: 0,
        last_sync_at: null,
        period_start: startDate?.toISOString() || '',
        period_end: endDate.toISOString(),
      };
      return NextResponse.json({ data: emptyStats, error: null });
    }

    // Get commit stats from github_contributors table (accurate totals from GitHub API)
    // The github_commits table only has a limited subset of commits that were synced
    const { data: contributorStats } = await supabaseAdmin
      .from('github_contributors')
      .select('total_commits, total_additions, total_deletions')
      .in('repository_id', repoIdsToQuery);

    type ContributorStatsRow = { total_commits: number; total_additions: number; total_deletions: number };
    type CommitAcc = { count: number; additions: number; deletions: number };
    const commitStats = ((contributorStats || []) as ContributorStatsRow[]).reduce<CommitAcc>(
      (acc, c) => ({
        count: acc.count + (c.total_commits || 0),
        additions: acc.additions + (c.total_additions || 0),
        deletions: acc.deletions + (c.total_deletions || 0),
      }),
      { count: 0, additions: 0, deletions: 0 }
    );

    // For time-filtered queries, we still need to use the commits table
    // since contributor stats don't have date filtering
    if (startDate) {
      const { data: filteredCommits } = await supabaseAdmin
        .from('github_commits')
        .select('additions, deletions')
        .in('repository_id', repoIdsToQuery)
        .gte('committed_at', startDate.toISOString())
        .lte('committed_at', endDate.toISOString());

      type CommitRow = { additions: number | null; deletions: number | null };
      const filteredStats = ((filteredCommits || []) as CommitRow[]).reduce<CommitAcc>(
        (acc, c) => ({
          count: acc.count + 1,
          additions: acc.additions + (c.additions || 0),
          deletions: acc.deletions + (c.deletions || 0),
        }),
        { count: 0, additions: 0, deletions: 0 }
      );
      // Use filtered counts when a date range is specified
      commitStats.count = filteredStats.count;
      commitStats.additions = filteredStats.additions;
      commitStats.deletions = filteredStats.deletions;
    }

    // Get PR stats
    let openPrsQuery = supabaseAdmin
      .from('github_pull_requests')
      .select('id', { count: 'exact', head: true })
      .in('repository_id', repoIdsToQuery)
      .eq('state', 'open');

    const { count: openPrs } = await openPrsQuery;

    let mergedPrsQuery = supabaseAdmin
      .from('github_pull_requests')
      .select('id', { count: 'exact', head: true })
      .in('repository_id', repoIdsToQuery)
      .eq('state', 'merged');

    if (startDate) {
      mergedPrsQuery = mergedPrsQuery.gte('merged_at', startDate.toISOString());
    }
    mergedPrsQuery = mergedPrsQuery.lte('merged_at', endDate.toISOString());

    const { count: mergedPrs } = await mergedPrsQuery;

    // Get repository counts
    const { count: totalRepos } = await supabaseAdmin
      .from('github_repositories')
      .select('id', { count: 'exact', head: true });

    const { count: trackedReposCount } = await supabaseAdmin
      .from('github_repositories')
      .select('id', { count: 'exact', head: true })
      .eq('is_tracked', true);

    // Get unique contributors count
    const { data: contributors } = await supabaseAdmin
      .from('github_contributors')
      .select('github_login')
      .in('repository_id', repoIdsToQuery);

    const uniqueContributors = new Set((contributors as { github_login: string }[] | null)?.map(c => c.github_login) || []).size;

    // Get last sync
    const { data: lastSync } = await supabaseAdmin
      .from('github_sync_log')
      .select('completed_at')
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(1)
      .single();

    const stats: GitHubSummaryStats = {
      total_commits: commitStats.count,
      total_additions: commitStats.additions,
      total_deletions: commitStats.deletions,
      open_prs: openPrs || 0,
      merged_prs: mergedPrs || 0,
      total_repositories: totalRepos || 0,
      tracked_repositories: trackedReposCount || 0,
      total_contributors: uniqueContributors,
      last_sync_at: (lastSync as { completed_at: string | null } | null)?.completed_at || null,
      period_start: startDate?.toISOString() || '',
      period_end: endDate.toISOString(),
    };

    return NextResponse.json({ data: stats, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/stats:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
