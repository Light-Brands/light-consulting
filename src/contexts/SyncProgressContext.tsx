/**
 * Sync Progress Context
 * Light Brand Consulting
 *
 * Global state management for GitHub sync progress
 * Allows sync status to persist across page navigation
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

export interface SyncProgress {
  progress_message?: string | null;
  current_repo?: string | null;
  current_repo_index?: number | null;
  total_repos?: number | null;
  commits_synced?: number;
  prs_synced?: number;
  contributors_synced?: number;
}

interface SyncProgressContextValue {
  // State
  isSyncing: boolean;
  progress: SyncProgress | null;
  error: string | null;
  lastSyncCompleted: Date | null;

  // Actions
  startSync: (syncType: 'incremental' | 'full', repositoryId?: string) => Promise<void>;
  clearError: () => void;
  dismissWidget: () => void;
  isWidgetVisible: boolean;
}

const SyncProgressContext = createContext<SyncProgressContextValue | null>(null);

export function useSyncProgress() {
  const context = useContext(SyncProgressContext);
  if (!context) {
    throw new Error('useSyncProgress must be used within a SyncProgressProvider');
  }
  return context;
}

export function SyncProgressProvider({ children }: { children: React.ReactNode }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState<SyncProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastSyncCompleted, setLastSyncCompleted] = useState<Date | null>(null);
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Poll for sync progress
  const pollSyncProgress = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/analytics/github/sync');
      const result = await response.json();

      if (result.data?.history?.[0]) {
        const latest = result.data.history[0];
        if (latest.status === 'running') {
          setProgress({
            progress_message: latest.progress_message,
            current_repo: latest.current_repo,
            current_repo_index: latest.current_repo_index,
            total_repos: latest.total_repos,
            commits_synced: latest.commits_synced,
            prs_synced: latest.prs_synced,
            contributors_synced: latest.contributors_synced,
          });
          return true; // Still running
        } else if (latest.status === 'completed') {
          // Sync completed
          setProgress({
            progress_message: 'Sync completed!',
            commits_synced: latest.commits_synced,
            prs_synced: latest.prs_synced,
            contributors_synced: latest.contributors_synced,
          });
          setLastSyncCompleted(new Date());
          setIsSyncing(false);
          return false;
        } else if (latest.status === 'failed') {
          setError(latest.error_message || 'Sync failed');
          setIsSyncing(false);
          return false;
        }
      }
      return false;
    } catch (err) {
      console.error('Failed to poll sync status:', err);
      return false;
    }
  }, []);

  // Start sync
  const startSync = useCallback(async (syncType: 'incremental' | 'full', repositoryId?: string) => {
    try {
      setIsSyncing(true);
      setIsWidgetVisible(true);
      setError(null);
      setProgress({ progress_message: 'Starting sync...' });

      const body: Record<string, string> = { sync_type: syncType };
      if (repositoryId) {
        body.repository_id = repositoryId;
      }

      const response = await fetch('/api/admin/analytics/github/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        setIsSyncing(false);
        return;
      }

      // Start polling for progress
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }

      pollingRef.current = setInterval(async () => {
        const stillRunning = await pollSyncProgress();
        if (!stillRunning && pollingRef.current) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
        }
      }, 1500);
    } catch (err) {
      setError('Failed to start sync');
      setIsSyncing(false);
      console.error('Sync error:', err);
    }
  }, [pollSyncProgress]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Dismiss widget
  const dismissWidget = useCallback(() => {
    setIsWidgetVisible(false);
    setProgress(null);
    setError(null);
  }, []);

  // Check for running sync on mount
  useEffect(() => {
    const checkExistingSync = async () => {
      try {
        const response = await fetch('/api/admin/analytics/github/sync');
        const result = await response.json();

        if (result.data?.history?.[0]?.status === 'running') {
          setIsSyncing(true);
          setIsWidgetVisible(true);

          // Start polling
          pollingRef.current = setInterval(async () => {
            const stillRunning = await pollSyncProgress();
            if (!stillRunning && pollingRef.current) {
              clearInterval(pollingRef.current);
              pollingRef.current = null;
            }
          }, 1500);
        }
      } catch (err) {
        console.error('Failed to check existing sync:', err);
      }
    };

    checkExistingSync();

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [pollSyncProgress]);

  const value: SyncProgressContextValue = {
    isSyncing,
    progress,
    error,
    lastSyncCompleted,
    startSync,
    clearError,
    dismissWidget,
    isWidgetVisible,
  };

  return (
    <SyncProgressContext.Provider value={value}>
      {children}
    </SyncProgressContext.Provider>
  );
}
