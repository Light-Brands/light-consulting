/**
 * Client Portal Project Detail API Route
 * Light Brand Consulting
 *
 * GET /api/client-portal/projects/[id] - Get project detail with deliverables
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * GET /api/client-portal/projects/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get('token');

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        data: {
          id,
          project_name: 'Sample Project',
          project_overview: 'A comprehensive project overview',
          client_name: 'Sample Client',
          client_company: 'Sample Corp',
          status: 'active',
          progress_percentage: 65,
          health_status: 'on_track',
          start_date: '2026-01-15',
          estimated_completion_date: '2026-03-15',
          total_timeline: '2 months',
          total_amount: 45000,
          final_amount: 45000,
          total_paid: 15000,
          total_pending: 30000,
          phases: [],
          milestones: [],
          deliverable_links: [],
          recent_activity: [],
          project_manager_name: 'John Manager',
          team_members: [],
        },
        error: null,
      });
    }

    // Verify access - either by access token or by project ID
    let query = supabaseAdmin
      .from('proposals')
      .select(`
        id,
        project_name,
        project_overview,
        client_name,
        client_company,
        status,
        progress_percentage,
        health_status,
        start_date,
        estimated_completion_date,
        total_timeline,
        total_amount,
        final_amount,
        proposal_phases (
          id,
          phase_number,
          phase_name,
          description,
          timeline,
          start_date,
          end_date,
          phase_status,
          deliverables
        ),
        milestones (
          id,
          milestone_name,
          description,
          amount,
          due_date,
          payment_status,
          milestone_status,
          stripe_payment_url,
          paid_at,
          phase_id
        ),
        deliverable_links (
          id,
          title,
          description,
          url,
          link_type,
          is_client_visible,
          requires_password,
          password_hint
        ),
        project_activity_log (
          id,
          activity_type,
          title,
          description,
          created_at,
          is_client_visible
        )
      `)
      .eq('id', id);

    if (accessToken) {
      query = query.eq('access_token', accessToken);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      console.error('Error fetching project detail:', error);
      return NextResponse.json(
        { data: null, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Filter to only client-visible data
    const clientVisibleLinks = (data.deliverable_links || []).filter(
      (link: { is_client_visible: boolean }) => link.is_client_visible
    );
    const clientVisibleActivity = (data.project_activity_log || []).filter(
      (activity: { is_client_visible: boolean }) => activity.is_client_visible
    );

    // Calculate payment totals
    const milestones = data.milestones || [];
    const totalPaid = milestones
      .filter((m: { payment_status: string }) => m.payment_status === 'paid')
      .reduce((sum: number, m: { amount: number }) => sum + m.amount, 0);
    const totalPending = milestones
      .filter((m: { payment_status: string }) => m.payment_status === 'pending')
      .reduce((sum: number, m: { amount: number }) => sum + m.amount, 0);

    // Transform phases to client format
    const phases = (data.proposal_phases || []).map((phase: {
      id: string;
      phase_number: number;
      phase_name: string;
      description: string | null;
      timeline: string | null;
      start_date: string | null;
      end_date: string | null;
      phase_status: string;
      deliverables: { id: string; name: string; description?: string }[] | null;
    }) => ({
      id: phase.id,
      phase_number: phase.phase_number,
      phase_name: phase.phase_name,
      description: phase.description,
      timeline: phase.timeline,
      start_date: phase.start_date,
      end_date: phase.end_date,
      phase_status: phase.phase_status || 'not_started',
      progress_percentage: phase.phase_status === 'completed' ? 100 : phase.phase_status === 'in_progress' ? 50 : 0,
      deliverables: (phase.deliverables || []).map((d) => ({
        id: d.id,
        name: d.name,
        description: d.description || null,
        status: 'pending',
      })),
    }));

    // Transform milestones
    const clientMilestones = milestones.map((m: {
      id: string;
      milestone_name: string;
      description: string | null;
      amount: number;
      due_date: string | null;
      payment_status: string;
      milestone_status: string;
      stripe_payment_url: string | null;
      paid_at: string | null;
      phase_id: string | null;
    }) => {
      const phase = phases.find((p: { id: string }) => p.id === m.phase_id);
      return {
        id: m.id,
        milestone_name: m.milestone_name,
        description: m.description,
        amount: m.amount,
        due_date: m.due_date,
        payment_status: m.payment_status,
        milestone_status: m.milestone_status,
        stripe_payment_url: m.stripe_payment_url,
        paid_at: m.paid_at,
        phase_name: phase?.phase_name || null,
      };
    });

    const projectDetail = {
      id: data.id,
      project_name: data.project_name,
      project_overview: data.project_overview,
      client_name: data.client_name,
      client_company: data.client_company,
      status: data.status,
      progress_percentage: data.progress_percentage || 0,
      health_status: data.health_status,
      start_date: data.start_date,
      estimated_completion_date: data.estimated_completion_date,
      total_timeline: data.total_timeline,
      total_amount: data.total_amount,
      final_amount: data.final_amount,
      total_paid: totalPaid,
      total_pending: totalPending,
      phases,
      milestones: clientMilestones,
      deliverable_links: clientVisibleLinks,
      recent_activity: clientVisibleActivity.slice(0, 10),
      project_manager_name: null,
      team_members: [],
    };

    return NextResponse.json({ data: projectDetail, error: null });
  } catch (error) {
    console.error('Error in GET /api/client-portal/projects/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
