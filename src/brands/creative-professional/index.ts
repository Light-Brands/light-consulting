/**
 * Creative & Professional Brand
 *
 * Brand configuration for creative studios and professional services.
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
  id: 'creative-professional',
  name: 'Creative & Professional',
  tagline: 'Excellence in Every Detail',
  description:
    'Empowering creative studios and professional services with distinctive digital presence. From portfolios to consulting platforms, we deliver excellence.',
  social: {
    instagram: '@lightcreative',
    linkedin: 'LightBrandConsulting',
  },
  contact: {
    email: 'creative@lightbrandconsulting.com',
  },
};

export default brandConfig;
