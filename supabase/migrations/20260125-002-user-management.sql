-- ============================================================================
-- Migration: User Management System
-- Light Brand Consulting
--
-- Creates tables for user profiles, project membership, and invitations
-- Supports team members and client portal access
-- ============================================================================

-- Create enum-like types using check constraints
-- System roles: admin, team_member, client
-- Project roles: owner, manager, member, viewer

-- ============================================================================
-- User Profiles Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  phone VARCHAR(50),
  timezone VARCHAR(100) DEFAULT 'America/New_York',
  system_role VARCHAR(20) NOT NULL DEFAULT 'team_member',
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_system_role CHECK (system_role IN ('admin', 'team_member', 'client'))
);

-- Comments for user_profiles
COMMENT ON TABLE user_profiles IS 'User profiles for team members and clients';
COMMENT ON COLUMN user_profiles.auth_user_id IS 'Reference to Supabase auth.users';
COMMENT ON COLUMN user_profiles.system_role IS 'System-wide role: admin, team_member, or client';
COMMENT ON COLUMN user_profiles.is_active IS 'Whether the user account is active';

-- ============================================================================
-- Project Members Table (Junction table for user-project relationships)
-- ============================================================================
CREATE TABLE IF NOT EXISTS project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  user_profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  project_role VARCHAR(20) NOT NULL DEFAULT 'member',
  can_edit BOOLEAN DEFAULT false,
  can_view_financials BOOLEAN DEFAULT false,
  can_manage_team BOOLEAN DEFAULT false,
  added_by UUID REFERENCES user_profiles(id),
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_project_role CHECK (project_role IN ('owner', 'manager', 'member', 'viewer')),
  CONSTRAINT uq_project_member UNIQUE (proposal_id, user_profile_id)
);

-- Comments for project_members
COMMENT ON TABLE project_members IS 'Links users to projects with specific roles';
COMMENT ON COLUMN project_members.project_role IS 'Role on this project: owner, manager, member, viewer';
COMMENT ON COLUMN project_members.can_edit IS 'Permission to edit project details';
COMMENT ON COLUMN project_members.can_view_financials IS 'Permission to view financial information';
COMMENT ON COLUMN project_members.can_manage_team IS 'Permission to add/remove team members';

-- ============================================================================
-- User Invitations Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  invited_role VARCHAR(20) NOT NULL DEFAULT 'team_member',
  proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
  project_role VARCHAR(20),
  invitation_token VARCHAR(255) NOT NULL UNIQUE,
  invited_by UUID REFERENCES user_profiles(id),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_invited_role CHECK (invited_role IN ('admin', 'team_member', 'client')),
  CONSTRAINT chk_invitation_project_role CHECK (project_role IS NULL OR project_role IN ('owner', 'manager', 'member', 'viewer'))
);

-- Comments for user_invitations
COMMENT ON TABLE user_invitations IS 'Pending invitations for new users';
COMMENT ON COLUMN user_invitations.invitation_token IS 'Unique token for accepting invitation';
COMMENT ON COLUMN user_invitations.invited_role IS 'System role being granted';
COMMENT ON COLUMN user_invitations.project_role IS 'Project role if invitation is project-specific';

-- ============================================================================
-- Indexes
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_user_profiles_email
ON user_profiles(email);

CREATE INDEX IF NOT EXISTS idx_user_profiles_auth_user
ON user_profiles(auth_user_id)
WHERE auth_user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_user_profiles_system_role
ON user_profiles(system_role);

CREATE INDEX IF NOT EXISTS idx_project_members_proposal
ON project_members(proposal_id);

CREATE INDEX IF NOT EXISTS idx_project_members_user
ON project_members(user_profile_id);

CREATE INDEX IF NOT EXISTS idx_user_invitations_email
ON user_invitations(email);

CREATE INDEX IF NOT EXISTS idx_user_invitations_token
ON user_invitations(invitation_token);

CREATE INDEX IF NOT EXISTS idx_user_invitations_pending
ON user_invitations(expires_at)
WHERE accepted_at IS NULL;
