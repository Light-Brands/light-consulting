/**
 * Offers API Route
 * Light Brand Consulting
 *
 * GET /api/admin/offers - List all offers
 * POST /api/admin/offers - Create an offer
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { Offer } from '@/types/offers';

/**
 * GET /api/admin/offers
 * List all offers ordered by tier/sort_order
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
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('include_inactive') === 'true';

    let query = supabaseAdmin
      .from('offers')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('tier', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching offers:', error);
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({ data: [], error: null });
      }
      return NextResponse.json(
        { data: null, error: `Failed to fetch offers: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as Offer[], error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/offers:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/offers
 * Create a new offer
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

    const body = await request.json();
    const {
      name,
      slug,
      description,
      tier,
      tier_label,
      target_audience,
      qualifying_criteria,
      price_range,
      deliverables,
      funnel_route,
      is_invite_only,
      sort_order,
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { data: null, error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    const insertData = {
      name,
      slug,
      description: description || null,
      tier: tier || 1,
      tier_label: tier_label || null,
      target_audience: target_audience || null,
      qualifying_criteria: qualifying_criteria || null,
      price_range: price_range || null,
      deliverables: deliverables || null,
      funnel_route: funnel_route || null,
      is_invite_only: is_invite_only || false,
      sort_order: sort_order || 0,
    };

    const { data, error } = await supabaseAdmin
      .from('offers')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating offer:', error);
      if (error.code === '23505') {
        return NextResponse.json(
          { data: null, error: 'An offer with this slug already exists' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { data: null, error: `Failed to create offer: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as Offer, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/offers:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
