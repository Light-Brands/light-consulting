/**
 * Blog Post Related Visual
 * CONCEPT: "The Collection"
 * Related posts section for blog post detail view
 */

import React, { useEffect, useRef, useState } from 'react';
import { BlogPostCardVisual } from './';

interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface BlogPostRelatedVisualProps {
  posts: RelatedPost[];
  onPostClick: (postId: string) => void;
}

export const BlogPostRelatedVisual: React.FC<BlogPostRelatedVisualProps> = ({
  posts,
  onPostClick,
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

  if (posts.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Technical header */}
      <div className="flex items-center gap-2 border-b border-depth-border pb-3 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
        <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
          Related::More_Insights
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-text-primary mb-6">
        More Insights
      </h3>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogPostCardVisual
            key={post.id}
            title={post.title}
            excerpt={post.excerpt}
            category={post.category}
            date={post.date}
            readTime={post.readTime}
            imageSrc={post.imageSrc}
            imageAlt={post.imageAlt}
            onClick={() => onPostClick(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPostRelatedVisual;
