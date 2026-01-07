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
    description: 'A single focused conversation revealing 3 AI opportunities that match your business reality.',
    investment: '$500',
    duration: '90 minutes',
    deliverables: [
      '3 specific AI opportunities mapped to your business',
      'Super Intelligence Profile\u2122 assessment',
      'Priority-ranked action items',
      '30-day momentum plan',
      'Recording of the session',
    ],
    process: [
      { step: 1, title: 'Book', description: 'Select your time slot' },
      { step: 2, title: 'Prepare', description: 'Complete brief intake form' },
      { step: 3, title: 'Connect', description: '90-minute video session' },
      { step: 4, title: 'Receive', description: 'Summary + recordings within 24h' },
    ],
    idealFor: [
      'Founders wondering "what should AI mean for my business?"',
      'Leaders hearing about AI but unsure where to start',
      'Businesses with specific pain points that AI might solve',
      'Anyone ready to stop wondering and start moving',
    ],
    notFor: [
      'Businesses seeking someone to "do AI for them"',
      'Organizations wanting to "wait and see"',
      'Those looking for generic AI advice',
    ],
    faq: [
      {
        question: 'What if I have no AI experience?',
        answer: 'Perfect. Most clients come with zero AI background. We meet you where you are and translate everything into business language.',
      },
      {
        question: 'How do I prepare for the session?',
        answer: 'After booking, you\'ll receive a brief intake form (10 minutes). That\'s all the prep needed.',
      },
      {
        question: 'What happens after the session?',
        answer: 'Within 24 hours, you\'ll receive a summary document, session recording, and your 30-day action plan.',
      },
    ],
  },
  blueprint: {
    id: 'blueprint',
    name: 'AI Acceleration Blueprint',
    tagline: 'Complete strategic architecture for AI transformation',
    description: 'A comprehensive analysis and strategic roadmap that maps AI opportunities to your specific business context.',
    investment: '$3,000 \u2013 $7,500',
    duration: '5\u20137 days',
    deliverables: [
      'Complete AI opportunity audit',
      'Strategic implementation roadmap',
      'Technology stack recommendations',
      'ROI projections and timeline',
      'Team capability assessment',
      'Vendor evaluation framework',
    ],
    process: [
      { step: 1, title: 'Discovery', description: 'Deep-dive into your business operations' },
      { step: 2, title: 'Analysis', description: 'Identify and validate AI opportunities' },
      { step: 3, title: 'Design', description: 'Craft strategic implementation plan' },
      { step: 4, title: 'Deliver', description: 'Present and refine the blueprint' },
    ],
    idealFor: [
      'Companies ready to invest seriously in AI',
      'Leaders who need a clear implementation path',
      'Organizations with complex operations',
      'Teams ready to execute on a strategic plan',
    ],
    notFor: [
      'Early-stage exploration (try Illumination Session first)',
      'Organizations without decision-making authority present',
      'Those seeking ongoing implementation support',
    ],
    faq: [
      {
        question: 'What\'s included in the blueprint?',
        answer: 'A comprehensive document covering opportunities, recommendations, implementation roadmap, resource requirements, and expected ROI.',
      },
      {
        question: 'How do we work together during this?',
        answer: 'You\'ll have a discovery call, followed by asynchronous collaboration, and conclude with a strategic presentation.',
      },
      {
        question: 'Can you help implement the recommendations?',
        answer: 'The blueprint is designed to be actionable by your team or partners. We can provide referrals to trusted implementation partners.',
      },
    ],
  },
  story: {
    id: 'story',
    name: 'Breath of Life Story',
    tagline: 'Transform your expertise into authority',
    description: 'Deep narrative work that captures your unique voice, story, and expertise\u2014creating content that positions you as a thought leader.',
    investment: '$2,500 \u2013 $12,000',
    duration: '2\u20136 weeks',
    deliverables: [
      'Brand narrative framework',
      'Founder/leadership story',
      'Key messaging architecture',
      'Content pillars and themes',
      'Voice and tone guidelines',
      'Sample content pieces',
    ],
    process: [
      { step: 1, title: 'Excavate', description: 'Uncover your unique story and voice' },
      { step: 2, title: 'Craft', description: 'Shape narratives that resonate' },
      { step: 3, title: 'Refine', description: 'Polish and perfect the messaging' },
      { step: 4, title: 'Activate', description: 'Launch with sample content' },
    ],
    idealFor: [
      'Founders building personal brands',
      'Experts seeking thought leadership positioning',
      'Companies clarifying their narrative',
      'Leaders with stories that need telling',
    ],
    notFor: [
      'Those seeking generic marketing copy',
      'Organizations without access to key storytellers',
      'Quick turnaround projects',
    ],
    faq: [
      {
        question: 'What makes this different from copywriting?',
        answer: 'We don\'t just write about you\u2014we capture you. The result is authentic content that sounds like you at your best.',
      },
      {
        question: 'How much of my time is required?',
        answer: '3-5 hours of interviews spread across the engagement, plus review and feedback time.',
      },
      {
        question: 'What can I use the deliverables for?',
        answer: 'Everything. Website, social, pitch decks, speaking engagements, book proposals. It\'s your story\u2014use it everywhere.',
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
    quote: 'In 90 minutes, I saw possibilities I\'d been blind to for years. The clarity was immediate and actionable.',
    author: 'Sarah Chen',
    role: 'CEO',
    company: 'TechStart Inc',
  },
  {
    id: '2',
    quote: 'The blueprint gave us exactly what we needed\u2014a clear path forward without the overwhelm.',
    author: 'Marcus Johnson',
    role: 'Founder',
    company: 'Growth Labs',
  },
  {
    id: '3',
    quote: 'Finally, AI consulting that speaks business, not jargon. Worth every penny.',
    author: 'Emily Rodriguez',
    role: 'COO',
    company: 'Velocity Partners',
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
    description: 'Your business already contains its own genius. AI reveals it\u2014we don\'t invent it.',
    accent: 'radiance-gold',
  },
  {
    title: 'Speed Beats Perfection',
    description: 'A 70% solution today beats a 100% solution in six months.',
    accent: 'radiance-amber',
  },
  {
    title: 'Clarity Is The Multiplier',
    description: 'One clear decision, properly executed, outperforms a dozen confused ones.',
    accent: 'clarity-cream',
  },
];
