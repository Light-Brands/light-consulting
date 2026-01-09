/**
 * Topics Visual
 * CONCEPT: "The Categories"
 * Topics section with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';

interface TopicsVisualProps {
  topics: string[];
}

export const TopicsVisual: React.FC<TopicsVisualProps> = ({ topics }) => {
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
            Topics::Coverage_Areas
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-text-primary mb-8">
        Topics We Cover
      </h3>

      {/* Topics grid */}
      <div className="flex flex-wrap justify-center gap-3">
        {topics.map((topic, index) => (
          <div
            key={topic}
            className="px-4 py-2 rounded-full bg-depth-elevated/30 border border-depth-border text-text-secondary text-sm hover:border-radiance-gold/30 hover:text-radiance-gold transition-all duration-300 cursor-default"
            style={{
              transitionDelay: `${index * 50}ms`,
            }}
          >
            {topic}
          </div>
        ))}
      </div>

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

export default TopicsVisual;
