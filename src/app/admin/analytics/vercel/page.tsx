/**
 * Vercel Analytics Page
 * Light Brand Consulting
 *
 * Deployment and infrastructure statistics dashboard
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type {
  VercelDashboardData,
  VercelDeployment,
  VercelProject,
} from '@/types/vercel-analytics';
import {
  formatBytes,
  formatDuration,
  formatNumber,
  getDeploymentStateColor,
  getRelativeTime,
} from '@/types/vercel-analytics';

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
}> = ({ label, value, icon, color, loading }) => (
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
      </div>
    </div>
  </div>
);

// Deployment Row Component
const DeploymentRow: React.FC<{ deployment: VercelDeployment }> = ({ deployment }) => {
  const stateColor = getDeploymentStateColor(deployment.state);

  return (
    <div className="flex items-center justify-between p-3 bg-depth-elevated rounded-lg border border-depth-border">
      <div className="flex items-center gap-3 min-w-0">
        <div className={cn('px-2 py-1 rounded text-xs font-medium', stateColor.bg, stateColor.text)}>
          {deployment.state}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-text-primary truncate">{deployment.name}</div>
          <div className="text-xs text-text-muted truncate">
            {deployment.git_branch && `${deployment.git_branch} • `}
            {deployment.git_commit_message || 'No commit message'}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-right shrink-0">
        <div>
          <div className="text-sm text-text-secondary">
            {deployment.build_duration_ms ? formatDuration(deployment.build_duration_ms) : '--'}
          </div>
          <div className="text-xs text-text-muted">{getRelativeTime(deployment.created_at)}</div>
        </div>
        <div className={cn(
          'px-2 py-1 rounded text-xs',
          deployment.target === 'production' ? 'bg-radiance-gold/20 text-radiance-gold' : 'bg-depth-surface text-text-muted'
        )}>
          {deployment.target || 'preview'}
        </div>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard: React.FC<{ project: VercelProject }> = ({ project }) => (
  <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
    <div className="flex items-start justify-between mb-3">
      <div>
        <h4 className="text-sm font-medium text-text-primary">{project.name}</h4>
        <p className="text-xs text-text-muted">{project.framework || 'Unknown framework'}</p>
      </div>
      <div className="text-xs px-2 py-1 bg-depth-surface rounded text-text-secondary">
        {formatNumber(project.deployment_count)} deploys
      </div>
    </div>
    <div className="flex items-center justify-between text-xs">
      <span className="text-text-muted">Production: {formatNumber(project.production_deployment_count)}</span>
      <span className="text-text-muted">{getRelativeTime(project.updated_at)}</span>
    </div>
  </div>
);

// Chart Component
const ActivityChart: React.FC<{
  data: Array<{ stat_date: string; deployments_count: number; successful_builds: number; failed_builds: number }>;
  loading?: boolean;
}> = ({ data, loading }) => {
  if (loading || data.length === 0) {
    return (
      <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border h-64 flex items-center justify-center">
        <div className="text-text-muted">Loading chart...</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.deployments_count), 1);

  return (
    <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
      <h3 className="text-sm font-medium text-text-primary mb-4">Deployment Activity</h3>
      <div className="flex items-end gap-1 h-40">
        {data.slice(-30).map((day, i) => {
          const height = (day.deployments_count / maxValue) * 100;
          const successHeight = (day.successful_builds / maxValue) * 100;

          return (
            <div key={i} className="flex-1 flex flex-col justify-end" title={`${day.stat_date}: ${day.deployments_count} deployments`}>
              <div className="relative w-full">
                <div
                  className="w-full bg-red-500/30 rounded-t"
                  style={{ height: `${height - successHeight}px`, minHeight: day.failed_builds > 0 ? '2px' : '0' }}
                />
                <div
                  className="w-full bg-green-500/50 rounded-t"
                  style={{ height: `${successHeight}px`, minHeight: day.successful_builds > 0 ? '2px' : '0' }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500/50 rounded" />
          <span>Successful</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500/30 rounded" />
          <span>Failed</span>
        </div>
      </div>
    </div>
  );
};

// Bandwidth Chart Component
const BandwidthChart: React.FC<{
  data: Array<{ stat_date: string; bandwidth_bytes: number }>;
  loading?: boolean;
}> = ({ data, loading }) => {
  if (loading || data.length === 0) {
    return (
      <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border h-64 flex items-center justify-center">
        <div className="text-text-muted">Loading chart...</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.bandwidth_bytes), 1);

  return (
    <div className="bg-depth-elevated rounded-lg p-4 border border-depth-border">
      <h3 className="text-sm font-medium text-text-primary mb-4">Bandwidth Usage</h3>
      <div className="flex items-end gap-1 h-40">
        {data.slice(-30).map((day, i) => {
          const height = (day.bandwidth_bytes / maxValue) * 100;

          return (
            <div key={i} className="flex-1 flex flex-col justify-end" title={`${day.stat_date}: ${formatBytes(day.bandwidth_bytes)}`}>
              <div
                className="w-full bg-cyan-500/50 rounded-t transition-all"
                style={{ height: `${Math.max(height, 2)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-cyan-500/50 rounded" />
          <span>Daily Bandwidth</span>
        </div>
      </div>
    </div>
  );
};

export default function VercelAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VercelDashboardData | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/analytics/vercel?time_range=${timeRange}`);
      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      setData(result.data);
    } catch (err) {
      setError('Failed to load Vercel analytics');
      console.error('Vercel analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = data?.summary;
  const successRate = stats ? ((stats.successful_deployments / stats.total_deployments) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-depth-elevated rounded-lg">
            <svg className="w-6 h-6 text-text-primary" viewBox="0 0 76 76" fill="currentColor">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Vercel Analytics</h1>
            <p className="text-text-muted text-sm">Deployment and infrastructure statistics</p>
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
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-text-secondary">Connected to <span className="text-text-primary font-medium">{data.config.team_name}</span></span>
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
          label="Deployments"
          value={formatNumber(stats?.total_deployments ?? 0)}
          color="bg-blue-500/20 text-blue-400"
          loading={loading}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          }
        />
        <StatCard
          label="Success Rate"
          value={`${successRate}%`}
          color="bg-green-500/20 text-green-400"
          loading={loading}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Avg Build Time"
          value={stats ? formatDuration(stats.average_build_time_ms) : '--'}
          color="bg-purple-500/20 text-purple-400"
          loading={loading}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Bandwidth"
          value={formatBytes(stats?.bandwidth_bytes ?? 0)}
          color="bg-cyan-500/20 text-cyan-400"
          loading={loading}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          label="Edge Invocations"
          value={formatNumber(stats?.edge_invocations ?? 0)}
          color="bg-amber-500/20 text-amber-400"
          loading={loading}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <StatCard
          label="Projects"
          value={formatNumber(stats?.total_projects ?? 0)}
          color="bg-pink-500/20 text-pink-400"
          loading={loading}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ActivityChart data={data?.daily_stats ?? []} loading={loading} />
        <BandwidthChart data={data?.daily_stats ?? []} loading={loading} />
      </div>

      {/* Recent deployments and projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Recent Deployments</h3>
          <div className="space-y-2">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-depth-elevated rounded-lg animate-pulse" />
              ))
            ) : (
              data?.recent_deployments.slice(0, 8).map((deployment) => (
                <DeploymentRow key={deployment.id} deployment={deployment} />
              ))
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Active Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-depth-elevated rounded-lg animate-pulse" />
              ))
            ) : (
              data?.projects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
