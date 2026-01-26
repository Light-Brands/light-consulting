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

// Types for strategic session checkout
export interface CreateSessionBookingParams {
  leadId: string;
  clientEmail: string;
  clientName: string;
  companyName?: string;
  successUrl: string;
  cancelUrl: string;
}

// Strategic Session configuration
export const STRATEGIC_SESSION_PRICE = 500; // $500
export const STRATEGIC_SESSION_DURATION = 90; // 90 minutes

// Create a checkout session for strategic session booking
export async function createSessionBookingCheckout(
  params: CreateSessionBookingParams
): Promise<Stripe.Checkout.Session | null> {
  if (!stripe) {
    console.error('Stripe is not configured');
    return null;
  }

  const {
    leadId,
    clientEmail,
    clientName,
    companyName,
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
              name: '90-Minute Strategic Session',
              description: 'Deep-dive AI strategy session with personalized recommendations for your business',
              metadata: {
                lead_id: leadId,
                session_type: 'strategic_session',
              },
            },
            unit_amount: STRATEGIC_SESSION_PRICE * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: clientEmail,
      metadata: {
        lead_id: leadId,
        session_type: 'strategic_session',
        client_name: clientName,
        company_name: companyName || '',
      },
      payment_intent_data: {
        metadata: {
          lead_id: leadId,
          session_type: 'strategic_session',
        },
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating strategic session checkout:', error);
    throw error;
  }
}

// Types for AI Go/No-Go Assessment checkout
export interface CreateAssessmentCheckoutParams {
  assessmentId: string;
  clientEmail: string;
  clientName: string;
  companyName?: string;
  successUrl: string;
  cancelUrl: string;
}

// AI Go/No-Go Assessment configuration
export const ASSESSMENT_PRICE = 5000; // $5,000

// Create a checkout session for AI Go/No-Go Assessment
export async function createAssessmentCheckout(
  params: CreateAssessmentCheckoutParams
): Promise<Stripe.Checkout.Session | null> {
  if (!stripe) {
    console.error('Stripe is not configured');
    return null;
  }

  const {
    assessmentId,
    clientEmail,
    clientName,
    companyName,
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
              name: 'AI Go/No-Go Assessment™',
              description: 'A clear yes/no decision on whether AI makes sense for your business right now.',
              metadata: {
                assessment_id: assessmentId,
                type: 'ai_go_no_go_assessment',
              },
            },
            unit_amount: ASSESSMENT_PRICE * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: clientEmail,
      metadata: {
        assessment_id: assessmentId,
        type: 'ai_go_no_go_assessment',
        client_name: clientName,
        company_name: companyName || '',
      },
      payment_intent_data: {
        metadata: {
          assessment_id: assessmentId,
          type: 'ai_go_no_go_assessment',
        },
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating assessment checkout:', error);
    throw error;
  }
}

// Check if a checkout session is still valid (not expired, completed, or cancelled)
export async function isCheckoutSessionValid(sessionId: string): Promise<boolean> {
  if (!stripe) {
    return false;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // Session is valid if status is 'open' (not completed or expired)
    return session.status === 'open';
  } catch (error) {
    // Session not found or other error - consider it invalid
    console.error('Error checking checkout session:', error);
    return false;
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
