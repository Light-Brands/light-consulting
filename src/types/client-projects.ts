/**
 * Client Project Type Definitions
 * Light Brand Consulting
 *
 * Projects belong to a client and contain multiple proposals.
 * Hierarchy: Client -> Project -> Proposal -> Phases/Milestones
 */

import type { Proposal } from './proposals';
import type { Client } from './clients';

// ============================================================================
// Project Status
// ============================================================================

export type ClientProjectStatus = 'draft' | 'active' | 'completed' | 'on_hold' | 'cancelled';

// ============================================================================
// Client Project Entity
// ============================================================================

export interface ClientProject {
  id: string;
  client_id: string;
  project_name: string;
  description: string | null;
  status: ClientProjectStatus;
  start_date: string | null;
  end_date: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ClientProjectInsert {
  client_id: string;
  project_name: string;
  description?: string | null;
  status?: ClientProjectStatus;
  start_date?: string | null;
  end_date?: string | null;
  metadata?: Record<string, unknown>;
}

export interface ClientProjectUpdate {
  project_name?: string;
  description?: string | null;
  status?: ClientProjectStatus;
  start_date?: string | null;
  end_date?: string | null;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// Project with Details
// ============================================================================

export interface ClientProjectWithDetails extends ClientProject {
  client: Client;
  proposals: Proposal[];
  proposal_count: number;
  total_value: number;
  total_paid: number;
  progress_percentage: number;
}

// ============================================================================
// Project Summary (for lists)
// ============================================================================

export interface ClientProjectSummary {
  id: string;
  client_id: string;
  project_name: string;
  status: ClientProjectStatus;
  proposal_count: number;
  active_proposals: number;
  total_value: number;
  start_date: string | null;
  end_date: string | null;
  client_name?: string;
  client_company?: string | null;
}

// ============================================================================
// Project Member (for access control)
// ============================================================================

export interface ProjectMember {
  id: string;
  proposal_id: string | null;
  client_project_id: string | null;
  user_profile_id: string;
  project_role: 'owner' | 'manager' | 'member' | 'viewer';
  can_edit: boolean;
  can_view_financials: boolean;
  can_manage_team: boolean;
  added_by: string | null;
  added_at: string;
  // Joined fields
  user_email?: string;
  user_name?: string;
}

export interface ProjectMemberInsert {
  proposal_id?: string | null;
  client_project_id?: string | null;
  user_profile_id: string;
  project_role?: 'owner' | 'manager' | 'member' | 'viewer';
  can_edit?: boolean;
  can_view_financials?: boolean;
  can_manage_team?: boolean;
  added_by?: string | null;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ClientProjectsApiResponse {
  data: ClientProject[] | ClientProjectSummary[] | null;
  error: string | null;
  count?: number;
}

export interface ClientProjectApiResponse {
  data: ClientProject | null;
  error: string | null;
}

export interface ClientProjectWithDetailsApiResponse {
  data: ClientProjectWithDetails | null;
  error: string | null;
}

export interface ProjectMembersApiResponse {
  data: ProjectMember[] | null;
  error: string | null;
}
