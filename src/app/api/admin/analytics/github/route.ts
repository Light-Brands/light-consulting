/**
 * GitHub Analytics Dashboard API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github - Get dashboard summary
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { isGitHubConfigured } from '@/lib/github-api';
import type {
  GitHubConfigPublic,
  GitHubSummaryStats,
  GitHubCommit,
  GitHubRepository,
  AggregatedContributor,
  TimeRange,
} from '@/types/github-analytics';
import { getDateRangeFromTimeRange } from '@/types/github-analytics';

interface DashboardData {
  config: GitHubConfigPublic | null;
  summary: GitHubSummaryStats | null;
  recent_commits: GitHubCommit[];
  top_repositories: GitHubRepository[];
  top_contributors: AggregatedContributor[];
  daily_stats: Array<{
    stat_date: string;
    commits_count: number;
    additions: number;
    deletions: number;
  }>;
  tracked_orgs_count: number;
}

/**
 * GET /api/admin/analytics/github
 * Get comprehensive dashboard data
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

    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get('time_range') || '30d') as TimeRange;

    // Check GitHub configuration
    const isConfigured = isGitHubConfigured();
    const orgName = process.env.GITHUB_ORG_NAME || '';

    const config: GitHubConfigPublic = {
      id: 'env',
      org_name: orgName,
      token_scopes: [],
      is_active: isConfigured,
      last_validated_at: null,
      has_token: isConfigured,
    };

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: {
          config,
          summary: null,
          recent_commits: [],
          top_repositories: [],
          top_contributors: [],
          daily_stats: [],
          tracked_orgs_count: 0,
        } as DashboardData,
        error: null,
      });
    }

    // Get tracked orgs count
    const { count: trackedOrgsCount } = await supabaseAdmin
      .from('github_orgs')
      .select('id', { count: 'exact', head: true })
      .eq('is_tracked', true);

    const { start: startDate, end: endDate } = getDateRangeFromTimeRange(timeRange);

    // Get tracked repos
    const { data: trackedRepos } = await supabaseAdmin
      .from('github_repositories')
      .select('id')
      .eq('is_tracked', true);

    const repoIds = (trackedRepos as { id: string }[] | null)?.map(r => r.id) || [];

    if (repoIds.length === 0) {
      // Return empty dashboard
      const emptyDashboard: DashboardData = {
        config,
        summary: {
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
        },
        recent_commits: [],
        top_repositories: [],
        top_contributors: [],
        daily_stats: [],
        tracked_orgs_count: trackedOrgsCount || 0,
      };
      return NextResponse.json({ data: emptyDashboard, error: null });
    }

    // Parallel queries for dashboard data
    const [
      commitsCountResult,
      openPrsResult,
      mergedPrsResult,
      totalReposResult,
      trackedReposResult,
      contributorsResult,
      recentCommitsResult,
      topReposResult,
      dailyStatsResult,
      lastSyncResult,
    ] = await Promise.all([
      // Commit count (use count instead of fetching all rows - Supabase default limit is 1000!)
      (async () => {
        let query = supabaseAdmin
          .from('github_commits')
          .select('*', { count: 'exact', head: true })
          .in('repository_id', repoIds);
        if (startDate) query = query.gte('committed_at', startDate.toISOString());
        return query.lte('committed_at', endDate.toISOString());
      })(),

      // Open PRs count
      supabaseAdmin
        .from('github_pull_requests')
        .select('id', { count: 'exact', head: true })
        .in('repository_id', repoIds)
        .eq('state', 'open'),

      // Merged PRs in period
      (async () => {
        let query = supabaseAdmin
          .from('github_pull_requests')
          .select('id', { count: 'exact', head: true })
          .in('repository_id', repoIds)
          .eq('state', 'merged');
        if (startDate) query = query.gte('merged_at', startDate.toISOString());
        return query.lte('merged_at', endDate.toISOString());
      })(),

      // Total repos
      supabaseAdmin
        .from('github_repositories')
        .select('id', { count: 'exact', head: true }),

      // Tracked repos
      supabaseAdmin
        .from('github_repositories')
        .select('id', { count: 'exact', head: true })
        .eq('is_tracked', true),

      // Contributors
      supabaseAdmin
        .from('github_contributors')
        .select('github_login, github_id, avatar_url, total_commits, total_additions, total_deletions')
        .in('repository_id', repoIds),

      // Recent commits
      (async () => {
        let query = supabaseAdmin
          .from('github_commits')
          .select('*')
          .in('repository_id', repoIds)
          .order('committed_at', { ascending: false })
          .limit(10);
        if (startDate) query = query.gte('committed_at', startDate.toISOString());
        return query;
      })(),

      // Top repos by activity
      supabaseAdmin
        .from('github_repositories')
        .select('*')
        .eq('is_tracked', true)
        .order('pushed_at', { ascending: false, nullsFirst: false })
        .limit(5),

      // Daily stats
      (async () => {
        let query = supabaseAdmin
          .from('github_daily_stats')
          .select('stat_date, commits_count, additions, deletions')
          .in('repository_id', repoIds)
          .order('stat_date', { ascending: true });
        if (startDate) query = query.gte('stat_date', startDate.toISOString().split('T')[0]);
        return query.lte('stat_date', endDate.toISOString().split('T')[0]);
      })(),

      // Last sync
      supabaseAdmin
        .from('github_sync_log')
        .select('completed_at')
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(1)
        .single(),
    ]);

    // Process commit count (now using proper count query)
    const commitCount = commitsCountResult.count || 0;

    // Aggregate contributors
    type ContributorRow = {
      github_login: string;
      github_id: number;
      avatar_url: string | null;
      total_commits: number;
      total_additions: number;
      total_deletions: number;
    };
    const contributorMap = new Map<string, AggregatedContributor>();
    for (const c of (contributorsResult.data || []) as ContributorRow[]) {
      const existing = contributorMap.get(c.github_login);
      if (existing) {
        existing.total_commits += c.total_commits;
        existing.total_additions += c.total_additions;
        existing.total_deletions += c.total_deletions;
        existing.repositories_count += 1;
      } else {
        contributorMap.set(c.github_login, {
          github_login: c.github_login,
          github_id: c.github_id,
          avatar_url: c.avatar_url,
          total_commits: c.total_commits,
          total_additions: c.total_additions,
          total_deletions: c.total_deletions,
          repositories_count: 1,
          first_commit_at: null,
          last_commit_at: null,
        });
      }
    }

    const topContributors = Array.from(contributorMap.values())
      .sort((a, b) => b.total_commits - a.total_commits)
      .slice(0, 5);

    // Aggregate daily stats
    type DailyStatsRow = {
      stat_date: string;
      commits_count: number | null;
      additions: number | null;
      deletions: number | null;
    };
    const dailyMap = new Map<string, { stat_date: string; commits_count: number; additions: number; deletions: number }>();
    for (const stat of (dailyStatsResult.data || []) as DailyStatsRow[]) {
      const existing = dailyMap.get(stat.stat_date);
      if (existing) {
        existing.commits_count += stat.commits_count || 0;
        existing.additions += stat.additions || 0;
        existing.deletions += stat.deletions || 0;
      } else {
        dailyMap.set(stat.stat_date, {
          stat_date: stat.stat_date,
          commits_count: stat.commits_count || 0,
          additions: stat.additions || 0,
          deletions: stat.deletions || 0,
        });
      }
    }

    const dailyStats = Array.from(dailyMap.values()).sort((a, b) =>
      a.stat_date.localeCompare(b.stat_date)
    );

    // Calculate total lines from daily stats (which has accurate code_frequency data)
    const totalAdditions = dailyStats.reduce((sum, d) => sum + d.additions, 0);
    const totalDeletions = dailyStats.reduce((sum, d) => sum + d.deletions, 0);

    const summary: GitHubSummaryStats = {
      total_commits: commitCount,
      total_additions: totalAdditions,
      total_deletions: totalDeletions,
      open_prs: openPrsResult.count || 0,
      merged_prs: mergedPrsResult.count || 0,
      total_repositories: totalReposResult.count || 0,
      tracked_repositories: trackedReposResult.count || 0,
      total_contributors: contributorMap.size,
      last_sync_at: (lastSyncResult.data as { completed_at: string | null } | null)?.completed_at || null,
      period_start: startDate?.toISOString() || '',
      period_end: endDate.toISOString(),
    };

    const dashboard: DashboardData = {
      config,
      summary,
      recent_commits: (recentCommitsResult.data || []) as GitHubCommit[],
      top_repositories: (topReposResult.data || []) as GitHubRepository[],
      top_contributors: topContributors,
      daily_stats: dailyStats,
      tracked_orgs_count: trackedOrgsCount || 0,
    };

    return NextResponse.json({ data: dashboard, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
