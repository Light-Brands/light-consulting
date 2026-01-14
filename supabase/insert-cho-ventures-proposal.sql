-- ============================================================================
-- Insert Cho Ventures AI Readiness Diagnostic Proposal
-- ============================================================================
-- This script inserts the hardcoded Cho Ventures proposal into the database
-- Run this in your Supabase SQL Editor

-- First, let's use a fixed UUID for the proposal so we can reference it
-- You can generate new UUIDs if needed: SELECT gen_random_uuid();

DO $$
DECLARE
  proposal_uuid UUID := 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'; -- Change this to a new UUID if needed
  phase_uuid UUID := 'b2c3d4e5-f6a7-8901-bcde-f12345678901';
  milestone_uuid UUID := 'c3d4e5f6-a7b8-9012-cdef-123456789012';
  agreement_uuid UUID := 'd4e5f6a7-b8c9-0123-defa-234567890123';
  onboarding_uuid UUID := 'e5f6a7b8-c9d0-1234-efab-345678901234';
  access_token_uuid UUID := 'f6a7b8c9-d0e1-2345-fabc-456789012345'; -- This will be the access token
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
  'Tony Cho',
  'tony@choventures.com',
  'Cho Ventures',
  NULL,
  'AI Readiness Diagnostic',
  '# AI Readiness Diagnostic

A comprehensive analysis of your current operations, technology stack, and business processes to identify AI integration opportunities and create a strategic roadmap for implementation.

## What You Get

- **Full Ecosystem Map** — Visual documentation of your current systems, workflows, and data flows
- **Integration Architecture** — How everything connects and where AI can plug in
- **Opportunity Catalog** — Complete inventory of AI applications you could build
- **Priority Starter** — One clear, high-impact starting point to begin building

## Philosophy: Build As You Grow

Start simple. Prove value. Expand from there.

We identify the single best entry point that delivers immediate value while laying the foundation for everything else on the roadmap.',
  '## Deliverables

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
   - Strategic discussion',
  '2-3 weeks',
  NULL,
  NULL,
  5000.00,
  0.00,
  5000.00,
  'sent',
  access_token_uuid,
  '{"proposal": true, "agreement": true, "billing": true, "onboarding": true, "dashboard": true}'::jsonb,
  '8888',
  NULL,
  NOW(),
  NOW(),
  NOW(),
  NULL,
  NULL
);

-- Insert Phase (amount = 0 since phases no longer have pricing)
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
  'Complete ecosystem analysis, opportunity identification, and strategic roadmap development with clear starting point recommendation.',
  '2-3 weeks',
  NULL,
  NULL,
  '[
    {"id": "d1", "name": "Full Ecosystem Map"},
    {"id": "d2", "name": "AI Opportunity Matrix"},
    {"id": "d3", "name": "Connection Architecture"},
    {"id": "d4", "name": "Priority Recommendation"},
    {"id": "d5", "name": "Findings Presentation"}
  ]'::jsonb,
  '[
    "Map current systems and workflows",
    "Identify all AI integration opportunities",
    "Document how everything connects",
    "Determine optimal starting point"
  ]'::jsonb,
  '["Deliver actionable AI roadmap with clear first step"]'::jsonb,
  0.00, -- Phases no longer have pricing
  0,
  true,
  NOW(),
  NOW()
);

-- Insert Milestone (Payment Schedule)
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
  'Complete AI readiness diagnostic including ecosystem mapping, opportunity analysis, and strategic recommendations',
  5000.00,
  NULL,
  'pending',
  'not_started',
  NULL,
  NULL,
  0,
  'https://buy.stripe.com/8x28wQ82R7el01mfX1bo400',
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

This Consulting Services Agreement ("Agreement") is entered into by and between Light Brand Consulting ("Consultant") and Cho Ventures ("Client").

## 1. Services

Consultant agrees to provide the AI Readiness Diagnostic services described in the proposal. Services include ecosystem mapping, opportunity analysis, and strategic recommendations.

## 2. Compensation

Client agrees to pay Consultant $5,000 USD upon signing this agreement.

## 3. Timeline

Following receipt of payment, Consultant will complete the diagnostic within 2-3 weeks and schedule a presentation call at Client''s earliest convenience.

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

Upon full payment, all deliverables created specifically for Client shall become Client''s property.

By signing below, both parties agree to the terms set forth in this Agreement.',
  '[
    {"id": "t1", "title": "Payment Terms", "content": "Due upon agreement signing"},
    {"id": "t2", "title": "Delivery", "content": "Findings presentation scheduled after payment receipt"}
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
    {"id": "f4", "type": "textarea", "label": "Current Systems/Tools in Use", "placeholder": "List your current software, platforms, and tools..."},
    {"id": "f5", "type": "textarea", "label": "Key Business Processes", "placeholder": "Describe core workflows we should understand..."},
    {"id": "f6", "type": "textarea", "label": "Initial Areas of Interest", "placeholder": "Any specific areas you want us to focus on?"},
    {"id": "f7", "type": "select", "label": "Preferred Presentation Format", "options": ["Video Call", "In-Person", "Either works"]}
  ]'::jsonb,
  NULL,
  'pending',
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Output the access token for reference
RAISE NOTICE 'Cho Ventures proposal inserted successfully!';
RAISE NOTICE 'Proposal ID: %', proposal_uuid;
RAISE NOTICE 'Access Token: %', access_token_uuid;
RAISE NOTICE 'Portal URL: /proposals/%', access_token_uuid;
RAISE NOTICE 'Portal Password: 8888';

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
WHERE p.client_email = 'tony@choventures.com';
