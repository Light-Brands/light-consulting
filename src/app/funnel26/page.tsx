'use client';

/**
 * Funnel Page 26 - Next.js Wrapper
 * Light Brand Consulting
 * AI ROI Audit - Measure and optimize AI investment returns
 */

import { useRouter } from 'next/navigation';
import { FunnelPage26 } from '@/page-components/FunnelPage26';
import { PageKey } from '@/types';

export default function Funnel26() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage26 onNavigate={handleNavigate} />;
}
