/**
 * GitHub Analytics Page
 * Light Brand Consulting
 *
 * Comprehensive development statistics dashboard for organization repositories
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type {
  TimeRange,
  GitHubConfigPublic,
  GitHubSummaryStats,
  GitHubCommit,
  GitHubRepository,
  AggregatedContributor,
  GitHubPullRequest,
} from '@/types/github-analytics';
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
}

type TabId = 'overview' | 'repositories' | 'contributors' | 'prs';

const tabs: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'repositories', label: 'Repositories' },
  { id: 'contributors', label: 'Contributors' },
  { id: 'prs', label: 'Pull Requests' },
];

export default function GitHubAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dashboard data
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  // Additional data for tabs
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [contributors, setContributors] = useState<AggregatedContributor[]>([]);
  const [pullRequests, setPullRequests] = useState<(GitHubPullRequest & { github_repositories?: { name: string; full_name: string } })[]>([]);

  // Fetch dashboard data
  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/analytics/github?time_range=${timeRange}`);
      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      setDashboardData(result.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  // Fetch repositories
  const fetchRepositories = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/analytics/github/repositories?tracked=true');
      const result = await response.json();
      if (!result.error) {
        setRepositories(result.data || []);
      }
    } catch (err) {
      console.error('Repositories fetch error:', err);
    }
  }, []);

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

  // Trigger sync
  const handleSync = async () => {
    try {
      setSyncing(true);
      const response = await fetch('/api/admin/analytics/github/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sync_type: 'incremental' }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      // Refresh data after sync
      await fetchDashboard();
      if (activeTab === 'repositories') await fetchRepositories();
      if (activeTab === 'contributors') await fetchContributors();
      if (activeTab === 'prs') await fetchPullRequests();
    } catch (err) {
      setError('Failed to trigger sync');
      console.error('Sync error:', err);
    } finally {
      setSyncing(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-text-primary">GitHub Analytics</h1>
          <button
            onClick={handleSync}
            disabled={syncing || loading}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all',
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
        </div>
        <p className="text-text-muted">
          Track development activity across your organization&apos;s repositories
        </p>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Connection status */}
      <ConnectionStatus
        config={dashboardData?.config || null}
        lastSyncAt={dashboardData?.summary?.last_sync_at || null}
        className="mb-6"
      />

      {/* Time range selector */}
      <div className="mb-6">
        <TimeRangeSelector
          value={timeRange}
          onChange={setTimeRange}
        />
      </div>

      {/* Stats cards */}
      <StatCards
        stats={dashboardData?.summary || null}
        loading={loading}
        className="mb-6"
      />

      {/* Tabs */}
      <div className="mb-6">
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
      </div>

      {/* Tab content */}
      <div className="space-y-6">
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
              <h3 className="text-lg font-medium text-text-primary">All Repositories</h3>
              <span className="text-sm text-text-muted">
                {repositories.length} {repositories.length === 1 ? 'repository' : 'repositories'}
              </span>
            </div>
            <RepositoryList
              repositories={repositories}
              loading={loading && repositories.length === 0}
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
      </div>

      {/* Sync status footer */}
      <SyncStatusFooter
        lastSyncAt={dashboardData?.summary?.last_sync_at || null}
        isRunning={syncing}
        onSync={handleSync}
        loading={loading}
        className="mt-8"
      />
    </div>
  );
}
