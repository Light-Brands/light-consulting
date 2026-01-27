/**
 * Admin Client Project Detail Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { ClientProjectWithDetails } from '@/types/client-projects';
import type { Proposal } from '@/types/proposals';

const PROJECT_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  active: 'Active',
  completed: 'Completed',
  on_hold: 'On Hold',
  cancelled: 'Cancelled',
};

const PROJECT_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-500/10 text-gray-400',
  active: 'bg-green-500/10 text-green-400',
  completed: 'bg-radiance-gold/10 text-radiance-gold',
  on_hold: 'bg-amber-500/10 text-amber-400',
  cancelled: 'bg-red-500/10 text-red-400',
};

const PROPOSAL_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  sent: 'Sent',
  viewed: 'Viewed',
  negotiating: 'Negotiating',
  accepted: 'Accepted',
  agreement_signed: 'Signed',
  active: 'Active',
  completed: 'Completed',
  rejected: 'Rejected',
  expired: 'Expired',
};

const PROPOSAL_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-500/10 text-gray-400',
  sent: 'bg-blue-500/10 text-blue-400',
  viewed: 'bg-purple-500/10 text-purple-400',
  negotiating: 'bg-amber-500/10 text-amber-400',
  accepted: 'bg-green-500/10 text-green-400',
  agreement_signed: 'bg-green-500/10 text-green-400',
  active: 'bg-green-500/10 text-green-400',
  completed: 'bg-radiance-gold/10 text-radiance-gold',
  rejected: 'bg-red-500/10 text-red-400',
  expired: 'bg-gray-500/10 text-gray-400',
};

export default function AdminClientProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { authFetch } = useAuthFetch();
  const [project, setProject] = useState<ClientProjectWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchProject = useCallback(async () => {
    try {
      const response = await authFetch(`/api/client-projects/${id}?withDetails=true`);
      const data = await response.json();

      if (data.data) {
        setProject(data.data);
      } else {
        router.push('/admin/clients');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      router.push('/admin/clients');
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, id, router]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleDeleteProject = async () => {
    try {
      const response = await authFetch(`/api/client-projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push(`/admin/clients/${project?.client_id}`);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <AdminHeader
        title={project.project_name}
        subtitle={`Project for ${project.client?.client_name || 'Unknown Client'}`}
        action={
          <div className="flex gap-2">
            <Link href={`/admin/proposals/new?project_id=${id}&client_id=${project.client_id}`}>
              <Button variant="secondary" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Proposal
              </Button>
            </Link>
            <Link href={`/admin/client-projects/${id}/edit`}>
              <Button variant="primary" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Project
              </Button>
            </Link>
          </div>
        }
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          <Link
            href={`/admin/clients/${project.client_id}`}
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {project.client?.client_name || 'Client'}
          </Link>

          {/* Project Info Card */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 bg-depth-surface border border-depth-border rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-text-primary">
                      {project.project_name}
                    </h2>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        PROJECT_STATUS_COLORS[project.status]
                      }`}
                    >
                      {PROJECT_STATUS_LABELS[project.status]}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-text-secondary">{project.description}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-muted mb-1">Client</p>
                  <Link
                    href={`/admin/clients/${project.client_id}`}
                    className="text-text-primary hover:text-radiance-gold"
                  >
                    {project.client?.client_name}
                  </Link>
                  {project.client?.client_company && (
                    <p className="text-sm text-text-muted">{project.client.client_company}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-text-muted mb-1">Timeline</p>
                  <p className="text-text-primary">
                    {project.start_date ? formatDate(project.start_date) : 'Not set'}
                    {project.end_date && ` - ${formatDate(project.end_date)}`}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-depth-border flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Delete Project
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
              <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
                Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Proposals</span>
                  <span className="text-text-primary font-semibold">{project.proposal_count}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Progress</span>
                  <span className="text-text-primary font-semibold">{project.progress_percentage}%</span>
                </div>
                <div className="h-px bg-depth-border" />
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Total Value</span>
                  <span className="text-radiance-gold font-semibold">{formatCurrency(project.total_value)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Total Paid</span>
                  <span className="text-green-400 font-semibold">{formatCurrency(project.total_paid)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Proposals Section */}
          <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-depth-border flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                  <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                    Proposals::List
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Proposals
                </h2>
              </div>
              <Link href={`/admin/proposals/new?project_id=${id}&client_id=${project.client_id}`}>
                <Button variant="ghost" size="sm">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Proposal
                </Button>
              </Link>
            </div>

            {project.proposals.length === 0 ? (
              <div className="p-6 text-center text-text-muted">
                No proposals yet.{' '}
                <Link
                  href={`/admin/proposals/new?project_id=${id}&client_id=${project.client_id}`}
                  className="text-radiance-gold hover:underline"
                >
                  Create the first proposal
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-depth-border">
                {project.proposals.map((proposal: Proposal) => (
                  <div
                    key={proposal.id}
                    className="p-4 md:p-6 hover:bg-depth-elevated transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-text-primary truncate">
                            {proposal.project_name}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                              PROPOSAL_STATUS_COLORS[proposal.status] || 'bg-gray-500/10 text-gray-400'
                            }`}
                          >
                            {PROPOSAL_STATUS_LABELS[proposal.status] || proposal.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                          <span>{formatCurrency(proposal.final_amount || 0)}</span>
                          <span>{proposal.progress_percentage || 0}% complete</span>
                          {proposal.created_at && (
                            <span>Created {formatDate(proposal.created_at)}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/proposals/${proposal.id}`}
                          className="p-2 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors"
                          title="View Proposal"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <Link
                          href={`/admin/proposals/${proposal.id}/edit`}
                          className="p-2 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors"
                          title="Edit Proposal"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Delete Project Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Delete Project
            </h3>
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete this project? Proposals will be unlinked but not deleted. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteProject}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
