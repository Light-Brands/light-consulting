/**
 * Input Components
 * Light Brand Consulting Design System
 * 
 * Production-ready input components with variants and validation
 */

import React, { forwardRef, useId } from 'react';
import { cn, focusRing, transition } from './utils';
import { Label } from './Typography';
import { tokens } from '@/design-system';

// ============================================================================
// Input Base Styles
// ============================================================================

const inputBaseStyles = cn(
  'block w-full',
  'bg-depth-base border border-depth-border',
  'text-text-primary placeholder-text-muted/50',
  'rounded-brand-btn',
  'px-4 py-3.5 text-sm',
  transition,
  focusRing,
  'focus:border-radiance-gold',
  'disabled:opacity-40 disabled:cursor-not-allowed'
);

// ============================================================================
// Input Props
// ============================================================================

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  hint?: string;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Input size */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Full width */
  fullWidth?: boolean;
}

// ============================================================================
// Input Component
// ============================================================================

/**
 * Input component with label, error, and hint support
 * 
 * @example
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="you@example.com"
 *   required
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      fullWidth = true,
      className,
      id,
      required,
      ...props
    },
    ref
  ) => {
    // Generate stable ID for server/client consistency
    const generatedId = useId();
    const inputId = id || generatedId;

    const sizeStyles = {
      sm: 'py-2 text-xs',
      md: 'py-3.5 text-sm',
      lg: 'py-4 text-base',
    };

    const hasError = Boolean(error);

    return (
      <div className={cn('w-full', !fullWidth && 'max-w-md')}>
        {/* Label */}
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputBaseStyles,
              sizeStyles[inputSize],
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              hasError && 'border-error focus:ring-error/20 focus:border-error',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Hint Text */}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-text-muted">
            {hint}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-xs text-error font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ============================================================================
// Textarea Component
// ============================================================================

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  hint?: string;
  /** Textarea size */
  textareaSize?: 'sm' | 'md' | 'lg';
  /** Full width */
  fullWidth?: boolean;
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/**
 * Textarea component with label, error, and hint support
 * 
 * @example
 * <Textarea
 *   label="Message"
 *   placeholder="Enter your message..."
 *   rows={5}
 *   required
 * />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      textareaSize = 'md',
      fullWidth = true,
      resize = 'vertical',
      className,
      id,
      required,
      rows = 4,
      ...props
    },
    ref
  ) => {
    // Generate stable ID for server/client consistency
    const generatedId = useId();
    const textareaId = id || generatedId;

    const sizeStyles = {
      sm: 'py-2 text-xs',
      md: 'py-3.5 text-sm',
      lg: 'py-4 text-base',
    };

    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const hasError = Boolean(error);

    return (
      <div className={cn('w-full', !fullWidth && 'max-w-md')}>
        {/* Label */}
        {label && (
          <Label htmlFor={textareaId} required={required}>
            {label}
          </Label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            inputBaseStyles,
            sizeStyles[textareaSize],
            resizeStyles[resize],
            hasError && 'border-error focus:ring-error/20 focus:border-error',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
          }
          {...props}
        />

        {/* Hint Text */}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="mt-1.5 text-xs text-text-muted">
            {hint}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-xs text-error font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// ============================================================================
// Select Component
// ============================================================================

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  hint?: string;
  /** Select size */
  selectSize?: 'sm' | 'md' | 'lg';
  /** Full width */
  fullWidth?: boolean;
  /** Options */
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
}

/**
 * Select component with label, error, and hint support
 * 
 * @example
 * <Select
 *   label="Country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' },
 *   ]}
 *   required
 * />
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      selectSize = 'md',
      fullWidth = true,
      options,
      children,
      className,
      id,
      required,
      ...props
    },
    ref
  ) => {
    // Generate ID if not provided
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const sizeStyles = {
      sm: 'py-2 text-xs',
      md: 'py-3.5 text-sm',
      lg: 'py-4 text-base',
    };

    const hasError = Boolean(error);

    return (
      <div className={cn('w-full', !fullWidth && 'max-w-md')}>
        {/* Label */}
        {label && (
          <Label htmlFor={selectId} required={required}>
            {label}
          </Label>
        )}

        {/* Select Container */}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              inputBaseStyles,
              sizeStyles[selectSize],
              'pr-10 appearance-none cursor-pointer',
              hasError && 'border-error focus:ring-error/20 focus:border-error',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined
            }
            {...props}
          >
            {options
              ? options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              : children}
          </select>

          {/* Dropdown Icon */}
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-text-muted">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Hint Text */}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="mt-1.5 text-xs text-text-muted">
            {hint}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p
            id={`${selectId}-error`}
            className="mt-1.5 text-xs text-error font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Export all components
export { Input as default };
