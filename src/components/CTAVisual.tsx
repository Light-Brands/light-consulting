/**
 * CTA Visual
 * CONCEPT: "The Invitation"
 * Simple call-to-action with minimalist design
 */

import React, { useState, useEffect, useRef } from 'react';

interface CTAVisualProps {
  onNavigate: () => void;
}

export const CTAVisual: React.FC<CTAVisualProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
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

      <div className="relative max-w-2xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-depth-border pb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Diagnostic::AI_Readiness_Assessment
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary">
            Not sure where you stand?
          </h2>

          <p className="text-lg text-text-secondary leading-relaxed">
            Most founders think they're further along than they are.
          </p>

          <p className="text-sm text-text-muted leading-relaxed max-w-lg mx-auto">
            We start with a short, focused diagnostic to determine your AI readiness level,
            where leverage is leaking, and what systems actually matter next.
          </p>

          <div className="pt-4">
            <button
              onClick={onNavigate}
              className="px-8 py-4 bg-radiance-gold hover:bg-radiance-amber text-depth-base font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(232,184,74,0.2)] hover:shadow-[0_0_30px_rgba(232,184,74,0.3)]"
            >
              Discover Your AI Readiness
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAVisual;
