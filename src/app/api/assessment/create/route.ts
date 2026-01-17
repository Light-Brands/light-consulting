/**
 * Assessment Create API Route
 * POST /api/assessment/create
 *
 * Creates a new AI Go/No-Go Assessment submission
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { AssessmentSubmission, AssessmentSubmissionInsert } from '@/types/database';

interface CreateAssessmentRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateAssessmentRequest = await request.json();
    const { name, email, company, phone } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return a mock response
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        assessmentId: 'mock-assessment-' + Date.now(),
        message: 'Assessment created (development mode)',
      });
    }

    // Check if assessment already exists for this email
    const { data: existing } = await supabaseAdmin
      .from('assessment_submissions')
      .select('id, stage, payment_completed')
      .eq('email', email.toLowerCase())
      .order('created_at', { ascending: false })
      .limit(1)
      .single() as { data: Pick<AssessmentSubmission, 'id' | 'stage' | 'payment_completed'> | null; error: unknown };

    // If there's an existing incomplete assessment, return that
    if (existing && !existing.payment_completed) {
      return NextResponse.json({
        success: true,
        assessmentId: existing.id,
        existingAssessment: true,
        stage: existing.stage,
        message: 'Returning existing assessment',
      });
    }

    // Create new assessment submission
    const insertData: AssessmentSubmissionInsert = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      company: company?.trim() || null,
      phone: phone?.trim() || null,
      stage: 'qualify',
      vsl_completed: false,
      payment_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: assessment, error: insertError } = await supabaseAdmin
      .from('assessment_submissions')
      .insert(insertData as never)
      .select('id')
      .single() as { data: { id: string } | null; error: unknown };

    if (insertError || !assessment) {
      console.error('Error creating assessment:', insertError);
      return NextResponse.json(
        { error: 'Failed to create assessment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      message: 'Assessment created successfully',
    });
  } catch (error) {
    console.error('Error in assessment create:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
