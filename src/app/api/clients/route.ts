/**
 * Clients API Route
 * Light Brand Consulting
 *
 * GET /api/clients - List all clients
 * POST /api/clients - Create new client
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type {
  Client,
  ClientInsert,
  ClientsApiResponse,
} from '@/types/clients';

/**
 * GET /api/clients
 * List all clients with optional filtering
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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    const withStats = searchParams.get('withStats') === 'true';

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: [],
        error: null,
        count: 0,
      });
    }

    // Base query
    let query = supabaseAdmin
      .from('clients')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Apply filters
    if (status) {
      const statusValues = status.split(',').map(s => s.trim()).filter(Boolean);
      if (statusValues.length === 1) {
        query = query.eq('status', statusValues[0]);
      } else if (statusValues.length > 1) {
        query = query.in('status', statusValues);
      }
    }

    if (search) {
      query = query.or(
        `client_name.ilike.%${search}%,client_email.ilike.%${search}%,client_company.ilike.%${search}%`
      );
    }

    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching clients:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch clients' },
        { status: 500 }
      );
    }

    // If withStats, fetch additional stats for each client
    let clientsData = data as Client[];

    if (withStats && clientsData.length > 0) {
      const clientIds = clientsData.map(c => c.id);

      // Get project counts
      const { data: projectCounts } = await supabaseAdmin
        .from('client_projects')
        .select('client_id')
        .in('client_id', clientIds);

      // Get proposal counts and values
      const { data: proposalStats } = await supabaseAdmin
        .from('proposals')
        .select('client_id, final_amount')
        .in('client_id', clientIds);

      // Build stats map
      const projectCountMap = new Map<string, number>();
      const proposalCountMap = new Map<string, number>();
      const valueMap = new Map<string, number>();

      projectCounts?.forEach(p => {
        projectCountMap.set(p.client_id, (projectCountMap.get(p.client_id) || 0) + 1);
      });

      proposalStats?.forEach(p => {
        if (p.client_id) {
          proposalCountMap.set(p.client_id, (proposalCountMap.get(p.client_id) || 0) + 1);
          valueMap.set(p.client_id, (valueMap.get(p.client_id) || 0) + (p.final_amount || 0));
        }
      });

      // Augment clients with stats
      clientsData = clientsData.map(client => ({
        ...client,
        project_count: projectCountMap.get(client.id) || 0,
        proposal_count: proposalCountMap.get(client.id) || 0,
        total_value: valueMap.get(client.id) || 0,
      }));
    }

    const response: ClientsApiResponse = {
      data: clientsData,
      error: null,
      count: count || 0,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/clients:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/clients
 * Create a new client
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

    // Validate required fields
    const { client_name, client_email } = body;

    if (!client_name || !client_email) {
      return NextResponse.json(
        { data: null, error: 'Client name and email are required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      const mockClient: Client = {
        id: crypto.randomUUID(),
        client_name,
        client_email,
        client_company: body.client_company || null,
        client_phone: body.client_phone || null,
        website_url: body.website_url || null,
        logo_url: body.logo_url || null,
        industry: body.industry || null,
        notes: body.notes || null,
        status: body.status || 'active',
        metadata: body.metadata || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockClient, error: null }, { status: 201 });
    }

    const clientData: ClientInsert = {
      client_name,
      client_email: client_email.toLowerCase(),
      client_company: body.client_company || null,
      client_phone: body.client_phone || null,
      website_url: body.website_url || null,
      logo_url: body.logo_url || null,
      industry: body.industry || null,
      notes: body.notes || null,
      status: body.status || 'active',
      metadata: body.metadata || {},
    };

    const { data: client, error } = await supabaseAdmin
      .from('clients')
      .insert(clientData)
      .select()
      .single();

    if (error) {
      console.error('Error creating client:', error);
      if (error.code === '23505') {
        return NextResponse.json(
          { data: null, error: 'A client with this email already exists' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { data: null, error: 'Failed to create client' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: client, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/clients:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
