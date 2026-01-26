/**
 * Kanban Column Component
 * Light Brand Consulting
 */

'use client';

import React, { useState } from 'react';
import { DeliverableCard } from './DeliverableCard';
import type { DeliverableWithAssignee, DeliverableStatus } from '@/types/deliverables';
import { DELIVERABLE_STATUS_CONFIGS } from '@/types/deliverables';

interface KanbanColumnProps {
  status: DeliverableStatus;
  deliverables: DeliverableWithAssignee[];
  onDeliverableClick: (deliverable: DeliverableWithAssignee) => void;
  onDragStart: (e: React.DragEvent, deliverable: DeliverableWithAssignee) => void;
  onDrop: (status: DeliverableStatus, e: React.DragEvent) => void;
  draggingId: string | null;
}

const STATUS_COLORS: Record<string, { header: string; dot: string }> = {
  gray: {
    header: 'border-gray-500/30',
    dot: 'bg-gray-400',
  },
  blue: {
    header: 'border-blue-500/30',
    dot: 'bg-blue-400',
  },
  purple: {
    header: 'border-purple-500/30',
    dot: 'bg-purple-400',
  },
  green: {
    header: 'border-green-500/30',
    dot: 'bg-green-400',
  },
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  deliverables,
  onDeliverableClick,
  onDragStart,
  onDrop,
  draggingId,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const config = DELIVERABLE_STATUS_CONFIGS.find((s) => s.value === status);
  const colors = STATUS_COLORS[config?.color || 'gray'];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set false if we're actually leaving the column
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(status, e);
  };

  return (
    <div
      className={`
        flex flex-col min-w-[280px] max-w-[320px] flex-1
        bg-depth-base rounded-xl border border-depth-border
        ${isDragOver ? 'ring-2 ring-radiance-gold/50 bg-radiance-gold/5' : ''}
        transition-all
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className={`px-4 py-3 border-b ${colors.header}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
            <h3 className="text-sm font-semibold text-text-primary">
              {config?.label || status}
            </h3>
          </div>
          <span className="text-xs text-text-muted bg-depth-elevated px-2 py-0.5 rounded-full">
            {deliverables.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[calc(100vh-320px)]">
        {deliverables.map((deliverable) => (
          <DeliverableCard
            key={deliverable.id}
            deliverable={deliverable}
            onClick={onDeliverableClick}
            onDragStart={onDragStart}
            isDragging={draggingId === deliverable.id}
          />
        ))}

        {deliverables.length === 0 && (
          <div
            className={`
              border-2 border-dashed border-depth-border rounded-lg p-4 text-center
              ${isDragOver ? 'border-radiance-gold/50 bg-radiance-gold/5' : ''}
            `}
          >
            <p className="text-xs text-text-muted">
              {isDragOver ? 'Drop here' : 'No deliverables'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
