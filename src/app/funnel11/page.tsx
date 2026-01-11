'use client';

/**
 * Funnel Page 11 - Next.js Wrapper
 * Light Brand Consulting
 * AI ROI Audit - AI investment and ROI analysis
 */

import { useRouter } from 'next/navigation';
import { FunnelPage11 } from '@/page-components/FunnelPage11';
import { PageKey } from '@/types';

export default function Funnel11() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage11 onNavigate={handleNavigate} />;
}
