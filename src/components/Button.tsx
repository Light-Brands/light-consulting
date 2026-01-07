/**
 * Button Component
 * Light Brand Consulting Design System
 */

import React from 'react';
import { cn } from '../lib/utils';
import { ComponentVariant, ComponentSize } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-semibold
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-radiance-gold focus:ring-offset-depth-base
    disabled:opacity-40 disabled:cursor-not-allowed
    rounded-brand-btn
  `;

  const variants = {
    primary: `
      bg-gradient-to-br from-radiance-gold to-radiance-amber
      text-depth-base
      hover:shadow-illumination hover:scale-[1.02]
      active:scale-[0.98]
    `,
    secondary: `
      bg-transparent
      text-clarity-cream
      border border-clarity-muted
      hover:bg-clarity-cream/10 hover:border-clarity-cream
    `,
    ghost: `
      bg-transparent
      text-text-secondary
      hover:bg-depth-surface hover:text-text-primary
    `,
    outline: `
      bg-transparent
      text-radiance-gold
      border border-radiance-gold
      hover:bg-radiance-gold/10
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
