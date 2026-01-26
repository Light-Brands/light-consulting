/**
 * Project Category Tabs Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import type { ProjectCategory } from '@/types/projects';

interface ProjectCategoryTabsProps {
  selected: ProjectCategory | 'all';
  onChange: (category: ProjectCategory | 'all') => void;
  counts?: Record<ProjectCategory | 'all', number>;
}

const CATEGORIES: { value: ProjectCategory | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'All Projects', icon: '📊' },
  { value: 'client_project', label: 'Client', icon: '👤' },
  { value: 'internal', label: 'Internal', icon: '🏠' },
  { value: 'maintenance', label: 'Maintenance', icon: '🔧' },
  { value: 'retainer', label: 'Retainer', icon: '📋' },
];

export const ProjectCategoryTabs: React.FC<ProjectCategoryTabsProps> = ({
  selected,
  onChange,
  counts,
}) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {CATEGORIES.map((category) => {
        const isSelected = selected === category.value;
        const count = counts?.[category.value];

        return (
          <button
            key={category.value}
            onClick={() => onChange(category.value)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              transition-all
              ${
                isSelected
                  ? 'bg-radiance-gold/10 text-radiance-gold border border-radiance-gold/30'
                  : 'bg-depth-surface border border-depth-border text-text-secondary hover:text-text-primary hover:border-radiance-gold/20'
              }
            `}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
            {count !== undefined && (
              <span
                className={`
                  px-1.5 py-0.5 text-xs rounded-full
                  ${isSelected ? 'bg-radiance-gold/20' : 'bg-depth-elevated'}
                `}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ProjectCategoryTabs;
