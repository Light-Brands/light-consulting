/**
 * Todo Detail API Route
 * Light Brand Consulting
 *
 * PATCH /api/admin/todos/[id] - Update todo
 * DELETE /api/admin/todos/[id] - Delete todo
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * PATCH /api/admin/todos/[id]
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ data: { id, ...body }, error: null });
    }

    const allowedFields = [
      'title',
      'description',
      'status',
      'priority',
      'assigned_to',
      'proposal_id',
      'internal_project_id',
      'phase_id',
      'milestone_id',
      'due_date',
      'completed_at',
      'is_recurring',
      'recurrence_pattern',
      'tags',
      'estimated_minutes',
    ];

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Auto-set completed_at when status changes to completed
    if (body.status === 'completed' && !body.completed_at) {
      updateData.completed_at = new Date().toISOString();
    }
    // Clear completed_at when status changes from completed
    if (body.status && body.status !== 'completed') {
      updateData.completed_at = null;
    }

    const { data, error } = await supabaseAdmin
      .from('todos')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating todo:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update todo' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PATCH /api/admin/todos/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/todos/[id]
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ data: { id, deleted: true }, error: null });
    }

    const { error } = await supabaseAdmin
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting todo:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to delete todo' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { id, deleted: true }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/todos/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
