/**
 * Leads API Route
 * Light Brand Consulting
 *
 * POST /api/leads - Create new lead submission
 * GET /api/leads - List all leads (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { LeadSubmission, LeadSubmissionInsert, LeadsApiResponse } from '@/types/proposals';

// Placeholder data for development when Supabase is not configured
const placeholderLeads: LeadSubmission[] = [
  {
    id: '1',
    service: 'diagnostic',
    name: 'John Smith',
    email: 'john@example.com',
    company: 'Acme Corp',
    phone: '555-0123',
    intake_data: { challenge: 'Need help scaling operations' },
    status: 'new',
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    service: 'command-center',
    name: 'Jane Doe',
    email: 'jane@techstartup.io',
    company: 'Tech Startup',
    phone: '555-0456',
    intake_data: { challenge: 'Looking for AI automation' },
    status: 'contacted',
    notes: 'Follow up scheduled for next week',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

/**
 * POST /api/leads
 * Create a new lead submission (public endpoint for /book page)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { service, name, email, company, phone, intake_data } = body;

    if (!service || !name || !email) {
      return NextResponse.json(
        { data: null, error: 'Service, name, and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { data: null, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate service type
    const validServices = ['diagnostic', 'command-center', 'authority-engine', 'ascension'];
    if (!validServices.includes(service)) {
      return NextResponse.json(
        { data: null, error: 'Invalid service type' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      const mockLead: LeadSubmission = {
        id: crypto.randomUUID(),
        service,
        name,
        email,
        company: company || null,
        phone: phone || null,
        intake_data: intake_data || null,
        status: 'new',
        notes: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockLead, error: null }, { status: 201 });
    }

    // Create lead in database
    const leadData: LeadSubmissionInsert = {
      service,
      name,
      email,
      company: company || null,
      phone: phone || null,
      intake_data: intake_data || null,
      status: 'new',
    };

    const { data, error } = await supabaseAdmin
      .from('lead_submissions')
      .insert(leadData)
      .select()
      .single();

    if (error) {
      console.error('Error creating lead:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create lead submission' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/leads:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/leads
 * List all leads (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    const isDevelopment = process.env.NODE_ENV === 'development';
    const bypassAuth = process.env.DISABLE_ADMIN_AUTH === 'true' || isDevelopment;

    if (!bypassAuth && !session) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const service = searchParams.get('service');
    const limit = searchParams.get('limit');

    // If Supabase is not configured, return placeholder data
    if (!isSupabaseConfigured()) {
      let filteredLeads = [...placeholderLeads];

      if (status) {
        filteredLeads = filteredLeads.filter((l) => l.status === status);
      }
      if (service) {
        filteredLeads = filteredLeads.filter((l) => l.service === service);
      }
      if (limit) {
        filteredLeads = filteredLeads.slice(0, parseInt(limit, 10));
      }

      const response: LeadsApiResponse = {
        data: filteredLeads,
        error: null,
        count: filteredLeads.length,
      };
      return NextResponse.json(response);
    }

    // Build query
    let query = supabaseAdmin
      .from('lead_submissions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }
    if (service) {
      query = query.eq('service', service);
    }
    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    const response: LeadsApiResponse = {
      data: data as LeadSubmission[],
      error: null,
      count: count || 0,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/leads:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
