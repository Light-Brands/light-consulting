'use client';

/**
 * Funnel Page 9 - Next.js Wrapper
 * Light Brand Consulting
 * AI Team Enablement - AI fluency and team training
 */

import { useRouter } from 'next/navigation';
import { FunnelPage9 } from '@/page-components/FunnelPage9';
import { PageKey } from '@/types';

export default function Funnel9() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage9 onNavigate={handleNavigate} />;
}
