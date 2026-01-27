/**
 * GitHub Analytics Page
 * Light Brand Consulting
 *
 * Comprehensive development statistics dashboard for organization repositories
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { authFetch } from '@/lib/api-client';
import { AdminHeader } from '@/components/admin';
import { Container } from '@/components/ui';
import { useSyncProgress } from '@/contexts/SyncProgressContext';
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

export default function GitHubAnalyticsPage() {
  const { isSyncing, startSync, startRepoSync, lastSyncCompleted, repoJobs } = useSyncProgress();
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orgModalOpen, setOrgModalOpen] = useState(false);
  const [trackedOrgsCount, setTrackedOrgsCount] = useState(0);

  // Dashboard data
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  // Additional data for tabs
  const [repositories, setRepositories] = useState<RepositoryWithStats[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [contributors, setContributors] = useState<AggregatedContributor[]>([]);

  // Get syncing repo ID from context (for button state)
  const syncingRepoId = repoJobs.find(j => j.status === 'running' || j.status === 'queued')?.repoId || null;
  const [pullRequests, setPullRequests] = useState<(GitHubPullRequest & { github_repositories?: { name: string; full_name: string } })[]>([]);

  // Fetch dashboard data
  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await authFetch(`/api/admin/analytics/github?time_range=${timeRange}&_t=${Date.now()}`, {
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
      const response = await authFetch('/api/admin/analytics/github/orgs');
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
      const response = await authFetch('/api/admin/analytics/github/repositories');
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
      const response = await authFetch('/api/admin/analytics/github/repositories', {
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

  // Sync individual repository - uses the queue system
  const handleSyncRepo = useCallback((repoId: string, fullName: string) => {
    // Extract just the repo name from full_name (org/repo -> repo)
    const repoName = fullName.split('/').pop() || fullName;
    startRepoSync(repoId, repoName);
  }, [startRepoSync]);

  // Fetch contributors
  const fetchContributors = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/analytics/github/contributors?limit=50');
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
      const response = await authFetch('/api/admin/analytics/github/pull-requests?limit=50');
      const result = await response.json();
      if (!result.error) {
        setPullRequests(result.data || []);
      }
    } catch (err) {
      console.error('Pull requests fetch error:', err);
    }
  }, []);

  // Trigger sync using global context
  const handleSync = async (syncType: 'incremental' | 'full' = 'incremental') => {
    setError(null);
    await startSync(syncType);
  };

  // Refresh data when sync completes
  useEffect(() => {
    if (lastSyncCompleted) {
      fetchDashboard();
      if (activeTab === 'repositories') fetchRepositories();
      if (activeTab === 'contributors') fetchContributors();
      if (activeTab === 'prs') fetchPullRequests();
    }
  }, [lastSyncCompleted, activeTab, fetchDashboard, fetchRepositories, fetchContributors, fetchPullRequests]);

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

  const headerActions = (
    <div className="flex items-center gap-3">
      {/* Team Productivity Link */}
      <Link
        href="/admin/analytics/github/productivity"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-depth-elevated rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Team Productivity
      </Link>

      {/* Sync Button */}
      <div className="relative z-[9999]">
        <div className="flex">
          <button
            onClick={() => handleSync('incremental')}
            disabled={isSyncing || loading}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-l-lg transition-all',
              isSyncing || loading
                ? 'bg-depth-elevated text-text-muted cursor-not-allowed'
                : 'bg-radiance-gold text-depth-base hover:bg-radiance-amber'
            )}
          >
            <svg className={cn('w-4 h-4', isSyncing && 'animate-spin')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isSyncing ? 'Syncing...' : 'Sync'}
          </button>
          <button
            onClick={() => setSyncMenuOpen(!syncMenuOpen)}
            disabled={isSyncing || loading}
            className={cn(
              'px-2 py-2 text-sm font-medium rounded-r-lg border-l border-depth-base/20 transition-all',
              isSyncing || loading
                ? 'bg-depth-elevated text-text-muted cursor-not-allowed'
                : 'bg-radiance-gold text-depth-base hover:bg-radiance-amber'
            )}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        {syncMenuOpen && !isSyncing && (
          <div className="absolute right-0 mt-1 w-48 bg-depth-elevated border border-depth-border rounded-lg shadow-xl z-[9999]">
            <button
              onClick={() => {
                setSyncMenuOpen(false);
                handleSync('incremental');
              }}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-depth-surface rounded-t-lg"
            >
              Quick Sync
              <span className="block text-xs text-text-muted">Since last sync</span>
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
    </div>
  );

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="GitHub Analytics"
        subtitle="Track development activity across your organization's repositories"
        actions={headerActions}
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
                showSyncButton
                syncingRepoId={syncingRepoId}
                onToggleTracked={handleToggleTracked}
                onSyncRepo={handleSyncRepo}
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
            isRunning={isSyncing}
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
