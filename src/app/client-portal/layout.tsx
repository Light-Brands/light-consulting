/**
 * Client Portal Layout
 * Light Brand Consulting
 */

import React from 'react';

export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-depth-base">
      <main>{children}</main>
    </div>
  );
}
