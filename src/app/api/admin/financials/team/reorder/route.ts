/**
 * Team Overhead Reorder API Route
 * Light Brand Consulting
 *
 * PATCH /api/admin/financials/team/reorder - Reorder team members
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * PATCH /api/admin/financials/team/reorder
 * Reorder team members by updating order_index values
 *
 * Body: { orderedIds: string[] } - Array of team member IDs in desired order
 */
export async function PATCH(request: NextRequest) {
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

    const body = await request.json();
    const { orderedIds } = body;

    if (!orderedIds || !Array.isArray(orderedIds)) {
      return NextResponse.json(
        { data: null, error: 'orderedIds array is required' },
        { status: 400 }
      );
    }

    // Update each team member's order_index
    const updates = orderedIds.map((id: string, index: number) =>
      supabaseAdmin
        .from('team_overhead')
        .update({ order_index: index } as never)
        .eq('id', id)
    );

    const results = await Promise.all(updates);

    // Check for errors
    const errors = results.filter(r => r.error);
    if (errors.length > 0) {
      console.error('Error reordering team members:', errors[0].error);
      return NextResponse.json(
        { data: null, error: 'Failed to reorder team members' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { success: true }, error: null });
  } catch (error) {
    console.error('Error in PATCH /api/admin/financials/team/reorder:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
