'use client';

/**
 * Admin Layout Client Component
 * Light Brand Consulting
 *
 * Client-side wrapper with Supabase auth protection
 */

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from '@/components/admin';

function AdminContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading, isConfigured } = useAuth();

  const isLoginPage = pathname === '/admin/login';

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

  // Show loading spinner while checking auth (but not on login page)
  if (loading && !isLoginPage) {
    return (
      <div className="flex min-h-screen bg-depth-base items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-radiance-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Verifying authentication...</p>
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

  // If Supabase is not configured, show warning but allow access (development mode)
  if (!isConfigured) {
    return (
      <div className="flex min-h-screen bg-depth-base">
        <AdminSidebar />
        <main className="flex-1 min-h-screen">
          {/* Development warning banner */}
          <div className="bg-yellow-500/10 border-b border-yellow-500/30 px-4 py-2">
            <p className="text-yellow-500 text-sm text-center">
              <strong>Development Mode:</strong> Supabase auth is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable authentication.
            </p>
          </div>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-depth-base">
      <AdminSidebar />
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
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
