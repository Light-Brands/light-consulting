/**
 * Enhanced Portfolio Page Component
 * Light Brand Consulting - Immersive Live Preview Experience
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section, Heading, Text } from '@/components/ui';
import { PortfolioGrid, Breadcrumbs } from '@/components/portfolio';
import Button from '@/components/Button';
import type { Project, ProjectGroup } from '@/types/database';
import type { PageKey } from '@/types';

interface PortfolioPageProps {
  onNavigate: (page: PageKey) => void;
}

// Group configuration
const PROJECT_GROUP_CONFIG: { value: ProjectGroup; label: string; description: string }[] = [
  { value: 'featured', label: 'Featured Projects', description: 'Our best and most impactful work' },
  { value: 'new', label: 'New Projects', description: 'Recent additions to our portfolio' },
  { value: 'past', label: 'Past Projects', description: 'A collection of our previous work' },
];

// Enhanced filter options
const FILTER_OPTIONS = [
  { label: 'All Projects', value: 'all' },
  { label: 'Featured', value: 'featured' },
  { label: 'AI & Technology', value: 'AI' },
  { label: 'Hospitality', value: 'Hospitality' },
  { label: 'Real Estate', value: 'Real Estate' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Tourism & Travel', value: 'Tourism' },
  { label: 'Energy', value: 'Energy' },
  { label: 'Community', value: 'Community' },
];

// View modes
type ViewMode = 'preview' | 'details';

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('preview');

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/projects?status=published');
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setProjects(data.data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Advanced filtering and search
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Apply category filter
    if (activeFilter === 'featured') {
      filtered = filtered.filter((p) => p.featured);
    } else if (activeFilter !== 'all') {
      filtered = filtered.filter(
        (p) =>
          p.tags?.some((tag) =>
            tag.toLowerCase().includes(activeFilter.toLowerCase())
          ) ||
          p.industry?.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.client_name?.toLowerCase().includes(query) ||
          p.industry?.toLowerCase().includes(query) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [projects, activeFilter, searchQuery]);

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-depth-elevated/30 to-transparent">
        <Container size="wide">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Portfolio' },
            ]}
            className="mb-8"
          />

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <Heading level="h1" className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Our{' '}
              <span className="text-gradient-illumination">Portfolio</span>
            </Heading>
            <Text variant="lead" className="text-text-secondary mb-8 leading-relaxed">
              Real projects. Real results. See how we've helped businesses 
              redesign how they think, operate, and compound in an AI-driven world.
            </Text>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mt-8"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, client, technology, or industry..."
                className="w-full pl-11 pr-4 py-4 bg-depth-surface border border-depth-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold/50 transition-all"
                aria-label="Search projects"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-primary transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            {/* Filters */}
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter projects"
            >
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  role="tab"
                  aria-selected={activeFilter === option.value}
                  aria-controls="projects-grid"
                  className={`group px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                    activeFilter === option.value
                      ? 'bg-gradient-to-r from-radiance-gold to-radiance-amber text-depth-base shadow-lg shadow-radiance-gold/25'
                      : 'bg-depth-surface text-text-secondary hover:text-text-primary hover:bg-depth-elevated border border-depth-border hover:border-radiance-gold/30'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results Summary */}
          <AnimatePresence mode="wait">
            {(searchQuery || activeFilter !== 'all') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 flex items-center gap-3 text-sm text-text-secondary"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-radiance-gold animate-pulse" />
                  <span>
                    {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                  }}
                  className="text-radiance-gold hover:text-radiance-amber transition-colors font-medium"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>

      {/* Projects Grid Section */}
      <Section className="pb-20 md:pb-32">
        <Container size="wide">
          {error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-text-secondary mb-6">{error}</p>
              <Button
                variant="primary"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </motion.div>
          ) : (
            <div id="projects-grid" role="tabpanel">
              {/* Show grouped sections when no filter is active */}
              {activeFilter === 'all' && !searchQuery.trim() ? (
                <div className="space-y-16">
                  {PROJECT_GROUP_CONFIG.map((group) => {
                    const groupProjects = filteredProjects.filter(
                      (p) => (p.project_group || 'past') === group.value
                    );

                    // Skip empty groups
                    if (groupProjects.length === 0) return null;

                    return (
                      <motion.section
                        key={group.value}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Section Header */}
                        <div className="mb-8">
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                              {group.label}
                            </h2>
                            <p className="text-text-muted text-sm mt-1">
                              {group.description} • {groupProjects.length} {groupProjects.length === 1 ? 'project' : 'projects'}
                            </p>
                          </div>
                        </div>

                        {/* Projects Grid */}
                        <PortfolioGrid
                          projects={groupProjects}
                          isLoading={false}
                          viewMode={viewMode}
                        />
                      </motion.section>
                    );
                  })}
                </div>
              ) : (
                /* Show flat grid when filtering/searching */
                <PortfolioGrid
                  projects={filteredProjects}
                  isLoading={isLoading}
                  viewMode={viewMode}
                />
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 md:py-32 bg-gradient-to-br from-depth-elevated via-depth-base to-depth-elevated border-y border-depth-border relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-radiance-gold/5 via-transparent to-radiance-amber/5" />
        
        <Container size="wide" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-radiance-gold/10 rounded-full mb-6 border border-radiance-gold/20">
              <div className="w-2 h-2 rounded-full bg-radiance-gold animate-pulse" />
              <span className="text-radiance-gold text-sm font-semibold">Ready to start?</span>
            </div>
            
            <Heading level="h2" className="text-3xl md:text-5xl mb-6">
              Let&apos;s Build Something{' '}
              <span className="text-gradient-illumination">Amazing Together</span>
            </Heading>
            
            <Text variant="lead" className="text-text-secondary mb-10 leading-relaxed">
              Join the growing list of businesses that have unlocked their full potential 
              with our expert consulting and development services.
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('contact')}
                className="group"
              >
                <span>Start Your Journey</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onNavigate('services')}
              >
                Explore Services
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
};

export default PortfolioPage;
