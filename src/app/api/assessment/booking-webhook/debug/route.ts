/**
 * Debug endpoint for LeadConnector Booking Webhook
 *
 * GET /api/assessment/booking-webhook/debug
 * Returns recent booking webhook data for debugging purposes.
 *
 * NOTE: This should be disabled or protected in production.
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

// In-memory storage for recent webhooks (for development without DB)
const recentWebhooks: Array<{
  timestamp: string;
  payload: unknown;
  result: unknown;
}> = [];

// Export for use by the main webhook handler
export function logWebhookForDebug(payload: unknown, result: unknown) {
  recentWebhooks.unshift({
    timestamp: new Date().toISOString(),
    payload,
    result,
  });
  // Keep only last 20 webhooks in memory
  if (recentWebhooks.length > 20) {
    recentWebhooks.pop();
  }
}

export async function GET(request: NextRequest) {
  // Allow in production with secret query param for debugging
  if (process.env.NODE_ENV === 'production') {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    // Allow access with query param secret or env var
    // Use a simple secret: "lc-debug-2024" or custom DEBUG_SECRET env var
    const validSecret = process.env.DEBUG_SECRET || 'lc-debug-2024';
    if (secret !== validSecret) {
      return NextResponse.json(
        {
          error: 'Debug endpoint requires secret parameter',
          hint: 'Add ?secret=YOUR_SECRET to the URL',
        },
        { status: 403 }
      );
    }
  }

  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const response: {
    inMemoryWebhooks: typeof recentWebhooks;
    databaseBookings: unknown[] | null;
    supabaseConfigured: boolean;
  } = {
    inMemoryWebhooks: recentWebhooks.slice(0, limit),
    databaseBookings: null,
    supabaseConfigured: isSupabaseConfigured(),
  };

  // Query database for recent bookings if configured
  if (isSupabaseConfigured()) {
    let query = supabaseAdmin
      .from('lead_submissions')
      .select('id, email, name, intake_data, booked_at, created_at, updated_at')
      .not('booked_at', 'is', null)
      .order('booked_at', { ascending: false })
      .limit(limit);

    if (email) {
      query = query.eq('email', email.toLowerCase());
    }

    const { data, error } = await query;

    if (error) {
      console.error('[Booking Debug] Database query error:', error);
    } else {
      response.databaseBookings = data?.map(lead => ({
        id: lead.id,
        email: lead.email,
        name: lead.name,
        bookedAt: lead.booked_at,
        bookingId: lead.intake_data?.booking_id,
        bookedSlot: lead.intake_data?.booked_slot,
        bookedSlotEnd: lead.intake_data?.booked_slot_end,
        bookingStatus: lead.intake_data?.booking_status,
        bookingSource: lead.intake_data?.booking_source,
        currentStage: lead.intake_data?.current_stage,
        createdAt: lead.created_at,
        updatedAt: lead.updated_at,
      })) || [];
    }
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    ...response,
    usage: {
      description: 'Debug endpoint for LeadConnector booking webhooks',
      queryParams: {
        email: 'Filter by email address',
        limit: 'Number of results (default: 10)',
      },
      examples: [
        '/api/assessment/booking-webhook/debug',
        '/api/assessment/booking-webhook/debug?email=test@example.com',
        '/api/assessment/booking-webhook/debug?limit=5',
      ],
    },
  });
}
