/**
 * Health Status Badge Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import type { HealthStatus } from '@/types/projects';

interface HealthStatusBadgeProps {
  status: HealthStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const STATUS_CONFIG: Record<HealthStatus, { label: string; color: string; bgColor: string; icon: string }> = {
  on_track: {
    label: 'On Track',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    icon: '✓',
  },
  at_risk: {
    label: 'At Risk',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    icon: '⚠',
  },
  behind: {
    label: 'Behind',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    icon: '⏰',
  },
  blocked: {
    label: 'Blocked',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    icon: '✕',
  },
};

const SIZE_CLASSES = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export const HealthStatusBadge: React.FC<HealthStatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.on_track;

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-medium
        ${config.color} ${config.bgColor} ${SIZE_CLASSES[size]}
      `}
    >
      {showIcon && <span className="text-[0.8em]">{config.icon}</span>}
      {config.label}
    </span>
  );
};

export default HealthStatusBadge;
