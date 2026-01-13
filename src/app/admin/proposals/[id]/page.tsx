/**
 * Admin Proposal Detail Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import type { ProposalWithDetails, ProposalStatus, ProposalPhase } from '@/types/proposals';

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminProposalDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [proposal, setProposal] = useState<ProposalWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [updatingPhaseId, setUpdatingPhaseId] = useState<string | null>(null);

  useEffect(() => {
    fetchProposal();
  }, [id]);

  const fetchProposal = async () => {
    try {
      const response = await fetch(`/api/proposals/${id}`);
      const data = await response.json();

      if (data.data) {
        setProposal(data.data);
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: ProposalStatus) => {
    if (!proposal) return;

    try {
      const updates: Record<string, string | null> = { status: newStatus };
      if (newStatus === 'sent' && !proposal.sent_at) {
        updates.sent_at = new Date().toISOString();
      }

      const response = await fetch(`/api/proposals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const data = await response.json();
        setProposal((prev) => (prev ? { ...prev, ...data.data } : null));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const copyAccessLink = () => {
    if (!proposal) return;
    const url = `${window.location.origin}/proposals/${proposal.access_token}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePhaseVisibilityToggle = async (phaseId: string, visible: boolean) => {
    if (!proposal) return;

    setUpdatingPhaseId(phaseId);
    try {
      const response = await fetch(`/api/proposals/${id}/phases/${phaseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible_in_portal: visible }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the local state with the updated phase
        setProposal((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            phases: prev.phases.map((p) =>
              p.id === phaseId ? { ...p, visible_in_portal: visible } : p
            ),
          };
        });
      }
    } catch (error) {
      console.error('Error updating phase visibility:', error);
    } finally {
      setUpdatingPhaseId(null);
    }
  };

  const visiblePhasesCount = proposal?.phases.filter((p) => p.visible_in_portal).length ?? 0;
  const totalPhasesCount = proposal?.phases.length ?? 0;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Loading..." subtitle="Please wait" />
        <Container size="wide" className="py-12">
          <div className="text-center text-text-muted">Loading proposal...</div>
        </Container>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Proposal Not Found" subtitle="The requested proposal could not be found" />
        <Container size="wide" className="py-12">
          <Link href="/admin/proposals" className="text-radiance-gold hover:text-radiance-amber">
            Back to Proposals
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminHeader
        title={proposal.project_name}
        subtitle={`For ${proposal.client_name}`}
        action={
          <div className="flex gap-3">
            <Button variant="outline" onClick={copyAccessLink}>
              {copied ? 'Copied!' : 'Copy Client Link'}
            </Button>
            <Link href={`/admin/proposals/${id}/edit`}>
              <Button variant="primary">Edit Proposal</Button>
            </Link>
          </div>
        }
      />

      <div className="py-8 md:py-12 relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Back Link */}
          <Link
            href="/admin/proposals"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Proposals
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
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
                        Proposal::Overview
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-text-primary">
                      Project Overview
                    </h2>
                  </div>
                  <div className="p-6">
                    {proposal.project_overview ? (
                      <div className="prose prose-invert max-w-none">
                        <div className="whitespace-pre-wrap text-text-secondary">
                          {proposal.project_overview}
                        </div>
                      </div>
                    ) : (
                      <p className="text-text-muted">No overview provided</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Phases */}
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
                      <div className="w-1.5 h-1.5 rounded-full bg-wisdom-violet/50" />
                      <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                        Proposal::Phases
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-text-primary">
                        Project Phases ({proposal.phases.length})
                      </h2>
                      <span className="text-sm text-text-muted">
                        <span className="text-radiance-gold font-medium">{visiblePhasesCount}</span> of {totalPhasesCount} visible to client
                      </span>
                    </div>
                  </div>
                  <div className="divide-y divide-depth-border">
                    {proposal.phases.length > 0 ? (
                      proposal.phases.map((phase) => (
                        <div
                          key={phase.id}
                          className={`p-6 transition-opacity ${
                            !phase.visible_in_portal ? 'opacity-60' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-radiance-gold text-sm font-mono">
                                    Phase {phase.phase_number}
                                  </span>
                                  {!phase.visible_in_portal && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-500/10 text-gray-400">
                                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                      </svg>
                                      Hidden
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary">
                                  {phase.phase_name}
                                </h3>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={phase.visible_in_portal}
                                  onChange={(e) => handlePhaseVisibilityToggle(phase.id, e.target.checked)}
                                  disabled={updatingPhaseId === phase.id}
                                  className="w-4 h-4 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold focus:ring-offset-0 disabled:opacity-50"
                                />
                                <span className="text-sm text-text-muted whitespace-nowrap">
                                  {updatingPhaseId === phase.id ? 'Saving...' : 'Visible'}
                                </span>
                              </label>
                              <div className="text-right">
                                <p className="text-text-primary font-bold">
                                  {formatCurrency(phase.amount)}
                                </p>
                                {phase.timeline && (
                                  <p className="text-text-muted text-sm">{phase.timeline}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          {phase.description && (
                            <p className="text-text-secondary mb-4">{phase.description}</p>
                          )}
                          {phase.deliverables && phase.deliverables.length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-text-muted text-sm font-medium mb-2">Deliverables</h4>
                              <ul className="list-disc list-inside text-text-secondary">
                                {phase.deliverables.map((d) => (
                                  <li key={d.id}>{d.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {phase.objectives && phase.objectives.length > 0 && (
                            <div>
                              <h4 className="text-text-muted text-sm font-medium mb-2">Objectives</h4>
                              <ul className="list-disc list-inside text-text-secondary">
                                {phase.objectives.map((obj, i) => (
                                  <li key={i}>{obj}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-text-muted">No phases defined</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Milestones */}
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
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                      <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                        Proposal::Milestones
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-text-primary">
                      Payment Milestones ({proposal.milestones.length})
                    </h2>
                  </div>
                  <div className="divide-y divide-depth-border">
                    {proposal.milestones.length > 0 ? (
                      proposal.milestones.map((milestone) => (
                        <div key={milestone.id} className="p-6 flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-text-primary">
                              {milestone.milestone_name}
                            </h4>
                            {milestone.description && (
                              <p className="text-text-muted text-sm">{milestone.description}</p>
                            )}
                            {milestone.due_date && (
                              <p className="text-text-muted text-sm">
                                Due: {formatDate(milestone.due_date)}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-text-primary">
                              {formatCurrency(milestone.amount)}
                            </p>
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded-full ${
                                milestone.payment_status === 'paid'
                                  ? 'bg-green-500/10 text-green-400'
                                  : milestone.payment_status === 'overdue'
                                  ? 'bg-red-500/10 text-red-400'
                                  : 'bg-gray-500/10 text-gray-400'
                              }`}
                            >
                              {milestone.payment_status}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-text-muted">No milestones defined</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Actions */}
              <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                    <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                      Status
                    </span>
                  </div>
                  <select
                    value={proposal.status}
                    onChange={(e) => handleStatusChange(e.target.value as ProposalStatus)}
                    className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary focus:border-radiance-gold focus:outline-none mb-4"
                  >
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>

                  <Link href={`/admin/proposals/${id}/dashboard`} className="block">
                    <Button variant="outline" fullWidth>
                      Manage Dashboard
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Client Info */}
              <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative z-10 p-6 space-y-4">
                  <h3 className="font-semibold text-text-primary">Client</h3>
                  <div>
                    <p className="text-text-primary font-medium">{proposal.client_name}</p>
                    <a
                      href={`mailto:${proposal.client_email}`}
                      className="text-radiance-gold text-sm hover:text-radiance-amber"
                    >
                      {proposal.client_email}
                    </a>
                    {proposal.client_company && (
                      <p className="text-text-muted text-sm">{proposal.client_company}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative z-10 p-6 space-y-3">
                  <h3 className="font-semibold text-text-primary">Pricing</h3>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Total</span>
                    <span className="text-text-primary">{formatCurrency(proposal.total_amount)}</span>
                  </div>
                  {proposal.discount_percentage > 0 && (
                    <div className="flex justify-between">
                      <span className="text-text-muted">Discount ({proposal.discount_percentage}%)</span>
                      <span className="text-red-400">
                        -{formatCurrency(proposal.total_amount * proposal.discount_percentage / 100)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-depth-border">
                    <span className="text-text-primary font-semibold">Final Amount</span>
                    <span className="text-radiance-gold font-bold text-lg">
                      {formatCurrency(proposal.final_amount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative z-10 p-6 space-y-3">
                  <h3 className="font-semibold text-text-primary">Timeline</h3>
                  {proposal.total_timeline && (
                    <div>
                      <span className="text-text-muted text-sm block">Duration</span>
                      <span className="text-text-primary">{proposal.total_timeline}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-text-muted text-sm block">Created</span>
                    <span className="text-text-primary">{formatDate(proposal.created_at)}</span>
                  </div>
                  {proposal.sent_at && (
                    <div>
                      <span className="text-text-muted text-sm block">Sent</span>
                      <span className="text-text-primary">{formatDate(proposal.sent_at)}</span>
                    </div>
                  )}
                  {proposal.viewed_at && (
                    <div>
                      <span className="text-text-muted text-sm block">Viewed</span>
                      <span className="text-text-primary">{formatDate(proposal.viewed_at)}</span>
                    </div>
                  )}
                  {proposal.agreement_signed_at && (
                    <div>
                      <span className="text-text-muted text-sm block">Agreement Signed</span>
                      <span className="text-green-400">{formatDate(proposal.agreement_signed_at)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Agreement Status */}
              {proposal.agreement && (
                <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className="relative z-10 p-6">
                    <h3 className="font-semibold text-text-primary mb-3">Agreement</h3>
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full ${
                        proposal.agreement.status === 'signed'
                          ? 'bg-green-500/10 text-green-400'
                          : proposal.agreement.status === 'declined'
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {proposal.agreement.status === 'signed' ? 'Signed' : proposal.agreement.status === 'declined' ? 'Declined' : 'Pending Signature'}
                    </span>
                    {proposal.agreement.signed_by_name && (
                      <div className="mt-3">
                        <span className="text-text-muted text-sm block">Signed by</span>
                        <span className="text-text-primary">{proposal.agreement.signed_by_name}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
