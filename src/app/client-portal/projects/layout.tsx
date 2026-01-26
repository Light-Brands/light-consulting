/**
 * Client Projects Layout
 * Light Brand Consulting
 *
 * Authenticated layout for client projects pages
 */

import React from 'react';
import { ClientAuthProvider } from '@/contexts/ClientAuthContext';
import { CommandCenterNav } from '@/components/client-portal/CommandCenterNav';

export default function ProjectsLayout({
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
