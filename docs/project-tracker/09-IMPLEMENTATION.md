# Project Tracker - Implementation Plan

## Sprint Overview

| Sprint | Focus | Key Deliverables |
|--------|-------|------------------|
| 1 | Foundation & Database | Migrations, types, command center API |
| 2 | Authentication System | Supabase Auth, login/register, invitations |
| 3 | User Management | Team endpoints, management page, invites |
| 4 | Command Center Core | Project cards, stats, page layout |
| 5 | Team Assignment | Assignment UI, API, workload indicators |
| 6 | Deliverable Links | Link CRUD, visibility management |
| 7 | Client Portal Foundation | Layout, navbar, projects API, dashboard |
| 8 | Client Portal Project View | Progress bar, phases, deliverables, activity |
| 9 | Client Portal Payments | Milestone payments, proposal approval |
| 10 | Client Team Management | Client invite flow |
| 11 | Enhanced Tracking | Phase tracker, auto-progress, real-time |
| 12 | Team Todo System | Todo CRUD, personal dashboard |
| 13 | Team Workload | Workload API, view, assignment |
| 14 | Project Categories | Internal projects, categories, filters |
| 15 | Next Actions | Quick capture, convert to todo |
| 16 | Portfolio Integration | To-portfolio API, UI |

---

## Detailed Sprint Breakdown

### Sprint 1: Foundation & Database
1. Run all database migrations (001-006)
2. Create all TypeScript types (`users.ts`, `deliverables.ts`, `todos.ts`, `projects.ts`, `client-portal.ts`)
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

### Sprint 12: Team Todo System
59. Create `/api/admin/todos` endpoints (CRUD)
60. Create `/api/admin/todos/my` endpoint for current user
61. Create `TodoList`, `TodoItem`, `TodoForm` components
62. Build My Dashboard page with personal todos
63. Create `QuickAddTodo` component
64. Test todo creation and completion flow

### Sprint 13: Team Workload & Assignment
65. Create `/api/admin/team/workload` endpoint
66. Create `TeamWorkloadCard` component
67. Build Team Workload page
68. Add assign todo to team member functionality
69. Test manager assigning todos to team

### Sprint 14: Project Categories & Internal Projects
70. Create `/api/admin/internal-projects` endpoints
71. Create `InternalProjectCard` component
72. Create `ProjectCategoryTabs` component
73. Build unified Projects page with category filters
74. Build Internal Projects page
75. Add "On Hold" functionality to proposals
76. Test project categorization flow

### Sprint 15: Next Actions & Quick Capture
77. Create `/api/admin/next-actions` endpoints
78. Create `NextActionCapture` component
79. Add quick action capture to project views
80. Create convert-to-todo functionality
81. Test rapid task capture flow

### Sprint 16: Portfolio Integration
82. Create `/api/proposals/[id]/to-portfolio` endpoint
83. Add "Add to Portfolio" button to completed projects
84. Create portfolio creation modal
85. Test full workflow: proposal → active → completed → portfolio

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
- **Personal dashboards** let each team member see their own todos and assignments
- **Project categories** organize work across clients, internal, and personal brand projects
- **Quick capture** enables rapid task creation without losing context
