'use client';

/**
 * Funnel Page 10 - Next.js Wrapper
 * Light Brand Consulting
 * AI Data Readiness - Data quality and AI-readiness assessment
 */

import { useRouter } from 'next/navigation';
import { FunnelPage10 } from '@/page-components/FunnelPage10';
import { PageKey } from '@/types';

export default function Funnel10() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage10 onNavigate={handleNavigate} />;
}
