# Project Tracker - Client Portal

The Client Portal is the client-facing counterpart to the Command Center. It provides clients with an interactive, real-time view of their projects.

---

## Authentication Flow

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

---

## Client Dashboard

**File:** `src/app/client-portal/page.tsx`

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

---

## Project Detail Page

**File:** `src/app/client-portal/projects/[id]/page.tsx`

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

---

## Proposal Review/Approval Page

**File:** `src/app/client-portal/proposals/[id]/page.tsx`

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

---

## Client Portal Components

| Component | Description |
|-----------|-------------|
| `ClientNavbar.tsx` | Client navigation header |
| `ProjectProgressBar.tsx` | Interactive visual progress indicator showing phases and completion |
| `DeliverableCard.tsx` | Card showing a deliverable link with type icon, title, and action button |
| `MilestonePaymentCard.tsx` | Milestone card with payment status and "Pay Now" integration |
| `ActivityFeed.tsx` | Timeline of project updates visible to client |
| `PhaseAccordion.tsx` | Expandable phase showing deliverables and links |
| `ProposalApprovalForm.tsx` | Approval flow with checkboxes and payment trigger |
| `TeamSection.tsx` | Display of team members working on project |

---

## Client Workflow: Engagement Journey

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

## Success Criteria

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
