-- Team Developers Migration
-- Light Brand Consulting
-- Track which GitHub contributors are internal team developers

-- ============================================================================
-- Table: team_developers - Internal team member tracking
-- ============================================================================
CREATE TABLE IF NOT EXISTS team_developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_login TEXT NOT NULL UNIQUE,
  github_id BIGINT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  user_profile_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  designated_at TIMESTAMPTZ DEFAULT now(),
  designated_by UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- Indexes
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_team_developers_github_login ON team_developers(github_login);
CREATE INDEX IF NOT EXISTS idx_team_developers_github_id ON team_developers(github_id);

-- ============================================================================
-- Updated At Trigger
-- ============================================================================
DROP TRIGGER IF EXISTS trigger_team_developers_updated_at ON team_developers;
CREATE TRIGGER trigger_team_developers_updated_at
  BEFORE UPDATE ON team_developers
  FOR EACH ROW
  EXECUTE FUNCTION update_github_updated_at();

-- ============================================================================
-- Row Level Security
-- ============================================================================
ALTER TABLE team_developers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated read on team_developers" ON team_developers
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow service role full access on team_developers" ON team_developers
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================================
-- Table Comments
-- ============================================================================
COMMENT ON TABLE team_developers IS 'GitHub contributors designated as internal team developers for productivity tracking';
COMMENT ON COLUMN team_developers.github_login IS 'GitHub username of the team developer';
COMMENT ON COLUMN team_developers.github_id IS 'GitHub numeric ID for the user';
COMMENT ON COLUMN team_developers.display_name IS 'Optional display name for the developer';
COMMENT ON COLUMN team_developers.avatar_url IS 'GitHub avatar URL';
COMMENT ON COLUMN team_developers.user_profile_id IS 'Optional link to internal user profile';
COMMENT ON COLUMN team_developers.designated_at IS 'When this contributor was designated as a team developer';
COMMENT ON COLUMN team_developers.designated_by IS 'User who designated this contributor as a team developer';
