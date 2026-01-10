/**
 * Comments API Route
 * Light Brand Consulting
 *
 * POST /api/proposals/[id]/comments - Create comment
 * GET /api/proposals/[id]/comments - Get comments
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { ProposalComment, ProposalCommentInsert } from '@/types/proposals';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/proposals/[id]/comments
 * Create comment (admin or client via token)
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { access_token, comment_text, milestone_id } = body;

    if (!comment_text?.trim()) {
      return NextResponse.json(
        { data: null, error: 'Comment text is required' },
        { status: 400 }
      );
    }

    // Check admin authentication OR access token
    const session = await getServerSession(authOptions);
    const isDevelopment = process.env.NODE_ENV === 'development';
    const bypassAuth = process.env.DISABLE_ADMIN_AUTH === 'true' || isDevelopment;
    const isAdmin = bypassAuth || session;

    // Determine if this is a client comment
    let is_client_comment = false;

    if (!isAdmin) {
      if (!access_token) {
        return NextResponse.json(
          { data: null, error: 'Unauthorized' },
          { status: 401 }
        );
      }
      is_client_comment = true;
    }

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      const mockComment: ProposalComment = {
        id: crypto.randomUUID(),
        proposal_id: id,
        milestone_id: milestone_id || null,
        comment_text: comment_text.trim(),
        created_by: null,
        is_client_comment,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return NextResponse.json({ data: mockComment, error: null }, { status: 201 });
    }

    // If client comment, verify access token
    if (is_client_comment) {
      const { data: proposal, error: proposalError } = await supabaseAdmin
        .from('proposals')
        .select('access_token')
        .eq('id', id)
        .single();

      if (proposalError || !proposal || proposal.access_token !== access_token) {
        return NextResponse.json(
          { data: null, error: 'Invalid access' },
          { status: 403 }
        );
      }
    }

    const commentData: ProposalCommentInsert = {
      proposal_id: id,
      milestone_id: milestone_id || null,
      comment_text: comment_text.trim(),
      is_client_comment,
    };

    const { data, error } = await supabaseAdmin
      .from('proposal_comments')
      .insert(commentData)
      .select()
      .single();

    if (error) {
      console.error('Error creating comment:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create comment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/proposals/[id]/comments:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/proposals/[id]/comments
 * Get comments (admin or client via token)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const access_token = searchParams.get('access_token');

    // Check admin authentication OR access token
    const session = await getServerSession(authOptions);
    const isDevelopment = process.env.NODE_ENV === 'development';
    const bypassAuth = process.env.DISABLE_ADMIN_AUTH === 'true' || isDevelopment;
    const isAdmin = bypassAuth || session;

    // If Supabase is not configured, return mock data
    if (!isSupabaseConfigured()) {
      const mockComments: ProposalComment[] = [
        {
          id: '1',
          proposal_id: id,
          milestone_id: null,
          comment_text: 'Looking forward to getting started!',
          created_by: null,
          is_client_comment: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          proposal_id: id,
          milestone_id: null,
          comment_text: 'We are excited to work with you!',
          created_by: null,
          is_client_comment: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      return NextResponse.json({ data: mockComments, error: null });
    }

    // If not admin, verify access token
    if (!isAdmin) {
      if (!access_token) {
        return NextResponse.json(
          { data: null, error: 'Unauthorized' },
          { status: 401 }
        );
      }

      const { data: proposal, error: proposalError } = await supabaseAdmin
        .from('proposals')
        .select('access_token')
        .eq('id', id)
        .single();

      if (proposalError || !proposal || proposal.access_token !== access_token) {
        return NextResponse.json(
          { data: null, error: 'Invalid access' },
          { status: 403 }
        );
      }
    }

    const { data, error } = await supabaseAdmin
      .from('proposal_comments')
      .select('*')
      .eq('proposal_id', id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch comments' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error in GET /api/proposals/[id]/comments:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
