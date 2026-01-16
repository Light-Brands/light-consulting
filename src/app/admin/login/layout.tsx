/**
 * Admin Login Layout
 * Light Brand Consulting
 *
 * Separate layout for login page (no sidebar)
 */

'use client';

import { AuthProvider } from '@/contexts/AuthContext';

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
