/**
 * Card Component
 * Light Brand Consulting Design System
 */

import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  elevation?: 'none' | 'subtle' | 'elevated' | 'floating';
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  noPadding = false,
  elevation = 'subtle',
  onClick,
  hover = false,
}) => {
  const elevations = {
    none: 'bg-transparent border-transparent',
    subtle: 'bg-depth-elevated border-depth-border shadow-subtle',
    elevated: 'bg-depth-elevated border-depth-border shadow-elevated',
    floating: 'bg-depth-surface border-depth-border shadow-floating',
  };

  return (
    <div
      className={cn(
        'border rounded-brand-card overflow-hidden transition-all duration-300',
        elevations[elevation],
        !noPadding && 'p-6',
        hover && 'hover:border-radiance-gold/30 hover:shadow-illumination cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
