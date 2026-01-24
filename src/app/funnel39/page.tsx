'use client';

/**
 * Funnel Page 39 - Next.js Wrapper
 * Light Brand Consulting
 * AI Maturity Assessment Quiz
 */

import { useRouter } from 'next/navigation';
import { FunnelPage39 } from '@/page-components/FunnelPage39';
import { PageKey } from '@/types';

export default function Funnel39() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage39 onNavigate={handleNavigate} />;
}
