/**
 * Light Brand Consulting - Constants & Data
 */

import { Service, Testimonial, NavItem, IntakeQuestion } from '../types';

// ============================================================================
// Navigation
// ============================================================================

export const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'services', label: 'Services', href: '/services' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'insights', label: 'Insights', href: '/insights' },
  { key: 'contact', label: 'Contact', href: '/contact' },
];

// ============================================================================
// Services Data
// ============================================================================

export const SERVICES: Record<string, Service> = {
  illumination: {
    id: 'illumination',
    name: 'Illumination Session',
    tagline: 'See your AI potential in 90 minutes',
    description: 'A single focused conversation revealing 3 AI opportunities that match your business reality. No fluff, no generic advice—just clear, actionable insights tailored to your specific situation.',
    investment: '$500',
    duration: '90 minutes',
    deliverables: [
      '3 specific AI opportunities mapped to your business with implementation complexity ratings',
      'Super Intelligence Profile™ assessment revealing your AI readiness across 5 dimensions',
      'Priority-ranked action items with estimated ROI and effort levels',
      '30-day momentum plan with weekly milestones',
      'Recording of the session for team sharing',
      'Quick-reference summary document',
    ],
    process: [
      { step: 1, title: 'Book', description: 'Select your time slot and receive calendar invite with video link' },
      { step: 2, title: 'Prepare', description: 'Complete brief intake form (10 min) so we hit the ground running' },
      { step: 3, title: 'Connect', description: '90-minute deep-dive video session focused entirely on your business' },
      { step: 4, title: 'Receive', description: 'Summary document, session recording, and action plan within 24 hours' },
    ],
    idealFor: [
      'Founders wondering "what should AI mean for my business?"',
      'Leaders hearing about AI everywhere but unsure where to start',
      'Businesses with specific pain points that AI might solve',
      'Companies that have tried AI tools but haven\'t seen results',
      'Anyone ready to stop wondering and start moving with clarity',
    ],
    notFor: [
      'Businesses seeking someone to "do AI for them" (we illuminate, you execute)',
      'Organizations wanting to "wait and see" how AI develops',
      'Those looking for generic AI advice found in any blog post',
      'Companies without decision-making authority present in the session',
    ],
    faq: [
      {
        question: 'What if I have no AI experience?',
        answer: 'Perfect. Most clients come with zero AI background. We meet you where you are and translate everything into business language you already understand. No jargon, no technical prerequisites.',
      },
      {
        question: 'How do I prepare for the session?',
        answer: 'After booking, you\'ll receive a brief intake form (10 minutes). That\'s all the prep needed. Come ready to talk openly about your business challenges—the more honest, the better the insights.',
      },
      {
        question: 'What happens after the session?',
        answer: 'Within 24 hours, you\'ll receive a summary document, session recording, and your 30-day action plan. Many clients also choose to upgrade to a full Blueprint engagement after seeing their opportunities.',
      },
      {
        question: 'Can I bring team members to the session?',
        answer: 'Absolutely. We recommend including 1-2 key decision-makers or stakeholders. More perspectives often reveal more opportunities. Just let us know who\'s joining when you book.',
      },
      {
        question: 'What\'s the Super Intelligence Profile™?',
        answer: 'It\'s our proprietary assessment that evaluates your AI readiness across 5 dimensions: data infrastructure, process maturity, team capability, strategic alignment, and implementation capacity. It helps prioritize which opportunities to pursue first.',
      },
      {
        question: 'Is this a sales pitch for more services?',
        answer: 'No. The session is designed to deliver standalone value. You\'ll leave with actionable insights whether you ever work with us again or not. That said, many clients do choose to continue—but there\'s zero pressure.',
      },
    ],
  },
  blueprint: {
    id: 'blueprint',
    name: 'AI Acceleration Blueprint',
    tagline: 'Complete strategic architecture for AI transformation',
    description: 'A comprehensive analysis and strategic roadmap that maps AI opportunities to your specific business context. This is not a generic template—it\'s a custom-built strategy designed around your operations, team, and goals.',
    investment: '$3,000 – $7,500',
    duration: '5–7 days',
    deliverables: [
      'Complete AI opportunity audit with 10-15 identified opportunities ranked by impact and feasibility',
      'Strategic implementation roadmap with phased approach over 6-18 months',
      'Technology stack recommendations with vendor comparisons and integration considerations',
      'ROI projections and timeline for each recommended initiative',
      'Team capability assessment with skill gap analysis and hiring/training recommendations',
      'Vendor evaluation framework for selecting AI tools and partners',
      'Executive summary presentation for board or leadership buy-in',
      'Risk assessment and mitigation strategies',
    ],
    process: [
      { step: 1, title: 'Discovery', description: 'Deep-dive interviews with key stakeholders, process documentation review, and data landscape assessment' },
      { step: 2, title: 'Analysis', description: 'AI opportunity identification, competitive analysis, and feasibility evaluation against your constraints' },
      { step: 3, title: 'Design', description: 'Craft comprehensive implementation roadmap with resource requirements, milestones, and success metrics' },
      { step: 4, title: 'Deliver', description: 'Present findings to leadership, refine based on feedback, and finalize actionable blueprint' },
    ],
    idealFor: [
      'Companies ready to invest seriously in AI with budget allocated',
      'Leaders who need a clear, defensible implementation path to present to stakeholders',
      'Organizations with complex operations spanning multiple departments',
      'Teams ready to execute who need the strategic framework to guide decisions',
      'Businesses preparing for significant growth or market changes',
    ],
    notFor: [
      'Early-stage exploration (try Illumination Session first to validate direction)',
      'Organizations without decision-making authority or budget commitment',
      'Those seeking ongoing implementation support (we can refer partners)',
      'Companies looking for a one-size-fits-all AI playbook',
    ],
    faq: [
      {
        question: 'What\'s included in the blueprint deliverable?',
        answer: 'A comprehensive document (typically 30-50 pages) covering opportunity audit, strategic roadmap, technology recommendations, ROI projections, team assessment, and risk mitigation—plus an executive presentation deck.',
      },
      {
        question: 'How do we work together during this engagement?',
        answer: 'You\'ll have a 2-hour discovery call, followed by 3-5 days of asynchronous analysis (with Slack/email access for questions), and conclude with a 90-minute strategic presentation. Total client time investment: 5-6 hours.',
      },
      {
        question: 'Can you help implement the recommendations?',
        answer: 'The blueprint is designed to be actionable by your internal team or partners. We maintain relationships with vetted implementation partners and can make warm referrals. Some clients also engage us for quarterly advisory check-ins.',
      },
      {
        question: 'What determines the price within the $3,000-$7,500 range?',
        answer: 'Complexity of your operations, number of stakeholders to interview, scope of analysis required, and depth of competitive research. We provide a fixed quote after an initial scoping call—no surprises.',
      },
      {
        question: 'Do you sign NDAs?',
        answer: 'Yes, we sign mutual NDAs before any discovery work begins. Your business information is treated with complete confidentiality.',
      },
      {
        question: 'What if our strategy changes after receiving the blueprint?',
        answer: 'Business evolves—we get it. The blueprint includes decision frameworks that remain valuable even as specifics change. We also offer a discounted 90-minute "Recalibration Session" for past clients.',
      },
    ],
  },
  story: {
    id: 'story',
    name: 'Breath of Life Story',
    tagline: 'Transform your expertise into authority',
    description: 'Deep narrative work that captures your unique voice, story, and expertise—creating content that positions you as a thought leader in your space. This isn\'t copywriting; it\'s identity excavation and articulation.',
    investment: '$2,500 – $12,000',
    duration: '2–6 weeks',
    deliverables: [
      'Brand narrative framework with core story, values articulation, and positioning statement',
      'Founder/leadership origin story capturing the journey, pivots, and lessons',
      'Key messaging architecture with primary and secondary messages for different audiences',
      'Content pillars and themes establishing 4-6 topics to own in your space',
      'Voice and tone guidelines ensuring consistency across all communications',
      'Sample content pieces (2-4) demonstrating the narrative in action',
      'Social bio variations optimized for LinkedIn, Twitter, and speaking engagements',
      'Interview preparation guide for podcasts and media appearances',
    ],
    process: [
      { step: 1, title: 'Excavate', description: 'Deep-dive interviews to uncover your unique story, perspective, and the moments that shaped your worldview' },
      { step: 2, title: 'Craft', description: 'Transform raw material into compelling narratives that resonate with your target audience' },
      { step: 3, title: 'Refine', description: 'Collaborative revision process ensuring the final product sounds authentically like you—at your best' },
      { step: 4, title: 'Activate', description: 'Launch with sample content pieces and guidance on deploying your new narrative assets' },
    ],
    idealFor: [
      'Founders building personal brands alongside their company brand',
      'Experts with deep knowledge seeking thought leadership positioning',
      'Companies undergoing repositioning or entering new markets',
      'Leaders with compelling stories that have never been properly articulated',
      'Anyone preparing for a book, keynote speaking, or significant media push',
    ],
    notFor: [
      'Those seeking generic marketing copy or quick-turn content',
      'Organizations without access to key storytellers for interviews',
      'Quick turnaround projects (great narrative work requires marination)',
      'Anyone uncomfortable with deep personal exploration and vulnerability',
    ],
    faq: [
      {
        question: 'What makes this different from copywriting?',
        answer: 'Copywriting starts with what you want to say. We start with who you actually are. The result is authentic content that sounds like you at your best—because it IS you, just articulated more clearly than you\'ve ever managed yourself.',
      },
      {
        question: 'How much of my time is required?',
        answer: '3-5 hours of interviews spread across the engagement, plus review and feedback time (typically 2-3 hours total). We work around your schedule and can conduct interviews via video call.',
      },
      {
        question: 'What can I use the deliverables for?',
        answer: 'Everything. Website, social media, pitch decks, speaking engagements, investor presentations, book proposals, podcast appearances. It\'s your story—use it everywhere. Full ownership transfers to you.',
      },
      {
        question: 'Can you help with ongoing content creation?',
        answer: 'The deliverables are designed to be a foundation your team (or other writers) can build from. We do offer limited retainer engagements for select clients who want ongoing support.',
      },
      {
        question: 'What determines the price within the $2,500-$12,000 range?',
        answer: 'Scope of narrative work (individual vs. company-wide), number of stakeholders interviewed, depth of content pillar development, and quantity of sample pieces. We scope projects after an initial call.',
      },
      {
        question: 'Do you work with teams or just individuals?',
        answer: 'Both. For companies, we can develop unified brand narrative and individual leader stories that complement each other. Team projects are at the higher end of the investment range.',
      },
    ],
  },
};

// ============================================================================
// Testimonials
// ============================================================================

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Light Brand Consulting helped us see possibilities we never knew existed. Their approach is unlike anything else—authentic, insightful, and transformative. The time is now to get ahead tomorrow.',
    author: 'Joseph McVeen',
    role: 'Founder',
    company: 'Growth Mastery AI',
    companyUrl: 'https://www.growthmastery.ai',
    avatar: '/images/avatars/avatar-joseph-mcveen.jpg',
    avatarPrompt: 'Professional headshot portrait of a confident male entrepreneur in his 30s-40s, founder of an AI growth company. Warm, genuine expression with an approachable smile. Smart business casual attire. Warm, natural lighting creating depth. Background in warm earth tones or soft charcoal, slightly blurred. He conveys both innovation and authenticity. High-quality editorial portrait photography style. Sharp focus, natural but polished look.',
  },
];

// ============================================================================
// Intake Questions
// ============================================================================

export const INTAKE_QUESTIONS: Record<string, IntakeQuestion[]> = {
  illumination: [
    {
      id: 'business_description',
      question: 'In 2-3 sentences, what does your business do?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'ai_experience',
      question: 'How would you describe your current AI experience?',
      type: 'select',
      options: [
        'Complete beginner',
        'Dabbled with ChatGPT',
        'Using AI tools regularly',
        'Integrated AI into operations',
      ],
    },
    {
      id: 'biggest_challenge',
      question: 'What\'s the #1 challenge you hope AI might help solve?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'desired_outcome',
      question: 'What would a successful session look like for you?',
      type: 'textarea',
    },
  ],
  blueprint: [
    {
      id: 'business_description',
      question: 'Describe your business and primary operations.',
      type: 'textarea',
      required: true,
    },
    {
      id: 'team_size',
      question: 'What is your team size?',
      type: 'select',
      options: ['1-10', '11-50', '51-200', '200+'],
    },
    {
      id: 'current_tech',
      question: 'What technology tools do you currently use?',
      type: 'textarea',
    },
    {
      id: 'transformation_goals',
      question: 'What are your top 3 goals for AI transformation?',
      type: 'textarea',
      required: true,
    },
  ],
  story: [
    {
      id: 'background',
      question: 'Tell us about your background and journey.',
      type: 'textarea',
      required: true,
    },
    {
      id: 'unique_perspective',
      question: 'What unique perspective do you bring to your industry?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'target_audience',
      question: 'Who is your primary audience?',
      type: 'textarea',
    },
    {
      id: 'content_goals',
      question: 'What do you want your content to achieve?',
      type: 'textarea',
    },
  ],
};

// ============================================================================
// Philosophy Items
// ============================================================================

export const PHILOSOPHY_ITEMS = [
  {
    title: 'Reveal, Don\'t Impose',
    description: 'Your business already contains its own genius. AI reveals it—we don\'t invent it. We illuminate what\'s already there.',
    accent: 'radiance-gold',
  },
  {
    title: 'Speed Beats Perfection',
    description: 'A 70% solution today beats a 100% solution in six months. The window is open now—we help you move decisively.',
    accent: 'radiance-amber',
  },
  {
    title: 'Clarity Is The Multiplier',
    description: 'One clear decision, properly executed, outperforms a dozen confused ones. We cut through the noise to what matters.',
    accent: 'clarity-cream',
  },
];

// ============================================================================
// Industry Experience (for About page)
// ============================================================================

export const INDUSTRIES_SERVED = [
  'Healthcare & Life Sciences',
  'Financial Services',
  'E-commerce & Retail',
  'Professional Services',
  'Manufacturing & Logistics',
  'Media & Entertainment',
  'Education & EdTech',
  'Real Estate & PropTech',
];

// ============================================================================
// Company Values (for About page)
// ============================================================================

export const COMPANY_VALUES = [
  {
    title: 'Radical Honesty',
    description: 'We\'ll tell you when AI isn\'t the answer. We\'ll tell you when you\'re not ready. The truth serves you better than what you want to hear.',
  },
  {
    title: 'Outcome Obsession',
    description: 'We measure success by what you accomplish, not by deliverables produced. A beautiful strategy deck that sits in a drawer is a failure.',
  },
  {
    title: 'Intellectual Humility',
    description: 'AI is evolving daily. We stay curious, admit what we don\'t know, and never pretend certainty where there is none.',
  },
  {
    title: 'Client Independence',
    description: 'The goal isn\'t recurring revenue from you—it\'s your ability to navigate AI decisions confidently without us.',
  },
];

// ============================================================================
// Founders - Three Families United by Mission
// ============================================================================

export interface Founder {
  name: string;
  role: string;
  description: string;
  avatarPrompt: string;
}

export interface FounderFamily {
  familyName: string;
  members: Founder[];
}

export const FOUNDERS_INTRO = {
  headline: 'Built Upon Families That Care',
  tagline: 'All founders united by a similar mission: to help you elevate your business to its highest potential.',
  closing: 'Together, this is the dream team that makes your dreams come true.',
};

export const FOUNDER_FAMILIES: FounderFamily[] = [
  {
    familyName: 'Lawless',
    members: [
      {
        name: 'Daniel Lawless',
        role: 'Master Architect & Technologist',
        description: 'Daniel oversees all development and strategy. A seasoned full stack developer with over 20 years of experience and a wide range of skills in the technical space.',
        avatarPrompt: 'Professional headshot of a seasoned male technologist and architect in his 40s-50s, warm and confident expression, modern business casual attire, warm natural lighting, slightly blurred professional background in earth tones, high-quality editorial portrait style.',
      },
      {
        name: 'Jennifer Lawless',
        role: 'Master of Relationships & Quantum Exploration',
        description: 'Jennifer guides our quantum technology exploration, helping us align with our inner technology through tools that leverage the quantum field. We believe a sound outer tech comes from a sound inner tech.',
        avatarPrompt: 'Professional headshot of a warm and intuitive woman in her 40s-50s, genuine smile, approachable yet wise expression, elegant business casual attire, warm soft lighting, slightly blurred warm-toned background, editorial portrait photography style.',
      },
    ],
  },
  {
    familyName: 'Courchesne',
    members: [
      {
        name: 'Nicholas Courchesne',
        role: 'Master of Business Development',
        description: 'Nicholas leads strategic partnerships, living the path of light and ready to share his journey with those ready to begin their own. A big guy with an even bigger heart—don\'t let his muscles fool you!',
        avatarPrompt: 'Professional headshot of a strong, muscular man in his 30s-40s with a warm, genuine smile, approachable and kind expression that shows his big heart, smart casual attire, warm natural lighting, professional background, editorial portrait style.',
      },
      {
        name: 'Nancy Courchesne',
        role: 'Master of Illumination',
        description: 'Nancy helps us illuminate the path we follow. Her unbelievable intuitive gift allows us to align with the right projects and guide our mission forward.',
        avatarPrompt: 'Professional headshot of a wise, intuitive woman in her 30s-40s, warm and knowing expression, elegant yet approachable attire, soft golden lighting creating warmth, slightly blurred professional background, high-quality editorial portrait.',
      },
    ],
  },
  {
    familyName: 'Demou',
    members: [
      {
        name: 'Andreas Demou',
        role: 'Master of Technical Design',
        description: 'Andreas leads frontend development and technical design. There isn\'t anyone out there better than this one. A man of few words who wields great power through body, mind, and spirit.',
        avatarPrompt: 'Professional headshot of a focused, powerful male designer/developer in his 30s-40s, calm and composed expression suggesting inner strength, modern minimal attire, clean professional lighting, subtle background, editorial portrait photography style.',
      },
      {
        name: 'Mike Demou',
        role: 'Master of Expression',
        description: 'Mike enables every brand to express itself to its fullest potential, showcasing everyone as if they were a piece of art.',
        avatarPrompt: 'Professional headshot of a creative, expressive man in his 30s-40s, artistic yet professional demeanor, warm confident smile, stylish creative attire, warm lighting with artistic quality, professional background, editorial portrait style.',
      },
    ],
  },
];

// ============================================================================
// Image Configuration & AI Generation Prompts
// ============================================================================

export const IMAGE_CONFIG = {
  // Hero Backgrounds
  heroes: {
    home: {
      src: '/images/hero/hero-home-bg.jpg',
      alt: 'Abstract golden light rays emerging from darkness',
      dimensions: '1920x1080',
      prompt: 'Abstract premium background for AI consulting company hero section. Subtle geometric light patterns emerging from darkness, with warm golden and amber light rays cutting through a deep charcoal atmosphere. Think of light breaking through morning fog or the moment of illumination. Ethereal floating particles of gold dust. Dark base (#0F0F10) transitioning to warm golden highlights (#E8B84A). Cinematic lighting, depth of field blur at edges. Ultra high resolution, suitable for text overlay. Sophisticated, not sci-fi or overly techy. The mood is "clarity emerging from confusion."',
    },
    services: {
      src: '/images/hero/hero-services-bg.jpg',
      alt: 'Three pathways of golden light converging',
      dimensions: '1920x800',
      prompt: 'Abstract premium background showing three distinct but connected pathways of light. Golden, amber, and cream light trails that seem to represent different service offerings, all converging and diverging from a central point of illumination. Deep charcoal base with warm, sophisticated lighting. Geometric and organic elements blended. Subtle gradient from dark edges to warmer center. Professional consulting aesthetic, not generic tech. Suitable for text overlay with services information.',
    },
    about: {
      src: '/images/hero/hero-about-bg.jpg',
      alt: 'Warm golden light emanating from a single source',
      dimensions: '1920x600',
      prompt: 'Sophisticated abstract background representing the concept of "illumination" and "seeing clearly." Warm golden light seemingly emanating from a single source, casting geometric shadows and creating depth. Think of light through a window at golden hour, but abstracted and geometric. Colors: deep charcoal (#0F0F10) transitioning through amber to warm gold (#E8B84A). The mood is contemplative, professional, and warm. Suitable for text overlay about company philosophy.',
    },
    insights: {
      src: '/images/hero/hero-insights-bg.jpg',
      alt: 'Multiple sources of warm light creating overlapping patterns',
      dimensions: '1920x600',
      prompt: 'Abstract background representing knowledge and insight. Multiple sources of warm golden light creating overlapping patterns, suggesting multiple perspectives or ideas coming together. Think of it as a visual representation of "thought leadership" - layered, nuanced, illuminating. Geometric light patterns on deep charcoal background. Warm gold (#E8B84A) and amber (#D4944C) highlights. Professional, sophisticated, suitable for a business blog section. Not overly tech or AI-robotic looking.',
    },
    contact: {
      src: '/images/hero/hero-contact-bg.jpg',
      alt: 'Two abstract light forms reaching toward each other',
      dimensions: '1200x600',
      prompt: 'Abstract, warm background for a contact page. The visual metaphor of "opening a conversation" or "making a connection." Perhaps two abstract light forms reaching toward each other, or a door opening with warm golden light streaming through, or hands about to meet rendered in light. Warm gold (#E8B84A) and amber (#D4944C) on charcoal (#0F0F10) background. The mood is inviting, approachable, and warm. Not cold or corporate. Suitable for text overlay.',
    },
  },

  // Service Card Images
  services: {
    illumination: {
      card: {
        src: '/images/services/service-illumination.jpg',
        alt: 'Abstract burst of golden light representing clarity',
        dimensions: '600x400',
        prompt: 'Premium service illustration for "Illumination Session" - a 90-minute AI consulting session. Abstract representation of a lightbulb moment or eureka instant. A burst of warm golden light (#E8B84A) emerging from darkness, with geometric light rays expanding outward. The feeling of sudden clarity and insight. Not a literal lightbulb - more abstract and sophisticated. Deep charcoal background with warm golden illumination. Suitable for a premium consulting service card. The style suggests "seeing possibilities you were blind to before."',
      },
      hero: {
        src: '/images/services/service-detail-illumination.jpg',
        alt: 'Geometric shards of golden light breaking through darkness',
        dimensions: '1200x600',
        prompt: 'Large hero image for Illumination Session detail page. A powerful moment of clarity and insight visualized abstractly. Imagine the instant where darkness gives way to understanding - geometric shards of warm golden light breaking through a dark surface. A single source of illumination creating beautiful geometric patterns and shadows. Colors: deep charcoal transitioning to warm gold (#E8B84A) and amber (#D4944C). Cinematic, dramatic, but warm and inviting not cold. The mood is "the moment everything becomes clear."',
      },
    },
    blueprint: {
      card: {
        src: '/images/services/service-blueprint.jpg',
        alt: 'Abstract strategic roadmap made of golden light',
        dimensions: '600x400',
        prompt: 'Premium service illustration for "AI Acceleration Blueprint" - a strategic planning service. Abstract representation of an architectural blueprint or strategic roadmap rendered in warm golden light. Geometric grid patterns, connecting nodes, pathways branching and converging. Think of it as a treasure map made of light. Colors: warm gold (#E8B84A) and amber (#D4944C) lines on deep charcoal (#0F0F10) background. The feeling is strategic, comprehensive, and navigable. Premium consulting aesthetic, not generic corporate.',
      },
      hero: {
        src: '/images/services/service-detail-blueprint.jpg',
        alt: 'Luminous network of interconnected strategic pathways',
        dimensions: '1200x600',
        prompt: 'Large hero image for AI Blueprint detail page. Abstract visualization of strategic architecture - interconnected nodes, pathways, and destinations forming a luminous network on a dark canvas. Think of a city map at night from above, but more geometric and abstract. The paths are made of warm golden light (#E8B84A) with key junction points in brighter amber (#D4944C). Deep charcoal background (#0F0F10). The feeling is comprehensive, strategic, and navigable - "a complete map for your AI journey."',
      },
    },
    story: {
      card: {
        src: '/images/services/service-story.jpg',
        alt: 'Flowing lines of light suggesting narrative and voice',
        dimensions: '600x400',
        prompt: 'Premium service illustration for "Breath of Life Story" - a narrative and personal branding service. Abstract representation of a story unfolding - perhaps flowing lines of golden light forming the suggestion of pages turning, or breath becoming words becoming light. Organic, flowing forms contrasting with geometric elements. Warm cream (#FDF6E3) and gold (#E8B84A) on deep charcoal background. The feeling is personal, transformative, and authentic. The image should suggest "your unique voice and story being articulated and amplified."',
      },
      hero: {
        src: '/images/services/service-detail-story.jpg',
        alt: 'Flowing organic lines of light suggesting personal narrative',
        dimensions: '1200x600',
        prompt: 'Large hero image for Story service detail page. Abstract visualization of personal narrative and transformation. Flowing, organic lines of warm cream (#FDF6E3) and gold (#E8B84A) light that suggest handwriting, voice, or breath becoming visible. Perhaps the suggestion of an open book with light flowing from its pages, but highly abstracted. Deep charcoal background. The feeling is intimate, authentic, and transformative - "your story, finally articulated."',
      },
    },
  },

  // Blog Post Featured Images
  blog: {
    'strategic-moment': {
      src: '/images/blog/blog-strategic-moment.jpg',
      alt: 'A narrow beam of golden light representing opportunity window',
      dimensions: '1200x630',
      prompt: 'Abstract conceptual image representing a pivotal moment in time - a window of opportunity. Visualize the concept as a narrow beam of warm golden light (#E8B84A) breaking through darkness, creating a sense of urgency and possibility. Perhaps geometric shapes representing a timeline with one section illuminated brightly. The feeling is "act now, the window is open." Deep charcoal background with dramatic warm lighting. Sophisticated, not corporate. Suitable for a strategic AI business article.',
    },
    'confusion-to-clarity': {
      src: '/images/blog/blog-confusion-to-clarity.jpg',
      alt: 'Transformation from chaos to organized golden light patterns',
      dimensions: '1200x630',
      prompt: 'Abstract transformation image showing the journey from confusion to clarity. On the left: tangled, chaotic abstract lines in muted gray. Transitioning through the center: the lines begin to organize and warm up in color. On the right: clean, organized golden light patterns (#E8B84A) representing clarity. The visual metaphor of chaos becoming order, confusion becoming understanding. Dark background with the transformation happening through warm illumination. Premium, sophisticated aesthetic for consulting blog.',
    },
    'opportunity-mapping': {
      src: '/images/blog/blog-opportunity-mapping.jpg',
      alt: 'Constellation-like network of golden light nodes',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of opportunity mapping - imagine a constellation map or neural network rendered in warm golden light (#E8B84A) and amber (#D4944C). Multiple nodes with one or two highlighted as "starting points" with brighter illumination. Connecting lines showing pathways and relationships. Deep charcoal (#0F0F10) background creating depth. The feeling is "finding your entry point into a world of possibilities." Strategic, sophisticated, suitable for business methodology article.',
    },
    'ai-hype-reality': {
      src: '/images/blog/blog-hype-vs-reality.jpg',
      alt: 'Contrast between flashy effects and solid warm illumination',
      dimensions: '1200x630',
      prompt: 'Abstract conceptual image showing contrast between hype and reality. Perhaps two visual elements: on one side, exaggerated, flashy abstract light effects (bright but shallow), and on the other, solid, warm, sustained illumination in golden tones (#E8B84A) - suggesting substance. The contrast between fireworks and the sun, between sparkle and true light. Dark background with the genuine light being warm and grounding. Sophisticated metaphor for a business reality-check article.',
    },
    'first-ai-win': {
      src: '/images/blog/blog-first-ai-win.jpg',
      alt: 'Single point of golden light growing outward',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of a first victory or breakthrough. A single point of warm golden light (#E8B84A) in the center growing outward, suggesting the start of something bigger. Perhaps the shape suggests "1" or "first" abstractly. Radiating lines of light expanding from the center point. The feeling is momentum, a beginning, potential energy. Deep charcoal background with warm, energizing illumination. Optimistic but sophisticated - suitable for an action-oriented business article.',
    },
  },

  // About Page
  about: {
    team: {
      src: '/images/about/team-photo.jpg',
      alt: 'Light Brand Consulting founding families',
      dimensions: '1200x800',
      prompt: 'Professional group photo of 6 people representing three families united by a shared mission. The group includes couples standing together warmly - conveying genuine connection and family bonds. Diverse ages and backgrounds, all with approachable, authentic expressions. Smart business casual attire. Warm, natural lighting suggesting golden hour. Background is an elegant, minimal space with warm earth tones. The mood is collaborative, genuine, and grounded - a team built on family values and shared purpose. High-quality editorial photography style, not overly corporate.',
    },
    origin: {
      src: '/images/about/origin-story.jpg',
      alt: 'Small spark of light expanding outward',
      dimensions: '600x400',
      prompt: 'Abstract illustration representing the origin of "Light Brand Consulting." A small spark or flame of warm golden light (#E8B84A) at the center, with gentle ripples of light expanding outward. The visual metaphor of an idea becoming something bigger. Perhaps suggest the shape of a lantern being lit or a single match igniting. Dark charcoal background with warm, hopeful illumination. The feeling is "the moment of founding, the beginning of the mission." Sophisticated and symbolic.',
    },
    industries: {
      src: '/images/about/industries-collage.jpg',
      alt: 'Abstract mosaic representing multiple industries',
      dimensions: '1000x400',
      prompt: 'Abstract collage or mosaic representing multiple industries served by an AI consulting firm. Eight interconnected abstract shapes, each with subtle visual hints of: healthcare (organic curves), finance (precise lines), e-commerce (flowing commerce), professional services (people shapes), manufacturing (geometric mechanics), media (flowing creativity), education (growth symbols), real estate (architectural forms). All rendered in warm golden (#E8B84A) and amber (#D4944C) light on charcoal background. Connected by subtle light threads suggesting shared principles across industries.',
    },
  },

  // Value Icons
  values: {
    radicalHonesty: {
      src: '/images/icons/values/value-radical-honesty.svg',
      alt: 'Icon representing radical honesty',
      dimensions: '80x80',
      prompt: 'Minimalist icon representing "radical honesty" for a consulting company. Perhaps an abstract eye that is wide open, or a mirror reflecting clearly, or speech bubbles with clarity symbols. Warm gold (#E8B84A) on transparent background. Clean geometric lines, premium feel. The icon should suggest truth-telling, transparency, and directness. Not generic - specific to the concept of honest business communication.',
    },
    outcomeObsession: {
      src: '/images/icons/values/value-outcome-obsession.svg',
      alt: 'Icon representing outcome obsession',
      dimensions: '80x80',
      prompt: 'Minimalist icon representing "outcome obsession" - focus on results rather than process. Perhaps a target with an arrow hitting center, or a finish line flag, or a checkmark with momentum lines. Warm gold (#E8B84A) on transparent background. Clean geometric design, premium consulting aesthetic. The icon should suggest achievement, completion, and results-focused thinking.',
    },
    intellectualHumility: {
      src: '/images/icons/values/value-intellectual-humility.svg',
      alt: 'Icon representing intellectual humility',
      dimensions: '80x80',
      prompt: 'Minimalist icon representing "intellectual humility" - staying curious and admitting uncertainty. Perhaps an open book with a question mark, or a lightbulb that is half-illuminated, or circular arrows suggesting continuous learning. Warm gold (#E8B84A) on transparent background. Clean, sophisticated geometric design. The icon should suggest openness, curiosity, and comfort with uncertainty.',
    },
    clientIndependence: {
      src: '/images/icons/values/value-client-independence.svg',
      alt: 'Icon representing client independence',
      dimensions: '80x80',
      prompt: 'Minimalist icon representing "client independence" - the goal of making clients self-sufficient. Perhaps a bird taking flight, or hands releasing something, or a key being handed over. Warm gold (#E8B84A) on transparent background. Clean geometric lines, premium feel. The icon should suggest empowerment, autonomy, and letting go. Not paternalistic - celebrating freedom.',
    },
  },

  // Process Step Icons
  process: {
    discover: {
      src: '/images/icons/process/process-discover.svg',
      alt: 'Discover phase icon',
      dimensions: '120x120',
      prompt: 'Minimalist icon for "Discover" phase - the first step in a consulting process. Abstract representation of exploration or investigation - perhaps a magnifying glass made of light, or concentric circles suggesting radar/search, or an eye opening. Warm gold (#E8B84A) color. Clean geometric design suitable for a process diagram. The feeling is curiosity, investigation, and listening. Premium consulting aesthetic.',
    },
    illuminate: {
      src: '/images/icons/process/process-illuminate.svg',
      alt: 'Illuminate phase icon',
      dimensions: '120x120',
      prompt: 'Minimalist icon for "Illuminate" phase - the insight-revealing step in consulting. Abstract representation of light being shed or revelation - perhaps a prism splitting light into beams, or a lightbulb in geometric form, or rays emanating from a central point. Warm amber (#D4944C) color. Clean geometric design for process visualization. The feeling is insight, revelation, and "seeing clearly for the first time."',
    },
    activate: {
      src: '/images/icons/process/process-activate.svg',
      alt: 'Activate phase icon',
      dimensions: '120x120',
      prompt: 'Minimalist icon for "Activate" phase - the action and independence step. Abstract representation of motion, launch, or empowerment - perhaps an arrow launching, or a rocket stylized, or a figure stepping forward into light. Warm cream (#FDF6E3) color. Clean geometric design for process diagram. The feeling is action, momentum, and independence. Not aggressive - confident and purposeful.',
    },
    book: {
      src: '/images/icons/process/process-book.svg',
      alt: 'Book step icon',
      dimensions: '80x80',
      prompt: 'Minimalist icon for "Book" step - scheduling a session. Abstract calendar with a checkmark, or a clock with a golden accent, or a simple scheduling grid with one highlighted slot. Warm gold (#E8B84A) on transparent. Clean, modern, not overly detailed. Premium aesthetic for a service booking process.',
    },
    prepare: {
      src: '/images/icons/process/process-prepare.svg',
      alt: 'Prepare step icon',
      dimensions: '80x80',
      prompt: 'Minimalist icon for "Prepare" step - getting ready for a session. Abstract clipboard with lines, or a checklist being completed, or organized dots coming into alignment. Warm gold (#E8B84A) on transparent. Clean geometric design. The feeling is organization, readiness, and anticipation.',
    },
    connect: {
      src: '/images/icons/process/process-connect.svg',
      alt: 'Connect step icon',
      dimensions: '80x80',
      prompt: 'Minimalist icon for "Connect" step - the actual consultation session. Two abstract elements meeting or converging - perhaps overlapping circles, or two lines becoming intertwined, or video chat suggestion. Warm gold (#E8B84A) on transparent. Clean design suggesting human connection and collaboration.',
    },
    receive: {
      src: '/images/icons/process/process-receive.svg',
      alt: 'Receive step icon',
      dimensions: '80x80',
      prompt: 'Minimalist icon for "Receive" step - getting deliverables after session. Abstract representation of receiving something valuable - perhaps hands holding a glowing document, or a package opening with light, or a download arrow with sparkle. Warm gold (#E8B84A) on transparent. The feeling is receiving something valuable and actionable.',
    },
  },

  // Industry Icons
  industries: {
    healthcare: {
      src: '/images/icons/industries/industry-healthcare.svg',
      alt: 'Healthcare industry icon',
      dimensions: '64x64',
      prompt: 'Minimalist icon representing Healthcare & Life Sciences industry. Abstract heart with pulse line, or DNA helix simplified, or medical cross with warmth. Warm gold (#E8B84A) on transparent. Clean geometric design, not overly medical looking. Premium consulting aesthetic.',
    },
    finance: {
      src: '/images/icons/industries/industry-finance.svg',
      alt: 'Financial services icon',
      dimensions: '64x64',
      prompt: 'Minimalist icon representing Financial Services industry. Abstract chart trending upward, or connected currency symbols, or secure vault suggestion. Warm gold (#E8B84A) on transparent. Clean geometric design, sophisticated and premium.',
    },
    ecommerce: {
      src: '/images/icons/industries/industry-ecommerce.svg',
      alt: 'E-commerce industry icon',
      dimensions: '64x64',
      prompt: 'Minimalist icon representing E-commerce & Retail. Abstract shopping bag with digital elements, or cart/store symbol, or flowing commerce suggestion. Warm gold (#E8B84A) on transparent. Modern, clean design.',
    },
    professional: {
      src: '/images/icons/industries/industry-professional.svg',
      alt: 'Professional services icon',
      dimensions: '64x64',
      prompt: 'Minimalist icon representing Professional Services industry. Abstract briefcase or handshake, or interconnected professional figures. Warm gold (#E8B84A) on transparent. Clean geometric design, premium feel.',
    },
    manufacturing: {
      src: '/images/icons/industries/industry-manufacturing.svg',
      alt: 'Manufacturing industry icon',
      dimensions: '64x64',
      prompt: 'Minimalist icon representing Manufacturing & Logistics. Abstract gear or conveyor, or flow/process suggestion, or precision machinery hint. Warm gold (#E8B84A) on transparent. Clean geometric design.',
    },
    media: {
      src: '/images/icons/industries/industry-media.svg',
      alt: 'Media industry icon',
      dimensions: '64x64',
      prompt: 'Minimalist icon representing Media & Entertainment industry. Abstract play button, or creative spark, or content creation suggestion. Warm gold (#E8B84A) on transparent. Creative but professional.',
    },
    education: {
      src: '/images/icons/industries/industry-education.svg',
      alt: 'Education industry icon',
      dimensions: '64x64',
      prompt: 'Minimalist icon representing Education & EdTech. Abstract graduation cap or book with digital element, or growth/learning curve. Warm gold (#E8B84A) on transparent. Clean, inspiring design.',
    },
    realestate: {
      src: '/images/icons/industries/industry-realestate.svg',
      alt: 'Real estate industry icon',
      dimensions: '64x64',
      prompt: 'Minimalist icon representing Real Estate & PropTech. Abstract building or home with tech overlay, or key/door suggestion. Warm gold (#E8B84A) on transparent. Clean geometric design.',
    },
  },

  // Contact Page Icons
  contact: {
    speaking: {
      src: '/images/icons/contact/contact-speaking.svg',
      alt: 'Speaking and workshops icon',
      dimensions: '80x80',
      prompt: 'Minimalist icon for "Speaking & Workshops" - conference and presentation services. Abstract podium with radiating light, or a microphone with sound waves, or a stage with spotlight. Warm gold (#E8B84A) on transparent. Clean geometric design. The feeling is authority, communication, and inspiring audiences.',
    },
    media: {
      src: '/images/icons/contact/contact-media.svg',
      alt: 'Media and press icon',
      dimensions: '80x80',
      prompt: 'Minimalist icon for "Media & Press" inquiries. Abstract representation of media - perhaps a recording symbol, or newspaper/article shape, or podcast waveform. Warm gold (#E8B84A) on transparent. Clean, modern design. The feeling is thought leadership and public presence.',
    },
    partnerships: {
      src: '/images/icons/contact/contact-partnerships.svg',
      alt: 'Partnerships icon',
      dimensions: '80x80',
      prompt: 'Minimalist icon for "Partnerships" - business collaboration inquiries. Abstract handshake or two elements interlocking, or puzzle pieces connecting. Warm gold (#E8B84A) on transparent. Clean geometric design. The feeling is mutual benefit, collaboration, and complementary strengths.',
    },
    success: {
      src: '/images/icons/contact/success-confirmation.svg',
      alt: 'Success confirmation illustration',
      dimensions: '200x200',
      prompt: 'Celebratory illustration for form submission success. Abstract burst of warm light with a central checkmark or completion symbol. Gentle radiating particles or sparkles in warm gold (#E8B84A) and amber (#D4944C). The feeling is accomplishment, celebration, and "message received." Not over-the-top - elegant and warm. Dark background compatible.',
    },
  },

  // Logo
  logo: {
    horizontal: {
      src: '/images/logo/logo-horizontal.svg',
      alt: 'Light Brand Consulting logo',
      dimensions: '200x50',
      prompt: 'Minimalist luxury logo design for "Light Brand" consulting company, featuring an elegant abstract representation of illumination or a stylized "L" and "B" monogram with subtle golden light rays emanating outward. The design should feel premium and sophisticated, with clean geometric lines. Color palette: warm gold (#E8B84A) on transparent background. Modern sans-serif typography, letter spacing elegant and airy. The logo should convey clarity, illumination, and premium business consulting. Vector style, suitable for dark backgrounds.',
    },
    icon: {
      src: '/images/logo/logo-icon.svg',
      alt: 'Light Brand icon',
      dimensions: '64x64',
      prompt: 'Minimalist square icon logo for "Light Brand" consulting, featuring an abstract geometric representation of illumination - perhaps a stylized lantern, prism splitting light, or concentric circles of golden light expanding outward. Warm gold (#E8B84A) and amber (#D4944C) gradients on transparent background. Clean, modern, would work as a favicon or app icon. Premium luxury feel, not generic corporate.',
    },
  },

  // Background Patterns
  patterns: {
    particles: {
      src: '/images/patterns/pattern-light-particles.png',
      alt: 'Floating light particles pattern',
      dimensions: '1920x1080',
      prompt: 'Seamless abstract pattern of floating light particles on dark background. Soft bokeh-like circles of warm gold (#E8B84A) and amber (#D4944C) at various opacities floating on deep charcoal (#0F0F10). Some particles larger and softer, others smaller and sharper. The feeling is magical, premium, like dust catching sunlight. Subtle enough for text overlay, interesting enough to add depth. Tileable/seamless pattern.',
    },
    grid: {
      src: '/images/patterns/pattern-geometric-grid.svg',
      alt: 'Subtle geometric grid pattern',
      dimensions: '800x800',
      prompt: 'Seamless geometric grid pattern suggesting strategic thinking and structure. Thin golden (#E8B84A) lines forming a subtle hexagonal or isometric grid on transparent or dark background. Very subtle, low opacity - meant as background texture not focal point. Premium consulting aesthetic, suggests structure and strategy.',
    },
    glow: {
      src: '/images/patterns/gradient-warm-glow.jpg',
      alt: 'Warm center glow gradient',
      dimensions: '1920x1080',
      prompt: 'Abstract gradient background with warm center glow. Deep charcoal (#0F0F10) at edges transitioning to subtle warm amber glow in center. Very subtle - 90% dark with just a hint of warmth emerging from center. Suitable as background for dark mode sections. Premium, sophisticated, not garish. The feeling is "light emerging from darkness."',
    },
    paper: {
      src: '/images/patterns/texture-premium-paper.jpg',
      alt: 'Premium paper texture',
      dimensions: '1920x1080',
      prompt: 'Subtle premium paper texture in deep charcoal tones. Very slight grain and fiber texture suggesting high-quality letterpress paper or luxury stationery. Mostly uniform dark (#0F0F10 to #1A1A1C) with very subtle texture variation. Adds tactile depth without being distracting. Suitable for layering under content sections.',
    },
  },

  // Capacity Gap Illustration
  capacityGap: {
    src: '/images/hero/capacity-gap-illustration.svg',
    alt: 'Illustration of the capacity gap journey',
    dimensions: '800x400',
    prompt: 'Elegant infographic-style illustration showing transformation journey. Three connected elements: (1) A dim, unfocused circle on the left representing uncertainty, (2) A glowing golden bridge or prism in the center representing "the bridge of clarity", (3) A luminous, fully illuminated circle on the right representing "fullest capacity". Abstract, geometric style with warm gold (#E8B84A) and amber (#D4944C) gradients. Clean lines, premium feel. Dark charcoal background (#1A1A1C). The style should feel like premium consulting materials, not corporate clipart.',
  },
};
