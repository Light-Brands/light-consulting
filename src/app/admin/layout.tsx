/**
 * Admin Layout
 * Light Brand Consulting
 *
 * Protected layout for admin pages with sidebar navigation
 * Authentication is handled by AdminLayoutClient using Supabase
 */

import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
