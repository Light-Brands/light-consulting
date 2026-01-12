'use client';

/**
 * Funnel Page 22 - Next.js Wrapper
 * Light Brand Consulting
 * AI Governance Shield - Compliance-first AI governance for regulated industries
 */

import { useRouter } from 'next/navigation';
import { FunnelPage22 } from '@/page-components/FunnelPage22';
import { PageKey } from '@/types';

export default function Funnel22() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage22 onNavigate={handleNavigate} />;
}
