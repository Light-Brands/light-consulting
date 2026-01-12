'use client';

/**
 * Funnel Page 23 - Next.js Wrapper
 * Light Brand Consulting
 * Fractional AI Officer - AI leadership without full-time cost
 */

import { useRouter } from 'next/navigation';
import { FunnelPage23 } from '@/page-components/FunnelPage23';
import { PageKey } from '@/types';

export default function Funnel23() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage23 onNavigate={handleNavigate} />;
}
