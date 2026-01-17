-- ============================================================================
-- Migration: Complete Project Data Update
-- Light Brand Consulting
-- ============================================================================
-- This migration:
-- 1. Updates all project overview data (challenge, solution, results)
-- 2. Adds missing enhanced fields (brand_id, services, key_features, etc.)
-- 3. Fixes missing images with a branded placeholder
-- 4. Adds any new projects not yet in the database
-- ============================================================================

-- ============================================================================
-- SECTION 1: Fix Missing Images with Placeholder
-- These projects reference images that don't exist yet.
-- Using branded placeholder until proper images are added.
-- ============================================================================

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'Aesthetics Gym' AND (image_url = '/images/portfolio/aesthetics-gym.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'GVG Enterprises' AND (image_url = '/images/portfolio/gvg-enterprises.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'IDEAL Protein' AND (image_url = '/images/portfolio/ideal-protein.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'PandaPay' AND (image_url = '/images/portfolio/pandapay.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = '9mm Beyond Energy' AND (image_url = '/images/portfolio/9mm-beyond-energy.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'Dimes Energy' AND (image_url = '/images/portfolio/dimes-energy.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'Quantum Energy' AND (image_url = '/images/portfolio/quantum-energy.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'Creative TRND + SEO TWIST' AND (image_url = '/images/portfolio/creative-trnd-seo-twist.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'Ottawa International Jazz Festival' AND (image_url = '/images/portfolio/ottawa-jazz-festival.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'World Vision — 30-Hour Famine' AND (image_url = '/images/portfolio/world-vision-famine.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'New Renaissance' AND (image_url = '/images/portfolio/new-renaissance.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'Carlington Booch' AND (image_url = '/images/portfolio/carlington-booch.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'Ashes to Rubies' AND (image_url = '/images/portfolio/ashes-to-rubies.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'Shifter Magazine' AND (image_url = '/images/portfolio/shifter-magazine.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'TALK' AND (image_url = '/images/portfolio/talk-artist.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'Shaneen Megji' AND (image_url = '/images/portfolio/shaneen-megji.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'Performance Window Cleaning' AND (image_url = '/images/portfolio/performance-window-cleaning.jpg' OR image_url IS NULL);

UPDATE projects SET image_url = '/images/portfolio/light-brand-consulting.jpg'
WHERE title = 'We Scale It' AND (image_url = '/images/portfolio/we-scale-it.jpg' OR image_url IS NULL);

-- ============================================================================
-- SECTION 2: Complete Data for Founder Portfolio Projects (IDs 51-57)
-- Adding challenge, solution, results, and enhanced fields
-- ============================================================================

-- GVG Enterprises
UPDATE projects SET
  challenge = 'Supporting medical and wellness companies in achieving sustainable international growth while maintaining operational excellence.',
  solution = 'Developed comprehensive business development strategies including global expansion planning, distribution network creation, and scalable business architecture for long-term success.',
  results = ARRAY['Led global expansion opening 17 international distributors (2011-2015)', 'Supported 500+ medical clinics implementing protocols', 'Oversaw distribution of 1M+ protein product boxes annually', 'Built scalable strategies for long-term market penetration'],
  origin = 'US',
  project_type = 'Business Development Consulting',
  brand_id = 'creative-professional',
  services = ARRAY['Business Development Strategy', 'International Expansion', 'Market Penetration Planning', 'Scalable Business Architecture'],
  key_features = ARRAY['Global expansion planning', 'Medical clinic partnerships', 'Distribution network development', 'Long-term market strategy'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Business consulting"}'::jsonb,
  preview_enabled = false
WHERE title = 'GVG Enterprises';

-- IDEAL Protein
UPDATE projects SET
  challenge = 'Scaling a medical weight-loss company across international markets while maintaining clinical excellence and driving company valuation.',
  solution = 'Provided executive leadership managing 250 employees across Canada and the U.S., overseeing operations in 19 countries, and developing strategic initiatives that significantly increased company valuation.',
  results = ARRAY['Led and managed 250 employees across Canada and U.S.', 'Oversaw international operations across 19 countries', 'Supported 4,000+ medical partner clinics worldwide', 'Contributed to $377M investment deal (65% stake, $580M valuation)', 'Supported initiatives elevating valuation to $880M USD in 2017'],
  origin = 'US',
  project_type = 'Executive Leadership / Healthcare',
  brand_id = 'healthcare-wellness',
  services = ARRAY['Executive Leadership', 'International Operations', 'Strategic Business Development', 'Valuation Growth Initiatives'],
  key_features = ARRAY['Multi-country operations management', 'Medical partner network expansion', 'Investment deal support', 'Strategic growth initiatives'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Enterprise operations"}'::jsonb,
  preview_enabled = false
WHERE title = 'IDEAL Protein';

-- PandaPay
UPDATE projects SET
  challenge = 'Building a competitive merchant services company in the Canadian market and scaling to a portfolio size that would attract acquisition interest.',
  solution = 'Co-founded and built PandaPay from the ground up, developing national infrastructure for payment processing, implementing merchant acquisition strategies, and managing portfolio growth.',
  results = ARRAY['Built portfolio of 8,000 merchants across Canada', 'Developed national payment processing infrastructure', 'Completed multi-8-digit portfolio exit in 2024', 'Established nationwide merchant services presence'],
  origin = 'CA',
  project_type = 'FinTech Company Building',
  brand_id = 'ai-technology',
  services = ARRAY['Company Building', 'Merchant Acquisition', 'Payment Infrastructure', 'Portfolio Management', 'Exit Strategy'],
  key_features = ARRAY['National payment processing', 'Interac integration', 'Credit card processing', 'Merchant portfolio development'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Payment systems", "backend": "Financial infrastructure"}'::jsonb,
  preview_enabled = false
WHERE title = 'PandaPay';

-- 9mm Beyond Energy
UPDATE projects SET
  challenge = 'Launching a new energy supplement brand with proper corporate foundation and sufficient capital for market entry and growth.',
  solution = 'Provided strategic advisory services including complete legal, financial, and corporate structure development while leading fundraising efforts and designing long-term expansion strategy.',
  results = ARRAY['Raised $1.7M USD in investment capital', 'Built complete legal and financial structure', 'Designed corporate architecture', 'Executed long-term growth and expansion strategy'],
  origin = 'US',
  project_type = 'Strategic Advisory / Fundraising',
  brand_id = 'healthcare-wellness',
  services = ARRAY['Strategic Advisory', 'Fundraising', 'Corporate Structure Development', 'Growth Strategy'],
  key_features = ARRAY['Investment capital raising', 'Legal structure development', 'Financial architecture', 'Expansion strategy'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Strategic consulting"}'::jsonb,
  preview_enabled = false
WHERE title = '9mm Beyond Energy';

-- Dimes Energy
UPDATE projects SET
  challenge = 'Securing significant capital investment to fund energy exploration and drilling operations while positioning the company for long-term growth.',
  solution = 'Developed comprehensive investment strategy for capital expansion, supported investor relations, and provided guidance on corporate structure and long-term financial planning.',
  results = ARRAY['Helped raise $10M USD for drilling operations', 'Developed capital expansion strategy', 'Supported corporate structure development', 'Enhanced investor positioning and relations'],
  origin = 'US',
  project_type = 'Investment Strategy Consulting',
  brand_id = 'real-estate-energy',
  services = ARRAY['Investment Strategy', 'Capital Expansion', 'Investor Relations', 'Corporate Structure'],
  key_features = ARRAY['Drilling operations funding', 'Investor positioning', 'Financial planning', 'Corporate structure advisory'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Investment consulting"}'::jsonb,
  preview_enabled = false
WHERE title = 'Dimes Energy';

-- Quantum Energy
UPDATE projects SET
  challenge = 'Positioning an emerging energy technology company for capital expansion while building strategic investor relationships.',
  solution = 'Advised on investment strategy and capital positioning, introduced strategic investors, facilitated investor relations, and supported early-stage structuring to prepare for future growth rounds.',
  results = ARRAY['Helped raise $300K USD in private investment', 'Introduced strategic investors', 'Facilitated investor relations', 'Prepared company for future growth rounds'],
  origin = 'US',
  project_type = 'Investment Strategy Consulting',
  brand_id = 'real-estate-energy',
  services = ARRAY['Investment Strategy', 'Investor Relations', 'Strategic Introductions', 'Early-Stage Structuring'],
  key_features = ARRAY['Capital positioning', 'Investor introductions', 'Growth round preparation', 'Strategic investment advisory'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Investment consulting"}'::jsonb,
  preview_enabled = false
WHERE title = 'Quantum Energy';

-- Creative TRND + SEO TWIST
UPDATE projects SET
  challenge = 'Successfully merging two complementary digital agencies while securing capital for post-merger growth and ensuring smooth organizational integration.',
  solution = 'Facilitated the strategic merger between Creative TRND and SEO TWIST, secured post-merger growth capital, and advised on corporate architecture, organizational integration, and scaling strategy.',
  results = ARRAY['Facilitated successful merger between agencies', 'Helped secure $1.6M in post-merger capital', 'Advised on organizational integration', 'Developed corporate architecture and scaling strategy'],
  origin = 'US',
  project_type = 'M&A Advisory / Capital Raise',
  brand_id = 'creative-professional',
  services = ARRAY['M&A Advisory', 'Capital Raise', 'Organizational Integration', 'Scaling Strategy'],
  key_features = ARRAY['Merger facilitation', 'Post-merger capital raise', 'Corporate architecture', 'Integration planning'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "M&A consulting"}'::jsonb,
  preview_enabled = false
WHERE title = 'Creative TRND + SEO TWIST';

-- ============================================================================
-- SECTION 3: Complete Data for Partner Portfolio Projects (IDs 58-67)
-- Adding challenge, solution, results, and enhanced fields
-- ============================================================================

-- Ottawa International Jazz Festival
UPDATE projects SET
  challenge = 'Raising substantial funds to support one of Canada''s premier cultural festivals while building long-term donor relationships.',
  solution = 'Developed and executed strategic fundraising campaigns with comprehensive donor engagement strategies, sponsorship acquisition, and community outreach.',
  results = ARRAY['Raised millions of dollars in funding', 'Established sustainable donor relationships', 'Supported festival growth and programming', 'Enhanced community engagement'],
  origin = 'CA',
  project_type = 'Nonprofit Fundraising',
  brand_id = 'community-social',
  services = ARRAY['Fundraising Strategy', 'Donor Engagement', 'Campaign Management'],
  key_features = ARRAY['Multi-million dollar fundraising', 'Donor cultivation', 'Event sponsorship', 'Cultural programming support'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Nonprofit consulting"}'::jsonb,
  preview_enabled = false
WHERE title = 'Ottawa International Jazz Festival';

-- World Vision — 30-Hour Famine
UPDATE projects SET
  challenge = 'Leading national fundraising campaigns while engaging and mobilizing youth leaders across Canada for humanitarian causes.',
  solution = 'Managed the funding component of the 30-Hour Famine campaign, developing youth leadership programs and coordinating nationwide fundraising efforts.',
  results = ARRAY['Raised hundreds of thousands of dollars', 'Mobilized youth leaders across Canada', 'Built sustainable youth engagement programs', 'Supported global humanitarian initiatives'],
  origin = 'CA',
  project_type = 'Nonprofit Campaign Leadership',
  brand_id = 'community-social',
  services = ARRAY['National Campaign Leadership', 'Youth Mobilization', 'Fundraising Management'],
  key_features = ARRAY['National campaign coordination', 'Youth leader development', 'Large-scale fundraising', 'Community mobilization'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Nonprofit consulting"}'::jsonb,
  preview_enabled = false
WHERE title = 'World Vision — 30-Hour Famine';

-- New Renaissance
UPDATE projects SET
  challenge = 'Building a grassroots movement from scratch that supports young adults in entrepreneurship, creativity, leadership, and faith reconnection.',
  solution = 'Founded and directed a nonprofit movement for 8 years, creating weekly programming, leadership development systems, and expansion strategies across Canada.',
  results = ARRAY['Built community of 250+ young adults meeting weekly', 'Operated successfully for 8 years', 'Expanded movement across Canada', 'Helped reconnect a generation to faith, identity, and purpose'],
  origin = 'CA',
  project_type = 'Nonprofit Movement Building',
  brand_id = 'community-social',
  services = ARRAY['Movement Building', 'Leadership Development', 'Community Organizing', 'Program Development'],
  key_features = ARRAY['250+ weekly participants', '8-year sustained operation', 'Cross-Canada expansion', 'Entrepreneurship support'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Nonprofit leadership"}'::jsonb,
  preview_enabled = false
WHERE title = 'New Renaissance';

-- Carlington Booch
UPDATE projects SET
  challenge = 'Building a sustainable social enterprise that generates revenue while supporting addiction recovery programs.',
  solution = 'Developed a complete kombucha brand and e-commerce business foundation with a social enterprise model directing all revenue to addiction recovery.',
  results = ARRAY['Built mission-driven brand from scratch', 'Established e-commerce foundation', '100% revenue supports addiction recovery', 'Created sustainable social enterprise model'],
  origin = 'CA',
  project_type = 'Social Enterprise Development',
  brand_id = 'community-social',
  services = ARRAY['Brand Development', 'E-commerce Build', 'Business Foundation', 'Social Enterprise Strategy'],
  key_features = ARRAY['Mission-driven brand', '100% revenue to recovery programs', 'E-commerce platform', 'Social impact model'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "E-commerce platform", "backend": "Business systems"}'::jsonb,
  preview_enabled = false
WHERE title = 'Carlington Booch';

-- Ashes to Rubies
UPDATE projects SET
  challenge = 'Creating an effective addiction recovery program that addresses the whole person and supports successful reintegration into society.',
  solution = 'Developed LifeLab, a comprehensive addiction recovery and reintegration program with curriculum focused on dignity and identity transformation.',
  results = ARRAY['Helped hundreds overcome addiction', 'Built sustainable recovery program', 'Created reintegration pathways', 'Established dignity-centered approach'],
  origin = 'CA',
  project_type = 'Addiction Recovery Program',
  brand_id = 'healthcare-wellness',
  services = ARRAY['Program Development', 'Curriculum Design', 'Recovery Framework', 'Reintegration Strategy'],
  key_features = ARRAY['LifeLab recovery program', 'Dignity-centered approach', 'Identity transformation', 'Reintegration support'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Program development"}'::jsonb,
  preview_enabled = false
WHERE title = 'Ashes to Rubies';

-- Shifter Magazine
UPDATE projects SET
  challenge = 'Building a cultural media platform that elevates creatives while achieving sustainable business growth and eventual exit.',
  solution = 'Co-founded and scaled Shifter Magazine, covering major cultural events, developing editorial excellence, and building a platform that launched countless creative careers.',
  results = ARRAY['Built and scaled magazine from ground up', 'Covered Juno Awards, Film Festivals, Academy Awards', 'Launched countless creative careers', 'Successfully exited; magazine continues operating'],
  origin = 'CA',
  project_type = 'Media Platform / Startup Exit',
  brand_id = 'creative-professional',
  services = ARRAY['Media Platform Development', 'Editorial Leadership', 'Brand Building', 'Creative Talent Development'],
  key_features = ARRAY['Major event coverage', 'Artist platform', 'Editorial excellence', 'Successful exit'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Media platform", "backend": "Publishing systems"}'::jsonb,
  preview_enabled = false
WHERE title = 'Shifter Magazine';

-- TALK
UPDATE projects SET
  challenge = 'Supporting an emerging artist through rapid growth while maintaining authentic brand identity and creative vision.',
  solution = 'Provided strategic brand and creative guidance during the artist''s rapid ascent, focusing on positioning, brand development, and sustainable growth.',
  results = ARRAY['Supported Juno Award-winning artist', 'Guided brand through rapid growth', 'Artist now sells out stadiums internationally', 'Built sustainable creative brand'],
  origin = 'CA',
  project_type = 'Artist Brand Development',
  brand_id = 'creative-professional',
  services = ARRAY['Brand Strategy', 'Creative Direction', 'Artist Positioning', 'Growth Strategy'],
  key_features = ARRAY['Juno Award winner', 'International stadium tours', 'Brand development', 'Rapid growth support'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Artist consulting"}'::jsonb,
  preview_enabled = false
WHERE title = 'TALK';

-- Shaneen Megji
UPDATE projects SET
  challenge = 'Building a personal brand and coaching business from scratch with a compelling flagship offer and clear market positioning.',
  solution = 'Developed complete personal brand identity, created flagship coaching offer, and implemented positioning strategy for successful business launch.',
  results = ARRAY['Built personal brand from ground up', 'Launched flagship coaching offer', 'Established coaching business', 'Created sustainable growth foundation'],
  origin = 'CA',
  project_type = 'Personal Brand Development',
  brand_id = 'creative-professional',
  services = ARRAY['Personal Brand Development', 'Offer Creation', 'Business Launch', 'Positioning Strategy'],
  key_features = ARRAY['Complete brand build', 'Flagship offer development', 'Coaching business launch', 'Sustainable growth strategy'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Brand consulting"}'::jsonb,
  preview_enabled = false
WHERE title = 'Shaneen Megji';

-- Performance Window Cleaning
UPDATE projects SET
  challenge = 'Building a service business from scratch with a young founder while developing scalable systems for significant revenue growth.',
  solution = 'Developed comprehensive brand, business systems, and growth strategy working closely with the 21-year-old founder to scale the company.',
  results = ARRAY['Built business from ground up', 'Scaled to ~$3M/year revenue', 'Developed scalable systems', 'Mentored young founder to success'],
  origin = 'CA',
  project_type = 'Business Development / Scaling',
  brand_id = 'creative-professional',
  services = ARRAY['Business Development', 'Brand Building', 'Growth Strategy', 'Systems Development'],
  key_features = ARRAY['Ground-up business build', 'Young founder mentorship', '$3M annual revenue', 'Scalable systems'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Business consulting"}'::jsonb,
  preview_enabled = false
WHERE title = 'Performance Window Cleaning';

-- We Scale It
UPDATE projects SET
  challenge = 'Redesigning a business model to achieve significant monthly revenue while serving the French-Canadian business market.',
  solution = 'Partnered with CEO to completely redesign the business model, develop new revenue strategies, and position the company for the French-owned business market.',
  results = ARRAY['Redesigned entire business model', 'Generating ~$50K/month', 'Established French market presence', 'Built scalable growth solutions'],
  origin = 'CA',
  project_type = 'Business Model Transformation',
  brand_id = 'creative-professional',
  services = ARRAY['Business Model Redesign', 'Revenue Strategy', 'Market Positioning', 'Growth Consulting'],
  key_features = ARRAY['Complete business model redesign', '$50K/month revenue', 'French market focus', 'Scalable solutions'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Not applicable", "backend": "Business consulting"}'::jsonb,
  preview_enabled = false
WHERE title = 'We Scale It';

-- ============================================================================
-- SECTION 4: Update Enhanced Fields for Existing Portfolio Projects
-- Adding brand_id, services, key_features, gallery_images, tech_stack
-- ============================================================================

-- Light Brand Consulting
UPDATE projects SET
  brand_id = 'ai-technology',
  services = ARRAY['AI Diagnostics', 'Business-Specific AI Engines', 'Founder Leverage Systems'],
  key_features = ARRAY['AI Readiness Assessment', 'Newsletter integration', 'Testimonials section', 'Efficiency metrics dashboard'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Light Brand Consulting' AND brand_id IS NULL;

-- Iboga Life
UPDATE projects SET
  brand_id = 'healthcare-wellness',
  services = ARRAY['Healing sessions', 'Retreats'],
  key_features = ARRAY['Practitioner bio', 'Session information', 'Retreat booking', 'Educational resources'],
  gallery_images = ARRAY['/images/portfolio/iboga-life.jpg', '/images/portfolio/iboga-life-2.jpg', '/images/portfolio/iboga-life-3.jpg'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Iboga Life' AND brand_id IS NULL;

-- NeuroTracker X
UPDATE projects SET
  brand_id = 'healthcare-wellness',
  services = ARRAY['Cognitive training subscriptions'],
  key_features = ARRAY['ELITE Edition demo', 'CLINICAL Edition demo', 'HUMAN Edition demo', 'Performance tracking'],
  gallery_images = ARRAY['/images/portfolio/neurotracker-x.jpg', '/images/portfolio/neurotracker-x-2.jpg', '/images/portfolio/neurotracker-x-3.jpg'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'NeuroTracker X' AND brand_id IS NULL;

-- Light Field Institute
UPDATE projects SET
  brand_id = 'healthcare-wellness',
  services = ARRAY['Aura readings', 'Energy sessions', 'Courses'],
  key_features = ARRAY['Session packages', 'Weekly field notes', 'Practice section', 'Education section', 'Course enrollment'],
  gallery_images = ARRAY['/images/portfolio/light-field-institute.jpg', '/images/portfolio/light-field-institute-2.jpg', '/images/portfolio/light-field-institute-3.jpg'],
  tech_stack = '{"frontend": "Custom (React)", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Light Field Institute' AND brand_id IS NULL;

-- Mindflow Vision
UPDATE projects SET
  brand_id = 'ai-technology',
  services = ARRAY['Technical documentation', 'Whitepaper design'],
  key_features = ARRAY['Whitepaper content', 'Technical specifications', 'Vision presentation', 'Clean documentation'],
  gallery_images = ARRAY['/images/portfolio/mindflow-vision.jpg', '/images/portfolio/mindflow-vision-2.jpg', '/images/portfolio/mindflow-vision-3.jpg'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Mindflow Vision' AND brand_id IS NULL;

-- The Planetary Party
UPDATE projects SET
  brand_id = 'community-social',
  services = ARRAY['Protocols', 'Tools', 'Flow Funds', 'Guilds'],
  key_features = ARRAY['Bioregional dashboards', 'Five-Phase Protocol', 'Node exploration', 'Guild system', 'Flow Funds management'],
  gallery_images = ARRAY['/images/portfolio/planetary-party.jpg', '/images/portfolio/planetary-party-2.jpg', '/images/portfolio/planetary-party-3.jpg'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'The Planetary Party' AND brand_id IS NULL;

-- Love Token
UPDATE projects SET
  brand_id = 'community-social',
  services = ARRAY['Guided meditations', 'Subscriptions', 'Credit redemption'],
  key_features = ARRAY['Meditation tracking', 'Credit circulation metrics', 'Impact stories', 'Love token economy'],
  gallery_images = ARRAY['/images/portfolio/love-token.jpg', '/images/portfolio/love-token-2.jpg', '/images/portfolio/love-token-3.jpg'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Love Token' AND brand_id IS NULL;

-- Lightwaves Energy
UPDATE projects SET
  brand_id = 'real-estate-energy',
  services = ARRAY['Solar consultation', 'Energy optimization'],
  key_features = ARRAY['Solar Calculator', 'Energy Optimization tools', 'Savings estimator', 'Installation guide'],
  gallery_images = ARRAY['/images/portfolio/lightwaves-energy.jpg', '/images/portfolio/lightwaves-energy-2.jpg', '/images/portfolio/lightwaves-energy-3.jpg'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Lightwaves Energy' AND brand_id IS NULL;

-- Downtown Park
UPDATE projects SET
  brand_id = 'real-estate-energy',
  services = ARRAY['Brand identity', 'Website development', '3D visualizations'],
  key_features = ARRAY['Property listings', 'Virtual tours', 'Investment information', 'Property management system'],
  gallery_images = ARRAY['/images/portfolio/downtown-park.jpg', '/images/portfolio/downtown-park-2.jpg', '/images/portfolio/downtown-park-3.jpg'],
  tech_stack = '{"frontend": "React/Custom CMS", "backend": "Property management system"}'::jsonb,
  preview_enabled = false
WHERE title = 'Downtown Park' AND brand_id IS NULL;

-- Skyzor Productions
UPDATE projects SET
  brand_id = 'creative-professional',
  services = ARRAY['Brand identity', 'Portfolio website', 'Video player integration'],
  key_features = ARRAY['Video portfolio', 'Client testimonials', 'Production services showcase', 'Streaming integration'],
  gallery_images = ARRAY['/images/portfolio/skyzor-productions.jpg', '/images/portfolio/skyzor-productions-2.jpg', '/images/portfolio/skyzor-productions-3.jpg'],
  tech_stack = '{"frontend": "Video streaming integration", "backend": "Client management system"}'::jsonb,
  preview_enabled = false
WHERE title = 'Skyzor Productions' AND brand_id IS NULL;

-- AI Tools
UPDATE projects SET
  brand_id = 'ai-technology',
  services = ARRAY['Full-stack development', 'AI integration', 'API development'],
  key_features = ARRAY['AI tool collection', 'API integrations', 'User dashboard', 'Usage analytics'],
  gallery_images = ARRAY['/images/portfolio/ai-tools.jpg', '/images/portfolio/ai-tools-2.jpg', '/images/portfolio/ai-tools-3.jpg'],
  tech_stack = '{"frontend": "Next.js, React components", "backend": "AI/ML APIs, Vercel deployment"}'::jsonb,
  preview_enabled = false
WHERE title = 'AI Tools' AND brand_id IS NULL;

-- Growth Mastery AI
UPDATE projects SET
  brand_id = 'ai-technology',
  services = ARRAY['AI platform development', 'Data visualization'],
  key_features = ARRAY['Growth analytics', 'AI recommendations', 'Business insights', 'Predictive models'],
  gallery_images = ARRAY['/images/portfolio/growth-mastery-ai.jpg', '/images/portfolio/growth-mastery-ai-2.jpg', '/images/portfolio/growth-mastery-ai-3.jpg'],
  tech_stack = '{"frontend": "AI/ML frameworks", "backend": "Dashboard development"}'::jsonb,
  preview_enabled = false
WHERE title = 'Growth Mastery AI' AND brand_id IS NULL;

-- Anemi Pool Reservation
UPDATE projects SET
  brand_id = 'hospitality',
  services = ARRAY['Custom reservation system', 'Hotel integration'],
  key_features = ARRAY['Real-time reservations', 'Availability calendar', 'Guest management', 'PMS integration'],
  gallery_images = ARRAY['/images/portfolio/anemi-pool.jpg', '/images/portfolio/anemi-pool-2.jpg', '/images/portfolio/anemi-pool-3.jpg'],
  tech_stack = '{"frontend": "Custom booking system", "backend": "Hotel PMS integration"}'::jsonb,
  preview_enabled = false
WHERE title = 'Anemi Pool Reservation' AND brand_id IS NULL;

-- MelodyGram AI
UPDATE projects SET
  brand_id = 'ai-technology',
  services = ARRAY['Music AI development', 'Audio processing', 'UI design'],
  key_features = ARRAY['Music generation', 'Audio analysis', 'Creative tools', 'AI composition'],
  gallery_images = ARRAY['/images/portfolio/melodygram-ai.jpg', '/images/portfolio/melodygram-ai-2.jpg', '/images/portfolio/melodygram-ai-3.jpg'],
  tech_stack = '{"frontend": "Audio processing libraries", "backend": "AI music generation"}'::jsonb,
  preview_enabled = false
WHERE title = 'MelodyGram AI' AND brand_id IS NULL;

-- MW Crypto Monitor
UPDATE projects SET
  brand_id = 'ai-technology',
  services = ARRAY['Financial dashboard', 'Real-time data integration'],
  key_features = ARRAY['Price monitoring', 'Portfolio tracking', 'Market analytics', 'Alert system'],
  gallery_images = ARRAY['/images/portfolio/mw-crypto.jpg', '/images/portfolio/mw-crypto-2.jpg', '/images/portfolio/mw-crypto-3.jpg'],
  tech_stack = '{"frontend": "React dashboard", "backend": "Cryptocurrency APIs"}'::jsonb,
  preview_enabled = false
WHERE title = 'MW Crypto Monitor' AND brand_id IS NULL;

-- Genius AI
UPDATE projects SET
  brand_id = 'ai-technology',
  services = ARRAY['AI development', 'Educational tools', 'Interactive learning'],
  key_features = ARRAY['AI tutoring', 'Knowledge base', 'Interactive learning modules', 'Progress tracking'],
  gallery_images = ARRAY['/images/portfolio/genius-ai.jpg', '/images/portfolio/genius-ai-2.jpg', '/images/portfolio/genius-ai-3.jpg'],
  tech_stack = '{"frontend": "AI/ML integration", "backend": "Learning management"}'::jsonb,
  preview_enabled = false
WHERE title = 'Genius AI' AND brand_id IS NULL;

-- Busy Bees IPC
UPDATE projects SET
  brand_id = 'creative-professional',
  services = ARRAY['Project management system', 'Workflow automation'],
  key_features = ARRAY['Project tracking', 'Team coordination', 'Automated workflows', 'POS integration'],
  gallery_images = ARRAY['/images/portfolio/busy-bees.jpg', '/images/portfolio/busy-bees-2.jpg', '/images/portfolio/busy-bees-3.jpg'],
  tech_stack = '{"frontend": "Project management tools", "backend": "Automation systems"}'::jsonb,
  preview_enabled = false
WHERE title = 'Busy Bees IPC' AND brand_id IS NULL;

-- Piedra Lounge
UPDATE projects SET
  brand_id = 'hospitality',
  services = ARRAY['Brand identity', 'Website design', 'Menu design'],
  key_features = ARRAY['Menu display', 'Reservation booking', 'Event information', 'Photo gallery'],
  gallery_images = ARRAY['/images/portfolio/piedra-lounge.jpg', '/images/portfolio/piedra-lounge-2.jpg', '/images/portfolio/piedra-lounge-3.jpg'],
  tech_stack = '{"frontend": "Restaurant CMS", "backend": "Reservation integration"}'::jsonb,
  preview_enabled = false
WHERE title = 'Piedra Lounge' AND brand_id IS NULL;

-- Baracas Lounge
UPDATE projects SET
  brand_id = 'hospitality',
  services = ARRAY['Brand development', 'Website creation', 'Promotional materials'],
  key_features = ARRAY['Event calendar', 'Photo galleries', 'VIP booking', 'Social integration'],
  gallery_images = ARRAY['/images/portfolio/baracas-lounge.jpg', '/images/portfolio/baracas-lounge-2.jpg', '/images/portfolio/baracas-lounge-3.jpg'],
  tech_stack = '{"frontend": "Event management system", "backend": "Social media integration"}'::jsonb,
  preview_enabled = false
WHERE title = 'Baracas Lounge' AND brand_id IS NULL;

-- Loft Club
UPDATE projects SET
  brand_id = 'hospitality',
  services = ARRAY['Brand identity', 'Web development', 'Membership portal'],
  key_features = ARRAY['Membership portal', 'Event bookings', 'Exclusive content', 'Secure login areas'],
  gallery_images = ARRAY['/images/portfolio/loft-club.jpg', '/images/portfolio/loft-club-2.jpg', '/images/portfolio/loft-club-3.jpg'],
  tech_stack = '{"frontend": "Membership management", "backend": "Secure login areas"}'::jsonb,
  preview_enabled = false
WHERE title = 'Loft Club' AND brand_id IS NULL;

-- New Earth Development
UPDATE projects SET
  brand_id = 'community-social',
  services = ARRAY['Brand design', 'Website development', 'Content strategy'],
  key_features = ARRAY['Project showcases', 'Sustainability metrics', 'Donation portal', 'Impact reports'],
  gallery_images = ARRAY['/images/portfolio/new-earth-development.jpg', '/images/portfolio/new-earth-development-2.jpg', '/images/portfolio/new-earth-development-3.jpg'],
  tech_stack = '{"frontend": "CMS platform", "backend": "Donation integration"}'::jsonb,
  preview_enabled = false
WHERE title = 'New Earth Development' AND brand_id IS NULL;

-- Boho Bones (NFT)
UPDATE projects SET
  brand_id = 'creative-professional',
  services = ARRAY['Digital art creation', 'NFT development', 'Blockchain integration'],
  key_features = ARRAY['NFT marketplace listing', 'Rarity system', 'Community features', 'OpenSea integration'],
  gallery_images = ARRAY['/images/portfolio/boho-bones.jpg', '/images/portfolio/boho-bones-2.jpg', '/images/portfolio/boho-bones-3.jpg'],
  tech_stack = '{"frontend": "Blockchain (Ethereum)", "backend": "OpenSea integration"}'::jsonb,
  preview_enabled = false
WHERE title = 'Boho Bones (NFT)' AND brand_id IS NULL;

-- Auracle
UPDATE projects SET
  brand_id = 'ai-technology',
  services = ARRAY['Predictive analytics', 'Data visualization', 'AI integration'],
  key_features = ARRAY['Predictive insights', 'Data analysis', 'Forecasting tools', 'Machine learning models'],
  gallery_images = ARRAY['/images/portfolio/auracle.jpg', '/images/portfolio/auracle-2.jpg', '/images/portfolio/auracle-3.jpg'],
  tech_stack = '{"frontend": "Machine learning models", "backend": "Cloud deployment"}'::jsonb,
  preview_enabled = false
WHERE title = 'Auracle' AND brand_id IS NULL;

-- Oracle Studios
UPDATE projects SET
  brand_id = 'creative-professional',
  services = ARRAY['Complete brand identity', 'Web development', 'Digital strategy'],
  key_features = ARRAY['Portfolio showcase', 'Service offerings', 'Client testimonials', 'Case studies'],
  gallery_images = ARRAY['/images/portfolio/oracle-studios.jpg', '/images/portfolio/oracle-studios-2.jpg', '/images/portfolio/oracle-studios-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "CMS integration"}'::jsonb,
  preview_enabled = false
WHERE title = 'Oracle Studios' AND brand_id IS NULL;

-- Vector Home Robot
UPDATE projects SET
  brand_id = 'ai-technology',
  services = ARRAY['Product branding', 'Landing page design', 'Documentation'],
  key_features = ARRAY['Product demonstrations', 'Technical specs', 'Pre-order system', 'Feature showcase'],
  gallery_images = ARRAY['/images/portfolio/vector-home-robot.jpg', '/images/portfolio/vector-home-robot-2.jpg', '/images/portfolio/vector-home-robot-3.jpg'],
  tech_stack = '{"frontend": "Webflow", "backend": "Product showcase system"}'::jsonb,
  preview_enabled = false
WHERE title = 'Vector Home Robot' AND brand_id IS NULL;

-- Cyprus Swim Series
UPDATE projects SET
  brand_id = 'tourism-travel',
  services = ARRAY['Event branding', 'Website development', 'Registration system'],
  key_features = ARRAY['Event registration', 'Results display', 'Swimmer profiles', 'Live timing'],
  gallery_images = ARRAY['/images/portfolio/cyprus-swim.jpg', '/images/portfolio/cyprus-swim-2.jpg', '/images/portfolio/cyprus-swim-3.jpg'],
  tech_stack = '{"frontend": "Event management system", "backend": "Results tracking"}'::jsonb,
  preview_enabled = false
WHERE title = 'Cyprus Swim Series' AND brand_id IS NULL;

-- Cyprus Tours
UPDATE projects SET
  brand_id = 'tourism-travel',
  services = ARRAY['Travel website development', 'Booking system', 'Tour management'],
  key_features = ARRAY['Tour bookings', 'Itinerary planning', 'Customer reviews', 'Availability calendar'],
  gallery_images = ARRAY['/images/portfolio/cyprus-tours.jpg', '/images/portfolio/cyprus-tours-2.jpg', '/images/portfolio/cyprus-tours-3.jpg'],
  tech_stack = '{"frontend": "Booking system", "backend": "Tour management CMS"}'::jsonb,
  preview_enabled = false
WHERE title = 'Cyprus Tours' AND brand_id IS NULL;

-- Dermlux Clinics
UPDATE projects SET
  brand_id = 'healthcare-wellness',
  services = ARRAY['Medical website development', 'Appointment system'],
  key_features = ARRAY['Treatment information', 'Appointment booking', 'Patient resources', 'Before/after gallery'],
  gallery_images = ARRAY['/images/portfolio/dermlux-clinics.jpg', '/images/portfolio/dermlux-clinics-2.jpg', '/images/portfolio/dermlux-clinics-3.jpg'],
  tech_stack = '{"frontend": "Healthcare CMS", "backend": "Patient management"}'::jsonb,
  preview_enabled = false
WHERE title = 'Dermlux Clinics' AND brand_id IS NULL;

-- Korakides Law
UPDATE projects SET
  brand_id = 'creative-professional',
  services = ARRAY['Legal website development', 'Case management', 'Branding'],
  key_features = ARRAY['Legal services showcase', 'Client portal', 'Consultation booking', 'Practice areas'],
  gallery_images = ARRAY['/images/portfolio/korakides-law.jpg', '/images/portfolio/korakides-law-2.jpg', '/images/portfolio/korakides-law-3.jpg'],
  tech_stack = '{"frontend": "Webflow", "backend": "Client portal"}'::jsonb,
  preview_enabled = false
WHERE title = 'Korakides Law' AND brand_id IS NULL;

-- KK Hospitality
UPDATE projects SET
  brand_id = 'hospitality',
  services = ARRAY['Corporate website', 'Service portfolio', 'Client management'],
  key_features = ARRAY['Service showcase', 'Client testimonials', 'Project portfolios', 'Consulting services'],
  gallery_images = ARRAY['/images/portfolio/kk-hospitality.jpg', '/images/portfolio/kk-hospitality-2.jpg', '/images/portfolio/kk-hospitality-3.jpg'],
  tech_stack = '{"frontend": "Webflow", "backend": "Client portals"}'::jsonb,
  preview_enabled = false
WHERE title = 'KK Hospitality' AND brand_id IS NULL;

-- Sodap Cyprus
UPDATE projects SET
  brand_id = 'creative-professional',
  services = ARRAY['Corporate website redesign', 'Product catalogs', 'B2B portal'],
  key_features = ARRAY['Product catalogs', 'Company information', 'B2B services', 'Quality certifications'],
  gallery_images = ARRAY['/images/portfolio/sodap-cyprus.jpg', '/images/portfolio/sodap-cyprus-2.jpg', '/images/portfolio/sodap-cyprus-3.jpg'],
  tech_stack = '{"frontend": "Industrial CMS", "backend": "B2B integration"}'::jsonb,
  preview_enabled = false
WHERE title = 'Sodap Cyprus' AND brand_id IS NULL;

-- Dr. Nutri
UPDATE projects SET
  brand_id = 'healthcare-wellness',
  services = ARRAY['Healthcare platform', 'Consultation booking', 'Nutrition tools'],
  key_features = ARRAY['Nutrition plans', 'Consultation booking', 'Health tracking', 'Diet resources'],
  gallery_images = ARRAY['/images/portfolio/dr-nutri.jpg', '/images/portfolio/dr-nutri-2.jpg', '/images/portfolio/dr-nutri-3.jpg'],
  tech_stack = '{"frontend": "Healthcare systems", "backend": "Nutrition databases"}'::jsonb,
  preview_enabled = false
WHERE title = 'Dr. Nutri' AND brand_id IS NULL;

-- Pafos Zoo
UPDATE projects SET
  brand_id = 'tourism-travel',
  services = ARRAY['Tourism website', 'Ticketing system', 'Educational content'],
  key_features = ARRAY['Animal exhibits', 'Ticket booking', 'Educational programs', 'Interactive map'],
  gallery_images = ARRAY['/images/portfolio/pafos-zoo.jpg', '/images/portfolio/pafos-zoo-2.jpg', '/images/portfolio/pafos-zoo-3.jpg'],
  tech_stack = '{"frontend": "Tourism CMS", "backend": "Educational content management"}'::jsonb,
  preview_enabled = false
WHERE title = 'Pafos Zoo' AND brand_id IS NULL;

-- Cyprus Athletic Tourism
UPDATE projects SET
  brand_id = 'tourism-travel',
  services = ARRAY['Tourism platform', 'Destination marketing', 'Booking systems'],
  key_features = ARRAY['Destination guides', 'Activity booking', 'Athlete resources', 'Training camp info'],
  gallery_images = ARRAY['/images/portfolio/cyprus-athletic.jpg', '/images/portfolio/cyprus-athletic-2.jpg', '/images/portfolio/cyprus-athletic-3.jpg'],
  tech_stack = '{"frontend": "Tourism CMS", "backend": "Booking integration"}'::jsonb,
  preview_enabled = false
WHERE title = 'Cyprus Athletic Tourism' AND brand_id IS NULL;

-- The Palmiers
UPDATE projects SET
  brand_id = 'hospitality',
  services = ARRAY['Website development', 'Booking integration', 'Brand design'],
  key_features = ARRAY['Sea view apartments', 'Pool view units', 'Executive penthouses', 'Premium amenities'],
  gallery_images = ARRAY['/images/portfolio/palmiers.jpg', '/images/portfolio/palmiers-2.jpg', '/images/portfolio/palmiers-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'The Palmiers' AND brand_id IS NULL;

-- Waterside
UPDATE projects SET
  brand_id = 'hospitality',
  services = ARRAY['Self-catering accommodation', 'Holiday bookings'],
  key_features = ARRAY['Deluxe studios', 'Suites', 'Rooftop seating', 'Sea views'],
  gallery_images = ARRAY['/images/portfolio/waterside.jpg', '/images/portfolio/waterside-2.jpg', '/images/portfolio/waterside-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Waterside' AND brand_id IS NULL;

-- Silver Park
UPDATE projects SET
  brand_id = 'hospitality',
  services = ARRAY['Website development', 'Accommodation booking'],
  key_features = ARRAY['Contemporary apartments', 'Pool area', 'Lush greenery', 'Harbour location'],
  gallery_images = ARRAY['/images/portfolio/silver-park.jpg', '/images/portfolio/silver-park-2.jpg', '/images/portfolio/silver-park-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Silver Park' AND brand_id IS NULL;

-- Loft Centrale
UPDATE projects SET
  brand_id = 'hospitality',
  services = ARRAY['Holiday accommodation', 'Booking system'],
  key_features = ARRAY['Studios', 'Suites', 'Special offers', 'Booking system'],
  gallery_images = ARRAY['/images/portfolio/loft-centrale.jpg', '/images/portfolio/loft-centrale-2.jpg', '/images/portfolio/loft-centrale-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Loft Centrale' AND brand_id IS NULL;

-- Averde
UPDATE projects SET
  brand_id = 'hospitality',
  services = ARRAY['Event planning', 'Catering connections', 'Carbon offsetting'],
  key_features = ARRAY['Mediterranean gardens', 'Glass ballroom', '10 rooms/suites', 'Sustainable practices'],
  gallery_images = ARRAY['/images/portfolio/averde.jpg', '/images/portfolio/averde-2.jpg', '/images/portfolio/averde-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Averde' AND brand_id IS NULL;

-- Mito Solar
UPDATE projects SET
  brand_id = 'real-estate-energy',
  services = ARRAY['Solar installation', 'Battery storage', 'EV charging', 'Cleaning services'],
  key_features = ARRAY['High-efficiency panels', 'EV chargers', 'Battery storage', 'Maintenance services'],
  gallery_images = ARRAY['/images/portfolio/mito-solar.jpg', '/images/portfolio/mito-solar-2.jpg', '/images/portfolio/mito-solar-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Mito Solar' AND brand_id IS NULL;

-- Linea
UPDATE projects SET
  brand_id = 'creative-professional',
  services = ARRAY['Strategic consulting', 'Business solutions'],
  key_features = ARRAY['Modern design', 'Clean interface', 'Service showcase', 'Professional presentation'],
  gallery_images = ARRAY['/images/portfolio/linea.jpg', '/images/portfolio/linea-2.jpg', '/images/portfolio/linea-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Linea' AND brand_id IS NULL;

-- SMS Reminder
UPDATE projects SET
  brand_id = 'ai-technology',
  services = ARRAY['SMS platform development', 'Notification system'],
  key_features = ARRAY['Automated reminders', 'Customer notifications', 'Scheduling system', 'Analytics'],
  gallery_images = ARRAY['/images/portfolio/sms-reminder.jpg', '/images/portfolio/sms-reminder-2.jpg', '/images/portfolio/sms-reminder-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'SMS Reminder' AND brand_id IS NULL;

-- EventPro
UPDATE projects SET
  brand_id = 'hospitality',
  services = ARRAY['Event management software', 'Automation development'],
  key_features = ARRAY['Instant quotes', 'Automated follow-ups', 'Document generation', 'Event coordination'],
  gallery_images = ARRAY['/images/portfolio/eventpro.jpg', '/images/portfolio/eventpro-2.jpg', '/images/portfolio/eventpro-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'EventPro' AND brand_id IS NULL;

-- ELYST Business Consulting
UPDATE projects SET
  brand_id = 'creative-professional',
  services = ARRAY['HR Consulting', 'Training', 'Leadership Coaching'],
  key_features = ARRAY['Proven expertise', 'Human-centered approach', 'ANAD certified', 'Training programs'],
  gallery_images = ARRAY['/images/portfolio/elyst-consulting.jpg', '/images/portfolio/elyst-consulting-2.jpg', '/images/portfolio/elyst-consulting-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'ELYST Business Consulting' AND brand_id IS NULL;

-- Nickoloui
UPDATE projects SET
  brand_id = 'creative-professional',
  services = ARRAY['Portfolio development', 'Visual design'],
  key_features = ARRAY['Filmography portfolio', 'Software tools', 'Contact info', 'Creative showcase'],
  gallery_images = ARRAY['/images/portfolio/nickoloui.jpg', '/images/portfolio/nickoloui-2.jpg', '/images/portfolio/nickoloui-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Nickoloui' AND brand_id IS NULL;

-- Med Yachts
UPDATE projects SET
  brand_id = 'tourism-travel',
  services = ARRAY['Yacht charter booking', 'Fleet showcase'],
  key_features = ARRAY['Fleet options', 'Charter booking', 'Luxury experiences', 'Destination guides'],
  gallery_images = ARRAY['/images/portfolio/med-yachts.jpg', '/images/portfolio/med-yachts-2.jpg', '/images/portfolio/med-yachts-3.jpg'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Med Yachts' AND brand_id IS NULL;

-- Aesthetics Gym
UPDATE projects SET
  brand_id = 'healthcare-wellness',
  services = ARRAY['Website development', 'Brand identity', 'Membership system'],
  key_features = ARRAY['Two location showcase (Gold & Arc)', 'Equipment showcase (Panatta, Pure Kraft, Gym 80)', 'Membership plans', 'Testimonials section', 'Recovery facilities', 'Interactive gallery'],
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  preview_enabled = false
WHERE title = 'Aesthetics Gym' AND brand_id IS NULL;

-- VIBEUP
UPDATE projects SET
  brand_id = 'community-social',
  services = ARRAY['Full-stack development', 'UI/UX design', 'Brand identity'],
  key_features = ARRAY['Social feeds', 'Community engagement', 'Real-time interactions', 'User profiles'],
  gallery_images = ARRAY['/images/portfolio/vibeup.jpg', '/images/portfolio/vibeup-2.jpg', '/images/portfolio/vibeup-3.jpg'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Real-time backend"}'::jsonb,
  preview_enabled = false
WHERE title = 'VIBEUP' AND brand_id IS NULL;

-- ============================================================================
-- SECTION 5: Add Aesthetics Gym if not exists
-- This project may not be in the database yet
-- ============================================================================

INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, services, key_features, challenge, solution, results, gallery_images, tech_stack, origin, project_type, preview_enabled)
SELECT
  'Aesthetics Gym',
  'Premium fitness collective in Paphos, Cyprus featuring two elite facilities (Gold Downtown & Arc Uptown) equipped with world-class Panatta, Pure Kraft, and Gym 80 equipment. Creating environments where athletic potential is realized through precision hypertrophy, functional capacity, recovery systems, and exceptional culture.',
  '/images/portfolio/light-brand-consulting.jpg',
  ARRAY['Fitness', 'Premium Gym', 'Athletic Performance', 'Recovery', 'Next.js', 'React'],
  'https://www.aestheticsgym.com/',
  'Aesthetics',
  'Fitness & Wellness / Premium Gym',
  true,
  'published',
  18,
  'healthcare-wellness',
  ARRAY['Website development', 'Brand identity', 'Membership system'],
  ARRAY['Two location showcase (Gold & Arc)', 'Equipment showcase (Panatta, Pure Kraft, Gym 80)', 'Membership plans', 'Testimonials section', 'Recovery facilities', 'Interactive gallery'],
  'Positioning a premium fitness brand with two distinct locations while showcasing elite equipment and creating an aspirational yet accessible brand identity.',
  'Developed a sophisticated website that highlights both facilities, showcases world-class equipment, and communicates the premium fitness experience through compelling design and member testimonials.',
  ARRAY['Strong brand positioning in Paphos fitness market', 'Clear differentiation between Gold and Arc locations', 'Enhanced member acquisition through premium positioning', 'Showcased elite equipment selection'],
  ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  'EU',
  'Premium Fitness Website',
  false
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE title = 'Aesthetics Gym');

-- ============================================================================
-- SECTION 6: Update timestamps
-- ============================================================================

UPDATE projects SET updated_at = NOW() WHERE updated_at < NOW() - INTERVAL '1 day';

-- ============================================================================
-- End of Migration
-- ============================================================================
