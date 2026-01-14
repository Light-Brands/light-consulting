-- Migration: Update Tony Cho's Proposal with AI Readiness Diagnostic details
-- Target Proposal ID: bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4
-- Source: cho-ventures-ai-readiness-2026 static proposal

-- ============================================
-- 1. UPDATE MAIN PROPOSAL
-- ============================================
UPDATE proposals SET
  client_name = 'Tony Cho',
  client_email = 'tony@choventures.com',
  client_company = 'Cho Ventures',
  client_phone = NULL,
  project_name = 'AI Readiness Diagnostic',
  project_overview = '# AI Readiness Diagnostic

A comprehensive analysis of your current operations, technology stack, and business processes to identify AI integration opportunities and create a strategic roadmap for implementation.

## What You Get

- **Full Ecosystem Map** — Visual documentation of your current systems, workflows, and data flows
- **Integration Architecture** — How everything connects and where AI can plug in
- **Opportunity Catalog** — Complete inventory of AI applications you could build
- **Priority Starter** — One clear, high-impact starting point to begin building

## Philosophy: Build As You Grow

Start simple. Prove value. Expand from there.

We identify the single best entry point that delivers immediate value while laying the foundation for everything else on the roadmap.',
  project_scope = '## Deliverables

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
  total_timeline = '2-3 weeks',
  start_date = NULL,
  estimated_completion_date = NULL,
  total_amount = 5000,
  discount_percentage = 0,
  final_amount = 5000,
  status = 'sent',
  portal_sections = '{"proposal": true, "agreement": true, "billing": true, "onboarding": true, "dashboard": true}'::jsonb,
  portal_password = '8888',
  updated_at = NOW(),
  sent_at = NOW()
WHERE id = 'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4';

-- ============================================
-- 2. DELETE EXISTING PHASES AND INSERT NEW
-- ============================================
DELETE FROM proposal_phases WHERE proposal_id = 'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4';

INSERT INTO proposal_phases (
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
  'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4',
  1,
  'AI Readiness Diagnostic',
  'Complete ecosystem analysis, opportunity identification, and strategic roadmap development with clear starting point recommendation.',
  '2-3 weeks',
  NULL,
  NULL,
  '[{"id": "d1", "name": "Full Ecosystem Map"}, {"id": "d2", "name": "AI Opportunity Matrix"}, {"id": "d3", "name": "Connection Architecture"}, {"id": "d4", "name": "Priority Recommendation"}, {"id": "d5", "name": "Findings Presentation"}]'::jsonb,
  '["Map current systems and workflows", "Identify all AI integration opportunities", "Document how everything connects", "Determine optimal starting point"]'::jsonb,
  '["Deliver actionable AI roadmap with clear first step"]'::jsonb,
  5000,
  0,
  true,
  NOW(),
  NOW()
);

-- ============================================
-- 3. DELETE EXISTING MILESTONES AND INSERT NEW
-- ============================================
DELETE FROM milestones WHERE proposal_id = 'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4';

INSERT INTO milestones (
  proposal_id,
  phase_id,
  milestone_name,
  description,
  amount,
  due_date,
  payment_status,
  milestone_status,
  invoice_number,
  payment_link,
  paid_at,
  sort_order,
  created_at,
  updated_at
) VALUES (
  'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4',
  (SELECT id FROM proposal_phases WHERE proposal_id = 'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4' AND phase_number = 1 LIMIT 1),
  'AI Readiness Diagnostic',
  'Complete AI readiness diagnostic including ecosystem mapping, opportunity analysis, and strategic recommendations',
  5000,
  NULL,
  'pending',
  'not_started',
  NULL,
  'https://buy.stripe.com/8x28wQ82R7el01mfX1bo400',
  NULL,
  0,
  NOW(),
  NOW()
);

-- ============================================
-- 4. UPDATE OR INSERT AGREEMENT
-- ============================================
-- First try to update existing agreement
UPDATE agreements SET
  agreement_text = '# Consulting Services Agreement

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
  terms = '[{"id": "t1", "title": "Payment Terms", "content": "Due upon agreement signing"}, {"id": "t2", "title": "Delivery", "content": "Findings presentation scheduled after payment receipt"}]'::jsonb,
  signed_by_name = NULL,
  signed_by_email = NULL,
  signature_data = NULL,
  signed_at = NULL,
  ip_address = NULL,
  user_agent = NULL,
  status = 'pending',
  updated_at = NOW()
WHERE proposal_id = 'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4';

-- Insert agreement if it doesn't exist
INSERT INTO agreements (
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
)
SELECT
  'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4',
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
  '[{"id": "t1", "title": "Payment Terms", "content": "Due upon agreement signing"}, {"id": "t2", "title": "Delivery", "content": "Findings presentation scheduled after payment receipt"}]'::jsonb,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'pending',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM agreements WHERE proposal_id = 'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4'
);

-- ============================================
-- 5. UPDATE OR INSERT ONBOARDING FORM
-- ============================================
-- First try to update existing onboarding form
UPDATE onboarding_forms SET
  form_config = '[{"id": "f1", "type": "text", "label": "Primary Contact Name", "required": true}, {"id": "f2", "type": "text", "label": "Primary Contact Email", "required": true}, {"id": "f3", "type": "text", "label": "Primary Contact Phone", "required": false}, {"id": "f4", "type": "textarea", "label": "Current Systems/Tools in Use", "placeholder": "List your current software, platforms, and tools..."}, {"id": "f5", "type": "textarea", "label": "Key Business Processes", "placeholder": "Describe core workflows we should understand..."}, {"id": "f6", "type": "textarea", "label": "Initial Areas of Interest", "placeholder": "Any specific areas you want us to focus on?"}, {"id": "f7", "type": "select", "label": "Preferred Presentation Format", "options": ["Video Call", "In-Person", "Either works"]}]'::jsonb,
  form_data = NULL,
  status = 'pending',
  submitted_at = NULL,
  reviewed_at = NULL,
  updated_at = NOW()
WHERE proposal_id = 'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4';

-- Insert onboarding form if it doesn't exist
INSERT INTO onboarding_forms (
  proposal_id,
  form_config,
  form_data,
  status,
  submitted_at,
  reviewed_at,
  created_at,
  updated_at
)
SELECT
  'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4',
  '[{"id": "f1", "type": "text", "label": "Primary Contact Name", "required": true}, {"id": "f2", "type": "text", "label": "Primary Contact Email", "required": true}, {"id": "f3", "type": "text", "label": "Primary Contact Phone", "required": false}, {"id": "f4", "type": "textarea", "label": "Current Systems/Tools in Use", "placeholder": "List your current software, platforms, and tools..."}, {"id": "f5", "type": "textarea", "label": "Key Business Processes", "placeholder": "Describe core workflows we should understand..."}, {"id": "f6", "type": "textarea", "label": "Initial Areas of Interest", "placeholder": "Any specific areas you want us to focus on?"}, {"id": "f7", "type": "select", "label": "Preferred Presentation Format", "options": ["Video Call", "In-Person", "Either works"]}]'::jsonb,
  NULL,
  'pending',
  NULL,
  NULL,
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM onboarding_forms WHERE proposal_id = 'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4'
);

-- ============================================
-- VERIFICATION QUERY (optional - run to verify)
-- ============================================
-- SELECT
--   p.id,
--   p.client_name,
--   p.client_company,
--   p.project_name,
--   p.total_amount,
--   p.final_amount,
--   p.status,
--   p.portal_password,
--   (SELECT COUNT(*) FROM proposal_phases WHERE proposal_id = p.id) as phase_count,
--   (SELECT COUNT(*) FROM milestones WHERE proposal_id = p.id) as milestone_count,
--   (SELECT status FROM agreements WHERE proposal_id = p.id) as agreement_status,
--   (SELECT status FROM onboarding_forms WHERE proposal_id = p.id) as onboarding_status
-- FROM proposals p
-- WHERE p.id = 'bd11fdb8-cb9b-484c-a7a5-d1f35a4a5ce4';
