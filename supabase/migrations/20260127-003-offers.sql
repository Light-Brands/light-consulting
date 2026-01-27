-- Offers Migration
-- Light Brand Consulting
-- Track service offers and offer ladder progression

-- Offers table
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  tier INTEGER NOT NULL DEFAULT 1, -- Order in the offer ladder (1 = entry, higher = premium)
  tier_label TEXT, -- e.g., "Entry", "Core", "Premium", "Elite"
  target_audience TEXT,
  qualifying_criteria TEXT, -- What qualifies someone for this offer
  price_range TEXT, -- e.g., "$500-$1,500", "Custom"
  deliverables TEXT[], -- Array of what's included
  funnel_route TEXT, -- Link to associated funnel page
  is_active BOOLEAN DEFAULT true,
  is_invite_only BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_offers_tier ON offers(tier);
CREATE INDEX IF NOT EXISTS idx_offers_is_active ON offers(is_active);
CREATE INDEX IF NOT EXISTS idx_offers_sort_order ON offers(sort_order);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_offers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_offers_updated_at ON offers;
CREATE TRIGGER trigger_offers_updated_at
  BEFORE UPDATE ON offers
  FOR EACH ROW
  EXECUTE FUNCTION update_offers_updated_at();

-- Enable RLS
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow authenticated read on offers" ON offers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on offers" ON offers
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update on offers" ON offers
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on offers" ON offers
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow service role full access on offers" ON offers
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Seed initial offers (the offer ladder)
INSERT INTO offers (name, slug, description, tier, tier_label, target_audience, qualifying_criteria, is_invite_only, sort_order) VALUES
  ('AI Readiness Diagnostic', 'ai-readiness-diagnostic', 'Discover how prepared your business really is for the AI decade. The starting point for all clients.', 1, 'Entry', 'Business owners evaluating AI readiness', 'Anyone interested in AI transformation', false, 1),
  ('AI Informed System', 'ai-informed-system', 'Build the foundational AI intelligence system for your business.', 2, 'Core', 'Businesses ready to implement AI', 'Completed AI Readiness Diagnostic', false, 2),
  ('AI Acceleration Blueprint', 'ai-acceleration-blueprint', 'Accelerate your AI transformation with a comprehensive strategic blueprint.', 3, 'Premium', 'Businesses with aligned values ready to scale', 'Demonstrated value alignment and commitment', false, 3),
  ('AI Super Intelligence System', 'ai-super-intelligence-system', 'The ultimate AI transformation for elite partners.', 4, 'Elite', 'Invite-only elite partners', 'By invitation only', true, 4)
ON CONFLICT (slug) DO NOTHING;

-- Comments
COMMENT ON TABLE offers IS 'Service offers and offer ladder progression';
COMMENT ON COLUMN offers.tier IS 'Position in offer ladder (1 = entry level)';
COMMENT ON COLUMN offers.tier_label IS 'Display label for the tier';
COMMENT ON COLUMN offers.qualifying_criteria IS 'What qualifies a prospect for this offer';
COMMENT ON COLUMN offers.is_invite_only IS 'Whether this offer requires an invitation';
