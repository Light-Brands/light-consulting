/**
 * Origin Story Visual
 * CONCEPT: "The Foundation"
 * Minimalist presentation of the core insight
 */

import React, { useState, useEffect, useRef } from 'react';
import { SparkleIcon } from './Icons';

interface CategoryClaim {
  number: number;
  title: string;
  description: string;
  color: 'gold' | 'amber' | 'cream';
}

interface OriginStoryVisualProps {
  content: {
    paragraphs: string[];
    categoryTitle: string;
    categorySubtitle: string;
    claims: CategoryClaim[];
  };
}

export const OriginStoryVisual: React.FC<OriginStoryVisualProps> = ({ content }) => {
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

  const getColorClasses = (color: string) => {
    if (color === 'gold') {
      return {
        bg: 'bg-radiance-gold/10',
        text: 'text-radiance-gold',
      };
    }
    if (color === 'amber') {
      return {
        bg: 'bg-radiance-amber/10',
        text: 'text-radiance-amber',
      };
    }
    return {
      bg: 'bg-depth-surface',
      text: 'text-text-secondary',
    };
  };

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

      <div className="relative max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-depth-border pb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Core_Insight::AI_Maturity_Framework
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
          {content.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease-out ${index * 0.15}s`,
              }}
              dangerouslySetInnerHTML={{
                __html: paragraph.replace(
                  /<span class="text-radiance-gold font-semibold">(.*?)<\/span>/g,
                  '<span class="text-radiance-gold font-semibold">$1</span>'
                ),
              }}
            />
          ))}
        </div>

        {/* Category Claim */}
        <div className="pt-8 border-t border-depth-border">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <SparkleIcon className="text-radiance-gold" size={24} />
            <h3 className="text-xl font-semibold text-text-primary">{content.categoryTitle}</h3>
          </div>
          <p className="text-text-muted text-center mb-8">{content.categorySubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.claims.map((claim, index) => {
              const colors = getColorClasses(claim.color);
              return (
                <div
                  key={index}
                  className="text-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease-out ${0.6 + index * 0.1}s`,
                  }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mx-auto mb-3 font-bold text-lg`}
                  >
                    {claim.number}
                  </div>
                  <p className="text-text-primary font-semibold mb-1">{claim.title}</p>
                  <p className="text-text-muted text-sm">{claim.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginStoryVisual;
