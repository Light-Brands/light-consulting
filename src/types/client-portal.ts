/**
 * Client Portal Type Definitions
 * Light Brand Consulting
 */

import type { PaymentStatus, MilestoneStatus } from './proposals';
import type { DeliverableLink } from './deliverables';
import type { ProjectActivityLog } from './projects';

// ============================================================================
// Client Project Types
// ============================================================================

export interface ClientProject {
  id: string;
  project_name: string;
  client_name: string;
  client_company: string | null;
  status: string;
  progress_percentage: number;
  start_date: string | null;
  estimated_completion_date: string | null;
  current_phase: string | null;
  phases_completed: number;
  phases_total: number;
  next_milestone: string | null;
  next_milestone_due: string | null;
  total_paid: number;
  total_due: number;
  has_pending_action: boolean;
}

export interface ClientPhase {
  id: string;
  phase_number: number;
  phase_name: string;
  description: string | null;
  timeline: string | null;
  start_date: string | null;
  end_date: string | null;
  phase_status: 'not_started' | 'in_progress' | 'completed' | 'blocked';
  progress_percentage: number;
  deliverables: ClientDeliverable[];
}

export interface ClientDeliverable {
  id: string;
  name: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
}

export interface ClientMilestone {
  id: string;
  milestone_name: string;
  description: string | null;
  amount: number;
  due_date: string | null;
  payment_status: PaymentStatus;
  milestone_status: MilestoneStatus;
  stripe_payment_url: string | null;
  paid_at: string | null;
  phase_name: string | null;
}

export interface ClientProjectDetail {
  // Core info
  id: string;
  project_name: string;
  project_overview: string | null;
  client_name: string;
  client_company: string | null;

  // Status
  status: string;
  progress_percentage: number;
  health_status: string | null;

  // Timeline
  start_date: string | null;
  estimated_completion_date: string | null;
  total_timeline: string | null;

  // Financial summary
  total_amount: number;
  final_amount: number;
  total_paid: number;
  total_pending: number;

  // Related data
  phases: ClientPhase[];
  milestones: ClientMilestone[];
  deliverable_links: DeliverableLink[];
  recent_activity: ClientActivity[];

  // Team
  project_manager_name: string | null;
  team_members: ClientTeamMember[];
}

export interface ClientTeamMember {
  id: string;
  full_name: string;
  role: string;
  avatar_url: string | null;
}

export interface ClientActivity {
  id: string;
  activity_type: string;
  title: string;
  description: string | null;
  created_at: string;
}

// ============================================================================
// Client Dashboard Types
// ============================================================================

export interface ClientDashboardData {
  projects: ClientProject[];
  total_projects: number;
  active_projects: number;
  total_invested: number;
  total_pending_payments: number;
  upcoming_milestones: UpcomingMilestone[];
  recent_updates: ClientActivity[];
}

export interface UpcomingMilestone {
  id: string;
  milestone_name: string;
  project_name: string;
  project_id: string;
  amount: number;
  due_date: string | null;
  payment_status: PaymentStatus;
}

// ============================================================================
// Client Actions
// ============================================================================

export interface ApproveProposalRequest {
  proposal_id: string;
  signature_data?: string;
  agreed_terms?: boolean;
}

export interface ApproveProposalResponse {
  success: boolean;
  message: string;
  redirect_url?: string;
}

export interface PayMilestoneRequest {
  milestone_id: string;
  return_url: string;
}

export interface PayMilestoneResponse {
  success: boolean;
  checkout_url?: string;
  error?: string;
}

export interface InviteTeamMemberRequest {
  proposal_id: string;
  email: string;
  full_name?: string;
}

// ============================================================================
// Portal Navigation
// ============================================================================

export interface PortalNavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface PortalBreadcrumb {
  label: string;
  href?: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ClientProjectsApiResponse {
  data: ClientProject[] | null;
  error: string | null;
}

export interface ClientProjectDetailApiResponse {
  data: ClientProjectDetail | null;
  error: string | null;
}

export interface ClientDashboardApiResponse {
  data: ClientDashboardData | null;
  error: string | null;
}

export interface ClientDeliverablesApiResponse {
  data: DeliverableLink[] | null;
  error: string | null;
}

// ============================================================================
// Portal Configuration
// ============================================================================

export const PHASE_STATUS_DISPLAY = {
  not_started: { label: 'Not Started', color: 'text-gray-500', bgColor: 'bg-gray-100' },
  in_progress: { label: 'In Progress', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  completed: { label: 'Completed', color: 'text-green-600', bgColor: 'bg-green-100' },
  blocked: { label: 'Blocked', color: 'text-red-600', bgColor: 'bg-red-100' },
};

export const PAYMENT_STATUS_DISPLAY = {
  pending: { label: 'Pending', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  paid: { label: 'Paid', color: 'text-green-600', bgColor: 'bg-green-100' },
  overdue: { label: 'Overdue', color: 'text-red-600', bgColor: 'bg-red-100' },
  cancelled: { label: 'Cancelled', color: 'text-gray-500', bgColor: 'bg-gray-100' },
};

export const MILESTONE_STATUS_DISPLAY = {
  not_started: { label: 'Not Started', color: 'text-gray-500' },
  in_progress: { label: 'In Progress', color: 'text-blue-600' },
  completed: { label: 'Completed', color: 'text-green-600' },
  blocked: { label: 'Blocked', color: 'text-red-600' },
};

// ============================================================================
// Client Command Center Types
// ============================================================================

export interface ClientCommandCenterStats {
  total_proposals: number;
  active_proposals: number;
  completed_proposals: number;
  pending_signatures: number;
  total_value: number;
  total_paid: number;
  total_remaining: number;
  items_in_progress: number;
  payments_due_count: number;
  payments_due_amount: number;
}

export interface ClientActionItem {
  id: string;
  type: 'sign_agreement' | 'make_payment' | 'review_deliverable' | 'complete_onboarding';
  proposal_id: string;
  proposal_name: string;
  title: string;
  description: string;
  due_date: string | null;
  amount: number | null;
  priority: 'urgent' | 'normal';
  action_url: string;
}

export interface ClientProposalSummary {
  id: string;
  project_name: string;
  client_name: string;
  client_company: string | null;
  status: string;
  progress_percentage: number;
  total_amount: number;
  final_amount: number;
  total_paid: number;
  total_remaining: number;
  created_at: string;
  sent_at: string | null;
  viewed_at: string | null;
  agreement_signed_at: string | null;
  next_payment_due: string | null;
  next_payment_amount: number | null;
  phases_completed: number;
  phases_total: number;
  has_pending_action: boolean;
  pending_action_type: string | null;
  access_token: string;
}

export interface ClientBillingSummary {
  total_value: number;
  total_paid: number;
  total_remaining: number;
  payments_due: ClientPaymentItem[];
  payment_history: ClientPaymentItem[];
  upcoming_payments: ClientPaymentItem[];
}

export interface ClientPaymentItem {
  id: string;
  proposal_id: string;
  proposal_name: string;
  milestone_name: string;
  amount: number;
  due_date: string | null;
  paid_at: string | null;
  status: 'pending' | 'due' | 'overdue' | 'paid';
  stripe_payment_url: string | null;
  access_token: string;
}

export interface ClientCommandCenterData {
  stats: ClientCommandCenterStats;
  action_items: ClientActionItem[];
  proposals: ClientProposalSummary[];
  recent_activity: ClientActivity[];
}

export const PROPOSAL_STATUS_DISPLAY = {
  draft: { label: 'Draft', color: 'text-gray-400', bgColor: 'bg-gray-500/10', borderColor: 'border-gray-500/30' },
  sent: { label: 'Sent', color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
  viewed: { label: 'Viewed', color: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30' },
  agreement_signed: { label: 'Signed', color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/30' },
  active: { label: 'Active', color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30' },
  completed: { label: 'Completed', color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
  cancelled: { label: 'Cancelled', color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' },
};
