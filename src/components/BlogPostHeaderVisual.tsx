/**
 * Blog Post Header Visual
 * CONCEPT: "The Introduction"
 * Header section for blog post detail view
 */

import React, { useEffect, useRef, useState } from 'react';

interface BlogPostHeaderVisualProps {
  category: string;
  title: string;
  date: string;
  readTime: string;
}

export const BlogPostHeaderVisual: React.FC<BlogPostHeaderVisualProps> = ({
  category,
  title,
  date,
  readTime,
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
      <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        {/* Technical header */}
        <div className="flex items-center gap-2 border-b border-depth-border pb-3 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
            Article::{category}
          </span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-radiance-gold/10 border border-radiance-gold/30 mb-4">
          <span className="text-xs font-semibold text-radiance-gold uppercase tracking-wider">
            {category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">
          {title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-text-muted text-sm">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPostHeaderVisual;
