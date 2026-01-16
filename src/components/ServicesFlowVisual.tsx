/**
 * Services Flow Visual
 * CONCEPT: "The Path Sequence"
 * Minimalist visualization of the 3-step service flow
 */

import React, { useState, useEffect, useRef } from 'react';
import { CheckIcon } from './Icons';

interface ServiceStep {
  step: number;
  title: string;
  description: string;
  deliverables: string[];
  investment: string;
  duration: string;
  color: 'gold' | 'amber' | 'muted';
  icon: React.ReactNode;
  available?: boolean;
  onAction?: () => void;
  audience?: string;
}

interface ServicesFlowVisualProps {
  steps: ServiceStep[];
}

export const ServicesFlowVisual: React.FC<ServicesFlowVisualProps> = ({ steps }) => {
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

  const getColorClasses = (color: string, isHovered: boolean) => {
    if (color === 'gold') {
      return {
        border: isHovered ? 'border-radiance-gold/40' : 'border-radiance-gold/30',
        bg: 'bg-radiance-gold/5',
        text: 'text-radiance-gold',
        iconBg: 'bg-radiance-gold/20',
      };
    }
    if (color === 'amber') {
      return {
        border: isHovered ? 'border-radiance-amber/40' : 'border-radiance-amber/30',
        bg: 'bg-radiance-amber/5',
        text: 'text-radiance-amber',
        iconBg: 'bg-radiance-amber/20',
      };
    }
    return {
      border: isHovered ? 'border-depth-border' : 'border-depth-border',
      bg: 'bg-depth-elevated/30',
      text: 'text-text-muted',
      iconBg: 'bg-depth-surface',
    };
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-12 px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-depth-border pb-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Service_Flow::Path_To_Clarity
            </span>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const isHovered = hoveredIndex === index;
            const colors = getColorClasses(step.color, isHovered);
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
                    isHovered ? colors.border : colors.border
                  } ${colors.bg}`}
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-radiance-gold blur-2xl transition-opacity duration-500 ${
                      isHovered && step.color !== 'muted' ? 'opacity-5' : 'opacity-0'
                    }`}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                          isHovered ? colors.iconBg : colors.iconBg
                        } ${colors.text}`}
                      >
                        {step.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className={`text-sm font-medium whitespace-nowrap ${colors.text}`}>
                            Step {step.step}
                          </p>
                          {step.audience && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-depth-surface text-text-muted whitespace-nowrap">
                              {step.audience}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description - fixed height for alignment */}
                    <div className="min-h-[120px] mb-6">
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Deliverables - grows to fill space */}
                    <div className="flex-1 mb-6">
                      <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                        You'll receive:
                      </p>
                      <div className="space-y-3">
                        {step.deliverables.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckIcon
                              size={14}
                              className={`mt-0.5 flex-shrink-0 ${colors.text}`}
                            />
                            <span className="text-xs text-text-secondary leading-relaxed">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer - pushed to bottom */}
                    <div className="pt-4 border-t border-depth-border/50 mt-auto">
                      {step.available && step.onAction ? (
                        <button
                          onClick={step.onAction}
                          className="w-full py-2.5 px-4 bg-radiance-gold hover:bg-radiance-amber text-depth-base font-semibold rounded-lg transition-all duration-300 text-sm"
                        >
                          Discover Your AI Readiness
                        </button>
                      ) : (
                        <p className="text-xs text-text-muted italic">
                          {step.step === 2
                            ? 'For those who demonstrate readiness'
                            : step.step === 3
                            ? 'For those who align with our values'
                            : step.step === 4
                            ? 'By invitation only'
                            : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connection Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-depth-border z-0">
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
      </div>
    </div>
  );
};

export default ServicesFlowVisual;
