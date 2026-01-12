/**
 * Project Carousel
 * CONCEPT: "The Showcase"
 * Infinite scrolling carousel of portfolio projects
 */

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_PROJECTS } from '@/data/projects';
import type { Project } from '@/types/database';

interface ProjectCarouselProps {
  /** Speed in pixels per second */
  speed?: number;
  /** Whether to pause on hover */
  pauseOnHover?: boolean;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  speed = 30,
  pauseOnHover = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get featured projects first, then fill with others
  const featuredProjects = PORTFOLIO_PROJECTS.filter(p => p.featured);
  const otherProjects = PORTFOLIO_PROJECTS.filter(p => !p.featured);
  const displayProjects = [...featuredProjects, ...otherProjects].slice(0, 20);

  // Duplicate for seamless loop
  const projects = [...displayProjects, ...displayProjects];

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

  // Calculate animation duration based on content width and speed
  const cardWidth = 320; // px
  const gap = 24; // px
  const totalWidth = displayProjects.length * (cardWidth + gap);
  const duration = totalWidth / speed;

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-12 overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-depth-base via-transparent to-depth-base z-10 pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
            Portfolio::Recent_Projects
          </span>
        </div>
        <h3 className="text-2xl font-semibold text-text-primary">
          Our Work Speaks for Itself
        </h3>
      </div>

      {/* Carousel Container */}
      <div
        className="relative"
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-depth-base to-transparent z-10 pointer-events-none" />

        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-depth-base to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div
          className="flex gap-6"
          style={{
            animation: `scroll ${duration}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${totalWidth}px);
          }
        }
      `}</style>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <a
      href={project.case_study_url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex-shrink-0 w-80 bg-depth-elevated/30 border border-depth-border rounded-2xl overflow-hidden hover:border-radiance-gold/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-radiance-gold/5"
    >
      {/* Image */}
      <div className="relative h-44 bg-depth-surface overflow-hidden">
        {!imageError && project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-radiance-gold/10 to-radiance-amber/10">
            <span className="text-4xl font-bold text-radiance-gold/30">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-depth-base/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider bg-radiance-gold/90 text-depth-base rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-radiance-gold transition-colors">
          {project.title}
        </h4>

        <p className="text-sm text-text-muted line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-[10px] font-medium text-text-muted bg-depth-surface rounded-full border border-depth-border/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Industry */}
        {project.industry && (
          <div className="mt-4 pt-4 border-t border-depth-border/30">
            <span className="text-xs text-radiance-gold/80 font-medium">
              {project.industry}
            </span>
          </div>
        )}
      </div>
    </a>
  );
};

export default ProjectCarousel;
