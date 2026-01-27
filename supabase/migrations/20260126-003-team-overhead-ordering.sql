-- Add order_index to team_overhead for custom ordering
-- This allows manual reordering of team members in the financials list

ALTER TABLE team_overhead ADD COLUMN IF NOT EXISTS order_index INTEGER;

-- Set initial order_index values based on current ordering (cost_type, name)
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY cost_type, name) - 1 as new_order
  FROM team_overhead
)
UPDATE team_overhead
SET order_index = ordered.new_order
FROM ordered
WHERE team_overhead.id = ordered.id;

-- Make order_index NOT NULL after setting initial values
ALTER TABLE team_overhead ALTER COLUMN order_index SET DEFAULT 0;

-- Create index for efficient ordering queries
CREATE INDEX IF NOT EXISTS idx_team_overhead_order_index ON team_overhead(order_index);

COMMENT ON COLUMN team_overhead.order_index IS 'Custom ordering index for manual reordering of team members';
