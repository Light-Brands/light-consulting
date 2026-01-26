/**
 * Client Proposals List Page
 * Light Brand Consulting
 *
 * Lists all proposals for the authenticated client
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { useClientAuth } from '@/contexts/ClientAuthContext';
import type { ClientProposalSummary } from '@/types/client-portal';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getStatusDisplay = (status: string) => {
  const displays: Record<string, { label: string; color: string; bgColor: string; borderColor: string; icon: string }> = {
    draft: { label: 'Draft', color: 'text-gray-400', bgColor: 'bg-gray-500/10', borderColor: 'border-gray-500/30', icon: '' },
    sent: { label: 'Review Proposal', color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30', icon: '' },
    viewed: { label: 'Awaiting Signature', color: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30', icon: '' },
    agreement_signed: { label: 'Signed', color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/30', icon: '' },
    active: { label: 'Active', color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30', icon: '' },
    completed: { label: 'Completed', color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30', icon: '' },
    cancelled: { label: 'Cancelled', color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30', icon: '' },
  };
  return displays[status] || displays.draft;
};

type FilterStatus = 'all' | 'active' | 'pending' | 'completed';

export default function ClientProposalsPage() {
  const { session, isLoading: authLoading } = useClientAuth();
  const [proposals, setProposals] = useState<ClientProposalSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/client-portal/dashboard');
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || 'Failed to load proposals');
          return;
        }

        setProposals(result.data?.proposals || []);
      } catch (err) {
        console.error('Failed to fetch proposals:', err);
        setError('Failed to load proposals');
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading && session) {
      fetchData();
    }
  }, [authLoading, session]);

  // Filter proposals
  const filteredProposals = proposals.filter(p => {
    // Status filter
    if (filter === 'active' && p.status !== 'active') return false;
    if (filter === 'pending' && !['sent', 'viewed', 'agreement_signed'].includes(p.status)) return false;
    if (filter === 'completed' && p.status !== 'completed') return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        p.project_name.toLowerCase().includes(query) ||
        p.client_company?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Calculate filter counts
  const counts = {
    all: proposals.length,
    active: proposals.filter(p => p.status === 'active').length,
    pending: proposals.filter(p => ['sent', 'viewed', 'agreement_signed'].includes(p.status)).length,
    completed: proposals.filter(p => p.status === 'completed').length,
  };

  if (authLoading || isLoading) {
    return (
      <div className="py-8 md:py-12">
        <Container size="wide">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-depth-elevated rounded w-1/3" />
            <div className="h-12 bg-depth-elevated rounded" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-depth-elevated rounded-xl" />
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <Container size="wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
              My Proposals
            </h1>
            <p className="text-text-muted">
              View and manage all your project proposals
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Status Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { key: 'all', label: 'All' },
              { key: 'active', label: 'Active' },
              { key: 'pending', label: 'Pending' },
              { key: 'completed', label: 'Completed' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as FilterStatus)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === key
                    ? 'bg-radiance-gold/10 text-radiance-gold border border-radiance-gold/30'
                    : 'bg-depth-surface text-text-secondary hover:text-text-primary border border-depth-border hover:border-depth-border/80'
                }`}
              >
                {label}
                <span className="ml-2 text-xs opacity-60">{counts[key as FilterStatus]}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 md:max-w-xs md:ml-auto">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search proposals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-depth-surface border border-depth-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-radiance-gold/50 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* Proposals List */}
        {error ? (
          <div className="text-center py-16 bg-depth-surface border border-depth-border rounded-2xl">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-radiance-gold hover:underline"
            >
              Try again
            </button>
          </div>
        ) : filteredProposals.length === 0 ? (
          <div className="text-center py-16 bg-depth-surface border border-depth-border rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-depth-elevated flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-text-muted">
              {searchQuery ? 'No proposals match your search' : 'No proposals found'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <ProposalListItem key={proposal.id} proposal={proposal} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

// Proposal List Item Component
function ProposalListItem({ proposal }: { proposal: ClientProposalSummary }) {
  const statusDisplay = getStatusDisplay(proposal.status);

  const getActionButton = () => {
    if (proposal.status === 'sent' || proposal.status === 'viewed') {
      return (
        <Link
          href={`/proposals/${proposal.access_token}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-radiance-gold text-depth-base text-sm font-semibold rounded-lg hover:bg-radiance-gold/90 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Sign Agreement
        </Link>
      );
    }

    if (proposal.next_payment_amount && proposal.next_payment_amount > 0) {
      return (
        <Link
          href={`/proposals/${proposal.access_token}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-radiance-gold text-depth-base text-sm font-semibold rounded-lg hover:bg-radiance-gold/90 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Make Payment
        </Link>
      );
    }

    return (
      <Link
        href={`/proposals/${proposal.access_token}`}
        className="inline-flex items-center gap-2 px-4 py-2 bg-depth-elevated text-text-primary text-sm font-medium rounded-lg hover:bg-depth-border transition-colors"
      >
        View Project
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    );
  };

  return (
    <div className="bg-depth-surface border border-depth-border rounded-xl p-6 hover:border-depth-border/80 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Status indicator */}
        <div
          className={`w-1 self-stretch rounded-full hidden md:block ${
            proposal.status === 'active'
              ? 'bg-green-500'
              : proposal.status === 'completed'
              ? 'bg-blue-500'
              : ['sent', 'viewed'].includes(proposal.status)
              ? 'bg-amber-500'
              : 'bg-gray-500'
          }`}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-semibold text-text-primary">
                  {proposal.project_name}
                </h3>
                <span
                  className={`px-2.5 py-0.5 text-xs rounded-full border ${statusDisplay.bgColor} ${statusDisplay.color} ${statusDisplay.borderColor}`}
                >
                  {statusDisplay.label}
                </span>
              </div>
              <p className="text-text-muted text-sm">
                {proposal.client_company || proposal.client_name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-text-primary">
                {formatCurrency(proposal.final_amount)}
              </p>
              {proposal.total_paid > 0 && (
                <p className="text-green-400 text-sm">
                  {formatCurrency(proposal.total_paid)} paid
                </p>
              )}
            </div>
          </div>

          {/* Progress bar for active proposals */}
          {proposal.status === 'active' && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>Progress</span>
                <span>{proposal.progress_percentage}%</span>
              </div>
              <div className="h-2 bg-depth-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-radiance-gold to-radiance-amber rounded-full transition-all"
                  style={{ width: `${proposal.progress_percentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Meta info and action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
              {proposal.phases_total > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {proposal.phases_completed}/{proposal.phases_total} phases
                </span>
              )}
              {proposal.sent_at && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Sent {formatDate(proposal.sent_at)}
                </span>
              )}
              {proposal.next_payment_due && (
                <span className="flex items-center gap-1 text-amber-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatCurrency(proposal.next_payment_amount || 0)} due {formatDate(proposal.next_payment_due)}
                </span>
              )}
            </div>
            {getActionButton()}
          </div>
        </div>
      </div>
    </div>
  );
}
