-- ============================================================================
-- Migration: Add Stripe Payment Integration Fields
-- Light Brand Consulting
--
-- Run this migration to add Stripe payment fields to existing milestones table
-- ============================================================================

-- Add Stripe columns to milestones table
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS stripe_checkout_session_id VARCHAR(255);
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS stripe_payment_intent_id VARCHAR(255);
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS stripe_payment_url VARCHAR(500);

-- Add comments for documentation
COMMENT ON COLUMN milestones.stripe_checkout_session_id IS
'Stripe checkout session ID for the payment';

COMMENT ON COLUMN milestones.stripe_payment_intent_id IS
'Stripe payment intent ID after successful payment';

COMMENT ON COLUMN milestones.stripe_payment_url IS
'Generated Stripe checkout URL for the milestone payment';

-- Create index for efficient lookup by checkout session ID
CREATE INDEX IF NOT EXISTS idx_milestones_stripe_checkout_session
ON milestones(stripe_checkout_session_id)
WHERE stripe_checkout_session_id IS NOT NULL;
