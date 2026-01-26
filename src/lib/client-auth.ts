/**
 * Client Authentication Utilities
 * Light Brand Consulting
 *
 * Handles magic link authentication for client portal
 */

import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const MAGIC_LINK_EXPIRY_MINUTES = 15;
const SESSION_EXPIRY_DAYS = 30;
const SESSION_COOKIE_NAME = 'client_session';

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

/**
 * Create a magic link token for a client email
 */
export async function createMagicLinkToken(email: string): Promise<string | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    // Development fallback
    console.log('[ClientAuth] Supabase not configured, returning mock token');
    return `mock-token-${Date.now()}`;
  }

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + MAGIC_LINK_EXPIRY_MINUTES);

  const { data, error } = await supabase
    .from('client_magic_links')
    .insert({
      email: email.toLowerCase(),
      expires_at: expiresAt.toISOString(),
    })
    .select('token')
    .single();

  if (error) {
    console.error('[ClientAuth] Failed to create magic link:', error);
    return null;
  }

  return data?.token || null;
}

/**
 * Verify a magic link token and create a session
 */
export async function verifyMagicLinkToken(token: string): Promise<{ email: string; sessionToken: string } | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    // Development fallback
    if (token.startsWith('mock-token-')) {
      return {
        email: 'dev@example.com',
        sessionToken: `mock-session-${Date.now()}`,
      };
    }
    return null;
  }

  // Find the token
  const { data: magicLink, error: findError } = await supabase
    .from('client_magic_links')
    .select('*')
    .eq('token', token)
    .is('used_at', null)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (findError || !magicLink) {
    console.error('[ClientAuth] Invalid or expired magic link');
    return null;
  }

  // Mark the token as used
  await supabase
    .from('client_magic_links')
    .update({ used_at: new Date().toISOString() })
    .eq('id', magicLink.id);

  // Create a session
  const sessionExpiresAt = new Date();
  sessionExpiresAt.setDate(sessionExpiresAt.getDate() + SESSION_EXPIRY_DAYS);

  const { data: session, error: sessionError } = await supabase
    .from('client_sessions')
    .insert({
      email: magicLink.email,
      expires_at: sessionExpiresAt.toISOString(),
    })
    .select('session_token')
    .single();

  if (sessionError || !session) {
    console.error('[ClientAuth] Failed to create session:', sessionError);
    return null;
  }

  return {
    email: magicLink.email,
    sessionToken: session.session_token,
  };
}

/**
 * Validate a session token
 */
export async function validateSession(sessionToken: string): Promise<{ email: string } | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    // Development fallback
    if (sessionToken.startsWith('mock-session-')) {
      return { email: 'dev@example.com' };
    }
    return null;
  }

  const { data: session, error } = await supabase
    .from('client_sessions')
    .select('email, expires_at')
    .eq('session_token', sessionToken)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !session) {
    return null;
  }

  // Update last accessed time
  await supabase
    .from('client_sessions')
    .update({ last_accessed_at: new Date().toISOString() })
    .eq('session_token', sessionToken);

  return { email: session.email };
}

/**
 * Get current client session from cookies
 */
export async function getCurrentClientSession(): Promise<{ email: string } | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return null;
    }

    return validateSession(sessionToken);
  } catch {
    return null;
  }
}

/**
 * Set the client session cookie
 */
export async function setClientSessionCookie(sessionToken: string) {
  const cookieStore = await cookies();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

/**
 * Clear the client session cookie
 */
export async function clearClientSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Delete a session from the database
 */
export async function deleteSession(sessionToken: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  await supabase
    .from('client_sessions')
    .delete()
    .eq('session_token', sessionToken);
}

/**
 * Get all proposals for a client email
 */
export async function getClientProposals(email: string) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('client_email', email.toLowerCase())
    .in('status', ['sent', 'viewed', 'agreement_signed', 'active', 'completed'])
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[ClientAuth] Failed to fetch proposals:', error);
    return [];
  }

  return data || [];
}

/**
 * Get client name from their proposals
 */
export async function getClientName(email: string): Promise<string | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from('proposals')
    .select('client_name')
    .eq('client_email', email.toLowerCase())
    .limit(1)
    .single();

  return data?.client_name || null;
}

/**
 * Get client entity by email
 * Returns the client from the clients table if they exist
 */
export async function getClientByEmail(email: string) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('client_email', email.toLowerCase())
    .single();

  if (error) {
    // Client might not exist in the clients table yet (legacy proposals)
    return null;
  }

  return data;
}

/**
 * Get projects for a client by client ID
 */
export async function getClientProjectsById(clientId: string) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('client_projects')
    .select(`
      *,
      proposals:proposals(id, project_name, status, final_amount, progress_percentage)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[ClientAuth] Failed to fetch client projects:', error);
    return [];
  }

  return data || [];
}

/**
 * Get all data for client portal dashboard
 * Returns client entity, projects, and proposals organized hierarchically
 */
export async function getClientDashboardData(email: string) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { client: null, projects: [], proposals: [] };
  }

  // First, try to find the client entity
  const client = await getClientByEmail(email);

  if (client) {
    // Get projects for this client
    const projects = await getClientProjectsById(client.id);

    // Get proposals linked to this client
    const { data: proposals } = await supabase
      .from('proposals')
      .select('*')
      .eq('client_id', client.id)
      .in('status', ['sent', 'viewed', 'agreement_signed', 'active', 'completed'])
      .order('created_at', { ascending: false });

    return {
      client,
      projects,
      proposals: proposals || [],
    };
  }

  // Fallback: Get proposals by email (legacy behavior)
  const proposals = await getClientProposals(email);

  return {
    client: null,
    projects: [],
    proposals,
  };
}
