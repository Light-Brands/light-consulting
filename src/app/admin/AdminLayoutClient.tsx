'use client';

/**
 * Admin Layout Client Component
 * Light Brand Consulting
 */

import { SessionProvider } from 'next-auth/react';
import { AdminSidebar } from '@/components/admin';

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-depth-base">
        <AdminSidebar />
        <main className="flex-1 min-h-screen">{children}</main>
      </div>
    </SessionProvider>
  );
}
