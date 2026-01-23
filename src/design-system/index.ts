/**
 * Design System Exports
 * Light Brand Consulting
 *
 * Central export point for all design system modules
 */

// Types
export * from './types';

// Tokens
export { tokens, componentTokens, getColor, getSpacing, getShadow, hexToRgba } from './tokens';

// Theme
export {
  darkTheme,
  lightTheme,
  defaultTheme,
  getTheme,
  generateCSSVariables,
  applyThemeToDocument,
  createGradient,
  brandGradients,
  breakpoint,
  responsive,
} from './theme';

// Theme Provider
export { ThemeProvider, useTheme, themeScript } from './ThemeProvider';
export type { ThemeProviderProps, ThemeContextValue } from './ThemeProvider';

// Palette System
export {
  palettes,
  defaultPaletteId,
  getPaletteById,
  getAllPalettes,
  isValidPaletteId,
  applyPaletteToDocument,
  removePaletteFromDocument,
  generatePaletteScript,
} from './palettes';
export type { Palette, PaletteId } from './palettes';

// Palette Provider
export { PaletteProvider, usePalette, paletteScript } from './PaletteProvider';
export type { PaletteProviderProps, PaletteContextValue } from './PaletteProvider';

// Re-export default
export { default } from './tokens';
