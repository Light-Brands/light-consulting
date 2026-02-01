/**
 * Supabase Server-Side Auth Verification
 * Light Brand Consulting
 *
 * Utility for verifying Supabase auth in API routes
 */

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseAuthConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

/**
 * Verify Supabase auth from request headers
 * Returns the user if authenticated, null otherwise
 */
export async function verifySupabaseAuth(request: Request) {
  // If Supabase auth is not configured, return null (will fall back to bypass logic)
  if (!isSupabaseAuthConfigured()) {
    return null;
  }

  try {
    // Get the Authorization header
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.replace('Bearer ', '');

    // Create a Supabase client with the user's token
    const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // Verify the token by getting the user
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error verifying Supabase auth:', error);
    return null;
  }
}

/**
 * Check if request is from an authenticated admin
 * Combines Supabase auth check with development bypass
 */
export async function isAdminAuthenticated(request: Request): Promise<boolean> {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const bypassAuth = process.env.DISABLE_ADMIN_AUTH === 'true';

  // Allow bypass in development or when explicitly disabled
  if (bypassAuth || isDevelopment) {
    return true;
  }

  // If Supabase auth is not configured, deny access in production
  if (!isSupabaseAuthConfigured()) {
    return false;
  }

  // Verify Supabase auth
  const user = await verifySupabaseAuth(request);
  return user !== null;
}

/**
 * Get the current authenticated user from request
 * Returns the user object or null if not authenticated
 */
export async function getCurrentUser(request: Request) {
  // If Supabase auth is not configured, return a placeholder in development
  if (!isSupabaseAuthConfigured()) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment) {
      return {
        id: 'dev-user-001',
        email: 'dev@example.com',
      };
    }
    return null;
  }

  return verifySupabaseAuth(request);
}
