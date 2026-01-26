-- ============================================================================
-- Migration: Team Assignment & Activity Logging
-- Light Brand Consulting
--
-- Adds assignment columns to existing tables and creates activity logging
-- ============================================================================

-- ============================================================================
-- Add assignment columns to proposals
-- ============================================================================
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES user_profiles(id);
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS project_manager_id UUID REFERENCES user_profiles(id);

COMMENT ON COLUMN proposals.assigned_to IS 'Primary team member assigned to this project';
COMMENT ON COLUMN proposals.project_manager_id IS 'Project manager overseeing this project';

-- ============================================================================
-- Add assignment columns to milestones
-- ============================================================================
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS assigned_to UUID;

COMMENT ON COLUMN milestones.assigned_to IS 'Team member responsible for this milestone';

-- ============================================================================
-- Project Activity Log Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS project_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,

  -- Activity details
  activity_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- Related entities
  phase_id UUID REFERENCES proposal_phases(id) ON DELETE SET NULL,
  milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
  deliverable_id UUID REFERENCES deliverables(id) ON DELETE SET NULL,

  -- Actor
  user_profile_id UUID REFERENCES user_profiles(id),

  -- Additional data
  metadata JSONB,

  -- Visibility
  is_client_visible BOOLEAN DEFAULT false,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_activity_type CHECK (activity_type IN (
    'status_change', 'phase_update', 'milestone_update', 'deliverable_update',
    'comment_added', 'file_uploaded', 'payment_received', 'team_change',
    'progress_update', 'link_added', 'assignment_change', 'other'
  ))
);

-- Comments for project_activity_log
COMMENT ON TABLE project_activity_log IS 'Audit log of all project activities';
COMMENT ON COLUMN project_activity_log.activity_type IS 'Type of activity logged';
COMMENT ON COLUMN project_activity_log.metadata IS 'Additional JSON data about the activity';
COMMENT ON COLUMN project_activity_log.is_client_visible IS 'Whether activity shows in client portal';

-- ============================================================================
-- Indexes
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_proposals_assigned_to
ON proposals(assigned_to)
WHERE assigned_to IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_proposals_project_manager
ON proposals(project_manager_id)
WHERE project_manager_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_milestones_assigned_to
ON milestones(assigned_to)
WHERE assigned_to IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_activity_log_proposal
ON project_activity_log(proposal_id);

CREATE INDEX IF NOT EXISTS idx_activity_log_created
ON project_activity_log(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activity_log_user
ON project_activity_log(user_profile_id)
WHERE user_profile_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_activity_log_client_visible
ON project_activity_log(proposal_id, is_client_visible)
WHERE is_client_visible = true;

-- ============================================================================
-- Function to auto-update last_activity_at on proposals
-- ============================================================================
CREATE OR REPLACE FUNCTION update_proposal_last_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE proposals
  SET last_activity_at = NOW()
  WHERE id = NEW.proposal_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for activity log
DROP TRIGGER IF EXISTS trigger_activity_log_update_proposal ON project_activity_log;
CREATE TRIGGER trigger_activity_log_update_proposal
  AFTER INSERT ON project_activity_log
  FOR EACH ROW
  EXECUTE FUNCTION update_proposal_last_activity();
