/**
 * Assessment Checkout API Route
 * Light Brand Consulting
 *
 * POST /api/assessment/checkout - Create a checkout session for AI Go/No-Go Assessment ($5,000)
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import {
  createAssessmentCheckout,
  isStripeConfigured,
  ASSESSMENT_PRICE,
} from '@/lib/stripe';

interface CreateAssessmentCheckoutRequest {
  assessment_id: string;
}

/**
 * POST /api/assessment/checkout
 * Creates a Stripe checkout session for the $5,000 AI Go/No-Go Assessment
 * Requires a valid assessment_id from the assessment submission
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

    const body: CreateAssessmentCheckoutRequest = await request.json();
    const { assessment_id } = body;

    if (!assessment_id) {
      return NextResponse.json(
        { error: 'Missing required field: assessment_id' },
        { status: 400 }
      );
    }

    // Get assessment details from database
    if (!isSupabaseConfigured()) {
      // Mock response for development
      return NextResponse.json({
        checkout_url: 'https://checkout.stripe.com/mock-session',
        session_id: 'mock_session_id',
        amount: ASSESSMENT_PRICE,
      });
    }

    // Get assessment by ID
    const { data: assessment, error: assessmentError } = await supabaseAdmin
      .from('assessment_submissions')
      .select('id, name, email, company, payment_completed, payment_session_id')
      .eq('id', assessment_id)
      .single() as { data: { id: string; name: string; email: string; company?: string; payment_completed: boolean; payment_session_id?: string } | null; error: unknown };

    if (assessmentError || !assessment) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    // Check if assessment is already paid
    if (assessment.payment_completed) {
      return NextResponse.json(
        { error: 'Assessment has already been paid', already_paid: true },
        { status: 400 }
      );
    }

    // Build success and cancel URLs
    const baseUrl = request.headers.get('origin') || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/assessment?stage=intake&id=${assessment_id}&payment=success`;
    const cancelUrl = `${baseUrl}/assessment?stage=commit&id=${assessment_id}&payment=cancelled`;

    // Create new checkout session
    const session = await createAssessmentCheckout({
      assessmentId: assessment_id,
      clientEmail: assessment.email,
      clientName: assessment.name,
      companyName: assessment.company,
      successUrl,
      cancelUrl,
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      );
    }

    // Update assessment with checkout session info
    await supabaseAdmin
      .from('assessment_submissions')
      .update({
        payment_session_id: session.id,
        payment_checkout_url: session.url,
        updated_at: new Date().toISOString(),
      } as never)
      .eq('id', assessment_id);

    return NextResponse.json({
      checkout_url: session.url,
      session_id: session.id,
      amount: ASSESSMENT_PRICE,
    });
  } catch (error) {
    console.error('Error creating assessment checkout:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
