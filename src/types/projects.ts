/**
 * Project Management Type Definitions
 * Light Brand Consulting
 */

import type { Proposal, ProposalPhase, Milestone, ProposalWithDetails } from './proposals';
import type { UserProfile } from './users';

// ============================================================================
// Enums / Union Types
// ============================================================================

export type ProjectCategory = 'client_project' | 'internal' | 'maintenance' | 'retainer';
export type HealthStatus = 'on_track' | 'at_risk' | 'behind' | 'blocked';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';
export type InternalProjectCategory = 'product' | 'infrastructure' | 'tooling' | 'research' | 'marketing' | 'other';
export type InternalProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
export type PhaseStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked';

// ============================================================================
// Extended Proposal Fields (for project tracking)
// ============================================================================

export interface ProjectTrackingFields {
  progress_percentage: number;
  last_activity_at: string | null;
  health_status: HealthStatus;
  priority: ProjectPriority;
  next_action: string | null;
  next_action_due_date: string | null;
  project_category: ProjectCategory;
  is_on_hold: boolean;
  on_hold_reason: string | null;
  on_hold_since: string | null;
  assigned_to: string | null;
  project_manager_id: string | null;
}

// ============================================================================
// Internal Projects
// ============================================================================

export interface InternalProject {
  id: string;
  name: string;
  description: string | null;
  category: InternalProjectCategory;
  status: InternalProjectStatus;
  priority: ProjectPriority;
  progress_percentage: number;
  start_date: string | null;
  target_date: string | null;
  completed_at: string | null;
  lead_id: string | null;
  tags: string[] | null;
  repository_url: string | null;
  documentation_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface InternalProjectInsert {
  name: string;
  description?: string | null;
  category?: InternalProjectCategory;
  status?: InternalProjectStatus;
  priority?: ProjectPriority;
  progress_percentage?: number;
  start_date?: string | null;
  target_date?: string | null;
  lead_id?: string | null;
  tags?: string[] | null;
  repository_url?: string | null;
  documentation_url?: string | null;
}

export interface InternalProjectUpdate {
  name?: string;
  description?: string | null;
  category?: InternalProjectCategory;
  status?: InternalProjectStatus;
  priority?: ProjectPriority;
  progress_percentage?: number;
  start_date?: string | null;
  target_date?: string | null;
  completed_at?: string | null;
  lead_id?: string | null;
  tags?: string[] | null;
  repository_url?: string | null;
  documentation_url?: string | null;
}

export interface InternalProjectMember {
  id: string;
  internal_project_id: string;
  user_profile_id: string;
  role: string;
  added_at: string;
}

export interface InternalProjectWithMembers extends InternalProject {
  members: Array<InternalProjectMember & { user_profile: UserProfile }>;
  lead?: UserProfile;
}

// ============================================================================
// Unified Project View (combines client proposals + internal projects)
// ============================================================================

export interface UnifiedProject {
  id: string;
  type: 'client' | 'internal';
  name: string;
  description: string | null;
  status: string;
  priority: ProjectPriority;
  progress_percentage: number;
  health_status?: HealthStatus;
  category: ProjectCategory | InternalProjectCategory;

  // Client-specific
  client_name?: string;
  client_company?: string;
  final_amount?: number;

  // Timeline
  start_date: string | null;
  target_date: string | null;

  // Assignment
  assigned_to?: UserProfile | null;
  lead?: UserProfile | null;

  // Metadata
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Project Activity Log
// ============================================================================

export type ActivityType =
  | 'status_change'
  | 'phase_update'
  | 'milestone_update'
  | 'deliverable_update'
  | 'comment_added'
  | 'file_uploaded'
  | 'payment_received'
  | 'team_change'
  | 'progress_update'
  | 'link_added'
  | 'assignment_change'
  | 'other';

export interface ProjectActivityLog {
  id: string;
  proposal_id: string;
  activity_type: ActivityType;
  title: string;
  description: string | null;
  phase_id: string | null;
  milestone_id: string | null;
  deliverable_id: string | null;
  user_profile_id: string | null;
  metadata: Record<string, unknown> | null;
  is_client_visible: boolean;
  created_at: string;
}

export interface ProjectActivityLogInsert {
  proposal_id: string;
  activity_type: ActivityType;
  title: string;
  description?: string | null;
  phase_id?: string | null;
  milestone_id?: string | null;
  deliverable_id?: string | null;
  user_profile_id?: string | null;
  metadata?: Record<string, unknown> | null;
  is_client_visible?: boolean;
}

export interface ProjectActivityWithUser extends ProjectActivityLog {
  user_name?: string;
  user_avatar?: string;
}

// ============================================================================
// Command Center Types
// ============================================================================

export interface CommandCenterProject extends Proposal, ProjectTrackingFields {
  phases: Array<ProposalPhase & { phase_status: PhaseStatus }>;
  milestones: Milestone[];
  assigned_user?: UserProfile;
  project_manager?: UserProfile;
  recent_activity?: ProjectActivityLog[];
  next_actions_count?: number;
  pending_deliverables_count?: number;
}

export interface CommandCenterStats {
  total_active: number;
  on_track: number;
  at_risk: number;
  behind: number;
  blocked: number;
  on_hold: number;
  total_value: number;
  urgent_count: number;
}

// ============================================================================
// Filters
// ============================================================================

export interface ProjectFilters {
  status?: string | string[];
  health_status?: HealthStatus | HealthStatus[];
  priority?: ProjectPriority | ProjectPriority[];
  category?: ProjectCategory | ProjectCategory[];
  assigned_to?: string;
  project_manager_id?: string;
  is_on_hold?: boolean;
  search?: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface CommandCenterApiResponse {
  data: {
    projects: CommandCenterProject[];
    stats: CommandCenterStats;
  } | null;
  error: string | null;
}

export interface InternalProjectsApiResponse {
  data: InternalProject[] | null;
  error: string | null;
  count?: number;
}

export interface InternalProjectApiResponse {
  data: InternalProject | null;
  error: string | null;
}

export interface UnifiedProjectsApiResponse {
  data: UnifiedProject[] | null;
  error: string | null;
  count?: number;
}

export interface ProjectActivityApiResponse {
  data: ProjectActivityWithUser[] | null;
  error: string | null;
}

// ============================================================================
// Configuration (for UI)
// ============================================================================

export const HEALTH_STATUS_CONFIGS = [
  { value: 'on_track' as HealthStatus, label: 'On Track', color: 'text-green-600', bgColor: 'bg-green-100', icon: '✓' },
  { value: 'at_risk' as HealthStatus, label: 'At Risk', color: 'text-amber-600', bgColor: 'bg-amber-100', icon: '⚠' },
  { value: 'behind' as HealthStatus, label: 'Behind', color: 'text-orange-600', bgColor: 'bg-orange-100', icon: '⏰' },
  { value: 'blocked' as HealthStatus, label: 'Blocked', color: 'text-red-600', bgColor: 'bg-red-100', icon: '✕' },
];

export const PROJECT_CATEGORY_CONFIGS = [
  { value: 'client_project' as ProjectCategory, label: 'Client Project', icon: '👤' },
  { value: 'internal' as ProjectCategory, label: 'Internal', icon: '🏠' },
  { value: 'maintenance' as ProjectCategory, label: 'Maintenance', icon: '🔧' },
  { value: 'retainer' as ProjectCategory, label: 'Retainer', icon: '📋' },
];

export const PRIORITY_CONFIGS = [
  { value: 'urgent' as ProjectPriority, label: 'Urgent', color: 'text-red-600', bgColor: 'bg-red-100' },
  { value: 'high' as ProjectPriority, label: 'High', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { value: 'medium' as ProjectPriority, label: 'Medium', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  { value: 'low' as ProjectPriority, label: 'Low', color: 'text-gray-600', bgColor: 'bg-gray-100' },
];
