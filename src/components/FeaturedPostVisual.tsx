/**
 * Featured Post Visual
 * CONCEPT: "The Highlight"
 * Featured blog post card with interactive design
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from './Icons';

interface FeaturedPostVisualProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageSrc?: string;
  imageAlt?: string;
  onClick: () => void;
}

export const FeaturedPostVisual: React.FC<FeaturedPostVisualProps> = ({
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
    >
      {/* Hover glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* Styled container */}
      <div
        className="relative z-10 bg-depth-elevated/30 border border-depth-border rounded-[3rem] overflow-hidden backdrop-blur-md cursor-pointer transition-all duration-300 group-hover:border-radiance-gold/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Technical header */}
            <div className="flex items-center gap-2 border-b border-depth-border pb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                Featured::Latest_Insight
              </span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-radiance-gold/10 border border-radiance-gold/30 w-fit">
              <span className="text-xs font-semibold text-radiance-gold uppercase tracking-wider">
                {category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary group-hover:text-radiance-gold transition-colors">
              {title}
            </h2>

            {/* Excerpt */}
            <p className="text-text-secondary leading-relaxed">{excerpt}</p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-text-muted text-sm">
              <span>{date}</span>
              <span>•</span>
              <span>{readTime}</span>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-radiance-gold group-hover:gap-4 transition-all">
              <span className="font-semibold">Read Article</span>
              <ArrowRightIcon
                size={16}
                className={`transition-transform ${isHovered ? 'translate-x-1' : ''}`}
              />
            </div>
          </div>

          {/* Image */}
          {imageSrc && (
            <div className="hidden lg:block relative rounded-2xl overflow-hidden border border-depth-border">
              <img
                src={imageSrc}
                alt={imageAlt || title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-depth-base/50 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostVisual;
