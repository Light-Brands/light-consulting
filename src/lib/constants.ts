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
// AI Maturity Ladder Framework
// ============================================================================

export interface MaturityLevel {
  level: number;
  identity: string;
  description: string;
  characteristics: string[];
}

export const AI_MATURITY_LADDER: MaturityLevel[] = [
  {
    level: 1,
    identity: 'Tool Collector',
    description: 'Experiments widely, no durable leverage',
    characteristics: [
      'Tries many AI tools without clear strategy',
      'Uses AI for one-off tasks with no systematic approach',
      'No documented workflows or processes involving AI',
      'AI usage is individual, not organizational',
    ],
  },
  {
    level: 2,
    identity: 'Copy-Paster',
    description: 'Uses prompts/templates, incremental wins',
    characteristics: [
      'Has discovered useful prompts and templates',
      'Achieves sporadic efficiency gains',
      'Still manually triggers each AI interaction',
      'Knowledge stays with individuals, not systems',
    ],
  },
  {
    level: 3,
    identity: 'Builder',
    description: 'Builds automations, still founder-dependent',
    characteristics: [
      'Has built custom automations and workflows',
      'AI handles repetitive tasks automatically',
      'Founder/key person still central to most decisions',
      'Systems work but don\'t scale without key people',
    ],
  },
  {
    level: 4,
    identity: 'Systematizer',
    description: 'Core workflows run through AI systems',
    characteristics: [
      'Major business processes run on AI infrastructure',
      'Team members can operate independently of founder',
      'Documented systems that new hires can learn',
      'Business operates efficiently with reduced founder input',
    ],
  },
  {
    level: 5,
    identity: 'Architect',
    description: 'Owns infrastructure + intelligence, durable moat',
    characteristics: [
      'AI infrastructure is a competitive advantage',
      'Proprietary systems that compound over time',
      'Business generates insights and improves automatically',
      'Defensible market position built on AI-native operations',
    ],
  },
];

// ============================================================================
// Light Brand Method Phases
// ============================================================================

export const LIGHT_BRAND_METHOD = {
  phase1: {
    name: 'AI Level Diagnostic',
    purpose: 'Establish baseline maturity + leverage gaps',
    maps: [
      'Workflows & operating model',
      'Bottlenecks and dependency points',
      'Current AI utilization',
      'Highest-leverage system opportunities',
    ],
    outputs: [
      'AI Maturity Map',
      'Bottleneck Report',
      'Opportunity Matrix',
      'Leverage Forecast (time + revenue)',
    ],
  },
  phase2: {
    name: 'Command Center Build',
    purpose: 'Install the operating infrastructure that removes founder dependence',
    builds: [
      'Lead and follow-up automation',
      'Sales systems (pipeline + nurture + conversions)',
      'Operational workflows',
      'Content production systems',
      'Internal intelligence tools',
    ],
    outcome: 'Business shifts from "effort-driven" to "system-driven"',
  },
  phase3: {
    name: 'Authority Engine',
    purpose: 'Convert expertise into market position and compounding demand',
    turns: ['Story + insight + IP'],
    into: [
      'Thought leadership assets',
      'Market narrative',
      'Authority content systems',
      'Competitive differentiation ("moat")',
    ],
  },
};

// ============================================================================
// Fit Criteria
// ============================================================================

export const FIT_CRITERIA = {
  idealClients: [
    'Founders / operators with real traction',
    'Businesses where the founder is the bottleneck',
    'Teams ready to implement, not experiment',
    'Leaders seeking leverage, not novelty',
  ],
  notAFit: [
    'Dabblers and tool collectors',
    'Shortcut seekers',
    'Clients who want isolated "AI hacks" without structural change',
  ],
};

// ============================================================================
// Services Data
// ============================================================================

export const SERVICES: Record<string, Service> = {
  diagnostic: {
    id: 'diagnostic',
    name: 'AI Level Diagnostic',
    tagline: 'See exactly where you are on the AI Maturity Ladder',
    description: 'A comprehensive diagnostic that maps your current AI maturity level, identifies leverage gaps, and reveals the highest-impact opportunities for systematization. This is where every engagement begins—clarity before action.',
    investment: '$1,500 – $15,000',
    duration: '1–2 weeks',
    deliverables: [
      'AI Maturity Map showing your current level (1-5) across all business functions',
      'Bottleneck Report identifying founder-dependency points and constraints',
      'Opportunity Matrix with prioritized systemization opportunities',
      'Leverage Forecast projecting time and revenue gains from each opportunity',
      'Current AI utilization audit across tools and workflows',
      'Roadmap to next maturity level with specific milestones',
    ],
    process: [
      { step: 1, title: 'Map', description: 'Deep-dive into your workflows, operating model, and current AI utilization' },
      { step: 2, title: 'Diagnose', description: 'Identify bottlenecks, dependency points, and leverage gaps across your business' },
      { step: 3, title: 'Analyze', description: 'Score your AI maturity level and identify highest-impact opportunities' },
      { step: 4, title: 'Deliver', description: 'Present findings with clear prioritization and actionable roadmap' },
    ],
    idealFor: [
      'Founders at Levels 1–3 seeking clarity on their AI maturity',
      'Leaders who sense they\'re leaving leverage on the table',
      'Businesses that have tried AI tools but haven\'t achieved systematic gains',
      'Companies preparing for the Command Center Build phase',
      'Anyone who needs a clear, honest assessment before investing further',
    ],
    notFor: [
      'Those seeking someone to "do AI for them" without understanding',
      'Companies not willing to be honest about their current state',
      'Organizations without decision-making authority present',
      'Those looking for generic AI advice rather than specific diagnosis',
    ],
    faq: [
      {
        question: 'What determines the price range ($1,500–$15,000)?',
        answer: 'Scope and complexity. A solo founder with a straightforward business is on the lower end. Multi-department organizations with complex operations, multiple stakeholders to interview, and deeper analysis requirements are higher. We provide a fixed quote after an initial scoping call.',
      },
      {
        question: 'What\'s included in the AI Maturity Map?',
        answer: 'A visual representation of your maturity level across key business functions: revenue operations, delivery/fulfillment, internal operations, content/marketing, and decision-making. Each area is scored 1-5 with specific findings and recommendations.',
      },
      {
        question: 'How is this different from a typical AI audit?',
        answer: 'Most AI audits focus on tools. We focus on structure and leverage. The question isn\'t "what AI tools are you using?" It\'s "how close are you to a business that runs on systems rather than effort?" This maturity-focused lens changes everything.',
      },
      {
        question: 'What happens after the Diagnostic?',
        answer: 'You have three options: (1) Execute on your own using the roadmap, (2) Engage us for Command Center Build to implement the infrastructure, or (3) Continue to the full AI Architect Ascension program. Many clients start here and grow into deeper engagements.',
      },
      {
        question: 'Do I need AI experience for this?',
        answer: 'No. In fact, we often find that clients with less AI experience get more value—they haven\'t developed bad habits or misconceptions. We meet you exactly where you are and translate everything into business language.',
      },
      {
        question: 'Can my team participate?',
        answer: 'Absolutely. We recommend including key stakeholders in the process. More perspectives reveal more opportunities, and team buy-in is critical for implementation success.',
      },
    ],
  },
  'command-center': {
    id: 'command-center',
    name: 'Command Center Build',
    tagline: 'Install operating infrastructure that removes founder dependence',
    description: 'We design and build the AI-powered operating infrastructure that shifts your business from effort-driven to system-driven. This is where theory becomes reality—actual systems that run your business while you focus on what matters most.',
    investment: '$20,000 – $80,000',
    duration: '4–12 weeks',
    deliverables: [
      'Lead and follow-up automation systems',
      'Sales infrastructure (pipeline, nurture sequences, conversion optimization)',
      'Operational workflow automation',
      'Content production systems',
      'Internal intelligence tools and dashboards',
      'Documentation and training for your team',
      'System monitoring and optimization protocols',
    ],
    process: [
      { step: 1, title: 'Architect', description: 'Design the system architecture based on your Diagnostic findings and priorities' },
      { step: 2, title: 'Build', description: 'Construct the core infrastructure: automations, integrations, and workflows' },
      { step: 3, title: 'Integrate', description: 'Connect systems to your existing tools and train your team on operations' },
      { step: 4, title: 'Optimize', description: 'Refine based on real-world performance and ensure sustainable operation' },
    ],
    idealFor: [
      'Founders at Level 3 ready to systematize and remove themselves as the bottleneck',
      'Businesses with proven revenue seeking operational leverage',
      'Leaders who completed the AI Level Diagnostic and are ready to build',
      'Companies tired of incremental AI gains and ready for infrastructure',
      'Teams prepared to implement and maintain new systems',
    ],
    notFor: [
      'Early-stage businesses without product-market fit',
      'Companies seeking AI experiments rather than infrastructure',
      'Organizations without bandwidth to participate in implementation',
      'Those wanting a "set and forget" solution (systems require stewardship)',
    ],
    faq: [
      {
        question: 'What types of systems do you build?',
        answer: 'The specific systems depend on your Diagnostic findings, but common builds include: automated lead capture and nurturing, sales pipeline management, client onboarding workflows, content repurposing systems, reporting dashboards, and internal knowledge bases.',
      },
      {
        question: 'What tools and platforms do you work with?',
        answer: 'We\'re tool-agnostic and work with whatever makes sense for your business. Common platforms include Make/Zapier for automation, various CRMs, AI APIs (OpenAI, Claude, etc.), and custom integrations where needed.',
      },
      {
        question: 'How much involvement is required from my team?',
        answer: 'Plan for 3-5 hours per week during the build phase. We need access to stakeholders for requirements gathering, feedback on prototypes, and training. The more engaged you are, the better the outcome.',
      },
      {
        question: 'What happens after the build is complete?',
        answer: 'You own everything we build. We provide documentation, training, and a handoff process. Many clients continue to Authority Engine to build on their new infrastructure. We also offer ongoing optimization retainers for those who want continued support.',
      },
      {
        question: 'What determines the price range ($20,000–$80,000)?',
        answer: 'Scope and complexity of systems required. A focused build addressing 2-3 core workflows is on the lower end. Comprehensive infrastructure spanning multiple departments with custom integrations is higher. We scope precisely after the Diagnostic.',
      },
      {
        question: 'Do I need to complete the Diagnostic first?',
        answer: 'Yes. The Diagnostic ensures we\'re building the right things in the right order. Skipping it often leads to building systems that don\'t address the real bottlenecks. The Diagnostic investment is credited toward Command Center Build.',
      },
    ],
  },
  'authority-engine': {
    id: 'authority-engine',
    name: 'Authority Engine',
    tagline: 'Convert expertise into market position and compounding demand',
    description: 'Transform your story, insight, and intellectual property into a systematic engine that generates thought leadership, market narrative, and competitive differentiation. This is how you build a moat that compounds over time.',
    investment: '$50,000 – $150,000+',
    duration: '8–16 weeks',
    deliverables: [
      'Brand narrative framework and market positioning',
      'Thought leadership content systems',
      'IP extraction and articulation',
      'Authority content production infrastructure',
      'Market narrative and competitive differentiation strategy',
      'Content distribution and amplification systems',
      'Demand generation infrastructure',
      'Ongoing content calendar and editorial systems',
    ],
    process: [
      { step: 1, title: 'Extract', description: 'Deep excavation of your unique story, insights, and intellectual property' },
      { step: 2, title: 'Architect', description: 'Design the authority engine: content systems, distribution channels, demand loops' },
      { step: 3, title: 'Build', description: 'Construct thought leadership infrastructure and content production systems' },
      { step: 4, title: 'Activate', description: 'Launch authority engine with initial content and optimization protocols' },
    ],
    idealFor: [
      'Founders at Level 4 with operational infrastructure in place',
      'Leaders with deep expertise ready to become category authorities',
      'Companies seeking to build defensible market position through thought leadership',
      'Businesses ready to invest in demand that compounds rather than depletes',
      'Those prepared for the full AI Architect Ascension journey',
    ],
    notFor: [
      'Companies without operational infrastructure (build Command Center first)',
      'Those seeking quick-hit marketing rather than systematic authority',
      'Leaders uncomfortable with visibility and thought leadership positioning',
      'Organizations without genuine expertise or unique perspective to share',
    ],
    faq: [
      {
        question: 'What\'s the difference between this and content marketing?',
        answer: 'Content marketing is tactical—create content, distribute content, hope for results. Authority Engine is systematic—we build infrastructure that continuously converts your expertise into market position. It\'s the difference between fishing and building a fish farm.',
      },
      {
        question: 'What does "IP extraction" mean?',
        answer: 'You have unique insights, frameworks, and perspectives developed over years of experience. IP extraction is the process of articulating and systematizing these into assets: proprietary frameworks, signature methodologies, unique points of view that become associated with your brand.',
      },
      {
        question: 'How does this build a "moat"?',
        answer: 'Competitors can copy your products and services. They can\'t copy your authority, your story, or your relationship with your market. Authority Engine builds differentiation that compounds—the longer you run it, the harder it is to catch up.',
      },
      {
        question: 'What\'s the time investment required?',
        answer: 'Significant at the start (5-8 hours/week during extraction phase), then decreasing as systems take over. The engine is designed to run with minimal ongoing input—that\'s the point.',
      },
      {
        question: 'Do I need Command Center Build first?',
        answer: 'Strongly recommended. Authority Engine generates demand—you need infrastructure to capture and convert that demand. Building authority without operational infrastructure is like turning on a firehose with no bucket.',
      },
      {
        question: 'What makes this worth $50,000+?',
        answer: 'ROI. Authority Engine clients typically see 3-5x return within 12 months through increased deal flow, premium pricing power, and reduced sales friction. This isn\'t a cost—it\'s infrastructure that generates returns for years.',
      },
    ],
  },
  ascension: {
    id: 'ascension',
    name: 'AI Architect Ascension',
    tagline: '90-day infrastructure + authority build',
    description: 'The complete transformation from wherever you are to Level 5 AI Architect. This flagship engagement includes AI Level Diagnostic, Command Center Build, and Authority Engine—everything needed to install operating infrastructure that compounds.',
    investment: '$50,000 – $150,000',
    duration: '90 days',
    deliverables: [
      'Complete AI Level Diagnostic with maturity mapping',
      'Full Command Center Build (all operational infrastructure)',
      'Authority Engine installation',
      'Ongoing strategy and optimization throughout',
      'Quarterly business reviews for first year',
      'Priority access to Light Brand team',
      'All documentation, training, and intellectual property',
    ],
    process: [
      { step: 1, title: 'Diagnose', description: 'Comprehensive AI maturity assessment and opportunity mapping' },
      { step: 2, title: 'Build', description: 'Install Command Center infrastructure across all priority areas' },
      { step: 3, title: 'Architect', description: 'Construct Authority Engine for market position and demand' },
      { step: 4, title: 'Optimize', description: 'Refine all systems and establish ongoing optimization protocols' },
    ],
    idealFor: [
      'Founders committed to reaching Level 5 AI Architect status',
      'Leaders ready to invest in complete transformation, not incremental improvement',
      'Businesses with real traction seeking permanent competitive advantage',
      'Those who value speed and want the full journey in 90 days',
      'Companies aligned with Light Brand\'s mission and values',
    ],
    notFor: [
      'Those seeking to "test" AI before committing',
      'Companies without the bandwidth for intensive transformation',
      'Leaders not ready to be positioned as thought leaders',
      'Organizations seeking quick fixes rather than structural change',
    ],
    faq: [
      {
        question: 'Why 90 days?',
        answer: 'Long enough to build real infrastructure, short enough to maintain momentum. 90 days creates urgency that drives results. We\'ve found this is the optimal timeframe for complete transformation without losing focus.',
      },
      {
        question: 'How is pricing determined?',
        answer: 'Scope-dependent based on business complexity, team size, and breadth of systems required. We provide a fixed quote after an initial discovery conversation. The investment reflects the comprehensive nature of the engagement.',
      },
      {
        question: 'What\'s included in "ongoing strategy and optimization"?',
        answer: 'Weekly check-ins during the 90-day build, quarterly business reviews for the first year post-completion, and priority access to our team for questions and guidance. We\'re invested in your long-term success.',
      },
      {
        question: 'Is this just the three services bundled together?',
        answer: 'It\'s more integrated than that. When we engage for the full Ascension, we design everything as a unified system from day one. The phases inform each other, and we optimize for the complete outcome rather than individual deliverables.',
      },
      {
        question: 'What results can I expect?',
        answer: 'Clients typically see: 40-60% reduction in founder time on operations, 2-3x increase in capacity without adding headcount, systematic lead generation and nurturing, and market position as a category authority. Results vary, but transformation is the norm.',
      },
      {
        question: 'How do I know if I\'m ready?',
        answer: 'If you\'re a founder with real traction, you recognize yourself as the bottleneck, you\'re ready to implement (not just explore), and you\'re seeking leverage rather than novelty—you\'re ready. Still uncertain? Start with the Diagnostic.',
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
  diagnostic: [
    {
      id: 'business_description',
      question: 'In 2-3 sentences, what does your business do?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'ai_maturity',
      question: 'Where do you think you are on the AI Maturity Ladder?',
      type: 'select',
      options: [
        'Level 1: Tool Collector - experimenting widely',
        'Level 2: Copy-Paster - using prompts/templates',
        'Level 3: Builder - built some automations',
        'Level 4: Systematizer - core workflows run on AI',
        'Level 5: Architect - AI is competitive advantage',
        'Not sure - that\'s why I\'m here',
      ],
    },
    {
      id: 'founder_bottleneck',
      question: 'Where are you (the founder) still the bottleneck in your business?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'desired_outcome',
      question: 'If the diagnostic reveals exactly what to systematize first, what outcome are you hoping for?',
      type: 'textarea',
    },
  ],
  'command-center': [
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
      options: ['Solo', '2-5', '6-15', '16-50', '50+'],
    },
    {
      id: 'current_systems',
      question: 'What systems/tools do you currently use? (CRM, automation, etc.)',
      type: 'textarea',
    },
    {
      id: 'priority_workflows',
      question: 'Which workflows would you most want to systematize? (sales, operations, content, etc.)',
      type: 'textarea',
      required: true,
    },
    {
      id: 'diagnostic_completed',
      question: 'Have you completed an AI Level Diagnostic with us?',
      type: 'select',
      options: ['Yes', 'No - I\'d like to discuss this'],
    },
  ],
  'authority-engine': [
    {
      id: 'expertise_area',
      question: 'What is your area of deep expertise? What do you know better than almost anyone?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'current_positioning',
      question: 'How are you currently positioned in your market? What do people know you for?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'infrastructure_status',
      question: 'Do you have operational infrastructure in place to handle increased demand?',
      type: 'select',
      options: [
        'Yes - Command Center is built',
        'Partially - some systems in place',
        'No - I need to build infrastructure first',
      ],
    },
    {
      id: 'authority_goals',
      question: 'What would "category authority" look like for you? What do you want to be known for?',
      type: 'textarea',
    },
  ],
  ascension: [
    {
      id: 'business_description',
      question: 'Tell us about your business - what you do, your traction so far, and your team.',
      type: 'textarea',
      required: true,
    },
    {
      id: 'why_now',
      question: 'Why is now the right time for a complete AI infrastructure transformation?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'bottlenecks',
      question: 'Where are you (the founder) still the biggest bottleneck?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'vision',
      question: 'In 90 days, if we\'ve succeeded, what does your business look like?',
      type: 'textarea',
    },
    {
      id: 'commitment',
      question: 'Are you ready to commit significant time and resources to this transformation?',
      type: 'select',
      options: [
        'Yes - I\'m ready to go all in',
        'I want to learn more first',
      ],
    },
  ],
};

// ============================================================================
// Philosophy Items
// ============================================================================

export const PHILOSOPHY_ITEMS = [
  {
    title: 'Structure Creates Leverage',
    description: 'AI does not create leverage. Structure does. The competitive advantage is not using AI—it\'s building systems that AI can amplify.',
    accent: 'radiance-gold',
  },
  {
    title: 'Maturity Over Tools',
    description: 'Most companies adopt tools; few build infrastructure. Moving up the maturity ladder creates durable advantage, not tool collection.',
    accent: 'radiance-amber',
  },
  {
    title: 'Systems Over Effort',
    description: 'The goal is a business that runs on systems, not founder effort. We design how your business will run on AI—permanently.',
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
// Industry AI Optimization Descriptions (for hover tooltips)
// ============================================================================

export const INDUSTRY_AI_INSIGHTS: Record<string, { headline: string; optimizations: string[] }> = {
  'Healthcare & Life Sciences': {
    headline: 'AI transforms patient care and operational efficiency',
    optimizations: [
      'Automated patient intake & documentation—reclaim 2+ hours daily per provider',
      'Intelligent appointment scheduling that reduces no-shows by 30%',
      'Clinical decision support from vast medical literature in seconds',
      'Predictive analytics for patient readmission risk',
    ],
  },
  'Financial Services': {
    headline: 'AI accelerates decisions and deepens client relationships',
    optimizations: [
      'Automated compliance monitoring & regulatory reporting',
      'Intelligent fraud detection with real-time transaction analysis',
      'Personalized wealth management recommendations at scale',
      'Document processing that turns days of analysis into minutes',
    ],
  },
  'E-commerce & Retail': {
    headline: 'AI creates hyper-personalized shopping experiences',
    optimizations: [
      'Dynamic product recommendations that boost AOV by 15-25%',
      'Automated inventory forecasting reducing stockouts by 40%',
      'AI-powered customer service handling 70% of inquiries instantly',
      'Intelligent pricing optimization across thousands of SKUs',
    ],
  },
  'Professional Services': {
    headline: 'AI multiplies expertise and client capacity',
    optimizations: [
      'Proposal generation that captures your firm\'s voice and expertise',
      'Research synthesis—hours of analysis compressed to minutes',
      'Client communication drafting and follow-up automation',
      'Knowledge management that makes your whole team\'s expertise searchable',
    ],
  },
  'Manufacturing & Logistics': {
    headline: 'AI optimizes every link in the supply chain',
    optimizations: [
      'Predictive maintenance reducing downtime by 25-40%',
      'Demand forecasting with 95%+ accuracy',
      'Route optimization saving 15% on logistics costs',
      'Quality control using computer vision for defect detection',
    ],
  },
  'Media & Entertainment': {
    headline: 'AI amplifies creativity and audience engagement',
    optimizations: [
      'Content ideation and variation at unprecedented speed',
      'Audience analytics revealing what resonates and why',
      'Automated editing, transcription, and localization',
      'Personalized content recommendations that increase engagement 3x',
    ],
  },
  'Education & EdTech': {
    headline: 'AI enables truly personalized learning at scale',
    optimizations: [
      'Adaptive learning paths that meet students where they are',
      'Instant feedback on assignments and assessments',
      'Administrative automation freeing educators to teach',
      'Early intervention alerts for at-risk students',
    ],
  },
  'Real Estate & PropTech': {
    headline: 'AI transforms property insights and transactions',
    optimizations: [
      'Market analysis and property valuation in seconds, not days',
      'Lead scoring that identifies serious buyers immediately',
      'Automated document preparation for transactions',
      'Virtual staging and property visualization at 1/10th the cost',
    ],
  },
};

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
    familyName: 'Courchesne',
    members: [
      {
        name: 'Nicholas Courchesne',
        role: 'Master of Strategic Partnerships',
        description: 'Nicholas leads strategic partnerships and relationships—the bridge between Light Brand and the world. Living the path of light and ready to share his journey with those ready to begin their own. A big guy with an even bigger heart—don\'t let his muscles fool you!',
        avatarPrompt: 'Professional headshot of a strong, muscular man in his 30s-40s with a warm, genuine smile, approachable and kind expression that shows his big heart, smart casual attire, warm natural lighting, professional background, editorial portrait style.',
      },
      {
        name: 'Nancy Courchesne',
        role: 'Master of Illumination',
        description: 'Nancy helps us illuminate the path we follow. Her unbelievable intuitive gift allows us to align with the right projects, nurture the right relationships, and guide our mission forward.',
        avatarPrompt: 'Professional headshot of a wise, intuitive woman in her 30s-40s, warm and knowing expression, elegant yet approachable attire, soft golden lighting creating warmth, slightly blurred professional background, high-quality editorial portrait.',
      },
    ],
  },
  {
    familyName: 'Lawless',
    members: [
      {
        name: 'Daniel Lawless',
        role: 'Master Architect & Technologist',
        description: 'Daniel architects both internal and external technologies—the systems that power everything. A seasoned full stack developer with over 20 years of experience building and scaling the technical foundations that transform businesses.',
        avatarPrompt: 'Professional headshot of a seasoned male technologist and architect in his 40s-50s, warm and confident expression, modern business casual attire, warm natural lighting, slightly blurred professional background in earth tones, high-quality editorial portrait style.',
      },
      {
        name: 'Jennifer Lawless',
        role: 'Master of Inner Technology',
        description: 'Jennifer guides our quantum technology exploration, helping us align with our inner technology through tools that leverage the quantum field. We believe a sound outer tech comes from a sound inner tech.',
        avatarPrompt: 'Professional headshot of a warm and intuitive woman in her 40s-50s, genuine smile, approachable yet wise expression, elegant business casual attire, warm soft lighting, slightly blurred warm-toned background, editorial portrait photography style.',
      },
    ],
  },
  {
    familyName: 'Demou',
    members: [
      {
        name: 'Andreas Demou',
        role: 'Master of Development & Design',
        description: 'Andreas develops and implements everything to look beautifully amazing—front to back, inside and out. There isn\'t anyone out there better than this one. A man of few words who wields great power through body, mind, and spirit.',
        avatarPrompt: 'Professional headshot of a focused, powerful male designer/developer in his 30s-40s, calm and composed expression suggesting inner strength, modern minimal attire, clean professional lighting, subtle background, editorial portrait photography style.',
      },
      {
        name: 'Mike Demou',
        role: 'Master of Expression',
        description: 'Mike ensures every brand expresses itself to its fullest potential—the visual artistry that brings everything to life. Showcasing everyone as if they were a piece of art, inside and out.',
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
    'leading-ai-transformation': {
      src: '/images/blog/blog-leading-ai-transformation.jpg',
      alt: 'Golden compass or beacon guiding through abstract landscape',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of leadership and guidance through AI transformation. A golden compass or beacon (#E8B84A) illuminating a path through abstract terrain. Warm light rays cutting through complexity, creating clarity. The feeling is confident direction amidst uncertainty. Deep charcoal background with warm, authoritative illumination. Premium consulting aesthetic for a leadership article.',
    },
    'building-ai-culture': {
      src: '/images/blog/blog-building-ai-culture.jpg',
      alt: 'Multiple small lights connecting and growing together',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of team culture and adoption spreading. Multiple small points of golden light (#E8B84A) connecting and growing together, forming a network. Some lights brighter than others, suggesting early adopters. The feeling is organic growth and connection. Deep charcoal background with warm, collaborative illumination. Suitable for a culture and team adoption article.',
    },
    'ai-implementation-mistakes': {
      src: '/images/blog/blog-ai-implementation-mistakes.jpg',
      alt: 'Warning light or caution beacon in golden amber',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of avoiding pitfalls and mistakes. A warning beacon or caution light in warm amber (#D4944C) illuminating potential obstacles shown as dark geometric shapes. Light revealing hidden dangers. The feeling is protective guidance and foresight. Deep charcoal background with warm, cautionary but helpful illumination. Suitable for a mistakes-to-avoid business article.',
    },
    'ai-small-business': {
      src: '/images/blog/blog-ai-small-business.jpg',
      alt: 'Small but powerful golden light source',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of small business power and accessibility. A compact but intensely bright golden light source (#E8B84A) proving that size does not limit impact. Perhaps a small flame creating large shadows or a tiny crystal refracting brilliant light. The feeling is empowerment and accessibility. Deep charcoal background with warm, encouraging illumination. Suitable for small business empowerment article.',
    },
    'human-ai-collaboration': {
      src: '/images/blog/blog-human-ai-collaboration.jpg',
      alt: 'Two different light sources merging harmoniously',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of human-AI partnership. Two distinct but complementary light sources - one organic and warm gold (#E8B84A), one more geometric and amber (#D4944C) - merging together to create something greater. The feeling is synergy and partnership. Deep charcoal background with warm, harmonious illumination. Suitable for a human-AI collaboration article.',
    },
    'measuring-ai-roi': {
      src: '/images/blog/blog-measuring-ai-roi.jpg',
      alt: 'Golden light forming measurement scales or graphs',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of measuring value and ROI. Golden light (#E8B84A) forming abstract measurement scales, upward trending graphs, or precise geometric patterns suggesting quantification. The feeling is clarity and proof of value. Deep charcoal background with warm, analytical illumination. Suitable for an ROI measurement business article.',
    },
    'responsible-ai': {
      src: '/images/blog/blog-responsible-ai.jpg',
      alt: 'Balanced golden scales or protective light shield',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of ethics and responsibility in AI. Balanced golden scales (#E8B84A) or a protective light shield suggesting guardianship and trust. The feeling is integrity and careful stewardship. Deep charcoal background with warm, principled illumination. Suitable for an AI ethics and responsibility article.',
    },
    'ai-customer-experience': {
      src: '/images/blog/blog-ai-customer-experience.jpg',
      alt: 'Warm golden light creating welcoming pathways',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of customer experience enhancement. Warm golden light (#E8B84A) creating welcoming, intuitive pathways. Light that guides without overwhelming, personalized streams of illumination. The feeling is warmth and service. Deep charcoal background with inviting, customer-focused illumination. Suitable for a customer experience article.',
    },
    'ai-data-readiness': {
      src: '/images/blog/blog-ai-data-readiness.jpg',
      alt: 'Foundation of light pillars supporting structure',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of data foundation and readiness. Three pillars of golden light (#E8B84A) supporting an abstract structure - representing quality, accessibility, and governance. The feeling is solid foundation and preparation. Deep charcoal background with warm, foundational illumination. Suitable for a data readiness assessment article.',
    },
    'ai-personal-productivity': {
      src: '/images/blog/blog-ai-personal-productivity.jpg',
      alt: 'Golden light clock or time-saving visualization',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of reclaiming time and productivity. A golden clock face (#E8B84A) with light expanding outward, or abstract representation of time being returned. Hours transforming into golden light. The feeling is liberation and reclaimed capacity. Deep charcoal background with energizing, productive illumination. Suitable for a personal productivity article.',
    },
    'choosing-ai-tools': {
      src: '/images/blog/blog-choosing-ai-tools.jpg',
      alt: 'Golden light revealing choices through a lens',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of smart tool selection and evaluation. Golden light (#E8B84A) passing through a lens or prism, revealing and separating true value from hype. Multiple options being illuminated with different intensities. The feeling is discernment and smart decision-making. Deep charcoal background with analytical, clarifying illumination. Suitable for an AI tool selection article.',
    },
    'future-proofing-ai': {
      src: '/images/blog/blog-future-proofing-ai.jpg',
      alt: 'Adaptable golden light flowing around obstacles',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of adaptability and future-readiness. Flowing golden light (#E8B84A) that adapts and flows around changing geometric obstacles, never getting stuck. Modular, flexible patterns of illumination. The feeling is resilience and adaptability. Deep charcoal background with dynamic, forward-looking illumination. Suitable for a future-proofing strategy article.',
    },
    'ai-quick-wins': {
      src: '/images/blog/blog-ai-quick-wins.jpg',
      alt: 'Five bright golden sparks ready to ignite',
      dimensions: '1200x630',
      prompt: 'Abstract visualization of quick wins and immediate action. Five distinct bright golden sparks (#E8B84A) arranged dynamically, each ready to ignite into something larger. The feeling is momentum, speed, and immediate possibility. Deep charcoal background with energetic, action-oriented illumination. Suitable for a quick wins implementation article.',
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
      alt: 'Three flames joining to become one light',
      dimensions: '600x400',
      prompt: 'Abstract illustration representing the origin of "Light Brand Consulting" - three families uniting with a shared mission. Three distinct but harmonious flames or light sources in warm gold (#E8B84A), amber (#D4944C), and cream (#FDF6E3) converging at the center to form one brilliant, unified light. The visual metaphor of families coming together, each bringing unique gifts that combine into something greater. Perhaps subtle suggestion of intertwining paths leading to the central illumination. Dark charcoal background with warm, hopeful glow. The feeling is "built upon families that care - united by purpose." Sophisticated, symbolic, and warm.',
    },
    industries: {
      src: '/images/about/industries-collage.jpg',
      alt: 'Abstract mosaic representing multiple industries',
      dimensions: '1000x400',
      prompt: 'Abstract collage or mosaic representing multiple industries served by an AI consulting firm. Eight interconnected abstract shapes, each with subtle visual hints of: healthcare (organic curves), finance (precise lines), e-commerce (flowing commerce), professional services (people shapes), manufacturing (geometric mechanics), media (flowing creativity), education (growth symbols), real estate (architectural forms). All rendered in warm golden (#E8B84A) and amber (#D4944C) light on charcoal background. Connected by subtle light threads suggesting shared principles across industries.',
    },
  },

  // Founder Avatars
  founders: {
    danielLawless: {
      src: '/images/founders/daniel-lawless.jpg',
      alt: 'Daniel Lawless - Master Architect & Technologist',
      dimensions: '400x400',
      prompt: 'Professional headshot of Daniel Lawless, Master Architect and Technologist. A seasoned male technologist in his 40s-50s with 20+ years of experience. Warm and confident expression, approachable yet authoritative. Modern business casual attire. Warm natural lighting with golden hour quality. Slightly blurred professional background in earth tones. High-quality editorial portrait style. The feeling is "trusted technical leader who has seen it all." Sharp focus on eyes, genuine expression.',
    },
    jenniferLawless: {
      src: '/images/founders/jennifer-lawless.jpg',
      alt: 'Jennifer Lawless - Master of Relationships & Quantum Exploration',
      dimensions: '400x400',
      prompt: 'Professional headshot of Jennifer Lawless, Master of Relationships and Quantum Exploration. A warm and intuitive woman in her 40s-50s. Genuine smile, approachable yet wise expression that suggests deep inner knowing. Elegant business casual attire with perhaps a subtle crystal or meaningful jewelry. Warm soft lighting with golden quality. Slightly blurred warm-toned background. Editorial portrait photography style. The feeling is "someone who connects you to your inner technology."',
    },
    nicholasCourchesne: {
      src: '/images/founders/nicholas-courchesne.jpg',
      alt: 'Nicholas Courchesne - Master of Business Development',
      dimensions: '400x400',
      prompt: 'Professional headshot of Nicholas Courchesne, Master of Business Development. A strong, muscular man in his 30s-40s with a warm, genuine smile that reveals his big heart. Approachable and kind expression - the contrast between physical strength and gentle spirit should be evident. Smart casual attire. Warm natural lighting. Professional background. Editorial portrait style. The feeling is "don\'t let the muscles fool you - this is a man of light with a huge heart."',
    },
    nancyCourchesne: {
      src: '/images/founders/nancy-courchesne.jpg',
      alt: 'Nancy Courchesne - Master of Illumination',
      dimensions: '400x400',
      prompt: 'Professional headshot of Nancy Courchesne, Master of Illumination. A wise, intuitive woman in her 30s-40s with a warm and knowing expression. Elegant yet approachable attire. Soft golden lighting creating warmth that suggests her intuitive gift. Slightly blurred professional background. High-quality editorial portrait. The feeling is "someone who sees what others cannot and illuminates the right path."',
    },
    andreasDemou: {
      src: '/images/founders/andreas-demou.jpg',
      alt: 'Andreas Demou - Master of Technical Design',
      dimensions: '400x400',
      prompt: 'Professional headshot of Andreas Demou, Master of Technical Design and Frontend Development. A focused, powerful man in his 30s-40s with a calm and composed expression suggesting inner strength and mastery. A man of few words but great presence. Modern minimal attire. Clean professional lighting. Subtle background. Editorial portrait photography style. The feeling is "wields great power through body, mind, and spirit" - quiet confidence.',
    },
    mikeDemou: {
      src: '/images/founders/mike-demou.jpg',
      alt: 'Mike Demou - Master of Expression',
      dimensions: '400x400',
      prompt: 'Professional headshot of Mike Demou, Master of Expression. A creative, expressive man in his 30s-40s with an artistic yet professional demeanor. Warm confident smile. Stylish creative attire that shows personality. Warm lighting with artistic quality. Professional background. Editorial portrait style. The feeling is "someone who sees every brand and person as a piece of art waiting to be expressed."',
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
