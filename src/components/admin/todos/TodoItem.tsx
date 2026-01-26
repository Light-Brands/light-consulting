/**
 * Todo Item Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import type { Todo, TodoStatus, TodoPriority } from '@/types/todos';

interface TodoItemProps {
  todo: Todo & {
    project_name?: string;
    client_name?: string;
    internal_project_name?: string;
    assigned_to_name?: string;
  };
  onStatusChange?: (id: string, status: TodoStatus) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  showProject?: boolean;
}

const PRIORITY_COLORS: Record<TodoPriority, string> = {
  urgent: 'border-l-red-500 bg-red-500/5',
  high: 'border-l-orange-500 bg-orange-500/5',
  medium: 'border-l-amber-500',
  low: 'border-l-gray-500',
};

const PRIORITY_BADGES: Record<TodoPriority, string> = {
  urgent: 'text-red-400 bg-red-500/10',
  high: 'text-orange-400 bg-orange-500/10',
  medium: 'text-amber-400 bg-amber-500/10',
  low: 'text-gray-400 bg-gray-500/10',
};

const STATUS_COLORS: Record<TodoStatus, string> = {
  pending: 'border-gray-500',
  in_progress: 'border-blue-500 bg-blue-500',
  completed: 'border-green-500 bg-green-500',
  cancelled: 'border-gray-400 bg-gray-400',
};

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

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onStatusChange,
  onDelete,
  onEdit,
  showProject = true,
}) => {
  const isCompleted = todo.status === 'completed';
  const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && !isCompleted;

  const handleToggle = () => {
    if (!onStatusChange) return;
    const newStatus: TodoStatus = isCompleted ? 'pending' : 'completed';
    onStatusChange(todo.id, newStatus);
  };

  const projectName = todo.project_name || todo.internal_project_name;

  return (
    <div
      className={`
        border-l-4 ${PRIORITY_COLORS[todo.priority]}
        bg-depth-surface border border-depth-border rounded-r-lg p-3
        hover:border-radiance-gold/30 transition-all group
        ${isCompleted ? 'opacity-60' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`
            mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0
            flex items-center justify-center transition-all
            ${STATUS_COLORS[todo.status]}
            ${!isCompleted ? 'hover:border-radiance-gold' : ''}
          `}
        >
          {isCompleted && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {todo.status === 'in_progress' && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium text-text-primary ${
                  isCompleted ? 'line-through' : ''
                }`}
              >
                {todo.title}
              </p>
              {todo.description && (
                <p className="text-xs text-text-muted mt-1 line-clamp-2">
                  {todo.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <button
                  onClick={() => onEdit(todo.id)}
                  className="p-1.5 text-text-muted hover:text-radiance-gold hover:bg-radiance-gold/10 rounded transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(todo.id)}
                  className="p-1.5 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${PRIORITY_BADGES[todo.priority]}`}>
              {todo.priority}
            </span>

            {showProject && projectName && (
              <span className="text-xs text-text-muted flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {projectName}
              </span>
            )}

            {todo.due_date && (
              <span
                className={`text-xs flex items-center gap-1 ${
                  isOverdue ? 'text-red-400' : 'text-text-muted'
                }`}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(todo.due_date)}
              </span>
            )}

            {todo.estimated_minutes && (
              <span className="text-xs text-text-muted flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {todo.estimated_minutes}m
              </span>
            )}

            {todo.tags && todo.tags.length > 0 && (
              <div className="flex gap-1">
                {todo.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 text-xs rounded bg-depth-elevated text-text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
