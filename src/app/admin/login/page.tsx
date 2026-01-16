/**
 * Admin Login Page
 * Light Brand Consulting
 *
 * Supabase authentication login page for admin access
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLogin() {
  const router = useRouter();
  const { signIn, isAuthenticated, loading, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push('/admin');
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-depth-base flex items-center justify-center px-4">
        <div className="w-8 h-8 border-2 border-radiance-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show warning if Supabase is not configured
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-depth-base flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center shadow-illumination mx-auto mb-4">
              <span className="text-depth-base font-bold text-xl">LB</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Admin Access</h1>
            <p className="text-text-secondary mt-2">Authentication Not Configured</p>
          </div>

          <div className="bg-depth-surface border border-yellow-500/30 rounded-2xl p-8 mb-6">
            <div className="text-yellow-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-text-secondary mb-4">
              Supabase authentication is not configured. Please set up the following environment variables:
            </p>
            <ul className="text-left text-text-muted text-sm font-mono space-y-1 mb-4">
              <li>NEXT_PUBLIC_SUPABASE_URL</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            </ul>
          </div>

          <p className="text-center text-text-muted text-sm">
            <Link
              href="/"
              className="text-radiance-gold hover:text-radiance-amber transition-colors"
            >
              Back to website
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-depth-base flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center shadow-illumination mx-auto mb-4">
            <span className="text-depth-base font-bold text-xl">LB</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Login</h1>
          <p className="text-text-secondary mt-2">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-depth-surface border border-depth-border rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors"
                placeholder="admin@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-depth-elevated border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors"
                placeholder="Enter your password"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full px-6 py-3 bg-radiance-gold text-depth-base font-semibold rounded-lg hover:bg-radiance-amber transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-depth-base border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Back to site */}
        <p className="mt-6 text-center text-text-muted text-sm">
          <Link
            href="/"
            className="text-radiance-gold hover:text-radiance-amber transition-colors"
          >
            Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
