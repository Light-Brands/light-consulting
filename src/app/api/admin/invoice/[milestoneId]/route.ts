/**
 * Admin Invoice/Receipt API
 * Light Brand Consulting
 *
 * GET /api/admin/invoice/[milestoneId]
 * Redirects to Stripe's hosted receipt for paid milestones
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getServerSession } from '@/lib/supabase-server-auth';
import { stripe } from '@/lib/stripe';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ milestoneId: string }> }
) {
  try {
    const { milestoneId } = await params;

    // Verify admin session
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch milestone
    const { data: milestone, error: milestoneError } = await supabase
      .from('milestones')
      .select('id, payment_status, stripe_payment_intent_id')
      .eq('id', milestoneId)
      .single();

    if (milestoneError || !milestone) {
      return NextResponse.json(
        { error: 'Milestone not found' },
        { status: 404 }
      );
    }

    // Check if payment has been made
    if (milestone.payment_status !== 'paid' || !milestone.stripe_payment_intent_id) {
      return NextResponse.json(
        { error: 'Receipt not available - payment not yet completed' },
        { status: 400 }
      );
    }

    // Get receipt URL from Stripe
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 503 }
      );
    }

    // Retrieve the payment intent to get the charge
    const paymentIntent = await stripe.paymentIntents.retrieve(
      milestone.stripe_payment_intent_id,
      { expand: ['latest_charge'] }
    );

    const charge = paymentIntent.latest_charge as { receipt_url?: string | null } | null;

    if (!charge?.receipt_url) {
      return NextResponse.json(
        { error: 'Receipt not available' },
        { status: 404 }
      );
    }

    // Redirect to Stripe's hosted receipt
    return NextResponse.redirect(charge.receipt_url);
  } catch (error) {
    console.error('[Admin Invoice API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve receipt' },
      { status: 500 }
    );
  }
}
