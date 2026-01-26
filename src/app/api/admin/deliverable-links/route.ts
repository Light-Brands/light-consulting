/**
 * Deliverable Links API Route
 * Light Brand Consulting
 *
 * GET /api/admin/deliverable-links - List deliverable links
 * POST /api/admin/deliverable-links - Create deliverable link
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { DeliverableLink, DeliverableLinkInsert } from '@/types/deliverables';

// Placeholder data
const placeholderLinks: DeliverableLink[] = [
  {
    id: 'link-001',
    proposal_id: 'project-001',
    phase_id: null,
    milestone_id: null,
    title: 'Figma Design Files',
    description: 'All design files and prototypes',
    url: 'https://figma.com/file/...',
    link_type: 'design',
    is_client_visible: true,
    requires_password: false,
    password_hint: null,
    icon: 'figma',
    sort_order: 0,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'link-002',
    proposal_id: 'project-001',
    phase_id: null,
    milestone_id: null,
    title: 'Staging Site',
    description: 'Preview the latest changes',
    url: 'https://staging.example.com',
    link_type: 'staging',
    is_client_visible: true,
    requires_password: true,
    password_hint: 'Company name',
    icon: null,
    sort_order: 1,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

/**
 * GET /api/admin/deliverable-links
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
    const proposalId = searchParams.get('proposal_id');
    const phaseId = searchParams.get('phase_id');
    const clientVisible = searchParams.get('client_visible');

    if (!isSupabaseConfigured()) {
      let filtered = [...placeholderLinks];
      if (proposalId) filtered = filtered.filter((l) => l.proposal_id === proposalId);
      return NextResponse.json({ data: filtered, error: null });
    }

    let query = supabaseAdmin
      .from('deliverable_links')
      .select(`
        *,
        proposal_phases:phase_id (
          id,
          phase_name
        ),
        milestones:milestone_id (
          id,
          milestone_name
        )
      `)
      .order('sort_order');

    if (proposalId) {
      query = query.eq('proposal_id', proposalId);
    }
    if (phaseId) {
      query = query.eq('phase_id', phaseId);
    }
    if (clientVisible === 'true') {
      query = query.eq('is_client_visible', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching deliverable links:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch deliverable links' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/deliverable-links:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/deliverable-links
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

    const body: DeliverableLinkInsert = await request.json();

    if (!body.proposal_id || !body.title || !body.url) {
      return NextResponse.json(
        { data: null, error: 'Proposal ID, title, and URL are required' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      const mockLink: DeliverableLink = {
        id: crypto.randomUUID(),
        ...body,
        phase_id: body.phase_id || null,
        milestone_id: body.milestone_id || null,
        description: body.description || null,
        link_type: body.link_type || 'document',
        is_client_visible: body.is_client_visible ?? true,
        requires_password: body.requires_password ?? false,
        password_hint: body.password_hint || null,
        icon: body.icon || null,
        sort_order: body.sort_order || 0,
        created_by: body.created_by || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockLink, error: null }, { status: 201 });
    }

    const { data, error } = await supabaseAdmin
      .from('deliverable_links')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('Error creating deliverable link:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create deliverable link' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/deliverable-links:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
