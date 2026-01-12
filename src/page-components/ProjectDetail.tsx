/**
 * Project Detail Page
 * Light Brand Consulting
 *
 * Displays full project details including gallery, services, and case study
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container, Section, Heading, Text, Card, CardBody } from '@/components/ui';
import { Button, Tag } from '@/components';
import { ArrowLeftIcon, ClockIcon } from '@/components/Icons';
import type { Project } from '@/types/database';
import type { PageKey } from '@/types';

interface ProjectDetailPageProps {
  projectId: string;
  onNavigate: (page: PageKey) => void;
}

// Icon components
const ExternalLinkIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronLeftIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onNavigate,
}) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        const result = await response.json();
        if (result.data) {
          setProject(result.data);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Get all gallery images
  const galleryImages = project?.gallery_images?.length
    ? project.gallery_images
    : project?.image_url
    ? [project.image_url]
    : [];

  const handlePrevImage = () => {
    setActiveImageIndex(prev =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32">
        <Container size="wide">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-depth-surface rounded w-48" />
            <div className="h-16 bg-depth-surface rounded w-3/4" />
            <div className="aspect-video bg-depth-surface rounded-2xl" />
          </div>
        </Container>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-32">
        <Container size="wide">
          <div className="text-center py-16">
            <h1 className="text-2xl text-text-primary mb-4">Project not found</h1>
            <Button variant="ghost" onClick={() => onNavigate('portfolio')}>
              Back to Portfolio
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero Section */}
      <Section className="pb-12 md:pb-16">
        <Container size="wide">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onNavigate('portfolio')}
            className="text-text-muted hover:text-text-secondary text-sm mb-8 flex items-center gap-2 transition-colors group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </motion.button>

          <div className="max-w-4xl">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              {project.featured && (
                <Tag variant="premium" className="text-xs">
                  Featured Project
                </Tag>
              )}
              {project.industry && (
                <Tag variant="default" className="text-xs">
                  {project.industry}
                </Tag>
              )}
              {project.project_type && (
                <span className="px-3 py-1 bg-depth-surface/50 text-text-muted text-xs rounded-full">
                  {project.project_type}
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Heading level="h1" className="text-4xl md:text-5xl lg:text-6xl mb-6">
                {project.title}
              </Heading>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Text variant="lead" className="text-text-secondary text-lg md:text-xl mb-8">
                {project.description}
              </Text>
            </motion.div>

            {/* Project Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 mb-8 text-sm text-text-muted"
            >
              {project.client_name && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text-secondary">Client:</span>
                  <span>{project.client_name}</span>
                </div>
              )}
              {project.origin && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text-secondary">Region:</span>
                  <span>{project.origin}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <ClockIcon size={16} />
                <span>
                  {new Date(project.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
            </motion.div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-depth-surface text-text-secondary text-sm rounded-lg border border-depth-border"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Live Site Button */}
            {project.case_study_url && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href={project.case_study_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-radiance-gold text-depth-base font-medium rounded-lg hover:bg-radiance-gold/90 transition-colors"
                >
                  <span>View Live Site</span>
                  <ExternalLinkIcon size={16} />
                </a>
              </motion.div>
            )}
          </div>
        </Container>
      </Section>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <Section className="py-0 pb-12 md:pb-16">
          <Container size="wide">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-depth-border bg-depth-elevated">
                {!imageError[activeImageIndex] ? (
                  <Image
                    src={galleryImages[activeImageIndex]}
                    alt={`${project.title} - Image ${activeImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                    onError={() =>
                      setImageError(prev => ({ ...prev, [activeImageIndex]: true }))
                    }
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-depth-surface">
                    <span className="text-text-muted">Image unavailable</span>
                  </div>
                )}

                {/* Navigation Arrows */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-depth-base/80 hover:bg-depth-base rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeftIcon size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-depth-base/80 hover:bg-depth-base rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRightIcon size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {galleryImages.length > 1 && (
                <div className="flex justify-center gap-3 mt-4">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === index
                          ? 'border-radiance-gold'
                          : 'border-depth-border opacity-60 hover:opacity-100'
                      }`}
                    >
                      {!imageError[index] ? (
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          onError={() =>
                            setImageError(prev => ({ ...prev, [index]: true }))
                          }
                        />
                      ) : (
                        <div className="absolute inset-0 bg-depth-surface" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </Container>
        </Section>
      )}

      {/* Services & Key Features */}
      {(project.services?.length || project.key_features?.length) && (
        <Section className="py-12 md:py-16 bg-depth-elevated/50">
          <Container size="wide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Services Provided */}
              {project.services && project.services.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Heading level="h3" className="text-xl mb-4">
                    Services Provided
                  </Heading>
                  <ul className="space-y-3">
                    {project.services.map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-radiance-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckIcon size={12} />
                        </div>
                        <Text variant="body" className="text-text-secondary">
                          {service}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Key Features */}
              {project.key_features && project.key_features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Heading level="h3" className="text-xl mb-4">
                    Key Features
                  </Heading>
                  <ul className="space-y-3">
                    {project.key_features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-radiance-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckIcon size={12} />
                        </div>
                        <Text variant="body" className="text-text-secondary">
                          {feature}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* Challenge & Solution */}
      {(project.challenge || project.solution) && (
        <Section className="py-16 md:py-24">
          <Container size="wide">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Heading level="h2" className="text-3xl md:text-4xl mb-8">
                  Project Overview
                </Heading>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {project.challenge && (
                    <Card elevation="subtle">
                      <CardBody>
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                          The Challenge
                        </h3>
                        <Text variant="body" className="text-text-secondary">
                          {project.challenge}
                        </Text>
                      </CardBody>
                    </Card>
                  )}

                  {project.solution && (
                    <Card elevation="subtle">
                      <CardBody>
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                          Our Solution
                        </h3>
                        <Text variant="body" className="text-text-secondary">
                          {project.solution}
                        </Text>
                      </CardBody>
                    </Card>
                  )}
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>
      )}

      {/* Results */}
      {project.results && project.results.length > 0 && (
        <Section className="py-16 md:py-24 bg-depth-elevated">
          <Container size="wide">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Heading level="h2" className="text-3xl md:text-4xl mb-8">
                  Key Results
                </Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-depth-surface rounded-xl border border-depth-border"
                    >
                      <div className="w-2 h-2 rounded-full bg-radiance-gold mt-2 flex-shrink-0" />
                      <Text variant="body" className="text-text-secondary">
                        {result}
                      </Text>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>
      )}

      {/* Tech Stack */}
      {project.tech_stack && (project.tech_stack.frontend || project.tech_stack.backend) && (
        <Section className="py-12 md:py-16">
          <Container size="wide">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Heading level="h3" className="text-2xl mb-6">
                  Technology Stack
                </Heading>
                <div className="flex flex-wrap gap-4">
                  {project.tech_stack.frontend && (
                    <div className="px-4 py-2 bg-depth-surface rounded-lg border border-depth-border">
                      <span className="text-text-muted text-xs block mb-1">Frontend</span>
                      <span className="text-text-primary font-medium">
                        {project.tech_stack.frontend}
                      </span>
                    </div>
                  )}
                  {project.tech_stack.backend && (
                    <div className="px-4 py-2 bg-depth-surface rounded-lg border border-depth-border">
                      <span className="text-text-muted text-xs block mb-1">Backend</span>
                      <span className="text-text-primary font-medium">
                        {project.tech_stack.backend}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="py-20 md:py-32">
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
              Let&apos;s discuss how we can help you achieve similar results with AI-powered solutions.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={() => onNavigate('contact')}>
                Start Your Project
              </Button>
              <Button variant="secondary" size="lg" onClick={() => onNavigate('portfolio')}>
                View More Projects
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
};

export default ProjectDetailPage;
