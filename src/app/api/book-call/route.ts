/**
 * Book Call API Route
 * Light Brand Consulting
 *
 * POST /api/book-call
 * - Records Calendly booking
 * - Triggers generation of full reports and demos
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

interface BookCallRequest {
  leadId: string;
  calendlyLink: string;
}

interface BookCallResponse {
  success: boolean;
  error?: string;
}

/**
 * Generate full AI readiness report
 */
async function generateFullReadinessReport(
  websiteStory: string,
  techStack: Record<string, unknown>,
  readinessBrief: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt = `Create a comprehensive AI Readiness Diagnostic Report based on this information:

Business Story:
${websiteStory}

Tech Stack:
${JSON.stringify(techStack, null, 2)}

Current Readiness Assessment:
${readinessBrief}

Generate a detailed report (5-7 paragraphs) covering:
1. Executive Summary
2. Current State Analysis
3. Technology Stack Evaluation
4. AI Readiness Assessment
5. Key Opportunities
6. Recommended Next Steps

Make it professional, insightful, and actionable.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating full report:', error);
    return `# AI Readiness Diagnostic Report\n\n${readinessBrief}\n\n## Detailed Analysis\n\nBased on your current technology stack and business context, there are significant opportunities to leverage AI for competitive advantage.`;
  }
}

/**
 * Generate capacity gap analysis
 */
async function generateCapacityGapAnalysis(
  websiteStory: string,
  capacityGapBrief: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt = `Create a detailed Capacity Gap Analysis based on:

Business Context:
${websiteStory}

Initial Gap Assessment:
${capacityGapBrief}

Generate a comprehensive analysis (4-6 paragraphs) covering:
1. Current Capacity Limitations
2. Identified Gaps
3. Impact of These Gaps
4. How AI Super Intelligence Can Bridge These Gaps
5. Expected Outcomes

Be specific and actionable.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating capacity gap analysis:', error);
    return `# Capacity Gap Analysis\n\n${capacityGapBrief}\n\n## Detailed Assessment\n\nYour business has identified capacity gaps that can be addressed through AI-powered solutions.`;
  }
}

/**
 * Generate system demo HTML
 */
async function generateSystemDemo(
  websiteStory: string,
  techStack: Record<string, unknown>,
  version: number
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const versionNames = ['Essential', 'Advanced', 'Enterprise'];
  const versionName = versionNames[version - 1] || `Version ${version}`;
  
  const prompt = `Generate a complete HTML demo page for an AI Super Intelligence System - ${versionName} Edition.

Business Context:
${websiteStory}

Current Tech Stack:
${JSON.stringify(techStack, null, 2)}

Create a modern, professional HTML page with:
- Navigation bar with logo and menu items
- Hero section showcasing AI capabilities
- Key features section
- Dashboard preview
- Call-to-action

Make it visually appealing with inline CSS. Use a modern color scheme with gold accents (#E8B84A) and dark backgrounds.

The HTML should be complete and standalone (no external dependencies).`;

  try {
    const result = await model.generateContent(prompt);
    let html = result.response.text();
    
    // Extract HTML if wrapped in markdown code blocks
    const htmlMatch = html.match(/```html\n([\s\S]*?)\n```/) || html.match(/```\n([\s\S]*?)\n```/);
    if (htmlMatch) {
      html = htmlMatch[1];
    }
    
    return html;
  } catch (error) {
    console.error('Error generating demo:', error);
    return generateFallbackDemo(versionName);
  }
}

function generateFallbackDemo(versionName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Super Intelligence System - ${versionName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e5e5e5; }
    nav { background: #1a1a1a; padding: 1rem 2rem; border-bottom: 1px solid #2a2a2a; }
    nav .container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: bold; color: #E8B84A; }
    .nav-links { display: flex; gap: 2rem; }
    .nav-links a { color: #e5e5e5; text-decoration: none; transition: color 0.3s; }
    .nav-links a:hover { color: #E8B84A; }
    .hero { padding: 6rem 2rem; text-align: center; background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); }
    .hero h1 { font-size: 3rem; margin-bottom: 1rem; color: #E8B84A; }
    .hero p { font-size: 1.25rem; color: #999; max-width: 600px; margin: 0 auto 2rem; }
    .features { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem; }
    .feature-card { background: #1a1a1a; padding: 2rem; border-radius: 8px; border: 1px solid #2a2a2a; }
    .feature-card h3 { color: #E8B84A; margin-bottom: 1rem; }
    .cta { text-align: center; padding: 4rem 2rem; }
    .btn { display: inline-block; padding: 1rem 2rem; background: #E8B84A; color: #0a0a0a; text-decoration: none; border-radius: 6px; font-weight: bold; transition: transform 0.3s; }
    .btn:hover { transform: translateY(-2px); }
  </style>
</head>
<body>
  <nav>
    <div class="container">
      <div class="logo">AI Intelligence</div>
      <div class="nav-links">
        <a href="#features">Features</a>
        <a href="#dashboard">Dashboard</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </nav>
  <section class="hero">
    <h1>AI Super Intelligence System</h1>
    <p>${versionName} Edition - Transform your business with intelligent automation</p>
  </section>
  <section class="features">
    <h2 style="text-align: center; margin-bottom: 2rem;">Key Features</h2>
    <div class="features-grid">
      <div class="feature-card">
        <h3>Intelligent Automation</h3>
        <p>Automate repetitive tasks and workflows with AI-powered intelligence.</p>
      </div>
      <div class="feature-card">
        <h3>Predictive Analytics</h3>
        <p>Make data-driven decisions with advanced predictive insights.</p>
      </div>
      <div class="feature-card">
        <h3>Smart Content</h3>
        <p>Generate and optimize content automatically with AI assistance.</p>
      </div>
    </div>
  </section>
  <section class="cta">
    <a href="#contact" class="btn">Get Started</a>
  </section>
</body>
</html>`;
}

/**
 * Generate demo URL
 * The demo HTML will be generated on-the-fly when accessed
 * In production, you could save to S3/Vercel Blob and return a public URL
 */
function getDemoURL(leadId: string, version: number): string {
  // Return URL pattern - demo will be generated on-the-fly
  return `/api/demo/${leadId}/${version}`;
}

/**
 * POST /api/book-call
 */
export async function POST(request: NextRequest): Promise<NextResponse<BookCallResponse>> {
  try {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'AI service is not configured' },
        { status: 503 }
      );
    }
    
    const body = await request.json() as BookCallRequest;
    const { leadId, calendlyLink } = body;
    
    if (!leadId || !calendlyLink) {
      return NextResponse.json(
        { success: false, error: 'Lead ID and Calendly link are required' },
        { status: 400 }
      );
    }
    
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ success: true }); // Mock success in dev
    }
    
    // Fetch lead data
    const { data: lead, error: fetchError } = await supabaseAdmin
      .from('lead_submissions')
      .select('*')
      .eq('id', leadId)
      .single();
    
    if (fetchError || !lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }
    
    // Generate full reports
    const fullReport = await generateFullReadinessReport(
      lead.website_story || '',
      lead.tech_stack || {},
      lead.readiness_brief || ''
    );
    
    const capacityGapAnalysis = await generateCapacityGapAnalysis(
      lead.website_story || '',
      lead.capacity_gap_analysis || ''
    );
    
    // Generate 3 demo versions
    const demoLinks: Array<{ name: string; url: string }> = [];
    
    for (let i = 1; i <= 3; i++) {
      // Generate demo HTML (stored logic, but served on-demand)
      await generateSystemDemo(
        lead.website_story || '',
        lead.tech_stack || {},
        i
      );
      // Demo will be generated on-the-fly when accessed via the URL
      const demoUrl = getDemoURL(leadId, i);
      demoLinks.push({
        name: `System Demo ${i} - ${['Essential', 'Advanced', 'Enterprise'][i - 1]}`,
        url: demoUrl,
      });
    }
    
    // Update lead with booking info and generated content
    const { error: updateError } = await supabaseAdmin
      .from('lead_submissions')
      .update({
        booking_calendly_link: calendlyLink,
        booked_at: new Date().toISOString(),
        full_readiness_report: fullReport,
        capacity_gap_analysis: capacityGapAnalysis,
        system_demo_links: demoLinks,
        status: 'contacted',
      })
      .eq('id', leadId);
    
    if (updateError) {
      console.error('Error updating lead:', updateError);
      return NextResponse.json(
        { success: false, error: 'Failed to update lead' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/book-call:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
