// GitHub API Client with rate limiting and error handling

import type {
  GitHubApiRepository,
  GitHubApiCommit,
  GitHubApiPullRequest,
  GitHubApiContributorStats,
  GitHubApiRateLimit,
  GitHubApiOrganization,
} from '@/types/github-analytics';

// ============================================================================
// Configuration
// ============================================================================

const GITHUB_API_BASE = 'https://api.github.com';
const DEFAULT_PER_PAGE = 100;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// ============================================================================
// Rate Limit Tracking
// ============================================================================

interface RateLimitState {
  remaining: number;
  resetAt: number;
  limit: number;
}

let rateLimitState: RateLimitState = {
  remaining: 5000,
  resetAt: Date.now() + 3600000,
  limit: 5000,
};

function updateRateLimitFromHeaders(headers: Headers): void {
  const remaining = headers.get('x-ratelimit-remaining');
  const reset = headers.get('x-ratelimit-reset');
  const limit = headers.get('x-ratelimit-limit');

  if (remaining) rateLimitState.remaining = parseInt(remaining, 10);
  if (reset) rateLimitState.resetAt = parseInt(reset, 10) * 1000;
  if (limit) rateLimitState.limit = parseInt(limit, 10);
}

export function getRateLimitState(): RateLimitState {
  return { ...rateLimitState };
}

async function waitForRateLimit(): Promise<void> {
  if (rateLimitState.remaining > 10) return;

  const waitMs = Math.max(0, rateLimitState.resetAt - Date.now() + 1000);
  if (waitMs > 0 && waitMs < 60000) {
    console.log(`Rate limit low, waiting ${Math.ceil(waitMs / 1000)}s...`);
    await new Promise(resolve => setTimeout(resolve, waitMs));
  }
}

// ============================================================================
// HTTP Client
// ============================================================================

interface GitHubApiError {
  message: string;
  documentation_url?: string;
  status?: number;
}

class GitHubApiException extends Error {
  status: number;
  documentation_url?: string;

  constructor(message: string, status: number, documentation_url?: string) {
    super(message);
    this.name = 'GitHubApiException';
    this.status = status;
    this.documentation_url = documentation_url;
  }
}

async function fetchWithRetry<T>(
  url: string,
  token: string,
  retries: number = MAX_RETRIES
): Promise<T> {
  await waitForRateLimit();

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { headers });
      updateRateLimitFromHeaders(response.headers);

      if (response.status === 202) {
        // GitHub returns 202 when computing stats, need to retry
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt));
          continue;
        }
        return [] as T;
      }

      if (response.status === 204) {
        return [] as T;
      }

      if (!response.ok) {
        const error: GitHubApiError = await response.json().catch(() => ({
          message: `HTTP ${response.status}`,
        }));
        throw new GitHubApiException(
          error.message,
          response.status,
          error.documentation_url
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof GitHubApiException) {
        // Don't retry client errors (4xx)
        if (error.status >= 400 && error.status < 500) {
          throw error;
        }
      }

      if (attempt === retries) {
        throw error;
      }

      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt));
    }
  }

  throw new Error('Max retries exceeded');
}

// Paginated fetch helper
async function fetchAllPages<T>(
  baseUrl: string,
  token: string,
  maxPages: number = 10
): Promise<T[]> {
  const results: T[] = [];
  let page = 1;

  while (page <= maxPages) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    const url = `${baseUrl}${separator}per_page=${DEFAULT_PER_PAGE}&page=${page}`;

    const data = await fetchWithRetry<T[]>(url, token);

    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    results.push(...data);

    if (data.length < DEFAULT_PER_PAGE) {
      break;
    }

    page++;
  }

  return results;
}

// ============================================================================
// GitHub API Client Class
// ============================================================================

export class GitHubClient {
  private token: string;
  private orgName: string | null;

  constructor(token: string, orgName?: string | null) {
    this.token = token;
    this.orgName = orgName || null;
  }

  // Validate token and get user info
  async validateToken(): Promise<{ valid: boolean; login?: string; scopes?: string[] }> {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/user`, {
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${this.token}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      updateRateLimitFromHeaders(response.headers);

      if (!response.ok) {
        return { valid: false };
      }

      const user = await response.json();
      const scopes = response.headers.get('x-oauth-scopes')?.split(', ') || [];

      return {
        valid: true,
        login: user.login,
        scopes,
      };
    } catch {
      return { valid: false };
    }
  }

  // Get rate limit status
  async getRateLimit(): Promise<GitHubApiRateLimit> {
    return fetchWithRetry<GitHubApiRateLimit>(
      `${GITHUB_API_BASE}/rate_limit`,
      this.token
    );
  }

  // ============================================================================
  // Organization & Repositories
  // ============================================================================

  // Get all organizations the token has access to
  async getUserOrganizations(): Promise<GitHubApiOrganization[]> {
    return fetchAllPages<GitHubApiOrganization>(
      `${GITHUB_API_BASE}/user/orgs`,
      this.token
    );
  }

  async getOrgRepositories(includePrivate: boolean = true, orgLogin?: string): Promise<GitHubApiRepository[]> {
    const org = orgLogin || this.orgName;
    if (!org) {
      throw new Error('No organization specified');
    }
    const type = includePrivate ? 'all' : 'public';
    return fetchAllPages<GitHubApiRepository>(
      `${GITHUB_API_BASE}/orgs/${org}/repos?type=${type}&sort=pushed`,
      this.token
    );
  }

  async getRepository(owner: string, repo: string): Promise<GitHubApiRepository> {
    return fetchWithRetry<GitHubApiRepository>(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}`,
      this.token
    );
  }

  async getRepositoryLanguages(owner: string, repo: string): Promise<Record<string, number>> {
    return fetchWithRetry<Record<string, number>>(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
      this.token
    );
  }

  // ============================================================================
  // Commits
  // ============================================================================

  async getCommits(
    owner: string,
    repo: string,
    options: {
      since?: string;
      until?: string;
      author?: string;
      sha?: string;
      maxPages?: number;
    } = {}
  ): Promise<GitHubApiCommit[]> {
    const params = new URLSearchParams();
    if (options.since) params.set('since', options.since);
    if (options.until) params.set('until', options.until);
    if (options.author) params.set('author', options.author);
    if (options.sha) params.set('sha', options.sha);

    const queryString = params.toString();
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits${queryString ? `?${queryString}` : ''}`;

    return fetchAllPages<GitHubApiCommit>(url, this.token, options.maxPages || 10);
  }

  async getCommitDetails(owner: string, repo: string, sha: string): Promise<GitHubApiCommit> {
    return fetchWithRetry<GitHubApiCommit>(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${sha}`,
      this.token
    );
  }

  // ============================================================================
  // Pull Requests
  // ============================================================================

  async getPullRequests(
    owner: string,
    repo: string,
    state: 'open' | 'closed' | 'all' = 'all',
    maxPages: number = 10
  ): Promise<GitHubApiPullRequest[]> {
    return fetchAllPages<GitHubApiPullRequest>(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls?state=${state}&sort=updated&direction=desc`,
      this.token,
      maxPages
    );
  }

  async getPullRequestDetails(
    owner: string,
    repo: string,
    prNumber: number
  ): Promise<GitHubApiPullRequest> {
    return fetchWithRetry<GitHubApiPullRequest>(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls/${prNumber}`,
      this.token
    );
  }

  // ============================================================================
  // Contributors & Stats
  // ============================================================================

  async getContributorStats(
    owner: string,
    repo: string
  ): Promise<GitHubApiContributorStats[]> {
    // This endpoint may return 202 if stats are being computed
    const result = await fetchWithRetry<GitHubApiContributorStats[]>(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/contributors`,
      this.token
    );
    return result || [];
  }

  async getCodeFrequency(
    owner: string,
    repo: string
  ): Promise<Array<[number, number, number]>> {
    // Returns [timestamp, additions, deletions] per week
    const result = await fetchWithRetry<Array<[number, number, number]>>(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/code_frequency`,
      this.token
    );
    return result || [];
  }

  async getCommitActivity(
    owner: string,
    repo: string
  ): Promise<Array<{ days: number[]; total: number; week: number }>> {
    // Returns commit activity for the last year
    const result = await fetchWithRetry<Array<{ days: number[]; total: number; week: number }>>(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/stats/commit_activity`,
      this.token
    );
    return result || [];
  }
}

// ============================================================================
// Factory Function
// ============================================================================

export function createGitHubClient(): GitHubClient | null {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  const orgName = process.env.GITHUB_ORG_NAME;

  if (!token) {
    return null;
  }

  return new GitHubClient(token, orgName || null);
}

export function isGitHubConfigured(): boolean {
  // Token is required, org name is now optional (multi-org support)
  return !!process.env.GITHUB_ACCESS_TOKEN;
}

// Check if legacy single-org mode (env var only, no tracked orgs in DB)
export function hasLegacyOrgConfig(): boolean {
  return !!process.env.GITHUB_ORG_NAME;
}
