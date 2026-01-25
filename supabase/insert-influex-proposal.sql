-- ============================================================================
-- Insert Influex AI Platform Transformation Proposal
-- ============================================================================
-- This script inserts the Influex proposal into the database
-- Run this in your Supabase SQL Editor

DO $$
DECLARE
  proposal_uuid UUID := 'b2c3d4e5-f6a7-8901-bcde-f23456789012';
  phase_uuid UUID := 'c3d4e5f6-a7b8-9012-cdef-234567890123';
  milestone_uuid UUID := 'd4e5f6a7-b8c9-0123-defa-345678901234';
  agreement_uuid UUID := 'e5f6a7b8-c9d0-1234-efab-456789012345';
  onboarding_uuid UUID := 'f6a7b8c9-d0e1-2345-fabc-567890123456';
  access_token_uuid UUID := 'a7b8c9d0-e1f2-3456-abcd-678901234567';
BEGIN

-- Insert Proposal
INSERT INTO proposals (
  id,
  lead_submission_id,
  client_name,
  client_email,
  client_company,
  client_phone,
  project_name,
  project_overview,
  project_scope,
  total_timeline,
  start_date,
  estimated_completion_date,
  total_amount,
  discount_percentage,
  final_amount,
  status,
  access_token,
  portal_sections,
  portal_password,
  created_by,
  created_at,
  updated_at,
  sent_at,
  viewed_at,
  agreement_signed_at
) VALUES (
  proposal_uuid,
  NULL,
  'Dmitriy Kozlov',
  'dima@influex.com',
  'Influex',
  NULL,
  'AI Platform Transformation - Phase 1',
  '# AI Readiness Diagnostic

A comprehensive analysis of Influex''s current WordPress-based operations, technology stack, and brand development workflows to architect the transformation to an AI-powered brand development platform.

## What You Get

- **Full Ecosystem Map** — Visual documentation of your current 200+ site WordPress infrastructure, workflows, and data flows
- **Technical Assessment** — WordPress architecture analysis and migration requirements
- **AI Opportunity Matrix** — Complete inventory of AI applications for brand development automation
- **Connection Architecture** — How everything connects and where AI can transform operations
- **Priority Recommendation** — One clear, high-impact starting point for the AI Brand Builder

## Philosophy: Build As You Grow

Start simple. Prove value. Expand from there.

We identify the single best entry point that delivers immediate value while laying the foundation for your AI-powered brand development platform.',
  '## Deliverables

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
   - Phase 2 planning discussion',
  '2-3 weeks',
  NULL,
  NULL,
  5000.00,
  0.00,
  5000.00,
  'draft',
  access_token_uuid,
  '{"proposal": true, "agreement": true, "billing": true, "onboarding": true, "dashboard": true}'::jsonb,
  '2026',
  NULL,
  NOW(),
  NOW(),
  NULL,
  NULL,
  NULL
);

-- Insert Phase
INSERT INTO proposal_phases (
  id,
  proposal_id,
  phase_number,
  phase_name,
  description,
  timeline,
  start_date,
  end_date,
  deliverables,
  objectives,
  goals,
  amount,
  sort_order,
  visible_in_portal,
  created_at,
  updated_at
) VALUES (
  phase_uuid,
  proposal_uuid,
  1,
  'AI Readiness Diagnostic',
  'Complete ecosystem analysis of WordPress infrastructure, AI opportunity identification, and platform architecture strategy for Influex transformation.',
  '2-3 weeks',
  NULL,
  NULL,
  '[
    {"id": "d1", "name": "Full Ecosystem Map"},
    {"id": "d2", "name": "Technical Assessment"},
    {"id": "d3", "name": "AI Opportunity Matrix"},
    {"id": "d4", "name": "Connection Architecture"},
    {"id": "d5", "name": "Priority Recommendation"},
    {"id": "d6", "name": "Findings Presentation"}
  ]'::jsonb,
  '[
    "Map current WordPress infrastructure and 200+ site portfolio",
    "Assess technical debt and migration requirements",
    "Identify all AI transformation opportunities",
    "Document integration architecture",
    "Recommend optimal starting point for AI Brand Builder"
  ]'::jsonb,
  '["Deliver actionable AI platform roadmap with clear Phase 2 scope"]'::jsonb,
  0.00,
  0,
  true,
  NOW(),
  NOW()
);

-- Insert Milestone
INSERT INTO milestones (
  id,
  proposal_id,
  phase_id,
  milestone_name,
  description,
  amount,
  due_date,
  payment_status,
  milestone_status,
  invoice_number,
  paid_at,
  sort_order,
  payment_link,
  created_at,
  updated_at
) VALUES (
  milestone_uuid,
  proposal_uuid,
  phase_uuid,
  'AI Readiness Diagnostic',
  'Complete AI readiness diagnostic including ecosystem mapping, technical assessment, opportunity analysis, and platform architecture recommendations',
  5000.00,
  NULL,
  'pending',
  'not_started',
  NULL,
  NULL,
  0,
  NULL, -- Payment link to be added when proposal is sent
  NOW(),
  NOW()
);

-- Insert Agreement
INSERT INTO agreements (
  id,
  proposal_id,
  agreement_text,
  terms,
  signed_by_name,
  signed_by_email,
  signature_data,
  signed_at,
  ip_address,
  user_agent,
  status,
  created_at,
  updated_at
) VALUES (
  agreement_uuid,
  proposal_uuid,
  '# Consulting Services Agreement

This Consulting Services Agreement ("Agreement") is entered into by and between Light Brand Consulting ("Consultant") and Influex ("Client").

## 1. Services

Consultant agrees to provide the AI Readiness Diagnostic services described in the proposal. Services include ecosystem mapping, technical assessment, AI opportunity analysis, and platform architecture recommendations for transforming Influex''s WordPress-based operations to an AI-powered brand development platform.

## 2. Compensation

Client agrees to pay Consultant $5,000 USD upon signing this agreement.

## 3. Timeline

Following receipt of payment, Consultant will complete the diagnostic within 2-3 weeks and schedule a presentation call at Client''s earliest convenience.

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

Upon full payment, all deliverables created specifically for Client shall become Client''s property.

## 7. Future Engagement

This diagnostic lays the foundation for subsequent platform development phases. Future work will be scoped and proposed separately based on diagnostic findings.

By signing below, both parties agree to the terms set forth in this Agreement.',
  '[
    {"id": "t1", "title": "Payment Terms", "content": "Due upon agreement signing"},
    {"id": "t2", "title": "Delivery", "content": "Findings presentation scheduled after payment receipt"},
    {"id": "t3", "title": "Confidentiality", "content": "All client information treated as confidential"}
  ]'::jsonb,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'pending',
  NOW(),
  NOW()
);

-- Insert Onboarding Form
INSERT INTO onboarding_forms (
  id,
  proposal_id,
  form_config,
  form_data,
  status,
  submitted_at,
  reviewed_at,
  created_at,
  updated_at
) VALUES (
  onboarding_uuid,
  proposal_uuid,
  '[
    {"id": "f1", "type": "text", "label": "Primary Contact Name", "required": true},
    {"id": "f2", "type": "text", "label": "Primary Contact Email", "required": true},
    {"id": "f3", "type": "text", "label": "Primary Contact Phone", "required": false},
    {"id": "f4", "type": "textarea", "label": "WordPress Infrastructure Details", "placeholder": "Describe your current hosting, number of sites, maintenance setup..."},
    {"id": "f5", "type": "textarea", "label": "Current Brand Development Process", "placeholder": "Walk us through how you take a client from discovery to launch..."},
    {"id": "f6", "type": "textarea", "label": "Key Pain Points", "placeholder": "What are the biggest bottlenecks or frustrations in your current operations?"},
    {"id": "f7", "type": "textarea", "label": "AI Platform Vision", "placeholder": "What does success look like? What capabilities are most important?"},
    {"id": "f8", "type": "select", "label": "Preferred Presentation Format", "options": ["Video Call", "In-Person", "Either works"]}
  ]'::jsonb,
  NULL,
  'pending',
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Output the access token for reference
RAISE NOTICE 'Influex proposal inserted successfully!';
RAISE NOTICE 'Proposal ID: %', proposal_uuid;
RAISE NOTICE 'Access Token: %', access_token_uuid;
RAISE NOTICE 'Portal URL: /proposals/%', access_token_uuid;
RAISE NOTICE 'Portal Password: 2026';

END $$;

-- Verify the insertion
SELECT
  p.id,
  p.project_name,
  p.client_name,
  p.client_company,
  p.final_amount,
  p.status,
  p.access_token,
  p.portal_password,
  (SELECT COUNT(*) FROM proposal_phases WHERE proposal_id = p.id) as phases_count,
  (SELECT COUNT(*) FROM milestones WHERE proposal_id = p.id) as milestones_count,
  (SELECT COUNT(*) FROM agreements WHERE proposal_id = p.id) as agreements_count,
  (SELECT COUNT(*) FROM onboarding_forms WHERE proposal_id = p.id) as onboarding_forms_count
FROM proposals p
WHERE p.client_email = 'dima@influex.com';
