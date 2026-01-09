/**
 * Card Component
 * Light Brand Consulting Design System
 * 
 * Flexible card component with header, body, and footer sections
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, transition } from './utils';
import { tokens } from '@/design-system';

// ============================================================================
// Card Variants
// ============================================================================

const cardVariants = cva(
  ['border rounded-brand-card overflow-hidden', transition],
  {
    variants: {
      elevation: {
        none: 'bg-transparent border-transparent',
        subtle: 'bg-depth-elevated border-depth-border shadow-subtle',
        elevated: 'bg-depth-elevated border-depth-border shadow-elevated',
        floating: 'bg-depth-surface border-depth-border shadow-floating',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      hoverable: {
        true: 'hover:border-radiance-gold/30 hover:shadow-illumination cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      elevation: 'subtle',
      padding: 'md',
      hoverable: false,
    },
  }
);

// ============================================================================
// Card Props
// ============================================================================

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Card content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
  /** As which HTML element */
  as?: React.ElementType;
}

// ============================================================================
// Card Component
// ============================================================================

const CardBase = React.forwardRef<HTMLDivElement, CardProps>(
  ({ elevation, padding, hoverable, className, children, as = 'div', ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ elevation, padding, hoverable }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardBase.displayName = 'Card';

// ============================================================================
// Card Header
// ============================================================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  divider = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'px-6 py-4',
        divider && 'border-b border-depth-border',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

CardHeader.displayName = 'Card.Header';

// ============================================================================
// Card Body
// ============================================================================

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
  noPadding = false,
  ...props
}) => {
  return (
    <div className={cn(!noPadding && 'px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

CardBody.displayName = 'Card.Body';

// ============================================================================
// Card Footer
// ============================================================================

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
  align?: 'left' | 'center' | 'right' | 'between';
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  divider = false,
  align = 'right',
  ...props
}) => {
  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      className={cn(
        'px-6 py-4 flex items-center gap-3',
        divider && 'border-t border-depth-border',
        alignStyles[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

CardFooter.displayName = 'Card.Footer';

// ============================================================================
// Attach sub-components to Card with proper typing
// ============================================================================

interface CardComponent extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

const Card = CardBase as CardComponent;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// ============================================================================
// Export
// ============================================================================

export { Card };
export default Card;
