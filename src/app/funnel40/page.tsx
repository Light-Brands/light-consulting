'use client';

/**
 * Funnel Page 40 - Next.js Wrapper
 * Light Brand Consulting
 * The CEO's AI Playbook
 */

import { useRouter } from 'next/navigation';
import { FunnelPage40 } from '@/page-components/FunnelPage40';
import { PageKey } from '@/types';

export default function Funnel40() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage40 onNavigate={handleNavigate} />;
}
