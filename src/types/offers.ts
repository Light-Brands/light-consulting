/**
 * Offer Type Definitions
 * Light Brand Consulting
 *
 * Service offers and offer ladder progression
 */

export interface Offer {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  tier: number;
  tier_label: string | null;
  target_audience: string | null;
  qualifying_criteria: string | null;
  price_range: string | null;
  deliverables: string[] | null;
  funnel_route: string | null;
  is_active: boolean;
  is_invite_only: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface OfferInsert {
  name: string;
  slug: string;
  description?: string | null;
  tier?: number;
  tier_label?: string | null;
  target_audience?: string | null;
  qualifying_criteria?: string | null;
  price_range?: string | null;
  deliverables?: string[] | null;
  funnel_route?: string | null;
  is_active?: boolean;
  is_invite_only?: boolean;
  sort_order?: number;
}

export interface OfferUpdate {
  name?: string;
  slug?: string;
  description?: string | null;
  tier?: number;
  tier_label?: string | null;
  target_audience?: string | null;
  qualifying_criteria?: string | null;
  price_range?: string | null;
  deliverables?: string[] | null;
  funnel_route?: string | null;
  is_active?: boolean;
  is_invite_only?: boolean;
  sort_order?: number;
}

export interface OffersApiResponse {
  data: Offer[] | null;
  error: string | null;
}

export interface OfferApiResponse {
  data: Offer | null;
  error: string | null;
}

// Tier color configuration
export const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Entry': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'Core': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'Premium': { bg: 'bg-radiance-gold/10', text: 'text-radiance-gold', border: 'border-radiance-gold/30' },
  'Elite': { bg: 'bg-gradient-to-r from-amber-500/10 to-orange-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
};

export function getTierColor(tierLabel: string | null) {
  return TIER_COLORS[tierLabel || 'Entry'] || TIER_COLORS['Entry'];
}
