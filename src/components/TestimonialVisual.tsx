/**
 * Testimonial Visual
 * CONCEPT: "The Voice"
 * Simple, elegant testimonial presentation
 */

import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  companyUrl?: string;
  avatar?: string;
}

interface TestimonialVisualProps {
  testimonial: Testimonial;
}

export const TestimonialVisual: React.FC<TestimonialVisualProps> = ({ testimonial }) => {
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

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-depth-border pb-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Client_Testimonial::Validation
            </span>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center space-y-8 mb-12">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-radiance-gold/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-radiance-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
          </div>

          <blockquote className="text-xl md:text-2xl text-text-primary font-medium leading-relaxed">
            "{testimonial.quote}"
          </blockquote>
        </div>

        {/* Author */}
        <div className="flex flex-col items-center gap-6 pt-8 border-t border-depth-border/50">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-radiance-gold/30 bg-gradient-to-br from-radiance-gold/20 to-radiance-amber/20 flex items-center justify-center">
            {testimonial.avatar ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.parentElement;
                  if (fallback) {
                    fallback.innerHTML = `<div class="w-full h-full flex items-center justify-center text-depth-base font-bold text-xl">${testimonial.author.charAt(0)}</div>`;
                  }
                }}
              />
            ) : (
              <span className="text-depth-base font-bold text-xl">
                {testimonial.author.charAt(0)}
              </span>
            )}
          </div>

          <div className="text-center space-y-2">
            <p className="text-lg text-text-primary font-semibold">
              {testimonial.author}
            </p>
            <p className="text-sm text-text-muted">
              {testimonial.role}
            </p>

            {testimonial.companyUrl && (
              <a
                href={testimonial.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-radiance-gold/10 hover:bg-radiance-gold/20 border border-radiance-gold/30 rounded-full text-radiance-gold font-semibold transition-all duration-300 group"
              >
                <span>Visit {testimonial.company}</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialVisual;
