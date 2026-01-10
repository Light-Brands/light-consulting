/**
 * Proposal Detail API Route
 * Light Brand Consulting
 *
 * GET /api/proposals/[id] - Get proposal details with all related data
 * PUT /api/proposals/[id] - Update proposal
 * DELETE /api/proposals/[id] - Delete proposal
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type {
  Proposal,
  ProposalWithDetails,
  ProposalUpdate,
  ProposalDetailApiResponse,
} from '@/types/proposals';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/proposals/[id]
 * Get proposal with all related data (admin only)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

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

    // If Supabase is not configured, return placeholder
    if (!isSupabaseConfigured()) {
      const mockProposal: ProposalWithDetails = {
        id,
        lead_submission_id: '1',
        client_name: 'John Smith',
        client_email: 'john@example.com',
        client_company: 'Acme Corp',
        client_phone: '555-0123',
        project_name: 'AI Transformation Initiative',
        project_overview: 'Comprehensive AI transformation for business operations',
        project_scope: 'Full-scale implementation of AI-powered systems',
        total_timeline: '6-9 months',
        start_date: '2024-02-01',
        estimated_completion_date: '2024-10-01',
        total_amount: 150000,
        discount_percentage: 10,
        final_amount: 135000,
        status: 'sent',
        access_token: 'abc123-def456-ghi789',
        created_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sent_at: new Date().toISOString(),
        viewed_at: null,
        agreement_signed_at: null,
        phases: [
          {
            id: '1',
            proposal_id: id,
            phase_number: 1,
            phase_name: 'Discovery & Analysis',
            description: 'Initial assessment and planning phase',
            timeline: '4-6 weeks',
            start_date: null,
            end_date: null,
            deliverables: [{ id: '1', name: 'Assessment Report' }],
            objectives: ['Understand current systems', 'Identify opportunities'],
            goals: ['Complete comprehensive audit'],
            amount: 25000,
            sort_order: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
        milestones: [
          {
            id: '1',
            proposal_id: id,
            phase_id: '1',
            milestone_name: 'Project Kickoff',
            description: 'Initial payment to begin the project',
            amount: 25000,
            due_date: '2024-02-01',
            payment_status: 'pending',
            milestone_status: 'not_started',
            invoice_number: null,
            paid_at: null,
            sort_order: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
        agreement: {
          id: '1',
          proposal_id: id,
          agreement_text: 'Standard consulting agreement terms...',
          terms: null,
          signed_by_name: null,
          signed_by_email: null,
          signature_data: null,
          signed_at: null,
          ip_address: null,
          user_agent: null,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        onboarding_form: null,
        dashboard_updates: [],
        comments: [],
      };
      return NextResponse.json({ data: mockProposal, error: null });
    }

    // Fetch proposal
    const { data: proposal, error: proposalError } = await supabaseAdmin
      .from('proposals')
      .select('*')
      .eq('id', id)
      .single();

    if (proposalError || !proposal) {
      return NextResponse.json(
        { data: null, error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Fetch related data in parallel
    const [
      { data: phases },
      { data: milestones },
      { data: agreement },
      { data: onboarding_form },
      { data: dashboard_updates },
      { data: comments },
      { data: lead_submission },
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
      supabaseAdmin
        .from('dashboard_updates')
        .select('*')
        .eq('proposal_id', id)
        .order('created_at', { ascending: false }),
      supabaseAdmin
        .from('proposal_comments')
        .select('*')
        .eq('proposal_id', id)
        .order('created_at', { ascending: false }),
      proposal.lead_submission_id
        ? supabaseAdmin
            .from('lead_submissions')
            .select('*')
            .eq('id', proposal.lead_submission_id)
            .single()
        : Promise.resolve({ data: null }),
    ]);

    const proposalWithDetails: ProposalWithDetails = {
      ...proposal,
      phases: phases || [],
      milestones: milestones || [],
      agreement: agreement || null,
      onboarding_form: onboarding_form || null,
      dashboard_updates: dashboard_updates || [],
      comments: comments || [],
      lead_submission: lead_submission || null,
    };

    const response: ProposalDetailApiResponse = {
      data: proposalWithDetails,
      error: null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/proposals/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/proposals/[id]
 * Update proposal (admin only)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

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
    const updateData: ProposalUpdate = {};

    // Only include fields that are provided
    const allowedFields: (keyof ProposalUpdate)[] = [
      'client_name',
      'client_email',
      'client_company',
      'client_phone',
      'project_name',
      'project_overview',
      'project_scope',
      'total_timeline',
      'start_date',
      'estimated_completion_date',
      'total_amount',
      'discount_percentage',
      'final_amount',
      'status',
      'sent_at',
      'viewed_at',
      'agreement_signed_at',
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        (updateData as Record<string, unknown>)[field] = body[field];
      }
    });

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      const mockProposal: Proposal = {
        id,
        lead_submission_id: null,
        client_name: updateData.client_name || 'John Smith',
        client_email: updateData.client_email || 'john@example.com',
        client_company: updateData.client_company || null,
        client_phone: updateData.client_phone || null,
        project_name: updateData.project_name || 'AI Transformation Initiative',
        project_overview: updateData.project_overview || null,
        project_scope: updateData.project_scope || null,
        total_timeline: updateData.total_timeline || null,
        start_date: updateData.start_date || null,
        estimated_completion_date: updateData.estimated_completion_date || null,
        total_amount: updateData.total_amount || 150000,
        discount_percentage: updateData.discount_percentage || 0,
        final_amount: updateData.final_amount || 150000,
        status: updateData.status || 'draft',
        access_token: 'abc123-def456-ghi789',
        created_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sent_at: updateData.sent_at || null,
        viewed_at: updateData.viewed_at || null,
        agreement_signed_at: updateData.agreement_signed_at || null,
      };
      return NextResponse.json({ data: mockProposal, error: null });
    }

    const { data, error } = await supabaseAdmin
      .from('proposals')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating proposal:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update proposal' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PUT /api/proposals/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/proposals/[id]
 * Delete proposal (admin only)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check admin authentication
    const session = await getServerSession(authOptions);
    const isDevelopment = process.env.NODE_ENV === 'development';
    const bypassAuth = process.env.DISABLE_ADMIN_AUTH === 'true' || isDevelopment;

    if (!bypassAuth && !session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ success: true, error: null });
    }

    // Delete proposal (cascade will handle related tables)
    const { error } = await supabaseAdmin
      .from('proposals')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting proposal:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete proposal' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/proposals/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
