/**
 * Client Projects List API Route
 * Light Brand Consulting
 *
 * GET /api/client-projects - Get all client projects with summary data
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ClientProjectSummary, ClientProjectsApiResponse } from '@/types/client-projects';

/**
 * GET /api/client-projects
 * Get all client projects with summary data (admin only)
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

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: [],
        error: null,
        count: 0,
      });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Fetch all projects with client info, ordered by last updated
    let query = supabaseAdmin
      .from('client_projects')
      .select(`
        id,
        client_id,
        project_name,
        status,
        start_date,
        end_date,
        created_at,
        updated_at,
        client:clients(id, client_name, client_company)
      `)
      .order('updated_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: projects, error } = await query;

    if (error) {
      console.error('Error fetching client projects:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch projects' },
        { status: 500 }
      );
    }

    // Get proposal counts and values for each project
    const projectIds = projects?.map((p) => p.id) || [];

    let proposalStats: Record<string, { count: number; total_value: number; active_count: number }> = {};

    if (projectIds.length > 0) {
      const { data: proposals } = await supabaseAdmin
        .from('proposals')
        .select('project_id, final_amount, status')
        .in('project_id', projectIds);

      if (proposals) {
        proposals.forEach((p) => {
          if (!p.project_id) return;
          if (!proposalStats[p.project_id]) {
            proposalStats[p.project_id] = { count: 0, total_value: 0, active_count: 0 };
          }
          proposalStats[p.project_id].count++;
          proposalStats[p.project_id].total_value += p.final_amount || 0;
          if (p.status === 'active' || p.status === 'agreement_signed') {
            proposalStats[p.project_id].active_count++;
          }
        });
      }
    }

    // Transform to summary format
    const projectSummaries: ClientProjectSummary[] = (projects || []).map((project) => {
      const stats = proposalStats[project.id] || { count: 0, total_value: 0, active_count: 0 };
      const client = project.client as { id: string; client_name: string; client_company: string | null } | null;

      return {
        id: project.id,
        client_id: project.client_id,
        project_name: project.project_name,
        status: project.status,
        proposal_count: stats.count,
        active_proposals: stats.active_count,
        total_value: stats.total_value,
        start_date: project.start_date,
        end_date: project.end_date,
        client_name: client?.client_name,
        client_company: client?.client_company,
      };
    });

    const response: ClientProjectsApiResponse = {
      data: projectSummaries,
      error: null,
      count: projectSummaries.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/client-projects:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
