/**
 * Fit Criteria Visual
 * CONCEPT: "The Filter"
 * Clean comparison showing ideal fit vs not-a-fit with subtle interactivity
 */

import React, { useState, useEffect, useRef } from 'react';
import { CheckIcon } from './Icons';

interface FitCriteriaVisualProps {
  idealClients: string[];
  notAFit: string[];
}

export const FitCriteriaVisual: React.FC<FitCriteriaVisualProps> = ({
  idealClients,
  notAFit,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'ideal' | 'not' | null>(null);
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
      {/* Subtle grid background */}
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
              Alignment_Filter::Client_Criteria
            </span>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ideal Fit Side */}
          <div
            className="relative group/ideal"
            onMouseEnter={() => setHoveredSide('ideal')}
            onMouseLeave={() => setHoveredSide(null)}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
            }}
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-radiance-gold blur-3xl transition-opacity duration-700 ${
                hoveredSide === 'ideal' ? 'opacity-10' : 'opacity-0'
              }`}
            />

            <div
              className={`relative p-8 rounded-2xl border transition-all duration-500 ${
                hoveredSide === 'ideal'
                  ? 'border-radiance-gold/40 bg-radiance-gold/5'
                  : hoveredSide === 'not'
                  ? 'border-depth-border/50 bg-depth-elevated/20 opacity-40'
                  : 'border-radiance-gold/20 bg-radiance-gold/5'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-radiance-gold/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-radiance-gold" />
                  <span className="text-[9px] font-mono tracking-wider text-radiance-gold uppercase">
                    IDEAL_FIT
                  </span>
                </div>
                <div
                  className={`text-xs font-mono transition-opacity duration-500 ${
                    hoveredSide === 'ideal' ? 'opacity-100 text-radiance-gold' : 'opacity-0'
                  }`}
                >
                  [{idealClients.length}]
                </div>
              </div>

              <h3 className="text-xl font-medium text-radiance-gold mb-8 tracking-tight">
                Light Brand is for founders who:
              </h3>

              {/* Criteria List */}
              <div className="space-y-5">
                {idealClients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 group/item"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.5s ease-out ${0.3 + index * 0.1}s`,
                    }}
                  >
                    {/* Check Icon */}
                    <div className="w-6 h-6 rounded border border-radiance-gold/30 bg-radiance-gold/5 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-radiance-gold/10 transition-colors duration-300">
                      <CheckIcon size={14} />
                    </div>

                    {/* Text */}
                    <p className="text-sm text-text-primary leading-relaxed group-hover/item:text-radiance-gold/90 transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Not A Fit Side */}
          <div
            className="relative group/not"
            onMouseEnter={() => setHoveredSide('not')}
            onMouseLeave={() => setHoveredSide(null)}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
            }}
          >
            <div
              className={`relative p-8 rounded-2xl border transition-all duration-500 ${
                hoveredSide === 'not'
                  ? 'border-depth-border bg-depth-elevated/50'
                  : hoveredSide === 'ideal'
                  ? 'border-depth-border/50 bg-depth-elevated/20 opacity-40'
                  : 'border-depth-border/70 bg-depth-elevated/30'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-depth-border/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-text-muted/40" />
                  <span className="text-[9px] font-mono tracking-wider text-text-muted uppercase">
                    NOT_A_FIT
                  </span>
                </div>
                <div
                  className={`text-xs font-mono transition-opacity duration-500 ${
                    hoveredSide === 'not' ? 'opacity-100 text-text-muted' : 'opacity-0'
                  }`}
                >
                  [{notAFit.length}]
                </div>
              </div>

              <h3 className="text-xl font-medium text-text-muted mb-8 tracking-tight">
                This is not for:
              </h3>

              {/* Criteria List */}
              <div className="space-y-5">
                {notAFit.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 group/item"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                      transition: `all 0.5s ease-out ${0.4 + index * 0.1}s`,
                    }}
                  >
                    {/* X Icon */}
                    <div className="w-6 h-6 rounded border border-depth-border bg-depth-base text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:border-text-muted/50 transition-colors duration-300">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>

                    {/* Text */}
                    <p className="text-sm text-text-muted leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-depth-border to-transparent hidden md:block" />
      </div>
    </div>
  );
};

export default FitCriteriaVisual;
