/**
 * Service Costs API Route
 * Light Brand Consulting
 *
 * GET /api/admin/financials/services - List service costs
 * POST /api/admin/financials/services - Create service cost
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ServiceCost } from '@/types/financials';

// Type helper for Supabase query (until types are regenerated)
type ServiceCostRow = ServiceCost;

/**
 * GET /api/admin/financials/services
 * List service costs
 */
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const includeInactive = searchParams.get('include_inactive') === 'true';

    let query = supabaseAdmin
      .from('service_costs')
      .select('*')
      .order('category')
      .order('name');

    if (category) {
      query = query.eq('category', category);
    }
    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching service costs:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch service costs' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as ServiceCostRow[], error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/financials/services:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/financials/services
 * Create service cost
 */
export async function POST(request: NextRequest) {
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
    const { name, vendor, category, unit_cost, unit_type, quantity, notes } = body;

    if (!name || !category || unit_cost === undefined) {
      return NextResponse.json(
        { data: null, error: 'Name, category, and unit_cost are required' },
        { status: 400 }
      );
    }

    const insertData = {
      name,
      vendor: vendor || null,
      category,
      unit_cost,
      unit_type: unit_type || 'flat',
      quantity: quantity || 1,
      notes: notes || null,
    };

    const { data, error } = await supabaseAdmin
      .from('service_costs')
      .insert(insertData as never)
      .select()
      .single();

    if (error) {
      console.error('Error creating service cost:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create service cost' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as ServiceCostRow, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/financials/services:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
