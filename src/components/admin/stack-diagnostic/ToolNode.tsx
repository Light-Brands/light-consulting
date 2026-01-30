/**
 * Custom ReactFlow Node for a diagnostic tool
 */

'use client';

import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { categoryColors, categoryLabels } from '@/lib/stack-diagnostic';
import type { ToolCategory } from '@/types/stack-diagnostic';

export interface ToolNodeData {
  label: string;
  icon: string;
  category: ToolCategory;
  toolId: string;
  onRemove?: (nodeId: string) => void;
  dimmed?: boolean;
  highlighted?: boolean;
  warning?: boolean;
}

type ToolNodeProps = NodeProps & { data: ToolNodeData };

const ToolNodeComponent: React.FC<ToolNodeProps> = ({ id, data }) => {
  const colors = categoryColors[data.category];

  return (
    <div
      className={`relative group transition-all duration-300 ${
        data.dimmed ? 'opacity-40' : ''
      } ${data.warning ? 'animate-pulse' : ''}`}
    >
      <div
        className={`relative px-4 py-3 rounded-lg border-2 bg-depth-base min-w-[140px] transition-all ${
          data.highlighted
            ? 'border-red-500 shadow-lg shadow-red-500/20'
            : data.warning
              ? 'border-amber-500/60 shadow-md shadow-amber-500/10'
              : `${colors.border} hover:shadow-md`
        }`}
        style={!data.highlighted && !data.warning ? { borderColor: `${colors.node}30` } : undefined}
      >
        {/* Category label */}
        <div className="absolute -top-2.5 left-3">
          <span
            className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded"
            style={{ backgroundColor: `${colors.node}15`, color: colors.node }}
          >
            {categoryLabels[data.category]}
          </span>
        </div>

        {/* Content */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg">{data.icon}</span>
          <span className="text-sm font-medium text-text-primary truncate max-w-[120px]">
            {data.label}
          </span>
        </div>

        {/* Remove button */}
        {data.onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              data.onRemove?.(id);
            }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500/80 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
          >
            ×
          </button>
        )}
      </div>

      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !bg-depth-elevated !border-2 !rounded-full"
        style={{ borderColor: colors.node }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !bg-depth-elevated !border-2 !rounded-full"
        style={{ borderColor: colors.node }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!w-2.5 !h-2.5 !bg-depth-elevated !border-2 !rounded-full"
        style={{ borderColor: colors.node }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!w-2.5 !h-2.5 !bg-depth-elevated !border-2 !rounded-full"
        style={{ borderColor: colors.node }}
      />
    </div>
  );
};

export const ToolNode = memo(ToolNodeComponent);
