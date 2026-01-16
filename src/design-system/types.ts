/**
 * Design System Types
 * Light Brand Consulting
 * 
 * TypeScript type definitions for the design system tokens and theme configuration
 */

// ============================================================================
// Color Types
// ============================================================================

export interface ColorScale {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  DEFAULT?: string;
}

export interface BrandColors {
  radiance: {
    gold: string;
    amber: string;
    warm: string;
  };
  clarity: {
    cream: string;
    soft: string;
    muted: string;
  };
  wisdom: {
    violet: string;
    soft: string;
    muted: string;
  };
  depth: {
    base: string;
    elevated: string;
    surface: string;
    border: string;
  };
}

export interface TextColors {
  primary: string;
  secondary: string;
  muted: string;
}

export interface SemanticColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ColorTokens extends BrandColors {
  text: TextColors;
  semantic: SemanticColors;
}

// ============================================================================
// Typography Types
// ============================================================================

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface FontFamily {
  display: string[];
  heading: string[];
  body: string[];
  mono?: string[];
}

export interface FontSize {
  value: string;
  lineHeight: string;
  letterSpacing?: string;
}

export interface TypographyScale {
  xs: FontSize;
  sm: FontSize;
  base: FontSize;
  lg: FontSize;
  xl: FontSize;
  '2xl': FontSize;
  '3xl': FontSize;
  '4xl': FontSize;
  '5xl': FontSize;
  '6xl': FontSize;
  '7xl': FontSize;
  '8xl': FontSize;
  '9xl': FontSize;
}

export interface TypographyTokens {
  fontFamily: FontFamily;
  fontSize: TypographyScale;
  fontWeight: {
    thin: FontWeight;
    extralight: FontWeight;
    light: FontWeight;
    normal: FontWeight;
    medium: FontWeight;
    semibold: FontWeight;
    bold: FontWeight;
    extrabold: FontWeight;
    black: FontWeight;
  };
  lineHeight: {
    none: string;
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
}

// ============================================================================
// Spacing Types
// ============================================================================

export interface SpacingScale {
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

// ============================================================================
// Border & Radius Types
// ============================================================================

export interface BorderRadius {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
  // Brand-specific
  'brand-btn': string;
  'brand-card': string;
  'brand-modal': string;
}

export interface BorderWidth {
  0: string;
  1: string;
  2: string;
  4: string;
  8: string;
  DEFAULT: string;
}

// ============================================================================
// Shadow Types
// ============================================================================

export interface ShadowTokens {
  // Standard shadows
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  // Brand-specific shadows
  subtle: string;
  elevated: string;
  floating: string;
  illumination: string;
  'illumination-intense': string;
  wisdom: string;
  clarity: string;
}

// ============================================================================
// Breakpoint Types
// ============================================================================

export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// ============================================================================
// Animation Types
// ============================================================================

export interface AnimationTokens {
  duration: {
    fast: string;
    base: string;
    slow: string;
    slower: string;
  };
  easing: {
    linear: string;
    in: string;
    out: string;
    'in-out': string;
  };
  keyframes: {
    'fade-in': string;
    'slide-up': string;
    'float': string;
    'illuminate-pulse': string;
    'spin': string;
  };
}

// ============================================================================
// Z-Index Types
// ============================================================================

export interface ZIndexTokens {
  auto: string;
  0: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  // Named layers
  base: string;
  dropdown: string;
  sticky: string;
  fixed: string;
  'modal-backdrop': string;
  modal: string;
  popover: string;
  tooltip: string;
}

// ============================================================================
// Design Tokens (Complete)
// ============================================================================

export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingScale;
  borderRadius: BorderRadius;
  borderWidth: BorderWidth;
  shadows: ShadowTokens;
  breakpoints: Breakpoints;
  animation: AnimationTokens;
  zIndex: ZIndexTokens;
}

// ============================================================================
// Theme Types
// ============================================================================

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  tokens: DesignTokens;
}

// ============================================================================
// Component Token Types
// ============================================================================

export interface ComponentTokens {
  button: {
    borderRadius: string;
    fontSize: Record<'sm' | 'md' | 'lg' | 'xl', string>;
    padding: Record<'sm' | 'md' | 'lg' | 'xl', { x: string; y: string }>;
    height: Record<'sm' | 'md' | 'lg' | 'xl', string>;
  };
  input: {
    borderRadius: string;
    fontSize: string;
    padding: { x: string; y: string };
    height: string;
  };
  card: {
    borderRadius: string;
    padding: string;
  };
}
