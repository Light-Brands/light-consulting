/**
 * AI Readiness Curve Visual
 * CONCEPT: "The Progression Curve"
 * A refined, detail-focused visualization with an actual curved progression line.
 */

import React, { useState, useEffect, useRef } from 'react';

// Cubic Bezier curve: M 80 410 C 200 350, 400 150, 920 60
// Calculate points on the curve using the parametric equation
// B(t) = (1-t)³P0 + 3(1-t)²t*P1 + 3(1-t)t²P2 + t³P3
const getCubicBezierPoint = (t: number) => {
  const P0 = { x: 80, y: 410 };
  const P1 = { x: 200, y: 350 };
  const P2 = { x: 400, y: 150 };
  const P3 = { x: 920, y: 60 };
  
  const x = Math.pow(1-t, 3) * P0.x + 
            3 * Math.pow(1-t, 2) * t * P1.x + 
            3 * (1-t) * Math.pow(t, 2) * P2.x + 
            Math.pow(t, 3) * P3.x;
  
  const y = Math.pow(1-t, 3) * P0.y + 
            3 * Math.pow(1-t, 2) * t * P1.y + 
            3 * (1-t) * Math.pow(t, 2) * P2.y + 
            Math.pow(t, 3) * P3.y;
  
  return { x: (x / 1000) * 100, y: (y / 500) * 100 };
};

const LEVELS = [
  { 
    level: 1, 
    label: 'Experimenting with tools', 
    color: 'text-text-muted',
    ...getCubicBezierPoint(0),
  },
  { 
    level: 2, 
    label: 'Automating tasks', 
    color: 'text-text-muted',
    ...getCubicBezierPoint(0.33),
  },
  { 
    level: 3, 
    label: 'Systematizing workflows', 
    color: 'text-text-secondary',
    ...getCubicBezierPoint(0.67),
  },
  { 
    level: 4, 
    label: 'Owning business intelligence', 
    color: 'text-radiance-gold',
    ...getCubicBezierPoint(1),
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
            preserveAspectRatio="xMidYMid meet"
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
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Curved path using cubic bezier for more pronounced curve */}
            <path
              d="M 80 410 C 200 350, 400 150, 920 60"
              fill="none"
              stroke="url(#curveGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
              className="transition-opacity duration-1000"
              style={{ 
                opacity: isVisible ? 1 : 0,
                strokeDasharray: '1400',
                strokeDashoffset: 1400 - (lineProgress * 14),
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

          {/* Axis Labels - Positioned at container edges aligned with curve endpoints */}
          <div 
            className="absolute flex items-center gap-2 bottom-0"
            style={{
              left: `${LEVELS[0].x}%`,
              transform: 'translateX(-50%)',
              paddingBottom: '0.5rem',
            }}
          >
            <div className="w-1 h-1 rounded-full bg-text-muted/40" />
            <span className="text-[9px] font-mono text-text-muted uppercase tracking-[0.3em] whitespace-nowrap">FOUNDATION</span>
          </div>
          <div 
            className="absolute flex items-center gap-2 top-0"
            style={{
              left: `${LEVELS[3].x}%`,
              transform: 'translateX(-50%)',
              paddingTop: '0.5rem',
            }}
          >
            <span className="text-[9px] font-mono text-radiance-gold uppercase tracking-[0.3em] whitespace-nowrap">OWNERSHIP</span>
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
