/**
 * GitHub Analytics Page
 * Light Brand Consulting
 *
 * Comprehensive development statistics dashboard for organization repositories
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { AdminHeader } from '@/components/admin';
import { Container } from '@/components/ui';
import type {
  TimeRange,
  GitHubConfigPublic,
  GitHubSummaryStats,
  GitHubCommit,
  GitHubRepository,
  AggregatedContributor,
  GitHubPullRequest,
} from '@/types/github-analytics';
import type { RepositoryWithStats } from '@/components/admin/analytics/RepositoryCard';
import {
  ConnectionStatus,
  TimeRangeSelector,
  StatCards,
  CommitActivityChart,
  CodeFrequencyChart,
  RepositoryList,
  ContributorLeaderboard,
  PRTable,
  SyncStatusFooter,
  OrgManagementModal,
} from '@/components/admin/analytics';

interface DashboardData {
  config: GitHubConfigPublic | null;
  summary: GitHubSummaryStats | null;
  recent_commits: GitHubCommit[];
  top_repositories: GitHubRepository[];
  top_contributors: AggregatedContributor[];
  daily_stats: Array<{
    stat_date: string;
    commits_count: number;
    additions: number;
    deletions: number;
  }>;
  tracked_orgs_count?: number;
}

type TabId = 'overview' | 'repositories' | 'contributors' | 'prs';

const tabs: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'repositories', label: 'Repositories' },
  { id: 'contributors', label: 'Contributors' },
  { id: 'prs', label: 'Pull Requests' },
];

interface SyncProgress {
  progress_message?: string | null;
  current_repo?: string | null;
  current_repo_index?: number | null;
  total_repos?: number | null;
  commits_synced?: number;
  prs_synced?: number;
  contributors_synced?: number;
}

export default function GitHubAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState<SyncProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [orgModalOpen, setOrgModalOpen] = useState(false);
  const [trackedOrgsCount, setTrackedOrgsCount] = useState(0);

  // Dashboard data
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  // Additional data for tabs
  const [repositories, setRepositories] = useState<RepositoryWithStats[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [contributors, setContributors] = useState<AggregatedContributor[]>([]);
  const [pullRequests, setPullRequests] = useState<(GitHubPullRequest & { github_repositories?: { name: string; full_name: string } })[]>([]);

  // Fetch dashboard data
  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/analytics/github?time_range=${timeRange}&_t=${Date.now()}`, {
        cache: 'no-store',
      });
      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      setDashboardData(result.data);
      if (result.data?.tracked_orgs_count !== undefined) {
        setTrackedOrgsCount(result.data.tracked_orgs_count);
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  // Fetch tracked orgs count
  const fetchTrackedOrgsCount = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/analytics/github/orgs');
      const result = await response.json();
      if (!result.error && result.data) {
        const tracked = result.data.filter((org: { is_tracked: boolean }) => org.is_tracked).length;
        setTrackedOrgsCount(tracked);
      }
    } catch (err) {
      console.error('Failed to fetch orgs count:', err);
    }
  }, []);

  // Handle org modal close with sync
  const handleOrgToggled = useCallback(async () => {
    await fetchTrackedOrgsCount();
  }, [fetchTrackedOrgsCount]);

  const handleOrgModalClose = useCallback(() => {
    setOrgModalOpen(false);
    // Refresh dashboard after org changes
    fetchDashboard();
  }, [fetchDashboard]);

  // Fetch repositories (all repos with stats)
  const fetchRepositories = useCallback(async () => {
    try {
      setReposLoading(true);
      const response = await fetch('/api/admin/analytics/github/repositories');
      const result = await response.json();
      if (!result.error) {
        setRepositories(result.data || []);
      }
    } catch (err) {
      console.error('Repositories fetch error:', err);
    } finally {
      setReposLoading(false);
    }
  }, []);

  // Toggle repository tracking
  const handleToggleTracked = useCallback(async (id: string, tracked: boolean) => {
    try {
      const response = await fetch('/api/admin/analytics/github/repositories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_tracked: tracked }),
      });

      const result = await response.json();
      if (!result.error) {
        // Update local state
        setRepositories(prev =>
          prev.map(repo =>
            repo.id === id ? { ...repo, is_tracked: tracked } : repo
          )
        );
        // Refresh dashboard to update totals and charts
        await fetchDashboard();
      }
    } catch (err) {
      console.error('Toggle tracked error:', err);
    }
  }, [fetchDashboard]);

  // Fetch contributors
  const fetchContributors = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/analytics/github/contributors?limit=50');
      const result = await response.json();
      if (!result.error) {
        setContributors(result.data || []);
      }
    } catch (err) {
      console.error('Contributors fetch error:', err);
    }
  }, []);

  // Fetch pull requests
  const fetchPullRequests = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/analytics/github/pull-requests?limit=50');
      const result = await response.json();
      if (!result.error) {
        setPullRequests(result.data || []);
      }
    } catch (err) {
      console.error('Pull requests fetch error:', err);
    }
  }, []);

  // Poll for sync progress
  const pollSyncProgress = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/analytics/github/sync');
      const result = await response.json();

      if (result.data?.history?.[0]) {
        const latest = result.data.history[0];
        if (latest.status === 'running') {
          setSyncProgress({
            progress_message: latest.progress_message,
            current_repo: latest.current_repo,
            current_repo_index: latest.current_repo_index,
            total_repos: latest.total_repos,
            commits_synced: latest.commits_synced,
            prs_synced: latest.prs_synced,
            contributors_synced: latest.contributors_synced,
          });
          return true; // Still running
        }
      }
      return false; // Not running
    } catch (err) {
      console.error('Failed to poll sync status:', err);
      return false;
    }
  }, []);

  // Trigger sync
  const handleSync = async (syncType: 'incremental' | 'full' = 'incremental') => {
    try {
      setSyncing(true);
      setSyncProgress({ progress_message: 'Starting sync...' });
      setError(null);

      const response = await fetch('/api/admin/analytics/github/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sync_type: syncType }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        setSyncProgress(null);
        return;
      }

      // Refresh data after sync
      setSyncProgress({ progress_message: 'Refreshing dashboard...' });
      await fetchDashboard();
      if (activeTab === 'repositories') await fetchRepositories();
      if (activeTab === 'contributors') await fetchContributors();
      if (activeTab === 'prs') await fetchPullRequests();
    } catch (err) {
      setError('Failed to trigger sync');
      console.error('Sync error:', err);
    } finally {
      setSyncing(false);
      setSyncProgress(null);
    }
  };

  // Poll for sync progress while syncing
  useEffect(() => {
    if (!syncing) return;

    const interval = setInterval(async () => {
      const stillRunning = await pollSyncProgress();
      if (!stillRunning && syncing) {
        // Sync finished on server side
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [syncing, pollSyncProgress]);

  // Initial fetch
  useEffect(() => {
    fetchDashboard();
    fetchTrackedOrgsCount();
  }, [fetchDashboard, fetchTrackedOrgsCount]);

  // Fetch tab-specific data
  useEffect(() => {
    if (activeTab === 'repositories' && repositories.length === 0) {
      fetchRepositories();
    } else if (activeTab === 'contributors' && contributors.length === 0) {
      fetchContributors();
    } else if (activeTab === 'prs' && pullRequests.length === 0) {
      fetchPullRequests();
    }
  }, [activeTab, repositories.length, contributors.length, pullRequests.length, fetchRepositories, fetchContributors, fetchPullRequests]);

  const [syncMenuOpen, setSyncMenuOpen] = useState(false);

  const syncButton = (
    <div className="relative z-[9999]">
      <div className="flex">
        <button
          onClick={() => handleSync('incremental')}
          disabled={syncing || loading}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-l-lg transition-all',
            syncing || loading
              ? 'bg-depth-elevated text-text-muted cursor-not-allowed'
              : 'bg-radiance-gold text-depth-base hover:bg-radiance-amber'
          )}
        >
          <svg className={cn('w-4 h-4', syncing && 'animate-spin')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {syncing ? 'Syncing...' : 'Sync'}
        </button>
        <button
          onClick={() => setSyncMenuOpen(!syncMenuOpen)}
          disabled={syncing || loading}
          className={cn(
            'px-2 py-2 text-sm font-medium rounded-r-lg border-l border-depth-base/20 transition-all',
            syncing || loading
              ? 'bg-depth-elevated text-text-muted cursor-not-allowed'
              : 'bg-radiance-gold text-depth-base hover:bg-radiance-amber'
          )}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {syncMenuOpen && !syncing && (
        <div className="absolute right-0 mt-1 w-48 bg-depth-elevated border border-depth-border rounded-lg shadow-xl z-[9999]">
          <button
            onClick={() => {
              setSyncMenuOpen(false);
              handleSync('incremental');
            }}
            className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-depth-surface rounded-t-lg"
          >
            Quick Sync
            <span className="block text-xs text-text-muted">Last 30 days</span>
          </button>
          <button
            onClick={() => {
              setSyncMenuOpen(false);
              handleSync('full');
            }}
            className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-depth-surface rounded-b-lg border-t border-depth-border"
          >
            Full Sync
            <span className="block text-xs text-text-muted">All historical data</span>
          </button>
        </div>
      )}
    </div>
  );

  // Sync progress modal
  const syncProgressModal = syncing && syncProgress && (
    <div className="fixed inset-0 bg-depth-base/80 backdrop-blur-sm z-[10000] flex items-center justify-center">
      <div className="bg-depth-elevated border border-depth-border rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-6 h-6 text-radiance-gold animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <h3 className="text-lg font-semibold text-text-primary">Syncing GitHub Data</h3>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-text-secondary">{syncProgress.progress_message || 'Working...'}</p>

          {syncProgress.current_repo && syncProgress.total_repos && (
            <div>
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>Repository {syncProgress.current_repo_index} of {syncProgress.total_repos}</span>
                <span>{Math.round(((syncProgress.current_repo_index || 0) / syncProgress.total_repos) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-depth-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-radiance-gold transition-all duration-300"
                  style={{ width: `${((syncProgress.current_repo_index || 0) / syncProgress.total_repos) * 100}%` }}
                />
              </div>
              <p className="text-xs text-text-muted mt-1 truncate">{syncProgress.current_repo}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="text-center">
              <p className="text-lg font-semibold text-text-primary">{(syncProgress.commits_synced || 0).toLocaleString()}</p>
              <p className="text-xs text-text-muted">Commits</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-text-primary">{(syncProgress.prs_synced || 0).toLocaleString()}</p>
              <p className="text-xs text-text-muted">PRs</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-text-primary">{(syncProgress.contributors_synced || 0).toLocaleString()}</p>
              <p className="text-xs text-text-muted">Contributors</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-text-muted text-center mt-4">This may take several minutes for large repositories...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {syncProgressModal}
      <AdminHeader
        title="GitHub Analytics"
        subtitle="Track development activity across your organization's repositories"
        actions={syncButton}
      />

      <div className="py-4 md:py-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10 space-y-6">
          {/* Error display */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Connection status */}
          <ConnectionStatus
            config={dashboardData?.config || null}
            lastSyncAt={dashboardData?.summary?.last_sync_at || null}
            trackedOrgsCount={trackedOrgsCount}
            onManageOrgs={() => setOrgModalOpen(true)}
          />

          {/* Time range selector */}
          <TimeRangeSelector
            value={timeRange}
            onChange={setTimeRange}
          />

          {/* Stats cards */}
          <StatCards
            stats={dashboardData?.summary || null}
            loading={loading}
          />

          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-depth-elevated rounded-lg w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all',
                  activeTab === tab.id
                    ? 'bg-depth-surface text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && (
            <>
              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CommitActivityChart
                  data={dashboardData?.daily_stats || []}
                  loading={loading}
                />
                <CodeFrequencyChart
                  data={dashboardData?.daily_stats || []}
                  loading={loading}
                />
              </div>

              {/* Top repos and contributors */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-3">Top Repositories by Activity</h3>
                  <RepositoryList
                    repositories={dashboardData?.top_repositories || []}
                    loading={loading}
                    showRanks
                  />
                </div>
                <ContributorLeaderboard
                  contributors={dashboardData?.top_contributors || []}
                  loading={loading}
                />
              </div>
            </>
          )}

          {activeTab === 'repositories' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-text-primary">All Repositories</h3>
                  <p className="text-sm text-text-muted mt-1">
                    Toggle repos to include/exclude from dashboard totals
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-text-muted block">
                    {repositories.filter(r => r.is_tracked).length} included / {repositories.length} total
                  </span>
                  <span className="text-xs text-text-muted">
                    Lines from included: +{repositories.filter(r => r.is_tracked).reduce((sum, r) => sum + (r.total_additions || 0), 0).toLocaleString()} / -{repositories.filter(r => r.is_tracked).reduce((sum, r) => sum + (r.total_deletions || 0), 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <RepositoryList
                repositories={repositories}
                loading={reposLoading && repositories.length === 0}
                showLineStats
                showToggle
                onToggleTracked={handleToggleTracked}
              />
            </div>
          )}

          {activeTab === 'contributors' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">All Contributors</h3>
                <span className="text-sm text-text-muted">
                  {contributors.length} {contributors.length === 1 ? 'contributor' : 'contributors'}
                </span>
              </div>
              <ContributorLeaderboard
                contributors={contributors}
                loading={loading && contributors.length === 0}
              />
            </div>
          )}

          {activeTab === 'prs' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">Pull Requests</h3>
                <span className="text-sm text-text-muted">
                  {pullRequests.length} {pullRequests.length === 1 ? 'pull request' : 'pull requests'}
                </span>
              </div>
              <PRTable
                pullRequests={pullRequests}
                loading={loading && pullRequests.length === 0}
              />
            </div>
          )}

          {/* Sync status footer */}
          <SyncStatusFooter
            lastSyncAt={dashboardData?.summary?.last_sync_at || null}
            isRunning={syncing}
            onSync={handleSync}
            loading={loading}
          />
        </Container>
      </div>

      {/* Organization Management Modal */}
      <OrgManagementModal
        isOpen={orgModalOpen}
        onClose={handleOrgModalClose}
        onOrgToggled={handleOrgToggled}
      />
    </div>
  );
}
