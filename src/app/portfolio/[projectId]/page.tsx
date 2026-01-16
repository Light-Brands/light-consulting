'use client';

/**
 * Project Detail Page - Next.js Dynamic Route Wrapper
 * Light Brand Consulting
 */

import { useRouter, useParams } from 'next/navigation';
import { ProjectDetailPage } from '@/page-components/ProjectDetail';
import { PageKey } from '@/types';

export default function ProjectDetail() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const handleNavigate = (page: PageKey) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  return <ProjectDetailPage projectId={projectId} onNavigate={handleNavigate} />;
}
