/**
 * Blog Post Hero Visual
 * CONCEPT: "The Banner"
 * Hero banner for blog post detail view
 */

import React, { useEffect, useRef, useState } from 'react';

interface BlogPostHeroVisualProps {
  imageSrc?: string;
  imageAlt?: string;
}

export const BlogPostHeroVisual: React.FC<BlogPostHeroVisualProps> = ({
  imageSrc,
  imageAlt,
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

  if (!imageSrc) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[300px] md:h-[400px] transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-depth-base" />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(15, 14, 13, 0.7) 50%, rgba(15, 14, 13, 1) 100%)',
        }}
      />

      {/* Subtle overlay pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
};

export default BlogPostHeroVisual;
