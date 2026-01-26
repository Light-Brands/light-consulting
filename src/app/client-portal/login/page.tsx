/**
 * Client Portal Login Page
 * Light Brand Consulting
 *
 * Magic link request page for client authentication
 */

'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { Logo } from '@/components/Logo';

function LoginContent() {
  const searchParams = useSearchParams();
  const prefillEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState(prefillEmail);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [devLink, setDevLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    setDevLink(null);

    try {
      const response = await fetch('/api/client-portal/auth/request-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send magic link.');
        return;
      }

      setStatus('success');
      // In dev mode, show the link
      if (data.devLink) {
        setDevLink(data.devLink);
      }
    } catch (error) {
      console.error('Login error:', error);
      setStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-depth-base flex flex-col relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-radial-gradient from-radiance-gold/5 to-transparent blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-radiance-gold/3 blur-[120px] rounded-full pointer-events-none" />

      {/* Blueprint pattern */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

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
            <div className="absolute -inset-6 bg-gradient-to-br from-radiance-gold/10 via-radiance-amber/5 to-transparent blur-3xl rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative bg-gradient-to-br from-depth-elevated/40 to-depth-surface/30 border border-radiance-gold/20 rounded-3xl p-12 backdrop-blur-md overflow-hidden">
              {/* Subtle background pattern */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="relative z-10">
                {status === 'success' ? (
                  <div className="text-center">
                    <div className="relative inline-block mb-8">
                      <div className="absolute -inset-6 bg-green-500/20 blur-3xl rounded-full" />
                      <div className="relative w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary mb-3">
                      Check your email
                    </h1>
                    <p className="text-text-secondary mb-6">
                      We sent a magic link to <span className="text-radiance-gold font-medium">{email}</span>
                    </p>
                    <p className="text-text-muted text-sm">
                      Click the link in your email to sign in. The link expires in 15 minutes.
                    </p>

                    {/* Dev mode link */}
                    {devLink && (
                      <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                        <p className="text-amber-400 text-xs font-mono mb-2">DEV MODE - Click to verify:</p>
                        <a
                          href={devLink}
                          className="text-radiance-gold text-sm break-all hover:underline"
                        >
                          {devLink}
                        </a>
                      </div>
                    )}

                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-text-secondary hover:text-text-primary text-sm transition-colors"
                    >
                      Use a different email
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Title */}
                    <div className="mb-10 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-radiance-gold/10 border border-radiance-gold/20 rounded-full mb-6">
                        <span className="text-radiance-gold text-xs font-mono uppercase tracking-widest">Client Portal</span>
                      </div>
                      <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 tracking-tight">
                        Sign in to your Dashboard
                      </h1>
                      <p className="text-text-secondary text-base">
                        Enter your email to receive a magic sign-in link
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-text-primary font-medium mb-3">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full bg-depth-base border border-depth-border rounded-xl px-5 py-4 text-text-primary placeholder-text-muted/50 focus:border-radiance-gold focus:outline-none transition-colors text-lg"
                          autoFocus
                        />
                      </div>

                      {/* Error Message */}
                      {status === 'error' && errorMessage && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
                          <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <p className="text-red-400 text-sm">{errorMessage}</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        isLoading={status === 'loading'}
                        className="text-lg py-6 font-semibold shadow-lg shadow-radiance-gold/20 hover:shadow-radiance-gold/30 transition-all"
                      >
                        Send Magic Link
                      </Button>
                    </form>

                    <p className="text-text-muted text-sm text-center mt-8">
                      Have a proposal link?{' '}
                      <Link href="/proposals" className="text-radiance-gold hover:underline">
                        Access it directly
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-depth-border/20 py-6 relative z-10">
        <Container size="wide">
          <p className="text-center text-text-muted text-xs">
            &copy; {new Date().getFullYear()} Light Brand Consulting
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-depth-base flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-radiance-gold/20 border-t-radiance-gold rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
