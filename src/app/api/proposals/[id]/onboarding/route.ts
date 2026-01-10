/**
 * Onboarding Form API Route
 * Light Brand Consulting
 *
 * POST /api/proposals/[id]/onboarding - Submit onboarding form
 * GET /api/proposals/[id]/onboarding - Get onboarding form status
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { OnboardingForm } from '@/types/proposals';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/proposals/[id]/onboarding
 * Submit onboarding form (public - via access token)
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { access_token, form_data } = body;

    if (!access_token) {
      return NextResponse.json(
        { data: null, error: 'Access token is required' },
        { status: 400 }
      );
    }

    if (!form_data || typeof form_data !== 'object') {
      return NextResponse.json(
        { data: null, error: 'Form data is required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      const mockOnboarding: OnboardingForm = {
        id: '1',
        proposal_id: id,
        form_config: null,
        form_data,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        reviewed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockOnboarding, error: null });
    }

    // Verify access token matches proposal
    const { data: proposal, error: proposalError } = await supabaseAdmin
      .from('proposals')
      .select('id, access_token')
      .eq('id', id)
      .single();

    if (proposalError || !proposal) {
      return NextResponse.json(
        { data: null, error: 'Proposal not found' },
        { status: 404 }
      );
    }

    if (proposal.access_token !== access_token) {
      return NextResponse.json(
        { data: null, error: 'Invalid access token' },
        { status: 403 }
      );
    }

    // Update onboarding form
    const { data: onboarding, error: onboardingError } = await supabaseAdmin
      .from('onboarding_forms')
      .update({
        form_data,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      })
      .eq('proposal_id', id)
      .select()
      .single();

    if (onboardingError) {
      console.error('Error submitting onboarding form:', onboardingError);
      return NextResponse.json(
        { data: null, error: 'Failed to submit onboarding form' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: onboarding, error: null });
  } catch (error) {
    console.error('Error in POST /api/proposals/[id]/onboarding:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/proposals/[id]/onboarding
 * Get onboarding form (public - via access token in query)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const access_token = searchParams.get('access_token');

    if (!access_token) {
      return NextResponse.json(
        { data: null, error: 'Access token is required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock
    if (!isSupabaseConfigured()) {
      const mockOnboarding: OnboardingForm = {
        id: '1',
        proposal_id: id,
        form_config: [
          { id: '1', type: 'text', label: 'Primary Contact Name', required: true },
          { id: '2', type: 'text', label: 'Primary Contact Email', required: true },
        ],
        form_data: null,
        status: 'pending',
        submitted_at: null,
        reviewed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockOnboarding, error: null });
    }

    // Verify access token
    const { data: proposal, error: proposalError } = await supabaseAdmin
      .from('proposals')
      .select('id, access_token')
      .eq('id', id)
      .single();

    if (proposalError || !proposal || proposal.access_token !== access_token) {
      return NextResponse.json(
        { data: null, error: 'Invalid access' },
        { status: 403 }
      );
    }

    // Get onboarding form
    const { data: onboarding, error: onboardingError } = await supabaseAdmin
      .from('onboarding_forms')
      .select('*')
      .eq('proposal_id', id)
      .single();

    if (onboardingError) {
      return NextResponse.json(
        { data: null, error: 'Onboarding form not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: onboarding, error: null });
  } catch (error) {
    console.error('Error in GET /api/proposals/[id]/onboarding:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
