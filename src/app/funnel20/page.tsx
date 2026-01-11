'use client';

/**
 * Funnel Page 20 - Next.js Wrapper
 * Light Brand Consulting
 * AI Executive Briefing - Monthly exclusive briefing for executives
 */

import { useRouter } from 'next/navigation';
import { FunnelPage20 } from '@/page-components/FunnelPage20';
import { PageKey } from '@/types';

export default function Funnel20() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage20 onNavigate={handleNavigate} />;
}
