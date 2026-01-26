/**
 * Internal Project Card Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import type { InternalProject, InternalProjectCategory, InternalProjectStatus, ProjectPriority } from '@/types/projects';
import type { UserProfile } from '@/types/users';

interface InternalProjectCardProps {
  project: InternalProject & {
    lead?: UserProfile;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CATEGORY_CONFIG: Record<InternalProjectCategory, { label: string; icon: string; color: string }> = {
  product: { label: 'Product', icon: '🚀', color: 'text-blue-400 bg-blue-500/10' },
  infrastructure: { label: 'Infrastructure', icon: '⚙️', color: 'text-gray-400 bg-gray-500/10' },
  tooling: { label: 'Tooling', icon: '🔧', color: 'text-purple-400 bg-purple-500/10' },
  research: { label: 'Research', icon: '🔬', color: 'text-cyan-400 bg-cyan-500/10' },
  marketing: { label: 'Marketing', icon: '📢', color: 'text-pink-400 bg-pink-500/10' },
  other: { label: 'Other', icon: '📁', color: 'text-gray-400 bg-gray-500/10' },
};

const STATUS_CONFIG: Record<InternalProjectStatus, { label: string; color: string }> = {
  planning: { label: 'Planning', color: 'text-gray-400 bg-gray-500/10' },
  active: { label: 'Active', color: 'text-green-400 bg-green-500/10' },
  on_hold: { label: 'On Hold', color: 'text-amber-400 bg-amber-500/10' },
  completed: { label: 'Completed', color: 'text-blue-400 bg-blue-500/10' },
  cancelled: { label: 'Cancelled', color: 'text-red-400 bg-red-500/10' },
};

const PRIORITY_CONFIG: Record<ProjectPriority, { label: string; color: string }> = {
  urgent: { label: 'Urgent', color: 'text-red-400' },
  high: { label: 'High', color: 'text-orange-400' },
  medium: { label: 'Medium', color: 'text-amber-400' },
  low: { label: 'Low', color: 'text-gray-400' },
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const InternalProjectCard: React.FC<InternalProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
}) => {
  const categoryConfig = CATEGORY_CONFIG[project.category] || CATEGORY_CONFIG.other;
  const statusConfig = STATUS_CONFIG[project.status] || STATUS_CONFIG.planning;
  const priorityConfig = PRIORITY_CONFIG[project.priority] || PRIORITY_CONFIG.medium;

  return (
    <div className="bg-depth-surface border border-depth-border rounded-xl p-4 hover:border-radiance-gold/30 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{categoryConfig.icon}</span>
            <h3 className="font-semibold text-text-primary truncate">
              {project.name}
            </h3>
          </div>
          {project.description && (
            <p className="text-sm text-text-muted line-clamp-2">
              {project.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => onEdit(project.id)}
              className="p-2 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(project.id)}
              className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-text-muted">Progress</span>
          <span className="text-xs font-medium text-text-primary">
            {project.progress_percentage}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-depth-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-radiance-gold to-radiance-amber rounded-full transition-all"
            style={{ width: `${project.progress_percentage}%` }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusConfig.color}`}>
          {statusConfig.label}
        </span>
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${categoryConfig.color}`}>
          {categoryConfig.label}
        </span>
        <span className={`text-xs font-medium ${priorityConfig.color}`}>
          {priorityConfig.label}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-depth-border">
        {/* Lead */}
        <div className="flex items-center gap-2">
          {project.lead ? (
            <>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center">
                <span className="text-depth-base font-semibold text-[10px]">
                  {getInitials(project.lead.full_name)}
                </span>
              </div>
              <span className="text-xs text-text-muted">
                {project.lead.full_name}
              </span>
            </>
          ) : (
            <span className="text-xs text-text-muted">No lead assigned</span>
          )}
        </div>

        {/* Timeline */}
        {project.target_date && (
          <span className="text-xs text-text-muted flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(project.target_date)}
          </span>
        )}
      </div>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="flex gap-1 mt-3 flex-wrap">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded bg-depth-elevated text-text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default InternalProjectCard;
