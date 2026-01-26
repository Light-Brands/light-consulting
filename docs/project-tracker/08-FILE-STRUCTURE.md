# Project Tracker - File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── command-center/
│   │   │   └── page.tsx                    ← NEW: Main Command Center
│   │   ├── my-dashboard/
│   │   │   └── page.tsx                    ← NEW: Personal Dashboard with Todos
│   │   ├── team/
│   │   │   ├── page.tsx                    ← NEW: Team Management
│   │   │   └── workload/
│   │   │       └── page.tsx                ← NEW: Team Workload View
│   │   ├── projects/
│   │   │   ├── page.tsx                    ← NEW: All Projects (unified view)
│   │   │   ├── internal/
│   │   │   │   └── page.tsx                ← NEW: Internal Projects
│   │   │   └── [category]/
│   │   │       └── page.tsx                ← NEW: Projects by Category
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
│       │   │   ├── workload/
│       │   │   │   └── route.ts            ← Team workload summary
│       │   │   └── [id]/
│       │   │       └── route.ts            ← Manage team member
│       │   ├── todos/
│       │   │   ├── route.ts                ← CRUD todos
│       │   │   ├── my/
│       │   │   │   └── route.ts            ← Current user's todos
│       │   │   └── [id]/
│       │   │       └── route.ts            ← Update/delete todo
│       │   ├── next-actions/
│       │   │   ├── route.ts                ← Quick action capture
│       │   │   └── [id]/
│       │   │       └── route.ts            ← Convert to todo
│       │   ├── internal-projects/
│       │   │   ├── route.ts                ← CRUD internal projects
│       │   │   └── [id]/
│       │   │       └── route.ts            ← Manage internal project
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
│   │   ├── TodoList.tsx                    ← NEW: Todo list component
│   │   ├── TodoItem.tsx                    ← NEW: Individual todo item
│   │   ├── TodoForm.tsx                    ← NEW: Create/edit todo form
│   │   ├── QuickAddTodo.tsx                ← NEW: Quick todo capture
│   │   ├── NextActionCapture.tsx           ← NEW: Quick next action
│   │   ├── TeamWorkloadCard.tsx            ← NEW: Team member workload
│   │   ├── ProjectCategoryTabs.tsx         ← NEW: Category filter tabs
│   │   ├── InternalProjectCard.tsx         ← NEW: Internal project card
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
│   ├── todos.ts                            ← NEW: Todo types
│   ├── projects.ts                         ← NEW: Project/category types
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
        ├── 004-team-assignment.sql               ← NEW
        ├── 005-project-categories.sql            ← NEW
        └── 006-team-todos.sql                    ← NEW
```

---

## Summary

| Category | New | Modified |
|----------|-----|----------|
| Pages | ~15 | 1 |
| API Routes | ~35 | 0 |
| Components | ~30 | 2 |
| Types | 5 | 1 |
| Lib/Hooks | 6 | 0 |
| Migrations | 6 | 0 |
