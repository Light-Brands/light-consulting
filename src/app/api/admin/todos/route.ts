/**
 * Todos API Route
 * Light Brand Consulting
 *
 * GET /api/admin/todos - List todos
 * POST /api/admin/todos - Create todo
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { TodoInsert } from '@/types/todos';

/**
 * GET /api/admin/todos
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
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assigned_to = searchParams.get('assigned_to');
    const proposal_id = searchParams.get('proposal_id');
    const includeCompleted = searchParams.get('include_completed') === 'true';

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
        ),
        assigned_user:assigned_to (
          id,
          full_name,
          email
        )
      `)
      .order('priority', { ascending: false })
      .order('due_date', { ascending: true, nullsFirst: false });

    if (status) {
      query = query.eq('status', status);
    }
    if (priority) {
      query = query.eq('priority', priority);
    }
    if (assigned_to) {
      query = query.eq('assigned_to', assigned_to);
    }
    if (proposal_id) {
      query = query.eq('proposal_id', proposal_id);
    }
    if (!includeCompleted) {
      query = query.neq('status', 'completed');
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching todos:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch todos' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/todos:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/todos
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

    const body: TodoInsert = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { data: null, error: 'Title is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('todos')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('Error creating todo:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create todo' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/todos:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
