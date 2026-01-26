/**
 * List View Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useMemo } from 'react';
import { DeliverableRow } from './DeliverableRow';
import type { DeliverableWithAssignee, DeliverableStatus, DeliverablePriority } from '@/types/deliverables';

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
}

interface Phase {
  id: string;
  phase_name: string;
  phase_number: number;
}

type SortField = 'name' | 'status' | 'priority' | 'due_date' | 'phase';
type SortDirection = 'asc' | 'desc';

interface ListViewProps {
  deliverables: DeliverableWithAssignee[];
  phases: Phase[];
  teamMembers: TeamMember[];
  groupByPhase?: boolean;
  onStatusChange: (id: string, status: DeliverableStatus) => void;
  onAssigneeChange: (id: string, assigneeId: string | null) => void;
  onPriorityChange: (id: string, priority: DeliverablePriority) => void;
  onDeliverableClick: (deliverable: DeliverableWithAssignee) => void;
}

const PRIORITY_ORDER: Record<DeliverablePriority, number> = {
  urgent: 0,
  high: 1,
  medium: 2,
  low: 3,
};

const STATUS_ORDER: Record<DeliverableStatus, number> = {
  in_progress: 0,
  review: 1,
  pending: 2,
  completed: 3,
  cancelled: 4,
};

export const ListView: React.FC<ListViewProps> = ({
  deliverables,
  phases,
  teamMembers,
  groupByPhase = false,
  onStatusChange,
  onAssigneeChange,
  onPriorityChange,
  onDeliverableClick,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>('priority');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSelectChange = (id: string, selected: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (selected) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedIds(new Set(deliverables.map((d) => d.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedDeliverables = useMemo(() => {
    const sorted = [...deliverables].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'status':
          comparison = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
          break;
        case 'priority':
          comparison = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
          break;
        case 'due_date':
          const aDate = a.due_date ? new Date(a.due_date).getTime() : Infinity;
          const bDate = b.due_date ? new Date(b.due_date).getTime() : Infinity;
          comparison = aDate - bDate;
          break;
        case 'phase':
          const aPhase = phases.find((p) => p.id === a.phase_id)?.phase_number ?? 999;
          const bPhase = phases.find((p) => p.id === b.phase_id)?.phase_number ?? 999;
          comparison = aPhase - bPhase;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [deliverables, sortField, sortDirection, phases]);

  const groupedDeliverables = useMemo(() => {
    if (!groupByPhase) return null;

    const groups: Record<string, DeliverableWithAssignee[]> = {};
    const noPhase: DeliverableWithAssignee[] = [];

    for (const d of sortedDeliverables) {
      if (d.phase_id) {
        if (!groups[d.phase_id]) {
          groups[d.phase_id] = [];
        }
        groups[d.phase_id].push(d);
      } else {
        noPhase.push(d);
      }
    }

    return { groups, noPhase };
  }, [sortedDeliverables, groupByPhase]);

  const allSelected = deliverables.length > 0 && selectedIds.size === deliverables.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < deliverables.length;

  const SortButton: React.FC<{ field: SortField; label: string }> = ({ field, label }) => (
    <button
      onClick={() => handleSort(field)}
      className={`text-xs font-medium flex items-center gap-1 transition-colors ${
        sortField === field ? 'text-radiance-gold' : 'text-text-muted hover:text-text-primary'
      }`}
    >
      {label}
      {sortField === field && (
        <svg
          className={`w-3 h-3 transition-transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      )}
    </button>
  );

  if (deliverables.length === 0) {
    return (
      <div className="text-center py-12 text-text-muted">
        <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <p>No deliverables found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2 border-b border-depth-border">
        <input
          type="checkbox"
          checked={allSelected}
          ref={(el) => {
            if (el) el.indeterminate = someSelected;
          }}
          onChange={(e) => handleSelectAll(e.target.checked)}
          className="w-4 h-4 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold focus:ring-offset-0"
        />
        <div className="flex-1 flex items-center gap-4">
          <SortButton field="name" label="Name" />
          <div className="hidden md:block w-[80px]">
            <SortButton field="due_date" label="Due" />
          </div>
          <div className="hidden sm:block">
            <SortButton field="priority" label="Priority" />
          </div>
          <SortButton field="status" label="Status" />
        </div>
      </div>

      {/* Content */}
      {groupByPhase && groupedDeliverables ? (
        <div className="space-y-6">
          {phases
            .filter((p) => groupedDeliverables.groups[p.id]?.length > 0)
            .map((phase) => (
              <div key={phase.id}>
                <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
                  <span className="text-radiance-gold">Phase {phase.phase_number}</span>
                  <span>{phase.phase_name}</span>
                  <span className="text-text-muted">({groupedDeliverables.groups[phase.id].length})</span>
                </h3>
                <div className="space-y-2">
                  {groupedDeliverables.groups[phase.id].map((deliverable) => (
                    <DeliverableRow
                      key={deliverable.id}
                      deliverable={deliverable}
                      teamMembers={teamMembers}
                      onStatusChange={onStatusChange}
                      onAssigneeChange={onAssigneeChange}
                      onPriorityChange={onPriorityChange}
                      onClick={onDeliverableClick}
                      isSelected={selectedIds.has(deliverable.id)}
                      onSelectChange={handleSelectChange}
                    />
                  ))}
                </div>
              </div>
            ))}
          {groupedDeliverables.noPhase.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-text-muted mb-2">
                Unassigned to Phase ({groupedDeliverables.noPhase.length})
              </h3>
              <div className="space-y-2">
                {groupedDeliverables.noPhase.map((deliverable) => (
                  <DeliverableRow
                    key={deliverable.id}
                    deliverable={deliverable}
                    teamMembers={teamMembers}
                    onStatusChange={onStatusChange}
                    onAssigneeChange={onAssigneeChange}
                    onPriorityChange={onPriorityChange}
                    onClick={onDeliverableClick}
                    isSelected={selectedIds.has(deliverable.id)}
                    onSelectChange={handleSelectChange}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {sortedDeliverables.map((deliverable) => (
            <DeliverableRow
              key={deliverable.id}
              deliverable={deliverable}
              teamMembers={teamMembers}
              onStatusChange={onStatusChange}
              onAssigneeChange={onAssigneeChange}
              onPriorityChange={onPriorityChange}
              onClick={onDeliverableClick}
              isSelected={selectedIds.has(deliverable.id)}
              onSelectChange={handleSelectChange}
            />
          ))}
        </div>
      )}

      {/* Selection summary */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-depth-surface border border-depth-border rounded-lg px-4 py-2 shadow-lg flex items-center gap-3">
          <span className="text-sm text-text-primary">
            {selectedIds.size} selected
          </span>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="text-xs text-text-muted hover:text-radiance-gold transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default ListView;
