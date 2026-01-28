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

// Types for invoice creation
export interface CreateMilestoneInvoiceParams {
  milestoneId: string;
  milestoneName: string;
  milestoneDescription?: string;
  amount: number; // in dollars
  proposalId: string;
  clientEmail: string;
  clientName: string;
  clientCompany?: string;
  projectName: string;
  dueDate?: Date;
}

export interface MilestoneInvoiceResult {
  invoiceId: string;
  invoiceUrl: string;
  invoiceNumber: string;
  status: string;
}

// Find or create a Stripe customer by email
async function findOrCreateCustomer(
  email: string,
  name: string,
  company?: string,
  metadata?: Record<string, string>
): Promise<Stripe.Customer> {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  // Search for existing customer
  const existingCustomers = await stripe.customers.list({
    email: email.toLowerCase(),
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0];
  }

  // Create new customer
  return await stripe.customers.create({
    email: email.toLowerCase(),
    name: company ? `${name} (${company})` : name,
    metadata: metadata || {},
  });
}

// Create a Stripe Invoice for a milestone payment
export async function createMilestoneInvoice(
  params: CreateMilestoneInvoiceParams
): Promise<MilestoneInvoiceResult | null> {
  if (!stripe) {
    console.error('Stripe is not configured');
    return null;
  }

  const {
    milestoneId,
    milestoneName,
    milestoneDescription,
    amount,
    proposalId,
    clientEmail,
    clientName,
    clientCompany,
    projectName,
    dueDate,
  } = params;

  try {
    // Find or create customer
    const customer = await findOrCreateCustomer(
      clientEmail,
      clientName,
      clientCompany,
      {
        proposal_id: proposalId,
      }
    );

    // Create invoice item
    await stripe.invoiceItems.create({
      customer: customer.id,
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      description: `${milestoneName} - ${projectName}${milestoneDescription ? `\n${milestoneDescription}` : ''}`,
      metadata: {
        milestone_id: milestoneId,
        proposal_id: proposalId,
        project_name: projectName,
      },
    });

    // Calculate due date (default to 30 days if not specified)
    const invoiceDueDate = dueDate
      ? Math.floor(dueDate.getTime() / 1000)
      : Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

    // Create and finalize the invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: dueDate
        ? Math.max(1, Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : 30,
      metadata: {
        milestone_id: milestoneId,
        proposal_id: proposalId,
        project_name: projectName,
      },
      custom_fields: [
        {
          name: 'Project',
          value: projectName.substring(0, 30), // Stripe limits to 30 chars
        },
      ],
    });

    // Finalize the invoice to make it payable
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    if (!finalizedInvoice.hosted_invoice_url) {
      throw new Error('Invoice created but no hosted URL available');
    }

    return {
      invoiceId: finalizedInvoice.id,
      invoiceUrl: finalizedInvoice.hosted_invoice_url,
      invoiceNumber: finalizedInvoice.number || finalizedInvoice.id,
      status: finalizedInvoice.status || 'open',
    };
  } catch (error) {
    console.error('Error creating Stripe invoice:', error);
    throw error;
  }
}

// Get an existing invoice's details
export async function getInvoice(invoiceId: string): Promise<Stripe.Invoice | null> {
  if (!stripe) {
    return null;
  }

  try {
    return await stripe.invoices.retrieve(invoiceId);
  } catch (error) {
    console.error('Error retrieving invoice:', error);
    return null;
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
