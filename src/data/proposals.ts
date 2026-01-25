/**
 * Proposals Data
 * Light Brand Consulting
 *
 * Static proposal data for client portals
 */

import type { ProposalWithDetails } from '@/types/proposals';

// Token for Cho Ventures AI Readiness Diagnostic
export const CHO_VENTURES_TOKEN = 'cho-ventures-ai-readiness-2026';

// Token for Influex AI Platform Transformation
export const INFLUEX_TOKEN = 'influex-ai-platform-2026';

export const proposals: Record<string, ProposalWithDetails> = {
  [CHO_VENTURES_TOKEN]: {
    id: 'cho-ventures-001',
    lead_submission_id: null,
    client_name: 'Tony Cho',
    client_email: 'tony@choventures.com',
    client_company: 'Cho Ventures',
    client_phone: null,
    project_name: 'AI Readiness Diagnostic',
    project_overview: `
# AI Readiness Diagnostic

A comprehensive analysis of your current operations, technology stack, and business processes to identify AI integration opportunities and create a strategic roadmap for implementation.

## What You Get

- **Full Ecosystem Map** — Visual documentation of your current systems, workflows, and data flows
- **Integration Architecture** — How everything connects and where AI can plug in
- **Opportunity Catalog** — Complete inventory of AI applications you could build
- **Priority Starter** — One clear, high-impact starting point to begin building

## Philosophy: Build As You Grow

Start simple. Prove value. Expand from there.

We identify the single best entry point that delivers immediate value while laying the foundation for everything else on the roadmap.
    `.trim(),
    project_scope: `
## Deliverables

1. **Ecosystem Map**
   - Current state documentation
   - System inventory and data flows
   - Process workflows
   - Integration points

2. **AI Opportunity Matrix**
   - Full catalog of potential AI applications
   - Feasibility assessment for each
   - Expected impact ratings
   - Implementation complexity scores

3. **Connection Architecture**
   - How systems link together
   - Data dependencies
   - API and integration requirements
   - Foundation for future builds

4. **Priority Recommendation**
   - Recommended starting project
   - Why this one first
   - Expected timeline and resources
   - Success metrics

5. **Findings Presentation**
   - Live walkthrough of all deliverables
   - Q&A session
   - Strategic discussion
    `.trim(),
    total_timeline: '2-3 weeks',
    start_date: null,
    estimated_completion_date: null,
    total_amount: 5000,
    discount_percentage: 0,
    final_amount: 5000,
    status: 'sent',
    access_token: CHO_VENTURES_TOKEN,
    portal_sections: {
      proposal: true,
      agreement: true,
      billing: true,
      onboarding: true,
      dashboard: true,
    },
    portal_password: '8888',
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sent_at: new Date().toISOString(),
    viewed_at: null,
    agreement_signed_at: null,
    phases: [
      {
        id: 'cho-phase-1',
        proposal_id: 'cho-ventures-001',
        phase_number: 1,
        phase_name: 'AI Readiness Diagnostic',
        description: 'Complete ecosystem analysis, opportunity identification, and strategic roadmap development with clear starting point recommendation.',
        timeline: '2-3 weeks',
        start_date: null,
        end_date: null,
        deliverables: [
          { id: 'd1', name: 'Full Ecosystem Map' },
          { id: 'd2', name: 'AI Opportunity Matrix' },
          { id: 'd3', name: 'Connection Architecture' },
          { id: 'd4', name: 'Priority Recommendation' },
          { id: 'd5', name: 'Findings Presentation' },
        ],
        objectives: [
          'Map current systems and workflows',
          'Identify all AI integration opportunities',
          'Document how everything connects',
          'Determine optimal starting point',
        ],
        goals: ['Deliver actionable AI roadmap with clear first step'],
        amount: 5000,
        sort_order: 0,
        visible_in_portal: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
    milestones: [
      {
        id: 'cho-milestone-1',
        proposal_id: 'cho-ventures-001',
        phase_id: 'cho-phase-1',
        milestone_name: 'AI Readiness Diagnostic',
        description: 'Complete AI readiness diagnostic including ecosystem mapping, opportunity analysis, and strategic recommendations',
        amount: 5000,
        due_date: null,
        payment_status: 'pending',
        milestone_status: 'not_started',
        invoice_number: null,
        payment_link: 'https://buy.stripe.com/8x28wQ82R7el01mfX1bo400',
        paid_at: null,
        sort_order: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
    agreement: {
      id: 'cho-agreement-1',
      proposal_id: 'cho-ventures-001',
      agreement_text: `
# Consulting Services Agreement

This Consulting Services Agreement ("Agreement") is entered into by and between Light Brand Consulting ("Consultant") and Cho Ventures ("Client").

## 1. Services

Consultant agrees to provide the AI Readiness Diagnostic services described in the proposal. Services include ecosystem mapping, opportunity analysis, and strategic recommendations.

## 2. Compensation

Client agrees to pay Consultant $5,000 USD upon signing this agreement.

## 3. Timeline

Following receipt of payment, Consultant will complete the diagnostic within 2-3 weeks and schedule a presentation call at Client's earliest convenience.

## 4. Deliverables

Upon completion, Client will receive:
- Full Ecosystem Map
- AI Opportunity Matrix
- Connection Architecture Documentation
- Priority Recommendation Report
- Live Findings Presentation

## 5. Confidentiality

Both parties agree to maintain the confidentiality of proprietary information shared during the engagement.

## 6. Intellectual Property

Upon full payment, all deliverables created specifically for Client shall become Client's property.

By signing below, both parties agree to the terms set forth in this Agreement.
      `.trim(),
      terms: [
        { id: 't1', title: 'Payment Terms', content: 'Due upon agreement signing' },
        { id: 't2', title: 'Delivery', content: 'Findings presentation scheduled after payment receipt' },
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
      id: 'cho-onboarding-1',
      proposal_id: 'cho-ventures-001',
      form_config: [
        { id: 'f1', type: 'text', label: 'Primary Contact Name', required: true },
        { id: 'f2', type: 'text', label: 'Primary Contact Email', required: true },
        { id: 'f3', type: 'text', label: 'Primary Contact Phone', required: false },
        { id: 'f4', type: 'textarea', label: 'Current Systems/Tools in Use', placeholder: 'List your current software, platforms, and tools...' },
        { id: 'f5', type: 'textarea', label: 'Key Business Processes', placeholder: 'Describe core workflows we should understand...' },
        { id: 'f6', type: 'textarea', label: 'Initial Areas of Interest', placeholder: 'Any specific areas you want us to focus on?' },
        { id: 'f7', type: 'select', label: 'Preferred Presentation Format', options: ['Video Call', 'In-Person', 'Either works'] },
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
  },

  [INFLUEX_TOKEN]: {
    id: 'influex-001',
    lead_submission_id: null,
    client_name: 'Dmitriy Kozlov',
    client_email: 'dima@influex.com',
    client_company: 'Influex',
    client_phone: null,
    project_name: 'AI Platform Transformation - Phase 1',
    project_overview: `
# AI Readiness Diagnostic

A comprehensive analysis of Influex's current WordPress-based operations, technology stack, and brand development workflows to architect the transformation to an AI-powered brand development platform.

## What You Get

- **Full Ecosystem Map** — Visual documentation of your current 200+ site WordPress infrastructure, workflows, and data flows
- **Technical Assessment** — WordPress architecture analysis and migration requirements
- **AI Opportunity Matrix** — Complete inventory of AI applications for brand development automation
- **Connection Architecture** — How everything connects and where AI can transform operations
- **Priority Recommendation** — One clear, high-impact starting point for the AI Brand Builder

## Philosophy: Build As You Grow

Start simple. Prove value. Expand from there.

We identify the single best entry point that delivers immediate value while laying the foundation for your AI-powered brand development platform.
    `.trim(),
    project_scope: `
## Deliverables

1. **Ecosystem Map**
   - Current WordPress infrastructure documentation
   - 200+ site inventory and maintenance workflows
   - Brand development process flows
   - Integration points and dependencies

2. **Technical Assessment**
   - WordPress technical debt analysis
   - Migration complexity evaluation
   - Platform architecture requirements
   - Resource and timeline estimates

3. **AI Opportunity Matrix**
   - AI Brand Generator feasibility
   - Design System Engine requirements
   - Content automation opportunities
   - Maintenance automation potential
   - Client portal self-service scope

4. **Connection Architecture**
   - How current systems link together
   - Data dependencies and formats
   - API and integration requirements
   - Foundation for AI platform

5. **Priority Recommendation**
   - Recommended first build (AI Brand Builder MVP)
   - Why this approach
   - Expected outcomes
   - Success metrics

6. **Findings Presentation**
   - Live walkthrough of all deliverables
   - Q&A session
   - Phase 2 planning discussion
    `.trim(),
    total_timeline: '2-3 weeks',
    start_date: null,
    estimated_completion_date: null,
    total_amount: 5000,
    discount_percentage: 0,
    final_amount: 5000,
    status: 'draft',
    access_token: INFLUEX_TOKEN,
    portal_sections: {
      proposal: true,
      agreement: true,
      billing: true,
      onboarding: true,
      dashboard: true,
    },
    portal_password: '2026',
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sent_at: null,
    viewed_at: null,
    agreement_signed_at: null,
    phases: [
      {
        id: 'influex-phase-1',
        proposal_id: 'influex-001',
        phase_number: 1,
        phase_name: 'AI Readiness Diagnostic',
        description: 'Complete ecosystem analysis of WordPress infrastructure, AI opportunity identification, and platform architecture strategy for Influex transformation.',
        timeline: '2-3 weeks',
        start_date: null,
        end_date: null,
        deliverables: [
          { id: 'd1', name: 'Full Ecosystem Map' },
          { id: 'd2', name: 'Technical Assessment' },
          { id: 'd3', name: 'AI Opportunity Matrix' },
          { id: 'd4', name: 'Connection Architecture' },
          { id: 'd5', name: 'Priority Recommendation' },
          { id: 'd6', name: 'Findings Presentation' },
        ],
        objectives: [
          'Map current WordPress infrastructure and 200+ site portfolio',
          'Assess technical debt and migration requirements',
          'Identify all AI transformation opportunities',
          'Document integration architecture',
          'Recommend optimal starting point for AI Brand Builder',
        ],
        goals: ['Deliver actionable AI platform roadmap with clear Phase 2 scope'],
        amount: 5000,
        sort_order: 0,
        visible_in_portal: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
    milestones: [
      {
        id: 'influex-milestone-1',
        proposal_id: 'influex-001',
        phase_id: 'influex-phase-1',
        milestone_name: 'AI Readiness Diagnostic',
        description: 'Complete AI readiness diagnostic including ecosystem mapping, technical assessment, opportunity analysis, and platform architecture recommendations',
        amount: 5000,
        due_date: null,
        payment_status: 'pending',
        milestone_status: 'not_started',
        invoice_number: null,
        payment_link: null, // To be created when proposal is sent
        paid_at: null,
        sort_order: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
    agreement: {
      id: 'influex-agreement-1',
      proposal_id: 'influex-001',
      agreement_text: `
# Consulting Services Agreement

This Consulting Services Agreement ("Agreement") is entered into by and between Light Brand Consulting ("Consultant") and Influex ("Client").

## 1. Services

Consultant agrees to provide the AI Readiness Diagnostic services described in the proposal. Services include ecosystem mapping, technical assessment, AI opportunity analysis, and platform architecture recommendations for transforming Influex's WordPress-based operations to an AI-powered brand development platform.

## 2. Compensation

Client agrees to pay Consultant $5,000 USD upon signing this agreement.

## 3. Timeline

Following receipt of payment, Consultant will complete the diagnostic within 2-3 weeks and schedule a presentation call at Client's earliest convenience.

## 4. Deliverables

Upon completion, Client will receive:
- Full Ecosystem Map
- Technical Assessment
- AI Opportunity Matrix
- Connection Architecture Documentation
- Priority Recommendation Report
- Live Findings Presentation

## 5. Confidentiality

Both parties agree to maintain the confidentiality of proprietary information shared during the engagement. This includes but is not limited to client lists, pricing structures, technical architecture, and business processes.

## 6. Intellectual Property

Upon full payment, all deliverables created specifically for Client shall become Client's property.

## 7. Future Engagement

This diagnostic lays the foundation for subsequent platform development phases. Future work will be scoped and proposed separately based on diagnostic findings.

By signing below, both parties agree to the terms set forth in this Agreement.
      `.trim(),
      terms: [
        { id: 't1', title: 'Payment Terms', content: 'Due upon agreement signing' },
        { id: 't2', title: 'Delivery', content: 'Findings presentation scheduled after payment receipt' },
        { id: 't3', title: 'Confidentiality', content: 'All client information treated as confidential' },
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
      id: 'influex-onboarding-1',
      proposal_id: 'influex-001',
      form_config: [
        { id: 'f1', type: 'text', label: 'Primary Contact Name', required: true },
        { id: 'f2', type: 'text', label: 'Primary Contact Email', required: true },
        { id: 'f3', type: 'text', label: 'Primary Contact Phone', required: false },
        { id: 'f4', type: 'textarea', label: 'WordPress Infrastructure Details', placeholder: 'Describe your current hosting, number of sites, maintenance setup...' },
        { id: 'f5', type: 'textarea', label: 'Current Brand Development Process', placeholder: 'Walk us through how you take a client from discovery to launch...' },
        { id: 'f6', type: 'textarea', label: 'Key Pain Points', placeholder: 'What are the biggest bottlenecks or frustrations in your current operations?' },
        { id: 'f7', type: 'textarea', label: 'AI Platform Vision', placeholder: 'What does success look like? What capabilities are most important?' },
        { id: 'f8', type: 'select', label: 'Preferred Presentation Format', options: ['Video Call', 'In-Person', 'Either works'] },
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
  },
};

export function getProposalByToken(token: string): ProposalWithDetails | null {
  return proposals[token] || null;
}
