/**
 * Blog Post CTA Visual
 * CONCEPT: "The Invitation"
 * CTA section for blog post detail view
 */

import React, { useEffect, useRef, useState } from 'react';
import { Button } from './';

interface BlogPostCTAVisualProps {
  onBookClick: () => void;
}

export const BlogPostCTAVisual: React.FC<BlogPostCTAVisualProps> = ({
  onBookClick,
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
      className={`relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Hover glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* Styled container */}
      <div className="relative z-10 bg-depth-elevated/20 border border-radiance-gold/20 rounded-2xl p-6 md:p-8 text-center backdrop-blur-sm">
        {/* Technical header */}
        <div className="flex items-center justify-center border-b border-depth-border pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              CTA::Apply_Insights
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-text-primary mb-2">
          Ready to Apply These Insights?
        </h3>
        <p className="text-text-secondary text-sm mb-6">
          Book an Illumination Session to see how these principles apply to your specific business.
        </p>
        <Button variant="primary" onClick={onBookClick}>
          Book Your Session
        </Button>
      </div>
    </div>
  );
};

export default BlogPostCTAVisual;
