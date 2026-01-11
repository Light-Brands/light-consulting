'use client';

/**
 * Funnel Page 14 - Next.js Wrapper
 * Light Brand Consulting
 * AI Intelligence Maintenance - Ongoing AI system optimization and support
 */

import { useRouter } from 'next/navigation';
import { FunnelPage14 } from '@/page-components/FunnelPage14';
import { PageKey } from '@/types';

export default function Funnel14() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage14 onNavigate={handleNavigate} />;
}
