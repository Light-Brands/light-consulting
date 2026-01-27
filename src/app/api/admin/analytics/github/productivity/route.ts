/**
 * Productivity Metrics API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github/productivity - Get team productivity metrics
 *
 * Calculates lines of code produced in the selected time period
 * and compares to traditional development (5,000 lines/dev/month)
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import {
  INDUSTRY_BENCHMARK_LOC_PER_MONTH,
  getDateRangeFromTimeRange,
  type TimeRange,
  type ProductivityMetrics,
} from '@/types/github-analytics';

/**
 * GET /api/admin/analytics/github/productivity
 * Calculate productivity for the selected time period vs traditional benchmark
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
    const developerCount = Math.max(1, parseInt(searchParams.get('developer_count') || '1', 10));

    // Calculate date range
    const { start: startDate, end: endDate } = getDateRangeFromTimeRange(timeRange);
    const timeRangeDays = startDate
      ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 365;

    // Fetch daily stats for the selected time period from tracked repos
    let dailyStatsQuery = supabaseAdmin
      .from('github_daily_stats')
      .select(`
        stat_date,
        additions,
        deletions,
        commits_count,
        github_repositories!inner(is_tracked)
      `)
      .eq('github_repositories.is_tracked', true);

    if (startDate) {
      dailyStatsQuery = dailyStatsQuery.gte('stat_date', startDate.toISOString().split('T')[0]);
    }
    dailyStatsQuery = dailyStatsQuery
      .lte('stat_date', endDate.toISOString().split('T')[0])
      .order('stat_date', { ascending: true });

    const { data: dailyStatsRaw, error: statsError } = await dailyStatsQuery;

    if (statsError) {
      if (statsError.code === '42P01' || statsError.message?.includes('does not exist')) {
        return NextResponse.json({
          data: getEmptyMetrics(timeRangeDays, developerCount),
          error: null
        });
      }
      console.error('Error fetching daily stats:', statsError);
    }

    // Aggregate stats for the time period
    type DailyStatRow = {
      stat_date: string;
      additions: number;
      deletions: number;
      commits_count: number;
    };

    let totalAdditions = 0;
    let totalDeletions = 0;
    let totalCommits = 0;
    const dailyMap = new Map<string, { additions: number; deletions: number; commits_count: number }>();

    for (const ds of (dailyStatsRaw || []) as DailyStatRow[]) {
      totalAdditions += ds.additions || 0;
      totalDeletions += ds.deletions || 0;
      totalCommits += ds.commits_count || 0;

      // Aggregate by date for the timeline
      const existing = dailyMap.get(ds.stat_date);
      if (existing) {
        existing.additions += ds.additions || 0;
        existing.deletions += ds.deletions || 0;
        existing.commits_count += ds.commits_count || 0;
      } else {
        dailyMap.set(ds.stat_date, {
          additions: ds.additions || 0,
          deletions: ds.deletions || 0,
          commits_count: ds.commits_count || 0,
        });
      }
    }

    // Net lines = additions - deletions (lines produced in the period)
    const netLines = totalAdditions - totalDeletions;
    const months = timeRangeDays / 30;

    // Traditional benchmark: 5,000 lines per developer per month
    // For the selected time period with the given team size
    const traditionalBenchmark = developerCount * INDUSTRY_BENCHMARK_LOC_PER_MONTH * months;

    // Efficiency multiplier: how much more/less than traditional
    const efficiencyMultiplier = traditionalBenchmark > 0 ? netLines / traditionalBenchmark : 0;

    // Human-months equivalent: the work produced equals X months of traditional development
    const humanMonthsEquivalent = INDUSTRY_BENCHMARK_LOC_PER_MONTH > 0
      ? netLines / INDUSTRY_BENCHMARK_LOC_PER_MONTH
      : 0;
    const humanYearsEquivalent = humanMonthsEquivalent / 12;

    // Build daily stats array for timeline chart
    const dailyStats = Array.from(dailyMap.entries())
      .map(([stat_date, stats]) => ({
        stat_date,
        additions: stats.additions,
        deletions: stats.deletions,
        net_lines: stats.additions - stats.deletions,
        commits_count: stats.commits_count,
      }))
      .sort((a, b) => a.stat_date.localeCompare(b.stat_date));

    const metrics: ProductivityMetrics = {
      team_developer_count: developerCount,
      time_range_days: timeRangeDays,

      // Lines produced in the selected time period
      total_additions: totalAdditions,
      total_deletions: totalDeletions,
      net_lines: netLines,
      total_commits: totalCommits,

      // Per-developer averages for the period
      avg_additions_per_dev: developerCount > 0 ? Math.round(totalAdditions / developerCount) : 0,
      avg_deletions_per_dev: developerCount > 0 ? Math.round(totalDeletions / developerCount) : 0,
      avg_net_lines_per_dev: developerCount > 0 ? Math.round(netLines / developerCount) : 0,
      avg_commits_per_dev: developerCount > 0 ? Math.round(totalCommits / developerCount) : 0,

      // Comparison to traditional development (5,000 lines/dev/month)
      traditional_benchmark: Math.round(traditionalBenchmark),
      efficiency_multiplier: Math.round(efficiencyMultiplier * 10) / 10,
      human_months_equivalent: Math.round(humanMonthsEquivalent * 10) / 10,
      human_years_equivalent: Math.round(humanYearsEquivalent * 10) / 10,

      developers: [],
      daily_stats: dailyStats,
    };

    return NextResponse.json({ data: metrics, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/productivity:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getEmptyMetrics(timeRangeDays: number, developerCount: number): ProductivityMetrics {
  return {
    team_developer_count: developerCount,
    time_range_days: timeRangeDays,
    total_additions: 0,
    total_deletions: 0,
    net_lines: 0,
    total_commits: 0,
    avg_additions_per_dev: 0,
    avg_deletions_per_dev: 0,
    avg_net_lines_per_dev: 0,
    avg_commits_per_dev: 0,
    traditional_benchmark: 0,
    efficiency_multiplier: 0,
    human_months_equivalent: 0,
    human_years_equivalent: 0,
    developers: [],
    daily_stats: [],
  };
}
