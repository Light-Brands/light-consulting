'use client';

/**
 * Funnel Page 37 - Next.js Wrapper
 * Light Brand Consulting
 * AI Intelligence Systems - For 7-8 figure founders seeking AI-powered scale
 */

import { useRouter } from 'next/navigation';
import { FunnelPage37 } from '@/page-components/FunnelPage37';
import { PageKey } from '@/types';

export default function Funnel37() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage37 onNavigate={handleNavigate} />;
}
