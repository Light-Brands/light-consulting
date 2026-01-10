'use client';

/**
 * Portfolio Client Component
 * Light Brand Consulting
 */

import { useRouter } from 'next/navigation';
import { PortfolioPage } from '@/page-components/Portfolio';
import { PageKey } from '@/types';

export default function PortfolioClient() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <PortfolioPage onNavigate={handleNavigate} />;
}
