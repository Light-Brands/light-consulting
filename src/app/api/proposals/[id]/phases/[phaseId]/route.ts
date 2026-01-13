/**
 * Proposal Phase Detail API Route
 * Light Brand Consulting
 *
 * PUT /api/proposals/[id]/phases/[phaseId] - Update a specific phase
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ProposalPhaseUpdate, ProposalPhase } from '@/types/proposals';

interface RouteParams {
  params: Promise<{ id: string; phaseId: string }>;
}

/**
 * PUT /api/proposals/[id]/phases/[phaseId]
 * Update a specific phase (admin only)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: proposalId, phaseId } = await params;

    // Check admin authentication
    const session = await getServerSession(authOptions);
    const isDevelopment = process.env.NODE_ENV === 'development';
    const bypassAuth = process.env.DISABLE_ADMIN_AUTH === 'true' || isDevelopment;

    if (!bypassAuth && !session) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const updateData: ProposalPhaseUpdate = {};

    // Only include fields that are provided
    const allowedFields: (keyof ProposalPhaseUpdate)[] = [
      'phase_number',
      'phase_name',
      'description',
      'timeline',
      'start_date',
      'end_date',
      'deliverables',
      'objectives',
      'goals',
      'amount',
      'sort_order',
      'visible_in_portal',
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        (updateData as Record<string, unknown>)[field] = body[field];
      }
    });

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      const mockPhase: ProposalPhase = {
        id: phaseId,
        proposal_id: proposalId,
        phase_number: body.phase_number ?? 1,
        phase_name: body.phase_name ?? 'Mock Phase',
        description: body.description ?? null,
        timeline: body.timeline ?? null,
        start_date: body.start_date ?? null,
        end_date: body.end_date ?? null,
        deliverables: body.deliverables ?? null,
        objectives: body.objectives ?? null,
        goals: body.goals ?? null,
        amount: body.amount ?? 0,
        sort_order: body.sort_order ?? 0,
        visible_in_portal: body.visible_in_portal ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockPhase, error: null });
    }

    // Verify the phase belongs to the proposal
    const { data: existingPhase, error: fetchError } = await supabaseAdmin
      .from('proposal_phases')
      .select('*')
      .eq('id', phaseId)
      .eq('proposal_id', proposalId)
      .single();

    if (fetchError || !existingPhase) {
      return NextResponse.json(
        { data: null, error: 'Phase not found' },
        { status: 404 }
      );
    }

    // Update the phase
    const { data, error } = await supabaseAdmin
      .from('proposal_phases')
      .update(updateData)
      .eq('id', phaseId)
      .eq('proposal_id', proposalId)
      .select()
      .single();

    if (error) {
      console.error('Error updating phase:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update phase' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PUT /api/proposals/[id]/phases/[phaseId]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
