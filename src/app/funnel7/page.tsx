'use client';

/**
 * Funnel Page 7 - Next.js Wrapper
 * Light Brand Consulting
 * AI Governance Shield - AI compliance and governance
 */

import { useRouter } from 'next/navigation';
import { FunnelPage7 } from '@/page-components/FunnelPage7';
import { PageKey } from '@/types';

export default function Funnel7() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage7 onNavigate={handleNavigate} />;
}
