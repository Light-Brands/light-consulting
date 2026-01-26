/**
 * Accept Invitation Page
 * Light Brand Consulting
 */

'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { InvitationAcceptForm } from '@/components/auth';

function AcceptInvitationContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="min-h-screen bg-depth-base flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Missing Invitation Token
          </h1>
          <p className="text-text-muted mb-6">
            Please use the link provided in your invitation email.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 px-4 py-2 text-radiance-gold hover:text-radiance-amber transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to login
          </Link>
        </div>
      </div>
    );
  }

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
              Accept Invitation
            </h1>
            <p className="text-text-muted">
              Join Light Brand Consulting
            </p>
          </div>

          <InvitationAcceptForm token={token} />
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

export default function AcceptInvitationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-depth-base flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-depth-border border-t-radiance-gold animate-spin" />
        </div>
      }
    >
      <AcceptInvitationContent />
    </Suspense>
  );
}
