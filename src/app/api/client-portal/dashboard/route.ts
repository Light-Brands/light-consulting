/**
 * Client Command Center Dashboard API
 * Light Brand Consulting
 *
 * GET /api/client-portal/dashboard
 * Returns aggregated data for the client command center
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getCurrentClientSession } from '@/lib/client-auth';
import type {
  ClientCommandCenterData,
  ClientCommandCenterStats,
  ClientActionItem,
  ClientProposalSummary,
  ClientActivity,
} from '@/types/client-portal';

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

    // Fetch all proposals for this client
    const { data: proposals, error: proposalsError } = await supabase
      .from('proposals')
      .select(`
        *,
        phases:proposal_phases(*),
        milestones(*),
        agreement:agreements(*),
        onboarding_form:onboarding_forms(*),
        dashboard_updates(*)
      `)
      .eq('client_email', clientEmail)
      .in('status', ['sent', 'viewed', 'agreement_signed', 'active', 'completed'])
      .order('created_at', { ascending: false });

    if (proposalsError) {
      console.error('[Dashboard API] Failed to fetch proposals:', proposalsError);
      return NextResponse.json(
        { error: 'Failed to fetch data' },
        { status: 500 }
      );
    }

    // Calculate stats
    const stats: ClientCommandCenterStats = calculateStats(proposals || []);

    // Generate action items
    const actionItems: ClientActionItem[] = generateActionItems(proposals || []);

    // Map to proposal summaries
    const proposalSummaries: ClientProposalSummary[] = (proposals || []).map(mapToProposalSummary);

    // Aggregate recent activity
    const recentActivity: ClientActivity[] = aggregateRecentActivity(proposals || []);

    const data: ClientCommandCenterData = {
      stats,
      action_items: actionItems,
      proposals: proposalSummaries,
      recent_activity: recentActivity.slice(0, 10),
    };

    return NextResponse.json({ data });
  } catch (error) {
    console.error('[Dashboard API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateStats(proposals: any[]): ClientCommandCenterStats {
  let totalValue = 0;
  let totalPaid = 0;
  let pendingSignatures = 0;
  let paymentsDueCount = 0;
  let paymentsDueAmount = 0;
  let itemsInProgress = 0;

  const activeProposals = proposals.filter(p => p.status === 'active');
  const completedProposals = proposals.filter(p => p.status === 'completed');

  proposals.forEach(proposal => {
    totalValue += proposal.final_amount || 0;

    // Count pending signatures
    if (proposal.status === 'sent' || proposal.status === 'viewed') {
      pendingSignatures++;
    }

    // Calculate payment stats from milestones
    (proposal.milestones || []).forEach((milestone: any) => {
      if (milestone.payment_status === 'paid') {
        totalPaid += milestone.amount || 0;
      } else if (milestone.payment_status === 'pending' || milestone.payment_status === 'overdue') {
        paymentsDueCount++;
        paymentsDueAmount += milestone.amount || 0;
      }

      if (milestone.milestone_status === 'in_progress') {
        itemsInProgress++;
      }
    });
  });

  return {
    total_proposals: proposals.length,
    active_proposals: activeProposals.length,
    completed_proposals: completedProposals.length,
    pending_signatures: pendingSignatures,
    total_value: totalValue,
    total_paid: totalPaid,
    total_remaining: totalValue - totalPaid,
    items_in_progress: itemsInProgress,
    payments_due_count: paymentsDueCount,
    payments_due_amount: paymentsDueAmount,
  };
}

function generateActionItems(proposals: any[]): ClientActionItem[] {
  const items: ClientActionItem[] = [];

  proposals.forEach(proposal => {
    // Unsigned agreements
    if (
      (proposal.status === 'sent' || proposal.status === 'viewed') &&
      (!proposal.agreement || proposal.agreement.length === 0 || proposal.agreement[0]?.status !== 'signed')
    ) {
      items.push({
        id: `sign-${proposal.id}`,
        type: 'sign_agreement',
        proposal_id: proposal.id,
        proposal_name: proposal.project_name,
        title: 'Sign Agreement',
        description: `Review and sign the agreement for ${proposal.project_name}`,
        due_date: null,
        amount: proposal.final_amount,
        priority: 'urgent',
        action_url: `/proposals/${proposal.access_token}`,
      });
    }

    // Pending payments
    (proposal.milestones || []).forEach((milestone: any) => {
      if (milestone.payment_status === 'pending' || milestone.payment_status === 'overdue') {
        const isOverdue = milestone.payment_status === 'overdue' ||
          (milestone.due_date && new Date(milestone.due_date) < new Date());

        items.push({
          id: `pay-${milestone.id}`,
          type: 'make_payment',
          proposal_id: proposal.id,
          proposal_name: proposal.project_name,
          title: `Pay ${milestone.milestone_name}`,
          description: milestone.description || `Payment for ${proposal.project_name}`,
          due_date: milestone.due_date,
          amount: milestone.amount,
          priority: isOverdue ? 'urgent' : 'normal',
          action_url: `/proposals/${proposal.access_token}`,
        });
      }
    });

    // Incomplete onboarding
    if (
      proposal.status === 'agreement_signed' &&
      proposal.onboarding_form &&
      proposal.onboarding_form.length > 0 &&
      proposal.onboarding_form[0]?.status === 'pending'
    ) {
      items.push({
        id: `onboard-${proposal.id}`,
        type: 'complete_onboarding',
        proposal_id: proposal.id,
        proposal_name: proposal.project_name,
        title: 'Complete Onboarding',
        description: `Fill out the onboarding form for ${proposal.project_name}`,
        due_date: null,
        amount: null,
        priority: 'normal',
        action_url: `/proposals/${proposal.access_token}`,
      });
    }
  });

  // Sort by priority (urgent first) then by due date
  return items.sort((a, b) => {
    if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
    if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;
    if (a.due_date && b.due_date) {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    return 0;
  });
}

function mapToProposalSummary(proposal: any): ClientProposalSummary {
  const milestones = proposal.milestones || [];
  const phases = proposal.phases || [];

  const totalPaid = milestones
    .filter((m: any) => m.payment_status === 'paid')
    .reduce((sum: number, m: any) => sum + (m.amount || 0), 0);

  const phasesCompleted = phases.filter((p: any) => p.phase_status === 'completed').length;

  // Find next unpaid milestone
  const unpaidMilestones = milestones
    .filter((m: any) => m.payment_status !== 'paid')
    .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));

  const nextMilestone = unpaidMilestones[0];

  // Determine pending action
  let pendingActionType: string | null = null;
  let hasPendingAction = false;

  if (proposal.status === 'sent' || proposal.status === 'viewed') {
    if (!proposal.agreement || proposal.agreement.length === 0 || proposal.agreement[0]?.status !== 'signed') {
      pendingActionType = 'sign_agreement';
      hasPendingAction = true;
    }
  } else if (nextMilestone) {
    pendingActionType = 'make_payment';
    hasPendingAction = true;
  }

  return {
    id: proposal.id,
    project_name: proposal.project_name,
    client_name: proposal.client_name,
    client_company: proposal.client_company,
    status: proposal.status,
    progress_percentage: proposal.progress_percentage || 0,
    total_amount: proposal.total_amount,
    final_amount: proposal.final_amount,
    total_paid: totalPaid,
    total_remaining: (proposal.final_amount || 0) - totalPaid,
    created_at: proposal.created_at,
    sent_at: proposal.sent_at,
    viewed_at: proposal.viewed_at,
    agreement_signed_at: proposal.agreement_signed_at,
    next_payment_due: nextMilestone?.due_date || null,
    next_payment_amount: nextMilestone?.amount || null,
    phases_completed: phasesCompleted,
    phases_total: phases.length,
    has_pending_action: hasPendingAction,
    pending_action_type: pendingActionType,
    access_token: proposal.access_token,
  };
}

function aggregateRecentActivity(proposals: any[]): ClientActivity[] {
  const activities: ClientActivity[] = [];

  proposals.forEach(proposal => {
    (proposal.dashboard_updates || []).forEach((update: any) => {
      activities.push({
        id: update.id,
        activity_type: update.update_type,
        title: update.title,
        description: update.content,
        created_at: update.created_at,
      });
    });
  });

  // Sort by date descending
  return activities.sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}
