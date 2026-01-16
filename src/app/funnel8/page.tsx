'use client';

/**
 * Funnel Page 8 - Next.js Wrapper
 * Light Brand Consulting
 * Fractional AI Officer - AI leadership without full-time cost
 */

import { useRouter } from 'next/navigation';
import { FunnelPage8 } from '@/page-components/FunnelPage8';
import { PageKey } from '@/types';

export default function Funnel8() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage8 onNavigate={handleNavigate} />;
}
