/**
 * LeadConnector Booking Webhook API Route
 * Light Brand Consulting
 *
 * POST /api/assessment/booking-webhook
 * Receives webhook from LeadConnector when an appointment is booked.
 * Stores the booking details so they can be retrieved when user returns to funnel.
 *
 * LeadConnector Webhook Payload (AppointmentCreate):
 * - id: appointment ID
 * - contactId: contact ID in LeadConnector
 * - calendarId: calendar ID
 * - startTime: ISO datetime string (e.g., "2025-02-14T10:00:00-05:00")
 * - endTime: ISO datetime string
 * - status: "booked", "confirmed", etc.
 * - contact: { email, name, phone, etc. }
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

// LeadConnector webhook payload structure
interface LeadConnectorAppointmentWebhook {
  id?: string;
  appointmentId?: string;
  contactId?: string;
  calendarId?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  title?: string;
  // Contact info may be nested or at root level
  contact?: {
    id?: string;
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  // Or directly on payload
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  // Additional fields
  timezone?: string;
  notes?: string;
  selectedSlot?: string;
  slot?: string;
}

/**
 * POST /api/assessment/booking-webhook
 * Receives and processes LeadConnector appointment webhook
 */
export async function POST(request: NextRequest) {
  try {
    const payload: LeadConnectorAppointmentWebhook = await request.json();

    // Log the webhook for debugging (remove in production)
    console.log('[LeadConnector Webhook] Received:', JSON.stringify(payload, null, 2));

    // Extract appointment ID (GHL uses various field names)
    const appointmentId = payload.id || payload.appointmentId || `ghl-${Date.now()}`;

    // Extract start time from various possible fields
    const startTime = payload.startTime || payload.selectedSlot || payload.slot;

    // Extract contact email (could be nested or at root level)
    const email = (
      payload.contact?.email ||
      payload.email ||
      ''
    ).toLowerCase().trim();

    // Extract contact name
    const contactName = payload.contact?.name ||
      payload.name ||
      (payload.contact?.firstName && payload.contact?.lastName
        ? `${payload.contact.firstName} ${payload.contact.lastName}`
        : payload.firstName && payload.lastName
          ? `${payload.firstName} ${payload.lastName}`
          : null);

    const phone = payload.contact?.phone || payload.phone;

    if (!email) {
      console.error('[LeadConnector Webhook] No email in payload:', payload);
      // Still return 200 to acknowledge receipt (webhooks should not retry on bad data)
      return NextResponse.json({
        success: false,
        error: 'No email provided in webhook payload',
        received: true,
      });
    }

    if (!startTime) {
      console.error('[LeadConnector Webhook] No start time in payload:', payload);
      return NextResponse.json({
        success: false,
        error: 'No start time provided in webhook payload',
        received: true,
      });
    }

    // If Supabase is not configured, return success (for development)
    if (!isSupabaseConfigured()) {
      console.log('[LeadConnector Webhook] Supabase not configured, skipping database update');
      return NextResponse.json({
        success: true,
        message: 'Webhook received (development mode)',
        appointmentId,
        email,
        startTime,
      });
    }

    // Find lead by email and update with booking details
    const { data: existingLead, error: findError } = await supabaseAdmin
      .from('lead_submissions')
      .select('id, intake_data')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      // PGRST116 = no rows found, which is fine
      console.error('[LeadConnector Webhook] Error finding lead:', findError);
    }

    // Build booking data object
    const bookingData = {
      booking_id: appointmentId,
      booked_slot: startTime,
      booked_slot_end: payload.endTime || null,
      booked_at: new Date().toISOString(),
      booking_source: 'leadconnector_webhook',
      booking_status: payload.status || 'booked',
      booking_timezone: payload.timezone || null,
      booking_notes: payload.notes || null,
      leadconnector_contact_id: payload.contactId || payload.contact?.id || null,
      leadconnector_calendar_id: payload.calendarId || null,
    };

    if (existingLead) {
      // Update existing lead with booking info
      const existingIntakeData = existingLead.intake_data || {};
      const existingStageHistory = Array.isArray(existingIntakeData.stage_history)
        ? existingIntakeData.stage_history
        : [];

      const updatedIntakeData = {
        ...existingIntakeData,
        ...bookingData,
        current_stage: 'book',
        stage_history: [
          ...existingStageHistory,
          {
            stage: 'book',
            completed_at: new Date().toISOString(),
            source: 'webhook',
          },
        ],
        last_updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabaseAdmin
        .from('lead_submissions')
        .update({
          intake_data: updatedIntakeData,
          status: 'booked',
          booked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingLead.id);

      if (updateError) {
        console.error('[LeadConnector Webhook] Error updating lead:', updateError);
        return NextResponse.json({
          success: false,
          error: 'Failed to update lead',
          received: true,
        });
      }

      console.log(`[LeadConnector Webhook] Updated lead ${existingLead.id} with booking ${appointmentId}`);

      return NextResponse.json({
        success: true,
        message: 'Booking saved to existing lead',
        leadId: existingLead.id,
        appointmentId,
        startTime,
      });
    } else {
      // Create new lead with booking info (user booked before starting funnel)
      const { data: newLead, error: createError } = await supabaseAdmin
        .from('lead_submissions')
        .insert({
          service: 'assessment',
          email,
          name: contactName || email.split('@')[0],
          phone: phone || null,
          status: 'booked',
          booked_at: new Date().toISOString(),
          intake_data: {
            source: 'leadconnector_direct_booking',
            ...bookingData,
            current_stage: 'book',
            stage_history: [{
              stage: 'book',
              completed_at: new Date().toISOString(),
              source: 'webhook',
            }],
          },
        })
        .select('id')
        .single();

      if (createError) {
        console.error('[LeadConnector Webhook] Error creating lead:', createError);
        return NextResponse.json({
          success: false,
          error: 'Failed to create lead',
          received: true,
        });
      }

      console.log(`[LeadConnector Webhook] Created new lead ${newLead.id} with booking ${appointmentId}`);

      return NextResponse.json({
        success: true,
        message: 'Booking saved to new lead',
        leadId: newLead.id,
        appointmentId,
        startTime,
      });
    }
  } catch (error) {
    console.error('[LeadConnector Webhook] Error processing webhook:', error);
    // Return 200 to prevent webhook retries on parsing errors
    return NextResponse.json({
      success: false,
      error: 'Failed to process webhook',
      received: true,
    });
  }
}

/**
 * GET /api/assessment/booking-webhook
 * Health check / verification endpoint for webhook setup
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'LeadConnector booking webhook endpoint is active',
    timestamp: new Date().toISOString(),
  });
}
