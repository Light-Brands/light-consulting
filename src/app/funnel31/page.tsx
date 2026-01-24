'use client';

/**
 * Funnel Page 31 - Next.js Wrapper
 * Light Brand Consulting
 * Business for Course Creators - Your Wisdom Deserves More Than a Udemy Course
 */

import { useRouter } from 'next/navigation';
import { FunnelPage31 } from '@/page-components/FunnelPage31';
import { PageKey } from '@/types';

export default function Funnel31() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage31 onNavigate={handleNavigate} />;
}
