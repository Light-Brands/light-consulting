/**
 * Assessment Booking Lookup API Route
 * Light Brand Consulting
 *
 * GET /api/assessment/booking?email=...
 * GET /api/assessment/booking?lead_id=...
 *
 * Retrieves the latest booking details for a lead.
 * Used when user returns from LeadConnector booking to display their booked slot.
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface BookingDetails {
  bookingId: string | null;
  bookedSlot: string | null;
  bookedSlotEnd: string | null;
  bookingStatus: string | null;
  bookingTimezone: string | null;
  leadId: string | null;
  name: string | null;
  email: string | null;
}

/**
 * GET /api/assessment/booking
 * Lookup booking details by email or lead_id
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email')?.toLowerCase().trim();
    const leadId = searchParams.get('lead_id');

    if (!email && !leadId) {
      return NextResponse.json(
        { success: false, error: 'Email or lead_id parameter is required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return mock data for development
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        booking: null,
        message: 'No booking found (development mode)',
      });
    }

    // Query for lead with booking data
    let query = supabaseAdmin
      .from('lead_submissions')
      .select('id, name, email, intake_data, booked_at')
      .order('booked_at', { ascending: false, nullsFirst: false });

    if (leadId) {
      query = query.eq('id', leadId);
    } else if (email) {
      query = query.eq('email', email);
    }

    const { data: leads, error: queryError } = await query.limit(1);

    if (queryError) {
      console.error('[Booking Lookup] Error querying lead:', queryError);
      return NextResponse.json(
        { success: false, error: 'Failed to lookup booking' },
        { status: 500 }
      );
    }

    if (!leads || leads.length === 0) {
      return NextResponse.json({
        success: true,
        booking: null,
        message: 'No lead found',
      });
    }

    const lead = leads[0];
    const intakeData = lead.intake_data || {};

    // Check if there's booking data
    if (!intakeData.booked_slot && !intakeData.booking_id) {
      return NextResponse.json({
        success: true,
        booking: null,
        message: 'Lead found but no booking data',
        leadId: lead.id,
      });
    }

    // Return booking details
    const booking: BookingDetails = {
      bookingId: intakeData.booking_id || null,
      bookedSlot: intakeData.booked_slot || null,
      bookedSlotEnd: intakeData.booked_slot_end || null,
      bookingStatus: intakeData.booking_status || 'booked',
      bookingTimezone: intakeData.booking_timezone || null,
      leadId: lead.id,
      name: lead.name,
      email: lead.email,
    };

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('[Booking Lookup] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
