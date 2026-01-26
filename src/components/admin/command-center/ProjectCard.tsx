/**
 * Project Card Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { HealthStatusBadge } from './HealthStatusBadge';
import { PrioritySelector } from './PrioritySelector';
import { PhaseProgressTracker } from './PhaseProgressTracker';
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
}

interface ProjectCardProps {
  project: Project;
  onPriorityChange?: (projectId: string, priority: ProjectPriority) => void;
  onQuickUpdate?: (projectId: string) => void;
}

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
    month: 'short',
    day: 'numeric',
  });
};

const getRelativeTime = (dateString: string | null) => {
  if (!dateString) return 'No activity';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onPriorityChange,
  onQuickUpdate,
}) => {
  const phases = (project.phases || []) as ProjectPhase[];

  return (
    <div
      className={`
        bg-depth-surface border border-depth-border rounded-xl overflow-hidden
        hover:border-radiance-gold/30 transition-all group
        ${project.is_on_hold ? 'opacity-60' : ''}
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-depth-border">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <Link
              href={`/admin/proposals/${project.id}`}
              className="font-semibold text-text-primary hover:text-radiance-gold transition-colors block truncate"
            >
              {project.project_name}
            </Link>
            <p className="text-sm text-text-muted truncate">
              {project.client_name}
              {project.client_company && ` • ${project.client_company}`}
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="font-semibold text-text-primary text-sm">
              {formatCurrency(project.final_amount)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <HealthStatusBadge status={project.health_status} size="sm" />
          <PrioritySelector
            value={project.priority}
            onChange={(priority) => onPriorityChange?.(project.id, priority)}
          />
          {project.is_on_hold && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-500/10 text-gray-400">
              On Hold
            </span>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="p-4 border-b border-depth-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-muted">Progress</span>
          <span className="text-sm font-medium text-text-primary">
            {project.progress_percentage}%
          </span>
        </div>
        <div className="w-full h-2 bg-depth-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-radiance-gold to-radiance-amber rounded-full transition-all"
            style={{ width: `${project.progress_percentage}%` }}
          />
        </div>

        {/* Phase Progress */}
        {phases.length > 0 && (
          <div className="mt-3">
            <PhaseProgressTracker phases={phases} compact />
          </div>
        )}
      </div>

      {/* Next Action */}
      {project.next_action && (
        <div className="px-4 py-3 border-b border-depth-border bg-depth-elevated/50">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-radiance-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary truncate">{project.next_action}</p>
              {project.next_action_due_date && (
                <p className="text-xs text-text-muted">
                  Due {formatDate(project.next_action_due_date)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 flex items-center justify-between">
        <div className="text-xs text-text-muted">
          <span className="inline-flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {getRelativeTime(project.last_activity_at)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuickUpdate?.(project.id)}
            className="p-1.5 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            title="Quick update"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <Link
            href={`/admin/proposals/${project.id}`}
            className="p-1.5 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors"
            title="View details"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
