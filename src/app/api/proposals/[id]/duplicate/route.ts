/**
 * Proposal Duplicate API Route
 * Light Brand Consulting
 *
 * POST /api/proposals/[id]/duplicate - Duplicate a proposal with all related data
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type {
  Proposal,
  ProposalPhase,
  Milestone,
  Agreement,
  OnboardingForm,
  ProposalWithDetails,
  ProposalInsert,
  ProposalPhaseInsert,
  MilestoneInsert,
  AgreementInsert,
  OnboardingFormInsert,
} from '@/types/proposals';
import { DEFAULT_PORTAL_SECTIONS } from '@/types/proposals';

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface DuplicateRequestBody {
  client_name?: string;
  client_email?: string;
  client_company?: string;
  client_phone?: string;
  project_name?: string;
}

/**
 * POST /api/proposals/[id]/duplicate
 * Duplicate a proposal with all related data (admin only)
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check admin authentication
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse optional request body for client info overrides
    let body: DuplicateRequestBody = {};
    try {
      body = await request.json();
    } catch {
      // Body is optional, ignore parsing errors
    }

    // If Supabase is not configured, return mock response
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    // Fetch the original proposal with all related data
    const { data: proposalData, error: fetchError } = await supabaseAdmin
      .from('proposals')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !proposalData) {
      return NextResponse.json(
        { data: null, error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Type assertion for proposal data
    const originalProposal = proposalData as unknown as Proposal;

    // Fetch related data in parallel
    const [
      { data: phasesData },
      { data: milestonesData },
      { data: agreementData },
      { data: onboardingData },
    ] = await Promise.all([
      supabaseAdmin
        .from('proposal_phases')
        .select('*')
        .eq('proposal_id', id)
        .order('sort_order'),
      supabaseAdmin
        .from('milestones')
        .select('*')
        .eq('proposal_id', id)
        .order('sort_order'),
      supabaseAdmin
        .from('agreements')
        .select('*')
        .eq('proposal_id', id)
        .single(),
      supabaseAdmin
        .from('onboarding_forms')
        .select('*')
        .eq('proposal_id', id)
        .single(),
    ]);

    // Type assertions for related data
    const originalPhases = phasesData as unknown as ProposalPhase[] | null;
    const originalMilestones = milestonesData as unknown as Milestone[] | null;
    const originalAgreement = agreementData as unknown as Agreement | null;
    const originalOnboardingForm = onboardingData as unknown as OnboardingForm | null;

    // Create new proposal (with new access_token, reset to draft status)
    const newProposalData: ProposalInsert = {
      lead_submission_id: null, // Don't link to original lead
      client_id: originalProposal.client_id,
      project_id: null, // Don't link to original project
      // Client info - use overrides if provided, otherwise use original
      client_name: body.client_name || originalProposal.client_name,
      client_email: body.client_email || originalProposal.client_email,
      client_company: body.client_company !== undefined ? body.client_company : originalProposal.client_company,
      client_phone: body.client_phone !== undefined ? body.client_phone : originalProposal.client_phone,
      // Project info
      project_name: body.project_name || `Copy of ${originalProposal.project_name}`,
      project_overview: originalProposal.project_overview,
      project_scope: originalProposal.project_scope,
      total_timeline: originalProposal.total_timeline,
      start_date: null, // Reset dates
      estimated_completion_date: null,
      // Pricing
      total_amount: originalProposal.total_amount,
      discount_percentage: originalProposal.discount_percentage,
      final_amount: originalProposal.final_amount,
      // Status - reset to draft
      status: 'draft',
      portal_password: originalProposal.portal_password,
      // Reset referrer tracking
      referrer_type: null,
      referrer_user_id: null,
      referrer_source: null,
    };

    const { data: newProposalData2, error: createError } = await supabaseAdmin
      .from('proposals')
      .insert(newProposalData as never)
      .select()
      .single();

    if (createError || !newProposalData2) {
      console.error('Error creating duplicate proposal:', createError);
      return NextResponse.json(
        { data: null, error: 'Failed to create duplicate proposal' },
        { status: 500 }
      );
    }

    const newProposal = newProposalData2 as unknown as Proposal;

    // Create a mapping of old phase IDs to new phase IDs for milestone linking
    const phaseIdMapping: Record<string, string> = {};

    // Duplicate phases
    if (originalPhases && originalPhases.length > 0) {
      const phasesData: ProposalPhaseInsert[] = originalPhases.map((phase) => ({
        proposal_id: newProposal.id,
        phase_number: phase.phase_number,
        phase_name: phase.phase_name,
        description: phase.description,
        timeline: phase.timeline,
        start_date: null, // Reset dates
        end_date: null,
        deliverables: phase.deliverables,
        objectives: phase.objectives,
        goals: phase.goals,
        amount: phase.amount,
        sort_order: phase.sort_order,
        visible_in_portal: phase.visible_in_portal,
        phase_status: 'not_started', // Reset status
      }));

      const { data: newPhasesData, error: phasesError } = await supabaseAdmin
        .from('proposal_phases')
        .insert(phasesData as never)
        .select('id, phase_number');

      if (phasesError) {
        console.error('Error duplicating phases:', phasesError);
        // Continue anyway - phases can be added later
      } else if (newPhasesData) {
        // Build phase ID mapping
        const newPhasesTyped = newPhasesData as unknown as Array<{ id: string; phase_number: number }>;
        newPhasesTyped.forEach((newPhase, index) => {
          if (originalPhases[index]) {
            phaseIdMapping[originalPhases[index].id] = newPhase.id;
          }
        });
      }
    }

    // Duplicate milestones
    if (originalMilestones && originalMilestones.length > 0) {
      const milestonesData: MilestoneInsert[] = originalMilestones.map((milestone) => ({
        proposal_id: newProposal.id,
        phase_id: milestone.phase_id ? phaseIdMapping[milestone.phase_id] || null : null,
        milestone_name: milestone.milestone_name,
        description: milestone.description,
        amount: milestone.amount,
        due_date: null, // Reset dates
        payment_status: 'pending', // Reset payment status
        milestone_status: 'not_started', // Reset status
        invoice_number: null, // Reset invoice
        payment_link: null,
        sort_order: milestone.sort_order,
        // Reset Stripe fields
        stripe_checkout_session_id: null,
        stripe_payment_intent_id: null,
        stripe_payment_url: null,
      }));

      const { error: milestonesError } = await supabaseAdmin
        .from('milestones')
        .insert(milestonesData as never);

      if (milestonesError) {
        console.error('Error duplicating milestones:', milestonesError);
        // Continue anyway - milestones can be added later
      }
    }

    // Duplicate agreement (unsigned, pending status - defaults handled by DB)
    if (originalAgreement) {
      const agreementInsertData: AgreementInsert = {
        proposal_id: newProposal.id,
        agreement_text: originalAgreement.agreement_text,
        terms: originalAgreement.terms,
      };

      const { error: agreementError } = await supabaseAdmin
        .from('agreements')
        .insert(agreementInsertData as never);

      if (agreementError) {
        console.error('Error duplicating agreement:', agreementError);
        // Continue anyway - agreement can be added later
      }
    }

    // Duplicate onboarding form config (empty form data - defaults handled by DB)
    if (originalOnboardingForm) {
      const onboardingInsertData: OnboardingFormInsert = {
        proposal_id: newProposal.id,
        form_config: originalOnboardingForm.form_config,
        form_data: null, // Reset form data
      };

      const { error: onboardingError } = await supabaseAdmin
        .from('onboarding_forms')
        .insert(onboardingInsertData as never);

      if (onboardingError) {
        console.error('Error duplicating onboarding form:', onboardingError);
        // Continue anyway - onboarding form can be added later
      }
    }

    // Fetch the complete new proposal with all related data
    const [
      { data: finalPhasesData },
      { data: finalMilestonesData },
      { data: finalAgreementData },
      { data: finalOnboardingData },
    ] = await Promise.all([
      supabaseAdmin
        .from('proposal_phases')
        .select('*')
        .eq('proposal_id', newProposal.id)
        .order('sort_order'),
      supabaseAdmin
        .from('milestones')
        .select('*')
        .eq('proposal_id', newProposal.id)
        .order('sort_order'),
      supabaseAdmin
        .from('agreements')
        .select('*')
        .eq('proposal_id', newProposal.id)
        .single(),
      supabaseAdmin
        .from('onboarding_forms')
        .select('*')
        .eq('proposal_id', newProposal.id)
        .single(),
    ]);

    const proposalWithDetails: ProposalWithDetails = {
      ...newProposal,
      portal_sections: newProposal.portal_sections || DEFAULT_PORTAL_SECTIONS,
      phases: (finalPhasesData as unknown as ProposalPhase[]) || [],
      milestones: (finalMilestonesData as unknown as Milestone[]) || [],
      agreement: (finalAgreementData as unknown as Agreement) || null,
      onboarding_form: (finalOnboardingData as unknown as OnboardingForm) || null,
      dashboard_updates: [],
      comments: [],
    };

    return NextResponse.json({ data: proposalWithDetails, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/proposals/[id]/duplicate:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
