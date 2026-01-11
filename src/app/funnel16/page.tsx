'use client';

/**
 * Funnel Page 16 - Next.js Wrapper
 * Light Brand Consulting
 * AI for E-Commerce - Industry-specific AI for e-commerce and DTC brands
 */

import { useRouter } from 'next/navigation';
import { FunnelPage16 } from '@/page-components/FunnelPage16';
import { PageKey } from '@/types';

export default function Funnel16() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage16 onNavigate={handleNavigate} />;
}
