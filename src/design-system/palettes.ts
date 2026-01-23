/**
 * Palette System
 * Light Brand Consulting Design System
 *
 * Four distinctive themes - 2 light and 2 dark
 * All palettes maintain proper contrast ratios for accessibility
 */

// ============================================================================
// Types
// ============================================================================

export interface Palette {
  id: string;
  name: string;
  /** Preview color for the switcher UI */
  preview: string;
  /** Whether this is a dark mode palette */
  isDark: boolean;

  // Accent Colors (Radiance)
  primary: string;
  secondary: string;
  warm: string;

  // Background/Depth Colors
  depthBase: string;
  depthElevated: string;
  depthSurface: string;
  depthBorder: string;

  // Text Colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Clarity Colors (secondary accents/surfaces)
  clarityCream: string;
  claritySoft: string;
  clarityMuted: string;

  // Wisdom Colors (AI features)
  wisdomViolet: string;
  wisdomSoft: string;
  wisdomMuted: string;
}

export type PaletteId = 'warm-gold' | 'ocean-blue' | 'forest-green' | 'charcoal-slate';

// ============================================================================
// Palette Definitions
// ============================================================================

export const palettes: Record<PaletteId, Palette> = {
  /**
   * Warm Gold - Light theme with warm undertones
   * Cream/warm white background with rich gold accents
   */
  'warm-gold': {
    id: 'warm-gold',
    name: 'Warm Gold',
    preview: '#C9940A',
    isDark: false,

    // Accent (Rich gold tones)
    primary: '#C9940A',
    secondary: '#B8860B',
    warm: '#A67508',

    // Backgrounds (Warm light)
    depthBase: '#FAFAF8',
    depthElevated: '#FFFFFF',
    depthSurface: '#F5F4F2',
    depthBorder: '#E8E6E3',

    // Text (Warm dark)
    textPrimary: '#1A1918',
    textSecondary: '#3D3A38',
    textMuted: '#5C5956',

    // Clarity (Cream tones)
    clarityCream: '#FDF6E3',
    claritySoft: '#F5E6C8',
    clarityMuted: '#E8DCC4',

    // Wisdom (Violet)
    wisdomViolet: '#6B5CA8',
    wisdomSoft: '#8577C4',
    wisdomMuted: '#5A4D98',
  },

  /**
   * Ocean Blue - Light theme with cool undertones
   * Cool white/blue-gray background with sky blue accents
   */
  'ocean-blue': {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    preview: '#0EA5E9',
    isDark: false,

    // Accent (Sky blue tones)
    primary: '#0EA5E9',
    secondary: '#0284C7',
    warm: '#38BDF8',

    // Backgrounds (Cool light)
    depthBase: '#F8FAFC',
    depthElevated: '#FFFFFF',
    depthSurface: '#F1F5F9',
    depthBorder: '#E2E8F0',

    // Text (Cool dark)
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',

    // Clarity (Sky tones)
    clarityCream: '#F0F9FF',
    claritySoft: '#E0F2FE',
    clarityMuted: '#BAE6FD',

    // Wisdom (Indigo)
    wisdomViolet: '#6366F1',
    wisdomSoft: '#818CF8',
    wisdomMuted: '#4F46E5',
  },

  /**
   * Forest Green - Dark theme with natural undertones
   * Deep forest background with bright emerald accents
   */
  'forest-green': {
    id: 'forest-green',
    name: 'Forest',
    preview: '#34D399',
    isDark: true,

    // Accent (Bright emerald/mint)
    primary: '#34D399',
    secondary: '#10B981',
    warm: '#6EE7B7',

    // Backgrounds (Deep forest)
    depthBase: '#080C0A',
    depthElevated: '#0F1A15',
    depthSurface: '#0B1410',
    depthBorder: '#1A3028',

    // Text (Natural light)
    textPrimary: '#ECFDF5',
    textSecondary: '#A7DBC8',
    textMuted: '#5F9B82',

    // Clarity (Forest tones)
    clarityCream: '#0C1A14',
    claritySoft: '#142A22',
    clarityMuted: '#1E3D30',

    // Wisdom (Teal)
    wisdomViolet: '#5EEAD4',
    wisdomSoft: '#99F6E4',
    wisdomMuted: '#2DD4BF',
  },

  /**
   * Charcoal Slate - Dark theme with neutral tones
   * Pure dark background with cool silver accents
   */
  'charcoal-slate': {
    id: 'charcoal-slate',
    name: 'Charcoal',
    preview: '#94A3B8',
    isDark: true,

    // Accent (Cool silver/slate)
    primary: '#94A3B8',
    secondary: '#64748B',
    warm: '#CBD5E1',

    // Backgrounds (Neutral dark)
    depthBase: '#09090B',
    depthElevated: '#18181B',
    depthSurface: '#111113',
    depthBorder: '#27272A',

    // Text (Neutral light)
    textPrimary: '#FAFAFA',
    textSecondary: '#A1A1AA',
    textMuted: '#71717A',

    // Clarity (Slate tones)
    clarityCream: '#151518',
    claritySoft: '#202024',
    clarityMuted: '#2D2D32',

    // Wisdom (Cool violet)
    wisdomViolet: '#A78BFA',
    wisdomSoft: '#C4B5FD',
    wisdomMuted: '#8B5CF6',
  },
};

export const defaultPaletteId: PaletteId = 'warm-gold';

// ============================================================================
// Palette Utilities
// ============================================================================

/**
 * Get a palette by ID, with fallback to default
 */
export function getPaletteById(id: string): Palette {
  return palettes[id as PaletteId] ?? palettes[defaultPaletteId];
}

/**
 * Get all palettes as an array
 */
export function getAllPalettes(): Palette[] {
  return Object.values(palettes);
}

/**
 * Check if a string is a valid palette ID
 */
export function isValidPaletteId(id: string): id is PaletteId {
  return id in palettes;
}

// ============================================================================
// CSS Variable Application
// ============================================================================

/**
 * CSS variable mapping from palette properties to CSS variable names
 */
const CSS_VARIABLE_MAP: Record<keyof Omit<Palette, 'id' | 'name' | 'preview' | 'isDark'>, string> = {
  // Accent
  primary: '--color-radiance-gold',
  secondary: '--color-radiance-amber',
  warm: '--color-radiance-warm',

  // Depth (backgrounds)
  depthBase: '--color-depth-base',
  depthElevated: '--color-depth-elevated',
  depthSurface: '--color-depth-surface',
  depthBorder: '--color-depth-border',

  // Text
  textPrimary: '--color-text-primary',
  textSecondary: '--color-text-secondary',
  textMuted: '--color-text-muted',

  // Clarity
  clarityCream: '--color-clarity-cream',
  claritySoft: '--color-clarity-soft',
  clarityMuted: '--color-clarity-muted',

  // Wisdom
  wisdomViolet: '--color-wisdom-violet',
  wisdomSoft: '--color-wisdom-soft',
  wisdomMuted: '--color-wisdom-muted',
};

/**
 * Apply palette colors to document root as CSS variables
 */
export function applyPaletteToDocument(palette: Palette): void {
  const root = document.documentElement;

  // Apply all color variables
  (Object.entries(CSS_VARIABLE_MAP) as [keyof typeof CSS_VARIABLE_MAP, string][]).forEach(
    ([key, cssVar]) => {
      root.style.setProperty(cssVar, palette[key]);
    }
  );

  // Toggle dark/light class for components that need it
  if (palette.isDark) {
    root.classList.add('palette-dark');
    root.classList.remove('palette-light');
  } else {
    root.classList.add('palette-light');
    root.classList.remove('palette-dark');
  }
}

/**
 * Remove palette CSS variables (restore to theme defaults)
 */
export function removePaletteFromDocument(): void {
  const root = document.documentElement;

  Object.values(CSS_VARIABLE_MAP).forEach((cssVar) => {
    root.style.removeProperty(cssVar);
  });

  root.classList.remove('palette-dark', 'palette-light');
}

/**
 * Generate inline script for preventing flash of wrong palette
 */
export function generatePaletteScript(): string {
  const palettesJson = JSON.stringify(
    Object.fromEntries(
      Object.entries(palettes).map(([id, p]) => [
        id,
        {
          isDark: p.isDark,
          primary: p.primary,
          secondary: p.secondary,
          warm: p.warm,
          depthBase: p.depthBase,
          depthElevated: p.depthElevated,
          depthSurface: p.depthSurface,
          depthBorder: p.depthBorder,
          textPrimary: p.textPrimary,
          textSecondary: p.textSecondary,
          textMuted: p.textMuted,
          clarityCream: p.clarityCream,
          claritySoft: p.claritySoft,
          clarityMuted: p.clarityMuted,
          wisdomViolet: p.wisdomViolet,
          wisdomSoft: p.wisdomSoft,
          wisdomMuted: p.wisdomMuted,
        },
      ])
    )
  );

  return `
(function() {
  try {
    var stored = localStorage.getItem('light-brand-palette');
    var palettes = ${palettesJson};
    var p = palettes[stored] || palettes['warm-gold'];
    var root = document.documentElement;
    root.style.setProperty('--color-radiance-gold', p.primary);
    root.style.setProperty('--color-radiance-amber', p.secondary);
    root.style.setProperty('--color-radiance-warm', p.warm);
    root.style.setProperty('--color-depth-base', p.depthBase);
    root.style.setProperty('--color-depth-elevated', p.depthElevated);
    root.style.setProperty('--color-depth-surface', p.depthSurface);
    root.style.setProperty('--color-depth-border', p.depthBorder);
    root.style.setProperty('--color-text-primary', p.textPrimary);
    root.style.setProperty('--color-text-secondary', p.textSecondary);
    root.style.setProperty('--color-text-muted', p.textMuted);
    root.style.setProperty('--color-clarity-cream', p.clarityCream);
    root.style.setProperty('--color-clarity-soft', p.claritySoft);
    root.style.setProperty('--color-clarity-muted', p.clarityMuted);
    root.style.setProperty('--color-wisdom-violet', p.wisdomViolet);
    root.style.setProperty('--color-wisdom-soft', p.wisdomSoft);
    root.style.setProperty('--color-wisdom-muted', p.wisdomMuted);
    if (p.isDark) {
      root.classList.add('palette-dark');
    } else {
      root.classList.add('palette-light');
    }
  } catch (e) {}
})();
`;
}
