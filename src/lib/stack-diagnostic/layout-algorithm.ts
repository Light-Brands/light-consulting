/**
 * Layout Algorithm for Stack Diagnostic Canvas
 * Auto-positions tools in initial layout and hub-satellite transform
 */

import type { PlacedTool } from '@/types/stack-diagnostic';
import type { Satellite } from '@/types/stack-diagnostic';
import { getToolById, categoryColors } from './tools';
import type { ToolCategory } from '@/types/stack-diagnostic';

const NODE_WIDTH = 160;
const NODE_HEIGHT = 80;
const H_GAP = 40;
const V_GAP = 40;

/**
 * Auto-layout tools in a grid grouped by category
 */
export function layoutToolsGrid(toolIds: string[], canvasWidth = 1200): PlacedTool[] {
  if (toolIds.length === 0) return [];

  // Group by category
  const groups: Record<string, string[]> = {};
  for (const toolId of toolIds) {
    const tool = getToolById(toolId);
    if (!tool) continue;
    if (!groups[tool.category]) groups[tool.category] = [];
    groups[tool.category].push(toolId);
  }

  const placedTools: PlacedTool[] = [];
  const cols = Math.max(2, Math.floor(canvasWidth / (NODE_WIDTH + H_GAP)));
  let globalIndex = 0;

  for (const categoryTools of Object.values(groups)) {
    for (const toolId of categoryTools) {
      const col = globalIndex % cols;
      const row = Math.floor(globalIndex / cols);
      placedTools.push({
        id: `node-${toolId}-${Date.now()}-${globalIndex}`,
        toolId,
        position: {
          x: 80 + col * (NODE_WIDTH + H_GAP),
          y: 80 + row * (NODE_HEIGHT + V_GAP),
        },
      });
      globalIndex++;
    }
  }

  return placedTools;
}

/**
 * Calculate hub-and-satellite layout for the transform view
 * Returns positions for the hub (center) and satellites (around it)
 */
export function layoutHubSatellite(
  satelliteCount: number,
  centerX = 600,
  centerY = 400,
  radius = 280
): { hub: { x: number; y: number }; satellites: { x: number; y: number }[] } {
  const hub = { x: centerX - 80, y: centerY - 50 };
  const satellites: { x: number; y: number }[] = [];

  const angleStep = (2 * Math.PI) / satelliteCount;
  const startAngle = -Math.PI / 2; // start from top

  for (let i = 0; i < satelliteCount; i++) {
    const angle = startAngle + i * angleStep;
    satellites.push({
      x: centerX + Math.cos(angle) * radius - 70,
      y: centerY + Math.sin(angle) * radius - 40,
    });
  }

  return { hub, satellites };
}

/**
 * Get the color for a category
 */
export function getCategoryColor(category: ToolCategory): string {
  return categoryColors[category]?.node || '#9CA3AF';
}
