/**
 * Deliverable Detail API Route
 * Light Brand Consulting
 *
 * GET /api/admin/deliverables/[id] - Get single deliverable
 * PATCH /api/admin/deliverables/[id] - Update deliverable
 * DELETE /api/admin/deliverables/[id] - Delete deliverable
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { DeliverableUpdate } from '@/types/deliverables';

/**
 * GET /api/admin/deliverables/[id]
 */
export async function GET(
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

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { id } = await params;

    const { data, error } = await supabaseAdmin
      .from('deliverables')
      .select(`
        *,
        assigned_user:assigned_to (
          id,
          full_name,
          email
        ),
        phase:phase_id (
          id,
          phase_name,
          phase_number
        ),
        milestone:milestone_id (
          id,
          milestone_name
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching deliverable:', error);
      return NextResponse.json(
        { data: null, error: 'Deliverable not found' },
        { status: 404 }
      );
    }

    // Transform data to flatten related fields
    const transformedData = {
      ...data,
      assigned_to_name: data.assigned_user?.full_name || null,
      assigned_to_email: data.assigned_user?.email || null,
      phase_name: data.phase?.phase_name || null,
      phase_number: data.phase?.phase_number || null,
      milestone_name: data.milestone?.milestone_name || null,
      assigned_user: undefined,
      phase: undefined,
      milestone: undefined,
    };

    return NextResponse.json({ data: transformedData, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/deliverables/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/deliverables/[id]
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
    const body: DeliverableUpdate = await request.json();

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ data: { id, ...body }, error: null });
    }

    // Get current deliverable for comparison
    const { data: currentData } = await supabaseAdmin
      .from('deliverables')
      .select('status, assigned_to, proposal_id')
      .eq('id', id)
      .single();

    const allowedFields = [
      'phase_id',
      'milestone_id',
      'name',
      'description',
      'status',
      'priority',
      'due_date',
      'completed_at',
      'assigned_to',
      'sort_order',
    ];

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    for (const field of allowedFields) {
      if ((body as Record<string, unknown>)[field] !== undefined) {
        updateData[field] = (body as Record<string, unknown>)[field];
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
      .from('deliverables')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating deliverable:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update deliverable' },
        { status: 500 }
      );
    }

    // Log activity for status changes
    if (currentData && body.status && body.status !== currentData.status) {
      await supabaseAdmin.from('activity_logs').insert({
        proposal_id: currentData.proposal_id,
        activity_type: 'deliverable_update',
        description: `Deliverable status changed to ${body.status}`,
        metadata: {
          deliverable_id: id,
          old_status: currentData.status,
          new_status: body.status,
        },
        is_client_visible: body.status === 'completed',
      });
    }

    // Log activity for assignment changes
    if (currentData && body.assigned_to !== undefined && body.assigned_to !== currentData.assigned_to) {
      await supabaseAdmin.from('activity_logs').insert({
        proposal_id: currentData.proposal_id,
        activity_type: 'assignment_change',
        description: body.assigned_to ? 'Deliverable assigned' : 'Deliverable unassigned',
        metadata: {
          deliverable_id: id,
          old_assigned_to: currentData.assigned_to,
          new_assigned_to: body.assigned_to,
        },
        is_client_visible: false,
      });
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PATCH /api/admin/deliverables/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/deliverables/[id]
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
      .from('deliverables')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting deliverable:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to delete deliverable' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { id, deleted: true }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/deliverables/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
