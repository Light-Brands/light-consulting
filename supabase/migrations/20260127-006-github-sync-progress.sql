-- Add progress tracking columns to github_sync_log
ALTER TABLE github_sync_log
ADD COLUMN IF NOT EXISTS progress_message TEXT,
ADD COLUMN IF NOT EXISTS current_repo TEXT,
ADD COLUMN IF NOT EXISTS total_repos INTEGER,
ADD COLUMN IF NOT EXISTS current_repo_index INTEGER;

COMMENT ON COLUMN github_sync_log.progress_message IS 'Current sync progress message';
COMMENT ON COLUMN github_sync_log.current_repo IS 'Repository currently being synced';
COMMENT ON COLUMN github_sync_log.total_repos IS 'Total number of repositories to sync';
COMMENT ON COLUMN github_sync_log.current_repo_index IS 'Current repository index (1-based)';
