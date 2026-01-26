/**
 * Project Progress Bar Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';

interface ProjectProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export const ProjectProgressBar: React.FC<ProjectProgressBarProps> = ({
  progress,
  showLabel = true,
  size = 'md',
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-muted">Progress</span>
          <span className="text-sm font-semibold text-text-primary">
            {clampedProgress}%
          </span>
        </div>
      )}
      <div className={`w-full bg-depth-elevated rounded-full overflow-hidden ${SIZE_CLASSES[size]}`}>
        <div
          className="h-full bg-gradient-to-r from-radiance-gold to-radiance-amber rounded-full transition-all duration-500"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProjectProgressBar;
