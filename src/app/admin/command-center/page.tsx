/**
 * Command Center Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminHeader } from '@/components/admin';
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
          {/* Stats */}
          <CommandCenterStats
            stats={stats}
            isLoading={isLoading}
            onFilterClick={handleFilterClick}
          />

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
