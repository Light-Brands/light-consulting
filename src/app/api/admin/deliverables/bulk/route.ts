/**
 * Deliverables Bulk API Route
 * Light Brand Consulting
 *
 * POST /api/admin/deliverables/bulk - Create multiple deliverables
 * PATCH /api/admin/deliverables/bulk - Update sort_order for multiple deliverables
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { DeliverableInsert } from '@/types/deliverables';

/**
 * POST /api/admin/deliverables/bulk
 * Create multiple deliverables at once
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

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body: { deliverables: DeliverableInsert[] } = await request.json();

    if (!body.deliverables || !Array.isArray(body.deliverables) || body.deliverables.length === 0) {
      return NextResponse.json(
        { data: null, error: 'deliverables array is required' },
        { status: 400 }
      );
    }

    // Validate all deliverables have required fields
    for (const d of body.deliverables) {
      if (!d.proposal_id || !d.name) {
        return NextResponse.json(
          { data: null, error: 'All deliverables must have proposal_id and name' },
          { status: 400 }
        );
      }
    }

    // Get max sort_order for each unique proposal_id
    const proposalIds = [...new Set(body.deliverables.map(d => d.proposal_id))];
    const sortOrderMap: Record<string, number> = {};

    for (const proposalId of proposalIds) {
      const { data: maxSortData } = await supabaseAdmin
        .from('deliverables')
        .select('sort_order')
        .eq('proposal_id', proposalId)
        .order('sort_order', { ascending: false })
        .limit(1);

      sortOrderMap[proposalId] = maxSortData && maxSortData.length > 0
        ? (maxSortData[0].sort_order || 0) + 1
        : 0;
    }

    // Prepare insert data with auto-incrementing sort_order per proposal
    const insertData = body.deliverables.map((d, index) => ({
      ...d,
      sort_order: d.sort_order ?? sortOrderMap[d.proposal_id]++,
      status: d.status || 'pending',
      priority: d.priority || 'medium',
    }));

    const { data, error } = await supabaseAdmin
      .from('deliverables')
      .insert(insertData)
      .select();

    if (error) {
      console.error('Error creating deliverables:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create deliverables' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null, count: data?.length || 0 }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/deliverables/bulk:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/deliverables/bulk
 * Update sort_order for multiple deliverables (for drag reorder)
 */
export async function PATCH(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body: { updates: { id: string; sort_order: number; status?: string }[] } = await request.json();

    if (!body.updates || !Array.isArray(body.updates) || body.updates.length === 0) {
      return NextResponse.json(
        { data: null, error: 'updates array is required' },
        { status: 400 }
      );
    }

    // Perform updates in a transaction-like manner
    const results = [];
    const errors = [];

    for (const update of body.updates) {
      if (!update.id) {
        errors.push({ id: update.id, error: 'Missing id' });
        continue;
      }

      const updateData: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };

      if (update.sort_order !== undefined) {
        updateData.sort_order = update.sort_order;
      }

      if (update.status !== undefined) {
        updateData.status = update.status;
        // Auto-set completed_at when status changes to completed
        if (update.status === 'completed') {
          updateData.completed_at = new Date().toISOString();
        } else {
          updateData.completed_at = null;
        }
      }

      const { data, error } = await supabaseAdmin
        .from('deliverables')
        .update(updateData)
        .eq('id', update.id)
        .select()
        .single();

      if (error) {
        errors.push({ id: update.id, error: error.message });
      } else {
        results.push(data);
      }
    }

    if (errors.length > 0 && results.length === 0) {
      return NextResponse.json(
        { data: null, error: 'Failed to update deliverables', details: errors },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: results,
      error: errors.length > 0 ? 'Some updates failed' : null,
      errors: errors.length > 0 ? errors : undefined,
      updated: results.length,
    });
  } catch (error) {
    console.error('Error in PATCH /api/admin/deliverables/bulk:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
