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
import type { InternalProject, InternalProjectInsert } from '@/types/projects';

// Placeholder data
const placeholderProjects: InternalProject[] = [
  {
    id: 'internal-001',
    name: 'AI Assistant Platform',
    description: 'Building an internal AI assistant for client communications',
    category: 'product',
    status: 'active',
    priority: 'high',
    progress_percentage: 45,
    start_date: '2026-01-01',
    target_date: '2026-03-31',
    completed_at: null,
    lead_id: 'user-001',
    tags: ['AI', 'automation'],
    repository_url: 'https://github.com/company/ai-assistant',
    documentation_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'internal-002',
    name: 'Design System',
    description: 'Unified component library',
    category: 'tooling',
    status: 'active',
    priority: 'medium',
    progress_percentage: 70,
    start_date: '2025-12-01',
    target_date: '2026-02-28',
    completed_at: null,
    lead_id: 'user-002',
    tags: ['design', 'components'],
    repository_url: null,
    documentation_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    if (!isSupabaseConfigured()) {
      let filtered = [...placeholderProjects];
      if (status) filtered = filtered.filter((p) => p.status === status);
      if (category) filtered = filtered.filter((p) => p.category === category);
      return NextResponse.json({ data: filtered, error: null });
    }

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

    const body: InternalProjectInsert = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { data: null, error: 'Project name is required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      const mockProject: InternalProject = {
        id: crypto.randomUUID(),
        name: body.name,
        description: body.description || null,
        category: body.category || 'product',
        status: body.status || 'planning',
        priority: body.priority || 'medium',
        progress_percentage: body.progress_percentage || 0,
        start_date: body.start_date || null,
        target_date: body.target_date || null,
        completed_at: null,
        lead_id: body.lead_id || null,
        tags: body.tags || null,
        repository_url: body.repository_url || null,
        documentation_url: body.documentation_url || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockProject, error: null }, { status: 201 });
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
