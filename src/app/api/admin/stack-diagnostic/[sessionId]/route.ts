/**
 * Stack Diagnostic Session Detail API Route
 * Light Brand Consulting
 *
 * GET /api/admin/stack-diagnostic/[sessionId] - Get session
 * PUT /api/admin/stack-diagnostic/[sessionId] - Update session
 * DELETE /api/admin/stack-diagnostic/[sessionId] - Delete session
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { StackSessionUpdate } from '@/types/stack-diagnostic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
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

    const { sessionId } = await params;

    const { data, error } = await supabaseAdmin
      .from('stack_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (error) {
      console.error('Error fetching stack session:', error);
      return NextResponse.json(
        { data: null, error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/stack-diagnostic/[sessionId]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
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

    const { sessionId } = await params;
    const body: StackSessionUpdate = await request.json();

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (body.template_id !== undefined) updateData.template_id = body.template_id;
    if (body.tools !== undefined) updateData.tools = body.tools;
    if (body.connections !== undefined) updateData.connections = body.connections;
    if (body.analysis !== undefined) updateData.analysis = body.analysis;
    if (body.lead_id !== undefined) updateData.lead_id = body.lead_id;
    if (body.created_by !== undefined) updateData.created_by = body.created_by;
    if (body.coach_notes !== undefined) updateData.coach_notes = body.coach_notes;

    const { data, error } = await supabaseAdmin
      .from('stack_sessions')
      .update(updateData)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) {
      console.error('Error updating stack session:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to update session' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in PUT /api/admin/stack-diagnostic/[sessionId]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
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

    const { sessionId } = await params;

    const { error } = await supabaseAdmin
      .from('stack_sessions')
      .delete()
      .eq('id', sessionId);

    if (error) {
      console.error('Error deleting stack session:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to delete session' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { id: sessionId }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/stack-diagnostic/[sessionId]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
