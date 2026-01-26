/**
 * Client Portal Projects API Route
 * Light Brand Consulting
 *
 * GET /api/client-portal/projects - Get client's projects list
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ClientProject } from '@/types/client-portal';

/**
 * GET /api/client-portal/projects
 */
export async function GET(request: NextRequest) {
  try {
    // Get client identifier from session/token
    const { searchParams } = new URL(request.url);
    const clientEmail = searchParams.get('email');
    const accessToken = searchParams.get('token');

    if (!clientEmail && !accessToken) {
      return NextResponse.json(
        { data: null, error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    // Query proposals for this client
    let query = supabaseAdmin
      .from('proposals')
      .select(`
        id,
        project_name,
        client_name,
        client_company,
        status,
        progress_percentage,
        start_date,
        estimated_completion_date,
        final_amount,
        proposal_phases (
          id,
          phase_name,
          phase_status
        ),
        milestones (
          id,
          milestone_name,
          amount,
          due_date,
          payment_status,
          paid_at
        )
      `)
      .in('status', ['active', 'agreement_signed', 'completed']);

    if (clientEmail) {
      query = query.eq('client_email', clientEmail);
    }
    if (accessToken) {
      query = query.eq('access_token', accessToken);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching client projects:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    // Transform data to ClientProject format
    const projects: ClientProject[] = (data || []).map((proposal) => {
      const phases = proposal.proposal_phases || [];
      const milestones = proposal.milestones || [];

      const completedPhases = phases.filter((p: { phase_status: string }) => p.phase_status === 'completed').length;
      const currentPhase = phases.find((p: { phase_status: string }) => p.phase_status === 'in_progress');
      const paidMilestones = milestones.filter((m: { payment_status: string }) => m.payment_status === 'paid');
      const pendingMilestones = milestones.filter((m: { payment_status: string }) => m.payment_status === 'pending');
      const nextMilestone = pendingMilestones.sort((a: { due_date: string }, b: { due_date: string }) =>
        (a.due_date || '').localeCompare(b.due_date || '')
      )[0];

      const totalPaid = paidMilestones.reduce((sum: number, m: { amount: number }) => sum + m.amount, 0);
      const totalDue = pendingMilestones.reduce((sum: number, m: { amount: number }) => sum + m.amount, 0);

      return {
        id: proposal.id,
        project_name: proposal.project_name,
        client_name: proposal.client_name,
        client_company: proposal.client_company,
        status: proposal.status,
        progress_percentage: proposal.progress_percentage || 0,
        start_date: proposal.start_date,
        estimated_completion_date: proposal.estimated_completion_date,
        current_phase: currentPhase?.phase_name || null,
        phases_completed: completedPhases,
        phases_total: phases.length,
        next_milestone: nextMilestone?.milestone_name || null,
        next_milestone_due: nextMilestone?.due_date || null,
        total_paid: totalPaid,
        total_due: totalDue,
        has_pending_action: pendingMilestones.length > 0,
      };
    });

    return NextResponse.json({ data: projects, error: null });
  } catch (error) {
    console.error('Error in GET /api/client-portal/projects:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
