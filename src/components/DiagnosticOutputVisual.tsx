/**
 * Interactive Diagnostic Output Preview
 * Shows what users will receive after completing the diagnostic
 */

import React, { useState, useRef, useEffect } from 'react';

interface Output {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  preview: string[];
}

const OUTPUTS: Output[] = [
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
    preview: [
      'Current maturity stage',
      'Capability assessment',
      'Readiness score breakdown'
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
    preview: [
      'High-friction bottlenecks',
      'Quick-win opportunities',
      'Compounding multipliers'
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
    preview: [
      'Priority recommendations',
      'What to avoid building',
      'Strategic sequencing'
    ]
  }
];

export const DiagnosticOutputVisual: React.FC = () => {
  const [activeOutput, setActiveOutput] = useState<string | null>(null);
  const [hoveredOutput, setHoveredOutput] = useState<string | null>(null);
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

  // Prefer hover over click, but click persists
  const displayOutput = hoveredOutput ?? activeOutput;
  const currentOutput = OUTPUTS.find(o => o.id === displayOutput);
  
  const handleClick = (id: string) => {
    setActiveOutput(activeOutput === id ? null : id);
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
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${displayOutput ? 'bg-radiance-gold animate-pulse' : 'bg-text-muted'}`} />
            <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
              Diagnostic_Output::Report_Preview
            </span>
          </div>
          {displayOutput && (
            <span className="text-[9px] font-mono text-radiance-gold uppercase tracking-wider px-2 py-1 rounded bg-radiance-gold/10 border border-radiance-gold/30">
              PREVIEWING
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Output Cards */}
          <div className="lg:col-span-5 space-y-4">
            {OUTPUTS.map((output, idx) => {
              const isActive = displayOutput === output.id;
              
              return (
                <div
                  key={output.id}
                  className={`relative transition-all duration-500 cursor-pointer ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                  onMouseEnter={() => setHoveredOutput(output.id)}
                  onMouseLeave={() => setHoveredOutput(null)}
                  onClick={() => handleClick(output.id)}
                >
                  <div className={`p-5 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
                    isActive
                      ? 'bg-radiance-gold/10 border-radiance-gold/30 shadow-[0_0_30px_rgba(232,184,74,0.15)] scale-[1.02]'
                      : 'bg-depth-surface/50 border-depth-border hover:border-text-muted/30'
                  }`}>
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isActive
                          ? 'bg-radiance-gold/20 text-radiance-gold shadow-[0_0_20px_rgba(232,184,74,0.3)]'
                          : 'bg-depth-border text-text-muted'
                      }`}>
                        {output.icon}
                        
                        {isActive && (
                          <div className="absolute inset-0 rounded-full border-2 border-radiance-gold/40 animate-ping" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className={`text-[8px] font-mono mb-1.5 uppercase tracking-[0.2em] transition-colors duration-300 ${
                          isActive ? 'text-radiance-gold' : 'text-text-muted'
                        }`}>
                          {output.tag}
                        </div>
                        <h3 className={`text-base font-bold mb-1 transition-colors duration-300 ${
                          isActive ? 'text-radiance-gold' : 'text-text-primary'
                        }`}>
                          {output.title}
                        </h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                          {output.description}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <div className={`hidden lg:flex items-center transition-all duration-300 ${
                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}>
                        <svg className="w-5 h-5 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Preview Panel */}
          <div className="lg:col-span-7">
            <div className="sticky top-8">
              <div className="border border-depth-border rounded-2xl bg-depth-elevated/30 backdrop-blur-md overflow-hidden min-h-[400px] flex flex-col">
                {/* Terminal-style header */}
                <div className="bg-depth-surface/50 border-b border-depth-border px-5 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-error/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-radiance-gold/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-success/40" />
                  </div>
                  <div className="text-[9px] font-mono text-text-muted">
                    {currentOutput ? `${currentOutput.tag}.report` : 'diagnostic_report.json'}
                  </div>
                </div>

                {/* Content area */}
                <div className="flex-1 p-6 md:p-8 relative">
                  <div 
                    className="absolute inset-0 opacity-[0.015] pointer-events-none" 
                    style={{ 
                      backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                      backgroundSize: '20px 20px' 
                    }} 
                  />

                  {currentOutput ? (
                    <div className="relative z-10 space-y-6 animate-fade-in">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center shadow-[0_0_15px_rgba(232,184,74,0.3)]">
                            {currentOutput.icon}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-radiance-gold">
                              {currentOutput.title}
                            </h4>
                            <p className="text-xs font-mono text-text-muted uppercase tracking-wider">
                              {currentOutput.tag}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-depth-border/50" />

                      {/* Preview content */}
                      <div className="space-y-4">
                        <p className="text-sm text-text-muted italic">
                          Your report will include:
                        </p>
                        
                        <div className="space-y-3">
                          {currentOutput.preview.map((item, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start gap-3 p-3 rounded-lg bg-depth-surface/50 border border-depth-border"
                              style={{ 
                                animation: `slideIn 0.4s ease-out ${idx * 100}ms forwards`,
                                opacity: 0
                              }}
                            >
                              <div className="w-5 h-5 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-text-secondary text-sm">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer note */}
                      <div className="pt-4 mt-6 border-t border-depth-border/30">
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-radiance-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs text-text-muted italic">
                            Delivered as a clear, actionable report within 24-48 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                      <div className="space-y-3">
                        <div className="text-5xl">📊</div>
                        <p className="text-text-muted font-mono text-sm">
                          {'<'} Hover over each output to preview {'>'}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        {OUTPUTS.map((_, idx) => (
                          <div 
                            key={idx}
                            className="w-2 h-2 rounded-full bg-text-muted/20 animate-pulse"
                            style={{ animationDelay: `${idx * 200}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-8 text-center">
          <p className="text-text-muted text-sm italic">
            If it makes sense, we'll also let you know whether deeper system work is worth exploring.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DiagnosticOutputVisual;
