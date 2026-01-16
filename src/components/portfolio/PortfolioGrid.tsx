/**
 * Enhanced Portfolio Grid Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LiveProjectCard } from './LiveProjectCard';
import type { Project } from '@/types/database';

interface PortfolioGridProps {
  projects: Project[];
  isLoading?: boolean;
  viewMode?: 'preview' | 'details';
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  projects,
  isLoading = false,
  viewMode = 'preview',
}) => {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        role="status"
        aria-label="Loading projects"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-depth-surface rounded-2xl border border-depth-border overflow-hidden"
          >
            {/* Preview Skeleton */}
            <div className="aspect-[16/10] bg-depth-elevated relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-depth-border/10 to-transparent animate-shimmer" />
            </div>
            
            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              <div className="h-3 bg-depth-elevated rounded w-1/3 animate-pulse" />
              <div className="h-6 bg-depth-elevated rounded w-3/4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-depth-elevated rounded animate-pulse" />
                <div className="h-4 bg-depth-elevated rounded w-5/6 animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 bg-depth-elevated rounded w-16 animate-pulse" />
                <div className="h-6 bg-depth-elevated rounded w-16 animate-pulse" />
                <div className="h-6 bg-depth-elevated rounded w-16 animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-depth-surface to-depth-elevated flex items-center justify-center">
          <svg
            className="w-12 h-12 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-3">
          No Projects Found
        </h3>
        <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
          We couldn&apos;t find any projects matching your criteria. Try adjusting your filters.
        </p>
      </motion.div>
    );
  }

  // Filter out any duplicate IDs to prevent React key conflicts
  const uniqueProjects = React.useMemo(() => {
    const seen = new Set<string>();
    return projects.filter((project) => {
      if (seen.has(project.id)) {
        console.warn(`Duplicate project ID detected: ${project.id} - ${project.title}`);
        return false;
      }
      seen.add(project.id);
      return true;
    });
  }, [projects]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      role="list"
      aria-label="Portfolio projects"
    >
      {uniqueProjects.map((project, index) => (
        <LiveProjectCard 
          key={project.id} 
          project={project} 
          index={index}
          viewMode={viewMode}
        />
      ))}
    </motion.div>
  );
};

export default PortfolioGrid;
