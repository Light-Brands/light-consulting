/**
 * Tag Component
 * Light Brand Consulting Design System
 */

import React from 'react';
import { cn } from '../lib/utils';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'premium' | 'wisdom' | 'success' | 'warning';
  size?: 'sm' | 'md';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variants = {
    default: 'bg-depth-surface text-text-secondary border-depth-border',
    premium: 'bg-radiance-gold/15 text-radiance-gold border-radiance-gold/30',
    wisdom: 'bg-wisdom-violet/15 text-wisdom-violet border-wisdom-violet/30',
    success: 'bg-success/15 text-success border-success/30',
    warning: 'bg-warning/15 text-warning border-warning/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold uppercase tracking-wider',
        'border rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Tag;
