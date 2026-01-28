/**
 * Clear Stale Stripe Data from Milestones
 *
 * This script clears old/invalid Stripe data from milestones that haven't been paid.
 * This is useful when switching Stripe accounts or configurations.
 *
 * Run with: npx tsx scripts/clear-stale-stripe-data.ts
 *
 * Options:
 *   --dry-run    Preview changes without making them
 *   --regenerate Also generate new invoices after clearing (runs generate-missing-invoices)
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

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Stripe only if we have a key (for validation)
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2025-01-27.acacia' })
  : null;

interface Milestone {
  id: string;
  milestone_name: string;
  amount: number;
  payment_status: string;
  stripe_invoice_id: string | null;
  stripe_invoice_url: string | null;
  stripe_checkout_session_id: string | null;
  stripe_payment_url: string | null;
  proposal: {
    project_name: string;
    client_name: string;
  };
}

async function validateInvoice(invoiceId: string): Promise<'valid' | 'paid' | 'invalid'> {
  if (!stripe) return 'invalid';

  try {
    const invoice = await stripe.invoices.retrieve(invoiceId);
    if (invoice.status === 'paid') return 'paid';
    if (invoice.status === 'open' || invoice.status === 'draft') return 'valid';
    return 'invalid'; // void, uncollectible, etc.
  } catch {
    return 'invalid'; // Not found or error
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const regenerate = args.includes('--regenerate');

  console.log('🔍 Scanning milestones for stale Stripe data...\n');
  if (dryRun) {
    console.log('📋 DRY RUN MODE - No changes will be made\n');
  }

  // Fetch all unpaid milestones that have any Stripe data
  const { data: milestones, error } = await supabase
    .from('milestones')
    .select(`
      id,
      milestone_name,
      amount,
      payment_status,
      stripe_invoice_id,
      stripe_invoice_url,
      stripe_checkout_session_id,
      stripe_payment_url,
      proposal:proposals!inner(
        project_name,
        client_name,
        status
      )
    `)
    .neq('payment_status', 'paid')
    .neq('payment_status', 'cancelled');

  if (error) {
    console.error('Error fetching milestones:', error);
    process.exit(1);
  }

  // Filter to milestones with any Stripe data
  const milestonesWithStripeData = (milestones as unknown as Milestone[]).filter(
    m => m.stripe_invoice_id || m.stripe_invoice_url ||
         m.stripe_checkout_session_id || m.stripe_payment_url
  );

  if (milestonesWithStripeData.length === 0) {
    console.log('✅ No milestones with stale Stripe data found.');
    return;
  }

  console.log(`Found ${milestonesWithStripeData.length} unpaid milestones with Stripe data:\n`);

  let cleared = 0;
  let skippedValid = 0;
  let skippedPaid = 0;

  for (const milestone of milestonesWithStripeData) {
    const proposal = milestone.proposal;
    console.log(`📄 ${milestone.milestone_name}`);
    console.log(`   Project: ${proposal.project_name}`);
    console.log(`   Client: ${proposal.client_name}`);
    console.log(`   Amount: $${milestone.amount.toLocaleString()}`);
    console.log(`   Status: ${milestone.payment_status}`);

    // Check if invoice is still valid in Stripe
    if (milestone.stripe_invoice_id && stripe) {
      const invoiceStatus = await validateInvoice(milestone.stripe_invoice_id);

      if (invoiceStatus === 'valid') {
        console.log(`   ⏭️  Skipping - Invoice ${milestone.stripe_invoice_id} is still valid`);
        skippedValid++;
        console.log('');
        continue;
      }

      if (invoiceStatus === 'paid') {
        console.log(`   ⚠️  Invoice shows as PAID in Stripe but milestone is ${milestone.payment_status}`);
        console.log(`   ⏭️  Skipping - Please verify this milestone manually`);
        skippedPaid++;
        console.log('');
        continue;
      }

      console.log(`   🔍 Invoice ${milestone.stripe_invoice_id} is invalid/not found in Stripe`);
    }

    // Log what we're clearing
    if (milestone.stripe_invoice_id) console.log(`   - Clearing stripe_invoice_id: ${milestone.stripe_invoice_id}`);
    if (milestone.stripe_invoice_url) console.log(`   - Clearing stripe_invoice_url`);
    if (milestone.stripe_checkout_session_id) console.log(`   - Clearing stripe_checkout_session_id: ${milestone.stripe_checkout_session_id}`);
    if (milestone.stripe_payment_url) console.log(`   - Clearing stripe_payment_url`);

    if (!dryRun) {
      const { error: updateError } = await supabase
        .from('milestones')
        .update({
          stripe_invoice_id: null,
          stripe_invoice_url: null,
          stripe_checkout_session_id: null,
          stripe_payment_url: null,
        })
        .eq('id', milestone.id);

      if (updateError) {
        console.log(`   ❌ Error clearing data: ${updateError.message}`);
      } else {
        console.log(`   ✅ Cleared`);
        cleared++;
      }
    } else {
      console.log(`   ✅ Would be cleared`);
      cleared++;
    }

    console.log('');
  }

  console.log('─'.repeat(50));
  console.log(`\n${dryRun ? 'Would clear' : 'Cleared'}: ${cleared} milestones`);
  if (skippedValid > 0) {
    console.log(`Skipped (valid invoices): ${skippedValid}`);
  }
  if (skippedPaid > 0) {
    console.log(`⚠️  Skipped (shows paid in Stripe): ${skippedPaid} - verify manually`);
  }

  if (regenerate && !dryRun && cleared > 0) {
    console.log('\n🔄 Running generate-missing-invoices to create new invoices...\n');
    const { execSync } = await import('child_process');
    execSync('npx tsx scripts/generate-missing-invoices.ts', { stdio: 'inherit' });
  } else if (regenerate && dryRun) {
    console.log('\n📋 Would run generate-missing-invoices.ts after clearing');
  }
}

main().catch(console.error);
