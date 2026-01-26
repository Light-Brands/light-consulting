/**
 * Command Center Stats Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import type { CommandCenterStats as Stats } from '@/types/projects';

interface CommandCenterStatsProps {
  stats: Stats;
  isLoading?: boolean;
  onFilterClick?: (filter: string, value: string) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const CommandCenterStats: React.FC<CommandCenterStatsProps> = ({
  stats,
  isLoading = false,
  onFilterClick,
}) => {
  const statItems = [
    {
      label: 'Active',
      value: stats.total_active,
      color: 'text-radiance-gold',
      filter: null,
    },
    {
      label: 'On Track',
      value: stats.on_track,
      color: 'text-green-400',
      bgColor: 'hover:bg-green-500/10',
      filter: { key: 'health_status', value: 'on_track' },
    },
    {
      label: 'At Risk',
      value: stats.at_risk,
      color: 'text-amber-400',
      bgColor: 'hover:bg-amber-500/10',
      filter: { key: 'health_status', value: 'at_risk' },
    },
    {
      label: 'Behind',
      value: stats.behind,
      color: 'text-orange-400',
      bgColor: 'hover:bg-orange-500/10',
      filter: { key: 'health_status', value: 'behind' },
    },
    {
      label: 'Blocked',
      value: stats.blocked,
      color: 'text-red-400',
      bgColor: 'hover:bg-red-500/10',
      filter: { key: 'health_status', value: 'blocked' },
    },
    {
      label: 'On Hold',
      value: stats.on_hold,
      color: 'text-gray-400',
      bgColor: 'hover:bg-gray-500/10',
      filter: { key: 'is_on_hold', value: 'true' },
    },
    {
      label: 'Urgent',
      value: stats.urgent_count,
      color: 'text-red-400',
      bgColor: 'hover:bg-red-500/10',
      filter: { key: 'priority', value: 'urgent' },
    },
    {
      label: 'Value',
      value: formatCurrency(stats.total_value),
      color: 'text-radiance-gold',
      isValue: true,
      filter: null,
    },
  ];

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
      {statItems.map((stat) => {
        const isClickable = stat.filter && onFilterClick;

        return (
          <button
            key={stat.label}
            onClick={() => {
              if (isClickable && stat.filter) {
                onFilterClick(stat.filter.key, stat.filter.value);
              }
            }}
            disabled={!isClickable}
            className={`
              bg-depth-surface border border-depth-border rounded-lg md:rounded-xl
              px-2 py-2 md:px-4 md:py-3 text-center transition-all
              ${isClickable ? `cursor-pointer ${stat.bgColor || 'hover:bg-depth-elevated'}` : 'cursor-default'}
            `}
          >
            <p
              className={`font-bold ${stat.color} ${
                stat.isValue ? 'text-xs md:text-base' : 'text-lg md:text-2xl'
              }`}
            >
              {isLoading ? '-' : stat.value}
            </p>
            <p className="text-[9px] md:text-xs text-text-muted truncate">
              {stat.label}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default CommandCenterStats;
