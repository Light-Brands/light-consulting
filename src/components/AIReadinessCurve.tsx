/**
 * AI Readiness Curve Visual
 * CONCEPT: "The Progression Curve"
 * A refined, detail-focused visualization with an actual curved progression line.
 */

import React, { useState, useEffect, useRef } from 'react';

const LEVELS = [
  { 
    level: 1, 
    label: 'Experimenting with tools', 
    color: 'text-text-muted',
    x: 8,
    y: 82,
  },
  { 
    level: 2, 
    label: 'Automating tasks', 
    color: 'text-text-muted',
    x: 32,
    y: 64,
  },
  { 
    level: 3, 
    label: 'Systematizing workflows', 
    color: 'text-text-secondary',
    x: 64,
    y: 38,
  },
  { 
    level: 4, 
    label: 'Owning business intelligence', 
    color: 'text-radiance-gold',
    x: 92,
    y: 12,
  },
];

export const AIReadinessCurve: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate curve drawing
          let progress = 0;
          const interval = setInterval(() => {
            progress += 2;
            setLineProgress(progress);
            if (progress >= 100) clearInterval(interval);
          }, 20);
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full py-20 px-4 md:px-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />

        {/* The Curve Container */}
        <div className="relative h-[380px] md:h-[480px] mb-16">
          {/* Curved Line with Animation */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 1000 500" 
            preserveAspectRatio="none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="curveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B8682" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#8B8682" stopOpacity="0.8" />
                <stop offset="75%" stopColor="#D4944C" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#E8B84A" stopOpacity="1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Curved path using quadratic bezier - coordinates in viewBox units */}
            <path
              d="M 80 410 Q 500 250, 920 60"
              fill="none"
              stroke="url(#curveGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              className="transition-opacity duration-1000"
              style={{ 
                opacity: isVisible ? 1 : 0,
                strokeDasharray: '1200',
                strokeDashoffset: 1200 - (lineProgress * 12),
                transition: 'stroke-dashoffset 2s ease-out'
              }}
            />
          </svg>

          {/* Level Markers */}
          {LEVELS.map((item, index) => {
            const delay = index * 0.15;
            
            return (
              <div
                key={item.level}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ 
                  left: `${item.x}%`, 
                  top: `${item.y}%`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translate(-50%, -50%)' : 'translate(-50%, -50%) translateY(20px)',
                  transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`
                }}
              >
                {/* Connection dot on curve */}
                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    item.level === 4 ? 'bg-radiance-gold' : 'bg-text-muted/40'
                  }`}
                  style={{ 
                    boxShadow: item.level === 4 ? '0 0 8px rgba(232,184,74,0.6)' : 'none'
                  }}
                />

                {/* Circle Marker */}
                <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center font-bold text-base md:text-lg transition-all duration-700 group-hover:scale-110 ${
                  item.level === 4
                    ? 'bg-depth-surface border-radiance-gold text-radiance-gold shadow-[0_0_30px_rgba(232,184,74,0.25)]'
                    : 'bg-depth-surface border-depth-border text-text-muted hover:border-text-muted/50'
                }`}>
                  {item.level}
                  
                  {/* Subtle pulse for level 4 */}
                  {item.level === 4 && (
                    <div className="absolute inset-0 rounded-full border-2 border-radiance-gold/30 animate-ping" style={{ animationDuration: '3s' }} />
                  )}
                </div>

                {/* Label */}
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <p className={`text-xs md:text-sm font-medium ${item.color} text-center transition-colors duration-500 ${
                    item.level === 4 ? 'drop-shadow-[0_0_8px_rgba(232,184,74,0.3)]' : ''
                  }`}>
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Axis Labels - Refined */}
          <div className="absolute bottom-2 left-0 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-text-muted/40" />
            <span className="text-[9px] font-mono text-text-muted uppercase tracking-[0.3em]">FOUNDATION</span>
          </div>
          <div className="absolute top-2 right-0 flex items-center gap-2">
            <span className="text-[9px] font-mono text-radiance-gold uppercase tracking-[0.3em] text-right">OWNERSHIP</span>
            <div className="w-1 h-1 rounded-full bg-radiance-gold shadow-[0_0_4px_rgba(232,184,74,0.6)]" />
          </div>
        </div>

        {/* Level 4 Highlight Card - Refined */}
        <div className="mt-20 p-8 rounded-2xl border border-radiance-gold/20 bg-gradient-to-br from-radiance-gold/5 via-radiance-gold/3 to-transparent backdrop-blur-sm relative overflow-hidden group hover:border-radiance-gold/30 transition-all duration-500">
          {/* Subtle glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-radiance-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative flex items-start gap-6">
            {/* Number Badge */}
            <div className="w-16 h-16 rounded-full bg-radiance-gold/10 border-2 border-radiance-gold/30 flex items-center justify-center font-bold text-radiance-gold text-xl flex-shrink-0 shadow-[0_0_20px_rgba(232,184,74,0.15)] group-hover:shadow-[0_0_30px_rgba(232,184,74,0.25)] transition-shadow duration-500">
              4
            </div>
            
            {/* Content */}
            <div className="flex-1 pt-1">
              <h4 className="text-xl md:text-2xl font-medium text-text-primary mb-2 tracking-tight">
                Owning business intelligence
              </h4>
              <p className="text-sm md:text-base text-radiance-gold/90 font-light italic leading-relaxed">
                ← Where AI becomes structural advantage
              </p>
            </div>
          </div>
        </div>

        {/* Footer Text - Refined */}
        <div className="mt-20 text-center space-y-4">
          <p className="text-lg md:text-xl text-text-primary font-medium leading-relaxed">
            Most companies stall in the middle.
          </p>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
            We help you move to the top, where AI becomes a structural advantage, not a novelty.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIReadinessCurve;
