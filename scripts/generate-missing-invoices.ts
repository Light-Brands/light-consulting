/**
 * Generate Stripe Invoices for Existing Milestones
 *
 * This script creates Stripe invoices for all milestones that don't have one yet.
 * Run with: npx tsx scripts/generate-missing-invoices.ts
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SEC_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!stripeSecretKey || !supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- STRIPE_SECRET_KEY:', stripeSecretKey ? '✓' : '✗');
  console.error('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-01-27.acacia',
});

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Milestone {
  id: string;
  milestone_name: string;
  description: string | null;
  amount: number;
  due_date: string | null;
  payment_status: string;
  stripe_invoice_url: string | null;
  proposal: {
    id: string;
    project_name: string;
    client_name: string;
    client_email: string;
    client_company: string | null;
  };
}

async function findOrCreateCustomer(
  email: string,
  name: string,
  company?: string | null
): Promise<Stripe.Customer> {
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
  });
}

async function createInvoiceForMilestone(milestone: Milestone): Promise<{
  invoiceId: string;
  invoiceUrl: string;
  invoiceNumber: string;
} | null> {
  try {
    const proposal = milestone.proposal;

    // Find or create customer
    const customer = await findOrCreateCustomer(
      proposal.client_email,
      proposal.client_name,
      proposal.client_company
    );

    // Create invoice item
    await stripe.invoiceItems.create({
      customer: customer.id,
      amount: Math.round(milestone.amount * 100), // Convert to cents
      currency: 'usd',
      description: `${milestone.milestone_name} - ${proposal.project_name}${milestone.description ? `\n${milestone.description}` : ''}`,
      metadata: {
        milestone_id: milestone.id,
        proposal_id: proposal.id,
        project_name: proposal.project_name,
      },
    });

    // Calculate days until due
    let daysUntilDue = 30;
    if (milestone.due_date) {
      const dueDate = new Date(milestone.due_date);
      const now = new Date();
      daysUntilDue = Math.max(1, Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    }

    // Create the invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: daysUntilDue,
      metadata: {
        milestone_id: milestone.id,
        proposal_id: proposal.id,
        project_name: proposal.project_name,
      },
      custom_fields: [
        {
          name: 'Project',
          value: proposal.project_name.substring(0, 30),
        },
      ],
    });

    // Finalize the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    if (!finalizedInvoice.hosted_invoice_url) {
      throw new Error('Invoice created but no hosted URL available');
    }

    return {
      invoiceId: finalizedInvoice.id,
      invoiceUrl: finalizedInvoice.hosted_invoice_url,
      invoiceNumber: finalizedInvoice.number || finalizedInvoice.id,
    };
  } catch (error) {
    console.error(`  Error creating invoice for milestone ${milestone.id}:`, error);
    return null;
  }
}

async function main() {
  console.log('🔍 Fetching milestones without invoices...\n');

  // Fetch all milestones that don't have an invoice URL and aren't paid
  const { data: milestones, error } = await supabase
    .from('milestones')
    .select(`
      id,
      milestone_name,
      description,
      amount,
      due_date,
      payment_status,
      stripe_invoice_url,
      proposal:proposals!inner(
        id,
        project_name,
        client_name,
        client_email,
        client_company,
        status
      )
    `)
    .is('stripe_invoice_url', null)
    .neq('payment_status', 'paid')
    .neq('payment_status', 'cancelled');

  if (error) {
    console.error('Error fetching milestones:', error);
    process.exit(1);
  }

  // Filter to only include milestones from active proposals
  const activeMilestones = (milestones as unknown as Milestone[]).filter(m => {
    const proposal = m.proposal as unknown as { status: string };
    return ['agreement_signed', 'active'].includes(proposal.status);
  });

  if (activeMilestones.length === 0) {
    console.log('✅ All milestones already have invoices or are paid/cancelled.');
    return;
  }

  console.log(`Found ${activeMilestones.length} milestones needing invoices:\n`);

  let created = 0;
  let failed = 0;

  for (const milestone of activeMilestones) {
    const proposal = milestone.proposal;
    console.log(`📄 ${milestone.milestone_name}`);
    console.log(`   Project: ${proposal.project_name}`);
    console.log(`   Client: ${proposal.client_name} (${proposal.client_email})`);
    console.log(`   Amount: $${milestone.amount.toLocaleString()}`);

    const result = await createInvoiceForMilestone(milestone);

    if (result) {
      // Update the milestone in the database
      const { error: updateError } = await supabase
        .from('milestones')
        .update({
          stripe_invoice_id: result.invoiceId,
          stripe_invoice_url: result.invoiceUrl,
          invoice_number: result.invoiceNumber,
        })
        .eq('id', milestone.id);

      if (updateError) {
        console.log(`   ❌ Failed to update database: ${updateError.message}`);
        failed++;
      } else {
        console.log(`   ✅ Invoice created: ${result.invoiceNumber}`);
        console.log(`   🔗 ${result.invoiceUrl}`);
        created++;
      }
    } else {
      failed++;
    }

    console.log('');
  }

  console.log('─'.repeat(50));
  console.log(`\n✅ Created: ${created} invoices`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed} invoices`);
  }
}

main().catch(console.error);
