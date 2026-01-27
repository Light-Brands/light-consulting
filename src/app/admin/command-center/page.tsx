/**
 * Command Center Redirect
 * Light Brand Consulting
 *
 * Redirects to /admin which now contains the Command Center
 */

import { redirect } from 'next/navigation';

export default function CommandCenterRedirect() {
  redirect('/admin');
}
