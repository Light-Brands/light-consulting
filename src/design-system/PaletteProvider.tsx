/**
 * Palette Provider
 * Light Brand Consulting Design System
 *
 * React context provider for managing color palette state
 */

'use client';

import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import {
  Palette,
  PaletteId,
  defaultPaletteId,
  getPaletteById,
  applyPaletteToDocument,
  isValidPaletteId,
  generatePaletteScript,
} from './palettes';

// ============================================================================
// Constants
// ============================================================================

const PALETTE_STORAGE_KEY = 'light-brand-palette';

// ============================================================================
// Context Types
// ============================================================================

export interface PaletteContextValue {
  paletteId: PaletteId;
  palette: Palette;
  setPalette: (id: PaletteId) => void;
  /** Whether the current palette is a dark mode palette */
  isDark: boolean;
}

// ============================================================================
// Context
// ============================================================================

const PaletteContext = createContext<PaletteContextValue | undefined>(undefined);

// ============================================================================
// PaletteProvider Props
// ============================================================================

export interface PaletteProviderProps {
  children: React.ReactNode;
  /** Default palette if no preference is stored */
  defaultPalette?: PaletteId;
}

// ============================================================================
// PaletteProvider Component
// ============================================================================

/**
 * PaletteProvider wraps your app and provides palette context
 *
 * @example
 * <PaletteProvider defaultPalette="warm-gold">
 *   <App />
 * </PaletteProvider>
 */
export function PaletteProvider({
  children,
  defaultPalette = defaultPaletteId,
}: PaletteProviderProps) {
  const [paletteId, setPaletteIdState] = useState<PaletteId>(defaultPalette);
  const [mounted, setMounted] = useState(false);

  // Get the palette object based on current ID
  const palette = getPaletteById(paletteId);

  // Initialize palette on mount - runs only on client
  useEffect(() => {
    // Check localStorage for stored palette first
    try {
      const stored = localStorage.getItem(PALETTE_STORAGE_KEY);
      if (stored && isValidPaletteId(stored)) {
        setPaletteIdState(stored);
        // Apply immediately to avoid flash
        applyPaletteToDocument(getPaletteById(stored));
      } else {
        // Apply default palette
        applyPaletteToDocument(getPaletteById(defaultPalette));
      }
    } catch {
      // localStorage not available, apply default
      applyPaletteToDocument(getPaletteById(defaultPalette));
    }

    setMounted(true);
  }, [defaultPalette]);

  // Apply palette to document when it changes (after initial mount)
  useEffect(() => {
    if (!mounted) return;
    applyPaletteToDocument(palette);
  }, [palette, mounted]);

  // Set palette and persist to localStorage
  const setPalette = useCallback((newPaletteId: PaletteId) => {
    setPaletteIdState(newPaletteId);
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, newPaletteId);
    } catch {
      // localStorage not available
    }
  }, []);

  const value: PaletteContextValue = {
    paletteId,
    palette,
    setPalette,
    isDark: palette.isDark,
  };

  return (
    <PaletteContext.Provider value={value}>
      {children}
    </PaletteContext.Provider>
  );
}

// ============================================================================
// usePalette Hook
// ============================================================================

/**
 * Hook to access palette context
 *
 * @example
 * const { palette, setPalette, paletteId } = usePalette();
 */
export function usePalette(): PaletteContextValue {
  const context = useContext(PaletteContext);

  if (context === undefined) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }

  return context;
}

// ============================================================================
// Script for preventing flash
// ============================================================================

/**
 * Inline script to prevent flash of wrong palette on initial load
 * Add this to <head> before other scripts
 */
export const paletteScript = generatePaletteScript();
