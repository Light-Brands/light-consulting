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
import type { Todo, TodoInsert } from '@/types/todos';

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
  {
    id: 'todo-002',
    title: 'Update project documentation',
    description: null,
    status: 'pending',
    priority: 'medium',
    assigned_to: 'user-002',
    created_by: 'user-001',
    proposal_id: null,
    internal_project_id: null,
    phase_id: null,
    milestone_id: null,
    due_date: '2026-01-30',
    completed_at: null,
    is_recurring: false,
    recurrence_pattern: null,
    tags: ['docs'],
    estimated_minutes: 30,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assigned_to = searchParams.get('assigned_to');
    const proposal_id = searchParams.get('proposal_id');
    const includeCompleted = searchParams.get('include_completed') === 'true';

    if (!isSupabaseConfigured()) {
      let filtered = [...placeholderTodos];
      if (status) filtered = filtered.filter((t) => t.status === status);
      if (priority) filtered = filtered.filter((t) => t.priority === priority);
      if (!includeCompleted) filtered = filtered.filter((t) => t.status !== 'completed');
      return NextResponse.json({ data: filtered, error: null });
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

    const body: TodoInsert = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { data: null, error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      const mockTodo: Todo = {
        id: crypto.randomUUID(),
        title: body.title,
        description: body.description || null,
        status: body.status || 'pending',
        priority: body.priority || 'medium',
        assigned_to: body.assigned_to || null,
        created_by: body.created_by || null,
        proposal_id: body.proposal_id || null,
        internal_project_id: body.internal_project_id || null,
        phase_id: body.phase_id || null,
        milestone_id: body.milestone_id || null,
        due_date: body.due_date || null,
        completed_at: null,
        is_recurring: body.is_recurring || false,
        recurrence_pattern: body.recurrence_pattern || null,
        tags: body.tags || null,
        estimated_minutes: body.estimated_minutes || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockTodo, error: null }, { status: 201 });
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
