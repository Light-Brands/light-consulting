/**
 * Admin Leads Management Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin';
import { Container, Button, Badge } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { LeadSubmission, LeadStatus } from '@/types/proposals';

const SERVICE_LABELS: Record<string, string> = {
  diagnostic: 'Diagnostic',
  'command-center': 'Command Center',
  'authority-engine': 'Authority Engine',
  ascension: 'Ascension',
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  proposal_sent: 'Proposal Sent',
  converted: 'Converted',
  archived: 'Archived',
};

const STATUS_COLORS: Record<LeadStatus, 'primary' | 'secondary' | 'success' | 'warning' | 'error'> = {
  new: 'primary',
  contacted: 'warning',
  proposal_sent: 'secondary',
  converted: 'success',
  archived: 'error',
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [serviceFilter, setServiceFilter] = useState<string>('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { authFetch } = useAuthFetch();

  const fetchLeads = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (serviceFilter) params.set('service', serviceFilter);

      const response = await authFetch(`/api/leads?${params.toString()}`);
      const data = await response.json();

      if (data.data) {
        setLeads(data.data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, statusFilter, serviceFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleDelete = async (id: string) => {
    try {
      const response = await authFetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLeads(leads.filter((lead) => lead.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      const response = await authFetch(`/api/leads/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        setLeads(leads.map((lead) => (lead.id === id ? data.data : lead)));
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    proposal_sent: leads.filter((l) => l.status === 'proposal_sent').length,
    converted: leads.filter((l) => l.status === 'converted').length,
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Lead Submissions"
        subtitle="Manage leads from the booking page"
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Stats Row - Grid layout that fits on screen */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-3 mb-4 md:mb-8">
            {[
              { label: 'Total', value: stats.total, color: 'text-radiance-gold' },
              { label: 'New', value: stats.new, color: 'text-blue-400' },
              { label: 'Contacted', value: stats.contacted, color: 'text-amber-400' },
              { label: 'Sent', value: stats.proposal_sent, color: 'text-purple-400' },
              { label: 'Converted', value: stats.converted, color: 'text-green-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-depth-surface border border-depth-border rounded-lg md:rounded-xl px-2 py-2 md:px-4 md:py-3 text-center"
              >
                <p className={`font-bold ${stat.color} text-lg md:text-2xl`}>
                  {isLoading ? '-' : stat.value}
                </p>
                <p className="text-[10px] md:text-sm text-text-muted truncate">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
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

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary text-sm focus:border-radiance-gold focus:outline-none"
            >
              <option value="">All Services</option>
              {Object.entries(SERVICE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setStatusFilter('');
                setServiceFilter('');
              }}
              className="text-text-muted hover:text-text-primary text-sm transition-colors"
            >
              Clear Filters
            </button>
          </div>

          {/* Leads Table */}
          <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10">
              <div className="p-6 border-b border-depth-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                  <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                    Leads::All_Submissions
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Lead Submissions
                </h2>
              </div>

              {isLoading ? (
                <div className="p-6 text-center text-text-muted">Loading...</div>
              ) : leads.length === 0 ? (
                <div className="p-6 text-center text-text-muted">
                  No leads found. Leads will appear here when customers submit the booking form.
                </div>
              ) : (
                <>
                  {/* Mobile Card View */}
                  <div className="md:hidden divide-y divide-depth-border">
                    {leads.map((lead) => (
                      <div key={lead.id} className="p-4">
                        {/* Header: Name + Status */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/admin/leads/${lead.id}`}
                              className="font-medium text-text-primary hover:text-radiance-gold transition-colors block truncate"
                            >
                              {lead.name}
                            </Link>
                            <p className="text-sm text-text-muted truncate">{lead.email}</p>
                            {lead.company && (
                              <p className="text-sm text-text-muted truncate">{lead.company}</p>
                            )}
                          </div>
                          {lead.readiness_score !== null && (
                            <div className="flex items-center gap-1 ml-3 bg-radiance-gold/10 px-2 py-1 rounded-lg">
                              <span className="text-sm font-semibold text-radiance-gold">
                                {lead.readiness_score}
                              </span>
                              <span className="text-[10px] text-text-muted">/100</span>
                            </div>
                          )}
                        </div>

                        {/* Status dropdown + Date */}
                        <div className="flex items-center gap-3 mb-3">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as LeadStatus)
                            }
                            className="flex-1 bg-depth-base border border-depth-border rounded-lg px-3 py-2 text-sm text-text-primary focus:border-radiance-gold focus:outline-none"
                          >
                            {Object.entries(STATUS_LABELS).map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                          <span className="text-xs text-text-muted whitespace-nowrap">
                            {formatDate(lead.created_at)}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/leads/${lead.id}`}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-depth-elevated hover:bg-depth-border text-text-secondary rounded-lg transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </Link>
                          <Link
                            href={`/admin/proposals/new?lead=${lead.id}`}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-wisdom-violet/10 hover:bg-wisdom-violet/20 text-wisdom-violet rounded-lg transition-colors text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                            </svg>
                            Proposal
                          </Link>
                          <button
                            onClick={() => setDeleteId(lead.id)}
                            className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-depth-elevated">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Website
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Readiness
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-depth-border">
                        {leads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="hover:bg-depth-elevated transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-text-primary">
                                  {lead.name}
                                </p>
                                <p className="text-sm text-text-muted">{lead.email}</p>
                                {lead.company && (
                                  <p className="text-sm text-text-muted">
                                    {lead.company}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {lead.website_url ? (
                                <a
                                  href={lead.website_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-radiance-gold hover:text-radiance-amber transition-colors text-sm break-all max-w-xs truncate block"
                                  title={lead.website_url}
                                >
                                  {lead.website_url.replace(/^https?:\/\//, '')}
                                </a>
                              ) : (
                                <span className="text-text-muted text-sm">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {lead.readiness_score !== null ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-semibold text-radiance-gold">
                                    {lead.readiness_score}
                                  </span>
                                  <span className="text-xs text-text-muted">/100</span>
                                </div>
                              ) : (
                                <span className="text-text-muted text-sm">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <select
                                value={lead.status}
                                onChange={(e) =>
                                  handleStatusChange(lead.id, e.target.value as LeadStatus)
                                }
                                className="bg-depth-base border border-depth-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:border-radiance-gold focus:outline-none"
                              >
                                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                  <option key={value} value={value}>
                                    {label}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-6 py-4 text-sm text-text-muted">
                              {formatDate(lead.created_at)}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  href={`/admin/leads/${lead.id}`}
                                  className="p-2 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors"
                                  title="View"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </Link>
                                <Link
                                  href={`/admin/proposals/new?lead=${lead.id}`}
                                  className="p-2 text-text-muted hover:text-wisdom-violet hover:bg-wisdom-violet/10 rounded-lg transition-colors"
                                  title="Create Proposal"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </Link>
                                <button
                                  onClick={() => setDeleteId(lead.id)}
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
              Delete Lead
            </h3>
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete this lead? This action cannot be undone.
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
