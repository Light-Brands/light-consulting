'use client';

/**
 * Book Page - Next.js Wrapper
 * Light Brand Consulting
 */

import { useRouter } from 'next/navigation';
import { BookPage } from '@/page-components/Book';
import { PageKey } from '@/types';

export default function Book() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <BookPage onNavigate={handleNavigate} />;
}
