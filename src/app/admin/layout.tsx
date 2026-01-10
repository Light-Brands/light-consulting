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
  // Bypass authentication in development mode
  // TODO: Remove this bypass when Supabase auth is configured
  const isDevelopment = process.env.NODE_ENV === 'development';
  const bypassAuth = process.env.DISABLE_ADMIN_AUTH === 'true' || isDevelopment;
  
  if (!bypassAuth) {
    const session = await getServerSession(authOptions);

    // Redirect to login if not authenticated
    if (!session) {
      redirect('/admin/login');
    }
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
