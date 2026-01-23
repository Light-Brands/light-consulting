'use client';

/**
 * Funnel Page 33 - Next.js Wrapper
 * Light Brand Consulting
 * Light Worker Business Academy - The Business School for Light Workers
 */

import { useRouter } from 'next/navigation';
import { FunnelPage33 } from '@/page-components/FunnelPage33';
import { PageKey } from '@/types';

export default function Funnel33() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage33 onNavigate={handleNavigate} />;
}
