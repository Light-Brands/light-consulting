/**
 * Stripe Invoice/Payment Session API Route
 * Light Brand Consulting
 *
 * POST /api/stripe/create-checkout-session - Create a Stripe Invoice for milestone payment
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import {
  createMilestoneInvoice,
  getInvoice,
  isStripeConfigured,
} from '@/lib/stripe';

interface CreateCheckoutRequest {
  milestone_id: string;
  access_token: string; // Proposal access token for authorization
}

/**
 * POST /api/stripe/create-checkout-session
 * Creates a Stripe Invoice for a milestone payment
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
        invoice_url: 'https://invoice.stripe.com/mock-invoice',
        invoice_id: 'mock_invoice_id',
      });
    }

    // Get proposal by access token
    const { data: proposal, error: proposalError } = await supabaseAdmin
      .from('proposals')
      .select('id, client_name, client_email, client_company, project_name, access_token')
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

    // Check if there's an existing invoice and if it's still valid
    if (milestone.stripe_invoice_id) {
      const existingInvoice = await getInvoice(milestone.stripe_invoice_id);

      // Invoice exists and is open/draft - return existing URL
      if (existingInvoice && (existingInvoice.status === 'open' || existingInvoice.status === 'draft')) {
        return NextResponse.json({
          invoice_url: milestone.stripe_invoice_url || existingInvoice.hosted_invoice_url,
          invoice_id: milestone.stripe_invoice_id,
          // Also return checkout_url for backwards compatibility
          checkout_url: milestone.stripe_invoice_url || existingInvoice.hosted_invoice_url,
          session_id: milestone.stripe_invoice_id,
        });
      }

      // Invoice paid - sync the database and return appropriate response
      if (existingInvoice?.status === 'paid') {
        // Sync milestone status from Stripe (webhook may have failed or been delayed)
        await supabaseAdmin
          .from('milestones')
          .update({
            payment_status: 'paid',
            paid_at: existingInvoice.status_transitions?.paid_at
              ? new Date(existingInvoice.status_transitions.paid_at * 1000).toISOString()
              : new Date().toISOString(),
            stripe_payment_intent_id: existingInvoice.payment_intent as string,
          })
          .eq('id', milestone_id)
          .neq('payment_status', 'paid');

        return NextResponse.json(
          { error: 'This milestone has already been paid', already_paid: true },
          { status: 400 }
        );
      }

      // Invoice is void, uncollectible, or doesn't exist in Stripe (stale data)
      // Clear the old data so we can create a fresh invoice
      console.log(`Invoice ${milestone.stripe_invoice_id} is ${existingInvoice?.status || 'not found'}, clearing stale data and creating new one`);

      await supabaseAdmin
        .from('milestones')
        .update({
          stripe_invoice_id: null,
          stripe_invoice_url: null,
          stripe_checkout_session_id: null,
          stripe_payment_url: null,
        })
        .eq('id', milestone_id);
    }

    // Create new invoice
    const invoiceResult = await createMilestoneInvoice({
      milestoneId: milestone_id,
      milestoneName: milestone.milestone_name,
      milestoneDescription: milestone.description,
      amount: milestone.amount,
      proposalId: proposal.id,
      clientEmail: proposal.client_email,
      clientName: proposal.client_name,
      clientCompany: proposal.client_company,
      projectName: proposal.project_name,
      dueDate: milestone.due_date ? new Date(milestone.due_date) : undefined,
    });

    if (!invoiceResult) {
      return NextResponse.json(
        { error: 'Failed to create invoice' },
        { status: 500 }
      );
    }

    // Update milestone with invoice info
    await supabaseAdmin
      .from('milestones')
      .update({
        stripe_invoice_id: invoiceResult.invoiceId,
        stripe_invoice_url: invoiceResult.invoiceUrl,
        invoice_number: invoiceResult.invoiceNumber,
      })
      .eq('id', milestone_id);

    return NextResponse.json({
      invoice_url: invoiceResult.invoiceUrl,
      invoice_id: invoiceResult.invoiceId,
      invoice_number: invoiceResult.invoiceNumber,
      // Also return these for backwards compatibility
      checkout_url: invoiceResult.invoiceUrl,
      session_id: invoiceResult.invoiceId,
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
