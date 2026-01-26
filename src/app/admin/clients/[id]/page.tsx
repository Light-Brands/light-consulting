/**
 * Admin Client Detail Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { ClientWithStats } from '@/types/clients';
import type { ClientProjectSummary } from '@/types/client-projects';

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

export default function AdminClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [client, setClient] = useState<ClientWithStats | null>(null);
  const [projects, setProjects] = useState<ClientProjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const { authFetch } = useAuthFetch();

  const fetchClient = useCallback(async () => {
    try {
      const [clientRes, projectsRes] = await Promise.all([
        authFetch(`/api/clients/${id}?withStats=true`),
        authFetch(`/api/clients/${id}/projects?withProposals=true`),
      ]);

      const clientData = await clientRes.json();
      const projectsData = await projectsRes.json();

      if (clientData.data) {
        setClient(clientData.data);
      } else {
        router.push('/admin/clients');
        return;
      }

      if (projectsData.data) {
        setProjects(projectsData.data);
      }
    } catch (error) {
      console.error('Error fetching client:', error);
      router.push('/admin/clients');
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, id, router]);

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  const handleDeleteProject = async (projectId: string) => {
    try {
      const response = await authFetch(`/api/client-projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== projectId));
        setDeleteProjectId(null);
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

  if (!client) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <AdminHeader
        title={client.client_name}
        subtitle={client.client_company || client.client_email}
        action={
          <div className="flex gap-2">
            <Link href={`/admin/clients/${id}/projects/new`}>
              <Button variant="secondary" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Project
              </Button>
            </Link>
            <Link href={`/admin/clients/${id}/edit`}>
              <Button variant="primary" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Client
              </Button>
            </Link>
          </div>
        }
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          <Link
            href="/admin/clients"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Clients
          </Link>

          {/* Client Info Card */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 bg-depth-surface border border-depth-border rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-6">
                {client.logo_url ? (
                  <img
                    src={client.logo_url}
                    alt={client.client_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-radiance-gold/10 flex items-center justify-center">
                    <span className="text-radiance-gold font-semibold text-2xl">
                      {client.client_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">
                    {client.client_name}
                  </h2>
                  {client.client_company && (
                    <p className="text-text-secondary">{client.client_company}</p>
                  )}
                  {client.industry && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-depth-elevated rounded-full text-text-muted">
                      {client.industry}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-muted mb-1">Email</p>
                  <a href={`mailto:${client.client_email}`} className="text-text-primary hover:text-radiance-gold">
                    {client.client_email}
                  </a>
                </div>
                {client.client_phone && (
                  <div>
                    <p className="text-sm text-text-muted mb-1">Phone</p>
                    <a href={`tel:${client.client_phone}`} className="text-text-primary hover:text-radiance-gold">
                      {client.client_phone}
                    </a>
                  </div>
                )}
                {client.website_url && (
                  <div>
                    <p className="text-sm text-text-muted mb-1">Website</p>
                    <a
                      href={client.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary hover:text-radiance-gold"
                    >
                      {client.website_url.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>

              {client.notes && (
                <div className="mt-6 pt-6 border-t border-depth-border">
                  <p className="text-sm text-text-muted mb-2">Notes</p>
                  <p className="text-text-secondary whitespace-pre-wrap">{client.notes}</p>
                </div>
              )}
            </div>

            {/* Stats Card */}
            <div className="bg-depth-surface border border-depth-border rounded-2xl p-6">
              <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
                Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Projects</span>
                  <span className="text-text-primary font-semibold">{client.project_count}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Active</span>
                  <span className="text-green-400 font-semibold">{client.active_projects}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Proposals</span>
                  <span className="text-text-primary font-semibold">{client.proposal_count}</span>
                </div>
                <div className="h-px bg-depth-border" />
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Total Value</span>
                  <span className="text-radiance-gold font-semibold">{formatCurrency(client.total_value)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Total Paid</span>
                  <span className="text-green-400 font-semibold">{formatCurrency(client.total_paid)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-depth-border flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                  <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                    Projects::List
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Projects
                </h2>
              </div>
              <Link href={`/admin/clients/${id}/projects/new`}>
                <Button variant="ghost" size="sm">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Project
                </Button>
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="p-6 text-center text-text-muted">
                No projects yet.{' '}
                <Link
                  href={`/admin/clients/${id}/projects/new`}
                  className="text-radiance-gold hover:underline"
                >
                  Create the first project
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-depth-border">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 md:p-6 hover:bg-depth-elevated transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-text-primary truncate">
                            {project.project_name}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                              PROJECT_STATUS_COLORS[project.status]
                            }`}
                          >
                            {PROJECT_STATUS_LABELS[project.status]}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                          <span>{project.proposal_count || 0} proposals</span>
                          <span>{formatCurrency(project.total_value || 0)} value</span>
                          {project.start_date && (
                            <span>Started {formatDate(project.start_date)}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/client-projects/${project.id}`}
                          className="p-2 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors"
                          title="View Project"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => setDeleteProjectId(project.id)}
                          className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Project"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
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
      {deleteProjectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDeleteProjectId(null)}
          />
          <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Delete Project
            </h3>
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete this project? Proposals will be unlinked but not deleted. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setDeleteProjectId(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDeleteProject(deleteProjectId)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
