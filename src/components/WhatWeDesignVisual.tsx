/**
 * What We Design Visual
 * CONCEPT: "The System Stack"
 * Minimalist layered visualization showing how systems build and interconnect
 */

import React, { useState, useEffect, useRef } from 'react';

interface SystemLayer {
  title: string;
  description: string;
  depth: number;
}

const SYSTEMS: SystemLayer[] = [
  {
    title: 'AI Intelligence Diagnostics',
    description: 'A clear picture of where your business stands, and where leverage is hiding.',
    depth: 0,
  },
  {
    title: 'Business-Specific AI Engines',
    description: 'Intelligence systems that power sales, operations, and decision-making.',
    depth: 1,
  },
  {
    title: 'Founder Leverage Systems',
    description: 'Infrastructure that removes you as the bottleneck.',
    depth: 2,
  },
  {
    title: 'Authority & Intelligence Platforms',
    description: 'Systems that turn insight, IP, and experience into long-term demand.',
    depth: 3,
  },
];

export const WhatWeDesignVisual: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-depth-border pb-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              System_Stack::Intelligence_Layers
            </span>
          </div>
          <span className="text-[9px] font-mono text-radiance-gold/50">
            [{SYSTEMS.length}_MODULES]
          </span>
        </div>

        {/* System Stack */}
        <div className="relative space-y-4">
          {SYSTEMS.map((system, index) => {
            const isHovered = hoveredIndex === index;
            const isActive = hoveredIndex === null || isHovered;
            const delay = index * 0.1;

            return (
              <div
                key={index}
                className="relative group/layer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                }}
              >
                {/* Connection Line to Previous Layer */}
                {index > 0 && (
                  <div className="absolute -top-4 left-8 w-px h-4 bg-gradient-to-b from-radiance-gold/20 to-transparent" />
                )}

                {/* Layer Card */}
                <div
                  className={`relative p-6 rounded-xl border transition-all duration-500 ${
                    isActive
                      ? 'border-radiance-gold/30 bg-radiance-gold/5'
                      : 'border-depth-border bg-depth-elevated/30 opacity-40'
                  }`}
                  style={{
                    transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                  }}
                >
                  {/* Depth indicator and glow */}
                  <div
                    className={`absolute inset-0 bg-radiance-gold blur-2xl opacity-0 transition-opacity duration-500 ${
                      isHovered ? 'opacity-5' : ''
                    }`}
                  />

                  <div className="relative z-10">
                    {/* Layer Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Depth Badge */}
                        <div
                          className={`w-8 h-8 rounded border flex items-center justify-center text-xs font-mono transition-all duration-500 ${
                            isHovered
                              ? 'border-radiance-gold bg-radiance-gold/10 text-radiance-gold'
                              : 'border-depth-border bg-depth-base text-text-muted'
                          }`}
                        >
                          {index + 1}
                        </div>

                        {/* Title */}
                        <h3
                          className={`text-base md:text-lg font-medium tracking-tight transition-colors duration-500 ${
                            isHovered ? 'text-radiance-gold' : 'text-text-primary'
                          }`}
                        >
                          {system.title}
                        </h3>
                      </div>

                      {/* Status Indicator */}
                      <div
                        className={`flex items-center gap-1.5 transition-opacity duration-500 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div className="w-1 h-1 rounded-full bg-radiance-gold animate-pulse" />
                        <span className="text-[8px] font-mono text-radiance-gold uppercase tracking-wider">
                          ACTIVE
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed pl-11">
                      {system.description}
                    </p>

                    {/* Technical Meta */}
                    <div className="mt-4 pt-3 border-t border-depth-border/50 flex items-center justify-between pl-11">
                      <span className="text-[8px] font-mono text-text-muted uppercase tracking-wider">
                        LAYER_{index + 1} :: DEPTH_{system.depth}
                      </span>
                      <div
                        className={`h-1 transition-all duration-500 rounded-full ${
                          isHovered ? 'bg-radiance-gold w-12' : 'bg-depth-border w-6'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Insight */}
        <div className="mt-12 pt-8 border-t border-depth-border/50 text-center">
          <p className="text-sm text-text-secondary italic font-light">
            Each system is designed to compound, not just perform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDesignVisual;
