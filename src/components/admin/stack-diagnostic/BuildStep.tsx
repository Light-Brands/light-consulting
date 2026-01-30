/**
 * Build Step - Step 2
 * Combines ToolLibrary (left) + StackCanvas (right) with template defaults
 */

'use client';

import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import type { IndustryTemplate, PlacedTool, ToolConnection, ConnectionType } from '@/types/stack-diagnostic';
import { layoutToolsGrid } from '@/lib/stack-diagnostic';
import { ToolLibrary } from './ToolLibrary';
import { StackCanvas } from './StackCanvas';

interface BuildStepProps {
  template: IndustryTemplate;
  placedTools: PlacedTool[];
  connections: ToolConnection[];
  onToolsChange: (tools: PlacedTool[]) => void;
  onConnectionsChange: (connections: ToolConnection[]) => void;
  onAnalyze: () => void;
  onBack: () => void;
}

export const BuildStep: React.FC<BuildStepProps> = ({
  template,
  placedTools,
  connections,
  onToolsChange,
  onConnectionsChange,
  onAnalyze,
  onBack,
}) => {
  const initialized = useRef(false);

  // Auto-populate template defaults on first mount
  useEffect(() => {
    if (initialized.current || placedTools.length > 0) return;
    initialized.current = true;

    if (template.defaultTools.length === 0) return;

    // Layout tools in a grid
    const laid = layoutToolsGrid(template.defaultTools);
    onToolsChange(laid);

    // Create connections matching template defaults
    const newConnections: ToolConnection[] = [];
    for (const dc of template.defaultConnections) {
      const source = laid.find(pt => pt.toolId === dc.sourceToolId);
      const target = laid.find(pt => pt.toolId === dc.targetToolId);
      if (source && target) {
        newConnections.push({
          id: `edge-${source.id}-${target.id}`,
          sourceToolId: source.id,
          targetToolId: target.id,
          connectionType: dc.connectionType,
        });
      }
    }
    onConnectionsChange(newConnections);
  }, [template]);

  // Set of tool IDs that are already placed
  const placedToolIds = useMemo(
    () => new Set(placedTools.map(pt => pt.toolId)),
    [placedTools]
  );

  // Add a tool to the canvas
  const handleAddTool = useCallback((toolId: string) => {
    const col = placedTools.length % 4;
    const row = Math.floor(placedTools.length / 4);
    const newTool: PlacedTool = {
      id: `node-${toolId}-${Date.now()}`,
      toolId,
      position: {
        x: 80 + col * 200,
        y: 80 + row * 120,
      },
    };
    onToolsChange([...placedTools, newTool]);
  }, [placedTools, onToolsChange]);

  // Remove a tool from the canvas
  const handleRemoveTool = useCallback((nodeId: string) => {
    onToolsChange(placedTools.filter(t => t.id !== nodeId));
    // Also remove connections involving this node
    onConnectionsChange(
      connections.filter(c => c.sourceToolId !== nodeId && c.targetToolId !== nodeId)
    );
  }, [placedTools, connections, onToolsChange, onConnectionsChange]);

  return (
    <div className="flex h-full">
      {/* Left: Tool Library */}
      <div className="w-64 md:w-72 flex-shrink-0">
        <ToolLibrary onAddTool={handleAddTool} placedToolIds={placedToolIds} />
      </div>

      {/* Right: Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top action bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-depth-surface border-b border-depth-border">
          <button
            onClick={onBack}
            className="text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            ← Back to Templates
          </button>

          <div className="flex items-center gap-3">
            {/* Connection type legend (inline) */}
            <div className="hidden md:flex items-center gap-3 text-[10px] text-text-muted mr-2">
              <div className="flex items-center gap-1">
                <div className="w-4 h-0.5 bg-green-500" />
                <span>Native</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-0.5 bg-amber-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #F59E0B 0, #F59E0B 3px, transparent 3px, transparent 6px)' }} />
                <span>Zapier</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-0.5 bg-red-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #EF4444 0, #EF4444 2px, transparent 2px, transparent 5px)' }} />
                <span>Manual</span>
              </div>
              <span className="text-text-muted/50">|</span>
              <span>Click edge to cycle</span>
            </div>

            <span className="text-xs text-text-muted">
              {placedTools.length} tools · {connections.length} connections
            </span>
            <button
              onClick={onAnalyze}
              disabled={placedTools.length < 2}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-radiance-gold text-depth-base hover:bg-radiance-amber shadow-illumination hover:shadow-illumination-intense"
            >
              Analyze Stack →
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <StackCanvas
            placedTools={placedTools}
            connections={connections}
            onToolsChange={onToolsChange}
            onConnectionsChange={onConnectionsChange}
            onRemoveTool={handleRemoveTool}
          />
        </div>
      </div>
    </div>
  );
};
