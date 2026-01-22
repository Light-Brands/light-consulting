/**
 * Theme Toggle Component
 * Light Brand Consulting Design System
 *
 * Ready-to-use component for switching between light and dark modes
 */

'use client';

import React from 'react';
import { useTheme } from '@/design-system';
import { cn } from './utils';

// ============================================================================
// Icons
// ============================================================================

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('h-5 w-5', className)}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('h-5 w-5', className)}
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

// ============================================================================
// ThemeToggle Props
// ============================================================================

export interface ThemeToggleProps {
  /** Additional CSS classes */
  className?: string;
  /** Show text label next to icon */
  showLabel?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

// ============================================================================
// ThemeToggle Component
// ============================================================================

/**
 * Theme toggle button for switching between light and dark modes
 *
 * @example
 * // Icon only (default)
 * <ThemeToggle />
 *
 * @example
 * // With label
 * <ThemeToggle showLabel />
 *
 * @example
 * // Different sizes
 * <ThemeToggle size="sm" />
 * <ThemeToggle size="lg" />
 */
export function ThemeToggle({
  className,
  showLabel = false,
  size = 'md',
}: ThemeToggleProps) {
  const { mode, toggleMode } = useTheme();

  const sizeStyles = {
    sm: 'p-1.5 h-8 w-8',
    md: 'p-2 h-10 w-10',
    lg: 'p-2.5 h-12 w-12',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const labelSizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  const isDark = mode === 'dark';

  if (showLabel) {
    return (
      <button
        type="button"
        onClick={toggleMode}
        className={cn(
          'inline-flex items-center gap-2',
          'bg-transparent border border-depth-border',
          'text-text-secondary',
          'rounded-brand-btn',
          'hover:bg-depth-surface hover:text-text-primary hover:border-text-muted',
          'transition-all duration-300 ease-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-radiance-gold/20',
          labelSizeStyles[size],
          className
        )}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? (
          <>
            <SunIcon className={iconSizes[size]} />
            <span>Light</span>
          </>
        ) : (
          <>
            <MoonIcon className={iconSizes[size]} />
            <span>Dark</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleMode}
      className={cn(
        'inline-flex items-center justify-center',
        'bg-transparent border border-depth-border',
        'text-text-secondary',
        'rounded-lg',
        'hover:bg-depth-surface hover:text-text-primary hover:border-text-muted',
        'transition-all duration-300 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-radiance-gold/20',
        sizeStyles[size],
        className
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <SunIcon className={iconSizes[size]} />
      ) : (
        <MoonIcon className={iconSizes[size]} />
      )}
    </button>
  );
}

export default ThemeToggle;
