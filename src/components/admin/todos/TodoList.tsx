/**
 * Todo List Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { TodoItem } from './TodoItem';
import type { Todo, TodoStatus } from '@/types/todos';

interface TodoListProps {
  todos: Array<Todo & {
    project_name?: string;
    client_name?: string;
    internal_project_name?: string;
    assigned_to_name?: string;
  }>;
  isLoading?: boolean;
  emptyMessage?: string;
  onStatusChange?: (id: string, status: TodoStatus) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  showProject?: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  isLoading = false,
  emptyMessage = 'No todos found',
  onStatusChange,
  onDelete,
  onEdit,
  showProject = true,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-depth-surface border border-depth-border rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-depth-elevated" />
              <div className="flex-1">
                <div className="h-4 bg-depth-elevated rounded w-3/4 mb-2" />
                <div className="h-3 bg-depth-elevated rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-depth-elevated rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEdit={onEdit}
          showProject={showProject}
        />
      ))}
    </div>
  );
};

export default TodoList;
