/**
 * Financials Management Page
 * Light Brand Consulting
 *
 * Track operating expenses (OpEx) including service costs and team overhead
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminHeader } from '@/components/admin';
import { Container } from '@/components/ui';
import { ServiceCostSection, TeamOverheadSection } from '@/components/admin/financials';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import { formatCurrency } from '@/types/financials';
import type { ServiceCost, TeamOverhead, OpExSummary, CostType } from '@/types/financials';

export default function FinancialsPage() {
  const [services, setServices] = useState<ServiceCost[]>([]);
  const [team, setTeam] = useState<TeamOverhead[]>([]);
  const [summary, setSummary] = useState<OpExSummary | null>(null);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);
  const { authFetch } = useAuthFetch();

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
    fetchSummary();
  }, [fetchServices, fetchTeam, fetchSummary]);

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

  const isLoading = isLoadingServices || isLoadingTeam;

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                label: 'Monthly OpEx',
                value: summary ? formatCurrency(summary.grand_total) : '-',
                subtitle: 'Total monthly',
                color: 'text-radiance-gold',
              },
              {
                label: 'Yearly Est.',
                value: summary ? formatCurrency(summary.grand_total * 12) : '-',
                subtitle: 'Projected annual',
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
              team={team}
              onAdd={handleAddTeam}
              onUpdate={handleUpdateTeam}
              onDelete={handleDeleteTeam}
              isLoading={isLoadingTeam}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
