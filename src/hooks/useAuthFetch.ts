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
  }, []);

  return { authFetch };
}

export default useAuthFetch;
