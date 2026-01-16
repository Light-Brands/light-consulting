'use client';

/**
 * About Page - Next.js Wrapper
 * Light Brand Consulting
 */

import { useRouter } from 'next/navigation';
import { AboutPage } from '@/page-components/About';
import { PageKey } from '@/types';

export default function About() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <AboutPage onNavigate={handleNavigate} />;
}
