'use client';

/**
 * Insights Page - Next.js Wrapper
 * Light Brand Consulting
 */

import { useRouter } from 'next/navigation';
import { InsightsPage } from '@/page-components/Insights';
import { PageKey } from '@/types';

export default function Insights() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <InsightsPage onNavigate={handleNavigate} />;
}
