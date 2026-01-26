/**
 * Magic Link Verification Page
 * Light Brand Consulting
 *
 * Verifies the magic link token and redirects to dashboard
 */

'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { Logo } from '@/components/Logo';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMessage('No verification token provided.');
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('/api/client-portal/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          setStatus('error');
          setErrorMessage(data.error || 'Failed to verify magic link.');
          return;
        }

        setStatus('success');
        // Redirect to dashboard after a brief success message
        setTimeout(() => {
          router.push('/client-portal/dashboard');
        }, 1500);
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-depth-base flex flex-col relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-radial-gradient from-radiance-gold/5 to-transparent blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-depth-border/30 bg-depth-base/50 backdrop-blur-xl relative z-10">
        <Container size="wide">
          <div className="flex items-center justify-center py-6">
            <Link href="/" className="flex items-center group">
              <Logo className="h-8 md:h-10 w-auto transition-opacity group-hover:opacity-80" textColor="var(--color-text-primary)" />
            </Link>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-md">
          <div className="relative group">
            <div className="absolute -inset-6 bg-gradient-to-br from-radiance-gold/10 via-radiance-amber/5 to-transparent blur-3xl rounded-3xl opacity-60" />

            <div className="relative bg-gradient-to-br from-depth-elevated/40 to-depth-surface/30 border border-radiance-gold/20 rounded-3xl p-12 backdrop-blur-md text-center">
              {status === 'verifying' && (
                <>
                  <div className="relative inline-block mb-8">
                    <div className="absolute -inset-4 bg-radiance-gold/20 blur-2xl rounded-full opacity-50 animate-pulse" />
                    <div className="relative w-16 h-16 border-2 border-radiance-gold/20 border-t-radiance-gold rounded-full animate-spin" />
                  </div>
                  <h1 className="text-2xl font-bold text-text-primary mb-3">
                    Verifying your link...
                  </h1>
                  <p className="text-text-secondary">
                    Please wait while we sign you in.
                  </p>
                </>
              )}

              {status === 'success' && (
                <>
                  <div className="relative inline-block mb-8">
                    <div className="absolute -inset-6 bg-green-500/20 blur-3xl rounded-full" />
                    <div className="relative w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-text-primary mb-3">
                    You're signed in!
                  </h1>
                  <p className="text-text-secondary">
                    Redirecting to your dashboard...
                  </p>
                </>
              )}

              {status === 'error' && (
                <>
                  <div className="relative inline-block mb-8">
                    <div className="absolute -inset-6 bg-red-500/10 blur-3xl rounded-full" />
                    <div className="relative w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
                      <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-text-primary mb-3">
                    Verification Failed
                  </h1>
                  <p className="text-text-secondary mb-8">
                    {errorMessage}
                  </p>
                  <Link href="/client-portal/login">
                    <Button variant="primary">
                      Request New Link
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-depth-base flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-radiance-gold/20 border-t-radiance-gold rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
