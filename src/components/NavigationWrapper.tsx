'use client';

/**
 * Navigation Wrapper Component for Next.js
 * Adapts the existing Navigation component to use Next.js routing
 */

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { PageKey } from '../types';

export const NavigationWrapper: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Convert pathname to PageKey format
  const getActivePage = (): PageKey => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/services/')) {
      const serviceKey = pathname.split('/')[2];
      return `services/${serviceKey}` as PageKey;
    }
    if (pathname.startsWith('/insights/')) {
      const subpage = pathname.split('/')[2];
      return `insights/${subpage}` as PageKey;
    }
    // Remove leading slash and return as PageKey
    return pathname.slice(1) as PageKey;
  };

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <Navigation activePage={getActivePage()} onNavigate={handleNavigate} />;
};
