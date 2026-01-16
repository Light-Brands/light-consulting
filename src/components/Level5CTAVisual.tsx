/**
 * Level 5 CTA Visual
 * CONCEPT: "The Invitation"
 * Special, standout CTA for reaching Level 5
 */

import React, { useState, useEffect, useRef } from 'react';

interface Level5CTAVisualProps {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

export const Level5CTAVisual: React.FC<Level5CTAVisualProps> = ({
  onPrimaryAction,
  onSecondaryAction,
}) => {
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
              Level_5_Invitation::AI_Maturity_Peak
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary">
            Ready to Reach{' '}
            <span className="text-radiance-gold">Level 5</span>?
          </h2>

          {/* Description */}
          <p className="text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
            Start with an AI Level Diagnostic. See exactly where you are on the maturity ladder and get a clear roadmap forward.
          </p>

          {/* Highlight box */}
          <div className="relative p-6 rounded-xl border border-radiance-gold/20 bg-radiance-gold/5 max-w-lg mx-auto">
            <p className="text-sm text-text-primary font-medium italic">
              This is not consulting. This is the installation of operating infrastructure that compounds.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button
              onClick={onPrimaryAction}
              className="px-8 py-3.5 bg-radiance-gold hover:bg-radiance-amber text-depth-base font-semibold rounded-xl transition-all duration-300"
            >
              Discover Your AI Level
            </button>
            <button
              onClick={onSecondaryAction}
              className="px-8 py-3.5 border border-radiance-gold/30 hover:border-radiance-gold/50 text-radiance-gold font-semibold rounded-xl transition-all duration-300 hover:bg-radiance-gold/5"
            >
              Have Questions? Let's Talk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level5CTAVisual;
