# Project Tracker - Admin Portal & Team Management

## Team Todo System

Every team member has their own dashboard with personal todos. Todos can come from:
1. **Deliverables** - Auto-generated from project deliverables assigned to them
2. **Manual Todos** - Created by themselves or assigned by managers
3. **Next Actions** - Quick follow-up items from meetings/notes

### Todo Categories

| Type | Description | Example |
|------|-------------|---------|
| **Deliverable** | Linked to a project deliverable | "Build landing page for TEC" |
| **Admin** | Administrative/business tasks | "Transfer $5k for ads loan" |
| **Follow-up** | Communication/outreach | "Send Eyob Nancy email" |
| **Review** | Items needing review/approval | "Review partner agreement - Sign it" |
| **Meeting** | Calls/meetings to schedule | "Schedule Discovery call with Richard" |
| **Financial** | Money-related tasks | "Give bank access to Dan" |

---

## Team Management Page

**File:** `src/app/admin/team/page.tsx`

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

---

## Enhanced Proposal Detail View

**File:** `src/app/admin/proposals/[id]/page.tsx` (modifications)

Add new sections:

### 1. Phase Progress Section
- Visual phase list with status toggles
- Click to expand deliverables
- Quick complete buttons

### 2. Milestone Tracker Section
- List of milestones with status and payment
- Quick complete / mark blocked buttons
- Due date indicators

### 3. Progress Overview Card
- Overall progress percentage
- Timeline visualization
- Days since last update

### 4. "Add to Portfolio" Button (when status === 'completed')
- Opens modal with pre-filled data
- Allows editing before submission
- Creates portfolio entry and links back

---

## Admin Workflow: Proposal to Portfolio

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

---

## Success Criteria

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

---

## System Handles All Organizational Needs

Based on real-world usage, this system covers:

| Your Need | System Feature |
|-----------|----------------|
| Projects on Hold (Transcend, NAI) | `is_on_hold` flag with reason |
| Active Projects (TEC, Cho-Ventures) | Standard proposal workflow |
| Prospects (AWKN, Richard Becher) | `project_category = 'prospect'` |
| Service Providers (Clientscale.io) | `project_category = 'service_provider'` |
| Internal Projects (LBC Website, Light Brand Studio) | `internal_projects` table |
| AI Personal Doubles (Nicholas.ai, Eyob.ai) | `project_category = 'personal_brand'` |
| Core Offers (AI Informe System) | `project_category = 'core_offer'` |
| Finalized Projects (Ibogalifechange, etc.) | `project_category = 'archived'` |
| Team Todos (Nick, Eyob, Dan, Andreas tasks) | `todos` table with personal dashboards |
| Quick Follow-ups (Send email, Schedule call) | `next_actions` quick capture |
