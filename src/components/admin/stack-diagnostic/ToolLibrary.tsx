/**
 * Tool Library - Left sidebar with searchable, categorized tool list
 */

'use client';

import React, { useState, useMemo } from 'react';
import { toolLibrary, categoryLabels, categoryColors, getCategories } from '@/lib/stack-diagnostic';
import type { DiagnosticTool, ToolCategory } from '@/types/stack-diagnostic';

interface ToolLibraryProps {
  onAddTool: (toolId: string) => void;
  placedToolIds: Set<string>;
}

export const ToolLibrary: React.FC<ToolLibraryProps> = ({ onAddTool, placedToolIds }) => {
  const [search, setSearch] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  const categories = getCategories();

  const filteredTools = useMemo(() => {
    if (!search.trim()) return toolLibrary;
    const q = search.toLowerCase();
    return toolLibrary.filter(
      (t) => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  }, [search]);

  const groupedTools = useMemo(() => {
    const groups: Record<string, DiagnosticTool[]> = {};
    for (const tool of filteredTools) {
      if (!groups[tool.category]) groups[tool.category] = [];
      groups[tool.category].push(tool);
    }
    return groups;
  }, [filteredTools]);

  const toggleCategory = (cat: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full bg-depth-surface border-r border-depth-border">
      {/* Header */}
      <div className="p-3 border-b border-depth-border">
        <h3 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-2">
          Tool Library
        </h3>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="w-full bg-depth-elevated border border-depth-border rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-radiance-gold/50"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Tool list */}
      <div className="flex-1 overflow-y-auto p-2">
        {categories.map((category) => {
          const tools = groupedTools[category];
          if (!tools || tools.length === 0) return null;

          const colors = categoryColors[category];
          const isCollapsed = collapsedCategories.has(category);

          return (
            <div key={category} className="mb-1">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded text-xs font-medium hover:bg-depth-elevated transition-colors"
                style={{ color: colors.node }}
              >
                <span>{categoryLabels[category]}</span>
                <span className="text-text-muted text-[10px]">
                  {isCollapsed ? '▸' : '▾'} {tools.length}
                </span>
              </button>

              {!isCollapsed && (
                <div className="space-y-0.5 ml-1">
                  {tools.map((tool) => {
                    const isPlaced = placedToolIds.has(tool.id);
                    return (
                      <div
                        key={tool.id}
                        className={`flex items-center justify-between px-2 py-1.5 rounded text-sm group ${
                          isPlaced
                            ? 'opacity-40 cursor-default'
                            : 'hover:bg-depth-elevated cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm flex-shrink-0">{tool.icon}</span>
                          <span className="text-text-secondary truncate text-xs">
                            {tool.name}
                          </span>
                        </div>
                        {!isPlaced && (
                          <button
                            onClick={() => onAddTool(tool.id)}
                            className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-radiance-gold/20 text-radiance-gold"
                          >
                            +
                          </button>
                        )}
                        {isPlaced && (
                          <span className="text-[9px] text-text-muted flex-shrink-0">added</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
