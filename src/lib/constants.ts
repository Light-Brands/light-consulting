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
  { key: 'portfolio', label: 'Portfolio', href: '/portfolio' },
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
    'have real traction',
    'feel capped by their current systems',
    'know AI will redefine their industry',
    'want leverage, not more complexity',
  ],
  notAFit: [
    'tool collectors',
    'DIY hackers',
    'shortcut seekers',
    'businesses without something real to scale',
  ],
};

// ============================================================================
// Services Data
// ============================================================================

export const SERVICES: Record<string, Service> = {
  diagnostic: {
    id: 'diagnostic',
    name: 'AI Readiness Diagnostic',
    tagline: 'Determine whether it makes sense to build intelligence into your business',
    description: 'A fixed-fee, productized diagnostic that provides decision-making infrastructure, not transformation. This is not coaching. This is not implementation. This is clarity.',
    investment: '',
    duration: '',
    deliverables: [
      'Your AI Readiness Level: a clear view of how prepared your business actually is',
      'A Leverage Snapshot: where effort is leaking and where structure would compound results',
      'Your Next Strategic Move: what matters now and what can safely be ignored',
      'Decision-making infrastructure for AI investments',
    ],
    process: [
      { step: 1, title: 'Assess', description: 'Answer a short set of focused questions about your business' },
      { step: 2, title: 'Analyze', description: 'We analyze your responses through our AI readiness framework' },
      { step: 3, title: 'Reveal', description: 'You receive a clear snapshot of where you stand and why' },
      { step: 4, title: 'Decide', description: 'You leave with clarity on whether to build, wait, or explore further' },
    ],
    idealFor: [
      'Founders with real traction seeking clarity on AI readiness',
      'Leaders who feel capped by their current systems',
      'Businesses that know AI will redefine their industry',
      'Those who want leverage, not more complexity',
    ],
    notFor: [
      'Tool collectors looking for the next shiny thing',
      'DIY hackers who want to figure it out themselves',
      'Shortcut seekers expecting overnight transformation',
      'Businesses without something real to scale',
    ],
    faq: [
      {
        question: 'What is this diagnostic for?',
        answer: 'This diagnostic determines whether it makes sense to build intelligence into your business at all. It provides decision-making infrastructure, not transformation.',
      },
      {
        question: 'What will I receive?',
        answer: 'A clear picture of your AI readiness level, a leverage snapshot showing where effort is leaking, and your next strategic move: what matters now and what can be safely ignored.',
      },
      {
        question: 'Is this a sales pitch?',
        answer: 'No. If there\'s a meaningful opportunity to move forward, we\'ll tell you. If there isn\'t, we\'ll tell you that too. This is clarity, not a disguised sales funnel.',
      },
      {
        question: 'What happens after the diagnostic?',
        answer: 'One of three outcomes: (1) No build recommended, (2) Build possible but you\'re not ready yet, or (3) You qualify for deeper system work. We\'ll be direct about which applies to you.',
      },
      {
        question: 'How long does it take?',
        answer: '5-10 minutes to complete the assessment. Fast turnaround on results. No endless discovery calls.',
      },
      {
        question: 'Do I need technical knowledge?',
        answer: 'No. We translate everything into business language. The question isn\'t about AI tools. It\'s about whether your business is structured to benefit from AI.',
      },
    ],
  },
  strategy: {
    id: 'strategy',
    name: 'AI Intelligence Strategy',
    tagline: 'The paid decision gate that determines whether anything should be built',
    description: 'This is not a build. This is not implementation. This is a paid strategy artifact that determines whether anything should be built at all. It exists to prevent premature development, wasted systems, and misaligned AI investments.',
    investment: '',
    duration: '',
    deliverables: [
      'AI Intelligence Map: where intelligence could live inside the business and where it should not',
      'System Prioritization: which potential systems matter and which are noise',
      'Leverage Assessment: what would remove founder-dependence first',
      'Build / Ignore Decisions: clear guidance on what to pursue vs. what to avoid',
      'Development Readiness Signal: whether the business is structurally ready for implementation',
    ],
    process: [
      { step: 1, title: 'Translate', description: 'Convert diagnostic insight into a clear intelligence strategy' },
      { step: 2, title: 'Map', description: 'Identify where intelligence could and should exist in your business' },
      { step: 3, title: 'Prioritize', description: 'Determine which systems matter and which are noise' },
      { step: 4, title: 'Decide', description: 'Receive clear build/ignore guidance with development readiness signal' },
    ],
    idealFor: [
      'Founders who completed the AI Readiness Diagnostic',
      'Leaders ready to translate insight into clear strategy',
      'Businesses seeking to prevent premature development',
      'Those who want a decision process, not a proposal for services',
    ],
    notFor: [
      'Those seeking consulting hours or workshops',
      'Companies wanting prototypes or automation immediately',
      'Businesses expecting a commitment to further work',
      'Leaders looking for generic AI strategy documents',
    ],
    faq: [
      {
        question: 'What is this exactly?',
        answer: 'A single strategic artifact that translates diagnostic insight into a clear intelligence strategy. It determines if, what, and why AI systems should be built. This is a decision process, not a proposal for services.',
      },
      {
        question: 'What do I receive?',
        answer: 'A strategic artifact including: AI Intelligence Map, System Prioritization, Leverage Assessment, Build/Ignore Decisions, and Development Readiness Signal. This artifact is usable with or without Light Brand.',
      },
      {
        question: 'Why does this exist?',
        answer: 'Most agencies skip this step. That\'s why they build the wrong things. This offer sits between clarity and commitment, acting as the hard qualification gate into any development work.',
      },
      {
        question: 'What are the possible outcomes?',
        answer: 'Three explicit outcomes: (1) No build recommended, (2) Build possible but client not ready, or (3) Client qualifies for development. Only outcome #3 leads to system builds.',
      },
      {
        question: 'Can I use this with another provider?',
        answer: 'Absolutely. The artifact is designed to be usable with or without Light Brand. It gives you clear direction regardless of who implements.',
      },
      {
        question: 'How is this different from consulting?',
        answer: 'This is not consulting hours. Not workshops. Not prototypes. Not automation. Not a commitment to further work. It\'s a single, focused strategy artifact with zero dependency on custom development.',
      },
    ],
  },
  'intelligence-engines': {
    id: 'intelligence-engines',
    name: 'AI Intelligence Engines',
    tagline: 'Move from "using AI" to "AI runs part of how we operate"',
    description: 'Not sold publicly. Not packaged on the website. Introduced only after the Diagnostic reveals a real opportunity. These are the systems that move a business from using AI tools to having AI run part of how they operate.',
    investment: 'By invitation only',
    duration: 'Shaped per client',
    deliverables: [
      'Revenue intelligence systems',
      'Operations intelligence infrastructure',
      'Content and authority intelligence engines',
      'Founder leverage systems that remove bottlenecks',
      'Custom AI-powered decision-making tools',
    ],
    process: [
      { step: 1, title: 'Qualify', description: 'Strategy artifact confirms development readiness and system priorities' },
      { step: 2, title: 'Architect', description: 'Design the intelligence layer specific to your business needs' },
      { step: 3, title: 'Build', description: 'Develop and deploy systems that compound over time' },
      { step: 4, title: 'Integrate', description: 'Embed intelligence into how your business actually operates' },
    ],
    idealFor: [
      'Clients who qualified through the diagnostic and strategy process',
      'Businesses with clear development readiness signals',
      'Leaders ready for AI to run part of their operations',
      'Companies with the infrastructure to support intelligent systems',
    ],
    notFor: [
      'Those who haven\'t completed the diagnostic process',
      'Businesses seeking quick automation fixes',
      'Companies without clear strategic priorities',
      'Leaders expecting AI magic without structural readiness',
    ],
    faq: [
      {
        question: 'Why can\'t I just buy this directly?',
        answer: 'Because building the wrong systems wastes everyone\'s time and money. The diagnostic and strategy process ensures we only build what actually matters for your business. This protects both of us.',
      },
      {
        question: 'What types of intelligence engines do you build?',
        answer: 'Revenue intelligence (sales, pipeline, conversions), operations intelligence (workflows, automation), content/authority intelligence (thought leadership, market positioning), and founder leverage systems (removing you as the bottleneck).',
      },
      {
        question: 'How is this different from automation?',
        answer: 'Automation executes predefined tasks. Intelligence engines think, adapt, and improve. The difference is between a calculator and a strategist. We build the strategist.',
      },
      {
        question: 'What\'s the investment?',
        answer: 'Investment is scoped based on the strategy artifact. We don\'t quote without understanding exactly what needs to be built and why. This is where real money is made, by invitation only.',
      },
      {
        question: 'How long does this take?',
        answer: 'Timeline is shaped per client based on complexity and scope. Simple systems might take weeks; comprehensive intelligence infrastructure might take months. Speed without strategy is just expensive chaos.',
      },
      {
        question: 'What happens after the build?',
        answer: 'You own everything. We provide documentation, training, and transition support. Some clients continue into the Architect relationship for ongoing evolution. Others operate independently with occasional optimization support.',
      },
    ],
  },
  ascension: {
    id: 'ascension',
    name: 'AI Architect Partnership',
    tagline: 'Embed AI into how your business thinks, decides, and evolves',
    description: 'This is not a service. This is a relationship. Long-term, high-touch, limited availability. For businesses ready to have AI embedded into how they think, decide, and evolve, not just how they operate.',
    investment: 'By application only',
    duration: 'Ongoing relationship',
    deliverables: [
      'Complete AI integration across business functions',
      'Strategic advisory on AI evolution and opportunities',
      'Priority access to emerging AI capabilities',
      'Ongoing system optimization and enhancement',
      'Direct access to Light Brand leadership',
    ],
    process: [
      { step: 1, title: 'Qualify', description: 'Complete diagnostic and strategy process with clear development path' },
      { step: 2, title: 'Foundation', description: 'Build core intelligence engines and operational infrastructure' },
      { step: 3, title: 'Embed', description: 'Integrate AI into decision-making, strategy, and business evolution' },
      { step: 4, title: 'Evolve', description: 'Ongoing partnership as AI technology and your business advance' },
    ],
    idealFor: [
      'Founders committed to AI becoming core to their business identity',
      'Leaders ready for a relationship, not a transaction',
      'Businesses with the resources for comprehensive transformation',
      'Those aligned with Light Brand\'s mission and values',
    ],
    notFor: [
      'Companies seeking one-time projects',
      'Those wanting to "test" AI before committing',
      'Businesses expecting quick fixes',
      'Leaders not ready for genuine partnership',
    ],
    faq: [
      {
        question: 'What makes this different from your other offerings?',
        answer: 'The other offerings are transactions, valuable ones, but transactions. This is a relationship. We become part of how your business thinks about AI, not just how it uses AI.',
      },
      {
        question: 'Why is availability limited?',
        answer: 'Because real partnership requires real attention. We can\'t maintain the depth of relationship this requires with unlimited clients. Quality over quantity.',
      },
      {
        question: 'What\'s the investment?',
        answer: 'This is high-ticket, structured based on scope and duration. We discuss specifics after determining mutual fit. If you need to ask, you may not be ready, and that\'s okay.',
      },
      {
        question: 'How do I apply?',
        answer: 'Start with the diagnostic. Progress through strategy. Build initial systems. Along the way, we\'ll both know if the relationship makes sense. Partnership can\'t be rushed.',
      },
      {
        question: 'What if my needs change?',
        answer: 'They will. That\'s the point. A relationship evolves. We adjust scope, focus, and intensity as your business and the AI landscape change. Flexibility is built in.',
      },
      {
        question: 'Is this right for my business?',
        answer: 'If you\'re asking, probably not yet, and there\'s no shame in that. Most businesses benefit more from the diagnostic, strategy, and focused engine builds. Partnership is for those who\'ve already experienced that value and want more.',
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
    quote: 'Light Brand Consulting helped us see possibilities we never knew existed. Their approach is unlike anything else: authentic, insightful, and transformative. The time is now to get ahead tomorrow.',
    author: 'Joseph McVeen',
    role: 'Founder',
    company: 'Growth Mastery AI',
    companyUrl: 'https://www.growthmastery.ai',
    avatar: '/images/avatars/avatar-joseph-mcveen.jpg',
    avatarPrompt: 'Professional headshot portrait of a confident male entrepreneur in his 30s-40s, founder of an AI growth company. Warm, genuine expression with an approachable smile. Smart business casual attire. Warm, natural lighting creating depth. Background in warm earth tones or soft charcoal, slightly blurred. He conveys both innovation and authenticity. High-quality editorial portrait photography style. Sharp focus, natural but polished look.',
  },
  {
    id: '2',
    quote: 'Before working with Light Brand, we were stuck at a plateau. They came in, restructured our entire digital presence, and within 60 days we saw a 3x increase in qualified leads. The AI systems they built for our follow-up process alone saved us 20+ hours a week. If you are on the fence, just do it.',
    author: 'Sydney Griffith',
    role: 'Founder',
    company: 'The Planetary Party',
  },
  {
    id: '3',
    quote: 'We needed someone who could translate our vision into a brand that actually converts. Light Brand did not just build us a website, they built us a machine. Our booking rate doubled in the first month and the automated systems they put in place mean I can finally focus on running my business instead of chasing leads.',
    author: 'Krista Dimo',
    role: 'Founder',
    company: 'BusyBees IPC',
  },
  {
    id: '4',
    quote: 'Working with Light Brand was a turning point for Iboga Life. They understood the sensitivity of our space and created a digital experience that educates and builds trust before someone ever picks up the phone. Our retreat bookings are up 60% and the quality of inquiries has completely transformed.',
    author: 'Jay',
    role: 'Founder',
    company: 'Iboga Life',
  },
  {
    id: '5',
    quote: 'I had been burned by agencies before who promised the world and delivered templates. Light Brand is the real deal. They took the time to understand our methodology, built AI workflows that actually match how we operate, and the results speak for themselves. Our revenue jumped 40% in 90 days.',
    author: 'Jennifer',
    role: 'Founder',
    company: 'Light Field Institute',
  },
  {
    id: '6',
    quote: 'Light Brand Consulting does not just build brands, they build ecosystems. The strategy they developed for Industree connected our community platform, our content pipeline, and our sales funnel into one cohesive system. We went from scattered efforts to a streamlined operation that runs 24/7.',
    author: 'Brandon Beachaum',
    role: 'Founder',
    company: 'Industree',
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
      id: 'ai_readiness',
      question: 'Where do you think you are on the AI readiness curve?',
      type: 'select',
      options: [
        'Level 1: Experimenting with tools',
        'Level 2: Automating tasks',
        'Level 3: Systematizing workflows',
        'Level 4: Owning business intelligence',
        'Not sure - that\'s why I\'m here',
      ],
    },
    {
      id: 'current_systems',
      question: 'What AI tools or systems are you currently using, if any?',
      type: 'textarea',
    },
    {
      id: 'biggest_constraint',
      question: 'What\'s the biggest constraint holding your business back right now?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'desired_outcome',
      question: 'If this diagnostic reveals exactly where you stand, what would you do with that clarity?',
      type: 'textarea',
    },
  ],
  strategy: [
    {
      id: 'diagnostic_completed',
      question: 'Have you completed the AI Readiness Diagnostic with us?',
      type: 'select',
      options: ['Yes', 'No - I\'d like to start there'],
      required: true,
    },
    {
      id: 'business_description',
      question: 'Briefly describe your business and what you sell.',
      type: 'textarea',
      required: true,
    },
    {
      id: 'bottleneck',
      question: 'Where are you (the founder) still the biggest bottleneck?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'ai_investment_concern',
      question: 'What concerns you most about investing in AI systems?',
      type: 'textarea',
    },
    {
      id: 'decision_timeline',
      question: 'When do you need clarity on whether to build AI systems?',
      type: 'select',
      options: [
        'Immediately - I\'m ready to decide now',
        'This month',
        'This quarter',
        'I\'m exploring for the future',
      ],
    },
  ],
  'intelligence-engines': [
    {
      id: 'strategy_completed',
      question: 'Have you completed the AI Intelligence Strategy with us?',
      type: 'select',
      options: ['Yes', 'No - I\'d like to start there'],
      required: true,
    },
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
      id: 'priority_systems',
      question: 'Based on your strategy, which systems are the priority? (revenue, operations, content, etc.)',
      type: 'textarea',
      required: true,
    },
    {
      id: 'development_readiness',
      question: 'How would you describe your readiness to implement?',
      type: 'select',
      options: [
        'Ready to start immediately',
        'Ready within 30 days',
        'Exploring options',
      ],
    },
  ],
  ascension: [
    {
      id: 'previous_work',
      question: 'Have you worked with Light Brand before? (Diagnostic, Strategy, or Engines)',
      type: 'select',
      options: [
        'Yes - I\'ve completed prior work',
        'No - I\'m new to Light Brand',
      ],
      required: true,
    },
    {
      id: 'business_description',
      question: 'Tell us about your business - what you do, your traction, and your team.',
      type: 'textarea',
      required: true,
    },
    {
      id: 'why_partnership',
      question: 'Why are you interested in an ongoing partnership rather than project-based work?',
      type: 'textarea',
      required: true,
    },
    {
      id: 'ai_vision',
      question: 'How do you see AI becoming core to how your business thinks and operates?',
      type: 'textarea',
    },
    {
      id: 'relationship_readiness',
      question: 'What does partnership mean to you?',
      type: 'textarea',
    },
  ],
};

// ============================================================================
// Philosophy Items
// ============================================================================

export const PHILOSOPHY_ITEMS = [
  {
    title: 'Structure Creates Leverage',
    description: 'AI does not create leverage. Structure does. The competitive advantage is not using AI. It\'s building systems that AI can amplify.',
    accent: 'radiance-gold',
  },
  {
    title: 'Maturity Over Tools',
    description: 'Most companies adopt tools; few build infrastructure. Moving up the maturity ladder creates durable advantage, not tool collection.',
    accent: 'radiance-amber',
  },
  {
    title: 'Systems Over Effort',
    description: 'The goal is a business that runs on systems, not founder effort. We design how your business will run on AI, permanently.',
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
      'Automated patient intake and documentation to reclaim 2+ hours daily per provider',
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
      'Research synthesis that compresses hours of analysis to minutes',
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
    description: 'The goal isn\'t recurring revenue from you. It\'s your ability to navigate AI decisions confidently without us.',
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
        description: 'Nicholas leads strategic partnerships and relationships as the bridge between Light Brand and the world. Living the path of light and ready to share his journey with those ready to begin their own. A big guy with an even bigger heart, so don\'t let his muscles fool you!',
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
        description: 'Daniel architects both internal and external technologies, the systems that power everything. A seasoned full stack developer with over 20 years of experience building and scaling the technical foundations that transform businesses.',
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
        description: 'Andreas develops and implements everything to look beautifully amazing, front to back, inside and out. There isn\'t anyone out there better than this one. A man of few words who wields great power through body, mind, and spirit.',
        avatarPrompt: 'Professional headshot of a focused, powerful male designer/developer in his 30s-40s, calm and composed expression suggesting inner strength, modern minimal attire, clean professional lighting, subtle background, editorial portrait photography style.',
      },
      {
        name: 'Mike Demou',
        role: 'Master of Expression',
        description: 'Mike ensures every brand expresses itself to its fullest potential through the visual artistry that brings everything to life. Showcasing everyone as if they were a piece of art, inside and out.',
        avatarPrompt: 'Professional headshot of a creative, expressive man in his 30s-40s, artistic yet professional demeanor, warm confident smile, stylish creative attire, warm lighting with artistic quality, professional background, editorial portrait style.',
      },
    ],
  },
];

// ============================================================================
// Image Configuration & AI Generation Prompts
// ============================================================================

// ============================================================================
// AI Go/No-Go Assessment Configuration
// ============================================================================

export const ASSESSMENT_CONFIG = {
  price: 5000, // $5,000 investment (revealed after VSL)
  name: 'AI Go/No-Go Assessment™',
  tagline: 'A clear yes/no decision on whether AI makes sense for your business right now.',
  description: 'We sell judgment, not AI. A "no" verdict constitutes successful completion.',

  // Stage labels for progress indicator (simplified flow)
  stageLabels: {
    qualify: 'Qualify',
    educate: 'Learn',
    book: 'Book',
    status: 'Confirmed',
  } as const,

  // Lead source identifier for tracking
  leadSource: 'assessment',

  // VSL Configuration
  vsl: {
    url: 'https://www.youtube.com/embed/I1J2Z_Fgado',
    minimumWatchPercentage: 90, // Must watch 90% to proceed
    estimatedDuration: '15 minutes',
  },

  // Calendar Configuration (LeadConnector/GHL)
  calendar: {
    // Group calendar with assessment agents
    url: 'https://api.leadconnectorhq.com/widget/booking/cyOx6pxq3yWi3iQDCBrT',
    provider: 'leadconnector',
  },

  // Verdicts
  verdicts: {
    GO: {
      label: 'GO',
      description: 'AI makes sense for your business right now. Proceed with confidence.',
      color: 'growth-emerald',
    },
    CONDITIONAL_GO: {
      label: 'CONDITIONAL GO',
      description: 'AI could work, but specific conditions must be met first.',
      color: 'radiance-gold',
    },
    NO_GO: {
      label: 'NO-GO',
      description: 'AI is not the right move for your business at this time. This is a successful outcome.',
      color: 'text-muted',
    },
  },
};

// ============================================================================
// AI Go/No-Go Assessment Funnel Configuration (10-Stage Full Flow)
// Based on AI-GO-NO-GO-ASSESSMENT-STRATEGY.md
// ============================================================================

export const ASSESSMENT_FUNNEL_CONFIG = {
  price: 5000, // $5,000 fixed-fee assessment (revealed in Stage 4: Educate)
  name: 'AI Go/No-Go Assessment™',
  tagline: 'A binary decision: does AI make strategic sense for your business right now?',
  corePhilosophy: 'We sell judgment, not AI.',
  successStatement: 'A "NO" verdict is a successful outcome, not a sales failure.',

  // 10-Stage Funnel Order
  stageOrder: [
    'attract',
    'qualify',
    'book',
    'educate',
    'confirm',
    'commit',
    'intake',
    'deliver',
    'document',
    'exit',
  ] as const,

  // Stage Labels for Progress Indicator
  stageLabels: {
    attract: 'Start',
    qualify: 'Qualify',
    book: 'Schedule',
    educate: 'Learn',
    confirm: 'Confirm',
    commit: 'Invest',
    intake: 'Prepare',
    deliver: 'Verdict',
    document: 'Report',
    exit: 'Complete',
  } as const,

  // Lead source identifier for tracking
  leadSource: 'assessment-funnel',

  // VSL Configuration - Pricing revealed here
  // Note: Duration is dynamically determined from the YouTube API.
  // If you change the video URL, the duration will automatically update.
  vsl: {
    url: 'https://www.youtube.com/embed/I1J2Z_Fgado',
    minimumWatchPercentage: 90,
    estimatedDuration: '15 minutes', // Fallback only - actual duration fetched from YouTube API
    unwatchedConsequence: 'Call auto-cancelled',
  },

  // Calendar Configuration
  calendar: {
    url: 'https://api.leadconnectorhq.com/widget/booking/cyOx6pxq3yWi3iQDCBrT',
    provider: 'leadconnector',
  },

  // Verdict Definitions
  verdicts: {
    GO: {
      label: 'GO',
      description: 'AI makes strategic sense for your business right now.',
      color: 'growth-emerald',
      implication: 'Proceed with confidence. Your business has the structure to benefit from AI.',
    },
    NO_GO: {
      label: 'NO-GO',
      description: 'AI is not the right move for your business at this time.',
      color: 'text-muted',
      implication: 'This is a successful outcome. We protected you from wasted investment.',
    },
    NOT_YET: {
      label: 'NOT YET',
      description: 'AI could work, but specific conditions must be met first.',
      color: 'radiance-gold',
      implication: 'Address the identified gaps, then revisit. We\'ll tell you exactly what needs to change.',
    },
  },

  // Four Scored Dimensions for Assessment
  scoringDimensions: {
    decisionConcentration: {
      label: 'Decision Concentration',
      question: 'How distributed is decision-making authority?',
      description: 'Measures whether decisions flow through one person or are spread across the organization.',
    },
    founderDependency: {
      label: 'Founder Dependency',
      question: 'Can operations function without the founder?',
      description: 'Assesses how much the business relies on the founder for day-to-day operations.',
    },
    decisionCodification: {
      label: 'Decision Codification',
      question: 'Are processes documented and repeatable?',
      description: 'Evaluates whether business processes are written down and systematized.',
    },
    leverageReadiness: {
      label: 'Leverage Readiness',
      question: 'Can AI meaningfully multiply existing capacity?',
      description: 'Determines if the business structure allows AI to amplify, not just automate.',
    },
  },
};

// ============================================================================
// Assessment Funnel Stage Content
// ============================================================================

// Stage 1: Attract - Entry Landing Content
export const ATTRACT_STAGE_CONTENT = {
  headline: 'Is AI Right for Your Business?',
  subheadline: 'Get a definitive yes, no, or not-yet verdict from experts who sell judgment, not AI.',

  // Approved creative angles from strategy
  hooks: [
    'You\'ve tried AI tools. You\'re still the bottleneck.',
    'AI amplifies structure — or chaos. Which do you have?',
    'Sometimes the smartest AI decision is non-adoption.',
    'Before you build AI systems, find out if you should.',
  ],

  // Repel messaging - filter out poor fits
  notForYou: [
    'Looking for AI tool tutorials or how-to guides',
    'Seeking the latest AI products to try',
    'Wanting immediate implementation or builds',
    'Expecting a free audit or consultation',
    'Shopping for AI consulting services',
  ],

  // Attract messaging - draw in ideal clients
  forYou: [
    'You have real business traction but feel capped by your systems',
    'You know AI will reshape your industry but don\'t know where to start',
    'You want an honest answer, even if it\'s "not yet" or "no"',
    'You\'re ready to invest in expert judgment, not opinions',
    'You\'re the decision-maker who can act on clarity',
  ],

  // Positioning statement
  positioning: {
    what: 'A fixed-fee assessment that delivers a binary decision.',
    not: 'This is not consulting. Not implementation. Not a sales pitch.',
    outcome: 'You leave with judgment: GO, NO-GO, or NOT YET.',
  },
};

// Stage 2: Qualify - Self-Qualification Criteria
export const QUALIFY_STAGE_CONTENT = {
  headline: 'Confirm Your Eligibility',
  subheadline: 'This assessment has strict qualification criteria. All three must be true.',

  // All three required - failure on any = disqualification
  qualificationCriteria: [
    {
      id: 'isDecisionMaker',
      label: 'Decision-Maker Authority',
      description: 'I can independently authorize business investments without committee approval.',
      required: true,
    },
    {
      id: 'paidAssessment',
      label: 'Investment Readiness',
      description: 'I understand this is a paid assessment (investment details revealed in the video).',
      required: true,
    },
    {
      id: 'acceptsNegativeVerdict',
      label: 'Verdict Acceptance',
      description: 'I accept that "NO-GO" is a valid, valuable outcome that protects my business.',
      required: true,
    },
  ],

  disqualificationMessage: 'This assessment isn\'t right for everyone. If any criteria doesn\'t fit, we\'d be doing you a disservice to proceed.',
};

// Stage 3: Book - Calendar Booking Content (NO PRICING)
export const BOOK_STAGE_CONTENT = {
  headline: 'Schedule Your Assessment Call',
  subheadline: 'Select a time for your verdict call. No pricing is discussed until you watch the required video.',
  note: 'Next: You\'ll watch a short video that explains the full process and investment.',
};

// Stage 4: Educate - VSL Content (PRICING REVEALED)
export const EDUCATE_STAGE_CONTENT = {
  headline: 'Understand the Assessment',
  subheadline: 'This video explains exactly what you\'re investing in and what to expect.',
  requirement: 'You must watch at least 90% to proceed. This ensures you understand before committing.',
  priceReveal: {
    headline: 'The Investment',
    amount: '$5,000',
    description: 'Fixed fee. No tiers. No discounts. No hidden costs.',
    includes: [
      'Complete AI readiness evaluation',
      'Structured intake review',
      '30-minute verdict call with exactly 3 reasoning points',
      'Single-page assessment report with scores',
    ],
  },
  warning: 'If you don\'t complete this video, your scheduled call will be automatically cancelled.',
};

// Stage 5: Confirm - VSL Completion Confirmation
export const CONFIRM_STAGE_CONTENT = {
  headline: 'Confirm Your Understanding',
  subheadline: 'You\'ve watched the video. Confirm you understand and accept the terms before proceeding to payment.',
  confirmations: [
    'I understand the assessment costs $5,000.',
    'I understand a "NO-GO" verdict is still a successful outcome.',
    'I understand this is judgment, not implementation.',
    'I\'m ready to proceed to payment.',
  ],
  callDetails: {
    label: 'Your Scheduled Call',
    note: 'This time is held but not confirmed until payment is complete.',
  },
};

// Stage 6: Commit - Payment Content
export const COMMIT_STAGE_CONTENT = {
  headline: 'Secure Your Assessment',
  subheadline: 'Complete payment to begin intake. Your call is held for you.',
  investmentLabel: 'Assessment Investment',
  includes: [
    'AI readiness evaluation across 4 dimensions',
    'Async intake review by assessment team',
    '30-minute live verdict call',
    'Single-page assessment report',
  ],
  refundPolicy: 'This is a judgment-based service. A "NO-GO" verdict protects you from wasted AI investment. No refunds based on verdict outcome.',
  securityNote: 'Secured by Stripe',
};

// Stage 7: Intake - Questionnaire Content
export const INTAKE_STAGE_CONTENT = {
  headline: 'Complete Your Intake',
  subheadline: 'Your responses directly inform your assessment. Answer thoroughly and honestly.',
  requirement: 'All required questions must be answered. Incomplete intake pauses your assessment indefinitely.',
  loomRequirement: {
    headline: 'Required: Loom Video Walkthrough',
    description: 'Record a 5-10 minute video walking through your business operations.',
    includes: [
      'Show your current tools and systems',
      'Explain your key workflows',
      'Demonstrate pain points and bottlenecks',
      'Describe where you are vs. where you want to be',
    ],
    warning: 'No Loom = No assessment. This is non-negotiable.',
  },
};

// Stage 8: Deliver - Verdict Call Content
export const DELIVER_STAGE_CONTENT = {
  headline: 'Your Verdict Call',
  subheadline: 'This is the 30-minute call where you receive your verdict with exactly 3 reasoning points.',
  format: {
    duration: '30 minutes',
    structure: [
      'Brief review of your intake (5 minutes)',
      'Verdict delivery with 3 specific reasons (15 minutes)',
      'Q&A on the verdict only (10 minutes)',
    ],
  },
  boundaries: {
    included: ['Clear verdict (GO, NO-GO, or NOT YET)', 'Exactly 3 reasoning points', 'Answers to verdict-related questions'],
    notIncluded: ['AI consulting or advice', 'Tool recommendations', 'Implementation planning', 'Next-step proposals'],
  },
  scopePhrase: '"That\'s intentionally outside this assessment\'s scope."',
};

// Stage 9: Document - Report Content
export const DOCUMENT_STAGE_CONTENT = {
  headline: 'Your Assessment Report',
  subheadline: 'A single-page document with your scores, verdict, and implications.',
  reportIncludes: [
    'Your verdict: GO, NO-GO, or NOT YET',
    'Scores across all 4 dimensions (1-10)',
    'The 3 specific reasoning points from your call',
    'Implications of your verdict',
  ],
  note: 'This report is yours to keep. It stands alone without Light Brand.',
};

// Stage 10: Exit - Clean Closure Content
export const EXIT_STAGE_CONTENT = {
  headline: 'Assessment Complete',
  subheadline: 'Your assessment is finished. The decision is now yours.',
  closureStatement: 'We don\'t follow up unless you initiate. This is intentional.',
  verdictOutcomes: {
    GO: {
      message: 'Your business is ready for AI. If you choose to explore further with Light Brand, you can reach out.',
      cta: null, // No proactive CTA
    },
    NO_GO: {
      message: 'AI isn\'t right for your business now. This verdict protected you from wasted investment.',
      cta: null,
    },
    NOT_YET: {
      message: 'Address the identified gaps, then consider revisiting. We\'ve told you exactly what needs to change.',
      cta: null,
    },
  },
  contactNote: 'Questions about your report? assessment@lightbrand.consulting',
};

// Assessment intake questions - based on verdict dimensions
export const ASSESSMENT_INTAKE_QUESTIONS = [
  {
    id: 'business_overview',
    question: 'Describe your business in 2-3 sentences. What do you do and who do you serve?',
    type: 'textarea' as const,
    required: true,
    helpText: 'Be specific about your core offering and target market.',
  },
  {
    id: 'decision_codification',
    question: 'What are the top 3 decisions you make repeatedly in your business?',
    type: 'textarea' as const,
    required: true,
    helpText: 'Think about decisions that happen daily or weekly that follow patterns.',
  },
  {
    id: 'founder_concentration',
    question: 'What percentage of critical business decisions currently require your personal involvement?',
    type: 'select' as const,
    options: [
      'Less than 25% - My team handles most things',
      '25-50% - I\'m involved in key decisions',
      '50-75% - Most important decisions go through me',
      '75-90% - Very little happens without my input',
      '90%+ - I am the bottleneck for nearly everything',
    ],
    required: true,
    helpText: 'Be honest. This is about understanding founder dependence.',
  },
  {
    id: 'operational_structure',
    question: 'Describe your current operational systems. What tools, processes, or workflows are already in place?',
    type: 'textarea' as const,
    required: true,
    helpText: 'Include CRM, project management, automation, documentation, etc.',
  },
  {
    id: 'documentation_level',
    question: 'How well-documented are your business processes and standard operating procedures?',
    type: 'select' as const,
    options: [
      'Not documented - Everything is in my head',
      'Minimally documented - Some notes and checklists exist',
      'Partially documented - Key processes are written down',
      'Well documented - Most processes have SOPs',
      'Fully documented - Comprehensive documentation with regular updates',
    ],
    required: true,
    helpText: 'Documentation level indicates AI readiness. AI needs structured processes to amplify.',
  },
  {
    id: 'scalability_readiness',
    question: 'If you had to 3x your output next month without hiring, what would break first?',
    type: 'textarea' as const,
    required: true,
    helpText: 'This reveals your actual constraints and bottlenecks.',
  },
  {
    id: 'ai_current_usage',
    question: 'What AI tools or systems are you currently using, if any?',
    type: 'textarea' as const,
    required: false,
    helpText: 'ChatGPT, Notion AI, automation tools, etc. "None" is a valid answer.',
  },
  {
    id: 'ai_expectations',
    question: 'What do you hope AI will do for your business?',
    type: 'textarea' as const,
    required: true,
    helpText: 'Be specific about outcomes, not tools.',
  },
  {
    id: 'biggest_constraint',
    question: 'What is the single biggest constraint holding your business back right now?',
    type: 'textarea' as const,
    required: true,
    helpText: 'Time, systems, people, capital, market, etc.',
  },
  {
    id: 'team_structure',
    question: 'Describe your team structure.',
    type: 'select' as const,
    options: [
      'Solo operator',
      '1-3 team members',
      '4-10 team members',
      '11-25 team members',
      '25+ team members',
    ],
    required: true,
  },
  {
    id: 'revenue_range',
    question: 'What is your approximate annual revenue?',
    type: 'select' as const,
    options: [
      'Pre-revenue / Under $100K',
      '$100K - $500K',
      '$500K - $1M',
      '$1M - $5M',
      '$5M - $10M',
      '$10M+',
    ],
    required: true,
    helpText: 'This helps us understand your operational complexity.',
  },
  {
    id: 'timeline',
    question: 'When do you need clarity on AI decisions?',
    type: 'select' as const,
    options: [
      'Immediately - I need to decide now',
      'This month',
      'This quarter',
      'Exploring for strategic planning',
    ],
    required: true,
  },
  {
    id: 'additional_context',
    question: 'Is there anything else we should know before your assessment?',
    type: 'textarea' as const,
    required: false,
    helpText: 'Any context that helps us understand your unique situation.',
  },
];

// Disqualification criteria messaging
export const ASSESSMENT_DISQUALIFIERS = {
  notFor: [
    'AI beginners looking for tool tutorials',
    'Tool shoppers seeking the latest AI products',
    'Implementation seekers wanting immediate builds',
    '"How-to" buyers expecting step-by-step guides',
    'Businesses without real traction to scale',
    'Those not serious about AI transformation',
  ],
  idealFor: [
    'Decision-makers ready to take action',
    'Founders open to hearing "no" as a valid outcome',
    'Businesses with real traction seeking clarity',
    'Those who value expert judgment over opinions',
    'Leaders committed to making the right decision',
  ],
};

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
