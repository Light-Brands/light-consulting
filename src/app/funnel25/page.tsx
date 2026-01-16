'use client';

/**
 * Funnel Page 25 - Next.js Wrapper
 * Light Brand Consulting
 * AI Data Readiness - Prepare data infrastructure for AI
 */

import { useRouter } from 'next/navigation';
import { FunnelPage25 } from '@/page-components/FunnelPage25';
import { PageKey } from '@/types';

export default function Funnel25() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage25 onNavigate={handleNavigate} />;
}
