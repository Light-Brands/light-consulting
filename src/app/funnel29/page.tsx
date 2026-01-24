'use client';

/**
 * Funnel Page 29 - Next.js Wrapper
 * Light Brand Consulting
 * Business for Healers - Your Healing Gift Deserves a Business That Honors It
 */

import { useRouter } from 'next/navigation';
import { FunnelPage29 } from '@/page-components/FunnelPage29';
import { PageKey } from '@/types';

export default function Funnel29() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage29 onNavigate={handleNavigate} />;
}
