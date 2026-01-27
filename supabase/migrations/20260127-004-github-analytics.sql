-- GitHub Analytics Migration
-- Light Brand Consulting
-- Track GitHub development activity for organization repositories

-- ============================================================================
-- Table 1: github_config - Connection settings
-- ============================================================================
CREATE TABLE IF NOT EXISTS github_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token_encrypted TEXT, -- Encrypted token (store encrypted, never expose)
  org_name TEXT NOT NULL,
  token_scopes TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_validated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Only one active config at a time
CREATE UNIQUE INDEX IF NOT EXISTS idx_github_config_active ON github_config(is_active) WHERE is_active = true;

-- ============================================================================
-- Table 2: github_repositories - Cached repository metadata
-- ============================================================================
CREATE TABLE IF NOT EXISTS github_repositories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_id BIGINT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_private BOOLEAN DEFAULT false,
  is_tracked BOOLEAN DEFAULT true,
  default_branch TEXT DEFAULT 'main',
  language TEXT,
  languages_breakdown JSONB, -- { "TypeScript": 45000, "JavaScript": 12000 }
  total_lines_of_code INTEGER,
  stars_count INTEGER DEFAULT 0,
  forks_count INTEGER DEFAULT 0,
  open_issues_count INTEGER DEFAULT 0,
  created_at_github TIMESTAMPTZ NOT NULL,
  pushed_at TIMESTAMPTZ,
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_github_repositories_is_tracked ON github_repositories(is_tracked);
CREATE INDEX IF NOT EXISTS idx_github_repositories_pushed_at ON github_repositories(pushed_at DESC);
CREATE INDEX IF NOT EXISTS idx_github_repositories_language ON github_repositories(language);

-- ============================================================================
-- Table 3: github_commits - Commit history
-- ============================================================================
CREATE TABLE IF NOT EXISTS github_commits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id UUID NOT NULL REFERENCES github_repositories(id) ON DELETE CASCADE,
  sha TEXT NOT NULL,
  message TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_github_login TEXT,
  committed_at TIMESTAMPTZ NOT NULL,
  additions INTEGER DEFAULT 0,
  deletions INTEGER DEFAULT 0,
  changed_files INTEGER DEFAULT 0,
  synced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(repository_id, sha)
);

CREATE INDEX IF NOT EXISTS idx_github_commits_repository_id ON github_commits(repository_id);
CREATE INDEX IF NOT EXISTS idx_github_commits_committed_at ON github_commits(committed_at DESC);
CREATE INDEX IF NOT EXISTS idx_github_commits_author_login ON github_commits(author_github_login);
CREATE INDEX IF NOT EXISTS idx_github_commits_repository_date ON github_commits(repository_id, committed_at DESC);

-- ============================================================================
-- Table 4: github_pull_requests - PR data
-- ============================================================================
CREATE TABLE IF NOT EXISTS github_pull_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id UUID NOT NULL REFERENCES github_repositories(id) ON DELETE CASCADE,
  github_id BIGINT NOT NULL,
  number INTEGER NOT NULL,
  title TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('open', 'closed', 'merged')),
  author_github_login TEXT NOT NULL,
  created_at_github TIMESTAMPTZ NOT NULL,
  merged_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  additions INTEGER DEFAULT 0,
  deletions INTEGER DEFAULT 0,
  changed_files INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  commits_count INTEGER DEFAULT 0,
  synced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(repository_id, number)
);

CREATE INDEX IF NOT EXISTS idx_github_pull_requests_repository_id ON github_pull_requests(repository_id);
CREATE INDEX IF NOT EXISTS idx_github_pull_requests_state ON github_pull_requests(state);
CREATE INDEX IF NOT EXISTS idx_github_pull_requests_author ON github_pull_requests(author_github_login);
CREATE INDEX IF NOT EXISTS idx_github_pull_requests_created_at ON github_pull_requests(created_at_github DESC);

-- ============================================================================
-- Table 5: github_contributors - Aggregated contributor stats per repo
-- ============================================================================
CREATE TABLE IF NOT EXISTS github_contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id UUID NOT NULL REFERENCES github_repositories(id) ON DELETE CASCADE,
  github_login TEXT NOT NULL,
  github_id BIGINT NOT NULL,
  avatar_url TEXT,
  total_commits INTEGER DEFAULT 0,
  total_additions INTEGER DEFAULT 0,
  total_deletions INTEGER DEFAULT 0,
  first_commit_at TIMESTAMPTZ,
  last_commit_at TIMESTAMPTZ,
  synced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(repository_id, github_login)
);

CREATE INDEX IF NOT EXISTS idx_github_contributors_repository_id ON github_contributors(repository_id);
CREATE INDEX IF NOT EXISTS idx_github_contributors_github_login ON github_contributors(github_login);
CREATE INDEX IF NOT EXISTS idx_github_contributors_total_commits ON github_contributors(total_commits DESC);

-- ============================================================================
-- Table 6: github_daily_stats - Pre-aggregated daily statistics
-- ============================================================================
CREATE TABLE IF NOT EXISTS github_daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id UUID NOT NULL REFERENCES github_repositories(id) ON DELETE CASCADE,
  stat_date DATE NOT NULL,
  commits_count INTEGER DEFAULT 0,
  additions INTEGER DEFAULT 0,
  deletions INTEGER DEFAULT 0,
  prs_opened INTEGER DEFAULT 0,
  prs_merged INTEGER DEFAULT 0,
  unique_contributors INTEGER DEFAULT 0,
  synced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(repository_id, stat_date)
);

CREATE INDEX IF NOT EXISTS idx_github_daily_stats_repository_id ON github_daily_stats(repository_id);
CREATE INDEX IF NOT EXISTS idx_github_daily_stats_stat_date ON github_daily_stats(stat_date DESC);
CREATE INDEX IF NOT EXISTS idx_github_daily_stats_repository_date ON github_daily_stats(repository_id, stat_date DESC);

-- ============================================================================
-- Table 7: github_sync_log - Sync audit trail
-- ============================================================================
CREATE TABLE IF NOT EXISTS github_sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_type TEXT NOT NULL CHECK (sync_type IN ('full', 'incremental', 'repositories', 'commits', 'pull_requests', 'contributors')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  repositories_synced INTEGER DEFAULT 0,
  commits_synced INTEGER DEFAULT 0,
  prs_synced INTEGER DEFAULT 0,
  contributors_synced INTEGER DEFAULT 0,
  rate_limit_remaining INTEGER,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_github_sync_log_status ON github_sync_log(status);
CREATE INDEX IF NOT EXISTS idx_github_sync_log_started_at ON github_sync_log(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_github_sync_log_sync_type ON github_sync_log(sync_type);

-- ============================================================================
-- Updated At Triggers
-- ============================================================================
CREATE OR REPLACE FUNCTION update_github_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_github_config_updated_at ON github_config;
CREATE TRIGGER trigger_github_config_updated_at
  BEFORE UPDATE ON github_config
  FOR EACH ROW
  EXECUTE FUNCTION update_github_updated_at();

DROP TRIGGER IF EXISTS trigger_github_repositories_updated_at ON github_repositories;
CREATE TRIGGER trigger_github_repositories_updated_at
  BEFORE UPDATE ON github_repositories
  FOR EACH ROW
  EXECUTE FUNCTION update_github_updated_at();

DROP TRIGGER IF EXISTS trigger_github_pull_requests_updated_at ON github_pull_requests;
CREATE TRIGGER trigger_github_pull_requests_updated_at
  BEFORE UPDATE ON github_pull_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_github_updated_at();

DROP TRIGGER IF EXISTS trigger_github_contributors_updated_at ON github_contributors;
CREATE TRIGGER trigger_github_contributors_updated_at
  BEFORE UPDATE ON github_contributors
  FOR EACH ROW
  EXECUTE FUNCTION update_github_updated_at();

-- ============================================================================
-- Row Level Security
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE github_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_commits ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_pull_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_contributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_sync_log ENABLE ROW LEVEL SECURITY;

-- github_config - Restricted access (config contains sensitive data hints)
CREATE POLICY "Allow authenticated read on github_config" ON github_config
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow service role full access on github_config" ON github_config
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- github_repositories - Read access for authenticated users
CREATE POLICY "Allow authenticated read on github_repositories" ON github_repositories
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow service role full access on github_repositories" ON github_repositories
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- github_commits - Read access for authenticated users
CREATE POLICY "Allow authenticated read on github_commits" ON github_commits
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow service role full access on github_commits" ON github_commits
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- github_pull_requests - Read access for authenticated users
CREATE POLICY "Allow authenticated read on github_pull_requests" ON github_pull_requests
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow service role full access on github_pull_requests" ON github_pull_requests
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- github_contributors - Read access for authenticated users
CREATE POLICY "Allow authenticated read on github_contributors" ON github_contributors
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow service role full access on github_contributors" ON github_contributors
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- github_daily_stats - Read access for authenticated users
CREATE POLICY "Allow authenticated read on github_daily_stats" ON github_daily_stats
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow service role full access on github_daily_stats" ON github_daily_stats
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- github_sync_log - Read access for authenticated users
CREATE POLICY "Allow authenticated read on github_sync_log" ON github_sync_log
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow service role full access on github_sync_log" ON github_sync_log
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================================
-- Table Comments
-- ============================================================================
COMMENT ON TABLE github_config IS 'GitHub API configuration and connection settings';
COMMENT ON TABLE github_repositories IS 'Cached GitHub repository metadata for the organization';
COMMENT ON TABLE github_commits IS 'Commit history synced from GitHub repositories';
COMMENT ON TABLE github_pull_requests IS 'Pull request data from GitHub repositories';
COMMENT ON TABLE github_contributors IS 'Aggregated contributor statistics per repository';
COMMENT ON TABLE github_daily_stats IS 'Pre-aggregated daily statistics for charts and dashboards';
COMMENT ON TABLE github_sync_log IS 'Audit log for GitHub sync operations';

COMMENT ON COLUMN github_config.access_token_encrypted IS 'Encrypted GitHub PAT - never expose to client';
COMMENT ON COLUMN github_config.token_scopes IS 'Array of OAuth scopes the token has';
COMMENT ON COLUMN github_repositories.languages_breakdown IS 'JSON object with language: bytes mapping';
COMMENT ON COLUMN github_repositories.is_tracked IS 'Whether to include this repo in analytics';
COMMENT ON COLUMN github_commits.additions IS 'Lines added in this commit';
COMMENT ON COLUMN github_commits.deletions IS 'Lines removed in this commit';
COMMENT ON COLUMN github_pull_requests.state IS 'PR state: open, closed, or merged';
COMMENT ON COLUMN github_sync_log.sync_type IS 'Type of sync: full, incremental, or specific entity';
