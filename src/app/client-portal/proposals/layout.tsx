/**
 * Client Proposals Layout
 * Light Brand Consulting
 *
 * Authenticated layout for client proposals pages
 */

import React from 'react';
import { ClientAuthProvider } from '@/contexts/ClientAuthContext';
import { CommandCenterNav } from '@/components/client-portal/CommandCenterNav';

export default function ProposalsLayout({
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
