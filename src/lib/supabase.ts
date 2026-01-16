/**
 * Supabase Client Configuration
 * Light Brand Consulting
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Create a dummy client for build time when env vars aren't available
const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTkwMDAwMDAwMH0.placeholder';

// Only log warnings in development (not during build)
if (typeof window !== 'undefined' || process.env.NODE_ENV === 'development') {
  if (!supabaseUrl) {
    console.warn('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
  }
  if (!supabaseAnonKey) {
    console.warn('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
  }
}

// Client-side Supabase client (uses anon key)
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl || PLACEHOLDER_URL,
  supabaseAnonKey || PLACEHOLDER_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);

// Server-side Supabase client (uses service role key for admin operations)
export const supabaseAdmin: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl || PLACEHOLDER_URL,
  supabaseServiceKey || supabaseAnonKey || PLACEHOLDER_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
