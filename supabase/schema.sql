-- ============================================================================
-- Light Brand Consulting - Portfolio Projects Schema
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Projects Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  case_study_url TEXT,
  client_name VARCHAR(255),
  industry VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- Indexes
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);

-- ============================================================================
-- Trigger for updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published projects
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  USING (status = 'published');

-- Policy: Authenticated users can do everything
CREATE POLICY "Authenticated users have full access"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- Sample Data - Portfolio Master List (48 Projects)
-- ============================================================================

INSERT INTO projects (title, description, image_url, tags, case_study_url, client_name, industry, featured, status, sort_order)
VALUES
  (
    'Light Brand Consulting',
    'Consulting service designing AI intelligence systems for businesses. Features AI Readiness Assessment, newsletter integration, testimonials, and efficiency metrics. A comprehensive platform for AI business transformation consulting.',
    '/images/portfolio/light-brand-consulting.jpg',
    ARRAY['AI Diagnostics', 'Business AI Engines', 'Founder Leverage', 'Next.js', 'React'],
    'https://light-brand-consulting.vercel.app/',
    'Light Brand Consulting',
    'AI Business Transformation',
    true,
    'published',
    1
  ),
  (
    'Iboga Life',
    'Personal healing site focused on sacred healing experiences with Iboga. Features practitioner bio, session information, and retreat details for those seeking plant medicine healing journeys.',
    '/images/portfolio/iboga-life.jpg',
    ARRAY['Healing', 'Plant Medicine', 'Retreats', 'Next.js', 'React'],
    'https://iboga-life.vercel.app/',
    'Iboga Life',
    'Sacred Healing / Plant Medicine',
    false,
    'published',
    2
  ),
  (
    'NeuroTracker X',
    'Platform for cognitive training to enhance human performance. Features three demo editions: ELITE, CLINICAL, and HUMAN, providing comprehensive cognitive enhancement solutions for different user needs.',
    '/images/portfolio/neurotracker-x.jpg',
    ARRAY['Cognitive Training', 'Wellness', 'Performance', 'Next.js', 'React'],
    'https://ntx8.vercel.app/',
    'NeuroTracker X',
    'Cognitive Enhancement / Wellness',
    true,
    'published',
    3
  ),
  (
    'Light Field Institute',
    'Digital ecosystem bridging intuitive wisdom and consciousness education. Features aura readings, energy sessions, courses, session packages, weekly field notes, and Practice/Education sections.',
    '/images/portfolio/light-field-institute.jpg',
    ARRAY['Biofield Research', 'Consciousness', 'Education', 'Courses', 'React'],
    'https://www.lightfield.institute/',
    'Light Field Institute',
    'Biofield Research / Consciousness',
    true,
    'published',
    4
  ),
  (
    'Mindflow Vision',
    'Technical whitepaper site presenting the Mindflow vision and technical documentation. Clean, professional presentation of complex technical concepts for the Mindflow platform.',
    '/images/portfolio/mindflow-vision.jpg',
    ARRAY['Technical', 'Whitepaper', 'Documentation', 'Next.js', 'React'],
    'https://mindflow-vision.vercel.app/',
    'Mindflow',
    'Technical / Vision Platform',
    false,
    'published',
    5
  ),
  (
    'The Planetary Party',
    'Global web of bioregional networks for celebration and regenerative action. Features protocols, tools, Flow Funds, guilds, bioregional dashboards, Five-Phase Protocol, and node exploration.',
    '/images/portfolio/planetary-party.jpg',
    ARRAY['Regenerative', 'Bioregional', 'Community', 'Next.js', 'React'],
    'https://planetary-party.vercel.app/',
    'The Planetary Party',
    'Regenerative Action / Bioregional',
    true,
    'published',
    6
  ),
  (
    'Love Token',
    'World''s first Love Economy experiment with meditation and intention. Features guided meditations, subscriptions, credit redemption, meditation tracking, credit circulation metrics, and impact stories.',
    '/images/portfolio/love-token.jpg',
    ARRAY['Circular Economy', 'Meditation', 'Social', 'Next.js', 'React'],
    'https://love-token.vercel.app/',
    'Love Token',
    'Love Economy / Social Experiment',
    false,
    'published',
    7
  ),
  (
    'Lightwaves Energy',
    'Solar calculator and energy optimization solutions for renewable energy. Features Solar Calculator and Energy Optimization tools to help customers understand their solar potential.',
    '/images/portfolio/lightwaves-energy.jpg',
    ARRAY['Renewable Energy', 'Solar', 'Calculator', 'Next.js', 'React'],
    'https://lightwaves.energy',
    'Lightwaves Energy',
    'Renewable Energy',
    false,
    'published',
    9
  ),
  (
    'Downtown Park',
    'Premium urban development project with modern residential spaces. Features brand identity, website development, 3D visualizations, property listings, virtual tours, and investment information with property management system.',
    '/images/portfolio/downtown-park.jpg',
    ARRAY['Real Estate', 'Property', '3D Visualization', 'React', 'CMS'],
    'https://www.downtown-park.com/',
    'Downtown Park',
    'Real Estate Development',
    true,
    'published',
    10
  ),
  (
    'Skyzor Productions',
    'Professional video production company for commercial content. Brand identity, portfolio website, and video player integration. Features video portfolio, client testimonials, and production services showcase.',
    '/images/portfolio/skyzor-productions.jpg',
    ARRAY['Video Production', 'Portfolio', 'Media', 'Video Streaming'],
    'https://www.skyzorproductions.com/',
    'Skyzor Productions',
    'Video Production / Media',
    false,
    'published',
    11
  ),
  (
    'AI Tools',
    'Comprehensive AI tools platform offering ML capabilities. Full-stack development with AI integration and API development. Features AI tool collection, API integrations, and user dashboard.',
    '/images/portfolio/ai-tools.jpg',
    ARRAY['AI', 'Machine Learning', 'SaaS', 'Next.js', 'React'],
    'https://aitools-theta.vercel.app/',
    'AI Tools',
    'Artificial Intelligence / SaaS',
    true,
    'published',
    12
  ),
  (
    'Growth Mastery AI',
    'AI-powered business growth and analytics platform. Features growth analytics, AI recommendations, and business insights with machine learning models and dashboard development.',
    '/images/portfolio/growth-mastery-ai.jpg',
    ARRAY['Business Intelligence', 'AI', 'Analytics', 'ML', 'Dashboard'],
    'https://growthmastery.ai/',
    'Growth Mastery AI',
    'Business Intelligence / AI',
    true,
    'published',
    13
  ),
  (
    'Anemi Pool Reservation',
    'Advanced pool and amenity reservation system for luxury hotels. Custom reservation system with hotel integration. Features real-time reservations, availability calendar, and guest management.',
    '/images/portfolio/anemi-pool.jpg',
    ARRAY['Hotel Management', 'Reservations', 'Real-time', 'PMS Integration'],
    'https://pool.anemihotel.com/',
    'Anemi Hotel',
    'Hotel Management / Reservations',
    false,
    'published',
    14
  ),
  (
    'Anemi Event Management',
    'Comprehensive event management dashboard for hotel operations. Features event planning, resource management, and booking coordination with booking integration.',
    '/images/portfolio/anemi-events.jpg',
    ARRAY['Event Management', 'Dashboard', 'Hospitality', 'CMS'],
    'https://events.anemihotel.com/dashboard',
    'Anemi Hotel',
    'Event Management / Hospitality',
    false,
    'published',
    15
  ),
  (
    'MelodyGram AI',
    'AI-powered music creation and analysis platform. Music AI development with audio processing and UI design. Features music generation, audio analysis, and creative tools.',
    '/images/portfolio/melodygram-ai.jpg',
    ARRAY['Music AI', 'Audio Processing', 'Creative Tools', 'AI Generation'],
    'https://melodygram.vercel.app/',
    'MelodyGram',
    'Music Technology / AI',
    true,
    'published',
    16
  ),
  (
    'MW Crypto Monitor',
    'Real-time cryptocurrency monitoring and analytics dashboard. Financial dashboard with real-time data integration. Features price monitoring, portfolio tracking, and market analytics.',
    '/images/portfolio/mw-crypto.jpg',
    ARRAY['Cryptocurrency', 'FinTech', 'Real-time', 'React', 'Dashboard'],
    'https://mw-dash.vercel.app/',
    'MW Crypto',
    'Cryptocurrency / FinTech',
    false,
    'published',
    17
  ),
  (
    'Genius AI',
    'AI-powered learning and knowledge platform. AI development with educational tools and interactive learning. Features AI tutoring, knowledge base, and interactive learning modules.',
    '/images/portfolio/genius-ai.jpg',
    ARRAY['AI', 'Education', 'Learning', 'Interactive', 'ML Integration'],
    'https://geniusai8.vercel.app/',
    'Genius AI',
    'Artificial Intelligence / Education',
    true,
    'published',
    18
  ),
  (
    'Busy Bees IPC',
    'Intelligent project coordination and management platform with POS capabilities. Project management system with workflow automation. Features project tracking, team coordination, and automated workflows.',
    '/images/portfolio/busy-bees.jpg',
    ARRAY['Project Management', 'POS', 'Automation', 'Workflow'],
    'https://busy-bees8.vercel.app',
    'Busy Bees',
    'Business Management / Productivity',
    false,
    'published',
    19
  ),
  (
    'Piedra Lounge',
    'Upscale lounge and dining with Mediterranean influences. Brand identity, website design, and menu design. Features menu display, reservation booking, and event information.',
    '/images/portfolio/piedra-lounge.jpg',
    ARRAY['Restaurant', 'Hospitality', 'Menu Design', 'Reservations'],
    'https://piedralounge.com/',
    'Piedra Lounge',
    'Hospitality / Restaurant',
    false,
    'published',
    20
  ),
  (
    'Baracas Lounge',
    'Premium nightlife venue and cocktail lounge. Brand development, website creation, and promotional materials. Features event calendar, photo galleries, and VIP booking.',
    '/images/portfolio/baracas-lounge.jpg',
    ARRAY['Nightlife', 'Events', 'Social Media', 'Event Management'],
    'https://www.baracaslounge.com/',
    'Baracas Lounge',
    'Hospitality / Nightlife',
    false,
    'published',
    21
  ),
  (
    'Loft Club',
    'Exclusive private club and event venue. Brand identity, web development, and membership portal. Features membership portal, event bookings, and exclusive content with secure login areas.',
    '/images/portfolio/loft-club.jpg',
    ARRAY['Private Club', 'Membership', 'Events', 'Secure Portal'],
    'https://loftclub.co/',
    'Loft Club',
    'Hospitality / Private Club',
    false,
    'published',
    22
  ),
  (
    'New Earth Development',
    'Sustainable development organization focused on conservation. Brand design, website development, and content strategy. Features project showcases, sustainability metrics, and donation portal.',
    '/images/portfolio/new-earth-development.jpg',
    ARRAY['Non-Profit', 'Sustainability', 'Conservation', 'Donations'],
    'https://newearthdevelopment.org',
    'New Earth Development',
    'Sustainable Development',
    true,
    'published',
    23
  ),
  (
    'Boho Bones (NFT)',
    'Unique NFT collection featuring artistic bone-themed digital artwork. Digital art creation, NFT development, and blockchain integration. Features NFT marketplace listing, rarity system, and community features.',
    '/images/portfolio/boho-bones.jpg',
    ARRAY['NFT', 'Digital Art', 'Blockchain', 'Ethereum', 'OpenSea'],
    'https://opensea.io/collection/bohobones',
    'Boho Bones',
    'Digital Art / Blockchain / NFT',
    false,
    'published',
    24
  ),
  (
    'Auracle',
    'AI-powered prediction and insights platform. Predictive analytics, data visualization, and AI integration. Features predictive insights, data analysis, and forecasting tools with machine learning models.',
    '/images/portfolio/auracle.jpg',
    ARRAY['AI', 'Predictive Analytics', 'Data Visualization', 'ML'],
    'https://auracle8.vercel.app/',
    'Auracle',
    'AI / Predictive Analytics',
    true,
    'published',
    25
  ),
  (
    'Oracle Studios',
    'Primary digital agency platform showcasing creative services. Complete brand identity, web development, and digital strategy. Features portfolio showcase, service offerings, and client testimonials.',
    '/images/portfolio/oracle-studios.jpg',
    ARRAY['Digital Agency', 'Creative', 'Branding', 'React', 'Next.js'],
    'https://oraclestudios.io',
    'Oracle Studios',
    'Digital Agency / Creative Studio',
    true,
    'published',
    26
  ),
  (
    'Vector Home Robot',
    'Advanced home automation robot with AI capabilities. Product branding, landing page design, and documentation. Features product demonstrations, technical specs, and pre-order system.',
    '/images/portfolio/vector-home-robot.jpg',
    ARRAY['Smart Home', 'Robotics', 'AI', 'Product Landing', 'Webflow'],
    'https://vector-home-robot.webflow.io/',
    'Vector',
    'Smart Home Technology / Robotics',
    false,
    'published',
    27
  ),
  (
    'Cyprus Swim Series',
    'Premier swimming competition series in Cyprus. Event branding, website development, and registration system. Features event registration, results display, and swimmer profiles.',
    '/images/portfolio/cyprus-swim.jpg',
    ARRAY['Sports Events', 'Registration', 'Results', 'Event Management'],
    'https://cyprusswimseries.com/',
    'Cyprus Swim Series',
    'Sports Events / Swimming',
    false,
    'published',
    28
  ),
  (
    'Cyprus Tours',
    'Comprehensive Cyprus tour and travel experience platform. Travel website development, booking system, and tour management. Features tour bookings, itinerary planning, and customer reviews.',
    '/images/portfolio/cyprus-tours.jpg',
    ARRAY['Tourism', 'Travel', 'Booking System', 'CMS'],
    'https://www.cyprustours.eu/',
    'Cyprus Tours',
    'Travel & Tourism',
    false,
    'published',
    29
  ),
  (
    'Dermlux Clinics',
    'Advanced dermatology clinic with cutting-edge treatments. Medical website development and appointment system. Features treatment information, appointment booking, and patient resources.',
    '/images/portfolio/dermlux-clinics.jpg',
    ARRAY['Healthcare', 'Dermatology', 'Appointments', 'Patient Portal'],
    'https://www.dermluxclinic.com/',
    'Dermlux Clinics',
    'Healthcare / Dermatology',
    false,
    'published',
    30
  ),
  (
    'Korakides Law',
    'Professional law firm specializing in comprehensive legal services. Legal website development, case management, and branding. Features legal services showcase, client portal, and consultation booking.',
    '/images/portfolio/korakides-law.jpg',
    ARRAY['Legal Services', 'Client Portal', 'Consultations', 'Webflow'],
    'https://epaminondas-korakides-llc.webflow.io/',
    'Korakides Law',
    'Legal Services',
    false,
    'published',
    31
  ),
  (
    'KK Hospitality',
    'Professional hospitality management and consulting services. Corporate website, service portfolio, and client management. Features service showcase, client testimonials, and project portfolios.',
    '/images/portfolio/kk-hospitality.jpg',
    ARRAY['Hospitality Management', 'Consulting', 'Client Portals', 'Webflow'],
    'https://kk-hospitality.webflow.io/',
    'KK Hospitality',
    'Hospitality Management',
    false,
    'published',
    32
  ),
  (
    'Sodap Cyprus',
    'Leading food processing and manufacturing company in Cyprus. Corporate website redesign, product catalogs, and B2B portal. Features product catalogs, company information, and B2B services.',
    '/images/portfolio/sodap-cyprus.jpg',
    ARRAY['Manufacturing', 'Food Processing', 'B2B', 'Industrial CMS'],
    'https://www.sodap.com.cy/',
    'Sodap',
    'Manufacturing / Food Processing',
    false,
    'published',
    33
  ),
  (
    'Dr. Nutri',
    'Professional nutrition and dietary consultation platform. Healthcare platform, consultation booking, and nutrition tools. Features nutrition plans, consultation booking, and health tracking.',
    '/images/portfolio/dr-nutri.jpg',
    ARRAY['Healthcare', 'Nutrition', 'Consultations', 'Health Tracking'],
    'https://dr-nutri.com',
    'Dr. Nutri',
    'Healthcare / Nutrition',
    false,
    'published',
    34
  ),
  (
    'Pafos Zoo',
    'Premier wildlife park and conservation center in Cyprus. Tourism website, ticketing system, and educational content. Features animal exhibits, ticket booking, and educational programs.',
    '/images/portfolio/pafos-zoo.jpg',
    ARRAY['Tourism', 'Wildlife', 'Ticketing', 'Educational'],
    'https://www.pafoszoo.com/',
    'Pafos Zoo',
    'Entertainment / Wildlife Tourism',
    false,
    'published',
    35
  ),
  (
    'Cyprus Athletic Tourism',
    'Athletic tourism platform promoting Cyprus as sports destination. Tourism platform, destination marketing, and booking systems. Features destination guides, activity booking, and athlete resources.',
    '/images/portfolio/cyprus-athletic.jpg',
    ARRAY['Sports Tourism', 'Travel', 'Booking', 'Destination Marketing'],
    'https://www.cyprusathletictourism.com/',
    'Cyprus Athletic Tourism',
    'Sports Tourism / Travel',
    false,
    'published',
    36
  ),
  (
    'The Palmiers',
    'Luxury serviced apartments in Paphos for holidays. Features sea view apartments, pool view units, and executive penthouses with premium amenities.',
    '/images/portfolio/palmiers.jpg',
    ARRAY['Luxury Apartments', 'Hospitality', 'Accommodation', 'React', 'Next.js'],
    'https://www.thepalmiers.com/',
    'The Palmiers',
    'Hospitality (Luxury Apartments)',
    false,
    'published',
    37
  ),
  (
    'Waterside',
    'Stylish self-catering studios and apartments in Paphos. Features deluxe studios, suites, rooftop seating, and stunning sea views.',
    '/images/portfolio/waterside.jpg',
    ARRAY['Self-Catering', 'Hospitality', 'Accommodation', 'React', 'Next.js'],
    'https://www.waterside.cy/',
    'Waterside',
    'Hospitality (Self-Catering)',
    false,
    'published',
    38
  ),
  (
    'Silver Park',
    'Spacious self-catering apartments in Paphos Harbour. Boutique residences featuring contemporary apartments, pool area, and lush greenery.',
    '/images/portfolio/silver-park.jpg',
    ARRAY['Boutique Residences', 'Hospitality', 'Accommodation', 'React', 'Next.js'],
    'https://www.silver-park.cy/',
    'Silver Park',
    'Hospitality (Accommodation)',
    false,
    'published',
    39
  ),
  (
    'Loft Centrale',
    'Cozy cottage-style holiday apartments by Paphos Harbour. Features studios, suites, special offers, and booking system for memorable stays.',
    '/images/portfolio/loft-centrale.jpg',
    ARRAY['Holiday Apartments', 'Hospitality', 'Booking', 'React', 'Next.js'],
    'https://www.loft-centrale.cy/',
    'Loft Centrale',
    'Hospitality (Holiday)',
    false,
    'published',
    40
  ),
  (
    'Averde',
    'Private estate in Larnaca for weddings and milestone celebrations. Features Mediterranean gardens, glass ballroom, 10 rooms/suites, event planning, catering connections, and carbon offsetting.',
    '/images/portfolio/averde.jpg',
    ARRAY['Events', 'Weddings', 'Hospitality', 'Venue', 'React', 'Next.js'],
    'https://www.averde.cy/',
    'Averde',
    'Events and Hospitality',
    true,
    'published',
    41
  ),
  (
    'Mito Solar',
    'Complete solar solutions for Cyprus homes and businesses. Features high-efficiency panels, EV chargers, battery storage, solar installation, and cleaning services.',
    '/images/portfolio/mito-solar.jpg',
    ARRAY['Solar Energy', 'Renewable', 'EV Charging', 'Battery Storage', 'React', 'Next.js'],
    'https://www.mitosolar.cy/',
    'Mito Solar',
    'Renewable Energy (Solar)',
    false,
    'published',
    42
  ),
  (
    'Linea',
    'Strategic consulting platform showcasing professional services and business solutions. Modern design with clean user interface.',
    '/images/portfolio/linea.jpg',
    ARRAY['Consulting', 'Strategy', 'React', 'Next.js'],
    'https://linea.strategioconsulting.com/',
    'Strategio Consulting',
    'Business Consulting',
    false,
    'published',
    43
  ),
  (
    'SMS Reminder',
    'SMS reminder and notification management platform. Streamlined communication solution for businesses to stay connected with their customers.',
    '/images/portfolio/sms-reminder.jpg',
    ARRAY['SMS', 'Notifications', 'Communication', 'React', 'Next.js'],
    'https://sms-reminder-teal.vercel.app/',
    'SMS Reminder',
    'Communication Technology',
    false,
    'published',
    44
  ),
  (
    'EventPro',
    'Software solution for boutique hotels to automate event management. Features instant quotes, automated follow-ups, and document generation for seamless event coordination.',
    '/images/portfolio/eventpro.jpg',
    ARRAY['Event Management', 'Automation', 'Hospitality', 'SaaS', 'React', 'Next.js'],
    'https://events.anemihotel.com/landing',
    'Anemi Hotel',
    'Hospitality (Boutique Hotels)',
    true,
    'published',
    45
  ),
  (
    'ELYST Business Consulting',
    'Consulting firm for HR and leadership development. Features HR consulting, training, and leadership coaching. Proven expertise with human-centered approach and ANAD certification.',
    '/images/portfolio/elyst-consulting.jpg',
    ARRAY['HR Consulting', 'Leadership', 'Training', 'Business', 'React', 'Next.js'],
    'https://elystconsultingcy.com/',
    'ELYST Consulting',
    'Business / HR Consulting',
    false,
    'published',
    46
  ),
  (
    'Nickoloui',
    'Multi-disciplinary artist portfolio with visual aesthetics focus. Features filmography portfolio, software tools showcase, and contact information for creative collaborations.',
    '/images/portfolio/nickoloui.jpg',
    ARRAY['Visual Arts', 'Film', 'Portfolio', 'Creative', 'React', 'Next.js'],
    'https://www.nickoloui.com/',
    'Nickoloui',
    'Visual Arts and Film',
    false,
    'published',
    47
  ),
  (
    'Med Yachts',
    'Mediterranean yacht charter and luxury sailing experiences. Premium yacht services showcasing fleet options and booking capabilities for unforgettable sea adventures.',
    '/images/portfolio/med-yachts.jpg',
    ARRAY['Yachts', 'Luxury', 'Charter', 'Tourism', 'React', 'Next.js'],
    'https://medyachts.vercel.app/',
    'Med Yachts',
    'Yacht Charter / Luxury Tourism',
    true,
    'published',
    48
  )
ON CONFLICT DO NOTHING;
