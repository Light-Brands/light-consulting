/**
 * Milestone Update API Route
 * Light Brand Consulting
 *
 * PUT /api/milestones/[id] - Update milestone (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { Milestone, MilestoneUpdate } from '@/types/proposals';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/milestones/[id]
 * Update milestone (admin only)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

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

    const body = await request.json();
    const updateData: MilestoneUpdate = {};

    // Only include fields that are provided
    const allowedFields: (keyof MilestoneUpdate)[] = [
      'milestone_name',
      'description',
      'amount',
      'due_date',
      'payment_status',
      'milestone_status',
      'invoice_number',
      'paid_at',
      'sort_order',
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        (updateData as Record<string, unknown>)[field] = body[field];
      }
    });

    // Auto-set paid_at when marking as paid
    if (body.payment_status === 'paid' && !body.paid_at) {
      updateData.paid_at = new Date().toISOString();
    }

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      const mockMilestone: Milestone = {
        id,
        proposal_id: '1',
        phase_id: null,
        milestone_name: updateData.milestone_name || 'Project Kickoff',
        description: updateData.description || null,
        amount: updateData.amount || 25000,
        due_date: updateData.due_date || null,
        payment_status: updateData.payment_status || 'pending',
        milestone_status: updateData.milestone_status || 'not_started',
        invoice_number: updateData.invoice_number || null,
        paid_at: updateData.paid_at || null,
        sort_order: updateData.sort_order || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockMilestone, error: null });
    }

    const { data, error } = await supabaseAdmin
      .from('milestones')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating milestone:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update milestone' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PUT /api/milestones/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/milestones/[id]
 * Get milestone details (admin only)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

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

    // If Supabase is not configured, return mock
    if (!isSupabaseConfigured()) {
      const mockMilestone: Milestone = {
        id,
        proposal_id: '1',
        phase_id: null,
        milestone_name: 'Project Kickoff',
        description: 'Initial payment to begin the project',
        amount: 25000,
        due_date: '2024-02-01',
        payment_status: 'pending',
        milestone_status: 'not_started',
        invoice_number: null,
        paid_at: null,
        sort_order: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockMilestone, error: null });
    }

    const { data, error } = await supabaseAdmin
      .from('milestones')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching milestone:', error);
      return NextResponse.json(
        { data: null, error: 'Milestone not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/milestones/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
