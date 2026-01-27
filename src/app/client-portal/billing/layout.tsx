/**
 * Client Billing Layout
 * Light Brand Consulting
 *
 * Authenticated layout for client billing pages
 */

import React from 'react';
import { ClientAuthProvider } from '@/contexts/ClientAuthContext';
import { CommandCenterNav } from '@/components/client-portal/CommandCenterNav';

export default function BillingLayout({
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
