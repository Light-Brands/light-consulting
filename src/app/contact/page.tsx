'use client';

/**
 * Contact Page - Next.js Wrapper
 * Light Brand Consulting
 */

import { useRouter } from 'next/navigation';
import { ContactPage } from '@/page-components/Contact';
import { PageKey } from '@/types';

export default function Contact() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <ContactPage onNavigate={handleNavigate} />;
}
