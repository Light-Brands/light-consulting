/**
 * Repository List Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { RepositoryCard, type RepositoryWithStats } from './RepositoryCard';

interface RepositoryListProps {
  repositories: RepositoryWithStats[];
  loading?: boolean;
  showRanks?: boolean;
  showLineStats?: boolean;
  showToggle?: boolean;
  showSyncButton?: boolean;
  syncingRepoId?: string | null;
  onToggleTracked?: (id: string, tracked: boolean) => void;
  onSyncRepo?: (id: string, fullName: string) => void;
  className?: string;
}

export const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
  loading,
  showRanks = false,
  showLineStats = false,
  showToggle = false,
  showSyncButton = false,
  syncingRepoId,
  onToggleTracked,
  onSyncRepo,
  className,
}) => {
  if (loading) {
    return (
      <div className={cn('space-y-3', className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-depth-surface rounded animate-pulse" />
              <div className="flex-1">
                <div className="h-5 w-32 bg-depth-surface rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-depth-surface rounded animate-pulse mb-3" />
                <div className="flex gap-4">
                  <div className="h-3 w-16 bg-depth-surface rounded animate-pulse" />
                  <div className="h-3 w-12 bg-depth-surface rounded animate-pulse" />
                  <div className="h-3 w-20 bg-depth-surface rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className={cn('bg-depth-elevated rounded-lg p-8 border border-depth-border text-center', className)}>
        <svg className="w-12 h-12 mx-auto text-text-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <p className="text-text-muted">No repositories found</p>
        <p className="text-sm text-text-muted mt-1">Sync your GitHub data to see repositories here</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {repositories.map((repo, index) => (
        <RepositoryCard
          key={repo.id}
          repository={repo}
          rank={showRanks ? index + 1 : undefined}
          showLineStats={showLineStats}
          showToggle={showToggle}
          showSyncButton={showSyncButton}
          syncingRepoId={syncingRepoId}
          onToggleTracked={onToggleTracked}
          onSyncRepo={onSyncRepo}
        />
      ))}
    </div>
  );
};

export default RepositoryList;
