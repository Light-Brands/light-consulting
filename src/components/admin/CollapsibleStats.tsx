/**
 * Collapsible Stats Component
 * Light Brand Consulting
 *
 * Wrapper for stats that collapses on mobile with expand/collapse toggle
 */

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface CollapsibleStatsProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export const CollapsibleStats: React.FC<CollapsibleStatsProps> = ({
  children,
  defaultExpanded = false,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={cn('mb-4 md:mb-8', className)}>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full flex items-center justify-between px-3 py-2 mb-2 bg-depth-surface border border-depth-border rounded-lg text-sm"
      >
        <span className="text-text-secondary font-medium">
          {isExpanded ? 'Hide Stats' : 'Show Stats'}
        </span>
        <svg
          className={cn(
            'w-4 h-4 text-text-muted transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Stats container - always visible on desktop, collapsible on mobile */}
      <div
        className={cn(
          'transition-all duration-300 overflow-hidden',
          // Desktop: always visible
          'md:max-h-none md:opacity-100',
          // Mobile: collapsible
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsibleStats;
