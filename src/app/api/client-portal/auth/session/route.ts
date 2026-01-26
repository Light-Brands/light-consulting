/**
 * Client Session API
 * Light Brand Consulting
 *
 * GET /api/client-portal/auth/session
 * Returns the current client session
 */

import { NextResponse } from 'next/server';
import { getCurrentClientSession, getClientName } from '@/lib/client-auth';

export async function GET() {
  try {
    const session = await getCurrentClientSession();

    if (!session) {
      return NextResponse.json({ authenticated: false });
    }

    // Get client name
    const clientName = await getClientName(session.email);

    return NextResponse.json({
      authenticated: true,
      email: session.email,
      clientName,
    });
  } catch (error) {
    console.error('[Session] Error:', error);
    return NextResponse.json({ authenticated: false });
  }
}
