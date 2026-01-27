/**
 * Team Overhead Detail API Route
 * Light Brand Consulting
 *
 * GET /api/admin/financials/team/[id] - Get single team overhead entry
 * PUT /api/admin/financials/team/[id] - Update team overhead entry
 * DELETE /api/admin/financials/team/[id] - Delete (soft) team overhead entry
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { TeamOverhead } from '@/types/financials';

// Type helper for Supabase query (until types are regenerated)
type TeamOverheadRow = TeamOverhead;

/**
 * GET /api/admin/financials/team/[id]
 * Get single team overhead entry
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    const { data, error } = await supabaseAdmin
      .from('team_overhead')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching team overhead:', error);
      return NextResponse.json(
        { data: null, error: 'Team overhead entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: data as TeamOverheadRow, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/financials/team/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/financials/team/[id]
 * Update team overhead entry
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    const body = await request.json();

    // Whitelist allowed fields
    const allowedFields = ['name', 'role', 'monthly_cost', 'cost_type', 'notes', 'is_active'];
    const updateData: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { data: null, error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('team_overhead')
      .update(updateData as never)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating team overhead:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update team overhead entry' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as TeamOverheadRow, error: null });
  } catch (error) {
    console.error('Error in PUT /api/admin/financials/team/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/financials/team/[id]
 * Soft delete team overhead entry
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

    // Soft delete by setting is_active to false
    const { data, error } = await supabaseAdmin
      .from('team_overhead')
      .update({ is_active: false } as never)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deleting team overhead:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to delete team overhead entry' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as TeamOverheadRow, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/financials/team/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
