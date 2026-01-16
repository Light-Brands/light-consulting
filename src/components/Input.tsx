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
          <label className="block text-sm font-semibold text-text-primary mb-2.5">
            {label}
            {props.required && <span className="text-error ml-1.5">*</span>}
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
              'block w-full bg-depth-base border border-depth-border rounded-lg',
              'text-text-primary placeholder-text-muted/40 placeholder:text-sm',
              'focus:outline-none focus:ring-2 focus:ring-radiance-gold/20 focus:border-radiance-gold focus:bg-depth-elevated/30',
              'transition-all duration-200 ease-out',
              'hover:border-radiance-gold/30 hover:bg-depth-elevated/10',
              icon ? 'pl-11' : 'pl-4',
              'pr-4 py-3.5 text-base',
              error && 'border-error focus:ring-error/20 focus:border-error bg-error/5',
              className
            )}
            {...props}
          />
        </div>
        {hint && !error && (
          <p className="mt-2 text-xs text-text-muted/80 leading-relaxed">{hint}</p>
        )}
        {error && (
          <p className="mt-1.5 text-xs text-error font-medium transition-all duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
