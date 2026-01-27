-- Add start_date to team_overhead for tracking upcoming team members
-- Allows projections for future OpEx based on planned onboarding

ALTER TABLE team_overhead
ADD COLUMN IF NOT EXISTS start_date DATE;

-- Add index for querying by start date
CREATE INDEX IF NOT EXISTS idx_team_overhead_start_date ON team_overhead(start_date);

COMMENT ON COLUMN team_overhead.start_date IS 'Date when team member starts. NULL or past date = current, future date = upcoming';
