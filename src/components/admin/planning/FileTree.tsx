'use client';

import React from 'react';
import type { PlanningDocFolder, PlanningDoc } from '@/types/planning';

interface FileTreeProps {
  nodes: PlanningDocFolder[];
  docs: PlanningDoc[];
  selectedDocId: string | null;
  onSelectDoc: (doc: PlanningDoc) => void;
  depth?: number;
  expandedFolders: Set<string>;
  onToggleFolder: (path: string) => void;
}

export function FileTree({
  nodes,
  docs,
  selectedDocId,
  onSelectDoc,
  depth = 0,
  expandedFolders,
  onToggleFolder,
}: FileTreeProps) {
  return (
    <div className={depth > 0 ? 'ml-3 border-l border-depth-border/50 pl-2' : ''}>
      {nodes.map((node) => {
        if (node.type === 'folder') {
          const isExpanded = expandedFolders.has(node.path);
          return (
            <div key={node.path}>
              <button
                onClick={() => onToggleFolder(node.path)}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-depth-elevated/50 rounded-md transition-colors group"
              >
                <svg
                  className={`w-3.5 h-3.5 text-text-muted transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {isExpanded ? (
                  <svg className="w-4 h-4 text-radiance-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-radiance-gold/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                )}
                <span className="text-text-secondary group-hover:text-text-primary truncate">
                  {node.name.replace(/-/g, ' ')}
                </span>
              </button>
              {isExpanded && node.children && (
                <FileTree
                  nodes={node.children}
                  docs={docs}
                  selectedDocId={selectedDocId}
                  onSelectDoc={onSelectDoc}
                  depth={depth + 1}
                  expandedFolders={expandedFolders}
                  onToggleFolder={onToggleFolder}
                />
              )}
            </div>
          );
        }

        // File node — find matching doc
        const doc = docs.find(d => d.relativePath === node.path);
        if (!doc) return null;

        const isSelected = selectedDocId === doc.id;

        return (
          <button
            key={node.path}
            onClick={() => onSelectDoc(doc)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors group ${
              isSelected
                ? 'bg-radiance-gold/10 text-radiance-gold'
                : 'hover:bg-depth-elevated/50 text-text-secondary hover:text-text-primary'
            }`}
          >
            <svg className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-radiance-gold' : 'text-blue-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="truncate text-left">{doc.title || node.name.replace(/\.md$/, '')}</span>
          </button>
        );
      })}
    </div>
  );
}
