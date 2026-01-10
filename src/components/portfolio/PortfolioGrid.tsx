/**
 * Portfolio Grid Component
 * Light Brand Consulting
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types/database';

interface PortfolioGridProps {
  projects: Project[];
  isLoading?: boolean;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  projects,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        role="status"
        aria-label="Loading projects"
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-depth-surface rounded-2xl border border-depth-border animate-pulse"
          >
            <div className="aspect-[16/10] bg-depth-elevated rounded-t-2xl" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-depth-elevated rounded w-1/3" />
              <div className="h-6 bg-depth-elevated rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-depth-elevated rounded" />
                <div className="h-4 bg-depth-elevated rounded w-5/6" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 bg-depth-elevated rounded w-16" />
                <div className="h-6 bg-depth-elevated rounded w-16" />
                <div className="h-6 bg-depth-elevated rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-depth-surface flex items-center justify-center">
          <svg
            className="w-10 h-10 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No Projects Yet
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          We&apos;re working on some exciting projects. Check back soon to see our latest work.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      role="list"
      aria-label="Portfolio projects"
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

export default PortfolioGrid;
