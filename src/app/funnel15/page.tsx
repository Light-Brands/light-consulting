'use client';

/**
 * Funnel Page 15 - Next.js Wrapper
 * Light Brand Consulting
 * AI for Professional Services - Industry-specific AI for professional services firms
 */

import { useRouter } from 'next/navigation';
import { FunnelPage15 } from '@/page-components/FunnelPage15';
import { PageKey } from '@/types';

export default function Funnel15() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage15 onNavigate={handleNavigate} />;
}
