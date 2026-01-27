/**
 * GitHub Single Repository API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github/repositories/[id] - Get repository details
 * PUT /api/admin/analytics/github/repositories/[id] - Update repository settings
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { GitHubRepository } from '@/types/github-analytics';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/analytics/github/repositories/[id]
 * Get single repository with stats
 */
export async function GET(request: NextRequest, context: RouteContext) {
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

    const { id } = await context.params;

    const { data, error } = await supabaseAdmin
      .from('github_repositories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching repository:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { data: null, error: 'Repository not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { data: null, error: `Failed to fetch repository: ${error.message}` },
        { status: 500 }
      );
    }

    // Get additional stats
    const [commitsResult, prsResult, contributorsResult] = await Promise.all([
      supabaseAdmin
        .from('github_commits')
        .select('id', { count: 'exact', head: true })
        .eq('repository_id', id),
      supabaseAdmin
        .from('github_pull_requests')
        .select('id', { count: 'exact', head: true })
        .eq('repository_id', id),
      supabaseAdmin
        .from('github_contributors')
        .select('id', { count: 'exact', head: true })
        .eq('repository_id', id),
    ]);

    const repoWithStats = {
      ...(data as object),
      commit_count: commitsResult.count || 0,
      pr_count: prsResult.count || 0,
      contributor_count: contributorsResult.count || 0,
    };

    return NextResponse.json({ data: repoWithStats as GitHubRepository & { commit_count: number; pr_count: number; contributor_count: number }, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/repositories/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/analytics/github/repositories/[id]
 * Update repository settings (e.g., is_tracked)
 */
export async function PUT(request: NextRequest, context: RouteContext) {
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

    const { id } = await context.params;
    const body = await request.json();
    const { is_tracked } = body;

    if (typeof is_tracked !== 'boolean') {
      return NextResponse.json(
        { data: null, error: 'is_tracked must be a boolean' },
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
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { data: null, error: 'Repository not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { data: null, error: `Failed to update repository: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as GitHubRepository, error: null });
  } catch (error) {
    console.error('Error in PUT /api/admin/analytics/github/repositories/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
