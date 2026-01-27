-- ============================================================================
-- Migration: Client Hierarchy System
-- Light Brand Consulting
--
-- Transforms the proposal system from standalone proposals to a proper hierarchy:
-- Client -> Project -> Proposal -> Phases/Milestones
-- ============================================================================

-- ============================================================================
-- Clients Table
-- Top-level entity representing a client (person/company)
-- ============================================================================
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_company VARCHAR(255),
  client_phone VARCHAR(50),
  website_url TEXT,
  logo_url TEXT,
  industry VARCHAR(100),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'active',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_client_status CHECK (status IN ('active', 'inactive', 'archived'))
);

-- Comments for clients
COMMENT ON TABLE clients IS 'Client entities representing people or companies';
COMMENT ON COLUMN clients.client_name IS 'Primary contact name';
COMMENT ON COLUMN clients.client_email IS 'Primary contact email';
COMMENT ON COLUMN clients.client_company IS 'Company name if applicable';
COMMENT ON COLUMN clients.status IS 'Client status: active, inactive, archived';
COMMENT ON COLUMN clients.metadata IS 'Additional client data in JSON format';

-- ============================================================================
-- Client Projects Table
-- Projects belong to a client and contain multiple proposals
-- ============================================================================
CREATE TABLE IF NOT EXISTS client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  project_name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_project_status CHECK (status IN ('draft', 'active', 'completed', 'on_hold', 'cancelled'))
);

-- Comments for client_projects
COMMENT ON TABLE client_projects IS 'Projects under a client, containing multiple proposals';
COMMENT ON COLUMN client_projects.client_id IS 'Reference to parent client';
COMMENT ON COLUMN client_projects.project_name IS 'Name of the project';
COMMENT ON COLUMN client_projects.status IS 'Project status: draft, active, completed, on_hold, cancelled';
COMMENT ON COLUMN client_projects.start_date IS 'Planned or actual start date';
COMMENT ON COLUMN client_projects.end_date IS 'Planned or actual end date';

-- ============================================================================
-- Add client_id and project_id to proposals table
-- ============================================================================
ALTER TABLE proposals
  ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES client_projects(id) ON DELETE SET NULL;

-- Comments for new proposal columns
COMMENT ON COLUMN proposals.client_id IS 'Reference to client entity (optional for backward compatibility)';
COMMENT ON COLUMN proposals.project_id IS 'Reference to client project (optional for backward compatibility)';

-- ============================================================================
-- Add client_project_id to project_members for project-level access
-- ============================================================================
ALTER TABLE project_members
  ADD COLUMN IF NOT EXISTS client_project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE;

-- Make proposal_id nullable to allow project-level membership without specific proposal
ALTER TABLE project_members
  ALTER COLUMN proposal_id DROP NOT NULL;

-- Add constraint: must have either proposal_id or client_project_id
ALTER TABLE project_members
  ADD CONSTRAINT chk_project_member_reference
  CHECK (proposal_id IS NOT NULL OR client_project_id IS NOT NULL);

-- Update unique constraint to handle both proposal and project level membership
-- Drop constraint first (which depends on the index), then the index
ALTER TABLE project_members DROP CONSTRAINT IF EXISTS uq_project_member;
DROP INDEX IF EXISTS uq_project_member;

CREATE UNIQUE INDEX IF NOT EXISTS uq_project_member_proposal
ON project_members(proposal_id, user_profile_id)
WHERE proposal_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_project_member_project
ON project_members(client_project_id, user_profile_id)
WHERE client_project_id IS NOT NULL;

-- Comment for new column
COMMENT ON COLUMN project_members.client_project_id IS 'Reference to client project for project-level access (inherits to all proposals)';

-- ============================================================================
-- Indexes
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_clients_email
ON clients(client_email);

CREATE INDEX IF NOT EXISTS idx_clients_company
ON clients(client_company)
WHERE client_company IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_clients_status
ON clients(status);

CREATE INDEX IF NOT EXISTS idx_client_projects_client
ON client_projects(client_id);

CREATE INDEX IF NOT EXISTS idx_client_projects_status
ON client_projects(status);

CREATE INDEX IF NOT EXISTS idx_proposals_client
ON proposals(client_id)
WHERE client_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_proposals_project
ON proposals(project_id)
WHERE project_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_project_members_client_project
ON project_members(client_project_id)
WHERE client_project_id IS NOT NULL;

-- ============================================================================
-- Triggers for updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_projects_updated_at
  BEFORE UPDATE ON client_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Row Level Security
-- ============================================================================
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users (admin access)
CREATE POLICY "Enable full access for authenticated users"
ON clients
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable full access for authenticated users"
ON client_projects
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy for service role (API access)
CREATE POLICY "Enable full access for service role"
ON clients
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable full access for service role"
ON client_projects
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- Data Migration: Create clients from existing proposals
-- Groups by email + company to consolidate duplicate clients
-- ============================================================================

-- Insert unique clients from existing proposals
INSERT INTO clients (client_name, client_email, client_company, client_phone, status, created_at)
SELECT DISTINCT ON (LOWER(client_email), LOWER(COALESCE(client_company, '')))
  client_name,
  LOWER(client_email) as client_email,
  client_company,
  client_phone,
  'active',
  MIN(created_at) OVER (PARTITION BY LOWER(client_email), LOWER(COALESCE(client_company, '')))
FROM proposals
WHERE client_email IS NOT NULL AND client_email != ''
ORDER BY LOWER(client_email), LOWER(COALESCE(client_company, '')), created_at ASC;

-- Link existing proposals to their clients
UPDATE proposals p
SET client_id = c.id
FROM clients c
WHERE LOWER(p.client_email) = LOWER(c.client_email)
  AND LOWER(COALESCE(p.client_company, '')) = LOWER(COALESCE(c.client_company, ''))
  AND p.client_id IS NULL;
