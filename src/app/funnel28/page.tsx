'use client';

/**
 * Funnel Page 28 - Next.js Wrapper
 * Light Brand Consulting
 * AI Use Case Finder - Identify highest-impact AI opportunities
 */

import { useRouter } from 'next/navigation';
import { FunnelPage28 } from '@/page-components/FunnelPage28';
import { PageKey } from '@/types';

export default function Funnel28() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage28 onNavigate={handleNavigate} />;
}
