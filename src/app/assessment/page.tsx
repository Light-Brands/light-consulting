'use client';

/**
 * AI Go/No-Go Assessment Page - Next.js Wrapper
 * Light Brand Consulting
 *
 * Entry point for the $5,000 AI Go/No-Go Assessment funnel.
 * This is a dedicated flow separate from other booking processes.
 */

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AssessmentPage } from '@/page-components/Assessment';
import { PageKey, AssessmentStage } from '@/types';

function AssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Allow stage to be set via URL for returning users
  const initialStage = (searchParams.get('stage') as AssessmentStage) || 'qualify';
  const assessmentId = searchParams.get('id') || undefined;

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return (
    <AssessmentPage
      onNavigate={handleNavigate}
      initialStage={initialStage}
      assessmentId={assessmentId}
    />
  );
}

export default function Assessment() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-muted">Loading assessment...</div>
      </div>
    }>
      <AssessmentContent />
    </Suspense>
  );
}
