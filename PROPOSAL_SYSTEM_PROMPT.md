# Proposal System Implementation Prompt

## Overview
Build a comprehensive proposal management system for Light Brand Consulting, inspired by Oracle Studios' proposal system (https://www.oraclestudios.io/proposals/industree). The system should allow admins to create proposals from lead form submissions and provide clients with a secure portal to view their proposals, agreements, billing, onboarding, and project dashboard.

## Reference Implementation
Study the Oracle Studios proposal system which includes:
- Multi-phase project proposals with timelines
- Agreement signing workflow
- Billing/invoicing with milestone-based payments
- Onboarding forms
- Client dashboard with project progress tracking
- Milestone status and payment status tracking

## SQL Schema Requirements

Create the following database schema in Supabase:

```sql
-- ============================================================================
-- Lead Submissions (from /book page)
-- ============================================================================

CREATE TABLE IF NOT EXISTS lead_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service VARCHAR(100) NOT NULL, -- 'diagnostic', 'command-center', 'authority-engine', 'ascension'
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  intake_data JSONB, -- Store intake question answers as JSON
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'proposal_sent', 'converted', 'archived')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_lead_submissions_status ON lead_submissions(status);
CREATE INDEX idx_lead_submissions_email ON lead_submissions(email);
CREATE INDEX idx_lead_submissions_created_at ON lead_submissions(created_at DESC);

-- ============================================================================
-- Proposals
-- ============================================================================

CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_submission_id UUID REFERENCES lead_submissions(id) ON DELETE SET NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  project_overview TEXT,
  project_scope TEXT,
  total_timeline VARCHAR(100), -- e.g., "4-6 months", "9-12 months"
  start_date DATE,
  estimated_completion_date DATE,
  total_amount DECIMAL(12, 2) NOT NULL,
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  final_amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'agreement_signed', 'active', 'completed', 'cancelled')),
  access_token UUID DEFAULT uuid_generate_v4(), -- Unique token for client portal access
  created_by UUID, -- Admin user ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,
  agreement_signed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_access_token ON proposals(access_token);
CREATE INDEX idx_proposals_client_email ON proposals(client_email);
CREATE INDEX idx_proposals_lead_submission_id ON proposals(lead_submission_id);

-- ============================================================================
-- Proposal Phases
-- ============================================================================

CREATE TABLE IF NOT EXISTS proposal_phases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  phase_number INTEGER NOT NULL,
  phase_name VARCHAR(255) NOT NULL,
  description TEXT,
  timeline VARCHAR(100), -- e.g., "6-8 weeks"
  start_date DATE,
  end_date DATE,
  deliverables JSONB, -- Array of deliverable objects
  objectives JSONB, -- Array of objective strings
  goals JSONB, -- Array of goal strings
  amount DECIMAL(12, 2) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(proposal_id, phase_number)
);

CREATE INDEX idx_proposal_phases_proposal_id ON proposal_phases(proposal_id);
CREATE INDEX idx_proposal_phases_sort_order ON proposal_phases(proposal_id, sort_order);

-- ============================================================================
-- Milestones (Payment Checkpoints)
-- ============================================================================

CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES proposal_phases(id) ON DELETE SET NULL,
  milestone_name VARCHAR(255) NOT NULL,
  description TEXT,
  amount DECIMAL(12, 2) NOT NULL,
  due_date DATE,
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'overdue', 'cancelled')),
  milestone_status VARCHAR(50) DEFAULT 'not_started' CHECK (milestone_status IN ('not_started', 'in_progress', 'completed', 'blocked')),
  invoice_number VARCHAR(100),
  paid_at TIMESTAMP WITH TIME ZONE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_milestones_proposal_id ON milestones(proposal_id);
CREATE INDEX idx_milestones_payment_status ON milestones(payment_status);
CREATE INDEX idx_milestones_milestone_status ON milestones(milestone_status);
CREATE INDEX idx_milestones_due_date ON milestones(due_date);

-- ============================================================================
-- Agreements
-- ============================================================================

CREATE TABLE IF NOT EXISTS agreements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  agreement_text TEXT NOT NULL,
  terms JSONB, -- Store structured terms
  signed_by_name VARCHAR(255),
  signed_by_email VARCHAR(255),
  signed_at TIMESTAMP WITH TIME ZONE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'signed', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_agreements_proposal_id ON agreements(proposal_id);
CREATE INDEX idx_agreements_status ON agreements(status);

-- ============================================================================
-- Onboarding Forms
-- ============================================================================

CREATE TABLE IF NOT EXISTS onboarding_forms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  form_data JSONB NOT NULL, -- Store form responses as JSON
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'reviewed')),
  submitted_at TIMESTAMP WITH TIME ZONE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_onboarding_forms_proposal_id ON onboarding_forms(proposal_id);
CREATE INDEX idx_onboarding_forms_status ON onboarding_forms(status);

-- ============================================================================
-- Project Dashboard Updates
-- ============================================================================

CREATE TABLE IF NOT EXISTS dashboard_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
  update_type VARCHAR(50) NOT NULL CHECK (update_type IN ('milestone_update', 'progress_update', 'comment', 'file_upload', 'status_change')),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  attachments JSONB, -- Array of file objects with url, name, type
  created_by UUID, -- Admin user ID
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_dashboard_updates_proposal_id ON dashboard_updates(proposal_id);
CREATE INDEX idx_dashboard_updates_created_at ON dashboard_updates(proposal_id, created_at DESC);

-- ============================================================================
-- Comments/Activity Log
-- ============================================================================

CREATE TABLE IF NOT EXISTS proposal_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
  comment_text TEXT NOT NULL,
  created_by UUID, -- Admin user ID or NULL for client comments
  is_client_comment BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_proposal_comments_proposal_id ON proposal_comments(proposal_id);
CREATE INDEX idx_proposal_comments_created_at ON proposal_comments(proposal_id, created_at DESC);

-- ============================================================================
-- Triggers for updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_lead_submissions_updated_at BEFORE UPDATE ON lead_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON proposals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_proposal_phases_updated_at BEFORE UPDATE ON proposal_phases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_milestones_updated_at BEFORE UPDATE ON milestones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agreements_updated_at BEFORE UPDATE ON agreements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_onboarding_forms_updated_at BEFORE UPDATE ON onboarding_forms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dashboard_updates_updated_at BEFORE UPDATE ON dashboard_updates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_proposal_comments_updated_at BEFORE UPDATE ON proposal_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================

-- Lead submissions: Only admins can access
ALTER TABLE lead_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage lead submissions" ON lead_submissions FOR ALL USING (auth.role() = 'authenticated');

-- Proposals: Admins have full access, clients can view via access_token
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage proposals" ON proposals FOR ALL USING (auth.role() = 'authenticated');
-- Note: Client access will be handled via API route that validates access_token

-- Similar RLS policies for other tables...
-- (Implement appropriate RLS policies for each table)
```

## Functional Requirements

### 1. Lead Submission Integration (/book page)

**Current State:**
- The `/book` page collects: service selection, contact info (name, email, company, phone), intake questions, and confirmation
- Currently only simulates submission with `setTimeout`

**Required Changes:**
- Create API route `/api/leads` (POST) to save lead submissions to database
- Update `BookPage` component to submit to this API endpoint
- Store all form data including intake question answers as JSONB
- Send confirmation email to client
- Notify admin of new lead submission

### 2. Admin Proposal Creation

**Admin Interface Requirements:**
- New admin page: `/admin/leads` - List all lead submissions with filters (status, date, service)
- New admin page: `/admin/proposals/new` - Create proposal from lead submission
- Proposal creation form should:
  - Pre-populate client info from selected lead submission
  - Allow editing project name, overview, scope
  - Define phases with: name, timeline, deliverables, objectives, goals, amount
  - Set total timeline and dates
  - Calculate total amount and apply discount
  - Generate unique access token for client portal
  - Save as draft or send immediately

**Proposal Template Structure:**
- Project Overview section (editable rich text)
- Project Timeline section (auto-generated from phases)
- Project Scope section (editable rich text)
- Phases section (each phase shows: name, timeline, deliverables, objectives, goals, amount)
- Total pricing with discount calculation
- Agreement section (editable terms)

### 3. Client Portal

**Access Method:**
- Clients access via unique URL: `/proposals/[accessToken]`
- No login required - access token provides secure access
- Token is UUID stored in proposals table

**Client Portal Pages (Multi-step workflow):**

**Step 1: Proposal View**
- Display full proposal with all phases, deliverables, pricing
- Beautiful, branded presentation matching Light Brand design system
- "Accept Proposal" button leads to Step 2

**Step 2: Agreement**
- Display agreement terms
- Signature capture (draw or type name)
- Client must sign to proceed
- Store signature data, IP address, timestamp

**Step 3: Billing**
- Display all milestones with amounts and due dates
- Payment status for each milestone
- "Pay Invoice" buttons (integrate with payment processor later)
- Show payment history

**Step 4: Onboarding**
- Custom onboarding form (configurable per proposal)
- Collect additional client information
- File uploads if needed
- Submit button saves to database

**Step 5: Dashboard**
- Project progress overview
- Milestone status tracking
- Recent updates/announcements from admin
- Comments/activity feed
- File downloads
- "Request More Development" button

### 4. Admin Dashboard Enhancements

**New Admin Pages:**
- `/admin/proposals` - List all proposals with status filters
- `/admin/proposals/[id]` - View/edit proposal details
- `/admin/proposals/[id]/dashboard` - Manage project dashboard
  - Post updates
  - Upload files
  - Update milestone status
  - Add comments
  - View client activity

**Admin Features:**
- Mark milestones as paid
- Update milestone status (not_started, in_progress, completed)
- Post dashboard updates visible to client
- Upload files/deliverables
- View client comments
- Send proposal via email (with access link)
- Resend access link

### 5. Email Notifications

**Trigger Points:**
- New lead submission → Notify admin
- Proposal sent → Email client with access link
- Agreement signed → Notify admin
- Milestone payment received → Notify admin and client
- Dashboard update posted → Notify client
- New comment → Notify relevant party

## Technical Requirements

### API Routes Needed

1. `POST /api/leads` - Create lead submission
2. `GET /api/leads` - List leads (admin only)
3. `GET /api/leads/[id]` - Get lead details (admin only)
4. `POST /api/proposals` - Create proposal (admin only)
5. `GET /api/proposals` - List proposals (admin only)
6. `GET /api/proposals/[id]` - Get proposal (admin or client via token)
7. `PUT /api/proposals/[id]` - Update proposal (admin only)
8. `GET /api/proposals/token/[accessToken]` - Get proposal by access token (public)
9. `POST /api/proposals/[id]/agreement` - Sign agreement (public via token)
10. `POST /api/proposals/[id]/onboarding` - Submit onboarding form (public via token)
11. `GET /api/proposals/[id]/dashboard` - Get dashboard updates (admin or client)
12. `POST /api/proposals/[id]/dashboard` - Post dashboard update (admin only)
13. `POST /api/proposals/[id]/comments` - Add comment (admin or client)
14. `PUT /api/milestones/[id]` - Update milestone status/payment (admin only)

### Design System Integration

- Use existing Light Brand design system components
- Match styling from home page (glows, patterns, badges, refined typography)
- Use Container with `size="wide"` for consistent widths
- Use Section component for spacing
- Match admin panel styling already established

### Security Considerations

- Access tokens must be cryptographically secure UUIDs
- Validate access tokens on all client-facing routes
- Rate limiting on public proposal endpoints
- Sanitize all user inputs
- Validate file uploads
- Implement CSRF protection

## Implementation Priority

**Phase 1: Core Infrastructure**
1. Database schema setup
2. Lead submission API and integration with /book page
3. Admin lead management interface
4. Basic proposal creation interface

**Phase 2: Client Portal**
1. Proposal viewing page
2. Agreement signing
3. Billing/milestones display
4. Onboarding form

**Phase 3: Dashboard & Management**
1. Client dashboard
2. Admin dashboard management
3. Comments/activity system
4. File uploads

**Phase 4: Polish & Enhancements**
1. Email notifications
2. Payment integration (Stripe/PayPal)
3. Advanced filtering and search
4. Analytics and reporting

## Notes

- Reference the Oracle Studios implementation for UI/UX patterns
- Maintain consistency with existing admin panel design
- Ensure mobile responsiveness
- Consider accessibility (WCAG 2.1 AA)
- Plan for scalability (many proposals, many clients)
