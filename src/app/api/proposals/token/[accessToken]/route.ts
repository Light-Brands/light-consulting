/**
 * Proposal Token Access API Route
 * Light Brand Consulting
 *
 * GET /api/proposals/token/[accessToken] - Get proposal by access token (public)
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ProposalWithDetails, ProposalDetailApiResponse } from '@/types/proposals';
import { DEFAULT_PORTAL_SECTIONS } from '@/types/proposals';

interface RouteParams {
  params: Promise<{ accessToken: string }>;
}

/**
 * GET /api/proposals/token/[accessToken]
 * Get proposal by access token (public - no auth required)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { accessToken } = await params;

    if (!accessToken) {
      return NextResponse.json(
        { data: null, error: 'Access token is required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return error
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured. Please check your Supabase setup.' },
        { status: 503 }
      );
    }

    // Fetch proposal by access token
    const { data: proposal, error: proposalError } = await supabaseAdmin
      .from('proposals')
      .select('*')
      .eq('access_token', accessToken)
      .single();

    if (proposalError || !proposal) {
      return NextResponse.json(
        { data: null, error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Mark as viewed if first view
    if (!proposal.viewed_at) {
      await supabaseAdmin
        .from('proposals')
        .update({ viewed_at: new Date().toISOString(), status: 'viewed' })
        .eq('id', proposal.id);

      proposal.viewed_at = new Date().toISOString();
      proposal.status = 'viewed';
    }

    // Fetch related data in parallel
    const [
      { data: phases },
      { data: milestones },
      { data: agreement },
      { data: onboarding_form },
      { data: dashboard_updates },
      { data: comments },
    ] = await Promise.all([
      supabaseAdmin
        .from('proposal_phases')
        .select('*')
        .eq('proposal_id', proposal.id)
        .eq('visible_in_portal', true)
        .order('sort_order'),
      supabaseAdmin
        .from('milestones')
        .select('*')
        .eq('proposal_id', proposal.id)
        .order('sort_order'),
      supabaseAdmin
        .from('agreements')
        .select('*')
        .eq('proposal_id', proposal.id)
        .single(),
      supabaseAdmin
        .from('onboarding_forms')
        .select('*')
        .eq('proposal_id', proposal.id)
        .single(),
      supabaseAdmin
        .from('dashboard_updates')
        .select('*')
        .eq('proposal_id', proposal.id)
        .order('created_at', { ascending: false }),
      supabaseAdmin
        .from('proposal_comments')
        .select('*')
        .eq('proposal_id', proposal.id)
        .order('created_at', { ascending: false }),
    ]);

    const proposalWithDetails: ProposalWithDetails = {
      ...proposal,
      portal_sections: proposal.portal_sections || DEFAULT_PORTAL_SECTIONS,
      phases: phases || [],
      milestones: milestones || [],
      agreement: agreement || null,
      onboarding_form: onboarding_form || null,
      dashboard_updates: dashboard_updates || [],
      comments: comments || [],
    };

    const response: ProposalDetailApiResponse = {
      data: proposalWithDetails,
      error: null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/proposals/token/[accessToken]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
