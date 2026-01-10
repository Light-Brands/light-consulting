/**
 * Project Detail Page
 * Light Brand Consulting
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

// Mock project data for visualization (when database isn't configured)
const MOCK_PROJECT: Project = {
  id: 'demo-project',
  title: 'AI-Powered Healthcare Analytics Platform',
  description: 'Transformed a healthcare provider\'s data operations by implementing an intelligent analytics platform that processes millions of patient records in real-time, reducing analysis time from weeks to minutes while maintaining HIPAA compliance.',
  image_url: '/images/services/blueprint.jpg',
  tags: ['AI & Automation', 'Healthcare', 'Data Analytics', 'Machine Learning', 'HIPAA Compliance'],
  case_study_url: null,
  client_name: 'Regional Healthcare Network',
  industry: 'Healthcare',
  featured: true,
  status: 'published',
  sort_order: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onNavigate,
}) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For now, use mock data. Later this will fetch from API
    // TODO: Replace with actual API call when database is configured
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        // For now, always return mock project regardless of projectId
        setProject(MOCK_PROJECT);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

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
          </div>
        </Container>
      </Section>

      {/* Hero Image */}
      {project.image_url && (
        <Section className="py-0 pb-12 md:pb-16">
          <Container size="wide">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative aspect-video rounded-2xl overflow-hidden border border-depth-border bg-depth-elevated"
            >
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </Container>
        </Section>
      )}

      {/* Project Details */}
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
                Project Overview
              </Heading>

              <div className="prose prose-invert max-w-none space-y-6">
                <Text variant="body" className="text-text-secondary text-lg leading-relaxed">
                  This project demonstrates our approach to transforming complex business operations
                  through intelligent automation. By leveraging cutting-edge AI technologies, we
                  created a solution that not only addresses immediate operational challenges but
                  also establishes a foundation for future growth and innovation.
                </Text>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <Card elevation="subtle">
                    <CardBody>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        Challenge
                      </h3>
                      <Text variant="body" className="text-text-secondary">
                        The client faced significant challenges in processing and analyzing large
                        volumes of healthcare data, with manual processes taking weeks to complete
                        and creating bottlenecks in decision-making.
                      </Text>
                    </CardBody>
                  </Card>

                  <Card elevation="subtle">
                    <CardBody>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">Solution</h3>
                      <Text variant="body" className="text-text-secondary">
                        We developed an AI-powered analytics platform that processes data in
                        real-time, reduces analysis time by 95%, and ensures full compliance with
                        healthcare regulations.
                      </Text>
                    </CardBody>
                  </Card>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-text-primary mb-4">Key Results</h3>
                  <ul className="space-y-3">
                    {[
                      '95% reduction in data processing time',
                      '100% HIPAA compliance maintained',
                      'Real-time analytics capabilities enabled',
                      'Scalable architecture for future growth',
                    ].map((result, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold mt-2 flex-shrink-0" />
                        <Text variant="body" className="text-text-secondary">
                          {result}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

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
              Let's discuss how we can help you achieve similar results with AI-powered solutions.
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
