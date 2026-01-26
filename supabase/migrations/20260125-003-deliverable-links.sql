-- ============================================================================
-- Migration: Deliverable Links System
-- Light Brand Consulting
--
-- Creates tables for managing deliverable links that can be shared with clients
-- Supports various link types: documents, designs, staging sites, etc.
-- ============================================================================

-- ============================================================================
-- Deliverable Links Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS deliverable_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES proposal_phases(id) ON DELETE SET NULL,
  milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,

  -- Link details
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  link_type VARCHAR(50) NOT NULL DEFAULT 'document',

  -- Access control
  is_client_visible BOOLEAN DEFAULT true,
  requires_password BOOLEAN DEFAULT false,
  password_hint VARCHAR(255),

  -- Metadata
  icon VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_link_type CHECK (link_type IN (
    'document', 'design', 'staging', 'production', 'repository',
    'video', 'spreadsheet', 'presentation', 'prototype', 'other'
  ))
);

-- Comments for deliverable_links
COMMENT ON TABLE deliverable_links IS 'Links to project deliverables shared with clients';
COMMENT ON COLUMN deliverable_links.link_type IS 'Type: document, design, staging, production, repository, video, spreadsheet, presentation, prototype, other';
COMMENT ON COLUMN deliverable_links.is_client_visible IS 'Whether link is visible in client portal';
COMMENT ON COLUMN deliverable_links.icon IS 'Optional icon identifier for display';

-- ============================================================================
-- Deliverables Table (Enhanced version for tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES proposal_phases(id) ON DELETE SET NULL,

  -- Deliverable details
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',

  -- Timeline
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Assignments
  assigned_to UUID REFERENCES user_profiles(id),

  -- Metadata
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_deliverable_status CHECK (status IN ('pending', 'in_progress', 'review', 'completed', 'cancelled'))
);

-- Comments for deliverables
COMMENT ON TABLE deliverables IS 'Individual deliverable items within a project';
COMMENT ON COLUMN deliverables.status IS 'Status: pending, in_progress, review, completed, cancelled';
COMMENT ON COLUMN deliverables.assigned_to IS 'Team member assigned to this deliverable';

-- ============================================================================
-- Indexes
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_deliverable_links_proposal
ON deliverable_links(proposal_id);

CREATE INDEX IF NOT EXISTS idx_deliverable_links_phase
ON deliverable_links(phase_id)
WHERE phase_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_deliverable_links_client_visible
ON deliverable_links(proposal_id, is_client_visible)
WHERE is_client_visible = true;

CREATE INDEX IF NOT EXISTS idx_deliverables_proposal
ON deliverables(proposal_id);

CREATE INDEX IF NOT EXISTS idx_deliverables_phase
ON deliverables(phase_id)
WHERE phase_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_deliverables_assigned
ON deliverables(assigned_to)
WHERE assigned_to IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_deliverables_status
ON deliverables(status);
