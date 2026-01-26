# Project Tracker Dashboard - Overview

**Light Brand Consulting**
**Date:** January 2026

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

## Estimated Scope

| Category | Count |
|----------|-------|
| Database | 8 new tables, ~20 new columns, 2 views |
| API Endpoints | ~35 new endpoints |
| Pages | ~15 new pages |
| Components | ~35 new components |
| Sprints | 16 sprints (flexible based on team capacity) |

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

## Related Documents

| Document | Description |
|----------|-------------|
| [01-ARCHITECTURE.md](./01-ARCHITECTURE.md) | System architecture, user roles, data model |
| [02-DATABASE-SCHEMA.md](./02-DATABASE-SCHEMA.md) | SQL migrations |
| [03-TYPE-DEFINITIONS.md](./03-TYPE-DEFINITIONS.md) | TypeScript interfaces |
| [04-API-ENDPOINTS.md](./04-API-ENDPOINTS.md) | API routes |
| [05-UI-COMPONENTS.md](./05-UI-COMPONENTS.md) | Component designs |
| [06-CLIENT-PORTAL.md](./06-CLIENT-PORTAL.md) | Client portal details |
| [07-ADMIN-PORTAL.md](./07-ADMIN-PORTAL.md) | Admin portal & team management |
| [08-FILE-STRUCTURE.md](./08-FILE-STRUCTURE.md) | Project file layout |
| [09-IMPLEMENTATION.md](./09-IMPLEMENTATION.md) | Sprint plan & workflows |

---

## Not In Scope (Keep It Simple)

To avoid over-engineering, these features are explicitly **NOT** included in this phase:

- Time tracking (separate tool recommendation if needed)
- Kanban/drag-and-drop views (can add later if needed)
- Gantt charts (timeline view in future if needed)
- Real-time chat/messaging (use external tools for now)
- Email notifications beyond invitations (manual for now, can add later)
- Custom dashboards/reports (MVP first)
- Mobile app (web responsive for now)
- Multi-language support

These can be added in future iterations if needed.
