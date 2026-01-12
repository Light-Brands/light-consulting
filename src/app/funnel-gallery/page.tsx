'use client';

import { FunnelGallery } from '@/page-components/FunnelGallery';
import { useRouter } from 'next/navigation';
import type { PageKey } from '@/types';

export default function FunnelGalleryPage() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  return <FunnelGallery onNavigate={handleNavigate} />;
}
