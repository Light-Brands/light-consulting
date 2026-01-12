'use client';

/**
 * Funnel Page 27 - Next.js Wrapper
 * Light Brand Consulting
 * Agentic AI Readiness - Prepare organizations for autonomous AI agents
 */

import { useRouter } from 'next/navigation';
import { FunnelPage27 } from '@/page-components/FunnelPage27';
import { PageKey } from '@/types';

export default function Funnel27() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage27 onNavigate={handleNavigate} />;
}
