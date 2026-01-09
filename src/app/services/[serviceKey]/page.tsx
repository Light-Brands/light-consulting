'use client';

/**
 * Service Detail Page - Next.js Dynamic Route Wrapper
 * Light Brand Consulting
 */

import { useRouter, useParams } from 'next/navigation';
import { ServiceDetailPage } from '@/page-components/ServiceDetail';
import { PageKey } from '@/types';

export default function ServiceDetail() {
  const router = useRouter();
  const params = useParams();
  const serviceKey = params.serviceKey as string;

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <ServiceDetailPage serviceKey={serviceKey} onNavigate={handleNavigate} />;
}
