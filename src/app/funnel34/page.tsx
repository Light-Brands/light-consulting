'use client';

/**
 * Funnel Page 34 - Next.js Wrapper
 * Light Brand Consulting
 * Light Leader Newsletter - Weekly Wisdom for Purpose-Driven Entrepreneurs
 */

import { useRouter } from 'next/navigation';
import { FunnelPage34 } from '@/page-components/FunnelPage34';
import { PageKey } from '@/types';

export default function Funnel34() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage34 onNavigate={handleNavigate} />;
}
