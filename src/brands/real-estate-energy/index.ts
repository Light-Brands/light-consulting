/**
 * Real Estate & Energy Brand
 *
 * Brand configuration for property development and renewable energy projects.
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
  id: 'real-estate-energy',
  name: 'Real Estate & Energy',
  tagline: 'Building Tomorrow, Sustainably',
  description:
    'Digital solutions for real estate development and renewable energy that combine innovation with sustainability. From property platforms to solar solutions.',
  social: {
    linkedin: 'LightBrandConsulting',
  },
  contact: {
    email: 'property@lightbrandconsulting.com',
  },
};

export default brandConfig;
