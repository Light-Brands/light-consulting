/**
 * Design System Tokens
 * Light Brand Consulting
 * 
 * Core design tokens that define the visual language of the application.
 * These tokens are extracted from the existing codebase and organized for
 * consistency and reusability.
 */

import { DesignTokens } from './types';

export const tokens: DesignTokens = {
  // ==========================================================================
  // COLOR TOKENS - Warm Minimal Palette
  // ==========================================================================
  colors: {
    // Radiance Scale (Primary Accent) - Refined gold for light backgrounds
    radiance: {
      gold: '#C9940A',    // Primary brand gold - deeper for contrast
      amber: '#B8860B',   // Darker gold for hover states
      warm: '#A67508',    // Warmest gold variation
    },

    // Clarity Scale (Secondary Accent) - Warm neutrals
    clarity: {
      cream: '#FDF6E3',   // Lightest cream
      soft: '#F5E6C8',    // Soft cream
      muted: '#E8DCC4',   // Muted warm tone
    },

    // Wisdom Scale (AI Features) - Adjusted for light mode
    wisdom: {
      violet: '#6B5CA8',  // Primary wisdom violet - deeper
      soft: '#8577C4',    // Lighter violet
      muted: '#5A4D98',   // Deeper violet
    },

    // Depth Scale (Backgrounds) - Warm light backgrounds
    depth: {
      base: '#FAFAF8',      // Warm white body background
      elevated: '#FFFFFF',   // Pure white for elevated surfaces
      surface: '#F5F4F2',    // Warm light gray for cards
      border: '#E8E6E3',     // Soft warm border
    },

    // Text Scale - Warm dark text (optimized for light backgrounds)
    text: {
      primary: '#1A1918',    // Warm near-black for primary text
      secondary: '#3D3A38',  // Darker warm gray for better readability
      muted: '#5C5956',      // Darker muted for WCAG AA compliance
    },

    // Semantic Colors - Adjusted for light backgrounds
    semantic: {
      success: '#16A34A',  // Green for success states
      warning: '#D97706',  // Orange for warning states
      error: '#DC2626',    // Red for error states
      info: '#0284C7',     // Blue for informational states
    },
  },

  // ==========================================================================
  // TYPOGRAPHY TOKENS
  // ==========================================================================
  typography: {
    // Font Families
    fontFamily: {
      display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
      heading: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
      body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },

    // Font Sizes with Line Heights
    fontSize: {
      xs: {
        value: '0.75rem',      // 12px
        lineHeight: '1rem',    // 16px
      },
      sm: {
        value: '0.875rem',     // 14px
        lineHeight: '1.25rem', // 20px
      },
      base: {
        value: '1rem',         // 16px
        lineHeight: '1.5rem',  // 24px
      },
      lg: {
        value: '1.125rem',     // 18px
        lineHeight: '1.75rem', // 28px
      },
      xl: {
        value: '1.25rem',      // 20px
        lineHeight: '1.75rem', // 28px
      },
      '2xl': {
        value: '1.5rem',       // 24px
        lineHeight: '2rem',    // 32px
      },
      '3xl': {
        value: '1.875rem',     // 30px
        lineHeight: '2.25rem', // 36px
      },
      '4xl': {
        value: '2.25rem',      // 36px
        lineHeight: '2.5rem',  // 40px
      },
      '5xl': {
        value: '3rem',         // 48px
        lineHeight: '1',       // 48px
      },
      '6xl': {
        value: '3.75rem',      // 60px
        lineHeight: '1',       // 60px
      },
      '7xl': {
        value: '4.5rem',       // 72px
        lineHeight: '1',       // 72px
      },
      '8xl': {
        value: '6rem',         // 96px
        lineHeight: '1',       // 96px
      },
      '9xl': {
        value: '8rem',         // 128px
        lineHeight: '1',       // 128px
      },
    },

    // Font Weights
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    // Line Heights
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },

    // Letter Spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // ==========================================================================
  // SPACING TOKENS
  // Based on 4px base unit (0.25rem)
  // ==========================================================================
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    11: '2.75rem',    // 44px
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    44: '11rem',      // 176px
    48: '12rem',      // 192px
    52: '13rem',      // 208px
    56: '14rem',      // 224px
    60: '15rem',      // 240px
    64: '16rem',      // 256px
    72: '18rem',      // 288px
    80: '20rem',      // 320px
    96: '24rem',      // 384px
  },

  // ==========================================================================
  // BORDER RADIUS TOKENS
  // ==========================================================================
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
    // Brand-specific radii
    'brand-btn': '0.75rem',    // 12px - Button radius
    'brand-card': '1rem',      // 16px - Card radius
    'brand-modal': '1.25rem',  // 20px - Modal radius
  },

  // ==========================================================================
  // BORDER WIDTH TOKENS
  // ==========================================================================
  borderWidth: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
    DEFAULT: '1px',
  },

  // ==========================================================================
  // SHADOW TOKENS - Optimized for light backgrounds
  // ==========================================================================
  shadows: {
    // Standard shadows
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',

    // Brand-specific shadows - subtle for light mode
    subtle: '0 2px 8px rgba(0, 0, 0, 0.06)',
    elevated: '0 4px 20px rgba(0, 0, 0, 0.08)',
    floating: '0 8px 30px rgba(0, 0, 0, 0.12)',

    // Colored glow shadows - refined for light mode
    illumination: '0 4px 20px rgba(201, 148, 10, 0.15)',
    'illumination-intense': '0 4px 30px rgba(201, 148, 10, 0.25)',
    wisdom: '0 4px 20px rgba(107, 92, 168, 0.15)',
    clarity: '0 4px 15px rgba(0, 0, 0, 0.08)',
  },

  // ==========================================================================
  // BREAKPOINT TOKENS
  // ==========================================================================
  breakpoints: {
    xs: '475px',   // Extra small devices
    sm: '640px',   // Small devices (mobile landscape)
    md: '768px',   // Medium devices (tablets)
    lg: '1024px',  // Large devices (laptops)
    xl: '1280px',  // Extra large devices (desktops)
    '2xl': '1536px', // 2x Extra large (large desktops)
  },

  // ==========================================================================
  // ANIMATION TOKENS
  // ==========================================================================
  animation: {
    duration: {
      fast: '150ms',
      base: '300ms',
      slow: '500ms',
      slower: '800ms',
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    keyframes: {
      'fade-in': 'fadeIn 0.6s ease-out forwards',
      'slide-up': 'slideUp 0.8s ease-out forwards',
      'float': 'float 6s infinite ease-in-out',
      'illuminate-pulse': 'illuminatePulse 4s infinite ease-in-out',
      'spin': 'spin 1s linear infinite',
    },
  },

  // ==========================================================================
  // Z-INDEX TOKENS
  // ==========================================================================
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    // Named layers for semantic clarity
    base: '0',
    dropdown: '1000',
    sticky: '1100',
    fixed: '1200',
    'modal-backdrop': '1300',
    modal: '1400',
    popover: '1500',
    tooltip: '1600',
  },
};

// ==========================================================================
// COMPONENT-SPECIFIC TOKENS
// ==========================================================================

export const componentTokens = {
  button: {
    borderRadius: tokens.borderRadius['brand-btn'],
    fontSize: {
      sm: tokens.typography.fontSize.xs.value,
      md: tokens.typography.fontSize.sm.value,
      lg: tokens.typography.fontSize.base.value,
      xl: tokens.typography.fontSize.lg.value,
    },
    padding: {
      sm: { x: tokens.spacing[4], y: tokens.spacing[2] },
      md: { x: tokens.spacing[6], y: tokens.spacing[3] },
      lg: { x: tokens.spacing[8], y: tokens.spacing[4] },
      xl: { x: tokens.spacing[10], y: tokens.spacing[5] },
    },
    height: {
      sm: '2rem',     // 32px
      md: '2.75rem',  // 44px
      lg: '3.25rem',  // 52px
      xl: '3.75rem',  // 60px
    },
  },
  input: {
    borderRadius: tokens.borderRadius['brand-btn'],
    fontSize: tokens.typography.fontSize.sm.value,
    padding: { x: tokens.spacing[4], y: tokens.spacing[3.5] },
    height: '3.25rem', // 52px
  },
  card: {
    borderRadius: tokens.borderRadius['brand-card'],
    padding: tokens.spacing[6], // 24px
  },
};

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

/**
 * Get a color token by path
 * @example getColor('radiance.gold') => '#E8B84A'
 */
export function getColor(path: string): string {
  const parts = path.split('.');
  let value: any = tokens.colors;
  
  for (const part of parts) {
    value = value[part];
    if (!value) {
      console.warn(`Color token not found: ${path}`);
      return '';
    }
  }
  
  return value;
}

/**
 * Get a spacing token
 * @example getSpacing(4) => '1rem'
 */
export function getSpacing(key: keyof typeof tokens.spacing): string {
  return tokens.spacing[key];
}

/**
 * Get a shadow token
 * @example getShadow('illumination') => '0 0 30px rgba(232, 184, 74, 0.25)'
 */
export function getShadow(key: keyof typeof tokens.shadows): string {
  return tokens.shadows[key];
}

/**
 * Convert hex color to rgba
 * @example hexToRgba('#E8B84A', 0.5) => 'rgba(232, 184, 74, 0.5)'
 */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Export default for convenience
export default tokens;
