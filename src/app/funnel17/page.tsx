'use client';

/**
 * Funnel Page 17 - Next.js Wrapper
 * Light Brand Consulting
 * AI for Healthcare - Industry-specific AI for healthcare organizations
 */

import { useRouter } from 'next/navigation';
import { FunnelPage17 } from '@/page-components/FunnelPage17';
import { PageKey } from '@/types';

export default function Funnel17() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage17 onNavigate={handleNavigate} />;
}
