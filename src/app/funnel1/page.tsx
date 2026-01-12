'use client';

/**
 * Funnel1 Page - The Light Brand Consultant Engine
 * Light Brand Consulting
 */

import { useRouter } from 'next/navigation';
import { FunnelPage1 } from '@/page-components/FunnelPage1';
import { PageKey } from '@/types';

export default function Funnel1() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage1 onNavigate={handleNavigate} />;
}
