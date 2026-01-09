/**
 * Insights Hero Visual
 * CONCEPT: "The Gateway"
 * Hero section for Insights page with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';

interface InsightsHeroVisualProps {
  title: string;
  subtitle: string;
  description: string;
}

export const InsightsHeroVisual: React.FC<InsightsHeroVisualProps> = ({
  title,
  subtitle,
  description,
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
      className={`relative text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Technical header */}
      <div className="flex items-center justify-center border-b border-depth-border pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
            Insights::Thought_Leadership
          </span>
        </div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-radiance-gold/10 border border-radiance-gold/30 mb-6">
        <span className="text-xs font-semibold text-radiance-gold uppercase tracking-wider">
          {subtitle}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
        {title}
      </h1>

      {/* Description */}
      <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
};

export default InsightsHeroVisual;
