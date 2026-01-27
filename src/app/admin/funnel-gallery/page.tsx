/**
 * Admin Funnel Gallery Page
 * Light Brand Consulting
 *
 * Unlocked access to funnel gallery for admin users
 */

'use client';

import { FunnelGallery } from '@/page-components/FunnelGallery';
import { useRouter } from 'next/navigation';
import type { PageKey } from '@/types';

export default function AdminFunnelGalleryPage() {
  const router = useRouter();

  const handleNavigate = (page: PageKey) => {
    router.push(page === 'home' ? '/' : `/${page}`);
  };

  // Pass isAdminAccess to bypass password protection
  return <FunnelGallery onNavigate={handleNavigate} isAdminAccess={true} />;
}
