/**
 * Assessment Lead API Route
 * Light Brand Consulting
 *
 * POST /api/assessment/lead - Create a new lead from assessment funnel
 * PATCH /api/assessment/lead - Update lead with booking/VSL info
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface CreateLeadRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  source: string; // e.g., 'assessment', 'funnel-1', etc.
  // Qualification details
  isDecisionMaker?: boolean;
  openToNegativeVerdict?: boolean;
}

interface UpdateLeadRequest {
  leadId: string;
  bookingId?: string;
  bookedSlot?: string;
  vslCompleted?: boolean;
  vslWatchPercentage?: number;
  // Stage tracking
  stage?: string;
  // Additional VSL tracking
  vslStartedAt?: string;
  vslDuration?: number;
}

/**
 * POST /api/assessment/lead
 * Create a new lead from the assessment funnel with source tracking
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateLeadRequest = await request.json();
    const { name, email, company, phone, source, isDecisionMaker, openToNegativeVerdict } = body;

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      const mockLeadId = 'mock-lead-' + Date.now();
      return NextResponse.json({
        success: true,
        leadId: mockLeadId,
        message: 'Lead created successfully (development mode)',
      });
    }

    // Check if lead already exists with this email
    const { data: existingLead } = await supabaseAdmin
      .from('lead_submissions')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existingLead) {
      // Update existing lead with new source info and full assessment details
      const { error: updateError } = await supabaseAdmin
        .from('lead_submissions')
        .update({
          name,
          company: company || null,
          phone: phone || null,
          // Track full assessment details
          intake_data: {
            source,
            assessment_started_at: new Date().toISOString(),
            // Qualification details
            is_decision_maker: isDecisionMaker ?? false,
            open_to_negative_verdict: openToNegativeVerdict ?? false,
            qualification_completed_at: new Date().toISOString(),
            // Stage tracking
            current_stage: 'qualify',
            stage_history: [{
              stage: 'qualify',
              completed_at: new Date().toISOString(),
            }],
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingLead.id);

      if (updateError) {
        console.error('Error updating existing lead:', updateError);
      }

      return NextResponse.json({
        success: true,
        leadId: existingLead.id,
        message: 'Lead updated successfully',
        existing: true,
      });
    }

    // Create new lead with full assessment details
    const { data: newLead, error: createError } = await supabaseAdmin
      .from('lead_submissions')
      .insert({
        service: 'assessment', // Mark as assessment lead
        name,
        email: email.toLowerCase(),
        company: company || null,
        phone: phone || null,
        status: 'new',
        intake_data: {
          source,
          assessment_started_at: new Date().toISOString(),
          // Qualification details
          is_decision_maker: isDecisionMaker ?? false,
          open_to_negative_verdict: openToNegativeVerdict ?? false,
          qualification_completed_at: new Date().toISOString(),
          // Stage tracking
          current_stage: 'qualify',
          stage_history: [{
            stage: 'qualify',
            completed_at: new Date().toISOString(),
          }],
        },
      })
      .select('id')
      .single();

    if (createError) {
      console.error('Error creating lead:', createError);
      return NextResponse.json(
        { success: false, error: 'Failed to create lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: newLead.id,
      message: 'Lead created successfully',
    });
  } catch (error) {
    console.error('Error in POST /api/assessment/lead:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/assessment/lead
 * Update lead with booking and VSL completion info
 * Tracks full assessment progress with stage history
 */
export async function PATCH(request: NextRequest) {
  try {
    const body: UpdateLeadRequest = await request.json();
    const { leadId, bookingId, bookedSlot, vslCompleted, vslWatchPercentage, stage, vslStartedAt, vslDuration } = body;

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock success
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: 'Lead updated successfully (development mode)',
      });
    }

    // Get current lead data
    const { data: currentLead } = await supabaseAdmin
      .from('lead_submissions')
      .select('intake_data')
      .eq('id', leadId)
      .single();

    const existingIntakeData = currentLead?.intake_data || {};
    const existingStageHistory = Array.isArray(existingIntakeData.stage_history)
      ? existingIntakeData.stage_history
      : [];

    // Build stage history entry if stage is provided
    const newStageEntry = stage ? {
      stage,
      completed_at: new Date().toISOString(),
    } : null;

    // Build comprehensive VSL data
    const vslData = vslCompleted !== undefined || vslStartedAt ? {
      ...(vslStartedAt && { vsl_started_at: vslStartedAt }),
      ...(vslCompleted !== undefined && { vsl_completed: vslCompleted }),
      ...(vslWatchPercentage !== undefined && { vsl_watch_percentage: vslWatchPercentage }),
      ...(vslDuration !== undefined && { vsl_duration_seconds: vslDuration }),
      ...(vslCompleted && { vsl_completed_at: new Date().toISOString() }),
    } : {};

    // Build booking data
    const bookingData = bookingId ? {
      booking_id: bookingId,
      booked_slot: bookedSlot,
      booked_at: new Date().toISOString(),
    } : {};

    // Merge all data together
    const updatedIntakeData = {
      ...existingIntakeData,
      ...vslData,
      ...bookingData,
      // Update current stage if provided
      ...(stage && { current_stage: stage }),
      // Append to stage history if new stage
      ...(newStageEntry && {
        stage_history: [...existingStageHistory, newStageEntry],
      }),
      // Track last update
      last_updated_at: new Date().toISOString(),
    };

    // Update lead with booking/VSL info
    const updateData: Record<string, unknown> = {
      intake_data: updatedIntakeData,
      updated_at: new Date().toISOString(),
    };

    // Update status based on what happened
    if (bookingId) {
      updateData.status = 'booked';
    } else if (vslCompleted) {
      updateData.status = 'qualified'; // Watched VSL = qualified
    }

    // Also update booked_at column if booking occurred
    if (bookingId && bookedSlot) {
      updateData.booked_at = new Date().toISOString();
    }

    const { error: updateError } = await supabaseAdmin
      .from('lead_submissions')
      .update(updateData)
      .eq('id', leadId);

    if (updateError) {
      console.error('Error updating lead:', updateError);
      return NextResponse.json(
        { success: false, error: 'Failed to update lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lead updated successfully',
    });
  } catch (error) {
    console.error('Error in PATCH /api/assessment/lead:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
