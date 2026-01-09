'use client';

/**
 * Labor Arbitrage Insights Page - Next.js Wrapper
 * Light Brand Consulting
 */

import { useRouter } from 'next/navigation';
import { LaborArbitragePage } from '@/page-components/LaborArbitrage';
import { PageKey } from '@/types';

export default function LaborArbitrage() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <LaborArbitragePage onNavigate={handleNavigate} />;
}
