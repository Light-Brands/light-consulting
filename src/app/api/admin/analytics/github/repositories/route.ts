/**
 * GitHub Repositories API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github/repositories - List repositories with stats
 * PATCH /api/admin/analytics/github/repositories - Update repository tracking
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { GitHubRepository } from '@/types/github-analytics';

export interface RepositoryWithStats extends GitHubRepository {
  total_additions: number;
  total_deletions: number;
  stats_start_date: string | null;
  stats_end_date: string | null;
}

interface ContributorStatsRow {
  total_additions: number;
  total_deletions: number;
  first_commit_at: string | null;
  last_commit_at: string | null;
}

/**
 * GET /api/admin/analytics/github/repositories
 * List all synced repositories with their line stats
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
    const tracked = searchParams.get('tracked');
    const language = searchParams.get('language');
    const sort = searchParams.get('sort') || 'pushed_at';
    const order = searchParams.get('order') === 'asc' ? true : false;

    let query = supabaseAdmin
      .from('github_repositories')
      .select('*');

    // Apply filters
    if (tracked === 'true') {
      query = query.eq('is_tracked', true);
    } else if (tracked === 'false') {
      query = query.eq('is_tracked', false);
    }

    if (language) {
      query = query.eq('language', language);
    }

    // Apply sorting
    const validSortFields = ['pushed_at', 'stars_count', 'forks_count', 'name', 'created_at_github'];
    const sortField = validSortFields.includes(sort) ? sort : 'pushed_at';
    query = query.order(sortField, { ascending: order, nullsFirst: false });

    const { data: repos, error } = await query;

    if (error) {
      console.error('Error fetching repositories:', error);
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({ data: [], error: null });
      }
      return NextResponse.json(
        { data: null, error: `Failed to fetch repositories: ${error.message}` },
        { status: 500 }
      );
    }

    // Get line stats for each repository from contributors table (accurate lifetime totals)
    const reposWithStats: RepositoryWithStats[] = [];

    for (const repo of (repos || []) as GitHubRepository[]) {
      // Get aggregated stats from contributors (same source as dashboard totals)
      const { data: contributorData } = await supabaseAdmin
        .from('github_contributors')
        .select('total_additions, total_deletions, first_commit_at, last_commit_at')
        .eq('repository_id', repo.id);

      const contributors = (contributorData || []) as ContributorStatsRow[];
      const totalAdditions = contributors.reduce((sum, c) => sum + (c.total_additions || 0), 0);
      const totalDeletions = contributors.reduce((sum, c) => sum + (c.total_deletions || 0), 0);

      // Get date range from contributor data
      let statsStartDate: string | null = null;
      let statsEndDate: string | null = null;
      for (const c of contributors) {
        if (c.first_commit_at && (!statsStartDate || c.first_commit_at < statsStartDate)) {
          statsStartDate = c.first_commit_at.split('T')[0];
        }
        if (c.last_commit_at && (!statsEndDate || c.last_commit_at > statsEndDate)) {
          statsEndDate = c.last_commit_at.split('T')[0];
        }
      }

      reposWithStats.push({
        ...repo,
        total_additions: totalAdditions,
        total_deletions: totalDeletions,
        stats_start_date: statsStartDate,
        stats_end_date: statsEndDate,
      });
    }

    return NextResponse.json({ data: reposWithStats, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/repositories:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/analytics/github/repositories
 * Update repository tracking status
 */
export async function PATCH(request: NextRequest) {
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

    const body = await request.json();
    const { id, is_tracked } = body;

    if (!id || typeof is_tracked !== 'boolean') {
      return NextResponse.json(
        { data: null, error: 'Missing required fields: id and is_tracked' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('github_repositories')
      .update({ is_tracked } as never)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating repository:', error);
      return NextResponse.json(
        { data: null, error: `Failed to update repository: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PATCH /api/admin/analytics/github/repositories:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
