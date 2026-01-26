/**
 * Kanban Board Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useMemo } from 'react';
import { KanbanColumn } from './KanbanColumn';
import type { DeliverableWithAssignee, DeliverableStatus, DeliverablesByStatus } from '@/types/deliverables';

interface KanbanBoardProps {
  deliverables: DeliverableWithAssignee[];
  onStatusChange: (id: string, status: DeliverableStatus) => void;
  onDeliverableClick: (deliverable: DeliverableWithAssignee) => void;
  showCompletedColumn?: boolean;
}

const KANBAN_STATUSES: DeliverableStatus[] = ['pending', 'in_progress', 'review', 'completed'];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  deliverables,
  onStatusChange,
  onDeliverableClick,
  showCompletedColumn = true,
}) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Group deliverables by status
  const deliverablesByStatus = useMemo<DeliverablesByStatus>(() => {
    const grouped: DeliverablesByStatus = {
      pending: [],
      in_progress: [],
      review: [],
      completed: [],
    };

    for (const d of deliverables) {
      if (d.status === 'cancelled') continue; // Don't show cancelled in kanban
      const status = d.status as keyof DeliverablesByStatus;
      if (grouped[status]) {
        grouped[status].push(d);
      }
    }

    // Sort within each column by sort_order
    for (const status of Object.keys(grouped) as (keyof DeliverablesByStatus)[]) {
      grouped[status].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    }

    return grouped;
  }, [deliverables]);

  const handleDragStart = (e: React.DragEvent, deliverable: DeliverableWithAssignee) => {
    setDraggingId(deliverable.id);
    e.dataTransfer.setData('deliverable', JSON.stringify(deliverable));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (status: DeliverableStatus, e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('deliverable');
    if (!data) return;

    try {
      const deliverable = JSON.parse(data) as DeliverableWithAssignee;
      if (deliverable.status !== status) {
        onStatusChange(deliverable.id, status);
      }
    } catch (error) {
      console.error('Error parsing dropped deliverable:', error);
    }

    setDraggingId(null);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  const visibleStatuses = showCompletedColumn
    ? KANBAN_STATUSES
    : KANBAN_STATUSES.filter((s) => s !== 'completed');

  return (
    <div
      className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
      onDragEnd={handleDragEnd}
    >
      {visibleStatuses.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          deliverables={deliverablesByStatus[status as keyof DeliverablesByStatus] || []}
          onDeliverableClick={onDeliverableClick}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          draggingId={draggingId}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
