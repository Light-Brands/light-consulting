'use client';

/**
 * Home Page - Next.js Wrapper
 * Light Brand Consulting
 */

import { useRouter } from 'next/navigation';
import { HomePage } from '@/page-components/Home';
import { PageKey } from '@/types';

export default function Home() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <HomePage onNavigate={handleNavigate} />;
}
