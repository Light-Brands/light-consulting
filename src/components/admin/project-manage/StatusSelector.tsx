/**
 * Status Selector Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { DeliverableStatus } from '@/types/deliverables';
import { DELIVERABLE_STATUS_CONFIGS } from '@/types/deliverables';

interface StatusSelectorProps {
  value: DeliverableStatus;
  onChange: (value: DeliverableStatus) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  excludeCancelled?: boolean;
}

const STATUS_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  gray: {
    text: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
  },
  blue: {
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  purple: {
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
  },
  green: {
    text: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
  },
};

export const StatusSelector: React.FC<StatusSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  size = 'md',
  excludeCancelled = true,
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

  const statuses = excludeCancelled
    ? DELIVERABLE_STATUS_CONFIGS.filter((s) => s.value !== 'cancelled')
    : DELIVERABLE_STATUS_CONFIGS;

  const currentConfig = DELIVERABLE_STATUS_CONFIGS.find((s) => s.value === value) || DELIVERABLE_STATUS_CONFIGS[0];
  const colors = STATUS_COLORS[currentConfig.color] || STATUS_COLORS.gray;

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
          inline-flex items-center gap-1 rounded-full font-medium
          transition-colors border
          ${colors.text} ${colors.bg} ${colors.border}
          ${sizeClasses[size]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
        `}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {currentConfig.label}
        {!disabled && (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-depth-surface border border-depth-border rounded-lg shadow-lg overflow-hidden min-w-[140px]">
          {statuses.map((status) => {
            const statusColors = STATUS_COLORS[status.color] || STATUS_COLORS.gray;
            return (
              <button
                key={status.value}
                onClick={() => {
                  onChange(status.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-3 py-2 text-left text-sm flex items-center gap-2
                  transition-colors hover:bg-depth-elevated
                  ${status.value === value ? 'bg-depth-elevated' : ''}
                  ${statusColors.text}
                `}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {status.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatusSelector;
