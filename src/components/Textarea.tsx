/**
 * Textarea Component
 * Light Brand Consulting Design System
 */

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-bold text-radiance-gold uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            'block w-full bg-depth-base border border-depth-border rounded-brand-btn',
            'text-text-primary placeholder-text-muted/50',
            'focus:outline-none focus:ring-2 focus:ring-radiance-gold/20 focus:border-radiance-gold',
            'transition-all duration-300 resize-none',
            'px-4 py-3.5 text-sm',
            error && 'border-error focus:ring-error/20 focus:border-error',
            className
          )}
          {...props}
        />
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

Textarea.displayName = 'Textarea';

export default Textarea;
