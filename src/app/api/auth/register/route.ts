/**
 * User Registration API
 * Light Brand Consulting
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, full_name, invitation_token } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!supabaseUrl || !supabaseServiceKey) {
      // Development mode - return success
      return NextResponse.json({
        data: {
          user: {
            id: 'dev-user-' + Date.now(),
            email,
            full_name: full_name || email.split('@')[0],
          },
          message: 'Registration successful (development mode)',
        },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // If invitation token provided, validate it first
    let invitation = null;
    if (invitation_token) {
      const { data: inviteData, error: inviteError } = await supabase
        .from('user_invitations')
        .select('*')
        .eq('token', invitation_token)
        .eq('status', 'pending')
        .single();

      if (inviteError || !inviteData) {
        return NextResponse.json(
          { error: 'Invalid or expired invitation' },
          { status: 400 }
        );
      }

      // Check if invitation is expired
      if (new Date(inviteData.expires_at) < new Date()) {
        await supabase
          .from('user_invitations')
          .update({ status: 'expired' })
          .eq('id', inviteData.id);

        return NextResponse.json(
          { error: 'This invitation has expired' },
          { status: 400 }
        );
      }

      invitation = inviteData;
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: full_name || invitation?.metadata?.full_name || email.split('@')[0],
      },
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 400 }
        );
      }
      throw authError;
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        full_name: full_name || invitation?.metadata?.full_name || email.split('@')[0],
        system_role: invitation?.role || 'client',
      });

    if (profileError) {
      console.error('Error creating user profile:', profileError);
    }

    // If invitation, update its status and add user to project
    if (invitation) {
      // Update invitation status
      await supabase
        .from('user_invitations')
        .update({
          status: 'accepted',
          accepted_at: new Date().toISOString(),
        })
        .eq('id', invitation.id);

      // Add user to project if project_id is specified
      if (invitation.project_id) {
        await supabase.from('project_members').insert({
          project_id: invitation.project_id,
          user_id: authData.user.id,
          role: invitation.project_role || 'viewer',
          invited_by: invitation.invited_by,
        });
      }
    }

    return NextResponse.json({
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          full_name: full_name || email.split('@')[0],
        },
        message: 'Registration successful',
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
