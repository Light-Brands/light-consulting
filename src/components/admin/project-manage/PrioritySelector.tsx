/**
 * Priority Selector Component for Deliverables
 * Light Brand Consulting
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { DeliverablePriority } from '@/types/deliverables';
import { DELIVERABLE_PRIORITY_CONFIGS } from '@/types/deliverables';

interface PrioritySelectorProps {
  value: DeliverablePriority;
  onChange: (value: DeliverablePriority) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  value,
  onChange,
  disabled = false,
  size = 'md',
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

  const currentConfig = DELIVERABLE_PRIORITY_CONFIGS.find((p) => p.value === value) || DELIVERABLE_PRIORITY_CONFIGS[2];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          inline-flex items-center gap-1 rounded-lg font-medium
          transition-colors
          ${currentConfig.color} ${currentConfig.bgColor}
          ${sizeClasses[size]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
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
        <div className="absolute top-full left-0 mt-1 z-50 bg-depth-surface border border-depth-border rounded-lg shadow-lg overflow-hidden min-w-[100px]">
          {DELIVERABLE_PRIORITY_CONFIGS.map((priority) => (
            <button
              key={priority.value}
              onClick={() => {
                onChange(priority.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-3 py-2 text-left text-sm font-medium
                transition-colors hover:bg-depth-elevated
                ${priority.color}
                ${priority.value === value ? 'bg-depth-elevated' : ''}
              `}
            >
              {priority.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrioritySelector;
