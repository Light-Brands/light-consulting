/**
 * Admin Clients List Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AdminHeader, ViewToggle, CollapsibleStats } from '@/components/admin';
import type { ViewMode } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { Client, ClientStatus } from '@/types/clients';

const STATUS_LABELS: Record<ClientStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  archived: 'Archived',
};

const STATUS_COLORS: Record<ClientStatus, string> = {
  active: 'bg-green-500/10 text-green-400',
  inactive: 'bg-gray-500/10 text-gray-400',
  archived: 'bg-amber-500/10 text-amber-400',
};

interface ClientWithStats extends Client {
  project_count?: number;
  proposal_count?: number;
  total_value?: number;
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { authFetch } = useAuthFetch();

  const fetchClients = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (searchQuery) params.set('search', searchQuery);
      params.set('withStats', 'true');

      const response = await authFetch(`/api/clients?${params.toString()}`);
      const data = await response.json();

      if (data.data) {
        setClients(data.data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, statusFilter, searchQuery]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchClients();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchClients]);

  const handleDelete = async (id: string) => {
    try {
      const response = await authFetch(`/api/clients/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setClients(clients.filter((c) => c.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats = {
    total: clients.length,
    active: clients.filter((c) => c.status === 'active').length,
    inactive: clients.filter((c) => c.status === 'inactive').length,
    archived: clients.filter((c) => c.status === 'archived').length,
    totalValue: clients.reduce((sum, c) => sum + (c.total_value || 0), 0),
    totalProjects: clients.reduce((sum, c) => sum + (c.project_count || 0), 0),
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Clients"
        subtitle="Manage your clients"
        action={
          <Link href="/admin/clients/new">
            <Button variant="primary" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Client
            </Button>
          </Link>
        }
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Stats Row */}
          <CollapsibleStats>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
              {[
                { label: 'Total', value: stats.total, color: 'text-radiance-gold' },
                { label: 'Active', value: stats.active, color: 'text-green-400' },
                { label: 'Inactive', value: stats.inactive, color: 'text-gray-400' },
                { label: 'Archived', value: stats.archived, color: 'text-amber-400' },
                { label: 'Projects', value: stats.totalProjects, color: 'text-blue-400' },
                { label: 'Value', value: formatCurrency(stats.totalValue), color: 'text-radiance-gold', isValue: true },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-depth-surface border border-depth-border rounded-lg md:rounded-xl px-2 py-2 md:px-4 md:py-3 text-center"
                >
                  <p className={`font-bold ${stat.color} ${stat.isValue ? 'text-sm md:text-lg' : 'text-lg md:text-2xl'}`}>
                    {isLoading ? '-' : stat.value}
                  </p>
                  <p className="text-[10px] md:text-sm text-text-muted truncate">{stat.label}</p>
                </div>
              ))}
            </div>
          </CollapsibleStats>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients..."
              className="bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary text-sm focus:border-radiance-gold focus:outline-none w-full md:w-64"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary text-sm focus:border-radiance-gold focus:outline-none"
            >
              <option value="">All Statuses</option>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setStatusFilter('');
                setSearchQuery('');
              }}
              className="text-text-muted hover:text-text-primary text-sm transition-colors"
            >
              Clear Filters
            </button>

            <div className="flex-1" />

            <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>

          {/* Clients Table */}
          <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10">
              <div className="p-4 md:p-6 border-b border-depth-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                  <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                    Clients::All
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-text-primary">
                  All Clients
                </h2>
              </div>

              {isLoading ? (
                <div className="p-4 md:p-6 text-center text-text-muted">Loading...</div>
              ) : clients.length === 0 ? (
                <div className="p-4 md:p-6 text-center text-text-muted">
                  No clients found.{' '}
                  <Link
                    href="/admin/clients/new"
                    className="text-radiance-gold hover:underline"
                  >
                    Add your first client
                  </Link>
                </div>
              ) : (
                <>
                  {/* Card View */}
                  {viewMode === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                      {clients.map((client) => (
                        <div key={client.id} className="bg-depth-elevated border border-depth-border rounded-xl p-4 hover:border-radiance-gold/30 transition-all">
                          <div className="flex items-start gap-3 mb-3">
                            {client.logo_url ? (
                              <img
                                src={client.logo_url}
                                alt={client.client_name}
                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-radiance-gold/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-radiance-gold font-semibold text-lg">
                                  {client.client_name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/admin/clients/${client.id}`}
                                className="font-medium text-text-primary hover:text-radiance-gold transition-colors block"
                              >
                                {client.client_name}
                              </Link>
                              {client.client_company && (
                                <p className="text-sm text-text-muted truncate">{client.client_company}</p>
                              )}
                              <p className="text-xs text-text-muted truncate">{client.client_email}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                                STATUS_COLORS[client.status]
                              }`}
                            >
                              {STATUS_LABELS[client.status]}
                            </span>
                            <span className="text-xs text-text-muted">
                              {client.project_count || 0} projects
                            </span>
                            <span className="text-xs text-text-muted">
                              {formatCurrency(client.total_value || 0)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/clients/${client.id}`}
                              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-depth-base hover:bg-depth-border text-text-secondary rounded-lg transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </Link>
                            <Link
                              href={`/admin/clients/${client.id}/edit`}
                              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-radiance-gold/10 hover:bg-radiance-gold/20 text-radiance-gold rounded-lg transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </Link>
                            <button
                              onClick={() => setDeleteId(client.id)}
                              className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* List View */}
                  {viewMode === 'list' && (
                    <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                      <thead className="bg-depth-elevated">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                            Client
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                            Contact
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                            Projects
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                            Total Value
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                            Status
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider whitespace-nowrap">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-depth-border">
                        {clients.map((client) => (
                          <tr
                            key={client.id}
                            className="hover:bg-depth-elevated transition-colors"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3 min-w-[180px]">
                                {client.logo_url ? (
                                  <img
                                    src={client.logo_url}
                                    alt={client.client_name}
                                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-radiance-gold/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-radiance-gold font-semibold text-sm">
                                      {client.client_name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-text-primary whitespace-nowrap">
                                    {client.client_name}
                                  </p>
                                  {client.client_company && (
                                    <p className="text-sm text-text-muted whitespace-nowrap">
                                      {client.client_company}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="text-sm text-text-primary">{client.client_email}</p>
                              {client.client_phone && (
                                <p className="text-sm text-text-muted">{client.client_phone}</p>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="text-text-primary">
                                {client.project_count || 0} projects
                              </p>
                              <p className="text-sm text-text-muted">
                                {client.proposal_count || 0} proposals
                              </p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="font-medium text-text-primary">
                                {formatCurrency(client.total_value || 0)}
                              </p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs rounded-full font-medium ${
                                  STATUS_COLORS[client.status]
                                }`}
                              >
                                {STATUS_LABELS[client.status]}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1">
                                <Link
                                  href={`/admin/clients/${client.id}`}
                                  className="p-2 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors"
                                  title="View"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </Link>
                                <Link
                                  href={`/admin/clients/${client.id}/edit`}
                                  className="p-2 text-text-muted hover:text-text-primary hover:bg-depth-elevated rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </Link>
                                <button
                                  onClick={() => setDeleteId(client.id)}
                                  className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDeleteId(null)}
          />
          <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Delete Client
            </h3>
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete this client? This will also delete all related projects. Proposals will be unlinked but not deleted. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDelete(deleteId)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
