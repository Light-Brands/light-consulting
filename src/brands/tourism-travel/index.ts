/**
 * Tourism & Travel Brand
 *
 * Brand configuration for tourism, travel, and destination projects.
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
  id: 'tourism-travel',
  name: 'Tourism & Travel',
  tagline: 'Discover, Explore, Experience',
  description:
    'Inspiring travel and tourism through digital excellence. From destination marketing to booking platforms, we help tourism brands create unforgettable journey experiences.',
  social: {
    instagram: '@lighttravel',
  },
  contact: {
    email: 'tourism@lightbrandconsulting.com',
  },
};

export default brandConfig;
