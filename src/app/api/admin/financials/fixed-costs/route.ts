/**
 * Fixed Costs API Route
 * Light Brand Consulting
 *
 * GET /api/admin/financials/fixed-costs - List fixed costs
 * POST /api/admin/financials/fixed-costs - Create fixed cost
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { FixedCost } from '@/types/financials';

type FixedCostRow = FixedCost;

/**
 * GET /api/admin/financials/fixed-costs
 * List fixed costs
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
      .from('fixed_costs')
      .select('*')
      .order('end_date', { ascending: true })
      .order('name');

    if (category) {
      query = query.eq('category', category);
    }
    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching fixed costs:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      // If table doesn't exist, return empty array
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({ data: [], error: null });
      }
      return NextResponse.json(
        { data: null, error: `Failed to fetch fixed costs: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as FixedCostRow[], error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/financials/fixed-costs:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/financials/fixed-costs
 * Create fixed cost
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
    const { name, description, category, total_amount, start_date, end_date, notes } = body;

    if (!name || !category || total_amount === undefined || !start_date || !end_date) {
      return NextResponse.json(
        { data: null, error: 'Name, category, total_amount, start_date, and end_date are required' },
        { status: 400 }
      );
    }

    // Validate date range
    if (new Date(end_date) < new Date(start_date)) {
      return NextResponse.json(
        { data: null, error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    const insertData = {
      name,
      description: description || null,
      category,
      total_amount,
      start_date,
      end_date,
      notes: notes || null,
    };

    const { data, error } = await supabaseAdmin
      .from('fixed_costs')
      .insert(insertData as never)
      .select()
      .single();

    if (error) {
      console.error('Error creating fixed cost:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      // If table doesn't exist, provide helpful error
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { data: null, error: 'Fixed costs table not found. Please run database migrations.' },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { data: null, error: `Failed to create fixed cost: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as FixedCostRow, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/financials/fixed-costs:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
