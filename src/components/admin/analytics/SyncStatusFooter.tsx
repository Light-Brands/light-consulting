/**
 * Sync Status Footer Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { getRelativeTime } from '@/types/github-analytics';

interface SyncStatusFooterProps {
  lastSyncAt: string | null;
  isRunning: boolean;
  onSync: () => void;
  loading?: boolean;
  className?: string;
}

export const SyncStatusFooter: React.FC<SyncStatusFooterProps> = ({
  lastSyncAt,
  isRunning,
  onSync,
  loading,
  className,
}) => {
  return (
    <div className={cn(
      'flex items-center justify-between px-4 py-3 bg-depth-elevated rounded-lg border border-depth-border',
      className
    )}>
      <div className="flex items-center gap-3">
        {isRunning ? (
          <>
            <div className="w-4 h-4 border-2 border-radiance-gold border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-text-secondary">Syncing...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-text-muted">
              {lastSyncAt ? (
                <>Last sync: <span className="text-text-secondary">{getRelativeTime(lastSyncAt)}</span></>
              ) : (
                'Never synced'
              )}
            </span>
          </>
        )}
      </div>

      <button
        onClick={onSync}
        disabled={isRunning || loading}
        className={cn(
          'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all',
          isRunning || loading
            ? 'bg-depth-surface text-text-muted cursor-not-allowed'
            : 'bg-radiance-gold text-depth-base hover:bg-radiance-amber'
        )}
      >
        <svg className={cn('w-4 h-4', isRunning && 'animate-spin')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {isRunning ? 'Syncing...' : 'Sync Now'}
      </button>
    </div>
  );
};

export default SyncStatusFooter;
