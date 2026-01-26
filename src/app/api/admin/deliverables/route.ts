/**
 * Deliverables API Route
 * Light Brand Consulting
 *
 * GET /api/admin/deliverables - List deliverables
 * POST /api/admin/deliverables - Create deliverable
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { DeliverableInsert } from '@/types/deliverables';

/**
 * GET /api/admin/deliverables
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
    const proposal_id = searchParams.get('proposal_id');
    const phase_id = searchParams.get('phase_id');
    const milestone_id = searchParams.get('milestone_id');
    const status = searchParams.get('status');
    const assigned_to = searchParams.get('assigned_to');
    const includeCompleted = searchParams.get('include_completed') === 'true';

    let query = supabaseAdmin
      .from('deliverables')
      .select(`
        *,
        assigned_user:assigned_to (
          id,
          full_name,
          email
        ),
        phase:phase_id (
          id,
          phase_name,
          phase_number
        ),
        milestone:milestone_id (
          id,
          milestone_name
        )
      `)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (proposal_id) {
      query = query.eq('proposal_id', proposal_id);
    }
    if (phase_id) {
      query = query.eq('phase_id', phase_id);
    }
    if (milestone_id) {
      query = query.eq('milestone_id', milestone_id);
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (assigned_to) {
      query = query.eq('assigned_to', assigned_to);
    }
    if (!includeCompleted) {
      query = query.neq('status', 'completed');
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching deliverables:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch deliverables' },
        { status: 500 }
      );
    }

    // Transform data to flatten related fields
    const transformedData = data?.map((d) => ({
      ...d,
      assigned_to_name: d.assigned_user?.full_name || null,
      assigned_to_email: d.assigned_user?.email || null,
      phase_name: d.phase?.phase_name || null,
      phase_number: d.phase?.phase_number || null,
      milestone_name: d.milestone?.milestone_name || null,
      // Remove nested objects
      assigned_user: undefined,
      phase: undefined,
      milestone: undefined,
    }));

    return NextResponse.json({ data: transformedData, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/deliverables:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/deliverables
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

    const body: DeliverableInsert = await request.json();

    if (!body.proposal_id) {
      return NextResponse.json(
        { data: null, error: 'proposal_id is required' },
        { status: 400 }
      );
    }

    if (!body.name) {
      return NextResponse.json(
        { data: null, error: 'name is required' },
        { status: 400 }
      );
    }

    // Get max sort_order for this proposal
    const { data: maxSortData } = await supabaseAdmin
      .from('deliverables')
      .select('sort_order')
      .eq('proposal_id', body.proposal_id)
      .order('sort_order', { ascending: false })
      .limit(1);

    const nextSortOrder = maxSortData && maxSortData.length > 0
      ? (maxSortData[0].sort_order || 0) + 1
      : 0;

    const insertData = {
      ...body,
      sort_order: body.sort_order ?? nextSortOrder,
      status: body.status || 'pending',
      priority: body.priority || 'medium',
    };

    const { data, error } = await supabaseAdmin
      .from('deliverables')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating deliverable:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create deliverable' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/deliverables:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
