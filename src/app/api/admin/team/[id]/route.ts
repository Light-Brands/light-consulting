/**
 * Team Member Detail API Route
 * Light Brand Consulting
 *
 * GET /api/admin/team/[id] - Get team member details
 * PATCH /api/admin/team/[id] - Update team member
 * DELETE /api/admin/team/[id] - Deactivate team member
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * GET /api/admin/team/[id]
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
          email: 'user@example.com',
          full_name: 'Sample User',
          system_role: 'team_member',
          is_active: true,
        },
        error: null,
      });
    }

    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .select(`
        *,
        project_members (
          id,
          proposal_id,
          project_role,
          proposals (
            id,
            project_name,
            client_name,
            status
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching team member:', error);
      return NextResponse.json(
        { data: null, error: 'Team member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/team/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/team/[id]
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
      'full_name',
      'phone',
      'timezone',
      'system_role',
      'is_active',
      'avatar_url',
    ];

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating team member:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update team member' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PATCH /api/admin/team/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/team/[id]
 * Deactivate team member (soft delete)
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
      return NextResponse.json({ data: { id, is_active: false }, error: null });
    }

    // Soft delete - set is_active to false
    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deactivating team member:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to deactivate team member' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/team/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
