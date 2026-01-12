/**
 * Community & Social Brand
 *
 * Brand configuration for community platforms and social initiatives.
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
  id: 'community-social',
  name: 'Community & Social',
  tagline: 'Connecting People, Creating Impact',
  description:
    'Building digital communities and social platforms that foster genuine connections, drive positive change, and create meaningful impact.',
  social: {
    instagram: '@lightcommunity',
    twitter: '@lightcommunity',
  },
  contact: {
    email: 'community@lightbrandconsulting.com',
  },
};

export default brandConfig;
