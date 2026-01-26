/**
 * Client Portal Layout
 * Light Brand Consulting
 */

import React from 'react';
import { ClientNavbar } from '@/components/client-portal';

export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-depth-base">
      <ClientNavbar />
      <main>{children}</main>
    </div>
  );
}
