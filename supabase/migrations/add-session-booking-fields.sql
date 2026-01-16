-- ============================================================================
-- Light Brand Consulting - Strategic Session Booking Schema Extension
-- ============================================================================
-- This adds fields to lead_submissions for tracking paid strategic sessions

-- Add new columns for strategic session booking
ALTER TABLE lead_submissions
ADD COLUMN IF NOT EXISTS session_paid BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS session_paid_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS session_payment_id TEXT,
ADD COLUMN IF NOT EXISTS session_checkout_id TEXT,
ADD COLUMN IF NOT EXISTS session_checkout_url TEXT,
ADD COLUMN IF NOT EXISTS session_amount INTEGER DEFAULT 500;

-- Create indexes for new fields
CREATE INDEX IF NOT EXISTS idx_lead_submissions_session_paid ON lead_submissions(session_paid);
CREATE INDEX IF NOT EXISTS idx_lead_submissions_session_paid_at ON lead_submissions(session_paid_at DESC);

-- Add comments for documentation
COMMENT ON COLUMN lead_submissions.session_paid IS 'Whether the $500 strategic session has been paid';
COMMENT ON COLUMN lead_submissions.session_paid_at IS 'Timestamp when the strategic session was paid';
COMMENT ON COLUMN lead_submissions.session_payment_id IS 'Stripe payment intent ID for the strategic session';
COMMENT ON COLUMN lead_submissions.session_checkout_id IS 'Stripe checkout session ID';
COMMENT ON COLUMN lead_submissions.session_checkout_url IS 'Stripe checkout URL for the session';
COMMENT ON COLUMN lead_submissions.session_amount IS 'Amount paid for strategic session (in dollars)';

-- Update status enum to include session_booked (if using enum)
-- If status is a text field, this comment serves as documentation
-- Valid statuses: 'new', 'contacted', 'session_booked', 'proposal_sent', 'converted', 'archived'
