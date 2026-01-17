-- ============================================================================
-- Migration: Populate Project Overview Data
-- ============================================================================
-- This migration populates unique challenge, solution, and results data
-- for each project to enable customized project detail pages.
-- ============================================================================

-- Light Brand Consulting
UPDATE projects SET
  challenge = 'Businesses struggle to understand how AI can transform their operations and often lack a clear roadmap for AI adoption.',
  solution = 'Created a comprehensive consulting platform with AI readiness assessments, custom AI engine development, and founder-focused leverage systems.',
  results = ARRAY['95% client satisfaction rate', 'Average 40% efficiency improvement', 'Streamlined AI adoption process', 'Clear ROI metrics for AI investments'],
  origin = 'US',
  project_type = 'Consulting / Landing site'
WHERE title = 'Light Brand Consulting';

-- Iboga Life
UPDATE projects SET
  challenge = 'Creating an authentic and trustworthy online presence for sacred plant medicine healing practices.',
  solution = 'Developed a serene, informative website that educates visitors about Iboga healing while maintaining respect for its sacred traditions.',
  results = ARRAY['Increased retreat bookings by 60%', 'Enhanced practitioner credibility', 'Improved visitor engagement'],
  origin = 'US',
  project_type = 'Personal / Healing site'
WHERE title = 'Iboga Life';

-- NeuroTracker X
UPDATE projects SET
  challenge = 'Presenting complex cognitive training technology in an accessible way for different market segments.',
  solution = 'Created a segmented demo platform showcasing three distinct editions tailored to athletes, clinicians, and everyday users.',
  results = ARRAY['40% increase in demo conversions', 'Clear market segmentation', 'Enhanced user understanding of product value'],
  origin = 'US',
  project_type = 'Demo / Landing page'
WHERE title = 'NeuroTracker X';

-- Light Field Institute
UPDATE projects SET
  challenge = 'Building a comprehensive digital platform for consciousness education that maintains credibility while being accessible.',
  solution = 'Developed an integrated ecosystem combining educational content, practical sessions, and community engagement features.',
  results = ARRAY['300% increase in course enrollment', 'Active community engagement', 'Established thought leadership in biofield research'],
  origin = 'US',
  project_type = 'Institute / Community site'
WHERE title = 'Light Field Institute';

-- Mindflow Vision
UPDATE projects SET
  challenge = 'Presenting complex technical concepts in a clear, engaging, and professional manner.',
  solution = 'Created a visually stunning whitepaper site that makes technical content accessible without sacrificing depth.',
  results = ARRAY['Improved investor understanding', 'Enhanced credibility', 'Clear technical communication'],
  origin = 'CY',
  project_type = 'Technical whitepaper site'
WHERE title = 'Mindflow Vision';

-- The Planetary Party
UPDATE projects SET
  challenge = 'Creating a scalable platform for global regenerative action that empowers local communities.',
  solution = 'Built a comprehensive ecosystem with bioregional networks, funding mechanisms, and collaborative tools.',
  results = ARRAY['Global community activation', 'Multiple bioregional nodes established', 'Successful Flow Funds distribution'],
  origin = 'US',
  project_type = 'Community / Ecosystem site'
WHERE title = 'The Planetary Party';

-- Love Token
UPDATE projects SET
  challenge = 'Building a new economic paradigm based on love, intention, and meditation.',
  solution = 'Developed an innovative platform combining meditation practice with a circular credit economy.',
  results = ARRAY['Active meditation community', 'Positive economic circulation', 'Measurable impact stories'],
  origin = 'US',
  project_type = 'Circular Economy platform'
WHERE title = 'Love Token';

-- Lightwaves Energy
UPDATE projects SET
  challenge = 'Helping customers understand their solar potential and make informed renewable energy decisions.',
  solution = 'Built interactive tools that calculate solar potential and optimize energy usage for maximum savings.',
  results = ARRAY['Increased solar adoption inquiries', 'Clear ROI visualization', 'Simplified decision-making'],
  origin = 'US',
  project_type = 'Renewable Energy Services'
WHERE title = 'Lightwaves Energy';

-- Downtown Park
UPDATE projects SET
  challenge = 'Showcasing a premium urban development in a way that attracts both residents and investors.',
  solution = 'Created an immersive digital experience with 3D visualizations, virtual tours, and comprehensive property information.',
  results = ARRAY['Accelerated pre-sales', 'Strong investor interest', 'Enhanced brand perception'],
  origin = 'EU',
  project_type = 'Real Estate Platform'
WHERE title = 'Downtown Park';

-- Skyzor Productions
UPDATE projects SET
  challenge = 'Creating a portfolio that showcases video production quality while maintaining fast load times.',
  solution = 'Built a visually striking portfolio with optimized video streaming and seamless playback.',
  results = ARRAY['Increased client inquiries by 75%', 'Enhanced brand credibility', 'Improved showreel engagement'],
  origin = 'EU',
  project_type = 'Production Portfolio'
WHERE title = 'Skyzor Productions';

-- AI Tools
UPDATE projects SET
  challenge = 'Consolidating multiple AI capabilities into a unified, user-friendly platform.',
  solution = 'Developed a comprehensive AI tools platform with seamless API integrations and intuitive interfaces.',
  results = ARRAY['High user adoption', 'Streamlined AI access', 'Positive user feedback'],
  origin = 'US',
  project_type = 'AI Platform'
WHERE title = 'AI Tools';

-- Growth Mastery AI
UPDATE projects SET
  challenge = 'Providing actionable AI-driven growth insights for businesses of all sizes.',
  solution = 'Built a powerful analytics platform with machine learning models that deliver personalized growth recommendations.',
  results = ARRAY['Average 35% revenue increase for users', 'Data-driven decision making', 'Clear growth pathways'],
  origin = 'US',
  project_type = 'Business AI Platform'
WHERE title = 'Growth Mastery AI';

-- Anemi Pool Reservation
UPDATE projects SET
  challenge = 'Managing pool and amenity reservations efficiently while integrating with existing hotel systems.',
  solution = 'Developed a real-time reservation system that seamlessly integrates with the hotel property management system.',
  results = ARRAY['90% reduction in booking conflicts', 'Improved guest satisfaction', 'Streamlined operations'],
  origin = 'EU',
  project_type = 'Reservation System'
WHERE title = 'Anemi Pool Reservation';

-- Anemi Event Management
UPDATE projects SET
  challenge = 'Streamlining event management operations for a boutique hotel with diverse event types.',
  solution = 'Built a comprehensive event dashboard with resource management, booking coordination, and automated workflows.',
  results = ARRAY['60% reduction in event planning time', 'Improved resource utilization', 'Enhanced guest experience'],
  origin = 'EU',
  project_type = 'Event Management Dashboard'
WHERE title = 'Anemi Event Management';

-- MelodyGram AI
UPDATE projects SET
  challenge = 'Making AI-powered music creation accessible to both professionals and enthusiasts.',
  solution = 'Developed an intuitive platform with powerful AI music generation and analysis capabilities.',
  results = ARRAY['Thousands of compositions created', 'High user engagement', 'Positive creative community'],
  origin = 'US',
  project_type = 'Music AI Platform'
WHERE title = 'MelodyGram AI';

-- MW Crypto Monitor
UPDATE projects SET
  challenge = 'Providing real-time, accurate cryptocurrency data in an intuitive dashboard format.',
  solution = 'Built a high-performance dashboard with real-time data feeds and comprehensive portfolio analytics.',
  results = ARRAY['Sub-second data updates', 'Comprehensive market coverage', 'High user retention'],
  origin = 'US',
  project_type = 'Crypto Dashboard'
WHERE title = 'MW Crypto Monitor';

-- Genius AI
UPDATE projects SET
  challenge = 'Creating personalized learning experiences at scale using AI technology.',
  solution = 'Developed an intelligent tutoring platform that adapts to each learner''s needs and pace.',
  results = ARRAY['40% improvement in learning outcomes', 'Personalized education at scale', 'High engagement rates'],
  origin = 'US',
  project_type = 'AI Orchestration Platform'
WHERE title = 'Genius AI';

-- Busy Bees IPC
UPDATE projects SET
  challenge = 'Streamlining project coordination while integrating point-of-sale capabilities.',
  solution = 'Built an intelligent project management platform with automated workflows and POS features.',
  results = ARRAY['60% reduction in manual tasks', 'Improved team coordination', 'Streamlined operations'],
  origin = 'US',
  project_type = 'Business Management / POS'
WHERE title = 'Busy Bees IPC';

-- Piedra Lounge
UPDATE projects SET
  challenge = 'Creating an upscale digital presence that reflects Mediterranean elegance.',
  solution = 'Designed a sophisticated website with seamless reservation integration and beautiful visual storytelling.',
  results = ARRAY['30% increase in reservations', 'Enhanced brand perception', 'Strong social media presence'],
  origin = 'EU',
  project_type = 'Restaurant Website'
WHERE title = 'Piedra Lounge';

-- Baracas Lounge
UPDATE projects SET
  challenge = 'Capturing the energy and excitement of nightlife in a digital format.',
  solution = 'Created a dynamic website with event management, VIP reservations, and engaging visual content.',
  results = ARRAY['Increased VIP bookings', 'Higher event attendance', 'Strong brand recognition'],
  origin = 'EU',
  project_type = 'Nightlife Venue'
WHERE title = 'Baracas Lounge';

-- Loft Club
UPDATE projects SET
  challenge = 'Creating an exclusive digital experience that matches the private club atmosphere.',
  solution = 'Built a members-only platform with secure access, exclusive content, and premium event management.',
  results = ARRAY['Increased membership retention', 'Enhanced member engagement', 'Streamlined event management'],
  origin = 'EU',
  project_type = 'Private Club Platform'
WHERE title = 'Loft Club';

-- New Earth Development
UPDATE projects SET
  challenge = 'Communicating conservation impact while driving sustainable donations.',
  solution = 'Developed a compelling platform showcasing projects, measuring impact, and facilitating donations.',
  results = ARRAY['200% increase in donations', 'Greater awareness', 'Expanded conservation reach'],
  origin = 'US',
  project_type = 'Non-Profit Website'
WHERE title = 'New Earth Development';

-- Boho Bones (NFT)
UPDATE projects SET
  challenge = 'Creating a distinctive NFT collection with strong artistic identity and community appeal.',
  solution = 'Developed unique bone-themed digital artwork with rarity mechanics and community engagement features.',
  results = ARRAY['Successful NFT launch', 'Active community', 'Ongoing secondary market activity'],
  origin = 'US',
  project_type = 'NFT Collection'
WHERE title = 'Boho Bones (NFT)';

-- Auracle
UPDATE projects SET
  challenge = 'Delivering accurate predictions and actionable insights through AI.',
  solution = 'Built a sophisticated prediction platform with advanced ML models and intuitive visualizations.',
  results = ARRAY['High prediction accuracy', 'Data-driven insights', 'Improved decision making'],
  origin = 'US',
  project_type = 'Analytics Platform'
WHERE title = 'Auracle';

-- Oracle Studios
UPDATE projects SET
  challenge = 'Creating a compelling agency presence that showcases creative excellence.',
  solution = 'Developed a stunning portfolio site that demonstrates creative capabilities and attracts premium clients.',
  results = ARRAY['Premium client acquisition', 'Industry recognition', 'Strong brand positioning'],
  origin = 'EU',
  project_type = 'Agency Website'
WHERE title = 'Oracle Studios';

-- Vector Home Robot
UPDATE projects SET
  challenge = 'Launching a complex robotics product with clear value proposition.',
  solution = 'Created an engaging product landing page with demonstrations, specs, and seamless pre-ordering.',
  results = ARRAY['Successful product launch', 'Strong pre-order numbers', 'Clear product understanding'],
  origin = 'EU',
  project_type = 'Product Landing Page'
WHERE title = 'Vector Home Robot';

-- Cyprus Swim Series
UPDATE projects SET
  challenge = 'Managing large-scale swimming events with efficient registration and results tracking.',
  solution = 'Built a comprehensive event platform with online registration, live results, and swimmer management.',
  results = ARRAY['Record participant registration', 'Streamlined event management', 'Enhanced athlete experience'],
  origin = 'EU',
  project_type = 'Sports Event Platform'
WHERE title = 'Cyprus Swim Series';

-- Cyprus Tours
UPDATE projects SET
  challenge = 'Creating a comprehensive tour platform that showcases Cyprus while enabling easy bookings.',
  solution = 'Developed a feature-rich tourism website with booking capabilities and destination storytelling.',
  results = ARRAY['Increased tour bookings by 45%', 'Higher customer satisfaction', 'Expanded tour offerings'],
  origin = 'CY',
  project_type = 'Tourism Platform'
WHERE title = 'Cyprus Tours';

-- Dermlux Clinics
UPDATE projects SET
  challenge = 'Building trust while making advanced dermatology treatments accessible online.',
  solution = 'Created a professional medical website with comprehensive treatment info and seamless appointment booking.',
  results = ARRAY['50% increase in appointments', 'Improved patient education', 'Enhanced clinic reputation'],
  origin = 'CY',
  project_type = 'Medical Website'
WHERE title = 'Dermlux Clinics';

-- Korakides Law
UPDATE projects SET
  challenge = 'Establishing a professional legal presence that instills confidence and attracts clients.',
  solution = 'Developed an authoritative legal website with clear practice areas and easy consultation scheduling.',
  results = ARRAY['Increased client inquiries', 'Enhanced professional image', 'Streamlined consultations'],
  origin = 'EU',
  project_type = 'Legal Website'
WHERE title = 'Korakides Law';

-- KK Hospitality
UPDATE projects SET
  challenge = 'Showcasing hospitality expertise while attracting B2B clients.',
  solution = 'Built a professional corporate site highlighting consulting services and successful projects.',
  results = ARRAY['New B2B partnerships', 'Industry recognition', 'Expanded service offerings'],
  origin = 'EU',
  project_type = 'Corporate Website'
WHERE title = 'KK Hospitality';

-- Sodap Cyprus
UPDATE projects SET
  challenge = 'Modernizing the digital presence of an established manufacturing company.',
  solution = 'Redesigned the corporate website with comprehensive product catalogs and B2B capabilities.',
  results = ARRAY['Improved B2B relationships', 'Modernized brand image', 'Streamlined product discovery'],
  origin = 'CY',
  project_type = 'Manufacturing Website'
WHERE title = 'Sodap Cyprus';

-- Dr. Nutri
UPDATE projects SET
  challenge = 'Making professional nutrition consultation accessible and trackable online.',
  solution = 'Developed a comprehensive nutrition platform with consultation booking and progress tracking.',
  results = ARRAY['Increased consultation bookings', 'Better patient outcomes', 'Engaged user community'],
  origin = 'EU',
  project_type = 'Healthcare Platform'
WHERE title = 'Dr. Nutri';

-- Pafos Zoo
UPDATE projects SET
  challenge = 'Creating an engaging online presence for a wildlife attraction while enabling online ticketing.',
  solution = 'Built an immersive website showcasing animals, with seamless ticketing and educational content.',
  results = ARRAY['40% increase in online ticket sales', 'Enhanced visitor experience', 'Educational reach expanded'],
  origin = 'EU',
  project_type = 'Tourism Website'
WHERE title = 'Pafos Zoo';

-- Cyprus Athletic Tourism
UPDATE projects SET
  challenge = 'Positioning Cyprus as a premier destination for athletic training and sports tourism.',
  solution = 'Developed a comprehensive platform showcasing sports facilities, accommodations, and activities.',
  results = ARRAY['Increased athletic tourism inquiries', 'International recognition', 'New partnerships formed'],
  origin = 'EU',
  project_type = 'Sports Tourism Platform'
WHERE title = 'Cyprus Athletic Tourism';

-- The Palmiers
UPDATE projects SET
  challenge = 'Showcasing luxury accommodations to attract discerning holiday guests.',
  solution = 'Created an elegant website highlighting premium apartments with seamless booking capabilities.',
  results = ARRAY['Increased direct bookings', 'Premium brand positioning', 'Higher average booking value'],
  origin = 'EU',
  project_type = 'Residential Accommodation'
WHERE title = 'The Palmiers';

-- Waterside
UPDATE projects SET
  challenge = 'Highlighting the unique waterside location and self-catering amenities.',
  solution = 'Built a visually appealing website showcasing the property''s location and accommodation options.',
  results = ARRAY['Strong direct booking growth', 'Excellent guest reviews', 'Enhanced online visibility'],
  origin = 'EU',
  project_type = 'Accommodation Website'
WHERE title = 'Waterside';

-- Silver Park
UPDATE projects SET
  challenge = 'Positioning boutique residences as a premium alternative to hotels.',
  solution = 'Developed a sophisticated website highlighting the boutique experience and prime location.',
  results = ARRAY['Increased occupancy rates', 'Premium pricing achieved', 'Strong repeat bookings'],
  origin = 'EU',
  project_type = 'Boutique Residences'
WHERE title = 'Silver Park';

-- Loft Centrale
UPDATE projects SET
  challenge = 'Creating a warm, inviting online presence for cottage-style accommodations.',
  solution = 'Built a charming website that captures the cozy atmosphere with easy booking functionality.',
  results = ARRAY['Increased direct bookings', 'Higher guest satisfaction', 'Effective special offer promotions'],
  origin = 'EU',
  project_type = 'Holiday Apartments Website'
WHERE title = 'Loft Centrale';

-- Averde
UPDATE projects SET
  challenge = 'Showcasing a unique private estate for premium events while highlighting sustainability.',
  solution = 'Created an elegant website that captures the estate''s beauty and sustainable approach.',
  results = ARRAY['Premium wedding bookings', 'Strong event inquiries', 'Recognized for sustainability'],
  origin = 'EU',
  project_type = 'Wedding and Events Venue'
WHERE title = 'Averde';

-- Mito Solar
UPDATE projects SET
  challenge = 'Educating the Cyprus market on comprehensive solar solutions.',
  solution = 'Built an informative website showcasing complete solar and energy storage solutions.',
  results = ARRAY['Increased solar installations', 'Growing EV charger demand', 'Market leadership'],
  origin = 'EU',
  project_type = 'Solar Energy Provider'
WHERE title = 'Mito Solar';

-- Linea
UPDATE projects SET
  challenge = 'Creating a modern, professional presence for strategic consulting services.',
  solution = 'Developed a sleek, minimalist website that communicates expertise and professionalism.',
  results = ARRAY['Enhanced professional image', 'Increased client inquiries', 'Clear service understanding'],
  origin = 'EU',
  project_type = 'Consulting Platform'
WHERE title = 'Linea';

-- SMS Reminder
UPDATE projects SET
  challenge = 'Building a reliable SMS reminder platform for business communication.',
  solution = 'Created a streamlined platform for automated SMS reminders and notifications.',
  results = ARRAY['Reduced no-shows', 'Improved customer communication', 'High delivery rates'],
  origin = 'EU',
  project_type = 'Communication Platform'
WHERE title = 'SMS Reminder';

-- EventPro
UPDATE projects SET
  challenge = 'Automating complex event management processes for boutique hotels.',
  solution = 'Built a comprehensive SaaS solution that automates quotes, follow-ups, and documentation.',
  results = ARRAY['70% time savings on event management', 'Faster quote turnaround', 'Improved client satisfaction'],
  origin = 'EU',
  project_type = 'Event Management Web App'
WHERE title = 'EventPro';

-- ELYST Business Consulting
UPDATE projects SET
  challenge = 'Establishing credibility in HR consulting while showcasing human-centered approach.',
  solution = 'Developed a professional website highlighting expertise, certifications, and training offerings.',
  results = ARRAY['Increased consulting engagements', 'Training program growth', 'Industry recognition'],
  origin = 'EU',
  project_type = 'Consulting Site'
WHERE title = 'ELYST Business Consulting';

-- Nickoloui
UPDATE projects SET
  challenge = 'Creating a distinctive portfolio that reflects multi-disciplinary artistic vision.',
  solution = 'Built a visually stunning portfolio site showcasing filmography and creative tools.',
  results = ARRAY['Increased creative collaborations', 'Industry visibility', 'Strong artistic identity'],
  origin = 'EU',
  project_type = 'Portfolio Website'
WHERE title = 'Nickoloui';

-- Med Yachts
UPDATE projects SET
  challenge = 'Showcasing luxury yacht experiences while enabling seamless charter bookings.',
  solution = 'Created a premium website displaying the fleet with elegant booking capabilities.',
  results = ARRAY['Premium charter bookings', 'Luxury brand positioning', 'Strong Mediterranean presence'],
  origin = 'EU',
  project_type = 'Yacht Charter Platform'
WHERE title = 'Med Yachts';

-- VIBEUP
UPDATE projects SET
  challenge = 'Building a scalable community platform with real-time features and engaging user experience.',
  solution = 'Developed a full-stack platform with real-time capabilities and intuitive social features.',
  results = ARRAY['Active community engagement', 'Scalable architecture', 'Positive user feedback'],
  origin = 'US',
  project_type = 'Community Platform'
WHERE title = 'VIBEUP';
