/**
 * GitHub Commits API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github/commits - List commits with filters
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { GitHubCommit } from '@/types/github-analytics';

/**
 * GET /api/admin/analytics/github/commits
 * List commits with optional filters
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
    const authorLogin = searchParams.get('author_login');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 500);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    let query = supabaseAdmin
      .from('github_commits')
      .select('*, github_repositories!inner(name, full_name)', { count: 'exact' });

    // Apply filters
    if (repositoryId) {
      query = query.eq('repository_id', repositoryId);
    }
    if (authorLogin) {
      query = query.eq('author_github_login', authorLogin);
    }
    if (startDate) {
      query = query.gte('committed_at', startDate);
    }
    if (endDate) {
      query = query.lte('committed_at', endDate);
    }

    // Order and paginate
    query = query
      .order('committed_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching commits:', error);
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({ data: [], total: 0, error: null });
      }
      return NextResponse.json(
        { data: null, error: `Failed to fetch commits: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: data as (GitHubCommit & { github_repositories: { name: string; full_name: string } })[],
      total: count || 0,
      error: null,
    });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/commits:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
