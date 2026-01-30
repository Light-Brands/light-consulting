/**
 * Stack Canvas - ReactFlow canvas for the diagnostic tool
 */

'use client';

import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from '@xyflow/react';
import type {
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
  OnNodesChange,
  OnEdgesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import type { PlacedTool, ToolConnection, ConnectionType } from '@/types/stack-diagnostic';
import { getToolById, categoryColors } from '@/lib/stack-diagnostic';
import { ToolNode } from './ToolNode';
import type { ToolNodeData } from './ToolNode';
import { ConnectionEdge } from './ConnectionEdge';

interface StackCanvasProps {
  placedTools: PlacedTool[];
  connections: ToolConnection[];
  onToolsChange: (tools: PlacedTool[]) => void;
  onConnectionsChange: (connections: ToolConnection[]) => void;
  onRemoveTool: (nodeId: string) => void;
  dimmedNodes?: Set<string>;
  highlightedNodes?: Set<string>;
  warningNodes?: Set<string>;
  flickeringEdges?: boolean;
  readOnly?: boolean;
}

const nodeTypes = { tool: ToolNode };
const edgeTypes = { connection: ConnectionEdge };

export const StackCanvas: React.FC<StackCanvasProps> = ({
  placedTools,
  connections,
  onToolsChange,
  onConnectionsChange,
  onRemoveTool,
  dimmedNodes,
  highlightedNodes,
  warningNodes,
  flickeringEdges,
  readOnly = false,
}) => {
  // Convert PlacedTools to ReactFlow nodes
  const nodes: Node<ToolNodeData>[] = useMemo(() => {
    return placedTools.map((pt) => {
      const tool = getToolById(pt.toolId);
      return {
        id: pt.id,
        type: 'tool',
        position: pt.position,
        data: {
          label: tool?.name || pt.toolId,
          icon: tool?.icon || '🔧',
          category: tool?.category || 'automation',
          toolId: pt.toolId,
          onRemove: readOnly ? undefined : onRemoveTool,
          dimmed: dimmedNodes?.has(pt.id),
          highlighted: highlightedNodes?.has(pt.id),
          warning: warningNodes?.has(pt.id),
        },
        draggable: !readOnly,
      };
    });
  }, [placedTools, onRemoveTool, dimmedNodes, highlightedNodes, warningNodes, readOnly]);

  // Convert ToolConnections to ReactFlow edges
  const edges: Edge[] = useMemo(() => {
    return connections.map((conn) => ({
      id: conn.id,
      source: conn.sourceToolId,
      target: conn.targetToolId,
      type: 'connection',
      data: {
        connectionType: conn.connectionType,
        dimmed: flickeringEdges,
        flickering: flickeringEdges,
      },
    }));
  }, [connections, flickeringEdges]);

  // Handle node position changes
  const handleNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    if (readOnly) return;

    const updated = [...placedTools];
    for (const change of changes) {
      if (change.type === 'position' && change.position) {
        const idx = updated.findIndex(t => t.id === change.id);
        if (idx !== -1) {
          updated[idx] = { ...updated[idx], position: change.position };
        }
      }
    }
    onToolsChange(updated);
  }, [placedTools, onToolsChange, readOnly]);

  // Handle new connections
  const handleConnect = useCallback((connection: Connection) => {
    if (readOnly || !connection.source || !connection.target) return;

    const newConn: ToolConnection = {
      id: `edge-${connection.source}-${connection.target}-${Date.now()}`,
      sourceToolId: connection.source,
      targetToolId: connection.target,
      connectionType: 'manual',
    };
    onConnectionsChange([...connections, newConn]);
  }, [connections, onConnectionsChange, readOnly]);

  // Handle edge removal
  const handleEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
    if (readOnly) return;

    const removedIds = new Set(
      changes.filter(c => c.type === 'remove').map(c => c.id)
    );
    if (removedIds.size > 0) {
      onConnectionsChange(connections.filter(c => !removedIds.has(c.id)));
    }
  }, [connections, onConnectionsChange, readOnly]);

  // Handle edge click to cycle connection type
  const handleEdgeClick = useCallback((_event: React.MouseEvent, edge: Edge) => {
    if (readOnly) return;

    const typeOrder: ConnectionType[] = ['native', 'zapier', 'manual', 'broken'];
    const currentConn = connections.find(c => c.id === edge.id);
    if (!currentConn) return;

    const currentIdx = typeOrder.indexOf(currentConn.connectionType);
    const nextIdx = (currentIdx + 1) % typeOrder.length;

    onConnectionsChange(
      connections.map(c =>
        c.id === edge.id ? { ...c, connectionType: typeOrder[nextIdx] } : c
      )
    );
  }, [connections, onConnectionsChange, readOnly]);

  return (
    <div className="w-full h-full" style={{ minHeight: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onEdgeClick={handleEdgeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        deleteKeyCode="Delete"
        className="bg-depth-base"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#ffffff08" />
        <Controls className="!bg-depth-surface !border-depth-border !rounded-lg [&_button]:!bg-depth-elevated [&_button]:!border-depth-border [&_button]:!text-text-secondary [&_button:hover]:!bg-depth-surface" />
        <MiniMap
          className="!bg-depth-surface !border-depth-border !rounded-lg"
          nodeColor={(node) => {
            const data = node.data as ToolNodeData;
            return categoryColors[data.category]?.node || '#9CA3AF';
          }}
          maskColor="rgba(0, 0, 0, 0.5)"
        />
      </ReactFlow>
    </div>
  );
};
