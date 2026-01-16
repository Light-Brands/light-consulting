/**
 * Approach Comparison Visual
 * CONCEPT: "The Contrast"
 * Side-by-side comparison of approaches
 */

import React, { useState, useEffect, useRef } from 'react';
import { CheckIcon } from './Icons';

interface ComparisonItem {
  label: string;
  items: string[];
  color: 'error' | 'gold';
}

interface ApproachComparisonVisualProps {
  others: ComparisonItem;
  ours: ComparisonItem;
}

export const ApproachComparisonVisual: React.FC<ApproachComparisonVisualProps> = ({
  others,
  ours,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'others' | 'ours' | null>(null);
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

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-depth-border pb-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Approach_Comparison::Methodology_Contrast
            </span>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Others */}
          <div
            className="relative group/others flex flex-col"
            onMouseEnter={() => setHoveredSide('others')}
            onMouseLeave={() => setHoveredSide(null)}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
            }}
          >
            <div
              className={`relative p-6 rounded-xl border transition-all duration-500 flex flex-col flex-1 ${
                hoveredSide === 'others'
                  ? 'border-error/40 bg-error/5'
                  : hoveredSide === 'ours'
                  ? 'border-error/20 bg-error/5 opacity-40'
                  : 'border-error/20 bg-error/5'
              }`}
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-error" />
                {others.label}
              </h3>
              <ul className="space-y-3 flex-1">
                {others.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.5s ease-out ${0.3 + index * 0.1}s`,
                    }}
                  >
                    <span className="text-error text-lg mt-0.5">×</span>
                    <span className="text-sm text-text-muted leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ours */}
          <div
            className="relative group/ours flex flex-col"
            onMouseEnter={() => setHoveredSide('ours')}
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
                hoveredSide === 'ours' ? 'opacity-10' : 'opacity-0'
              }`}
            />

            <div
              className={`relative p-6 rounded-xl border transition-all duration-500 flex flex-col flex-1 ${
                hoveredSide === 'ours'
                  ? 'border-radiance-gold/40 bg-radiance-gold/5'
                  : hoveredSide === 'others'
                  ? 'border-radiance-gold/20 bg-radiance-gold/5 opacity-40'
                  : 'border-radiance-gold/20 bg-radiance-gold/5'
              }`}
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-radiance-gold" />
                {ours.label}
              </h3>
              <ul className="space-y-3 flex-1">
                {ours.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                      transition: `all 0.5s ease-out ${0.4 + index * 0.1}s`,
                    }}
                  >
                    <CheckIcon size={14} className="text-radiance-gold mt-1 flex-shrink-0" />
                    <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-depth-border to-transparent hidden md:block" />
      </div>
    </div>
  );
};

export default ApproachComparisonVisual;
