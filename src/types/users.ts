/**
 * User Management Type Definitions
 * Light Brand Consulting
 */

// ============================================================================
// Enums / Union Types
// ============================================================================

export type SystemRole = 'admin' | 'team_member' | 'client';
export type ProjectRole = 'owner' | 'manager' | 'member' | 'viewer';

// ============================================================================
// User Profiles
// ============================================================================

export interface UserProfile {
  id: string;
  auth_user_id: string | null;
  email: string;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  timezone: string;
  system_role: SystemRole;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProfileInsert {
  auth_user_id?: string | null;
  email: string;
  full_name: string;
  avatar_url?: string | null;
  phone?: string | null;
  timezone?: string;
  system_role?: SystemRole;
  is_active?: boolean;
}

export interface UserProfileUpdate {
  auth_user_id?: string | null;
  email?: string;
  full_name?: string;
  avatar_url?: string | null;
  phone?: string | null;
  timezone?: string;
  system_role?: SystemRole;
  is_active?: boolean;
  last_login_at?: string | null;
}

// ============================================================================
// Project Members
// ============================================================================

export interface ProjectMember {
  id: string;
  proposal_id: string;
  user_profile_id: string;
  project_role: ProjectRole;
  can_edit: boolean;
  can_view_financials: boolean;
  can_manage_team: boolean;
  added_by: string | null;
  added_at: string;
}

export interface ProjectMemberInsert {
  proposal_id: string;
  user_profile_id: string;
  project_role?: ProjectRole;
  can_edit?: boolean;
  can_view_financials?: boolean;
  can_manage_team?: boolean;
  added_by?: string | null;
}

export interface ProjectMemberUpdate {
  project_role?: ProjectRole;
  can_edit?: boolean;
  can_view_financials?: boolean;
  can_manage_team?: boolean;
}

export interface ProjectMemberWithProfile extends ProjectMember {
  user_profile: UserProfile;
}

// ============================================================================
// User Invitations
// ============================================================================

export interface UserInvitation {
  id: string;
  email: string;
  full_name: string | null;
  invited_role: SystemRole;
  proposal_id: string | null;
  project_role: ProjectRole | null;
  invitation_token: string;
  invited_by: string | null;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
}

export interface UserInvitationInsert {
  email: string;
  full_name?: string | null;
  invited_role?: SystemRole;
  proposal_id?: string | null;
  project_role?: ProjectRole | null;
  invitation_token: string;
  invited_by?: string | null;
  expires_at: string;
}

export interface UserInvitationUpdate {
  full_name?: string | null;
  invited_role?: SystemRole;
  project_role?: ProjectRole | null;
  expires_at?: string;
  accepted_at?: string | null;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface UserProfilesApiResponse {
  data: UserProfile[] | null;
  error: string | null;
  count?: number;
}

export interface UserProfileApiResponse {
  data: UserProfile | null;
  error: string | null;
}

export interface ProjectMembersApiResponse {
  data: ProjectMemberWithProfile[] | null;
  error: string | null;
}

export interface UserInvitationsApiResponse {
  data: UserInvitation[] | null;
  error: string | null;
}

// ============================================================================
// Team Dashboard Types
// ============================================================================

export interface TeamMember extends UserProfile {
  active_projects_count: number;
  active_todos_count: number;
}

export interface CurrentUser {
  id: string;
  profile: UserProfile | null;
  isAdmin: boolean;
  isTeamMember: boolean;
  isClient: boolean;
}
