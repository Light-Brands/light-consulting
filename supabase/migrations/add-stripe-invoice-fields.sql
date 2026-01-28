-- Add Stripe Invoice fields to milestones table
-- This migration adds support for Stripe Invoices instead of Checkout Sessions

-- Add invoice columns
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS stripe_invoice_id VARCHAR(255);
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS stripe_invoice_url VARCHAR(500);

-- Add comments for documentation
COMMENT ON COLUMN milestones.stripe_invoice_id IS 'Stripe Invoice ID for the milestone payment';
COMMENT ON COLUMN milestones.stripe_invoice_url IS 'Stripe hosted invoice URL - shareable link for viewing/paying the invoice';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_milestones_stripe_invoice_id ON milestones(stripe_invoice_id);
