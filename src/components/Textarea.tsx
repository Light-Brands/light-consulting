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
          <label className="block text-sm font-semibold text-text-primary mb-2.5">
            {label}
            {props.required && <span className="text-error ml-1.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            'block w-full bg-depth-base border border-depth-border rounded-lg',
            'text-text-primary placeholder-text-muted/40 placeholder:text-sm',
            'focus:outline-none focus:ring-2 focus:ring-radiance-gold/20 focus:border-radiance-gold focus:bg-depth-elevated/30',
            'transition-all duration-200 ease-out resize-none',
            'hover:border-radiance-gold/30 hover:bg-depth-elevated/10',
            'px-4 py-3.5 text-base',
            error && 'border-error focus:ring-error/20 focus:border-error bg-error/5',
            className
          )}
          {...props}
        />
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

Textarea.displayName = 'Textarea';

export default Textarea;
