/**
 * Difference Visual
 * CONCEPT: "The Approach"
 * Minimalist presentation of what makes us different
 */

import React, { useState, useEffect, useRef } from 'react';

interface DifferencePoint {
  title: string;
  description: string;
}

interface DifferenceVisualProps {
  points: DifferencePoint[];
}

export const DifferenceVisual: React.FC<DifferenceVisualProps> = ({ points }) => {
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

  // Split points into two columns
  const leftColumn = points.slice(0, Math.ceil(points.length / 2));
  const rightColumn = points.slice(Math.ceil(points.length / 2));

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

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-depth-border pb-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Differentiation::Approach_Principles
            </span>
          </div>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[leftColumn, rightColumn].map((column, colIndex) => (
            <div key={colIndex} className="space-y-6">
              {column.map((point, index) => {
                const globalIndex = colIndex === 0 ? index : leftColumn.length + index;
                const isHovered = hoveredIndex === globalIndex;
                const delay = globalIndex * 0.1;

                return (
                  <div
                    key={globalIndex}
                    className="relative group/point"
                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                    }}
                  >
                    <div
                      className={`relative p-6 rounded-xl border transition-all duration-500 ${
                        isHovered
                          ? 'border-radiance-gold/30 bg-radiance-gold/5'
                          : 'border-depth-border bg-depth-elevated/30'
                      }`}
                    >
                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 bg-radiance-gold blur-2xl transition-opacity duration-500 ${
                          isHovered ? 'opacity-5' : 'opacity-0'
                        }`}
                      />

                      <div className="relative z-10 space-y-2">
                        <h3 className="text-lg font-semibold text-text-primary">{point.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">{point.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DifferenceVisual;
