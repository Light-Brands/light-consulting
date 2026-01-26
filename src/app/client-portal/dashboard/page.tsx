/**
 * Client Command Center Dashboard Page
 * Light Brand Consulting
 *
 * Main dashboard showing aggregated client data
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { useClientAuth } from '@/contexts/ClientAuthContext';
import type {
  ClientCommandCenterData,
  ClientActionItem,
  ClientProposalSummary,
  PROPOSAL_STATUS_DISPLAY,
} from '@/types/client-portal';

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
  const displays: Record<string, { label: string; color: string; bgColor: string; borderColor: string }> = {
    draft: { label: 'Draft', color: 'text-gray-400', bgColor: 'bg-gray-500/10', borderColor: 'border-gray-500/30' },
    sent: { label: 'Sent', color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
    viewed: { label: 'Viewed', color: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30' },
    agreement_signed: { label: 'Signed', color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/30' },
    active: { label: 'Active', color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30' },
    completed: { label: 'Completed', color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
    cancelled: { label: 'Cancelled', color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' },
  };
  return displays[status] || displays.draft;
};

export default function CommandCenterDashboardPage() {
  const { session, isLoading: authLoading } = useClientAuth();
  const [data, setData] = useState<ClientCommandCenterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/client-portal/dashboard');
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || 'Failed to load dashboard');
          return;
        }

        setData(result.data);
      } catch (err) {
        console.error('Failed to fetch dashboard:', err);
        setError('Failed to load dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading && session) {
      fetchData();
    }
  }, [authLoading, session]);

  if (authLoading || isLoading) {
    return (
      <div className="py-8 md:py-12">
        <Container size="wide">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-depth-elevated rounded w-1/3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-depth-elevated rounded-xl" />
              ))}
            </div>
            <div className="h-64 bg-depth-elevated rounded-2xl" />
          </div>
        </Container>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-8 md:py-12">
        <Container size="wide">
          <div className="text-center py-16">
            <p className="text-red-400 mb-4">{error || 'Something went wrong'}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-radiance-gold hover:underline"
            >
              Try again
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <Container size="wide">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            Welcome back{session?.clientName ? `, ${session.clientName.split(' ')[0]}` : ''}
          </h1>
          <p className="text-text-muted">
            Your project overview and action items
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Active Projects"
            value={data.stats.active_proposals}
            color="text-green-400"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
          <StatCard
            label="Actions Needed"
            value={data.action_items.length}
            color={data.action_items.length > 0 ? 'text-amber-400' : 'text-text-muted'}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
          <StatCard
            label="Total Invested"
            value={formatCurrency(data.stats.total_paid)}
            color="text-radiance-gold"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            label="Payments Due"
            value={formatCurrency(data.stats.payments_due_amount)}
            color={data.stats.payments_due_amount > 0 ? 'text-amber-400' : 'text-text-muted'}
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Action Items */}
            {data.action_items.length > 0 && (
              <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div className="p-4 md:p-6 border-b border-depth-border flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Action Required
                  </h2>
                  <span className="text-text-muted text-sm">
                    {data.action_items.length} item{data.action_items.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="divide-y divide-depth-border">
                  {data.action_items.slice(0, 5).map((item) => (
                    <ActionItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Active Proposals */}
            <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
              <div className="p-4 md:p-6 border-b border-depth-border flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-primary">
                  Your Proposals
                </h2>
                <Link
                  href="/client-portal/proposals"
                  className="text-radiance-gold text-sm hover:underline"
                >
                  View All
                </Link>
              </div>
              {data.proposals.length === 0 ? (
                <div className="p-6 text-center text-text-muted">
                  No proposals yet. Contact your project manager to get started.
                </div>
              ) : (
                <div className="divide-y divide-depth-border">
                  {data.proposals.slice(0, 5).map((proposal) => (
                    <ProposalCard key={proposal.id} proposal={proposal} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Financial Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Total Project Value</span>
                  <span className="text-text-primary font-semibold">
                    {formatCurrency(data.stats.total_value)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Paid to Date</span>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(data.stats.total_paid)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Remaining</span>
                  <span className="text-text-primary font-semibold">
                    {formatCurrency(data.stats.total_remaining)}
                  </span>
                </div>
                <div className="pt-4 border-t border-depth-border">
                  <Link
                    href="/client-portal/billing"
                    className="block w-full text-center px-4 py-2 bg-radiance-gold/10 text-radiance-gold rounded-lg hover:bg-radiance-gold/20 transition-colors text-sm font-medium"
                  >
                    View Billing Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
              <div className="p-4 md:p-6 border-b border-depth-border">
                <h3 className="text-lg font-semibold text-text-primary">
                  Recent Activity
                </h3>
              </div>
              {data.recent_activity.length === 0 ? (
                <div className="p-6 text-center text-text-muted text-sm">
                  No recent activity
                </div>
              ) : (
                <div className="divide-y divide-depth-border">
                  {data.recent_activity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="p-4">
                      <p className="text-text-primary text-sm font-medium">
                        {activity.title}
                      </p>
                      {activity.description && (
                        <p className="text-text-muted text-xs mt-1 line-clamp-2">
                          {activity.description}
                        </p>
                      )}
                      <p className="text-text-muted/60 text-xs mt-2">
                        {formatDate(activity.created_at)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Stat Card Component
function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-depth-surface border border-depth-border rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className={`${color} opacity-60`}>{icon}</div>
      </div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-text-muted">{label}</p>
    </div>
  );
}

// Action Item Card Component
function ActionItemCard({ item }: { item: ClientActionItem }) {
  const getActionIcon = () => {
    switch (item.type) {
      case 'sign_agreement':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        );
      case 'make_payment':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
    }
  };

  const getActionLabel = () => {
    switch (item.type) {
      case 'sign_agreement':
        return 'Sign Agreement';
      case 'make_payment':
        return 'Make Payment';
      case 'complete_onboarding':
        return 'Complete';
      default:
        return 'Take Action';
    }
  };

  return (
    <div className="p-4 md:p-6 hover:bg-depth-elevated/50 transition-colors">
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            item.priority === 'urgent'
              ? 'bg-red-500/10 text-red-400'
              : 'bg-amber-500/10 text-amber-400'
          }`}
        >
          {getActionIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-text-primary font-medium">{item.title}</h3>
              <p className="text-text-muted text-sm">{item.proposal_name}</p>
              {item.due_date && (
                <p className="text-text-muted/60 text-xs mt-1">
                  Due: {formatDate(item.due_date)}
                </p>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              {item.amount && (
                <p className="text-text-primary font-semibold mb-2">
                  {formatCurrency(item.amount)}
                </p>
              )}
              <Link
                href={item.action_url}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-radiance-gold text-depth-base text-sm font-medium rounded-lg hover:bg-radiance-gold/90 transition-colors"
              >
                {getActionLabel()}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Proposal Card Component
function ProposalCard({ proposal }: { proposal: ClientProposalSummary }) {
  const statusDisplay = getStatusDisplay(proposal.status);

  return (
    <Link
      href={`/proposals/${proposal.access_token}`}
      className="block p-4 md:p-6 hover:bg-depth-elevated/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="min-w-0">
          <h3 className="text-text-primary font-semibold truncate">
            {proposal.project_name}
          </h3>
          <p className="text-text-muted text-sm">
            {proposal.client_company || proposal.client_name}
          </p>
        </div>
        <span
          className={`px-3 py-1 text-xs rounded-full border ${statusDisplay.bgColor} ${statusDisplay.color} ${statusDisplay.borderColor}`}
        >
          {statusDisplay.label}
        </span>
      </div>

      {/* Progress bar for active proposals */}
      {proposal.status === 'active' && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-text-muted mb-1">
            <span>Progress</span>
            <span>{proposal.progress_percentage}%</span>
          </div>
          <div className="h-1.5 bg-depth-elevated rounded-full overflow-hidden">
            <div
              className="h-full bg-radiance-gold rounded-full transition-all"
              style={{ width: `${proposal.progress_percentage}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <span className="text-text-muted">
          {formatCurrency(proposal.final_amount)}
        </span>
        {proposal.has_pending_action && (
          <span className="text-amber-400 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Action needed
          </span>
        )}
      </div>
    </Link>
  );
}
