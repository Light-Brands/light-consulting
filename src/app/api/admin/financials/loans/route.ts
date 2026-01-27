/**
 * Loans API Route
 * Light Brand Consulting
 *
 * GET /api/admin/financials/loans - List loans
 * POST /api/admin/financials/loans - Create loan
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import type { Loan } from '@/types/financials';

/**
 * GET /api/admin/financials/loans
 * List all loans
 */
export async function GET(request: NextRequest) {
  try {
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

    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('include_inactive') === 'true';

    let query = supabaseAdmin
      .from('loans')
      .select('*')
      .order('maturity_date', { ascending: true });

    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching loans:', error);
      // If table doesn't exist, return empty array
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json({ data: [], error: null });
      }
      return NextResponse.json(
        { data: null, error: `Failed to fetch loans: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as Loan[], error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/financials/loans:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/financials/loans
 * Create a new loan
 */
export async function POST(request: NextRequest) {
  try {
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
    const {
      lender_name,
      lender_contact,
      original_amount,
      current_balance,
      interest_rate,
      monthly_payment,
      start_date,
      maturity_date,
      payment_day,
      terms,
    } = body;

    // Validate required fields
    if (!lender_name || original_amount === undefined || current_balance === undefined ||
        monthly_payment === undefined || !start_date || !maturity_date) {
      return NextResponse.json(
        { data: null, error: 'Lender name, amounts, monthly payment, and dates are required' },
        { status: 400 }
      );
    }

    // Validate date range
    if (new Date(maturity_date) < new Date(start_date)) {
      return NextResponse.json(
        { data: null, error: 'Maturity date must be after start date' },
        { status: 400 }
      );
    }

    const insertData = {
      lender_name,
      lender_contact: lender_contact || null,
      original_amount,
      current_balance,
      interest_rate: interest_rate || 0,
      monthly_payment,
      start_date,
      maturity_date,
      payment_day: payment_day || 1,
      terms: terms || null,
    };

    const { data, error } = await supabaseAdmin
      .from('loans')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating loan:', error);
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { data: null, error: 'Loans table not found. Please run database migrations.' },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { data: null, error: `Failed to create loan: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data as Loan, error: null }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/financials/loans:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
