/**
 * Admin Proposals List Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AdminHeader, ViewToggle } from '@/components/admin';
import type { ViewMode } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { Proposal, ProposalStatus } from '@/types/proposals';

const STATUS_LABELS: Record<ProposalStatus, string> = {
  draft: 'Draft',
  sent: 'Sent',
  viewed: 'Viewed',
  agreement_signed: 'Signed',
  active: 'Active',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const STATUS_COLORS: Record<ProposalStatus, string> = {
  draft: 'bg-gray-500/10 text-gray-400',
  sent: 'bg-blue-500/10 text-blue-400',
  viewed: 'bg-amber-500/10 text-amber-400',
  agreement_signed: 'bg-purple-500/10 text-purple-400',
  active: 'bg-green-500/10 text-green-400',
  completed: 'bg-radiance-gold/10 text-radiance-gold',
  cancelled: 'bg-red-500/10 text-red-400',
};

export default function AdminProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { authFetch } = useAuthFetch();

  const fetchProposals = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);

      const response = await authFetch(`/api/proposals?${params.toString()}`);
      const data = await response.json();

      if (data.data) {
        setProposals(data.data);
      }
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, statusFilter]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const handleDelete = async (id: string) => {
    try {
      const response = await authFetch(`/api/proposals/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProposals(proposals.filter((p) => p.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting proposal:', error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const copyAccessLink = (accessToken: string) => {
    const url = `${window.location.origin}/proposals/${accessToken}`;
    navigator.clipboard.writeText(url);
  };

  const stats = {
    total: proposals.length,
    draft: proposals.filter((p) => p.status === 'draft').length,
    sent: proposals.filter((p) => p.status === 'sent').length,
    active: proposals.filter((p) => p.status === 'active' || p.status === 'agreement_signed').length,
    completed: proposals.filter((p) => p.status === 'completed').length,
    totalValue: proposals.reduce((sum, p) => sum + p.final_amount, 0),
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Proposals"
        subtitle="Manage client proposals"
        action={
          <Link href="/admin/proposals/new">
            <Button variant="primary" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Proposal
            </Button>
          </Link>
        }
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Stats Row - Grid layout that fits on screen */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-4 md:mb-8">
            {[
              { label: 'Total', value: stats.total, color: 'text-radiance-gold' },
              { label: 'Drafts', value: stats.draft, color: 'text-gray-400' },
              { label: 'Sent', value: stats.sent, color: 'text-blue-400' },
              { label: 'Active', value: stats.active, color: 'text-green-400' },
              { label: 'Done', value: stats.completed, color: 'text-amber-400' },
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

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
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
              onClick={() => setStatusFilter('')}
              className="text-text-muted hover:text-text-primary text-sm transition-colors"
            >
              Clear Filter
            </button>

            <div className="flex-1" />

            <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>

          {/* Proposals Table */}
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
                    Proposals::All
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-text-primary">
                  All Proposals
                </h2>
              </div>

              {isLoading ? (
                <div className="p-4 md:p-6 text-center text-text-muted">Loading...</div>
              ) : proposals.length === 0 ? (
                <div className="p-4 md:p-6 text-center text-text-muted">
                  No proposals found.{' '}
                  <Link
                    href="/admin/proposals/new"
                    className="text-radiance-gold hover:underline"
                  >
                    Create your first proposal
                  </Link>
                </div>
              ) : (
                <>
                  {/* Card View */}
                  {viewMode === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                      {proposals.map((proposal) => (
                        <div key={proposal.id} className="bg-depth-elevated border border-depth-border rounded-xl p-4 hover:border-radiance-gold/30 transition-all">
                          {/* Header: Project + Amount */}
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1 min-w-0 overflow-hidden">
                              <Link
                                href={`/admin/proposals/${proposal.id}`}
                                className="font-medium text-text-primary hover:text-radiance-gold transition-colors block break-words text-sm"
                                title={proposal.project_name}
                              >
                                {proposal.project_name.length > 50
                                  ? `${proposal.project_name.slice(0, 50)}...`
                                  : proposal.project_name}
                              </Link>
                              <p className="text-xs text-text-muted truncate">
                                {proposal.client_name}
                                {proposal.client_company && ` - ${proposal.client_company}`}
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0 whitespace-nowrap">
                              <p className="font-semibold text-text-primary text-sm">
                                {formatCurrency(proposal.final_amount)}
                              </p>
                            </div>
                          </div>

                          {/* Status + Date */}
                          <div className="flex items-center gap-2 mb-3">
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                                STATUS_COLORS[proposal.status]
                              }`}
                            >
                              {STATUS_LABELS[proposal.status]}
                            </span>
                            <span className="text-xs text-text-muted truncate">
                              {proposal.sent_at ? `Sent ${formatDate(proposal.sent_at)}` : 'Not sent'}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/proposals/${proposal.id}`}
                              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-depth-base hover:bg-depth-border text-text-secondary rounded-lg transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </Link>
                            <button
                              onClick={() => copyAccessLink(proposal.access_token)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 bg-radiance-gold/10 hover:bg-radiance-gold/20 text-radiance-gold rounded-lg transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                              Copy Link
                            </button>
                            <button
                              onClick={() => setDeleteId(proposal.id)}
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
                    <table className="w-full">
                      <thead className="bg-depth-elevated">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Project / Client
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                            Sent
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-depth-border">
                        {proposals.map((proposal) => (
                          <tr
                            key={proposal.id}
                            className="hover:bg-depth-elevated transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-text-primary">
                                  {proposal.project_name}
                                </p>
                                <p className="text-sm text-text-muted">
                                  {proposal.client_name}
                                  {proposal.client_company && ` - ${proposal.client_company}`}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-text-primary">
                                  {formatCurrency(proposal.final_amount)}
                                </p>
                                {proposal.discount_percentage > 0 && (
                                  <p className="text-sm text-text-muted line-through">
                                    {formatCurrency(proposal.total_amount)}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 text-xs rounded-full font-medium ${
                                  STATUS_COLORS[proposal.status]
                                }`}
                              >
                                {STATUS_LABELS[proposal.status]}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-text-muted">
                              {formatDate(proposal.sent_at)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => copyAccessLink(proposal.access_token)}
                                  className="p-2 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors"
                                  title="Copy client link"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                  </svg>
                                </button>
                                <Link
                                  href={`/admin/proposals/${proposal.id}`}
                                  className="p-2 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors"
                                  title="View"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </Link>
                                <Link
                                  href={`/admin/proposals/${proposal.id}/edit`}
                                  className="p-2 text-text-muted hover:text-text-primary hover:bg-depth-elevated rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </Link>
                                <button
                                  onClick={() => setDeleteId(proposal.id)}
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
              Delete Proposal
            </h3>
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete this proposal? This will also delete all related phases, milestones, agreements, and comments. This action cannot be undone.
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
