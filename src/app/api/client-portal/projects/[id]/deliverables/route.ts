/**
 * Client Portal Deliverables API Route
 * Light Brand Consulting
 *
 * GET /api/client-portal/projects/[id]/deliverables - Get client-visible deliverable links
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * GET /api/client-portal/projects/[id]/deliverables
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: [
          {
            id: 'link-001',
            title: 'Figma Design Files',
            description: 'All design mockups and prototypes',
            url: 'https://figma.com/...',
            link_type: 'design',
            requires_password: false,
            password_hint: null,
          },
          {
            id: 'link-002',
            title: 'Staging Site',
            description: 'Preview the latest build',
            url: 'https://staging.example.com',
            link_type: 'staging',
            requires_password: true,
            password_hint: 'Company name',
          },
        ],
        error: null,
      });
    }

    const { data, error } = await supabaseAdmin
      .from('deliverable_links')
      .select(`
        id,
        title,
        description,
        url,
        link_type,
        requires_password,
        password_hint,
        phase_id,
        proposal_phases:phase_id (
          phase_name
        )
      `)
      .eq('proposal_id', id)
      .eq('is_client_visible', true)
      .order('sort_order');

    if (error) {
      console.error('Error fetching deliverables:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch deliverables' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/client-portal/projects/[id]/deliverables:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
