/**
 * Admin Layout
 * Light Brand Consulting
 *
 * Protected layout for admin pages with sidebar navigation
 * 
 * TEMPORARY: Authentication is completely bypassed
 * TODO: Re-enable when Supabase auth is configured
 */

import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TEMPORARILY BYPASS ALL AUTHENTICATION
  // TODO: Remove this bypass when Supabase auth is configured
  // Authentication is completely bypassed until proper Supabase auth is implemented
  // No session checking, no redirects - just render the admin layout
  
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
