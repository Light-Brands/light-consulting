/**
 * Command Center API Route
 * Light Brand Consulting
 *
 * GET /api/command-center - Aggregated project view with stats
 * POST /api/command-center/quick-update - Quick status updates
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { Proposal, ProposalPhase, Milestone } from '@/types/proposals';
import type { CommandCenterStats } from '@/types/projects';


/**
 * GET /api/command-center
 * Get aggregated project view with stats
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const healthStatus = searchParams.get('health_status');
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');
    const includeOnHold = searchParams.get('include_on_hold') === 'true';

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    // Build query for active projects (proposals with status 'active' or 'agreement_signed')
    let query = supabaseAdmin
      .from('proposals')
      .select(`
        *,
        proposal_phases (
          id,
          phase_number,
          phase_name,
          phase_status,
          start_date,
          end_date,
          actual_start_date,
          actual_end_date,
          completed_at
        ),
        milestones (
          id,
          milestone_name,
          amount,
          due_date,
          payment_status,
          milestone_status
        )
      `)
      .in('status', ['active', 'agreement_signed'])
      .order('priority', { ascending: false })
      .order('last_activity_at', { ascending: false, nullsFirst: false });

    // Apply filters
    if (healthStatus) {
      query = query.eq('health_status', healthStatus);
    }
    if (priority) {
      query = query.eq('priority', priority);
    }
    if (category) {
      query = query.eq('project_category', category);
    }
    if (!includeOnHold) {
      query = query.eq('is_on_hold', false);
    }

    const { data: projects, error: projectsError } = await query;

    if (projectsError) {
      console.error('Error fetching projects:', projectsError);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    // Calculate stats
    const allProjects = projects || [];
    const stats: CommandCenterStats = {
      total_active: allProjects.filter(p => !p.is_on_hold).length,
      on_track: allProjects.filter(p => p.health_status === 'on_track' && !p.is_on_hold).length,
      at_risk: allProjects.filter(p => p.health_status === 'at_risk' && !p.is_on_hold).length,
      behind: allProjects.filter(p => p.health_status === 'behind' && !p.is_on_hold).length,
      blocked: allProjects.filter(p => p.health_status === 'blocked' && !p.is_on_hold).length,
      on_hold: allProjects.filter(p => p.is_on_hold).length,
      total_value: allProjects.reduce((sum, p) => sum + (p.final_amount || 0), 0),
      urgent_count: allProjects.filter(p => p.priority === 'urgent' && !p.is_on_hold).length,
    };

    return NextResponse.json({
      data: {
        projects,
        stats,
      },
      error: null,
    });
  } catch (error) {
    console.error('Error in GET /api/command-center:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/command-center/quick-update
 * Quick status updates without navigation
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
    const { project_id, updates } = body;

    if (!project_id) {
      return NextResponse.json(
        { data: null, error: 'Project ID is required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    // Build update object with allowed fields
    const allowedFields = [
      'progress_percentage',
      'health_status',
      'priority',
      'next_action',
      'next_action_due_date',
      'is_on_hold',
      'on_hold_reason',
      'on_hold_since',
    ];

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
      last_activity_at: new Date().toISOString(),
    };

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    }

    const { data, error } = await supabaseAdmin
      .from('proposals')
      .update(updateData)
      .eq('id', project_id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in POST /api/command-center:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
