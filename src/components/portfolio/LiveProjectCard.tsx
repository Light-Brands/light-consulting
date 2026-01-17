/**
 * Live Project Card Component with Website Preview
 * Light Brand Consulting Portfolio
 */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/database';

interface LiveProjectCardProps {
  project: Project;
  index?: number;
  viewMode?: 'preview' | 'details';
}

// Timeout for detecting CORS/loading failures (5 seconds for better UX)
const PREVIEW_LOAD_TIMEOUT = 5000;

export const LiveProjectCard: React.FC<LiveProjectCardProps> = ({ 
  project, 
  index = 0,
  viewMode = 'preview'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [useFallbackImage, setUseFallbackImage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [scale, setScale] = useState(0.5);
  
  // Check if preview should be enabled (defaults to true)
  const previewEnabled = project.preview_enabled !== false;

  const calculateScale = useCallback(() => {
    // Try to get width from article element first (more reliable)
    const article = articleRef.current;
    const container = containerRef.current;
    
    let containerWidth = 0;
    
    if (article) {
      containerWidth = article.getBoundingClientRect().width || article.clientWidth || article.offsetWidth || 0;
    }
    
    if (containerWidth === 0 && container) {
      containerWidth = container.getBoundingClientRect().width || container.clientWidth || container.offsetWidth || 0;
    }
    
    if (containerWidth > 0) {
      const desktopWidth = 1920;
      const calculatedScale = containerWidth / desktopWidth;
      setScale(calculatedScale);
    }
  }, []);

  useEffect(() => {
    // Initial calculation with delays
    const timeout1 = setTimeout(calculateScale, 0);
    const timeout2 = setTimeout(calculateScale, 50);
    const timeout3 = setTimeout(calculateScale, 200);
    requestAnimationFrame(calculateScale);

    // Use ResizeObserver on article element
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calculateScale);
    });

    if (articleRef.current) {
      resizeObserver.observe(articleRef.current);
    } else if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also observe window resize
    window.addEventListener('resize', calculateScale);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateScale);
    };
  }, [calculateScale]);

  // Handle iframe load success
  const handleIframeLoad = useCallback(() => {
    // Clear timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLoaded(true);
    setHasError(false);
    setUseFallbackImage(false);
  }, []);

  // Handle iframe error or timeout
  const handlePreviewFailure = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHasError(true);
    setIsLoaded(false);
    // Automatically fall back to image if available
    if (project.image_url) {
      setUseFallbackImage(true);
    }
  }, [project.image_url]);

  const handleIframeError = useCallback(() => {
    handlePreviewFailure();
  }, [handlePreviewFailure]);

  // Set up timeout when component mounts or preview URL changes
  useEffect(() => {
    // Only set up timeout if preview is enabled and we have a URL
    if (
      viewMode === 'preview' &&
      project.case_study_url &&
      previewEnabled &&
      !useFallbackImage
    ) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout to detect loading failures
      timeoutRef.current = setTimeout(() => {
        // If still not loaded after timeout, fall back to image
        if (!isLoaded) {
          handlePreviewFailure();
        }
      }, PREVIEW_LOAD_TIMEOUT);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
  }, [
    viewMode,
    project.case_study_url,
    previewEnabled,
    useFallbackImage,
    isLoaded,
    handlePreviewFailure,
  ]);

  return (
    <motion.article
      ref={articleRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative bg-depth-surface rounded-2xl overflow-hidden border border-depth-border",
        "transition-all duration-500",
        isHovered && "border-radiance-gold/50 shadow-2xl shadow-radiance-gold/10"
      )}
      role="article"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Live Preview Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-depth-elevated"
        style={{
          height: scale > 0 ? `${((1080 * scale) / 2) * 1.6}px` : '400px',
          minHeight: '300px',
        }}
      >
        {/* Determine what to show: preview, fallback image, or placeholder */}
        {(() => {
          // Check if we should attempt to show a live preview
          const canShowPreview =
            viewMode === 'preview' &&
            project.case_study_url &&
            previewEnabled &&
            !useFallbackImage &&
            !hasError;

          // Check if we have a fallback image available
          const hasFallbackImage = Boolean(project.image_url);

          // Show live preview iframe
          if (canShowPreview) {
            return (
              <>
                {/* Loading State - shown while iframe loads */}
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-depth-elevated z-10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-radiance-gold/20 border-t-radiance-gold animate-spin" />
                      <p className="text-text-muted text-sm">Loading preview...</p>
                    </div>
                  </div>
                )}

                {/* Live Website Iframe */}
                <div className="absolute inset-0 overflow-hidden">
                  <iframe
                    ref={iframeRef}
                    src={project.case_study_url}
                    title={`${project.title} live preview`}
                    className={cn(
                      "absolute border-0",
                      "pointer-events-none transition-opacity duration-500",
                      isLoaded ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                      width: '1920px',
                      height: '1080px',
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left',
                    }}
                    loading="lazy"
                    sandbox="allow-same-origin allow-scripts"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                  />
                </div>

                {/* Hover Overlay with Gradient */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-depth-base/95 via-depth-base/60 to-transparent pointer-events-none z-20"
                    />
                  )}
                </AnimatePresence>
              </>
            );
          }

          // Show fallback image (when preview disabled, failed, or not available)
          if (hasFallbackImage) {
            return (
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={project.image_url!}
                  alt={project.title}
                  fill
                  className="object-cover transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 6}
                />
                {/* Hover Overlay with Gradient */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-depth-base/95 via-depth-base/60 to-transparent pointer-events-none z-10"
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          }

          // Final fallback: Placeholder icon (no preview and no image)
          return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-depth-elevated to-depth-surface">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-radiance-gold/20 to-radiance-amber/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-radiance-gold/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
            </div>
          );
        })()}

        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4 px-3 py-1.5 bg-radiance-gold text-depth-base text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Featured</span>
          </motion.div>
        )}

        {/* Quick Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 right-4 flex gap-2"
            >
              {project.case_study_url && (
                <a
                  href={project.case_study_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-depth-base/90 backdrop-blur-sm rounded-lg hover:bg-radiance-gold hover:text-depth-base transition-all border border-depth-border hover:border-radiance-gold"
                  aria-label="Visit live website"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Industry Badge */}
        {project.industry && (
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-depth-elevated rounded-md mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold" />
            <span className="text-text-muted text-xs uppercase tracking-wider font-medium">
              {project.industry}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          id={`project-title-${project.id}`}
          className="text-xl font-bold text-text-primary mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-radiance-gold group-hover:to-radiance-amber transition-all"
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Project tags">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                role="listitem"
                className="px-2.5 py-1 bg-depth-elevated/50 text-text-muted text-xs rounded-md border border-depth-border/50 hover:border-radiance-gold/30 transition-colors"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2.5 py-1 text-radiance-gold/70 text-xs font-medium">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Mobile View Project Button */}
        <Link
          href={`/portfolio/${project.id}`}
          className="md:hidden flex items-center justify-center gap-2 w-full py-3 mb-4 bg-radiance-gold text-depth-base font-semibold rounded-lg hover:bg-radiance-amber transition-colors"
        >
          <span>View Project</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-depth-border/50">
          {/* Client */}
          {project.client_name && (
            <p className="text-text-muted text-xs">
              <span className="text-text-secondary font-medium">{project.client_name}</span>
            </p>
          )}

          {/* View Details Link - Desktop only */}
          <Link
            href={`/portfolio/${project.id}`}
            className="hidden md:inline-flex items-center gap-2 text-radiance-gold text-sm font-semibold hover:text-radiance-amber transition-colors group/link"
          >
            <span>Details</span>
            <svg
              className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default LiveProjectCard;
