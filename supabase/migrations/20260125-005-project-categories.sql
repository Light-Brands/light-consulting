-- ============================================================================
-- Migration: Project Categories & Internal Projects
-- Light Brand Consulting
--
-- Adds categorization fields to proposals and creates internal projects table
-- ============================================================================

-- ============================================================================
-- Add category fields to proposals
-- ============================================================================
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS project_category VARCHAR(50) DEFAULT 'client_project';
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS is_on_hold BOOLEAN DEFAULT false;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS on_hold_reason TEXT;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS on_hold_since DATE;

-- Comments for category fields
COMMENT ON COLUMN proposals.project_category IS 'Category: client_project, internal, maintenance, retainer';
COMMENT ON COLUMN proposals.is_on_hold IS 'Whether the project is currently on hold';
COMMENT ON COLUMN proposals.on_hold_reason IS 'Reason for placing project on hold';
COMMENT ON COLUMN proposals.on_hold_since IS 'Date when project was placed on hold';

-- Add constraint for project_category
ALTER TABLE proposals DROP CONSTRAINT IF EXISTS chk_project_category;
ALTER TABLE proposals ADD CONSTRAINT chk_project_category
  CHECK (project_category IN ('client_project', 'internal', 'maintenance', 'retainer'));

-- ============================================================================
-- Internal Projects Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS internal_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Project details
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL DEFAULT 'product',

  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  priority VARCHAR(20) NOT NULL DEFAULT 'medium',
  progress_percentage INTEGER DEFAULT 0,

  -- Timeline
  start_date DATE,
  target_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Assignment
  lead_id UUID REFERENCES user_profiles(id),

  -- Metadata
  tags TEXT[],
  repository_url TEXT,
  documentation_url TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_internal_category CHECK (category IN ('product', 'infrastructure', 'tooling', 'research', 'marketing', 'other')),
  CONSTRAINT chk_internal_status CHECK (status IN ('planning', 'active', 'on_hold', 'completed', 'cancelled')),
  CONSTRAINT chk_internal_priority CHECK (priority IN ('low', 'medium', 'high', 'urgent'))
);

-- Comments for internal_projects
COMMENT ON TABLE internal_projects IS 'Internal company projects not tied to client work';
COMMENT ON COLUMN internal_projects.category IS 'Category: product, infrastructure, tooling, research, marketing, other';
COMMENT ON COLUMN internal_projects.lead_id IS 'Team member leading this internal project';

-- ============================================================================
-- Internal Project Members Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS internal_project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  internal_project_id UUID NOT NULL REFERENCES internal_projects(id) ON DELETE CASCADE,
  user_profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'contributor',
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT uq_internal_project_member UNIQUE (internal_project_id, user_profile_id)
);

COMMENT ON TABLE internal_project_members IS 'Team members assigned to internal projects';

-- ============================================================================
-- Indexes
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_proposals_category
ON proposals(project_category);

CREATE INDEX IF NOT EXISTS idx_proposals_on_hold
ON proposals(is_on_hold)
WHERE is_on_hold = true;

CREATE INDEX IF NOT EXISTS idx_internal_projects_status
ON internal_projects(status);

CREATE INDEX IF NOT EXISTS idx_internal_projects_lead
ON internal_projects(lead_id)
WHERE lead_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_internal_project_members_project
ON internal_project_members(internal_project_id);

CREATE INDEX IF NOT EXISTS idx_internal_project_members_user
ON internal_project_members(user_profile_id);
