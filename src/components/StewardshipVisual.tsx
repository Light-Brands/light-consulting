/**
 * Stewardship Visual
 * CONCEPT: "The Partnership"
 * Minimalist presentation of stewardship council
 */

import React, { useState, useEffect, useRef } from 'react';

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface StewardshipVisualProps {
  content: {
    title: string;
    paragraphs: string[];
    process: ProcessStep[];
    quote: string;
  };
}

export const StewardshipVisual: React.FC<StewardshipVisualProps> = ({ content }) => {
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

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-depth-border pb-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Partnership_Philosophy::Stewardship_Council
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary">{content.title}</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              {content.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s ease-out ${index * 0.1}s`,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(
                      /<span class="text-radiance-gold font-medium">(.*?)<\/span>/g,
                      '<span class="text-radiance-gold font-medium">$1</span>'
                    ),
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Process */}
          <div className="relative p-8 rounded-xl border border-depth-border bg-depth-elevated/30">
            <h3 className="text-xl font-semibold text-text-primary mb-6">The Council Review Process</h3>
            <div className="space-y-4">
              {content.process.map((item, index) => {
                const isHovered = hoveredIndex === index;
                return (
                  <div
                    key={index}
                    className="relative group/step"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                      transition: `all 0.6s ease-out ${0.3 + index * 0.1}s`,
                    }}
                  >
                    <div
                      className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-500 ${
                        isHovered ? 'bg-radiance-gold/5 border border-radiance-gold/20' : ''
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-radiance-gold/10 text-radiance-gold flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-text-primary font-medium mb-1">{item.title}</h4>
                        <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-depth-border">
              <p className="text-text-muted text-sm italic">"{content.quote}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StewardshipVisual;
