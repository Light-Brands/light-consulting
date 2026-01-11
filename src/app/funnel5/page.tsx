'use client';

/**
 * Funnel Page 5 - Next.js Wrapper
 * Light Brand Consulting
 * Light Workers Funnel - For purpose-driven visionaries bringing their ideas to the planet
 */

import { useRouter } from 'next/navigation';
import { FunnelPage5 } from '@/page-components/FunnelPage5';
import { PageKey } from '@/types';

export default function Funnel5() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage5 onNavigate={handleNavigate} />;
}
