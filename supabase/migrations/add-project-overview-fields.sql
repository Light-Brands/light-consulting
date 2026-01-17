-- ============================================================================
-- Migration: Add Project Overview Custom Fields
-- ============================================================================
-- This migration adds custom fields to the projects table to enable unique
-- project overviews with challenge, solution, and results data.
-- ============================================================================

-- Add new columns for project overview content
ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenge TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS solution TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS results TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS services TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_features TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_stack JSONB;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS origin VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type VARCHAR(255);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS brand_id VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS preview_enabled BOOLEAN DEFAULT false;

-- Add comment for documentation
COMMENT ON COLUMN projects.challenge IS 'Description of the challenge the project addressed';
COMMENT ON COLUMN projects.solution IS 'Description of the solution implemented';
COMMENT ON COLUMN projects.results IS 'Array of key results achieved';
COMMENT ON COLUMN projects.gallery_images IS 'Array of additional gallery image URLs';
COMMENT ON COLUMN projects.services IS 'Array of services provided for the project';
COMMENT ON COLUMN projects.key_features IS 'Array of key features of the project';
COMMENT ON COLUMN projects.tech_stack IS 'JSON object with frontend and backend technologies';
COMMENT ON COLUMN projects.origin IS 'Geographic origin/region of the project';
COMMENT ON COLUMN projects.project_type IS 'Type/category of project';
COMMENT ON COLUMN projects.brand_id IS 'Brand category identifier';
COMMENT ON COLUMN projects.preview_enabled IS 'Whether preview is enabled for the project';
