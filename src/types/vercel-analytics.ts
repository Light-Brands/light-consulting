// Types for Vercel Analytics
// Light Brand Consulting

export type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';

export interface VercelConfig {
  id: string;
  team_id: string | null;
  team_name: string;
  is_active: boolean;
  last_validated_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface VercelConfigPublic {
  id: string;
  team_name: string;
  is_active: boolean;
  last_validated_at: string | null;
  has_token: boolean;
}

export interface VercelDeployment {
  id: string;
  uid: string;
  name: string;
  url: string;
  state: 'BUILDING' | 'ERROR' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'CANCELED';
  ready_state: string;
  created_at: string;
  building_at: string | null;
  ready_at: string | null;
  build_duration_ms: number | null;
  creator_username: string;
  target: 'production' | 'preview' | null;
  source: string;
  git_branch: string | null;
  git_commit_sha: string | null;
  git_commit_message: string | null;
}

export interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
  latest_deployment_url: string | null;
  created_at: string;
  updated_at: string;
  deployment_count: number;
  production_deployment_count: number;
}

export interface VercelDomain {
  id: string;
  name: string;
  project_id: string;
  configured: boolean;
  verified: boolean;
  created_at: string;
}

export interface VercelUsageStats {
  bandwidth_bytes: number;
  build_minutes: number;
  edge_function_invocations: number;
  serverless_function_invocations: number;
  serverless_function_execution_time_ms: number;
  image_optimizations: number;
  web_analytics_events: number;
}

export interface VercelDailyStats {
  id: string;
  stat_date: string;
  deployments_count: number;
  successful_builds: number;
  failed_builds: number;
  build_duration_total_ms: number;
  bandwidth_bytes: number;
  edge_invocations: number;
  serverless_invocations: number;
}

export interface VercelSummaryStats {
  total_deployments: number;
  successful_deployments: number;
  failed_deployments: number;
  average_build_time_ms: number;
  total_projects: number;
  total_domains: number;
  bandwidth_bytes: number;
  edge_invocations: number;
  serverless_invocations: number;
  build_minutes: number;
  last_sync_at: string | null;
  period_start: string;
  period_end: string;
}

export interface VercelDashboardData {
  config: VercelConfigPublic | null;
  summary: VercelSummaryStats | null;
  recent_deployments: VercelDeployment[];
  projects: VercelProject[];
  daily_stats: VercelDailyStats[];
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getDeploymentStateColor(state: VercelDeployment['state']): { text: string; bg: string } {
  switch (state) {
    case 'READY':
      return { text: 'text-green-400', bg: 'bg-green-500/20' };
    case 'BUILDING':
    case 'INITIALIZING':
    case 'QUEUED':
      return { text: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    case 'ERROR':
      return { text: 'text-red-400', bg: 'bg-red-500/20' };
    case 'CANCELED':
      return { text: 'text-gray-400', bg: 'bg-gray-500/20' };
  }
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}
