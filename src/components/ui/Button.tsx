/**
 * Button Component
 * Light Brand Consulting Design System
 * 
 * Production-ready button with variants, sizes, and states
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, focusRing, disabledState, transition } from './utils';
import { tokens } from '@/design-system';

// ============================================================================
// Button Variants using CVA
// ============================================================================

const buttonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center',
    'font-semibold',
    'border',
    'cursor-pointer',
    transition,
    focusRing,
    disabledState,
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-br from-radiance-gold to-radiance-amber',
          'text-white',
          'border-transparent',
          'hover:shadow-illumination hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
        secondary: [
          'bg-transparent',
          'text-text-primary',
          'border-depth-border',
          'hover:bg-depth-surface hover:border-text-muted',
        ],
        outline: [
          'bg-transparent',
          'text-radiance-gold',
          'border-radiance-gold',
          'hover:bg-radiance-gold/10',
        ],
        ghost: [
          'bg-transparent',
          'text-text-secondary',
          'border-transparent',
          'hover:bg-depth-surface hover:text-text-primary',
        ],
        danger: [
          'bg-error',
          'text-white',
          'border-transparent',
          'hover:bg-error/90 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]',
        ],
        success: [
          'bg-success',
          'text-white',
          'border-transparent',
          'hover:bg-success/90',
        ],
      },
      size: {
        sm: 'px-4 py-2 text-xs rounded-brand-btn h-8',
        md: 'px-6 py-3 text-sm rounded-brand-btn h-11',
        lg: 'px-8 py-4 text-base rounded-brand-btn h-13',
        xl: 'px-10 py-5 text-lg rounded-brand-btn h-15',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

// ============================================================================
// Button Props
// ============================================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Loading state with spinner */
  isLoading?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
  /** Make button full width */
  fullWidth?: boolean;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

// ============================================================================
// Button Component
// ============================================================================

/**
 * Button component with multiple variants and states
 * 
 * @example
 * <Button variant="primary" size="lg">
 *   Click Me
 * </Button>
 * 
 * @example
 * <Button variant="outline" leftIcon={<Icon />} isLoading>
 *   Submit
 * </Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
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

        {/* Left Icon */}
        {!isLoading && leftIcon && (
          <span className="mr-2 -ml-1" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button Text */}
        {children}

        {/* Right Icon */}
        {rightIcon && (
          <span className="ml-2 -mr-1" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================================================
// Icon Button Component
// ============================================================================

export interface IconButtonProps
  extends Omit<ButtonProps, 'leftIcon' | 'rightIcon'> {
  icon: React.ReactNode;
  'aria-label': string; // Required for accessibility
}

/**
 * Icon-only button component
 * 
 * @example
 * <IconButton
 *   icon={<CloseIcon />}
 *   aria-label="Close dialog"
 *   variant="ghost"
 * />
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', className, ...props }, ref) => {
    const sizeStyles = {
      sm: 'p-1 h-8 w-8',
      md: 'p-2 h-10 w-10',
      lg: 'p-3 h-12 w-12',
      xl: 'p-4 h-14 w-14',
    };

    const buttonSize = size || 'md';

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ ...props, size: buttonSize }),
          sizeStyles[buttonSize],
          'rounded-lg',
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

// ============================================================================
// Button Group Component
// ============================================================================

export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  attached?: boolean;
}

/**
 * Button group for related actions
 * 
 * @example
 * <ButtonGroup attached>
 *   <Button>Left</Button>
 *   <Button>Center</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  orientation = 'horizontal',
  attached = false,
}) => {
  const orientationStyles = {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  };

  const attachedStyles = attached
    ? orientation === 'horizontal'
      ? '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:-ml-px'
      : '[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:-mt-px'
    : 'gap-2';

  return (
    <div
      className={cn('inline-flex', orientationStyles[orientation], attachedStyles, className)}
      role="group"
    >
      {children}
    </div>
  );
};

// Export components
export default Button;
