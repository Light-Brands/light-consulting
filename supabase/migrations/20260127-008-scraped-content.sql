-- ============================================================================
-- Light Brand Consulting - Scraped Content Storage
-- ============================================================================
-- Adds column to store raw scraped website content for reference
-- This allows the diagnostic data to be retrieved later without re-scraping

-- Add column for raw scraped content
ALTER TABLE lead_submissions
ADD COLUMN IF NOT EXISTS scraped_content TEXT;

-- Add comment for documentation
COMMENT ON COLUMN lead_submissions.scraped_content IS 'Raw scraped website content stored for reference (not displayed to users)';

-- Note: This column can store large text but won't be returned in normal queries
-- Use explicit SELECT when needed for admin/debugging purposes
