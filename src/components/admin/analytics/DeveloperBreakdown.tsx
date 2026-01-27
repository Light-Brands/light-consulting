/**
 * Developer Breakdown Component
 * Light Brand Consulting
 *
 * Individual developer cards showing their contributions
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { TeamDeveloperWithStats } from '@/types/github-analytics';
import { formatNumber, getRelativeTime } from '@/types/github-analytics';

interface DeveloperBreakdownProps {
  developers: TeamDeveloperWithStats[];
  loading?: boolean;
  className?: string;
}

interface DeveloperCardProps {
  developer: TeamDeveloperWithStats;
  rank: number;
  maxNetLines: number;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  developer,
  rank,
  maxNetLines,
}) => {
  const percentage = maxNetLines > 0 ? (developer.net_lines / maxNetLines) * 100 : 0;

  // Rank badge colors
  const rankColors: Record<number, string> = {
    1: 'bg-radiance-gold text-depth-base',
    2: 'bg-gray-300 text-gray-800',
    3: 'bg-amber-600 text-white',
  };

  return (
    <div className="bg-depth-elevated rounded-xl p-4 border border-border-subtle hover:border-border-default transition-colors">
      <div className="flex items-start gap-4">
        {/* Avatar and rank */}
        <div className="relative">
          {developer.avatar_url ? (
            <img
              src={developer.avatar_url}
              alt={developer.github_login}
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-depth-base flex items-center justify-center">
              <svg className="w-7 h-7 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          {rank <= 3 && (
            <div
              className={cn(
                'absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                rankColors[rank] || 'bg-depth-surface text-text-muted'
              )}
            >
              {rank}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-text-primary truncate">
            {developer.display_name || developer.github_login}
          </div>
          {developer.display_name && (
            <div className="text-sm text-text-muted truncate">
              @{developer.github_login}
            </div>
          )}
          <div className="flex items-center gap-3 mt-1 text-sm">
            <span className="text-text-muted">
              {developer.repositories_count} {developer.repositories_count === 1 ? 'repo' : 'repos'}
            </span>
            <span className="text-text-muted">
              {formatNumber(developer.total_commits)} commits
            </span>
          </div>
        </div>

        {/* Net lines */}
        <div className="text-right">
          <div className="text-xl font-bold text-text-primary">
            {formatNumber(developer.net_lines)}
          </div>
          <div className="text-xs text-text-muted">net LOC</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-2 bg-depth-base rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-radiance-amber to-radiance-gold rounded-full transition-all duration-500"
            style={{ width: `${Math.max(percentage, 2)}%` }}
          />
        </div>
      </div>

      {/* Line stats */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-green-400">
            +{formatNumber(developer.total_additions)}
          </span>
          <span className="text-red-400">
            -{formatNumber(developer.total_deletions)}
          </span>
        </div>
        {developer.last_commit_at && (
          <span className="text-text-muted">
            Last commit {getRelativeTime(developer.last_commit_at)}
          </span>
        )}
      </div>
    </div>
  );
};

export const DeveloperBreakdown: React.FC<DeveloperBreakdownProps> = ({
  developers,
  loading,
  className,
}) => {
  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="h-6 w-48 bg-depth-elevated rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-depth-elevated rounded-xl p-4 border border-border-subtle">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-depth-surface animate-pulse" />
                <div className="flex-1">
                  <div className="h-5 w-24 bg-depth-surface rounded animate-pulse" />
                  <div className="h-4 w-32 bg-depth-surface rounded animate-pulse mt-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!developers || developers.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className="text-text-muted">
          No team developers configured. Click &quot;Manage Team&quot; to add team members.
        </div>
      </div>
    );
  }

  const maxNetLines = Math.max(...developers.map(d => d.net_lines), 1);

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Team Developer Breakdown
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {developers.map((dev, index) => (
          <DeveloperCard
            key={dev.github_login}
            developer={dev}
            rank={index + 1}
            maxNetLines={maxNetLines}
          />
        ))}
      </div>

      {/* Team summary */}
      <div className="mt-6 p-4 bg-depth-surface rounded-xl border border-border-subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-text-primary">
              {developers.length}
            </div>
            <div className="text-sm text-text-muted">Team Members</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text-primary">
              {formatNumber(developers.reduce((sum, d) => sum + d.total_commits, 0))}
            </div>
            <div className="text-sm text-text-muted">Total Commits</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              +{formatNumber(developers.reduce((sum, d) => sum + d.total_additions, 0))}
            </div>
            <div className="text-sm text-text-muted">Lines Added</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">
              -{formatNumber(developers.reduce((sum, d) => sum + d.total_deletions, 0))}
            </div>
            <div className="text-sm text-text-muted">Lines Removed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperBreakdown;
