/**
 * GitHub Organizations API Route
 * Light Brand Consulting
 *
 * GET /api/admin/analytics/github/orgs - List all orgs with tracked status
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { createGitHubClient, isGitHubConfigured } from '@/lib/github-api';
import { syncOrganizations } from '@/lib/github-sync';
import type { GitHubOrganization } from '@/types/github-analytics';

/**
 * GET /api/admin/analytics/github/orgs
 * List all organizations with tracked status
 * Optional ?refresh=true to fetch fresh data from GitHub
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
      return NextResponse.json({
        data: [],
        error: null,
      });
    }

    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get('refresh') === 'true';

    // If refresh requested, sync organizations from GitHub
    if (refresh && isGitHubConfigured()) {
      const client = createGitHubClient();
      if (client) {
        try {
          await syncOrganizations(client);
        } catch (e) {
          console.error('Failed to sync organizations:', e);
        }
      }
    }

    // Fetch all organizations from database
    const { data: orgs, error } = await supabaseAdmin
      .from('github_orgs')
      .select('*')
      .order('login', { ascending: true });

    if (error) {
      // If table doesn't exist, return empty array
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({ data: [], error: null });
      }
      console.error('Error fetching organizations:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch organizations' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: (orgs || []) as GitHubOrganization[],
      error: null,
    });
  } catch (error) {
    console.error('Error in GET /api/admin/analytics/github/orgs:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
