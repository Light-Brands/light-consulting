'use client';

/**
 * Funnel Page 36 - Next.js Wrapper
 * Light Brand Consulting
 * Vision Keeper Retainer - Strategic Partner Who Gets It
 */

import { useRouter } from 'next/navigation';
import { FunnelPage36 } from '@/page-components/FunnelPage36';
import { PageKey } from '@/types';

export default function Funnel36() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage36 onNavigate={handleNavigate} />;
}
