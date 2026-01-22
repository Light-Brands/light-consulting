/**
 * Theme Configuration
 * Light Brand Consulting
 * 
 * Theme system for managing light/dark modes and applying design tokens
 */

import { Theme, ThemeMode } from './types';
import { tokens } from './tokens';

// ==========================================================================
// THEME DEFINITIONS
// ==========================================================================

/**
 * Warm Minimal Theme (Primary)
 * Modern, tech-forward design with warm neutral palette
 */
export const warmTheme: Theme = {
  mode: 'light',
  tokens,
};

// Legacy exports for backwards compatibility
export const darkTheme: Theme = warmTheme;
export const lightTheme: Theme = warmTheme;

// ==========================================================================
// THEME MANAGEMENT
// ==========================================================================

/**
 * Default theme - Warm Minimal
 */
export const defaultTheme = warmTheme;

/**
 * Get theme by mode (returns warm theme for both modes)
 */
export function getTheme(mode: ThemeMode = 'light'): Theme {
  return warmTheme;
}

/**
 * Theme context for React (to be used with Context API)
 */
export interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

// ==========================================================================
// CSS VARIABLE GENERATION
// ==========================================================================

/**
 * Generate CSS custom properties from theme tokens
 * Useful for injecting theme into CSS-in-JS or style tags
 */
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

/**
 * Apply theme CSS variables to document
 * Call this when theme changes
 */
export function applyThemeToDocument(theme: Theme): void {
  const vars = generateCSSVariables(theme);
  const root = document.documentElement;

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  // Update dark/light classes on html element
  if (theme.mode === 'dark') {
    root.classList.remove('light');
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
}

// ==========================================================================
// THEME UTILITIES
// ==========================================================================

/**
 * Create a gradient string from color stops
 */
export function createGradient(
  type: 'linear' | 'radial',
  direction: string,
  stops: Array<{ color: string; position?: string }>
): string {
  const stopStrings = stops
    .map(({ color, position }) => `${color}${position ? ` ${position}` : ''}`)
    .join(', ');
  
  if (type === 'linear') {
    return `linear-gradient(${direction}, ${stopStrings})`;
  } else {
    return `radial-gradient(${direction}, ${stopStrings})`;
  }
}

/**
 * Pre-defined brand gradients - Warm Minimal
 */
export const brandGradients = {
  illumination: createGradient('linear', '135deg', [
    { color: tokens.colors.radiance.gold, position: '0%' },
    { color: tokens.colors.radiance.amber, position: '100%' },
  ]),
  dawn: createGradient('linear', '180deg', [
    { color: tokens.colors.depth.base, position: '0%' },
    { color: tokens.colors.depth.surface, position: '100%' },
  ]),
  clarityFade: createGradient('linear', '180deg', [
    { color: 'rgba(201, 148, 10, 0.08)', position: '0%' },
    { color: 'transparent', position: '100%' },
  ]),
  wisdomGlow: createGradient('radial', 'ellipse at center', [
    { color: 'rgba(107, 92, 168, 0.1)', position: '0%' },
    { color: 'transparent', position: '70%' },
  ]),
};

/**
 * Get responsive breakpoint for media queries
 */
export function breakpoint(size: keyof typeof tokens.breakpoints): string {
  return `@media (min-width: ${tokens.breakpoints[size]})`;
}

/**
 * Create responsive styles object
 * @example
 * responsive({
 *   base: { fontSize: '14px' },
 *   md: { fontSize: '16px' },
 *   lg: { fontSize: '18px' }
 * })
 */
export function responsive(
  styles: Partial<Record<'base' | keyof typeof tokens.breakpoints, React.CSSProperties>>
): React.CSSProperties {
  // Base styles applied without media query
  return styles.base || {};
  // Note: For full responsive support, use CSS-in-JS library or Tailwind classes
}

// Export default theme
export default defaultTheme;
