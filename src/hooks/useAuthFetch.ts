/**
 * useAuthFetch Hook
 * Light Brand Consulting
 *
 * Hook for making authenticated API requests with Supabase auth
 */

'use client';

import { useCallback } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase-auth';

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Hook that provides an authenticated fetch function
 * Automatically includes Supabase auth token in requests
 */
export function useAuthFetch() {
  const authFetch = useCallback(async (url: string, options: FetchOptions = {}): Promise<Response> => {
    const { skipAuth = false, headers: customHeaders, body, ...restOptions } = options;

    // Don't set Content-Type for FormData - browser will set it with boundary
    const isFormData = body instanceof FormData;
    const headers: HeadersInit = {};
    
    // Only set Content-Type if not FormData and not already set in customHeaders
    if (!isFormData && !customHeaders?.['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    
    // Merge custom headers (they take precedence)
    if (customHeaders) {
      Object.assign(headers, customHeaders);
    }

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
      body,
      headers,
    });
  }, []);

  return { authFetch };
}

export default useAuthFetch;
