/**
 * Transform View - Step 4
 * Animated hub-and-satellite solution view
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import type { IndustryTemplate, AnalysisResult } from '@/types/stack-diagnostic';
import { layoutHubSatellite } from '@/lib/stack-diagnostic';
import { SolutionHub } from './SolutionHub';
import type { SolutionHubData } from './SolutionHub';
import { SatelliteNode } from './SatelliteNode';
import type { SatelliteNodeData } from './SatelliteNode';
import { DiagnosticStats } from './DiagnosticStats';

interface TransformViewProps {
  template: IndustryTemplate;
  analysis: AnalysisResult | null;
  onBack: () => void;
  onReset: () => void;
}

const nodeTypes = {
  solutionHub: SolutionHub,
  satellite: SatelliteNode,
};

type AnimationPhase = 'collapsing' | 'hub-emerge' | 'satellites-expand' | 'connections-draw' | 'complete';

export const TransformView: React.FC<TransformViewProps> = ({
  template,
  analysis,
  onBack,
  onReset,
}) => {
  const [phase, setPhase] = useState<AnimationPhase>('collapsing');

  const solution = template.solution;
  const layout = useMemo(
    () => layoutHubSatellite(solution.satellites.length),
    [solution.satellites.length]
  );

  // Animation sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('hub-emerge'), 800),
      setTimeout(() => setPhase('satellites-expand'), 1600),
      setTimeout(() => setPhase('connections-draw'), 2400),
      setTimeout(() => setPhase('complete'), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const phaseIndex = ['collapsing', 'hub-emerge', 'satellites-expand', 'connections-draw', 'complete'].indexOf(phase);

  // Build nodes
  const nodes: Node<SolutionHubData | SatelliteNodeData>[] = useMemo(() => {
    const result: Node<SolutionHubData | SatelliteNodeData>[] = [];

    if (phaseIndex >= 1) {
      result.push({
        id: 'hub',
        type: 'solutionHub',
        position: layout.hub,
        data: {
          label: solution.hub.name,
          features: solution.hub.features,
          icon: solution.hub.icon,
        },
        draggable: false,
      });
    }

    if (phaseIndex >= 2) {
      solution.satellites.forEach((sat, i) => {
        result.push({
          id: `satellite-${sat.id}`,
          type: 'satellite',
          position: layout.satellites[i],
          data: {
            label: sat.name,
            replaces: sat.replaces,
            features: sat.features,
            icon: sat.icon,
          },
          draggable: false,
        });
      });
    }

    return result;
  }, [phaseIndex, layout, solution]);

  // Build edges
  const edges: Edge[] = useMemo(() => {
    if (phaseIndex < 3) return [];

    const handlePositions = ['top', 'right', 'bottom', 'left'];

    return solution.satellites.map((sat, i) => {
      const handleId = handlePositions[i % handlePositions.length];
      return {
        id: `hub-to-${sat.id}`,
        source: 'hub',
        sourceHandle: handleId,
        target: `satellite-${sat.id}`,
        targetHandle: handleId,
        style: {
          stroke: '#14B8A6',
          strokeWidth: 2,
        },
        animated: true,
      };
    });
  }, [phaseIndex, solution.satellites]);

  return (
    <div className="flex h-full">
      {/* Canvas */}
      <div className="flex-1 relative">
        {/* Collapsing overlay */}
        {phaseIndex < 1 && (
          <div className="absolute inset-0 bg-depth-base flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-green-500/40 border-t-green-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-green-400 font-mono">Transforming stack...</p>
            </div>
          </div>
        )}

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          className="bg-depth-base"
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag
          zoomOnScroll
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#14B8A610" />
        </ReactFlow>
      </div>

      {/* Right panel */}
      <div className="w-96 bg-depth-surface border-l border-depth-border overflow-y-auto">
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-green-400">
              {solution.name}
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              {solution.description}
            </p>
          </div>

          {/* Before/After stats */}
          {phaseIndex >= 4 && analysis && (
            <div className="space-y-3">
              <div>
                <h4 className="text-[10px] font-mono tracking-widest text-red-400/60 uppercase mb-1.5 line-through">
                  Before
                </h4>
                <DiagnosticStats stats={analysis.stats} animate={false} />
              </div>
              <div>
                <h4 className="text-[10px] font-mono tracking-widest text-green-400 uppercase mb-1.5">
                  After
                </h4>
                <DiagnosticStats
                  stats={analysis.stats}
                  goodStats={solution.stats}
                  animate
                />
              </div>
            </div>
          )}

          {/* Solution modules */}
          {phaseIndex >= 2 && (
            <div>
              <h4 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-2">
                Integrated Modules
              </h4>
              <div className="space-y-2">
                {solution.satellites.map((sat) => (
                  <div
                    key={sat.id}
                    className="bg-depth-elevated border border-teal-500/20 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{sat.icon}</span>
                      <span className="text-sm font-medium text-teal-400">{sat.name}</span>
                    </div>
                    {sat.replaces.length > 0 && (
                      <p className="text-[10px] text-red-400/50 line-through mb-1">
                        Replaces: {sat.replaces.join(', ')}
                      </p>
                    )}
                    <ul className="text-[10px] text-text-secondary space-y-0.5">
                      {sat.features.map((f, i) => (
                        <li key={i}>- {f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          {phaseIndex >= 4 && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onBack}
                className="text-sm text-text-muted hover:text-text-secondary transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={onReset}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all"
              >
                Start New Diagnostic
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
