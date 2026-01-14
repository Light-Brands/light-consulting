/**
 * Admin Dashboard Management Page
 * Light Brand Consulting
 *
 * Manage dashboard updates and client-facing progress for a proposal
 */

'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin';
import { Container, Button, Input, Textarea } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { ProposalWithDetails, DashboardUpdate, UpdateType, Milestone } from '@/types/proposals';

const UPDATE_TYPE_LABELS: Record<UpdateType, string> = {
  milestone_update: 'Milestone Update',
  progress_update: 'Progress Update',
  comment: 'Comment',
  file_upload: 'File Upload',
  status_change: 'Status Change',
};

const UPDATE_TYPE_COLORS: Record<UpdateType, string> = {
  milestone_update: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  progress_update: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  comment: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
  file_upload: 'bg-green-500/10 text-green-400 border-green-500/30',
  status_change: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminDashboardManagementPage({ params }: PageProps) {
  const { id } = use(params);
  const { authFetch } = useAuthFetch();

  const [proposal, setProposal] = useState<ProposalWithDetails | null>(null);
  const [updates, setUpdates] = useState<DashboardUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // New update form state
  const [newUpdate, setNewUpdate] = useState({
    update_type: 'progress_update' as UpdateType,
    title: '',
    content: '',
    milestone_id: '',
  });

  const fetchProposal = useCallback(async () => {
    try {
      const response = await authFetch(`/api/proposals/${id}`);
      const data = await response.json();

      if (data.data) {
        setProposal(data.data);
        setUpdates(data.data.dashboard_updates || []);
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, id]);

  useEffect(() => {
    fetchProposal();
  }, [fetchProposal]);

  const handleCreateUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdate.title.trim()) return;

    setIsCreating(true);
    try {
      const response = await authFetch(`/api/proposals/${id}/dashboard`, {
        method: 'POST',
        body: JSON.stringify({
          update_type: newUpdate.update_type,
          title: newUpdate.title,
          content: newUpdate.content || null,
          milestone_id: newUpdate.milestone_id || null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          setUpdates([data.data, ...updates]);
          setNewUpdate({
            update_type: 'progress_update',
            title: '',
            content: '',
            milestone_id: '',
          });
          setShowCreateForm(false);
        }
      }
    } catch (error) {
      console.error('Error creating update:', error);
    } finally {
      setIsCreating(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Dashboard Management" subtitle="Loading..." />
        <Container size="wide" className="py-12">
          <div className="text-center text-text-muted">Loading...</div>
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
        title="Dashboard Management"
        subtitle={`${proposal.project_name} - ${proposal.client_name}`}
        action={
          <Button variant="primary" onClick={() => setShowCreateForm(true)}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Update
          </Button>
        }
      />

      <div className="py-8 md:py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Back Link */}
          <Link
            href={`/admin/proposals/${id}`}
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Proposal
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Updates */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Update Form */}
              {showCreateForm && (
                <div className="bg-depth-surface border border-radiance-gold/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">Create Dashboard Update</h3>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="text-text-muted hover:text-text-primary"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleCreateUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-text-primary text-sm font-medium mb-2">Update Type</label>
                        <select
                          value={newUpdate.update_type}
                          onChange={(e) => setNewUpdate({ ...newUpdate, update_type: e.target.value as UpdateType })}
                          className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary focus:border-radiance-gold focus:outline-none"
                        >
                          {Object.entries(UPDATE_TYPE_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {proposal.milestones.length > 0 && (
                        <div>
                          <label className="block text-text-primary text-sm font-medium mb-2">
                            Related Milestone (Optional)
                          </label>
                          <select
                            value={newUpdate.milestone_id}
                            onChange={(e) => setNewUpdate({ ...newUpdate, milestone_id: e.target.value })}
                            className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-3 text-text-primary focus:border-radiance-gold focus:outline-none"
                          >
                            <option value="">None</option>
                            {proposal.milestones.map((milestone) => (
                              <option key={milestone.id} value={milestone.id}>
                                {milestone.milestone_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    <Input
                      label="Title"
                      required
                      value={newUpdate.title}
                      onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                      placeholder="Update title..."
                    />

                    <Textarea
                      label="Content"
                      rows={4}
                      value={newUpdate.content}
                      onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                      placeholder="Update details (supports markdown)..."
                    />

                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="ghost" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary" isLoading={isCreating}>
                        Create Update
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Updates List */}
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
                        Dashboard::Updates
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-text-primary">
                      Dashboard Updates ({updates.length})
                    </h2>
                    <p className="text-text-muted text-sm mt-1">
                      These updates are visible to the client in their portal dashboard
                    </p>
                  </div>

                  {updates.length === 0 ? (
                    <div className="p-6 text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-text-muted mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <p className="text-text-muted mb-4">No dashboard updates yet</p>
                      <Button variant="outline" onClick={() => setShowCreateForm(true)}>
                        Create First Update
                      </Button>
                    </div>
                  ) : (
                    <div className="divide-y divide-depth-border">
                      {updates.map((update) => (
                        <div key={update.id} className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span
                                className={`px-3 py-1 text-xs rounded-full border ${
                                  UPDATE_TYPE_COLORS[update.update_type]
                                }`}
                              >
                                {UPDATE_TYPE_LABELS[update.update_type]}
                              </span>
                              <h3 className="font-semibold text-text-primary">{update.title}</h3>
                            </div>
                            <span className="text-text-muted text-sm">{formatDate(update.created_at)}</span>
                          </div>
                          {update.content && (
                            <p className="text-text-secondary whitespace-pre-wrap">{update.content}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Milestones */}
            <div className="space-y-6">
              {/* Milestones Card */}
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
                        Milestones
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      Payment Milestones ({proposal.milestones.length})
                    </h3>
                  </div>

                  {proposal.milestones.length === 0 ? (
                    <div className="p-6 text-center text-text-muted">No milestones defined</div>
                  ) : (
                    <div className="divide-y divide-depth-border">
                      {proposal.milestones.map((milestone) => (
                        <div key={milestone.id} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-text-primary">{milestone.milestone_name}</h4>
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full ${
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
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-text-muted">
                              {milestone.due_date
                                ? new Date(milestone.due_date).toLocaleDateString()
                                : 'No due date'}
                            </span>
                            <span className="text-radiance-gold font-medium">
                              ${milestone.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative z-10 p-6">
                  <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setNewUpdate({
                          update_type: 'progress_update',
                          title: '',
                          content: '',
                          milestone_id: '',
                        });
                        setShowCreateForm(true);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-depth-border hover:border-radiance-gold/50 hover:bg-radiance-gold/5 transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-sm">Progress Update</p>
                        <p className="text-text-muted text-xs">Share project progress</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setNewUpdate({
                          update_type: 'milestone_update',
                          title: '',
                          content: '',
                          milestone_id: proposal.milestones[0]?.id || '',
                        });
                        setShowCreateForm(true);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-depth-border hover:border-radiance-gold/50 hover:bg-radiance-gold/5 transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-sm">Milestone Update</p>
                        <p className="text-text-muted text-xs">Update milestone status</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setNewUpdate({
                          update_type: 'comment',
                          title: '',
                          content: '',
                          milestone_id: '',
                        });
                        setShowCreateForm(true);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-depth-border hover:border-radiance-gold/50 hover:bg-radiance-gold/5 transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-sm">Add Comment</p>
                        <p className="text-text-muted text-xs">Leave a note for client</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Client Portal Link */}
              <div className="relative bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.015] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="relative z-10 p-6">
                  <h3 className="font-semibold text-text-primary mb-2">Client Portal</h3>
                  <p className="text-text-muted text-sm mb-4">
                    Preview what the client sees in their dashboard
                  </p>
                  <a
                    href={`/proposals/${proposal.access_token}?tab=dashboard`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-radiance-gold hover:text-radiance-amber text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Client Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
