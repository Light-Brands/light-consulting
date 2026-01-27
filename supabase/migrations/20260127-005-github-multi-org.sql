-- GitHub Multi-Org Support Migration
-- Light Brand Consulting
-- Add support for tracking multiple GitHub organizations

-- ============================================================================
-- Table 1: github_orgs - Organization tracking
-- ============================================================================
CREATE TABLE IF NOT EXISTS github_orgs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_id BIGINT NOT NULL UNIQUE,
  login TEXT NOT NULL UNIQUE,
  name TEXT,
  avatar_url TEXT,
  description TEXT,
  is_tracked BOOLEAN DEFAULT false,
  repos_count INTEGER DEFAULT 0,
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_github_orgs_is_tracked ON github_orgs(is_tracked);
CREATE INDEX IF NOT EXISTS idx_github_orgs_login ON github_orgs(login);

-- ============================================================================
-- Add org_id to github_repositories
-- ============================================================================
ALTER TABLE github_repositories
  ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES github_orgs(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_github_repositories_org_id ON github_repositories(org_id);

-- ============================================================================
-- Make org_name optional in github_config (token-only now)
-- ============================================================================
ALTER TABLE github_config ALTER COLUMN org_name DROP NOT NULL;

-- ============================================================================
-- Updated At Trigger for github_orgs
-- ============================================================================
DROP TRIGGER IF EXISTS trigger_github_orgs_updated_at ON github_orgs;
CREATE TRIGGER trigger_github_orgs_updated_at
  BEFORE UPDATE ON github_orgs
  FOR EACH ROW
  EXECUTE FUNCTION update_github_updated_at();

-- ============================================================================
-- Row Level Security for github_orgs
-- ============================================================================
ALTER TABLE github_orgs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated read on github_orgs" ON github_orgs
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow service role full access on github_orgs" ON github_orgs
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================================
-- Table Comments
-- ============================================================================
COMMENT ON TABLE github_orgs IS 'GitHub organizations accessible via the configured token';
COMMENT ON COLUMN github_orgs.github_id IS 'GitHub numeric ID for the organization';
COMMENT ON COLUMN github_orgs.login IS 'GitHub organization login/username';
COMMENT ON COLUMN github_orgs.is_tracked IS 'Whether to include this org in analytics sync';
COMMENT ON COLUMN github_orgs.repos_count IS 'Cached count of repositories in this org';
COMMENT ON COLUMN github_repositories.org_id IS 'Reference to the organization this repo belongs to';
