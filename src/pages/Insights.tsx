/**
 * Insights Page (Blog/Thought Leadership)
 * Light Brand Consulting
 */

import React, { useState } from 'react';
import {
  Button,
  Card,
  Tag,
  NewsletterCapture,
  ArrowRightIcon,
} from '../components';
import { PageKey } from '../types';

interface InsightsPageProps {
  onNavigate: (page: PageKey) => void;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  content: string[];
  keyTakeaways: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'strategic-moment',
    title: 'The Strategic Moment: Why 2024-2026 Matters',
    category: 'AI Strategy',
    excerpt: 'We\'re in a window that only opens once per generation. Here\'s why the next 24 months will determine the next decade.',
    readTime: '8 min read',
    date: 'January 2025',
    content: [
      'Every generation gets one or two moments like this. Moments where a technology shift creates a window of opportunity—and the businesses that move through it first gain advantages that compound for decades.',
      '1995 was one of those moments for the web. Companies that figured out e-commerce, online presence, and digital operations in those early years built moats that still exist today. Amazon launched in 1995. Most retailers waited until 2005. The gap became unbridgeable.',
      '2008 was another moment for mobile. The iPhone had just launched, and suddenly computing was personal, portable, and always-on. Companies that understood this shift early—Instagram (2010), Uber (2009), WhatsApp (2009)—built billion-dollar businesses on a platform their competitors dismissed as a toy.',
      'We\'re in one of those moments right now. And like every generational shift, most businesses will wait too long.',
      'The AI opportunity isn\'t about implementing cutting-edge research or building your own models. It\'s about applying existing capabilities—ones that are already mature and accessible—to your specific business context. The gap between AI\'s current capabilities and most businesses\' current usage is enormous.',
      'Here\'s what makes this moment unique: unlike the web (which required building infrastructure) or mobile (which required new platforms), AI can be applied to your existing business immediately. The technology is here. The tools are accessible. The only missing ingredient is clarity about where to start.',
      'The businesses that move in 2024-2026 won\'t just gain efficiency. They\'ll gain insight—about their customers, their operations, their markets—that their competitors won\'t have. And insight compounds.',
      'The window doesn\'t stay open forever. As AI becomes ubiquitous, the advantage shifts from "using AI" to "using AI better than everyone else." That\'s a much harder game. Right now, you can gain advantage simply by using AI at all. That won\'t last.',
    ],
    keyTakeaways: [
      'Generational tech shifts create 24-36 month windows where early movers gain compounding advantages',
      'Unlike previous shifts, AI can be applied to existing businesses immediately—no new infrastructure required',
      'The current advantage is simply using AI at all; soon the bar will rise to using it better than competitors',
      'Clarity about where to start matters more than comprehensive transformation roadmaps',
    ],
  },
  {
    id: 'confusion-to-clarity',
    title: 'From Confusion to Clarity: The Light Touch Approach',
    category: 'Methodology',
    excerpt: 'Most AI consulting creates dependency. We\'re building something different: clarity that compounds into capability.',
    readTime: '6 min read',
    date: 'December 2024',
    content: [
      'Traditional consulting has a business model problem. Revenue comes from ongoing engagements—which means the incentive is to extend, expand, and embed. The longer a consultant is needed, the more money they make.',
      'This creates a perverse dynamic in AI consulting specifically. Complexity serves the consultant, not the client. Jargon creates dependency. Comprehensive 12-month transformation roadmaps ensure 12 months of billings.',
      'We built Light Brand Consulting on a different principle: our success should be measured by how quickly you don\'t need us anymore.',
      'This isn\'t altruism—it\'s better business. Clients who get clear, actionable value in a short engagement become advocates. They refer others. They come back when they have new challenges. They trust us.',
      'The Light Touch approach has three pillars:',
      'Reveal, Don\'t Impose: Your business already has opportunities hiding in plain sight. Our job isn\'t to import generic AI solutions—it\'s to illuminate what\'s already there. The best recommendations feel obvious in hindsight because they fit your specific context.',
      'Speed Beats Perfection: A 70% solution today beats a 100% solution in six months. We\'d rather you start moving with imperfect clarity than stay paralyzed seeking perfect information. You\'ll learn more from doing than from planning.',
      'Clarity Is The Multiplier: One clear decision, properly executed, outperforms a dozen confused ones. We focus relentlessly on reducing complexity, eliminating jargon, and giving you frameworks you can actually use.',
      'The result: engagements measured in hours and days, not months. Deliverables that fit on one page, not one hundred. Recommendations you can explain to your team without a translator.',
      'We\'re not trying to be your permanent AI department. We\'re trying to give you the clarity to build your own.',
    ],
    keyTakeaways: [
      'Traditional consulting incentives favor complexity and long engagements over client outcomes',
      'The best measure of consulting success is how quickly clients can operate independently',
      'AI opportunities already exist in your business—good consulting reveals them, it doesn\'t import them',
      'Speed and clarity beat comprehensiveness; start moving with 70% certainty',
    ],
  },
  {
    id: 'opportunity-mapping',
    title: 'AI Opportunity Mapping: Finding Your Starting Point',
    category: 'Implementation',
    excerpt: 'Don\'t boil the ocean. Here\'s a framework for identifying the 3-5 AI opportunities that will actually move your needle.',
    readTime: '10 min read',
    date: 'November 2024',
    content: [
      'The biggest mistake businesses make with AI isn\'t starting too small. It\'s trying to do everything at once.',
      'Comprehensive AI transformation roadmaps look impressive. They also fail. Not because the vision is wrong, but because organizations can\'t execute on 50 initiatives simultaneously. Resources get spread thin. Attention fragments. Nothing reaches completion.',
      'The businesses succeeding with AI aren\'t the ones with the most ambitious plans. They\'re the ones who found 3-5 high-impact opportunities and executed on them completely.',
      'Here\'s a framework for identifying those opportunities:',
      'Step 1: Map Your Pain Points. Start with frustration, not aspiration. Where do your people waste time? What tasks do they dread? What information is hard to find? What decisions lack good data? Pain points reveal opportunity.',
      'Step 2: Assess AI Fit. Not every pain point is an AI opportunity. AI excels at: processing large volumes of information, finding patterns humans miss, generating content variations, answering questions from existing knowledge bases, and automating repetitive cognitive work. If your pain point involves one of these, AI might help.',
      'Step 3: Evaluate Impact vs. Effort. Plot each potential opportunity on a 2x2: high impact/low effort (do these first), high impact/high effort (plan these), low impact/low effort (maybe), low impact/high effort (don\'t bother). Be ruthless. Most opportunities aren\'t worth pursuing.',
      'Step 4: Consider Data Readiness. AI needs fuel. Do you have the data required? Is it accessible? Is it clean? If not, factor in the effort to get it ready. Many AI projects fail not because the AI doesn\'t work, but because the data foundation wasn\'t there.',
      'Step 5: Start With One. Pick your single best opportunity—high impact, low effort, good data, clear AI fit—and do it completely. Learn from it. Then pick the next one. Sequential beats simultaneous.',
      'The goal isn\'t to transform everything. It\'s to prove value, build capability, and create momentum. Start small, prove impact, then expand.',
    ],
    keyTakeaways: [
      'Comprehensive AI roadmaps fail because organizations can\'t execute 50 initiatives at once',
      'Success comes from finding 3-5 high-impact opportunities and executing them completely',
      'Start with pain points (frustration), not aspirations (wouldn\'t it be cool if...)',
      'Data readiness is the hidden factor—many AI projects fail because the data foundation isn\'t there',
      'Sequential execution beats simultaneous; start with one win, then expand',
    ],
  },
  {
    id: 'ai-hype-reality',
    title: 'Separating AI Hype from AI Reality',
    category: 'AI Strategy',
    excerpt: 'Most AI coverage is either breathless hype or dismissive skepticism. Here\'s what\'s actually true and useful.',
    readTime: '7 min read',
    date: 'October 2024',
    content: [
      'The AI conversation has become almost useless. On one side: breathless predictions about superintelligence, job elimination, and existential risk. On the other: dismissive skepticism that it\'s all just hype, a bubble, nothing to see here.',
      'Neither extreme helps business leaders make decisions. Here\'s what\'s actually true:',
      'AI is genuinely transformative. The capabilities that exist today—not in research labs, but in commercially available tools—can meaningfully impact most businesses. This isn\'t hype. Language models can genuinely understand and generate text. Vision models can genuinely analyze images. The technology works.',
      'AI is also genuinely limited. It hallucinates confidently. It lacks true understanding. It can\'t reason reliably. It requires massive data and compute. It\'s expensive to deploy at scale. Anyone who tells you AI can do everything is selling something.',
      'The useful middle ground: AI is a powerful tool with specific strengths and weaknesses. Like any tool, it\'s transformative when applied to the right problems and useless when misapplied.',
      'What AI does well today: Process and summarize large volumes of text. Generate first drafts and variations. Answer questions from existing knowledge bases. Extract structured data from unstructured sources. Identify patterns in data. Automate repetitive cognitive tasks.',
      'What AI does poorly today: Reliable reasoning and logic. Accurate factual recall (it guesses confidently). Novel problem-solving. Anything requiring physical world interaction. Tasks where errors have severe consequences. Anything requiring true understanding of context.',
      'The business opportunity lies in matching AI\'s actual strengths to your actual problems. Not in believing the hype. Not in dismissing everything. In seeing clearly.',
    ],
    keyTakeaways: [
      'Neither AI hype nor AI skepticism is useful for business decisions',
      'AI capabilities are genuinely transformative AND genuinely limited—both are true',
      'The opportunity is matching AI\'s actual strengths to your actual problems',
      'AI excels at processing volume, generating variations, and automating cognitive tasks',
      'AI struggles with reliable reasoning, accurate recall, and high-stakes decisions',
    ],
  },
  {
    id: 'first-ai-win',
    title: 'How to Get Your First AI Win in 30 Days',
    category: 'Implementation',
    excerpt: 'Theory is great. Results are better. Here\'s a practical playbook for proving AI value quickly.',
    readTime: '9 min read',
    date: 'September 2024',
    content: [
      'The best way to build AI capability isn\'t to study AI. It\'s to use AI. Theory creates knowledge; practice creates capability. And capability is what you need.',
      'Here\'s a 30-day playbook for getting your first AI win:',
      'Week 1: Identify Your Target. Find one specific task that meets these criteria: It happens frequently (at least weekly). It\'s time-consuming but not complex. It involves processing or generating text. The downside of errors is low. You do it yourself (not delegated). Pick ONE task. Not three. Not five. One.',
      'Week 2: Build Your Process. Spend this week using AI for your target task. Use Claude, ChatGPT, or whichever tool you prefer. Document what works and what doesn\'t. Refine your prompts. Build a repeatable process. Don\'t try to automate yet—just assist.',
      'Week 3: Measure Results. Track time spent with AI assistance vs. your baseline. Track quality of outputs. Track your confidence in the process. Be honest about what\'s working and what isn\'t. Adjust your approach based on data.',
      'Week 4: Expand or Pivot. If it\'s working: document your process, share it with one other person, get their feedback. If it\'s not working: identify why and either fix it or pick a different target task. Either outcome is progress.',
      'Common first wins: Drafting routine communications (emails, reports, updates). Summarizing meeting notes or documents. Researching topics and synthesizing findings. Generating variations of content. Answering common questions from existing materials.',
      'What makes this work: You\'re not trying to transform your business. You\'re building personal capability with AI. Once you\'ve done it yourself, you\'ll see opportunities everywhere. And you\'ll have the credibility to lead AI adoption because you\'ve actually done it.',
      'The biggest barrier to AI adoption isn\'t technology or budget. It\'s familiarity. This 30-day sprint builds familiarity through doing.',
    ],
    keyTakeaways: [
      'Practice beats theory—capability comes from using AI, not studying it',
      'Start with one task that\'s frequent, text-based, low-stakes, and personally done',
      'Spend the first weeks assisting (not automating) to build process understanding',
      'Personal AI capability creates organizational credibility to lead broader adoption',
      'Document and measure results—data beats intuition for proving value',
    ],
  },
];

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="min-h-screen pt-24 md:pt-32">
        <article className="section-spacing">
          <div className="container-narrow">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-text-muted hover:text-text-secondary text-sm mb-8 flex items-center gap-2 transition-colors"
            >
              ← Back to Insights
            </button>

            <Tag variant="default" className="mb-4">
              {selectedPost.category}
            </Tag>

            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-4 text-text-muted text-sm mb-8">
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <div className="prose prose-invert max-w-none">
              {selectedPost.content.map((paragraph, index) => (
                <p key={index} className="text-text-secondary mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Takeaways */}
            <Card elevation="elevated" className="mt-12 p-6 md:p-8">
              <h3 className="text-lg font-bold text-text-primary mb-4">
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {selectedPost.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-text-secondary text-sm">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* CTA */}
            <Card elevation="subtle" className="mt-8 p-6 md:p-8 text-center">
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Ready to Apply These Insights?
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Book an Illumination Session to see how these principles apply to your specific business.
              </p>
              <Button
                variant="primary"
                onClick={() => onNavigate('book')}
              >
                Book Your Session
              </Button>
            </Card>

            {/* More Posts */}
            <div className="mt-16">
              <h3 className="text-xl font-bold text-text-primary mb-6">
                More Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BLOG_POSTS.filter(p => p.id !== selectedPost.id).slice(0, 2).map((post) => (
                  <Card
                    key={post.id}
                    elevation="subtle"
                    className="cursor-pointer hover:border-radiance-gold/30 transition-colors"
                    onClick={() => {
                      setSelectedPost(post);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <Tag variant="default" size="sm" className="mb-3">
                      {post.category}
                    </Tag>
                    <h4 className="text-lg font-semibold text-text-primary mb-2">
                      {post.title}
                    </h4>
                    <p className="text-text-secondary text-sm">{post.excerpt}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Tag variant="premium" className="mb-4">
              Insights
            </Tag>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              AI Insights for{' '}
              <span className="text-radiance-gold">Business Leaders</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Practical perspectives on AI transformation. No jargon, just clarity.
              Written for leaders who need to make decisions, not impress technologists.
            </p>
          </div>

          {/* Featured Post */}
          <Card
            elevation="elevated"
            className="p-8 md:p-12 mb-12 cursor-pointer hover:border-radiance-gold/30 transition-colors"
            onClick={() => setSelectedPost(BLOG_POSTS[0])}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Tag variant="premium" className="mb-4">
                  Featured
                </Tag>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                  {BLOG_POSTS[0].title}
                </h2>
                <p className="text-text-secondary mb-4">
                  {BLOG_POSTS[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-text-muted text-sm mb-6">
                  <span>{BLOG_POSTS[0].date}</span>
                  <span>•</span>
                  <span>{BLOG_POSTS[0].readTime}</span>
                </div>
                <Button variant="primary" icon={<ArrowRightIcon size={16} />}>
                  Read Article
                </Button>
              </div>
              <div className="hidden lg:block">
                <div className="aspect-video rounded-brand-card bg-gradient-to-br from-radiance-gold/20 to-radiance-amber/10 flex items-center justify-center">
                  <span className="text-6xl">✦</span>
                </div>
              </div>
            </div>
          </Card>

          {/* All Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {BLOG_POSTS.slice(1).map((post) => (
              <Card
                key={post.id}
                elevation="subtle"
                className="cursor-pointer hover:border-radiance-gold/30 transition-colors group"
                onClick={() => setSelectedPost(post)}
              >
                <Tag variant="default" size="sm" className="mb-3">
                  {post.category}
                </Tag>
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-radiance-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-text-muted text-xs">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Newsletter Capture */}
          <div className="max-w-2xl mx-auto">
            <NewsletterCapture />
          </div>

          {/* Topics */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-text-primary mb-6">
              Topics We Cover
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['AI Strategy', 'Implementation', 'Methodology', 'Leadership', 'Case Studies', 'Industry Trends'].map((topic) => (
                <span
                  key={topic}
                  className="px-4 py-2 rounded-full bg-depth-elevated border border-depth-border text-text-secondary text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
