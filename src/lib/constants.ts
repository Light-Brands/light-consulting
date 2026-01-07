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
    quote: 'In 90 minutes, I saw possibilities I\'d been blind to for years. The clarity was immediate and actionable. Within a week, we had our first AI pilot running.',
    author: 'Sarah Chen',
    role: 'CEO',
    company: 'TechStart Inc',
  },
  {
    id: '2',
    quote: 'The blueprint gave us exactly what we needed—a clear path forward without the overwhelm. Our board was impressed by the strategic rigor and realistic timelines.',
    author: 'Marcus Johnson',
    role: 'Founder',
    company: 'Growth Labs',
  },
  {
    id: '3',
    quote: 'Finally, AI consulting that speaks business, not jargon. Worth every penny. We\'ve already 3x\'d our investment through the first opportunity they identified.',
    author: 'Emily Rodriguez',
    role: 'COO',
    company: 'Velocity Partners',
  },
  {
    id: '4',
    quote: 'I was skeptical another consultant could understand our complex operations. By hour two of discovery, they were asking questions our own team hadn\'t thought to ask.',
    author: 'David Park',
    role: 'VP Operations',
    company: 'Meridian Manufacturing',
  },
  {
    id: '5',
    quote: 'The narrative work transformed how I show up. Speaking invitations tripled, and I finally have language that captures what I\'ve been trying to say for a decade.',
    author: 'Rachel Torres',
    role: 'Founder & Author',
    company: 'Future Forward Consulting',
  },
  {
    id: '6',
    quote: 'We\'d wasted six months with another firm that gave us a generic AI playbook. Light Brand\'s approach was completely different—specific, actionable, and honest about what wouldn\'t work for us.',
    author: 'Michael Okonkwo',
    role: 'CTO',
    company: 'HealthBridge Solutions',
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
// Success Metrics (for Services page)
// ============================================================================

export const SUCCESS_METRICS = [
  {
    metric: '94%',
    label: 'Client satisfaction rate',
    description: 'Of clients report their session exceeded expectations',
  },
  {
    metric: '3.2x',
    label: 'Average ROI',
    description: 'Return on first implemented AI opportunity',
  },
  {
    metric: '< 30 days',
    label: 'Time to first win',
    description: 'Average time to implement first recommendation',
  },
  {
    metric: '200+',
    label: 'Sessions delivered',
    description: 'Across industries from healthcare to e-commerce',
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
