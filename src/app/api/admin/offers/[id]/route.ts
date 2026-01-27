/**
 * Individual Offer API Route
 * Light Brand Consulting
 *
 * GET /api/admin/offers/[id] - Get offer by ID
 * PUT /api/admin/offers/[id] - Update offer
 * DELETE /api/admin/offers/[id] - Delete offer
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { Offer } from '@/types/offers';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/offers/[id]
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
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('offers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json(
        { data: null, error: 'Offer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: data as Offer, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/offers/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/offers/[id]
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

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.description !== undefined) updateData.description = body.description || null;
    if (body.tier !== undefined) updateData.tier = body.tier;
    if (body.tier_label !== undefined) updateData.tier_label = body.tier_label || null;
    if (body.target_audience !== undefined) updateData.target_audience = body.target_audience || null;
    if (body.qualifying_criteria !== undefined) updateData.qualifying_criteria = body.qualifying_criteria || null;
    if (body.price_range !== undefined) updateData.price_range = body.price_range || null;
    if (body.deliverables !== undefined) updateData.deliverables = body.deliverables;
    if (body.funnel_route !== undefined) updateData.funnel_route = body.funnel_route || null;
    if (body.is_active !== undefined) updateData.is_active = body.is_active;
    if (body.is_invite_only !== undefined) updateData.is_invite_only = body.is_invite_only;
    if (body.sort_order !== undefined) updateData.sort_order = body.sort_order;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { data: null, error: 'No update data provided' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('offers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating offer:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { data: null, error: 'Offer not found' },
          { status: 404 }
        );
      }
      if (error.code === '23505') {
        return NextResponse.json(
          { data: null, error: 'An offer with this slug already exists' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { data: null, error: `Failed to update offer: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as Offer, error: null });
  } catch (error) {
    console.error('Error in PUT /api/admin/offers/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/offers/[id]
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
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { error } = await supabaseAdmin
      .from('offers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting offer:', error);
      return NextResponse.json(
        { data: null, error: `Failed to delete offer: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { id }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/offers/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
