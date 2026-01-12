'use client';

/**
 * Funnel Page 24 - Next.js Wrapper
 * Light Brand Consulting
 * AI Team Enablement - Upskill teams for AI adoption
 */

import { useRouter } from 'next/navigation';
import { FunnelPage24 } from '@/page-components/FunnelPage24';
import { PageKey } from '@/types';

export default function Funnel24() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage24 onNavigate={handleNavigate} />;
}
