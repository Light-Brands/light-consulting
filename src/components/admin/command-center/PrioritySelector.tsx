/**
 * Priority Selector Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { ProjectPriority } from '@/types/projects';

interface PrioritySelectorProps {
  value: ProjectPriority;
  onChange: (value: ProjectPriority) => void;
  disabled?: boolean;
}

const PRIORITY_CONFIG: Record<ProjectPriority, { label: string; color: string; bgColor: string }> = {
  urgent: {
    label: 'Urgent',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 hover:bg-red-500/20',
  },
  high: {
    label: 'High',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10 hover:bg-orange-500/20',
  },
  medium: {
    label: 'Medium',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10 hover:bg-amber-500/20',
  },
  low: {
    label: 'Low',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10 hover:bg-gray-500/20',
  },
};

const PRIORITIES: ProjectPriority[] = ['urgent', 'high', 'medium', 'low'];

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentConfig = PRIORITY_CONFIG[value] || PRIORITY_CONFIG.medium;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium
          transition-colors ${currentConfig.color} ${currentConfig.bgColor}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {currentConfig.label}
        {!disabled && (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-depth-surface border border-depth-border rounded-lg shadow-lg overflow-hidden min-w-[120px]">
          {PRIORITIES.map((priority) => {
            const config = PRIORITY_CONFIG[priority];
            return (
              <button
                key={priority}
                onClick={() => {
                  onChange(priority);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-3 py-2 text-left text-sm font-medium
                  transition-colors ${config.color} hover:bg-depth-elevated
                  ${priority === value ? 'bg-depth-elevated' : ''}
                `}
              >
                {config.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PrioritySelector;
