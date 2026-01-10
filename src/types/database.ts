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
    };
  };
}

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
  sort_order: number;
  created_at: string;
  updated_at: string;
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
  sort_order?: number;
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
  sort_order?: number;
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
