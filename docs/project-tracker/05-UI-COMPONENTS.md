# Project Tracker - UI Components

## Project Status Card

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

**Features:**
- Color-coded status indicator (green = on track, amber = needs attention, red = at risk)
- Progress bar with percentage
- Phase and milestone completion counts
- Payment status
- Next upcoming milestone with due date
- Quick action buttons
- "Last updated X days ago" warning if stale

---

## Command Center Stats Bar

**File:** `src/components/admin/CommandCenterStats.tsx`

```
┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│    6     │  $125K   │   $85K   │   $40K   │    4     │    2     │
│  Active  │ Pipeline │ Collected│ Pending  │ On Track │ At Risk  │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
```

---

## Phase Progress Tracker

**File:** `src/components/admin/PhaseProgressTracker.tsx`

Visual phase list with:
- Status dropdown (not_started, in_progress, completed, blocked)
- Deliverables checklist
- Quick complete button
- Timeline dates

---

## Quick Update Modal

**File:** `src/components/admin/QuickUpdateModal.tsx`

Modal for rapid updates without leaving Command Center:
- Update type selector
- Optional milestone association
- Title and content fields
- One-click submit

---

## Command Center Page Layout

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

### Desktop Layout

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

### Mobile Layout

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

## Todo System Components

### TodoList.tsx
List of todos with filtering and sorting

### TodoItem.tsx
Individual todo item with checkbox, priority badge, due date

### TodoForm.tsx
Create/edit todo form with type selector, priority, due date

### QuickAddTodo.tsx
Quick inline todo creation

### NextActionCapture.tsx

```
┌─ QUICK ADD NEXT ACTION ────────────────────────────────────────────┐
│                                                                     │
│  What needs to happen?                                              │
│  [Send Eyob Nancy email for Montessori                          ]   │
│                                                                     │
│  Assign to: [Eyob ▼]    Priority: [Medium ▼]    Due: [This week ▼] │
│                                                                     │
│  Link to project: [Montessori AI Diagnostic ▼] (optional)          │
│                                                                     │
│  [Cancel]                                         [+ Add Next Action]│
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Personal Dashboard View

**File:** `src/app/admin/my-dashboard/page.tsx`

```
┌─ MY DASHBOARD ─────────────────────────────────────────────────────┐
│                                                                     │
│  Welcome back, Nick!                           [+ New Todo]         │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📋 MY TODOS                                    Today | This Week | All │
│                                                                     │
│  ⚡ HIGH PRIORITY                                                   │
│  ├─ ☐ Review partner agreement - Sign it              📅 Today     │
│  ├─ ☐ Transfer additional $5k of 10k loan             📅 Today     │
│  └─ ☐ Transfer $5k for ads loan                       📅 This week │
│                                                                     │
│  📁 FROM PROJECTS                                                   │
│  ├─ ☐ TEC: Finalize investor presentation            📅 Jan 28     │
│  ├─ ☐ TEC: Complete documentary shift outline        📅 Jan 30     │
│  └─ ☐ LBC Website: Deep dive review                  📅 This week  │
│                                                                     │
│  💼 ADMIN TASKS                                                     │
│  └─ ☐ Give bank access to Dan                        📅 This week  │
│                                                                     │
│  ✅ COMPLETED TODAY                                                 │
│  └─ ☑ Sent proposal to Cho-Ventures                  ✓ 2 hours ago │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  🎯 MY ASSIGNED PROJECTS                                            │
│  ├─ TEC (Lead) - 3 active deliverables                             │
│  ├─ LBC Website (Contributor) - 1 active deliverable               │
│  └─ Nicholas.ai (Owner) - 2 active deliverables                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Team Workload View

**File:** `src/app/admin/team/workload/page.tsx`

```
┌─ TEAM WORKLOAD ────────────────────────────────────────────────────┐
│                                                                     │
│  Team Overview                                 [+ Assign Task]      │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  👤 NICK                                              8 Active Todos│
│  ├─ ☐ Review partner agreement - Sign it                    High   │
│  ├─ ☐ Transfer additional $5k of 10k loan                   High   │
│  ├─ ☐ Transfer $5k for ads loan                             High   │
│  └─ ☐ Give bank access to Dan                               Medium │
│  [View All] [+ Assign Todo]                                        │
│                                                                     │
│  👤 EYOB                                              5 Active Todos│
│  ├─ ☐ Create initial strategic partnership agreement        High   │
│  ├─ ☐ LinkedIn campaign - Launch this week                  High   │
│  └─ ☐ Send Nancy email for Montessori                       Medium │
│  [View All] [+ Assign Todo]                                        │
│                                                                     │
│  👤 DAN                                               3 Active Todos│
│  ├─ ☐ Create investor pitch materials for TEC              High   │
│  └─ ...                                                            │
│  [View All] [+ Assign Todo]                                        │
│                                                                     │
│  👤 ANDREAS                                           2 Active Todos│
│  ├─ ☐ Clean up investor presentation                       Medium │
│  └─ ☐ Clean up light consulting website                    Medium │
│  [View All] [+ Assign Todo]                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Navigation Updates

**File:** `src/components/admin/AdminSidebar.tsx`

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

---

## Assignment Dropdown

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

---

## Deliverable Link Manager

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

### Links List in Project Detail

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
