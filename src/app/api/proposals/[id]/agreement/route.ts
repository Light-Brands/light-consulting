/**
 * Agreement Signing API Route
 * Light Brand Consulting
 *
 * POST /api/proposals/[id]/agreement - Sign agreement
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { Agreement } from '@/types/proposals';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/proposals/[id]/agreement
 * Sign the agreement (public - via access token)
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate required fields
    const { access_token, signed_by_name, signed_by_email, signature_data } = body;

    if (!access_token) {
      return NextResponse.json(
        { data: null, error: 'Access token is required' },
        { status: 400 }
      );
    }

    if (!signed_by_name || !signed_by_email) {
      return NextResponse.json(
        { data: null, error: 'Signer name and email are required' },
        { status: 400 }
      );
    }

    // Get client info for audit trail
    const forwarded = request.headers.get('x-forwarded-for');
    const ip_address = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    const user_agent = request.headers.get('user-agent') || 'unknown';

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      const mockAgreement: Agreement = {
        id: '1',
        proposal_id: id,
        agreement_text: 'Agreement text...',
        terms: null,
        signed_by_name,
        signed_by_email,
        signature_data: signature_data || signed_by_name,
        signed_at: new Date().toISOString(),
        ip_address,
        user_agent,
        status: 'signed',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockAgreement, error: null });
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

    // Update agreement
    const { data: agreement, error: agreementError } = await supabaseAdmin
      .from('agreements')
      .update({
        signed_by_name,
        signed_by_email,
        signature_data: signature_data || signed_by_name,
        signed_at: new Date().toISOString(),
        ip_address,
        user_agent,
        status: 'signed',
      })
      .eq('proposal_id', id)
      .select()
      .single();

    if (agreementError) {
      console.error('Error signing agreement:', agreementError);
      return NextResponse.json(
        { data: null, error: 'Failed to sign agreement' },
        { status: 500 }
      );
    }

    // Update proposal status
    await supabaseAdmin
      .from('proposals')
      .update({
        status: 'agreement_signed',
        agreement_signed_at: new Date().toISOString(),
      })
      .eq('id', id);

    return NextResponse.json({ data: agreement, error: null });
  } catch (error) {
    console.error('Error in POST /api/proposals/[id]/agreement:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
