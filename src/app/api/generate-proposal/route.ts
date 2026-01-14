/**
 * AI-Powered Proposal Generation API Route
 * Light Brand Consulting
 *
 * POST /api/generate-proposal
 * - Takes business intelligence and selected services
 * - Generates comprehensive proposal content with AI
 * - Returns structured proposal data ready for creation
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { BusinessIntelligence } from '@/types/business-intelligence';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

// Service definitions for proposal generation
const SERVICE_DEFINITIONS = {
  diagnostic: {
    name: 'AI Readiness Diagnostic',
    description: 'Comprehensive assessment of AI readiness and transformation opportunities',
    basePrice: 2500,
    timeline: '2-3 weeks',
    deliverables: [
      'Full AI Readiness Report',
      'Technology Stack Analysis',
      'Integration Roadmap',
      'ROI Projections',
      'Implementation Recommendations',
    ],
  },
  'command-center': {
    name: 'AI Command Center',
    description: 'Custom AI-powered dashboard and intelligence system',
    basePrice: 15000,
    timeline: '8-12 weeks',
    deliverables: [
      'Custom AI Dashboard',
      'Data Integration Layer',
      'Automated Reporting',
      'Real-time Analytics',
      'Team Training & Documentation',
    ],
  },
  'authority-engine': {
    name: 'Authority Engine',
    description: 'AI-powered content generation and thought leadership system',
    basePrice: 12000,
    timeline: '6-10 weeks',
    deliverables: [
      'Content Generation System',
      'Brand Voice AI Training',
      'Distribution Automation',
      'Performance Analytics',
      'Content Calendar Integration',
    ],
  },
  ascension: {
    name: 'Ascension Program',
    description: 'Complete AI transformation and scaling program',
    basePrice: 35000,
    timeline: '4-6 months',
    deliverables: [
      'Full AI Strategy Development',
      'Custom AI Implementation',
      'Team Training Program',
      'Ongoing Optimization',
      'Executive Consulting',
    ],
  },
};

interface GenerateProposalRequest {
  leadId: string;
  businessIntelligence: BusinessIntelligence | null;
  selectedServices: string[];
  customRequirements?: string;
  readinessScore: number;
  websiteStory?: string;
  clientName?: string;
  clientCompany?: string;
  // Enhanced context fields for richer AI generation
  salesNotes?: string;           // Free-form notes from sales team
  clientGoals?: string[];        // Specific goals the client mentioned
  clientChallenges?: string[];   // Specific challenges they're facing
  budgetRange?: string;          // Budget expectations if known
  timeline?: string;             // Desired timeline if mentioned
  competitorContext?: string;    // What competitors are doing
  previousEngagements?: string;  // Any past work or conversations
  stakeholders?: string[];       // Key decision makers
  successMetrics?: string[];     // How client will measure success
}

// Default business intelligence when none is available
function getDefaultBusinessIntelligence(clientName?: string, clientCompany?: string): BusinessIntelligence {
  return {
    industry: 'Professional Services',
    business_model: 'service-based',
    target_audience: {
      primary: 'Business decision makers',
      demographics: 'Company stakeholders and managers',
      psychographics: 'Goal-oriented professionals seeking efficiency',
    },
    value_proposition: ['Quality service delivery', 'Professional expertise'],
    revenue_model: 'Project-based',
    company_size: {
      employees: '10-50',
      revenue_range: '$1M-$5M',
      growth_stage: 'Growth',
    },
    geographic_presence: ['North America'],
    competitive_positioning: clientCompany ? `${clientCompany} - Established provider` : 'Established market presence',
    digital_presence: {
      content_quality: 'Moderate',
      site_structure: 'Basic',
      mobile_responsive: true,
      conversion_elements: ['Contact form'],
      marketing_stack: [],
      social_presence: [],
      seo_signals: {
        has_meta_tags: true,
        has_structured_data: false,
        has_sitemap: false,
      },
    },
    technical_assessment: {
      performance: 'Fair',
      security: 'Moderate',
      accessibility: 'Fair',
      integrations: [],
      backend_architecture: 'Standard web platform',
      cdn_usage: false,
      monitoring_tools: [],
      https_enabled: true,
      modern_framework: false,
    },
    ai_readiness: {
      overall_score: 40,
      current_ai_usage: [],
      data_infrastructure: 'Basic',
      automation_level: 'Low',
      integration_readiness: 'Moderate',
      content_generation_needs: 'Moderate',
      customer_intelligence_gaps: ['Customer analytics', 'Personalization'],
    },
    operations_insights: {
      pain_points: ['Manual processes', 'Content creation bandwidth'],
      growth_indicators: [],
      efficiency_opportunities: ['Process automation', 'AI-powered workflows'],
      customer_journey_gaps: ['Limited touchpoints'],
      support_infrastructure: 'Standard support',
    },
    analysis_metadata: {
      analyzed_at: new Date().toISOString(),
      analysis_version: '2.0',
      confidence_score: 0.3,
      pages_analyzed: 0,
    },
  };
}

interface GeneratedPhase {
  phase_number: number;
  phase_name: string;
  description: string;
  timeline: string;
  deliverables: { id: string; name: string; description: string }[];
  objectives: string[];
  amount: number;
}

interface GeneratedMilestone {
  milestone_name: string;
  description: string;
  amount: number;
  phase_number: number;
}

interface GeneratedProposal {
  project_name: string;
  project_overview: string;
  project_scope: string;
  total_timeline: string;
  phases: GeneratedPhase[];
  milestones: GeneratedMilestone[];
  total_amount: number;
  executive_summary: string;
  opportunity_analysis: string;
  expected_outcomes: string[];
}

interface GenerateProposalResponse {
  success: boolean;
  proposal?: GeneratedProposal;
  error?: string;
}

/**
 * Calculate pricing based on business intelligence
 */
function calculatePricing(
  bi: BusinessIntelligence,
  selectedServices: string[]
): number {
  let baseTotal = 0;

  // Sum base prices of selected services
  selectedServices.forEach((service) => {
    const serviceDef = SERVICE_DEFINITIONS[service as keyof typeof SERVICE_DEFINITIONS];
    if (serviceDef) {
      baseTotal += serviceDef.basePrice;
    }
  });

  // Apply multipliers based on business intelligence
  let multiplier = 1.0;

  // Company size multiplier
  const employees = bi.company_size.employees;
  if (employees.includes('500+') || employees.includes('200-500')) {
    multiplier += 0.3;
  } else if (employees.includes('50-200')) {
    multiplier += 0.15;
  }

  // Growth stage multiplier
  const stage = bi.company_size.growth_stage;
  if (stage === 'Enterprise' || stage === 'Scale') {
    multiplier += 0.2;
  }

  // Complexity multiplier based on technical assessment
  if (bi.technical_assessment.integrations.length > 3) {
    multiplier += 0.1;
  }

  return Math.round(baseTotal * multiplier);
}

interface EnhancedContext {
  salesNotes?: string;
  clientGoals?: string[];
  clientChallenges?: string[];
  budgetRange?: string;
  timeline?: string;
  competitorContext?: string;
  previousEngagements?: string;
  stakeholders?: string[];
  successMetrics?: string[];
}

/**
 * Generate proposal content using AI with deep thinking
 */
async function generateProposalWithAI(
  bi: BusinessIntelligence,
  selectedServices: string[],
  customRequirements: string | undefined,
  readinessScore: number,
  websiteStory: string | undefined,
  calculatedTotal: number,
  enhancedContext?: EnhancedContext
): Promise<GeneratedProposal> {
  // Use gemini-1.5-pro for better reasoning on proposals
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  // Build service info string
  const serviceInfo = selectedServices
    .map((service) => {
      const def = SERVICE_DEFINITIONS[service as keyof typeof SERVICE_DEFINITIONS];
      if (def) {
        return `- ${def.name}: ${def.description} (${def.timeline}, deliverables: ${def.deliverables.join(', ')})`;
      }
      return '';
    })
    .filter(Boolean)
    .join('\n');

  // Build enhanced context section
  const contextSections: string[] = [];

  if (enhancedContext?.salesNotes) {
    contextSections.push(`SALES TEAM NOTES (IMPORTANT - use these insights):\n${enhancedContext.salesNotes}`);
  }

  if (enhancedContext?.clientGoals?.length) {
    contextSections.push(`CLIENT'S STATED GOALS:\n${enhancedContext.clientGoals.map(g => `- ${g}`).join('\n')}`);
  }

  if (enhancedContext?.clientChallenges?.length) {
    contextSections.push(`SPECIFIC CHALLENGES THEY MENTIONED:\n${enhancedContext.clientChallenges.map(c => `- ${c}`).join('\n')}`);
  }

  if (enhancedContext?.competitorContext) {
    contextSections.push(`COMPETITIVE LANDSCAPE:\n${enhancedContext.competitorContext}`);
  }

  if (enhancedContext?.previousEngagements) {
    contextSections.push(`PREVIOUS CONVERSATIONS/ENGAGEMENTS:\n${enhancedContext.previousEngagements}`);
  }

  if (enhancedContext?.stakeholders?.length) {
    contextSections.push(`KEY STAKEHOLDERS:\n${enhancedContext.stakeholders.map(s => `- ${s}`).join('\n')}`);
  }

  if (enhancedContext?.successMetrics?.length) {
    contextSections.push(`HOW THEY'LL MEASURE SUCCESS:\n${enhancedContext.successMetrics.map(m => `- ${m}`).join('\n')}`);
  }

  if (enhancedContext?.budgetRange) {
    contextSections.push(`BUDGET EXPECTATIONS: ${enhancedContext.budgetRange}`);
  }

  if (enhancedContext?.timeline) {
    contextSections.push(`DESIRED TIMELINE: ${enhancedContext.timeline}`);
  }

  const enhancedContextBlock = contextSections.length > 0
    ? `\n═══════════════════════════════════════════════════════════
ADDITIONAL CONTEXT FROM SALES TEAM
(Pay close attention - this contains critical client-specific insights)
═══════════════════════════════════════════════════════════

${contextSections.join('\n\n')}

═══════════════════════════════════════════════════════════\n`
    : '';

  const prompt = `You are an elite business strategist and AI transformation consultant at Light Brand Consulting. Your proposals are known for being exceptionally thoughtful, tailored, and compelling - they win deals.

BEFORE generating the proposal, THINK DEEPLY about:
1. What is this business REALLY trying to achieve? What's their deeper motivation?
2. What specific problems will hurt them most if left unsolved?
3. How can our services create TRANSFORMATIONAL value, not just incremental improvement?
4. What unique angle can we take that competitors wouldn't think of?
5. How do we structure phases so each builds momentum and demonstrates value?

═══════════════════════════════════════════════════════════
CLIENT BUSINESS INTELLIGENCE
═══════════════════════════════════════════════════════════

COMPANY PROFILE:
- Industry: ${bi.industry}
- Business Model: ${bi.business_model}
- Target Audience: ${bi.target_audience.primary}
- Company Size: ${bi.company_size.employees} employees, ${bi.company_size.growth_stage} stage
- Revenue Range: ${bi.company_size.revenue_range}
- Value Proposition: ${bi.value_proposition.join(', ')}
- Competitive Position: ${bi.competitive_positioning}

DIGITAL MATURITY:
- Content Quality: ${bi.digital_presence.content_quality}
- Site Structure: ${bi.digital_presence.site_structure}
- Marketing Stack: ${bi.digital_presence.marketing_stack.join(', ') || 'Limited'}

TECHNICAL LANDSCAPE:
- Performance: ${bi.technical_assessment.performance}
- Security: ${bi.technical_assessment.security}
- Current Integrations: ${bi.technical_assessment.integrations.join(', ') || 'Limited'}
- Architecture: ${bi.technical_assessment.backend_architecture}

AI READINESS ASSESSMENT:
- Readiness Score: ${readinessScore}/100
- Current AI Usage: ${bi.ai_readiness.current_ai_usage.join(', ') || 'None detected'}
- Automation Level: ${bi.ai_readiness.automation_level}
- Integration Readiness: ${bi.ai_readiness.integration_readiness}

PAIN POINTS & OPPORTUNITIES IDENTIFIED:
- Pain Points: ${bi.operations_insights.pain_points.join(', ')}
- Efficiency Opportunities: ${bi.operations_insights.efficiency_opportunities.join(', ')}
- Customer Intelligence Gaps: ${bi.ai_readiness.customer_intelligence_gaps.join(', ')}
${enhancedContextBlock}
═══════════════════════════════════════════════════════════
SERVICES TO INCLUDE
═══════════════════════════════════════════════════════════

${serviceInfo}

${customRequirements ? `\nCUSTOM REQUIREMENTS:\n${customRequirements}` : ''}

${websiteStory ? `\nBUSINESS NARRATIVE:\n${websiteStory}` : ''}

═══════════════════════════════════════════════════════════
INVESTMENT & CONSTRAINTS
═══════════════════════════════════════════════════════════

Total Investment: $${calculatedTotal.toLocaleString()}

═══════════════════════════════════════════════════════════
YOUR MISSION
═══════════════════════════════════════════════════════════

Create a COMPELLING, HIGHLY PERSONALIZED proposal that:
1. Speaks directly to their specific situation and pain points
2. Shows you deeply understand their business and industry
3. Presents a clear, logical progression of phases that builds value
4. Includes creative, thoughtful deliverables (not generic templates)
5. Makes the ROI and outcomes feel tangible and achievable
6. Would make the client think "they really GET us"

Generate a comprehensive proposal as JSON with this exact structure:
{
  "project_name": "Creative, compelling project name that captures the transformation",
  "project_overview": "2-3 paragraphs: Paint a picture of the transformation journey. Start with where they are, show the vision of where they'll be, explain how we'll get them there. Be specific to THEIR business.",
  "project_scope": "2-3 paragraphs: Detail the scope with specificity. Reference their actual tech stack, their actual pain points, their actual goals. Make it clear we understand their situation.",
  "total_timeline": "X-Y months",
  "executive_summary": "2 compelling paragraphs for executives: Lead with the business opportunity (revenue, efficiency, competitive advantage). Show you understand their industry dynamics. End with confidence in outcomes.",
  "opportunity_analysis": "2-3 paragraphs: Why is THIS the right time for THEM? Reference industry trends, their competitive position, cost of inaction. Make the case for urgency without being pushy.",
  "expected_outcomes": [
    "Specific, measurable outcome tied to their business metrics",
    "Another outcome that addresses a pain point they mentioned",
    "Outcome that creates competitive advantage",
    "Outcome focused on ROI or efficiency gains",
    "Outcome that enables future growth"
  ],
  "phases": [
    {
      "phase_number": 1,
      "phase_name": "Creative phase name that describes the transformation step",
      "description": "Rich description of what happens in this phase, why it matters, and how it sets up the next phase. Reference their specific situation.",
      "timeline": "X weeks",
      "deliverables": [
        {
          "id": "del-1-1",
          "name": "Specific, tangible deliverable name",
          "description": "What this deliverable IS and WHY it matters for their business specifically"
        }
      ],
      "objectives": [
        "Clear objective tied to their goals",
        "Another objective that builds toward transformation"
      ],
      "amount": 5000
    }
  ],
  "milestones": [
    {
      "milestone_name": "Clear milestone tied to a tangible outcome",
      "description": "What they'll have achieved and be able to demonstrate at this point",
      "amount": 2500,
      "phase_number": 1
    }
  ],
  "total_amount": ${calculatedTotal}
}

═══════════════════════════════════════════════════════════
QUALITY STANDARDS (Non-negotiable)
═══════════════════════════════════════════════════════════

STRUCTURE:
- Create 3-5 phases that tell a logical transformation STORY
- Each phase should feel like a natural chapter that builds on the last
- Phases should create "wins" along the way to maintain momentum
- Each phase needs 2-4 specific, tangible deliverables (not generic items)
- Each deliverable description should explain WHY it matters for THIS client

CONTENT QUALITY:
- NEVER use generic language like "optimize your business" or "improve efficiency"
- Always reference their SPECIFIC industry, business model, or pain points
- Use numbers and metrics where possible (e.g., "reduce processing time by 40%")
- Write as if you've spent weeks studying their business
- The client should feel like this proposal was written ONLY for them

FINANCIAL:
- Milestones should be tied to DEMONSTRABLE value delivery
- Total of all milestone amounts MUST equal total_amount (${calculatedTotal})
- Distribute payments fairly across the engagement timeline
- First milestone should not exceed 30% of total

OUTPUT RULES:
- Write in clean, professional business language
- NO HTML, code, URLs, or technical artifacts in ANY text field
- All text should read as polished, executive-ready prose
- Return ONLY valid JSON, no markdown code blocks or explanations`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const parsed = JSON.parse(jsonMatch[0]) as GeneratedProposal;

    // Validate and ensure total_amount matches
    parsed.total_amount = calculatedTotal;

    // Ensure milestone amounts add up correctly
    const milestoneTotal = parsed.milestones.reduce((sum, m) => sum + m.amount, 0);
    if (milestoneTotal !== calculatedTotal) {
      // Adjust last milestone to match
      const diff = calculatedTotal - milestoneTotal;
      if (parsed.milestones.length > 0) {
        parsed.milestones[parsed.milestones.length - 1].amount += diff;
      }
    }

    return parsed;
  } catch (error) {
    console.error('Error generating proposal with AI:', error);

    // Return a fallback proposal
    const fallbackPhases: GeneratedPhase[] = selectedServices.map((service, index) => {
      const def = SERVICE_DEFINITIONS[service as keyof typeof SERVICE_DEFINITIONS];
      if (!def) return null;

      return {
        phase_number: index + 1,
        phase_name: def.name,
        description: `Implementation of ${def.name} tailored to your ${bi.industry} business needs.`,
        timeline: def.timeline,
        deliverables: def.deliverables.map((d, i) => ({
          id: `del-${index}-${i}`,
          name: d,
          description: `${d} customized for your organization`,
        })),
        objectives: [
          `Implement ${def.name} capabilities`,
          `Integrate with existing ${bi.technical_assessment.backend_architecture || 'systems'}`,
        ],
        amount: Math.round(calculatedTotal / selectedServices.length),
      };
    }).filter(Boolean) as GeneratedPhase[];

    const milestones: GeneratedMilestone[] = [];
    fallbackPhases.forEach((phase) => {
      milestones.push({
        milestone_name: `${phase.phase_name} Kickoff`,
        description: `Initial payment for ${phase.phase_name}`,
        amount: Math.round(phase.amount * 0.5),
        phase_number: phase.phase_number,
      });
      milestones.push({
        milestone_name: `${phase.phase_name} Completion`,
        description: `Final payment for ${phase.phase_name}`,
        amount: Math.round(phase.amount * 0.5),
        phase_number: phase.phase_number,
      });
    });

    return {
      project_name: `AI Transformation for ${bi.industry} Business`,
      project_overview: `This proposal outlines a comprehensive AI transformation strategy for your ${bi.business_model} business in the ${bi.industry} sector. Based on our analysis, your organization shows a readiness score of ${readinessScore}/100, indicating significant opportunities for AI-driven enhancement.`,
      project_scope: `The scope includes implementation of ${selectedServices.map(s => SERVICE_DEFINITIONS[s as keyof typeof SERVICE_DEFINITIONS]?.name || s).join(', ')}. Each service will be customized to address your specific needs around ${bi.operations_insights.pain_points.slice(0, 2).join(' and ')}.`,
      total_timeline: `${fallbackPhases.length * 2}-${fallbackPhases.length * 3} months`,
      executive_summary: `Your ${bi.industry} business is well-positioned for AI transformation. With a current automation level of ${bi.ai_readiness.automation_level} and integration readiness of ${bi.ai_readiness.integration_readiness}, we can deliver measurable improvements in efficiency and customer engagement.`,
      opportunity_analysis: `Based on our comprehensive analysis, key opportunities include addressing ${bi.operations_insights.efficiency_opportunities.slice(0, 2).join(' and ')}. Your existing ${bi.technical_assessment.backend_architecture} architecture provides a solid foundation for AI integration.`,
      expected_outcomes: [
        'Improved operational efficiency through automation',
        'Enhanced customer intelligence and personalization',
        'Streamlined workflows and reduced manual processes',
        'Data-driven decision making capabilities',
      ],
      phases: fallbackPhases,
      milestones,
      total_amount: calculatedTotal,
    };
  }
}

/**
 * POST /api/generate-proposal
 */
export async function POST(request: NextRequest): Promise<NextResponse<GenerateProposalResponse>> {
  try {
    // Check for Gemini API key
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'AI service is not configured' },
        { status: 503 }
      );
    }

    const body = await request.json() as GenerateProposalRequest;
    const {
      businessIntelligence: rawBI,
      selectedServices,
      customRequirements,
      readinessScore,
      websiteStory,
      clientName,
      clientCompany,
      // Enhanced context fields
      salesNotes,
      clientGoals,
      clientChallenges,
      budgetRange,
      timeline,
      competitorContext,
      previousEngagements,
      stakeholders,
      successMetrics,
    } = body;

    // Validate required fields
    if (!selectedServices || selectedServices.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one service must be selected' },
        { status: 400 }
      );
    }

    // Use provided business intelligence or generate defaults
    const businessIntelligence = rawBI || getDefaultBusinessIntelligence(clientName, clientCompany);

    // Calculate pricing
    const calculatedTotal = calculatePricing(businessIntelligence, selectedServices);

    // Build enhanced context object
    const enhancedContext: EnhancedContext = {
      salesNotes,
      clientGoals,
      clientChallenges,
      budgetRange,
      timeline,
      competitorContext,
      previousEngagements,
      stakeholders,
      successMetrics,
    };

    // Generate proposal with AI (with enhanced context)
    const proposal = await generateProposalWithAI(
      businessIntelligence,
      selectedServices,
      customRequirements,
      readinessScore,
      websiteStory,
      calculatedTotal,
      enhancedContext
    );

    return NextResponse.json({
      success: true,
      proposal,
    });
  } catch (error) {
    console.error('Error in POST /api/generate-proposal:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
