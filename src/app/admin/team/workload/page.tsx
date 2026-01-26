/**
 * Team Workload Page
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin';
import { Container, Button } from '@/components/ui';
import { WorkloadChart } from '@/components/admin/team';
import { useAuthFetch } from '@/hooks/useAuthFetch';
import type { TeamMemberWorkload } from '@/types/todos';

export default function TeamWorkloadPage() {
  const [workload, setWorkload] = useState<TeamMemberWorkload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authFetch } = useAuthFetch();

  const fetchWorkload = useCallback(async () => {
    try {
      const response = await authFetch('/api/admin/team/workload');
      const data = await response.json();

      if (data.data) {
        setWorkload(data.data);
      }
    } catch (error) {
      console.error('Error fetching workload:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchWorkload();
  }, [fetchWorkload]);

  const totalTodos = workload.reduce((sum, m) => sum + m.active_todos, 0);
  const totalUrgent = workload.reduce((sum, m) => sum + m.urgent_todos, 0);
  const totalOverdue = workload.reduce((sum, m) => sum + m.overdue_todos, 0);

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Team Workload"
        subtitle="Task distribution across the team"
        action={
          <Link href="/admin/team">
            <Button variant="outline" size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Team
            </Button>
          </Link>
        }
      />

      <div className="py-4 md:py-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-depth-surface border border-depth-border rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-radiance-gold">
                {isLoading ? '-' : totalTodos}
              </p>
              <p className="text-xs text-text-muted">Total Tasks</p>
            </div>
            <div className="bg-depth-surface border border-depth-border rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-red-400">
                {isLoading ? '-' : totalUrgent}
              </p>
              <p className="text-xs text-text-muted">Urgent</p>
            </div>
            <div className="bg-depth-surface border border-depth-border rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-orange-400">
                {isLoading ? '-' : totalOverdue}
              </p>
              <p className="text-xs text-text-muted">Overdue</p>
            </div>
          </div>

          {/* Workload Chart */}
          <div className="bg-depth-surface border border-depth-border rounded-2xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-depth-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50" />
                <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                  Workload::Distribution
                </span>
              </div>
              <h2 className="text-lg font-semibold text-text-primary">
                Task Distribution
              </h2>
            </div>

            <div className="p-4 md:p-6">
              <WorkloadChart workload={workload} isLoading={isLoading} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
