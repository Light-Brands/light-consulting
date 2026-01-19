-- ============================================================================
-- Migration: Seed Enhanced Project Data
-- ============================================================================
-- This migration populates all enhanced fields for existing projects and adds
-- new projects that were in the JSON file but not in the database.
-- Run this after add-project-overview-fields.sql
-- ============================================================================

-- ============================================================================
-- UPDATE EXISTING PROJECTS WITH ENHANCED DATA (matching by title)
-- ============================================================================

-- Project 1: Light Brand Consulting
UPDATE projects SET
  brand_id = 'ai-technology',
  gallery_images = ARRAY['/images/portfolio/light-brand-consulting.jpg', '/images/portfolio/light-brand-consulting-2.jpg', '/images/portfolio/light-brand-consulting-3.jpg'],
  services = ARRAY['AI Diagnostics', 'Business-Specific AI Engines', 'Founder Leverage Systems'],
  key_features = ARRAY['AI Readiness Assessment', 'Newsletter integration', 'Testimonials section', 'Efficiency metrics dashboard'],
  challenge = 'Businesses struggle to understand how AI can transform their operations and often lack a clear roadmap for AI adoption.',
  solution = 'Created a comprehensive consulting platform with AI readiness assessments, custom AI engine development, and founder-focused leverage systems.',
  results = ARRAY['95% client satisfaction rate', 'Average 40% efficiency improvement', 'Streamlined AI adoption process', 'Clear ROI metrics for AI investments'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  origin = 'US',
  project_type = 'Consulting / Landing site',
  preview_enabled = false
WHERE title = 'Light Brand Consulting';

-- Project 2: Iboga Life
UPDATE projects SET
  brand_id = 'healthcare-wellness',
  gallery_images = ARRAY['/images/portfolio/iboga-life.jpg', '/images/portfolio/iboga-life-2.jpg', '/images/portfolio/iboga-life-3.jpg'],
  services = ARRAY['Healing sessions', 'Retreats'],
  key_features = ARRAY['Practitioner bio', 'Session information', 'Retreat booking', 'Educational resources'],
  challenge = 'Creating an authentic and trustworthy online presence for sacred plant medicine healing practices.',
  solution = 'Developed a serene, informative website that educates visitors about Iboga healing while maintaining respect for its sacred traditions.',
  results = ARRAY['Increased retreat bookings by 60%', 'Enhanced practitioner credibility', 'Improved visitor engagement'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  origin = 'US',
  project_type = 'Personal / Healing site',
  preview_enabled = false
WHERE title = 'Iboga Life';

-- Project 3: NeuroTracker X
UPDATE projects SET
  brand_id = 'healthcare-wellness',
  gallery_images = ARRAY['/images/portfolio/neurotracker-x.jpg', '/images/portfolio/neurotracker-x-2.jpg', '/images/portfolio/neurotracker-x-3.jpg'],
  services = ARRAY['Cognitive training subscriptions'],
  key_features = ARRAY['ELITE Edition demo', 'CLINICAL Edition demo', 'HUMAN Edition demo', 'Performance tracking'],
  challenge = 'Presenting complex cognitive training technology in an accessible way for different market segments.',
  solution = 'Created a segmented demo platform showcasing three distinct editions tailored to athletes, clinicians, and everyday users.',
  results = ARRAY['40% increase in demo conversions', 'Clear market segmentation', 'Enhanced user understanding of product value'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  origin = 'US',
  project_type = 'Demo / Landing page',
  preview_enabled = false
WHERE title = 'NeuroTracker X';

-- Project 4: Light Field Institute
UPDATE projects SET
  brand_id = 'healthcare-wellness',
  gallery_images = ARRAY['/images/portfolio/light-field-institute.jpg', '/images/portfolio/light-field-institute-2.jpg', '/images/portfolio/light-field-institute-3.jpg'],
  services = ARRAY['Aura readings', 'Energy sessions', 'Courses'],
  key_features = ARRAY['Session packages', 'Weekly field notes', 'Practice section', 'Education section', 'Course enrollment'],
  challenge = 'Building a comprehensive digital platform for consciousness education that maintains credibility while being accessible.',
  solution = 'Developed an integrated ecosystem combining educational content, practical sessions, and community engagement features.',
  results = ARRAY['300% increase in course enrollment', 'Active community engagement', 'Established thought leadership in biofield research'],
  tech_stack = '{"frontend": "Custom (React)", "backend": "Not specified"}'::jsonb,
  origin = 'US',
  project_type = 'Institute / Community site',
  preview_enabled = false
WHERE title = 'Light Field Institute';

-- Project 5: Mindflow Vision
UPDATE projects SET
  brand_id = 'ai-technology',
  gallery_images = ARRAY['/images/portfolio/mindflow-vision.jpg', '/images/portfolio/mindflow-vision-2.jpg', '/images/portfolio/mindflow-vision-3.jpg'],
  services = ARRAY['Technical documentation', 'Whitepaper design'],
  key_features = ARRAY['Whitepaper content', 'Technical specifications', 'Vision presentation', 'Clean documentation'],
  challenge = 'Presenting complex technical concepts in a clear, engaging, and professional manner.',
  solution = 'Created a visually stunning whitepaper site that makes technical content accessible without sacrificing depth.',
  results = ARRAY['Improved investor understanding', 'Enhanced credibility', 'Clear technical communication'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  origin = 'CY',
  project_type = 'Technical whitepaper site',
  preview_enabled = false
WHERE title = 'Mindflow Vision';

-- Project 6: The Planetary Party
UPDATE projects SET
  brand_id = 'community-social',
  gallery_images = ARRAY['/images/portfolio/planetary-party.jpg', '/images/portfolio/planetary-party-2.jpg', '/images/portfolio/planetary-party-3.jpg'],
  services = ARRAY['Protocols', 'Tools', 'Flow Funds', 'Guilds'],
  key_features = ARRAY['Bioregional dashboards', 'Five-Phase Protocol', 'Node exploration', 'Guild system', 'Flow Funds management'],
  challenge = 'Creating a scalable platform for global regenerative action that empowers local communities.',
  solution = 'Built a comprehensive ecosystem with bioregional networks, funding mechanisms, and collaborative tools.',
  results = ARRAY['Global community activation', 'Multiple bioregional nodes established', 'Successful Flow Funds distribution'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  origin = 'US',
  project_type = 'Community / Ecosystem site',
  preview_enabled = false
WHERE title = 'The Planetary Party';

-- Project 7: Love Token
UPDATE projects SET
  brand_id = 'community-social',
  gallery_images = ARRAY['/images/portfolio/love-token.jpg', '/images/portfolio/love-token-2.jpg', '/images/portfolio/love-token-3.jpg'],
  services = ARRAY['Guided meditations', 'Subscriptions', 'Credit redemption'],
  key_features = ARRAY['Meditation tracking', 'Credit circulation metrics', 'Impact stories', 'Love token economy'],
  challenge = 'Building a new economic paradigm based on love, intention, and meditation.',
  solution = 'Developed an innovative platform combining meditation practice with a circular credit economy.',
  results = ARRAY['Active meditation community', 'Positive economic circulation', 'Measurable impact stories'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  origin = 'US',
  project_type = 'Circular Economy platform',
  preview_enabled = false
WHERE title = 'Love Token';

-- Project 8: Lightwaves Energy
UPDATE projects SET
  brand_id = 'real-estate-energy',
  gallery_images = ARRAY['/images/portfolio/lightwaves-energy.jpg', '/images/portfolio/lightwaves-energy-2.jpg', '/images/portfolio/lightwaves-energy-3.jpg'],
  services = ARRAY['Solar consultation', 'Energy optimization'],
  key_features = ARRAY['Solar Calculator', 'Energy Optimization tools', 'Savings estimator', 'Installation guide'],
  challenge = 'Helping customers understand their solar potential and make informed renewable energy decisions.',
  solution = 'Built interactive tools that calculate solar potential and optimize energy usage for maximum savings.',
  results = ARRAY['Increased solar adoption inquiries', 'Clear ROI visualization', 'Simplified decision-making'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  origin = 'US',
  project_type = 'Renewable Energy Services',
  preview_enabled = false
WHERE title = 'Lightwaves Energy';

-- Project 9: Downtown Park
UPDATE projects SET
  brand_id = 'real-estate-energy',
  gallery_images = ARRAY['/images/portfolio/downtown-park.jpg', '/images/portfolio/downtown-park-2.jpg', '/images/portfolio/downtown-park-3.jpg'],
  services = ARRAY['Brand identity', 'Website development', '3D visualizations'],
  key_features = ARRAY['Property listings', 'Virtual tours', 'Investment information', 'Property management system'],
  challenge = 'Showcasing a premium urban development in a way that attracts both residents and investors.',
  solution = 'Created an immersive digital experience with 3D visualizations, virtual tours, and comprehensive property information.',
  results = ARRAY['Accelerated pre-sales', 'Strong investor interest', 'Enhanced brand perception'],
  tech_stack = '{"frontend": "React/Custom CMS", "backend": "Property management system"}'::jsonb,
  origin = 'EU',
  project_type = 'Real Estate Platform',
  preview_enabled = false
WHERE title = 'Downtown Park';

-- Project 10: Skyzor Productions
UPDATE projects SET
  brand_id = 'creative-professional',
  gallery_images = ARRAY['/images/portfolio/skyzor-productions.jpg', '/images/portfolio/skyzor-productions-2.jpg', '/images/portfolio/skyzor-productions-3.jpg'],
  services = ARRAY['Brand identity', 'Portfolio website', 'Video player integration'],
  key_features = ARRAY['Video portfolio', 'Client testimonials', 'Production services showcase', 'Streaming integration'],
  challenge = 'Creating a portfolio that showcases video production quality while maintaining fast load times.',
  solution = 'Built a visually striking portfolio with optimized video streaming and seamless playback.',
  results = ARRAY['Increased client inquiries by 75%', 'Enhanced brand credibility', 'Improved showreel engagement'],
  tech_stack = '{"frontend": "Video streaming integration", "backend": "Client management system"}'::jsonb,
  origin = 'EU',
  project_type = 'Production Portfolio',
  preview_enabled = false
WHERE title = 'Skyzor Productions';

-- Project 11: AI Tools
UPDATE projects SET
  brand_id = 'ai-technology',
  gallery_images = ARRAY['/images/portfolio/ai-tools.jpg', '/images/portfolio/ai-tools-2.jpg', '/images/portfolio/ai-tools-3.jpg'],
  services = ARRAY['Full-stack development', 'AI integration', 'API development'],
  key_features = ARRAY['AI tool collection', 'API integrations', 'User dashboard', 'Usage analytics'],
  challenge = 'Consolidating multiple AI capabilities into a unified, user-friendly platform.',
  solution = 'Developed a comprehensive AI tools platform with seamless API integrations and intuitive interfaces.',
  results = ARRAY['High user adoption', 'Streamlined AI access', 'Positive user feedback'],
  tech_stack = '{"frontend": "Next.js, React components", "backend": "AI/ML APIs, Vercel deployment"}'::jsonb,
  origin = 'US',
  project_type = 'AI Platform',
  preview_enabled = false
WHERE title = 'AI Tools';

-- Project 12: Growth Mastery AI
UPDATE projects SET
  brand_id = 'ai-technology',
  gallery_images = ARRAY['/images/portfolio/growth-mastery-ai.jpg', '/images/portfolio/growth-mastery-ai-2.jpg', '/images/portfolio/growth-mastery-ai-3.jpg'],
  services = ARRAY['AI platform development', 'Data visualization'],
  key_features = ARRAY['Growth analytics', 'AI recommendations', 'Business insights', 'Predictive models'],
  challenge = 'Providing actionable AI-driven growth insights for businesses of all sizes.',
  solution = 'Built a powerful analytics platform with machine learning models that deliver personalized growth recommendations.',
  results = ARRAY['Average 35% revenue increase for users', 'Data-driven decision making', 'Clear growth pathways'],
  tech_stack = '{"frontend": "AI/ML frameworks", "backend": "Dashboard development"}'::jsonb,
  origin = 'US',
  project_type = 'Business AI Platform',
  preview_enabled = false
WHERE title = 'Growth Mastery AI';

-- Project 13: Anemi Pool Reservation
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/anemi-pool.jpg', '/images/portfolio/anemi-pool-2.jpg', '/images/portfolio/anemi-pool-3.jpg'],
  services = ARRAY['Custom reservation system', 'Hotel integration'],
  key_features = ARRAY['Real-time reservations', 'Availability calendar', 'Guest management', 'PMS integration'],
  challenge = 'Managing pool and amenity reservations efficiently while integrating with existing hotel systems.',
  solution = 'Developed a real-time reservation system that seamlessly integrates with the hotel property management system.',
  results = ARRAY['90% reduction in booking conflicts', 'Improved guest satisfaction', 'Streamlined operations'],
  tech_stack = '{"frontend": "Custom booking system", "backend": "Hotel PMS integration"}'::jsonb,
  origin = 'EU',
  project_type = 'Reservation System',
  preview_enabled = false
WHERE title = 'Anemi Pool Reservation';

-- Project 14: Anemi Event Management
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/anemi-events.jpg', '/images/portfolio/anemi-events-2.jpg', '/images/portfolio/anemi-events-3.jpg'],
  services = ARRAY['Event management dashboard', 'Booking integration'],
  key_features = ARRAY['Event planning', 'Resource management', 'Booking coordination', 'Staff scheduling'],
  challenge = 'Streamlining complex event management operations for a luxury hotel.',
  solution = 'Built a comprehensive event management dashboard with booking integration and resource coordination.',
  results = ARRAY['Improved event efficiency', 'Better resource allocation', 'Enhanced guest experience'],
  tech_stack = '{"frontend": "Dashboard CMS", "backend": "Booking integration"}'::jsonb,
  origin = 'EU',
  project_type = 'Event Management Dashboard',
  preview_enabled = false
WHERE title = 'Anemi Event Management';

-- Project 15: MelodyGram AI
UPDATE projects SET
  brand_id = 'ai-technology',
  gallery_images = ARRAY['/images/portfolio/melodygram-ai.jpg', '/images/portfolio/melodygram-ai-2.jpg', '/images/portfolio/melodygram-ai-3.jpg'],
  services = ARRAY['Music AI development', 'Audio processing', 'UI design'],
  key_features = ARRAY['Music generation', 'Audio analysis', 'Creative tools', 'AI composition'],
  challenge = 'Making AI-powered music creation accessible to both professionals and enthusiasts.',
  solution = 'Developed an intuitive platform with powerful AI music generation and analysis capabilities.',
  results = ARRAY['Thousands of compositions created', 'High user engagement', 'Positive creative community'],
  tech_stack = '{"frontend": "Audio processing libraries", "backend": "AI music generation"}'::jsonb,
  origin = 'US',
  project_type = 'Music AI Platform',
  preview_enabled = false
WHERE title = 'MelodyGram AI';

-- Project 16: MW Crypto Monitor
UPDATE projects SET
  brand_id = 'ai-technology',
  gallery_images = ARRAY['/images/portfolio/mw-crypto.jpg', '/images/portfolio/mw-crypto-2.jpg', '/images/portfolio/mw-crypto-3.jpg'],
  services = ARRAY['Financial dashboard', 'Real-time data integration'],
  key_features = ARRAY['Price monitoring', 'Portfolio tracking', 'Market analytics', 'Alert system'],
  challenge = 'Providing real-time, accurate cryptocurrency data in an intuitive dashboard format.',
  solution = 'Built a high-performance dashboard with real-time data feeds and comprehensive portfolio analytics.',
  results = ARRAY['Sub-second data updates', 'Comprehensive market coverage', 'High user retention'],
  tech_stack = '{"frontend": "React dashboard", "backend": "Cryptocurrency APIs"}'::jsonb,
  origin = 'US',
  project_type = 'Crypto Dashboard',
  preview_enabled = false
WHERE title = 'MW Crypto Monitor';

-- Project 17: Genius AI
UPDATE projects SET
  brand_id = 'ai-technology',
  gallery_images = ARRAY['/images/portfolio/genius-ai.jpg', '/images/portfolio/genius-ai-2.jpg', '/images/portfolio/genius-ai-3.jpg'],
  services = ARRAY['AI development', 'Educational tools', 'Interactive learning'],
  key_features = ARRAY['AI tutoring', 'Knowledge base', 'Interactive learning modules', 'Progress tracking'],
  challenge = 'Creating personalized learning experiences at scale using AI technology.',
  solution = E'Developed an intelligent tutoring platform that adapts to each learner\'s needs and pace.',
  results = ARRAY['40% improvement in learning outcomes', 'Personalized education at scale', 'High engagement rates'],
  tech_stack = '{"frontend": "AI/ML integration", "backend": "Learning management"}'::jsonb,
  origin = 'US',
  project_type = 'AI Orchestration Platform',
  preview_enabled = false
WHERE title = 'Genius AI';

-- Project 18: Busy Bees IPC
UPDATE projects SET
  brand_id = 'creative-professional',
  gallery_images = ARRAY['/images/portfolio/busy-bees.jpg', '/images/portfolio/busy-bees-2.jpg', '/images/portfolio/busy-bees-3.jpg'],
  services = ARRAY['Project management system', 'Workflow automation'],
  key_features = ARRAY['Project tracking', 'Team coordination', 'Automated workflows', 'POS integration'],
  challenge = 'Streamlining project coordination while integrating point-of-sale capabilities.',
  solution = 'Built an intelligent project management platform with automated workflows and POS features.',
  results = ARRAY['60% reduction in manual tasks', 'Improved team coordination', 'Streamlined operations'],
  tech_stack = '{"frontend": "Project management tools", "backend": "Automation systems"}'::jsonb,
  origin = 'US',
  project_type = 'Business Management / POS',
  preview_enabled = false
WHERE title = 'Busy Bees IPC';

-- Project 19: Piedra Lounge
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/piedra-lounge.jpg', '/images/portfolio/piedra-lounge-2.jpg', '/images/portfolio/piedra-lounge-3.jpg'],
  services = ARRAY['Brand identity', 'Website design', 'Menu design'],
  key_features = ARRAY['Menu display', 'Reservation booking', 'Event information', 'Photo gallery'],
  challenge = 'Creating an upscale digital presence that reflects Mediterranean elegance.',
  solution = 'Designed a sophisticated website with seamless reservation integration and beautiful visual storytelling.',
  results = ARRAY['30% increase in reservations', 'Enhanced brand perception', 'Strong social media presence'],
  tech_stack = '{"frontend": "Restaurant CMS", "backend": "Reservation integration"}'::jsonb,
  origin = 'EU',
  project_type = 'Restaurant Website',
  preview_enabled = false
WHERE title = 'Piedra Lounge';

-- Project 20: Baracas Lounge
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/baracas-lounge.jpg', '/images/portfolio/baracas-lounge-2.jpg', '/images/portfolio/baracas-lounge-3.jpg'],
  services = ARRAY['Brand development', 'Website creation', 'Promotional materials'],
  key_features = ARRAY['Event calendar', 'Photo galleries', 'VIP booking', 'Social integration'],
  challenge = 'Capturing the energy and excitement of nightlife in a digital format.',
  solution = 'Created a dynamic website with event management, VIP reservations, and engaging visual content.',
  results = ARRAY['Increased VIP bookings', 'Higher event attendance', 'Strong brand recognition'],
  tech_stack = '{"frontend": "Event management system", "backend": "Social media integration"}'::jsonb,
  origin = 'EU',
  project_type = 'Nightlife Venue',
  preview_enabled = false
WHERE title = 'Baracas Lounge';

-- Project 21: Loft Club
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/loft-club.jpg', '/images/portfolio/loft-club-2.jpg', '/images/portfolio/loft-club-3.jpg'],
  services = ARRAY['Brand identity', 'Web development', 'Membership portal'],
  key_features = ARRAY['Membership portal', 'Event bookings', 'Exclusive content', 'Secure login areas'],
  challenge = 'Creating an exclusive digital experience that matches the private club atmosphere.',
  solution = 'Built a members-only platform with secure access, exclusive content, and premium event management.',
  results = ARRAY['Increased membership retention', 'Enhanced member engagement', 'Streamlined event management'],
  tech_stack = '{"frontend": "Membership management", "backend": "Secure login areas"}'::jsonb,
  origin = 'EU',
  project_type = 'Private Club Platform',
  preview_enabled = false
WHERE title = 'Loft Club';

-- Project 22: New Earth Development
UPDATE projects SET
  brand_id = 'community-social',
  gallery_images = ARRAY['/images/portfolio/new-earth-development.jpg', '/images/portfolio/new-earth-development-2.jpg', '/images/portfolio/new-earth-development-3.jpg'],
  services = ARRAY['Brand design', 'Website development', 'Content strategy'],
  key_features = ARRAY['Project showcases', 'Sustainability metrics', 'Donation portal', 'Impact reports'],
  challenge = 'Communicating conservation impact while driving sustainable donations.',
  solution = 'Developed a compelling platform showcasing projects, measuring impact, and facilitating donations.',
  results = ARRAY['200% increase in donations', 'Greater awareness', 'Expanded conservation reach'],
  tech_stack = '{"frontend": "CMS platform", "backend": "Donation integration"}'::jsonb,
  origin = 'US',
  project_type = 'Non-Profit Website',
  preview_enabled = false
WHERE title = 'New Earth Development';

-- Project 23: Boho Bones (NFT)
UPDATE projects SET
  brand_id = 'creative-professional',
  gallery_images = ARRAY['/images/portfolio/boho-bones.jpg', '/images/portfolio/boho-bones-2.jpg', '/images/portfolio/boho-bones-3.jpg'],
  services = ARRAY['Digital art creation', 'NFT development', 'Blockchain integration'],
  key_features = ARRAY['NFT marketplace listing', 'Rarity system', 'Community features', 'OpenSea integration'],
  challenge = 'Creating a distinctive NFT collection with strong artistic identity and community appeal.',
  solution = 'Developed unique bone-themed digital artwork with rarity mechanics and community engagement features.',
  results = ARRAY['Successful NFT launch', 'Active community', 'Ongoing secondary market activity'],
  tech_stack = '{"frontend": "Blockchain (Ethereum)", "backend": "OpenSea integration"}'::jsonb,
  origin = 'US',
  project_type = 'NFT Collection',
  preview_enabled = false
WHERE title = 'Boho Bones (NFT)';

-- Project 24: Auracle
UPDATE projects SET
  brand_id = 'ai-technology',
  gallery_images = ARRAY['/images/portfolio/auracle.jpg', '/images/portfolio/auracle-2.jpg', '/images/portfolio/auracle-3.jpg'],
  services = ARRAY['Predictive analytics', 'Data visualization', 'AI integration'],
  key_features = ARRAY['Predictive insights', 'Data analysis', 'Forecasting tools', 'Machine learning models'],
  challenge = 'Delivering accurate predictions and actionable insights through AI.',
  solution = 'Built a sophisticated prediction platform with advanced ML models and intuitive visualizations.',
  results = ARRAY['High prediction accuracy', 'Data-driven insights', 'Improved decision making'],
  tech_stack = '{"frontend": "Machine learning models", "backend": "Cloud deployment"}'::jsonb,
  origin = 'US',
  project_type = 'Analytics Platform',
  preview_enabled = false
WHERE title = 'Auracle';

-- Project 25: Oracle Studios
UPDATE projects SET
  brand_id = 'creative-professional',
  gallery_images = ARRAY['/images/portfolio/oracle-studios.jpg', '/images/portfolio/oracle-studios-2.jpg', '/images/portfolio/oracle-studios-3.jpg'],
  services = ARRAY['Complete brand identity', 'Web development', 'Digital strategy'],
  key_features = ARRAY['Portfolio showcase', 'Service offerings', 'Client testimonials', 'Case studies'],
  challenge = 'Creating a compelling agency presence that showcases creative excellence.',
  solution = 'Developed a stunning portfolio site that demonstrates creative capabilities and attracts premium clients.',
  results = ARRAY['Premium client acquisition', 'Industry recognition', 'Strong brand positioning'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "CMS integration"}'::jsonb,
  origin = 'EU',
  project_type = 'Agency Website',
  preview_enabled = false
WHERE title = 'Oracle Studios';

-- Project 26: Vector Home Robot
UPDATE projects SET
  brand_id = 'ai-technology',
  gallery_images = ARRAY['/images/portfolio/vector-home-robot.jpg', '/images/portfolio/vector-home-robot-2.jpg', '/images/portfolio/vector-home-robot-3.jpg'],
  services = ARRAY['Product branding', 'Landing page design', 'Documentation'],
  key_features = ARRAY['Product demonstrations', 'Technical specs', 'Pre-order system', 'Feature showcase'],
  challenge = 'Launching a complex robotics product with clear value proposition.',
  solution = 'Created an engaging product landing page with demonstrations, specs, and seamless pre-ordering.',
  results = ARRAY['Successful product launch', 'Strong pre-order numbers', 'Clear product understanding'],
  tech_stack = '{"frontend": "Webflow", "backend": "Product showcase system"}'::jsonb,
  origin = 'EU',
  project_type = 'Product Landing Page',
  preview_enabled = false
WHERE title = 'Vector Home Robot';

-- Project 27: Cyprus Swim Series
UPDATE projects SET
  brand_id = 'tourism-travel',
  gallery_images = ARRAY['/images/portfolio/cyprus-swim.jpg', '/images/portfolio/cyprus-swim-2.jpg', '/images/portfolio/cyprus-swim-3.jpg'],
  services = ARRAY['Event branding', 'Website development', 'Registration system'],
  key_features = ARRAY['Event registration', 'Results display', 'Swimmer profiles', 'Live timing'],
  challenge = 'Managing large-scale swimming events with efficient registration and results tracking.',
  solution = 'Built a comprehensive event platform with online registration, live results, and swimmer management.',
  results = ARRAY['Record participant registration', 'Streamlined event management', 'Enhanced athlete experience'],
  tech_stack = '{"frontend": "Event management system", "backend": "Results tracking"}'::jsonb,
  origin = 'EU',
  project_type = 'Sports Event Platform',
  preview_enabled = false
WHERE title = 'Cyprus Swim Series';

-- Project 28: Cyprus Tours
UPDATE projects SET
  brand_id = 'tourism-travel',
  gallery_images = ARRAY['/images/portfolio/cyprus-tours.jpg', '/images/portfolio/cyprus-tours-2.jpg', '/images/portfolio/cyprus-tours-3.jpg'],
  services = ARRAY['Travel website development', 'Booking system', 'Tour management'],
  key_features = ARRAY['Tour bookings', 'Itinerary planning', 'Customer reviews', 'Availability calendar'],
  challenge = 'Creating a comprehensive tour platform that showcases Cyprus while enabling easy bookings.',
  solution = 'Developed a feature-rich tourism website with booking capabilities and destination storytelling.',
  results = ARRAY['Increased tour bookings by 45%', 'Higher customer satisfaction', 'Expanded tour offerings'],
  tech_stack = '{"frontend": "Booking system", "backend": "Tour management CMS"}'::jsonb,
  origin = 'CY',
  project_type = 'Tourism Platform',
  preview_enabled = false
WHERE title = 'Cyprus Tours';

-- Project 29: Dermlux Clinics
UPDATE projects SET
  brand_id = 'healthcare-wellness',
  gallery_images = ARRAY['/images/portfolio/dermlux-clinics.jpg', '/images/portfolio/dermlux-clinics-2.jpg', '/images/portfolio/dermlux-clinics-3.jpg'],
  services = ARRAY['Medical website development', 'Appointment system'],
  key_features = ARRAY['Treatment information', 'Appointment booking', 'Patient resources', 'Before/after gallery'],
  challenge = 'Building trust while making advanced dermatology treatments accessible online.',
  solution = 'Created a professional medical website with comprehensive treatment info and seamless appointment booking.',
  results = ARRAY['50% increase in appointments', 'Improved patient education', 'Enhanced clinic reputation'],
  tech_stack = '{"frontend": "Healthcare CMS", "backend": "Patient management"}'::jsonb,
  origin = 'CY',
  project_type = 'Medical Website',
  preview_enabled = false
WHERE title = 'Dermlux Clinics';

-- Project 30: Korakides Law
UPDATE projects SET
  brand_id = 'creative-professional',
  gallery_images = ARRAY['/images/portfolio/korakides-law.jpg', '/images/portfolio/korakides-law-2.jpg', '/images/portfolio/korakides-law-3.jpg'],
  services = ARRAY['Legal website development', 'Case management', 'Branding'],
  key_features = ARRAY['Legal services showcase', 'Client portal', 'Consultation booking', 'Practice areas'],
  challenge = 'Establishing a professional legal presence that instills confidence and attracts clients.',
  solution = 'Developed a authoritative legal website with clear practice areas and easy consultation scheduling.',
  results = ARRAY['Increased client inquiries', 'Enhanced professional image', 'Streamlined consultations'],
  tech_stack = '{"frontend": "Webflow", "backend": "Client portal"}'::jsonb,
  origin = 'EU',
  project_type = 'Legal Website',
  preview_enabled = false
WHERE title = 'Korakides Law';

-- Project 31: KK Hospitality
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/kk-hospitality.jpg', '/images/portfolio/kk-hospitality-2.jpg', '/images/portfolio/kk-hospitality-3.jpg'],
  services = ARRAY['Corporate website', 'Service portfolio', 'Client management'],
  key_features = ARRAY['Service showcase', 'Client testimonials', 'Project portfolios', 'Consulting services'],
  challenge = 'Showcasing hospitality expertise while attracting B2B clients.',
  solution = 'Built a professional corporate site highlighting consulting services and successful projects.',
  results = ARRAY['New B2B partnerships', 'Industry recognition', 'Expanded service offerings'],
  tech_stack = '{"frontend": "Webflow", "backend": "Client portals"}'::jsonb,
  origin = 'EU',
  project_type = 'Corporate Website',
  preview_enabled = false
WHERE title = 'KK Hospitality';

-- Project 32: Sodap Cyprus
UPDATE projects SET
  brand_id = 'creative-professional',
  gallery_images = ARRAY['/images/portfolio/sodap-cyprus.jpg', '/images/portfolio/sodap-cyprus-2.jpg', '/images/portfolio/sodap-cyprus-3.jpg'],
  services = ARRAY['Corporate website redesign', 'Product catalogs', 'B2B portal'],
  key_features = ARRAY['Product catalogs', 'Company information', 'B2B services', 'Quality certifications'],
  challenge = 'Modernizing the digital presence of an established manufacturing company.',
  solution = 'Redesigned the corporate website with comprehensive product catalogs and B2B capabilities.',
  results = ARRAY['Improved B2B relationships', 'Modernized brand image', 'Streamlined product discovery'],
  tech_stack = '{"frontend": "Industrial CMS", "backend": "B2B integration"}'::jsonb,
  origin = 'CY',
  project_type = 'Manufacturing Website',
  preview_enabled = false
WHERE title = 'Sodap Cyprus';

-- Project 33: Dr. Nutri
UPDATE projects SET
  brand_id = 'healthcare-wellness',
  gallery_images = ARRAY['/images/portfolio/dr-nutri.jpg', '/images/portfolio/dr-nutri-2.jpg', '/images/portfolio/dr-nutri-3.jpg'],
  services = ARRAY['Healthcare platform', 'Consultation booking', 'Nutrition tools'],
  key_features = ARRAY['Nutrition plans', 'Consultation booking', 'Health tracking', 'Diet resources'],
  challenge = 'Making professional nutrition consultation accessible and trackable online.',
  solution = 'Developed a comprehensive nutrition platform with consultation booking and progress tracking.',
  results = ARRAY['Increased consultation bookings', 'Better patient outcomes', 'Engaged user community'],
  tech_stack = '{"frontend": "Healthcare systems", "backend": "Nutrition databases"}'::jsonb,
  origin = 'EU',
  project_type = 'Healthcare Platform',
  preview_enabled = false
WHERE title = 'Dr. Nutri';

-- Project 34: Pafos Zoo
UPDATE projects SET
  brand_id = 'tourism-travel',
  gallery_images = ARRAY['/images/portfolio/pafos-zoo.jpg', '/images/portfolio/pafos-zoo-2.jpg', '/images/portfolio/pafos-zoo-3.jpg'],
  services = ARRAY['Tourism website', 'Ticketing system', 'Educational content'],
  key_features = ARRAY['Animal exhibits', 'Ticket booking', 'Educational programs', 'Interactive map'],
  challenge = 'Creating an engaging online presence for a wildlife attraction while enabling online ticketing.',
  solution = 'Built an immersive website showcasing animals, with seamless ticketing and educational content.',
  results = ARRAY['40% increase in online ticket sales', 'Enhanced visitor experience', 'Educational reach expanded'],
  tech_stack = '{"frontend": "Tourism CMS", "backend": "Educational content management"}'::jsonb,
  origin = 'EU',
  project_type = 'Tourism Website',
  preview_enabled = false
WHERE title = 'Pafos Zoo';

-- Project 35: Cyprus Athletic Tourism
UPDATE projects SET
  brand_id = 'tourism-travel',
  gallery_images = ARRAY['/images/portfolio/cyprus-athletic.jpg', '/images/portfolio/cyprus-athletic-2.jpg', '/images/portfolio/cyprus-athletic-3.jpg'],
  services = ARRAY['Tourism platform', 'Destination marketing', 'Booking systems'],
  key_features = ARRAY['Destination guides', 'Activity booking', 'Athlete resources', 'Training camp info'],
  challenge = 'Positioning Cyprus as a premier destination for athletic training and sports tourism.',
  solution = 'Developed a comprehensive platform showcasing sports facilities, accommodations, and activities.',
  results = ARRAY['Increased athletic tourism inquiries', 'International recognition', 'New partnerships formed'],
  tech_stack = '{"frontend": "Tourism CMS", "backend": "Booking integration"}'::jsonb,
  origin = 'EU',
  project_type = 'Sports Tourism Platform',
  preview_enabled = false
WHERE title = 'Cyprus Athletic Tourism';

-- Project 36: The Palmiers
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/palmiers.jpg', '/images/portfolio/palmiers-2.jpg', '/images/portfolio/palmiers-3.jpg'],
  services = ARRAY['Website development', 'Booking integration', 'Brand design'],
  key_features = ARRAY['Sea view apartments', 'Pool view units', 'Executive penthouses', 'Premium amenities'],
  challenge = 'Showcasing luxury accommodations to attract discerning holiday guests.',
  solution = 'Created an elegant website highlighting premium apartments with seamless booking capabilities.',
  results = ARRAY['Increased direct bookings', 'Premium brand positioning', 'Higher average booking value'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Residential Accommodation',
  preview_enabled = false
WHERE title = 'The Palmiers';

-- Project 37: Waterside
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/waterside.jpg', '/images/portfolio/waterside-2.jpg', '/images/portfolio/waterside-3.jpg'],
  services = ARRAY['Self-catering accommodation', 'Holiday bookings'],
  key_features = ARRAY['Deluxe studios', 'Suites', 'Rooftop seating', 'Sea views'],
  challenge = 'Highlighting the unique waterside location and self-catering amenities.',
  solution = E'Built a visually appealing website showcasing the property\'s location and accommodation options.',
  results = ARRAY['Strong direct booking growth', 'Excellent guest reviews', 'Enhanced online visibility'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Accommodation Website',
  preview_enabled = false
WHERE title = 'Waterside';

-- Project 38: Silver Park
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/silver-park.jpg', '/images/portfolio/silver-park-2.jpg', '/images/portfolio/silver-park-3.jpg'],
  services = ARRAY['Website development', 'Accommodation booking'],
  key_features = ARRAY['Contemporary apartments', 'Pool area', 'Lush greenery', 'Harbour location'],
  challenge = 'Positioning boutique residences as a premium alternative to hotels.',
  solution = 'Developed a sophisticated website highlighting the boutique experience and prime location.',
  results = ARRAY['Increased occupancy rates', 'Premium pricing achieved', 'Strong repeat bookings'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Boutique Residences',
  preview_enabled = false
WHERE title = 'Silver Park';

-- Project 39: Loft Centrale
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/loft-centrale.jpg', '/images/portfolio/loft-centrale-2.jpg', '/images/portfolio/loft-centrale-3.jpg'],
  services = ARRAY['Holiday accommodation', 'Booking system'],
  key_features = ARRAY['Studios', 'Suites', 'Special offers', 'Booking system'],
  challenge = 'Creating a warm, inviting online presence for cottage-style accommodations.',
  solution = 'Built a charming website that captures the cozy atmosphere with easy booking functionality.',
  results = ARRAY['Increased direct bookings', 'Higher guest satisfaction', 'Effective special offer promotions'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Holiday Apartments Website',
  preview_enabled = false
WHERE title = 'Loft Centrale';

-- Project 40: Averde
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/averde.jpg', '/images/portfolio/averde-2.jpg', '/images/portfolio/averde-3.jpg'],
  services = ARRAY['Event planning', 'Catering connections', 'Carbon offsetting'],
  key_features = ARRAY['Mediterranean gardens', 'Glass ballroom', '10 rooms/suites', 'Sustainable practices'],
  challenge = 'Showcasing a unique private estate for premium events while highlighting sustainability.',
  solution = E'Created an elegant website that captures the estate\'s beauty and sustainable approach.',
  results = ARRAY['Premium wedding bookings', 'Strong event inquiries', 'Recognized for sustainability'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Wedding and Events Venue',
  preview_enabled = false
WHERE title = 'Averde';

-- Project 41: Mito Solar
UPDATE projects SET
  brand_id = 'real-estate-energy',
  gallery_images = ARRAY['/images/portfolio/mito-solar.jpg', '/images/portfolio/mito-solar-2.jpg', '/images/portfolio/mito-solar-3.jpg'],
  services = ARRAY['Solar installation', 'Battery storage', 'EV charging', 'Cleaning services'],
  key_features = ARRAY['High-efficiency panels', 'EV chargers', 'Battery storage', 'Maintenance services'],
  challenge = 'Educating the Cyprus market on comprehensive solar solutions.',
  solution = 'Built an informative website showcasing complete solar and energy storage solutions.',
  results = ARRAY['Increased solar installations', 'Growing EV charger demand', 'Market leadership'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Solar Energy Provider',
  preview_enabled = false
WHERE title = 'Mito Solar';

-- Project 42: Linea
UPDATE projects SET
  brand_id = 'creative-professional',
  gallery_images = ARRAY['/images/portfolio/linea.jpg', '/images/portfolio/linea-2.jpg', '/images/portfolio/linea-3.jpg'],
  services = ARRAY['Strategic consulting', 'Business solutions'],
  key_features = ARRAY['Modern design', 'Clean interface', 'Service showcase', 'Professional presentation'],
  challenge = 'Creating a modern, professional presence for strategic consulting services.',
  solution = 'Developed a sleek, minimalist website that communicates expertise and professionalism.',
  results = ARRAY['Enhanced professional image', 'Increased client inquiries', 'Clear service understanding'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Consulting Platform',
  preview_enabled = false
WHERE title = 'Linea';

-- Project 43: SMS Reminder
UPDATE projects SET
  brand_id = 'ai-technology',
  gallery_images = ARRAY['/images/portfolio/sms-reminder.jpg', '/images/portfolio/sms-reminder-2.jpg', '/images/portfolio/sms-reminder-3.jpg'],
  services = ARRAY['SMS platform development', 'Notification system'],
  key_features = ARRAY['Automated reminders', 'Customer notifications', 'Scheduling system', 'Analytics'],
  challenge = 'Building a reliable SMS reminder platform for business communication.',
  solution = 'Created a streamlined platform for automated SMS reminders and notifications.',
  results = ARRAY['Reduced no-shows', 'Improved customer communication', 'High delivery rates'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Communication Platform',
  preview_enabled = false
WHERE title = 'SMS Reminder';

-- Project 44: EventPro
UPDATE projects SET
  brand_id = 'hospitality',
  gallery_images = ARRAY['/images/portfolio/eventpro.jpg', '/images/portfolio/eventpro-2.jpg', '/images/portfolio/eventpro-3.jpg'],
  services = ARRAY['Event management software', 'Automation development'],
  key_features = ARRAY['Instant quotes', 'Automated follow-ups', 'Document generation', 'Event coordination'],
  challenge = 'Automating complex event management processes for boutique hotels.',
  solution = 'Built a comprehensive SaaS solution that automates quotes, follow-ups, and documentation.',
  results = ARRAY['70% time savings on event management', 'Faster quote turnaround', 'Improved client satisfaction'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Event Management Web App',
  preview_enabled = false
WHERE title = 'EventPro';

-- Project 45: ELYST Business Consulting
UPDATE projects SET
  brand_id = 'creative-professional',
  gallery_images = ARRAY['/images/portfolio/elyst-consulting.jpg', '/images/portfolio/elyst-consulting-2.jpg', '/images/portfolio/elyst-consulting-3.jpg'],
  services = ARRAY['HR Consulting', 'Training', 'Leadership Coaching'],
  key_features = ARRAY['Proven expertise', 'Human-centered approach', 'ANAD certified', 'Training programs'],
  challenge = 'Establishing credibility in HR consulting while showcasing human-centered approach.',
  solution = 'Developed a professional website highlighting expertise, certifications, and training offerings.',
  results = ARRAY['Increased consulting engagements', 'Training program growth', 'Industry recognition'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Consulting Site',
  preview_enabled = false
WHERE title = 'ELYST Business Consulting';

-- Project 46: Nickoloui
UPDATE projects SET
  brand_id = 'creative-professional',
  gallery_images = ARRAY['/images/portfolio/nickoloui.jpg', '/images/portfolio/nickoloui-2.jpg', '/images/portfolio/nickoloui-3.jpg'],
  services = ARRAY['Portfolio development', 'Visual design'],
  key_features = ARRAY['Filmography portfolio', 'Software tools', 'Contact info', 'Creative showcase'],
  challenge = 'Creating a distinctive portfolio that reflects multi-disciplinary artistic vision.',
  solution = 'Built a visually stunning portfolio site showcasing filmography and creative tools.',
  results = ARRAY['Increased creative collaborations', 'Industry visibility', 'Strong artistic identity'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Portfolio Website',
  preview_enabled = false
WHERE title = 'Nickoloui';

-- Project 47: Med Yachts
UPDATE projects SET
  brand_id = 'tourism-travel',
  gallery_images = ARRAY['/images/portfolio/med-yachts.jpg', '/images/portfolio/med-yachts-2.jpg', '/images/portfolio/med-yachts-3.jpg'],
  services = ARRAY['Yacht charter booking', 'Fleet showcase'],
  key_features = ARRAY['Fleet options', 'Charter booking', 'Luxury experiences', 'Destination guides'],
  challenge = 'Showcasing luxury yacht experiences while enabling seamless charter bookings.',
  solution = 'Created a premium website displaying the fleet with elegant booking capabilities.',
  results = ARRAY['Premium charter bookings', 'Luxury brand positioning', 'Strong Mediterranean presence'],
  tech_stack = '{"frontend": "React/Next.js", "backend": "Not specified"}'::jsonb,
  origin = 'EU',
  project_type = 'Yacht Charter Platform',
  preview_enabled = false
WHERE title = 'Med Yachts';

-- Project 48: VIBEUP
UPDATE projects SET
  brand_id = 'community-social',
  gallery_images = ARRAY['/images/portfolio/vibeup.jpg', '/images/portfolio/vibeup-2.jpg', '/images/portfolio/vibeup-3.jpg'],
  services = ARRAY['Full-stack development', 'UI/UX design', 'Brand identity'],
  key_features = ARRAY['Social feeds', 'Community engagement', 'Real-time interactions', 'User profiles'],
  challenge = 'Building a scalable community platform with real-time features and engaging user experience.',
  solution = 'Developed a full-stack platform with real-time capabilities and intuitive social features.',
  results = ARRAY['Active community engagement', 'Scalable architecture', 'Positive user feedback'],
  tech_stack = '{"frontend": "Next.js / React", "backend": "Real-time backend"}'::jsonb,
  origin = 'US',
  project_type = 'Community Platform',
  preview_enabled = false
WHERE title = 'VIBEUP';

-- ============================================================================
-- INSERT NEW PROJECTS (49-67) - Not in original seed
-- ============================================================================

-- Project 49: Aesthetics Gym
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'Aesthetics Gym',
  'Premium fitness collective in Paphos, Cyprus featuring two elite facilities (Gold Downtown & Arc Uptown) equipped with world-class Panatta, Pure Kraft, and Gym 80 equipment. Creating environments where athletic potential is realized through precision hypertrophy, functional capacity, recovery systems, and exceptional culture.',
  '/images/portfolio/aesthetics-gym.jpg',
  ARRAY['Fitness', 'Premium Gym', 'Athletic Performance', 'Recovery', 'Next.js', 'React'],
  'https://www.aestheticsgym.com/',
  'Aesthetics',
  'Fitness & Wellness / Premium Gym',
  true,
  'published',
  18,
  'healthcare-wellness',
  ARRAY['/images/portfolio/aesthetics-gym.jpg', '/images/portfolio/aesthetics-gym-2.jpg', '/images/portfolio/aesthetics-gym-3.jpg'],
  ARRAY['Website development', 'Brand identity', 'Membership system'],
  ARRAY['Two location showcase (Gold & Arc)', 'Equipment showcase (Panatta, Pure Kraft, Gym 80)', 'Membership plans', 'Testimonials section', 'Recovery facilities', 'Interactive gallery'],
  'Positioning a premium fitness brand with two distinct locations while showcasing elite equipment and creating an aspirational yet accessible brand identity.',
  'Developed a sophisticated website that highlights both facilities, showcases world-class equipment, and communicates the premium fitness experience through compelling design and member testimonials.',
  ARRAY['Strong brand positioning in Paphos fitness market', 'Clear differentiation between Gold and Arc locations', 'Enhanced member acquisition through premium positioning', 'Showcased elite equipment selection'],
  '{"frontend": "Next.js / React", "backend": "Not specified"}'::jsonb,
  'EU',
  'Premium Fitness Website',
  false
) ON CONFLICT DO NOTHING;

-- Project 50: GVG Enterprises
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'GVG Enterprises',
  'Strategic business development and growth consulting for medical, wellness, and technology companies. Delivered global expansion strategy, market penetration planning, and scalable business architecture for international growth.',
  '/images/portfolio/gvg-enterprises.jpg',
  ARRAY['Business Development', 'Growth Strategy', 'International Expansion', 'Medical', 'Wellness'],
  'https://www.gvgenterprises.com',
  'GVG Enterprises',
  'Business Development / Consulting',
  false,
  'published',
  51,
  'creative-professional',
  ARRAY['/images/portfolio/gvg-enterprises.jpg', '/images/portfolio/gvg-enterprises-2.jpg', '/images/portfolio/gvg-enterprises-3.jpg'],
  ARRAY['Business Development Strategy', 'International Expansion', 'Market Penetration Planning', 'Scalable Business Architecture'],
  ARRAY['Global expansion planning', 'Medical clinic partnerships', 'Distribution network development', 'Long-term market strategy'],
  'Supporting medical and wellness companies in achieving sustainable international growth while maintaining operational excellence.',
  'Developed comprehensive business development strategies including global expansion planning, distribution network creation, and scalable business architecture for long-term success.',
  ARRAY['Led global expansion opening 17 international distributors (2011-2015)', 'Supported 500+ medical clinics implementing protocols', 'Oversaw distribution of 1M+ protein product boxes annually', 'Built scalable strategies for long-term market penetration'],
  '{"frontend": "Not applicable", "backend": "Business consulting"}'::jsonb,
  'US',
  'Business Development Consulting',
  false
) ON CONFLICT DO NOTHING;

-- Project 51: IDEAL Protein
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'IDEAL Protein',
  'Executive leadership and strategic business development for a global medical weight-loss and metabolic health company. Provided organizational leadership, international operations management, and strategic initiatives that contributed to significant company valuation growth.',
  '/images/portfolio/ideal-protein.jpg',
  ARRAY['Healthcare', 'Weight Loss', 'International Operations', 'Strategic Leadership', 'Business Development'],
  'https://www.idealprotein.com',
  'IDEAL Protein',
  'Healthcare / Medical Weight Loss',
  true,
  'published',
  52,
  'healthcare-wellness',
  ARRAY['/images/portfolio/ideal-protein.jpg', '/images/portfolio/ideal-protein-2.jpg', '/images/portfolio/ideal-protein-3.jpg'],
  ARRAY['Executive Leadership', 'International Operations', 'Strategic Business Development', 'Valuation Growth Initiatives'],
  ARRAY['Multi-country operations management', 'Medical partner network expansion', 'Investment deal support', 'Strategic growth initiatives'],
  'Scaling a medical weight-loss company across international markets while maintaining clinical excellence and driving company valuation.',
  'Provided executive leadership managing 250 employees across Canada and the U.S., overseeing operations in 19 countries, and developing strategic initiatives that significantly increased company valuation.',
  ARRAY['Led and managed 250 employees across Canada and U.S.', 'Oversaw international operations across 19 countries', 'Supported 4,000+ medical partner clinics worldwide', 'Contributed to $377M investment deal (65% stake, $580M valuation)', 'Supported initiatives elevating valuation to $880M USD in 2017'],
  '{"frontend": "Not applicable", "backend": "Enterprise operations"}'::jsonb,
  'US',
  'Executive Leadership / Healthcare',
  false
) ON CONFLICT DO NOTHING;

-- Project 52: PandaPay
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'PandaPay',
  'Co-founded and scaled a Canadian merchant services provider offering Interac and credit card payment processing nationwide. Built infrastructure, merchant acquisition strategies, and portfolio management leading to a successful multi-8-digit exit.',
  '/images/portfolio/pandapay.jpg',
  ARRAY['FinTech', 'Payment Processing', 'Merchant Services', 'Portfolio Management', 'Exit Strategy'],
  'https://www.pandapay.ca',
  'PandaPay',
  'FinTech / Payment Processing',
  true,
  'published',
  53,
  'ai-technology',
  ARRAY['/images/portfolio/pandapay.jpg', '/images/portfolio/pandapay-2.jpg', '/images/portfolio/pandapay-3.jpg'],
  ARRAY['Company Building', 'Merchant Acquisition', 'Payment Infrastructure', 'Portfolio Management', 'Exit Strategy'],
  ARRAY['National payment processing', 'Interac integration', 'Credit card processing', 'Merchant portfolio development'],
  'Building a competitive merchant services company in the Canadian market and scaling to a portfolio size that would attract acquisition interest.',
  'Co-founded and built PandaPay from the ground up, developing national infrastructure for payment processing, implementing merchant acquisition strategies, and managing portfolio growth.',
  ARRAY['Built portfolio of 8,000 merchants across Canada', 'Developed national payment processing infrastructure', 'Completed multi-8-digit portfolio exit in 2024', 'Established nationwide merchant services presence'],
  '{"frontend": "Payment systems", "backend": "Financial infrastructure"}'::jsonb,
  'CA',
  'FinTech Company Building',
  false
) ON CONFLICT DO NOTHING;

-- Project 53: 9mm Beyond Energy
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  '9mm Beyond Energy',
  'Strategic advisory and fundraising leadership for a performance-driven functional energy supplement company. Built complete corporate infrastructure and executed long-term growth strategy with successful capital raise.',
  '/images/portfolio/9mm-beyond-energy.jpg',
  ARRAY['Supplements', 'Fundraising', 'Corporate Structure', 'Growth Strategy', 'Capital Raise'],
  'https://www.9mmbeyondenergy.com',
  '9mm Beyond Energy',
  'Consumer Products / Supplements',
  false,
  'published',
  54,
  'healthcare-wellness',
  ARRAY['/images/portfolio/9mm-beyond-energy.jpg', '/images/portfolio/9mm-beyond-energy-2.jpg', '/images/portfolio/9mm-beyond-energy-3.jpg'],
  ARRAY['Strategic Advisory', 'Fundraising', 'Corporate Structure Development', 'Growth Strategy'],
  ARRAY['Investment capital raising', 'Legal structure development', 'Financial architecture', 'Expansion strategy'],
  'Launching a new energy supplement brand with proper corporate foundation and sufficient capital for market entry and growth.',
  'Provided strategic advisory services including complete legal, financial, and corporate structure development while leading fundraising efforts and designing long-term expansion strategy.',
  ARRAY['Raised $1.7M USD in investment capital', 'Built complete legal and financial structure', 'Designed corporate architecture', 'Executed long-term growth and expansion strategy'],
  '{"frontend": "Not applicable", "backend": "Strategic consulting"}'::jsonb,
  'US',
  'Strategic Advisory / Fundraising',
  false
) ON CONFLICT DO NOTHING;

-- Project 54: Dimes Energy
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'Dimes Energy',
  'Investment strategy consulting for an energy exploration and drilling company. Developed capital expansion strategies, supported fundraising efforts, and provided corporate structure and investor positioning guidance.',
  '/images/portfolio/dimes-energy.jpg',
  ARRAY['Energy', 'Investment Strategy', 'Capital Expansion', 'Drilling Operations', 'Investor Relations'],
  'https://www.dimesenergy.com',
  'Dimes Energy',
  'Energy / Oil & Gas',
  false,
  'published',
  55,
  'real-estate-energy',
  ARRAY['/images/portfolio/dimes-energy.jpg', '/images/portfolio/dimes-energy-2.jpg', '/images/portfolio/dimes-energy-3.jpg'],
  ARRAY['Investment Strategy', 'Capital Expansion', 'Investor Relations', 'Corporate Structure'],
  ARRAY['Drilling operations funding', 'Investor positioning', 'Financial planning', 'Corporate structure advisory'],
  'Securing significant capital investment to fund energy exploration and drilling operations while positioning the company for long-term growth.',
  'Developed comprehensive investment strategy for capital expansion, supported investor relations, and provided guidance on corporate structure and long-term financial planning.',
  ARRAY['Helped raise $10M USD for drilling operations', 'Developed capital expansion strategy', 'Supported corporate structure development', 'Enhanced investor positioning and relations'],
  '{"frontend": "Not applicable", "backend": "Investment consulting"}'::jsonb,
  'US',
  'Investment Strategy Consulting',
  false
) ON CONFLICT DO NOTHING;

-- Project 55: Quantum Energy
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'Quantum Energy',
  'Investment strategy consulting for an energy-focused company pursuing innovative technologies and capital expansion initiatives. Provided strategic investor introductions and early-stage structuring for future growth rounds.',
  '/images/portfolio/quantum-energy.jpg',
  ARRAY['Energy', 'Investment Strategy', 'Investor Relations', 'Capital Raising', 'Early Stage'],
  'https://www.quantumenergy.com',
  'Quantum Energy',
  'Energy / Technology',
  false,
  'published',
  56,
  'real-estate-energy',
  ARRAY['/images/portfolio/quantum-energy.jpg', '/images/portfolio/quantum-energy-2.jpg', '/images/portfolio/quantum-energy-3.jpg'],
  ARRAY['Investment Strategy', 'Investor Relations', 'Strategic Introductions', 'Early-Stage Structuring'],
  ARRAY['Capital positioning', 'Investor introductions', 'Growth round preparation', 'Strategic investment advisory'],
  'Positioning an emerging energy technology company for capital expansion while building strategic investor relationships.',
  'Advised on investment strategy and capital positioning, introduced strategic investors, facilitated investor relations, and supported early-stage structuring to prepare for future growth rounds.',
  ARRAY['Helped raise $300K USD in private investment', 'Introduced strategic investors', 'Facilitated investor relations', 'Prepared company for future growth rounds'],
  '{"frontend": "Not applicable", "backend": "Investment consulting"}'::jsonb,
  'US',
  'Investment Strategy Consulting',
  false
) ON CONFLICT DO NOTHING;

-- Project 56: Creative TRND + SEO TWIST
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'Creative TRND + SEO TWIST',
  'M&A advisory and capital raise support for a strategic merger between two digital marketing and SEO agencies. Facilitated the merger process, secured growth capital, and advised on organizational integration and scaling strategy.',
  '/images/portfolio/creative-trnd-seo-twist.jpg',
  ARRAY['M&A', 'Digital Marketing', 'SEO', 'Capital Raise', 'Agency Consolidation'],
  'https://www.creativetrnd.com',
  'Creative TRND / SEO TWIST',
  'Digital Marketing / SEO',
  false,
  'published',
  57,
  'creative-professional',
  ARRAY['/images/portfolio/creative-trnd-seo-twist.jpg', '/images/portfolio/creative-trnd-seo-twist-2.jpg', '/images/portfolio/creative-trnd-seo-twist-3.jpg'],
  ARRAY['M&A Advisory', 'Capital Raise', 'Organizational Integration', 'Scaling Strategy'],
  ARRAY['Merger facilitation', 'Post-merger capital raise', 'Corporate architecture', 'Integration planning'],
  'Successfully merging two complementary digital agencies while securing capital for post-merger growth and ensuring smooth organizational integration.',
  'Facilitated the strategic merger between Creative TRND and SEO TWIST, secured post-merger growth capital, and advised on corporate architecture, organizational integration, and scaling strategy.',
  ARRAY['Facilitated successful merger between agencies', 'Helped secure $1.6M in post-merger capital', 'Advised on organizational integration', 'Developed corporate architecture and scaling strategy'],
  '{"frontend": "Not applicable", "backend": "M&A consulting"}'::jsonb,
  'US',
  'M&A Advisory / Capital Raise',
  false
) ON CONFLICT DO NOTHING;

-- Project 57: Ottawa International Jazz Festival
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'Ottawa International Jazz Festival',
  E'Helped raise millions of dollars through fundraising initiatives supporting one of Canada\'s premier cultural festivals. Delivered strategic fundraising campaigns and donor engagement strategies for this nationally recognized arts organization.',
  '/images/portfolio/ottawa-jazz-festival.jpg',
  ARRAY['Nonprofit', 'Fundraising', 'Cultural Events', 'Arts', 'Canada'],
  'https://ottawajazzfestival.com',
  'Ottawa International Jazz Festival',
  'Nonprofit / Cultural Events',
  false,
  'published',
  58,
  'community-social',
  ARRAY['/images/portfolio/ottawa-jazz-festival.jpg', '/images/portfolio/ottawa-jazz-festival-2.jpg', '/images/portfolio/ottawa-jazz-festival-3.jpg'],
  ARRAY['Fundraising Strategy', 'Donor Engagement', 'Campaign Management'],
  ARRAY['Multi-million dollar fundraising', 'Donor cultivation', 'Event sponsorship', 'Cultural programming support'],
  E'Raising substantial funds to support one of Canada\'s premier cultural festivals while building long-term donor relationships.',
  'Developed and executed strategic fundraising campaigns with comprehensive donor engagement strategies, sponsorship acquisition, and community outreach.',
  ARRAY['Raised millions of dollars in funding', 'Established sustainable donor relationships', 'Supported festival growth and programming', 'Enhanced community engagement'],
  '{"frontend": "Not applicable", "backend": "Nonprofit consulting"}'::jsonb,
  'CA',
  'Nonprofit Fundraising',
  false
) ON CONFLICT DO NOTHING;

-- Project 58: World Vision — 30-Hour Famine
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'World Vision — 30-Hour Famine',
  'Led the funding component of national campaigns, helping raise hundreds of thousands of dollars while mobilizing youth leaders across Canada. Managed large-scale fundraising initiatives and youth engagement programs for this global humanitarian organization.',
  '/images/portfolio/world-vision-famine.jpg',
  ARRAY['Nonprofit', 'Fundraising', 'Youth Leadership', 'Humanitarian', 'National Campaigns'],
  'https://www.worldvision.ca',
  'World Vision Canada',
  'Nonprofit / Humanitarian',
  true,
  'published',
  59,
  'community-social',
  ARRAY['/images/portfolio/world-vision-famine.jpg', '/images/portfolio/world-vision-famine-2.jpg', '/images/portfolio/world-vision-famine-3.jpg'],
  ARRAY['National Campaign Leadership', 'Youth Mobilization', 'Fundraising Management'],
  ARRAY['National campaign coordination', 'Youth leader development', 'Large-scale fundraising', 'Community mobilization'],
  'Leading national fundraising campaigns while engaging and mobilizing youth leaders across Canada for humanitarian causes.',
  'Managed the funding component of the 30-Hour Famine campaign, developing youth leadership programs and coordinating nationwide fundraising efforts.',
  ARRAY['Raised hundreds of thousands of dollars', 'Mobilized youth leaders across Canada', 'Built sustainable youth engagement programs', 'Supported global humanitarian initiatives'],
  '{"frontend": "Not applicable", "backend": "Nonprofit consulting"}'::jsonb,
  'CA',
  'Nonprofit Campaign Leadership',
  false
) ON CONFLICT DO NOTHING;

-- Project 59: New Renaissance
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'New Renaissance',
  'Founded and led a nonprofit movement from the ground up over 8 years as Executive Director. Built a community of 250+ young adults meeting weekly, supporting entrepreneurship, creativity, and leadership while helping reconnect a generation to faith, identity, and purpose. Expanded across Canada with sustained long-term impact.',
  '/images/portfolio/new-renaissance.jpg',
  ARRAY['Nonprofit', 'Community Building', 'Leadership Development', 'Youth Movement', 'Faith-Based'],
  NULL,
  'New Renaissance',
  'Nonprofit / Community Movement',
  true,
  'published',
  60,
  'community-social',
  ARRAY['/images/portfolio/new-renaissance.jpg', '/images/portfolio/new-renaissance-2.jpg', '/images/portfolio/new-renaissance-3.jpg'],
  ARRAY['Movement Building', 'Leadership Development', 'Community Organizing', 'Program Development'],
  ARRAY['250+ weekly participants', '8-year sustained operation', 'Cross-Canada expansion', 'Entrepreneurship support'],
  'Building a grassroots movement from scratch that supports young adults in entrepreneurship, creativity, leadership, and faith reconnection.',
  'Founded and directed a nonprofit movement for 8 years, creating weekly programming, leadership development systems, and expansion strategies across Canada.',
  ARRAY['Built community of 250+ young adults meeting weekly', 'Operated successfully for 8 years', 'Expanded movement across Canada', 'Helped reconnect a generation to faith, identity, and purpose'],
  '{"frontend": "Not applicable", "backend": "Nonprofit leadership"}'::jsonb,
  'CA',
  'Nonprofit Movement Building',
  false
) ON CONFLICT DO NOTHING;

-- Project 60: Carlington Booch
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'Carlington Booch',
  'Helped build a mission-driven kombucha brand from scratch as a social enterprise. Developed the e-commerce brand and business foundation where 100% of revenue supports addiction recovery and reintegration programs.',
  '/images/portfolio/carlington-booch.jpg',
  ARRAY['Social Enterprise', 'E-commerce', 'Brand Development', 'Addiction Recovery', 'Mission-Driven'],
  'https://carlingtonbooch.com',
  'Carlington Booch',
  'Social Enterprise / Beverage',
  false,
  'published',
  61,
  'community-social',
  ARRAY['/images/portfolio/carlington-booch.jpg', '/images/portfolio/carlington-booch-2.jpg', '/images/portfolio/carlington-booch-3.jpg'],
  ARRAY['Brand Development', 'E-commerce Build', 'Business Foundation', 'Social Enterprise Strategy'],
  ARRAY['Mission-driven brand', '100% revenue to recovery programs', 'E-commerce platform', 'Social impact model'],
  'Building a sustainable social enterprise that generates revenue while supporting addiction recovery programs.',
  'Developed a complete kombucha brand and e-commerce business foundation with a social enterprise model directing all revenue to addiction recovery.',
  ARRAY['Built mission-driven brand from scratch', 'Established e-commerce foundation', '100% revenue supports addiction recovery', 'Created sustainable social enterprise model'],
  '{"frontend": "E-commerce platform", "backend": "Business systems"}'::jsonb,
  'CA',
  'Social Enterprise Development',
  false
) ON CONFLICT DO NOTHING;

-- Project 61: Ashes to Rubies
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'Ashes to Rubies',
  'Helped create LifeLab, an addiction recovery and reintegration program that has helped hundreds of individuals overcome addiction. Supported curriculum development, program structure, and delivery rooted in dignity and identity transformation.',
  '/images/portfolio/ashes-to-rubies.jpg',
  ARRAY['Addiction Recovery', 'Program Development', 'Social Impact', 'Reintegration', 'Nonprofit'],
  'https://ashestorubies.com',
  'Ashes to Rubies',
  'Addiction Recovery / Social Impact',
  true,
  'published',
  62,
  'healthcare-wellness',
  ARRAY['/images/portfolio/ashes-to-rubies.jpg', '/images/portfolio/ashes-to-rubies-2.jpg', '/images/portfolio/ashes-to-rubies-3.jpg'],
  ARRAY['Program Development', 'Curriculum Design', 'Recovery Framework', 'Reintegration Strategy'],
  ARRAY['LifeLab recovery program', 'Dignity-centered approach', 'Identity transformation', 'Reintegration support'],
  'Creating an effective addiction recovery program that addresses the whole person and supports successful reintegration into society.',
  'Developed LifeLab, a comprehensive addiction recovery and reintegration program with curriculum focused on dignity and identity transformation.',
  ARRAY['Helped hundreds overcome addiction', 'Built sustainable recovery program', 'Created reintegration pathways', 'Established dignity-centered approach'],
  '{"frontend": "Not applicable", "backend": "Program development"}'::jsonb,
  'CA',
  'Addiction Recovery Program',
  false
) ON CONFLICT DO NOTHING;

-- Project 62: Shifter Magazine
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'Shifter Magazine',
  'Co-founded and published a cultural media platform, building and scaling the magazine from the ground up. Covered major events including Juno Awards, International Film Festivals, and Academy Awards. Launched and elevated countless creatives before successfully exiting; the magazine continues to operate today.',
  '/images/portfolio/shifter-magazine.jpg',
  ARRAY['Media', 'Publishing', 'Cultural Platform', 'Entertainment', 'Startup Exit'],
  'https://shiftermagazine.com',
  'Shifter Magazine',
  'Media / Publishing',
  true,
  'published',
  63,
  'creative-professional',
  ARRAY['/images/portfolio/shifter-magazine.jpg', '/images/portfolio/shifter-magazine-2.jpg', '/images/portfolio/shifter-magazine-3.jpg'],
  ARRAY['Media Platform Development', 'Editorial Leadership', 'Brand Building', 'Creative Talent Development'],
  ARRAY['Major event coverage', 'Artist platform', 'Editorial excellence', 'Successful exit'],
  'Building a cultural media platform that elevates creatives while achieving sustainable business growth and eventual exit.',
  'Co-founded and scaled Shifter Magazine, covering major cultural events, developing editorial excellence, and building a platform that launched countless creative careers.',
  ARRAY['Built and scaled magazine from ground up', 'Covered Juno Awards, Film Festivals, Academy Awards', 'Launched countless creative careers', 'Successfully exited; magazine continues operating'],
  '{"frontend": "Media platform", "backend": "Publishing systems"}'::jsonb,
  'CA',
  'Media Platform / Startup Exit',
  false
) ON CONFLICT DO NOTHING;

-- Project 63: TALK
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'TALK',
  'Supported brand and creative strategy during rapid growth for this Juno Award-winning artist. Provided strategic guidance on positioning, brand development, and creative direction as the artist scaled to selling out stadiums internationally.',
  '/images/portfolio/talk-artist.jpg',
  ARRAY['Music', 'Artist Development', 'Brand Strategy', 'Creative Direction', 'Entertainment'],
  'https://www.iamtalkmusic.com',
  'TALK',
  'Music / Entertainment',
  true,
  'published',
  64,
  'creative-professional',
  ARRAY['/images/portfolio/talk-artist.jpg', '/images/portfolio/talk-artist-2.jpg', '/images/portfolio/talk-artist-3.jpg'],
  ARRAY['Brand Strategy', 'Creative Direction', 'Artist Positioning', 'Growth Strategy'],
  ARRAY['Juno Award winner', 'International stadium tours', 'Brand development', 'Rapid growth support'],
  'Supporting an emerging artist through rapid growth while maintaining authentic brand identity and creative vision.',
  E'Provided strategic brand and creative guidance during the artist\'s rapid ascent, focusing on positioning, brand development, and sustainable growth.',
  ARRAY['Supported Juno Award-winning artist', 'Guided brand through rapid growth', 'Artist now sells out stadiums internationally', 'Built sustainable creative brand'],
  '{"frontend": "Not applicable", "backend": "Artist consulting"}'::jsonb,
  'CA',
  'Artist Brand Development',
  false
) ON CONFLICT DO NOTHING;

-- Project 64: Shaneen Megji
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'Shaneen Megji',
  'Built personal brand and flagship offer from the ground up. Helped launch coaching business with complete brand development, positioning strategy, and offer creation for sustainable business growth.',
  '/images/portfolio/shaneen-megji.jpg',
  ARRAY['Personal Brand', 'Coaching', 'Offer Development', 'Brand Strategy', 'Business Launch'],
  'https://www.shaneenmegji.com',
  'Shaneen Megji',
  'Coaching / Personal Brand',
  false,
  'published',
  65,
  'creative-professional',
  ARRAY['/images/portfolio/shaneen-megji.jpg', '/images/portfolio/shaneen-megji-2.jpg', '/images/portfolio/shaneen-megji-3.jpg'],
  ARRAY['Personal Brand Development', 'Offer Creation', 'Business Launch', 'Positioning Strategy'],
  ARRAY['Complete brand build', 'Flagship offer development', 'Coaching business launch', 'Sustainable growth strategy'],
  'Building a personal brand and coaching business from scratch with a compelling flagship offer and clear market positioning.',
  'Developed complete personal brand identity, created flagship coaching offer, and implemented positioning strategy for successful business launch.',
  ARRAY['Built personal brand from ground up', 'Launched flagship coaching offer', 'Established coaching business', 'Created sustainable growth foundation'],
  '{"frontend": "Not applicable", "backend": "Brand consulting"}'::jsonb,
  'CA',
  'Personal Brand Development',
  false
) ON CONFLICT DO NOTHING;

-- Project 65: Performance Window Cleaning
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'Performance Window Cleaning',
  'Built from the ground up with a 21-year-old founder. Developed brand, business systems, and growth strategy that scaled the company to approximately $3M/year in revenue.',
  '/images/portfolio/performance-window-cleaning.jpg',
  ARRAY['Service Business', 'Business Development', 'Brand Building', 'Growth Strategy', 'Startup'],
  'https://performancewindowcleaning.com',
  'Performance Window Cleaning',
  'Service Business / Commercial Cleaning',
  true,
  'published',
  66,
  'creative-professional',
  ARRAY['/images/portfolio/performance-window-cleaning.jpg', '/images/portfolio/performance-window-cleaning-2.jpg', '/images/portfolio/performance-window-cleaning-3.jpg'],
  ARRAY['Business Development', 'Brand Building', 'Growth Strategy', 'Systems Development'],
  ARRAY['Ground-up business build', 'Young founder mentorship', '$3M annual revenue', 'Scalable systems'],
  'Building a service business from scratch with a young founder while developing scalable systems for significant revenue growth.',
  'Developed comprehensive brand, business systems, and growth strategy working closely with the 21-year-old founder to scale the company.',
  ARRAY['Built business from ground up', 'Scaled to ~$3M/year revenue', 'Developed scalable systems', 'Mentored young founder to success'],
  '{"frontend": "Not applicable", "backend": "Business consulting"}'::jsonb,
  'CA',
  'Business Development / Scaling',
  false
) ON CONFLICT DO NOTHING;

-- Project 66: We Scale It
INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order, brand_id, gallery_images, services, key_features, challenge, solution, results, tech_stack, origin, project_type, preview_enabled)
VALUES (
  'We Scale It',
  'Worked with CEO Charles Lecasse to redesign the entire business model. Transformed the company to now generate approximately $50K/month, serving French-owned businesses with scalable growth solutions.',
  '/images/portfolio/we-scale-it.jpg',
  ARRAY['Business Consulting', 'Business Model Design', 'Revenue Growth', 'French Market', 'Scaling'],
  'https://wescaleit.ca',
  'We Scale It',
  'Business Consulting / Growth',
  false,
  'published',
  67,
  'creative-professional',
  ARRAY['/images/portfolio/we-scale-it.jpg', '/images/portfolio/we-scale-it-2.jpg', '/images/portfolio/we-scale-it-3.jpg'],
  ARRAY['Business Model Redesign', 'Revenue Strategy', 'Market Positioning', 'Growth Consulting'],
  ARRAY['Complete business model redesign', '$50K/month revenue', 'French market focus', 'Scalable solutions'],
  'Redesigning a business model to achieve significant monthly revenue while serving the French-Canadian business market.',
  'Partnered with CEO to completely redesign the business model, develop new revenue strategies, and position the company for the French-owned business market.',
  ARRAY['Redesigned entire business model', 'Generating ~$50K/month', 'Established French market presence', 'Built scalable growth solutions'],
  '{"frontend": "Not applicable", "backend": "Business consulting"}'::jsonb,
  'CA',
  'Business Model Transformation',
  false
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- Add brand_categories table for future use
-- ============================================================================

CREATE TABLE IF NOT EXISTS brand_categories (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

INSERT INTO brand_categories (id, name, description)
VALUES
  ('ai-technology', 'AI & Technology', 'Cutting-edge AI and technology solutions'),
  ('hospitality', 'Hospitality', 'Hotels, restaurants, and hospitality management'),
  ('healthcare-wellness', 'Healthcare & Wellness', 'Healthcare, wellness, and healing services'),
  ('tourism-travel', 'Tourism & Travel', 'Travel, tourism, and destination experiences'),
  ('real-estate-energy', 'Real Estate & Energy', 'Property development and renewable energy'),
  ('creative-professional', 'Creative & Professional', 'Creative studios and professional services'),
  ('community-social', 'Community & Social', 'Community platforms and social initiatives')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- ============================================================================
-- Summary
-- ============================================================================
-- This migration:
-- 1. Updates all 48 existing projects with enhanced fields (brand_id, gallery_images,
--    services, key_features, challenge, solution, results, tech_stack, origin,
--    project_type, preview_enabled)
-- 2. Inserts 19 new projects (IDs 49-67) that were in the JSON file but not in DB
-- 3. Creates a brand_categories table for future admin management
-- ============================================================================
