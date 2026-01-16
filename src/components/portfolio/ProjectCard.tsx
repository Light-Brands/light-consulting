/**
 * Project Card Component
 * Light Brand Consulting Portfolio
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/database';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  return (
    <Link href={`/portfolio/${project.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative bg-depth-surface rounded-2xl overflow-hidden border border-depth-border hover:border-radiance-gold/30 transition-all duration-500 cursor-pointer"
        role="article"
        aria-labelledby={`project-title-${project.id}`}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-depth-elevated">
          {project.image_url ? (
            <Image
              src={project.image_url}
              alt={`${project.title} project showcase`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-radiance-gold/90 text-depth-base text-xs font-semibold rounded-full">
              Featured
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-depth-base/90 via-depth-base/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Industry */}
          {project.industry && (
            <p className="text-text-muted text-xs uppercase tracking-wider mb-2">
              {project.industry}
            </p>
          )}

          {/* Title */}
          <h3
            id={`project-title-${project.id}`}
            className="text-lg font-semibold text-text-primary mb-3 group-hover:text-radiance-gold transition-colors"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Project tags">
              {project.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  role="listitem"
                  className="px-2 py-1 bg-depth-elevated text-text-muted text-xs rounded-md border border-depth-border"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2 py-1 text-text-muted text-xs">
                  +{project.tags.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Client */}
          {project.client_name && (
            <p className="text-text-muted text-xs mb-4">
              Client: <span className="text-text-secondary">{project.client_name}</span>
            </p>
          )}

          {/* View Project Link */}
          <div className="inline-flex items-center gap-2 text-radiance-gold text-sm font-medium group-hover:text-radiance-amber transition-colors">
            <span>View Project</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default ProjectCard;
