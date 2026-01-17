/**
 * AI Go/No-Go Assessment™ Funnel Route
 * 10-Stage Conversion Funnel
 */

'use client';

import { useRouter } from 'next/navigation';
import { AssessmentFunnelPage } from '../../page-components/AssessmentFunnel';
import { PageKey } from '../../types';

export default function AssessmentFunnelRoute() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <AssessmentFunnelPage onNavigate={handleNavigate} />;
}
