/**
 * Floating Sync Widget
 * Light Brand Consulting
 *
 * Persistent floating widget showing GitHub sync progress
 * Supports multiple concurrent repo syncs with individual status
 */

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useSyncProgress, type RepoSyncJob, type GlobalSyncJob } from '@/contexts/SyncProgressContext';

// Status icon component
const StatusIcon: React.FC<{ status: RepoSyncJob['status'] | GlobalSyncJob['status']; className?: string }> = ({ status, className }) => {
  if (status === 'queued') {
    return (
      <svg className={cn('w-4 h-4 text-text-muted', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (status === 'running') {
    return (
      <svg className={cn('w-4 h-4 text-radiance-gold animate-spin', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    );
  }
  if (status === 'completed') {
    return (
      <svg className={cn('w-4 h-4 text-green-400', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  // failed
  return (
    <svg className={cn('w-4 h-4 text-red-400', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

// Single repo job row
const RepoJobRow: React.FC<{
  job: RepoSyncJob;
  onDismiss: (id: string) => void;
}> = ({ job, onDismiss }) => {
  return (
    <div className={cn(
      'p-3 rounded-lg border',
      job.status === 'running' && 'bg-radiance-gold/5 border-radiance-gold/20',
      job.status === 'queued' && 'bg-depth-surface border-depth-border/50',
      job.status === 'completed' && 'bg-green-500/5 border-green-500/20',
      job.status === 'failed' && 'bg-red-500/5 border-red-500/20',
    )}>
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <StatusIcon status={job.status} />
          <span className="font-medium text-sm text-text-primary truncate">{job.repoName}</span>
        </div>
        {(job.status === 'completed' || job.status === 'failed') && (
          <button
            onClick={() => onDismiss(job.id)}
            className="p-0.5 hover:bg-depth-surface rounded transition-colors shrink-0"
          >
            <svg className="w-3.5 h-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {job.status === 'queued' && (
        <p className="text-xs text-text-muted">Waiting in queue...</p>
      )}

      {job.status === 'running' && (
        <div className="space-y-1">
          <p className="text-xs text-text-secondary">{job.progress_message || 'Syncing...'}</p>
          <div className="flex items-center gap-3 text-xs text-text-muted">
            {job.commits_synced !== undefined && (
              <span>{job.commits_synced.toLocaleString()} commits</span>
            )}
            {job.prs_synced !== undefined && (
              <span>{job.prs_synced} PRs</span>
            )}
          </div>
        </div>
      )}

      {job.status === 'completed' && (
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="text-green-400">{(job.commits_synced || 0).toLocaleString()} commits</span>
          <span>{job.prs_synced || 0} PRs</span>
          <span>{job.contributors_synced || 0} contributors</span>
        </div>
      )}

      {job.status === 'failed' && (
        <p className="text-xs text-red-400">{job.error || 'Sync failed'}</p>
      )}
    </div>
  );
};

// Global sync card
const GlobalSyncCard: React.FC<{ job: GlobalSyncJob }> = ({ job }) => {
  const progressPercent = job.total_repos && job.current_repo_index
    ? Math.round((job.current_repo_index / job.total_repos) * 100)
    : 0;

  return (
    <div className={cn(
      'p-3 rounded-lg border',
      job.status === 'running' && 'bg-radiance-gold/5 border-radiance-gold/20',
      job.status === 'completed' && 'bg-green-500/5 border-green-500/20',
      job.status === 'failed' && 'bg-red-500/5 border-red-500/20',
    )}>
      <div className="flex items-center gap-2 mb-2">
        <StatusIcon status={job.status} />
        <span className="font-medium text-sm text-text-primary">
          {job.type === 'full' ? 'Full Sync' : 'Quick Sync'}
        </span>
      </div>

      <p className="text-xs text-text-secondary mb-2">{job.progress_message || 'Working...'}</p>

      {job.status === 'running' && job.total_repos && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-text-muted mb-1">
            <span>Repo {job.current_repo_index} of {job.total_repos}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-depth-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-radiance-gold transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {job.current_repo && (
            <p className="text-xs text-text-muted mt-1 truncate">{job.current_repo}</p>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 text-xs text-text-muted">
        <span>{(job.commits_synced || 0).toLocaleString()} commits</span>
        <span>{job.prs_synced || 0} PRs</span>
        <span>{job.contributors_synced || 0} contributors</span>
      </div>
    </div>
  );
};

export const FloatingSyncWidget: React.FC = () => {
  const {
    repoJobs,
    globalJob,
    isWidgetVisible,
    dismissWidget,
    dismissJob,
    clearCompletedJobs,
  } = useSyncProgress();
  const [isExpanded, setIsExpanded] = useState(false);

  // Don't render if not visible
  if (!isWidgetVisible) {
    return null;
  }

  const hasJobs = repoJobs.length > 0 || globalJob !== null;
  if (!hasJobs) {
    return null;
  }

  const runningCount = repoJobs.filter(j => j.status === 'running').length + (globalJob?.status === 'running' ? 1 : 0);
  const queuedCount = repoJobs.filter(j => j.status === 'queued').length;
  const completedCount = repoJobs.filter(j => j.status === 'completed').length + (globalJob?.status === 'completed' ? 1 : 0);
  const failedCount = repoJobs.filter(j => j.status === 'failed').length + (globalJob?.status === 'failed' ? 1 : 0);
  const totalJobs = repoJobs.length + (globalJob ? 1 : 0);

  const isAllComplete = runningCount === 0 && queuedCount === 0;
  const hasErrors = failedCount > 0;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Collapsed view */}
      {!isExpanded && (
        <div
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl cursor-pointer transition-all',
            'border backdrop-blur-sm min-w-[200px]',
            hasErrors
              ? 'bg-red-500/10 border-red-500/30'
              : isAllComplete
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-depth-elevated border-depth-border'
          )}
          onClick={() => setIsExpanded(true)}
        >
          {/* Status icon */}
          {hasErrors ? (
            <StatusIcon status="failed" className="w-5 h-5" />
          ) : isAllComplete ? (
            <StatusIcon status="completed" className="w-5 h-5" />
          ) : (
            <StatusIcon status="running" className="w-5 h-5" />
          )}

          {/* Summary text */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className={cn(
                'text-sm font-medium',
                hasErrors ? 'text-red-400' : isAllComplete ? 'text-green-400' : 'text-text-primary'
              )}>
                {isAllComplete
                  ? `${completedCount} Complete`
                  : runningCount > 0
                    ? `Syncing ${runningCount} repo${runningCount > 1 ? 's' : ''}`
                    : `${queuedCount} Queued`
                }
              </span>
            </div>
            {!isAllComplete && (
              <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                {queuedCount > 0 && <span>{queuedCount} queued</span>}
                {completedCount > 0 && <span className="text-green-400">{completedCount} done</span>}
              </div>
            )}
          </div>

          {/* Expand icon */}
          <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      )}

      {/* Expanded view */}
      {isExpanded && (
        <div className="w-96 max-h-[70vh] flex flex-col rounded-xl shadow-2xl border backdrop-blur-sm bg-depth-elevated border-depth-border">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-depth-border/50 shrink-0">
            <div className="flex items-center gap-2">
              {hasErrors ? (
                <StatusIcon status="failed" className="w-5 h-5" />
              ) : isAllComplete ? (
                <StatusIcon status="completed" className="w-5 h-5" />
              ) : (
                <StatusIcon status="running" className="w-5 h-5" />
              )}
              <span className="font-medium text-text-primary">
                GitHub Sync
              </span>
              <span className="text-xs text-text-muted">
                ({totalJobs} job{totalJobs !== 1 ? 's' : ''})
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
              {isAllComplete && (
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

          {/* Jobs list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {/* Global sync job */}
            {globalJob && (
              <GlobalSyncCard job={globalJob} />
            )}

            {/* Repo sync jobs */}
            {repoJobs.map(job => (
              <RepoJobRow key={job.id} job={job} onDismiss={dismissJob} />
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-depth-border/50 shrink-0">
            {!isAllComplete ? (
              <p className="text-xs text-text-muted text-center">
                {queuedCount > 0
                  ? `Processing queue (${queuedCount} remaining)...`
                  : 'Syncing in progress...'}
              </p>
            ) : completedCount > 0 && (
              <button
                onClick={clearCompletedJobs}
                className="w-full text-xs text-text-muted hover:text-text-secondary text-center py-1"
              >
                Clear completed
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingSyncWidget;
