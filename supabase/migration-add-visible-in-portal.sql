-- Migration: Add missing columns to proposal_phases and milestones tables
-- Date: 2026-01-14
-- Purpose: Fix proposal saving issues due to missing columns

-- ============================================================================
-- 1. Add visible_in_portal column to proposal_phases table
-- ============================================================================
-- This column controls whether phases are visible in the client portal

ALTER TABLE proposal_phases 
ADD COLUMN IF NOT EXISTS visible_in_portal BOOLEAN DEFAULT true;

-- Add index for efficient filtering of visible phases
CREATE INDEX IF NOT EXISTS idx_proposal_phases_visible
ON proposal_phases(proposal_id, visible_in_portal)
WHERE visible_in_portal = true;

-- Add comment explaining the column
COMMENT ON COLUMN proposal_phases.visible_in_portal IS
'Controls whether this phase is visible to clients in the portal. Admins can toggle this to gradually reveal phases.';

-- ============================================================================
-- 2. Add payment_link column to milestones table
-- ============================================================================
-- This column stores the generated Stripe checkout URL for milestone payments

ALTER TABLE milestones 
ADD COLUMN IF NOT EXISTS payment_link VARCHAR(500);

-- Add comment explaining the column
COMMENT ON COLUMN milestones.payment_link IS
'Generated payment URL for the milestone (e.g., Stripe checkout link). Deprecated in favor of stripe_payment_url.';

-- ============================================================================
-- Verification
-- ============================================================================
-- Verify proposal_phases column
SELECT 
  'proposal_phases' as table_name,
  column_name, 
  data_type, 
  column_default, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'proposal_phases' 
  AND column_name = 'visible_in_portal'

UNION ALL

-- Verify milestones column
SELECT 
  'milestones' as table_name,
  column_name, 
  data_type, 
  column_default, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'milestones' 
  AND column_name = 'payment_link';
