/**
 * Diagnostic Deliverables Visual
 * Clean, elegant showcase of what users receive
 */

import React, { useState, useRef, useEffect } from 'react';

interface Deliverable {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  details: {
    label: string;
    value: string;
  }[];
}

const DELIVERABLES: Deliverable[] = [
  {
    id: 'readiness',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Your AI Readiness Level',
    description: 'A clear view of how prepared your business actually is.',
    tag: 'READINESS_INDEX',
    details: [
      { label: 'Maturity Stage', value: 'Identified' },
      { label: 'Capability Score', value: 'Measured' },
      { label: 'Gap Analysis', value: 'Mapped' }
    ]
  },
  {
    id: 'leverage',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'A Leverage Snapshot',
    description: 'Where effort is leaking, and where structure would compound results.',
    tag: 'LEVERAGE_MAP',
    details: [
      { label: 'Bottlenecks', value: 'Identified' },
      { label: 'Quick Wins', value: 'Prioritized' },
      { label: 'Multipliers', value: 'Highlighted' }
    ]
  },
  {
    id: 'action',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Your Next Strategic Move',
    description: 'What matters now, and what can safely be ignored.',
    tag: 'ACTION_PLAN',
    details: [
      { label: 'Priorities', value: 'Ranked' },
      { label: 'Avoid List', value: 'Defined' },
      { label: 'Sequence', value: 'Outlined' }
    ]
  }
];

export const DiagnosticDeliverablesVisual: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full py-12 px-4 md:px-8 select-none transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className={`w-2 h-2 rounded-full ${expandedId ? 'bg-radiance-gold animate-pulse' : 'bg-text-muted'}`} />
            <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
              Diagnostic_Deliverables::Report_Components
            </span>
          </div>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DELIVERABLES.map((deliverable, idx) => {
            const isExpanded = expandedId === deliverable.id;
            
            return (
              <div
                key={deliverable.id}
                className={`relative transition-all duration-500 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Card */}
                <div 
                  className={`relative rounded-2xl border backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-500 ${
                    isExpanded
                      ? 'bg-radiance-gold/10 border-radiance-gold/30 shadow-[0_0_40px_rgba(232,184,74,0.2)]'
                      : 'bg-depth-surface/50 border-depth-border hover:border-text-muted/30 hover:bg-depth-surface/70'
                  }`}
                  onClick={() => handleToggle(deliverable.id)}
                >
                  {/* Radial glow on expanded */}
                  {isExpanded && (
                    <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/10 to-transparent opacity-50" />
                  )}

                  <div className="relative z-10 p-6">
                    {/* Icon */}
                    <div className={`mb-4 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isExpanded
                        ? 'bg-radiance-gold/20 text-radiance-gold shadow-[0_0_25px_rgba(232,184,74,0.4)] scale-110'
                        : 'bg-depth-border text-text-muted'
                    }`}>
                      {deliverable.icon}
                      
                      {isExpanded && (
                        <div className="absolute inset-0 rounded-xl border-2 border-radiance-gold/40 animate-ping" />
                      )}
                    </div>

                    {/* Tag */}
                    <div className={`text-[8px] font-mono mb-2 uppercase tracking-[0.3em] transition-colors duration-300 ${
                      isExpanded ? 'text-radiance-gold' : 'text-text-muted'
                    }`}>
                      {deliverable.tag}
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                      isExpanded ? 'text-radiance-gold' : 'text-text-primary'
                    }`}>
                      {deliverable.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-text-muted leading-relaxed mb-4">
                      {deliverable.description}
                    </p>

                    {/* Expandable Details */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      isExpanded ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-4 border-t border-depth-border/50 space-y-3">
                        {deliverable.details.map((detail, detailIdx) => (
                          <div 
                            key={detailIdx}
                            className="flex items-center justify-between p-2 rounded-lg bg-depth-elevated/30"
                            style={{
                              animation: isExpanded ? `fadeInUp 0.4s ease-out ${detailIdx * 100}ms forwards` : 'none',
                              opacity: isExpanded ? 0 : 0
                            }}
                          >
                            <span className="text-xs text-text-muted font-mono uppercase tracking-wider">
                              {detail.label}
                            </span>
                            <span className="text-xs text-radiance-gold font-semibold">
                              {detail.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expand Indicator */}
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-depth-border/30">
                      <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider">
                        {isExpanded ? 'Tap to collapse' : 'Tap to expand'}
                      </span>
                      <svg 
                        className={`w-4 h-4 text-text-muted transition-transform duration-500 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
            <svg className="w-5 h-5 text-radiance-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-text-secondary">
              <span className="font-medium text-text-primary">Delivered within 24-48 hours</span> as a clear, actionable report
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-depth-border/30 text-center">
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.4em] flex items-center justify-center gap-3">
            <span className="opacity-40">//</span>
            <span>If deeper system work makes sense, we'll tell you</span>
            <span className="opacity-40">//</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
};

export default DiagnosticDeliverablesVisual;
