/**
 * Financials Management Page
 * Light Brand Consulting
 *
 * Track operating expenses (OpEx) including service costs and team overhead
 */

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AdminHeader } from '@/components/admin';
import { Container } from '@/components/ui';
import { ServiceCostSection, TeamOverheadSection, UpcomingTeamSection, FixedCostSection, LoansSection } from '@/components/admin/financials';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import { formatCurrency, isUpcomingTeamMember } from '@/types/financials';
import type { ServiceCost, TeamOverhead, FixedCost, Loan, OpExSummary, CostType, FixedCostCategory } from '@/types/financials';

export default function FinancialsPage() {
  const [services, setServices] = useState<ServiceCost[]>([]);
  const [team, setTeam] = useState<TeamOverhead[]>([]);
  const [fixedCosts, setFixedCosts] = useState<FixedCost[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [summary, setSummary] = useState<OpExSummary | null>(null);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);
  const [isLoadingFixedCosts, setIsLoadingFixedCosts] = useState(true);
  const [isLoadingLoans, setIsLoadingLoans] = useState(true);
  const { authFetch } = useAuthFetch();

  // Split team into current and upcoming
  const { currentTeam, upcomingTeam } = useMemo(() => {
    const current: TeamOverhead[] = [];
    const upcoming: TeamOverhead[] = [];

    team.forEach(member => {
      if (isUpcomingTeamMember(member)) {
        upcoming.push(member);
      } else {
        current.push(member);
      }
    });

    return { currentTeam: current, upcomingTeam: upcoming };
  }, [team]);

  const fetchServices = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/financials/services');
      const data = await response.json();
      if (data.data) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoadingServices(false);
    }
  }, [authFetch]);

  const fetchTeam = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/financials/team');
      const data = await response.json();
      if (data.data) {
        setTeam(data.data);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setIsLoadingTeam(false);
    }
  }, [authFetch]);

  const fetchFixedCosts = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/financials/fixed-costs');
      const data = await response.json();
      if (data.data) {
        setFixedCosts(data.data);
      }
    } catch (error) {
      console.error('Error fetching fixed costs:', error);
    } finally {
      setIsLoadingFixedCosts(false);
    }
  }, [authFetch]);

  const fetchLoans = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/financials/loans');
      const data = await response.json();
      if (data.data) {
        setLoans(data.data);
      }
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      setIsLoadingLoans(false);
    }
  }, [authFetch]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/financials/summary');
      const data = await response.json();
      if (data.data) {
        setSummary(data.data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchServices();
    fetchTeam();
    fetchFixedCosts();
    fetchLoans();
    fetchSummary();
  }, [fetchServices, fetchTeam, fetchFixedCosts, fetchLoans, fetchSummary]);

  // Service CRUD handlers
  const handleAddService = async (data: {
    name: string;
    vendor: string | null;
    category: string;
    unit_cost: number;
    unit_type: string;
    quantity: number;
    notes: string | null;
  }) => {
    const response = await authFetch('/api/admin/financials/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchServices();
    fetchSummary();
  };

  const handleUpdateService = async (id: string, data: {
    name: string;
    vendor: string | null;
    category: string;
    unit_cost: number;
    unit_type: string;
    quantity: number;
    notes: string | null;
  }) => {
    const response = await authFetch(`/api/admin/financials/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchServices();
    fetchSummary();
  };

  const handleDeleteService = async (id: string) => {
    const response = await authFetch(`/api/admin/financials/services/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchServices();
    fetchSummary();
  };

  // Team CRUD handlers
  const handleAddTeam = async (data: {
    name: string;
    role: string | null;
    monthly_cost: number;
    cost_type: CostType;
    notes: string | null;
    start_date: string | null;
  }) => {
    const response = await authFetch('/api/admin/financials/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchTeam();
    fetchSummary();
  };

  const handleUpdateTeam = async (id: string, data: {
    name: string;
    role: string | null;
    monthly_cost: number;
    cost_type: CostType;
    notes: string | null;
    start_date: string | null;
  }) => {
    const response = await authFetch(`/api/admin/financials/team/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchTeam();
    fetchSummary();
  };

  const handleDeleteTeam = async (id: string) => {
    const response = await authFetch(`/api/admin/financials/team/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchTeam();
    fetchSummary();
  };

  const handleReorderTeam = async (orderedIds: string[]) => {
    // Optimistically update local state (only for current team)
    const reorderedTeam = orderedIds
      .map(id => currentTeam.find(m => m.id === id))
      .filter((m): m is TeamOverhead => m !== undefined);
    // Combine with upcoming team
    setTeam([...reorderedTeam, ...upcomingTeam]);

    const response = await authFetch('/api/admin/financials/team/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds }),
    });
    const result = await response.json();
    if (result.error) {
      // Revert on error
      fetchTeam();
      throw new Error(result.error);
    }
  };

  // Fixed Cost CRUD handlers
  const handleAddFixedCost = async (data: {
    name: string;
    description: string | null;
    category: FixedCostCategory;
    total_amount: number;
    start_date: string;
    end_date: string;
    notes: string | null;
  }) => {
    const response = await authFetch('/api/admin/financials/fixed-costs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchFixedCosts();
    fetchSummary();
  };

  const handleUpdateFixedCost = async (id: string, data: {
    name: string;
    description: string | null;
    category: FixedCostCategory;
    total_amount: number;
    start_date: string;
    end_date: string;
    notes: string | null;
  }) => {
    const response = await authFetch(`/api/admin/financials/fixed-costs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchFixedCosts();
    fetchSummary();
  };

  const handleDeleteFixedCost = async (id: string) => {
    const response = await authFetch(`/api/admin/financials/fixed-costs/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchFixedCosts();
    fetchSummary();
  };

  // Loan CRUD handlers
  const handleAddLoan = async (data: {
    lender_name: string;
    lender_contact: string | null;
    original_amount: number;
    current_balance: number;
    interest_rate: number;
    monthly_payment: number;
    start_date: string;
    maturity_date: string;
    payment_day: number;
    terms: string | null;
  }) => {
    const response = await authFetch('/api/admin/financials/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchLoans();
  };

  const handleUpdateLoan = async (id: string, data: {
    lender_name: string;
    lender_contact: string | null;
    original_amount: number;
    current_balance: number;
    interest_rate: number;
    monthly_payment: number;
    start_date: string;
    maturity_date: string;
    payment_day: number;
    terms: string | null;
  }) => {
    const response = await authFetch(`/api/admin/financials/loans/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchLoans();
  };

  const handleDeleteLoan = async (id: string) => {
    const response = await authFetch(`/api/admin/financials/loans/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    fetchLoans();
  };

  const isLoading = isLoadingServices || isLoadingTeam || isLoadingFixedCosts || isLoadingLoans;

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Financials"
        subtitle="Track operating expenses and team overhead"
      />

      <div className="py-4 md:py-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                label: 'Services',
                value: summary ? formatCurrency(summary.service_costs_total) : '-',
                subtitle: `${summary?.service_count || 0} services`,
                color: 'text-blue-400',
              },
              {
                label: 'Team',
                value: summary ? formatCurrency(summary.team_overhead_total) : '-',
                subtitle: `${summary?.team_count || 0} members`,
                color: 'text-purple-400',
              },
              {
                label: 'Fixed Costs',
                value: summary ? formatCurrency(summary.fixed_costs_total || 0) : '-',
                subtitle: `${summary?.fixed_costs_count || 0} active`,
                color: 'text-pink-400',
              },
              {
                label: 'Monthly OpEx',
                value: summary ? formatCurrency(summary.grand_total) : '-',
                subtitle: 'Current monthly',
                color: 'text-radiance-gold',
              },
              {
                label: 'Upcoming',
                value: summary ? `+${formatCurrency(summary.upcoming_team_total)}` : '-',
                subtitle: `${summary?.upcoming_team_count || 0} planned`,
                color: 'text-amber-400',
              },
              {
                label: 'Projected',
                value: summary ? formatCurrency(summary.projected_total) : '-',
                subtitle: 'With upcoming',
                color: 'text-emerald-400',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-depth-surface border border-depth-border rounded-xl px-4 py-3 text-center"
              >
                <p className={`text-xl md:text-2xl font-bold ${stat.color}`}>
                  {isLoading ? '-' : stat.value}
                </p>
                <p className="text-xs text-text-muted">{stat.label}</p>
                <p className="text-[10px] text-text-muted/70">{stat.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ServiceCostSection
              services={services}
              onAdd={handleAddService}
              onUpdate={handleUpdateService}
              onDelete={handleDeleteService}
              isLoading={isLoadingServices}
            />

            <TeamOverheadSection
              team={currentTeam}
              onAdd={handleAddTeam}
              onUpdate={handleUpdateTeam}
              onDelete={handleDeleteTeam}
              onReorder={handleReorderTeam}
              isLoading={isLoadingTeam}
            />
          </div>

          {/* Fixed Costs & Loans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FixedCostSection
              fixedCosts={fixedCosts}
              onAdd={handleAddFixedCost}
              onUpdate={handleUpdateFixedCost}
              onDelete={handleDeleteFixedCost}
              isLoading={isLoadingFixedCosts}
            />

            <LoansSection
              loans={loans}
              onAdd={handleAddLoan}
              onUpdate={handleUpdateLoan}
              onDelete={handleDeleteLoan}
              isLoading={isLoadingLoans}
            />
          </div>

          {/* Upcoming Team Section */}
          <UpcomingTeamSection
            team={upcomingTeam}
            onAdd={handleAddTeam}
            onUpdate={handleUpdateTeam}
            onDelete={handleDeleteTeam}
            isLoading={isLoadingTeam}
          />
        </Container>
      </div>
    </div>
  );
}
