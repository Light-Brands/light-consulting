'use client';

/**
 * Funnel Page 13 - Next.js Wrapper
 * Light Brand Consulting
 * AI Use Case Finder - Help businesses identify AI opportunities
 */

import { useRouter } from 'next/navigation';
import { FunnelPage13 } from '@/page-components/FunnelPage13';
import { PageKey } from '@/types';

export default function Funnel13() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage13 onNavigate={handleNavigate} />;
}
