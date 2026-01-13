-- ============================================================================
-- Light Brand Consulting - Proposal Management System Schema
-- ============================================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

CREATE INDEX IF NOT EXISTS idx_lead_submissions_status ON lead_submissions(status);
CREATE INDEX IF NOT EXISTS idx_lead_submissions_email ON lead_submissions(email);
CREATE INDEX IF NOT EXISTS idx_lead_submissions_created_at ON lead_submissions(created_at DESC);

-- ============================================================================
-- Proposals
-- ============================================================================

CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_submission_id UUID REFERENCES lead_submissions(id) ON DELETE SET NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_company VARCHAR(255),
  client_phone VARCHAR(50),
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
  viewed_at TIMESTAMP WITH TIME ZONE,
  agreement_signed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
CREATE INDEX IF NOT EXISTS idx_proposals_access_token ON proposals(access_token);
CREATE INDEX IF NOT EXISTS idx_proposals_client_email ON proposals(client_email);
CREATE INDEX IF NOT EXISTS idx_proposals_lead_submission_id ON proposals(lead_submission_id);
CREATE INDEX IF NOT EXISTS idx_proposals_created_at ON proposals(created_at DESC);

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
  visible_in_portal BOOLEAN DEFAULT true, -- Controls visibility in client portal
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(proposal_id, phase_number)
);

CREATE INDEX IF NOT EXISTS idx_proposal_phases_proposal_id ON proposal_phases(proposal_id);
CREATE INDEX IF NOT EXISTS idx_proposal_phases_sort_order ON proposal_phases(proposal_id, sort_order);

-- Index for efficient filtering of visible phases in client portal
CREATE INDEX IF NOT EXISTS idx_proposal_phases_visible
ON proposal_phases(proposal_id, visible_in_portal)
WHERE visible_in_portal = true;

-- Add column to existing table (for migrations)
-- ALTER TABLE proposal_phases ADD COLUMN IF NOT EXISTS visible_in_portal BOOLEAN DEFAULT true;

COMMENT ON COLUMN proposal_phases.visible_in_portal IS
'Controls whether this phase is visible to clients in the portal. Admins can toggle this to gradually reveal phases.';

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

CREATE INDEX IF NOT EXISTS idx_milestones_proposal_id ON milestones(proposal_id);
CREATE INDEX IF NOT EXISTS idx_milestones_payment_status ON milestones(payment_status);
CREATE INDEX IF NOT EXISTS idx_milestones_milestone_status ON milestones(milestone_status);
CREATE INDEX IF NOT EXISTS idx_milestones_due_date ON milestones(due_date);

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
  signature_data TEXT, -- Base64 signature image or typed name
  signed_at TIMESTAMP WITH TIME ZONE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'signed', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agreements_proposal_id ON agreements(proposal_id);
CREATE INDEX IF NOT EXISTS idx_agreements_status ON agreements(status);

-- ============================================================================
-- Onboarding Forms
-- ============================================================================

CREATE TABLE IF NOT EXISTS onboarding_forms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  form_config JSONB, -- Store form field configuration
  form_data JSONB, -- Store form responses as JSON
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'reviewed')),
  submitted_at TIMESTAMP WITH TIME ZONE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_onboarding_forms_proposal_id ON onboarding_forms(proposal_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_forms_status ON onboarding_forms(status);

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

CREATE INDEX IF NOT EXISTS idx_dashboard_updates_proposal_id ON dashboard_updates(proposal_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_updates_created_at ON dashboard_updates(proposal_id, created_at DESC);

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

CREATE INDEX IF NOT EXISTS idx_proposal_comments_proposal_id ON proposal_comments(proposal_id);
CREATE INDEX IF NOT EXISTS idx_proposal_comments_created_at ON proposal_comments(proposal_id, created_at DESC);

-- ============================================================================
-- Triggers for updated_at
-- ============================================================================

-- Drop existing trigger if exists, then create
DROP TRIGGER IF EXISTS update_lead_submissions_updated_at ON lead_submissions;
CREATE TRIGGER update_lead_submissions_updated_at
  BEFORE UPDATE ON lead_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_proposals_updated_at ON proposals;
CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_proposal_phases_updated_at ON proposal_phases;
CREATE TRIGGER update_proposal_phases_updated_at
  BEFORE UPDATE ON proposal_phases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_milestones_updated_at ON milestones;
CREATE TRIGGER update_milestones_updated_at
  BEFORE UPDATE ON milestones
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_agreements_updated_at ON agreements;
CREATE TRIGGER update_agreements_updated_at
  BEFORE UPDATE ON agreements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_onboarding_forms_updated_at ON onboarding_forms;
CREATE TRIGGER update_onboarding_forms_updated_at
  BEFORE UPDATE ON onboarding_forms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_dashboard_updates_updated_at ON dashboard_updates;
CREATE TRIGGER update_dashboard_updates_updated_at
  BEFORE UPDATE ON dashboard_updates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_proposal_comments_updated_at ON proposal_comments;
CREATE TRIGGER update_proposal_comments_updated_at
  BEFORE UPDATE ON proposal_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================

-- Lead submissions: Only admins can access
ALTER TABLE lead_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage lead submissions" ON lead_submissions;
CREATE POLICY "Admins can manage lead submissions"
  ON lead_submissions FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Proposals: Admins have full access
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage proposals" ON proposals;
CREATE POLICY "Admins can manage proposals"
  ON proposals FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Allow public to view proposals via access_token (handled via API)
DROP POLICY IF EXISTS "Public can view proposals via token" ON proposals;
CREATE POLICY "Public can view proposals via token"
  ON proposals FOR SELECT
  USING (true); -- Token validation done in API

-- Proposal phases: Same as proposals
ALTER TABLE proposal_phases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage proposal phases" ON proposal_phases;
CREATE POLICY "Admins can manage proposal phases"
  ON proposal_phases FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public can view proposal phases" ON proposal_phases;
CREATE POLICY "Public can view proposal phases"
  ON proposal_phases FOR SELECT
  USING (true); -- Validation in API via parent proposal token

-- Milestones
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage milestones" ON milestones;
CREATE POLICY "Admins can manage milestones"
  ON milestones FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public can view milestones" ON milestones;
CREATE POLICY "Public can view milestones"
  ON milestones FOR SELECT
  USING (true);

-- Agreements
ALTER TABLE agreements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage agreements" ON agreements;
CREATE POLICY "Admins can manage agreements"
  ON agreements FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public can view and sign agreements" ON agreements;
CREATE POLICY "Public can view and sign agreements"
  ON agreements FOR ALL
  USING (true); -- Token validation in API

-- Onboarding forms
ALTER TABLE onboarding_forms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage onboarding forms" ON onboarding_forms;
CREATE POLICY "Admins can manage onboarding forms"
  ON onboarding_forms FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public can view and submit onboarding forms" ON onboarding_forms;
CREATE POLICY "Public can view and submit onboarding forms"
  ON onboarding_forms FOR ALL
  USING (true);

-- Dashboard updates
ALTER TABLE dashboard_updates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage dashboard updates" ON dashboard_updates;
CREATE POLICY "Admins can manage dashboard updates"
  ON dashboard_updates FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public can view dashboard updates" ON dashboard_updates;
CREATE POLICY "Public can view dashboard updates"
  ON dashboard_updates FOR SELECT
  USING (true);

-- Proposal comments
ALTER TABLE proposal_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage proposal comments" ON proposal_comments;
CREATE POLICY "Admins can manage proposal comments"
  ON proposal_comments FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public can view and create comments" ON proposal_comments;
CREATE POLICY "Public can view and create comments"
  ON proposal_comments FOR ALL
  USING (true);
