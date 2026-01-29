'use client';

import React, { useState, useMemo } from 'react';
import type { PlanningBrand, PlanningDoc } from '@/types/planning';
import { FileTree } from './FileTree';

// Status badge colors
const statusColors: Record<string, string> = {
  active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  paused: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  concept: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'handed-off': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

interface DocumentsSidebarProps {
  brands: PlanningBrand[];
  selectedBrandSlug: string | null;
  selectedDocId: string | null;
  onSelectBrand: (slug: string) => void;
  onSelectDoc: (doc: PlanningDoc) => void;
}

export function DocumentsSidebar({
  brands,
  selectedBrandSlug,
  selectedDocId,
  onSelectBrand,
  onSelectDoc,
}: DocumentsSidebarProps) {
  const [search, setSearch] = useState('');
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set());
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const filteredBrands = useMemo(() => {
    if (!search.trim()) return brands;
    const q = search.toLowerCase();
    return brands.filter(b =>
      b.brandName.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [brands, search]);

  const toggleBrand = (slug: string) => {
    setExpandedBrands(prev => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
    onSelectBrand(slug);
  };

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  return (
    <div className="h-full flex flex-col bg-depth-surface border-r border-depth-border">
      {/* Search */}
      <div className="p-3 border-b border-depth-border">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search brands..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-depth-base border border-depth-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-radiance-gold/50 focus:ring-1 focus:ring-radiance-gold/20 transition-colors"
          />
        </div>
      </div>

      {/* Brand list */}
      <div className="flex-1 overflow-y-auto">
        {filteredBrands.length === 0 ? (
          <div className="p-6 text-center text-text-muted text-sm">
            No brands found
          </div>
        ) : (
          <div className="py-1">
            {filteredBrands.map(brand => {
              const isExpanded = expandedBrands.has(brand.slug);
              const isSelected = selectedBrandSlug === brand.slug;
              const colorClass = statusColors[brand.status] || statusColors.concept;

              return (
                <div key={brand.slug}>
                  <button
                    onClick={() => toggleBrand(brand.slug)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? 'bg-radiance-gold/5 border-l-2 border-l-radiance-gold'
                        : 'hover:bg-depth-elevated/50 border-l-2 border-l-transparent'
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 text-text-muted transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium truncate ${isSelected ? 'text-radiance-gold' : 'text-text-primary'}`}>
                          {brand.brandName}
                        </span>
                        <span className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded border flex-shrink-0 ${colorClass}`}>
                          {brand.status}
                        </span>
                      </div>
                      <span className="text-xs text-text-muted">{brand.docCount} docs</span>
                    </div>
                  </button>

                  {/* Expanded file tree */}
                  {isExpanded && (
                    <div className="px-3 pb-2">
                      <FileTree
                        nodes={brand.tree}
                        docs={brand.docs}
                        selectedDocId={selectedDocId}
                        onSelectDoc={onSelectDoc}
                        expandedFolders={expandedFolders}
                        onToggleFolder={toggleFolder}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
