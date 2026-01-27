/**
 * GitHub Contributors API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github/contributors - List contributors
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { AggregatedContributor } from '@/types/github-analytics';

/**
 * GET /api/admin/analytics/github/contributors
 * List contributors aggregated across repositories
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
    const repositoryId = searchParams.get('repository_id');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);

    if (repositoryId) {
      // Get contributors for a specific repository
      const { data, error } = await supabaseAdmin
        .from('github_contributors')
        .select('*')
        .eq('repository_id', repositoryId)
        .order('total_commits', { ascending: false })
        .limit(limit);

      if (error) {
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          return NextResponse.json({ data: [], error: null });
        }
        return NextResponse.json(
          { data: null, error: `Failed to fetch contributors: ${error.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json({ data, error: null });
    }

    // Aggregate contributors across all tracked repositories
    const { data: contributors, error } = await supabaseAdmin
      .from('github_contributors')
      .select(`
        github_login,
        github_id,
        avatar_url,
        total_commits,
        total_additions,
        total_deletions,
        first_commit_at,
        last_commit_at,
        github_repositories!inner(is_tracked)
      `)
      .eq('github_repositories.is_tracked', true);

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({ data: [], error: null });
      }
      return NextResponse.json(
        { data: null, error: `Failed to fetch contributors: ${error.message}` },
        { status: 500 }
      );
    }

    // Type for contributor row
    type ContributorRow = {
      github_login: string;
      github_id: number;
      avatar_url: string | null;
      total_commits: number;
      total_additions: number;
      total_deletions: number;
      first_commit_at: string | null;
      last_commit_at: string | null;
    };

    // Aggregate by github_login
    const aggregated = new Map<string, AggregatedContributor>();

    for (const c of (contributors || []) as ContributorRow[]) {
      const existing = aggregated.get(c.github_login);

      if (existing) {
        existing.total_commits += c.total_commits;
        existing.total_additions += c.total_additions;
        existing.total_deletions += c.total_deletions;
        existing.repositories_count += 1;

        if (c.first_commit_at && (!existing.first_commit_at || c.first_commit_at < existing.first_commit_at)) {
          existing.first_commit_at = c.first_commit_at;
        }
        if (c.last_commit_at && (!existing.last_commit_at || c.last_commit_at > existing.last_commit_at)) {
          existing.last_commit_at = c.last_commit_at;
        }
      } else {
        aggregated.set(c.github_login, {
          github_login: c.github_login,
          github_id: c.github_id,
          avatar_url: c.avatar_url,
          total_commits: c.total_commits,
          total_additions: c.total_additions,
          total_deletions: c.total_deletions,
          repositories_count: 1,
          first_commit_at: c.first_commit_at,
          last_commit_at: c.last_commit_at,
        });
      }
    }

    // Sort by total commits and limit
    const sortedContributors = Array.from(aggregated.values())
      .sort((a, b) => b.total_commits - a.total_commits)
      .slice(0, limit);

    return NextResponse.json({ data: sortedContributors, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/contributors:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
