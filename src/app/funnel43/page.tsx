'use client';

/**
 * Funnel Page 43 - Next.js Wrapper
 * Light Brand Consulting
 * The Shadow AI Audit
 */

import { useRouter } from 'next/navigation';
import { FunnelPage43 } from '@/page-components/FunnelPage43';
import { PageKey } from '@/types';

export default function Funnel43() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage43 onNavigate={handleNavigate} />;
}
