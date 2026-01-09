/**
 * Typography Components
 * Light Brand Consulting Design System
 * 
 * Semantic typography components using design tokens
 */

import React from 'react';
import { cn } from './utils';
import { tokens } from '@/design-system';

// ============================================================================
// Types
// ============================================================================

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TextVariant = 'body' | 'lead' | 'large' | 'small' | 'muted';
type TextAlign = 'left' | 'center' | 'right' | 'justify';

interface BaseTypographyProps {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

// ============================================================================
// Heading Component
// ============================================================================

export interface HeadingProps extends BaseTypographyProps {
  level?: HeadingLevel;
  gradient?: boolean;
}

/**
 * Heading component with consistent styling
 * 
 * @example
 * <Heading level="h1" gradient>Welcome</Heading>
 * <Heading level="h2">About Us</Heading>
 */
export const Heading: React.FC<HeadingProps> = ({
  level = 'h2',
  gradient = false,
  className,
  children,
  as,
}) => {
  const Component = as || level;

  const baseStyles = cn(
    'font-heading font-bold tracking-tight',
    'text-text-primary'
  );

  const levelStyles = {
    h1: 'text-4xl md:text-5xl lg:text-6xl leading-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl leading-tight',
    h3: 'text-2xl md:text-3xl lg:text-4xl leading-snug',
    h4: 'text-xl md:text-2xl lg:text-3xl leading-snug',
    h5: 'text-lg md:text-xl lg:text-2xl leading-normal',
    h6: 'text-base md:text-lg lg:text-xl leading-normal',
  };

  const gradientStyle = gradient
    ? 'bg-gradient-to-br from-radiance-gold to-radiance-amber bg-clip-text text-transparent'
    : '';

  return (
    <Component className={cn(baseStyles, levelStyles[level], gradientStyle, className)}>
      {children}
    </Component>
  );
};

// ============================================================================
// Text Component
// ============================================================================

export interface TextProps extends BaseTypographyProps {
  variant?: TextVariant;
  align?: TextAlign;
}

/**
 * Text component for body copy
 * 
 * @example
 * <Text variant="lead">This is lead text</Text>
 * <Text variant="muted">This is muted text</Text>
 */
export const Text: React.FC<TextProps> = ({
  variant = 'body',
  align = 'left',
  className,
  children,
  as = 'p',
}) => {
  const Component = as;

  const baseStyles = 'font-body';

  const variantStyles = {
    body: 'text-base text-text-secondary leading-relaxed',
    lead: 'text-lg md:text-xl text-text-secondary leading-relaxed',
    large: 'text-lg text-text-secondary leading-normal',
    small: 'text-sm text-text-secondary leading-normal',
    muted: 'text-sm text-text-muted leading-normal',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  return (
    <Component
      className={cn(baseStyles, variantStyles[variant], alignStyles[align], className)}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// Label Component
// ============================================================================

export interface LabelProps extends BaseTypographyProps {
  htmlFor?: string;
  required?: boolean;
}

/**
 * Label component for form inputs
 * 
 * @example
 * <Label htmlFor="email" required>Email Address</Label>
 */
export const Label: React.FC<LabelProps> = ({
  htmlFor,
  required = false,
  className,
  children,
  as = 'label',
}) => {
  const Component = as;

  return (
    <Component
      htmlFor={htmlFor}
      className={cn(
        'block text-xs font-bold text-radiance-gold uppercase tracking-wider mb-2',
        className
      )}
    >
      {children}
      {required && <span className="text-error ml-1" aria-label="required">*</span>}
    </Component>
  );
};

// ============================================================================
// Display Text Component
// ============================================================================

export interface DisplayTextProps extends BaseTypographyProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  gradient?: boolean;
}

/**
 * Large display text for hero sections
 * 
 * @example
 * <DisplayText size="xl" gradient>Transform Your Business</DisplayText>
 */
export const DisplayText: React.FC<DisplayTextProps> = ({
  size = 'md',
  gradient = false,
  className,
  children,
  as = 'h1',
}) => {
  const Component = as;

  const sizeStyles = {
    sm: 'text-5xl md:text-6xl lg:text-7xl',
    md: 'text-6xl md:text-7xl lg:text-8xl',
    lg: 'text-7xl md:text-8xl lg:text-9xl',
    xl: 'text-8xl md:text-9xl',
  };

  const gradientStyle = gradient
    ? 'bg-gradient-to-br from-radiance-gold to-radiance-amber bg-clip-text text-transparent'
    : 'text-text-primary';

  return (
    <Component
      className={cn(
        'font-heading font-black tracking-tighter leading-none',
        sizeStyles[size],
        gradientStyle,
        className
      )}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// Code Component
// ============================================================================

export interface CodeProps extends BaseTypographyProps {
  inline?: boolean;
}

/**
 * Code component for displaying code snippets
 * 
 * @example
 * <Code inline>npm install</Code>
 * <Code>const x = 10;</Code>
 */
export const Code: React.FC<CodeProps> = ({
  inline = false,
  className,
  children,
  as,
}) => {
  const Component = as || (inline ? 'code' : 'pre');

  const inlineStyles = inline
    ? 'px-2 py-0.5 rounded-md bg-depth-surface text-clarity-soft text-sm font-mono'
    : 'p-4 rounded-brand-card bg-depth-surface text-clarity-soft text-sm font-mono overflow-x-auto';

  return (
    <Component className={cn(inlineStyles, className)}>
      {children}
    </Component>
  );
};

// ============================================================================
// Blockquote Component
// ============================================================================

export interface BlockquoteProps extends BaseTypographyProps {
  cite?: string;
  author?: string;
}

/**
 * Blockquote component for quotations
 * 
 * @example
 * <Blockquote author="John Doe">This is a quote</Blockquote>
 */
export const Blockquote: React.FC<BlockquoteProps> = ({
  cite,
  author,
  className,
  children,
  as = 'blockquote',
}) => {
  const Component = as;

  return (
    <Component
      cite={cite}
      className={cn(
        'border-l-4 border-radiance-gold pl-6 py-2 my-4',
        'text-text-primary text-lg italic',
        className
      )}
    >
      {children}
      {author && (
        <footer className="text-text-muted text-sm not-italic mt-2">
          — {author}
        </footer>
      )}
    </Component>
  );
};

// Export all components
export default {
  Heading,
  Text,
  Label,
  DisplayText,
  Code,
  Blockquote,
};
