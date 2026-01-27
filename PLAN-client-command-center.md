# Client Command Center - Implementation Plan

## STATUS: IMPLEMENTED

---

## Vision

Transform the existing client portal into a **comprehensive Client Command Center** - a single dashboard where clients can:
- See ALL their proposals at a glance with clear status indicators
- Push proposals through the workflow (review → sign → pay)
- Track all active work across multiple projects
- Review and manage billing in one place
- Get a true agency-style experience

---

## Current State

The existing client portal (`/client-portal`) provides:
- Token-based access per proposal
- Project list and detail views
- Milestone payment cards
- Phase progress tracking
- Activity feed

**Gap**: Currently, each proposal has its own access token. There's no unified "client account" view that aggregates all proposals for a single client (by email).

---

## Proposed Architecture

### New Client Command Center Structure

```
/client-portal
├── / (dashboard)                    # NEW: Command Center Dashboard
│   ├── Overview stats
│   ├── Proposals requiring action (sign/pay)
│   ├── Active work summary
│   └── Recent activity across all projects
│
├── /proposals                       # NEW: All Proposals List
│   ├── Filter by status
│   ├── Search
│   └── Quick actions (view, sign, pay)
│
├── /proposals/[id]                  # ENHANCED: Proposal Detail
│   ├── /overview                    # Proposal overview & scope
│   ├── /agreement                   # Sign agreement (if pending)
│   ├── /billing                     # Milestones & payments
│   ├── /work                        # Deliverables & progress
│   └── /messages                    # Comments & communication
│
├── /billing                         # NEW: Consolidated Billing
│   ├── Payment history
│   ├── Upcoming payments
│   └── Invoices (future)
│
└── /settings                        # NEW: Client Settings
    ├── Notification preferences
    └── Contact info
```

---

## Implementation Plan

### Phase 1: Client Authentication Enhancement

**Goal**: Allow clients to access ALL their proposals from a single entry point.

#### 1.1 Email-Based Client Session
- Create a client session mechanism using email verification
- Client enters email → receives magic link or PIN
- Session stores `client_email` for aggregating all proposals
- Alternatively: Use existing `access_token` but lookup all proposals for matching `client_email`

#### 1.2 New API Endpoint: Get All Client Proposals
```typescript
// GET /api/client-portal/my-proposals?email={email}
// Returns all proposals where client_email matches
```

#### 1.3 Client Context Provider
- Create React context to hold client session
- Store client email and list of proposal IDs
- Handle cross-proposal navigation

---

### Phase 2: Command Center Dashboard

**Goal**: Create the main dashboard that serves as the client's home base.

#### 2.1 Dashboard Stats Cards
```
┌─────────────────────────────────────────────────────────────────┐
│  COMMAND CENTER                                    Welcome, John │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ 3 Proposals  │  │ 2 Awaiting   │  │ $15,000      │           │
│  │ Active       │  │ Your Action  │  │ Payments Due │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ 12 Items     │  │ $45,000      │  │ 85%          │           │
│  │ In Progress  │  │ Total Value  │  │ On Track     │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.2 Action Required Section
Prominently display items needing client attention:
- **Proposals to sign** - Agreement pending signature
- **Payments due** - Upcoming or overdue milestones
- **Forms to complete** - Onboarding or feedback forms
- **Items needing review** - Deliverables marked for client review

#### 2.3 Active Work Overview
Show aggregated view of all in-progress deliverables:
- Group by project
- Show status distribution
- Link to detailed work view

#### 2.4 Activity Feed
Unified timeline across all proposals:
- Status changes
- New deliverables
- Comments from team
- Payment confirmations

---

### Phase 3: Proposals List View

**Goal**: Easy-to-scan list of all proposals with clear status and actions.

#### 3.1 Proposal List Table/Cards
```
┌─────────────────────────────────────────────────────────────────┐
│  MY PROPOSALS                              [Filter ▾] [Search]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ 🟡 Website Redesign                        AWAITING SIGNATURE││
│  │    Sent Jan 15, 2026 • $25,000                              ││
│  │    [View Proposal] [Sign Agreement ▶]                       ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ 🟢 Mobile App Development                           ACTIVE  ││
│  │    Started Dec 1, 2025 • $45,000 • 65% complete            ││
│  │    Next: Phase 2 payment due Jan 30 ($15,000)              ││
│  │    [View Project] [Make Payment ▶]                         ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ✓ Brand Identity Package                          COMPLETED ││
│  │    Completed Nov 15, 2025 • $12,000 • Paid in full         ││
│  │    [View Archive]                                           ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 3.2 Status Indicators
Clear visual hierarchy:
- **🔵 Draft/Sent** - Proposal sent, awaiting review
- **🟡 Viewed** - Client has viewed, awaiting signature
- **🟠 Signed** - Signed, awaiting first payment
- **🟢 Active** - In progress
- **✓ Completed** - Project finished

#### 3.3 Quick Actions
Contextual actions based on status:
- **Viewed** → "Sign Agreement" button
- **Signed** → "Make First Payment" button
- **Active + Payment Due** → "Make Payment" button
- **Active** → "View Project" button

---

### Phase 4: Enhanced Proposal Detail View

**Goal**: Comprehensive single-proposal view with tabbed navigation.

#### 4.1 Proposal Sub-Navigation
```
[Overview] [Agreement] [Billing] [Work] [Messages]
```

#### 4.2 Overview Tab
- Project scope and description
- Timeline visualization
- Phase breakdown with progress
- Key milestones
- Team members assigned

#### 4.3 Agreement Tab
- Full agreement text
- Terms and conditions
- **If unsigned**: Signature capture component
- **If signed**: Signed agreement with timestamp

#### 4.4 Billing Tab
- Payment schedule table
- Status for each milestone (Paid/Due/Upcoming)
- "Pay Now" buttons for due items
- Payment history
- Total invested vs. remaining

#### 4.5 Work Tab
- All deliverables for this proposal
- Filter by phase, status
- Links to deliverable assets
- Progress indicators
- "Mark as Reviewed" action for client review items

#### 4.6 Messages Tab
- Communication thread
- Add new comments
- Attachment support
- Admin responses

---

### Phase 5: Consolidated Billing Center

**Goal**: Single view for all financial matters across all proposals.

#### 5.1 Billing Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│  BILLING CENTER                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ $82,000      │  │ $45,000      │  │ $37,000      │           │
│  │ Total Value  │  │ Paid         │  │ Remaining    │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                  │
│  PAYMENTS DUE                                                    │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Mobile App Dev - Phase 2         $15,000    Due Jan 30      ││
│  │                                              [Pay Now ▶]    ││
│  ├─────────────────────────────────────────────────────────────┤│
│  │ Website Redesign - Deposit       $12,500    Due Feb 5       ││
│  │                                              [Pay Now ▶]    ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  PAYMENT HISTORY                                [View All →]    │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ✓ Mobile App - Phase 1           $15,000    Paid Jan 1      ││
│  │ ✓ Brand Identity - Final         $6,000     Paid Nov 15     ││
│  │ ✓ Brand Identity - Deposit       $6,000     Paid Oct 1      ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 5.2 Payment Actions
- One-click Stripe checkout for any due payment
- Payment confirmation emails
- Receipt/invoice downloads (future enhancement)

---

### Phase 6: Work Tracking View

**Goal**: See all active work across all projects.

#### 6.1 Aggregated Deliverables View
```
┌─────────────────────────────────────────────────────────────────┐
│  MY WORK                              [All Projects ▾] [Status ▾]│
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MOBILE APP DEVELOPMENT                                          │
│  ├── ✓ User authentication flow                      Completed  │
│  ├── 🔄 Dashboard UI implementation                  In Progress │
│  ├── 👁 Payment integration                          In Review   │
│  └── ○ Push notifications                            Pending     │
│                                                                  │
│  WEBSITE REDESIGN                                                │
│  ├── ○ Homepage wireframes                           Pending     │
│  └── ○ Design system documentation                   Pending     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 6.2 Client Actions on Deliverables
- View attached links/assets
- Mark items as "Client Approved" (for review items)
- Add comments/feedback
- Request changes

---

## Technical Implementation

### New Files to Create

```
/src/app/client-portal/
├── layout.tsx                       # Enhanced layout with new nav
├── page.tsx                         # Command Center Dashboard (rewrite)
├── proposals/
│   ├── page.tsx                     # All Proposals List
│   └── [id]/
│       ├── page.tsx                 # Proposal Detail (redirect to overview)
│       ├── overview/page.tsx        # Overview tab
│       ├── agreement/page.tsx       # Agreement tab
│       ├── billing/page.tsx         # Billing tab
│       ├── work/page.tsx            # Work/Deliverables tab
│       └── messages/page.tsx        # Messages tab
├── billing/
│   └── page.tsx                     # Consolidated Billing Center
└── work/
    └── page.tsx                     # All Work View

/src/components/client-portal/
├── CommandCenterNav.tsx             # Main navigation
├── ActionRequiredCard.tsx           # Action items component
├── ProposalCard.tsx                 # Proposal list card
├── ProposalStatusBadge.tsx          # Status indicator
├── BillingSummary.tsx               # Billing overview
├── PaymentCard.tsx                  # Individual payment item
├── WorkItem.tsx                     # Deliverable display
└── ClientActivityFeed.tsx           # Activity timeline

/src/app/api/client-portal/
├── dashboard/route.ts               # Aggregated dashboard data
├── proposals/route.ts               # All proposals for client
├── billing/route.ts                 # Consolidated billing data
└── work/route.ts                    # Aggregated deliverables
```

### New Types to Add

```typescript
// src/types/client-portal.ts (additions)

interface ClientDashboardStats {
  total_proposals: number;
  active_proposals: number;
  actions_required: number;
  total_payments_due: number;
  total_value: number;
  total_paid: number;
  items_in_progress: number;
  health_percentage: number;
}

interface ClientActionItem {
  type: 'sign_agreement' | 'make_payment' | 'complete_form' | 'review_deliverable';
  proposal_id: string;
  proposal_name: string;
  title: string;
  description: string;
  due_date?: string;
  amount?: number;
  action_url: string;
  priority: 'urgent' | 'normal';
}

interface ClientBillingSummary {
  total_value: number;
  total_paid: number;
  total_remaining: number;
  payments_due: ClientPayment[];
  payment_history: ClientPayment[];
}

interface ClientPayment {
  id: string;
  proposal_id: string;
  proposal_name: string;
  milestone_name: string;
  amount: number;
  due_date?: string;
  paid_at?: string;
  status: 'pending' | 'due' | 'overdue' | 'paid';
  stripe_payment_url?: string;
}
```

### Database Changes

None required - the existing schema supports all features. We just need new API queries that aggregate by `client_email`.

---

## UI/UX Principles

1. **Action-Oriented**: Always show what the client needs to do next
2. **Clear Status**: Visual indicators for every state
3. **One-Click Actions**: Minimize clicks to complete tasks
4. **Mobile-First**: Responsive design for on-the-go access
5. **Professional**: Clean, agency-quality aesthetic
6. **Transparent**: Show all financial and progress information clearly

---

## Implementation Order

1. **Phase 1**: Client auth enhancement (email-based session)
2. **Phase 2**: Command Center Dashboard
3. **Phase 3**: Proposals List View
4. **Phase 4**: Enhanced Proposal Detail with tabs
5. **Phase 5**: Consolidated Billing Center
6. **Phase 6**: Aggregated Work View

Each phase builds on the previous, allowing for incremental delivery and testing.

---

## Questions to Consider

1. **Client Authentication**:
   - Magic link via email?
   - PIN-based (existing `portal_password`)?
   - Both options?

2. **Multi-Company Clients**:
   - Should we match by email only, or also allow grouping by company?

3. **Notifications**:
   - Email notifications for action items?
   - In-app notification center?

4. **Invoice Generation**:
   - Generate PDF invoices from milestones?
   - This would be a future enhancement

---

## Success Metrics

- Client can find any proposal in < 3 clicks
- Payment completion rate increases
- Reduced support questions about "where is X"
- Positive client feedback on portal experience
