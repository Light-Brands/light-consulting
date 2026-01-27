/**
 * Time Range Selector Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { TimeRange } from '@/types/github-analytics';
import { TIME_RANGE_OPTIONS } from '@/types/github-analytics';

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  className?: string;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-1 p-1 bg-depth-elevated rounded-lg', className)}>
      {TIME_RANGE_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
            value === option.value
              ? 'bg-radiance-gold text-depth-base shadow-sm'
              : 'text-text-secondary hover:text-text-primary hover:bg-depth-surface'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
