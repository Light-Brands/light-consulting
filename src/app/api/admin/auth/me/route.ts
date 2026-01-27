/**
 * Current User Auth Info API
 * Light Brand Consulting
 *
 * GET /api/admin/auth/me - Get current user's auth and team status
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifySupabaseAuth } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // If Supabase is not configured, return dev mode response
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: {
          user: null,
          isTeamMember: true, // Allow access in dev mode
          teamRole: 'admin',
          teamName: 'Development User',
        },
        error: null,
      });
    }

    // Verify the auth token
    const user = await verifySupabaseAuth(request);

    if (!user) {
      return NextResponse.json(
        { data: null, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Check if user has a team profile
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('id, full_name, system_role, is_active')
      .eq('auth_user_id', user.id)
      .single();

    const isTeamMember = profile
      ? ['admin', 'team_member'].includes(profile.system_role) && profile.is_active
      : false;

    return NextResponse.json({
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        isTeamMember,
        teamRole: profile?.system_role || null,
        teamName: profile?.full_name || null,
      },
      error: null,
    });
  } catch (error) {
    console.error('Error in GET /api/admin/auth/me:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
