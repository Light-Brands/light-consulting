-- Migration: Add referrer tracking to proposals
-- Light Brand Consulting
--
-- Tracks where projects/proposals come from:
-- - Team member referrals (links to user_profiles)
-- - External sources (ads, direct)

-- Add referrer fields to proposals table
ALTER TABLE proposals
ADD COLUMN IF NOT EXISTS referrer_type VARCHAR(20) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS referrer_user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS referrer_source VARCHAR(50) DEFAULT NULL;

-- Add comment explaining the fields
COMMENT ON COLUMN proposals.referrer_type IS 'Type of referrer: team_member, ads, direct, other';
COMMENT ON COLUMN proposals.referrer_user_id IS 'If referrer_type is team_member, links to the team member who referred';
COMMENT ON COLUMN proposals.referrer_source IS 'Additional details about the referral source';

-- Create index for reporting on team member referrals
CREATE INDEX IF NOT EXISTS idx_proposals_referrer_user_id ON proposals(referrer_user_id) WHERE referrer_user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_proposals_referrer_type ON proposals(referrer_type) WHERE referrer_type IS NOT NULL;
