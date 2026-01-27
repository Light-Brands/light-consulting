/**
 * GitHub Organization Track Toggle API Route
 * Light Brand Consulting
 *
 * PUT /api/admin/analytics/github/orgs/[login]/track - Toggle org tracking
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface TrackRequest {
  is_tracked: boolean;
}

/**
 * PUT /api/admin/analytics/github/orgs/[login]/track
 * Toggle tracking for an organization
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ login: string }> }
) {
  try {
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
        { status: 500 }
      );
    }

    const { login } = await params;
    const body: TrackRequest = await request.json();

    if (typeof body.is_tracked !== 'boolean') {
      return NextResponse.json(
        { data: null, error: 'is_tracked must be a boolean' },
        { status: 400 }
      );
    }

    // Update the organization's tracked status
    const { data: org, error } = await supabaseAdmin
      .from('github_orgs')
      .update({ is_tracked: body.is_tracked } as never)
      .eq('login', login)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating organization:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update organization' },
        { status: 500 }
      );
    }

    if (!org) {
      return NextResponse.json(
        { data: null, error: 'Organization not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: org,
      error: null,
    });
  } catch (error) {
    console.error('Error in PUT /api/admin/analytics/github/orgs/[login]/track:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
