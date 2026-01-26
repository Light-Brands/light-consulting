/**
 * Team Workload API Route
 * Light Brand Consulting
 *
 * GET /api/admin/team/workload - Team workload summary
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * GET /api/admin/team/workload
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

    // Use the view we created in migrations
    const { data, error } = await supabaseAdmin
      .from('v_team_workload')
      .select('*');

    if (error) {
      console.error('Error fetching workload:', error);
      // If view doesn't exist, try manual query
      const { data: teamData, error: teamError } = await supabaseAdmin
        .from('user_profiles')
        .select('id, full_name, email')
        .in('system_role', ['admin', 'team_member'])
        .eq('is_active', true);

      if (teamError) {
        return NextResponse.json(
          { data: null, error: 'Failed to fetch workload' },
          { status: 500 }
        );
      }

      // Return basic data without todo counts
      const workload = (teamData || []).map((user) => ({
        user_profile_id: user.id,
        full_name: user.full_name,
        email: user.email,
        active_todos: 0,
        urgent_todos: 0,
        overdue_todos: 0,
        active_projects: 0,
      }));

      return NextResponse.json({ data: workload, error: null });
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/team/workload:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
