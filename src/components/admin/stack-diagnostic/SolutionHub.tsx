/**
 * Solution Hub - Central hub node in transform view
 */

'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';

export interface SolutionHubData {
  label: string;
  features: string[];
  icon: string;
}

type SolutionHubProps = NodeProps & { data: SolutionHubData };

export const SolutionHub: React.FC<SolutionHubProps> = ({ data }) => {
  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-green-500/10 rounded-full blur-xl animate-pulse" />

      <div className="relative bg-gradient-to-br from-green-500/20 to-teal-500/20 border-2 border-green-500/40 rounded-2xl px-6 py-5 min-w-[200px] shadow-lg shadow-green-500/10">
        <div className="text-center">
          <span className="text-3xl block mb-2">{data.icon}</span>
          <h3 className="text-base font-semibold text-green-400 mb-2">{data.label}</h3>
          <ul className="text-xs text-text-secondary space-y-1">
            {data.features.map((f, i) => (
              <li key={i} className="flex items-center gap-1.5 justify-center">
                <span className="w-1 h-1 rounded-full bg-green-500/60" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Handles on all sides */}
      <Handle type="source" position={Position.Top} id="top" className="!w-3 !h-3 !bg-green-500/40 !border-2 !border-green-500 !rounded-full" />
      <Handle type="source" position={Position.Right} id="right" className="!w-3 !h-3 !bg-green-500/40 !border-2 !border-green-500 !rounded-full" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!w-3 !h-3 !bg-green-500/40 !border-2 !border-green-500 !rounded-full" />
      <Handle type="source" position={Position.Left} id="left" className="!w-3 !h-3 !bg-green-500/40 !border-2 !border-green-500 !rounded-full" />
    </div>
  );
};
