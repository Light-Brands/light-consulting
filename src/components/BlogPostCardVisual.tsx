/**
 * Blog Post Card Visual
 * CONCEPT: "The Collection"
 * Individual blog post card with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';

interface BlogPostCardVisualProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageSrc?: string;
  imageAlt?: string;
  onClick: () => void;
}

export const BlogPostCardVisual: React.FC<BlogPostCardVisualProps> = ({
  title,
  excerpt,
  category,
  date,
  readTime,
  imageSrc,
  imageAlt,
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      className={`relative group transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Hover glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-b from-radiance-gold/5 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card container */}
      <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer transition-all duration-300 group-hover:border-radiance-gold/30 group-hover:bg-depth-elevated/30">
        {/* Image */}
        {imageSrc && (
          <div className="relative -mx-6 -mt-6 mb-6 h-48 overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt || title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? 'scale-105' : ''
              }`}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-depth-base/80 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-radiance-gold/10 border border-radiance-gold/30">
            <span className="text-[10px] font-semibold text-radiance-gold uppercase tracking-wider">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-radiance-gold transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-text-secondary text-sm line-clamp-2">{excerpt}</p>

          {/* Meta */}
          <div className="flex items-center justify-between text-text-muted text-xs pt-2 border-t border-depth-border">
            <span>{date}</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCardVisual;
