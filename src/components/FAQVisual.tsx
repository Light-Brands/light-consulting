/**
 * FAQ Visual
 * CONCEPT: "The Answers"
 * Simple FAQ presentation
 */

import React, { useState, useEffect, useRef } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQVisualProps {
  items: FAQItem[];
}

export const FAQVisual: React.FC<FAQVisualProps> = ({ items }) => {
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
        <div className="flex items-center justify-center border-b border-depth-border pb-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              FAQ::Common_Questions
            </span>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const delay = index * 0.1;

            return (
              <div
                key={index}
                className="relative group/faq"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
                }}
              >
                <div
                  className={`relative p-6 rounded-xl border transition-all duration-500 ${
                    isHovered
                      ? 'border-radiance-gold/30 bg-radiance-gold/5'
                      : 'border-depth-border bg-depth-elevated/30'
                  }`}
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-radiance-gold blur-2xl transition-opacity duration-500 ${
                      isHovered ? 'opacity-5' : 'opacity-0'
                    }`}
                  />

                  <div className="relative z-10 space-y-3">
                    <h4 className="text-base font-semibold text-text-primary">
                      {item.question}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQVisual;
