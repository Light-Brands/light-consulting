/**
 * Portfolio Page
 * Light Brand Consulting
 *
 * Displays portfolio projects with live previews where possible,
 * falling back to screenshots or branded placeholders when blocked.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Tag } from '../components';
import { PORTFOLIO_PROJECTS, PORTFOLIO_CATEGORIES, IMAGE_CONFIG } from '../lib/constants';
import { PageKey, PortfolioProject } from '../types';

interface PortfolioPageProps {
  onNavigate: (page: PageKey) => void;
}

// Preview states for the card
type PreviewState = 'loading' | 'iframe' | 'image' | 'placeholder';

// Project Card with live preview + fallback chain
const ProjectCard: React.FC<{ project: PortfolioProject }> = ({ project }) => {
  const [previewState, setPreviewState] = useState<PreviewState>('loading');
  const [imageLoaded, setImageLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate initials from project title for fallback
  const getInitials = (title: string) => {
    return title
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  // Determine if we should try live preview
  const shouldTryLivePreview = project.previewEnabled !== false;

  useEffect(() => {
    if (!shouldTryLivePreview) {
      // Skip straight to image if preview is disabled
      setPreviewState('image');
      return;
    }

    // Set a timeout to detect if iframe failed to load
    // X-Frame-Options blocked iframes don't fire error events,
    // so we use a timeout-based approach
    timeoutRef.current = setTimeout(() => {
      // If still loading after 5 seconds, assume iframe was blocked
      if (previewState === 'loading') {
        console.log(`[Portfolio] Live preview timeout for ${project.title}, falling back to image`);
        setPreviewState('image');
      }
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shouldTryLivePreview, project.title]);

  // Handle successful iframe load
  const handleIframeLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Check if iframe actually loaded content (not blocked)
    // Note: We can't access cross-origin iframe content, so we assume success
    // if the load event fires
    setPreviewState('iframe');
  };

  // Handle iframe error
  const handleIframeError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    console.log(`[Portfolio] Iframe error for ${project.title}, falling back to image`);
    setPreviewState('image');
  };

  // Handle image load success
  const handleImageLoad = () => {
    setImageLoaded(true);
    if (previewState === 'image' || previewState === 'loading') {
      setPreviewState('image');
    }
  };

  // Handle image error - fall back to placeholder
  const handleImageError = () => {
    console.log(`[Portfolio] Image failed for ${project.title}, showing placeholder`);
    setPreviewState('placeholder');
  };

  return (
    <Card
      elevation="elevated"
      className="group overflow-hidden hover:ring-1 hover:ring-radiance-gold/30 transition-all duration-300"
    >
      {/* Preview Section */}
      <div className="relative aspect-video overflow-hidden bg-depth-elevated">
        {/* Loading skeleton - shown while determining preview method */}
        {previewState === 'loading' && (
          <div className="absolute inset-0 bg-depth-elevated flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-radiance-gold/10 flex items-center justify-center mx-auto mb-2 animate-pulse">
                <span className="text-radiance-gold/50 font-bold text-lg">
                  {getInitials(project.title)}
                </span>
              </div>
              <p className="text-text-muted text-xs">Loading preview...</p>
            </div>
          </div>
        )}

        {/* Live iframe preview - attempted first if enabled */}
        {shouldTryLivePreview && previewState !== 'placeholder' && (
          <iframe
            ref={iframeRef}
            src={project.siteUrl}
            title={`${project.title} live preview`}
            className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${
              previewState === 'iframe' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              pointerEvents: 'none',
              transform: 'scale(0.5)',
              transformOrigin: 'top left',
              width: '200%',
              height: '200%',
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}

        {/* Screenshot image fallback */}
        {(previewState === 'image' || (previewState === 'loading' && !shouldTryLivePreview)) && (
          <img
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Branded placeholder - final fallback */}
        {previewState === 'placeholder' && (
          <div className="absolute inset-0 bg-gradient-to-br from-depth-elevated to-depth-base flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-radiance-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-radiance-gold font-bold text-2xl">
                  {getInitials(project.title)}
                </span>
              </div>
              <p className="text-text-muted text-sm">Preview unavailable</p>
            </div>
          </div>
        )}

        {/* Live preview indicator badge */}
        {previewState === 'iframe' && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2 py-1 text-xs bg-green-500/90 text-white rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Live
            </span>
          </div>
        )}

        {/* Hover overlay with visit button */}
        <div className="absolute inset-0 bg-depth-base/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
          <a
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-radiance-gold text-depth-base font-semibold rounded-lg hover:bg-radiance-amber transition-colors"
          >
            Visit Site
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 z-20">
            <Tag variant="premium" className="text-xs">Featured</Tag>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-radiance-gold transition-colors">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-depth-elevated text-text-muted rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter projects by category
  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(project => project.category === activeCategory);

  // Get featured projects first, then sort by ID
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="py-24 px-6 md:px-12 lg:px-16 relative overflow-hidden"
        style={{
          backgroundImage: `url(${IMAGE_CONFIG.heroes.services.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-depth-base/80" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-radial-gradient from-radiance-gold/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Tag variant="premium" className="mb-6">
            Our Work
          </Tag>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Portfolio
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A showcase of brands we've helped illuminate. Each project represents
            a unique journey from vision to digital reality.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6 md:px-12 lg:px-16 bg-depth-elevated border-b border-depth-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-radiance-gold text-depth-base'
                  : 'bg-depth-base text-text-secondary hover:text-text-primary hover:bg-depth-base/80'
              }`}
            >
              All Projects
            </button>
            {Object.entries(PORTFOLIO_CATEGORIES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === key
                    ? 'bg-radiance-gold text-depth-base'
                    : 'bg-depth-base text-text-secondary hover:text-text-primary hover:bg-depth-base/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {sortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-muted">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 lg:px-16 bg-depth-elevated">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Ready to Join Our Portfolio?
          </h2>
          <p className="text-text-secondary mb-8">
            Let's illuminate your brand's potential and create something remarkable together.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('book')}
          >
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
