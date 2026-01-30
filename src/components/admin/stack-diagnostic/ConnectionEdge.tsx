/**
 * Custom ReactFlow Edge with connection type styling
 */

'use client';

import React, { memo } from 'react';
import { BaseEdge, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';
import type { ConnectionType } from '@/types/stack-diagnostic';

export interface ConnectionEdgeData {
  connectionType: ConnectionType;
  dimmed?: boolean;
  flickering?: boolean;
}

const connectionStyles: Record<ConnectionType, { stroke: string; strokeDasharray?: string; label: string }> = {
  native: { stroke: '#22C55E', label: 'Native' },
  zapier: { stroke: '#F59E0B', strokeDasharray: '8 4', label: 'Zapier' },
  manual: { stroke: '#EF4444', strokeDasharray: '4 4', label: 'Manual' },
  broken: { stroke: '#EF4444', strokeDasharray: '2 6', label: 'Broken' },
  none: { stroke: '#6B7280', strokeDasharray: '2 2', label: 'None' },
};

const ConnectionEdgeComponent: React.FC<EdgeProps & { data?: ConnectionEdgeData }> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}) => {
  const connType = data?.connectionType || 'none';
  const style = connectionStyles[connType];

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: style.stroke,
          strokeWidth: selected ? 3 : 2,
          strokeDasharray: style.strokeDasharray,
          opacity: data?.dimmed ? 0.2 : data?.flickering ? 0.6 : 1,
          transition: 'opacity 0.3s',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <span
            className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border"
            style={{
              backgroundColor: `${style.stroke}15`,
              borderColor: `${style.stroke}40`,
              color: style.stroke,
              opacity: data?.dimmed ? 0.3 : 1,
            }}
          >
            {style.label}
          </span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export const ConnectionEdge = memo(ConnectionEdgeComponent);
