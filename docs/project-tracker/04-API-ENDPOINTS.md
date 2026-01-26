# Project Tracker - API Endpoints

## Command Center APIs

### GET /api/command-center

Returns aggregated view of all active projects with calculated metrics.

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

### POST /api/command-center/quick-update

Allows rapid status updates from Command Center without navigating away.

```typescript
/**
 * Quick Update API
 * POST /api/command-center/quick-update
 *
 * Body: {
 *   proposal_id: string,
 *   action: 'complete_milestone' | 'complete_phase' | 'add_update' | 'mark_blocked',
 *   target_id?: string,  // milestone_id or phase_id
 *   data?: { title?: string, content?: string }
 * }
 */
```

---

## Portfolio API

### POST /api/proposals/[id]/to-portfolio

Create Portfolio Entry from Completed Project.

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

## Admin APIs

### Team Management

**GET /api/admin/team** - List all team members
**POST /api/admin/team/invite** - Invite developer/manager

```typescript
/**
 * GET /api/admin/team - List all team members
 * POST /api/admin/team/invite - Invite developer/manager
 */
```

**GET /api/admin/team/workload** - Team workload summary

### Todo Management

**GET/POST /api/admin/todos** - CRUD todos
**GET /api/admin/todos/my** - Current user's todos
**PATCH/DELETE /api/admin/todos/[id]** - Update/delete todo

### Next Actions

**GET/POST /api/admin/next-actions** - Quick action capture
**POST /api/admin/next-actions/[id]/convert** - Convert to todo

### Internal Projects

**GET/POST /api/admin/internal-projects** - CRUD internal projects
**PATCH/DELETE /api/admin/internal-projects/[id]** - Manage internal project

### Deliverable Links

```typescript
/**
 * POST /api/admin/deliverable-links - Create new deliverable link
 * GET /api/admin/deliverable-links?proposal_id=xxx - List links for project
 */

/**
 * PATCH /api/admin/deliverable-links/[id] - Update link (visibility, etc.)
 * DELETE /api/admin/deliverable-links/[id] - Remove link
 */
```

### Work Assignment

```typescript
/**
 * POST /api/admin/assign
 * Assign user to phase, milestone, or deliverable
 * Body: { user_id, entity_type, entity_id }
 */
```

---

## Client Portal APIs

### Projects

```typescript
/**
 * GET /api/client-portal/projects
 * Returns all projects the authenticated client has access to
 */

/**
 * GET /api/client-portal/projects/[id]
 * Returns detailed project info including:
 * - Phases with status
 * - Visible deliverable links
 * - Milestones with payment status
 * - Activity log (client-visible entries)
 */

/**
 * GET /api/client-portal/projects/[id]/deliverables
 * Returns all client-visible deliverable links for a project
 */

/**
 * GET /api/client-portal/projects/[id]/activity
 * Returns activity log visible to client
 */
```

### Proposal Approval

```typescript
/**
 * POST /api/client-portal/proposals/[id]/approve
 * Client approves a proposal
 * - Creates Stripe checkout session for first milestone
 * - Updates proposal status
 * - Triggers notification to admin
 */
```

### Team Invitations

```typescript
/**
 * POST /api/client-portal/team/invite
 * Client invites another team member to view their project
 * Body: { email, name, proposal_id, role: 'client_viewer' }
 */
```

---

## Auth APIs

### POST /api/auth/register
User registration

### POST /api/auth/accept-invitation
Accept invite and create account

### GET /api/auth/validate-invitation
Validate invite token

---

## Automatic Progress Calculation

When milestones or phases are updated, automatically recalculate progress:

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
