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
