/**
 * Supabase Analytics Page
 * Light Brand Consulting
 *
 * Database, auth, and infrastructure statistics dashboard
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type {
  SupabaseDashboardData,
  SupabaseStorageBucket,
  SupabaseEdgeFunction,
} from '@/types/supabase-analytics';
import {
  formatBytes,
  formatNumber,
  formatDuration,
  getStatusColor,
  getRelativeTime,
} from '@/types/supabase-analytics';

type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
  { value: '1y', label: '1 Year' },
  { value: 'all', label: 'All Time' },
];

// Stat Card Component
const StatCard: React.FC<{
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  loading?: boolean;
  subtext?: string;
}> = ({ label, value, icon, color, loading, subtext }) => (
  <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
    <div className="flex items-center gap-3">
      <div className={cn('p-2 rounded-lg', color)}>
        {icon}
      </div>
      <div>
        {loading ? (
          <div className="h-6 w-16 bg-depth-surface rounded animate-pulse" />
        ) : (
          <div className="text-xl font-bold text-text-primary">{value}</div>
        )}
        <div className="text-xs text-text-muted">{label}</div>
        {subtext && <div className="text-xs text-text-muted mt-0.5">{subtext}</div>}
      </div>
    </div>
  </div>
);

// Database Stats Card
const DatabaseStatsCard: React.FC<{
  stats: SupabaseDashboardData['database_stats'];
  loading?: boolean;
}> = ({ stats, loading }) => (
  <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
    <h3 className="text-sm font-medium text-text-primary mb-4 flex items-center gap-2">
      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
      Database
    </h3>
    {loading ? (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 bg-depth-surface rounded animate-pulse" />
        ))}
      </div>
    ) : stats ? (
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Tables</span>
          <span className="text-text-primary font-medium">{stats.total_tables}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Total Rows</span>
          <span className="text-text-primary font-medium">{formatNumber(stats.total_rows)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Indexes</span>
          <span className="text-text-primary font-medium">{stats.total_indexes}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Disk Usage</span>
          <span className="text-text-primary font-medium">{formatBytes(stats.disk_usage_bytes)}</span>
        </div>
        <div className="pt-2 border-t border-depth-border">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Connections</span>
            <span className="text-text-primary font-medium">{stats.active_connections} / {stats.max_connections}</span>
          </div>
          <div className="mt-2 h-2 bg-depth-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500/50 rounded-full"
              style={{ width: `${(stats.active_connections / stats.max_connections) * 100}%` }}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="text-text-muted text-sm">No data available</div>
    )}
  </div>
);

// Auth Stats Card
const AuthStatsCard: React.FC<{
  stats: SupabaseDashboardData['auth_stats'];
  loading?: boolean;
}> = ({ stats, loading }) => (
  <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
    <h3 className="text-sm font-medium text-text-primary mb-4 flex items-center gap-2">
      <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      Authentication
    </h3>
    {loading ? (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 bg-depth-surface rounded animate-pulse" />
        ))}
      </div>
    ) : stats ? (
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Total Users</span>
          <span className="text-text-primary font-medium">{formatNumber(stats.total_users)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">New (this period)</span>
          <span className="text-green-400 font-medium">+{formatNumber(stats.new_users_period)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Active Users</span>
          <span className="text-text-primary font-medium">{formatNumber(stats.active_users_period)}</span>
        </div>
        <div className="pt-2 border-t border-depth-border">
          <div className="text-xs text-text-muted mb-2">Auth Methods</div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Email</span>
              <span className="text-text-secondary">{formatNumber(stats.email_users)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">OAuth</span>
              <span className="text-text-secondary">{formatNumber(stats.oauth_users)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Phone</span>
              <span className="text-text-secondary">{formatNumber(stats.phone_users)}</span>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-text-muted text-sm">No data available</div>
    )}
  </div>
);

// Storage Bucket Row
const StorageBucketRow: React.FC<{ bucket: SupabaseStorageBucket }> = ({ bucket }) => (
  <div className="flex items-center justify-between p-3 bg-depth-surface rounded-lg">
    <div className="flex items-center gap-3">
      <div className={cn(
        'w-2 h-2 rounded-full',
        bucket.public ? 'bg-green-500' : 'bg-amber-500'
      )} />
      <div>
        <div className="text-sm font-medium text-text-primary">{bucket.name}</div>
        <div className="text-xs text-text-muted">{formatNumber(bucket.file_count)} files</div>
      </div>
    </div>
    <div className="text-sm text-text-secondary">{formatBytes(bucket.total_size_bytes)}</div>
  </div>
);

// Edge Function Row
const EdgeFunctionRow: React.FC<{ fn: SupabaseEdgeFunction }> = ({ fn }) => {
  const statusColor = getStatusColor(fn.status);
  const errorRate = fn.invocations > 0 ? ((fn.errors / fn.invocations) * 100).toFixed(2) : '0';

  return (
    <div className="flex items-center justify-between p-3 bg-depth-surface rounded-lg">
      <div className="flex items-center gap-3 min-w-0">
        <div className={cn('px-2 py-0.5 rounded text-xs', statusColor.bg, statusColor.text)}>
          {fn.status}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-text-primary truncate">{fn.name}</div>
          <div className="text-xs text-text-muted">{formatNumber(fn.invocations)} invocations</div>
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-sm text-text-secondary">{formatDuration(fn.avg_execution_time_ms)}</div>
        <div className={cn('text-xs', parseFloat(errorRate) > 1 ? 'text-red-400' : 'text-text-muted')}>
          {errorRate}% errors
        </div>
      </div>
    </div>
  );
};

// API Activity Chart
const ApiActivityChart: React.FC<{
  data: Array<{ stat_date: string; api_requests: number }>;
  loading?: boolean;
}> = ({ data, loading }) => {
  if (loading || data.length === 0) {
    return (
      <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border h-64 flex items-center justify-center">
        <div className="text-text-muted">Loading chart...</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.api_requests), 1);

  return (
    <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
      <h3 className="text-sm font-medium text-text-primary mb-4">API Requests</h3>
      <div className="flex items-end gap-1 h-40">
        {data.slice(-30).map((day, i) => {
          const height = (day.api_requests / maxValue) * 100;

          return (
            <div key={i} className="flex-1 flex flex-col justify-end" title={`${day.stat_date}: ${formatNumber(day.api_requests)} requests`}>
              <div
                className="w-full bg-emerald-500/50 rounded-t transition-all"
                style={{ height: `${Math.max(height, 2)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-emerald-500/50 rounded" />
          <span>Daily API Requests</span>
        </div>
      </div>
    </div>
  );
};

// Realtime Chart
const RealtimeChart: React.FC<{
  data: Array<{ stat_date: string; realtime_messages: number }>;
  loading?: boolean;
}> = ({ data, loading }) => {
  if (loading || data.length === 0) {
    return (
      <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border h-64 flex items-center justify-center">
        <div className="text-text-muted">Loading chart...</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.realtime_messages), 1);

  return (
    <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
      <h3 className="text-sm font-medium text-text-primary mb-4">Realtime Messages</h3>
      <div className="flex items-end gap-1 h-40">
        {data.slice(-30).map((day, i) => {
          const height = (day.realtime_messages / maxValue) * 100;

          return (
            <div key={i} className="flex-1 flex flex-col justify-end" title={`${day.stat_date}: ${formatNumber(day.realtime_messages)} messages`}>
              <div
                className="w-full bg-purple-500/50 rounded-t transition-all"
                style={{ height: `${Math.max(height, 2)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-500/50 rounded" />
          <span>Daily Realtime Messages</span>
        </div>
      </div>
    </div>
  );
};

export default function SupabaseAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SupabaseDashboardData | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/analytics/supabase?time_range=${timeRange}`);
      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      setData(result.data);
    } catch (err) {
      setError('Failed to load Supabase analytics');
      console.error('Supabase analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = data?.summary;

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-depth-elevated rounded-lg">
            <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 109 113" fill="currentColor">
              <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" />
              <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fillOpacity="0.2" />
              <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.04088L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.16518 56.4175L45.317 2.07103Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Supabase Analytics</h1>
            <p className="text-text-muted text-sm">Database, auth, and infrastructure statistics</p>
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Connection status */}
      {data?.config && (
        <div className="mb-6 p-4 bg-depth-elevated rounded-lg border border-depth-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-text-secondary">
                Connected to <span className="text-text-primary font-medium">{data.config.project_name}</span>
                <span className="text-text-muted ml-2">({data.config.region})</span>
              </span>
            </div>
            {data.summary?.last_sync_at && (
              <span className="text-xs text-text-muted">Last updated: {getRelativeTime(data.summary.last_sync_at)}</span>
            )}
          </div>
        </div>
      )}

      {/* Time range selector */}
      <div className="mb-6">
        <div className="flex items-center gap-1 p-1 bg-depth-elevated rounded-lg w-fit">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                timeRange === option.value
                  ? 'bg-depth-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <StatCard
          label="Database Size"
          value={formatBytes(stats?.database_size_bytes ?? 0)}
          color="bg-green-500/20 text-green-400"
          loading={loading}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
          }
        />
        <StatCard
          label="API Requests"
          value={formatNumber(stats?.total_api_requests ?? 0)}
          color="bg-blue-500/20 text-blue-400"
          loading={loading}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          label="Total Users"
          value={formatNumber(stats?.total_users ?? 0)}
          color="bg-purple-500/20 text-purple-400"
          loading={loading}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatCard
          label="Storage"
          value={formatBytes(stats?.storage_size_bytes ?? 0)}
          color="bg-amber-500/20 text-amber-400"
          loading={loading}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          }
        />
        <StatCard
          label="Edge Functions"
          value={formatNumber(stats?.edge_invocations ?? 0)}
          color="bg-cyan-500/20 text-cyan-400"
          loading={loading}
          subtext={`${stats?.total_edge_functions ?? 0} functions`}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <StatCard
          label="Bandwidth"
          value={formatBytes(stats?.bandwidth_bytes ?? 0)}
          color="bg-pink-500/20 text-pink-400"
          loading={loading}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ApiActivityChart data={data?.daily_stats ?? []} loading={loading} />
        <RealtimeChart data={data?.daily_stats ?? []} loading={loading} />
      </div>

      {/* Database and Auth stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DatabaseStatsCard stats={data?.database_stats ?? null} loading={loading} />
        <AuthStatsCard stats={data?.auth_stats ?? null} loading={loading} />

        {/* Storage buckets */}
        <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
          <h3 className="text-sm font-medium text-text-primary mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            Storage Buckets
          </h3>
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 bg-depth-surface rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {data?.storage_buckets.map((bucket) => (
                <StorageBucketRow key={bucket.id} bucket={bucket} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edge Functions */}
      <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
        <h3 className="text-sm font-medium text-text-primary mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Edge Functions
        </h3>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-depth-surface rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {data?.edge_functions.map((fn) => (
              <EdgeFunctionRow key={fn.id} fn={fn} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
