'use client';

/**
 * Auth Context Provider
 * Light Brand Consulting
 *
 * Provides Supabase authentication state management across the app
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import {
  getCurrentUser,
  signInWithEmail as supabaseSignIn,
  signOut as supabaseSignOut,
  onAuthStateChange,
  isSupabaseAuthConfigured,
} from '@/lib/supabase-auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = isSupabaseAuthConfigured();

  useEffect(() => {
    // Get initial user
    const initAuth = async () => {
      try {
        if (isConfigured) {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error getting current user:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth changes
    if (isConfigured) {
      const subscription = onAuthStateChange((user) => {
        setUser(user);
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConfigured]);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      await supabaseSignIn(email, password);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await supabaseSignOut();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    isConfigured,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
