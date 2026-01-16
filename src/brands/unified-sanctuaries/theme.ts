/**
 * Theme Configuration
 * Unified Sanctuaries Brand
 *
 * Theme system for managing light/dark modes and applying design tokens
 */

import { Theme, ThemeMode } from '../../design-system/types';
import { unifiedSanctuariesTokens } from './tokens';

// ==========================================================================
// THEME DEFINITIONS
// ==========================================================================

/**
 * Dark Theme (Primary for Unified Sanctuaries)
 * A calming sanctuary atmosphere with deep natural tones
 */
export const darkTheme: Theme = {
  mode: 'dark',
  tokens: unifiedSanctuariesTokens,
};

/**
 * Light Theme
 * A bright, airy sanctuary feel with soft natural tones
 */
export const lightTheme: Theme = {
  mode: 'light',
  tokens: {
    ...unifiedSanctuariesTokens,
    colors: {
      ...unifiedSanctuariesTokens.colors,
      depth: {
        base: '#F9FAF8',
        elevated: '#FFFFFF',
        surface: '#EEF2EC',
        border: '#D4DED4',
      },
      text: {
        primary: '#1A1F1C',
        secondary: '#2A332C',
        muted: '#5A6B5C',
      },
    },
  },
};

// ==========================================================================
// THEME MANAGEMENT
// ==========================================================================

export const defaultTheme = darkTheme;

export function getTheme(mode: ThemeMode = 'dark'): Theme {
  return mode === 'dark' ? darkTheme : lightTheme;
}

// ==========================================================================
// CSS VARIABLE GENERATION
// ==========================================================================

export function generateCSSVariables(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {};

  // Color variables
  vars['--color-radiance-gold'] = theme.tokens.colors.radiance.gold;
  vars['--color-radiance-amber'] = theme.tokens.colors.radiance.amber;
  vars['--color-radiance-warm'] = theme.tokens.colors.radiance.warm;

  vars['--color-clarity-cream'] = theme.tokens.colors.clarity.cream;
  vars['--color-clarity-soft'] = theme.tokens.colors.clarity.soft;
  vars['--color-clarity-muted'] = theme.tokens.colors.clarity.muted;

  vars['--color-wisdom-violet'] = theme.tokens.colors.wisdom.violet;
  vars['--color-wisdom-soft'] = theme.tokens.colors.wisdom.soft;
  vars['--color-wisdom-muted'] = theme.tokens.colors.wisdom.muted;

  vars['--color-depth-base'] = theme.tokens.colors.depth.base;
  vars['--color-depth-elevated'] = theme.tokens.colors.depth.elevated;
  vars['--color-depth-surface'] = theme.tokens.colors.depth.surface;
  vars['--color-depth-border'] = theme.tokens.colors.depth.border;

  vars['--color-text-primary'] = theme.tokens.colors.text.primary;
  vars['--color-text-secondary'] = theme.tokens.colors.text.secondary;
  vars['--color-text-muted'] = theme.tokens.colors.text.muted;

  vars['--color-success'] = theme.tokens.colors.semantic.success;
  vars['--color-warning'] = theme.tokens.colors.semantic.warning;
  vars['--color-error'] = theme.tokens.colors.semantic.error;
  vars['--color-info'] = theme.tokens.colors.semantic.info;

  // Typography variables
  vars['--font-display'] = theme.tokens.typography.fontFamily.display.join(', ');
  vars['--font-heading'] = theme.tokens.typography.fontFamily.heading.join(', ');
  vars['--font-body'] = theme.tokens.typography.fontFamily.body.join(', ');

  return vars;
}

// ==========================================================================
// BRAND GRADIENTS
// ==========================================================================

export const brandGradients = {
  // Sanctuary gradient - calming sage to teal
  sanctuary: `linear-gradient(135deg, ${unifiedSanctuariesTokens.colors.radiance.gold} 0%, ${unifiedSanctuariesTokens.colors.wisdom.violet} 100%)`,
  // Nature gradient - forest tones
  nature: `linear-gradient(180deg, ${unifiedSanctuariesTokens.colors.depth.base} 0%, ${unifiedSanctuariesTokens.colors.depth.surface} 50%, ${unifiedSanctuariesTokens.colors.depth.border} 100%)`,
  // Serenity fade - soft sage overlay
  serenityFade: `linear-gradient(180deg, rgba(123, 168, 140, 0.12) 0%, transparent 100%)`,
  // Tranquil glow - teal radial
  tranquilGlow: `radial-gradient(ellipse at center, rgba(107, 168, 184, 0.15) 0%, transparent 70%)`,
};

export default defaultTheme;
