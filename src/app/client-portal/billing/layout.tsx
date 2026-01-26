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
      <div className="min-h-screen bg-depth-base">
        <CommandCenterNav />
        <main>{children}</main>
      </div>
    </ClientAuthProvider>
  );
}
