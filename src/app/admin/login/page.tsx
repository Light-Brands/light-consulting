/**
 * Admin Login Page
 * Light Brand Consulting
 * 
 * TEMPORARY: Auth is bypassed - this page just shows a message
 * TODO: Re-enable login form when Supabase auth is configured
 */

'use client';

import Link from 'next/link';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-depth-base flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center shadow-illumination mx-auto mb-4">
            <span className="text-depth-base font-bold text-xl">LB</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Access</h1>
          <p className="text-text-secondary mt-2">
            Authentication is temporarily disabled
          </p>
        </div>

        {/* Message */}
        <div className="bg-depth-surface border border-depth-border rounded-2xl p-8 mb-6">
          <p className="text-text-secondary mb-6">
            Admin authentication is currently bypassed. You can access all admin pages directly.
          </p>
          <Link
            href="/admin"
            className="inline-block px-6 py-3 bg-radiance-gold text-depth-base font-semibold rounded-lg hover:bg-radiance-amber transition-colors"
          >
            Go to Admin Dashboard
          </Link>
        </div>

        {/* Back to site */}
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
