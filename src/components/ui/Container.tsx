/**
 * Container & Layout Components
 * Light Brand Consulting Design System
 * 
 * Layout primitives for consistent spacing and structure
 */

import React from 'react';
import { cn } from './utils';
import { tokens } from '@/design-system';

// ============================================================================
// Container Component
// ============================================================================

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'narrow' | 'default' | 'wide' | 'full';
  as?: React.ElementType;
}

/**
 * Container component with responsive max-width
 * 
 * @example
 * <Container size="narrow">Narrow content</Container>
 * <Container size="wide">Wide content</Container>
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'default',
  as = 'div',
}) => {
  const Component = as;

  const sizeStyles = {
    narrow: 'max-w-3xl',     // 768px
    default: 'max-w-5xl',    // 1024px
    wide: 'max-w-7xl',       // 1280px
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn(
        'mx-auto px-6',
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// Section Component
// ============================================================================

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'base' | 'elevated' | 'surface';
  as?: React.ElementType;
}

/**
 * Section component with consistent vertical spacing
 * 
 * @example
 * <Section spacing="lg" background="elevated">
 *   <h2>Section Title</h2>
 * </Section>
 */
export const Section: React.FC<SectionProps> = ({
  children,
  className,
  spacing = 'md',
  background = 'base',
  as = 'section',
}) => {
  const Component = as;

  const spacingStyles = {
    none: '',
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32',
    xl: 'py-32 md:py-40',
  };

  const backgroundStyles = {
    base: 'bg-depth-base',
    elevated: 'bg-depth-elevated',
    surface: 'bg-depth-surface',
  };

  return (
    <Component
      className={cn(
        spacingStyles[spacing],
        backgroundStyles[background],
        className
      )}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// Grid Component
// ============================================================================

export interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 2 | 3 | 4 | 6 | 8 | 12;
  responsive?: boolean;
  as?: React.ElementType;
}

/**
 * Grid layout component
 * 
 * @example
 * <Grid cols={3} gap={6}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 */
export const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols = 1,
  gap = 6,
  responsive = true,
  as = 'div',
}) => {
  const Component = as;

  const colsStyles = {
    1: 'grid-cols-1',
    2: responsive ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2',
    3: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-3',
    4: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-4',
    6: responsive ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-6',
    12: 'grid-cols-12',
  };

  const gapStyles = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12',
  };

  return (
    <Component
      className={cn('grid', colsStyles[cols], gapStyles[gap], className)}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// Flex Component
// ============================================================================

export interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 2 | 3 | 4 | 6 | 8 | 12;
  wrap?: boolean;
  as?: React.ElementType;
}

/**
 * Flex layout component
 * 
 * @example
 * <Flex justify="between" align="center" gap={4}>
 *   <div>Left</div>
 *   <div>Right</div>
 * </Flex>
 */
export const Flex: React.FC<FlexProps> = ({
  children,
  className,
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 0,
  wrap = false,
  as = 'div',
}) => {
  const Component = as;

  const directionStyles = {
    row: 'flex-row',
    col: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'col-reverse': 'flex-col-reverse',
  };

  const alignStyles = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifyStyles = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const gapStyles = {
    0: '',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12',
  };

  return (
    <Component
      className={cn(
        'flex',
        directionStyles[direction],
        alignStyles[align],
        justifyStyles[justify],
        gapStyles[gap],
        wrap && 'flex-wrap',
        className
      )}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// Stack Component
// ============================================================================

export interface StackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 2 | 3 | 4 | 6 | 8 | 12;
  direction?: 'vertical' | 'horizontal';
  as?: React.ElementType;
}

/**
 * Stack component for consistent spacing between children
 * 
 * @example
 * <Stack spacing={4}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 */
export const Stack: React.FC<StackProps> = ({
  children,
  className,
  spacing = 4,
  direction = 'vertical',
  as = 'div',
}) => {
  const Component = as;

  const directionStyles = {
    vertical: 'flex-col',
    horizontal: 'flex-row',
  };

  const spacingStyles = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12',
  };

  return (
    <Component
      className={cn(
        'flex',
        directionStyles[direction],
        spacingStyles[spacing],
        className
      )}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// Divider Component
// ============================================================================

export interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 2 | 4 | 6 | 8;
}

/**
 * Divider component for visual separation
 * 
 * @example
 * <Divider spacing={6} />
 */
export const Divider: React.FC<DividerProps> = ({
  className,
  orientation = 'horizontal',
  spacing = 4,
}) => {
  const spacingStyles = {
    2: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    4: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    6: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    8: orientation === 'horizontal' ? 'my-8' : 'mx-8',
  };

  const orientationStyles = {
    horizontal: 'h-px w-full',
    vertical: 'w-px h-full',
  };

  return (
    <hr
      className={cn(
        'border-0 bg-depth-border',
        orientationStyles[orientation],
        spacingStyles[spacing],
        className
      )}
    />
  );
};

// Export all components
export default {
  Container,
  Section,
  Grid,
  Flex,
  Stack,
  Divider,
};
