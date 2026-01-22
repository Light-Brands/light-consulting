/**
 * Theme Provider
 * Light Brand Consulting Design System
 *
 * React context provider for managing theme state (light/dark mode)
 */

'use client';

import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { ThemeMode, Theme } from './types';
import { getTheme, applyThemeToDocument } from './theme';

// ============================================================================
// Constants
// ============================================================================

const THEME_STORAGE_KEY = 'light-brand-theme-mode';

// ============================================================================
// Context Types
// ============================================================================

export interface ThemeContextValue {
  mode: ThemeMode;
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

// ============================================================================
// Context
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// ThemeProvider Props
// ============================================================================

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default theme mode if no preference is stored */
  defaultMode?: ThemeMode;
  /** Enable system preference detection */
  enableSystemPreference?: boolean;
}

// ============================================================================
// ThemeProvider Component
// ============================================================================

/**
 * ThemeProvider wraps your app and provides theme context
 *
 * @example
 * <ThemeProvider defaultMode="dark">
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  children,
  defaultMode = 'dark',
  enableSystemPreference = true,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [mounted, setMounted] = useState(false);

  // Get the theme object based on current mode
  const theme = getTheme(mode);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    // Check localStorage first
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;

    if (stored && (stored === 'light' || stored === 'dark')) {
      setModeState(stored);
    } else if (enableSystemPreference) {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setModeState(prefersDark ? 'dark' : 'light');
    }
  }, [enableSystemPreference]);

  // Apply theme to document when mode changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Toggle light/dark classes
    if (mode === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }

    // Apply CSS variables
    applyThemeToDocument(theme);
  }, [mode, theme, mounted]);

  // Listen for system preference changes
  useEffect(() => {
    if (!enableSystemPreference) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no stored preference
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (!stored) {
        setModeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableSystemPreference]);

  // Set mode and persist to localStorage
  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(THEME_STORAGE_KEY, newMode);
  }, []);

  // Toggle between light and dark
  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  const value: ThemeContextValue = {
    mode,
    theme,
    setMode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================================================
// useTheme Hook
// ============================================================================

/**
 * Hook to access theme context
 *
 * @example
 * const { mode, toggleMode, theme } = useTheme();
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

// ============================================================================
// Script for preventing flash
// ============================================================================

/**
 * Inline script to prevent flash of wrong theme on initial load
 * Add this to <head> before other scripts
 */
export const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var mode = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.add(mode);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;
