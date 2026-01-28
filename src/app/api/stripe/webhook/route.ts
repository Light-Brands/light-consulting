/**
 * Stripe Webhook Handler
 * Light Brand Consulting
 *
 * POST /api/stripe/webhook - Handle Stripe webhook events
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import {
  constructWebhookEvent,
  isStripeConfigured,
  isStripeWebhookConfigured,
  stripe,
} from '@/lib/stripe';
import type Stripe from 'stripe';

// Disable body parsing for webhook signature verification
export const runtime = 'nodejs';

/**
 * POST /api/stripe/webhook
 * Handles incoming webhook events from Stripe
 */
export async function POST(request: NextRequest) {
  try {
    // Check configuration
    if (!isStripeConfigured() || !isStripeWebhookConfigured()) {
      console.error('Stripe webhook not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 503 }
      );
    }

    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Verify and construct the event
    const event = constructWebhookEvent(body, signature);

    if (!event) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'checkout.session.expired':
        await handleCheckoutSessionExpired(event.data.object as Stripe.Checkout.Session);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful invoice payment
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log('Processing invoice.paid:', invoice.id);

  const milestoneId = invoice.metadata?.milestone_id;
  const proposalId = invoice.metadata?.proposal_id;

  if (!milestoneId) {
    console.log('No milestone_id in invoice metadata - may be a different type of invoice');
    return;
  }

  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, skipping database update');
    return;
  }

  // Update milestone payment status
  const { error } = await supabaseAdmin
    .from('milestones')
    .update({
      payment_status: 'paid',
      paid_at: new Date().toISOString(),
      stripe_payment_intent_id: invoice.payment_intent as string,
    })
    .eq('id', milestoneId);

  if (error) {
    console.error('Error updating milestone payment status:', error);
    return;
  }

  console.log(`Milestone ${milestoneId} marked as paid via invoice ${invoice.id}`);

  // Check if all milestones are paid and update proposal status if needed
  if (proposalId) {
    await checkAndUpdateProposalStatus(proposalId);
  }

  // Create a dashboard update for the payment
  const amountPaid = invoice.amount_paid ? invoice.amount_paid / 100 : 0;
  await supabaseAdmin.from('dashboard_updates').insert({
    proposal_id: proposalId,
    milestone_id: milestoneId,
    update_type: 'milestone_update',
    title: 'Payment Received',
    content: `Payment of ${formatCurrency(amountPaid)} has been received. Thank you!`,
  });
}

/**
 * Handle failed invoice payment
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Processing invoice.payment_failed:', invoice.id);

  const milestoneId = invoice.metadata?.milestone_id;

  if (!milestoneId) {
    return;
  }

  // Log the failed payment attempt
  console.log(`Invoice payment failed for milestone ${milestoneId}`);

  // Optionally update milestone status to overdue if past due date
  if (isSupabaseConfigured()) {
    const { data: milestone } = await supabaseAdmin
      .from('milestones')
      .select('due_date')
      .eq('id', milestoneId)
      .single();

    if (milestone?.due_date && new Date(milestone.due_date) < new Date()) {
      await supabaseAdmin
        .from('milestones')
        .update({ payment_status: 'overdue' })
        .eq('id', milestoneId)
        .neq('payment_status', 'paid');
    }
  }
}

/**
 * Handle strategic session booking payment
 */
async function handleStrategicSessionPayment(session: Stripe.Checkout.Session) {
  console.log('Processing strategic session payment:', session.id);

  const leadId = session.metadata?.lead_id;

  if (!leadId) {
    console.error('No lead_id in session metadata for strategic session');
    return;
  }

  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, skipping database update');
    return;
  }

  // Update lead with payment information
  const { error } = await supabaseAdmin
    .from('lead_submissions')
    .update({
      session_paid: true,
      session_paid_at: new Date().toISOString(),
      session_payment_id: session.payment_intent as string,
      status: 'session_booked',
    })
    .eq('id', leadId);

  if (error) {
    console.error('Error updating lead session payment status:', error);
    return;
  }

  console.log(`Strategic session paid for lead ${leadId}`);
}

/**
 * Handle AI Go/No-Go Assessment payment
 */
async function handleAssessmentPayment(session: Stripe.Checkout.Session) {
  console.log('Processing assessment payment:', session.id);

  const assessmentId = session.metadata?.assessment_id;

  if (!assessmentId) {
    console.error('No assessment_id in session metadata for assessment');
    return;
  }

  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, skipping database update');
    return;
  }

  // Update assessment with payment information
  const { error } = await supabaseAdmin
    .from('assessment_submissions')
    .update({
      payment_completed: true,
      payment_completed_at: new Date().toISOString(),
      payment_intent_id: session.payment_intent as string,
      stage: 'intake', // Move to intake stage after payment
      updated_at: new Date().toISOString(),
    } as never)
    .eq('id', assessmentId);

  if (error) {
    console.error('Error updating assessment payment status:', error);
    return;
  }

  console.log(`Assessment ${assessmentId} payment completed - moving to intake stage`);
}

/**
 * Handle successful checkout session completion
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Processing checkout.session.completed:', session.id);

  // Check if this is a strategic session booking
  const sessionType = session.metadata?.session_type;
  if (sessionType === 'strategic_session') {
    await handleStrategicSessionPayment(session);
    return;
  }

  // Check if this is an AI Go/No-Go Assessment payment
  const paymentType = session.metadata?.type;
  if (paymentType === 'ai_go_no_go_assessment') {
    await handleAssessmentPayment(session);
    return;
  }

  // Otherwise, handle as milestone payment
  const milestoneId = session.metadata?.milestone_id;
  const proposalId = session.metadata?.proposal_id;

  if (!milestoneId) {
    console.error('No milestone_id in session metadata');
    return;
  }

  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured, skipping database update');
    return;
  }

  // Update milestone payment status
  const { error } = await supabaseAdmin
    .from('milestones')
    .update({
      payment_status: 'paid',
      paid_at: new Date().toISOString(),
      stripe_payment_intent_id: session.payment_intent as string,
    })
    .eq('id', milestoneId);

  if (error) {
    console.error('Error updating milestone payment status:', error);
    return;
  }

  console.log(`Milestone ${milestoneId} marked as paid`);

  // Check if all milestones are paid and update proposal status if needed
  if (proposalId) {
    await checkAndUpdateProposalStatus(proposalId);
  }

  // Create a dashboard update for the payment
  await supabaseAdmin.from('dashboard_updates').insert({
    proposal_id: proposalId,
    milestone_id: milestoneId,
    update_type: 'milestone_update',
    title: 'Payment Received',
    content: `Payment of ${formatCurrency(session.amount_total ? session.amount_total / 100 : 0)} has been received. Thank you!`,
  });
}

/**
 * Handle expired checkout session
 */
async function handleCheckoutSessionExpired(session: Stripe.Checkout.Session) {
  console.log('Processing checkout.session.expired:', session.id);

  if (!isSupabaseConfigured()) {
    return;
  }

  // Check if this is an assessment checkout
  const paymentType = session.metadata?.type;
  if (paymentType === 'ai_go_no_go_assessment') {
    const assessmentId = session.metadata?.assessment_id;
    if (assessmentId) {
      // Clear the expired checkout session info to allow a new one to be created
      await supabaseAdmin
        .from('assessment_submissions')
        .update({
          payment_session_id: null,
          payment_checkout_url: null,
          updated_at: new Date().toISOString(),
        } as never)
        .eq('id', assessmentId)
        .eq('payment_session_id', session.id); // Only clear if it matches
    }
    return;
  }

  // Handle milestone checkout expiration
  const milestoneId = session.metadata?.milestone_id;
  if (!milestoneId) {
    return;
  }

  // Clear the expired checkout session info to allow a new one to be created
  await supabaseAdmin
    .from('milestones')
    .update({
      stripe_checkout_session_id: null,
      stripe_payment_url: null,
    })
    .eq('id', milestoneId)
    .eq('stripe_checkout_session_id', session.id); // Only clear if it matches
}

/**
 * Handle successful payment intent
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Processing payment_intent.succeeded:', paymentIntent.id);

  const milestoneId = paymentIntent.metadata?.milestone_id;

  if (!milestoneId || !isSupabaseConfigured()) {
    return;
  }

  // Update milestone with payment intent (backup in case checkout.session.completed didn't fire)
  await supabaseAdmin
    .from('milestones')
    .update({
      payment_status: 'paid',
      paid_at: new Date().toISOString(),
      stripe_payment_intent_id: paymentIntent.id,
    })
    .eq('id', milestoneId)
    .neq('payment_status', 'paid'); // Only update if not already paid
}

/**
 * Handle failed payment intent
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('Processing payment_intent.payment_failed:', paymentIntent.id);

  const milestoneId = paymentIntent.metadata?.milestone_id;

  if (!milestoneId || !isSupabaseConfigured()) {
    return;
  }

  // Log the failed payment attempt (optional: could add to dashboard_updates)
  console.log(`Payment failed for milestone ${milestoneId}`);
}

/**
 * Check if all milestones are paid and update proposal status
 */
async function checkAndUpdateProposalStatus(proposalId: string) {
  const { data: milestones } = await supabaseAdmin
    .from('milestones')
    .select('payment_status')
    .eq('proposal_id', proposalId);

  if (!milestones) return;

  const allPaid = milestones.every((m) => m.payment_status === 'paid');

  if (allPaid) {
    // Update proposal status to completed
    await supabaseAdmin
      .from('proposals')
      .update({ status: 'completed' })
      .eq('id', proposalId)
      .eq('status', 'active'); // Only update if currently active
  } else {
    // Ensure proposal is marked as active if any payment received
    const anyPaid = milestones.some((m) => m.payment_status === 'paid');
    if (anyPaid) {
      await supabaseAdmin
        .from('proposals')
        .update({ status: 'active' })
        .eq('id', proposalId)
        .in('status', ['agreement_signed', 'viewed', 'sent']);
    }
  }
}

/**
 * Format currency for display
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
