'use client';

/**
 * Services Page - Next.js Wrapper
 * Light Brand Consulting
 */

import { useRouter } from 'next/navigation';
import { ServicesPage } from '@/page-components/Services';
import { PageKey } from '@/types';

export default function Services() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <ServicesPage onNavigate={handleNavigate} />;
}
