# Project Tracker Dashboard (Command Center)
## Comprehensive Implementation Plan

**Light Brand Consulting**
**Date:** January 2026 (Updated)**

---

## Executive Summary

This plan outlines the implementation of a **Project Tracker Dashboard** with two integrated portals:

1. **Command Center (Admin/Developer Portal)** - Internal dashboard for managing projects, assigning work, and tracking progress
2. **Client Portal** - Interactive client-facing dashboard where clients view proposals, approve work, make payments, and track project progress in real-time

The good news: **90% of the infrastructure already exists**. The proposals system with phases, milestones, and dashboard updates IS the project tracking system. What's needed is unified views for both admins AND clients to interact with this data.

### Key Insights
- When a proposal's status becomes `'active'`, it IS an active project
- Clients need their own interactive portal to see progress and access deliverables
- Deliverables culminate in **links** that clients can access
- Multiple users (clients and team members) can be associated with each project
- We're not building separate systems—we're building unified dashboards for different user roles

---

## Two-Portal Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PROJECT TRACKER SYSTEM                           │
├─────────────────────────────────┬───────────────────────────────────────┤
│      COMMAND CENTER             │         CLIENT PORTAL                 │
│      (Admin/Developer)          │         (Client Users)                │
├─────────────────────────────────┼───────────────────────────────────────┤
│  • View all active projects     │  • View assigned proposals            │
│  • Assign work to developers    │  • Approve proposals                  │
│  • Track team progress          │  • Make milestone payments            │
│  • Complete phases/milestones   │  • Watch project progress live        │
│  • Add deliverable links        │  • Access delivered links             │
│  • Invite team members          │  • Invite team collaborators          │
│  • Mark deliverables complete   │  • View project updates               │
│  • Create portfolio entries     │  • Download assets/resources          │
└─────────────────────────────────┴───────────────────────────────────────┘
```

---

## User Roles & Access Model

### Role Definitions

| Role | Access | Description |
|------|--------|-------------|
| **Super Admin** | Full system access | Light Brand team owners |
| **Developer** | Command Center | Assigned team members who execute work |
| **Manager** | Command Center (filtered) | Oversee specific projects |
| **Client Admin** | Client Portal | Primary client contact, full proposal access |
| **Client User** | Client Portal (limited) | Additional client stakeholders, view-only or limited access |

### User-Project Relationships

```
Users ←──────────→ Projects (Many-to-Many)
  │                    │
  │                    │
  └── user_projects ───┘
         │
         ├── role (owner, admin, member, viewer)
         ├── permissions (view, approve, pay, manage)
         └── invited_by, invited_at
```

---

## Current Infrastructure (Already Built)

### Database Tables (8 Tables)
| Table | Purpose |
|-------|---------|
| `proposals` | Core project data, client info, status, timeline |
| `proposal_phases` | Work breakdown into phases with deliverables |
| `milestones` | Payment checkpoints and progress markers |
| `agreements` | Contract/service agreement tracking |
| `onboarding_forms` | Client intake after signing |
| `dashboard_updates` | Progress updates visible to clients |
| `proposal_comments` | Activity log and communication |
| `lead_submissions` | Lead pipeline before proposal |

### Existing Status Tracking
```
Proposals:  draft → sent → viewed → agreement_signed → active → completed
Milestones: not_started → in_progress → completed | blocked
Leads:      new → contacted → proposal_sent → converted → archived
```

### Existing API Routes (35+)
- Full CRUD for proposals, phases, milestones
- Dashboard updates and comments
- Stripe payment integration
- Client portal access

---

## What We're Building

### 1. Command Center Dashboard (`/admin/command-center`)
A single-page view showing:
- All active projects at a glance
- Progress indicators for each project
- Client and payment status
- Upcoming milestones and deadlines
- Quick actions to update status

### 2. Enhanced Project Detail View
Improvements to existing proposal detail page:
- Phase progress tracker with status toggles
- Milestone completion quick actions
- "Add to Portfolio" button when completed

### 3. Portfolio Integration
When a project is completed:
- One-click to create portfolio entry
- Auto-populate from project data
- Link back for reference

### 4. Client Portal (`/client-portal`)
An interactive client-facing dashboard where clients can:
- View all their proposals and active projects
- Approve proposals and sign agreements
- Make milestone payments via Stripe
- Watch project progress in real-time
- Access deliverable links as work is completed
- Invite team members to view project progress

### 5. User Management System
Complete user authentication and authorization:
- Email/password client registration
- Invite system for clients and team members
- Role-based access control
- Multi-user projects with granular permissions

### 6. Deliverable Links System
Every completed deliverable culminates in accessible links:
- Multiple links per deliverable
- Link types (live site, staging, documentation, assets, etc.)
- Links revealed to clients when deliverable is marked complete
- Organized link library per project for clients

### 7. Team Assignment (Developer Portal)
Assign work to team members:
- Assign developers to projects/phases/milestones
- Invite developers and managers to the platform
- Track who's working on what
- Workload visibility across team

---

## Implementation Plan

### Phase 1: Database Enhancement

#### Migration 1: Core Tracking Fields

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

#### Migration 2: User Management System

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

#### Migration 3: Deliverable Links System

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

#### Migration 4: Team Assignment

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

**Database Changes Summary:**
- 4 new tables: `user_profiles`, `project_members`, `user_invitations`, `deliverable_links`
- 1 new table: `deliverables` (individual deliverable items)
- 1 new table: `project_activity_log`
- Assignment fields on `proposal_phases` and `milestones`
- Comprehensive indexes for performance

---

### Phase 2: Type Definitions

**File:** `src/types/proposals.ts` (additions)

```typescript
// Add phase status to existing ProposalPhase interface
export type PhaseStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked';

// Extended proposal fields
export interface ProposalUpdate {
  // ... existing fields ...
  progress_percentage?: number;
  last_activity_at?: string | null;
  portfolio_project_id?: string | null;
}

// Command Center aggregated view
export interface ActiveProjectSummary {
  id: string;
  project_name: string;
  client_name: string;
  client_company: string | null;
  status: ProposalStatus;
  progress_percentage: number;

  // Phase tracking
  total_phases: number;
  completed_phases: number;
  current_phase: string | null;

  // Milestone tracking
  total_milestones: number;
  completed_milestones: number;

  // Financial
  total_amount: number;
  paid_amount: number;
  pending_amount: number;

  // Timeline
  start_date: string | null;
  estimated_completion_date: string | null;
  days_since_update: number;

  // Next action
  next_milestone: {
    id: string;
    name: string;
    due_date: string | null;
    status: MilestoneStatus;
  } | null;

  // Risk indicators
  is_overdue: boolean;
  is_stale: boolean; // No updates in 7+ days
  has_blocked_items: boolean;

  // Team (NEW)
  assigned_team: TeamMemberSummary[];
}

export interface CommandCenterStats {
  total_active_projects: number;
  total_pipeline_value: number;
  collected_amount: number;
  pending_amount: number;
  projects_on_track: number;
  projects_at_risk: number;
  upcoming_deadlines: number; // Milestones due in next 7 days
}
```

**File:** `src/types/users.ts` (NEW)

```typescript
// System roles
export type SystemRole = 'super_admin' | 'admin' | 'developer' | 'manager' | 'client';

// Project-specific roles
export type ProjectRole = 'owner' | 'admin' | 'developer' | 'manager' | 'client_admin' | 'client_viewer';

// User status
export type UserStatus = 'active' | 'inactive' | 'pending_verification';

// User profile
export interface UserProfile {
  id: string;
  auth_user_id: string;
  email: string;
  full_name: string;
  company: string | null;
  phone: string | null;
  avatar_url: string | null;
  system_role: SystemRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
  invited_by: string | null;
  invited_at: string | null;
}

// Project membership
export interface ProjectMember {
  id: string;
  proposal_id: string;
  user_id: string;
  project_role: ProjectRole;
  permissions: ProjectPermissions;
  assigned_by: string | null;
  assigned_at: string;
  notify_on_updates: boolean;
  notify_on_milestones: boolean;

  // Joined data
  user?: UserProfile;
}

export interface ProjectPermissions {
  view_proposal: boolean;
  view_progress: boolean;
  view_financials: boolean;
  approve_proposal: boolean;
  make_payments: boolean;
  manage_team: boolean;
  update_status: boolean;
  add_deliverables: boolean;
}

// Summary for display
export interface TeamMemberSummary {
  id: string;
  name: string;
  role: ProjectRole;
  avatar_url: string | null;
}

// Invitation
export interface UserInvitation {
  id: string;
  email: string;
  full_name: string | null;
  invited_role: ProjectRole;
  proposal_id: string | null;
  invitation_token: string;
  invited_by: string;
  invited_at: string;
  expires_at: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  accepted_at: string | null;
}
```

**File:** `src/types/deliverables.ts` (NEW)

```typescript
// Link types
export type DeliverableLinkType =
  | 'live_site'
  | 'staging'
  | 'documentation'
  | 'assets'
  | 'repository'
  | 'credentials'
  | 'video'
  | 'other';

// Deliverable status
export type DeliverableStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'blocked';

// Deliverable link
export interface DeliverableLink {
  id: string;
  proposal_id: string;
  phase_id: string | null;
  milestone_id: string | null;
  title: string;
  url: string;
  description: string | null;
  link_type: DeliverableLinkType;
  is_public: boolean;
  is_active: boolean;
  visible_to_client: boolean;
  made_visible_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  click_count: number;
  last_clicked_at: string | null;

  // Joined data
  phase?: { title: string };
  milestone?: { milestone_name: string };
}

// Individual deliverable item
export interface Deliverable {
  id: string;
  proposal_id: string;
  phase_id: string | null;
  title: string;
  description: string | null;
  status: DeliverableStatus;
  assigned_to: string | null;
  assigned_at: string | null;
  due_date: string | null;
  completed_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;

  // Joined data
  assignee?: UserProfile;
  links?: DeliverableLink[];
}

// For creating new links
export interface CreateDeliverableLinkInput {
  proposal_id: string;
  phase_id?: string;
  milestone_id?: string;
  title: string;
  url: string;
  description?: string;
  link_type: DeliverableLinkType;
  visible_to_client?: boolean;
}
```

**File:** `src/types/client-portal.ts` (NEW)

```typescript
// Client's view of a project
export interface ClientProject {
  id: string;
  project_name: string;
  status: ProposalStatus;
  progress_percentage: number;
  current_phase: string | null;

  // Summary stats
  total_phases: number;
  completed_phases: number;
  total_milestones: number;
  completed_milestones: number;

  // Financial (client view)
  total_amount: number;
  paid_amount: number;
  next_payment: {
    milestone_name: string;
    amount: number;
    due_date: string | null;
  } | null;

  // Deliverables count
  deliverable_links_count: number;

  // Timeline
  estimated_completion_date: string | null;
  last_update_at: string | null;
}

// Client's detailed project view
export interface ClientProjectDetail extends ClientProject {
  // Phases with deliverables
  phases: ClientPhase[];

  // All visible deliverable links
  deliverable_links: DeliverableLink[];

  // Milestones with payment status
  milestones: ClientMilestone[];

  // Recent activity
  activity: ClientActivityItem[];

  // Team working on project
  team: TeamMemberSummary[];
}

export interface ClientPhase {
  id: string;
  title: string;
  status: PhaseStatus;
  sort_order: number;
  deliverables: ClientDeliverable[];
  links: DeliverableLink[];
}

export interface ClientDeliverable {
  id: string;
  title: string;
  status: DeliverableStatus;
  completed_at: string | null;
}

export interface ClientMilestone {
  id: string;
  milestone_name: string;
  amount: number;
  payment_status: 'pending' | 'paid' | 'overdue';
  due_date: string | null;
  can_pay: boolean;  // True if this is the next payable milestone
}

export interface ClientActivityItem {
  id: string;
  action: string;
  description: string;
  created_at: string;
  user_name: string;
}
```

---

### Phase 3: API Development

#### 3.1 Command Center Aggregation Endpoint

**File:** `src/app/api/command-center/route.ts`

```typescript
/**
 * Command Center API
 * GET /api/command-center
 *
 * Returns aggregated view of all active projects with calculated metrics
 */

export async function GET(request: NextRequest) {
  // 1. Authenticate admin
  // 2. Fetch proposals WHERE status IN ('active', 'agreement_signed')
  // 3. For each proposal, fetch phases and milestones
  // 4. Calculate:
  //    - progress_percentage = (completed_milestones / total_milestones) * 100
  //    - paid_amount = SUM(milestones WHERE payment_status = 'paid')
  //    - days_since_update = NOW() - last dashboard update
  //    - is_stale = days_since_update > 7
  //    - has_blocked_items = ANY milestone_status = 'blocked'
  // 5. Aggregate stats
  // 6. Return { projects: ActiveProjectSummary[], stats: CommandCenterStats }
}
```

#### 3.2 Quick Status Update Endpoint

**File:** `src/app/api/command-center/quick-update/route.ts`

```typescript
/**
 * Quick Update API
 * POST /api/command-center/quick-update
 *
 * Allows rapid status updates from Command Center without navigating away
 *
 * Body: {
 *   proposal_id: string,
 *   action: 'complete_milestone' | 'complete_phase' | 'add_update' | 'mark_blocked',
 *   target_id?: string,  // milestone_id or phase_id
 *   data?: { title?: string, content?: string }
 * }
 */
```

#### 3.3 Portfolio Creation Endpoint

**File:** `src/app/api/proposals/[id]/to-portfolio/route.ts`

```typescript
/**
 * Create Portfolio Entry from Completed Project
 * POST /api/proposals/[id]/to-portfolio
 *
 * Body: {
 *   title?: string,        // Override project_name
 *   description?: string,  // Override project_overview
 *   featured?: boolean,
 *   tags?: string[],
 *   // ... other portfolio fields
 * }
 *
 * Returns: { portfolio_project: Project, proposal_updated: boolean }
 */
```

---

### Phase 4: UI Components

#### 4.1 Project Status Card

**File:** `src/components/admin/ProjectCard.tsx`

```
┌─────────────────────────────────────────────────────────────┐
│  [●] ClientCo Website Redesign                    $15,000   │
│      ClientCo • John Smith                                  │
│  ┌─────────────────────────────────────────────────┐        │
│  │████████████████████░░░░░░░░░░░░░░│ 65%          │        │
│  └─────────────────────────────────────────────────┘        │
│                                                             │
│  Phases: 3/4 complete    Milestones: 5/8 complete           │
│  Paid: $10,000 / $15,000                                    │
│                                                             │
│  ⏰ Next: Final Review (Due in 3 days)                      │
│                                                             │
│  [+ Update]  [View Details]  [Mark Complete]                │
└─────────────────────────────────────────────────────────────┘
```

Features:
- Color-coded status indicator (green = on track, amber = needs attention, red = at risk)
- Progress bar with percentage
- Phase and milestone completion counts
- Payment status
- Next upcoming milestone with due date
- Quick action buttons
- "Last updated X days ago" warning if stale

#### 4.2 Command Center Stats Bar

**File:** `src/components/admin/CommandCenterStats.tsx`

```
┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│    6     │  $125K   │   $85K   │   $40K   │    4     │    2     │
│  Active  │ Pipeline │ Collected│ Pending  │ On Track │ At Risk  │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
```

#### 4.3 Phase Progress Tracker

**File:** `src/components/admin/PhaseProgressTracker.tsx`

Visual phase list with:
- Status dropdown (not_started, in_progress, completed, blocked)
- Deliverables checklist
- Quick complete button
- Timeline dates

#### 4.4 Quick Update Modal

**File:** `src/components/admin/QuickUpdateModal.tsx`

Modal for rapid updates without leaving Command Center:
- Update type selector
- Optional milestone association
- Title and content fields
- One-click submit

---

### Phase 5: Command Center Page

**File:** `src/app/admin/command-center/page.tsx`

```tsx
export default function CommandCenterPage() {
  // Features:
  // 1. Stats bar at top
  // 2. Filter tabs: All Active | On Track | Needs Attention | At Risk
  // 3. View toggle: Cards | List | Timeline
  // 4. Project cards grid (responsive)
  // 5. Quick update modal
  // 6. Auto-refresh every 30 seconds (optional)
}
```

**Layout (Desktop):**
```
┌─────────────────────────────────────────────────────────────────────┐
│  Command Center                                    [+ New Proposal] │
├─────────────────────────────────────────────────────────────────────┤
│  [6 Active] [$125K Pipeline] [$85K Collected] [$40K Pending] [4 ✓] │
├─────────────────────────────────────────────────────────────────────┤
│  [All Active] [On Track] [Needs Attention]     [Cards] [List]      │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐│
│  │   Project Card    │  │   Project Card    │  │   Project Card    ││
│  │   (ClientCo)      │  │   (BrandX)        │  │   (StartupY)      ││
│  └───────────────────┘  └───────────────────┘  └───────────────────┘│
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐│
│  │   Project Card    │  │   Project Card    │  │   Project Card    ││
│  │   (AgencyCo)      │  │   (TechFirm)      │  │   (MediaGroup)    ││
│  └───────────────────┘  └───────────────────┘  └───────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**Layout (Mobile):**
```
┌─────────────────────────┐
│  Command Center    [≡]  │
├─────────────────────────┤
│  6 Active    $125K      │
│  4 On Track  2 At Risk  │
├─────────────────────────┤
│  ┌─────────────────────┐│
│  │   Project Card      ││
│  │   (Compact View)    ││
│  └─────────────────────┘│
│  ┌─────────────────────┐│
│  │   Project Card      ││
│  └─────────────────────┘│
│  ┌─────────────────────┐│
│  │   Project Card      ││
│  └─────────────────────┘│
└─────────────────────────┘
```

---

---

## CLIENT PORTAL IMPLEMENTATION

The Client Portal is the client-facing counterpart to the Command Center. It provides clients with an interactive, real-time view of their projects.

### Client Portal: Authentication Flow

```
1. CLIENT INVITED (by admin or during proposal creation)
   └─→ Email sent with invitation link
   └─→ Invitation stored with token

2. CLIENT CLICKS LINK
   └─→ Redirected to /auth/accept-invitation?token=xxx
   └─→ Invitation validated

3. CLIENT CREATES ACCOUNT
   └─→ Email pre-filled from invitation
   └─→ Sets password
   └─→ Creates user_profile record
   └─→ Links auth.users to user_profile

4. CLIENT LOGGED IN
   └─→ Redirected to /client-portal
   └─→ Sees all projects they have access to

5. RETURNING CLIENT
   └─→ Standard email/password login
   └─→ "Forgot password" flow via Supabase Auth
```

### Client Portal: Page Structure

**File:** `src/app/client-portal/page.tsx` (Dashboard)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🌟 Light Brand Consulting                    [John Smith ▼] [Logout]   │
│  Client Portal                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Welcome back, John!                                                    │
│                                                                         │
│  ┌─ YOUR PROJECTS ──────────────────────────────────────────────────┐  │
│  │                                                                   │  │
│  │  ┌─────────────────────────────────────────────────────────────┐ │  │
│  │  │  🟢 Website Redesign                          IN PROGRESS   │ │  │
│  │  │  ────────────────────────────────────────────────────────── │ │  │
│  │  │  Progress: ████████████████░░░░░░ 75%                       │ │  │
│  │  │                                                             │ │  │
│  │  │  Current Phase: Development                                 │ │  │
│  │  │  Next Milestone: Beta Review (Due Jan 30)                   │ │  │
│  │  │                                                             │ │  │
│  │  │  📎 3 Deliverables Ready    💳 $10,000 / $15,000 Paid       │ │  │
│  │  │                                                             │ │  │
│  │  │  [View Project Details →]                                   │ │  │
│  │  └─────────────────────────────────────────────────────────────┘ │  │
│  │                                                                   │  │
│  │  ┌─────────────────────────────────────────────────────────────┐ │  │
│  │  │  🟡 Brand Identity Package                    PENDING       │ │  │
│  │  │  ────────────────────────────────────────────────────────── │ │  │
│  │  │  Status: Awaiting Your Approval                             │ │  │
│  │  │                                                             │ │  │
│  │  │  Proposal Amount: $8,500                                    │ │  │
│  │  │  Estimated Timeline: 4 weeks                                │ │  │
│  │  │                                                             │ │  │
│  │  │  [Review & Approve Proposal →]                              │ │  │
│  │  └─────────────────────────────────────────────────────────────┘ │  │
│  │                                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─ RECENT ACTIVITY ────────────────────────────────────────────────┐  │
│  │  • Phase "Development" marked complete              2 hours ago  │  │
│  │  • New deliverable link added: Staging Site        Yesterday     │  │
│  │  • Milestone payment received: $5,000              3 days ago    │  │
│  │  • Dashboard update posted                         5 days ago    │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**File:** `src/app/client-portal/projects/[id]/page.tsx` (Project Detail)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard              Website Redesign              🟢 75%  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─ PROJECT PROGRESS ───────────────────────────────────────────────┐  │
│  │                                                                   │  │
│  │   [✓] Discovery ─────[✓] Design ─────[●] Development ─────[ ] Launch │
│  │                                                                   │  │
│  │   ██████████████████████████████████████████░░░░░░░░░░░░ 75%     │  │
│  │                                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─ PHASES & DELIVERABLES ──────────────────────────────────────────┐  │
│  │                                                                   │  │
│  │  ✅ Phase 1: Discovery                                COMPLETE   │  │
│  │  ├── ✓ Stakeholder Interviews                                    │  │
│  │  ├── ✓ Competitive Analysis                                      │  │
│  │  └── 📎 [Discovery Report PDF]                                   │  │
│  │                                                                   │  │
│  │  ✅ Phase 2: Design                                   COMPLETE   │  │
│  │  ├── ✓ Wireframes                                                │  │
│  │  ├── ✓ UI Design                                                 │  │
│  │  ├── 📎 [Figma Design Files]                                     │  │
│  │  └── 📎 [Style Guide]                                            │  │
│  │                                                                   │  │
│  │  🔵 Phase 3: Development                           IN PROGRESS   │  │
│  │  ├── ✓ Frontend Build                                            │  │
│  │  ├── ○ Backend Integration                                       │  │
│  │  ├── ○ Testing                                                   │  │
│  │  └── 📎 [Staging Site Preview]  ← NEW!                           │  │
│  │                                                                   │  │
│  │  ⚪ Phase 4: Launch                                   UPCOMING   │  │
│  │  └── (Deliverables will appear here when ready)                  │  │
│  │                                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─ YOUR DELIVERABLES ──────────────────────────────────────────────┐  │
│  │                                                                   │  │
│  │  All your project deliverables in one place:                     │  │
│  │                                                                   │  │
│  │  📎 Staging Site Preview        [View →]    Added Jan 25         │  │
│  │  📎 Figma Design Files          [View →]    Added Jan 15         │  │
│  │  📎 Style Guide                 [View →]    Added Jan 15         │  │
│  │  📎 Discovery Report PDF        [Download]  Added Jan 5          │  │
│  │                                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─ PAYMENTS & MILESTONES ──────────────────────────────────────────┐  │
│  │                                                                   │  │
│  │  Total: $15,000    Paid: $10,000    Remaining: $5,000            │  │
│  │  ██████████████████████████████████░░░░░░░░░░░░                   │  │
│  │                                                                   │  │
│  │  ✅ Milestone 1: Project Kickoff          $5,000    PAID         │  │
│  │  ✅ Milestone 2: Design Approval          $5,000    PAID         │  │
│  │  🔵 Milestone 3: Development Complete     $3,000    [Pay Now →]  │  │
│  │  ⚪ Milestone 4: Final Launch             $2,000    Upcoming     │  │
│  │                                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─ TEAM & COMMUNICATION ───────────────────────────────────────────┐  │
│  │                                                                   │  │
│  │  Your Team:                                                       │  │
│  │  👤 Sarah (Project Manager)  •  👤 Mike (Developer)               │  │
│  │                                                                   │  │
│  │  [📝 View Updates]  [💬 Send Message]  [👥 Invite Team Member]    │  │
│  │                                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**File:** `src/app/client-portal/proposals/[id]/page.tsx` (Proposal Review/Approval)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │              Brand Identity Package Proposal                     │   │
│  │              ─────────────────────────────────                   │   │
│  │                                                                  │   │
│  │              Prepared for: ClientCo Inc.                         │   │
│  │              Date: January 20, 2026                              │   │
│  │              Valid Until: February 20, 2026                      │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  [Scrollable Proposal Content Here]                                     │
│  - Overview                                                             │
│  - Scope of Work                                                        │
│  - Phases & Timeline                                                    │
│  - Investment                                                           │
│  - Terms & Conditions                                                   │
│                                                                         │
│  ┌─ INVESTMENT SUMMARY ─────────────────────────────────────────────┐  │
│  │                                                                   │  │
│  │  Total Investment: $8,500                                         │  │
│  │                                                                   │  │
│  │  Payment Schedule:                                                │  │
│  │  • 50% upfront ($4,250) - Due upon approval                       │  │
│  │  • 25% at midpoint ($2,125) - Due after design phase              │  │
│  │  • 25% on completion ($2,125) - Due after final delivery          │  │
│  │                                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  ☐ I have read and agree to the Terms & Conditions               │   │
│  │  ☐ I authorize payment of the first milestone ($4,250)           │   │
│  │                                                                  │   │
│  │  [✓ Approve & Pay First Milestone]        [Request Changes]      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Client Portal: API Endpoints

**File:** `src/app/api/client-portal/projects/route.ts`
```typescript
/**
 * GET /api/client-portal/projects
 * Returns all projects the authenticated client has access to
 */
```

**File:** `src/app/api/client-portal/projects/[id]/route.ts`
```typescript
/**
 * GET /api/client-portal/projects/[id]
 * Returns detailed project info including:
 * - Phases with status
 * - Visible deliverable links
 * - Milestones with payment status
 * - Activity log (client-visible entries)
 */
```

**File:** `src/app/api/client-portal/projects/[id]/deliverables/route.ts`
```typescript
/**
 * GET /api/client-portal/projects/[id]/deliverables
 * Returns all client-visible deliverable links for a project
 */
```

**File:** `src/app/api/client-portal/projects/[id]/activity/route.ts`
```typescript
/**
 * GET /api/client-portal/projects/[id]/activity
 * Returns activity log visible to client
 */
```

**File:** `src/app/api/client-portal/proposals/[id]/approve/route.ts`
```typescript
/**
 * POST /api/client-portal/proposals/[id]/approve
 * Client approves a proposal
 * - Creates Stripe checkout session for first milestone
 * - Updates proposal status
 * - Triggers notification to admin
 */
```

**File:** `src/app/api/client-portal/team/invite/route.ts`
```typescript
/**
 * POST /api/client-portal/team/invite
 * Client invites another team member to view their project
 * Body: { email, name, proposal_id, role: 'client_viewer' }
 */
```

### Client Portal: Components

**File:** `src/components/client-portal/ProjectProgressBar.tsx`
Interactive visual progress indicator showing phases and completion

**File:** `src/components/client-portal/DeliverableCard.tsx`
Card showing a deliverable link with type icon, title, and action button

**File:** `src/components/client-portal/MilestonePaymentCard.tsx`
Milestone card with payment status and "Pay Now" integration

**File:** `src/components/client-portal/ActivityFeed.tsx`
Timeline of project updates visible to client

**File:** `src/components/client-portal/PhaseAccordion.tsx`
Expandable phase showing deliverables and links

---

## ADMIN PORTAL: TEAM MANAGEMENT

### Team Assignment Features

The Command Center includes team assignment capabilities for developers and managers.

**File:** `src/app/admin/team/page.tsx` (Team Management)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Team Management                              [+ Invite Team Member]    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─ TEAM MEMBERS ───────────────────────────────────────────────────┐  │
│  │                                                                   │  │
│  │  👤 Sarah Johnson           Developer        3 Active Projects   │  │
│  │     sarah@lightbrand.co     ──────────                           │  │
│  │     • Website Redesign (ClientCo)                                │  │
│  │     • E-commerce Build (ShopBrand)                               │  │
│  │     • App MVP (StartupX)                                         │  │
│  │                                                                   │  │
│  │  👤 Mike Chen               Developer        2 Active Projects   │  │
│  │     mike@lightbrand.co      ──────────                           │  │
│  │     • Brand Identity (AgencyCo)                                  │  │
│  │     • Website Redesign (ClientCo)                                │  │
│  │                                                                   │  │
│  │  👤 Lisa Park               Manager          4 Active Projects   │  │
│  │     lisa@lightbrand.co      ───────                              │  │
│  │     [View All Assigned]                                          │  │
│  │                                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─ PENDING INVITATIONS ────────────────────────────────────────────┐  │
│  │                                                                   │  │
│  │  📧 alex@contractor.io      Developer        Sent Jan 24         │  │
│  │     [Resend Invite]  [Cancel]                                    │  │
│  │                                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Assignment UI in Project Detail

**File:** `src/components/admin/AssignmentDropdown.tsx`

```
┌─ Phase: Development ──────────────────────────────────────────┐
│                                                                │
│  Assigned to: [Sarah Johnson ▼]                                │
│               ├─ Sarah Johnson                                 │
│               ├─ Mike Chen                                     │
│               ├─ Unassigned                                    │
│               └─ + Invite new team member                      │
│                                                                │
│  Deliverables:                                                 │
│  ├─ Frontend Build      [Sarah Johnson ▼]   ✓ Complete        │
│  ├─ Backend Integration [Mike Chen ▼]       ○ In Progress     │
│  └─ Testing             [Unassigned ▼]      ○ Pending         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Deliverable Links Management (Admin)

**File:** `src/components/admin/DeliverableLinkManager.tsx`

```
┌─ Add Deliverable Link ────────────────────────────────────────┐
│                                                                │
│  Title:       [Staging Site Preview                        ]   │
│  URL:         [https://staging.client-site.com             ]   │
│  Type:        [▼ Staging                                   ]   │
│  Description: [Preview of the work-in-progress site...     ]   │
│                                                                │
│  Associate with:                                               │
│  Phase:     [▼ Phase 3: Development                        ]   │
│  Milestone: [▼ Development Complete                        ]   │
│                                                                │
│  ☑ Make visible to client immediately                          │
│  ☐ Notify client when added                                    │
│                                                                │
│  [Cancel]                              [+ Add Deliverable Link] │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Links List in Project Detail:**

```
┌─ PROJECT DELIVERABLE LINKS ───────────────────────────────────────────┐
│                                                                        │
│  Phase 1: Discovery                                                    │
│  └─ 📄 Discovery Report         [Edit] [👁 Visible]  [🗑]              │
│                                                                        │
│  Phase 2: Design                                                       │
│  ├─ 🎨 Figma Design Files       [Edit] [👁 Visible]  [🗑]              │
│  └─ 📋 Style Guide              [Edit] [👁 Visible]  [🗑]              │
│                                                                        │
│  Phase 3: Development                                                  │
│  └─ 🌐 Staging Site Preview     [Edit] [👁 Visible]  [🗑]              │
│                                                                        │
│  [+ Add New Link]                                                      │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Admin API Endpoints for Team & Links

**File:** `src/app/api/admin/team/route.ts`
```typescript
/**
 * GET /api/admin/team - List all team members
 * POST /api/admin/team/invite - Invite developer/manager
 */
```

**File:** `src/app/api/admin/deliverable-links/route.ts`
```typescript
/**
 * POST /api/admin/deliverable-links - Create new deliverable link
 * GET /api/admin/deliverable-links?proposal_id=xxx - List links for project
 */
```

**File:** `src/app/api/admin/deliverable-links/[id]/route.ts`
```typescript
/**
 * PATCH /api/admin/deliverable-links/[id] - Update link (visibility, etc.)
 * DELETE /api/admin/deliverable-links/[id] - Remove link
 */
```

**File:** `src/app/api/admin/assign/route.ts`
```typescript
/**
 * POST /api/admin/assign
 * Assign user to phase, milestone, or deliverable
 * Body: { user_id, entity_type, entity_id }
 */
```

---

### Phase 6: Navigation Updates

**File:** `src/components/admin/AdminSidebar.tsx`

Add Command Center as second navigation item:

```typescript
const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: /* home */ },
  {
    label: 'Command Center',
    href: '/admin/command-center',
    icon: /* grid/control panel */,
    badge: '6'  // Optional: show active project count
  },
  { label: 'Leads', href: '/admin/leads', icon: /* users */ },
  { label: 'Proposals', href: '/admin/proposals', icon: /* document */ },
  { label: 'Projects', href: '/admin/projects', icon: /* folder */ },
  { label: 'Users', href: '/admin/users', icon: /* user-add */ },
];
```

**File:** `src/components/admin/MobileAdminNav.tsx`

Add Command Center to mobile quick actions.

---

### Phase 7: Enhanced Proposal Detail View

**File:** `src/app/admin/proposals/[id]/page.tsx` (modifications)

Add new sections:

1. **Phase Progress Section**
   - Visual phase list with status toggles
   - Click to expand deliverables
   - Quick complete buttons

2. **Milestone Tracker Section**
   - List of milestones with status and payment
   - Quick complete / mark blocked buttons
   - Due date indicators

3. **Progress Overview Card**
   - Overall progress percentage
   - Timeline visualization
   - Days since last update

4. **"Add to Portfolio" Button** (when status === 'completed')
   - Opens modal with pre-filled data
   - Allows editing before submission
   - Creates portfolio entry and links back

---

### Phase 8: Automatic Progress Calculation

When milestones or phases are updated, automatically recalculate progress:

**Location:** In milestone/phase update API routes

```typescript
async function recalculateProgress(proposalId: string) {
  // Get all milestones for this proposal
  const { data: milestones } = await supabaseAdmin
    .from('milestones')
    .select('milestone_status')
    .eq('proposal_id', proposalId);

  const completed = milestones.filter(m => m.milestone_status === 'completed').length;
  const total = milestones.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Update proposal
  await supabaseAdmin
    .from('proposals')
    .update({
      progress_percentage: progress,
      last_activity_at: new Date().toISOString()
    })
    .eq('id', proposalId);
}
```

---

## File Structure Summary

```
src/
├── app/
│   ├── admin/
│   │   ├── command-center/
│   │   │   └── page.tsx                    ← NEW: Main Command Center
│   │   ├── team/
│   │   │   └── page.tsx                    ← NEW: Team Management
│   │   └── proposals/
│   │       └── [id]/
│   │           └── page.tsx                ← MODIFY: Add phase tracking, assignments, links
│   │
│   ├── client-portal/                      ← NEW: Client Portal Section
│   │   ├── page.tsx                        ← Client Dashboard
│   │   ├── layout.tsx                      ← Client Portal Layout
│   │   ├── projects/
│   │   │   └── [id]/
│   │   │       └── page.tsx                ← Client Project Detail
│   │   └── proposals/
│   │       └── [id]/
│   │           └── page.tsx                ← Proposal Review/Approval
│   │
│   ├── auth/                               ← NEW: Auth Pages
│   │   ├── login/
│   │   │   └── page.tsx                    ← Login page
│   │   ├── register/
│   │   │   └── page.tsx                    ← Registration page
│   │   ├── accept-invitation/
│   │   │   └── page.tsx                    ← Invitation acceptance
│   │   └── forgot-password/
│   │       └── page.tsx                    ← Password reset
│   │
│   └── api/
│       ├── command-center/
│       │   ├── route.ts                    ← Aggregation endpoint
│       │   └── quick-update/
│       │       └── route.ts                ← Quick updates
│       │
│       ├── admin/                          ← NEW: Admin APIs
│       │   ├── team/
│       │   │   ├── route.ts                ← List/invite team
│       │   │   └── [id]/
│       │   │       └── route.ts            ← Manage team member
│       │   ├── deliverable-links/
│       │   │   ├── route.ts                ← Create/list links
│       │   │   └── [id]/
│       │   │       └── route.ts            ← Update/delete link
│       │   └── assign/
│       │       └── route.ts                ← Assign work
│       │
│       ├── client-portal/                  ← NEW: Client Portal APIs
│       │   ├── projects/
│       │   │   ├── route.ts                ← List client's projects
│       │   │   └── [id]/
│       │   │       ├── route.ts            ← Project detail
│       │   │       ├── deliverables/
│       │   │       │   └── route.ts        ← Client's deliverable links
│       │   │       └── activity/
│       │   │           └── route.ts        ← Activity feed
│       │   ├── proposals/
│       │   │   └── [id]/
│       │   │       └── approve/
│       │   │           └── route.ts        ← Approve proposal
│       │   └── team/
│       │       └── invite/
│       │           └── route.ts            ← Client invites team member
│       │
│       ├── auth/                           ← NEW: Auth APIs
│       │   ├── register/
│       │   │   └── route.ts                ← User registration
│       │   ├── accept-invitation/
│       │   │   └── route.ts                ← Accept invite
│       │   └── validate-invitation/
│       │       └── route.ts                ← Validate invite token
│       │
│       └── proposals/
│           └── [id]/
│               └── to-portfolio/
│                   └── route.ts            ← Portfolio creation
│
├── components/
│   ├── admin/
│   │   ├── ProjectCard.tsx                 ← NEW
│   │   ├── CommandCenterStats.tsx          ← NEW
│   │   ├── PhaseProgressTracker.tsx        ← NEW
│   │   ├── QuickUpdateModal.tsx            ← NEW
│   │   ├── DeliverableLinkManager.tsx      ← NEW: Add/edit links
│   │   ├── AssignmentDropdown.tsx          ← NEW: Assign work
│   │   ├── TeamMemberCard.tsx              ← NEW
│   │   ├── InviteTeamModal.tsx             ← NEW
│   │   ├── AdminSidebar.tsx                ← MODIFY: Add nav items
│   │   └── MobileAdminNav.tsx              ← MODIFY: Add nav items
│   │
│   ├── client-portal/                      ← NEW: Client Components
│   │   ├── ClientNavbar.tsx                ← Client navigation
│   │   ├── ProjectProgressBar.tsx          ← Visual progress
│   │   ├── PhaseAccordion.tsx              ← Expandable phases
│   │   ├── DeliverableCard.tsx             ← Link card
│   │   ├── MilestonePaymentCard.tsx        ← Payment integration
│   │   ├── ActivityFeed.tsx                ← Activity timeline
│   │   ├── TeamSection.tsx                 ← Team display
│   │   └── ProposalApprovalForm.tsx        ← Approval flow
│   │
│   └── auth/                               ← NEW: Auth Components
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       ├── InvitationAcceptForm.tsx
│       └── ForgotPasswordForm.tsx
│
├── types/
│   ├── proposals.ts                        ← MODIFY: Add new types
│   ├── users.ts                            ← NEW: User types
│   ├── deliverables.ts                     ← NEW: Deliverable types
│   └── client-portal.ts                    ← NEW: Client portal types
│
├── lib/
│   ├── auth/                               ← NEW: Auth utilities
│   │   ├── session.ts                      ← Session management
│   │   ├── permissions.ts                  ← Permission checks
│   │   └── roles.ts                        ← Role utilities
│   │
│   └── hooks/                              ← NEW: React hooks
│       ├── useUser.ts                      ← Current user hook
│       ├── useProjectAccess.ts             ← Project permission hook
│       └── useClientProjects.ts            ← Client's projects hook
│
└── supabase/
    └── migrations/
        ├── 001-add-project-tracking-fields.sql   ← NEW
        ├── 002-user-management.sql               ← NEW
        ├── 003-deliverable-links.sql             ← NEW
        └── 004-team-assignment.sql               ← NEW
```

---

## Implementation Order

### Sprint 1: Foundation & Database
1. Run all database migrations (001-004)
2. Create all TypeScript types (`users.ts`, `deliverables.ts`, `client-portal.ts`)
3. Update existing `proposals.ts` types
4. Create `/api/command-center` endpoint
5. Test API with existing data

### Sprint 2: Authentication System
6. Set up Supabase Auth integration
7. Create auth utility functions (`lib/auth/*`)
8. Build login page and `LoginForm` component
9. Build registration page and `RegisterForm` component
10. Build invitation acceptance flow
11. Create forgot password flow
12. Test full authentication flow

### Sprint 3: User Management & Invitations
13. Create `/api/admin/team` endpoints
14. Build Team Management page (`/admin/team`)
15. Create `InviteTeamModal` component
16. Create `TeamMemberCard` component
17. Test developer/manager invitation flow

### Sprint 4: Command Center Core UI
18. Create `ProjectCard` component
19. Create `CommandCenterStats` component
20. Build Command Center page (cards view)
21. Update navigation (sidebar + mobile)
22. Create `QuickUpdateModal` component
23. Create `/api/command-center/quick-update` endpoint

### Sprint 5: Team Assignment
24. Create `AssignmentDropdown` component
25. Create `/api/admin/assign` endpoint
26. Add assignment UI to proposal detail page
27. Add workload indicators to Team Management page
28. Test assignment flow

### Sprint 6: Deliverable Links System
29. Create `/api/admin/deliverable-links` endpoints
30. Create `DeliverableLinkManager` component
31. Add link management to proposal detail page
32. Add visibility toggle for client access
33. Test link creation and visibility flow

### Sprint 7: Client Portal - Foundation
34. Create client portal layout (`/client-portal/layout.tsx`)
35. Create `ClientNavbar` component
36. Create `/api/client-portal/projects` endpoint
37. Build client dashboard page
38. Test client authentication and project access

### Sprint 8: Client Portal - Project View
39. Create `ProjectProgressBar` component
40. Create `PhaseAccordion` component
41. Create `DeliverableCard` component
42. Create `ActivityFeed` component
43. Build client project detail page
44. Test client project viewing flow

### Sprint 9: Client Portal - Payments & Approval
45. Create `MilestonePaymentCard` component with Stripe integration
46. Create `ProposalApprovalForm` component
47. Create `/api/client-portal/proposals/[id]/approve` endpoint
48. Build proposal review/approval page
49. Test full proposal approval and payment flow

### Sprint 10: Client Team Management
50. Create client invite flow
51. Create `/api/client-portal/team/invite` endpoint
52. Add "Invite Team Member" to client portal
53. Test client inviting additional stakeholders

### Sprint 11: Enhanced Tracking & Polish
54. Create `PhaseProgressTracker` component (admin)
55. Implement progress auto-calculation
56. Add milestone quick complete buttons
57. Add real-time updates (optional)
58. Performance optimization

### Sprint 12: Portfolio Integration
59. Create `/api/proposals/[id]/to-portfolio` endpoint
60. Add "Add to Portfolio" button to completed projects
61. Create portfolio creation modal
62. Test full workflow: proposal → active → completed → portfolio

---

## Workflow: Complete Project Lifecycle

### Admin Workflow: Proposal to Portfolio

```
1. LEAD CREATED
   └─→ Lead appears in Leads list

2. PROPOSAL CREATED (from lead or fresh)
   └─→ Status: draft
   └─→ Phases and milestones defined
   └─→ Client invited (creates user account or uses existing)

3. PROPOSAL SENT
   └─→ Status: sent
   └─→ Client receives email notification
   └─→ Proposal appears in Client Portal

4. CLIENT REVIEWS IN PORTAL
   └─→ Status: viewed
   └─→ viewed_at timestamp set
   └─→ Client can review, ask questions

5. CLIENT APPROVES & PAYS
   └─→ Client clicks "Approve" in their portal
   └─→ First milestone payment via Stripe
   └─→ Status: agreement_signed
   └─→ Project appears in Command Center

6. WORK ASSIGNED
   └─→ Admin assigns developers to phases/milestones
   └─→ Team members see their assignments
   └─→ Status: active

7. WORK IN PROGRESS
   └─→ Team completes deliverables
   └─→ Links added to completed items
   └─→ Links made visible to client
   └─→ Dashboard updates posted
   └─→ Client sees progress in real-time

8. MILESTONE PAYMENTS
   └─→ Milestone completed → Payment unlocked
   └─→ Client pays in portal
   └─→ Progress continues

9. PROJECT COMPLETED
   └─→ All phases complete
   └─→ All deliverable links delivered
   └─→ Final payment collected
   └─→ Status: completed

10. ADDED TO PORTFOLIO
    └─→ Admin clicks "Add to Portfolio"
    └─→ Portfolio entry created
    └─→ portfolio_project_id linked
```

### Client Workflow: Engagement Journey

```
1. CLIENT RECEIVES INVITATION
   └─→ Email with invitation link
   └─→ Token valid for 7 days

2. CLIENT CREATES ACCOUNT
   └─→ Clicks invitation link
   └─→ Creates password
   └─→ Profile created
   └─→ Linked to proposal automatically

3. CLIENT REVIEWS PROPOSAL
   └─→ Views full proposal in portal
   └─→ Sees phases, timeline, investment
   └─→ Can request changes (comment)

4. CLIENT APPROVES
   └─→ Checks agreement checkbox
   └─→ Clicks "Approve & Pay"
   └─→ Stripe checkout for first milestone
   └─→ Confirmation screen

5. CLIENT WATCHES PROGRESS
   └─→ Logs into portal anytime
   └─→ Sees progress bar updating
   └─→ Sees phases completing
   └─→ Gets notifications on updates

6. CLIENT ACCESSES DELIVERABLES
   └─→ Links appear as work completes
   └─→ Staging sites, documents, assets
   └─→ All links organized by phase

7. CLIENT MAKES MILESTONE PAYMENTS
   └─→ Sees "Pay Now" when milestone ready
   └─→ Secure Stripe payment
   └─→ Receipt emailed

8. CLIENT INVITES TEAM
   └─→ Can add other stakeholders
   └─→ Choose their access level
   └─→ Team members get invite emails

9. PROJECT COMPLETE
   └─→ All deliverables delivered
   └─→ All links accessible
   └─→ Final summary view
   └─→ Links remain accessible indefinitely
```

---

## Risk Indicators (Command Center)

| Indicator | Condition | Visual |
|-----------|-----------|--------|
| On Track | Recent activity, no blocked items | Green dot |
| Needs Attention | No update in 7+ days | Amber dot |
| At Risk | Blocked milestones OR overdue milestones | Red dot |
| Overdue | Past estimated_completion_date | Red border |

---

## Quick Actions Available

| Action | Where | Effect |
|--------|-------|--------|
| Mark Milestone Complete | Command Center, Project Detail | Updates milestone_status, recalculates progress |
| Mark Phase Complete | Project Detail | Updates phase_status, creates dashboard update |
| Add Update | Command Center, Project Detail | Creates dashboard_update, refreshes last_activity |
| Mark Blocked | Project Detail | Sets status to 'blocked', shows in Command Center as at-risk |
| Add to Portfolio | Project Detail (completed only) | Creates portfolio entry, links back |

---

## Design Patterns (Matching Existing)

The Command Center follows existing patterns in the codebase:

1. **Stats Cards** - Same as `/admin/proposals` and `/admin` dashboard
2. **Card Layout** - Same responsive grid as existing pages
3. **Color Scheme** - Illumination Palette (gold/dark theme)
4. **Status Badges** - Same styling as proposals page
5. **Quick Actions** - Same button styling as existing pages
6. **Mobile Navigation** - Same card-based mobile view

---

## Success Criteria

### Admin/Developer Portal Success Criteria

After implementation, admins should be able to:

1. **See all active projects** in one unified view
2. **Identify at-risk projects** at a glance
3. **Update project status** without navigating away
4. **Track progress** through phases and milestones
5. **Know what's next** for each project
6. **Assign work** to team members
7. **Invite developers and managers** to the platform
8. **Add deliverable links** when completing work
9. **Control link visibility** to clients
10. **Convert completed projects** to portfolio entries easily
11. **Access from mobile** with full functionality

### Client Portal Success Criteria

After implementation, clients should be able to:

1. **Create accounts** via email/password (invitation-based)
2. **View all their proposals** in one dashboard
3. **Review and approve proposals** directly in portal
4. **Make milestone payments** via secure Stripe integration
5. **Watch project progress** in real-time with visual indicators
6. **See which phase** is currently in progress
7. **Access deliverable links** as they become available
8. **View all their delivered links** organized by phase
9. **Invite team members** to view their project
10. **See activity feed** of project updates
11. **Access from any device** (responsive design)

---

## Not In Scope (Keep It Simple)

To avoid over-engineering, these features are explicitly **NOT** included in this phase:

- ~~Team member assignment~~ → **NOW INCLUDED**
- Time tracking (separate tool recommendation if needed)
- Kanban/drag-and-drop views (can add later if needed)
- Gantt charts (timeline view in future if needed)
- Real-time chat/messaging (use external tools for now)
- Email notifications beyond invitations (manual for now, can add later)
- Custom dashboards/reports (MVP first)
- Mobile app (web responsive for now)
- Multi-language support

These can be added in future iterations if needed.

---

---

## Key Features Summary

### Client Portal Features

| Feature | Description |
|---------|-------------|
| **User Accounts** | Email/password auth with invitation-based onboarding |
| **Proposal Review** | Interactive proposal viewing with approval workflow |
| **Payment Integration** | Stripe-powered milestone payments |
| **Progress Tracking** | Real-time visual progress indicators |
| **Deliverable Links** | Organized access to all delivered work |
| **Team Collaboration** | Invite additional stakeholders |
| **Activity Feed** | See all project updates in one place |

### Developer Portal Features

| Feature | Description |
|---------|-------------|
| **Command Center** | All active projects at a glance |
| **Team Management** | Invite and manage developers/managers |
| **Work Assignment** | Assign phases, milestones, deliverables to team |
| **Link Management** | Add multiple links per deliverable with visibility control |
| **Quick Updates** | Update status without leaving the dashboard |
| **Progress Tracking** | Automatic progress calculation |
| **Portfolio Integration** | One-click conversion to portfolio entry |

### Deliverable Links System

| Link Type | Example |
|-----------|---------|
| `live_site` | Production URL for the completed website |
| `staging` | Preview/staging environment URL |
| `documentation` | User guides, technical docs |
| `assets` | Design files, images, brand assets |
| `repository` | GitHub/GitLab code repository |
| `credentials` | Login information (handled securely) |
| `video` | Loom walkthroughs, demo videos |

---

## Conclusion

This plan extends the existing robust proposal management infrastructure to create a **two-portal system**:

1. **Command Center (Admin/Developer Portal)** - Internal dashboard for managing projects, assigning work, tracking progress, and adding deliverable links.

2. **Client Portal** - Interactive client-facing dashboard where clients view proposals, approve work, make payments, track progress, and access their delivered links.

### Key Insights

- **The proposal IS the project** once it becomes active—we're surfacing it for different audiences
- **Deliverables culminate in links**—everything the client receives is a clickable link
- **Multi-user support** enables team collaboration on both sides
- **Progressive visibility** means links appear to clients only when ready
- **Single source of truth** across both portals

### Estimated Scope

- **Database**: 6 new tables, ~15 new columns
- **API Endpoints**: ~25 new endpoints
- **Pages**: ~10 new pages
- **Components**: ~25 new components
- **Sprints**: 12 sprints (flexible based on team capacity)
