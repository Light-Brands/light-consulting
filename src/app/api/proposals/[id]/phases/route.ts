/**
 * Proposal Phases API Route
 * Light Brand Consulting
 *
 * GET /api/proposals/[id]/phases - Get all phases for a proposal
 * POST /api/proposals/[id]/phases - Create a new phase
 * PUT /api/proposals/[id]/phases - Batch update/replace all phases
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ProposalPhase, ProposalPhaseInsert } from '@/types/proposals';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/proposals/[id]/phases
 * Get all phases for a proposal (admin only)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: proposalId } = await params;

    // Check admin authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ data: [], error: null });
    }

    const { data: phases, error } = await supabaseAdmin
      .from('proposal_phases')
      .select('*')
      .eq('proposal_id', proposalId)
      .order('sort_order');

    if (error) {
      console.error('Error fetching phases:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch phases' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: phases, error: null });
  } catch (error) {
    console.error('Error in GET /api/proposals/[id]/phases:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/proposals/[id]/phases
 * Create a new phase (admin only)
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: proposalId } = await params;

    // Check admin authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.phase_name) {
      return NextResponse.json(
        { data: null, error: 'Phase name is required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      const mockPhase: ProposalPhase = {
        id: crypto.randomUUID(),
        proposal_id: proposalId,
        phase_number: body.phase_number || 1,
        phase_name: body.phase_name,
        description: body.description || null,
        timeline: body.timeline || null,
        start_date: body.start_date || null,
        end_date: body.end_date || null,
        deliverables: body.deliverables || null,
        objectives: body.objectives || null,
        goals: body.goals || null,
        amount: body.amount || 0,
        sort_order: body.sort_order || 0,
        visible_in_portal: body.visible_in_portal ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockPhase, error: null }, { status: 201 });
    }

    const phaseData: ProposalPhaseInsert = {
      proposal_id: proposalId,
      phase_number: body.phase_number || 1,
      phase_name: body.phase_name,
      description: body.description || null,
      timeline: body.timeline || null,
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      deliverables: body.deliverables || null,
      objectives: body.objectives || null,
      goals: body.goals || null,
      amount: body.amount || 0,
      sort_order: body.sort_order || 0,
      visible_in_portal: body.visible_in_portal ?? true,
    };

    const { data: phase, error } = await supabaseAdmin
      .from('proposal_phases')
      .insert(phaseData)
      .select()
      .single();

    if (error) {
      console.error('Error creating phase:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create phase' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: phase, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/proposals/[id]/phases:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/proposals/[id]/phases
 * Batch update all phases - replaces existing phases with new set (admin only)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: proposalId } = await params;

    // Check admin authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { phases } = body;

    if (!Array.isArray(phases)) {
      return NextResponse.json(
        { data: null, error: 'Phases array is required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      const mockPhases: ProposalPhase[] = phases.map((phase: Partial<ProposalPhase>, index: number) => ({
        id: phase.id || crypto.randomUUID(),
        proposal_id: proposalId,
        phase_number: phase.phase_number || index + 1,
        phase_name: phase.phase_name || '',
        description: phase.description || null,
        timeline: phase.timeline || null,
        start_date: phase.start_date || null,
        end_date: phase.end_date || null,
        deliverables: phase.deliverables || null,
        objectives: phase.objectives || null,
        goals: phase.goals || null,
        amount: phase.amount || 0,
        sort_order: phase.sort_order || index,
        visible_in_portal: phase.visible_in_portal ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      return NextResponse.json({ data: mockPhases, error: null });
    }

    // Delete existing phases
    const { error: deleteError } = await supabaseAdmin
      .from('proposal_phases')
      .delete()
      .eq('proposal_id', proposalId);

    if (deleteError) {
      console.error('Error deleting existing phases:', deleteError);
      return NextResponse.json(
        { data: null, error: 'Failed to update phases' },
        { status: 500 }
      );
    }

    // If no phases to add, return empty array
    if (phases.length === 0) {
      return NextResponse.json({ data: [], error: null });
    }

    // Insert new phases
    const phasesData: ProposalPhaseInsert[] = phases
      .filter((phase: Partial<ProposalPhase>) => phase.phase_name)
      .map((phase: Partial<ProposalPhase>, index: number) => ({
        proposal_id: proposalId,
        phase_number: phase.phase_number || index + 1,
        phase_name: phase.phase_name || '',
        description: phase.description || null,
        timeline: phase.timeline || null,
        start_date: phase.start_date || null,
        end_date: phase.end_date || null,
        deliverables: phase.deliverables || null,
        objectives: phase.objectives || null,
        goals: phase.goals || null,
        amount: typeof phase.amount === 'string' ? parseFloat(phase.amount) || 0 : phase.amount || 0,
        sort_order: index,
        visible_in_portal: phase.visible_in_portal ?? true,
      }));

    if (phasesData.length === 0) {
      return NextResponse.json({ data: [], error: null });
    }

    const { data: newPhases, error: insertError } = await supabaseAdmin
      .from('proposal_phases')
      .insert(phasesData)
      .select();

    if (insertError) {
      console.error('Error inserting phases:', insertError);
      return NextResponse.json(
        { data: null, error: 'Failed to create phases' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: newPhases, error: null });
  } catch (error) {
    console.error('Error in PUT /api/proposals/[id]/phases:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
