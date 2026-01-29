'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { PlanningDoc } from '@/types/planning';

// Mermaid diagram renderer
function MermaidBlock({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const id = useId().replace(/:/g, '_');

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            // Background
            background: '#1A1714',
            // Node styling
            primaryColor: '#2D2A25',
            primaryTextColor: '#F5F0EA',
            primaryBorderColor: '#E8B84A',
            secondaryColor: '#33302B',
            secondaryTextColor: '#F5F0EA',
            secondaryBorderColor: '#9A8C7A',
            tertiaryColor: '#3A3630',
            tertiaryTextColor: '#F5F0EA',
            tertiaryBorderColor: '#7A7068',
            // Lines and edges
            lineColor: '#9A8C7A',
            // Text
            textColor: '#F5F0EA',
            titleColor: '#E8B84A',
            // Flowchart specifics
            nodeBorder: '#E8B84A',
            mainBkg: '#2D2A25',
            nodeTextColor: '#F5F0EA',
            // Clusters
            clusterBkg: '#232019',
            clusterBorder: '#E8B84A50',
            // Edge labels
            edgeLabelBackground: '#2D2A25',
            // Notes
            noteBkgColor: '#2D2A25',
            noteTextColor: '#F5F0EA',
            noteBorderColor: '#E8B84A',
            // Misc
            actorTextColor: '#F5F0EA',
            actorBkg: '#2D2A25',
            actorBorder: '#E8B84A',
            labelColor: '#F5F0EA',
            errorBkgColor: '#4A2020',
            errorTextColor: '#F5F0EA',
          },
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        });

        const { svg: rendered } = await mermaid.render(`mermaid-${id}`, code);
        if (!cancelled) setSvg(rendered);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to render diagram');
      }
    }

    render();
    return () => { cancelled = true; };
  }, [code, id]);

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 my-4">
        <p className="text-red-400 text-sm font-medium mb-2">Mermaid diagram error</p>
        <pre className="text-red-300/70 text-xs overflow-auto">{error}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center py-8 my-4 bg-depth-elevated border border-depth-border rounded-lg">
        <div className="w-5 h-5 border-2 border-radiance-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-4 p-4 bg-depth-elevated border border-depth-border rounded-lg overflow-x-auto [&_svg]:mx-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

interface MarkdownViewerProps {
  doc: PlanningDoc;
}

export function MarkdownViewer({ doc }: MarkdownViewerProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-depth-border bg-depth-elevated/50">
        <div>
          <h3 className="font-semibold text-text-primary text-lg">{doc.title}</h3>
          <p className="text-text-muted text-sm mt-0.5 font-mono">{doc.relativePath}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                if (match && match[1] === 'mermaid') {
                  return <MermaidBlock code={String(children).trim()} />;
                }
                return <code className={className} {...props}>{children}</code>;
              },
              pre({ children }) {
                // If the child is a mermaid block, don't wrap in <pre>
                const child = React.Children.toArray(children)[0];
                if (React.isValidElement(child) && child.type === MermaidBlock) {
                  return <>{children}</>;
                }
                return <pre>{children}</pre>;
              },
            }}
          >
            {doc.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
