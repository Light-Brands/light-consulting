/**
 * Client Command Center Dashboard Layout
 * Light Brand Consulting
 *
 * Authenticated layout for client portal dashboard pages
 */

import React from 'react';
import { ClientAuthProvider } from '@/contexts/ClientAuthContext';
import { CommandCenterNav } from '@/components/client-portal/CommandCenterNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientAuthProvider>
      <div className="min-h-screen bg-depth-base">
        <CommandCenterNav />
        <main>{children}</main>
      </div>
    </ClientAuthProvider>
  );
}
