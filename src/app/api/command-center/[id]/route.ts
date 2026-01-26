/**
 * Command Center Project Detail API Route
 * Light Brand Consulting
 *
 * GET /api/command-center/[id] - Get project detail
 * PATCH /api/command-center/[id] - Update project tracking fields
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * GET /api/command-center/[id]
 * Get project detail with all related data
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

    const { id } = await params;

    // If Supabase is not configured, return placeholder
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: {
          id,
          project_name: 'Sample Project',
          client_name: 'Sample Client',
          status: 'active',
          progress_percentage: 50,
          health_status: 'on_track',
          priority: 'medium',
        },
        error: null,
      });
    }

    const { data, error } = await supabaseAdmin
      .from('proposals')
      .select(`
        *,
        proposal_phases (
          id,
          phase_number,
          phase_name,
          description,
          timeline,
          start_date,
          end_date,
          phase_status,
          actual_start_date,
          actual_end_date,
          completed_at,
          progress_notes,
          amount,
          deliverables,
          objectives,
          goals
        ),
        milestones (
          id,
          milestone_name,
          description,
          amount,
          due_date,
          payment_status,
          milestone_status,
          paid_at
        ),
        project_activity_log (
          id,
          activity_type,
          title,
          description,
          created_at,
          is_client_visible
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      return NextResponse.json(
        { data: null, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/command-center/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/command-center/[id]
 * Update project tracking fields
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

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: { id, ...body },
        error: null,
      });
    }

    // Build update object with allowed fields
    const allowedFields = [
      'progress_percentage',
      'health_status',
      'priority',
      'next_action',
      'next_action_due_date',
      'is_on_hold',
      'on_hold_reason',
      'on_hold_since',
      'project_category',
      'assigned_to',
      'project_manager_id',
      'status',
    ];

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
      last_activity_at: new Date().toISOString(),
    };

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const { data, error } = await supabaseAdmin
      .from('proposals')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update project' },
        { status: 500 }
      );
    }

    // Log the activity
    await supabaseAdmin.from('project_activity_log').insert({
      proposal_id: id,
      activity_type: 'progress_update',
      title: 'Project tracking updated',
      description: `Updated: ${Object.keys(body).join(', ')}`,
      is_client_visible: false,
    });

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PATCH /api/command-center/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
