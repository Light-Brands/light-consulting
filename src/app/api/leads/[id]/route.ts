/**
 * Lead Detail API Route
 * Light Brand Consulting
 *
 * GET /api/leads/[id] - Get lead details
 * PUT /api/leads/[id] - Update lead
 * DELETE /api/leads/[id] - Delete lead
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { LeadSubmission, LeadSubmissionUpdate, LeadApiResponse } from '@/types/proposals';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/leads/[id]
 * Get lead details (admin only)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
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

    // If Supabase is not configured, return placeholder
    if (!isSupabaseConfigured()) {
      const mockLead: LeadSubmission = {
        id,
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
      };
      return NextResponse.json({ data: mockLead, error: null });
    }

    const { data, error } = await supabaseAdmin
      .from('lead_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching lead:', error);
      return NextResponse.json(
        { data: null, error: 'Lead not found' },
        { status: 404 }
      );
    }

    const response: LeadApiResponse = { data: data as LeadSubmission, error: null };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/leads/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/leads/[id]
 * Update lead (admin only)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
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
    const updateData: LeadSubmissionUpdate = {};

    // Only include fields that are provided
    if (body.service !== undefined) updateData.service = body.service;
    if (body.name !== undefined) updateData.name = body.name;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.company !== undefined) updateData.company = body.company;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.intake_data !== undefined) updateData.intake_data = body.intake_data;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.notes !== undefined) updateData.notes = body.notes;

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      const mockLead: LeadSubmission = {
        id,
        service: updateData.service || 'diagnostic',
        name: updateData.name || 'John Smith',
        email: updateData.email || 'john@example.com',
        company: updateData.company || null,
        phone: updateData.phone || null,
        intake_data: updateData.intake_data || null,
        status: updateData.status || 'new',
        notes: updateData.notes || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockLead, error: null });
    }

    const { data, error } = await supabaseAdmin
      .from('lead_submissions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating lead:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update lead' },
        { status: 500 }
      );
    }

    const response: LeadApiResponse = { data: data as LeadSubmission, error: null };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in PUT /api/leads/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/leads/[id]
 * Delete lead (admin only)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ success: true, error: null });
    }

    const { error } = await supabaseAdmin
      .from('lead_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting lead:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/leads/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
