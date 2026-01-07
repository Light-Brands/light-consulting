/**
 * Input Component
 * Light Brand Consulting Design System
 */

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, hint, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-bold text-radiance-gold uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'block w-full bg-depth-base border border-depth-border rounded-brand-btn',
              'text-text-primary placeholder-text-muted/50',
              'focus:outline-none focus:ring-2 focus:ring-radiance-gold/20 focus:border-radiance-gold',
              'transition-all duration-300',
              icon ? 'pl-11' : 'pl-4',
              'pr-4 py-3.5 text-sm',
              error && 'border-error focus:ring-error/20 focus:border-error',
              className
            )}
            {...props}
          />
        </div>
        {hint && !error && (
          <p className="mt-1.5 text-xs text-text-muted">{hint}</p>
        )}
        {error && (
          <p className="mt-1.5 text-xs text-error font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
