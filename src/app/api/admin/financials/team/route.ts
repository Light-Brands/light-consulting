/**
 * Team Overhead API Route
 * Light Brand Consulting
 *
 * GET /api/admin/financials/team - List team overhead
 * POST /api/admin/financials/team - Create team overhead entry
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { TeamOverhead } from '@/types/financials';

// Type helper for Supabase query (until types are regenerated)
type TeamOverheadRow = TeamOverhead;

/**
 * GET /api/admin/financials/team
 * List team overhead
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
    const costType = searchParams.get('cost_type');
    const includeInactive = searchParams.get('include_inactive') === 'true';

    let query = supabaseAdmin
      .from('team_overhead')
      .select('*')
      .order('cost_type')
      .order('name');

    if (costType) {
      query = query.eq('cost_type', costType);
    }
    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching team overhead:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch team overhead' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as TeamOverheadRow[], error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/financials/team:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/financials/team
 * Create team overhead entry
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
    const { name, role, monthly_cost, cost_type, notes } = body;

    if (!name || monthly_cost === undefined || !cost_type) {
      return NextResponse.json(
        { data: null, error: 'Name, monthly_cost, and cost_type are required' },
        { status: 400 }
      );
    }

    const insertData = {
      name,
      role: role || null,
      monthly_cost,
      cost_type,
      notes: notes || null,
    };

    const { data, error } = await supabaseAdmin
      .from('team_overhead')
      .insert(insertData as never)
      .select()
      .single();

    if (error) {
      console.error('Error creating team overhead:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create team overhead entry' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as TeamOverheadRow, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/financials/team:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
