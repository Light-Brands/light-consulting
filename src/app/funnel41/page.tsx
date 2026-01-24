'use client';

/**
 * Funnel Page 41 - Next.js Wrapper
 * Light Brand Consulting
 * The COO's Efficiency Engine
 */

import { useRouter } from 'next/navigation';
import { FunnelPage41 } from '@/page-components/FunnelPage41';
import { PageKey } from '@/types';

export default function Funnel41() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage41 onNavigate={handleNavigate} />;
}
