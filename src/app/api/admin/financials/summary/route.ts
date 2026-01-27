/**
 * OpEx Summary API Route
 * Light Brand Consulting
 *
 * GET /api/admin/financials/summary - Get operating expenses summary
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/supabase-server-auth';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface CostRow {
  monthly_cost: number;
}

interface TeamCostRow {
  monthly_cost: number;
  start_date: string | null;
}

/**
 * GET /api/admin/financials/summary
 * Get operating expenses summary (totals for services, team, upcoming, and grand total)
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

    // Fetch active service costs
    const { data: servicesData, error: servicesError } = await supabaseAdmin
      .from('service_costs')
      .select('monthly_cost')
      .eq('is_active', true);

    if (servicesError) {
      console.error('Error fetching service costs:', servicesError);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch service costs' },
        { status: 500 }
      );
    }

    // Fetch active team overhead (including start_date for filtering)
    const { data: teamData, error: teamError } = await supabaseAdmin
      .from('team_overhead')
      .select('monthly_cost, start_date')
      .eq('is_active', true);

    if (teamError) {
      console.error('Error fetching team overhead:', teamError);
      return NextResponse.json(
        { data: null, error: 'Failed to fetch team overhead' },
        { status: 500 }
      );
    }

    // Cast to typed arrays
    const services = (servicesData || []) as CostRow[];
    const allTeam = (teamData || []) as TeamCostRow[];

    // Split team into current and upcoming based on start_date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentTeam = allTeam.filter(t => {
      if (!t.start_date) return true; // No start date = current
      const startDate = new Date(t.start_date);
      return startDate <= today;
    });

    const upcomingTeam = allTeam.filter(t => {
      if (!t.start_date) return false;
      const startDate = new Date(t.start_date);
      return startDate > today;
    });

    // Calculate totals
    const serviceCostsTotal = services.reduce((sum, s) => sum + (Number(s.monthly_cost) || 0), 0);
    const teamOverheadTotal = currentTeam.reduce((sum, t) => sum + (Number(t.monthly_cost) || 0), 0);
    const upcomingTeamTotal = upcomingTeam.reduce((sum, t) => sum + (Number(t.monthly_cost) || 0), 0);
    const grandTotal = serviceCostsTotal + teamOverheadTotal;
    const projectedTotal = grandTotal + upcomingTeamTotal;

    const summary = {
      service_costs_total: serviceCostsTotal,
      team_overhead_total: teamOverheadTotal,
      upcoming_team_total: upcomingTeamTotal,
      grand_total: grandTotal,
      projected_total: projectedTotal,
      service_count: services.length,
      team_count: currentTeam.length,
      upcoming_team_count: upcomingTeam.length,
    };

    return NextResponse.json({ data: summary, error: null });
  } catch (error) {
    console.error('Error in GET /api/admin/financials/summary:', error);
    return NextResponse.json(
      { data: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
