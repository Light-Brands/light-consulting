# Project Tracker - Architecture

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
│  • **Personal todo list**       │                                       │
│  • **Team workload view**       │                                       │
└─────────────────────────────────┴───────────────────────────────────────┘
```

---

## Organizational Model

### Project Categories

| Category | Description | Examples |
|----------|-------------|----------|
| **Client Projects** | Paid client work with proposals/contracts | TEC, Cho-Ventures, INFLUEX |
| **Prospects** | Potential clients in discovery phase | AWKN, Richard Becher |
| **Internal Projects** | Internal brand/product development | LBC Website, Light Brand Studio |
| **Personal Brand** | AI Personal Double & individual brands | Nicholas.ai, Eyob.ai, Lawless.ai |
| **Core Offers** | Products/services being launched | AI Informe System, AI Acceleration Blueprint |
| **Service Providers** | Vendors/contractors we work with | Clientscale.io |
| **Finalized** | Completed archived projects | Ibogalifechange, Planetary Party |

### Enhanced Project Statuses

```
PROSPECT ─→ PROPOSAL ─→ ACTIVE ─→ COMPLETED
    │           │          │
    │           │          └─→ ON_HOLD (paused)
    │           │
    │           └─→ DECLINED
    │
    └─→ LOST

Internal/Personal projects:
PLANNING ─→ IN_PROGRESS ─→ COMPLETED
                │
                └─→ ON_HOLD
```

### Real-World Organization Example

```
┌─ COMMAND CENTER ─────────────────────────────────────────────────────────┐
│                                                                          │
│  [Clients] [Prospects] [Internal] [Personal] [Offers] [Vendors] [Done]   │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  📁 CLIENT PROJECTS                                                      │
│  ├─ 🟢 TEC - Strategy, financials, investor presentation                │
│  ├─ 🟢 Cho-Ventures - $3500 AI Level Diagnostic                         │
│  ├─ 🟡 INFLUEX - Discovery Meeting Tuesday                              │
│  ├─ 🟡 Montessori - AI Level Diagnostic (Send Eyob Nancy email)         │
│  ├─ ⏸️ Transcend Documentary - PAUSED                                   │
│  └─ ⏸️ NAI / NTX - AI Level Diagnostic - PAUSED                         │
│                                                                          │
│  👤 PROSPECTS                                                            │
│  ├─ 🔵 AWKN - AI Level Diagnostic                                       │
│  └─ 🔵 Richard Becher - Schedule Discovery Call                         │
│                                                                          │
│  🏢 INTERNAL PROJECTS                                                    │
│  ├─ 🟢 LBC Website Deep Dive Review - This week                         │
│  ├─ 🟢 Light Brand Studio (IDE)                                         │
│  └─ 🟢 Light Brand Studio (Orchestrator)                                │
│                                                                          │
│  🤖 AI PERSONAL DOUBLES                                                  │
│  ├─ 📚 Nicholas.ai - Book, Course                                       │
│  ├─ 📚 Eyob.ai - Book, Course                                           │
│  └─ 🎮 Lawless.ai - Interactivity                                       │
│                                                                          │
│  🚀 CURRENT OFFERS                                                       │
│  └─ 📅 AI Informe System + Blueprint - Launch Feb 1st                   │
│                                                                          │
│  🤝 SERVICE PROVIDERS                                                    │
│  └─ 📞 Clientscale.io - Onboarding call Wednesday                       │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
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
