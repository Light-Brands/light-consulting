/**
 * Client Logout API
 * Light Brand Consulting
 *
 * POST /api/client-portal/auth/logout
 * Logs out the current client
 */

import { NextResponse } from 'next/server';
import { clearClientSessionCookie } from '@/lib/client-auth';

export async function POST() {
  try {
    await clearClientSessionCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Logout] Error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}
