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
      <CommandCenterNav />
      {children}
    </ClientAuthProvider>
  );
}
