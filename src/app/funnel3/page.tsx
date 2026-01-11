'use client';

/**
 * Funnel Page 3 - Next.js Wrapper
 * Light Brand Consulting
 * AI-Native Foundation - Growth, Automation, and Leverage
 */

import { useRouter } from 'next/navigation';
import { FunnelPage3 } from '@/page-components/FunnelPage3';
import { PageKey } from '@/types';

export default function Funnel3() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage3 onNavigate={handleNavigate} />;
}
