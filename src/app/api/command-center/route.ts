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

// Placeholder data for development
const placeholderProjects = [
  {
    id: 'project-001',
    project_name: 'AI Integration Platform',
    client_name: 'Acme Corp',
    client_company: 'Acme Corporation',
    status: 'active',
    progress_percentage: 65,
    health_status: 'on_track',
    priority: 'high',
    final_amount: 45000,
    start_date: '2026-01-15',
    estimated_completion_date: '2026-03-15',
    last_activity_at: new Date().toISOString(),
    next_action: 'Review design mockups',
    next_action_due_date: '2026-01-28',
    project_category: 'client_project',
    is_on_hold: false,
    phases: [
      { id: 'p1', phase_name: 'Discovery', phase_status: 'completed' },
      { id: 'p2', phase_name: 'Design', phase_status: 'in_progress' },
      { id: 'p3', phase_name: 'Development', phase_status: 'not_started' },
    ],
    milestones: [],
  },
  {
    id: 'project-002',
    project_name: 'E-commerce Redesign',
    client_name: 'Jane Smith',
    client_company: 'StyleShop',
    status: 'active',
    progress_percentage: 30,
    health_status: 'at_risk',
    priority: 'urgent',
    final_amount: 28000,
    start_date: '2026-01-10',
    estimated_completion_date: '2026-02-28',
    last_activity_at: new Date(Date.now() - 86400000).toISOString(),
    next_action: 'Client feedback on wireframes',
    next_action_due_date: '2026-01-26',
    project_category: 'client_project',
    is_on_hold: false,
    phases: [
      { id: 'p1', phase_name: 'Research', phase_status: 'completed' },
      { id: 'p2', phase_name: 'Wireframes', phase_status: 'in_progress' },
    ],
    milestones: [],
  },
];

const placeholderStats: CommandCenterStats = {
  total_active: 2,
  on_track: 1,
  at_risk: 1,
  behind: 0,
  blocked: 0,
  on_hold: 0,
  total_value: 73000,
  urgent_count: 1,
};

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

    // If Supabase is not configured, return placeholder data
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: {
          projects: placeholderProjects,
          stats: placeholderStats,
        },
        error: null,
      });
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

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: { id: project_id, ...updates },
        error: null,
      });
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
