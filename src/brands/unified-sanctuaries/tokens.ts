/**
 * Design System Tokens
 * Unified Sanctuaries Brand
 *
 * Core design tokens that define the visual language for Unified Sanctuaries.
 * A holistic wellness and sanctuary brand emphasizing peace, harmony, and unity.
 */

import { DesignTokens } from '../../design-system/types';

export const unifiedSanctuariesTokens: DesignTokens = {
  // ==========================================================================
  // COLOR TOKENS
  // ==========================================================================
  colors: {
    // Radiance Scale (Primary Accent) - Serenity, soft sage/green tones
    radiance: {
      gold: '#7BA88C',    // Primary sage green - represents growth and healing
      amber: '#5E9B6F',   // Deeper sage - grounding
      warm: '#4A8A5C',    // Forest green - connection to nature
    },

    // Clarity Scale (Secondary Accent) - Pure light, soft whites/creams
    clarity: {
      cream: '#F9FAF8',   // Lightest sage-tinted white
      soft: '#EEF2EC',    // Soft sage cream
      muted: '#D4DED4',   // Muted sage for subtle accents
    },

    // Wisdom Scale (AI Features) - Tranquility, soft blue/teal tones
    wisdom: {
      violet: '#6BA8B8',  // Primary tranquil teal
      soft: '#8FC0CD',    // Lighter teal
      muted: '#5A969F',   // Deeper teal
    },

    // Depth Scale (Backgrounds) - Warm sanctuary tones
    depth: {
      base: '#1A1F1C',      // Deep sanctuary green-black
      elevated: '#212823',   // Slightly elevated surfaces
      surface: '#2A332C',    // Card surfaces
      border: '#3D483F',     // Border color
    },

    // Text Scale - Soft natural tones
    text: {
      primary: '#F5F7F5',    // Primary text
      secondary: '#E0E5E0',  // Secondary text
      muted: '#A0ABA0',      // Muted text
    },

    // Semantic Colors - Feedback and state
    semantic: {
      success: '#68B37A',  // Green for success states
      warning: '#D4A85A',  // Amber for warning states
      error: '#C96A6A',    // Soft red for error states
      info: '#6AA8C9',     // Blue for informational states
    },
  },

  // ==========================================================================
  // TYPOGRAPHY TOKENS
  // ==========================================================================
  typography: {
    // Font Families - Elegant and readable
    fontFamily: {
      display: ['Playfair Display', 'Georgia', 'serif'],
      heading: ['Lora', 'Georgia', 'serif'],
      body: ['Source Sans Pro', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },

    // Font Sizes with Line Heights
    fontSize: {
      xs: {
        value: '0.75rem',
        lineHeight: '1rem',
      },
      sm: {
        value: '0.875rem',
        lineHeight: '1.25rem',
      },
      base: {
        value: '1rem',
        lineHeight: '1.5rem',
      },
      lg: {
        value: '1.125rem',
        lineHeight: '1.75rem',
      },
      xl: {
        value: '1.25rem',
        lineHeight: '1.75rem',
      },
      '2xl': {
        value: '1.5rem',
        lineHeight: '2rem',
      },
      '3xl': {
        value: '1.875rem',
        lineHeight: '2.25rem',
      },
      '4xl': {
        value: '2.25rem',
        lineHeight: '2.5rem',
      },
      '5xl': {
        value: '3rem',
        lineHeight: '1',
      },
      '6xl': {
        value: '3.75rem',
        lineHeight: '1',
      },
      '7xl': {
        value: '4.5rem',
        lineHeight: '1',
      },
      '8xl': {
        value: '6rem',
        lineHeight: '1',
      },
      '9xl': {
        value: '8rem',
        lineHeight: '1',
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
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  // ==========================================================================
  // BORDER RADIUS TOKENS
  // ==========================================================================
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
    // Brand-specific radii - softer, more organic
    'brand-btn': '0.5rem',
    'brand-card': '1.25rem',
    'brand-modal': '1.5rem',
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
  // SHADOW TOKENS
  // ==========================================================================
  shadows: {
    // Standard shadows
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

    // Brand-specific shadows - softer and more natural
    subtle: '0 2px 8px rgba(26, 31, 28, 0.2)',
    elevated: '0 4px 24px rgba(26, 31, 28, 0.3)',
    floating: '0 8px 40px rgba(26, 31, 28, 0.4)',

    // Colored glow shadows
    illumination: '0 0 30px rgba(123, 168, 140, 0.2)',
    'illumination-intense': '0 0 40px rgba(123, 168, 140, 0.3)',
    wisdom: '0 0 30px rgba(107, 168, 184, 0.2)',
    clarity: '0 0 20px rgba(249, 250, 248, 0.1)',
  },

  // ==========================================================================
  // BREAKPOINT TOKENS
  // ==========================================================================
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
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
      'illuminate-pulse': 'sanctuaryPulse 4s infinite ease-in-out',
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

export default unifiedSanctuariesTokens;
