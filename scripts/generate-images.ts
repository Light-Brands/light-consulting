/**
 * Image Generation Script for Light Brand Consulting
 * Uses OpenAI DALL-E API to generate all brand images
 * 
 * Usage: npx tsx scripts/generate-images.ts
 * 
 * Environment: OPENAI_API_KEY must be set (or in .env file)
 */

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

// Load .env file if it exists
function loadEnvFile() {
  const envPaths = [
    path.join(process.cwd(), '.env'),
    path.join(process.cwd(), '.env.local'),
    path.join(process.cwd(), '..', '.env'),
    path.join(process.cwd(), '..', '.env.local'),
  ];
  
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          if (key && value && !process.env[key]) {
            process.env[key] = value;
          }
        }
      }
      console.log(`📄 Loaded environment from: ${envPath}\n`);
      return true;
    }
  }
  return false;
}

loadEnvFile();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define all images to generate with their configurations
interface ImageConfig {
  filename: string;
  outputPath: string;
  prompt: string;
  dimensions: string;
  size: '1024x1024' | '1792x1024' | '1024x1792';
  quality: 'standard' | 'hd';
  style: 'natural' | 'vivid';
  category: string;
}

// Parse dimensions string to DALL-E 3 supported size
function getDallESize(dimensions: string): '1024x1024' | '1792x1024' | '1024x1792' {
  const [width, height] = dimensions.split('x').map(Number);
  const aspectRatio = width / height;
  
  if (aspectRatio > 1.3) {
    return '1792x1024'; // Landscape
  } else if (aspectRatio < 0.77) {
    return '1024x1792'; // Portrait
  } else {
    return '1024x1024'; // Square-ish
  }
}

// All images to generate
const IMAGES_TO_GENERATE: ImageConfig[] = [
  // Hero Backgrounds
  {
    filename: 'hero-home-bg.jpg',
    outputPath: 'public/images/hero',
    prompt: 'Abstract premium background for AI consulting company hero section. Subtle geometric light patterns emerging from darkness, with warm golden and amber light rays cutting through a deep charcoal atmosphere. Think of light breaking through morning fog or the moment of illumination. Ethereal floating particles of gold dust. Dark base (#0F0F10) transitioning to warm golden highlights (#E8B84A). Cinematic lighting, depth of field blur at edges. Ultra high resolution, suitable for text overlay. Sophisticated, not sci-fi or overly techy. The mood is "clarity emerging from confusion."',
    dimensions: '1920x1080',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'heroes',
  },
  {
    filename: 'hero-services-bg.jpg',
    outputPath: 'public/images/hero',
    prompt: 'Abstract premium background showing three distinct but connected pathways of light. Golden, amber, and cream light trails that seem to represent different service offerings, all converging and diverging from a central point of illumination. Deep charcoal base with warm, sophisticated lighting. Geometric and organic elements blended. Subtle gradient from dark edges to warmer center. Professional consulting aesthetic, not generic tech. Suitable for text overlay with services information.',
    dimensions: '1920x800',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'heroes',
  },
  {
    filename: 'hero-about-bg.jpg',
    outputPath: 'public/images/hero',
    prompt: 'Sophisticated abstract background representing the concept of "illumination" and "seeing clearly." Warm golden light seemingly emanating from a single source, casting geometric shadows and creating depth. Think of light through a window at golden hour, but abstracted and geometric. Colors: deep charcoal (#0F0F10) transitioning through amber to warm gold (#E8B84A). The mood is contemplative, professional, and warm. Suitable for text overlay about company philosophy.',
    dimensions: '1920x600',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'heroes',
  },
  {
    filename: 'hero-insights-bg.jpg',
    outputPath: 'public/images/hero',
    prompt: 'Abstract background representing knowledge and insight. Multiple sources of warm golden light creating overlapping patterns, suggesting multiple perspectives or ideas coming together. Think of it as a visual representation of "thought leadership" - layered, nuanced, illuminating. Geometric light patterns on deep charcoal background. Warm gold (#E8B84A) and amber (#D4944C) highlights. Professional, sophisticated, suitable for a business blog section. Not overly tech or AI-robotic looking.',
    dimensions: '1920x600',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'heroes',
  },
  {
    filename: 'hero-contact-bg.jpg',
    outputPath: 'public/images/hero',
    prompt: 'Abstract, warm background for a contact page. The visual metaphor of "opening a conversation" or "making a connection." Perhaps two abstract light forms reaching toward each other, or a door opening with warm golden light streaming through, or hands about to meet rendered in light. Warm gold (#E8B84A) and amber (#D4944C) on charcoal (#0F0F10) background. The mood is inviting, approachable, and warm. Not cold or corporate. Suitable for text overlay.',
    dimensions: '1200x600',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'heroes',
  },
  {
    filename: 'capacity-gap-illustration.jpg',
    outputPath: 'public/images/hero',
    prompt: 'Elegant infographic-style illustration showing transformation journey. Three connected elements: (1) A dim, unfocused circle on the left representing uncertainty, (2) A glowing golden bridge or prism in the center representing "the bridge of clarity", (3) A luminous, fully illuminated circle on the right representing "fullest capacity". Abstract, geometric style with warm gold (#E8B84A) and amber (#D4944C) gradients. Clean lines, premium feel. Dark charcoal background (#1A1A1C). The style should feel like premium consulting materials, not corporate clipart.',
    dimensions: '800x400',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'heroes',
  },
  
  // Service Card Images
  {
    filename: 'service-illumination.jpg',
    outputPath: 'public/images/services',
    prompt: 'Premium service illustration for "Illumination Session" - a 90-minute AI consulting session. Abstract representation of a lightbulb moment or eureka instant. A burst of warm golden light (#E8B84A) emerging from darkness, with geometric light rays expanding outward. The feeling of sudden clarity and insight. Not a literal lightbulb - more abstract and sophisticated. Deep charcoal background with warm golden illumination. Suitable for a premium consulting service card. The style suggests "seeing possibilities you were blind to before."',
    dimensions: '600x400',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'services',
  },
  {
    filename: 'service-blueprint.jpg',
    outputPath: 'public/images/services',
    prompt: 'Premium service illustration for "AI Acceleration Blueprint" - a strategic planning service. Abstract representation of an architectural blueprint or strategic roadmap rendered in warm golden light. Geometric grid patterns, connecting nodes, pathways branching and converging. Think of it as a treasure map made of light. Colors: warm gold (#E8B84A) and amber (#D4944C) lines on deep charcoal (#0F0F10) background. The feeling is strategic, comprehensive, and navigable. Premium consulting aesthetic, not generic corporate.',
    dimensions: '600x400',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'services',
  },
  {
    filename: 'service-story.jpg',
    outputPath: 'public/images/services',
    prompt: 'Premium service illustration for "Breath of Life Story" - a narrative and personal branding service. Abstract representation of a story unfolding - perhaps flowing lines of golden light forming the suggestion of pages turning, or breath becoming words becoming light. Organic, flowing forms contrasting with geometric elements. Warm cream (#FDF6E3) and gold (#E8B84A) on deep charcoal background. The feeling is personal, transformative, and authentic. The image should suggest "your unique voice and story being articulated and amplified."',
    dimensions: '600x400',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'services',
  },
  
  // Service Detail Hero Images
  {
    filename: 'service-detail-illumination.jpg',
    outputPath: 'public/images/services',
    prompt: 'Large hero image for Illumination Session detail page. A powerful moment of clarity and insight visualized abstractly. Imagine the instant where darkness gives way to understanding - geometric shards of warm golden light breaking through a dark surface. A single source of illumination creating beautiful geometric patterns and shadows. Colors: deep charcoal transitioning to warm gold (#E8B84A) and amber (#D4944C). Cinematic, dramatic, but warm and inviting not cold. The mood is "the moment everything becomes clear."',
    dimensions: '1200x600',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'services',
  },
  {
    filename: 'service-detail-blueprint.jpg',
    outputPath: 'public/images/services',
    prompt: 'Large hero image for AI Blueprint detail page. Abstract visualization of strategic architecture - interconnected nodes, pathways, and destinations forming a luminous network on a dark canvas. Think of a city map at night from above, but more geometric and abstract. The paths are made of warm golden light (#E8B84A) with key junction points in brighter amber (#D4944C). Deep charcoal background (#0F0F10). The feeling is comprehensive, strategic, and navigable - "a complete map for your AI journey."',
    dimensions: '1200x600',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'services',
  },
  {
    filename: 'service-detail-story.jpg',
    outputPath: 'public/images/services',
    prompt: 'Large hero image for Story service detail page. Abstract visualization of personal narrative and transformation. Flowing, organic lines of warm cream (#FDF6E3) and gold (#E8B84A) light that suggest handwriting, voice, or breath becoming visible. Perhaps the suggestion of an open book with light flowing from its pages, but highly abstracted. Deep charcoal background. The feeling is intimate, authentic, and transformative - "your story, finally articulated."',
    dimensions: '1200x600',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'services',
  },
  
  // Testimonial Avatar - Male Silhouette Placeholder
  {
    filename: 'avatar-joseph-mcveen.jpg',
    outputPath: 'public/images/avatars',
    prompt: 'Elegant professional male silhouette placeholder for business profile. Simple, sophisticated head and shoulders silhouette of a man in profile or three-quarter view. Rendered in warm gold (#E8B84A) gradient against deep charcoal (#0F0F10) background. Clean, minimal, geometric style. No facial features - just a refined silhouette shape suggesting professionalism and confidence. Premium consulting aesthetic. Suitable as a temporary placeholder until real photo is added.',
    dimensions: '200x200',
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'avatars',
  },
  
  // Founder Avatars - Lawless Family (Silhouette Placeholders)
  {
    filename: 'daniel-lawless.jpg',
    outputPath: 'public/images/founders',
    prompt: 'Elegant professional male silhouette placeholder for founder profile. Sophisticated head and shoulders silhouette of a man suggesting wisdom and technical expertise. Rendered in warm gold (#E8B84A) and amber (#D4944C) gradient against deep charcoal (#0F0F10) background. Clean, minimal, geometric style with subtle light rays emanating outward. No facial features - just a refined silhouette shape. Premium consulting aesthetic.',
    dimensions: '400x400',
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'founders',
  },
  {
    filename: 'jennifer-lawless.jpg',
    outputPath: 'public/images/founders',
    prompt: 'Elegant professional female silhouette placeholder for founder profile. Sophisticated head and shoulders silhouette of a woman suggesting warmth and intuition. Rendered in warm gold (#E8B84A) and cream (#FDF6E3) gradient against deep charcoal (#0F0F10) background. Clean, minimal, geometric style with subtle ethereal glow. No facial features - just a refined feminine silhouette shape. Premium consulting aesthetic.',
    dimensions: '400x400',
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'founders',
  },
  
  // Founder Avatars - Courchesne Family (Silhouette Placeholders)
  {
    filename: 'nicholas-courchesne.jpg',
    outputPath: 'public/images/founders',
    prompt: 'Elegant professional male silhouette placeholder for founder profile. Strong, confident head and shoulders silhouette of a man with broader build suggesting strength and presence. Rendered in warm gold (#E8B84A) and amber (#D4944C) gradient against deep charcoal (#0F0F10) background. Clean, minimal, geometric style. No facial features - just a refined powerful silhouette shape. Premium consulting aesthetic.',
    dimensions: '400x400',
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'founders',
  },
  {
    filename: 'nancy-courchesne.jpg',
    outputPath: 'public/images/founders',
    prompt: 'Elegant professional female silhouette placeholder for founder profile. Graceful head and shoulders silhouette of a woman suggesting intuition and illumination. Rendered in warm gold (#E8B84A) with subtle golden glow against deep charcoal (#0F0F10) background. Clean, minimal, geometric style with radiating light suggesting her intuitive gift. No facial features - just a refined feminine silhouette. Premium consulting aesthetic.',
    dimensions: '400x400',
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'founders',
  },
  
  // Founder Avatars - Demou Family (Silhouette Placeholders)
  {
    filename: 'andreas-demou.jpg',
    outputPath: 'public/images/founders',
    prompt: 'Elegant professional male silhouette placeholder for founder profile. Focused, composed head and shoulders silhouette of a man suggesting quiet strength and mastery. Rendered in warm gold (#E8B84A) gradient against deep charcoal (#0F0F10) background. Clean, minimal, geometric style with precise lines. No facial features - just a refined silhouette shape suggesting power and precision. Premium consulting aesthetic.',
    dimensions: '400x400',
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'founders',
  },
  {
    filename: 'mike-demou.jpg',
    outputPath: 'public/images/founders',
    prompt: 'Elegant professional male silhouette placeholder for founder profile. Creative, expressive head and shoulders silhouette of a man suggesting artistic vision. Rendered in warm gold (#E8B84A) and amber (#D4944C) gradient against deep charcoal (#0F0F10) background. Clean, minimal style with slightly more dynamic/artistic lines. No facial features - just a refined silhouette shape suggesting creativity. Premium consulting aesthetic.',
    dimensions: '400x400',
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'founders',
  },
  
  // Blog Post Featured Images
  {
    filename: 'blog-strategic-moment.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract conceptual image representing a pivotal moment in time - a window of opportunity. Visualize the concept as a narrow beam of warm golden light (#E8B84A) breaking through darkness, creating a sense of urgency and possibility. Perhaps geometric shapes representing a timeline with one section illuminated brightly. The feeling is "act now, the window is open." Deep charcoal background with dramatic warm lighting. Sophisticated, not corporate. Suitable for a strategic AI business article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-confusion-to-clarity.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract transformation image showing the journey from confusion to clarity. On the left: tangled, chaotic abstract lines in muted gray. Transitioning through the center: the lines begin to organize and warm up in color. On the right: clean, organized golden light patterns (#E8B84A) representing clarity. The visual metaphor of chaos becoming order, confusion becoming understanding. Dark background with the transformation happening through warm illumination. Premium, sophisticated aesthetic for consulting blog.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-opportunity-mapping.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of opportunity mapping - imagine a constellation map or neural network rendered in warm golden light (#E8B84A) and amber (#D4944C). Multiple nodes with one or two highlighted as "starting points" with brighter illumination. Connecting lines showing pathways and relationships. Deep charcoal (#0F0F10) background creating depth. The feeling is "finding your entry point into a world of possibilities." Strategic, sophisticated, suitable for business methodology article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-hype-vs-reality.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract conceptual image showing contrast between hype and reality. Perhaps two visual elements: on one side, exaggerated, flashy abstract light effects (bright but shallow), and on the other, solid, warm, sustained illumination in golden tones (#E8B84A) - suggesting substance. The contrast between fireworks and the sun, between sparkle and true light. Dark background with the genuine light being warm and grounding. Sophisticated metaphor for a business reality-check article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-first-ai-win.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of a first victory or breakthrough. A single point of warm golden light (#E8B84A) in the center growing outward, suggesting the start of something bigger. Perhaps the shape suggests "1" or "first" abstractly. Radiating lines of light expanding from the center point. The feeling is momentum, a beginning, potential energy. Deep charcoal background with warm, energizing illumination. Optimistic but sophisticated - suitable for an action-oriented business article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-leading-ai-transformation.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of leadership and guidance through AI transformation. A golden compass or beacon (#E8B84A) illuminating a path through abstract terrain. Warm light rays cutting through complexity, creating clarity. The feeling is confident direction amidst uncertainty. Deep charcoal background with warm, authoritative illumination. Premium consulting aesthetic for a leadership article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-building-ai-culture.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of team culture and adoption spreading. Multiple small points of golden light (#E8B84A) connecting and growing together, forming a network. Some lights brighter than others, suggesting early adopters. The feeling is organic growth and connection. Deep charcoal background with warm, collaborative illumination. Suitable for a culture and team adoption article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-ai-implementation-mistakes.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of avoiding pitfalls and mistakes. A warning beacon or caution light in warm amber (#D4944C) illuminating potential obstacles shown as dark geometric shapes. Light revealing hidden dangers. The feeling is protective guidance and foresight. Deep charcoal background with warm, cautionary but helpful illumination. Suitable for a mistakes-to-avoid business article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-ai-small-business.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of small business power and accessibility. A compact but intensely bright golden light source (#E8B84A) proving that size does not limit impact. Perhaps a small flame creating large shadows or a tiny crystal refracting brilliant light. The feeling is empowerment and accessibility. Deep charcoal background with warm, encouraging illumination. Suitable for small business empowerment article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-human-ai-collaboration.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of human-AI partnership. Two distinct but complementary light sources - one organic and warm gold (#E8B84A), one more geometric and amber (#D4944C) - merging together to create something greater. The feeling is synergy and partnership. Deep charcoal background with warm, harmonious illumination. Suitable for a human-AI collaboration article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-measuring-ai-roi.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of measuring value and ROI. Golden light (#E8B84A) forming abstract measurement scales, upward trending graphs, or precise geometric patterns suggesting quantification. The feeling is clarity and proof of value. Deep charcoal background with warm, analytical illumination. Suitable for an ROI measurement business article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-responsible-ai.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of ethics and responsibility in AI. Balanced golden scales (#E8B84A) or a protective light shield suggesting guardianship and trust. The feeling is integrity and careful stewardship. Deep charcoal background with warm, principled illumination. Suitable for an AI ethics and responsibility article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-ai-customer-experience.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of customer experience enhancement. Warm golden light (#E8B84A) creating welcoming, intuitive pathways. Light that guides without overwhelming, personalized streams of illumination. The feeling is warmth and service. Deep charcoal background with inviting, customer-focused illumination. Suitable for a customer experience article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-ai-data-readiness.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of data foundation and readiness. Three pillars of golden light (#E8B84A) supporting an abstract structure - representing quality, accessibility, and governance. The feeling is solid foundation and preparation. Deep charcoal background with warm, foundational illumination. Suitable for a data readiness assessment article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-ai-personal-productivity.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of reclaiming time and productivity. A golden clock face (#E8B84A) with light expanding outward, or abstract representation of time being returned. Hours transforming into golden light. The feeling is liberation and reclaimed capacity. Deep charcoal background with energizing, productive illumination. Suitable for a personal productivity article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-choosing-ai-tools.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of smart tool selection and evaluation. Golden light (#E8B84A) passing through a lens or prism, revealing and separating true value from hype. Multiple options being illuminated with different intensities. The feeling is discernment and smart decision-making. Deep charcoal background with analytical, clarifying illumination. Suitable for an AI tool selection article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-future-proofing-ai.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of adaptability and future-readiness. Flowing golden light (#E8B84A) that adapts and flows around changing geometric obstacles, never getting stuck. Modular, flexible patterns of illumination. The feeling is resilience and adaptability. Deep charcoal background with dynamic, forward-looking illumination. Suitable for a future-proofing strategy article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  {
    filename: 'blog-ai-quick-wins.jpg',
    outputPath: 'public/images/blog',
    prompt: 'Abstract visualization of quick wins and immediate action. Five distinct bright golden sparks (#E8B84A) arranged dynamically, each ready to ignite into something larger. The feeling is momentum, speed, and immediate possibility. Deep charcoal background with energetic, action-oriented illumination. Suitable for a quick wins implementation article.',
    dimensions: '1200x630',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'blog',
  },
  
  // About Page Images
  {
    filename: 'team-photo.jpg',
    outputPath: 'public/images/about',
    prompt: 'Professional group photo of 6 people representing three families united by a shared mission. The group includes couples standing together warmly - conveying genuine connection and family bonds. Diverse ages and backgrounds, all with approachable, authentic expressions. Smart business casual attire. Warm, natural lighting suggesting golden hour. Background is an elegant, minimal space with warm earth tones. The mood is collaborative, genuine, and grounded - a team built on family values and shared purpose. High-quality editorial photography style, not overly corporate.',
    dimensions: '1200x800',
    size: '1792x1024',
    quality: 'hd',
    style: 'natural',
    category: 'about',
  },
  {
    filename: 'origin-story.jpg',
    outputPath: 'public/images/about',
    prompt: 'Abstract illustration representing the origin of "Light Brand Consulting" - three families uniting with a shared mission. Three distinct but harmonious flames or light sources in warm gold (#E8B84A), amber (#D4944C), and cream (#FDF6E3) converging at the center to form one brilliant, unified light. The visual metaphor of families coming together, each bringing unique gifts that combine into something greater. Perhaps subtle suggestion of intertwining paths leading to the central illumination. Dark charcoal background with warm, hopeful glow. The feeling is "built upon families that care - united by purpose." Sophisticated, symbolic, and warm.',
    dimensions: '600x400',
    size: '1024x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'about',
  },
  {
    filename: 'industries-collage.jpg',
    outputPath: 'public/images/about',
    prompt: 'Abstract collage or mosaic representing multiple industries served by an AI consulting firm. Eight interconnected abstract shapes, each with subtle visual hints of: healthcare (organic curves), finance (precise lines), e-commerce (flowing commerce), professional services (people shapes), manufacturing (geometric mechanics), media (flowing creativity), education (growth symbols), real estate (architectural forms). All rendered in warm golden (#E8B84A) and amber (#D4944C) light on charcoal background. Connected by subtle light threads suggesting shared principles across industries.',
    dimensions: '1000x400',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'about',
  },
  
  // Background Patterns
  {
    filename: 'pattern-light-particles.png',
    outputPath: 'public/images/patterns',
    prompt: 'Seamless abstract pattern of floating light particles on dark background. Soft bokeh-like circles of warm gold (#E8B84A) and amber (#D4944C) at various opacities floating on deep charcoal (#0F0F10). Some particles larger and softer, others smaller and sharper. The feeling is magical, premium, like dust catching sunlight. Subtle enough for text overlay, interesting enough to add depth. Tileable/seamless pattern.',
    dimensions: '1920x1080',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'patterns',
  },
  {
    filename: 'gradient-warm-glow.jpg',
    outputPath: 'public/images/patterns',
    prompt: 'Abstract gradient background with warm center glow. Deep charcoal (#0F0F10) at edges transitioning to subtle warm amber glow in center. Very subtle - 90% dark with just a hint of warmth emerging from center. Suitable as background for dark mode sections. Premium, sophisticated, not garish. The feeling is "light emerging from darkness."',
    dimensions: '1920x1080',
    size: '1792x1024',
    quality: 'hd',
    style: 'vivid',
    category: 'patterns',
  },
  {
    filename: 'texture-premium-paper.jpg',
    outputPath: 'public/images/patterns',
    prompt: 'Subtle premium paper texture in deep charcoal tones. Very slight grain and fiber texture suggesting high-quality letterpress paper or luxury stationery. Mostly uniform dark (#0F0F10 to #1A1A1C) with very subtle texture variation. Adds tactile depth without being distracting. Suitable for layering under content sections.',
    dimensions: '1920x1080',
    size: '1792x1024',
    quality: 'hd',
    style: 'natural',
    category: 'patterns',
  },
];

// Download image from URL
async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
          return;
        }
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete incomplete file
      reject(err);
    });
  });
}

// Generate a single image
async function generateImage(config: ImageConfig): Promise<boolean> {
  const outputDir = path.join(process.cwd(), config.outputPath);
  const outputFile = path.join(outputDir, config.filename);
  
  // Check if image already exists
  if (fs.existsSync(outputFile)) {
    console.log(`⏭️  Skipping ${config.filename} (already exists)`);
    return true;
  }
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log(`🎨 Generating ${config.filename}...`);
  
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: config.prompt,
      n: 1,
      size: config.size,
      quality: config.quality,
      style: config.style,
      response_format: 'url',
    });
    
    const imageUrl = response.data[0]?.url;
    
    if (!imageUrl) {
      console.error(`❌ No URL returned for ${config.filename}`);
      return false;
    }
    
    // Download the image
    await downloadImage(imageUrl, outputFile);
    console.log(`✅ Saved ${config.filename}`);
    return true;
    
  } catch (error: any) {
    console.error(`❌ Error generating ${config.filename}:`, error.message || error);
    return false;
  }
}

// Generate SVG icons (these need to be created manually or with a different approach)
async function generateSVGPlaceholders(): Promise<void> {
  const svgCategories = [
    { path: 'public/images/icons/values', files: ['value-radical-honesty.svg', 'value-outcome-obsession.svg', 'value-intellectual-humility.svg', 'value-client-independence.svg'] },
    { path: 'public/images/icons/process', files: ['process-discover.svg', 'process-illuminate.svg', 'process-activate.svg', 'process-book.svg', 'process-prepare.svg', 'process-connect.svg', 'process-receive.svg'] },
    { path: 'public/images/icons/industries', files: ['industry-healthcare.svg', 'industry-finance.svg', 'industry-ecommerce.svg', 'industry-professional.svg', 'industry-manufacturing.svg', 'industry-media.svg', 'industry-education.svg', 'industry-realestate.svg'] },
    { path: 'public/images/icons/contact', files: ['contact-speaking.svg', 'contact-media.svg', 'contact-partnerships.svg', 'success-confirmation.svg'] },
    { path: 'public/images/logo', files: ['logo-horizontal.svg', 'logo-icon.svg'] },
    { path: 'public/images/patterns', files: ['pattern-geometric-grid.svg'] },
  ];
  
  console.log('\n📝 Note: SVG files need to be created manually or with a vector graphics tool.');
  console.log('   DALL-E generates raster images only. Here are the SVG files needed:\n');
  
  for (const category of svgCategories) {
    console.log(`   ${category.path}/`);
    for (const file of category.files) {
      console.log(`     - ${file}`);
    }
  }
}

// Main execution
async function main(): Promise<void> {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  🌟 Light Brand Consulting - Image Generation Script');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY environment variable is not set.');
    console.log('\nPlease set your OpenAI API key:');
    console.log('  export OPENAI_API_KEY="your-api-key-here"');
    console.log('\nOr create a .env file with:');
    console.log('  OPENAI_API_KEY=your-api-key-here');
    process.exit(1);
  }
  
  console.log(`📊 Total images to generate: ${IMAGES_TO_GENERATE.length}`);
  console.log('───────────────────────────────────────────────────────────────\n');
  
  // Group images by category for organized output
  const categories = [...new Set(IMAGES_TO_GENERATE.map(img => img.category))];
  
  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;
  
  for (const category of categories) {
    const categoryImages = IMAGES_TO_GENERATE.filter(img => img.category === category);
    console.log(`\n📁 ${category.toUpperCase()} (${categoryImages.length} images)`);
    console.log('───────────────────────────────────────────────────────────────');
    
    for (const imageConfig of categoryImages) {
      const outputFile = path.join(process.cwd(), imageConfig.outputPath, imageConfig.filename);
      
      if (fs.existsSync(outputFile)) {
        console.log(`⏭️  Skipping ${imageConfig.filename} (already exists)`);
        skipCount++;
        continue;
      }
      
      const success = await generateImage(imageConfig);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      // Add a delay between API calls to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Print summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  📊 Generation Summary');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  ✅ Successfully generated: ${successCount}`);
  console.log(`  ⏭️  Skipped (already exist): ${skipCount}`);
  console.log(`  ❌ Failed: ${failCount}`);
  console.log(`  📁 Total processed: ${successCount + skipCount + failCount}`);
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  // Note about SVGs
  await generateSVGPlaceholders();
  
  console.log('\n✨ Image generation complete!');
  console.log('\nNext steps:');
  console.log('  1. Review the generated images in public/images/');
  console.log('  2. Create SVG icons manually or with a vector tool');
  console.log('  3. Run the dev server to preview: npm run dev');
}

main().catch(console.error);

