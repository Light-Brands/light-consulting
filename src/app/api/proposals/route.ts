/**
 * Proposals API Route
 * Light Brand Consulting
 *
 * POST /api/proposals - Create new proposal
 * GET /api/proposals - List all proposals (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type {
  Proposal,
  ProposalInsert,
  ProposalPhaseInsert,
  MilestoneInsert,
  AgreementInsert,
  OnboardingFormInsert,
  ProposalsApiResponse,
} from '@/types/proposals';
import { CHO_VENTURES_TOKEN } from '@/data/proposals';

// Placeholder data for development
const placeholderProposals: Proposal[] = [
  {
    id: 'cho-ventures-001',
    lead_submission_id: null,
    client_name: 'Tony Cho',
    client_email: 'tony@choventures.com',
    client_company: 'Cho Ventures',
    client_phone: null,
    project_name: 'AI Readiness Diagnostic',
    project_overview: 'Full ecosystem map, opportunity identification, and strategic AI roadmap',
    project_scope: 'Ecosystem mapping, AI opportunity matrix, connection architecture, priority recommendation',
    total_timeline: '2-3 weeks',
    start_date: null,
    estimated_completion_date: null,
    total_amount: 5000,
    discount_percentage: 0,
    final_amount: 5000,
    status: 'sent',
    access_token: CHO_VENTURES_TOKEN,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sent_at: new Date().toISOString(),
    viewed_at: null,
    agreement_signed_at: null,
  },
];

/**
 * POST /api/proposals
 * Create a new proposal (admin only)
 */
export async function POST(request: NextRequest) {
  try {
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

    // Validate required fields
    const {
      client_name,
      client_email,
      project_name,
      total_amount,
      final_amount,
      phases,
      milestones,
      agreement_text,
      onboarding_config,
    } = body;

    if (!client_name || !client_email || !project_name) {
      return NextResponse.json(
        { data: null, error: 'Client name, email, and project name are required' },
        { status: 400 }
      );
    }

    if (total_amount === undefined || final_amount === undefined) {
      return NextResponse.json(
        { data: null, error: 'Total amount and final amount are required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      const mockProposal: Proposal = {
        id: crypto.randomUUID(),
        lead_submission_id: body.lead_submission_id || null,
        client_name,
        client_email,
        client_company: body.client_company || null,
        client_phone: body.client_phone || null,
        project_name,
        project_overview: body.project_overview || null,
        project_scope: body.project_scope || null,
        total_timeline: body.total_timeline || null,
        start_date: body.start_date || null,
        estimated_completion_date: body.estimated_completion_date || null,
        total_amount,
        discount_percentage: body.discount_percentage || 0,
        final_amount,
        status: body.status || 'draft',
        access_token: crypto.randomUUID(),
        created_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sent_at: null,
        viewed_at: null,
        agreement_signed_at: null,
      };
      return NextResponse.json({ data: mockProposal, error: null }, { status: 201 });
    }

    // Create proposal
    const proposalData: ProposalInsert = {
      lead_submission_id: body.lead_submission_id || null,
      client_name,
      client_email,
      client_company: body.client_company || null,
      client_phone: body.client_phone || null,
      project_name,
      project_overview: body.project_overview || null,
      project_scope: body.project_scope || null,
      total_timeline: body.total_timeline || null,
      start_date: body.start_date || null,
      estimated_completion_date: body.estimated_completion_date || null,
      total_amount,
      discount_percentage: body.discount_percentage || 0,
      final_amount,
      status: body.status || 'draft',
    };

    const { data: proposal, error: proposalError } = await supabaseAdmin
      .from('proposals')
      .insert(proposalData)
      .select()
      .single();

    if (proposalError) {
      console.error('Error creating proposal:', proposalError);
      return NextResponse.json(
        { data: null, error: 'Failed to create proposal' },
        { status: 500 }
      );
    }

    // Create phases if provided
    if (phases && Array.isArray(phases) && phases.length > 0) {
      const phasesData: ProposalPhaseInsert[] = phases.map((phase: ProposalPhaseInsert, index: number) => ({
        proposal_id: proposal.id,
        phase_number: phase.phase_number || index + 1,
        phase_name: phase.phase_name,
        description: phase.description || null,
        timeline: phase.timeline || null,
        start_date: phase.start_date || null,
        end_date: phase.end_date || null,
        deliverables: phase.deliverables || null,
        objectives: phase.objectives || null,
        goals: phase.goals || null,
        amount: phase.amount,
        sort_order: index,
      }));

      const { error: phasesError } = await supabaseAdmin
        .from('proposal_phases')
        .insert(phasesData);

      if (phasesError) {
        console.error('Error creating phases:', phasesError);
      }
    }

    // Create milestones if provided
    if (milestones && Array.isArray(milestones) && milestones.length > 0) {
      const milestonesData: MilestoneInsert[] = milestones.map((milestone: MilestoneInsert, index: number) => ({
        proposal_id: proposal.id,
        phase_id: milestone.phase_id || null,
        milestone_name: milestone.milestone_name,
        description: milestone.description || null,
        amount: milestone.amount,
        due_date: milestone.due_date || null,
        payment_status: 'pending',
        milestone_status: 'not_started',
        sort_order: index,
      }));

      const { error: milestonesError } = await supabaseAdmin
        .from('milestones')
        .insert(milestonesData);

      if (milestonesError) {
        console.error('Error creating milestones:', milestonesError);
      }
    }

    // Create agreement if text provided
    if (agreement_text) {
      const agreementData: AgreementInsert = {
        proposal_id: proposal.id,
        agreement_text,
        terms: body.agreement_terms || null,
      };

      const { error: agreementError } = await supabaseAdmin
        .from('agreements')
        .insert(agreementData);

      if (agreementError) {
        console.error('Error creating agreement:', agreementError);
      }
    }

    // Create onboarding form config if provided
    if (onboarding_config) {
      const onboardingData: OnboardingFormInsert = {
        proposal_id: proposal.id,
        form_config: onboarding_config,
      };

      const { error: onboardingError } = await supabaseAdmin
        .from('onboarding_forms')
        .insert(onboardingData);

      if (onboardingError) {
        console.error('Error creating onboarding form:', onboardingError);
      }
    }

    // Update lead status if linked
    if (body.lead_submission_id) {
      await supabaseAdmin
        .from('lead_submissions')
        .update({ status: 'proposal_sent' })
        .eq('id', body.lead_submission_id);
    }

    return NextResponse.json({ data: proposal, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/proposals:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/proposals
 * List all proposals (admin only)
 */
export async function GET(request: NextRequest) {
  try {
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    // If Supabase is not configured, return placeholder data
    if (!isSupabaseConfigured()) {
      let filteredProposals = [...placeholderProposals];

      if (status) {
        filteredProposals = filteredProposals.filter((p) => p.status === status);
      }
      if (limit) {
        filteredProposals = filteredProposals.slice(0, parseInt(limit, 10));
      }

      const response: ProposalsApiResponse = {
        data: filteredProposals,
        error: null,
        count: filteredProposals.length,
      };
      return NextResponse.json(response);
    }

    // Build query
    let query = supabaseAdmin
      .from('proposals')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }
    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching proposals:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch proposals' },
        { status: 500 }
      );
    }

    const response: ProposalsApiResponse = {
      data: data as Proposal[],
      error: null,
      count: count || 0,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/proposals:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
