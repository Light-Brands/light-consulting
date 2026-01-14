/**
 * Proposal Milestones API Route
 * Light Brand Consulting
 *
 * GET /api/proposals/[id]/milestones - Get all milestones for a proposal
 * PUT /api/proposals/[id]/milestones - Batch update/replace all milestones
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { Milestone, MilestoneInsert } from '@/types/proposals';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/proposals/[id]/milestones
 * Get all milestones for a proposal (admin only)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: proposalId } = await params;

    // Check admin authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ data: [], error: null });
    }

    const { data: milestones, error } = await supabaseAdmin
      .from('milestones')
      .select('*')
      .eq('proposal_id', proposalId)
      .order('sort_order');

    if (error) {
      console.error('Error fetching milestones:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch milestones' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: milestones, error: null });
  } catch (error) {
    console.error('Error in GET /api/proposals/[id]/milestones:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/proposals/[id]/milestones
 * Batch update all milestones - replaces existing milestones with new set (admin only)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: proposalId } = await params;

    // Check admin authentication
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { milestones } = body;

    if (!Array.isArray(milestones)) {
      return NextResponse.json(
        { data: null, error: 'Milestones array is required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      const mockMilestones: Milestone[] = milestones.map((m: Partial<Milestone>, index: number) => ({
        id: m.id || crypto.randomUUID(),
        proposal_id: proposalId,
        phase_id: m.phase_id || null,
        milestone_name: m.milestone_name || '',
        description: m.description || null,
        amount: typeof m.amount === 'string' ? parseFloat(m.amount) || 0 : m.amount || 0,
        due_date: m.due_date || null,
        payment_status: m.payment_status || 'pending',
        milestone_status: m.milestone_status || 'not_started',
        invoice_number: m.invoice_number || null,
        payment_link: m.payment_link || null,
        paid_at: m.paid_at || null,
        sort_order: m.sort_order ?? index,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      return NextResponse.json({ data: mockMilestones, error: null });
    }

    // Delete existing milestones
    const { error: deleteError } = await supabaseAdmin
      .from('milestones')
      .delete()
      .eq('proposal_id', proposalId);

    if (deleteError) {
      console.error('Error deleting existing milestones:', deleteError);
      return NextResponse.json(
        { data: null, error: 'Failed to update milestones' },
        { status: 500 }
      );
    }

    // If no milestones to add, return empty array
    if (milestones.length === 0) {
      return NextResponse.json({ data: [], error: null });
    }

    // Insert new milestones
    const milestonesData: MilestoneInsert[] = milestones
      .filter((m: Partial<Milestone>) => m.milestone_name)
      .map((m: Partial<Milestone>, index: number) => ({
        proposal_id: proposalId,
        phase_id: m.phase_id || null,
        milestone_name: m.milestone_name || '',
        description: m.description || null,
        amount: typeof m.amount === 'string' ? parseFloat(m.amount) || 0 : m.amount || 0,
        due_date: m.due_date || null,
        payment_status: m.payment_status || 'pending',
        milestone_status: m.milestone_status || 'not_started',
        invoice_number: m.invoice_number || null,
        payment_link: m.payment_link || null,
        sort_order: index,
      }));

    if (milestonesData.length === 0) {
      return NextResponse.json({ data: [], error: null });
    }

    const { data: newMilestones, error: insertError } = await supabaseAdmin
      .from('milestones')
      .insert(milestonesData)
      .select();

    if (insertError) {
      console.error('Error inserting milestones:', insertError);
      return NextResponse.json(
        { data: null, error: 'Failed to create milestones' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: newMilestones, error: null });
  } catch (error) {
    console.error('Error in PUT /api/proposals/[id]/milestones:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
