/**
 * Supabase Database Type Definitions
 * Light Brand Consulting
 */

import type {
  LeadSubmission,
  LeadSubmissionInsert,
  LeadSubmissionUpdate,
  Proposal,
  ProposalInsert,
  ProposalUpdate,
  ProposalPhase,
  ProposalPhaseInsert,
  ProposalPhaseUpdate,
  Milestone,
  MilestoneInsert,
  MilestoneUpdate,
  Agreement,
  AgreementInsert,
  AgreementUpdate,
  OnboardingForm,
  OnboardingFormInsert,
  OnboardingFormUpdate,
  DashboardUpdate,
  DashboardUpdateInsert,
  ProposalComment,
  ProposalCommentInsert,
} from './proposals';

import type {
  Deliverable,
  DeliverableInsert,
  DeliverableUpdate,
  DeliverableLink,
  DeliverableLinkInsert,
  DeliverableLinkUpdate,
} from './deliverables';

// Assessment Types
export type AssessmentStage = 'qualify' | 'book' | 'educate' | 'confirm' | 'commit' | 'intake' | 'status';
export type AssessmentVerdict = 'GO' | 'CONDITIONAL_GO' | 'NO_GO';

export interface AssessmentSubmission {
  id: string;
  email: string;
  name: string;
  company: string | null;
  phone: string | null;
  stage: AssessmentStage;
  vsl_completed: boolean;
  vsl_watch_percentage: number | null;
  booking_id: string | null;
  booked_slot: string | null;
  payment_session_id: string | null;
  payment_completed: boolean;
  payment_completed_at: string | null;
  intake_responses: Record<string, string> | null;
  loom_video_url: string | null;
  intake_submitted_at: string | null;
  verdict: AssessmentVerdict | null;
  verdict_delivered_at: string | null;
  verdict_report_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AssessmentSubmissionInsert {
  email: string;
  name: string;
  company?: string | null;
  phone?: string | null;
  stage?: AssessmentStage;
  vsl_completed?: boolean;
  vsl_watch_percentage?: number | null;
  booking_id?: string | null;
  booked_slot?: string | null;
  payment_session_id?: string | null;
  payment_completed?: boolean;
  payment_completed_at?: string | null;
  intake_responses?: Record<string, string> | null;
  loom_video_url?: string | null;
  intake_submitted_at?: string | null;
  verdict?: AssessmentVerdict | null;
  verdict_delivered_at?: string | null;
  verdict_report_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AssessmentSubmissionUpdate {
  email?: string;
  name?: string;
  company?: string | null;
  phone?: string | null;
  stage?: AssessmentStage;
  vsl_completed?: boolean;
  vsl_watch_percentage?: number | null;
  booking_id?: string | null;
  booked_slot?: string | null;
  payment_session_id?: string | null;
  payment_completed?: boolean;
  payment_completed_at?: string | null;
  intake_responses?: Record<string, string> | null;
  loom_video_url?: string | null;
  intake_submitted_at?: string | null;
  verdict?: AssessmentVerdict | null;
  verdict_delivered_at?: string | null;
  verdict_report_url?: string | null;
  updated_at?: string;
}

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: ProjectInsert;
        Update: ProjectUpdate;
      };
      lead_submissions: {
        Row: LeadSubmission;
        Insert: LeadSubmissionInsert;
        Update: LeadSubmissionUpdate;
      };
      proposals: {
        Row: Proposal;
        Insert: ProposalInsert;
        Update: ProposalUpdate;
      };
      proposal_phases: {
        Row: ProposalPhase;
        Insert: ProposalPhaseInsert;
        Update: ProposalPhaseUpdate;
      };
      milestones: {
        Row: Milestone;
        Insert: MilestoneInsert;
        Update: MilestoneUpdate;
      };
      agreements: {
        Row: Agreement;
        Insert: AgreementInsert;
        Update: AgreementUpdate;
      };
      onboarding_forms: {
        Row: OnboardingForm;
        Insert: OnboardingFormInsert;
        Update: OnboardingFormUpdate;
      };
      dashboard_updates: {
        Row: DashboardUpdate;
        Insert: DashboardUpdateInsert;
        Update: never; // Updates are not typically edited
      };
      proposal_comments: {
        Row: ProposalComment;
        Insert: ProposalCommentInsert;
        Update: never; // Comments are not typically edited
      };
      assessment_submissions: {
        Row: AssessmentSubmission;
        Insert: AssessmentSubmissionInsert;
        Update: AssessmentSubmissionUpdate;
      };
      deliverables: {
        Row: Deliverable;
        Insert: DeliverableInsert;
        Update: DeliverableUpdate;
      };
      deliverable_links: {
        Row: DeliverableLink;
        Insert: DeliverableLinkInsert;
        Update: DeliverableLinkUpdate;
      };
    };
  };
}

// Project Group type
export type ProjectGroup = 'featured' | 'new' | 'past';

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tags: string[];
  case_study_url: string | null;
  client_name: string | null;
  industry: string | null;
  featured: boolean;
  status: 'draft' | 'published';
  project_group: ProjectGroup;
  sort_order: number;
  created_at: string;
  updated_at: string;
  // Enhanced fields for project detail pages
  brand_id?: string | null;
  gallery_images?: string[];
  services?: string[];
  key_features?: string[];
  challenge?: string | null;
  solution?: string | null;
  results?: string[];
  tech_stack?: {
    frontend?: string;
    backend?: string;
  };
  origin?: string | null;
  project_type?: string | null;
  preview_enabled?: boolean; // If false, skip live preview and use fallback image
}

export interface ProjectInsert {
  title: string;
  description: string;
  image_url?: string | null;
  tags?: string[];
  case_study_url?: string | null;
  client_name?: string | null;
  industry?: string | null;
  featured?: boolean;
  status?: 'draft' | 'published';
  project_group?: ProjectGroup;
  sort_order?: number;
  brand_id?: string | null;
  gallery_images?: string[];
  services?: string[];
  key_features?: string[];
  challenge?: string | null;
  solution?: string | null;
  results?: string[];
  tech_stack?: {
    frontend?: string;
    backend?: string;
  };
  origin?: string | null;
  project_type?: string | null;
  preview_enabled?: boolean;
}

export interface ProjectUpdate {
  title?: string;
  description?: string;
  image_url?: string | null;
  tags?: string[];
  case_study_url?: string | null;
  client_name?: string | null;
  industry?: string | null;
  featured?: boolean;
  status?: 'draft' | 'published';
  project_group?: ProjectGroup;
  sort_order?: number;
  // Enhanced fields for project detail pages
  brand_id?: string | null;
  gallery_images?: string[];
  services?: string[];
  key_features?: string[];
  challenge?: string | null;
  solution?: string | null;
  results?: string[];
  tech_stack?: {
    frontend?: string;
    backend?: string;
  };
  origin?: string | null;
  project_type?: string | null;
  preview_enabled?: boolean;
}

// API Response types
export interface ProjectsApiResponse {
  data: Project[] | null;
  error: string | null;
  count?: number;
}

export interface ProjectApiResponse {
  data: Project | null;
  error: string | null;
}
