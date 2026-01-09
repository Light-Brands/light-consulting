'use client';

/**
 * Funnel 2 Page - Next.js Wrapper
 * Light Brand Consulting
 */

import { useRouter } from 'next/navigation';
import { Funnel2Page } from '@/page-components/Funnel2Page';
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

  return <Funnel2Page onNavigate={handleNavigate} />;
}
