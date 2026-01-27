// Types for Supabase Analytics
// Light Brand Consulting

export type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';

export interface SupabaseConfig {
  id: string;
  project_ref: string;
  project_name: string;
  region: string;
  is_active: boolean;
  last_validated_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupabaseConfigPublic {
  id: string;
  project_name: string;
  region: string;
  is_active: boolean;
  last_validated_at: string | null;
  has_token: boolean;
}

export interface SupabaseUsageStats {
  database_size_bytes: number;
  storage_size_bytes: number;
  bandwidth_bytes: number;
  api_requests: number;
  auth_mau: number;
  realtime_peak_connections: number;
  realtime_messages: number;
  edge_function_invocations: number;
  edge_function_execution_time_ms: number;
}

export interface SupabaseDatabaseStats {
  total_tables: number;
  total_rows: number;
  total_indexes: number;
  disk_usage_bytes: number;
  active_connections: number;
  max_connections: number;
}

export interface SupabaseAuthStats {
  total_users: number;
  new_users_period: number;
  active_users_period: number;
  email_users: number;
  oauth_users: number;
  phone_users: number;
}

export interface SupabaseStorageBucket {
  id: string;
  name: string;
  public: boolean;
  file_count: number;
  total_size_bytes: number;
  created_at: string;
}

export interface SupabaseEdgeFunction {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'inactive';
  invocations: number;
  errors: number;
  avg_execution_time_ms: number;
  created_at: string;
  updated_at: string;
}

export interface SupabaseDailyStats {
  id: string;
  stat_date: string;
  api_requests: number;
  database_operations: number;
  storage_operations: number;
  auth_operations: number;
  realtime_messages: number;
  edge_invocations: number;
  bandwidth_bytes: number;
}

export interface SupabaseSummaryStats {
  database_size_bytes: number;
  storage_size_bytes: number;
  total_api_requests: number;
  total_users: number;
  active_users: number;
  total_tables: number;
  total_storage_buckets: number;
  total_edge_functions: number;
  edge_invocations: number;
  realtime_connections_peak: number;
  bandwidth_bytes: number;
  last_sync_at: string | null;
  period_start: string;
  period_end: string;
}

export interface SupabaseDashboardData {
  config: SupabaseConfigPublic | null;
  summary: SupabaseSummaryStats | null;
  database_stats: SupabaseDatabaseStats | null;
  auth_stats: SupabaseAuthStats | null;
  storage_buckets: SupabaseStorageBucket[];
  edge_functions: SupabaseEdgeFunction[];
  daily_stats: SupabaseDailyStats[];
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
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

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s`;
}

export function getStatusColor(status: 'active' | 'inactive'): { text: string; bg: string } {
  return status === 'active'
    ? { text: 'text-green-400', bg: 'bg-green-500/20' }
    : { text: 'text-gray-400', bg: 'bg-gray-500/20' };
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
