/**
 * Assessment Status API Route
 * GET /api/assessment/status?id={assessmentId}
 *
 * Retrieves the current status of an assessment
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { AssessmentSubmission } from '@/types/database';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const assessmentId = searchParams.get('id');

    if (!assessmentId) {
      return NextResponse.json(
        { error: 'Assessment ID is required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock data
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        assessment: {
          id: assessmentId,
          stage: 'status',
          vsl_completed: true,
          payment_completed: true,
          intake_submitted_at: new Date().toISOString(),
          verdict: null,
        },
        development_mode: true,
      });
    }

    // Get assessment from database
    const { data: assessment, error } = await supabaseAdmin
      .from('assessment_submissions')
      .select('*')
      .eq('id', assessmentId)
      .single() as { data: AssessmentSubmission | null; error: unknown };

    if (error || !assessment) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      assessment: {
        id: assessment.id,
        email: assessment.email,
        name: assessment.name,
        company: assessment.company,
        stage: assessment.stage,
        vsl_completed: assessment.vsl_completed,
        payment_completed: assessment.payment_completed,
        intake_submitted_at: assessment.intake_submitted_at,
        verdict: assessment.verdict,
        verdict_delivered_at: assessment.verdict_delivered_at,
        booked_slot: assessment.booked_slot,
      },
    });
  } catch (error) {
    console.error('Error fetching assessment status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
