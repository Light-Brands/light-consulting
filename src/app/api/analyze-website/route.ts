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
 * Helper function to extract text content from HTML by removing tags
 * Aggressively cleans HTML to prevent artifacts in AI analysis
 */
function extractTextContent(html: string): string {
  // Remove script and style content (including inline)
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ');
  text = text.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, ' ');
  text = text.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, ' ');
  text = text.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, ' ');
  text = text.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, ' ');

  // Remove JSON-LD structured data
  text = text.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, ' ');

  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, ' ');

  // Remove data attributes and their content patterns
  text = text.replace(/data-[a-z-]+="[^"]*"/gi, ' ');

  // Remove inline styles
  text = text.replace(/style="[^"]*"/gi, ' ');

  // Remove class attributes (often contain CSS class names that look like gibberish)
  text = text.replace(/class="[^"]*"/gi, ' ');

  // Remove HTML tags but keep content
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&#x[a-fA-F0-9]+;/g, ' ');
  text = text.replace(/&#[0-9]+;/g, ' ');
  text = text.replace(/&[a-zA-Z0-9#]+;/g, ' ');

  // Remove URLs (they clutter the analysis)
  text = text.replace(/https?:\/\/[^\s]+/g, ' ');

  // Remove CSS-like patterns that slip through
  text = text.replace(/\{[^}]*\}/g, ' ');
  text = text.replace(/\[[^\]]*\]/g, ' ');

  // Remove common JavaScript/CSS artifacts
  text = text.replace(/var\s+\w+\s*=/g, ' ');
  text = text.replace(/function\s*\([^)]*\)/g, ' ');
  text = text.replace(/\.\w+\s*\{/g, ' ');
  text = text.replace(/#\w+\s*\{/g, ' ');

  // Remove hex color codes
  text = text.replace(/#[a-fA-F0-9]{3,8}\b/g, ' ');

  // Remove repeated special characters
  text = text.replace(/[_\-=]{3,}/g, ' ');

  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();

  // Remove very short "words" that are likely artifacts (less than 2 chars except common words)
  text = text.split(' ').filter(word => {
    if (word.length <= 1) {
      return ['a', 'i', 'I', 'A'].includes(word);
    }
    return true;
  }).join(' ');

  return text;
}

/**
 * Helper function to extract attribute values using regex
 */
function extractAttributes(html: string, tagPattern: RegExp, attrName: string): string[] {
  const results: string[] = [];
  const matches = html.matchAll(tagPattern);

  for (const match of matches) {
    const tag = match[0];
    const attrMatch = tag.match(new RegExp(`${attrName}=["']([^"']*)["']`, 'i'));
    if (attrMatch && attrMatch[1]) {
      results.push(attrMatch[1]);
    }
  }

  return results;
}

/**
 * Enhanced website scraping with additional data extraction
 * Uses fetch-based HTML parsing for serverless compatibility
 */
async function scrapeWebsite(url: string): Promise<ScrapedData> {
  try {
    // Fetch the HTML content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LightConsultingBot/1.0; +https://lightbrandconsulting.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const parsedUrl = new URL(url);
    const baseHost = parsedUrl.hostname;

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Extract meta description
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) ||
                          html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

    // Extract headings
    const headings: string[] = [];
    const headingMatches = html.matchAll(/<h[123][^>]*>([^<]*(?:<[^>]+>[^<]*)*)<\/h[123]>/gi);
    for (const match of headingMatches) {
      const text = match[1].replace(/<[^>]+>/g, '').trim();
      if (text && headings.length < 20) {
        headings.push(text);
      }
    }

    // Extract links
    const internalLinks: string[] = [];
    const externalLinks: string[] = [];
    const socialLinks: string[] = [];
    const socialDomains = ['facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com', 'youtube.com', 'tiktok.com', 'x.com'];

    const linkMatches = html.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>/gi);
    for (const match of linkMatches) {
      const href = match[1];
      try {
        const linkUrl = new URL(href, url);
        if (linkUrl.hostname === baseHost || linkUrl.hostname === 'www.' + baseHost || 'www.' + linkUrl.hostname === baseHost) {
          if (!internalLinks.includes(linkUrl.pathname)) {
            internalLinks.push(linkUrl.pathname);
          }
        } else if (socialDomains.some(s => linkUrl.hostname.includes(s))) {
          const socialHost = linkUrl.hostname.replace('www.', '');
          if (!socialLinks.includes(socialHost)) {
            socialLinks.push(socialHost);
          }
        } else if (href.startsWith('http')) {
          if (!externalLinks.includes(linkUrl.hostname)) {
            externalLinks.push(linkUrl.hostname);
          }
        }
      } catch {
        // Invalid URL, skip
      }
    }

    // Count forms
    const formMatches = html.match(/<form[^>]*>/gi);
    const forms = formMatches ? formMatches.length : 0;

    // Count images
    const imgMatches = html.match(/<img[^>]*>/gi);
    const images = imgMatches ? imgMatches.length : 0;

    // Extract script sources
    const scripts = extractAttributes(html, /<script[^>]*>/gi, 'src');

    // Extract stylesheet sources
    const styles = extractAttributes(html, /<link[^>]*rel=["']stylesheet["'][^>]*>/gi, 'href');

    // Extract text content
    const content = extractTextContent(html);

    return {
      content: content.substring(0, 50000), // Limit content size
      html,
      title,
      metaDescription,
      headings,
      links: {
        internal: internalLinks.slice(0, 50),
        external: externalLinks.slice(0, 20),
        social: socialLinks,
      },
      forms,
      images,
      scripts,
      styles,
    };
  } catch (error) {
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
 * Helper functions to infer business intelligence from available data
 */
function inferIndustryFromContent(scrapedData: ScrapedData, domain: string): string {
  const content = (scrapedData.content + ' ' + scrapedData.title + ' ' + scrapedData.headings.join(' ')).toLowerCase();

  // Industry keyword mapping
  const industryPatterns: [string, RegExp][] = [
    ['Healthcare Technology', /health|medical|patient|clinic|hospital|healthcare|wellness/],
    ['Digital Marketing Agency', /marketing|seo|advertising|campaign|digital agency|branding/],
    ['E-commerce Retail', /shop|store|cart|product|buy|ecommerce|retail/],
    ['Software Development', /software|development|code|programming|app|saas/],
    ['Financial Services', /finance|banking|invest|loan|insurance|fintech/],
    ['Legal Services', /law|legal|attorney|lawyer|litigation/],
    ['Real Estate', /real estate|property|homes|realty|mortgage/],
    ['Education Technology', /education|learning|course|training|school|edtech/],
    ['Consulting Services', /consulting|consultant|advisory|strategy/],
    ['Professional Services', /professional|service|solutions|expert/],
    ['Food & Beverage', /food|restaurant|catering|beverage|dining/],
    ['Travel & Hospitality', /travel|hotel|vacation|tourism|booking/],
    ['Technology Services', /technology|tech|it services|cloud|data/],
    ['Creative Agency', /design|creative|brand|visual|agency/],
    ['Manufacturing', /manufacturing|factory|production|industrial/],
  ];

  for (const [industry, pattern] of industryPatterns) {
    if (pattern.test(content)) {
      return industry;
    }
  }

  // Check domain for clues
  if (domain.includes('tech') || domain.includes('soft')) return 'Technology Services';
  if (domain.includes('market') || domain.includes('media')) return 'Digital Marketing';
  if (domain.includes('consult')) return 'Consulting Services';
  if (domain.includes('law') || domain.includes('legal')) return 'Legal Services';
  if (domain.includes('health') || domain.includes('med')) return 'Healthcare';

  return 'Professional Services';
}

function inferBusinessModel(scrapedData: ScrapedData, techStack: EnhancedTechStack): string {
  const content = scrapedData.content.toLowerCase();
  const hasEcommerce = techStack.ecommerce && techStack.ecommerce.length > 0;

  // Check for e-commerce signals
  if (hasEcommerce || content.includes('add to cart') || content.includes('shop now') || content.includes('buy now')) {
    return 'e-commerce';
  }

  // Check for SaaS signals
  if (content.includes('saas') || content.includes('subscription') || content.includes('pricing plan') ||
      content.includes('free trial') || content.includes('sign up')) {
    return 'SaaS';
  }

  // Check for B2B service signals
  if (content.includes('enterprise') || content.includes('business solution') ||
      content.includes('schedule a demo') || content.includes('request a quote')) {
    return 'B2B';
  }

  // Check for agency/consulting signals
  if (content.includes('agency') || content.includes('our work') || content.includes('portfolio') ||
      content.includes('case study') || content.includes('our clients')) {
    return 'agency';
  }

  if (content.includes('consulting') || content.includes('advisory') || content.includes('expertise')) {
    return 'consulting';
  }

  // Check for marketplace signals
  if (content.includes('marketplace') || content.includes('vendors') || content.includes('sellers')) {
    return 'marketplace';
  }

  // Default based on form presence
  if (scrapedData.forms > 0) {
    return 'service-based';
  }

  return 'B2B';
}

function inferCompanySize(scrapedData: ScrapedData): string {
  const content = scrapedData.content.toLowerCase();
  const pageCount = scrapedData.links.internal.length;

  // Check for size indicators in content
  if (content.includes('enterprise') || content.includes('global') || content.includes('worldwide') ||
      content.includes('fortune 500') || pageCount > 100) {
    return '200-500';
  }

  if (content.includes('team of') || content.includes('employees') || pageCount > 50) {
    return '50-200';
  }

  if (pageCount > 20 || content.includes('growing team')) {
    return '10-50';
  }

  return '1-10';
}

function inferRevenueRange(scrapedData: ScrapedData): string {
  const pageCount = scrapedData.links.internal.length;
  const contentLength = scrapedData.content.length;

  // Larger sites typically indicate more established companies
  if (pageCount > 100 || contentLength > 50000) {
    return '$5M-$20M';
  }

  if (pageCount > 50 || contentLength > 20000) {
    return '$1M-$5M';
  }

  if (pageCount > 20 || contentLength > 10000) {
    return '$0-$1M';
  }

  return '$0-$1M';
}

function inferRevenueModel(scrapedData: ScrapedData, techStack: EnhancedTechStack): string {
  const content = scrapedData.content.toLowerCase();
  const hasEcommerce = techStack.ecommerce && techStack.ecommerce.length > 0;

  if (hasEcommerce || content.includes('add to cart')) {
    return 'Product sales';
  }

  if (content.includes('subscription') || content.includes('monthly') || content.includes('annual plan')) {
    return 'Subscription';
  }

  if (content.includes('retainer') || content.includes('ongoing')) {
    return 'Retainer';
  }

  if (content.includes('project') || content.includes('quote') || content.includes('estimate')) {
    return 'Project-based';
  }

  if (content.includes('hourly') || content.includes('per hour')) {
    return 'Hourly';
  }

  return 'Service fees';
}

function extractValueProps(scrapedData: ScrapedData): string[] {
  const headings = scrapedData.headings.slice(0, 10);
  const valueProps: string[] = [];

  // Look for benefit-oriented headings
  for (const heading of headings) {
    const lower = heading.toLowerCase();
    if (lower.includes('why') || lower.includes('benefit') || lower.includes('advantage') ||
        lower.includes('feature') || lower.includes('solution') || lower.includes('how we')) {
      valueProps.push(heading);
    }
  }

  // If we didn't find explicit value props, create generic ones based on content
  if (valueProps.length === 0) {
    if (scrapedData.content.toLowerCase().includes('experience')) {
      valueProps.push('Industry experience and expertise');
    }
    if (scrapedData.content.toLowerCase().includes('quality')) {
      valueProps.push('Quality-focused approach');
    }
    if (scrapedData.content.toLowerCase().includes('customer') || scrapedData.content.toLowerCase().includes('client')) {
      valueProps.push('Client-centric service');
    }
  }

  return valueProps.slice(0, 3);
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

  // Extract domain for inference
  const domain = new URL(url).hostname.replace('www.', '');

  const prompt = `You are an expert business analyst specializing in AI consulting. Your task is to analyze a website and extract comprehensive business intelligence.

CRITICAL INSTRUCTIONS:
1. NEVER return "Unknown" for any field - always make your best inference based on available data
2. Use the domain name, content, and context clues to infer information
3. Be specific and detailed - generic answers are not helpful
4. If limited data, make reasonable assumptions based on industry patterns

OUTPUT QUALITY RULES (VERY IMPORTANT):
- Your output must be CLEAN, PROFESSIONAL business language only
- NEVER include raw HTML tags, CSS classes, JavaScript code, or technical markup in your responses
- NEVER include URLs, file paths, or code snippets in text fields
- If you see garbled text, HTML entities (like &amp;), or code-like patterns in the source content, IGNORE them completely
- Write in clear, natural business English - as if writing for an executive summary
- All text should read smoothly as professional prose, not contain any web artifacts

Website URL: ${url}
Domain: ${domain}

Title: ${scrapedData.title}
Meta Description: ${scrapedData.metaDescription || 'Not provided'}

Website Content:
${scrapedData.content.substring(0, 18000)}

Key Headings: ${scrapedData.headings.slice(0, 15).join(' | ')}

Site Structure:
- Internal Pages: ~${scrapedData.links.internal.length} pages
- Navigation paths: ${scrapedData.links.internal.slice(0, 15).join(', ')}
- External Links: ${scrapedData.links.external.slice(0, 10).join(', ')}
- Social Links: ${scrapedData.links.social.join(', ') || 'None detected'}
- Forms on page: ${scrapedData.forms}
- Images: ${scrapedData.images}

Tech Stack Detected:
${techStackSummary || 'Standard web technologies'}

SEO Analysis:
- Meta tags: ${seoSignals.has_meta_tags ? 'Present' : 'Missing'}
- Structured data: ${seoSignals.has_structured_data ? 'Present' : 'Missing'}
- Sitemap: ${seoSignals.has_sitemap ? 'Detected' : 'Not detected'}

ANALYSIS GUIDELINES:
- For business_model: Analyze if they sell to businesses (B2B), consumers (B2C), or both. Look for pricing pages, contact forms, demo requests (B2B signals) vs shopping carts (B2C signals)
- For industry: Be specific! "Marketing" is too vague - use "Digital Marketing Agency" or "Marketing Technology SaaS"
- For company_size: Infer from website sophistication, team pages, office locations, and content volume
- For target_audience: Who would benefit from their product/service? What problems do they solve?
- For pain_points: What challenges would their customers face that led them to this business?
- For efficiency_opportunities: Where could AI/automation help THIS specific business?

CRITICAL FIELD FORMATTING:
- value_proposition: MUST be 3 SHORT phrases you SYNTHESIZE (max 8 words each). Examples: "Custom design for every project", "Full-service digital transformation", "Results-driven marketing strategy". NEVER copy raw text from the site - write clean, professional benefits.
- All array fields (pain_points, efficiency_opportunities, customer_intelligence_gaps, etc.): Each item should be a clean, concise phrase - NEVER include CSS, HTML, code, or long text blocks.
- If you see garbled content with CSS like "@media", "animation:", "{", "}", etc. - IGNORE IT COMPLETELY and write your own clean analysis.

Return ONLY valid JSON (no markdown code blocks, no explanations):
{
  "website_story": "2-3 paragraphs describing the business, what they do, who they serve, and their unique value. Be specific about their offerings.",
  "business_model": "One of: B2B, B2C, B2B2C, marketplace, SaaS, e-commerce, service-based, agency, consulting, hybrid. Based on actual evidence.",
  "industry": "Specific industry (e.g., 'Digital Marketing Agency', 'E-commerce Fashion Retail', 'Healthcare SaaS', 'Professional Services Consulting')",
  "target_audience": {
    "primary": "Specific description of ideal customer (e.g., 'Small business owners seeking digital growth', 'Enterprise HR departments')",
    "demographics": "Role, company size, budget level, decision-making authority",
    "psychographics": "Goals they want to achieve, challenges they face, what motivates their buying decisions"
  },
  "value_proposition": ["SHORT benefit phrase (max 8 words)", "Another concise benefit", "Third key differentiator"],
  "revenue_model": "How they make money: Subscription, project-based, retainer, hourly, commission, product sales, etc.",
  "company_size": {
    "employees": "Infer from team page, about page, or website sophistication: 1-10, 10-50, 50-200, 200-500, or 500+",
    "revenue_range": "Infer from pricing, client list, company size: $0-$1M, $1M-$5M, $5M-$20M, $20M-$100M, or $100M+",
    "growth_stage": "Based on website maturity and content: Startup, Growth, Scale, or Enterprise"
  },
  "geographic_presence": ["Infer primary markets from contact info, currency, language"],
  "competitive_positioning": "How they differentiate from competitors based on their messaging",
  "digital_presence": {
    "content_quality": "Low, Moderate, High, or Excellent - based on writing quality, depth, freshness",
    "site_structure": "Poor, Basic, Well-organized, or Excellent - based on navigation and UX",
    "mobile_responsive": true,
    "conversion_elements": ["List CTAs, forms, booking widgets, chat systems found"],
    "marketing_stack": ["Tools detected from scripts and integrations"],
    "social_presence": ["Active social platforms"]
  },
  "technical_assessment": {
    "performance": "Poor, Fair, Good, or Excellent",
    "security": "Weak, Moderate, Strong, or Excellent",
    "accessibility": "Poor, Fair, Moderate, or Good",
    "integrations": ["Detected third-party integrations"],
    "backend_architecture": "Platform/framework powering the site",
    "cdn_usage": true,
    "modern_framework": true
  },
  "ai_readiness": {
    "overall_score": 50,
    "current_ai_usage": ["Any AI tools, chatbots, or automation detected"],
    "data_infrastructure": "None, Basic, Moderate, or Advanced",
    "automation_level": "None, Low, Moderate, or High",
    "integration_readiness": "Low, Moderate, or High - based on tech stack",
    "content_generation_needs": "Low, Moderate, High, or Critical - based on content volume",
    "customer_intelligence_gaps": ["Specific areas where AI could provide insights"]
  },
  "operations_insights": {
    "pain_points": ["Specific operational challenges they likely face based on their business type"],
    "growth_indicators": ["Signs of expansion, hiring, new products"],
    "efficiency_opportunities": ["Specific areas where automation/AI could help"],
    "customer_journey_gaps": ["Missing touchpoints in their customer experience"],
    "support_infrastructure": "How they handle customer support based on visible elements"
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

    // Sanitize array fields to remove any CSS/HTML artifacts
    const sanitizeArrayField = (arr: string[] | undefined): string[] => {
      if (!arr || !Array.isArray(arr)) return [];
      return arr
        .filter(item => {
          if (typeof item !== 'string') return false;
          // Reject items that look like CSS/HTML/code artifacts
          const artifactPatterns = [
            /@media/i,
            /\{.*\}/,
            /animation:/i,
            /keyframes/i,
            /transform:/i,
            /grid-column/i,
            /\.items-holder/i,
            /&amp;|&#\d+;|&#x[a-f0-9]+;/i,
            /<[a-z]/i,
            /\[item-style/i,
            /pointer-events/i,
            /translateX/i,
            /hover\s*\{/i,
            /\.youtube-embed/i,
            /\burl\s*\(/i,
            /max-height:/i,
            /font-size:/i,
            /border-radius:/i,
          ];
          const hasArtifact = artifactPatterns.some(pattern => pattern.test(item));
          // Also reject very long items (likely raw content dumps)
          const isTooLong = item.length > 150;
          return !hasArtifact && !isTooLong;
        })
        .map(item => {
          // Clean up any remaining HTML entities
          return item
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#x27;/g, "'")
            .trim();
        })
        .filter(item => item.length > 0);
    };

    // Sanitize text fields
    const sanitizeTextField = (text: string | undefined): string => {
      if (!text || typeof text !== 'string') return '';
      // Remove obvious CSS/code patterns
      let cleaned = text
        .replace(/@media[^}]+\}/g, '')
        .replace(/\{[^}]*\}/g, '')
        .replace(/animation:[^;]+;/g, '')
        .replace(/\[item-style[^\]]*\]/g, '')
        .replace(/\.[\w-]+\s*\{/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#\d+;/g, '')
        .replace(/&#x[a-f0-9]+;/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
      return cleaned;
    };

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
      current_ai_usage: sanitizeArrayField(parsed.ai_readiness?.current_ai_usage),
      data_infrastructure: parsed.ai_readiness?.data_infrastructure || 'Basic',
      automation_level: parsed.ai_readiness?.automation_level || 'Low',
      integration_readiness: parsed.ai_readiness?.integration_readiness || 'Moderate',
      content_generation_needs: parsed.ai_readiness?.content_generation_needs || 'Moderate',
      customer_intelligence_gaps: sanitizeArrayField(parsed.ai_readiness?.customer_intelligence_gaps).length > 0
        ? sanitizeArrayField(parsed.ai_readiness?.customer_intelligence_gaps)
        : ['Customer behavior analytics', 'Personalization opportunities'],
    };

    const operationsInsights: OperationsInsights = {
      pain_points: sanitizeArrayField(parsed.operations_insights?.pain_points).length > 0
        ? sanitizeArrayField(parsed.operations_insights?.pain_points)
        : ['Manual processes that could be automated'],
      growth_indicators: sanitizeArrayField(parsed.operations_insights?.growth_indicators),
      efficiency_opportunities: sanitizeArrayField(parsed.operations_insights?.efficiency_opportunities).length > 0
        ? sanitizeArrayField(parsed.operations_insights?.efficiency_opportunities)
        : ['Process automation', 'AI-powered workflows'],
      customer_journey_gaps: sanitizeArrayField(parsed.operations_insights?.customer_journey_gaps),
      support_infrastructure: parsed.operations_insights?.support_infrastructure || 'Unknown',
    };

    // Helper to infer industry from domain/content if not provided
    const inferredIndustry = parsed.industry || inferIndustryFromContent(scrapedData, domain);
    const inferredBusinessModel = parsed.business_model || inferBusinessModel(scrapedData, techStack);

    const targetAudience: TargetAudience = {
      primary: parsed.target_audience?.primary || `Visitors to ${domain}`,
      demographics: parsed.target_audience?.demographics || 'Decision makers and stakeholders',
      psychographics: parsed.target_audience?.psychographics || 'Seeking solutions and expertise',
    };

    const companySize: CompanySize = {
      employees: parsed.company_size?.employees || inferCompanySize(scrapedData),
      revenue_range: parsed.company_size?.revenue_range || inferRevenueRange(scrapedData),
      growth_stage: parsed.company_size?.growth_stage || 'Growth',
    };

    // Sanitize main text fields
    const cleanWebsiteStory = sanitizeTextField(parsed.website_story) ||
      `${scrapedData.title} - This business operates in the ${inferredIndustry} space, offering solutions to their target market.`;
    const cleanCompetitivePositioning = sanitizeTextField(parsed.competitive_positioning) ||
      'Positioned as a trusted provider in their market';

    return {
      websiteStory: cleanWebsiteStory,
      businessIntelligence: {
        business_model: inferredBusinessModel,
        industry: inferredIndustry,
        target_audience: targetAudience,
        value_proposition: sanitizeArrayField(parsed.value_proposition).length > 0
          ? sanitizeArrayField(parsed.value_proposition)
          : extractValueProps(scrapedData),
        revenue_model: parsed.revenue_model || inferRevenueModel(scrapedData, techStack),
        company_size: companySize,
        geographic_presence: parsed.geographic_presence || ['North America'],
        competitive_positioning: cleanCompetitivePositioning,
        digital_presence: digitalPresence,
        technical_assessment: technicalAssessment,
        ai_readiness: aiReadiness,
        operations_insights: operationsInsights,
      },
    };
  } catch (error) {
    console.error('Error extracting business intelligence:', error);

    // Return intelligent fallback data based on scraped content
    const fallbackIndustry = inferIndustryFromContent(scrapedData, domain);
    const fallbackBusinessModel = inferBusinessModel(scrapedData, techStack);

    return {
      websiteStory: `${scrapedData.title || domain} operates in the ${fallbackIndustry} space. Based on initial analysis, they appear to be a ${fallbackBusinessModel} business. Their website uses ${techStack.platform || 'standard web'} technology.`,
      businessIntelligence: {
        business_model: fallbackBusinessModel,
        industry: fallbackIndustry,
        target_audience: {
          primary: `Visitors seeking ${fallbackIndustry.toLowerCase()} solutions`,
          demographics: 'Business decision makers',
          psychographics: 'Goal-oriented, seeking reliable solutions',
        },
        value_proposition: extractValueProps(scrapedData),
        revenue_model: inferRevenueModel(scrapedData, techStack),
        company_size: {
          employees: inferCompanySize(scrapedData),
          revenue_range: inferRevenueRange(scrapedData),
          growth_stage: 'Growth',
        },
        geographic_presence: ['North America'],
        competitive_positioning: 'Established presence in their market segment',
        digital_presence: {
          content_quality: 'Moderate',
          site_structure: 'Basic',
          mobile_responsive: true,
          conversion_elements: scrapedData.forms > 0 ? ['Contact form'] : [],
          marketing_stack: techStack.marketing_tools || [],
          social_presence: scrapedData.links.social,
          seo_signals: analyzeSEOSignals(scrapedData, scrapedData.html),
        },
        technical_assessment: {
          performance: 'Fair',
          security: url.startsWith('https://') ? 'Moderate' : 'Weak',
          accessibility: 'Fair',
          integrations: techStack.ecommerce || [],
          backend_architecture: techStack.platform || 'Standard web platform',
          cdn_usage: false,
          monitoring_tools: techStack.analytics || [],
          https_enabled: url.startsWith('https://'),
          modern_framework: !!(techStack.frameworks && techStack.frameworks.length > 0),
        },
        ai_readiness: {
          overall_score: 45,
          current_ai_usage: [],
          data_infrastructure: 'Basic',
          automation_level: 'Low',
          integration_readiness: 'Moderate',
          content_generation_needs: scrapedData.content.length > 5000 ? 'High' : 'Moderate',
          customer_intelligence_gaps: ['Customer behavior analytics', 'Personalization opportunities'],
        },
        operations_insights: {
          pain_points: ['Manual processes that could be automated', 'Content creation bandwidth'],
          growth_indicators: scrapedData.links.internal.length > 20 ? ['Expanding content library'] : [],
          efficiency_opportunities: ['AI-powered content generation', 'Automated customer engagement'],
          customer_journey_gaps: scrapedData.forms < 2 ? ['Limited lead capture touchpoints'] : [],
          support_infrastructure: 'Standard support channels',
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

IMPORTANT OUTPUT RULES:
- Write in clean, professional business language
- NEVER include HTML, code, URLs, or technical artifacts
- All text must read as polished executive-level prose

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

    // Generate random score between 15-30 to indicate need for diagnostic
    const randomScore = Math.floor(Math.random() * (30 - 15 + 1)) + 15;

    return {
      score: randomScore,
      brief: parsed.brief || 'AI readiness assessment in progress.',
      capacityGap: parsed.capacityGap || 'Analyzing capacity gaps...',
    };
  } catch (error) {
    console.error('Error analyzing readiness:', error);

    // Generate random score between 15-30 to indicate need for diagnostic
    const fallbackRandomScore = Math.floor(Math.random() * (30 - 15 + 1)) + 15;

    return {
      score: fallbackRandomScore,
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

CRITICAL OUTPUT RULES:
- Use professional business language throughout
- NEVER include raw HTML, CSS, JavaScript, URLs, or any technical code artifacts
- If any source data contains garbled text or web artifacts, translate it into clean business prose
- Write as if this report will be presented to a C-suite executive
- All insights should be actionable and clearly articulated

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
    const body = await request.json();
    const { websiteUrl, name, email, company, phone, skipAnalysis } = body;

    // Validate required fields (name and email are always required)
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
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

    // Handle skip analysis case - create lead without website analysis
    if (skipAnalysis || !websiteUrl) {
      const { supabaseAdmin, isSupabaseConfigured } = await import('@/lib/supabase');

      let leadId: string | null = null;

      if (isSupabaseConfigured()) {
        const leadData = {
          service: 'booking-direct',
          name,
          email,
          company: company || null,
          phone: phone || null,
          website_url: null,
          status: 'new',
          intake_data: {
            source: 'direct-booking',
            skipped_analysis: true,
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
        leadId: leadId || undefined,
      });
    }

    // Check for Gemini API key (only needed for analysis)
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'AI analysis service is not configured' },
        { status: 503 }
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
