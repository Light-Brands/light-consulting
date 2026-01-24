'use client';

/**
 * Funnel Page 42 - Next.js Wrapper
 * Light Brand Consulting
 * AI for Customer Service
 */

import { useRouter } from 'next/navigation';
import { FunnelPage42 } from '@/page-components/FunnelPage42';
import { PageKey } from '@/types';

export default function Funnel42() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage42 onNavigate={handleNavigate} />;
}
