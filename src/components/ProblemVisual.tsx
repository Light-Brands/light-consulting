/**
 * Problem Visual
 * CONCEPT: "The Split"
 * Simple visual showing the historical model ending and the split happening
 */

import React, { useState, useEffect, useRef } from 'react';

export const ProblemVisual: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-12 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-depth-border pb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Market_Shift::Historical_Model_End
            </span>
          </div>
        </div>

        {/* Historical Context */}
        <div className="text-center space-y-4">
          <p className="text-lg text-text-secondary leading-relaxed">
            For decades, companies scaled by hiring more people and adding more process.
          </p>
          <p className="text-xl text-radiance-amber font-semibold">
            AI has ended that model.
          </p>
        </div>

        {/* The Split */}
        <div className="relative">
          <div className="text-center mb-8">
            <p className="text-lg text-text-primary">Now there's a split happening:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side - Save Time */}
            <div
              className="relative group/left"
              onMouseEnter={() => setHoveredSide('left')}
              onMouseLeave={() => setHoveredSide(null)}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
              }}
            >
              <div
                className={`relative p-8 rounded-xl border transition-all duration-500 h-full flex flex-col ${
                  hoveredSide === 'left'
                    ? 'border-text-muted/50 bg-depth-elevated/50'
                    : hoveredSide === 'right'
                    ? 'border-depth-border/50 bg-depth-elevated/20 opacity-40'
                    : 'border-depth-border bg-depth-elevated/30'
                }`}
              >
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-base text-text-muted leading-relaxed text-center">
                    Some businesses will use AI to save time.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Design Intelligence */}
            <div
              className="relative group/right"
              onMouseEnter={() => setHoveredSide('right')}
              onMouseLeave={() => setHoveredSide(null)}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
              }}
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-radiance-gold blur-3xl transition-opacity duration-700 ${
                  hoveredSide === 'right' ? 'opacity-10' : 'opacity-0'
                }`}
              />

              <div
                className={`relative p-8 rounded-xl border transition-all duration-500 h-full flex flex-col ${
                  hoveredSide === 'right'
                    ? 'border-radiance-gold/40 bg-radiance-gold/5'
                    : hoveredSide === 'left'
                    ? 'border-radiance-gold/20 bg-radiance-gold/5 opacity-40'
                    : 'border-radiance-gold/20 bg-radiance-gold/5'
                }`}
              >
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-base text-text-primary font-medium leading-relaxed text-center">
                    Others will design intelligence into the foundation of how they operate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-depth-border to-transparent hidden md:block" />
        </div>

        {/* Footer Insight */}
        <div className="pt-8 border-t border-depth-border/50 text-center">
          <p className="text-sm text-text-muted italic font-light">
            Most founders don't realize which side they're on until it's too late.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemVisual;
