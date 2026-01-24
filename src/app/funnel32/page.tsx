'use client';

/**
 * Funnel Page 32 - Next.js Wrapper
 * Light Brand Consulting
 * Business for Retreat Leaders - Build a Business Around Your Retreat
 */

import { useRouter } from 'next/navigation';
import { FunnelPage32 } from '@/page-components/FunnelPage32';
import { PageKey } from '@/types';

export default function Funnel32() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage32 onNavigate={handleNavigate} />;
}
