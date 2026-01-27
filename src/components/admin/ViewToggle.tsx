/**
 * View Toggle Component
 * Light Brand Consulting
 *
 * Toggle between card and list views
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type ViewMode = 'card' | 'list';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  onViewModeChange,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-1 bg-depth-base border border-depth-border rounded-lg p-1', className)}>
      <button
        onClick={() => onViewModeChange('card')}
        className={cn(
          'p-2 rounded-md transition-all',
          viewMode === 'card'
            ? 'bg-radiance-gold/10 text-radiance-gold'
            : 'text-text-muted hover:text-text-primary hover:bg-depth-elevated'
        )}
        title="Card view"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={cn(
          'p-2 rounded-md transition-all',
          viewMode === 'list'
            ? 'bg-radiance-gold/10 text-radiance-gold'
            : 'text-text-muted hover:text-text-primary hover:bg-depth-elevated'
        )}
        title="List view"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
};

export default ViewToggle;
