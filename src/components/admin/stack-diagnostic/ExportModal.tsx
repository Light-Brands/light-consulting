/**
 * Export Modal - PDF export with options
 */

'use client';

import React, { useState } from 'react';
import type { AnalysisResult, PlacedTool, ToolConnection, IndustryTemplate } from '@/types/stack-diagnostic';
import { generatePDF } from '@/lib/stack-diagnostic/pdf-generator';

interface ExportModalProps {
  analysis: AnalysisResult;
  template: IndustryTemplate;
  placedTools: PlacedTool[];
  connections: ToolConnection[];
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  analysis,
  template,
  placedTools,
  connections,
  onClose,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [includeStack, setIncludeStack] = useState(true);
  const [includeAnalysis, setIncludeAnalysis] = useState(true);
  const [includeSolution, setIncludeSolution] = useState(true);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await generatePDF({
        analysis,
        template,
        placedTools,
        connections,
        sections: {
          stack: includeStack,
          analysis: includeAnalysis,
          solution: includeSolution,
        },
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-depth-surface border border-depth-border rounded-xl p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-text-primary mb-1">Export Report</h3>
        <p className="text-xs text-text-muted mb-4">
          Generate a PDF report of the diagnostic results.
        </p>

        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={includeStack}
              onChange={(e) => setIncludeStack(e.target.checked)}
              className="w-4 h-4 rounded border-depth-border bg-depth-elevated text-radiance-gold focus:ring-radiance-gold/50"
            />
            <div>
              <span className="text-sm text-text-primary group-hover:text-radiance-gold transition-colors">
                Current Stack
              </span>
              <p className="text-[10px] text-text-muted">Screenshot of tools and connections</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={includeAnalysis}
              onChange={(e) => setIncludeAnalysis(e.target.checked)}
              className="w-4 h-4 rounded border-depth-border bg-depth-elevated text-radiance-gold focus:ring-radiance-gold/50"
            />
            <div>
              <span className="text-sm text-text-primary group-hover:text-radiance-gold transition-colors">
                Analysis Results
              </span>
              <p className="text-[10px] text-text-muted">Health score, stats, and issues</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={includeSolution}
              onChange={(e) => setIncludeSolution(e.target.checked)}
              className="w-4 h-4 rounded border-depth-border bg-depth-elevated text-radiance-gold focus:ring-radiance-gold/50"
            />
            <div>
              <span className="text-sm text-text-primary group-hover:text-radiance-gold transition-colors">
                Integrated Solution
              </span>
              <p className="text-[10px] text-text-muted">Recommended platform and modules</p>
            </div>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-sm text-text-muted hover:text-text-secondary px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || (!includeStack && !includeAnalysis && !includeSolution)}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-radiance-gold text-depth-base hover:bg-radiance-amber disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isExporting ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>
    </div>
  );
};
