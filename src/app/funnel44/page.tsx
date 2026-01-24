'use client';

/**
 * Funnel Page 44 - Next.js Wrapper
 * Light Brand Consulting
 * AI Without the Risk
 */

import { useRouter } from 'next/navigation';
import { FunnelPage44 } from '@/page-components/FunnelPage44';
import { PageKey } from '@/types';

export default function Funnel44() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage44 onNavigate={handleNavigate} />;
}
