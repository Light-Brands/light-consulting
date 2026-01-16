/**
 * Hospitality Brand
 *
 * Brand configuration for hotels, restaurants, and hospitality projects.
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
  id: 'hospitality',
  name: 'Hospitality',
  tagline: 'Exceptional Experiences, Elevated',
  description:
    'Creating memorable hospitality experiences through innovative digital solutions. From boutique hotels to luxury lounges, we help hospitality brands deliver exceptional guest experiences.',
  social: {
    instagram: '@lighthospitality',
  },
  contact: {
    email: 'hospitality@lightbrandconsulting.com',
  },
};

export default brandConfig;
