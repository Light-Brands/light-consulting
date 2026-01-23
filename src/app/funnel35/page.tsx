'use client';

/**
 * Funnel Page 35 - Next.js Wrapper
 * Light Brand Consulting
 * Annual Light Workers Summit - The Annual Gathering for Purpose-Driven Entrepreneurs
 */

import { useRouter } from 'next/navigation';
import { FunnelPage35 } from '@/page-components/FunnelPage35';
import { PageKey } from '@/types';

export default function Funnel35() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <FunnelPage35 onNavigate={handleNavigate} />;
}
