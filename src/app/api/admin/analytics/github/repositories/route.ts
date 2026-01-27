/**
 * GitHub Repositories API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github/repositories - List repositories
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { GitHubRepository } from '@/types/github-analytics';

/**
 * GET /api/admin/analytics/github/repositories
 * List all synced repositories
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

    const { data, error } = await query;

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

    return NextResponse.json({ data: data as GitHubRepository[], error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/repositories:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
