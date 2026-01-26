/**
 * Deliverable Link Detail API Route
 * Light Brand Consulting
 *
 * PATCH /api/admin/deliverable-links/[id] - Update deliverable link
 * DELETE /api/admin/deliverable-links/[id] - Delete deliverable link
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * PATCH /api/admin/deliverable-links/[id]
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
      'url',
      'link_type',
      'phase_id',
      'milestone_id',
      'is_client_visible',
      'requires_password',
      'password_hint',
      'icon',
      'sort_order',
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
      .from('deliverable_links')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating deliverable link:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update deliverable link' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PATCH /api/admin/deliverable-links/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/deliverable-links/[id]
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
      .from('deliverable_links')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting deliverable link:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to delete deliverable link' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { id, deleted: true }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/deliverable-links/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
