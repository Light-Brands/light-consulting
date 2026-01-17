/**
 * Assessment Checkout API Route
 * POST /api/assessment/checkout
 *
 * Creates a Stripe checkout session for the $5,000 AI Go/No-Go Assessment
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { ASSESSMENT_CONFIG } from '@/lib/constants';
import type { AssessmentSubmissionUpdate } from '@/types/database';

interface CheckoutRequest {
  assessmentId?: string;
  email: string;
  name: string;
  company?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!isStripeConfigured() || !stripe) {
      // Return mock response for development
      return NextResponse.json({
        checkout_url: '/assessment?stage=intake&payment=success&session_id=mock-session-' + Date.now(),
        session_id: 'mock-session-' + Date.now(),
        amount: ASSESSMENT_CONFIG.price,
        development_mode: true,
      });
    }

    const body: CheckoutRequest = await request.json();
    const { assessmentId, email, name, company } = body;

    // Validate required fields
    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Build success and cancel URLs
    const baseUrl = request.headers.get('origin') || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/assessment?stage=intake&payment=success&session_id={CHECKOUT_SESSION_ID}${assessmentId ? `&id=${assessmentId}` : ''}`;
    const cancelUrl = `${baseUrl}/assessment?stage=commit&payment=cancelled${assessmentId ? `&id=${assessmentId}` : ''}`;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: ASSESSMENT_CONFIG.name,
              description: ASSESSMENT_CONFIG.tagline,
              metadata: {
                assessment_id: assessmentId || '',
                type: 'ai_go_no_go_assessment',
              },
            },
            unit_amount: ASSESSMENT_CONFIG.price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: email,
      metadata: {
        assessment_id: assessmentId || '',
        type: 'ai_go_no_go_assessment',
        client_name: name,
        company_name: company || '',
      },
      payment_intent_data: {
        metadata: {
          assessment_id: assessmentId || '',
          type: 'ai_go_no_go_assessment',
        },
      },
    });

    // Update assessment with checkout session info if Supabase is configured
    if (isSupabaseConfigured() && assessmentId) {
      const updateData: AssessmentSubmissionUpdate = {
        payment_session_id: session.id,
        stage: 'commit',
        updated_at: new Date().toISOString(),
      };

      await supabaseAdmin
        .from('assessment_submissions')
        .update(updateData as never)
        .eq('id', assessmentId);
    }

    return NextResponse.json({
      checkout_url: session.url,
      session_id: session.id,
      amount: ASSESSMENT_CONFIG.price,
    });
  } catch (error) {
    console.error('Error creating assessment checkout:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
