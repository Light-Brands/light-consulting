/**
 * Interactive AI Readiness Curve for Funnel Page
 * Shows the progression from experimentation to intelligence ownership
 */

import React, { useState, useRef, useEffect } from 'react';

const LEVELS = [
  { 
    level: 1, 
    label: 'Experimenting with tools', 
    color: 'text-text-muted', 
    bgColor: 'bg-text-muted/10',
    borderColor: 'border-text-muted/20',
    description: 'Testing ChatGPT, trialing point solutions',
    metric: '5%',
    metricLabel: 'of full AI potential'
  },
  { 
    level: 2, 
    label: 'Automating tasks', 
    color: 'text-text-secondary', 
    bgColor: 'bg-text-secondary/10',
    borderColor: 'border-text-secondary/20',
    description: 'Isolated automations, departmental tools',
    metric: '20%',
    metricLabel: 'of full AI potential'
  },
  { 
    level: 3, 
    label: 'Systematizing workflows', 
    color: 'text-radiance-amber', 
    bgColor: 'bg-radiance-amber/10',
    borderColor: 'border-radiance-amber/30',
    description: 'Connected processes, workflow integration',
    metric: '45%',
    metricLabel: 'of full AI potential'
  },
  { 
    level: 4, 
    label: 'Owning business intelligence', 
    color: 'text-radiance-gold', 
    bgColor: 'bg-radiance-gold/10',
    borderColor: 'border-radiance-gold/30',
    description: 'Proprietary intelligence layer, structural advantage',
    metric: '100%',
    metricLabel: 'of full AI potential'
  },
];

export const FunnelReadinessVisual: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
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
  const displayLevel = hoveredLevel ?? activeLevel;
  
  const handleClick = (level: number) => {
    setActiveLevel(activeLevel === level ? null : level);
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
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className={`w-2 h-2 rounded-full ${displayLevel ? 'bg-radiance-gold animate-pulse' : 'bg-text-muted'}`} />
            <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
              Readiness_Spectrum::Assessment_Framework
            </span>
          </div>
        </div>

        {/* Main Visual: Stacked Curve Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: The Progression Ladder */}
          <div className="lg:col-span-7 space-y-4">
            {LEVELS.map((item, idx) => {
              const isActive = displayLevel === item.level;
              const isPast = displayLevel ? item.level < displayLevel : false;
              
              return (
                <div
                  key={item.level}
                  className={`relative transition-all duration-500 cursor-pointer ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                  onMouseEnter={() => setHoveredLevel(item.level)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  onClick={() => handleClick(item.level)}
                >
                  {/* Connecting vertical line */}
                  {idx < LEVELS.length - 1 && (
                    <div className={`absolute left-5 top-full w-px h-3 transition-colors duration-500 ${
                      isPast || isActive ? 'bg-radiance-gold/50' : 'bg-depth-border'
                    }`} />
                  )}

                  <div className={`relative p-4 rounded-xl border backdrop-blur-sm transition-all duration-500 overflow-hidden group ${
                    isActive 
                      ? `${item.bgColor} ${item.borderColor} scale-[1.02] shadow-lg` 
                      : isPast
                      ? 'bg-depth-surface/30 border-depth-border/50 opacity-60'
                      : 'bg-depth-surface/50 border-depth-border hover:border-text-muted/30'
                  }`}>
                    {/* Radial glow on active */}
                    {isActive && item.level === 4 && (
                      <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/10 to-transparent opacity-50" />
                    )}

                    <div className="relative z-10 flex items-center gap-4">
                      {/* Level Number Badge */}
                      <div className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold font-mono transition-all duration-500 ${
                        isActive && item.level === 4
                          ? 'bg-radiance-gold/20 text-radiance-gold shadow-[0_0_20px_rgba(232,184,74,0.4)]'
                          : isActive
                          ? `${item.bgColor} ${item.color}`
                          : isPast
                          ? 'bg-depth-border/50 text-text-muted'
                          : 'bg-depth-border text-text-muted group-hover:bg-text-muted/20'
                      }`}>
                        {item.level}
                        
                        {/* Pulse ring on active */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-full border-2 border-radiance-gold/40 animate-ping" />
                        )}
                      </div>

                      {/* Level Info */}
                      <div className="flex-1">
                        <div className={`text-base md:text-lg font-medium transition-colors duration-300 ${
                          isActive ? item.color : 'text-text-secondary'
                        }`}>
                          {item.label}
                        </div>
                        
                        {/* Description shows on hover/active */}
                        <div className={`overflow-hidden transition-all duration-500 ${
                          isActive ? 'max-h-[80px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                        }`}>
                          <p className="text-sm text-text-muted italic leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Progress indicator */}
                      <div className="hidden md:block text-right">
                        <div className={`text-xs font-mono transition-colors duration-300 ${
                          isActive ? item.color : 'text-text-muted'
                        }`}>
                          {item.metric}
                        </div>
                      </div>
                    </div>

                    {/* Bottom progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-depth-base/50 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          isActive && item.level === 4
                            ? 'bg-radiance-gold shadow-[0_0_10px_rgba(232,184,74,0.6)]'
                            : isActive
                            ? 'bg-radiance-amber/60'
                            : isPast
                            ? 'bg-text-muted/30'
                            : 'bg-transparent'
                        }`}
                        style={{ 
                          width: isActive ? '100%' : isPast ? '100%' : '0%',
                          transitionDelay: isActive ? `${idx * 100}ms` : '0ms'
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Metric Display */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-6 lg:pl-4">
              {/* Current Level Display */}
              <div className="p-6 rounded-2xl border border-depth-border bg-depth-elevated/30 backdrop-blur-sm relative overflow-hidden min-h-[280px] flex flex-col justify-center transition-all duration-500">
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
                  style={{ 
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                  }} 
                />

                {displayLevel ? (
                  <div className="relative z-10 space-y-4 animate-fade-in">
                    <div className="text-[8px] font-mono text-text-muted tracking-[0.3em] uppercase">
                      Level_{displayLevel}_Diagnostics
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`text-5xl font-bold ${LEVELS[displayLevel - 1].color}`}>
                        {LEVELS[displayLevel - 1].metric}
                      </div>
                      <div className="text-sm text-text-muted">
                        {LEVELS[displayLevel - 1].metricLabel}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-depth-border/50">
                      <p className="text-text-secondary">
                        {LEVELS[displayLevel - 1].description}
                      </p>
                    </div>

                    {displayLevel === 4 && (
                      <div className="pt-4">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-radiance-gold/10 border border-radiance-gold/30">
                          <svg className="w-5 h-5 text-radiance-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="text-sm text-radiance-gold font-medium">
                            Peak readiness unlocked
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative z-10 text-center space-y-4">
                    <div className="text-text-muted text-sm font-mono">
                      {'<'} Hover or tap to explore each level {'>'}
                    </div>
                    <div className="flex justify-center gap-2 pt-4">
                      {LEVELS.map((_, idx) => (
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

              {/* Insight callout */}
              <div className="p-5 rounded-xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Most companies believe they're further along than they are.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom status */}
        <div className="mt-12 pt-8 border-t border-depth-border/50 text-center">
          <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.4em] flex items-center justify-center gap-3">
            <span className="opacity-40">//</span>
            <span>This diagnostic reveals where you actually stand</span>
            <span className="opacity-40">//</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FunnelReadinessVisual;
