/**
 * Brand Registry
 *
 * Central export for all brand configurations.
 * Import brands from this file to access their tokens, themes, and metadata.
 */

import * as unifiedSanctuaries from './unified-sanctuaries';

export const brands = {
  'unified-sanctuaries': unifiedSanctuaries,
} as const;

export type BrandId = keyof typeof brands;

export function getBrand(brandId: BrandId) {
  return brands[brandId];
}

export { unifiedSanctuaries };
export default brands;
