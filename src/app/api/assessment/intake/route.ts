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
  assessmentId?: string;
  leadId?: string;
  intakeResponses: Record<string, string>;
  loomVideoUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: IntakeSubmitRequest = await request.json();
    const { assessmentId, leadId, intakeResponses, loomVideoUrl } = body;

    // Validate required fields - need either assessmentId or leadId
    if (!assessmentId && !leadId) {
      return NextResponse.json(
        { error: 'Assessment ID or Lead ID is required' },
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

    // If leadId is provided, save intake to lead_submissions table
    if (leadId) {
      // Get current lead data to merge with existing intake_data
      const { data: currentLead } = await supabaseAdmin
        .from('lead_submissions')
        .select('intake_data')
        .eq('id', leadId)
        .single();

      const existingIntakeData = currentLead?.intake_data || {};
      const existingStageHistory = Array.isArray(existingIntakeData.stage_history)
        ? existingIntakeData.stage_history
        : [];

      // Merge intake responses into intake_data
      const updatedIntakeData = {
        ...existingIntakeData,
        // All intake questionnaire responses
        intake_responses: intakeResponses,
        loom_video_url: loomVideoUrl.trim(),
        intake_submitted_at: new Date().toISOString(),
        current_stage: 'intake',
        stage_history: [
          ...existingStageHistory,
          {
            stage: 'intake',
            completed_at: new Date().toISOString(),
          },
        ],
        last_updated_at: new Date().toISOString(),
      };

      const { error: leadUpdateError } = await supabaseAdmin
        .from('lead_submissions')
        .update({
          intake_data: updatedIntakeData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', leadId);

      if (leadUpdateError) {
        console.error('Error updating lead with intake:', leadUpdateError);
        return NextResponse.json(
          { error: 'Failed to submit intake to lead' },
          { status: 500 }
        );
      }
    }

    // If assessmentId is provided, also update assessment_submissions table
    if (assessmentId) {
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
