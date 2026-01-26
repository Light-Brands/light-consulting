/**
 * My Todos API Route
 * Light Brand Consulting
 *
 * GET /api/admin/todos/my - Get current user's todos
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated, getCurrentUser } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { Todo } from '@/types/todos';

// Placeholder data
const placeholderTodos: Todo[] = [
  {
    id: 'todo-001',
    title: 'Review client feedback',
    description: 'Go through the latest round of client feedback on the design mockups',
    status: 'in_progress',
    priority: 'high',
    assigned_to: 'user-001',
    created_by: 'user-001',
    proposal_id: 'project-001',
    internal_project_id: null,
    phase_id: null,
    milestone_id: null,
    due_date: '2026-01-28',
    completed_at: null,
    is_recurring: false,
    recurrence_pattern: null,
    tags: ['design', 'client'],
    estimated_minutes: 60,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

/**
 * GET /api/admin/todos/my
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

    const { searchParams } = new URL(request.url);
    const includeCompleted = searchParams.get('include_completed') === 'true';

    if (!isSupabaseConfigured()) {
      let filtered = [...placeholderTodos];
      if (!includeCompleted) {
        filtered = filtered.filter((t) => t.status !== 'completed');
      }
      return NextResponse.json({ data: filtered, error: null });
    }

    // Get current user's profile
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { data: null, error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Get user profile ID from auth user
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .eq('auth_user_id', user.id)
      .single();

    if (!profile) {
      // Return empty list if no profile
      return NextResponse.json({ data: [], error: null });
    }

    let query = supabaseAdmin
      .from('todos')
      .select(`
        *,
        proposals:proposal_id (
          id,
          project_name,
          client_name
        ),
        internal_projects:internal_project_id (
          id,
          name
        )
      `)
      .eq('assigned_to', profile.id)
      .order('priority', { ascending: false })
      .order('due_date', { ascending: true, nullsFirst: false });

    if (!includeCompleted) {
      query = query.neq('status', 'completed');
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching my todos:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch todos' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/todos/my:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
