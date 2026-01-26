-- ============================================================================
-- Migration: Team Todos & Next Actions
-- Light Brand Consulting
--
-- Creates todo tracking system for team members with project linkage
-- ============================================================================

-- ============================================================================
-- Todos Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Content
  title VARCHAR(500) NOT NULL,
  description TEXT,

  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  priority VARCHAR(20) NOT NULL DEFAULT 'medium',

  -- Assignment
  assigned_to UUID REFERENCES user_profiles(id),
  created_by UUID REFERENCES user_profiles(id),

  -- Context links (all optional)
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  internal_project_id UUID REFERENCES internal_projects(id) ON DELETE SET NULL,
  phase_id UUID REFERENCES proposal_phases(id) ON DELETE SET NULL,
  milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,

  -- Timeline
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Recurrence (optional)
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern VARCHAR(50),

  -- Metadata
  tags TEXT[],
  estimated_minutes INTEGER,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_todo_status CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  CONSTRAINT chk_todo_priority CHECK (priority IN ('low', 'medium', 'high', 'urgent'))
);

-- Comments for todos
COMMENT ON TABLE todos IS 'Team todo items with optional project linkage';
COMMENT ON COLUMN todos.status IS 'Status: pending, in_progress, completed, cancelled';
COMMENT ON COLUMN todos.priority IS 'Priority: low, medium, high, urgent';
COMMENT ON COLUMN todos.is_recurring IS 'Whether this todo repeats on a schedule';
COMMENT ON COLUMN todos.estimated_minutes IS 'Estimated time to complete in minutes';

-- ============================================================================
-- Next Actions Table (Quick capture for per-project actions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS next_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Required context
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,

  -- Content
  action_text VARCHAR(500) NOT NULL,

  -- Status
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  completed_by UUID REFERENCES user_profiles(id),

  -- Assignment
  assigned_to UUID REFERENCES user_profiles(id),

  -- Timeline
  due_date DATE,

  -- Ordering
  sort_order INTEGER DEFAULT 0,

  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments for next_actions
COMMENT ON TABLE next_actions IS 'Quick next action items specific to a project';
COMMENT ON COLUMN next_actions.action_text IS 'Brief description of the next action';

-- ============================================================================
-- Views for convenience
-- ============================================================================

-- View: My pending todos with project context
CREATE OR REPLACE VIEW v_user_todos AS
SELECT
  t.*,
  p.project_name,
  p.client_name,
  ip.name as internal_project_name,
  up.full_name as assigned_to_name
FROM todos t
LEFT JOIN proposals p ON t.proposal_id = p.id
LEFT JOIN internal_projects ip ON t.internal_project_id = ip.id
LEFT JOIN user_profiles up ON t.assigned_to = up.id
WHERE t.status != 'cancelled';

COMMENT ON VIEW v_user_todos IS 'Todos with project context for dashboard display';

-- View: Team workload summary
CREATE OR REPLACE VIEW v_team_workload AS
SELECT
  up.id as user_profile_id,
  up.full_name,
  up.email,
  COUNT(DISTINCT CASE WHEN t.status IN ('pending', 'in_progress') THEN t.id END) as active_todos,
  COUNT(DISTINCT CASE WHEN t.status IN ('pending', 'in_progress') AND t.priority = 'urgent' THEN t.id END) as urgent_todos,
  COUNT(DISTINCT CASE WHEN t.due_date < CURRENT_DATE AND t.status IN ('pending', 'in_progress') THEN t.id END) as overdue_todos,
  COUNT(DISTINCT pm.proposal_id) as active_projects
FROM user_profiles up
LEFT JOIN todos t ON t.assigned_to = up.id
LEFT JOIN project_members pm ON pm.user_profile_id = up.id
WHERE up.is_active = true AND up.system_role IN ('admin', 'team_member')
GROUP BY up.id, up.full_name, up.email;

COMMENT ON VIEW v_team_workload IS 'Team workload summary for dashboard';

-- View: Project next actions
CREATE OR REPLACE VIEW v_project_next_actions AS
SELECT
  na.*,
  p.project_name,
  p.client_name,
  assigned.full_name as assigned_to_name,
  creator.full_name as created_by_name
FROM next_actions na
JOIN proposals p ON na.proposal_id = p.id
LEFT JOIN user_profiles assigned ON na.assigned_to = assigned.id
LEFT JOIN user_profiles creator ON na.created_by = creator.id
WHERE na.is_completed = false;

COMMENT ON VIEW v_project_next_actions IS 'Pending next actions with project context';

-- ============================================================================
-- Indexes
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_todos_assigned
ON todos(assigned_to)
WHERE assigned_to IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_todos_status
ON todos(status);

CREATE INDEX IF NOT EXISTS idx_todos_due_date
ON todos(due_date)
WHERE due_date IS NOT NULL AND status IN ('pending', 'in_progress');

CREATE INDEX IF NOT EXISTS idx_todos_proposal
ON todos(proposal_id)
WHERE proposal_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_todos_internal_project
ON todos(internal_project_id)
WHERE internal_project_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_next_actions_proposal
ON next_actions(proposal_id);

CREATE INDEX IF NOT EXISTS idx_next_actions_assigned
ON next_actions(assigned_to)
WHERE assigned_to IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_next_actions_pending
ON next_actions(proposal_id, is_completed)
WHERE is_completed = false;
