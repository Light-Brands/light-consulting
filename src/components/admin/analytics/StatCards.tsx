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
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color, loading }) => (
  <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
    <div className="flex items-center gap-3">
      <div className={cn('p-2 rounded-lg', color)}>
        {icon}
      </div>
      <div>
        {loading ? (
          <div className="h-6 w-16 bg-depth-surface rounded animate-pulse" />
        ) : (
          <div className="text-xl font-bold text-text-primary">
            {typeof value === 'number' ? formatNumber(value) : value}
          </div>
        )}
        <div className="text-xs text-text-muted">{label}</div>
      </div>
    </div>
  </div>
);

export const StatCards: React.FC<StatCardsProps> = ({ stats, loading, className }) => {
  const cards = [
    {
      label: 'Commits',
      value: stats?.total_commits ?? 0,
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
      color: 'bg-red-500/20 text-red-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
        </svg>
      ),
    },
    {
      label: 'Open PRs',
      value: stats?.open_prs ?? 0,
      color: 'bg-purple-500/20 text-purple-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      label: 'Repositories',
      value: stats?.tracked_repositories ?? 0,
      color: 'bg-amber-500/20 text-amber-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Contributors',
      value: stats?.total_contributors ?? 0,
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
        />
      ))}
    </div>
  );
};

export default StatCards;
