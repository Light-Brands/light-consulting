/**
 * Proposal Token Access API Route
 * Light Brand Consulting
 *
 * GET /api/proposals/token/[accessToken] - Get proposal by access token (public)
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ProposalWithDetails, ProposalDetailApiResponse } from '@/types/proposals';
import { getProposalByToken } from '@/data/proposals';

interface RouteParams {
  params: Promise<{ accessToken: string }>;
}

/**
 * GET /api/proposals/token/[accessToken]
 * Get proposal by access token (public - no auth required)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { accessToken } = await params;

    if (!accessToken) {
      return NextResponse.json(
        { data: null, error: 'Access token is required' },
        { status: 400 }
      );
    }

    // Check for static proposal first
    const staticProposal = getProposalByToken(accessToken);
    if (staticProposal) {
      return NextResponse.json({ data: staticProposal, error: null });
    }

    // If Supabase is not configured, return placeholder
    if (!isSupabaseConfigured()) {
      const mockProposal: ProposalWithDetails = {
        id: '1',
        lead_submission_id: null,
        client_name: 'John Smith',
        client_email: 'john@example.com',
        client_company: 'Acme Corp',
        client_phone: '555-0123',
        project_name: 'AI Transformation Initiative',
        project_overview: `
# Executive Summary

Light Brand Consulting is pleased to present this proposal for your AI Transformation Initiative. This comprehensive engagement will modernize your business operations through strategic AI implementation.

## Key Benefits

- **Increased Efficiency**: Reduce manual processes by 60%
- **Cost Savings**: Projected ROI of 300% within 18 months
- **Competitive Advantage**: Position your business at the forefront of innovation
        `.trim(),
        project_scope: `
## Scope of Work

This engagement covers the full lifecycle of AI transformation:

1. **Assessment Phase**: Current state analysis and opportunity identification
2. **Strategy Phase**: Roadmap development and prioritization
3. **Implementation Phase**: System development and integration
4. **Optimization Phase**: Performance tuning and team training
        `.trim(),
        total_timeline: '6-9 months',
        start_date: '2024-02-01',
        estimated_completion_date: '2024-10-01',
        total_amount: 150000,
        discount_percentage: 10,
        final_amount: 135000,
        status: 'sent',
        access_token: accessToken,
        created_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sent_at: new Date().toISOString(),
        viewed_at: null,
        agreement_signed_at: null,
        phases: [
          {
            id: '1',
            proposal_id: '1',
            phase_number: 1,
            phase_name: 'Discovery & Analysis',
            description: 'Comprehensive assessment of current systems, processes, and AI readiness. We identify key opportunities and create a detailed roadmap.',
            timeline: '4-6 weeks',
            start_date: null,
            end_date: null,
            deliverables: [
              { id: '1', name: 'Current State Assessment Report' },
              { id: '2', name: 'AI Readiness Scorecard' },
              { id: '3', name: 'Opportunity Matrix' },
            ],
            objectives: [
              'Map existing workflows and pain points',
              'Assess data infrastructure and quality',
              'Identify quick wins and long-term opportunities',
            ],
            goals: ['Complete comprehensive technical and business audit'],
            amount: 25000,
            sort_order: 0,
            visible_in_portal: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            proposal_id: '1',
            phase_number: 2,
            phase_name: 'Strategy & Architecture',
            description: 'Design the optimal AI architecture and create a phased implementation strategy aligned with business objectives.',
            timeline: '3-4 weeks',
            start_date: null,
            end_date: null,
            deliverables: [
              { id: '4', name: 'AI Strategy Document' },
              { id: '5', name: 'Technical Architecture Blueprint' },
              { id: '6', name: 'Implementation Roadmap' },
            ],
            objectives: [
              'Define target state architecture',
              'Prioritize implementation phases',
              'Establish success metrics and KPIs',
            ],
            goals: ['Finalize strategic direction and technical approach'],
            amount: 35000,
            sort_order: 1,
            visible_in_portal: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            proposal_id: '1',
            phase_number: 3,
            phase_name: 'Implementation & Integration',
            description: 'Build and deploy AI solutions, integrate with existing systems, and ensure seamless operation.',
            timeline: '12-16 weeks',
            start_date: null,
            end_date: null,
            deliverables: [
              { id: '7', name: 'AI-Powered Automation Systems' },
              { id: '8', name: 'Integration Documentation' },
              { id: '9', name: 'User Training Materials' },
            ],
            objectives: [
              'Develop and test AI solutions',
              'Integrate with existing infrastructure',
              'Train team on new systems',
            ],
            goals: ['Successful deployment of all planned AI solutions'],
            amount: 60000,
            sort_order: 2,
            visible_in_portal: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '4',
            proposal_id: '1',
            phase_number: 4,
            phase_name: 'Optimization & Handoff',
            description: 'Fine-tune performance, complete knowledge transfer, and establish ongoing support structure.',
            timeline: '4-6 weeks',
            start_date: null,
            end_date: null,
            deliverables: [
              { id: '10', name: 'Performance Optimization Report' },
              { id: '11', name: 'Operations Playbook' },
              { id: '12', name: 'Maintenance & Support Guide' },
            ],
            objectives: [
              'Optimize system performance',
              'Complete team enablement',
              'Establish support processes',
            ],
            goals: ['Full operational handoff to internal team'],
            amount: 15000,
            sort_order: 3,
            visible_in_portal: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
        milestones: [
          {
            id: '1',
            proposal_id: '1',
            phase_id: '1',
            milestone_name: 'Project Kickoff',
            description: 'Initial payment to commence the engagement',
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
          {
            id: '2',
            proposal_id: '1',
            phase_id: '2',
            milestone_name: 'Strategy Completion',
            description: 'Payment upon delivery of strategy documents',
            amount: 35000,
            due_date: '2024-03-15',
            payment_status: 'pending',
            milestone_status: 'not_started',
            invoice_number: null,
            paid_at: null,
            sort_order: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            proposal_id: '1',
            phase_id: '3',
            milestone_name: 'Implementation Midpoint',
            description: 'Midpoint payment during implementation',
            amount: 30000,
            due_date: '2024-05-01',
            payment_status: 'pending',
            milestone_status: 'not_started',
            invoice_number: null,
            paid_at: null,
            sort_order: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '4',
            proposal_id: '1',
            phase_id: '3',
            milestone_name: 'Implementation Complete',
            description: 'Payment upon successful deployment',
            amount: 30000,
            due_date: '2024-08-01',
            payment_status: 'pending',
            milestone_status: 'not_started',
            invoice_number: null,
            paid_at: null,
            sort_order: 3,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '5',
            proposal_id: '1',
            phase_id: '4',
            milestone_name: 'Project Completion',
            description: 'Final payment upon project handoff',
            amount: 15000,
            due_date: '2024-10-01',
            payment_status: 'pending',
            milestone_status: 'not_started',
            invoice_number: null,
            paid_at: null,
            sort_order: 4,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
        agreement: {
          id: '1',
          proposal_id: '1',
          agreement_text: `
# Consulting Services Agreement

This Consulting Services Agreement ("Agreement") is entered into by and between Light Brand Consulting ("Consultant") and the Client identified in the associated proposal.

## 1. Services

Consultant agrees to provide the services described in the proposal attached hereto. The services will be performed in a professional and workmanlike manner.

## 2. Compensation

Client agrees to pay Consultant the fees set forth in the proposal according to the milestone schedule provided.

## 3. Term

This Agreement shall commence on the start date indicated in the proposal and continue until all services are completed, unless earlier terminated.

## 4. Confidentiality

Both parties agree to maintain the confidentiality of proprietary information shared during the engagement.

## 5. Intellectual Property

Upon full payment, all deliverables created specifically for Client shall become Client's property. Consultant retains rights to general methodologies and pre-existing materials.

## 6. Limitation of Liability

Consultant's liability shall be limited to the total fees paid under this Agreement.

## 7. Termination

Either party may terminate this Agreement with 30 days written notice. Client shall pay for all services rendered through the termination date.

## 8. General Provisions

This Agreement constitutes the entire agreement between the parties and supersedes all prior discussions and agreements.

By signing below, both parties agree to the terms and conditions set forth in this Agreement.
          `.trim(),
          terms: [
            { id: '1', title: 'Payment Terms', content: 'Net 15 from invoice date' },
            { id: '2', title: 'Warranty', content: '30-day warranty on all deliverables' },
            { id: '3', title: 'Support', content: '60 days of post-project support included' },
          ],
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
        onboarding_form: {
          id: '1',
          proposal_id: '1',
          form_config: [
            { id: '1', type: 'text', label: 'Primary Contact Name', required: true },
            { id: '2', type: 'text', label: 'Primary Contact Email', required: true },
            { id: '3', type: 'text', label: 'Primary Contact Phone', required: true },
            { id: '4', type: 'text', label: 'Billing Address', required: true },
            { id: '5', type: 'textarea', label: 'Current Systems/Tools in Use', placeholder: 'List your current software and tools...' },
            { id: '6', type: 'textarea', label: 'Key Stakeholders', placeholder: 'Who should be involved in this project?' },
            { id: '7', type: 'select', label: 'Preferred Communication Method', options: ['Email', 'Phone', 'Slack', 'Microsoft Teams'] },
            { id: '8', type: 'textarea', label: 'Additional Notes or Requirements', placeholder: 'Any other information we should know...' },
          ],
          form_data: null,
          status: 'pending',
          submitted_at: null,
          reviewed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        dashboard_updates: [],
        comments: [],
      };
      return NextResponse.json({ data: mockProposal, error: null });
    }

    // Fetch proposal by access token
    const { data: proposal, error: proposalError } = await supabaseAdmin
      .from('proposals')
      .select('*')
      .eq('access_token', accessToken)
      .single();

    if (proposalError || !proposal) {
      return NextResponse.json(
        { data: null, error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Mark as viewed if first view
    if (!proposal.viewed_at) {
      await supabaseAdmin
        .from('proposals')
        .update({ viewed_at: new Date().toISOString(), status: 'viewed' })
        .eq('id', proposal.id);

      proposal.viewed_at = new Date().toISOString();
      proposal.status = 'viewed';
    }

    // Fetch related data in parallel
    const [
      { data: phases },
      { data: milestones },
      { data: agreement },
      { data: onboarding_form },
      { data: dashboard_updates },
      { data: comments },
    ] = await Promise.all([
      supabaseAdmin
        .from('proposal_phases')
        .select('*')
        .eq('proposal_id', proposal.id)
        .eq('visible_in_portal', true)
        .order('sort_order'),
      supabaseAdmin
        .from('milestones')
        .select('*')
        .eq('proposal_id', proposal.id)
        .order('sort_order'),
      supabaseAdmin
        .from('agreements')
        .select('*')
        .eq('proposal_id', proposal.id)
        .single(),
      supabaseAdmin
        .from('onboarding_forms')
        .select('*')
        .eq('proposal_id', proposal.id)
        .single(),
      supabaseAdmin
        .from('dashboard_updates')
        .select('*')
        .eq('proposal_id', proposal.id)
        .order('created_at', { ascending: false }),
      supabaseAdmin
        .from('proposal_comments')
        .select('*')
        .eq('proposal_id', proposal.id)
        .order('created_at', { ascending: false }),
    ]);

    const proposalWithDetails: ProposalWithDetails = {
      ...proposal,
      phases: phases || [],
      milestones: milestones || [],
      agreement: agreement || null,
      onboarding_form: onboarding_form || null,
      dashboard_updates: dashboard_updates || [],
      comments: comments || [],
    };

    const response: ProposalDetailApiResponse = {
      data: proposalWithDetails,
      error: null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/proposals/token/[accessToken]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
