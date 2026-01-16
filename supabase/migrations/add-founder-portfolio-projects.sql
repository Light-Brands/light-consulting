-- ============================================================================
-- Add Founder Portfolio Projects
-- Light Brand Consulting
--
-- This migration adds 7 founder portfolio projects showcasing strategic
-- consulting, business development, fundraising, and M&A advisory work.
-- ============================================================================

INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order)
VALUES
  (
    'GVG Enterprises',
    'Strategic business development and growth consulting for medical, wellness, and technology companies. Delivered global expansion strategy, market penetration planning, and scalable business architecture for international growth.',
    '/images/portfolio/gvg-enterprises.jpg',
    ARRAY['Business Development', 'Growth Strategy', 'International Expansion', 'Medical', 'Wellness'],
    'https://www.gvgenterprises.com',
    'GVG Enterprises',
    'Business Development / Consulting',
    false,
    'published',
    51
  ),
  (
    'IDEAL Protein',
    'Executive leadership and strategic business development for a global medical weight-loss and metabolic health company. Provided organizational leadership, international operations management, and strategic initiatives that contributed to significant company valuation growth.',
    '/images/portfolio/ideal-protein.jpg',
    ARRAY['Healthcare', 'Weight Loss', 'International Operations', 'Strategic Leadership', 'Business Development'],
    'https://www.idealprotein.com',
    'IDEAL Protein',
    'Healthcare / Medical Weight Loss',
    true,
    'published',
    52
  ),
  (
    'PandaPay',
    'Co-founded and scaled a Canadian merchant services provider offering Interac and credit card payment processing nationwide. Built infrastructure, merchant acquisition strategies, and portfolio management leading to a successful multi-8-digit exit.',
    '/images/portfolio/pandapay.jpg',
    ARRAY['FinTech', 'Payment Processing', 'Merchant Services', 'Portfolio Management', 'Exit Strategy'],
    'https://www.pandapay.ca',
    'PandaPay',
    'FinTech / Payment Processing',
    true,
    'published',
    53
  ),
  (
    '9mm Beyond Energy',
    'Strategic advisory and fundraising leadership for a performance-driven functional energy supplement company. Built complete corporate infrastructure and executed long-term growth strategy with successful capital raise.',
    '/images/portfolio/9mm-beyond-energy.jpg',
    ARRAY['Supplements', 'Fundraising', 'Corporate Structure', 'Growth Strategy', 'Capital Raise'],
    'https://www.9mmbeyondenergy.com',
    '9mm Beyond Energy',
    'Consumer Products / Supplements',
    false,
    'published',
    54
  ),
  (
    'Dimes Energy',
    'Investment strategy consulting for an energy exploration and drilling company. Developed capital expansion strategies, supported fundraising efforts, and provided corporate structure and investor positioning guidance.',
    '/images/portfolio/dimes-energy.jpg',
    ARRAY['Energy', 'Investment Strategy', 'Capital Expansion', 'Drilling Operations', 'Investor Relations'],
    'https://www.dimesenergy.com',
    'Dimes Energy',
    'Energy / Oil & Gas',
    false,
    'published',
    55
  ),
  (
    'Quantum Energy',
    'Investment strategy consulting for an energy-focused company pursuing innovative technologies and capital expansion initiatives. Provided strategic investor introductions and early-stage structuring for future growth rounds.',
    '/images/portfolio/quantum-energy.jpg',
    ARRAY['Energy', 'Investment Strategy', 'Investor Relations', 'Capital Raising', 'Early Stage'],
    'https://www.quantumenergy.com',
    'Quantum Energy',
    'Energy / Technology',
    false,
    'published',
    56
  ),
  (
    'Creative TRND + SEO TWIST',
    'M&A advisory and capital raise support for a strategic merger between two digital marketing and SEO agencies. Facilitated the merger process, secured growth capital, and advised on organizational integration and scaling strategy.',
    '/images/portfolio/creative-trnd-seo-twist.jpg',
    ARRAY['M&A', 'Digital Marketing', 'SEO', 'Capital Raise', 'Agency Consolidation'],
    'https://www.creativetrnd.com',
    'Creative TRND / SEO TWIST',
    'Digital Marketing / SEO',
    false,
    'published',
    57
  )
ON CONFLICT DO NOTHING;
