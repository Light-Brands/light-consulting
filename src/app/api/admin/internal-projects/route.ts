/**
 * Internal Projects API Route
 * Light Brand Consulting
 *
 * GET /api/admin/internal-projects - List internal projects
 * POST /api/admin/internal-projects - Create internal project
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { InternalProjectInsert } from '@/types/projects';

/**
 * GET /api/admin/internal-projects
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
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    let query = supabaseAdmin
      .from('internal_projects')
      .select(`
        *,
        lead:lead_id (
          id,
          full_name,
          email,
          avatar_url
        )
      `)
      .order('priority', { ascending: false })
      .order('updated_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching internal projects:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch internal projects' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/internal-projects:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/internal-projects
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

    const body: InternalProjectInsert = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { data: null, error: 'Project name is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('internal_projects')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('Error creating internal project:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create internal project' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/internal-projects:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
