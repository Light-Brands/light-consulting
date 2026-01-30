/**
 * Stack Diagnostic Sessions API Route
 * Light Brand Consulting
 *
 * GET /api/admin/stack-diagnostic - List sessions (optional ?lead_id= filter)
 * POST /api/admin/stack-diagnostic - Create session
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { StackSessionInsert } from '@/types/stack-diagnostic';

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
    const leadId = searchParams.get('lead_id');

    let query = supabaseAdmin
      .from('stack_sessions')
      .select('*')
      .order('created_at', { ascending: false });

    if (leadId) {
      query = query.eq('lead_id', leadId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching stack sessions:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch sessions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/stack-diagnostic:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    const body: StackSessionInsert = await request.json();

    if (!body.template_id) {
      return NextResponse.json(
        { data: null, error: 'template_id is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('stack_sessions')
      .insert({
        template_id: body.template_id,
        tools: body.tools || [],
        connections: body.connections || [],
        analysis: body.analysis || null,
        lead_id: body.lead_id || null,
        created_by: body.created_by || null,
        coach_notes: body.coach_notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating stack session:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create session' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/stack-diagnostic:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
