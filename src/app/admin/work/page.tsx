/**
 * Work Dashboard Page
 * Light Brand Consulting
 *
 * Centralized view of all active development work across proposals
 */

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { StatusSelector, UserAssignmentDropdown } from '@/components/admin/project-manage';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { DeliverableWithAssignee, DeliverableStatus, DeliverablePriority } from '@/types/deliverables';

interface Project {
  id: string;
  project_name: string;
  client_name: string;
  status: string;
  total_amount: number;
  deliverable_count: number;
  completed_count: number;
  in_progress_count: number;
}

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
}

type ViewMode = 'projects' | 'deliverables';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
  in_progress: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  review: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  completed: 'bg-green-500/10 text-green-400 border-green-500/30',
};

const PRIORITY_COLORS: Record<DeliverablePriority, string> = {
  urgent: 'border-l-red-500',
  high: 'border-l-orange-500',
  medium: 'border-l-amber-500',
  low: 'border-l-gray-500',
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const today = new Date();
  const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function WorkDashboardPage() {
  const { authFetch } = useAuthFetch();

  // Data state
  const [projects, setProjects] = useState<Project[]>([]);
  const [deliverables, setDeliverables] = useState<DeliverableWithAssignee[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI state
  const [viewMode, setViewMode] = useState<ViewMode>('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<DeliverableStatus | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch active projects (agreement_signed or active)
  const fetchProjects = useCallback(async () => {
    try {
      const response = await authFetch('/api/proposals?status=active,agreement_signed');
      const data = await response.json();
      if (data.data) {
        // Map to simpler project format
        const projectList = data.data.map((p: any) => ({
          id: p.id,
          project_name: p.project_name,
          client_name: p.client_name,
          status: p.status,
          total_amount: p.total_amount || 0,
          deliverable_count: 0,
          completed_count: 0,
          in_progress_count: 0,
        }));
        setProjects(projectList);
        return projectList;
      }
      return [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }, [authFetch]);

  // Fetch all deliverables across active projects
  const fetchAllDeliverables = useCallback(async (projectList: Project[]) => {
    try {
      // Fetch deliverables for all projects
      const allDeliverables: DeliverableWithAssignee[] = [];

      for (const project of projectList) {
        const response = await authFetch(
          `/api/admin/deliverables?proposal_id=${project.id}&include_completed=true`
        );
        const data = await response.json();
        if (data.data) {
          // Add project info to each deliverable
          const projectDeliverables = data.data.map((d: any) => ({
            ...d,
            project_name: project.project_name,
            client_name: project.client_name,
          }));
          allDeliverables.push(...projectDeliverables);
        }
      }

      setDeliverables(allDeliverables);

      // Update project counts
      const updatedProjects = projectList.map(p => {
        const projectDeliverables = allDeliverables.filter(d => d.proposal_id === p.id);
        return {
          ...p,
          deliverable_count: projectDeliverables.length,
          completed_count: projectDeliverables.filter(d => d.status === 'completed').length,
          in_progress_count: projectDeliverables.filter(d => d.status === 'in_progress').length,
        };
      });
      setProjects(updatedProjects);

    } catch (error) {
      console.error('Error fetching deliverables:', error);
    }
  }, [authFetch]);

  // Fetch team members
  const fetchTeam = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/team');
      const data = await response.json();
      if (data.data) {
        setTeamMembers(data.data);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  }, [authFetch]);

  // Initial load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [projectList] = await Promise.all([
        fetchProjects(),
        fetchTeam(),
      ]);
      if (projectList.length > 0) {
        await fetchAllDeliverables(projectList);
      }
      setIsLoading(false);
    };
    loadData();
  }, [fetchProjects, fetchTeam, fetchAllDeliverables]);

  // Handle status change
  const handleStatusChange = async (id: string, status: DeliverableStatus) => {
    setDeliverables(prev =>
      prev.map(d => (d.id === id ? { ...d, status } : d))
    );

    try {
      await authFetch(`/api/admin/deliverables/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Filter deliverables
  const filteredDeliverables = useMemo(() => {
    return deliverables.filter(d => {
      if (selectedProjectId && d.proposal_id !== selectedProjectId) return false;
      if (selectedStatus && d.status !== selectedStatus) return false;
      if (selectedAssignee && d.assigned_to !== selectedAssignee) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !d.name.toLowerCase().includes(query) &&
          !(d.description?.toLowerCase().includes(query)) &&
          !(d as any).project_name?.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      // Don't show completed by default unless filtering for them
      if (!selectedStatus && d.status === 'completed') return false;
      return true;
    });
  }, [deliverables, selectedProjectId, selectedStatus, selectedAssignee, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const active = deliverables.filter(d => d.status !== 'completed' && d.status !== 'cancelled');
    return {
      totalProjects: projects.length,
      totalDeliverables: deliverables.length,
      activeDeliverables: active.length,
      inProgress: deliverables.filter(d => d.status === 'in_progress').length,
      inReview: deliverables.filter(d => d.status === 'review').length,
      pending: deliverables.filter(d => d.status === 'pending').length,
      overdue: active.filter(d => d.due_date && new Date(d.due_date) < new Date()).length,
    };
  }, [deliverables, projects]);

  const clearFilters = () => {
    setSelectedProjectId(null);
    setSelectedStatus(null);
    setSelectedAssignee(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedProjectId || selectedStatus || selectedAssignee || searchQuery;

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Work Dashboard" subtitle="Loading..." />
        <Container size="wide" className="py-12">
          <div className="text-center text-text-muted">Loading work items...</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Work Dashboard"
        subtitle="All active development work"
      />

      <div className="py-4 sm:py-8">
        <Container size="wide">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
            <div className="bg-depth-surface border border-depth-border rounded-lg p-3">
              <p className="text-2xl font-bold text-text-primary">{stats.totalProjects}</p>
              <p className="text-xs text-text-muted">Active Projects</p>
            </div>
            <div className="bg-depth-surface border border-depth-border rounded-lg p-3">
              <p className="text-2xl font-bold text-text-primary">{stats.activeDeliverables}</p>
              <p className="text-xs text-text-muted">Open Items</p>
            </div>
            <div className="bg-depth-surface border border-blue-500/30 rounded-lg p-3">
              <p className="text-2xl font-bold text-blue-400">{stats.inProgress}</p>
              <p className="text-xs text-text-muted">In Progress</p>
            </div>
            <div className="bg-depth-surface border border-purple-500/30 rounded-lg p-3">
              <p className="text-2xl font-bold text-purple-400">{stats.inReview}</p>
              <p className="text-xs text-text-muted">In Review</p>
            </div>
            <div className="bg-depth-surface border border-gray-500/30 rounded-lg p-3">
              <p className="text-2xl font-bold text-gray-400">{stats.pending}</p>
              <p className="text-xs text-text-muted">Pending</p>
            </div>
            <div className={`bg-depth-surface border rounded-lg p-3 ${stats.overdue > 0 ? 'border-red-500/30' : 'border-depth-border'}`}>
              <p className={`text-2xl font-bold ${stats.overdue > 0 ? 'text-red-400' : 'text-text-primary'}`}>{stats.overdue}</p>
              <p className="text-xs text-text-muted">Overdue</p>
            </div>
            <div className="bg-depth-surface border border-green-500/30 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-400">{deliverables.filter(d => d.status === 'completed').length}</p>
              <p className="text-xs text-text-muted">Completed</p>
            </div>
          </div>

          {/* View Toggle & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
            <div className="flex flex-wrap items-center gap-2">
              {/* View Toggle */}
              <div className="inline-flex items-center bg-depth-base border border-depth-border rounded-lg p-0.5 mr-2">
                <button
                  onClick={() => setViewMode('projects')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'projects'
                      ? 'bg-radiance-gold/20 text-radiance-gold'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  By Project
                </button>
                <button
                  onClick={() => setViewMode('deliverables')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'deliverables'
                      ? 'bg-radiance-gold/20 text-radiance-gold'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  All Items
                </button>
              </div>

              {viewMode === 'deliverables' && (
                <>
                  {/* Project Filter */}
                  <select
                    value={selectedProjectId || ''}
                    onChange={(e) => setSelectedProjectId(e.target.value || null)}
                    className="bg-depth-base border border-depth-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:border-radiance-gold focus:outline-none"
                  >
                    <option value="">All Projects</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.project_name}</option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <select
                    value={selectedStatus || ''}
                    onChange={(e) => setSelectedStatus((e.target.value as DeliverableStatus) || null)}
                    className="bg-depth-base border border-depth-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:border-radiance-gold focus:outline-none"
                  >
                    <option value="">Open Items</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">In Review</option>
                    <option value="completed">Completed</option>
                  </select>

                  {/* Assignee Filter */}
                  <UserAssignmentDropdown
                    value={selectedAssignee}
                    onChange={setSelectedAssignee}
                    teamMembers={teamMembers}
                    placeholder="All Team"
                    size="sm"
                  />

                  {/* Search */}
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="bg-depth-base border border-depth-border rounded-lg pl-9 pr-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none w-[150px]"
                    />
                  </div>

                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="text-xs text-text-muted hover:text-radiance-gold">
                      Clear
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Content */}
          {viewMode === 'projects' ? (
            /* Projects View */
            <div className="space-y-4">
              {projects.length === 0 ? (
                <div className="text-center py-12 text-text-muted">
                  <p>No active projects</p>
                  <p className="text-sm mt-1">Projects appear here when they have status "Active" or "Agreement Signed"</p>
                </div>
              ) : (
                projects.map((project) => {
                  const projectDeliverables = deliverables.filter(d => d.proposal_id === project.id);
                  const openCount = projectDeliverables.filter(d => d.status !== 'completed' && d.status !== 'cancelled').length;
                  const progress = project.deliverable_count > 0
                    ? Math.round((project.completed_count / project.deliverable_count) * 100)
                    : 0;

                  return (
                    <div
                      key={project.id}
                      className="bg-depth-surface border border-depth-border rounded-xl p-4 hover:border-radiance-gold/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-text-primary truncate">
                              {project.project_name}
                            </h3>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              project.status === 'active'
                                ? 'bg-green-500/10 text-green-400'
                                : 'bg-purple-500/10 text-purple-400'
                            }`}>
                              {project.status === 'active' ? 'Active' : 'Signed'}
                            </span>
                          </div>
                          <p className="text-sm text-text-muted">{project.client_name}</p>

                          {/* Progress Bar */}
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                              <span>{openCount} open items</span>
                              <span>{progress}% complete</span>
                            </div>
                            <div className="h-1.5 bg-depth-elevated rounded-full overflow-hidden">
                              <div
                                className="h-full bg-radiance-gold rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>

                          {/* Status breakdown */}
                          <div className="flex items-center gap-3 mt-3">
                            {projectDeliverables.filter(d => d.status === 'in_progress').length > 0 && (
                              <span className="text-xs text-blue-400">
                                {projectDeliverables.filter(d => d.status === 'in_progress').length} in progress
                              </span>
                            )}
                            {projectDeliverables.filter(d => d.status === 'review').length > 0 && (
                              <span className="text-xs text-purple-400">
                                {projectDeliverables.filter(d => d.status === 'review').length} in review
                              </span>
                            )}
                            {projectDeliverables.filter(d => d.status === 'pending').length > 0 && (
                              <span className="text-xs text-gray-400">
                                {projectDeliverables.filter(d => d.status === 'pending').length} pending
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link href={`/admin/proposals/${project.id}`}>
                            <Button variant="ghost" className="text-sm">
                              Details
                            </Button>
                          </Link>
                          <Link href={`/admin/projects/${project.id}/manage`}>
                            <Button variant="primary" className="text-sm">
                              Manage Work
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            /* All Deliverables View */
            <div className="space-y-2">
              {filteredDeliverables.length === 0 ? (
                <div className="text-center py-12 text-text-muted">
                  <p>No deliverables found</p>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="text-sm text-radiance-gold mt-2">
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                filteredDeliverables.map((d) => {
                  const isOverdue = d.due_date && new Date(d.due_date) < new Date() && d.status !== 'completed';

                  return (
                    <div
                      key={d.id}
                      className={`
                        border-l-4 ${PRIORITY_COLORS[d.priority]}
                        bg-depth-surface border border-depth-border border-l-0 rounded-r-lg p-3
                        hover:border-radiance-gold/30 transition-all
                      `}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-medium text-text-primary">
                              {d.name}
                            </h4>
                            <span className="px-1.5 py-0.5 text-xs rounded bg-depth-elevated text-text-muted">
                              {(d as any).project_name}
                            </span>
                          </div>
                          {d.description && (
                            <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                              {d.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          {d.due_date && (
                            <span className={`text-xs ${isOverdue ? 'text-red-400' : 'text-text-muted'}`}>
                              {formatDate(d.due_date)}
                            </span>
                          )}

                          <StatusSelector
                            value={d.status}
                            onChange={(status) => handleStatusChange(d.id, status)}
                            size="sm"
                          />

                          <Link href={`/admin/projects/${d.proposal_id}/manage`}>
                            <button className="p-1.5 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded transition-colors">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
