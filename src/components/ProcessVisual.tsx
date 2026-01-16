/**
 * Process Visual
 * CONCEPT: "The Simple Sequence"
 * Clean, minimal horizontal flow with subtle interactions
 */

import React, { useState, useEffect, useRef } from 'react';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Intelligence Mapping',
    description: 'We diagnose how your business currently operates, and where AI can create real leverage.',
  },
  {
    step: 2,
    title: 'System Architecture',
    description: 'We design the intelligence layer your business actually needs.',
  },
  {
    step: 3,
    title: 'AI Engine Build',
    description: 'We build and deploy systems that run alongside your team, and eventually ahead of it.',
  },
  {
    step: 4,
    title: 'Compounding Leverage',
    description: 'Your business stops relying on effort and starts scaling through structure.',
  },
];

export const ProcessVisual: React.FC = () => {
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
        <div className="flex items-center justify-between border-b border-depth-border pb-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Process_Flow::Execution_Sequence
            </span>
          </div>
          <span className="text-[9px] font-mono text-radiance-gold/50">
            [{STEPS.length}_STEPS]
          </span>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => {
            const isHovered = hoveredIndex === index;
            const isActive = hoveredIndex === null || isHovered;
            const delay = index * 0.1;

            return (
              <div
                key={step.step}
                className="relative group/step flex flex-col"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                }}
              >
                {/* Step Card */}
                <div
                  className={`relative p-6 rounded-xl border transition-all duration-500 flex flex-col flex-1 ${
                    isActive
                      ? 'border-radiance-gold/30 bg-radiance-gold/5'
                      : 'border-depth-border bg-depth-elevated/30 opacity-40'
                  }`}
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-radiance-gold blur-2xl transition-opacity duration-500 ${
                      isHovered ? 'opacity-5' : 'opacity-0'
                    }`}
                  />

                  <div className="relative z-10 flex flex-col flex-1 space-y-4">
                    {/* Step Number */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-lg border flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                          isHovered
                            ? 'border-radiance-gold bg-radiance-gold/10 text-radiance-gold'
                            : 'border-depth-border bg-depth-base text-text-muted'
                        }`}
                      >
                        {step.step}
                      </div>

                      {/* Status Indicator */}
                      {isHovered && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-radiance-gold animate-pulse" />
                          <span className="text-[8px] font-mono text-radiance-gold uppercase tracking-wider">
                            ACTIVE
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-base font-medium tracking-tight transition-colors duration-500 ${
                        isHovered ? 'text-radiance-gold' : 'text-text-primary'
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed flex-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connection Arrow (desktop only) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-depth-border z-0">
                    <div
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-depth-border border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent transition-all duration-500 ${
                        isHovered ? 'border-l-radiance-gold' : ''
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-depth-border/50 text-center">
          <p className="text-sm text-text-muted">
            No endless consulting.{' '}
            <span className="text-text-primary font-medium">Clear outcomes. Clear progression.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessVisual;
