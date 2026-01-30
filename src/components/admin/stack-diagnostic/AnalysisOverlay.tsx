/**
 * Analysis Overlay - Step 3
 * Orchestrates the reveal animation sequence
 */

'use client';

import React, { useState, useEffect } from 'react';
import type { AnalysisResult, PlacedTool, ToolConnection, IndustryTemplate } from '@/types/stack-diagnostic';
import { StackCanvas } from './StackCanvas';
import { DiagnosticStats } from './DiagnosticStats';
import { IssuesList } from './IssuesList';
import { PainPointCallout } from './PainPointCallout';

interface AnalysisOverlayProps {
  analysis: AnalysisResult;
  placedTools: PlacedTool[];
  connections: ToolConnection[];
  template: IndustryTemplate;
  onShowSolution: () => void;
  onBack: () => void;
  coachNotes: string;
  onCoachNotesChange: (notes: string) => void;
}

type AnimationPhase = 'dim' | 'flicker' | 'reveal-stats' | 'reveal-issues' | 'complete';

export const AnalysisOverlay: React.FC<AnalysisOverlayProps> = ({
  analysis,
  placedTools,
  connections,
  template,
  onShowSolution,
  onBack,
  coachNotes,
  onCoachNotesChange,
}) => {
  const [phase, setPhase] = useState<AnimationPhase>('dim');

  // Animation sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('flicker'), 600),
      setTimeout(() => setPhase('reveal-stats'), 1800),
      setTimeout(() => setPhase('reveal-issues'), 3000),
      setTimeout(() => setPhase('complete'), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Determine which nodes to highlight based on issues
  const warningNodeIds = new Set<string>();
  const highlightedNodeIds = new Set<string>();

  for (const issue of analysis.issues) {
    for (const toolId of issue.affectedTools) {
      const placed = placedTools.find(pt => pt.toolId === toolId || pt.id === toolId);
      if (placed) {
        if (issue.severity === 'critical') {
          highlightedNodeIds.add(placed.id);
        } else {
          warningNodeIds.add(placed.id);
        }
      }
    }
  }

  const phaseIndex = ['dim', 'flicker', 'reveal-stats', 'reveal-issues', 'complete'].indexOf(phase);

  return (
    <div className="flex h-full">
      {/* Left: Canvas with dimming/highlighting */}
      <div className="flex-1 relative">
        <StackCanvas
          placedTools={placedTools}
          connections={connections}
          onToolsChange={() => {}}
          onConnectionsChange={() => {}}
          onRemoveTool={() => {}}
          highlightedNodes={phaseIndex >= 2 ? highlightedNodeIds : undefined}
          warningNodes={phaseIndex >= 2 ? warningNodeIds : undefined}
          flickeringEdges={phase === 'flicker'}
          readOnly
        />

        {/* Scanning overlay during animation */}
        {phaseIndex < 2 && (
          <div className="absolute inset-0 bg-depth-base/60 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-radiance-gold/40 border-t-radiance-gold rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-radiance-gold font-mono">
                {phase === 'dim' ? 'Scanning stack...' : 'Detecting fractures...'}
              </p>
            </div>
          </div>
        )}

        {/* Score badge */}
        {phaseIndex >= 2 && (
          <div className="absolute top-4 left-4 bg-depth-surface/95 border border-depth-border rounded-xl p-4 shadow-lg">
            <div className="text-[10px] font-mono tracking-widest text-text-muted uppercase mb-1">
              Stack Health
            </div>
            <div className={`text-3xl font-bold font-mono ${
              analysis.score >= 70 ? 'text-green-400' :
              analysis.score >= 40 ? 'text-amber-400' :
              'text-red-400'
            }`}>
              {analysis.score}
              <span className="text-sm text-text-muted">/100</span>
            </div>
          </div>
        )}
      </div>

      {/* Right: Analysis panel */}
      <div className="w-96 bg-depth-surface border-l border-depth-border overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Stack Fractures
            </h3>
            <p className="text-xs text-text-muted mt-1">
              {analysis.issues.length} issue{analysis.issues.length !== 1 ? 's' : ''} found across {placedTools.length} tools
            </p>
          </div>

          {/* Stats */}
          {phaseIndex >= 2 && (
            <DiagnosticStats stats={analysis.stats} animate={phase === 'reveal-stats'} />
          )}

          {/* Issues */}
          {phaseIndex >= 3 && (
            <IssuesList issues={analysis.issues} animate={phase === 'reveal-issues'} />
          )}

          {/* Pain points */}
          {phaseIndex >= 4 && template.painPoints.length > 0 && (
            <PainPointCallout painPoints={template.painPoints} animate />
          )}

          {/* Coach notes */}
          {phaseIndex >= 4 && (
            <div>
              <h4 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-2">
                Coach Notes
              </h4>
              <textarea
                value={coachNotes}
                onChange={(e) => onCoachNotesChange(e.target.value)}
                placeholder="Notes about this prospect's situation..."
                className="w-full bg-depth-elevated border border-depth-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-radiance-gold/50 resize-none"
                rows={3}
              />
            </div>
          )}

          {/* Actions */}
          {phaseIndex >= 4 && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onBack}
                className="text-sm text-text-muted hover:text-text-secondary transition-colors"
              >
                ← Edit Stack
              </button>
              <button
                onClick={onShowSolution}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-radiance-gold text-depth-base hover:bg-radiance-amber shadow-illumination hover:shadow-illumination-intense transition-all"
              >
                Show Solution →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
