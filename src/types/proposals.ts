/**
 * Proposal Management System Type Definitions
 * Light Brand Consulting
 */

import type { BusinessIntelligence } from './business-intelligence';

// ============================================================================
// Lead Submissions
// ============================================================================

export type LeadStatus = 'new' | 'contacted' | 'proposal_sent' | 'converted' | 'archived';

export interface LeadSubmission {
  id: string;
  service: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  intake_data: Record<string, string> | null;
  status: LeadStatus;
  notes: string | null;
  website_url: string | null;
  tech_stack: Record<string, unknown> | null;
  website_story: string | null;
  readiness_score: number | null;
  readiness_brief: string | null;
  capacity_gap_analysis: string | null;
  full_readiness_report: string | null;
  business_intelligence: BusinessIntelligence | null;
  system_demo_links: Array<{ name: string; url: string }> | null;
  booking_calendly_link: string | null;
  booked_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadSubmissionInsert {
  service: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  intake_data?: Record<string, string> | null;
  status?: LeadStatus;
  notes?: string | null;
  website_url?: string | null;
  tech_stack?: Record<string, unknown> | null;
  website_story?: string | null;
  readiness_score?: number | null;
  readiness_brief?: string | null;
  capacity_gap_analysis?: string | null;
  full_readiness_report?: string | null;
  business_intelligence?: BusinessIntelligence | null;
  system_demo_links?: Array<{ name: string; url: string }> | null;
  booking_calendly_link?: string | null;
  booked_at?: string | null;
}

export interface LeadSubmissionUpdate {
  service?: string;
  name?: string;
  email?: string;
  company?: string | null;
  phone?: string | null;
  intake_data?: Record<string, string> | null;
  status?: LeadStatus;
  notes?: string | null;
  website_url?: string | null;
  tech_stack?: Record<string, unknown> | null;
  website_story?: string | null;
  readiness_score?: number | null;
  readiness_brief?: string | null;
  capacity_gap_analysis?: string | null;
  full_readiness_report?: string | null;
  business_intelligence?: BusinessIntelligence | null;
  system_demo_links?: Array<{ name: string; url: string }> | null;
  booking_calendly_link?: string | null;
  booked_at?: string | null;
}

// ============================================================================
// Proposals
// ============================================================================

export type ProposalStatus =
  | 'draft'
  | 'sent'
  | 'viewed'
  | 'agreement_signed'
  | 'active'
  | 'completed'
  | 'cancelled';

export interface Proposal {
  id: string;
  lead_submission_id: string | null;
  client_name: string;
  client_email: string;
  client_company: string | null;
  client_phone: string | null;
  project_name: string;
  project_overview: string | null;
  project_scope: string | null;
  total_timeline: string | null;
  start_date: string | null;
  estimated_completion_date: string | null;
  total_amount: number;
  discount_percentage: number;
  final_amount: number;
  status: ProposalStatus;
  access_token: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  sent_at: string | null;
  viewed_at: string | null;
  agreement_signed_at: string | null;
}

export interface ProposalInsert {
  lead_submission_id?: string | null;
  client_name: string;
  client_email: string;
  client_company?: string | null;
  client_phone?: string | null;
  project_name: string;
  project_overview?: string | null;
  project_scope?: string | null;
  total_timeline?: string | null;
  start_date?: string | null;
  estimated_completion_date?: string | null;
  total_amount: number;
  discount_percentage?: number;
  final_amount: number;
  status?: ProposalStatus;
  created_by?: string | null;
}

export interface ProposalUpdate {
  lead_submission_id?: string | null;
  client_name?: string;
  client_email?: string;
  client_company?: string | null;
  client_phone?: string | null;
  project_name?: string;
  project_overview?: string | null;
  project_scope?: string | null;
  total_timeline?: string | null;
  start_date?: string | null;
  estimated_completion_date?: string | null;
  total_amount?: number;
  discount_percentage?: number;
  final_amount?: number;
  status?: ProposalStatus;
  sent_at?: string | null;
  viewed_at?: string | null;
  agreement_signed_at?: string | null;
}

// ============================================================================
// Proposal Phases
// ============================================================================

export interface Deliverable {
  id: string;
  name: string;
  description?: string;
}

export interface ProposalPhase {
  id: string;
  proposal_id: string;
  phase_number: number;
  phase_name: string;
  description: string | null;
  timeline: string | null;
  start_date: string | null;
  end_date: string | null;
  deliverables: Deliverable[] | null;
  objectives: string[] | null;
  goals: string[] | null;
  amount: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProposalPhaseInsert {
  proposal_id: string;
  phase_number: number;
  phase_name: string;
  description?: string | null;
  timeline?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  deliverables?: Deliverable[] | null;
  objectives?: string[] | null;
  goals?: string[] | null;
  amount: number;
  sort_order?: number;
}

export interface ProposalPhaseUpdate {
  phase_number?: number;
  phase_name?: string;
  description?: string | null;
  timeline?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  deliverables?: Deliverable[] | null;
  objectives?: string[] | null;
  goals?: string[] | null;
  amount?: number;
  sort_order?: number;
}

// ============================================================================
// Milestones
// ============================================================================

export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';
export type MilestoneStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked';

export interface Milestone {
  id: string;
  proposal_id: string;
  phase_id: string | null;
  milestone_name: string;
  description: string | null;
  amount: number;
  due_date: string | null;
  payment_status: PaymentStatus;
  milestone_status: MilestoneStatus;
  invoice_number: string | null;
  paid_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface MilestoneInsert {
  proposal_id: string;
  phase_id?: string | null;
  milestone_name: string;
  description?: string | null;
  amount: number;
  due_date?: string | null;
  payment_status?: PaymentStatus;
  milestone_status?: MilestoneStatus;
  invoice_number?: string | null;
  sort_order?: number;
}

export interface MilestoneUpdate {
  phase_id?: string | null;
  milestone_name?: string;
  description?: string | null;
  amount?: number;
  due_date?: string | null;
  payment_status?: PaymentStatus;
  milestone_status?: MilestoneStatus;
  invoice_number?: string | null;
  paid_at?: string | null;
  sort_order?: number;
}

// ============================================================================
// Agreements
// ============================================================================

export type AgreementStatus = 'pending' | 'signed' | 'declined';

export interface AgreementTerm {
  id: string;
  title: string;
  content: string;
}

export interface Agreement {
  id: string;
  proposal_id: string;
  agreement_text: string;
  terms: AgreementTerm[] | null;
  signed_by_name: string | null;
  signed_by_email: string | null;
  signature_data: string | null;
  signed_at: string | null;
  ip_address: string | null;
  user_agent: string | null;
  status: AgreementStatus;
  created_at: string;
  updated_at: string;
}

export interface AgreementInsert {
  proposal_id: string;
  agreement_text: string;
  terms?: AgreementTerm[] | null;
}

export interface AgreementUpdate {
  agreement_text?: string;
  terms?: AgreementTerm[] | null;
  signed_by_name?: string | null;
  signed_by_email?: string | null;
  signature_data?: string | null;
  signed_at?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  status?: AgreementStatus;
}

// ============================================================================
// Onboarding Forms
// ============================================================================

export type OnboardingStatus = 'pending' | 'submitted' | 'reviewed';

export interface OnboardingFormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'file';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface OnboardingForm {
  id: string;
  proposal_id: string;
  form_config: OnboardingFormField[] | null;
  form_data: Record<string, unknown> | null;
  status: OnboardingStatus;
  submitted_at: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OnboardingFormInsert {
  proposal_id: string;
  form_config?: OnboardingFormField[] | null;
  form_data?: Record<string, unknown> | null;
}

export interface OnboardingFormUpdate {
  form_config?: OnboardingFormField[] | null;
  form_data?: Record<string, unknown> | null;
  status?: OnboardingStatus;
  submitted_at?: string | null;
  reviewed_at?: string | null;
}

// ============================================================================
// Dashboard Updates
// ============================================================================

export type UpdateType =
  | 'milestone_update'
  | 'progress_update'
  | 'comment'
  | 'file_upload'
  | 'status_change';

export interface Attachment {
  url: string;
  name: string;
  type: string;
  size?: number;
}

export interface DashboardUpdate {
  id: string;
  proposal_id: string;
  milestone_id: string | null;
  update_type: UpdateType;
  title: string;
  content: string | null;
  attachments: Attachment[] | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardUpdateInsert {
  proposal_id: string;
  milestone_id?: string | null;
  update_type: UpdateType;
  title: string;
  content?: string | null;
  attachments?: Attachment[] | null;
  created_by?: string | null;
}

// ============================================================================
// Proposal Comments
// ============================================================================

export interface ProposalComment {
  id: string;
  proposal_id: string;
  milestone_id: string | null;
  comment_text: string;
  created_by: string | null;
  is_client_comment: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProposalCommentInsert {
  proposal_id: string;
  milestone_id?: string | null;
  comment_text: string;
  created_by?: string | null;
  is_client_comment?: boolean;
}

// ============================================================================
// Full Proposal with Related Data
// ============================================================================

export interface ProposalWithDetails extends Proposal {
  phases: ProposalPhase[];
  milestones: Milestone[];
  agreement: Agreement | null;
  onboarding_form: OnboardingForm | null;
  dashboard_updates: DashboardUpdate[];
  comments: ProposalComment[];
  lead_submission?: LeadSubmission | null;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface LeadsApiResponse {
  data: LeadSubmission[] | null;
  error: string | null;
  count?: number;
}

export interface LeadApiResponse {
  data: LeadSubmission | null;
  error: string | null;
}

export interface ProposalsApiResponse {
  data: Proposal[] | null;
  error: string | null;
  count?: number;
}

export interface ProposalApiResponse {
  data: Proposal | null;
  error: string | null;
}

export interface ProposalDetailApiResponse {
  data: ProposalWithDetails | null;
  error: string | null;
}
