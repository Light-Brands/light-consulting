'use client';

/**
 * Funnel Page 4 - Next.js Wrapper
 * Light Brand Consulting
 * AI Intelligence Ascension - Client Ascension System
 */

import { useRouter } from 'next/navigation';
import { FunnelPage4 } from '@/page-components/FunnelPage4';
import { PageKey } from '@/types';

export default function Funnel4() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage4 onNavigate={handleNavigate} />;
}
