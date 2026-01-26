/**
 * Request Magic Link API
 * Light Brand Consulting
 *
 * POST /api/client-portal/auth/request-magic-link
 * Sends a magic link email to the client
 */

import { NextResponse } from 'next/server';
import { createMagicLinkToken, getClientName, getClientProposals } from '@/lib/client-auth';
import { sendMagicLinkEmail, isEmailConfigured } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if this email has any proposals
    const proposals = await getClientProposals(normalizedEmail);
    if (proposals.length === 0) {
      // Don't reveal whether the email exists - just say we sent it
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, you will receive a magic link shortly.',
      });
    }

    // Create the magic link token
    const token = await createMagicLinkToken(normalizedEmail);
    if (!token) {
      return NextResponse.json(
        { error: 'Failed to create magic link' },
        { status: 500 }
      );
    }

    // Build the magic link URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const magicLinkUrl = `${baseUrl}/client-portal/auth/verify?token=${token}`;

    // Get client name for personalization
    const clientName = await getClientName(normalizedEmail);

    // Send the email
    if (isEmailConfigured()) {
      await sendMagicLinkEmail({
        to: normalizedEmail,
        magicLinkUrl,
        clientName: clientName || undefined,
      });
    } else {
      // Development mode - log the link
      console.log('\n========================================');
      console.log('MAGIC LINK (dev mode):');
      console.log(magicLinkUrl);
      console.log('========================================\n');
    }

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, you will receive a magic link shortly.',
      // Include link in dev mode for testing
      ...(process.env.NODE_ENV === 'development' && { devLink: magicLinkUrl }),
    });
  } catch (error) {
    console.error('[MagicLink] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
