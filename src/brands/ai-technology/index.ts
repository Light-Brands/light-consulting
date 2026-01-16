/**
 * AI & Technology Brand
 *
 * Brand configuration for AI, machine learning, and technology projects.
 */

export * from './theme';
export * from './tokens';

export interface BrandConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain?: string;
  social?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

export const brandConfig: BrandConfig = {
  id: 'ai-technology',
  name: 'AI & Technology',
  tagline: 'Intelligent Solutions for Tomorrow',
  description:
    'Cutting-edge AI and technology solutions that transform businesses through intelligent automation, machine learning, and innovative digital experiences. From predictive analytics to AI-powered platforms.',
  domain: 'light-brand-consulting.vercel.app',
  social: {
    linkedin: 'LightBrandConsulting',
  },
  contact: {
    email: 'ai@lightbrandconsulting.com',
  },
};

export default brandConfig;
