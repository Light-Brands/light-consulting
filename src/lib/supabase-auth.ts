/**
 * Supabase Auth Client Configuration
 * Light Brand Consulting
 *
 * Browser-side Supabase client with session persistence for authentication
 */

import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Placeholder for build time
const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTkwMDAwMDAwMH0.placeholder';

// Check if Supabase auth is properly configured
export const isSupabaseAuthConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseUrl !== PLACEHOLDER_URL &&
    supabaseAnonKey &&
    supabaseAnonKey !== PLACEHOLDER_KEY
  );
};

// Browser client with session persistence (for auth)
let browserClient: SupabaseClient<Database> | null = null;

export const getSupabaseBrowserClient = (): SupabaseClient<Database> => {
  if (browserClient) {
    return browserClient;
  }

  browserClient = createClient<Database>(
    supabaseUrl || PLACEHOLDER_URL,
    supabaseAnonKey || PLACEHOLDER_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      },
    }
  );

  return browserClient;
};

// Auth helper functions
export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = getSupabaseBrowserClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentSession(): Promise<Session | null> {
  const supabase = getSupabaseBrowserClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Subscribe to auth state changes
export function onAuthStateChange(callback: (user: User | null) => void) {
  const supabase = getSupabaseBrowserClient();

  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(session?.user ?? null);
    }
  );

  return subscription;
}
