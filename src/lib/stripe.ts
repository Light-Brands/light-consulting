/**
 * Stripe Client Configuration
 * Light Brand Consulting
 */

import Stripe from 'stripe';

// Stripe configuration
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Public key for client-side
export const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

// Helper to check if Stripe is configured
export const isStripeConfigured = () => {
  return Boolean(stripeSecretKey);
};

// Helper to check if webhook is configured
export const isStripeWebhookConfigured = () => {
  return Boolean(stripeWebhookSecret);
};

// Get webhook secret
export const getStripeWebhookSecret = () => stripeWebhookSecret;

// Create Stripe client (server-side only)
export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-01-27.acacia',
      typescript: true,
    })
  : null;

// Types for checkout session creation
export interface CreateCheckoutSessionParams {
  milestoneId: string;
  milestoneName: string;
  amount: number; // in dollars
  proposalId: string;
  clientEmail: string;
  clientName: string;
  projectName: string;
  successUrl: string;
  cancelUrl: string;
}

// Create a checkout session for a milestone payment
export async function createMilestoneCheckoutSession(
  params: CreateCheckoutSessionParams
): Promise<Stripe.Checkout.Session | null> {
  if (!stripe) {
    console.error('Stripe is not configured');
    return null;
  }

  const {
    milestoneId,
    milestoneName,
    amount,
    proposalId,
    clientEmail,
    clientName,
    projectName,
    successUrl,
    cancelUrl,
  } = params;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: milestoneName,
              description: `Payment for ${projectName}`,
              metadata: {
                milestone_id: milestoneId,
                proposal_id: proposalId,
              },
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: clientEmail,
      metadata: {
        milestone_id: milestoneId,
        proposal_id: proposalId,
        client_name: clientName,
        project_name: projectName,
      },
      payment_intent_data: {
        metadata: {
          milestone_id: milestoneId,
          proposal_id: proposalId,
        },
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    throw error;
  }
}

// Verify and construct webhook event
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event | null {
  if (!stripe || !stripeWebhookSecret) {
    console.error('Stripe webhook is not configured');
    return null;
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, stripeWebhookSecret);
  } catch (error) {
    console.error('Error constructing webhook event:', error);
    return null;
  }
}
