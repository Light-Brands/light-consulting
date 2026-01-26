/**
 * Internal Project Detail API Route
 * Light Brand Consulting
 *
 * GET /api/admin/internal-projects/[id] - Get internal project
 * PATCH /api/admin/internal-projects/[id] - Update internal project
 * DELETE /api/admin/internal-projects/[id] - Delete internal project
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * GET /api/admin/internal-projects/[id]
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

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: {
          id,
          name: 'Sample Internal Project',
          status: 'active',
          priority: 'medium',
          progress_percentage: 50,
        },
        error: null,
      });
    }

    const { data, error } = await supabaseAdmin
      .from('internal_projects')
      .select(`
        *,
        lead:lead_id (
          id,
          full_name,
          email,
          avatar_url
        ),
        internal_project_members (
          id,
          role,
          user_profile:user_profile_id (
            id,
            full_name,
            email,
            avatar_url
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching internal project:', error);
      return NextResponse.json(
        { data: null, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/internal-projects/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/internal-projects/[id]
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
      'name',
      'description',
      'category',
      'status',
      'priority',
      'progress_percentage',
      'start_date',
      'target_date',
      'completed_at',
      'lead_id',
      'tags',
      'repository_url',
      'documentation_url',
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

    const { data, error } = await supabaseAdmin
      .from('internal_projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating internal project:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PATCH /api/admin/internal-projects/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/internal-projects/[id]
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
      .from('internal_projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting internal project:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to delete project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { id, deleted: true }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/internal-projects/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
