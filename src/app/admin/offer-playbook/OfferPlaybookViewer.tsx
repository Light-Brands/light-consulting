/**
 * Offer Playbook Markdown Viewer
 * Client component for rendering the Grand Slam Offer markdown
 */

'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SECTIONS = [
  { id: 'full', label: 'Full Playbook' },
  { id: 'positioning', label: 'Positioning' },
  { id: 'objections', label: 'Objections' },
  { id: 'conversation', label: 'Sales Flow' },
  { id: 'pricing', label: 'Pricing' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

// Section markers in the markdown (Part headings)
const SECTION_MARKERS: Record<Exclude<SectionId, 'full'>, { start: string; end?: string }> = {
  positioning: { start: '## Part 3: Positioning Framework', end: '## Part 4:' },
  objections: { start: '## Part 6: Objection Handling', end: '## Part 7:' },
  conversation: { start: '## Part 7: Sales Conversation Framework', end: '## Part 8:' },
  pricing: { start: '## Part 9: Pricing & Terms', end: '## Part 10:' },
};

function extractSection(content: string, sectionId: SectionId): string {
  if (sectionId === 'full') return content;

  const marker = SECTION_MARKERS[sectionId];
  const startIdx = content.indexOf(marker.start);
  if (startIdx === -1) return content;

  const endIdx = marker.end ? content.indexOf(marker.end, startIdx + 1) : -1;
  return endIdx === -1
    ? content.slice(startIdx)
    : content.slice(startIdx, endIdx);
}

interface OfferPlaybookViewerProps {
  content: string;
}

export function OfferPlaybookViewer({ content }: OfferPlaybookViewerProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('full');
  const displayContent = extractSection(content, activeSection);

  return (
    <div>
      {/* Section filter tabs */}
      <div className="flex flex-wrap gap-1 p-1 bg-depth-surface border border-depth-border rounded-xl mb-6 w-fit">
        {SECTIONS.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSection === section.id
                ? 'bg-radiance-gold/10 text-radiance-gold border border-radiance-gold/20'
                : 'text-text-secondary hover:text-text-primary hover:bg-depth-elevated'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Document card */}
      <div className="bg-depth-surface border border-depth-border rounded-xl overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-depth-border bg-depth-elevated/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-radiance-gold/10 border border-radiance-gold/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary text-lg">Grand Slam Offer Playbook</h3>
              <p className="text-text-muted text-sm mt-0.5 font-mono">docs/GRAND-SLAM-OFFER-POSITIONING.md</p>
            </div>
          </div>
          <span className="text-xs font-mono text-text-muted bg-depth-elevated px-2.5 py-1 rounded-md border border-depth-border">
            MASTER DOC
          </span>
        </div>

        {/* Markdown content */}
        <div className="p-6 md:p-10">
          <article className="prose prose-invert prose-lg max-w-none
            prose-headings:text-text-primary prose-headings:font-semibold
            prose-h1:text-2xl prose-h1:border-b prose-h1:border-depth-border prose-h1:pb-3 prose-h1:mb-6
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-text-secondary prose-p:leading-relaxed
            prose-li:text-text-secondary prose-li:my-1
            prose-strong:text-text-primary prose-strong:font-semibold
            prose-code:text-radiance-gold prose-code:bg-depth-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-depth-elevated prose-pre:border prose-pre:border-depth-border
            prose-blockquote:border-l-radiance-gold prose-blockquote:text-text-muted prose-blockquote:italic
            prose-a:text-radiance-gold prose-a:no-underline hover:prose-a:underline
            prose-hr:border-depth-border
            prose-table:border-collapse
            prose-th:bg-depth-elevated prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:border prose-th:border-depth-border
            prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-depth-border
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {displayContent}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
