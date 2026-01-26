/**
 * Workload Chart Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import type { TeamMemberWorkload } from '@/types/todos';

interface WorkloadChartProps {
  workload: TeamMemberWorkload[];
  isLoading?: boolean;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const WorkloadChart: React.FC<WorkloadChartProps> = ({
  workload,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-depth-elevated" />
              <div className="h-4 bg-depth-elevated rounded w-24" />
            </div>
            <div className="h-2 bg-depth-elevated rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (workload.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted">
        No team members found
      </div>
    );
  }

  const maxTodos = Math.max(...workload.map((w) => w.active_todos), 1);

  return (
    <div className="space-y-4">
      {workload.map((member) => {
        const todoPercent = (member.active_todos / maxTodos) * 100;
        const hasOverdue = member.overdue_todos > 0;
        const hasUrgent = member.urgent_todos > 0;

        return (
          <div key={member.user_profile_id} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center flex-shrink-0">
                  <span className="text-depth-base font-semibold text-xs">
                    {getInitials(member.full_name)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {member.full_name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {member.active_projects} projects
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">
                  {member.active_todos} tasks
                </p>
                <div className="flex items-center gap-2 text-xs">
                  {hasUrgent && (
                    <span className="text-red-400">
                      {member.urgent_todos} urgent
                    </span>
                  )}
                  {hasOverdue && (
                    <span className="text-orange-400">
                      {member.overdue_todos} overdue
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-depth-elevated rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  hasOverdue
                    ? 'bg-gradient-to-r from-orange-500 to-orange-400'
                    : hasUrgent
                    ? 'bg-gradient-to-r from-red-500 to-red-400'
                    : 'bg-gradient-to-r from-radiance-gold to-radiance-amber'
                }`}
                style={{ width: `${todoPercent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkloadChart;
