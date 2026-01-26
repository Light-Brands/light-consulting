# Project Tracker Dashboard (Command Center)
## Comprehensive Implementation Plan

**Light Brand Consulting**
**Date:** January 2026

---

## Executive Summary

This plan outlines the implementation of a **Project Tracker Dashboard** (Command Center) for Light Brand Consulting. The good news: **90% of the infrastructure already exists**. The proposals system with phases, milestones, and dashboard updates IS the project tracking system. What's needed is a unified view that surfaces this data in an actionable, at-a-glance format.

### Key Insight
When a proposal's status becomes `'active'`, it IS an active project. We're not building a separate system—we're building a unified dashboard to visualize and interact with what already exists.

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

---

## Implementation Plan

### Phase 1: Database Enhancement (Minimal Changes)

#### New Migration: Add Tracking Fields

**File:** `supabase/migrations/add-project-tracking-fields.sql`

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

-- Comments
COMMENT ON COLUMN proposals.progress_percentage IS
  'Calculated progress (0-100) based on completed milestones';
COMMENT ON COLUMN proposals.last_activity_at IS
  'Timestamp of last dashboard update or status change';
COMMENT ON COLUMN proposals.portfolio_project_id IS
  'Link to portfolio project after completion';
```

**Changes Summary:**
- 3 new columns on `proposals`
- 2 new columns on `proposal_phases`
- 1 new index
- Zero new tables

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
│   │   └── proposals/
│   │       └── [id]/
│   │           └── page.tsx                ← MODIFY: Add phase tracking
│   └── api/
│       ├── command-center/
│       │   ├── route.ts                    ← NEW: Aggregation endpoint
│       │   └── quick-update/
│       │       └── route.ts                ← NEW: Quick updates
│       └── proposals/
│           └── [id]/
│               └── to-portfolio/
│                   └── route.ts            ← NEW: Portfolio creation
├── components/
│   └── admin/
│       ├── ProjectCard.tsx                 ← NEW
│       ├── CommandCenterStats.tsx          ← NEW
│       ├── PhaseProgressTracker.tsx        ← NEW
│       ├── QuickUpdateModal.tsx            ← NEW
│       ├── AdminSidebar.tsx                ← MODIFY: Add nav item
│       └── MobileAdminNav.tsx              ← MODIFY: Add nav item
├── types/
│   └── proposals.ts                        ← MODIFY: Add new types
└── supabase/
    └── migrations/
        └── add-project-tracking-fields.sql ← NEW
```

---

## Implementation Order

### Sprint 1: Foundation
1. Run database migration
2. Update TypeScript types
3. Create `/api/command-center` endpoint
4. Test API with existing data

### Sprint 2: Core UI
5. Create `ProjectCard` component
6. Create `CommandCenterStats` component
7. Build Command Center page (cards view)
8. Update navigation (sidebar + mobile)

### Sprint 3: Quick Actions
9. Create `QuickUpdateModal` component
10. Create `/api/command-center/quick-update` endpoint
11. Add quick actions to ProjectCard
12. Test quick update flow

### Sprint 4: Enhanced Tracking
13. Create `PhaseProgressTracker` component
14. Add phase tracking to proposal detail page
15. Implement progress auto-calculation
16. Add milestone quick complete buttons

### Sprint 5: Portfolio Integration
17. Create `/api/proposals/[id]/to-portfolio` endpoint
18. Add "Add to Portfolio" button to completed projects
19. Create portfolio creation modal
20. Test full workflow: proposal → active → completed → portfolio

---

## Workflow: Proposal to Portfolio

```
1. LEAD CREATED
   └─→ Lead appears in Leads list

2. PROPOSAL CREATED (from lead or fresh)
   └─→ Status: draft
   └─→ Phases and milestones defined

3. PROPOSAL SENT
   └─→ Status: sent
   └─→ Client receives link

4. CLIENT VIEWS
   └─→ Status: viewed
   └─→ viewed_at timestamp set

5. AGREEMENT SIGNED
   └─→ Status: agreement_signed
   └─→ Project appears in Command Center
   └─→ Onboarding form available

6. PROJECT ACTIVE
   └─→ Status: active
   └─→ Work begins
   └─→ Dashboard updates posted
   └─→ Milestones tracked

7. PROJECT COMPLETED
   └─→ Status: completed
   └─→ "Add to Portfolio" button appears

8. ADDED TO PORTFOLIO
   └─→ Portfolio entry created
   └─→ portfolio_project_id linked
   └─→ Appears in public portfolio (when published)
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

After implementation, admins should be able to:

1. **See all 6 active projects** in one view
2. **Identify at-risk projects** at a glance
3. **Update project status** without navigating away
4. **Track progress** through phases and milestones
5. **Know what's next** for each project
6. **Convert completed projects** to portfolio entries easily
7. **Access from mobile** with full functionality

---

## Not In Scope (Keep It Simple)

To avoid over-engineering, these features are explicitly **NOT** included:

- Team member assignment (use notes field for now)
- Time tracking (separate tool recommendation if needed)
- Kanban/drag-and-drop views (can add later if needed)
- Gantt charts (timeline view in future if needed)
- Slack/email notifications (manual for now)
- Custom dashboards/reports (MVP first)

These can be added in future iterations if needed.

---

## Conclusion

This plan leverages the existing robust proposal management infrastructure to create a unified Command Center for tracking active projects. With minimal database changes and focused UI development, we can provide admins with the visibility they need to manage ~6 active projects effectively.

The key insight is that **the proposal IS the project** once it becomes active. We're not duplicating data—we're surfacing it in a more actionable format.
