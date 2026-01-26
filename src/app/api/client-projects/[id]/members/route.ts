/**
 * Project Members API Route
 * Light Brand Consulting
 *
 * GET /api/client-projects/[id]/members - List project members
 * POST /api/client-projects/[id]/members - Add member to project
 * DELETE /api/client-projects/[id]/members - Remove member from project
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type {
  ProjectMember,
  ProjectMemberInsert,
  ProjectMembersApiResponse,
} from '@/types/client-projects';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/client-projects/[id]/members
 * List all members for a project
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: projectId } = await params;
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: [],
        error: null,
      });
    }

    // Fetch members with user profile info
    const { data: members, error } = await supabaseAdmin
      .from('project_members')
      .select(`
        *,
        user_profile:user_profiles(email, full_name)
      `)
      .eq('client_project_id', projectId)
      .order('added_at', { ascending: false });

    if (error) {
      console.error('Error fetching project members:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch members' },
        { status: 500 }
      );
    }

    // Transform to include user info at top level
    const membersWithInfo: ProjectMember[] = members.map(m => ({
      id: m.id,
      proposal_id: m.proposal_id,
      client_project_id: m.client_project_id,
      user_profile_id: m.user_profile_id,
      project_role: m.project_role,
      can_edit: m.can_edit,
      can_view_financials: m.can_view_financials,
      can_manage_team: m.can_manage_team,
      added_by: m.added_by,
      added_at: m.added_at,
      user_email: m.user_profile?.email,
      user_name: m.user_profile?.full_name,
    }));

    const response: ProjectMembersApiResponse = {
      data: membersWithInfo,
      error: null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/client-projects/[id]/members:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/client-projects/[id]/members
 * Add a member to the project
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: projectId } = await params;
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const { user_profile_id } = body;

    if (!user_profile_id) {
      return NextResponse.json(
        { data: null, error: 'User profile ID is required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      const mockMember: ProjectMember = {
        id: crypto.randomUUID(),
        proposal_id: null,
        client_project_id: projectId,
        user_profile_id,
        project_role: body.project_role || 'member',
        can_edit: body.can_edit || false,
        can_view_financials: body.can_view_financials || false,
        can_manage_team: body.can_manage_team || false,
        added_by: body.added_by || null,
        added_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockMember, error: null }, { status: 201 });
    }

    // Verify project exists
    const { data: project, error: projectError } = await supabaseAdmin
      .from('client_projects')
      .select('id')
      .eq('id', projectId)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { data: null, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Check if member already exists
    const { data: existing } = await supabaseAdmin
      .from('project_members')
      .select('id')
      .eq('client_project_id', projectId)
      .eq('user_profile_id', user_profile_id)
      .single();

    if (existing) {
      return NextResponse.json(
        { data: null, error: 'User is already a member of this project' },
        { status: 409 }
      );
    }

    const memberData: ProjectMemberInsert = {
      client_project_id: projectId,
      user_profile_id,
      project_role: body.project_role || 'member',
      can_edit: body.can_edit || false,
      can_view_financials: body.can_view_financials || false,
      can_manage_team: body.can_manage_team || false,
      added_by: body.added_by || null,
    };

    const { data: member, error } = await supabaseAdmin
      .from('project_members')
      .insert(memberData)
      .select(`
        *,
        user_profile:user_profiles(email, full_name)
      `)
      .single();

    if (error) {
      console.error('Error adding project member:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to add member' },
        { status: 500 }
      );
    }

    const memberWithInfo: ProjectMember = {
      ...member,
      user_email: member.user_profile?.email,
      user_name: member.user_profile?.full_name,
    };

    return NextResponse.json({ data: memberWithInfo, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/client-projects/[id]/members:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/client-projects/[id]/members
 * Remove a member from the project
 * Query param: user_profile_id
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: projectId } = await params;
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userProfileId = searchParams.get('user_profile_id');

    if (!userProfileId) {
      return NextResponse.json(
        { data: null, error: 'user_profile_id query parameter is required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ data: { success: true }, error: null });
    }

    const { error } = await supabaseAdmin
      .from('project_members')
      .delete()
      .eq('client_project_id', projectId)
      .eq('user_profile_id', userProfileId);

    if (error) {
      console.error('Error removing project member:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to remove member' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { success: true }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/client-projects/[id]/members:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
