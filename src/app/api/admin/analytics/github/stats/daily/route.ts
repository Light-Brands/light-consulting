/**
 * GitHub Daily Stats API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github/stats/daily - Get daily time series data
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { GitHubDailyStats, TimeRange } from '@/types/github-analytics';
import { getDateRangeFromTimeRange } from '@/types/github-analytics';

interface AggregatedDailyStats {
  stat_date: string;
  commits_count: number;
  additions: number;
  deletions: number;
  prs_opened: number;
  prs_merged: number;
  unique_contributors: number;
}

/**
 * GET /api/admin/analytics/github/stats/daily
 * Get daily statistics for charts
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

    // Get tracked repository IDs
    let repoQuery = supabaseAdmin
      .from('github_repositories')
      .select('id')
      .eq('is_tracked', true);

    if (repositoryId) {
      repoQuery = repoQuery.eq('id', repositoryId);
    }

    const { data: repos } = await repoQuery;
    const repoIds = (repos as { id: string }[] | null)?.map(r => r.id) || [];

    if (repoIds.length === 0) {
      return NextResponse.json({ data: [], error: null });
    }

    // Get daily stats
    let query = supabaseAdmin
      .from('github_daily_stats')
      .select('*')
      .in('repository_id', repoIds)
      .order('stat_date', { ascending: true });

    if (startDate) {
      query = query.gte('stat_date', startDate.toISOString().split('T')[0]);
    }
    query = query.lte('stat_date', endDate.toISOString().split('T')[0]);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching daily stats:', error);
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({ data: [], error: null });
      }
      return NextResponse.json(
        { data: null, error: `Failed to fetch daily stats: ${error.message}` },
        { status: 500 }
      );
    }

    // If single repo, return as-is
    if (repositoryId) {
      return NextResponse.json({ data: data as GitHubDailyStats[], error: null });
    }

    // Aggregate across all repositories by date
    type DailyStatsRow = {
      stat_date: string;
      commits_count: number | null;
      additions: number | null;
      deletions: number | null;
      prs_opened: number | null;
      prs_merged: number | null;
      unique_contributors: number | null;
    };
    const aggregatedByDate = new Map<string, AggregatedDailyStats>();

    for (const stat of (data || []) as DailyStatsRow[]) {
      const existing = aggregatedByDate.get(stat.stat_date);

      if (existing) {
        existing.commits_count += stat.commits_count || 0;
        existing.additions += stat.additions || 0;
        existing.deletions += stat.deletions || 0;
        existing.prs_opened += stat.prs_opened || 0;
        existing.prs_merged += stat.prs_merged || 0;
        // For unique contributors, we'd need to track by login, but we'll sum for simplicity
        existing.unique_contributors += stat.unique_contributors || 0;
      } else {
        aggregatedByDate.set(stat.stat_date, {
          stat_date: stat.stat_date,
          commits_count: stat.commits_count || 0,
          additions: stat.additions || 0,
          deletions: stat.deletions || 0,
          prs_opened: stat.prs_opened || 0,
          prs_merged: stat.prs_merged || 0,
          unique_contributors: stat.unique_contributors || 0,
        });
      }
    }

    // Fill in missing dates with zeros
    const filledData: AggregatedDailyStats[] = [];
    if (startDate) {
      const current = new Date(startDate);
      while (current <= endDate) {
        const dateStr = current.toISOString().split('T')[0];
        const existing = aggregatedByDate.get(dateStr);

        if (existing) {
          filledData.push(existing);
        } else {
          filledData.push({
            stat_date: dateStr,
            commits_count: 0,
            additions: 0,
            deletions: 0,
            prs_opened: 0,
            prs_merged: 0,
            unique_contributors: 0,
          });
        }

        current.setDate(current.getDate() + 1);
      }
    } else {
      // For 'all' time range, just return what we have sorted
      filledData.push(...Array.from(aggregatedByDate.values()).sort((a, b) =>
        a.stat_date.localeCompare(b.stat_date)
      ));
    }

    return NextResponse.json({ data: filledData, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/stats/daily:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
