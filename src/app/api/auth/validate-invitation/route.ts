/**
 * Validate Invitation Token API
 * Light Brand Consulting
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!supabaseUrl || !supabaseServiceKey) {
      // Development mode - return mock valid invitation
      return NextResponse.json({
        data: {
          valid: true,
          invitation: {
            id: 'dev-invite-1',
            email: 'client@example.com',
            role: 'client',
            project_id: 'dev-project-1',
            project_name: 'Sample Project',
            invited_by_name: 'Admin User',
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
        },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch invitation with project details
    const { data: invitation, error } = await supabase
      .from('user_invitations')
      .select(`
        *,
        project:proposals(id, project_name),
        invited_by_user:user_profiles!user_invitations_invited_by_fkey(full_name)
      `)
      .eq('token', token)
      .single();

    if (error || !invitation) {
      return NextResponse.json({
        data: {
          valid: false,
          reason: 'Invitation not found',
        },
      });
    }

    // Check if already used
    if (invitation.status !== 'pending') {
      return NextResponse.json({
        data: {
          valid: false,
          reason: invitation.status === 'accepted'
            ? 'This invitation has already been used'
            : 'This invitation has expired',
        },
      });
    }

    // Check if expired
    if (new Date(invitation.expires_at) < new Date()) {
      // Update status to expired
      await supabase
        .from('user_invitations')
        .update({ status: 'expired' })
        .eq('id', invitation.id);

      return NextResponse.json({
        data: {
          valid: false,
          reason: 'This invitation has expired',
        },
      });
    }

    return NextResponse.json({
      data: {
        valid: true,
        invitation: {
          id: invitation.id,
          email: invitation.email,
          role: invitation.role,
          project_id: invitation.project_id,
          project_name: invitation.project?.project_name || null,
          invited_by_name: invitation.invited_by_user?.full_name || 'Light Brand Team',
          expires_at: invitation.expires_at,
          metadata: invitation.metadata,
        },
      },
    });
  } catch (error) {
    console.error('Validate invitation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate invitation' },
      { status: 500 }
    );
  }
}
