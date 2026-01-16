'use client';

/**
 * Funnel Page 18 - Next.js Wrapper
 * Light Brand Consulting
 * AI for Financial Services - Industry-specific AI for financial services
 */

import { useRouter } from 'next/navigation';
import { FunnelPage18 } from '@/page-components/FunnelPage18';
import { PageKey } from '@/types';

export default function Funnel18() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage18 onNavigate={handleNavigate} />;
}
