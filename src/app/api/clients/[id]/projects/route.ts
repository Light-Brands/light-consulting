/**
 * Client Projects API Route
 * Light Brand Consulting
 *
 * GET /api/clients/[id]/projects - List projects for a client
 * POST /api/clients/[id]/projects - Create new project for client
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type {
  ClientProject,
  ClientProjectInsert,
  ClientProjectsApiResponse,
} from '@/types/client-projects';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/clients/[id]/projects
 * List all projects for a client
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: clientId } = await params;
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: [],
        error: null,
        count: 0,
      });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const withProposals = searchParams.get('withProposals') === 'true';

    // Fetch projects
    let query = supabaseAdmin
      .from('client_projects')
      .select('*', { count: 'exact' })
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (status) {
      const statusValues = status.split(',').map(s => s.trim()).filter(Boolean);
      if (statusValues.length === 1) {
        query = query.eq('status', statusValues[0]);
      } else if (statusValues.length > 1) {
        query = query.in('status', statusValues);
      }
    }

    const { data: projects, error, count } = await query;

    if (error) {
      console.error('Error fetching client projects:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    let projectsData = projects as ClientProject[];

    // If withProposals, fetch proposal counts and values
    if (withProposals && projectsData.length > 0) {
      const projectIds = projectsData.map(p => p.id);

      const { data: proposals } = await supabaseAdmin
        .from('proposals')
        .select('project_id, final_amount, status')
        .in('project_id', projectIds);

      // Build stats map
      const proposalCountMap = new Map<string, number>();
      const activeProposalMap = new Map<string, number>();
      const valueMap = new Map<string, number>();

      proposals?.forEach(p => {
        if (p.project_id) {
          proposalCountMap.set(p.project_id, (proposalCountMap.get(p.project_id) || 0) + 1);
          valueMap.set(p.project_id, (valueMap.get(p.project_id) || 0) + (p.final_amount || 0));
          if (p.status === 'active' || p.status === 'agreement_signed') {
            activeProposalMap.set(p.project_id, (activeProposalMap.get(p.project_id) || 0) + 1);
          }
        }
      });

      // Augment projects with stats
      projectsData = projectsData.map(project => ({
        ...project,
        proposal_count: proposalCountMap.get(project.id) || 0,
        active_proposals: activeProposalMap.get(project.id) || 0,
        total_value: valueMap.get(project.id) || 0,
      }));
    }

    const response: ClientProjectsApiResponse = {
      data: projectsData,
      error: null,
      count: count || 0,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/clients/[id]/projects:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/clients/[id]/projects
 * Create a new project for a client
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: clientId } = await params;
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const { project_name } = body;

    if (!project_name) {
      return NextResponse.json(
        { data: null, error: 'Project name is required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      const mockProject: ClientProject = {
        id: crypto.randomUUID(),
        client_id: clientId,
        project_name,
        description: body.description || null,
        status: body.status || 'active',
        start_date: body.start_date || null,
        end_date: body.end_date || null,
        metadata: body.metadata || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockProject, error: null }, { status: 201 });
    }

    // Verify client exists
    const { data: client, error: clientError } = await supabaseAdmin
      .from('clients')
      .select('id')
      .eq('id', clientId)
      .single();

    if (clientError || !client) {
      return NextResponse.json(
        { data: null, error: 'Client not found' },
        { status: 404 }
      );
    }

    const projectData: ClientProjectInsert = {
      client_id: clientId,
      project_name,
      description: body.description || null,
      status: body.status || 'active',
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      metadata: body.metadata || {},
    };

    const { data: project, error } = await supabaseAdmin
      .from('client_projects')
      .insert(projectData)
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: project, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/clients/[id]/projects:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
