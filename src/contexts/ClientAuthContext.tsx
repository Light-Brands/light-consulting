/**
 * Client Authentication Context
 * Light Brand Consulting
 *
 * Provides authentication state for the client portal
 */

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface ClientSession {
  email: string;
  clientName: string | null;
}

interface ClientAuthContextValue {
  session: ClientSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const ClientAuthContext = createContext<ClientAuthContextValue | undefined>(undefined);

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  '/client-portal/login',
  '/client-portal/auth/verify',
];

export function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<ClientSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    try {
      const response = await fetch('/api/client-portal/auth/session');
      const data = await response.json();

      if (data.authenticated) {
        setSession({
          email: data.email,
          clientName: data.clientName,
        });
      } else {
        setSession(null);
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/client-portal/auth/logout', { method: 'POST' });
      setSession(null);
      router.push('/client-portal/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }, [router]);

  const refreshSession = useCallback(async () => {
    await fetchSession();
  }, [fetchSession]);

  // Fetch session on mount
  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  // Redirect to login if not authenticated and on protected route
  useEffect(() => {
    if (!isLoading && !session && pathname) {
      const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
      const isDashboardRoute = pathname.startsWith('/client-portal/dashboard') ||
        pathname.startsWith('/client-portal/proposals') ||
        pathname.startsWith('/client-portal/billing') ||
        pathname.startsWith('/client-portal/work');

      if (!isPublicRoute && isDashboardRoute) {
        router.push('/client-portal/login');
      }
    }
  }, [isLoading, session, pathname, router]);

  const value: ClientAuthContextValue = {
    session,
    isLoading,
    isAuthenticated: !!session,
    logout,
    refreshSession,
  };

  return (
    <ClientAuthContext.Provider value={value}>
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  const context = useContext(ClientAuthContext);
  if (context === undefined) {
    throw new Error('useClientAuth must be used within a ClientAuthProvider');
  }
  return context;
}
