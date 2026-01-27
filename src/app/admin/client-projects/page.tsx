/**
 * Admin Client Projects List Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { useAuthFetch } from '@/hooks/useAuthFetch';
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

export default function AdminClientProjectsPage() {
  const { authFetch } = useAuthFetch();
  const [projects, setProjects] = useState<ClientProjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchProjects = useCallback(async () => {
    try {
      // Fetch all projects with summary data
      const response = await authFetch('/api/client-projects');
      const data = await response.json();

      if (data.data) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchQuery === '' ||
      project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client_company?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === 'active').length,
    completed: projects.filter((p) => p.status === 'completed').length,
    totalValue: projects.reduce((sum, p) => sum + (p.total_value || 0), 0),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Projects"
        subtitle="Client engagement projects"
        action={
          <Link href="/admin/clients">
            <Button variant="primary" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </Button>
          </Link>
        }
      />

      <div className="py-4 md:py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-depth-surface border border-depth-border rounded-xl p-4">
              <p className="text-text-muted text-sm mb-1">Total Projects</p>
              <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
            </div>
            <div className="bg-depth-surface border border-depth-border rounded-xl p-4">
              <p className="text-text-muted text-sm mb-1">Active</p>
              <p className="text-2xl font-bold text-green-400">{stats.active}</p>
            </div>
            <div className="bg-depth-surface border border-depth-border rounded-xl p-4">
              <p className="text-text-muted text-sm mb-1">Completed</p>
              <p className="text-2xl font-bold text-radiance-gold">{stats.completed}</p>
            </div>
            <div className="bg-depth-surface border border-depth-border rounded-xl p-4">
              <p className="text-text-muted text-sm mb-1">Total Value</p>
              <p className="text-2xl font-bold text-text-primary">{formatCurrency(stats.totalValue)}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-depth-surface border border-depth-border rounded-xl p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search projects, clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:border-radiance-gold focus:outline-none"
                />
              </div>
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full md:w-auto bg-depth-base border border-depth-border rounded-lg px-4 py-2 text-text-primary focus:border-radiance-gold focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="on_hold">On Hold</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-depth-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                  Projects::List
                </span>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text-primary">
                  All Projects ({filteredProjects.length})
                </h2>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="p-6 text-center text-text-muted">
                {projects.length === 0 ? (
                  <>
                    No projects yet.{' '}
                    <Link href="/admin/clients" className="text-radiance-gold hover:underline">
                      Create a client first
                    </Link>
                    , then add projects.
                  </>
                ) : (
                  'No projects match your filters.'
                )}
              </div>
            ) : (
              <div className="divide-y divide-depth-border">
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/admin/client-projects/${project.id}`}
                    className="block p-4 md:p-6 hover:bg-depth-elevated transition-colors"
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
                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                          {(project.client_name || project.client_company) && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {project.client_name}
                              {project.client_company && ` (${project.client_company})`}
                            </span>
                          )}
                          <span>{project.proposal_count || 0} proposals</span>
                          <span>{formatCurrency(project.total_value || 0)}</span>
                          {project.start_date && (
                            <span>Started {formatDate(project.start_date)}</span>
                          )}
                        </div>
                      </div>

                      <svg className="w-5 h-5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
