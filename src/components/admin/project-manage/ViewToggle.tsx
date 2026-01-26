/**
 * View Toggle Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';

export type ViewMode = 'kanban' | 'list';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ value, onChange }) => {
  return (
    <div className="inline-flex items-center bg-depth-base border border-depth-border rounded-lg p-0.5">
      <button
        onClick={() => onChange('kanban')}
        className={`
          p-1.5 rounded-md transition-colors
          ${value === 'kanban'
            ? 'bg-radiance-gold/20 text-radiance-gold'
            : 'text-text-muted hover:text-text-primary hover:bg-depth-elevated'
          }
        `}
        title="Kanban view"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      </button>
      <button
        onClick={() => onChange('list')}
        className={`
          p-1.5 rounded-md transition-colors
          ${value === 'list'
            ? 'bg-radiance-gold/20 text-radiance-gold'
            : 'text-text-muted hover:text-text-primary hover:bg-depth-elevated'
          }
        `}
        title="List view"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
};

export default ViewToggle;
