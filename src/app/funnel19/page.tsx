'use client';

/**
 * Funnel Page 19 - Next.js Wrapper
 * Light Brand Consulting
 * AI Maturity Bootcamp - Cohort-based AI learning program
 */

import { useRouter } from 'next/navigation';
import { FunnelPage19 } from '@/page-components/FunnelPage19';
import { PageKey } from '@/types';

export default function Funnel19() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage19 onNavigate={handleNavigate} />;
}
