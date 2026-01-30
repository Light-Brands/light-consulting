/**
 * Satellite Node - Satellite module in transform view
 */

'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';

export interface SatelliteNodeData {
  label: string;
  replaces: string[];
  features: string[];
  icon: string;
}

type SatelliteNodeProps = NodeProps & { data: SatelliteNodeData };

export const SatelliteNode: React.FC<SatelliteNodeProps> = ({ data }) => {
  return (
    <div className="relative group">
      <div className="bg-depth-base border-2 border-teal-500/30 rounded-xl px-4 py-3 min-w-[160px] hover:border-teal-500/50 transition-colors shadow-md shadow-teal-500/5">
        <div className="text-center">
          <span className="text-xl block mb-1">{data.icon}</span>
          <h4 className="text-sm font-medium text-teal-400 mb-1">{data.label}</h4>

          {data.replaces.length > 0 && (
            <div className="mb-2">
              <p className="text-[9px] font-mono tracking-widest text-text-muted uppercase">Replaces</p>
              <p className="text-[10px] text-red-400/60 line-through">
                {data.replaces.join(', ')}
              </p>
            </div>
          )}

          <ul className="text-[10px] text-text-secondary space-y-0.5">
            {data.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-center gap-1 justify-center">
                <span className="w-1 h-1 rounded-full bg-teal-500/50" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Handle type="target" position={Position.Top} id="top" className="!w-2.5 !h-2.5 !bg-teal-500/30 !border-2 !border-teal-500/60 !rounded-full" />
      <Handle type="target" position={Position.Right} id="right" className="!w-2.5 !h-2.5 !bg-teal-500/30 !border-2 !border-teal-500/60 !rounded-full" />
      <Handle type="target" position={Position.Bottom} id="bottom" className="!w-2.5 !h-2.5 !bg-teal-500/30 !border-2 !border-teal-500/60 !rounded-full" />
      <Handle type="target" position={Position.Left} id="left" className="!w-2.5 !h-2.5 !bg-teal-500/30 !border-2 !border-teal-500/60 !rounded-full" />
    </div>
  );
};
