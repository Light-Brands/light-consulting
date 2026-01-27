/**
 * Team Developer API Route (by login)
 * Light Brand Consulting
 *
 * DELETE /api/admin/analytics/github/team-developers/[login] - Remove a team developer
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * DELETE /api/admin/analytics/github/team-developers/[login]
 * Remove a team developer by their GitHub login
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ login: string }> }
) {
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

    const { login } = await params;

    if (!login) {
      return NextResponse.json(
        { data: null, error: 'Login parameter is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('team_developers')
      .delete()
      .eq('github_login', login);

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({ data: null, error: 'Team developer not found' }, { status: 404 });
      }
      return NextResponse.json(
        { data: null, error: `Failed to remove team developer: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { removed: login }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/analytics/github/team-developers/[login]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
