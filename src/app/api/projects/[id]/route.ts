/**
 * Single Project API Route
 * Light Brand Consulting
 *
 * Handles GET, PUT, and DELETE operations for a single project
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ProjectUpdate } from '@/types/database';
import { getProjectById, PORTFOLIO_PROJECTS } from '@/data/projects';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Get a single project by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check if admin
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'admin';

    // If Supabase is not configured, return from placeholder data
    if (!isSupabaseConfigured()) {
      const project = getProjectById(id);
      if (!project) {
        return NextResponse.json(
          { data: null, error: 'Project not found' },
          { status: 404 }
        );
      }
      // Non-admin users can only see published projects
      if (!isAdmin && project.status !== 'published') {
        return NextResponse.json(
          { data: null, error: 'Project not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ data: project, error: null });
    }

    let query = supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', id);

    // Non-admin users can only see published projects
    if (!isAdmin) {
      query = query.eq('status', 'published');
    }

    const { data, error } = await query.single();

    if (error) {
      console.error('Error fetching project:', error);
      return NextResponse.json(
        { data: null, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/projects/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update a project (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: ProjectUpdate = await request.json();

    // If Supabase is not configured, return mock response
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: { id, ...body, updated_at: new Date().toISOString() },
        error: null,
      });
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PUT /api/projects/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // If Supabase is not configured, return success
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ data: { id }, error: null });
    }

    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { id }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/projects/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
