-- Fixed Costs Migration
-- Light Brand Consulting
-- Track fixed-term expenses like marketing campaigns, loans, and other commitments

-- Fixed costs table
CREATE TABLE IF NOT EXISTS fixed_costs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'marketing' CHECK (category IN ('marketing', 'loan', 'equipment', 'legal', 'insurance', 'other')),
  total_amount DECIMAL(10,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  -- Computed monthly cost based on duration
  monthly_amount DECIMAL(10,2) GENERATED ALWAYS AS (
    CASE
      WHEN end_date > start_date THEN
        total_amount / GREATEST(1, (
          (EXTRACT(YEAR FROM end_date) - EXTRACT(YEAR FROM start_date)) * 12 +
          (EXTRACT(MONTH FROM end_date) - EXTRACT(MONTH FROM start_date)) + 1
        ))
      ELSE total_amount
    END
  ) STORED,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Ensure end_date is after start_date
  CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_fixed_costs_category ON fixed_costs(category);
CREATE INDEX IF NOT EXISTS idx_fixed_costs_is_active ON fixed_costs(is_active);
CREATE INDEX IF NOT EXISTS idx_fixed_costs_dates ON fixed_costs(start_date, end_date);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_fixed_costs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_fixed_costs_updated_at ON fixed_costs;
CREATE TRIGGER trigger_fixed_costs_updated_at
  BEFORE UPDATE ON fixed_costs
  FOR EACH ROW
  EXECUTE FUNCTION update_fixed_costs_updated_at();

-- Enable RLS
ALTER TABLE fixed_costs ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin access only
CREATE POLICY "Allow authenticated read on fixed_costs" ON fixed_costs
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on fixed_costs" ON fixed_costs
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update on fixed_costs" ON fixed_costs
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on fixed_costs" ON fixed_costs
  FOR DELETE TO authenticated USING (true);

-- Service role policies
CREATE POLICY "Allow service role full access on fixed_costs" ON fixed_costs
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Comments
COMMENT ON TABLE fixed_costs IS 'Fixed-term expenses like marketing campaigns, loans, equipment purchases';
COMMENT ON COLUMN fixed_costs.category IS 'Type: marketing, loan, equipment, legal, insurance, other';
COMMENT ON COLUMN fixed_costs.total_amount IS 'Total cost of the commitment';
COMMENT ON COLUMN fixed_costs.monthly_amount IS 'Auto-calculated: total_amount / months in range';
COMMENT ON COLUMN fixed_costs.start_date IS 'When the cost period begins';
COMMENT ON COLUMN fixed_costs.end_date IS 'When the cost period ends';
