'use client';

/**
 * Funnel Page 6 - Next.js Wrapper
 * Light Brand Consulting
 * AI Pilot Rescue - Rescuing AI pilots stuck in purgatory
 */

import { useRouter } from 'next/navigation';
import { FunnelPage6 } from '@/page-components/FunnelPage6';
import { PageKey } from '@/types';

export default function Funnel6() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage6 onNavigate={handleNavigate} />;
}
