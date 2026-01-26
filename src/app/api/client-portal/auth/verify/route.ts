/**
 * Verify Magic Link API
 * Light Brand Consulting
 *
 * POST /api/client-portal/auth/verify
 * Verifies a magic link token and creates a session
 */

import { NextResponse } from 'next/server';
import { verifyMagicLinkToken, setClientSessionCookie } from '@/lib/client-auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Verify the token and create a session
    const result = await verifyMagicLinkToken(token);

    if (!result) {
      return NextResponse.json(
        { error: 'Invalid or expired magic link. Please request a new one.' },
        { status: 401 }
      );
    }

    // Set the session cookie
    await setClientSessionCookie(result.sessionToken);

    return NextResponse.json({
      success: true,
      email: result.email,
    });
  } catch (error) {
    console.error('[VerifyMagicLink] Error:', error);
    return NextResponse.json(
      { error: 'Failed to verify magic link' },
      { status: 500 }
    );
  }
}
