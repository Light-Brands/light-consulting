/**
 * Stripe Checkout Session API Route
 * Light Brand Consulting
 *
 * POST /api/stripe/create-checkout-session - Create a checkout session for milestone payment
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import {
  createMilestoneCheckoutSession,
  isStripeConfigured,
  isCheckoutSessionValid,
} from '@/lib/stripe';

interface CreateCheckoutRequest {
  milestone_id: string;
  access_token: string; // Proposal access token for authorization
}

/**
 * POST /api/stripe/create-checkout-session
 * Creates a Stripe checkout session for a milestone payment
 * Accessible by clients with valid proposal access token
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

    const body: CreateCheckoutRequest = await request.json();
    const { milestone_id, access_token } = body;

    if (!milestone_id || !access_token) {
      return NextResponse.json(
        { error: 'Missing required fields: milestone_id and access_token' },
        { status: 400 }
      );
    }

    // Verify proposal access token and get proposal details
    if (!isSupabaseConfigured()) {
      // Mock response for development
      return NextResponse.json({
        checkout_url: 'https://checkout.stripe.com/mock-session',
        session_id: 'mock_session_id',
      });
    }

    // Get proposal by access token
    const { data: proposal, error: proposalError } = await supabaseAdmin
      .from('proposals')
      .select('id, client_name, client_email, project_name, access_token')
      .eq('access_token', access_token)
      .single();

    if (proposalError || !proposal) {
      return NextResponse.json(
        { error: 'Invalid access token' },
        { status: 401 }
      );
    }

    // Get milestone and verify it belongs to this proposal
    const { data: milestone, error: milestoneError } = await supabaseAdmin
      .from('milestones')
      .select('*')
      .eq('id', milestone_id)
      .eq('proposal_id', proposal.id)
      .single();

    if (milestoneError || !milestone) {
      return NextResponse.json(
        { error: 'Milestone not found or does not belong to this proposal' },
        { status: 404 }
      );
    }

    // Check if milestone is already paid
    if (milestone.payment_status === 'paid') {
      return NextResponse.json(
        { error: 'This milestone has already been paid' },
        { status: 400 }
      );
    }

    // Check if there's an existing checkout session and if it's still valid
    if (milestone.stripe_checkout_session_id && milestone.stripe_payment_url) {
      const sessionValid = await isCheckoutSessionValid(milestone.stripe_checkout_session_id);
      if (sessionValid) {
        // Return existing checkout URL if still valid
        return NextResponse.json({
          checkout_url: milestone.stripe_payment_url,
          session_id: milestone.stripe_checkout_session_id,
        });
      }
      // Session expired or completed - will create a new one below
      console.log(`Checkout session ${milestone.stripe_checkout_session_id} expired, creating new one`);
    }

    // Build success and cancel URLs
    const baseUrl = request.headers.get('origin') || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/proposals/${access_token}?payment=success&milestone=${milestone_id}`;
    const cancelUrl = `${baseUrl}/proposals/${access_token}?payment=cancelled&milestone=${milestone_id}`;

    // Create new checkout session
    const session = await createMilestoneCheckoutSession({
      milestoneId: milestone_id,
      milestoneName: milestone.milestone_name,
      amount: milestone.amount,
      proposalId: proposal.id,
      clientEmail: proposal.client_email,
      clientName: proposal.client_name,
      projectName: proposal.project_name,
      successUrl,
      cancelUrl,
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      );
    }

    // Update milestone with checkout session info
    await supabaseAdmin
      .from('milestones')
      .update({
        stripe_checkout_session_id: session.id,
        stripe_payment_url: session.url,
      })
      .eq('id', milestone_id);

    return NextResponse.json({
      checkout_url: session.url,
      session_id: session.id,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
