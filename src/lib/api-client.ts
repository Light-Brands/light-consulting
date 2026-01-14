/**
 * API Client with Supabase Auth
 * Light Brand Consulting
 *
 * Authenticated API client that includes Supabase auth token in requests
 */

import { getSupabaseBrowserClient } from './supabase-auth';

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Make an authenticated API request
 * Automatically includes the Supabase auth token in the Authorization header
 */
export async function authFetch(url: string, options: FetchOptions = {}): Promise<Response> {
  const { skipAuth = false, headers: customHeaders, ...restOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  // Add auth token if not skipping auth
  if (!skipAuth) {
    try {
      const supabase = getSupabaseBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.access_token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${session.access_token}`;
      }
    } catch (error) {
      console.error('Error getting auth session for API request:', error);
    }
  }

  return fetch(url, {
    ...restOptions,
    headers,
  });
}

/**
 * GET request with auth
 */
export async function authGet(url: string, options: FetchOptions = {}): Promise<Response> {
  return authFetch(url, { ...options, method: 'GET' });
}

/**
 * POST request with auth
 */
export async function authPost(url: string, data?: unknown, options: FetchOptions = {}): Promise<Response> {
  return authFetch(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request with auth
 */
export async function authPut(url: string, data?: unknown, options: FetchOptions = {}): Promise<Response> {
  return authFetch(url, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCH request with auth
 */
export async function authPatch(url: string, data?: unknown, options: FetchOptions = {}): Promise<Response> {
  return authFetch(url, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request with auth
 */
export async function authDelete(url: string, options: FetchOptions = {}): Promise<Response> {
  return authFetch(url, { ...options, method: 'DELETE' });
}
