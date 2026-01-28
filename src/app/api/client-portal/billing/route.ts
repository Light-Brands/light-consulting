/**
 * Client Billing API
 * Light Brand Consulting
 *
 * GET /api/client-portal/billing
 * Returns consolidated billing data for the client
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getCurrentClientSession } from '@/lib/client-auth';
import type { ClientBillingSummary, ClientPaymentItem } from '@/types/client-portal';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function GET() {
  try {
    // Get client session
    const session = await getCurrentClientSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const clientEmail = session.email.toLowerCase();

    // Fetch all proposals with milestones
    const { data: proposals, error } = await supabase
      .from('proposals')
      .select(`
        id,
        project_name,
        final_amount,
        access_token,
        milestones(*)
      `)
      .eq('client_email', clientEmail)
      .in('status', ['agreement_signed', 'active', 'completed'])
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Billing API] Failed to fetch data:', error);
      return NextResponse.json(
        { error: 'Failed to fetch billing data' },
        { status: 500 }
      );
    }

    // Process milestones
    let totalValue = 0;
    let totalPaid = 0;
    const paymentsDue: ClientPaymentItem[] = [];
    const paymentHistory: ClientPaymentItem[] = [];
    const upcomingPayments: ClientPaymentItem[] = [];

    const now = new Date();

    (proposals || []).forEach(proposal => {
      totalValue += proposal.final_amount || 0;

      (proposal.milestones || []).forEach((milestone: any) => {
        const dueDate = milestone.due_date ? new Date(milestone.due_date) : null;
        const isPast = dueDate && dueDate < now;

        const paymentItem: ClientPaymentItem = {
          id: milestone.id,
          proposal_id: proposal.id,
          proposal_name: proposal.project_name,
          milestone_name: milestone.milestone_name,
          amount: milestone.amount,
          due_date: milestone.due_date,
          paid_at: milestone.paid_at,
          status: milestone.payment_status === 'paid'
            ? 'paid'
            : isPast
            ? 'overdue'
            : dueDate
            ? 'due'
            : 'pending',
          stripe_payment_url: milestone.stripe_payment_url,
          stripe_invoice_url: milestone.stripe_invoice_url,
          access_token: proposal.access_token,
        };

        if (milestone.payment_status === 'paid') {
          totalPaid += milestone.amount || 0;
          paymentHistory.push(paymentItem);
        } else if (isPast || (dueDate && dueDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000))) {
          // Due or within 7 days
          paymentsDue.push(paymentItem);
        } else {
          upcomingPayments.push(paymentItem);
        }
      });
    });

    // Sort payment history by paid_at descending
    paymentHistory.sort((a, b) => {
      if (!a.paid_at || !b.paid_at) return 0;
      return new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime();
    });

    // Sort payments due by due_date ascending
    paymentsDue.sort((a, b) => {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });

    // Sort upcoming by due_date ascending
    upcomingPayments.sort((a, b) => {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });

    const data: ClientBillingSummary = {
      total_value: totalValue,
      total_paid: totalPaid,
      total_remaining: totalValue - totalPaid,
      payments_due: paymentsDue,
      payment_history: paymentHistory,
      upcoming_payments: upcomingPayments,
    };

    return NextResponse.json({ data });
  } catch (error) {
    console.error('[Billing API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
