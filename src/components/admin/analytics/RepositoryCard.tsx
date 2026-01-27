/**
 * Repository Card Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { GitHubRepository } from '@/types/github-analytics';
import { formatNumber, getRelativeTime } from '@/types/github-analytics';

export interface RepositoryWithStats extends GitHubRepository {
  total_additions?: number;
  total_deletions?: number;
  stats_start_date?: string | null;
  stats_end_date?: string | null;
}

interface RepositoryCardProps {
  repository: RepositoryWithStats;
  rank?: number;
  showStats?: boolean;
  showLineStats?: boolean;
  showToggle?: boolean;
  showSyncButton?: boolean;
  syncingRepoId?: string | null;
  onToggleTracked?: (id: string, tracked: boolean) => void;
  onSyncRepo?: (id: string, fullName: string) => void;
  className?: string;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
  rank,
  showStats = true,
  showLineStats = false,
  showToggle = false,
  showSyncButton = false,
  syncingRepoId,
  onToggleTracked,
  onSyncRepo,
  className,
}) => {
  const isSyncing = syncingRepoId === repository.id;
  const languageColors: Record<string, string> = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-500',
    Python: 'bg-green-500',
    Rust: 'bg-orange-500',
    Go: 'bg-cyan-500',
    Java: 'bg-red-500',
    Ruby: 'bg-red-400',
    PHP: 'bg-purple-500',
    CSS: 'bg-pink-500',
    HTML: 'bg-orange-400',
  };

  const handleToggle = () => {
    if (onToggleTracked) {
      onToggleTracked(repository.id, !repository.is_tracked);
    }
  };

  return (
    <div className={cn(
      'bg-depth-elevated rounded-lg p-4 border transition-colors',
      repository.is_tracked
        ? 'border-depth-border hover:border-radiance-gold/30'
        : 'border-depth-border/50 opacity-60',
      className
    )}>
      <div className="flex items-start gap-3">
        {rank && (
          <div className="flex-shrink-0 w-6 h-6 rounded bg-radiance-gold/20 text-radiance-gold text-xs font-bold flex items-center justify-center">
            {rank}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 min-w-0">
              <h4 className="font-medium text-text-primary truncate">{repository.name}</h4>
              {repository.is_private && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-amber-500/20 text-amber-400 rounded shrink-0">
                  Private
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {showSyncButton && onSyncRepo && (
                <button
                  onClick={() => onSyncRepo(repository.id, repository.full_name)}
                  disabled={isSyncing}
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1',
                    isSyncing
                      ? 'bg-radiance-gold/20 text-radiance-gold cursor-not-allowed'
                      : 'bg-depth-surface text-text-muted hover:bg-radiance-gold/20 hover:text-radiance-gold'
                  )}
                  title="Sync this repository"
                >
                  <svg
                    className={cn('w-3 h-3', isSyncing && 'animate-spin')}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {isSyncing ? 'Syncing...' : 'Sync'}
                </button>
              )}
              {showToggle && (
                <button
                  onClick={handleToggle}
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded transition-colors',
                    repository.is_tracked
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : 'bg-depth-surface text-text-muted hover:bg-depth-border'
                  )}
                  title={repository.is_tracked ? 'Included in totals - click to exclude' : 'Excluded from totals - click to include'}
                >
                  {repository.is_tracked ? 'Included' : 'Excluded'}
                </button>
              )}
            </div>
          </div>

          {repository.description && (
            <p className="text-sm text-text-muted line-clamp-2 mb-3">{repository.description}</p>
          )}

          {/* Line stats */}
          {showLineStats && (repository.total_additions !== undefined || repository.total_deletions !== undefined) && (
            <div className="flex items-center gap-4 mb-3 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-green-400 font-medium">+{formatNumber(repository.total_additions || 0)}</span>
                <span className="text-text-muted">/</span>
                <span className="text-red-400 font-medium">-{formatNumber(repository.total_deletions || 0)}</span>
              </div>
              {repository.stats_start_date && repository.stats_end_date && (
                <span className="text-xs text-text-muted">
                  ({repository.stats_start_date} to {repository.stats_end_date})
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-text-muted">
            {repository.language && (
              <div className="flex items-center gap-1.5">
                <div className={cn(
                  'w-2.5 h-2.5 rounded-full',
                  languageColors[repository.language] || 'bg-gray-500'
                )} />
                <span>{repository.language}</span>
              </div>
            )}
            {showStats && (
              <>
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>{formatNumber(repository.stars_count)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>{formatNumber(repository.forks_count)}</span>
                </div>
              </>
            )}
            {repository.pushed_at && (
              <span className="text-text-muted">
                Updated {getRelativeTime(repository.pushed_at)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
