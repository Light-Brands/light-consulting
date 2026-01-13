/**
 * Enhanced Website Analysis API Route
 * Light Brand Consulting
 *
 * POST /api/analyze-website
 * - Scrapes website content
 * - Detects tech stack (expanded)
 * - Extracts business intelligence
 * - Analyzes digital presence
 * - Performs technical assessment
 * - Evaluates AI readiness
 * - Identifies operations insights
 * - Generates comprehensive readiness report
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { chromium } from 'playwright';
import type {
  BusinessIntelligence,
  EnhancedTechStack,
  DigitalPresence,
  TechnicalAssessment,
  AIReadiness,
  OperationsInsights,
  TargetAudience,
  CompanySize,
  SEOSignals,
  AnalysisMetadata,
} from '@/types/business-intelligence';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

interface EnhancedWebsiteAnalysis {
  techStack: EnhancedTechStack;
  websiteStory: string;
  readinessScore: number;
  readinessBrief: string;
  capacityGapBrief: string;
  businessIntelligence: BusinessIntelligence;
  fullReadinessReport: string;
}

interface AnalyzeWebsiteResponse {
  success: boolean;
  analysis?: EnhancedWebsiteAnalysis;
  leadId?: string;
  error?: string;
}

interface ScrapedData {
  content: string;
  html: string;
  title: string;
  metaDescription: string;
  headings: string[];
  links: { internal: string[]; external: string[]; social: string[] };
  images: number;
  forms: number;
  scripts: string[];
  styles: string[];
}

/**
 * Enhanced website scraping with additional data extraction
 */
async function scrapeWebsite(url: string): Promise<ScrapedData> {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Set a reasonable timeout
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Extract comprehensive data
    const data = await page.evaluate(() => {
      // Remove script and style elements for text extraction
      const clonedDoc = document.cloneNode(true) as Document;
      const scripts = clonedDoc.querySelectorAll('script, style, noscript');
      scripts.forEach((el) => el.remove());

      // Get main content areas
      const mainContent = clonedDoc.querySelector('main') ||
                         clonedDoc.querySelector('article') ||
                         clonedDoc.querySelector('[role="main"]') ||
                         clonedDoc.body;

      // Extract headings
      const headings: string[] = [];
      document.querySelectorAll('h1, h2, h3').forEach((h) => {
        const text = h.textContent?.trim();
        if (text) headings.push(text);
      });

      // Extract links
      const internalLinks: string[] = [];
      const externalLinks: string[] = [];
      const socialLinks: string[] = [];
      const baseHost = window.location.hostname;

      document.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href') || '';
        try {
          const linkUrl = new URL(href, window.location.origin);
          if (linkUrl.hostname === baseHost) {
            internalLinks.push(linkUrl.pathname);
          } else if (['facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com', 'youtube.com', 'tiktok.com', 'x.com'].some(s => linkUrl.hostname.includes(s))) {
            socialLinks.push(linkUrl.hostname.replace('www.', ''));
          } else if (href.startsWith('http')) {
            externalLinks.push(linkUrl.hostname);
          }
        } catch {
          // Invalid URL, skip
        }
      });

      // Count forms
      const forms = document.querySelectorAll('form').length;

      // Count images
      const images = document.querySelectorAll('img').length;

      // Get script sources
      const scriptSrcs: string[] = [];
      document.querySelectorAll('script[src]').forEach((s) => {
        const src = s.getAttribute('src') || '';
        scriptSrcs.push(src);
      });

      // Get stylesheet sources
      const styleSrcs: string[] = [];
      document.querySelectorAll('link[rel="stylesheet"]').forEach((l) => {
        const href = l.getAttribute('href') || '';
        styleSrcs.push(href);
      });

      return {
        content: mainContent.innerText || document.body.innerText,
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        headings: headings.slice(0, 20),
        links: {
          internal: [...new Set(internalLinks)].slice(0, 50),
          external: [...new Set(externalLinks)].slice(0, 20),
          social: [...new Set(socialLinks)],
        },
        forms,
        images,
        scripts: scriptSrcs,
        styles: styleSrcs,
      };
    });

    // Get HTML for tech stack detection
    const html = await page.content();

    await browser.close();
    return { ...data, html, content: data.content.trim() };
  } catch (error) {
    if (browser) await browser.close();
    console.error('Error scraping website:', error);
    throw new Error(`Failed to scrape website: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Enhanced tech stack detection
 */
function detectTechStack(scrapedData: ScrapedData, url: string): EnhancedTechStack {
  const { html, scripts, styles } = scrapedData;
  const techStack: EnhancedTechStack = {
    frameworks: [],
    analytics: [],
    marketing_tools: [],
    ecommerce: [],
    security: [],
    performance: [],
    other: [],
  };

  const htmlLower = html.toLowerCase();
  const allScripts = scripts.join(' ').toLowerCase();
  const allStyles = styles.join(' ').toLowerCase();

  // Platform/CMS detection
  if (htmlLower.includes('wp-content') || htmlLower.includes('wordpress') || htmlLower.includes('/wp-includes/') || htmlLower.includes('wp-json')) {
    techStack.platform = 'WordPress';
    techStack.cms = 'WordPress';
  } else if (htmlLower.includes('webflow') || htmlLower.includes('w-nav') || htmlLower.includes('w-dyn')) {
    techStack.platform = 'Webflow';
    techStack.cms = 'Webflow';
  } else if (htmlLower.includes('__next') || htmlLower.includes('_next/static')) {
    techStack.platform = 'Next.js';
    techStack.frameworks?.push('React');
  } else if (htmlLower.includes('shopify') || htmlLower.includes('shopifycdn') || htmlLower.includes('cdn.shopify.com')) {
    techStack.platform = 'Shopify';
    techStack.cms = 'Shopify';
    techStack.ecommerce?.push('Shopify');
  } else if (htmlLower.includes('squarespace') || htmlLower.includes('sqs')) {
    techStack.platform = 'Squarespace';
    techStack.cms = 'Squarespace';
  } else if (htmlLower.includes('wix.com') || htmlLower.includes('wixstatic')) {
    techStack.platform = 'Wix';
    techStack.cms = 'Wix';
  } else if (htmlLower.includes('ghost') || htmlLower.includes('ghost.io')) {
    techStack.platform = 'Ghost';
    techStack.cms = 'Ghost';
  } else if (htmlLower.includes('hubspot') && htmlLower.includes('hs-sites')) {
    techStack.platform = 'HubSpot CMS';
    techStack.cms = 'HubSpot';
  } else if (htmlLower.includes('framer.com') || htmlLower.includes('framerusercontent')) {
    techStack.platform = 'Framer';
    techStack.cms = 'Framer';
  }

  // Framework detection
  if ((htmlLower.includes('react') || htmlLower.includes('react-dom')) && !techStack.frameworks?.includes('React')) {
    techStack.frameworks?.push('React');
  }
  if (htmlLower.includes('vue') || htmlLower.includes('__vue')) {
    techStack.frameworks?.push('Vue.js');
  }
  if (htmlLower.includes('angular') || htmlLower.includes('ng-')) {
    techStack.frameworks?.push('Angular');
  }
  if (htmlLower.includes('svelte')) {
    techStack.frameworks?.push('Svelte');
  }
  if (allStyles.includes('tailwind') || htmlLower.includes('tailwind')) {
    techStack.frameworks?.push('Tailwind CSS');
  }
  if (allStyles.includes('bootstrap') || htmlLower.includes('bootstrap')) {
    techStack.frameworks?.push('Bootstrap');
  }

  // Analytics detection
  if (htmlLower.includes('google-analytics') || htmlLower.includes('gtag') || htmlLower.includes('ga.js') || allScripts.includes('googletagmanager')) {
    techStack.analytics?.push('Google Analytics');
  }
  if (htmlLower.includes('gtm.js') || allScripts.includes('googletagmanager.com/gtm')) {
    techStack.analytics?.push('Google Tag Manager');
  }
  if (htmlLower.includes('hotjar') || allScripts.includes('hotjar')) {
    techStack.analytics?.push('Hotjar');
  }
  if (htmlLower.includes('mixpanel') || allScripts.includes('mixpanel')) {
    techStack.analytics?.push('Mixpanel');
  }
  if (htmlLower.includes('segment') || allScripts.includes('segment')) {
    techStack.analytics?.push('Segment');
  }
  if (htmlLower.includes('amplitude') || allScripts.includes('amplitude')) {
    techStack.analytics?.push('Amplitude');
  }
  if (htmlLower.includes('heap') || allScripts.includes('heap')) {
    techStack.analytics?.push('Heap');
  }
  if (htmlLower.includes('plausible') || allScripts.includes('plausible')) {
    techStack.analytics?.push('Plausible');
  }
  if (htmlLower.includes('fathom') || allScripts.includes('fathom')) {
    techStack.analytics?.push('Fathom');
  }

  // Marketing tools detection
  if (htmlLower.includes('hubspot') || allScripts.includes('hubspot')) {
    techStack.marketing_tools?.push('HubSpot');
  }
  if (htmlLower.includes('mailchimp') || allScripts.includes('mailchimp')) {
    techStack.marketing_tools?.push('Mailchimp');
  }
  if (htmlLower.includes('intercom') || allScripts.includes('intercom')) {
    techStack.marketing_tools?.push('Intercom');
  }
  if (htmlLower.includes('drift') || allScripts.includes('drift')) {
    techStack.marketing_tools?.push('Drift');
  }
  if (htmlLower.includes('crisp') || allScripts.includes('crisp')) {
    techStack.marketing_tools?.push('Crisp');
  }
  if (htmlLower.includes('zendesk') || allScripts.includes('zendesk')) {
    techStack.marketing_tools?.push('Zendesk');
  }
  if (htmlLower.includes('klaviyo') || allScripts.includes('klaviyo')) {
    techStack.marketing_tools?.push('Klaviyo');
  }
  if (htmlLower.includes('activecampaign') || allScripts.includes('activecampaign')) {
    techStack.marketing_tools?.push('ActiveCampaign');
  }
  if (htmlLower.includes('convertkit') || allScripts.includes('convertkit')) {
    techStack.marketing_tools?.push('ConvertKit');
  }
  if (htmlLower.includes('calendly') || allScripts.includes('calendly')) {
    techStack.marketing_tools?.push('Calendly');
  }
  if (htmlLower.includes('typeform') || allScripts.includes('typeform')) {
    techStack.marketing_tools?.push('Typeform');
  }

  // E-commerce detection
  if (htmlLower.includes('stripe') || allScripts.includes('stripe')) {
    techStack.ecommerce?.push('Stripe');
  }
  if (htmlLower.includes('paypal') || allScripts.includes('paypal')) {
    techStack.ecommerce?.push('PayPal');
  }
  if (htmlLower.includes('woocommerce') || htmlLower.includes('wc-')) {
    techStack.ecommerce?.push('WooCommerce');
  }
  if (htmlLower.includes('bigcommerce')) {
    techStack.ecommerce?.push('BigCommerce');
  }
  if (htmlLower.includes('gumroad') || allScripts.includes('gumroad')) {
    techStack.ecommerce?.push('Gumroad');
  }

  // Security detection
  if (url.startsWith('https://')) {
    techStack.security?.push('HTTPS');
  }
  if (htmlLower.includes('recaptcha') || allScripts.includes('recaptcha')) {
    techStack.security?.push('reCAPTCHA');
  }
  if (htmlLower.includes('hcaptcha') || allScripts.includes('hcaptcha')) {
    techStack.security?.push('hCaptcha');
  }
  if (htmlLower.includes('cloudflare') || allScripts.includes('cloudflare')) {
    techStack.security?.push('Cloudflare');
    techStack.performance?.push('Cloudflare CDN');
  }

  // Performance detection
  if (allScripts.includes('cdn') || allStyles.includes('cdn')) {
    if (!techStack.performance?.includes('CDN')) {
      techStack.performance?.push('CDN');
    }
  }
  if (htmlLower.includes('lazy') || htmlLower.includes('loading="lazy"')) {
    techStack.performance?.push('Lazy Loading');
  }
  if (htmlLower.includes('service-worker') || allScripts.includes('sw.js')) {
    techStack.performance?.push('Service Worker');
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
  } else if (url.includes('github.io')) {
    techStack.hosting = 'GitHub Pages';
  } else if (url.includes('herokuapp.com')) {
    techStack.hosting = 'Heroku';
  } else if (url.includes('aws') || url.includes('amazonaws')) {
    techStack.hosting = 'AWS';
  } else if (url.includes('azure')) {
    techStack.hosting = 'Azure';
  }

  // Clean up empty arrays
  Object.keys(techStack).forEach((key) => {
    const value = techStack[key as keyof EnhancedTechStack];
    if (Array.isArray(value) && value.length === 0) {
      delete techStack[key as keyof EnhancedTechStack];
    }
  });

  return techStack;
}

/**
 * Analyze SEO signals from scraped data
 */
function analyzeSEOSignals(scrapedData: ScrapedData, html: string): SEOSignals {
  const hasMetaTags = !!scrapedData.metaDescription;
  const hasStructuredData = html.includes('application/ld+json') || html.includes('itemtype');
  const hasSitemap = html.includes('sitemap') || html.includes('/sitemap.xml');

  return {
    has_meta_tags: hasMetaTags,
    has_structured_data: hasStructuredData,
    has_sitemap: hasSitemap,
    meta_description_quality: hasMetaTags && scrapedData.metaDescription.length > 120 ? 'Good' : hasMetaTags ? 'Needs improvement' : 'Missing',
    title_tag_quality: scrapedData.title.length > 30 && scrapedData.title.length < 70 ? 'Good' : 'Needs improvement',
  };
}

/**
 * Extract business story and intelligence using AI
 */
async function extractBusinessIntelligence(
  scrapedData: ScrapedData,
  techStack: EnhancedTechStack,
  url: string
): Promise<{
  websiteStory: string;
  businessIntelligence: Omit<BusinessIntelligence, 'analysis_metadata'>;
}> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const seoSignals = analyzeSEOSignals(scrapedData, scrapedData.html);
  const techStackSummary = [
    techStack.platform && `Platform: ${techStack.platform}`,
    techStack.cms && `CMS: ${techStack.cms}`,
    techStack.frameworks?.length && `Frameworks: ${techStack.frameworks.join(', ')}`,
    techStack.analytics?.length && `Analytics: ${techStack.analytics.join(', ')}`,
    techStack.marketing_tools?.length && `Marketing Tools: ${techStack.marketing_tools.join(', ')}`,
    techStack.ecommerce?.length && `E-commerce: ${techStack.ecommerce.join(', ')}`,
  ].filter(Boolean).join('\n');

  const prompt = `You are an expert business analyst and AI consultant. Analyze this website and extract comprehensive business intelligence.

Website URL: ${url}

Title: ${scrapedData.title}
Meta Description: ${scrapedData.metaDescription || 'None'}

Website Content (first 15000 chars):
${scrapedData.content.substring(0, 15000)}

Key Headings: ${scrapedData.headings.slice(0, 10).join(', ')}

Page Structure:
- Internal Pages: ~${scrapedData.links.internal.length} pages
- External Links: ${scrapedData.links.external.slice(0, 10).join(', ')}
- Social Presence: ${scrapedData.links.social.join(', ') || 'None detected'}
- Forms: ${scrapedData.forms}
- Images: ${scrapedData.images}

Detected Tech Stack:
${techStackSummary || 'Basic/Unknown'}

SEO Signals:
- Meta tags: ${seoSignals.has_meta_tags ? 'Present' : 'Missing'}
- Structured data: ${seoSignals.has_structured_data ? 'Present' : 'Missing'}
- Sitemap: ${seoSignals.has_sitemap ? 'Detected' : 'Not detected'}

Provide a comprehensive business intelligence analysis as JSON. Be specific and data-driven. Use the actual content to inform your analysis.

IMPORTANT: Return ONLY valid JSON with this exact structure (no markdown, no explanation):
{
  "website_story": "2-3 paragraph summary of what the business does, their value proposition, and target audience",
  "business_model": "B2B, B2C, B2B2C, marketplace, SaaS, e-commerce, service-based, agency, consulting, or hybrid",
  "industry": "Specific industry classification (e.g., 'Healthcare Technology', 'Marketing Agency', 'E-commerce Retail')",
  "target_audience": {
    "primary": "Primary target customer segment",
    "demographics": "Age range, role, income level, etc.",
    "psychographics": "Values, motivations, pain points"
  },
  "value_proposition": ["Key differentiator 1", "Key differentiator 2", "Key differentiator 3"],
  "revenue_model": "Subscription, one-time, commission, advertising, hourly, project-based, etc.",
  "company_size": {
    "employees": "1-10, 10-50, 50-200, 200-500, 500+, or Unknown",
    "revenue_range": "$0-$1M, $1M-$5M, $5M-$20M, $20M-$100M, $100M+, or Unknown",
    "growth_stage": "Startup, Growth, Scale, or Enterprise"
  },
  "geographic_presence": ["Primary market 1", "Primary market 2"],
  "competitive_positioning": "Brief description of market position",
  "digital_presence": {
    "content_quality": "Low, Moderate, High, or Excellent",
    "site_structure": "Poor, Basic, Well-organized, or Excellent",
    "mobile_responsive": true,
    "conversion_elements": ["List of CTAs, forms, booking systems found"],
    "marketing_stack": ["Marketing tools detected"],
    "social_presence": ["Social platforms detected"]
  },
  "technical_assessment": {
    "performance": "Poor, Fair, Good, or Excellent",
    "security": "Weak, Moderate, Strong, or Excellent",
    "accessibility": "Poor, Fair, Moderate, or Good",
    "integrations": ["Detected integrations"],
    "backend_architecture": "Description of inferred architecture",
    "cdn_usage": true,
    "modern_framework": true
  },
  "ai_readiness": {
    "overall_score": 65,
    "current_ai_usage": ["Any AI tools or chatbots detected"],
    "data_infrastructure": "None, Basic, Moderate, or Advanced",
    "automation_level": "None, Low, Moderate, or High",
    "integration_readiness": "Low, Moderate, or High",
    "content_generation_needs": "Low, Moderate, High, or Critical",
    "customer_intelligence_gaps": ["Gaps where AI could help"]
  },
  "operations_insights": {
    "pain_points": ["Inferred operational challenges"],
    "growth_indicators": ["Signs of growth or expansion"],
    "efficiency_opportunities": ["Areas for automation/optimization"],
    "customer_journey_gaps": ["Missing touchpoints or automation"],
    "support_infrastructure": "Description of support setup"
  }
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

    const parsed = JSON.parse(jsonMatch[0]);

    // Build structured business intelligence
    const digitalPresence: DigitalPresence = {
      content_quality: parsed.digital_presence?.content_quality || 'Moderate',
      site_structure: parsed.digital_presence?.site_structure || 'Basic',
      mobile_responsive: parsed.digital_presence?.mobile_responsive ?? true,
      conversion_elements: parsed.digital_presence?.conversion_elements || [],
      marketing_stack: techStack.marketing_tools || parsed.digital_presence?.marketing_stack || [],
      social_presence: scrapedData.links.social.length > 0 ? scrapedData.links.social : parsed.digital_presence?.social_presence || [],
      seo_signals: seoSignals,
      page_count_estimate: scrapedData.links.internal.length,
    };

    const technicalAssessment: TechnicalAssessment = {
      performance: parsed.technical_assessment?.performance || 'Fair',
      security: url.startsWith('https://') ? (parsed.technical_assessment?.security || 'Moderate') : 'Weak',
      accessibility: parsed.technical_assessment?.accessibility || 'Fair',
      integrations: [...(techStack.ecommerce || []), ...(parsed.technical_assessment?.integrations || [])],
      backend_architecture: parsed.technical_assessment?.backend_architecture || techStack.platform || 'Unknown',
      cdn_usage: (techStack.performance || []).some((p: string) => p.toLowerCase().includes('cdn')),
      monitoring_tools: techStack.analytics || [],
      https_enabled: url.startsWith('https://'),
      modern_framework: !!(techStack.frameworks && techStack.frameworks.length > 0),
    };

    const aiReadiness: AIReadiness = {
      overall_score: Math.max(0, Math.min(100, parsed.ai_readiness?.overall_score || 50)),
      current_ai_usage: parsed.ai_readiness?.current_ai_usage || [],
      data_infrastructure: parsed.ai_readiness?.data_infrastructure || 'Basic',
      automation_level: parsed.ai_readiness?.automation_level || 'Low',
      integration_readiness: parsed.ai_readiness?.integration_readiness || 'Moderate',
      content_generation_needs: parsed.ai_readiness?.content_generation_needs || 'Moderate',
      customer_intelligence_gaps: parsed.ai_readiness?.customer_intelligence_gaps || [],
    };

    const operationsInsights: OperationsInsights = {
      pain_points: parsed.operations_insights?.pain_points || [],
      growth_indicators: parsed.operations_insights?.growth_indicators || [],
      efficiency_opportunities: parsed.operations_insights?.efficiency_opportunities || [],
      customer_journey_gaps: parsed.operations_insights?.customer_journey_gaps || [],
      support_infrastructure: parsed.operations_insights?.support_infrastructure || 'Unknown',
    };

    const targetAudience: TargetAudience = {
      primary: parsed.target_audience?.primary || 'General audience',
      demographics: parsed.target_audience?.demographics || 'Unknown',
      psychographics: parsed.target_audience?.psychographics || 'Unknown',
    };

    const companySize: CompanySize = {
      employees: parsed.company_size?.employees || 'Unknown',
      revenue_range: parsed.company_size?.revenue_range || 'Unknown',
      growth_stage: parsed.company_size?.growth_stage || 'Unknown',
    };

    return {
      websiteStory: parsed.website_story || 'Business story extraction in progress...',
      businessIntelligence: {
        business_model: parsed.business_model || 'Unknown',
        industry: parsed.industry || 'Unknown',
        target_audience: targetAudience,
        value_proposition: parsed.value_proposition || [],
        revenue_model: parsed.revenue_model || 'Unknown',
        company_size: companySize,
        geographic_presence: parsed.geographic_presence || [],
        competitive_positioning: parsed.competitive_positioning || 'Unknown',
        digital_presence: digitalPresence,
        technical_assessment: technicalAssessment,
        ai_readiness: aiReadiness,
        operations_insights: operationsInsights,
      },
    };
  } catch (error) {
    console.error('Error extracting business intelligence:', error);

    // Return fallback data
    return {
      websiteStory: `This business operates in the ${techStack.platform || 'digital'} space. Further analysis is needed to determine specific business model and value proposition.`,
      businessIntelligence: {
        business_model: 'Unknown',
        industry: 'Unknown',
        target_audience: {
          primary: 'General audience',
          demographics: 'Unknown',
          psychographics: 'Unknown',
        },
        value_proposition: [],
        revenue_model: 'Unknown',
        company_size: {
          employees: 'Unknown',
          revenue_range: 'Unknown',
          growth_stage: 'Unknown',
        },
        geographic_presence: [],
        competitive_positioning: 'Unknown',
        digital_presence: {
          content_quality: 'Moderate',
          site_structure: 'Basic',
          mobile_responsive: true,
          conversion_elements: [],
          marketing_stack: techStack.marketing_tools || [],
          social_presence: scrapedData.links.social,
          seo_signals: analyzeSEOSignals(scrapedData, scrapedData.html),
        },
        technical_assessment: {
          performance: 'Fair',
          security: url.startsWith('https://') ? 'Moderate' : 'Weak',
          accessibility: 'Fair',
          integrations: [],
          backend_architecture: techStack.platform || 'Unknown',
          cdn_usage: false,
          monitoring_tools: techStack.analytics || [],
          https_enabled: url.startsWith('https://'),
          modern_framework: false,
        },
        ai_readiness: {
          overall_score: 40,
          current_ai_usage: [],
          data_infrastructure: 'Basic',
          automation_level: 'Low',
          integration_readiness: 'Moderate',
          content_generation_needs: 'Moderate',
          customer_intelligence_gaps: [],
        },
        operations_insights: {
          pain_points: [],
          growth_indicators: [],
          efficiency_opportunities: [],
          customer_journey_gaps: [],
          support_infrastructure: 'Unknown',
        },
      },
    };
  }
}

/**
 * Generate AI readiness score and brief
 */
async function analyzeReadiness(
  businessIntelligence: Omit<BusinessIntelligence, 'analysis_metadata'>,
  websiteStory: string,
  techStack: EnhancedTechStack
): Promise<{ score: number; brief: string; capacityGap: string }> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are an AI readiness consultant. Based on this business intelligence, provide a refined AI readiness assessment.

Business Model: ${businessIntelligence.business_model}
Industry: ${businessIntelligence.industry}
AI Readiness Score (preliminary): ${businessIntelligence.ai_readiness.overall_score}
Current AI Usage: ${businessIntelligence.ai_readiness.current_ai_usage.join(', ') || 'None detected'}
Automation Level: ${businessIntelligence.ai_readiness.automation_level}
Tech Stack: ${techStack.platform || 'Unknown'}, ${techStack.frameworks?.join(', ') || 'Unknown frameworks'}
Integration Readiness: ${businessIntelligence.ai_readiness.integration_readiness}
Pain Points: ${businessIntelligence.operations_insights.pain_points.join(', ') || 'None identified'}

Business Context:
${websiteStory.substring(0, 1500)}

Provide a refined assessment as JSON:
{
  "score": 65,
  "brief": "2-3 sentence readiness assessment focusing on their current state and potential",
  "capacityGap": "2-3 sentence analysis of key gaps AI could address for this specific business"
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      score: Math.max(0, Math.min(100, Math.round(parsed.score || businessIntelligence.ai_readiness.overall_score))),
      brief: parsed.brief || 'AI readiness assessment in progress.',
      capacityGap: parsed.capacityGap || 'Analyzing capacity gaps...',
    };
  } catch (error) {
    console.error('Error analyzing readiness:', error);

    // Use the preliminary score from business intelligence
    return {
      score: businessIntelligence.ai_readiness.overall_score,
      brief: `Your ${businessIntelligence.industry || 'business'} shows ${businessIntelligence.ai_readiness.automation_level.toLowerCase()} automation levels. There are significant opportunities to leverage AI for enhanced capabilities.`,
      capacityGap: `Key gaps include ${businessIntelligence.ai_readiness.customer_intelligence_gaps.slice(0, 2).join(' and ') || 'process automation and intelligent insights'}. An AI system could address these through automation and data-driven decision making.`,
    };
  }
}

/**
 * Generate comprehensive readiness report
 */
async function generateFullReadinessReport(
  businessIntelligence: BusinessIntelligence,
  websiteStory: string,
  techStack: EnhancedTechStack,
  readinessScore: number,
  readinessBrief: string,
  capacityGapBrief: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Generate a comprehensive AI Readiness Report in markdown format for this business.

Business Intelligence:
- Industry: ${businessIntelligence.industry}
- Business Model: ${businessIntelligence.business_model}
- Target Audience: ${businessIntelligence.target_audience.primary}
- Company Size: ${businessIntelligence.company_size.employees} employees, ${businessIntelligence.company_size.growth_stage} stage
- Value Proposition: ${businessIntelligence.value_proposition.join(', ')}

Digital Presence:
- Content Quality: ${businessIntelligence.digital_presence.content_quality}
- Site Structure: ${businessIntelligence.digital_presence.site_structure}
- Marketing Stack: ${businessIntelligence.digital_presence.marketing_stack.join(', ') || 'Limited'}
- Social Presence: ${businessIntelligence.digital_presence.social_presence.join(', ') || 'Limited'}

Technical Assessment:
- Platform: ${techStack.platform || 'Unknown'}
- Frameworks: ${techStack.frameworks?.join(', ') || 'Unknown'}
- Performance: ${businessIntelligence.technical_assessment.performance}
- Security: ${businessIntelligence.technical_assessment.security}
- Integrations: ${businessIntelligence.technical_assessment.integrations.join(', ') || 'Limited'}

AI Readiness:
- Overall Score: ${readinessScore}/100
- Current AI Usage: ${businessIntelligence.ai_readiness.current_ai_usage.join(', ') || 'None'}
- Automation Level: ${businessIntelligence.ai_readiness.automation_level}
- Integration Readiness: ${businessIntelligence.ai_readiness.integration_readiness}
- Content Generation Needs: ${businessIntelligence.ai_readiness.content_generation_needs}

Operations Insights:
- Pain Points: ${businessIntelligence.operations_insights.pain_points.join(', ')}
- Efficiency Opportunities: ${businessIntelligence.operations_insights.efficiency_opportunities.join(', ')}
- Customer Journey Gaps: ${businessIntelligence.operations_insights.customer_journey_gaps.join(', ')}

Readiness Brief: ${readinessBrief}
Capacity Gap: ${capacityGapBrief}

Business Story:
${websiteStory}

Generate a professional, comprehensive markdown report with these sections:
1. Executive Summary (2 paragraphs)
2. Current State Assessment
3. AI Readiness Analysis (with score breakdown)
4. Key Opportunities for AI Integration
5. Recommended AI Solutions (tailored to their business)
6. Implementation Roadmap (phased approach)
7. Expected Outcomes and ROI Potential
8. Next Steps

Use professional language and provide actionable insights. Format with proper markdown headers, bullet points, and emphasis.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating full report:', error);
    return `# AI Readiness Report

## Executive Summary

Your business shows a readiness score of **${readinessScore}/100** for AI transformation. ${readinessBrief}

${capacityGapBrief}

## Current State

**Industry:** ${businessIntelligence.industry}
**Business Model:** ${businessIntelligence.business_model}
**Platform:** ${techStack.platform || 'Custom/Unknown'}

## Key Opportunities

${businessIntelligence.operations_insights.efficiency_opportunities.map(o => `- ${o}`).join('\n') || '- Process automation\n- Data-driven insights\n- Customer experience enhancement'}

## Next Steps

Contact us to discuss your personalized AI transformation roadmap.
`;
  }
}

/**
 * POST /api/analyze-website
 */
export async function POST(request: NextRequest): Promise<NextResponse<AnalyzeWebsiteResponse>> {
  const startTime = Date.now();

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

    // Scrape website with enhanced data extraction
    const scrapedData = await scrapeWebsite(url.toString());

    if (scrapedData.content.length < 100) {
      return NextResponse.json(
        { success: false, error: 'Website appears to be empty or inaccessible' },
        { status: 400 }
      );
    }

    // Detect enhanced tech stack
    const techStack = detectTechStack(scrapedData, url.toString());

    // Extract business intelligence
    const { websiteStory, businessIntelligence: partialBI } = await extractBusinessIntelligence(
      scrapedData,
      techStack,
      url.toString()
    );

    // Analyze readiness
    const { score, brief, capacityGap } = await analyzeReadiness(
      partialBI,
      websiteStory,
      techStack
    );

    // Update AI readiness score with refined value
    partialBI.ai_readiness.overall_score = score;

    // Add metadata
    const analysisMetadata: AnalysisMetadata = {
      analyzed_at: new Date().toISOString(),
      analysis_version: '2.0',
      confidence_score: scrapedData.content.length > 5000 ? 0.85 : scrapedData.content.length > 2000 ? 0.7 : 0.5,
      pages_analyzed: scrapedData.links.internal.length,
      analysis_duration_ms: Date.now() - startTime,
    };

    const businessIntelligence: BusinessIntelligence = {
      ...partialBI,
      analysis_metadata: analysisMetadata,
    };

    // Generate full readiness report
    const fullReadinessReport = await generateFullReadinessReport(
      businessIntelligence,
      websiteStory,
      techStack,
      score,
      brief,
      capacityGap
    );

    // Create lead submission
    const { supabaseAdmin, isSupabaseConfigured } = await import('@/lib/supabase');

    let leadId: string | null = null;

    if (isSupabaseConfigured()) {
      const leadData = {
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
        full_readiness_report: fullReadinessReport,
        business_intelligence: businessIntelligence,
        status: 'new',
        intake_data: {
          source: 'website-diagnostic',
          analysis_version: '2.0',
        },
      };

      const { data, error } = await supabaseAdmin
        .from('lead_submissions')
        .insert(leadData as unknown as never)
        .select('id')
        .single();

      if (!error && data) {
        leadId = (data as { id: string }).id;
      } else if (error) {
        console.error('Error creating lead submission:', error);
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
        businessIntelligence,
        fullReadinessReport,
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
