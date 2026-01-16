/**
 * Badge Component
 * Light Brand Consulting Design System
 * 
 * Small labels and status indicators
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';
import { tokens } from '@/design-system';

// ============================================================================
// Badge Variants
// ============================================================================

const badgeVariants = cva(
  [
    'inline-flex items-center font-semibold uppercase tracking-wider',
    'border rounded-full',
    'whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        default: 'bg-depth-surface text-text-secondary border-depth-border',
        premium: 'bg-radiance-gold/15 text-radiance-gold border-radiance-gold/30',
        wisdom: 'bg-wisdom-violet/15 text-wisdom-violet border-wisdom-violet/30',
        success: 'bg-success/15 text-success border-success/30',
        warning: 'bg-warning/15 text-warning border-warning/30',
        error: 'bg-error/15 text-error border-error/30',
        info: 'bg-info/15 text-info border-info/30',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ============================================================================
// Badge Props
// ============================================================================

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Badge content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
}

// ============================================================================
// Badge Component
// ============================================================================

/**
 * Badge component for labels and status indicators
 * 
 * @example
 * <Badge variant="premium">Featured</Badge>
 * <Badge variant="success" size="sm">Active</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, size, leftIcon, rightIcon, children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {leftIcon && <span className="mr-1 -ml-0.5">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1 -mr-0.5">{rightIcon}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// ============================================================================
// Dot Badge Component
// ============================================================================

export interface DotBadgeProps extends Omit<BadgeProps, 'leftIcon' | 'rightIcon'> {
  dotPosition?: 'left' | 'right';
}

/**
 * Badge with a status dot indicator
 * 
 * @example
 * <DotBadge variant="success">Online</DotBadge>
 */
export const DotBadge: React.FC<DotBadgeProps> = ({
  variant = 'default',
  size = 'md',
  dotPosition = 'left',
  children,
  className,
  ...props
}) => {
  const dotSize = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
  };

  const dot = (
    <span
      className={cn('rounded-full', dotSize[size!])}
      style={{
        backgroundColor: 'currentColor',
      }}
    />
  );

  return (
    <Badge
      variant={variant}
      size={size}
      leftIcon={dotPosition === 'left' ? dot : undefined}
      rightIcon={dotPosition === 'right' ? dot : undefined}
      className={className}
      {...props}
    >
      {children}
    </Badge>
  );
};

DotBadge.displayName = 'DotBadge';

// ============================================================================
// Number Badge Component
// ============================================================================

export interface NumberBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  count: number;
  max?: number;
  variant?: 'default' | 'premium' | 'error';
  size?: 'sm' | 'md';
  showZero?: boolean;
}

/**
 * Numeric badge for counts and notifications
 * 
 * @example
 * <NumberBadge count={5} variant="error" />
 * <NumberBadge count={99} max={99} variant="premium" />
 */
export const NumberBadge: React.FC<NumberBadgeProps> = ({
  count,
  max = 99,
  variant = 'default',
  size = 'md',
  showZero = false,
  className,
  ...props
}) => {
  if (!showZero && count === 0) {
    return null;
  }

  const displayCount = count > max ? `${max}+` : count;

  const sizeStyles = {
    sm: 'h-4 min-w-[1rem] text-[9px] px-1',
    md: 'h-5 min-w-[1.25rem] text-[10px] px-1.5',
  };

  const variantStyles = {
    default: 'bg-depth-surface text-text-secondary',
    premium: 'bg-radiance-gold text-depth-base',
    error: 'bg-error text-text-primary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-full font-bold tabular-nums',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {displayCount}
    </span>
  );
};

NumberBadge.displayName = 'NumberBadge';

// Export components
export default Badge;
