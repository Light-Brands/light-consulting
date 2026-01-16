'use client';

/**
 * Funnel Page - Next.js Wrapper
 * Light Brand Consulting
 */

import { useRouter } from 'next/navigation';
import { FunnelPage } from '@/page-components/FunnelPage';
import { PageKey } from '@/types';

export default function Funnel() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage onNavigate={handleNavigate} />;
}
