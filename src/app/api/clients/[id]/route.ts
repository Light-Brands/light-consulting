/**
 * Client Detail API Route
 * Light Brand Consulting
 *
 * GET /api/clients/[id] - Get client by ID
 * PUT /api/clients/[id] - Update client
 * DELETE /api/clients/[id] - Delete client
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { Client, ClientUpdate, ClientApiResponse, ClientWithStats } from '@/types/clients';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/clients/[id]
 * Get a client by ID with optional stats
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
        { data: null, error: 'Client not found' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const withStats = searchParams.get('withStats') === 'true';

    // Fetch client
    const { data: client, error } = await supabaseAdmin
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !client) {
      return NextResponse.json(
        { data: null, error: 'Client not found' },
        { status: 404 }
      );
    }

    if (withStats) {
      // Fetch project stats
      const { data: projects } = await supabaseAdmin
        .from('client_projects')
        .select('id, status')
        .eq('client_id', id);

      // Fetch proposal stats
      const { data: proposals } = await supabaseAdmin
        .from('proposals')
        .select('id, final_amount, status, created_at')
        .eq('client_id', id)
        .order('created_at', { ascending: false });

      // Fetch payment stats
      const { data: milestones } = await supabaseAdmin
        .from('milestones')
        .select('amount, payment_status, proposals!inner(client_id)')
        .eq('proposals.client_id', id);

      const projectCount = projects?.length || 0;
      const activeProjects = projects?.filter(p => p.status === 'active').length || 0;
      const proposalCount = proposals?.length || 0;
      const totalValue = proposals?.reduce((sum, p) => sum + (p.final_amount || 0), 0) || 0;
      const totalPaid = milestones?.filter(m => m.payment_status === 'paid')
        .reduce((sum, m) => sum + (m.amount || 0), 0) || 0;
      const lastProjectDate = proposals?.[0]?.created_at || null;

      const clientWithStats: ClientWithStats = {
        ...client,
        project_count: projectCount,
        proposal_count: proposalCount,
        active_projects: activeProjects,
        total_value: totalValue,
        total_paid: totalPaid,
        last_project_date: lastProjectDate,
      };

      return NextResponse.json({ data: clientWithStats, error: null });
    }

    const response: ClientApiResponse = {
      data: client as Client,
      error: null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/clients/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/clients/[id]
 * Update a client
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
        { data: null, error: 'Client not found' },
        { status: 404 }
      );
    }

    // Build update data, only including provided fields
    const updateData: ClientUpdate = {};

    if (body.client_name !== undefined) updateData.client_name = body.client_name;
    if (body.client_email !== undefined) updateData.client_email = body.client_email.toLowerCase();
    if (body.client_company !== undefined) updateData.client_company = body.client_company;
    if (body.client_phone !== undefined) updateData.client_phone = body.client_phone;
    if (body.website_url !== undefined) updateData.website_url = body.website_url;
    if (body.logo_url !== undefined) updateData.logo_url = body.logo_url;
    if (body.industry !== undefined) updateData.industry = body.industry;
    if (body.notes !== undefined) updateData.notes = body.notes;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.metadata !== undefined) updateData.metadata = body.metadata;

    const { data: client, error } = await supabaseAdmin
      .from('clients')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating client:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { data: null, error: 'Client not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { data: null, error: 'Failed to update client' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: client, error: null });
  } catch (error) {
    console.error('Error in PUT /api/clients/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/clients/[id]
 * Delete a client (cascades to projects and proposals)
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
        { data: null, error: 'Client not found' },
        { status: 404 }
      );
    }

    const { error } = await supabaseAdmin
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting client:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to delete client' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { id }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/clients/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
