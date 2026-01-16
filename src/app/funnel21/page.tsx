'use client';

/**
 * Funnel Page 21 - Next.js Wrapper
 * Light Brand Consulting
 * AI Pilot Rescue - Rescue stuck AI pilots and get them to production
 */

import { useRouter } from 'next/navigation';
import { FunnelPage21 } from '@/page-components/FunnelPage21';
import { PageKey } from '@/types';

export default function Funnel21() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage21 onNavigate={handleNavigate} />;
}
