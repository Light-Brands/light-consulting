'use client';

/**
 * Funnel Page 38 - Next.js Wrapper
 * Light Brand Consulting
 * The 95% Problem - Why Most AI Projects Fail
 */

import { useRouter } from 'next/navigation';
import { FunnelPage38 } from '@/page-components/FunnelPage38';
import { PageKey } from '@/types';

export default function Funnel38() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage38 onNavigate={handleNavigate} />;
}
