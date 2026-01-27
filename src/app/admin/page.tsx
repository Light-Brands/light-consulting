/**
 * Admin Command Center Page
 * Light Brand Consulting
 *
 * Combined dashboard and command center for project oversight
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AdminHeader, CollapsibleStats } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import {
  CommandCenterStats,
  ProjectList,
  QuickUpdateModal,
} from '@/components/admin/command-center';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { CommandCenterStats as Stats, HealthStatus, ProjectPriority, PhaseStatus } from '@/types/projects';

interface ProjectPhase {
  id: string;
  phase_name: string;
  phase_status: PhaseStatus;
}

interface Project {
  id: string;
  project_name: string;
  client_name: string;
  client_company: string | null;
  status: string;
  progress_percentage: number;
  health_status: HealthStatus;
  priority: ProjectPriority;
  final_amount: number;
  start_date: string | null;
  estimated_completion_date: string | null;
  last_activity_at: string | null;
  next_action: string | null;
  next_action_due_date: string | null;
  is_on_hold: boolean;
  phases?: ProjectPhase[];
  proposal_phases?: ProjectPhase[];
}

const defaultStats: Stats = {
  total_active: 0,
  on_track: 0,
  at_risk: 0,
  behind: 0,
  blocked: 0,
  on_hold: 0,
  total_value: 0,
  urgent_count: 0,
};

export default function CommandCenterPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [quickUpdateProject, setQuickUpdateProject] = useState<Project | null>(null);
  const { authFetch } = useAuthFetch();

  const fetchProjects = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      const response = await authFetch(`/api/command-center?${params.toString()}`);
      const data = await response.json();

      if (data.data) {
        setProjects(data.data.projects || []);
        setStats(data.data.stats || defaultStats);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleFilterClick = (key: string, value: string) => {
    setFilters((prev) => {
      // Toggle filter
      if (prev[key] === value) {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      return { ...prev, [key]: value };
    });
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handlePriorityChange = async (projectId: string, priority: ProjectPriority) => {
    try {
      await authFetch(`/api/command-center/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority }),
      });

      // Update local state
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, priority } : p))
      );
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const handleQuickUpdate = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setQuickUpdateProject(project);
    }
  };

  const handleQuickUpdateSave = async (updates: Record<string, unknown>) => {
    if (!quickUpdateProject) return;

    try {
      await authFetch(`/api/command-center/${quickUpdateProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      // Refresh data
      fetchProjects();
    } catch (error) {
      console.error('Error saving quick update:', error);
      throw error;
    }
  };

  const activeFilters = Object.entries(filters).filter(([, value]) => value);

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Command Center"
        subtitle="Active project overview and tracking"
        action={
          <Button variant="primary" size="sm" onClick={() => fetchProjects()}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </Button>
        }
      />

      <div className="py-4 md:py-8 relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10 space-y-6">
          {/* Quick Links - Mobile friendly */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-depth-surface border border-depth-border rounded-xl overflow-hidden">
              <Link
                href="/admin/leads"
                className="flex items-center gap-3 p-3 hover:bg-depth-elevated transition-colors"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-medium text-text-primary text-sm">Leads</span>
              </Link>
              <Link
                href="/admin/leads/new"
                className="flex items-center justify-center gap-1 px-3 py-2 border-t border-depth-border text-xs text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/5 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Lead
              </Link>
            </div>
            <div className="bg-depth-surface border border-depth-border rounded-xl overflow-hidden">
              <Link
                href="/admin/proposals"
                className="flex items-center gap-3 p-3 hover:bg-depth-elevated transition-colors"
              >
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-medium text-text-primary text-sm">Proposals</span>
              </Link>
              <Link
                href="/admin/proposals/new"
                className="flex items-center justify-center gap-1 px-3 py-2 border-t border-depth-border text-xs text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/5 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Proposal
              </Link>
            </div>
            <div className="bg-depth-surface border border-depth-border rounded-xl overflow-hidden">
              <Link
                href="/admin/clients"
                className="flex items-center gap-3 p-3 hover:bg-depth-elevated transition-colors"
              >
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="font-medium text-text-primary text-sm">Clients</span>
              </Link>
              <Link
                href="/admin/clients/new"
                className="flex items-center justify-center gap-1 px-3 py-2 border-t border-depth-border text-xs text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/5 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Client
              </Link>
            </div>
            <div className="bg-depth-surface border border-depth-border rounded-xl overflow-hidden">
              <Link
                href="/admin/client-projects"
                className="flex items-center gap-3 p-3 hover:bg-depth-elevated transition-colors"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="font-medium text-text-primary text-sm">Projects</span>
              </Link>
              <Link
                href="/admin/clients"
                className="flex items-center justify-center gap-1 px-3 py-2 border-t border-depth-border text-xs text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/5 transition-colors"
                title="Create a project from within a client"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Project
              </Link>
            </div>
          </div>

          {/* Stats */}
          <CollapsibleStats>
            <CommandCenterStats
              stats={stats}
              isLoading={isLoading}
              onFilterClick={handleFilterClick}
            />
          </CollapsibleStats>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-text-muted">Filters:</span>
              {activeFilters.map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleFilterClick(key, value)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-radiance-gold/10 text-radiance-gold rounded-full text-sm font-medium hover:bg-radiance-gold/20 transition-colors"
                >
                  {key.replace('_', ' ')}: {value.replace('_', ' ')}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ))}
              <button
                onClick={handleClearFilters}
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Project List */}
          <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10">
              <div className="p-4 md:p-6 border-b border-depth-border">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                      <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                        Projects::Active
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-text-primary">
                      Active Projects
                    </h2>
                  </div>
                  <div className="text-sm text-text-muted">
                    {projects.length} project{projects.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <ProjectList
                  projects={projects}
                  isLoading={isLoading}
                  emptyMessage={
                    activeFilters.length > 0
                      ? 'No projects match the current filters'
                      : 'No active projects. Create a proposal and mark it as active to see it here.'
                  }
                  onPriorityChange={handlePriorityChange}
                  onQuickUpdate={handleQuickUpdate}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Quick Update Modal */}
      {quickUpdateProject && (
        <QuickUpdateModal
          projectId={quickUpdateProject.id}
          projectName={quickUpdateProject.project_name}
          currentProgress={quickUpdateProject.progress_percentage}
          currentHealthStatus={quickUpdateProject.health_status}
          currentPriority={quickUpdateProject.priority}
          currentNextAction={quickUpdateProject.next_action}
          currentNextActionDueDate={quickUpdateProject.next_action_due_date}
          isOnHold={quickUpdateProject.is_on_hold}
          onClose={() => setQuickUpdateProject(null)}
          onSave={handleQuickUpdateSave}
        />
      )}
    </div>
  );
}
