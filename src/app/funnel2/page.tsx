'use client';

/**
 * Funnel Page 2 - Next.js Wrapper
 * Light Brand Consulting
 * Web2 to AI-Native Transformation
 */

import { useRouter } from 'next/navigation';
import { FunnelPage2 } from '@/page-components/FunnelPage2';
import { PageKey } from '@/types';

export default function Funnel2() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage2 onNavigate={handleNavigate} />;
}
