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
  ImagePlaceholder,
} from '../components';
import { IMAGE_CONFIG } from '../lib/constants';
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
  {
    id: 'leading-ai-transformation',
    title: 'Leading AI Transformation: A Guide for Business Leaders',
    category: 'Leadership',
    excerpt: 'You don\'t need to understand the technology to lead the transformation. Here\'s how to guide your business through AI adoption without becoming a technologist.',
    readTime: '8 min read',
    date: 'August 2024',
    content: [
      'The biggest misconception about leading AI transformation is that you need to become an AI expert. You don\'t. Just like you don\'t need to understand TCP/IP protocols to lead digital strategy, or assembly language to make software decisions. Your job as a leader isn\'t to understand how AI works—it\'s to understand what it means for your business and guide your team accordingly.',
      'What you do need: clarity about where you\'re going, conviction to move when others hesitate, and the wisdom to empower your team rather than micromanage the technology. Leading AI transformation is fundamentally about leadership, not technology. And that\'s good news, because you already know how to lead.',
      'The leader\'s job in AI transformation comes down to four critical decisions: Where do we focus? Who owns this? What does success look like? And when do we start? Get these right, and the technology details take care of themselves. Get them wrong, and no amount of technical expertise will save you.',
      'Decision One: Where do we focus? This is the most important call you\'ll make. Your team will see AI opportunities everywhere. They\'re not wrong—AI can help with dozens of things. But "can" isn\'t the same as "should." Your job is to point at the one or two places where AI will move your specific business needle, and give your team permission to ignore everything else.',
      'Decision Two: Who owns this? AI initiatives fail when everyone owns them and no one owns them. You need a single person accountable for results—not for implementing the technology, but for driving the business outcome. This owner doesn\'t need to be technical. They need to be capable of driving cross-functional work and making decisions with incomplete information.',
      'Decision Three: What does success look like? Vague goals create vague results. "Explore AI" isn\'t a goal. "Improve efficiency" isn\'t measurable. Get specific. Define success in terms your entire team can understand and measure before you start, not after.',
      'Decision Four: When do we start? The answer is now, but not the way you think. You don\'t start by launching a comprehensive AI transformation program. You start by picking one leader, giving them one focused goal, setting one clear success metric, and giving them 90 days.',
      'The hardest part of leading AI transformation isn\'t the technology. It\'s the cultural shift. You\'re asking your organization to work differently: to tolerate more uncertainty, to learn by doing rather than planning, to accept that 70% solutions today beat 100% solutions in six months.',
      'Leading AI transformation doesn\'t require you to learn prompt engineering or understand transformer models. It requires you to do what you already do as a leader: see clearly, decide quickly, empower your team, and hold them accountable for results.',
    ],
    keyTakeaways: [
      'Leaders don\'t need to understand AI technology—they need clarity about business goals and the conviction to act',
      'Four critical decisions: where to focus, who owns it, what success looks like, and when to start',
      'Start with one focused 90-day sprint to a meaningful result, not a comprehensive transformation roadmap',
      'Success spreads organically—prove value with early wins rather than mandating adoption across the organization',
      'Your job is to model the behavior you want: decide with incomplete information, start before you\'re ready, adjust as you learn',
    ],
  },
  {
    id: 'building-ai-culture',
    title: 'Building an AI-Ready Culture: Getting Your Team on Board',
    category: 'Leadership',
    excerpt: 'The biggest barrier to AI adoption isn\'t technology or budget—it\'s the people who need to use it. Here\'s how to turn skeptics into advocates.',
    readTime: '8 min read',
    date: 'July 2024',
    content: [
      'Here\'s what nobody tells you about AI implementation: the technology is the easy part. Getting your team to actually use it? That\'s where most initiatives die.',
      'You can have the perfect AI strategy, unlimited budget, and cutting-edge tools. But if your team sees AI as a threat, a hassle, or "another thing from leadership that will blow over"—you\'ve already lost. The graveyard of failed AI initiatives isn\'t filled with bad technology. It\'s filled with good technology that nobody wanted to use.',
      'The resistance is predictable. "This will replace my job." "I don\'t have time to learn new tools." "AI makes mistakes." "This is just hype." You\'ve heard these objections. The mistake most leaders make is trying to overcome this resistance with logic, mandates, or cheerleading. None of those work.',
      'What does work is fundamentally reframing how your team thinks about AI. Not as a threat to address, but as an advantage to claim. Not as something imposed from above, but as something they discover themselves.',
      'Start with the believers, not the skeptics. Every organization has people who are already experimenting with AI. Find these people. They\'re your early adopters, and they\'re more valuable than any change management consultant.',
      'Give your early adopters three things: permission, space, and visibility. Permission to experiment during work hours. Space to try, fail, and iterate without bureaucratic approval processes. Visibility to share what they\'re learning with the broader team.',
      'Here\'s what happens when early adopters get public wins: their peers get curious. Not because leadership mandated it. Because they saw someone like them save hours, produce better results, or solve annoying problems. Peer proof beats executive mandate every time.',
      'Address the fear directly and honestly. Some jobs will change. Some tasks will be automated. These are legitimate concerns, and pretending they\'re not real destroys trust.',
      'The cultural shift happens faster than you think—once it starts. There\'s a tipping point in every organization where AI goes from "that thing some people do" to "how we work." You hit that point when roughly 15-20% of your team are regular users who talk about their wins.',
    ],
    keyTakeaways: [
      'Technology isn\'t the barrier to AI adoption—team buy-in is, and most failures happen because people don\'t want to use the tools',
      'Start with early adopters (people already experimenting), give them permission and visibility, let peer proof drive broader adoption',
      'Make AI feel like opportunity (recognition, experimentation time, solving real problems) not obligation (mandates, quotas, required training)',
      'Address job security fears honestly—tasks will change, some will be automated, but that creates capacity for higher-value work',
      'Cultural tipping point happens around 15-20% regular usage—before that it feels slow, after that adoption accelerates naturally',
    ],
  },
  {
    id: 'ai-implementation-mistakes',
    title: 'The 7 Most Costly AI Implementation Mistakes (And How to Avoid Them)',
    category: 'Implementation',
    excerpt: 'Most AI projects fail for predictable reasons. Here are the seven mistakes that kill momentum—and the practical fixes that actually work.',
    readTime: '9 min read',
    date: 'June 2024',
    content: [
      'Here\'s what nobody tells you about AI implementation: the technology isn\'t the hard part. The tools work. The models are capable. What kills most AI projects isn\'t technical failure—it\'s entirely predictable mistakes that have nothing to do with the technology itself.',
      'Mistake #1: Starting With Your Hardest Problem. Hard problems make terrible starting points. They require perfect data, complex integration, high accuracy, and flawless execution. Instead, start with your easiest high-value win. Prove value quickly, build capability, then tackle harder problems.',
      'Mistake #2: Automating Broken Processes. AI doesn\'t fix bad processes—it accelerates them. If your current workflow is inefficient, AI will make it efficiently inefficient at scale. Fix the process first, then automate the good version.',
      'Mistake #3: Waiting For Perfect Data. You don\'t need perfect data to start. You need good enough data. Most businesses wait months cleaning data while competitors are moving with 70% data quality and learning as they go.',
      'Mistake #4: Building When You Should Buy. Most businesses don\'t need custom models—they need existing capabilities applied to specific problems. Before building anything, ask: does a commercial tool already do this?',
      'Mistake #5: Treating AI As A Technology Project. AI implementation isn\'t about deploying technology—it\'s about changing how people work. Treat it as a change management project that happens to involve technology.',
      'Mistake #6: Measuring Activity Instead Of Outcomes. Don\'t track "how many people are using AI"—track "what business problems are we solving?" If you can\'t connect AI usage to business results, you\'re measuring the wrong things.',
      'Mistake #7: Going It Alone. The people with the clearest view of AI opportunities aren\'t in the C-suite—they\'re doing the work every day. Involve them early. The best AI strategies emerge from the bottom up.',
      'The pattern across all seven mistakes is the same: businesses overcomplicate AI. The fix is starting small, moving fast, involving people, and measuring what matters.',
    ],
    keyTakeaways: [
      'Start with easy high-value wins, not your hardest problems—build capability before tackling complexity',
      'Fix broken processes before automating them; AI accelerates what you do, good or bad',
      'Don\'t wait for perfect data; 70% data quality is enough to start learning and proving value',
      'Treat AI as change management with technology, not a technology project with people implications',
      'Measure business outcomes (time saved, quality, revenue) not activity metrics (usage, queries, adoption)',
    ],
  },
  {
    id: 'ai-small-business',
    title: 'AI for Small Business: Big Results Without Big Budgets',
    category: 'Implementation',
    excerpt: 'You don\'t need enterprise budgets or dedicated teams to benefit from AI. Here\'s how small businesses are winning with tools that cost less than your monthly coffee habit.',
    readTime: '8 min read',
    date: 'May 2024',
    content: [
      'The AI narrative has a credibility problem when it comes to small business. Every case study features companies with dedicated AI teams and million-dollar budgets. If you\'re running a business with 5-50 people, those stories feel like a different universe.',
      'Here\'s what nobody tells you: the actual AI tools making the biggest impact right now cost between $0 and $20 per month. The businesses seeing 10-20 hour weekly time savings aren\'t using custom models. They\'re using the same tools available to anyone with a credit card.',
      'The gap isn\'t about access. It\'s about knowing where to start. And for small businesses, "where to start" looks completely different than it does for enterprises. You don\'t have the luxury of six-month pilots. You need wins this week.',
      'Start with the tools that are already mature: ChatGPT, Claude, and industry-specific tools built on these foundations. You\'re not looking for cutting-edge research—you\'re looking for proven capabilities applied to your specific problems.',
      'The highest-ROI opportunities for small businesses follow a pattern: repetitive knowledge work that currently lives in someone\'s head or inbox. Customer support emails. Sales proposals. Meeting notes. Job descriptions.',
      'Here\'s what a realistic first month looks like: Week 1, pick one repetitive task and start handling it with AI assistance. Week 2, refine your process. Week 3, measure the time savings. Week 4, if it\'s working, show one other person.',
      'The businesses getting this right aren\'t trying to "transform everything with AI." They\'re finding 3-5 specific tasks where AI assistance creates leverage, then executing on those completely before expanding.',
      'The window for "easy AI wins" in small business is wide open right now. Your competitors with 500 employees are tangled up in procurement processes. You can start this afternoon. That agility is your competitive advantage.',
    ],
    keyTakeaways: [
      'The most effective AI tools for small business cost $0-20/month—access isn\'t the barrier, knowing where to start is',
      'Focus on repetitive knowledge work: support emails, proposals, meeting notes, content drafts',
      'Start with one person, one task, one month—prove value before expanding to the team',
      'Small business agility is an advantage: you can test and implement while enterprises are still in procurement',
      'ROI threshold is low: saving 2 hours per month pays for most AI tools, and most businesses hit that week one',
    ],
  },
  {
    id: 'human-ai-collaboration',
    title: 'The Human-AI Partnership: Augmentation, Not Replacement',
    category: 'AI Strategy',
    excerpt: 'The question isn\'t whether AI will replace your job. It\'s whether someone using AI will replace you.',
    readTime: '8 min read',
    date: 'April 2024',
    content: [
      'Let\'s address the fear directly: Yes, AI will eliminate some jobs. But history shows us that technology rarely works the way we initially fear. The calculator didn\'t eliminate accountants—it eliminated the drudgery of arithmetic and elevated accounting into strategic financial analysis.',
      'AI follows the same pattern. The threat isn\'t AI replacing humans. It\'s humans with AI replacing humans without AI. The winners in this transition will be the ones who figure out the partnership.',
      'Here\'s what makes this moment different from previous automation waves: AI doesn\'t just handle repetitive physical tasks. It handles repetitive cognitive tasks. That\'s new.',
      'But here\'s the opportunity: AI is terrible at the things humans do best. And humans are terrible at the things AI does best. The magic happens when you combine them.',
      'What AI does better than humans: Process massive volumes of information instantly. Maintain perfect consistency across thousands of repetitive tasks. Generate variations without boredom. Work 24/7 without breaks.',
      'What humans do better than AI: Understand context and nuance. Make judgment calls in ambiguous situations. Build relationships and trust. Navigate complex social dynamics. Care about outcomes.',
      'The businesses that will thrive aren\'t trying to replace humans with AI. They\'re building systems where humans and AI each handle what they\'re good at.',
      'Here\'s what this looks like in practice: A customer service team where AI handles routine inquiries instantly, humans handle complex issues personally. A marketing team where AI generates content variations, humans select and refine the best ones.',
      'The mistake most businesses make is treating this as an either-or choice. The right question is: which parts should humans do, which parts should AI do, and how do they hand off to each other?',
    ],
    keyTakeaways: [
      'The real threat isn\'t AI replacing humans—it\'s humans using AI replacing humans who don\'t',
      'AI handles volume and consistency brilliantly; humans handle judgment and relationships brilliantly',
      'Success comes from decomposing work into AI-suitable and human-suitable components, not replacing entire roles',
      'Start by mapping one role\'s tasks and identifying clear human-AI handoffs before attempting broad transformation',
      'Competitive advantage comes from humans who master AI collaboration, not from AI alone',
    ],
  },
  {
    id: 'measuring-ai-roi',
    title: 'Measuring AI ROI: Beyond the Hype to Real Numbers',
    category: 'Implementation',
    excerpt: 'Most businesses measure AI wrong—then wonder why executives stay skeptical. Here\'s how to quantify value in ways that actually matter.',
    readTime: '9 min read',
    date: 'March 2024',
    content: [
      'The CFO asks the question that kills most AI initiatives: "What\'s the ROI?" And suddenly everyone gets vague. "It\'s transformative." "It\'s strategic." None of this is wrong. All of it is useless for making budget decisions.',
      'Here\'s the uncomfortable truth: if you can\'t measure AI value in concrete terms, you can\'t justify continued investment. Measurement isn\'t about proving you\'re right. It\'s about creating the conditions for your AI work to survive and scale.',
      'Start with what matters: Direct Time Savings. This is your easiest, most defensible metric. Find a task that AI now assists with. Measure time before and after. Multiply by frequency and cost per hour.',
      'Next: Quality Improvements That Reduce Downstream Costs. AI often doesn\'t save time directly—it improves quality, which saves time later. Measure the downstream impact: fewer escalations, faster resolution times, reduced rework.',
      'Then: Revenue Enablement—But Make It Specific. "AI will increase revenue" is useless. "AI-powered recommendations increased average order value from $67 to $73" is a number you can defend.',
      'Some AI value is real but not directly quantifiable: Employee satisfaction from eliminating tedious work. Ability to respond to opportunities you previously had to ignore. Earn credibility with hard numbers first, then supplement with qualitative benefits.',
      'Here\'s a practical framework: Before you start, define your "value hypothesis." Choose 2-3 metrics: one quantitative, one quality-based, and one strategic. Measure baseline before implementation. Compare at 30, 60, 90 days.',
      'One critical mistake to avoid: don\'t measure "AI adoption" as if it\'s value. What matters is: "Of the 80% who tried it, 45% use it weekly, saving an average of 2 hours each."',
      'Build a simple ROI dashboard you can actually maintain. Track 3-5 key metrics monthly. Make it simple enough that you\'ll actually keep it updated.',
    ],
    keyTakeaways: [
      'Start with direct time savings—hours and dollars are the easiest metrics to defend to finance',
      'Quality improvements often matter more than time savings, but measure downstream impact (fewer errors, faster resolution, reduced rework)',
      'Define your value hypothesis before starting, then track 2-3 specific metrics rather than trying to measure everything',
      'Earn credibility with hard numbers first, then supplement with qualitative benefits—never lead with "strategic value"',
      'Build a simple ROI dashboard you\'ll actually maintain: investment to date, value generated, and payback trajectory',
    ],
  },
  {
    id: 'responsible-ai',
    title: 'Responsible AI: Building Trust Through Ethical Implementation',
    category: 'AI Strategy',
    excerpt: 'Ethics isn\'t a checklist or PR problem. Here\'s how to build AI systems your customers, employees, and lawyers can trust.',
    readTime: '8 min read',
    date: 'February 2024',
    content: [
      'Most conversations about AI ethics fall into two useless camps: philosophical debates about consciousness, or corporate virtue signaling. Neither helps you make decisions.',
      'Here\'s what actually matters: you\'re about to deploy AI systems that will make decisions affecting real people. Those decisions will have consequences—for your customers, your employees, your reputation, and your legal liability.',
      'The good news: responsible AI isn\'t about solving philosophy. It\'s about implementing specific practices that reduce specific risks.',
      'Start with bias—because your AI will inherit it. Every AI system is trained on data, and data reflects the world that created it. The solution isn\'t perfect data—that doesn\'t exist. The solution is acknowledging bias exists and building processes to detect and mitigate it.',
      'Transparency is about explainability, not complexity. When your AI declines a loan application, can you tell the applicant why? If you can\'t explain the decision, don\'t automate it.',
      'Privacy isn\'t just compliance—it\'s trust architecture. Minimize data collection to what\'s actually needed. Anonymize wherever possible. Never use customer data for purposes they didn\'t consent to.',
      'Accountability means someone\'s name is on it. AI systems don\'t make decisions—people do. Define clear ownership before deployment. Who monitors performance? Who handles appeals? Who decides when to override?',
      'Before deploying any AI system, answer these questions: What decision is this AI making? Who is affected? What\'s the downside if it\'s wrong? Can we explain how it works? Is it tested for bias? Who owns it?',
      'The businesses that win with AI won\'t be the ones that move fastest. They\'ll be the ones that move sustainably—building systems that create value without creating liability.',
    ],
    keyTakeaways: [
      'AI ethics isn\'t philosophy—it\'s risk management for systems that affect real people with real consequences',
      'Bias is inevitable in training data; responsible AI means building processes to detect and mitigate it continuously',
      'Transparency requires explainable decisions, not technical explanations—if you can\'t justify the output, don\'t automate it',
      'Privacy is trust architecture: minimize data collection, maximize transparency, never repurpose without consent',
      'Accountability means clear ownership before deployment—someone must own monitoring, appeals, and intervention decisions',
    ],
  },
  {
    id: 'ai-customer-experience',
    title: 'Transforming Customer Experience with AI: Where to Start',
    category: 'Implementation',
    excerpt: 'Most AI customer service feels robotic because companies automate first and think later. Here\'s how to use AI to make experiences more human, not less.',
    readTime: '8 min read',
    date: 'January 2024',
    content: [
      'Every business wants better customer experience. Faster responses. More personalization. Proactive service. The promise of AI is that you can deliver all three without proportionally scaling your team.',
      'But most AI-powered customer experiences feel terrible. Chatbots that can\'t understand simple questions. "Personalization" that\'s creepy or irrelevant. The technology works, but the implementation doesn\'t.',
      'The problem isn\'t the AI. It\'s the approach. Companies automate first and think later. They replace human touchpoints with AI before understanding what made those touchpoints valuable.',
      'Here\'s a better framework: use AI to make your customer experience more human, not less. That means understanding where AI actually helps, where it hurts, and where the human touch matters most.',
      'Start with the waiting. The most universal customer frustration is waiting. A well-designed chatbot doesn\'t need to solve every problem. It needs to eliminate waiting for simple things. Account balances. Order status. Basic troubleshooting.',
      'The key is honesty. Don\'t pretend the bot is human. Make it trivially easy to reach a human. The best chatbot implementations reduce simple inquiries by 60-70%, which means your human team can focus on issues that actually need expertise and empathy.',
      'Consider personalization—but be careful. The rule: personalize based on what customers explicitly tell you or obviously demonstrate, not what you secretly infer. Helpful is welcome; creepy erodes trust.',
      'The most underrated AI application is predictive service—anticipating problems before customers experience them. Your AI can monitor patterns and you can reach out proactively with solutions.',
      'The framework: AI handles the volume, humans handle the nuance. This isn\'t about replacement; it\'s about augmentation.',
    ],
    keyTakeaways: [
      'Use AI to eliminate waiting on simple inquiries (status, information retrieval) so humans can focus on complex issues requiring empathy and expertise',
      'Good chatbots are honest about being bots and make it easy to reach humans—don\'t force customers through bot hell',
      'Personalize based on explicit preferences and obvious behavior, not secretly inferred data—there\'s a line between helpful and creepy',
      'Predictive service (anticipating problems before customers notice) is underrated but requires human judgment to act appropriately',
      'The winning framework: AI handles volume, humans handle nuance—augmentation beats replacement',
    ],
  },
  {
    id: 'ai-data-readiness',
    title: 'Is Your Data AI-Ready? A Practical Assessment Guide',
    category: 'Implementation',
    excerpt: 'Before you invest in AI, ask this: is your data ready? Most AI initiatives fail not because the technology doesn\'t work, but because the data foundation isn\'t there.',
    readTime: '9 min read',
    date: 'December 2023',
    content: [
      'Here\'s the uncomfortable truth about AI: it\'s only as good as your data. A brilliant AI strategy built on messy, inaccessible, or poorly governed data is like building a mansion on quicksand.',
      'Most businesses rush toward AI without asking a fundamental question: "Is our data ready for this?" They invest in tools, hire talent, build roadmaps—and then discover their data is scattered across fifteen systems.',
      'The good news: assessing data readiness doesn\'t require a six-month audit. You can get clarity in days, not months. Here\'s a practical framework.',
      'Start with the Three Pillars: Quality, Accessibility, and Governance. Quality means your data reflects truth. Accessibility means your people can actually use it. Governance means you know who owns what and what the rules are.',
      'Your data doesn\'t need to be perfect—it needs to be good enough for the decisions you\'re trying to make. A simple quality test: pick a critical business decision you made recently. Trace it back to the data. How confident were you?',
      'Accessibility is where most businesses discover their real bottleneck. Your data might be high quality—but if it takes three weeks to access it, it\'s not ready for AI. Try to get the data for one AI use case and time how long it takes.',
      'Good governance is simple: clear ownership, clear rules, clear consequences. If your data governance requires a 50-page manual to understand, it won\'t work.',
      'Rate yourself on each pillar: Red (major issues), Yellow (workable but needs improvement), Green (ready). If you\'re Red on any pillar, fix that before investing heavily in AI.',
      'Data readiness isn\'t static. As your AI ambitions grow, your data requirements grow. Reassess regularly. The businesses succeeding with AI aren\'t the ones with perfect data—they\'re the ones who honestly assessed where they stood and started building.',
    ],
    keyTakeaways: [
      'AI success depends on three data pillars: Quality (accurate, complete, current), Accessibility (available when needed), and Governance (clear ownership and rules)',
      'Assess each pillar honestly using Red/Yellow/Green—if you\'re Red anywhere, fix that before scaling AI initiatives',
      'Data readiness isn\'t binary—match your current data state to appropriate AI use cases while improving your foundation',
      'Perfect data is a myth; businesses win by honestly assessing their state and continuously improving',
      'The fastest way to assess readiness: pick one AI use case and try to get the data for it—time how long it takes',
    ],
  },
  {
    id: 'ai-personal-productivity',
    title: 'AI-Powered Productivity: Reclaiming 10 Hours a Week',
    category: 'Methodology',
    excerpt: 'Most people waste 10-15 hours weekly on tasks AI could handle. Here\'s how to reclaim that time—starting today.',
    readTime: '8 min read',
    date: 'November 2023',
    content: [
      'You\'re already working with AI. You just don\'t realize how much time you\'re leaving on the table.',
      'Most professionals spend 10-15 hours each week on tasks that AI could handle—or at least dramatically accelerate. Email responses. Meeting summaries. Research synthesis. Report drafting. These aren\'t strategic activities. They\'re cognitive overhead.',
      'The opportunity isn\'t about replacing yourself. It\'s about reclaiming the hours you currently spend on low-value work so you can focus on high-value thinking.',
      'Email: The average professional spends 2.5 hours daily on email. AI can draft responses, summarize threads, and find information instantly. Cut your email time by 40% and you\'ve reclaimed five hours a week.',
      'Writing and Documentation: First drafts are brutal. AI excels at first drafts. Give it context and structure, and it will generate 70% of what you need. You spend your time on the valuable part—refining and ensuring accuracy.',
      'Research and Information Synthesis: Point AI at your sources, ask specific questions, get synthesized summaries with key insights highlighted. What used to take four hours now takes one.',
      'Meeting Notes and Follow-ups: AI transcription tools can automatically record, transcribe, and summarize your meetings. The 30 minutes after each meeting you used to spend writing notes? Now it takes five minutes to review.',
      'Add it up: five hours from email, 3.5 hours from writing, three hours from research, two hours from meeting follow-ups. That\'s 13.5 hours a week. What could you do with an extra two workdays?',
      'Start small. Pick one task from your daily routine. Use AI to assist with it for one week. Build the habit one task at a time. Within a month, you\'ll wonder how you ever worked without it.',
    ],
    keyTakeaways: [
      'Most professionals waste 10-15 hours weekly on tasks AI could handle or accelerate significantly',
      'Email, writing, research, and meeting follow-ups are the highest-leverage areas for personal AI adoption',
      'Start with one frequent, text-based task; build the habit before expanding to other areas',
      'The barrier isn\'t technology or cost—it\'s changing habits and building familiarity through doing',
      'Reclaimed time should go to strategic work, deep thinking, or better work-life balance—not more busywork',
    ],
  },
  {
    id: 'choosing-ai-tools',
    title: 'Choosing AI Tools: A Framework for Smart Decisions',
    category: 'Implementation',
    excerpt: 'Most AI vendors are optimized for selling, not solving. Here\'s how to see through the pitch and pick tools that actually work.',
    readTime: '9 min read',
    date: 'October 2023',
    content: [
      'The AI vendor landscape is a mess. Every software company has rebranded as an "AI solution." Every pitch deck promises transformative results. Every sales call ends with a demo that looks impressive—until you try to use it with your actual data.',
      'The problem isn\'t that AI tools don\'t work. Many of them do. The problem is that the sales process is optimized to obscure the questions that actually matter.',
      'Here\'s what nobody tells you: choosing AI tools isn\'t primarily a technology decision. It\'s a business decision disguised as a technology decision. The best tool technically might be the worst tool practically.',
      'Start with integration reality, not integration promises. Every vendor will tell you their tool "integrates seamlessly." Ask for specific examples with companies similar to yours. Ask how long implementations typically take. Ask what goes wrong.',
      'Evaluate support like it\'s the product—because it is. Test support before you buy: ask complex questions during the sales process. The quality of pre-sale support predicts post-sale support.',
      'Understand total cost, not list price. AI tools have a special talent for hiding costs. Ask vendors for all-in cost estimates based on realistic usage. The real cost is often 2-3x the initial quote.',
      'Test with your data, not their demos. Insist on pilot testing with your actual data before committing. If pilot results don\'t match demo promises—walk away.',
      'Watch for red flags: Vendors who won\'t provide customer references. Contracts that lock you in for multiple years. Pressure to buy now for special pricing.',
      'Prioritize tools that make you less dependent, not more. Favor tools with standard data formats you can export, clear APIs you control, and pricing that scales linearly.',
    ],
    keyTakeaways: [
      'Integration "promises" aren\'t integration reality—test with your actual systems and data before committing',
      'Support quality matters more than features; test it during sales to predict post-sale experience',
      'Total cost often runs 2-3x initial quotes when you factor in training, scaling, API calls, and premium support',
      'Insist on pilot testing with your real data, not vendor demos with clean sample datasets',
      'The best tools reduce dependency and switching costs; the worst lock you into expensive vendor relationships',
    ],
  },
  {
    id: 'future-proofing-ai',
    title: 'Future-Proofing Your Business: Preparing for AI\'s Next Wave',
    category: 'AI Strategy',
    excerpt: 'The tools will change, but the foundations won\'t. Here\'s how to build for adaptability, not obsolescence.',
    readTime: '8 min read',
    date: 'September 2023',
    content: [
      'The worst way to prepare for AI\'s future is to try predicting it. Six months in AI feels like a decade. If you build your strategy around specific tools or current limitations, you\'re building on sand.',
      'The best way to prepare isn\'t prediction—it\'s adaptation. Build foundations that work regardless of which specific AI tools dominate next year. Focus on capabilities that compound.',
      'This isn\'t about becoming an AI company. It\'s about building a business that can absorb AI advances as they arrive, rather than scrambling to catch up every six months.',
      'Three foundations matter more than any specific tool: how your people learn, how your data flows, and how your systems connect. Get these right, and you can adopt new AI capabilities quickly.',
      'Start with skills, but not the ones you think. Instead of training everyone on today\'s tools, teach people how to evaluate AI outputs, how to craft effective prompts, how to identify good use cases. These meta-skills transfer.',
      'The most valuable skill isn\'t using today\'s AI—it\'s being comfortable experimenting with tomorrow\'s. Create a culture where trying new tools is normal, not special.',
      'Your data foundation matters more than your AI strategy. If your data is locked in silos, every AI implementation becomes a data project first. The businesses moving fastest on AI already had clean, accessible data.',
      'Build modular systems, not monoliths. The AI tools you use next year will be different from today\'s. Design systems where you can swap components. Use APIs. Avoid vendor lock-in. Keep your data portable.',
      'The businesses that will thrive through AI\'s next waves aren\'t the ones making the biggest bets on specific technologies. They\'re the ones building organizations that can learn, adapt, and implement faster than their competitors.',
    ],
    keyTakeaways: [
      'Prediction is impossible; adaptability is everything—build for learning speed, not specific tools',
      'Teach meta-skills (evaluating AI, prompt crafting, use case identification) that transfer across tools',
      'Data foundation determines AI adoption speed—focus on accessibility and consistency, not perfection',
      'Modular systems with swappable components let you adopt new AI capabilities without transformation projects',
      'Culture beats strategy: organizations that experiment comfortably will always outpace those that plan comprehensively',
    ],
  },
  {
    id: 'ai-quick-wins',
    title: '5 AI Quick Wins You Can Implement This Week',
    category: 'Implementation',
    excerpt: 'Stop planning and start doing. Here are five AI wins you can implement in days—not months—that deliver immediate, tangible value.',
    readTime: '8 min read',
    date: 'August 2023',
    content: [
      'The biggest barrier to AI adoption isn\'t technology or budget. It\'s the belief that AI requires massive transformation projects, specialized expertise, or months of planning. That\'s simply not true.',
      'The reality: you can get meaningful AI wins this week. Not pilots. Not proofs of concept. Actual wins that save time, improve quality, and build momentum.',
      'Win #1: Turn Every Meeting Into Actionable Notes. AI transcription tools can automatically record, transcribe, and summarize your meetings. They identify action items, key decisions, and important moments. Time saved per meeting: 15-30 minutes.',
      'Win #2: Draft Emails in Seconds, Not Minutes. Give ChatGPT or Claude three bullets about what you need to communicate, and it generates a professional email. You edit for tone and specifics—30 seconds instead of 5 minutes.',
      'Win #3: Summarize Long Documents Instantly. Upload that 50-page report to AI. Ask for a summary of key points. You\'ll understand the core content in 5 minutes instead of 2 hours.',
      'Win #4: Create a Knowledge Base That Answers Questions. Your team asks the same questions repeatedly. Use AI to generate comprehensive FAQs based on your existing documentation. Point people to the knowledge base instead of answering manually.',
      'Win #5: Repurpose Content in Minutes, Not Hours. AI can transform one piece of content into five formats: blog post, LinkedIn article, email series, social media bullets, video script. You handle the final polish.',
      'What makes these wins "quick": They require minimal setup, no technical expertise, and no organizational change management. You can start today, see results tomorrow.',
      'Here\'s your action step: Pick ONE of these five wins. Implement it this week. Measure the time saved. Build the habit. Then pick the next one. Sequential beats simultaneous. Momentum compounds.',
    ],
    keyTakeaways: [
      'AI wins don\'t require transformation projects—you can implement meaningful improvements in days',
      'Focus on augmenting existing workflows rather than replacing them entirely',
      'The five quickest wins: meeting notes, email drafting, document summarization, knowledge bases, and content repurposing',
      'Start with one win, measure the impact, build momentum, then expand to the next',
      'Small wins create organizational confidence and reveal larger opportunities',
    ],
  },
];

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    const postImageKey = selectedPost.id as keyof typeof IMAGE_CONFIG.blog;
    const postImage = IMAGE_CONFIG.blog[postImageKey];
    
    return (
      <div className="min-h-screen pt-24 md:pt-32">
        {/* Hero Banner Image */}
        {postImage && (
          <div 
            className="relative w-full h-[300px] md:h-[400px] mb-8"
            style={{
              backgroundImage: `url(${postImage.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-depth-base" />
            
            {/* Bottom fade */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[30%]"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 14, 13, 0.7) 50%, rgba(15, 14, 13, 1) 100%)',
              }}
            />
          </div>
        )}
        
        <article className="section-spacing -mt-16 relative z-10">
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
                <ImagePlaceholder
                  src={IMAGE_CONFIG.blog['strategic-moment'].src}
                  alt={IMAGE_CONFIG.blog['strategic-moment'].alt}
                  aspectRatio="video"
                />
              </div>
            </div>
          </Card>

          {/* All Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {BLOG_POSTS.slice(1).map((post) => {
              const blogImageKey = post.id as keyof typeof IMAGE_CONFIG.blog;
              const blogImage = IMAGE_CONFIG.blog[blogImageKey];
              return (
                <Card
                  key={post.id}
                  elevation="subtle"
                  className="cursor-pointer hover:border-radiance-gold/30 transition-colors group overflow-hidden"
                  onClick={() => setSelectedPost(post)}
                >
                  {blogImage && (
                    <div className="-mx-6 -mt-6 mb-4">
                      <ImagePlaceholder
                        src={blogImage.src}
                        alt={blogImage.alt}
                        aspectRatio="video"
                        className="rounded-t-brand-card rounded-b-none"
                      />
                    </div>
                  )}
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
              );
            })}
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
