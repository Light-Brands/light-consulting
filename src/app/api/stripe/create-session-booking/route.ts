/**
 * Stripe Session Booking Checkout API Route
 * Light Brand Consulting
 *
 * POST /api/stripe/create-session-booking - Create a checkout session for strategic session booking ($500)
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import {
  createSessionBookingCheckout,
  isStripeConfigured,
  STRATEGIC_SESSION_PRICE,
} from '@/lib/stripe';

interface CreateSessionBookingRequest {
  lead_id: string;
}

/**
 * POST /api/stripe/create-session-booking
 * Creates a Stripe checkout session for a $500 strategic session booking
 * Requires a valid lead_id from the diagnostic assessment
 */
export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: 'Payment system is not configured' },
        { status: 503 }
      );
    }

    const body: CreateSessionBookingRequest = await request.json();
    const { lead_id } = body;

    if (!lead_id) {
      return NextResponse.json(
        { error: 'Missing required field: lead_id' },
        { status: 400 }
      );
    }

    // Get lead details from database
    if (!isSupabaseConfigured()) {
      // Mock response for development
      return NextResponse.json({
        checkout_url: 'https://checkout.stripe.com/mock-session',
        session_id: 'mock_session_id',
        amount: STRATEGIC_SESSION_PRICE,
      });
    }

    // Get lead by ID
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('lead_submissions')
      .select('id, name, email, company, session_paid, session_payment_id')
      .eq('id', lead_id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Check if session is already paid
    if (lead.session_paid) {
      return NextResponse.json(
        { error: 'Strategic session has already been paid', already_paid: true },
        { status: 400 }
      );
    }

    // Build success and cancel URLs
    const baseUrl = request.headers.get('origin') || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/book/success?lead_id=${lead_id}&payment=success`;
    const cancelUrl = `${baseUrl}/book?lead_id=${lead_id}&payment=cancelled`;

    // Create new checkout session
    const session = await createSessionBookingCheckout({
      leadId: lead_id,
      clientEmail: lead.email,
      clientName: lead.name,
      companyName: lead.company,
      successUrl,
      cancelUrl,
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      );
    }

    // Update lead with checkout session info
    await supabaseAdmin
      .from('lead_submissions')
      .update({
        session_checkout_id: session.id,
        session_checkout_url: session.url,
      })
      .eq('id', lead_id);

    return NextResponse.json({
      checkout_url: session.url,
      session_id: session.id,
      amount: STRATEGIC_SESSION_PRICE,
    });
  } catch (error) {
    console.error('Error creating session booking checkout:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
