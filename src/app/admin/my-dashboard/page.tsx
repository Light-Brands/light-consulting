/**
 * My Dashboard Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { TodoList, QuickAddTodo } from '@/components/admin/todos';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { Todo, TodoStatus, TodoPriority } from '@/types/todos';

export default function MyDashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const { authFetch } = useAuthFetch();

  const fetchTodos = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (showCompleted) params.set('include_completed', 'true');

      const response = await authFetch(`/api/admin/todos/my?${params.toString()}`);
      const data = await response.json();

      if (data.data) {
        setTodos(data.data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, showCompleted]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (data: {
    title: string;
    priority: TodoPriority;
    due_date?: string;
    proposal_id?: string;
  }) => {
    const response = await authFetch('/api/admin/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }

    fetchTodos();
  };

  const handleStatusChange = async (id: string, status: TodoStatus) => {
    try {
      await authFetch(`/api/admin/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      // Update local state
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, status, completed_at: status === 'completed' ? new Date().toISOString() : null }
            : t
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await authFetch(`/api/admin/todos/${id}`, {
        method: 'DELETE',
      });

      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Group todos by status
  const inProgress = todos.filter((t) => t.status === 'in_progress');
  const pending = todos.filter((t) => t.status === 'pending');
  const completed = todos.filter((t) => t.status === 'completed');
  const urgent = todos.filter((t) => t.priority === 'urgent' && t.status !== 'completed');
  const overdue = todos.filter(
    (t) => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'completed'
  );

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="My Dashboard"
        subtitle="Your personal task overview"
        action={
          <Button variant="primary" size="sm" onClick={() => fetchTodos()}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </Button>
        }
      />

      <div className="py-4 md:py-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: 'In Progress', value: inProgress.length, color: 'text-blue-400' },
              { label: 'Pending', value: pending.length, color: 'text-gray-400' },
              { label: 'Urgent', value: urgent.length, color: 'text-red-400' },
              { label: 'Overdue', value: overdue.length, color: 'text-orange-400' },
              { label: 'Completed', value: completed.length, color: 'text-green-400' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-depth-surface border border-depth-border rounded-xl px-4 py-3 text-center"
              >
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {isLoading ? '-' : stat.value}
                </p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Add */}
          <QuickAddTodo onAdd={handleAddTodo} placeholder="What do you need to do?" />

          {/* Toggle completed */}
          <div className="flex justify-end">
            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="rounded border-depth-border bg-depth-base accent-radiance-gold"
              />
              Show completed
            </label>
          </div>

          {/* Urgent Tasks */}
          {urgent.length > 0 && (
            <div className="bg-depth-surface border border-red-500/30 rounded-2xl overflow-hidden">
              <div className="p-4 md:p-6 border-b border-depth-border bg-red-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] font-mono tracking-widest text-red-400 uppercase">
                    Priority::Urgent
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Urgent Tasks
                </h2>
              </div>
              <div className="p-4 md:p-6">
                <TodoList
                  todos={urgent}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          )}

          {/* All Tasks */}
          <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-depth-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                  Tasks::All
                </span>
              </div>
              <h2 className="text-lg font-semibold text-text-primary">
                My Tasks
              </h2>
            </div>

            <div className="p-4 md:p-6">
              <TodoList
                todos={todos.filter((t) => t.priority !== 'urgent' || t.status === 'completed')}
                isLoading={isLoading}
                emptyMessage="You're all caught up! No tasks to do."
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
