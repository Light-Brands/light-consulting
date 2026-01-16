/**
 * Blog Post Takeaways Visual
 * CONCEPT: "The Highlights"
 * Key takeaways section for blog post detail view
 */

import React, { useEffect, useRef, useState } from 'react';

interface BlogPostTakeawaysVisualProps {
  takeaways: string[];
}

export const BlogPostTakeawaysVisual: React.FC<BlogPostTakeawaysVisualProps> = ({
  takeaways,
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
      <div className="absolute -inset-2 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Styled container */}
      <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        {/* Technical header */}
        <div className="flex items-center gap-2 border-b border-depth-border pb-3 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
            Takeaways::Key_Points
          </span>
        </div>

        <h3 className="text-lg font-bold text-text-primary mb-4">
          Key Takeaways
        </h3>
        <ul className="space-y-3">
          {takeaways.map((takeaway, index) => (
            <li
              key={index}
              className="flex items-start gap-3"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <span className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 text-xs font-bold">
                {index + 1}
              </span>
              <span className="text-text-secondary text-sm leading-relaxed">{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogPostTakeawaysVisual;
