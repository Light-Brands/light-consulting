/**
 * Sync Progress Context
 * Light Brand Consulting
 *
 * Global state management for GitHub sync progress
 * Supports multiple concurrent repo syncs with persistence across page refreshes
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

// Storage key for persistence
const STORAGE_KEY = 'github_sync_state';

export interface RepoSyncJob {
  id: string;
  repoId: string;
  repoName: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress_message?: string;
  commits_synced?: number;
  prs_synced?: number;
  contributors_synced?: number;
  error?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface GlobalSyncJob {
  id: string;
  type: 'incremental' | 'full';
  status: 'running' | 'completed' | 'failed';
  progress_message?: string;
  current_repo?: string;
  current_repo_index?: number;
  total_repos?: number;
  commits_synced?: number;
  prs_synced?: number;
  contributors_synced?: number;
  error?: string;
}

interface SyncState {
  repoJobs: RepoSyncJob[];
  globalJob: GlobalSyncJob | null;
  isWidgetVisible: boolean;
  lastNotified: string | null;
}

interface SyncProgressContextValue {
  // State
  repoJobs: RepoSyncJob[];
  globalJob: GlobalSyncJob | null;
  isWidgetVisible: boolean;
  isSyncing: boolean;

  // Legacy compatibility
  progress: {
    progress_message?: string | null;
    current_repo?: string | null;
    current_repo_index?: number | null;
    total_repos?: number | null;
    commits_synced?: number;
    prs_synced?: number;
    contributors_synced?: number;
  } | null;
  error: string | null;
  lastSyncCompleted: Date | null;

  // Actions
  startSync: (syncType: 'incremental' | 'full', repositoryId?: string, repoName?: string) => Promise<void>;
  startRepoSync: (repoId: string, repoName: string) => void;
  clearError: () => void;
  dismissWidget: () => void;
  dismissJob: (jobId: string) => void;
  clearCompletedJobs: () => void;
}

const SyncProgressContext = createContext<SyncProgressContextValue | null>(null);

export function useSyncProgress() {
  const context = useContext(SyncProgressContext);
  if (!context) {
    throw new Error('useSyncProgress must be used within a SyncProgressProvider');
  }
  return context;
}

// Load state from localStorage
function loadPersistedState(): SyncState | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load sync state:', e);
  }
  return null;
}

// Save state to localStorage
function persistState(state: SyncState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to persist sync state:', e);
  }
}

export function SyncProgressProvider({ children }: { children: React.ReactNode }) {
  const [repoJobs, setRepoJobs] = useState<RepoSyncJob[]>([]);
  const [globalJob, setGlobalJob] = useState<GlobalSyncJob | null>(null);
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [lastSyncCompleted, setLastSyncCompleted] = useState<Date | null>(null);
  const [hasNotified, setHasNotified] = useState<Set<string>>(new Set());

  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const queueRef = useRef<{ repoId: string; repoName: string }[]>([]);
  const processingRef = useRef(false);

  // Request notification permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  // Send browser notification
  const sendNotification = useCallback((title: string, body: string) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  }, []);

  // Persist state whenever it changes
  useEffect(() => {
    persistState({
      repoJobs,
      globalJob,
      isWidgetVisible,
      lastNotified: null,
    });
  }, [repoJobs, globalJob, isWidgetVisible]);

  // Poll for sync progress
  const pollSyncProgress = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/analytics/github/sync');
      const result = await response.json();

      if (result.data?.history) {
        const running = result.data.history.find((h: { status: string }) => h.status === 'running');

        if (running) {
          // Check if this is a repo-specific sync
          if (running.repository_id) {
            setRepoJobs(prev => prev.map(job => {
              if (job.repoId === running.repository_id && job.status === 'running') {
                return {
                  ...job,
                  progress_message: running.progress_message,
                  commits_synced: running.commits_synced,
                  prs_synced: running.prs_synced,
                  contributors_synced: running.contributors_synced,
                };
              }
              return job;
            }));
          } else {
            // Global sync
            setGlobalJob({
              id: running.id,
              type: running.sync_type,
              status: 'running',
              progress_message: running.progress_message,
              current_repo: running.current_repo,
              current_repo_index: running.current_repo_index,
              total_repos: running.total_repos,
              commits_synced: running.commits_synced,
              prs_synced: running.prs_synced,
              contributors_synced: running.contributors_synced,
            });
          }
          return true; // Still running
        } else {
          // Check for recently completed
          const recent = result.data.history[0];
          if (recent && (recent.status === 'completed' || recent.status === 'failed')) {
            if (recent.repository_id) {
              // Update repo job status
              setRepoJobs(prev => {
                const updated = prev.map(job => {
                  if (job.repoId === recent.repository_id && job.status === 'running') {
                    const newStatus = recent.status === 'completed' ? 'completed' : 'failed';

                    // Send notification if not already sent
                    if (!hasNotified.has(job.id)) {
                      if (newStatus === 'completed') {
                        sendNotification('Sync Complete', `${job.repoName} has finished syncing`);
                      } else {
                        sendNotification('Sync Failed', `${job.repoName} sync failed`);
                      }
                      setHasNotified(prev => new Set([...prev, job.id]));
                    }

                    return {
                      ...job,
                      status: newStatus,
                      commits_synced: recent.commits_synced,
                      prs_synced: recent.prs_synced,
                      contributors_synced: recent.contributors_synced,
                      error: recent.error_message,
                      completedAt: new Date().toISOString(),
                    };
                  }
                  return job;
                });
                return updated;
              });
            } else if (globalJob?.status === 'running') {
              // Global sync completed
              setGlobalJob(prev => prev ? {
                ...prev,
                status: recent.status === 'completed' ? 'completed' : 'failed',
                commits_synced: recent.commits_synced,
                prs_synced: recent.prs_synced,
                contributors_synced: recent.contributors_synced,
                error: recent.error_message,
              } : null);

              setLastSyncCompleted(new Date());
              sendNotification('Sync Complete', 'GitHub sync has finished');
            }
          }
          return false;
        }
      }
      return false;
    } catch (err) {
      console.error('Failed to poll sync status:', err);
      return false;
    }
  }, [globalJob?.status, hasNotified, sendNotification]);

  // Process the queue - run one repo sync at a time
  const processQueue = useCallback(async () => {
    if (processingRef.current || queueRef.current.length === 0) return;

    processingRef.current = true;
    const next = queueRef.current.shift();

    if (next) {
      // Update job status to running
      setRepoJobs(prev => prev.map(job =>
        job.repoId === next.repoId && job.status === 'queued'
          ? { ...job, status: 'running', startedAt: new Date().toISOString() }
          : job
      ));

      try {
        const response = await fetch('/api/admin/analytics/github/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sync_type: 'full',
            repository_id: next.repoId,
          }),
        });

        const result = await response.json();

        if (result.error) {
          setRepoJobs(prev => prev.map(job =>
            job.repoId === next.repoId && job.status === 'running'
              ? { ...job, status: 'failed', error: result.error, completedAt: new Date().toISOString() }
              : job
          ));
          sendNotification('Sync Failed', `${next.repoName} sync failed: ${result.error}`);
          processingRef.current = false;
          processQueue(); // Process next in queue
          return;
        }

        // Wait for this sync to complete before processing next
        const checkComplete = async () => {
          const stillRunning = await pollSyncProgress();
          if (stillRunning) {
            setTimeout(checkComplete, 1500);
          } else {
            processingRef.current = false;
            processQueue(); // Process next in queue
          }
        };

        setTimeout(checkComplete, 1500);
      } catch (err) {
        setRepoJobs(prev => prev.map(job =>
          job.repoId === next.repoId && job.status === 'running'
            ? { ...job, status: 'failed', error: 'Network error', completedAt: new Date().toISOString() }
            : job
        ));
        processingRef.current = false;
        processQueue();
      }
    } else {
      processingRef.current = false;
    }
  }, [pollSyncProgress, sendNotification]);

  // Add repo to sync queue
  const startRepoSync = useCallback((repoId: string, repoName: string) => {
    const jobId = `${repoId}-${Date.now()}`;

    // Add to jobs list
    setRepoJobs(prev => [...prev, {
      id: jobId,
      repoId,
      repoName,
      status: 'queued',
    }]);

    // Add to queue
    queueRef.current.push({ repoId, repoName });

    // Show widget
    setIsWidgetVisible(true);

    // Start processing
    processQueue();
  }, [processQueue]);

  // Start global sync (legacy compatibility)
  const startSync = useCallback(async (syncType: 'incremental' | 'full', repositoryId?: string, repoName?: string) => {
    if (repositoryId && repoName) {
      // Use queue for repo-specific sync
      startRepoSync(repositoryId, repoName);
      return;
    }

    // Global sync
    setIsWidgetVisible(true);
    setGlobalJob({
      id: `global-${Date.now()}`,
      type: syncType,
      status: 'running',
      progress_message: 'Starting sync...',
    });

    try {
      const response = await fetch('/api/admin/analytics/github/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sync_type: syncType }),
      });

      const result = await response.json();

      if (result.error) {
        setGlobalJob(prev => prev ? { ...prev, status: 'failed', error: result.error } : null);
        return;
      }

      // Start polling
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
      setGlobalJob(prev => prev ? { ...prev, status: 'failed', error: 'Network error' } : null);
    }
  }, [pollSyncProgress, startRepoSync]);

  // Clear error (legacy)
  const clearError = useCallback(() => {
    setGlobalJob(prev => prev ? { ...prev, error: undefined } : null);
  }, []);

  // Dismiss widget
  const dismissWidget = useCallback(() => {
    setIsWidgetVisible(false);
    // Only clear completed/failed jobs
    setRepoJobs(prev => prev.filter(j => j.status === 'queued' || j.status === 'running'));
    if (globalJob?.status !== 'running') {
      setGlobalJob(null);
    }
  }, [globalJob?.status]);

  // Dismiss single job
  const dismissJob = useCallback((jobId: string) => {
    setRepoJobs(prev => prev.filter(j => j.id !== jobId));
  }, []);

  // Clear all completed jobs
  const clearCompletedJobs = useCallback(() => {
    setRepoJobs(prev => prev.filter(j => j.status === 'queued' || j.status === 'running'));
  }, []);

  // Check for running syncs on mount and restore persisted state
  useEffect(() => {
    const init = async () => {
      // Load persisted state
      const persisted = loadPersistedState();
      if (persisted) {
        // Restore jobs that were running (they might still be running on server)
        const activeJobs = persisted.repoJobs.filter(j => j.status === 'running' || j.status === 'queued');
        if (activeJobs.length > 0) {
          setRepoJobs(activeJobs);
          setIsWidgetVisible(true);

          // Re-queue any that were queued
          queueRef.current = activeJobs
            .filter(j => j.status === 'queued')
            .map(j => ({ repoId: j.repoId, repoName: j.repoName }));
        }
        if (persisted.globalJob?.status === 'running') {
          setGlobalJob(persisted.globalJob);
          setIsWidgetVisible(true);
        }
      }

      // Check server for running syncs
      try {
        const response = await fetch('/api/admin/analytics/github/sync');
        const result = await response.json();

        if (result.data?.history?.[0]?.status === 'running') {
          setIsWidgetVisible(true);

          // Start polling
          pollingRef.current = setInterval(async () => {
            const stillRunning = await pollSyncProgress();
            if (!stillRunning && pollingRef.current) {
              clearInterval(pollingRef.current);
              pollingRef.current = null;
              processQueue(); // Process queue after server sync completes
            }
          }, 1500);
        } else {
          // No running sync on server, process our queue
          processQueue();
        }
      } catch (err) {
        console.error('Failed to check existing sync:', err);
      }
    };

    init();

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [pollSyncProgress, processQueue]);

  // Legacy compatibility - compute from current state
  const isSyncing = globalJob?.status === 'running' || repoJobs.some(j => j.status === 'running');
  const error = globalJob?.error || repoJobs.find(j => j.error)?.error || null;
  const progress = globalJob ? {
    progress_message: globalJob.progress_message,
    current_repo: globalJob.current_repo,
    current_repo_index: globalJob.current_repo_index,
    total_repos: globalJob.total_repos,
    commits_synced: globalJob.commits_synced,
    prs_synced: globalJob.prs_synced,
    contributors_synced: globalJob.contributors_synced,
  } : repoJobs.find(j => j.status === 'running') ? {
    progress_message: repoJobs.find(j => j.status === 'running')?.progress_message,
    commits_synced: repoJobs.find(j => j.status === 'running')?.commits_synced,
    prs_synced: repoJobs.find(j => j.status === 'running')?.prs_synced,
    contributors_synced: repoJobs.find(j => j.status === 'running')?.contributors_synced,
  } : null;

  const value: SyncProgressContextValue = {
    repoJobs,
    globalJob,
    isWidgetVisible,
    isSyncing,
    progress,
    error,
    lastSyncCompleted,
    startSync,
    startRepoSync,
    clearError,
    dismissWidget,
    dismissJob,
    clearCompletedJobs,
  };

  return (
    <SyncProgressContext.Provider value={value}>
      {children}
    </SyncProgressContext.Provider>
  );
}
