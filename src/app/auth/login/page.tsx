/**
 * Login Page
 * Light Brand Consulting
 */

'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth';

function LoginContent() {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  const redirectTo = searchParams.get('redirect') || '/client-portal';

  return (
    <div className="min-h-screen bg-depth-base flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center shadow-illumination group-hover:shadow-illumination-intense transition-all">
              <span className="text-depth-base font-bold text-lg">LB</span>
            </div>
            <div className="text-left">
              <span className="text-text-primary font-semibold block">Light Brand</span>
              <span className="text-text-muted text-xs">Consulting</span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-depth-surface border border-depth-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Welcome back
            </h1>
            <p className="text-text-muted">
              Sign in to access your projects
            </p>
          </div>

          {registered && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
              <p className="text-green-400 text-sm text-center">
                Account created successfully! Please sign in.
              </p>
            </div>
          )}

          <LoginForm redirectTo={redirectTo} />
        </div>

        {/* Footer */}
        <p className="text-center text-text-muted text-sm mt-8">
          Need help?{' '}
          <a
            href="mailto:support@lightbrand.co"
            className="text-radiance-gold hover:text-radiance-amber transition-colors"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-depth-base flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-depth-border border-t-radiance-gold animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
