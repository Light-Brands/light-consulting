/**
 * UI Component Utilities
 * Light Brand Consulting
 * 
 * Shared utilities for UI components
 */

import { clsx, type ClassValue } from 'clsx';

/**
 * Combines class names using clsx
 * Enhanced version of the cn utility with clsx support
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Creates a focus ring utility class
 */
export const focusRing = cn(
  'focus:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-radiance-gold/20',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-depth-base'
);

/**
 * Creates a disabled state utility class
 */
export const disabledState = cn(
  'disabled:opacity-40',
  'disabled:cursor-not-allowed',
  'disabled:pointer-events-none'
);

/**
 * Creates a transition utility class
 */
export const transition = cn(
  'transition-all',
  'duration-300',
  'ease-out'
);

/**
 * Polymorphic component props helper
 */
export type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
} & React.ComponentPropsWithoutRef<E>;

/**
 * Extract initials from a name
 */
export function getInitials(name: string, maxLength: number = 2): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, maxLength);
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
