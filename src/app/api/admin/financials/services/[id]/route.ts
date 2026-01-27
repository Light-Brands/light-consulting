/**
 * Service Cost Detail API Route
 * Light Brand Consulting
 *
 * GET /api/admin/financials/services/[id] - Get single service cost
 * PUT /api/admin/financials/services/[id] - Update service cost
 * DELETE /api/admin/financials/services/[id] - Delete (soft) service cost
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ServiceCost } from '@/types/financials';

// Type helper for Supabase query (until types are regenerated)
type ServiceCostRow = ServiceCost;

/**
 * GET /api/admin/financials/services/[id]
 * Get single service cost
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
      .from('service_costs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching service cost:', error);
      return NextResponse.json(
        { data: null, error: 'Service cost not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: data as ServiceCostRow, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/financials/services/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/financials/services/[id]
 * Update service cost
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
    const allowedFields = ['name', 'vendor', 'category', 'unit_cost', 'unit_type', 'quantity', 'notes', 'is_active'];
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
      .from('service_costs')
      .update(updateData as never)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating service cost:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update service cost' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as ServiceCostRow, error: null });
  } catch (error) {
    console.error('Error in PUT /api/admin/financials/services/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/financials/services/[id]
 * Soft delete service cost
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
      .from('service_costs')
      .update({ is_active: false } as never)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deleting service cost:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to delete service cost' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as ServiceCostRow, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/financials/services/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
