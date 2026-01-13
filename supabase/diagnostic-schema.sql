-- ============================================================================
-- Light Brand Consulting - AI Readiness Diagnostic Schema Extension
-- ============================================================================
-- This extends the lead_submissions table with diagnostic fields

-- Add new columns to lead_submissions table
ALTER TABLE lead_submissions
ADD COLUMN IF NOT EXISTS website_url TEXT,
ADD COLUMN IF NOT EXISTS tech_stack JSONB,
ADD COLUMN IF NOT EXISTS website_story TEXT,
ADD COLUMN IF NOT EXISTS readiness_score INTEGER CHECK (readiness_score >= 0 AND readiness_score <= 100),
ADD COLUMN IF NOT EXISTS readiness_brief TEXT,
ADD COLUMN IF NOT EXISTS capacity_gap_analysis TEXT,
ADD COLUMN IF NOT EXISTS full_readiness_report TEXT,
ADD COLUMN IF NOT EXISTS system_demo_links JSONB, -- Array of {name: string, url: string} objects
ADD COLUMN IF NOT EXISTS booking_calendly_link TEXT,
ADD COLUMN IF NOT EXISTS booked_at TIMESTAMP WITH TIME ZONE;

-- Create indexes for new fields
CREATE INDEX IF NOT EXISTS idx_lead_submissions_readiness_score ON lead_submissions(readiness_score);
CREATE INDEX IF NOT EXISTS idx_lead_submissions_booked_at ON lead_submissions(booked_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_submissions_website_url ON lead_submissions(website_url);

-- Add comment for documentation
COMMENT ON COLUMN lead_submissions.website_url IS 'The website URL provided by the lead';
COMMENT ON COLUMN lead_submissions.tech_stack IS 'Detected technology stack (WordPress, Webflow, Next.js, etc.)';
COMMENT ON COLUMN lead_submissions.website_story IS 'Extracted story/content from the website';
COMMENT ON COLUMN lead_submissions.readiness_score IS 'AI readiness score from 0-100';
COMMENT ON COLUMN lead_submissions.readiness_brief IS 'Brief description of AI readiness assessment';
COMMENT ON COLUMN lead_submissions.capacity_gap_analysis IS 'Analysis of capacity gaps and opportunities';
COMMENT ON COLUMN lead_submissions.full_readiness_report IS 'Complete AI readiness diagnostic report';
COMMENT ON COLUMN lead_submissions.system_demo_links IS 'Array of 3 system demo HTML links';
COMMENT ON COLUMN lead_submissions.booking_calendly_link IS 'Calendly booking link for the call';
COMMENT ON COLUMN lead_submissions.booked_at IS 'Timestamp when the call was booked';
