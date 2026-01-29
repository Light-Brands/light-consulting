'use client';

import React, { useState, useCallback } from 'react';
import type { PlanningBrand, PlanningDoc } from '@/types/planning';
import { DocumentsSidebar } from './DocumentsSidebar';
import { MarkdownViewer } from './MarkdownViewer';

interface DocumentsTabProps {
  brands: PlanningBrand[];
}

export function DocumentsTab({ brands }: DocumentsTabProps) {
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<PlanningDoc | null>(null);

  const handleSelectBrand = useCallback((slug: string) => {
    setSelectedBrandSlug(slug);
  }, []);

  const handleSelectDoc = useCallback((doc: PlanningDoc) => {
    setSelectedDoc(doc);
    // Also ensure the brand is selected
    const brand = brands.find(b => b.docs.some(d => d.id === doc.id));
    if (brand) {
      setSelectedBrandSlug(brand.slug);
    }
  }, [brands]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-220px)] bg-depth-surface border border-depth-border rounded-xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 overflow-hidden border-b lg:border-b-0">
        <DocumentsSidebar
          brands={brands}
          selectedBrandSlug={selectedBrandSlug}
          selectedDocId={selectedDoc?.id ?? null}
          onSelectBrand={handleSelectBrand}
          onSelectDoc={handleSelectDoc}
        />
      </div>

      {/* Viewer */}
      <div className="flex-1 overflow-hidden">
        {selectedDoc ? (
          <MarkdownViewer doc={selectedDoc} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-text-muted/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-text-muted text-sm">Select a document to view</p>
              <p className="text-text-muted/60 text-xs mt-1">Browse brands in the sidebar and click a file</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
