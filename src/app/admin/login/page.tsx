/**
 * Admin Login Page
 * Light Brand Consulting
 * 
 * TEMPORARY: Auth is bypassed - this page redirects to admin
 * TODO: Re-enable when Supabase auth is configured
 */

'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  // TEMPORARY: Since auth is bypassed, redirect to admin immediately
  useEffect(() => {
    router.push(callbackUrl);
  }, [router, callbackUrl]);

  return (
    <div className="min-h-screen bg-depth-base flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-radiance-gold/20 border-t-radiance-gold rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-secondary">Redirecting to admin...</p>
      </div>
    </div>
  );
}
