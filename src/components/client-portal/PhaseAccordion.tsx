/**
 * Phase Accordion Component
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import type { ClientPhase } from '@/types/client-portal';

interface PhaseAccordionProps {
  phases: ClientPhase[];
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  not_started: {
    label: 'Not Started',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    icon: <div className="w-3 h-3 rounded-full border-2 border-gray-400" />,
  },
  in_progress: {
    label: 'In Progress',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    icon: (
      <div className="w-3 h-3 rounded-full border-2 border-blue-400 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
      </div>
    ),
  },
  completed: {
    label: 'Completed',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    icon: (
      <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
        <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    ),
  },
  blocked: {
    label: 'Blocked',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    icon: <div className="w-3 h-3 rounded-full bg-red-500" />,
  },
};

export const PhaseAccordion: React.FC<PhaseAccordionProps> = ({ phases }) => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(
    phases.find((p) => p.phase_status === 'in_progress')?.id || null
  );

  if (phases.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted">
        No phases defined for this project
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {phases.map((phase, index) => {
        const isExpanded = expandedPhase === phase.id;
        const statusConfig = STATUS_CONFIG[phase.phase_status] || STATUS_CONFIG.not_started;

        return (
          <div
            key={phase.id}
            className="border border-depth-border rounded-xl overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
              className="w-full px-4 py-3 flex items-center gap-4 bg-depth-surface hover:bg-depth-elevated transition-colors"
            >
              {/* Phase number */}
              <div className="w-8 h-8 rounded-full bg-depth-elevated flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-text-primary">
                  {phase.phase_number}
                </span>
              </div>

              {/* Phase info */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-text-primary">
                    {phase.phase_name}
                  </h4>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${statusConfig.color} ${statusConfig.bgColor}`}>
                    {statusConfig.label}
                  </span>
                </div>
                {phase.timeline && (
                  <p className="text-xs text-text-muted mt-0.5">{phase.timeline}</p>
                )}
              </div>

              {/* Status icon */}
              <div className="flex-shrink-0">
                {statusConfig.icon}
              </div>

              {/* Expand icon */}
              <svg
                className={`w-5 h-5 text-text-muted transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Content */}
            {isExpanded && (
              <div className="px-4 pb-4 pt-2 border-t border-depth-border">
                {phase.description && (
                  <p className="text-sm text-text-secondary mb-4">
                    {phase.description}
                  </p>
                )}

                {/* Deliverables */}
                {phase.deliverables && phase.deliverables.length > 0 && (
                  <div>
                    <h5 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                      Deliverables
                    </h5>
                    <ul className="space-y-2">
                      {phase.deliverables.map((deliverable) => (
                        <li key={deliverable.id} className="flex items-start gap-2">
                          <svg
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              deliverable.status === 'completed'
                                ? 'text-green-400'
                                : 'text-text-muted'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={
                                deliverable.status === 'completed'
                                  ? 'M5 13l4 4L19 7'
                                  : 'M9 5l7 7-7 7'
                              }
                            />
                          </svg>
                          <span className="text-sm text-text-primary">
                            {deliverable.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Timeline */}
                {(phase.start_date || phase.end_date) && (
                  <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
                    {phase.start_date && (
                      <span>
                        Start: {new Date(phase.start_date).toLocaleDateString()}
                      </span>
                    )}
                    {phase.end_date && (
                      <span>
                        End: {new Date(phase.end_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PhaseAccordion;
