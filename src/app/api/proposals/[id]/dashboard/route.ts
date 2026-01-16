/**
 * Dashboard Updates API Route
 * Light Brand Consulting
 *
 * POST /api/proposals/[id]/dashboard - Create dashboard update (admin only)
 * GET /api/proposals/[id]/dashboard - Get dashboard updates
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { DashboardUpdate, DashboardUpdateInsert } from '@/types/proposals';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/proposals/[id]/dashboard
 * Create dashboard update (admin only)
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check admin authentication using Supabase
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { update_type, title, content, attachments, milestone_id } = body;

    if (!update_type || !title) {
      return NextResponse.json(
        { data: null, error: 'Update type and title are required' },
        { status: 400 }
      );
    }

    const validTypes = ['milestone_update', 'progress_update', 'comment', 'file_upload', 'status_change'];
    if (!validTypes.includes(update_type)) {
      return NextResponse.json(
        { data: null, error: 'Invalid update type' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      const mockUpdate: DashboardUpdate = {
        id: crypto.randomUUID(),
        proposal_id: id,
        milestone_id: milestone_id || null,
        update_type,
        title,
        content: content || null,
        attachments: attachments || null,
        created_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockUpdate, error: null }, { status: 201 });
    }

    const updateData: DashboardUpdateInsert = {
      proposal_id: id,
      milestone_id: milestone_id || null,
      update_type,
      title,
      content: content || null,
      attachments: attachments || null,
    };

    const { data, error } = await supabaseAdmin
      .from('dashboard_updates')
      .insert(updateData)
      .select()
      .single();

    if (error) {
      console.error('Error creating dashboard update:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create update' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/proposals/[id]/dashboard:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/proposals/[id]/dashboard
 * Get dashboard updates (admin or client via token)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const access_token = searchParams.get('access_token');

    // Check admin authentication OR access token
    const isAdmin = await isAdminAuthenticated(request);

    // If Supabase is not configured, return mock data
    if (!isSupabaseConfigured()) {
      const mockUpdates: DashboardUpdate[] = [
        {
          id: '1',
          proposal_id: id,
          milestone_id: null,
          update_type: 'progress_update',
          title: 'Project Kickoff Scheduled',
          content: 'We have scheduled the project kickoff meeting for next week.',
          attachments: null,
          created_by: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      return NextResponse.json({ data: mockUpdates, error: null });
    }

    // If not admin, verify access token
    if (!isAdmin) {
      if (!access_token) {
        return NextResponse.json(
          { data: null, error: 'Unauthorized' },
          { status: 401 }
        );
      }

      const { data: proposal, error: proposalError } = await supabaseAdmin
        .from('proposals')
        .select('access_token')
        .eq('id', id)
        .single();

      if (proposalError || !proposal || proposal.access_token !== access_token) {
        return NextResponse.json(
          { data: null, error: 'Invalid access' },
          { status: 403 }
        );
      }
    }

    const { data, error } = await supabaseAdmin
      .from('dashboard_updates')
      .select('*')
      .eq('proposal_id', id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching dashboard updates:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch updates' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/proposals/[id]/dashboard:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
