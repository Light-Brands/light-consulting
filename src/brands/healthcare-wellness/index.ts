/**
 * Healthcare & Wellness Brand
 *
 * Brand configuration for healthcare, wellness, and healing projects.
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
  id: 'healthcare-wellness',
  name: 'Healthcare & Wellness',
  tagline: 'Nurturing Health, Empowering Lives',
  description:
    'Digital solutions for healthcare and wellness that prioritize patient care, accessibility, and holistic well-being. From medical platforms to consciousness education.',
  social: {
    linkedin: 'LightBrandConsulting',
  },
  contact: {
    email: 'health@lightbrandconsulting.com',
  },
};

export default brandConfig;
