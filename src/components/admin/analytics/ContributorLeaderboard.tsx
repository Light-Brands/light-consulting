/**
 * Contributor Leaderboard Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { AggregatedContributor } from '@/types/github-analytics';
import { formatNumber, formatLinesChanged } from '@/types/github-analytics';

interface ContributorLeaderboardProps {
  contributors: AggregatedContributor[];
  loading?: boolean;
  className?: string;
}

export const ContributorLeaderboard: React.FC<ContributorLeaderboardProps> = ({
  contributors,
  loading,
  className,
}) => {
  if (loading) {
    return (
      <div className={cn('bg-depth-elevated rounded-lg border border-depth-border', className)}>
        <div className="p-4 border-b border-depth-border">
          <div className="h-5 w-32 bg-depth-surface rounded animate-pulse" />
        </div>
        <div className="divide-y divide-depth-border">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <div className="w-6 h-6 bg-depth-surface rounded animate-pulse" />
              <div className="w-10 h-10 bg-depth-surface rounded-full animate-pulse" />
              <div className="flex-1">
                <div className="h-4 w-24 bg-depth-surface rounded animate-pulse mb-2" />
                <div className="h-3 w-32 bg-depth-surface rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (contributors.length === 0) {
    return (
      <div className={cn('bg-depth-elevated rounded-lg border border-depth-border p-8 text-center', className)}>
        <svg className="w-12 h-12 mx-auto text-text-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <p className="text-text-muted">No contributors found</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-depth-elevated rounded-lg border border-depth-border', className)}>
      <div className="p-4 border-b border-depth-border">
        <h3 className="text-sm font-medium text-text-primary">Top Contributors</h3>
      </div>
      <div className="divide-y divide-depth-border">
        {contributors.map((contributor, index) => (
          <div key={contributor.github_login} className="p-4 flex items-center gap-4 hover:bg-depth-surface/50 transition-colors">
            {/* Rank */}
            <div className={cn(
              'flex-shrink-0 w-6 h-6 rounded text-xs font-bold flex items-center justify-center',
              index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
              index === 1 ? 'bg-gray-400/20 text-gray-300' :
              index === 2 ? 'bg-amber-600/20 text-amber-500' :
              'bg-depth-surface text-text-muted'
            )}>
              {index + 1}
            </div>

            {/* Avatar */}
            {contributor.avatar_url ? (
              <img
                src={contributor.avatar_url}
                alt={contributor.github_login}
                className="w-10 h-10 rounded-full border border-depth-border"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-radiance-gold/20 flex items-center justify-center text-radiance-gold font-medium">
                {contributor.github_login.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-text-primary truncate">
                {contributor.github_login}
              </div>
              <div className="text-xs text-text-muted">
                {contributor.repositories_count} {contributor.repositories_count === 1 ? 'repo' : 'repos'}
              </div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className="text-sm font-medium text-text-primary">
                {formatNumber(contributor.total_commits)} commits
              </div>
              <div className="text-xs text-text-muted">
                {formatLinesChanged(contributor.total_additions, contributor.total_deletions)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributorLeaderboard;
