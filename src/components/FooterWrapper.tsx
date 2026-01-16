'use client';

/**
 * Footer Wrapper Component for Next.js
 * Adapts the existing Footer component to use Next.js routing
 */

import React from 'react';
import { useRouter } from 'next/navigation';
import { Footer } from './Footer';
import { PageKey } from '../types';

export const FooterWrapper: React.FC = () => {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <Footer onNavigate={handleNavigate} />;
};
