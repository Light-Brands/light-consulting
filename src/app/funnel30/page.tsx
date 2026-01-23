'use client';

/**
 * Funnel Page 30 - Next.js Wrapper
 * Light Brand Consulting
 * Business for Spiritual Coaches - Stop Competing With Life Coaches
 */

import { useRouter } from 'next/navigation';
import { FunnelPage30 } from '@/page-components/FunnelPage30';
import { PageKey } from '@/types';

export default function Funnel30() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage30 onNavigate={handleNavigate} />;
}
