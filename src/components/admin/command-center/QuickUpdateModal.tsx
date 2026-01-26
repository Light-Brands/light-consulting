/**
 * Quick Update Modal Component
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { HealthStatusBadge } from './HealthStatusBadge';
import type { HealthStatus, ProjectPriority } from '@/types/projects';

interface QuickUpdateModalProps {
  projectId: string;
  projectName: string;
  currentProgress: number;
  currentHealthStatus: HealthStatus;
  currentPriority: ProjectPriority;
  currentNextAction: string | null;
  currentNextActionDueDate: string | null;
  isOnHold: boolean;
  onClose: () => void;
  onSave: (updates: {
    progress_percentage?: number;
    health_status?: HealthStatus;
    priority?: ProjectPriority;
    next_action?: string | null;
    next_action_due_date?: string | null;
    is_on_hold?: boolean;
    on_hold_reason?: string | null;
  }) => Promise<void>;
}

const HEALTH_OPTIONS: HealthStatus[] = ['on_track', 'at_risk', 'behind', 'blocked'];
const PRIORITY_OPTIONS: ProjectPriority[] = ['urgent', 'high', 'medium', 'low'];

export const QuickUpdateModal: React.FC<QuickUpdateModalProps> = ({
  projectId,
  projectName,
  currentProgress,
  currentHealthStatus,
  currentPriority,
  currentNextAction,
  currentNextActionDueDate,
  isOnHold,
  onClose,
  onSave,
}) => {
  const [progress, setProgress] = useState(currentProgress);
  const [healthStatus, setHealthStatus] = useState(currentHealthStatus);
  const [priority, setPriority] = useState(currentPriority);
  const [nextAction, setNextAction] = useState(currentNextAction || '');
  const [nextActionDueDate, setNextActionDueDate] = useState(currentNextActionDueDate || '');
  const [onHold, setOnHold] = useState(isOnHold);
  const [onHoldReason, setOnHoldReason] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        progress_percentage: progress,
        health_status: healthStatus,
        priority,
        next_action: nextAction || null,
        next_action_due_date: nextActionDueDate || null,
        is_on_hold: onHold,
        on_hold_reason: onHold ? onHoldReason || null : null,
      });
      onClose();
    } catch (error) {
      console.error('Error saving update:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-depth-surface border border-depth-border rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Quick Update
            </h3>
            <p className="text-sm text-text-muted truncate">{projectName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          {/* Progress */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Progress: {progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              className="w-full h-2 bg-depth-elevated rounded-lg appearance-none cursor-pointer accent-radiance-gold"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Health Status */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Health Status
            </label>
            <div className="flex flex-wrap gap-2">
              {HEALTH_OPTIONS.map((status) => (
                <button
                  key={status}
                  onClick={() => setHealthStatus(status)}
                  className={`
                    transition-all rounded-lg p-1
                    ${healthStatus === status ? 'ring-2 ring-radiance-gold' : 'opacity-60 hover:opacity-100'}
                  `}
                >
                  <HealthStatusBadge status={status} size="sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Priority
            </label>
            <div className="flex flex-wrap gap-2">
              {PRIORITY_OPTIONS.map((p) => {
                const colors: Record<ProjectPriority, string> = {
                  urgent: 'text-red-400 bg-red-500/10',
                  high: 'text-orange-400 bg-orange-500/10',
                  medium: 'text-amber-400 bg-amber-500/10',
                  low: 'text-gray-400 bg-gray-500/10',
                };
                return (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`
                      px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                      ${colors[p]}
                      ${priority === p ? 'ring-2 ring-radiance-gold' : 'opacity-60 hover:opacity-100'}
                    `}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Action */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Next Action
            </label>
            <input
              type="text"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              placeholder="What needs to happen next?"
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
            />
          </div>

          {/* Next Action Due Date */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={nextActionDueDate}
              onChange={(e) => setNextActionDueDate(e.target.value)}
              className="w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary focus:border-radiance-gold focus:outline-none"
            />
          </div>

          {/* On Hold Toggle */}
          <div className="border-t border-depth-border pt-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={onHold}
                onChange={(e) => setOnHold(e.target.checked)}
                className="w-5 h-5 rounded border-depth-border bg-depth-base accent-radiance-gold"
              />
              <span className="text-sm font-medium text-text-primary">
                Put project on hold
              </span>
            </label>

            {onHold && (
              <input
                type="text"
                value={onHoldReason}
                onChange={(e) => setOnHoldReason(e.target.value)}
                placeholder="Reason for hold (optional)"
                className="mt-3 w-full bg-depth-base border border-depth-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-radiance-gold focus:outline-none"
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-depth-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickUpdateModal;
