/**
 * Promote User to Team API Route
 * Light Brand Consulting
 *
 * POST /api/admin/users/[id]/promote - Promote a user to team member
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface PromoteRequest {
  full_name: string;
  role?: 'admin' | 'team_member';
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    // Check authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body: PromoteRequest = await request.json();
    const { full_name, role = 'team_member' } = body;

    if (!full_name) {
      return NextResponse.json(
        { data: null, error: 'Full name is required' },
        { status: 400 }
      );
    }

    // Get the auth user to get their email
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (authError || !authUser.user) {
      return NextResponse.json(
        { data: null, error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user profile already exists
    const { data: existingProfile } = await supabaseAdmin
      .from('user_profiles')
      .select('id, system_role')
      .eq('auth_user_id', userId)
      .single();

    if (existingProfile) {
      // Update existing profile to team member
      const { data, error } = await supabaseAdmin
        .from('user_profiles')
        .update({
          system_role: role,
          full_name,
          is_active: true,
        })
        .eq('auth_user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json(
          { data: null, error: 'Failed to update user profile' },
          { status: 500 }
        );
      }

      return NextResponse.json({ data, error: null });
    }

    // Create new user profile as team member
    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .insert({
        auth_user_id: userId,
        email: authUser.user.email,
        full_name,
        system_role: role,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user profile:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create user profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/users/[id]/promote:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
