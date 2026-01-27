'use client';

/**
 * Admin Layout Client Component
 * Light Brand Consulting
 *
 * Client-side wrapper with Supabase auth protection
 * Only team members (admin/team_member roles) can access the admin portal
 */

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SyncProgressProvider } from '@/contexts/SyncProgressContext';
import { AdminSidebar, MobileAdminNav, FloatingSyncWidget } from '@/components/admin';
import { useAuthFetch } from '@/hooks/useAuthFetch';

interface TeamStatus {
  isTeamMember: boolean;
  teamRole: string | null;
  teamName: string | null;
}

function AdminContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading, isConfigured } = useAuth();
  const { authFetch } = useAuthFetch();
  const [teamStatus, setTeamStatus] = useState<TeamStatus | null>(null);
  const [checkingTeam, setCheckingTeam] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  // Check team membership after authentication
  const checkTeamMembership = useCallback(async () => {
    if (!isAuthenticated || isLoginPage) return;

    setCheckingTeam(true);
    try {
      const response = await authFetch('/api/admin/auth/me');
      const data = await response.json();

      if (data.data) {
        setTeamStatus({
          isTeamMember: data.data.isTeamMember,
          teamRole: data.data.teamRole,
          teamName: data.data.teamName,
        });
      }
    } catch (error) {
      console.error('Error checking team status:', error);
      setTeamStatus({ isTeamMember: false, teamRole: null, teamName: null });
    } finally {
      setCheckingTeam(false);
    }
  }, [isAuthenticated, isLoginPage, authFetch]);

  useEffect(() => {
    // Skip auth check for login page
    if (isLoginPage) {
      return;
    }

    // If auth is configured and user is not authenticated, redirect to login
    if (!loading && isConfigured && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, isConfigured, isLoginPage, router]);

  // Check team membership when authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoginPage && isConfigured) {
      checkTeamMembership();
    }
  }, [isAuthenticated, isLoginPage, isConfigured, checkTeamMembership]);

  // Show loading spinner while checking auth (but not on login page)
  if ((loading || checkingTeam) && !isLoginPage) {
    return (
      <div className="flex min-h-screen bg-depth-base items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-radiance-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">
            {loading ? 'Verifying authentication...' : 'Checking team access...'}
          </p>
        </div>
      </div>
    );
  }

  // If auth is configured and user is not authenticated, show redirecting state (except login page)
  if (isConfigured && !isAuthenticated && !isLoginPage) {
    return (
      <div className="flex min-h-screen bg-depth-base items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-radiance-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Login page - render without sidebar
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-depth-base">
        {children}
      </div>
    );
  }

  // If authenticated but NOT a team member, show access denied
  if (isConfigured && isAuthenticated && teamStatus && !teamStatus.isTeamMember) {
    return (
      <div className="flex min-h-screen bg-depth-base items-center justify-center p-4">
        <div className="max-w-md w-full bg-depth-surface border border-depth-border rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Access Denied</h1>
          <p className="text-text-secondary mb-6">
            You don&apos;t have permission to access the admin portal. Only team members can access this area.
          </p>
          <p className="text-sm text-text-muted mb-6">
            If you believe this is an error, please contact an administrator to grant you team access.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="/"
              className="w-full px-4 py-3 bg-radiance-gold text-depth-base font-semibold rounded-xl hover:bg-radiance-amber transition-colors"
            >
              Go to Homepage
            </a>
            <button
              onClick={() => {
                // Sign out and redirect to login
                window.location.href = '/admin/login';
              }}
              className="w-full px-4 py-3 bg-depth-elevated text-text-secondary font-medium rounded-xl hover:bg-depth-border transition-colors"
            >
              Sign in with Different Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If Supabase is not configured, show warning but allow access (development mode)
  if (!isConfigured) {
    return (
      <SyncProgressProvider>
        <div className="flex min-h-screen bg-depth-base">
          {/* Sidebar - hidden on mobile */}
          <div className="hidden md:block">
            <AdminSidebar />
          </div>
          <main className="flex-1 min-h-screen pb-20 md:pb-0">
            {/* Development warning banner */}
            <div className="bg-yellow-500/10 border-b border-yellow-500/30 px-4 py-2">
              <p className="text-yellow-500 text-sm text-center">
                <strong>Development Mode:</strong> Supabase auth is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable authentication.
              </p>
            </div>
            {children}
          </main>
          {/* Mobile bottom navigation */}
          <MobileAdminNav />
          {/* Floating sync progress widget */}
          <FloatingSyncWidget />
        </div>
      </SyncProgressProvider>
    );
  }

  return (
    <SyncProgressProvider>
      <div className="flex min-h-screen bg-depth-base">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <AdminSidebar />
        </div>
        <main className="flex-1 min-h-screen pb-20 md:pb-0">{children}</main>
        {/* Mobile bottom navigation */}
        <MobileAdminNav />
        {/* Floating sync progress widget */}
        <FloatingSyncWidget />
      </div>
    </SyncProgressProvider>
  );
}

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminContent>{children}</AdminContent>
    </AuthProvider>
  );
}
