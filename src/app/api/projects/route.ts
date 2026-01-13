/**
 * Projects API Route
 * Light Brand Consulting
 *
 * Handles GET (list) and POST (create) operations for projects
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ProjectInsert, Project } from '@/types/database';
import { PORTFOLIO_PROJECTS } from '@/data/projects';

// Use the comprehensive portfolio projects data
const PLACEHOLDER_PROJECTS: Project[] = PORTFOLIO_PROJECTS;

// Legacy placeholder data removed - now using @/data/projects
const _LEGACY_PLACEHOLDER_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Light Brand Consulting',
    description: 'Consulting service designing AI intelligence systems for businesses. Features AI Readiness Assessment, newsletter integration, testimonials, and efficiency metrics. A comprehensive platform for AI business transformation consulting.',
    image_url: '/images/portfolio/light-brand-consulting.jpg',
    tags: ['AI Diagnostics', 'Business AI Engines', 'Founder Leverage', 'Next.js', 'React'],
    case_study_url: 'https://light-brand-consulting.vercel.app/',
    client_name: 'Light Brand Consulting',
    industry: 'AI Business Transformation',
    featured: true,
    status: 'published',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Iboga Life',
    description: 'Personal healing site focused on sacred healing experiences with Iboga. Features practitioner bio, session information, and retreat details for those seeking plant medicine healing journeys.',
    image_url: '/images/portfolio/iboga-life.jpg',
    tags: ['Healing', 'Plant Medicine', 'Retreats', 'Next.js', 'React'],
    case_study_url: 'https://iboga-life.vercel.app/',
    client_name: 'Iboga Life',
    industry: 'Sacred Healing / Plant Medicine',
    featured: false,
    status: 'published',
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'NeuroTracker X',
    description: 'Platform for cognitive training to enhance human performance. Features three demo editions: ELITE, CLINICAL, and HUMAN, providing comprehensive cognitive enhancement solutions for different user needs.',
    image_url: '/images/portfolio/neurotracker-x.jpg',
    tags: ['Cognitive Training', 'Wellness', 'Performance', 'Next.js', 'React'],
    case_study_url: 'https://ntx8.vercel.app/',
    client_name: 'NeuroTracker X',
    industry: 'Cognitive Enhancement / Wellness',
    featured: true,
    status: 'published',
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Light Field Institute',
    description: 'Digital ecosystem bridging intuitive wisdom and consciousness education. Features aura readings, energy sessions, courses, session packages, weekly field notes, and Practice/Education sections.',
    image_url: '/images/portfolio/light-field-institute.jpg',
    tags: ['Biofield Research', 'Consciousness', 'Education', 'Courses', 'React'],
    case_study_url: 'https://www.lightfield.institute/',
    client_name: 'Light Field Institute',
    industry: 'Biofield Research / Consciousness',
    featured: true,
    status: 'published',
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Mindflow Vision',
    description: 'Technical whitepaper site presenting the Mindflow vision and technical documentation. Clean, professional presentation of complex technical concepts for the Mindflow platform.',
    image_url: '/images/portfolio/mindflow-vision.jpg',
    tags: ['Technical', 'Whitepaper', 'Documentation', 'Next.js', 'React'],
    case_study_url: 'https://mindflow-vision.vercel.app/',
    client_name: 'Mindflow',
    industry: 'Technical / Vision Platform',
    featured: false,
    status: 'published',
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'The Planetary Party',
    description: 'Global web of bioregional networks for celebration and regenerative action. Features protocols, tools, Flow Funds, guilds, bioregional dashboards, Five-Phase Protocol, and node exploration.',
    image_url: '/images/portfolio/planetary-party.jpg',
    tags: ['Regenerative', 'Bioregional', 'Community', 'Next.js', 'React'],
    case_study_url: 'https://planetary-party.vercel.app/',
    client_name: 'The Planetary Party',
    industry: 'Regenerative Action / Bioregional',
    featured: true,
    status: 'published',
    sort_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Love Token',
    description: 'World\'s first Love Economy experiment with meditation and intention. Features guided meditations, subscriptions, credit redemption, meditation tracking, credit circulation metrics, and impact stories.',
    image_url: '/images/portfolio/love-token.jpg',
    tags: ['Circular Economy', 'Meditation', 'Social', 'Next.js', 'React'],
    case_study_url: 'https://love-token.vercel.app/',
    client_name: 'Love Token',
    industry: 'Love Economy / Social Experiment',
    featured: false,
    status: 'published',
    sort_order: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Lightwaves Energy',
    description: 'Solar calculator and energy optimization solutions for renewable energy. Features Solar Calculator and Energy Optimization tools to help customers understand their solar potential.',
    image_url: '/images/portfolio/lightwaves-energy.jpg',
    tags: ['Renewable Energy', 'Solar', 'Calculator', 'Next.js', 'React'],
    case_study_url: 'https://lightwaves.energy',
    client_name: 'Lightwaves Energy',
    industry: 'Renewable Energy',
    featured: false,
    status: 'published',
    sort_order: 9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '10',
    title: 'Downtown Park',
    description: 'Premium urban development project with modern residential spaces. Features brand identity, website development, 3D visualizations, property listings, virtual tours, and investment information with property management system.',
    image_url: '/images/portfolio/downtown-park.jpg',
    tags: ['Real Estate', 'Property', '3D Visualization', 'React', 'CMS'],
    case_study_url: 'https://www.downtown-park.com/',
    client_name: 'Downtown Park',
    industry: 'Real Estate Development',
    featured: true,
    status: 'published',
    sort_order: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '11',
    title: 'Skyzor Productions',
    description: 'Professional video production company for commercial content. Brand identity, portfolio website, and video player integration. Features video portfolio, client testimonials, and production services showcase.',
    image_url: '/images/portfolio/skyzor-productions.jpg',
    tags: ['Video Production', 'Portfolio', 'Media', 'Video Streaming'],
    case_study_url: 'https://www.skyzorproductions.com/',
    client_name: 'Skyzor Productions',
    industry: 'Video Production / Media',
    featured: false,
    status: 'published',
    sort_order: 11,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '12',
    title: 'AI Tools',
    description: 'Comprehensive AI tools platform offering ML capabilities. Full-stack development with AI integration and API development. Features AI tool collection, API integrations, and user dashboard.',
    image_url: '/images/portfolio/ai-tools.jpg',
    tags: ['AI', 'Machine Learning', 'SaaS', 'Next.js', 'React'],
    case_study_url: 'https://aitools-theta.vercel.app/',
    client_name: 'AI Tools',
    industry: 'Artificial Intelligence / SaaS',
    featured: true,
    status: 'published',
    sort_order: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '13',
    title: 'Growth Mastery AI',
    description: 'AI-powered business growth and analytics platform. Features growth analytics, AI recommendations, and business insights with machine learning models and dashboard development.',
    image_url: '/images/portfolio/growth-mastery-ai.jpg',
    tags: ['Business Intelligence', 'AI', 'Analytics', 'ML', 'Dashboard'],
    case_study_url: 'https://growthmastery.ai/',
    client_name: 'Growth Mastery AI',
    industry: 'Business Intelligence / AI',
    featured: true,
    status: 'published',
    sort_order: 13,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '14',
    title: 'Anemi Pool Reservation',
    description: 'Advanced pool and amenity reservation system for luxury hotels. Custom reservation system with hotel integration. Features real-time reservations, availability calendar, and guest management.',
    image_url: '/images/portfolio/anemi-pool.jpg',
    tags: ['Hotel Management', 'Reservations', 'Real-time', 'PMS Integration'],
    case_study_url: 'https://pool.anemihotel.com/',
    client_name: 'Anemi Hotel',
    industry: 'Hotel Management / Reservations',
    featured: false,
    status: 'published',
    sort_order: 14,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '16',
    title: 'MelodyGram AI',
    description: 'AI-powered music creation and analysis platform. Music AI development with audio processing and UI design. Features music generation, audio analysis, and creative tools.',
    image_url: '/images/portfolio/melodygram-ai.jpg',
    tags: ['Music AI', 'Audio Processing', 'Creative Tools', 'AI Generation'],
    case_study_url: 'https://melodygram.vercel.app/',
    client_name: 'MelodyGram',
    industry: 'Music Technology / AI',
    featured: true,
    status: 'published',
    sort_order: 16,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '17',
    title: 'MW Crypto Monitor',
    description: 'Real-time cryptocurrency monitoring and analytics dashboard. Financial dashboard with real-time data integration. Features price monitoring, portfolio tracking, and market analytics.',
    image_url: '/images/portfolio/mw-crypto.jpg',
    tags: ['Cryptocurrency', 'FinTech', 'Real-time', 'React', 'Dashboard'],
    case_study_url: 'https://mw-dash.vercel.app/',
    client_name: 'MW Crypto',
    industry: 'Cryptocurrency / FinTech',
    featured: false,
    status: 'published',
    sort_order: 17,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '18',
    title: 'Genius AI',
    description: 'AI-powered learning and knowledge platform. AI development with educational tools and interactive learning. Features AI tutoring, knowledge base, and interactive learning modules.',
    image_url: '/images/portfolio/genius-ai.jpg',
    tags: ['AI', 'Education', 'Learning', 'Interactive', 'ML Integration'],
    case_study_url: 'https://geniusai8.vercel.app/',
    client_name: 'Genius AI',
    industry: 'Artificial Intelligence / Education',
    featured: true,
    status: 'published',
    sort_order: 18,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '19',
    title: 'Busy Bees IPC',
    description: 'Intelligent project coordination and management platform with POS capabilities. Project management system with workflow automation. Features project tracking, team coordination, and automated workflows.',
    image_url: '/images/portfolio/busy-bees.jpg',
    tags: ['Project Management', 'POS', 'Automation', 'Workflow'],
    case_study_url: 'https://busy-bees8.vercel.app',
    client_name: 'Busy Bees',
    industry: 'Business Management / Productivity',
    featured: false,
    status: 'published',
    sort_order: 19,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '20',
    title: 'Piedra Lounge',
    description: 'Upscale lounge and dining with Mediterranean influences. Brand identity, website design, and menu design. Features menu display, reservation booking, and event information.',
    image_url: '/images/portfolio/piedra-lounge.jpg',
    tags: ['Restaurant', 'Hospitality', 'Menu Design', 'Reservations'],
    case_study_url: 'https://piedralounge.com/',
    client_name: 'Piedra Lounge',
    industry: 'Hospitality / Restaurant',
    featured: false,
    status: 'published',
    sort_order: 20,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '21',
    title: 'Baracas Lounge',
    description: 'Premium nightlife venue and cocktail lounge. Brand development, website creation, and promotional materials. Features event calendar, photo galleries, and VIP booking.',
    image_url: '/images/portfolio/baracas-lounge.jpg',
    tags: ['Nightlife', 'Events', 'Social Media', 'Event Management'],
    case_study_url: 'https://www.baracaslounge.com/',
    client_name: 'Baracas Lounge',
    industry: 'Hospitality / Nightlife',
    featured: false,
    status: 'published',
    sort_order: 21,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '22',
    title: 'Loft Club',
    description: 'Exclusive private club and event venue. Brand identity, web development, and membership portal. Features membership portal, event bookings, and exclusive content with secure login areas.',
    image_url: '/images/portfolio/loft-club.jpg',
    tags: ['Private Club', 'Membership', 'Events', 'Secure Portal'],
    case_study_url: 'https://loftclub.co/',
    client_name: 'Loft Club',
    industry: 'Hospitality / Private Club',
    featured: false,
    status: 'published',
    sort_order: 22,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '23',
    title: 'New Earth Development',
    description: 'Sustainable development organization focused on conservation. Brand design, website development, and content strategy. Features project showcases, sustainability metrics, and donation portal.',
    image_url: '/images/portfolio/new-earth-development.jpg',
    tags: ['Non-Profit', 'Sustainability', 'Conservation', 'Donations'],
    case_study_url: 'https://newearthdevelopment.org',
    client_name: 'New Earth Development',
    industry: 'Sustainable Development',
    featured: true,
    status: 'published',
    sort_order: 23,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '24',
    title: 'Boho Bones (NFT)',
    description: 'Unique NFT collection featuring artistic bone-themed digital artwork. Digital art creation, NFT development, and blockchain integration. Features NFT marketplace listing, rarity system, and community features.',
    image_url: '/images/portfolio/boho-bones.jpg',
    tags: ['NFT', 'Digital Art', 'Blockchain', 'Ethereum', 'OpenSea'],
    case_study_url: 'https://opensea.io/collection/bohobones',
    client_name: 'Boho Bones',
    industry: 'Digital Art / Blockchain / NFT',
    featured: false,
    status: 'published',
    sort_order: 24,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '25',
    title: 'Auracle',
    description: 'AI-powered prediction and insights platform. Predictive analytics, data visualization, and AI integration. Features predictive insights, data analysis, and forecasting tools with machine learning models.',
    image_url: '/images/portfolio/auracle.jpg',
    tags: ['AI', 'Predictive Analytics', 'Data Visualization', 'ML'],
    case_study_url: 'https://auracle8.vercel.app/',
    client_name: 'Auracle',
    industry: 'AI / Predictive Analytics',
    featured: true,
    status: 'published',
    sort_order: 25,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '26',
    title: 'Oracle Studios',
    description: 'Primary digital agency platform showcasing creative services. Complete brand identity, web development, and digital strategy. Features portfolio showcase, service offerings, and client testimonials.',
    image_url: '/images/portfolio/oracle-studios.jpg',
    tags: ['Digital Agency', 'Creative', 'Branding', 'React', 'Next.js'],
    case_study_url: 'https://oraclestudios.io',
    client_name: 'Oracle Studios',
    industry: 'Digital Agency / Creative Studio',
    featured: true,
    status: 'published',
    sort_order: 26,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '27',
    title: 'Vector Home Robot',
    description: 'Advanced home automation robot with AI capabilities. Product branding, landing page design, and documentation. Features product demonstrations, technical specs, and pre-order system.',
    image_url: '/images/portfolio/vector-home-robot.jpg',
    tags: ['Smart Home', 'Robotics', 'AI', 'Product Landing', 'Webflow'],
    case_study_url: 'https://vector-home-robot.webflow.io/',
    client_name: 'Vector',
    industry: 'Smart Home Technology / Robotics',
    featured: false,
    status: 'published',
    sort_order: 27,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '28',
    title: 'Cyprus Swim Series',
    description: 'Premier swimming competition series in Cyprus. Event branding, website development, and registration system. Features event registration, results display, and swimmer profiles.',
    image_url: '/images/portfolio/cyprus-swim.jpg',
    tags: ['Sports Events', 'Registration', 'Results', 'Event Management'],
    case_study_url: 'https://cyprusswimseries.com/',
    client_name: 'Cyprus Swim Series',
    industry: 'Sports Events / Swimming',
    featured: false,
    status: 'published',
    sort_order: 28,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '29',
    title: 'Cyprus Tours',
    description: 'Comprehensive Cyprus tour and travel experience platform. Travel website development, booking system, and tour management. Features tour bookings, itinerary planning, and customer reviews.',
    image_url: '/images/portfolio/cyprus-tours.jpg',
    tags: ['Tourism', 'Travel', 'Booking System', 'CMS'],
    case_study_url: 'https://www.cyprustours.eu/',
    client_name: 'Cyprus Tours',
    industry: 'Travel & Tourism',
    featured: false,
    status: 'published',
    sort_order: 29,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '30',
    title: 'Dermlux Clinics',
    description: 'Advanced dermatology clinic with cutting-edge treatments. Medical website development and appointment system. Features treatment information, appointment booking, and patient resources.',
    image_url: '/images/portfolio/dermlux-clinics.jpg',
    tags: ['Healthcare', 'Dermatology', 'Appointments', 'Patient Portal'],
    case_study_url: 'https://www.dermluxclinic.com/',
    client_name: 'Dermlux Clinics',
    industry: 'Healthcare / Dermatology',
    featured: false,
    status: 'published',
    sort_order: 30,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '31',
    title: 'Korakides Law',
    description: 'Professional law firm specializing in comprehensive legal services. Legal website development, case management, and branding. Features legal services showcase, client portal, and consultation booking.',
    image_url: '/images/portfolio/korakides-law.jpg',
    tags: ['Legal Services', 'Client Portal', 'Consultations', 'Webflow'],
    case_study_url: 'https://epaminondas-korakides-llc.webflow.io/',
    client_name: 'Korakides Law',
    industry: 'Legal Services',
    featured: false,
    status: 'published',
    sort_order: 31,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '32',
    title: 'KK Hospitality',
    description: 'Professional hospitality management and consulting services. Corporate website, service portfolio, and client management. Features service showcase, client testimonials, and project portfolios.',
    image_url: '/images/portfolio/kk-hospitality.jpg',
    tags: ['Hospitality Management', 'Consulting', 'Client Portals', 'Webflow'],
    case_study_url: 'https://kk-hospitality.webflow.io/',
    client_name: 'KK Hospitality',
    industry: 'Hospitality Management',
    featured: false,
    status: 'published',
    sort_order: 32,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '33',
    title: 'Sodap Cyprus',
    description: 'Leading food processing and manufacturing company in Cyprus. Corporate website redesign, product catalogs, and B2B portal. Features product catalogs, company information, and B2B services.',
    image_url: '/images/portfolio/sodap-cyprus.jpg',
    tags: ['Manufacturing', 'Food Processing', 'B2B', 'Industrial CMS'],
    case_study_url: 'https://www.sodap.com.cy/',
    client_name: 'Sodap',
    industry: 'Manufacturing / Food Processing',
    featured: false,
    status: 'published',
    sort_order: 33,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '34',
    title: 'Dr. Nutri',
    description: 'Professional nutrition and dietary consultation platform. Healthcare platform, consultation booking, and nutrition tools. Features nutrition plans, consultation booking, and health tracking.',
    image_url: '/images/portfolio/dr-nutri.jpg',
    tags: ['Healthcare', 'Nutrition', 'Consultations', 'Health Tracking'],
    case_study_url: 'https://dr-nutri.com',
    client_name: 'Dr. Nutri',
    industry: 'Healthcare / Nutrition',
    featured: false,
    status: 'published',
    sort_order: 34,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '35',
    title: 'Pafos Zoo',
    description: 'Premier wildlife park and conservation center in Cyprus. Tourism website, ticketing system, and educational content. Features animal exhibits, ticket booking, and educational programs.',
    image_url: '/images/portfolio/pafos-zoo.jpg',
    tags: ['Tourism', 'Wildlife', 'Ticketing', 'Educational'],
    case_study_url: 'https://www.pafoszoo.com/',
    client_name: 'Pafos Zoo',
    industry: 'Entertainment / Wildlife Tourism',
    featured: false,
    status: 'published',
    sort_order: 35,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '36',
    title: 'Cyprus Athletic Tourism',
    description: 'Athletic tourism platform promoting Cyprus as sports destination. Tourism platform, destination marketing, and booking systems. Features destination guides, activity booking, and athlete resources.',
    image_url: '/images/portfolio/cyprus-athletic.jpg',
    tags: ['Sports Tourism', 'Travel', 'Booking', 'Destination Marketing'],
    case_study_url: 'https://www.cyprusathletictourism.com/',
    client_name: 'Cyprus Athletic Tourism',
    industry: 'Sports Tourism / Travel',
    featured: false,
    status: 'published',
    sort_order: 36,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '37',
    title: 'The Palmiers',
    description: 'Luxury serviced apartments in Paphos for holidays. Features sea view apartments, pool view units, and executive penthouses with premium amenities.',
    image_url: '/images/portfolio/palmiers.jpg',
    tags: ['Luxury Apartments', 'Hospitality', 'Accommodation', 'React', 'Next.js'],
    case_study_url: 'https://www.thepalmiers.com/',
    client_name: 'The Palmiers',
    industry: 'Hospitality (Luxury Apartments)',
    featured: false,
    status: 'published',
    sort_order: 37,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '38',
    title: 'Waterside',
    description: 'Stylish self-catering studios and apartments in Paphos. Features deluxe studios, suites, rooftop seating, and stunning sea views.',
    image_url: '/images/portfolio/waterside.jpg',
    tags: ['Self-Catering', 'Hospitality', 'Accommodation', 'React', 'Next.js'],
    case_study_url: 'https://www.waterside.cy/',
    client_name: 'Waterside',
    industry: 'Hospitality (Self-Catering)',
    featured: false,
    status: 'published',
    sort_order: 38,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '39',
    title: 'Silver Park',
    description: 'Spacious self-catering apartments in Paphos Harbour. Boutique residences featuring contemporary apartments, pool area, and lush greenery.',
    image_url: '/images/portfolio/silver-park.jpg',
    tags: ['Boutique Residences', 'Hospitality', 'Accommodation', 'React', 'Next.js'],
    case_study_url: 'https://www.silver-park.cy/',
    client_name: 'Silver Park',
    industry: 'Hospitality (Accommodation)',
    featured: false,
    status: 'published',
    sort_order: 39,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '40',
    title: 'Loft Centrale',
    description: 'Cozy cottage-style holiday apartments by Paphos Harbour. Features studios, suites, special offers, and booking system for memorable stays.',
    image_url: '/images/portfolio/loft-centrale.jpg',
    tags: ['Holiday Apartments', 'Hospitality', 'Booking', 'React', 'Next.js'],
    case_study_url: 'https://www.loft-centrale.cy/',
    client_name: 'Loft Centrale',
    industry: 'Hospitality (Holiday)',
    featured: false,
    status: 'published',
    sort_order: 40,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '41',
    title: 'Averde',
    description: 'Private estate in Larnaca for weddings and milestone celebrations. Features Mediterranean gardens, glass ballroom, 10 rooms/suites, event planning, catering connections, and carbon offsetting.',
    image_url: '/images/portfolio/averde.jpg',
    tags: ['Events', 'Weddings', 'Hospitality', 'Venue', 'React', 'Next.js'],
    case_study_url: 'https://www.averde.cy/',
    client_name: 'Averde',
    industry: 'Events and Hospitality',
    featured: true,
    status: 'published',
    sort_order: 41,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '42',
    title: 'Mito Solar',
    description: 'Complete solar solutions for Cyprus homes and businesses. Features high-efficiency panels, EV chargers, battery storage, solar installation, and cleaning services.',
    image_url: '/images/portfolio/mito-solar.jpg',
    tags: ['Solar Energy', 'Renewable', 'EV Charging', 'Battery Storage', 'React', 'Next.js'],
    case_study_url: 'https://www.mitosolar.cy/',
    client_name: 'Mito Solar',
    industry: 'Renewable Energy (Solar)',
    featured: false,
    status: 'published',
    sort_order: 42,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '43',
    title: 'Linea',
    description: 'Strategic consulting platform showcasing professional services and business solutions. Modern design with clean user interface.',
    image_url: '/images/portfolio/linea.jpg',
    tags: ['Consulting', 'Strategy', 'React', 'Next.js'],
    case_study_url: 'https://linea.strategioconsulting.com/',
    client_name: 'Strategio Consulting',
    industry: 'Business Consulting',
    featured: false,
    status: 'published',
    sort_order: 43,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '44',
    title: 'SMS Reminder',
    description: 'SMS reminder and notification management platform. Streamlined communication solution for businesses to stay connected with their customers.',
    image_url: '/images/portfolio/sms-reminder.jpg',
    tags: ['SMS', 'Notifications', 'Communication', 'React', 'Next.js'],
    case_study_url: 'https://sms-reminder-teal.vercel.app/',
    client_name: 'SMS Reminder',
    industry: 'Communication Technology',
    featured: false,
    status: 'published',
    sort_order: 44,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '45',
    title: 'EventPro',
    description: 'Software solution for boutique hotels to automate event management. Features instant quotes, automated follow-ups, and document generation for seamless event coordination.',
    image_url: '/images/portfolio/eventpro.jpg',
    tags: ['Event Management', 'Automation', 'Hospitality', 'SaaS', 'React', 'Next.js'],
    case_study_url: 'https://events.anemihotel.com/landing',
    client_name: 'Anemi Hotel',
    industry: 'Hospitality (Boutique Hotels)',
    featured: true,
    status: 'published',
    sort_order: 45,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '46',
    title: 'ELYST Business Consulting',
    description: 'Consulting firm for HR and leadership development. Features HR consulting, training, and leadership coaching. Proven expertise with human-centered approach and ANAD certification.',
    image_url: '/images/portfolio/elyst-consulting.jpg',
    tags: ['HR Consulting', 'Leadership', 'Training', 'Business', 'React', 'Next.js'],
    case_study_url: 'https://elystconsultingcy.com/',
    client_name: 'ELYST Consulting',
    industry: 'Business / HR Consulting',
    featured: false,
    status: 'published',
    sort_order: 46,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '47',
    title: 'Nickoloui',
    description: 'Multi-disciplinary artist portfolio with visual aesthetics focus. Features filmography portfolio, software tools showcase, and contact information for creative collaborations.',
    image_url: '/images/portfolio/nickoloui.jpg',
    tags: ['Visual Arts', 'Film', 'Portfolio', 'Creative', 'React', 'Next.js'],
    case_study_url: 'https://www.nickoloui.com/',
    client_name: 'Nickoloui',
    industry: 'Visual Arts and Film',
    featured: false,
    status: 'published',
    sort_order: 47,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '48',
    title: 'Med Yachts',
    description: 'Mediterranean yacht charter and luxury sailing experiences. Premium yacht services showcasing fleet options and booking capabilities for unforgettable sea adventures.',
    image_url: '/images/portfolio/med-yachts.jpg',
    tags: ['Yachts', 'Luxury', 'Charter', 'Tourism', 'React', 'Next.js'],
    case_study_url: 'https://medyachts.vercel.app/',
    client_name: 'Med Yachts',
    industry: 'Yacht Charter / Luxury Tourism',
    featured: true,
    status: 'published',
    sort_order: 48,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// GET - List all projects (public can see published, admin can see all)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const brandId = searchParams.get('brand_id');
    const industry = searchParams.get('industry');

    // Check if admin (to show all projects including drafts)
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'admin';

    // If Supabase is not configured, return placeholder data
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, returning placeholder data');
      let projects = [...PLACEHOLDER_PROJECTS];

      // Filter by status (public only sees published)
      if (!isAdmin) {
        projects = projects.filter(p => p.status === 'published');
      } else if (status) {
        projects = projects.filter(p => p.status === status);
      }

      // Filter by featured
      if (featured === 'true') {
        projects = projects.filter(p => p.featured);
      }

      // Filter by brand_id
      if (brandId) {
        projects = projects.filter(p => p.brand_id === brandId);
      }

      // Filter by industry (partial match)
      if (industry) {
        projects = projects.filter(p =>
          p.industry?.toLowerCase().includes(industry.toLowerCase())
        );
      }

      // Sort by sort_order (ascending), then by created_at (descending)
      projects.sort((a, b) => {
        if (a.sort_order !== b.sort_order) {
          return a.sort_order - b.sort_order;
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      // Apply limit
      if (limit) {
        projects = projects.slice(0, parseInt(limit));
      }

      return NextResponse.json({ data: projects, error: null, count: projects.length });
    }

    // Build query
    let query = supabaseAdmin
      .from('projects')
      .select('*', { count: 'exact' })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    // Filter by status
    if (status) {
      query = query.eq('status', status);
    } else if (!isAdmin) {
      // Public users can only see published projects
      query = query.eq('status', 'published');
    }

    // Filter by featured
    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    // Filter by brand_id
    if (brandId) {
      query = query.eq('brand_id', brandId);
    }

    // Filter by industry (partial match)
    if (industry) {
      query = query.ilike('industry', `%${industry}%`);
    }

    // Apply limit
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching projects:', error);
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null, count });
  } catch (error) {
    console.error('Error in GET /api/projects:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new project (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: ProjectInsert = await request.json();

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { data: null, error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock response
    if (!isSupabaseConfigured()) {
      const mockProject: Project = {
        id: Date.now().toString(),
        title: body.title,
        description: body.description,
        image_url: body.image_url || null,
        tags: body.tags || [],
        case_study_url: body.case_study_url || null,
        client_name: body.client_name || null,
        industry: body.industry || null,
        featured: body.featured || false,
        status: body.status || 'draft',
        sort_order: body.sort_order || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockProject, error: null }, { status: 201 });
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/projects:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
