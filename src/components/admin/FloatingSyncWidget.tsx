/**
 * Floating Sync Widget
 * Light Brand Consulting
 *
 * Persistent floating widget showing GitHub sync progress
 * Appears in bottom-right corner and persists across page navigation
 */

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useSyncProgress } from '@/contexts/SyncProgressContext';

export const FloatingSyncWidget: React.FC = () => {
  const {
    isSyncing,
    progress,
    error,
    isWidgetVisible,
    dismissWidget,
  } = useSyncProgress();
  const [isExpanded, setIsExpanded] = useState(false);

  // Don't render if not visible
  if (!isWidgetVisible) {
    return null;
  }

  const progressPercent = progress?.total_repos && progress?.current_repo_index
    ? Math.round((progress.current_repo_index / progress.total_repos) * 100)
    : 0;

  const isComplete = !isSyncing && progress?.progress_message?.includes('completed');

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Collapsed view */}
      {!isExpanded && (
        <div
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl cursor-pointer transition-all',
            'border backdrop-blur-sm',
            error
              ? 'bg-red-500/10 border-red-500/30'
              : isComplete
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-depth-elevated border-depth-border'
          )}
          onClick={() => setIsExpanded(true)}
        >
          {/* Status icon */}
          {error ? (
            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : isComplete ? (
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-radiance-gold animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}

          {/* Progress bar or status text */}
          <div className="flex-1 min-w-[150px]">
            <div className="flex items-center justify-between mb-1">
              <span className={cn(
                'text-sm font-medium',
                error ? 'text-red-400' : isComplete ? 'text-green-400' : 'text-text-primary'
              )}>
                {error ? 'Sync Failed' : isComplete ? 'Sync Complete' : 'Syncing...'}
              </span>
              {!error && !isComplete && progress?.total_repos && (
                <span className="text-xs text-text-muted">{progressPercent}%</span>
              )}
            </div>
            {!error && !isComplete && (
              <div className="w-full h-1.5 bg-depth-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-radiance-gold transition-all duration-300"
                  style={{ width: `${progressPercent || 5}%` }}
                />
              </div>
            )}
          </div>

          {/* Expand button */}
          <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      )}

      {/* Expanded view */}
      {isExpanded && (
        <div className={cn(
          'w-80 rounded-xl shadow-2xl border backdrop-blur-sm',
          error
            ? 'bg-red-500/10 border-red-500/30'
            : isComplete
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-depth-elevated border-depth-border'
        )}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-depth-border/50">
            <div className="flex items-center gap-2">
              {error ? (
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : isComplete ? (
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-radiance-gold animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              <span className={cn(
                'font-medium',
                error ? 'text-red-400' : isComplete ? 'text-green-400' : 'text-text-primary'
              )}>
                {error ? 'Sync Failed' : isComplete ? 'Sync Complete' : 'GitHub Sync'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-depth-surface rounded transition-colors"
                title="Minimize"
              >
                <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {(isComplete || error) && (
                <button
                  onClick={dismissWidget}
                  className="p-1 hover:bg-depth-surface rounded transition-colors"
                  title="Dismiss"
                >
                  <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {error ? (
              <p className="text-sm text-red-400">{error}</p>
            ) : (
              <>
                {/* Progress message */}
                <p className="text-sm text-text-secondary">{progress?.progress_message || 'Preparing...'}</p>

                {/* Progress bar with repo info */}
                {progress?.current_repo && progress?.total_repos && !isComplete && (
                  <div>
                    <div className="flex justify-between text-xs text-text-muted mb-1">
                      <span>Repository {progress.current_repo_index} of {progress.total_repos}</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-depth-surface rounded-full overflow-hidden">
                      <div
                        className="h-full bg-radiance-gold transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-muted mt-1 truncate">{progress.current_repo}</p>
                  </div>
                )}

                {/* Stats counters */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="text-center p-2 bg-depth-surface rounded-lg">
                    <p className="text-lg font-semibold text-text-primary">
                      {(progress?.commits_synced || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-text-muted">Commits</p>
                  </div>
                  <div className="text-center p-2 bg-depth-surface rounded-lg">
                    <p className="text-lg font-semibold text-text-primary">
                      {(progress?.prs_synced || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-text-muted">PRs</p>
                  </div>
                  <div className="text-center p-2 bg-depth-surface rounded-lg">
                    <p className="text-lg font-semibold text-text-primary">
                      {(progress?.contributors_synced || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-text-muted">Contributors</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {!error && !isComplete && (
            <div className="px-4 py-2 border-t border-depth-border/50">
              <p className="text-xs text-text-muted text-center">
                This may take a few minutes for large repos...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingSyncWidget;
