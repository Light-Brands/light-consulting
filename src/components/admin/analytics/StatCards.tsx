/**
 * GitHub Stats Cards Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { GitHubSummaryStats } from '@/types/github-analytics';
import { formatNumber } from '@/types/github-analytics';

interface StatCardsProps {
  stats: GitHubSummaryStats | null;
  loading?: boolean;
  className?: string;
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  loading?: boolean;
  previousValue?: number | null;
  currentValue?: number;
}

function getChangeIndicator(current: number | undefined, previous: number | null | undefined): { text: string; color: string; icon: string } | null {
  if (previous === null || previous === undefined || current === undefined) return null;

  const diff = current - previous;
  if (diff === 0) return { text: 'No change', color: 'text-text-muted', icon: '→' };

  const percentChange = previous === 0 ? (diff > 0 ? 100 : 0) : Math.round((diff / previous) * 100);
  const isPositive = diff > 0;

  return {
    text: `${isPositive ? '+' : ''}${percentChange}%`,
    color: isPositive ? 'text-green-400' : 'text-red-400',
    icon: isPositive ? '↑' : '↓',
  };
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color, loading, previousValue, currentValue }) => {
  const change = getChangeIndicator(currentValue, previousValue);

  return (
    <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
      <div className="flex items-center gap-3">
        <div className={cn('p-2 rounded-lg', color)}>
          {icon}
        </div>
        <div className="min-w-0">
          {loading ? (
            <div className="h-6 w-16 bg-depth-surface rounded animate-pulse" />
          ) : (
            <div className="text-xl font-bold text-text-primary">
              {typeof value === 'number' ? formatNumber(value) : value}
            </div>
          )}
          <div className="text-xs text-text-muted">{label}</div>
          {!loading && change && (
            <div className={cn('text-[10px] mt-0.5', change.color)}>
              <span className="opacity-75">{change.icon}</span> {change.text} vs prev
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const StatCards: React.FC<StatCardsProps> = ({ stats, loading, className }) => {
  const previousPeriod = stats?.previous_period;

  const cards = [
    {
      label: 'Commits',
      value: stats?.total_commits ?? 0,
      currentValue: stats?.total_commits ?? 0,
      previousValue: previousPeriod?.total_commits,
      color: 'bg-blue-500/20 text-blue-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Lines Added',
      value: stats?.total_additions ?? 0,
      currentValue: stats?.total_additions ?? 0,
      previousValue: previousPeriod?.total_additions,
      color: 'bg-green-500/20 text-green-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      label: 'Lines Removed',
      value: stats?.total_deletions ?? 0,
      currentValue: stats?.total_deletions ?? 0,
      previousValue: previousPeriod?.total_deletions,
      color: 'bg-red-500/20 text-red-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
        </svg>
      ),
    },
    {
      label: 'PRs Opened',
      value: stats?.prs_opened ?? 0,
      currentValue: stats?.prs_opened ?? 0,
      previousValue: previousPeriod?.prs_opened,
      color: 'bg-purple-500/20 text-purple-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      label: 'Active Repos',
      value: stats?.active_repositories ?? 0,
      currentValue: stats?.active_repositories ?? 0,
      previousValue: previousPeriod?.active_repositories,
      color: 'bg-amber-500/20 text-amber-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Contributors',
      value: stats?.active_contributors ?? 0,
      currentValue: stats?.active_contributors ?? 0,
      previousValue: previousPeriod?.active_contributors,
      color: 'bg-cyan-500/20 text-cyan-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3', className)}>
      {cards.map((card) => (
        <StatCard
          key={card.label}
          label={card.label}
          value={card.value}
          icon={card.icon}
          color={card.color}
          loading={loading}
          previousValue={('previousValue' in card) ? card.previousValue : undefined}
          currentValue={('currentValue' in card) ? card.currentValue : undefined}
        />
      ))}
    </div>
  );
};

export default StatCards;
