/**
 * Mermaid Diagram Component
 * Light Brand Consulting
 *
 * Renders Mermaid diagrams with dark theme styling
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

// Initialize mermaid with dark theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#E8B84A',
    primaryTextColor: '#FAFAFA',
    primaryBorderColor: '#E8B84A',
    lineColor: '#6B7280',
    secondaryColor: '#1F2937',
    tertiaryColor: '#111827',
    background: 'transparent',
    mainBkg: 'transparent',
    nodeBorder: '#E8B84A',
    clusterBkg: 'rgba(255,255,255,0.03)',
    clusterBorder: 'rgba(255,255,255,0.15)',
    titleColor: '#9CA3AF',
    edgeLabelBackground: 'transparent',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
  },
});

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current) return;

      try {
        // Generate unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
        setError(null);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError('Failed to render diagram');
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className={`p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 ${className}`}>
        {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-container ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
