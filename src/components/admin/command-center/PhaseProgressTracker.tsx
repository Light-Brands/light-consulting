/**
 * Phase Progress Tracker Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import type { PhaseStatus } from '@/types/proposals';

interface Phase {
  id: string;
  phase_name: string;
  phase_status: PhaseStatus;
}

interface PhaseProgressTrackerProps {
  phases: Phase[];
  compact?: boolean;
}

const STATUS_COLORS: Record<PhaseStatus, { bg: string; border: string; text: string }> = {
  not_started: {
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/30',
    text: 'text-gray-400',
  },
  in_progress: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/50',
    text: 'text-blue-400',
  },
  completed: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/50',
    text: 'text-green-400',
  },
  blocked: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/50',
    text: 'text-red-400',
  },
};

export const PhaseProgressTracker: React.FC<PhaseProgressTrackerProps> = ({
  phases,
  compact = false,
}) => {
  if (!phases || phases.length === 0) {
    return (
      <div className="text-text-muted text-sm">No phases defined</div>
    );
  }

  const completedCount = phases.filter(p => p.phase_status === 'completed').length;
  const currentPhase = phases.find(p => p.phase_status === 'in_progress');

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {phases.map((phase, index) => {
            const colors = STATUS_COLORS[phase.phase_status] || STATUS_COLORS.not_started;
            return (
              <div
                key={phase.id}
                className={`w-2 h-2 rounded-full ${colors.bg} border ${colors.border}`}
                title={`${phase.phase_name}: ${phase.phase_status.replace('_', ' ')}`}
              />
            );
          })}
        </div>
        <span className="text-xs text-text-muted">
          {completedCount}/{phases.length}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="flex items-center gap-1">
        {phases.map((phase, index) => {
          const colors = STATUS_COLORS[phase.phase_status] || STATUS_COLORS.not_started;
          const isLast = index === phases.length - 1;

          return (
            <React.Fragment key={phase.id}>
              <div
                className={`
                  flex-1 h-2 rounded-full ${colors.bg} border ${colors.border}
                  transition-all
                `}
                title={`${phase.phase_name}: ${phase.phase_status.replace('_', ' ')}`}
              />
              {!isLast && (
                <div className="w-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Phase labels */}
      <div className="flex items-start justify-between gap-2">
        {phases.map((phase) => {
          const colors = STATUS_COLORS[phase.phase_status] || STATUS_COLORS.not_started;
          const isActive = phase.phase_status === 'in_progress';

          return (
            <div
              key={phase.id}
              className={`flex-1 text-center ${isActive ? 'scale-105' : ''}`}
            >
              <p className={`text-xs font-medium truncate ${colors.text}`}>
                {phase.phase_name}
              </p>
            </div>
          );
        })}
      </div>

      {/* Current phase highlight */}
      {currentPhase && (
        <div className="flex items-center gap-2 text-blue-400">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs font-medium">
            Current: {currentPhase.phase_name}
          </span>
        </div>
      )}
    </div>
  );
};

export default PhaseProgressTracker;
