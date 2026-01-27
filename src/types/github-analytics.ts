// Types for GitHub Analytics

// ============================================================================
// Enums and Union Types
// ============================================================================

export type SyncType = 'full' | 'incremental' | 'repositories' | 'commits' | 'pull_requests' | 'contributors';
export type SyncStatus = 'pending' | 'running' | 'completed' | 'failed';
export type PRState = 'open' | 'closed' | 'merged';
export type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';

// ============================================================================
// Database Models
// ============================================================================

// GitHub Configuration
export interface GitHubConfig {
  id: string;
  access_token_encrypted: string | null; // Encrypted, never exposed to client
  org_name: string;
  token_scopes: string[];
  is_active: boolean;
  last_validated_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GitHubConfigInsert {
  org_name: string;
  access_token_encrypted?: string | null;
  token_scopes?: string[];
}

export interface GitHubConfigUpdate {
  org_name?: string;
  access_token_encrypted?: string | null;
  token_scopes?: string[];
  is_active?: boolean;
  last_validated_at?: string | null;
}

// Client-safe config (no token)
export interface GitHubConfigPublic {
  id: string;
  org_name: string;
  token_scopes: string[];
  is_active: boolean;
  last_validated_at: string | null;
  has_token: boolean;
}

// Repository
export interface GitHubRepository {
  id: string;
  github_id: number;
  name: string;
  full_name: string;
  description: string | null;
  is_private: boolean;
  is_tracked: boolean;
  default_branch: string;
  language: string | null;
  languages_breakdown: Record<string, number> | null; // { "TypeScript": 45000, "JavaScript": 12000 }
  total_lines_of_code: number | null;
  stars_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at_github: string;
  pushed_at: string | null;
  synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepositoryInsert {
  github_id: number;
  name: string;
  full_name: string;
  description?: string | null;
  is_private?: boolean;
  is_tracked?: boolean;
  default_branch?: string;
  language?: string | null;
  languages_breakdown?: Record<string, number> | null;
  total_lines_of_code?: number | null;
  stars_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  created_at_github: string;
  pushed_at?: string | null;
}

export interface GitHubRepositoryUpdate {
  description?: string | null;
  is_private?: boolean;
  is_tracked?: boolean;
  default_branch?: string;
  language?: string | null;
  languages_breakdown?: Record<string, number> | null;
  total_lines_of_code?: number | null;
  stars_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  pushed_at?: string | null;
  synced_at?: string | null;
}

// Commit
export interface GitHubCommit {
  id: string;
  repository_id: string;
  sha: string;
  message: string;
  author_name: string;
  author_email: string;
  author_github_login: string | null;
  committed_at: string;
  additions: number;
  deletions: number;
  changed_files: number;
  synced_at: string;
  created_at: string;
}

export interface GitHubCommitInsert {
  repository_id: string;
  sha: string;
  message: string;
  author_name: string;
  author_email: string;
  author_github_login?: string | null;
  committed_at: string;
  additions?: number;
  deletions?: number;
  changed_files?: number;
}

// Pull Request
export interface GitHubPullRequest {
  id: string;
  repository_id: string;
  github_id: number;
  number: number;
  title: string;
  state: PRState;
  author_github_login: string;
  created_at_github: string;
  merged_at: string | null;
  closed_at: string | null;
  additions: number;
  deletions: number;
  changed_files: number;
  comments_count: number;
  commits_count: number;
  synced_at: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubPullRequestInsert {
  repository_id: string;
  github_id: number;
  number: number;
  title: string;
  state: PRState;
  author_github_login: string;
  created_at_github: string;
  merged_at?: string | null;
  closed_at?: string | null;
  additions?: number;
  deletions?: number;
  changed_files?: number;
  comments_count?: number;
  commits_count?: number;
}

export interface GitHubPullRequestUpdate {
  title?: string;
  state?: PRState;
  merged_at?: string | null;
  closed_at?: string | null;
  additions?: number;
  deletions?: number;
  changed_files?: number;
  comments_count?: number;
  commits_count?: number;
  synced_at?: string;
}

// Contributor
export interface GitHubContributor {
  id: string;
  repository_id: string;
  github_login: string;
  github_id: number;
  avatar_url: string | null;
  total_commits: number;
  total_additions: number;
  total_deletions: number;
  first_commit_at: string | null;
  last_commit_at: string | null;
  synced_at: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubContributorInsert {
  repository_id: string;
  github_login: string;
  github_id: number;
  avatar_url?: string | null;
  total_commits?: number;
  total_additions?: number;
  total_deletions?: number;
  first_commit_at?: string | null;
  last_commit_at?: string | null;
}

export interface GitHubContributorUpdate {
  avatar_url?: string | null;
  total_commits?: number;
  total_additions?: number;
  total_deletions?: number;
  first_commit_at?: string | null;
  last_commit_at?: string | null;
  synced_at?: string;
}

// Daily Stats
export interface GitHubDailyStats {
  id: string;
  repository_id: string;
  stat_date: string;
  commits_count: number;
  additions: number;
  deletions: number;
  prs_opened: number;
  prs_merged: number;
  unique_contributors: number;
  synced_at: string;
  created_at: string;
}

export interface GitHubDailyStatsInsert {
  repository_id: string;
  stat_date: string;
  commits_count?: number;
  additions?: number;
  deletions?: number;
  prs_opened?: number;
  prs_merged?: number;
  unique_contributors?: number;
}

export interface GitHubDailyStatsUpdate {
  commits_count?: number;
  additions?: number;
  deletions?: number;
  prs_opened?: number;
  prs_merged?: number;
  unique_contributors?: number;
  synced_at?: string;
}

// Sync Log
export interface GitHubSyncLog {
  id: string;
  sync_type: SyncType;
  status: SyncStatus;
  repositories_synced: number;
  commits_synced: number;
  prs_synced: number;
  contributors_synced: number;
  rate_limit_remaining: number | null;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  duration_seconds: number | null;
  created_at: string;
}

export interface GitHubSyncLogInsert {
  sync_type: SyncType;
  status?: SyncStatus;
  repositories_synced?: number;
  commits_synced?: number;
  prs_synced?: number;
  contributors_synced?: number;
  rate_limit_remaining?: number | null;
  error_message?: string | null;
  started_at?: string;
}

export interface GitHubSyncLogUpdate {
  status?: SyncStatus;
  repositories_synced?: number;
  commits_synced?: number;
  prs_synced?: number;
  contributors_synced?: number;
  rate_limit_remaining?: number | null;
  error_message?: string | null;
  completed_at?: string | null;
  duration_seconds?: number | null;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface GitHubConfigApiResponse {
  data: GitHubConfigPublic | null;
  error: string | null;
}

export interface GitHubRepositoriesApiResponse {
  data: GitHubRepository[] | null;
  error: string | null;
}

export interface GitHubRepositoryApiResponse {
  data: GitHubRepository | null;
  error: string | null;
}

export interface GitHubCommitsApiResponse {
  data: GitHubCommit[] | null;
  total: number;
  error: string | null;
}

export interface GitHubPullRequestsApiResponse {
  data: GitHubPullRequest[] | null;
  total: number;
  error: string | null;
}

export interface GitHubContributorsApiResponse {
  data: GitHubContributor[] | null;
  error: string | null;
}

export interface GitHubDailyStatsApiResponse {
  data: GitHubDailyStats[] | null;
  error: string | null;
}

export interface GitHubSyncLogApiResponse {
  data: GitHubSyncLog | null;
  error: string | null;
}

export interface GitHubSyncLogsApiResponse {
  data: GitHubSyncLog[] | null;
  error: string | null;
}

// ============================================================================
// Dashboard & Summary Types
// ============================================================================

export interface GitHubSummaryStats {
  total_commits: number;
  total_additions: number;
  total_deletions: number;
  open_prs: number;
  merged_prs: number;
  total_repositories: number;
  tracked_repositories: number;
  total_contributors: number;
  last_sync_at: string | null;
  period_start: string;
  period_end: string;
}

export interface GitHubDashboardApiResponse {
  data: {
    config: GitHubConfigPublic | null;
    summary: GitHubSummaryStats | null;
    recent_commits: GitHubCommit[];
    top_repositories: GitHubRepository[];
    top_contributors: AggregatedContributor[];
    daily_stats: GitHubDailyStats[];
  } | null;
  error: string | null;
}

// Aggregated contributor across all repos
export interface AggregatedContributor {
  github_login: string;
  github_id: number;
  avatar_url: string | null;
  total_commits: number;
  total_additions: number;
  total_deletions: number;
  repositories_count: number;
  first_commit_at: string | null;
  last_commit_at: string | null;
}

// Repository with computed stats for display
export interface RepositoryWithStats extends GitHubRepository {
  commit_count: number;
  pr_count: number;
  contributor_count: number;
  recent_activity_score: number; // For sorting by activity
}

// ============================================================================
// GitHub API Types (raw responses)
// ============================================================================

export interface GitHubApiRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  default_branch: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  pushed_at: string | null;
}

export interface GitHubApiCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  author: {
    login: string;
    id: number;
    avatar_url: string;
  } | null;
  stats?: {
    additions: number;
    deletions: number;
    total: number;
  };
  files?: Array<{
    filename: string;
    additions: number;
    deletions: number;
  }>;
}

export interface GitHubApiPullRequest {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  user: {
    login: string;
    id: number;
    avatar_url: string;
  };
  created_at: string;
  merged_at: string | null;
  closed_at: string | null;
  additions?: number;
  deletions?: number;
  changed_files?: number;
  comments: number;
  commits: number;
}

export interface GitHubApiContributorStats {
  author: {
    login: string;
    id: number;
    avatar_url: string;
  };
  total: number;
  weeks: Array<{
    w: number; // Unix timestamp
    a: number; // additions
    d: number; // deletions
    c: number; // commits
  }>;
}

export interface GitHubApiRateLimit {
  resources: {
    core: {
      limit: number;
      remaining: number;
      reset: number;
    };
  };
}

// ============================================================================
// Filter & Query Types
// ============================================================================

export interface CommitFilters {
  repository_id?: string;
  author_login?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}

export interface PRFilters {
  repository_id?: string;
  author_login?: string;
  state?: PRState;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}

export interface StatsFilters {
  repository_id?: string;
  start_date?: string;
  end_date?: string;
}

// ============================================================================
// UI Component Props Types
// ============================================================================

export interface TimeRangeOption {
  value: TimeRange;
  label: string;
  days: number | null; // null for 'all'
}

export const TIME_RANGE_OPTIONS: TimeRangeOption[] = [
  { value: '7d', label: '7 Days', days: 7 },
  { value: '30d', label: '30 Days', days: 30 },
  { value: '90d', label: '90 Days', days: 90 },
  { value: '1y', label: '1 Year', days: 365 },
  { value: 'all', label: 'All Time', days: null },
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getTimeRangeOption(value: TimeRange): TimeRangeOption {
  return TIME_RANGE_OPTIONS.find(opt => opt.value === value) || TIME_RANGE_OPTIONS[1];
}

export function getDateRangeFromTimeRange(timeRange: TimeRange): { start: Date | null; end: Date } {
  const end = new Date();
  const option = getTimeRangeOption(timeRange);

  if (option.days === null) {
    return { start: null, end };
  }

  const start = new Date();
  start.setDate(start.getDate() - option.days);
  start.setHours(0, 0, 0, 0);

  return { start, end };
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

export function formatLinesChanged(additions: number, deletions: number): string {
  return `+${formatNumber(additions)} / -${formatNumber(deletions)}`;
}

export function getPRStateColor(state: PRState): { text: string; bg: string } {
  switch (state) {
    case 'open':
      return { text: 'text-green-400', bg: 'bg-green-500/20' };
    case 'merged':
      return { text: 'text-purple-400', bg: 'bg-purple-500/20' };
    case 'closed':
      return { text: 'text-red-400', bg: 'bg-red-500/20' };
  }
}

export function truncateCommitMessage(message: string, maxLength: number = 72): string {
  const firstLine = message.split('\n')[0];
  if (firstLine.length <= maxLength) return firstLine;
  return firstLine.substring(0, maxLength - 3) + '...';
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
