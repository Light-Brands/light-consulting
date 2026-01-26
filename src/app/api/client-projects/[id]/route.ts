/**
 * Client Project Detail API Route
 * Light Brand Consulting
 *
 * GET /api/client-projects/[id] - Get project by ID
 * PUT /api/client-projects/[id] - Update project
 * DELETE /api/client-projects/[id] - Delete project
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type {
  ClientProject,
  ClientProjectUpdate,
  ClientProjectApiResponse,
  ClientProjectWithDetails,
} from '@/types/client-projects';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/client-projects/[id]
 * Get a project by ID with optional details
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Project not found' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const withDetails = searchParams.get('withDetails') === 'true';

    // Fetch project with client
    const { data: project, error } = await supabaseAdmin
      .from('client_projects')
      .select(`
        *,
        client:clients(*)
      `)
      .eq('id', id)
      .single();

    if (error || !project) {
      return NextResponse.json(
        { data: null, error: 'Project not found' },
        { status: 404 }
      );
    }

    if (withDetails) {
      // Fetch proposals for this project
      const { data: proposals } = await supabaseAdmin
        .from('proposals')
        .select('*')
        .eq('project_id', id)
        .order('created_at', { ascending: false });

      // Calculate stats
      const proposalCount = proposals?.length || 0;
      const totalValue = proposals?.reduce((sum, p) => sum + (p.final_amount || 0), 0) || 0;
      const avgProgress = proposals?.length
        ? proposals.reduce((sum, p) => sum + (p.progress_percentage || 0), 0) / proposals.length
        : 0;

      // Fetch total paid
      const { data: milestones } = await supabaseAdmin
        .from('milestones')
        .select('amount, payment_status, proposal_id')
        .in('proposal_id', proposals?.map(p => p.id) || []);

      const totalPaid = milestones?.filter(m => m.payment_status === 'paid')
        .reduce((sum, m) => sum + (m.amount || 0), 0) || 0;

      const projectWithDetails: ClientProjectWithDetails = {
        ...project,
        client: project.client,
        proposals: proposals || [],
        proposal_count: proposalCount,
        total_value: totalValue,
        total_paid: totalPaid,
        progress_percentage: Math.round(avgProgress),
      };

      return NextResponse.json({ data: projectWithDetails, error: null });
    }

    const response: ClientProjectApiResponse = {
      data: project as ClientProject,
      error: null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/client-projects/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/client-projects/[id]
 * Update a project
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: ClientProjectUpdate = {};

    if (body.project_name !== undefined) updateData.project_name = body.project_name;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.start_date !== undefined) updateData.start_date = body.start_date;
    if (body.end_date !== undefined) updateData.end_date = body.end_date;
    if (body.metadata !== undefined) updateData.metadata = body.metadata;

    const { data: project, error } = await supabaseAdmin
      .from('client_projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { data: null, error: 'Project not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { data: null, error: 'Failed to update project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: project, error: null });
  } catch (error) {
    console.error('Error in PUT /api/client-projects/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/client-projects/[id]
 * Delete a project (cascades to proposals via ON DELETE SET NULL)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Project not found' },
        { status: 404 }
      );
    }

    const { error } = await supabaseAdmin
      .from('client_projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to delete project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { id }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/client-projects/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
