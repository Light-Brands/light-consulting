/**
 * Fix Incorrectly Marked Paid Proposals
 *
 * This script resets milestones that were incorrectly marked as "paid"
 * for proposals created before the invoice system was implemented.
 *
 * Run with: npx tsx scripts/fix-unpaid-proposals.ts
 *
 * Options:
 *   --dry-run       Preview changes without making them
 *   --list          Just list all proposals with paid milestones (for verification)
 *   --regenerate    Also generate new invoices after fixing
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';
import * as readline from 'readline';

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

interface ProposalWithMilestones {
  id: string;
  project_name: string;
  client_name: string;
  client_email: string;
  status: string;
  created_at: string;
  milestones: {
    id: string;
    milestone_name: string;
    amount: number;
    payment_status: string;
    paid_at: string | null;
    stripe_invoice_id: string | null;
    stripe_invoice_url: string | null;
    stripe_checkout_session_id: string | null;
    stripe_payment_url: string | null;
    stripe_payment_intent_id: string | null;
  }[];
}

async function verifyNotPaidInStripe(invoiceId: string): Promise<boolean> {
  if (!stripe) return true; // If no stripe, assume not paid

  try {
    const invoice = await stripe.invoices.retrieve(invoiceId);
    return invoice.status !== 'paid';
  } catch {
    return true; // Not found = not paid
  }
}

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const listOnly = args.includes('--list');
  const regenerate = args.includes('--regenerate');

  console.log('🔍 Finding proposals with "paid" milestones...\n');

  // Fetch all proposals that have at least one milestone marked as paid
  const { data: proposals, error } = await supabase
    .from('proposals')
    .select(`
      id,
      project_name,
      client_name,
      client_email,
      status,
      created_at,
      milestones (
        id,
        milestone_name,
        amount,
        payment_status,
        paid_at,
        stripe_invoice_id,
        stripe_invoice_url,
        stripe_checkout_session_id,
        stripe_payment_url,
        stripe_payment_intent_id
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching proposals:', error);
    process.exit(1);
  }

  // Filter to proposals that have paid milestones
  const proposalsWithPaidMilestones = (proposals as ProposalWithMilestones[]).filter(
    p => p.milestones.some(m => m.payment_status === 'paid')
  );

  if (proposalsWithPaidMilestones.length === 0) {
    console.log('✅ No proposals found with paid milestones.');
    return;
  }

  console.log(`Found ${proposalsWithPaidMilestones.length} proposals with paid milestones:\n`);
  console.log('─'.repeat(70));

  for (let i = 0; i < proposalsWithPaidMilestones.length; i++) {
    const proposal = proposalsWithPaidMilestones[i];
    const paidMilestones = proposal.milestones.filter(m => m.payment_status === 'paid');
    const totalPaid = paidMilestones.reduce((sum, m) => sum + m.amount, 0);

    console.log(`\n[${i + 1}] ${proposal.project_name}`);
    console.log(`    Client: ${proposal.client_name} (${proposal.client_email})`);
    console.log(`    Status: ${proposal.status}`);
    console.log(`    Created: ${new Date(proposal.created_at).toLocaleDateString()}`);
    console.log(`    Paid milestones: ${paidMilestones.length} (Total: $${totalPaid.toLocaleString()})`);

    for (const milestone of paidMilestones) {
      const hasStripeInvoice = milestone.stripe_invoice_id ? '📄' : '❌';
      const hasPaymentIntent = milestone.stripe_payment_intent_id ? '✓' : '✗';
      console.log(`    └─ ${hasStripeInvoice} ${milestone.milestone_name}: $${milestone.amount.toLocaleString()}`);
      console.log(`       Payment Intent: ${hasPaymentIntent} ${milestone.stripe_payment_intent_id || 'none'}`);
      if (milestone.paid_at) {
        console.log(`       Paid at: ${new Date(milestone.paid_at).toLocaleDateString()}`);
      }
    }
  }

  console.log('\n' + '─'.repeat(70));

  if (listOnly) {
    console.log('\n📋 List mode - no changes made.');
    console.log('To fix specific proposals, run without --list and follow the prompts.');
    return;
  }

  // Ask user which proposals to fix
  console.log('\nWhich proposals should be reset to UNPAID?');
  console.log('Enter numbers separated by commas (e.g., "1,2,3") or "all" or "none":');

  const answer = await prompt('> ');

  if (answer === 'none' || answer === '') {
    console.log('No changes made.');
    return;
  }

  let selectedIndices: number[];
  if (answer === 'all') {
    selectedIndices = proposalsWithPaidMilestones.map((_, i) => i);
  } else {
    selectedIndices = answer
      .split(',')
      .map(s => parseInt(s.trim()) - 1)
      .filter(i => i >= 0 && i < proposalsWithPaidMilestones.length);
  }

  if (selectedIndices.length === 0) {
    console.log('No valid selections. Exiting.');
    return;
  }

  const selectedProposals = selectedIndices.map(i => proposalsWithPaidMilestones[i]);

  console.log(`\nSelected ${selectedProposals.length} proposals to fix:`);
  for (const p of selectedProposals) {
    console.log(`  - ${p.project_name} (${p.client_name})`);
  }

  if (dryRun) {
    console.log('\n📋 DRY RUN MODE - No changes will be made\n');
  } else {
    const confirm = await prompt('\nProceed with resetting these to unpaid? (yes/no): ');
    if (confirm !== 'yes' && confirm !== 'y') {
      console.log('Cancelled.');
      return;
    }
  }

  // Process each selected proposal
  let totalFixed = 0;
  let totalSkipped = 0;

  for (const proposal of selectedProposals) {
    console.log(`\n📄 Processing: ${proposal.project_name}`);

    const paidMilestones = proposal.milestones.filter(m => m.payment_status === 'paid');

    for (const milestone of paidMilestones) {
      console.log(`   └─ ${milestone.milestone_name}`);

      // Verify it's not actually paid in Stripe
      if (milestone.stripe_invoice_id && stripe) {
        const notPaid = await verifyNotPaidInStripe(milestone.stripe_invoice_id);
        if (!notPaid) {
          console.log(`      ⚠️  ACTUALLY PAID in Stripe - skipping`);
          totalSkipped++;
          continue;
        }
      }

      if (!dryRun) {
        const { error: updateError } = await supabase
          .from('milestones')
          .update({
            payment_status: 'pending',
            paid_at: null,
            stripe_invoice_id: null,
            stripe_invoice_url: null,
            stripe_checkout_session_id: null,
            stripe_payment_url: null,
            stripe_payment_intent_id: null,
          })
          .eq('id', milestone.id);

        if (updateError) {
          console.log(`      ❌ Error: ${updateError.message}`);
        } else {
          console.log(`      ✅ Reset to pending`);
          totalFixed++;
        }
      } else {
        console.log(`      ✅ Would reset to pending`);
        totalFixed++;
      }
    }
  }

  console.log('\n' + '─'.repeat(70));
  console.log(`\n${dryRun ? 'Would fix' : 'Fixed'}: ${totalFixed} milestones`);
  if (totalSkipped > 0) {
    console.log(`⚠️  Skipped (actually paid in Stripe): ${totalSkipped}`);
  }

  if (regenerate && !dryRun && totalFixed > 0) {
    console.log('\n🔄 Running generate-missing-invoices to create new invoices...\n');
    const { execSync } = await import('child_process');
    execSync('npx tsx scripts/generate-missing-invoices.ts', { stdio: 'inherit' });
  } else if (regenerate && dryRun) {
    console.log('\n📋 Would run generate-missing-invoices.ts after fixing');
  }
}

main().catch(console.error);
