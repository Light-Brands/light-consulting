/**
 * Unified Sanctuaries Brand
 *
 * A holistic wellness and sanctuary brand emphasizing peace, harmony, and unity.
 * This brand configuration provides all design tokens, themes, and brand metadata.
 */

export * from './tokens';
export * from './theme';

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
  id: 'unified-sanctuaries',
  name: 'Unified Sanctuaries',
  tagline: 'Where Peace Finds Purpose',
  description:
    'Unified Sanctuaries creates transformative spaces and experiences that nurture mind, body, and spirit. We bring together ancient wisdom and modern wellness practices to help individuals and communities find balance, healing, and connection.',
  domain: 'unifiedsanctuaries.com',
  social: {
    instagram: '@unifiedsanctuaries',
    facebook: 'UnifiedSanctuaries',
  },
  contact: {
    email: 'hello@unifiedsanctuaries.com',
  },
};

export default brandConfig;
