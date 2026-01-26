/**
 * Project List Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { ProjectCard } from './ProjectCard';
import type { HealthStatus, ProjectPriority, PhaseStatus } from '@/types/projects';

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

interface ProjectListProps {
  projects: Project[];
  isLoading?: boolean;
  emptyMessage?: string;
  onPriorityChange?: (projectId: string, priority: ProjectPriority) => void;
  onQuickUpdate?: (projectId: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  isLoading = false,
  emptyMessage = 'No projects found',
  onPriorityChange,
  onQuickUpdate,
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-depth-surface border border-depth-border rounded-xl p-4 animate-pulse"
          >
            <div className="h-5 bg-depth-elevated rounded w-3/4 mb-2" />
            <div className="h-4 bg-depth-elevated rounded w-1/2 mb-4" />
            <div className="h-3 bg-depth-elevated rounded w-full mb-2" />
            <div className="h-3 bg-depth-elevated rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-depth-elevated rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  // Map proposal_phases to phases if needed
  const normalizedProjects = projects.map((project) => ({
    ...project,
    phases: project.phases || project.proposal_phases || [],
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {normalizedProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onPriorityChange={onPriorityChange}
          onQuickUpdate={onQuickUpdate}
        />
      ))}
    </div>
  );
};

export default ProjectList;
