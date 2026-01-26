/**
 * Team API Route
 * Light Brand Consulting
 *
 * GET /api/admin/team - List team members
 * POST /api/admin/team - Invite team member
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { UserProfile } from '@/types/users';

// Placeholder data for development
const placeholderTeam: UserProfile[] = [
  {
    id: 'user-001',
    auth_user_id: null,
    email: 'john@lightbrand.co',
    full_name: 'John Smith',
    avatar_url: null,
    phone: null,
    timezone: 'America/New_York',
    system_role: 'admin',
    is_active: true,
    last_login_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-002',
    auth_user_id: null,
    email: 'jane@lightbrand.co',
    full_name: 'Jane Doe',
    avatar_url: null,
    phone: null,
    timezone: 'America/Los_Angeles',
    system_role: 'team_member',
    is_active: true,
    last_login_at: new Date(Date.now() - 86400000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

/**
 * GET /api/admin/team
 * List team members
 */
export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const includeInactive = searchParams.get('include_inactive') === 'true';

    if (!isSupabaseConfigured()) {
      let filtered = [...placeholderTeam];
      if (role) {
        filtered = filtered.filter((u) => u.system_role === role);
      }
      if (!includeInactive) {
        filtered = filtered.filter((u) => u.is_active);
      }
      return NextResponse.json({ data: filtered, error: null });
    }

    let query = supabaseAdmin
      .from('user_profiles')
      .select('*')
      .in('system_role', ['admin', 'team_member'])
      .order('full_name');

    if (role) {
      query = query.eq('system_role', role);
    }
    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching team:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch team' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/team:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/team
 * Invite team member
 */
export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { email, full_name, role = 'team_member' } = body;

    if (!email) {
      return NextResponse.json(
        { data: null, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      const mockInvitation = {
        id: crypto.randomUUID(),
        email,
        full_name,
        invited_role: role,
        invitation_token: crypto.randomUUID(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockInvitation, error: null }, { status: 201 });
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('user_profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { data: null, error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create invitation
    const invitationToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabaseAdmin
      .from('user_invitations')
      .insert({
        email,
        full_name,
        invited_role: role,
        invitation_token: invitationToken,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating invitation:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create invitation' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/team:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
