/**
 * Assessment Intake API Route
 * POST /api/assessment/intake
 *
 * Submits intake questionnaire responses and Loom video URL
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { AssessmentSubmissionUpdate } from '@/types/database';

interface IntakeSubmitRequest {
  assessmentId: string;
  intakeResponses: Record<string, string>;
  loomVideoUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: IntakeSubmitRequest = await request.json();
    const { assessmentId, intakeResponses, loomVideoUrl } = body;

    // Validate required fields
    if (!assessmentId) {
      return NextResponse.json(
        { error: 'Assessment ID is required' },
        { status: 400 }
      );
    }

    if (!intakeResponses || Object.keys(intakeResponses).length === 0) {
      return NextResponse.json(
        { error: 'Intake responses are required' },
        { status: 400 }
      );
    }

    if (!loomVideoUrl?.trim()) {
      return NextResponse.json(
        { error: 'Loom video URL is required' },
        { status: 400 }
      );
    }

    // Validate Loom URL format
    if (!loomVideoUrl.includes('loom.com')) {
      return NextResponse.json(
        { error: 'Invalid Loom video URL' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return a mock response
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: 'Intake submitted (development mode)',
      });
    }

    // Update assessment with intake data
    const updateData: AssessmentSubmissionUpdate = {
      intake_responses: intakeResponses,
      loom_video_url: loomVideoUrl.trim(),
      intake_submitted_at: new Date().toISOString(),
      stage: 'status',
      updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabaseAdmin
      .from('assessment_submissions')
      .update(updateData as never)
      .eq('id', assessmentId);

    if (updateError) {
      console.error('Error updating assessment:', updateError);
      return NextResponse.json(
        { error: 'Failed to submit intake' },
        { status: 500 }
      );
    }

    // TODO: Send notification email to team about new intake submission

    return NextResponse.json({
      success: true,
      message: 'Intake submitted successfully',
    });
  } catch (error) {
    console.error('Error in assessment intake:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
