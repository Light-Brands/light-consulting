-- Financial Tracking Migration
-- Adds tables for tracking operating expenses: service costs and team overhead

-- ============================================================================
-- SERVICE COSTS TABLE
-- Tracks recurring service costs with per-unit pricing support
-- ============================================================================

CREATE TABLE IF NOT EXISTS service_costs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    vendor TEXT,
    category TEXT NOT NULL CHECK (category IN ('software', 'infrastructure', 'ai_tools', 'development', 'communication', 'other')),
    unit_cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
    unit_type TEXT DEFAULT 'flat', -- 'flat', 'user', 'seat', 'account', etc.
    quantity INTEGER NOT NULL DEFAULT 1,
    monthly_cost DECIMAL(10, 2) GENERATED ALWAYS AS (unit_cost * quantity) STORED,
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for service_costs
CREATE INDEX idx_service_costs_category ON service_costs(category);
CREATE INDEX idx_service_costs_is_active ON service_costs(is_active);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_service_costs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_service_costs_updated_at
    BEFORE UPDATE ON service_costs
    FOR EACH ROW
    EXECUTE FUNCTION update_service_costs_updated_at();

-- ============================================================================
-- TEAM OVERHEAD TABLE
-- Tracks team member costs (salaries, contractors, stipends)
-- ============================================================================

CREATE TABLE IF NOT EXISTS team_overhead (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    monthly_cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
    cost_type TEXT NOT NULL CHECK (cost_type IN ('salary', 'contractor', 'stipend')),
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for team_overhead
CREATE INDEX idx_team_overhead_cost_type ON team_overhead(cost_type);
CREATE INDEX idx_team_overhead_is_active ON team_overhead(is_active);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_team_overhead_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_team_overhead_updated_at
    BEFORE UPDATE ON team_overhead
    FOR EACH ROW
    EXECUTE FUNCTION update_team_overhead_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE service_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_overhead ENABLE ROW LEVEL SECURITY;

-- Policies for service_costs
CREATE POLICY "Enable full access for authenticated users"
ON service_costs FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Enable full access for service role"
ON service_costs FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- Policies for team_overhead
CREATE POLICY "Enable full access for authenticated users"
ON team_overhead FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Enable full access for service role"
ON team_overhead FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- ============================================================================
-- SAMPLE INITIAL DATA
-- ============================================================================

INSERT INTO service_costs (name, vendor, category, unit_cost, unit_type, quantity, notes) VALUES
    ('Google Workspace', 'Google', 'software', 8.00, 'user', 4, 'Business Starter plan'),
    ('Cloudflare Pro', 'Cloudflare', 'infrastructure', 25.00, 'flat', 1, 'Pro plan for primary domain'),
    ('Claude Max', 'Anthropic', 'ai_tools', 200.00, 'account', 2, 'Claude Max subscription'),
    ('Vercel Pro', 'Vercel', 'infrastructure', 20.00, 'flat', 1, 'Pro plan for deployments'),
    ('GitHub Team', 'GitHub', 'development', 4.00, 'user', 5, 'Team plan'),
    ('Supabase Pro', 'Supabase', 'infrastructure', 25.00, 'flat', 1, 'Pro plan');

-- Comments
COMMENT ON TABLE service_costs IS 'Tracks recurring service costs with per-unit pricing support';
COMMENT ON COLUMN service_costs.monthly_cost IS 'Auto-computed as unit_cost * quantity';
COMMENT ON COLUMN service_costs.unit_type IS 'Type of unit: flat, user, seat, account, etc.';

COMMENT ON TABLE team_overhead IS 'Tracks team member costs including salaries, contractors, and stipends';
COMMENT ON COLUMN team_overhead.cost_type IS 'Type of cost: salary, contractor, or stipend';
