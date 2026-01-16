/**
 * Brand Registry
 *
 * Central export for all brand configurations.
 * Import brands from this file to access their tokens, themes, and metadata.
 */

import * as unifiedSanctuaries from './unified-sanctuaries';
import * as aiTechnology from './ai-technology';
import * as hospitality from './hospitality';
import * as healthcareWellness from './healthcare-wellness';
import * as tourismTravel from './tourism-travel';
import * as realEstateEnergy from './real-estate-energy';
import * as creativeProfessional from './creative-professional';
import * as communitySocial from './community-social';

export const brands = {
  'unified-sanctuaries': unifiedSanctuaries,
  'ai-technology': aiTechnology,
  'hospitality': hospitality,
  'healthcare-wellness': healthcareWellness,
  'tourism-travel': tourismTravel,
  'real-estate-energy': realEstateEnergy,
  'creative-professional': creativeProfessional,
  'community-social': communitySocial,
} as const;

export type BrandId = keyof typeof brands;

export function getBrand(brandId: BrandId) {
  return brands[brandId];
}

export function getBrandConfig(brandId: BrandId) {
  return brands[brandId]?.brandConfig;
}

export function getBrandTheme(brandId: BrandId) {
  return brands[brandId]?.theme;
}

export function getBrandTokens(brandId: BrandId) {
  return brands[brandId]?.tokens;
}

// Re-export all brands
export {
  unifiedSanctuaries,
  aiTechnology,
  hospitality,
  healthcareWellness,
  tourismTravel,
  realEstateEnergy,
  creativeProfessional,
  communitySocial,
};

export default brands;
