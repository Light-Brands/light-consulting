'use client';

/**
 * Funnel Page 45 - Next.js Wrapper
 * Light Brand Consulting
 * The 90-Day AI Sprint
 */

import { useRouter } from 'next/navigation';
import { FunnelPage45 } from '@/page-components/FunnelPage45';
import { PageKey } from '@/types';

export default function Funnel45() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage45 onNavigate={handleNavigate} />;
}
