'use client';

/**
 * Funnel Page 12 - Next.js Wrapper
 * Light Brand Consulting
 * Agentic AI Readiness - Multi-agent systems and agentic AI
 */

import { useRouter } from 'next/navigation';
import { FunnelPage12 } from '@/page-components/FunnelPage12';
import { PageKey } from '@/types';

export default function Funnel12() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage12 onNavigate={handleNavigate} />;
}
