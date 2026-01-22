/**
 * Shared CVA Variants
 * Light Brand Consulting Design System
 *
 * Centralized variant presets for consistent component styling across the design system.
 * These are additive - existing components continue to work unchanged.
 */

// ============================================================================
// Semantic Color Variants
// Use for components that need semantic meaning (alerts, badges, status indicators)
// ============================================================================

export const semanticColorVariants = {
  default: [
    'bg-depth-surface',
    'text-text-primary',
    'border-depth-border',
  ],
  premium: [
    'bg-radiance-gold/10',
    'text-radiance-gold',
    'border-radiance-gold/30',
  ],
  wisdom: [
    'bg-wisdom-violet/10',
    'text-wisdom-violet',
    'border-wisdom-violet/30',
  ],
  success: [
    'bg-success/10',
    'text-success',
    'border-success/30',
  ],
  warning: [
    'bg-warning/10',
    'text-warning',
    'border-warning/30',
  ],
  error: [
    'bg-error/10',
    'text-error',
    'border-error/30',
  ],
  info: [
    'bg-info/10',
    'text-info',
    'border-info/30',
  ],
} as const;

// ============================================================================
// Solid Color Variants
// Use for buttons, badges, and other components needing solid backgrounds
// ============================================================================

export const solidColorVariants = {
  primary: [
    'bg-gradient-to-br from-radiance-gold to-radiance-amber',
    'text-depth-base',
    'border-transparent',
  ],
  secondary: [
    'bg-depth-surface',
    'text-text-primary',
    'border-depth-border',
  ],
  danger: [
    'bg-error',
    'text-text-primary',
    'border-transparent',
  ],
  success: [
    'bg-success',
    'text-text-primary',
    'border-transparent',
  ],
} as const;

// ============================================================================
// Standard Sizes
// Consistent sizing across buttons, inputs, badges, etc.
// ============================================================================

export const standardSizes = {
  sm: {
    padding: 'px-3 py-1.5',
    text: 'text-xs',
    height: 'h-8',
    gap: 'gap-1.5',
  },
  md: {
    padding: 'px-4 py-2',
    text: 'text-sm',
    height: 'h-10',
    gap: 'gap-2',
  },
  lg: {
    padding: 'px-6 py-3',
    text: 'text-base',
    height: 'h-12',
    gap: 'gap-2.5',
  },
  xl: {
    padding: 'px-8 py-4',
    text: 'text-lg',
    height: 'h-14',
    gap: 'gap-3',
  },
} as const;

// ============================================================================
// Elevation Variants
// Box shadow and background combinations for depth perception
// ============================================================================

export const elevationVariants = {
  none: [
    'shadow-none',
    'bg-transparent',
  ],
  subtle: [
    'shadow-subtle',
    'bg-depth-elevated',
  ],
  elevated: [
    'shadow-elevated',
    'bg-depth-surface',
  ],
  floating: [
    'shadow-floating',
    'bg-depth-surface',
  ],
} as const;

// ============================================================================
// Shared Base Styles
// Common styles to ensure consistency across all components
// ============================================================================

/** Focus ring styles for keyboard accessibility */
export const focusRingStyles = [
  'focus:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-radiance-gold/20',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-depth-base',
] as const;

/** Disabled state styles */
export const disabledStyles = [
  'disabled:opacity-40',
  'disabled:cursor-not-allowed',
  'disabled:pointer-events-none',
] as const;

/** Standard transition styles */
export const transitionStyles = [
  'transition-all',
  'duration-300',
  'ease-out',
] as const;

/** Interactive hover effect (subtle scale) */
export const hoverScaleStyles = [
  'hover:scale-[1.02]',
  'active:scale-[0.98]',
] as const;

/** Combined interactive styles (focus + disabled + transition) */
export const interactiveStyles = [
  ...focusRingStyles,
  ...disabledStyles,
  ...transitionStyles,
] as const;

// ============================================================================
// Border Radius Presets
// ============================================================================

export const radiusVariants = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
  button: 'rounded-brand-btn',
  card: 'rounded-brand-card',
  modal: 'rounded-brand-modal',
} as const;

// ============================================================================
// Glow Effects
// Brand-specific glow effects for emphasis
// ============================================================================

export const glowVariants = {
  none: '',
  illumination: 'shadow-illumination',
  'illumination-intense': 'shadow-[0_0_40px_rgba(232,184,74,0.35)]',
  wisdom: 'shadow-wisdom',
  clarity: 'shadow-clarity',
} as const;

// ============================================================================
// Type Helpers
// ============================================================================

export type SemanticColor = keyof typeof semanticColorVariants;
export type SolidColor = keyof typeof solidColorVariants;
export type StandardSize = keyof typeof standardSizes;
export type Elevation = keyof typeof elevationVariants;
export type Radius = keyof typeof radiusVariants;
export type Glow = keyof typeof glowVariants;
