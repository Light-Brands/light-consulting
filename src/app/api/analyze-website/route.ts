/**
 * Website Analysis API Route
 * Light Brand Consulting
 *
 * POST /api/analyze-website
 * - Scrapes website content
 * - Detects tech stack
 * - Analyzes AI readiness
 * - Generates brief readiness score and description
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { chromium } from 'playwright';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

interface TechStack {
  platform?: string; // WordPress, Webflow, Next.js, etc.
  cms?: string;
  frameworks?: string[];
  hosting?: string;
  analytics?: string[];
  other?: string[];
}

interface WebsiteAnalysis {
  techStack: TechStack;
  websiteStory: string;
  readinessScore: number;
  readinessBrief: string;
  capacityGapBrief: string;
}

interface AnalyzeWebsiteResponse {
  success: boolean;
  analysis?: WebsiteAnalysis;
  leadId?: string;
  error?: string;
}

/**
 * Scrape website content
 */
async function scrapeWebsite(url: string): Promise<{ content: string; html: string }> {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Set a reasonable timeout
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Extract text content
    const content = await page.evaluate(() => {
      // Remove script and style elements
      const scripts = document.querySelectorAll('script, style, noscript');
      scripts.forEach((el) => el.remove());
      
      // Get main content areas
      const mainContent = document.querySelector('main') || 
                         document.querySelector('article') ||
                         document.querySelector('[role="main"]') ||
                         document.body;
      
      return mainContent.innerText || document.body.innerText;
    });
    
    // Get HTML for tech stack detection
    const html = await page.content();
    
    await browser.close();
    return { content: content.trim(), html };
  } catch (error) {
    if (browser) await browser.close();
    console.error('Error scraping website:', error);
    throw new Error(`Failed to scrape website: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Detect tech stack from HTML
 */
function detectTechStack(html: string, url: string): TechStack {
  const techStack: TechStack = {
    frameworks: [],
    analytics: [],
    other: [],
  };
  
  const htmlLower = html.toLowerCase();
  
  // WordPress detection
  if (htmlLower.includes('wp-content') || 
      htmlLower.includes('wordpress') ||
      htmlLower.includes('/wp-includes/') ||
      htmlLower.includes('wp-json')) {
    techStack.platform = 'WordPress';
    techStack.cms = 'WordPress';
  }
  
  // Webflow detection
  if (htmlLower.includes('webflow') || 
      htmlLower.includes('webflow.io') ||
      htmlLower.includes('w-nav') ||
      htmlLower.includes('w-dyn')) {
    techStack.platform = 'Webflow';
    techStack.cms = 'Webflow';
  }
  
  // Next.js detection
  if (htmlLower.includes('__next') || 
      htmlLower.includes('_next/static') ||
      htmlLower.includes('next.js')) {
    techStack.platform = 'Next.js';
    techStack.frameworks?.push('React');
  }
  
  // React detection
  if (htmlLower.includes('react') || htmlLower.includes('react-dom')) {
    if (!techStack.frameworks?.includes('React')) {
      techStack.frameworks?.push('React');
    }
  }
  
  // Vue detection
  if (htmlLower.includes('vue') || htmlLower.includes('vue.js')) {
    techStack.frameworks?.push('Vue.js');
  }
  
  // Shopify detection
  if (htmlLower.includes('shopify') || htmlLower.includes('shopifycdn')) {
    techStack.platform = 'Shopify';
    techStack.cms = 'Shopify';
  }
  
  // Squarespace detection
  if (htmlLower.includes('squarespace') || htmlLower.includes('sqs')) {
    techStack.platform = 'Squarespace';
    techStack.cms = 'Squarespace';
  }
  
  // Wix detection
  if (htmlLower.includes('wix.com') || htmlLower.includes('wixstatic')) {
    techStack.platform = 'Wix';
    techStack.cms = 'Wix';
  }
  
  // Google Analytics
  if (htmlLower.includes('google-analytics') || htmlLower.includes('gtag') || htmlLower.includes('ga.js')) {
    techStack.analytics?.push('Google Analytics');
  }
  
  // Hosting detection from URL
  if (url.includes('vercel.app') || url.includes('vercel.com')) {
    techStack.hosting = 'Vercel';
  } else if (url.includes('netlify.app') || url.includes('netlify.com')) {
    techStack.hosting = 'Netlify';
  } else if (url.includes('webflow.io')) {
    techStack.hosting = 'Webflow';
  } else if (url.includes('wordpress.com')) {
    techStack.hosting = 'WordPress.com';
  }
  
  return techStack;
}

/**
 * Analyze website with AI for readiness
 */
async function analyzeReadiness(
  websiteContent: string,
  techStack: TechStack,
  websiteStory: string
): Promise<{ score: number; brief: string; capacityGap: string }> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const techStackSummary = [
    techStack.platform && `Platform: ${techStack.platform}`,
    techStack.cms && `CMS: ${techStack.cms}`,
    techStack.frameworks?.length && `Frameworks: ${techStack.frameworks.join(', ')}`,
    techStack.hosting && `Hosting: ${techStack.hosting}`,
  ].filter(Boolean).join('\n');
  
  const prompt = `You are an AI readiness consultant analyzing a business website for their readiness to adopt AI super intelligence systems.

Website Content Summary:
${websiteContent.substring(0, 10000)}${websiteContent.length > 10000 ? '... [truncated]' : ''}

Detected Tech Stack:
${techStackSummary || 'Unknown'}

Business Story/Context:
${websiteStory.substring(0, 2000)}${websiteStory.length > 2000 ? '... [truncated]' : ''}

Analyze this business and provide:

1. **AI Readiness Score** (0-100): A numerical score indicating how ready this business is for AI transformation. Consider:
   - Current tech stack sophistication
   - Digital presence maturity
   - Content quality and structure
   - Business model clarity
   - Scalability indicators

2. **Readiness Brief** (2-3 sentences): A concise explanation of their current AI readiness level, what's working well, and what needs improvement.

3. **Capacity Gap Brief** (2-3 sentences): Identify the key capacity gaps - what they're missing that an AI super intelligence system could address.

IMPORTANT: Your response MUST be valid JSON with these exact keys: score, brief, capacityGap

Format:
{
  "score": 65,
  "brief": "Your business shows moderate readiness for AI transformation. Your current WordPress setup provides a solid foundation, but there are opportunities to leverage AI for content automation and customer intelligence.",
  "capacityGap": "Key gaps include lack of automated content generation, no AI-powered customer insights, and manual processes that could be enhanced with intelligent automation. An AI super intelligence system could bridge these gaps by providing automated content creation, predictive analytics, and intelligent workflow automation."
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }
    
    const parsed = JSON.parse(jsonMatch[0]) as { score: number; brief: string; capacityGap: string };
    
    // Validate and clamp score
    const score = Math.max(0, Math.min(100, Math.round(parsed.score || 50)));
    
    return {
      score,
      brief: parsed.brief || 'AI readiness assessment in progress.',
      capacityGap: parsed.capacityGap || 'Analyzing capacity gaps...',
    };
  } catch (error) {
    console.error('Error analyzing readiness:', error);
    
    // Fallback analysis
    const defaultScore = techStack.platform === 'WordPress' ? 45 : 
                        techStack.platform === 'Webflow' ? 55 :
                        techStack.platform === 'Next.js' ? 70 : 50;
    
    return {
      score: defaultScore,
      brief: `Your current ${techStack.platform || 'website'} setup provides a foundation, but there are significant opportunities to leverage AI for enhanced capabilities and automation.`,
      capacityGap: 'Key capacity gaps include lack of intelligent automation, limited data-driven insights, and manual processes that could be enhanced with AI-powered systems.',
    };
  }
}

/**
 * Extract business story from content
 */
async function extractBusinessStory(content: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt = `Extract and summarize the business story from this website content. Focus on:
- What the business does
- Their value proposition
- Target audience
- Key differentiators
- Business model

Keep it concise (2-3 paragraphs).

Content:
${content.substring(0, 15000)}${content.length > 15000 ? '... [truncated]' : ''}`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error extracting business story:', error);
    return 'Business story extraction in progress...';
  }
}

/**
 * POST /api/analyze-website
 */
export async function POST(request: NextRequest): Promise<NextResponse<AnalyzeWebsiteResponse>> {
  try {
    // Check for Gemini API key
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'AI analysis service is not configured' },
        { status: 503 }
      );
    }
    
    const body = await request.json();
    const { websiteUrl, name, email, company, phone } = body;
    
    // Validate required fields
    if (!websiteUrl || !name || !email) {
      return NextResponse.json(
        { success: false, error: 'Website URL, name, and email are required' },
        { status: 400 }
      );
    }
    
    // Validate URL format
    let url: URL;
    try {
      url = new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid website URL format' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Scrape website
    const { content, html } = await scrapeWebsite(url.toString());
    
    if (content.length < 100) {
      return NextResponse.json(
        { success: false, error: 'Website appears to be empty or inaccessible' },
        { status: 400 }
      );
    }
    
    // Detect tech stack
    const techStack = detectTechStack(html, url.toString());
    
    // Extract business story
    const websiteStory = await extractBusinessStory(content);
    
    // Analyze readiness
    const { score, brief, capacityGap } = await analyzeReadiness(content, techStack, websiteStory);
    
    // Create lead submission
    const { supabaseAdmin, isSupabaseConfigured } = await import('@/lib/supabase');
    const { LeadSubmissionInsert } = await import('@/types/proposals');
    
    let leadId: string | null = null;
    
    if (isSupabaseConfigured()) {
      const leadData: LeadSubmissionInsert = {
        service: 'diagnostic',
        name,
        email,
        company: company || null,
        phone: phone || null,
        website_url: url.toString(),
        tech_stack: techStack,
        website_story: websiteStory,
        readiness_score: score,
        readiness_brief: brief,
        capacity_gap_analysis: capacityGap,
        status: 'new',
        intake_data: {
          source: 'website-diagnostic',
        },
      };
      
      const { data, error } = await supabaseAdmin
        .from('lead_submissions')
        .insert(leadData as unknown as never)
        .select('id')
        .single();
      
      if (!error && data) {
        leadId = (data as { id: string }).id;
      }
    } else {
      // Mock ID for development
      leadId = crypto.randomUUID();
    }
    
    return NextResponse.json({
      success: true,
      analysis: {
        techStack,
        websiteStory,
        readinessScore: score,
        readinessBrief: brief,
        capacityGapBrief: capacityGap,
      },
      leadId: leadId || undefined,
    });
  } catch (error) {
    console.error('Error in POST /api/analyze-website:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
