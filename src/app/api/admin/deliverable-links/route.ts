/**
 * Deliverable Links API Route
 * Light Brand Consulting
 *
 * GET /api/admin/deliverable-links - List deliverable links
 * POST /api/admin/deliverable-links - Create deliverable link
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { DeliverableLinkInsert } from '@/types/deliverables';

/**
 * GET /api/admin/deliverable-links
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
    const proposalId = searchParams.get('proposal_id');
    const phaseId = searchParams.get('phase_id');
    const clientVisible = searchParams.get('client_visible');

    let query = supabaseAdmin
      .from('deliverable_links')
      .select(`
        *,
        proposal_phases:phase_id (
          id,
          phase_name
        ),
        milestones:milestone_id (
          id,
          milestone_name
        )
      `)
      .order('sort_order');

    if (proposalId) {
      query = query.eq('proposal_id', proposalId);
    }
    if (phaseId) {
      query = query.eq('phase_id', phaseId);
    }
    if (clientVisible === 'true') {
      query = query.eq('is_client_visible', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching deliverable links:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch deliverable links' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/deliverable-links:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/deliverable-links
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

    const body: DeliverableLinkInsert = await request.json();

    if (!body.proposal_id || !body.title || !body.url) {
      return NextResponse.json(
        { data: null, error: 'Proposal ID, title, and URL are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('deliverable_links')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('Error creating deliverable link:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create deliverable link' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/deliverable-links:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
