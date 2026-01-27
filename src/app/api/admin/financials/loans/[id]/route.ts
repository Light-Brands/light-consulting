/**
 * Individual Loan API Route
 * Light Brand Consulting
 *
 * GET /api/admin/financials/loans/[id] - Get loan by ID
 * PUT /api/admin/financials/loans/[id] - Update loan
 * DELETE /api/admin/financials/loans/[id] - Delete loan
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { Loan } from '@/types/financials';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/financials/loans/[id]
 * Get a loan by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('loans')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching loan:', error);
      return NextResponse.json(
        { data: null, error: 'Loan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: data as Loan, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/financials/loans/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/financials/loans/[id]
 * Update a loan
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    // Only include fields that are provided
    if (body.lender_name !== undefined) updateData.lender_name = body.lender_name;
    if (body.lender_contact !== undefined) updateData.lender_contact = body.lender_contact || null;
    if (body.original_amount !== undefined) updateData.original_amount = body.original_amount;
    if (body.current_balance !== undefined) updateData.current_balance = body.current_balance;
    if (body.interest_rate !== undefined) updateData.interest_rate = body.interest_rate;
    if (body.monthly_payment !== undefined) updateData.monthly_payment = body.monthly_payment;
    if (body.start_date !== undefined) updateData.start_date = body.start_date;
    if (body.maturity_date !== undefined) updateData.maturity_date = body.maturity_date;
    if (body.payment_day !== undefined) updateData.payment_day = body.payment_day;
    if (body.terms !== undefined) updateData.terms = body.terms || null;
    if (body.is_active !== undefined) updateData.is_active = body.is_active;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { data: null, error: 'No update data provided' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('loans')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating loan:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { data: null, error: 'Loan not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { data: null, error: `Failed to update loan: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as Loan, error: null });
  } catch (error) {
    console.error('Error in PUT /api/admin/financials/loans/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/financials/loans/[id]
 * Delete a loan
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const isAuthenticated = await isAdminAuthenticated(request);

    if (!isAuthenticated) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { data: null, error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { error } = await supabaseAdmin
      .from('loans')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting loan:', error);
      return NextResponse.json(
        { data: null, error: `Failed to delete loan: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: { id }, error: null });
  } catch (error) {
    console.error('Error in DELETE /api/admin/financials/loans/[id]:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
