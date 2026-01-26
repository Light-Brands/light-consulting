/**
 * Deliverable Card Component (Kanban View)
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import type { DeliverableWithAssignee, DeliverablePriority } from '@/types/deliverables';

interface DeliverableCardProps {
  deliverable: DeliverableWithAssignee;
  onClick: (deliverable: DeliverableWithAssignee) => void;
  onDragStart: (e: React.DragEvent, deliverable: DeliverableWithAssignee) => void;
  isDragging?: boolean;
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

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const priorityBorderColors: Record<DeliverablePriority, string> = {
  urgent: 'border-l-red-500',
  high: 'border-l-orange-500',
  medium: 'border-l-amber-500',
  low: 'border-l-gray-500',
};

export const DeliverableCard: React.FC<DeliverableCardProps> = ({
  deliverable,
  onClick,
  onDragStart,
  isDragging = false,
}) => {
  const isCompleted = deliverable.status === 'completed';
  const isOverdue = deliverable.due_date && new Date(deliverable.due_date) < new Date() && !isCompleted;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, deliverable)}
      onClick={() => onClick(deliverable)}
      className={`
        border-l-4 ${priorityBorderColors[deliverable.priority]}
        bg-depth-surface border border-depth-border border-l-0 rounded-r-lg p-3
        cursor-grab active:cursor-grabbing
        hover:border-radiance-gold/30 transition-all
        ${isDragging ? 'opacity-50 ring-2 ring-radiance-gold' : ''}
        ${isCompleted ? 'opacity-60' : ''}
      `}
    >
      {/* Phase Badge */}
      {deliverable.phase_name && (
        <div className="mb-2">
          <span className="inline-flex px-1.5 py-0.5 text-xs rounded bg-depth-elevated text-text-muted truncate max-w-full">
            {deliverable.phase_name}
          </span>
        </div>
      )}

      {/* Title */}
      <h4
        className={`text-sm font-medium text-text-primary mb-1 ${
          isCompleted ? 'line-through' : ''
        }`}
      >
        {deliverable.name}
      </h4>

      {/* Description */}
      {deliverable.description && (
        <p className="text-xs text-text-muted line-clamp-2 mb-2">
          {deliverable.description}
        </p>
      )}

      {/* Meta */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          {/* Due Date */}
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

          {/* Links indicator */}
          {deliverable.links && deliverable.links.length > 0 && (
            <span className="text-xs flex items-center gap-1 text-blue-400" title={`${deliverable.links.length} link${deliverable.links.length > 1 ? 's' : ''}`}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {deliverable.links.length}
            </span>
          )}
        </div>

        {/* Assignee Avatar */}
        {deliverable.assigned_to_name ? (
          <div
            className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center text-xs font-medium"
            title={deliverable.assigned_to_name}
          >
            {getInitials(deliverable.assigned_to_name)}
          </div>
        ) : (
          <div
            className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center"
            title="Unassigned"
          >
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliverableCard;
