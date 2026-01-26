/**
 * Deliverable Row Component (List View)
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { StatusSelector } from './StatusSelector';
import { UserAssignmentDropdown } from './UserAssignmentDropdown';
import { PrioritySelector } from './PrioritySelector';
import type { DeliverableWithAssignee, DeliverableStatus, DeliverablePriority } from '@/types/deliverables';

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
}

interface DeliverableRowProps {
  deliverable: DeliverableWithAssignee;
  teamMembers: TeamMember[];
  onStatusChange: (id: string, status: DeliverableStatus) => void;
  onAssigneeChange: (id: string, assigneeId: string | null) => void;
  onPriorityChange: (id: string, priority: DeliverablePriority) => void;
  onClick: (deliverable: DeliverableWithAssignee) => void;
  isSelected?: boolean;
  onSelectChange?: (id: string, selected: boolean) => void;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

  const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays < 7) return `${diffDays}d`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const DeliverableRow: React.FC<DeliverableRowProps> = ({
  deliverable,
  teamMembers,
  onStatusChange,
  onAssigneeChange,
  onPriorityChange,
  onClick,
  isSelected = false,
  onSelectChange,
}) => {
  const isCompleted = deliverable.status === 'completed';
  const isOverdue = deliverable.due_date && new Date(deliverable.due_date) < new Date() && !isCompleted;

  const priorityBorderColors: Record<DeliverablePriority, string> = {
    urgent: 'border-l-red-500',
    high: 'border-l-orange-500',
    medium: 'border-l-amber-500',
    low: 'border-l-gray-500',
  };

  return (
    <div
      className={`
        border-l-4 ${priorityBorderColors[deliverable.priority]}
        bg-depth-surface border border-depth-border border-l-0 rounded-r-lg
        hover:border-radiance-gold/30 transition-all group
        ${isCompleted ? 'opacity-60' : ''}
        ${isSelected ? 'ring-2 ring-radiance-gold/50' : ''}
      `}
    >
      <div className="flex items-center gap-3 p-3">
        {/* Checkbox */}
        {onSelectChange && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectChange(deliverable.id, e.target.checked)}
            className="w-4 h-4 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold focus:ring-offset-0"
            onClick={(e) => e.stopPropagation()}
          />
        )}

        {/* Main Content - Clickable */}
        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => onClick(deliverable)}
        >
          <div className="flex items-center gap-2">
            <h4
              className={`text-sm font-medium text-text-primary truncate ${
                isCompleted ? 'line-through' : ''
              }`}
            >
              {deliverable.name}
            </h4>
            {deliverable.phase_name && (
              <span className="hidden sm:inline-flex px-1.5 py-0.5 text-xs rounded bg-depth-elevated text-text-muted truncate max-w-[150px]">
                {deliverable.phase_name}
              </span>
            )}
            {/* Links indicator */}
            {deliverable.links && deliverable.links.length > 0 && (
              <span className="inline-flex items-center gap-0.5 text-blue-400" title={`${deliverable.links.length} link${deliverable.links.length > 1 ? 's' : ''}`}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-xs">{deliverable.links.length}</span>
              </span>
            )}
          </div>
          {deliverable.description && (
            <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
              {deliverable.description}
            </p>
          )}
        </div>

        {/* Due Date */}
        <div className="hidden md:block w-[80px] flex-shrink-0">
          {deliverable.due_date && (
            <span
              className={`text-xs flex items-center gap-1 ${
                isOverdue ? 'text-red-400' : 'text-text-muted'
              }`}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(deliverable.due_date)}
            </span>
          )}
        </div>

        {/* Priority */}
        <div className="hidden sm:block flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <PrioritySelector
            value={deliverable.priority}
            onChange={(priority) => onPriorityChange(deliverable.id, priority)}
            size="sm"
          />
        </div>

        {/* Status */}
        <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <StatusSelector
            value={deliverable.status}
            onChange={(status) => onStatusChange(deliverable.id, status)}
            size="sm"
          />
        </div>

        {/* Assignee */}
        <div className="hidden lg:block flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <UserAssignmentDropdown
            value={deliverable.assigned_to}
            onChange={(assigneeId) => onAssigneeChange(deliverable.id, assigneeId)}
            teamMembers={teamMembers}
            size="sm"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(deliverable);
            }}
            className="p-1.5 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded transition-colors"
            title="Edit deliverable"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliverableRow;
