/**
 * Admin Layout
 * Light Brand Consulting
 *
 * Protected layout for admin pages with sidebar navigation
 */

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TEMPORARILY BYPASS ALL AUTHENTICATION
  // TODO: Remove this bypass when Supabase auth is configured
  // Authentication is completely bypassed until proper Supabase auth is implemented
  const bypassAuth = true;
  
  if (!bypassAuth) {
    const session = await getServerSession(authOptions);

    // Redirect to login if not authenticated
    if (!session) {
      redirect('/admin/login');
    }
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
