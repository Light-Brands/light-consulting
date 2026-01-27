/**
 * Team Developers API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github/team-developers - List team developers with stats
 * POST /api/admin/analytics/github/team-developers - Add a team developer
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { TeamDeveloper, TeamDeveloperWithStats, TeamDeveloperInsert } from '@/types/github-analytics';

/**
 * GET /api/admin/analytics/github/team-developers
 * List all team developers with their aggregated stats
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
    const includeStats = searchParams.get('include_stats') !== 'false';

    // Fetch team developers
    const { data: developersRaw, error } = await supabaseAdmin
      .from('team_developers')
      .select('*')
      .order('github_login', { ascending: true });

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({ data: [], error: null });
      }
      return NextResponse.json(
        { data: null, error: `Failed to fetch team developers: ${error.message}` },
        { status: 500 }
      );
    }

    // Cast to typed array
    const developers = (developersRaw || []) as TeamDeveloper[];

    if (!includeStats || developers.length === 0) {
      return NextResponse.json({ data: developers, error: null });
    }

    // Fetch contributor stats for team developers
    const logins = developers.map(d => d.github_login);
    const { data: contributorStats, error: statsError } = await supabaseAdmin
      .from('github_contributors')
      .select(`
        github_login,
        total_commits,
        total_additions,
        total_deletions,
        first_commit_at,
        last_commit_at,
        github_repositories!inner(is_tracked)
      `)
      .in('github_login', logins)
      .eq('github_repositories.is_tracked', true);

    if (statsError) {
      console.error('Error fetching contributor stats:', statsError);
      // Return developers without stats
      return NextResponse.json({ data: developers, error: null });
    }

    // Aggregate stats per developer
    type ContributorRow = {
      github_login: string;
      total_commits: number;
      total_additions: number;
      total_deletions: number;
      first_commit_at: string | null;
      last_commit_at: string | null;
    };

    const statsMap = new Map<string, {
      total_commits: number;
      total_additions: number;
      total_deletions: number;
      repositories_count: number;
      first_commit_at: string | null;
      last_commit_at: string | null;
    }>();

    for (const c of (contributorStats || []) as ContributorRow[]) {
      const existing = statsMap.get(c.github_login);

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
        statsMap.set(c.github_login, {
          total_commits: c.total_commits,
          total_additions: c.total_additions,
          total_deletions: c.total_deletions,
          repositories_count: 1,
          first_commit_at: c.first_commit_at,
          last_commit_at: c.last_commit_at,
        });
      }
    }

    // Merge stats with developers
    const developersWithStats: TeamDeveloperWithStats[] = developers.map((dev: TeamDeveloper) => {
      const stats = statsMap.get(dev.github_login);
      const additions = stats?.total_additions ?? 0;
      const deletions = stats?.total_deletions ?? 0;

      return {
        ...dev,
        total_commits: stats?.total_commits ?? 0,
        total_additions: additions,
        total_deletions: deletions,
        net_lines: additions - deletions,
        repositories_count: stats?.repositories_count ?? 0,
        first_commit_at: stats?.first_commit_at ?? null,
        last_commit_at: stats?.last_commit_at ?? null,
      };
    });

    // Sort by net lines descending
    developersWithStats.sort((a, b) => b.net_lines - a.net_lines);

    return NextResponse.json({ data: developersWithStats, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/team-developers:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/analytics/github/team-developers
 * Add a new team developer
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json() as TeamDeveloperInsert;

    if (!body.github_login || !body.github_id) {
      return NextResponse.json(
        { data: null, error: 'github_login and github_id are required' },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from('team_developers')
      .insert({
        github_login: body.github_login,
        github_id: body.github_id,
        display_name: body.display_name || null,
        avatar_url: body.avatar_url || null,
        user_profile_id: body.user_profile_id || null,
        designated_by: body.designated_by || null,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { data: null, error: 'Developer already exists in team' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { data: null, error: `Failed to add team developer: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/analytics/github/team-developers:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
