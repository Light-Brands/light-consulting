/**
 * Strategic Moment Visual
 * CONCEPT: "The Timing"
 * Minimalist presentation of the strategic moment
 */

import React, { useState, useEffect, useRef } from 'react';
import { SparkleIcon } from './Icons';

interface StrategicMomentVisualProps {
  content: {
    title: string;
    mainText: string;
    quote: string;
  };
}

export const StrategicMomentVisual: React.FC<StrategicMomentVisualProps> = ({ content }) => {
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

      <div className="relative max-w-3xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-depth-border pb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Strategic_Moment::Timing_Context
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <SparkleIcon className="text-radiance-gold mx-auto" size={32} />
          <h2 className="text-2xl font-semibold text-text-primary">{content.title}</h2>
          <p
            className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: content.mainText.replace(
                /<span class="text-radiance-gold font-semibold">(.*?)<\/span>/g,
                '<span class="text-radiance-gold font-semibold">$1</span>'
              ),
            }}
          />
          <div className="border-l-4 border-radiance-gold pl-4 text-left italic text-text-muted max-w-xl mx-auto">
            "{content.quote}"
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicMomentVisual;
