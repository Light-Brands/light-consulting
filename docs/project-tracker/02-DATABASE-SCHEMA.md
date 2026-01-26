# Project Tracker - Database Schema

## Migration 1: Core Tracking Fields

**File:** `supabase/migrations/001-add-project-tracking-fields.sql`

```sql
-- Add progress tracking to proposals
ALTER TABLE proposals
ADD COLUMN IF NOT EXISTS progress_percentage INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS portfolio_project_id UUID REFERENCES projects(id);

-- Add phase status tracking
ALTER TABLE proposal_phases
ADD COLUMN IF NOT EXISTS phase_status VARCHAR(50) DEFAULT 'not_started'
  CHECK (phase_status IN ('not_started', 'in_progress', 'completed', 'blocked')),
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Index for fast active projects query
CREATE INDEX IF NOT EXISTS idx_proposals_active_projects
ON proposals(status, updated_at DESC)
WHERE status IN ('active', 'agreement_signed');
```

---

## Migration 2: User Management System

**File:** `supabase/migrations/002-user-management.sql`

```sql
-- ============================================
-- USER ACCOUNTS TABLE
-- Extends Supabase auth with app-specific data
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Profile info
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  avatar_url TEXT,

  -- Role in the system
  system_role VARCHAR(50) NOT NULL DEFAULT 'client'
    CHECK (system_role IN ('super_admin', 'admin', 'developer', 'manager', 'client')),

  -- Status
  status VARCHAR(50) DEFAULT 'active'
    CHECK (status IN ('active', 'inactive', 'pending_verification')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,

  -- Invitation tracking
  invited_by UUID REFERENCES user_profiles(id),
  invited_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- PROJECT MEMBERS TABLE
-- Links users to projects with specific roles
-- ============================================
CREATE TABLE IF NOT EXISTS project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,

  -- Role within this project
  project_role VARCHAR(50) NOT NULL DEFAULT 'viewer'
    CHECK (project_role IN ('owner', 'admin', 'developer', 'manager', 'client_admin', 'client_viewer')),

  -- Granular permissions (JSON for flexibility)
  permissions JSONB DEFAULT '{
    "view_proposal": true,
    "view_progress": true,
    "view_financials": false,
    "approve_proposal": false,
    "make_payments": false,
    "manage_team": false,
    "update_status": false,
    "add_deliverables": false
  }'::jsonb,

  -- Assignment tracking
  assigned_by UUID REFERENCES user_profiles(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Notifications
  notify_on_updates BOOLEAN DEFAULT true,
  notify_on_milestones BOOLEAN DEFAULT true,

  -- Unique constraint: one user per project
  UNIQUE(proposal_id, user_id)
);

-- ============================================
-- USER INVITATIONS TABLE
-- Pending invitations to join the platform
-- ============================================
CREATE TABLE IF NOT EXISTS user_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Invitation details
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),

  -- What they're being invited to
  invited_role VARCHAR(50) NOT NULL DEFAULT 'client'
    CHECK (invited_role IN ('developer', 'manager', 'client_admin', 'client_viewer')),
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,  -- Optional: invite to specific project

  -- Token for secure invitation link
  invitation_token UUID NOT NULL DEFAULT gen_random_uuid(),

  -- Tracking
  invited_by UUID NOT NULL REFERENCES user_profiles(id),
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),

  -- Status
  status VARCHAR(50) DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'expired', 'cancelled')),
  accepted_at TIMESTAMP WITH TIME ZONE,

  -- Unique active invitation per email per project
  UNIQUE(email, proposal_id, status)
);

-- Indexes for performance
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_system_role ON user_profiles(system_role);
CREATE INDEX idx_project_members_proposal ON project_members(proposal_id);
CREATE INDEX idx_project_members_user ON project_members(user_id);
CREATE INDEX idx_user_invitations_token ON user_invitations(invitation_token);
CREATE INDEX idx_user_invitations_email ON user_invitations(email);
```

---

## Migration 3: Deliverable Links System

**File:** `supabase/migrations/003-deliverable-links.sql`

```sql
-- ============================================
-- DELIVERABLE LINKS TABLE
-- Links associated with completed deliverables
-- ============================================
CREATE TABLE IF NOT EXISTS deliverable_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- What this link belongs to
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES proposal_phases(id) ON DELETE SET NULL,
  milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,

  -- Link details
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,

  -- Link categorization
  link_type VARCHAR(50) NOT NULL DEFAULT 'deliverable'
    CHECK (link_type IN (
      'live_site',        -- Production URL
      'staging',          -- Staging/preview URL
      'documentation',    -- Docs, guides, etc.
      'assets',           -- Design files, images, etc.
      'repository',       -- GitHub, GitLab, etc.
      'credentials',      -- Login info (secure)
      'video',            -- Loom, YouTube, etc.
      'other'             -- Catch-all
    )),

  -- Access control
  is_public BOOLEAN DEFAULT false,  -- Visible before deliverable complete?
  is_active BOOLEAN DEFAULT true,   -- Link still valid?

  -- Client visibility
  visible_to_client BOOLEAN DEFAULT false,  -- Shown in client portal?
  made_visible_at TIMESTAMP WITH TIME ZONE, -- When was it revealed?

  -- Tracking
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Click tracking
  click_count INTEGER DEFAULT 0,
  last_clicked_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- DELIVERABLES TABLE (Enhanced)
-- Individual deliverable items within phases
-- ============================================
CREATE TABLE IF NOT EXISTS deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Parent references
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES proposal_phases(id) ON DELETE SET NULL,

  -- Deliverable details
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- Status tracking
  status VARCHAR(50) DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_progress', 'review', 'completed', 'blocked')),

  -- Assignment
  assigned_to UUID REFERENCES user_profiles(id),
  assigned_at TIMESTAMP WITH TIME ZONE,

  -- Timeline
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Ordering
  sort_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_deliverable_links_proposal ON deliverable_links(proposal_id);
CREATE INDEX idx_deliverable_links_visible ON deliverable_links(proposal_id, visible_to_client)
  WHERE visible_to_client = true;
CREATE INDEX idx_deliverables_proposal ON deliverables(proposal_id);
CREATE INDEX idx_deliverables_assigned ON deliverables(assigned_to);
CREATE INDEX idx_deliverables_status ON deliverables(status);
```

---

## Migration 4: Team Assignment

**File:** `supabase/migrations/004-team-assignment.sql`

```sql
-- ============================================
-- PHASE/MILESTONE ASSIGNMENTS
-- Assign team members to specific work
-- ============================================

-- Add assignment fields to phases
ALTER TABLE proposal_phases
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES user_profiles(id),
ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMP WITH TIME ZONE;

-- Add assignment fields to milestones
ALTER TABLE milestones
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES user_profiles(id),
ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMP WITH TIME ZONE;

-- ============================================
-- ACTIVITY LOG TABLE
-- Track all project activities
-- ============================================
CREATE TABLE IF NOT EXISTS project_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- What project/entity
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL,  -- 'phase', 'milestone', 'deliverable', 'link', 'comment'
  entity_id UUID,

  -- Who did it
  user_id UUID REFERENCES user_profiles(id),
  user_name VARCHAR(255),  -- Denormalized for display

  -- What happened
  action VARCHAR(100) NOT NULL,  -- 'created', 'updated', 'completed', 'assigned', etc.
  description TEXT,

  -- Changes (for auditing)
  old_values JSONB,
  new_values JSONB,

  -- Visibility
  visible_to_client BOOLEAN DEFAULT true,

  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast activity queries
CREATE INDEX idx_activity_log_proposal ON project_activity_log(proposal_id, created_at DESC);
CREATE INDEX idx_activity_log_client_visible ON project_activity_log(proposal_id, visible_to_client, created_at DESC)
  WHERE visible_to_client = true;
```

---

## Migration 5: Project Categories & Enhanced Statuses

**File:** `supabase/migrations/005-project-categories.sql`

```sql
-- ============================================
-- PROJECT CATEGORIES
-- Organize projects by type
-- ============================================

-- Add category and enhanced status to proposals
ALTER TABLE proposals
ADD COLUMN IF NOT EXISTS project_category VARCHAR(50) DEFAULT 'client'
  CHECK (project_category IN (
    'client',           -- Paid client work
    'prospect',         -- Potential clients in discovery
    'internal',         -- Internal brand/product development
    'personal_brand',   -- AI Personal Doubles, individual brands
    'core_offer',       -- Products/services being launched
    'service_provider', -- Vendors/contractors we work with
    'archived'          -- Completed/finalized projects
  )),
ADD COLUMN IF NOT EXISTS is_on_hold BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS on_hold_reason TEXT,
ADD COLUMN IF NOT EXISTS on_hold_at TIMESTAMP WITH TIME ZONE;

-- ============================================
-- INTERNAL PROJECTS TABLE
-- For non-client projects that don't need full proposal structure
-- ============================================
CREATE TABLE IF NOT EXISTS internal_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic info
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- Categorization
  project_category VARCHAR(50) NOT NULL DEFAULT 'internal'
    CHECK (project_category IN ('internal', 'personal_brand', 'core_offer', 'service_provider')),

  -- Status
  status VARCHAR(50) DEFAULT 'planning'
    CHECK (status IN ('planning', 'in_progress', 'on_hold', 'completed', 'cancelled')),

  -- Timeline
  target_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Additional context
  notes TEXT,
  tags TEXT[],  -- For flexible categorization

  -- Ownership
  owner_id UUID REFERENCES user_profiles(id),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast queries
CREATE INDEX idx_proposals_category ON proposals(project_category);
CREATE INDEX idx_proposals_on_hold ON proposals(is_on_hold) WHERE is_on_hold = true;
CREATE INDEX idx_internal_projects_category ON internal_projects(project_category, status);
CREATE INDEX idx_internal_projects_owner ON internal_projects(owner_id);
```

---

## Migration 6: Team Todo System

**File:** `supabase/migrations/006-team-todos.sql`

```sql
-- ============================================
-- TODOS TABLE
-- Personal and assigned tasks for team members
-- ============================================
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Who owns this todo
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,

  -- Todo content
  title VARCHAR(500) NOT NULL,
  description TEXT,

  -- Categorization
  todo_type VARCHAR(50) DEFAULT 'task'
    CHECK (todo_type IN (
      'task',           -- General task
      'deliverable',    -- Linked to project deliverable
      'admin',          -- Administrative/business
      'follow_up',      -- Communication/outreach
      'review',         -- Items needing review/approval
      'meeting',        -- Calls/meetings to schedule
      'financial'       -- Money-related
    )),

  -- Priority
  priority VARCHAR(20) DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high', 'urgent')),

  -- Status
  status VARCHAR(50) DEFAULT 'pending'
    CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled', 'deferred')),

  -- Timeline
  due_date DATE,
  due_time TIME,  -- For time-specific todos
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Linking (optional - can link to various entities)
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  internal_project_id UUID REFERENCES internal_projects(id) ON DELETE SET NULL,
  deliverable_id UUID REFERENCES deliverables(id) ON DELETE SET NULL,
  phase_id UUID REFERENCES proposal_phases(id) ON DELETE SET NULL,
  milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,

  -- Assignment tracking
  assigned_by UUID REFERENCES user_profiles(id),
  assigned_at TIMESTAMP WITH TIME ZONE,

  -- Recurrence (optional)
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern VARCHAR(50),  -- 'daily', 'weekly', 'monthly', etc.

  -- Notes/context
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- QUICK ACTIONS / NEXT STEPS
-- Lightweight follow-up items captured in context
-- ============================================
CREATE TABLE IF NOT EXISTS next_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- What needs to happen
  action_text VARCHAR(500) NOT NULL,

  -- Who should do it
  assigned_to UUID REFERENCES user_profiles(id),

  -- Context (where was this captured)
  context_type VARCHAR(50),  -- 'meeting', 'project_review', 'conversation', etc.
  context_notes TEXT,

  -- Linking
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  internal_project_id UUID REFERENCES internal_projects(id) ON DELETE SET NULL,

  -- Status
  status VARCHAR(50) DEFAULT 'pending'
    CHECK (status IN ('pending', 'completed', 'converted_to_todo', 'cancelled')),

  -- When converted to a full todo
  converted_to_todo_id UUID REFERENCES todos(id),

  -- Timeline
  due_date DATE,

  -- Tracking
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_todos_user ON todos(user_id, status);
CREATE INDEX idx_todos_user_due ON todos(user_id, due_date) WHERE status = 'pending';
CREATE INDEX idx_todos_proposal ON todos(proposal_id) WHERE proposal_id IS NOT NULL;
CREATE INDEX idx_todos_priority ON todos(user_id, priority, status);
CREATE INDEX idx_next_actions_assigned ON next_actions(assigned_to, status);
CREATE INDEX idx_next_actions_proposal ON next_actions(proposal_id) WHERE proposal_id IS NOT NULL;

-- ============================================
-- HELPFUL VIEWS
-- ============================================

-- View: User's pending todos with project info
CREATE OR REPLACE VIEW user_todos_with_context AS
SELECT
  t.*,
  p.project_name AS linked_project_name,
  ip.title AS linked_internal_project_name,
  d.title AS linked_deliverable_name,
  COALESCE(p.project_name, ip.title) AS project_context
FROM todos t
LEFT JOIN proposals p ON t.proposal_id = p.id
LEFT JOIN internal_projects ip ON t.internal_project_id = ip.id
LEFT JOIN deliverables d ON t.deliverable_id = d.id
WHERE t.status IN ('pending', 'in_progress');

-- View: Team workload summary
CREATE OR REPLACE VIEW team_workload_summary AS
SELECT
  up.id AS user_id,
  up.full_name,
  up.avatar_url,
  COUNT(t.id) FILTER (WHERE t.status = 'pending') AS pending_count,
  COUNT(t.id) FILTER (WHERE t.status = 'in_progress') AS in_progress_count,
  COUNT(t.id) FILTER (WHERE t.priority = 'high' AND t.status = 'pending') AS high_priority_count,
  COUNT(t.id) FILTER (WHERE t.priority = 'urgent' AND t.status = 'pending') AS urgent_count,
  COUNT(t.id) FILTER (WHERE t.due_date = CURRENT_DATE AND t.status = 'pending') AS due_today_count,
  COUNT(t.id) FILTER (WHERE t.due_date < CURRENT_DATE AND t.status = 'pending') AS overdue_count
FROM user_profiles up
LEFT JOIN todos t ON t.user_id = up.id
WHERE up.system_role IN ('super_admin', 'admin', 'developer', 'manager')
GROUP BY up.id, up.full_name, up.avatar_url;
```

---

## Database Changes Summary

| Type | Details |
|------|---------|
| New Tables | `user_profiles`, `project_members`, `user_invitations`, `deliverable_links`, `deliverables`, `project_activity_log`, `internal_projects`, `todos`, `next_actions` |
| Altered Tables | `proposals`, `proposal_phases`, `milestones` |
| New Views | `user_todos_with_context`, `team_workload_summary` |
| Indexes | 20+ performance indexes |
