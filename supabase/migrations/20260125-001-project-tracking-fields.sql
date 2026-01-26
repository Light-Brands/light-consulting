-- ============================================================================
-- Migration: Add Project Tracking Fields
-- Light Brand Consulting
--
-- Adds progress tracking fields to existing proposals and proposal_phases tables
-- for the Command Center dashboard
-- ============================================================================

-- Add progress tracking fields to proposals table
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS progress_percentage INTEGER DEFAULT 0;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS health_status VARCHAR(20) DEFAULT 'on_track';
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium';
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS next_action TEXT;
ALTER TABLE proposals ADD COLUMN IF NOT EXISTS next_action_due_date DATE;

-- Add phase status tracking to proposal_phases table
ALTER TABLE proposal_phases ADD COLUMN IF NOT EXISTS phase_status VARCHAR(20) DEFAULT 'not_started';
ALTER TABLE proposal_phases ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE proposal_phases ADD COLUMN IF NOT EXISTS actual_start_date DATE;
ALTER TABLE proposal_phases ADD COLUMN IF NOT EXISTS actual_end_date DATE;
ALTER TABLE proposal_phases ADD COLUMN IF NOT EXISTS progress_notes TEXT;

-- Add comments for documentation
COMMENT ON COLUMN proposals.progress_percentage IS 'Overall project progress from 0-100';
COMMENT ON COLUMN proposals.last_activity_at IS 'Timestamp of last activity on the project';
COMMENT ON COLUMN proposals.health_status IS 'Project health: on_track, at_risk, behind, blocked';
COMMENT ON COLUMN proposals.priority IS 'Project priority: low, medium, high, urgent';
COMMENT ON COLUMN proposals.next_action IS 'Next action item for the project';
COMMENT ON COLUMN proposals.next_action_due_date IS 'Due date for the next action';

COMMENT ON COLUMN proposal_phases.phase_status IS 'Phase status: not_started, in_progress, completed, blocked';
COMMENT ON COLUMN proposal_phases.completed_at IS 'Timestamp when phase was completed';
COMMENT ON COLUMN proposal_phases.actual_start_date IS 'Actual start date of the phase';
COMMENT ON COLUMN proposal_phases.actual_end_date IS 'Actual end date of the phase';
COMMENT ON COLUMN proposal_phases.progress_notes IS 'Notes on phase progress';

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_proposals_health_status
ON proposals(health_status)
WHERE health_status IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_proposals_priority
ON proposals(priority)
WHERE priority IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_proposals_last_activity
ON proposals(last_activity_at DESC)
WHERE last_activity_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_proposal_phases_status
ON proposal_phases(phase_status)
WHERE phase_status IS NOT NULL;
