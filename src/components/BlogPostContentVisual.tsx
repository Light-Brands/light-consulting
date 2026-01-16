/**
 * Blog Post Content Visual
 * CONCEPT: "The Story"
 * Content paragraphs for blog post detail view
 */

import React, { useEffect, useRef, useState } from 'react';

interface BlogPostContentVisualProps {
  paragraphs: string[];
}

export const BlogPostContentVisual: React.FC<BlogPostContentVisualProps> = ({
  paragraphs,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
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
      {/* Content */}
      <div className="prose prose-invert max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-text-secondary mb-6 leading-relaxed text-base md:text-lg"
            style={{
              transitionDelay: `${index * 50}ms`,
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
};

export default BlogPostContentVisual;
