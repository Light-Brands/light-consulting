/**
 * Fixed Cost Detail API Route
 * Light Brand Consulting
 *
 * GET /api/admin/financials/fixed-costs/[id] - Get single fixed cost
 * PUT /api/admin/financials/fixed-costs/[id] - Update fixed cost
 * DELETE /api/admin/financials/fixed-costs/[id] - Delete (soft) fixed cost
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { FixedCost } from '@/types/financials';

type FixedCostRow = FixedCost;

/**
 * GET /api/admin/financials/fixed-costs/[id]
 * Get single fixed cost
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
      .from('fixed_costs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching fixed cost:', error);
      return NextResponse.json(
        { data: null, error: 'Fixed cost not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: data as FixedCostRow, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/financials/fixed-costs/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/financials/fixed-costs/[id]
 * Update fixed cost
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

    // Validate date range if both dates provided
    if (body.start_date && body.end_date && new Date(body.end_date) < new Date(body.start_date)) {
      return NextResponse.json(
        { data: null, error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Whitelist allowed fields
    const allowedFields = ['name', 'description', 'category', 'total_amount', 'start_date', 'end_date', 'notes', 'is_active'];
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
      .from('fixed_costs')
      .update(updateData as never)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating fixed cost:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update fixed cost' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as FixedCostRow, error: null });
  } catch (error) {
    console.error('Error in PUT /api/admin/financials/fixed-costs/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/financials/fixed-costs/[id]
 * Soft delete fixed cost
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
      .from('fixed_costs')
      .update({ is_active: false } as never)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deleting fixed cost:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to delete fixed cost' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as FixedCostRow, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/financials/fixed-costs/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
