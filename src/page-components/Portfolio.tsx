/**
 * Portfolio Page Component
 * Light Brand Consulting
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Section, Heading, Text } from '@/components/ui';
import { PortfolioGrid, Breadcrumbs } from '@/components/portfolio';
import Button from '@/components/Button';
import type { Project } from '@/types/database';
import type { PageKey } from '@/types';

interface PortfolioPageProps {
  onNavigate: (page: PageKey) => void;
}

// Filter options
const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Featured', value: 'featured' },
  { label: 'AI & Technology', value: 'AI' },
  { label: 'Hospitality', value: 'Hospitality' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Tourism & Travel', value: 'Tourism' },
  { label: 'Energy', value: 'Energy' },
  { label: 'Community & Social', value: 'Community' },
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

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
        setFilteredProjects(data.data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else if (activeFilter === 'featured') {
      setFilteredProjects(projects.filter((p) => p.featured));
    } else {
      setFilteredProjects(
        projects.filter(
          (p) =>
            p.tags?.some((tag) =>
              tag.toLowerCase().includes(activeFilter.toLowerCase())
            ) ||
            p.industry?.toLowerCase().includes(activeFilter.toLowerCase())
        )
      );
    }
  }, [activeFilter, projects]);

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 md:pt-40 md:pb-20">
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
            className="max-w-3xl"
          >
            <Heading level="h1" className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Our{' '}
              <span className="text-gradient-illumination">Portfolio</span>
            </Heading>
            <Text variant="lead" className="text-text-secondary mb-8">
              Explore our transformative AI projects that have helped businesses
              achieve unprecedented efficiency and growth. Each project
              represents a unique journey from challenge to solution.
            </Text>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2 mt-8"
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
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeFilter === option.value
                    ? 'bg-radiance-gold text-depth-base'
                    : 'bg-depth-surface text-text-secondary hover:text-text-primary hover:bg-depth-elevated border border-depth-border'
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Projects Grid Section */}
      <Section className="pb-20 md:pb-32">
        <Container size="wide">
          {error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-500"
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
              <p className="text-text-secondary">{error}</p>
            </motion.div>
          ) : (
            <div id="projects-grid" role="tabpanel">
              <PortfolioGrid projects={filteredProjects} isLoading={isLoading} />
            </div>
          )}

          {/* Results Count */}
          {!isLoading && !error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-text-muted mt-12"
            >
              Showing {filteredProjects.length} of {projects.length} projects
            </motion.p>
          )}
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 md:py-32 bg-depth-elevated border-y border-depth-border">
        <Container size="wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <Heading level="h2" className="text-3xl md:text-4xl mb-4">
              Ready to Transform Your Business?
            </Heading>
            <Text variant="lead" className="text-text-secondary mb-8">
              Join the growing list of businesses that have unlocked their AI
              potential with Light Brand Consulting.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('contact')}
              >
                Start Your Journey
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
