/**
 * Project Detail Page
 * Light Brand Consulting
 *
 * Displays full project details including gallery, services, and case study
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui';
import { Button, Tag, BackButtonVisual, Card } from '@/components';
import { ClockIcon } from '@/components/Icons';
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
      <div className="min-h-screen pt-24 md:pt-32">
        <section className="section-spacing">
          <Container size="wide">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-depth-surface rounded w-48" />
              <div className="h-16 bg-depth-surface rounded w-3/4" />
              <div className="aspect-video bg-depth-surface rounded-2xl" />
            </div>
          </Container>
        </section>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 md:pt-32">
        <section className="section-spacing">
          <Container size="wide">
            <div className="text-center py-16">
              <h1 className="text-2xl text-text-primary mb-4">Project not found</h1>
              <Button variant="ghost" onClick={() => onNavigate('portfolio')}>
                Back to Portfolio
              </Button>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32">
        {/* Background Image */}
        {project.image_url && (
          <div className="absolute inset-0 z-0">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-depth-base/95 via-depth-base/85 to-depth-base" />
          </div>
        )}

        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient from-radiance-gold/4 to-transparent blur-[100px] pointer-events-none z-[1]" />

        {/* Bottom fade gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 14, 13, 0.5) 50%, rgba(15, 14, 13, 1) 100%)',
          }}
        />

        {/* Hero Content */}
        <Container size="wide" className="relative z-10 py-20 md:py-32">
          <BackButtonVisual
            label="Back to Portfolio"
            onClick={() => onNavigate('portfolio')}
          />

          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {project.featured && (
                <Tag variant="premium" className="backdrop-blur-sm">
                  Featured Project
                </Tag>
              )}
              {project.industry && (
                <Tag variant="default" className="backdrop-blur-sm">
                  {project.industry}
                </Tag>
              )}
              {project.project_type && (
                <span className="px-3 py-1 bg-depth-surface/50 text-text-muted text-xs rounded-full backdrop-blur-sm">
                  {project.project_type}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-text-secondary text-lg md:text-xl mb-8 leading-relaxed">
              {project.description}
            </p>

            {/* Project Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
              {project.client_name && (
                <div className="flex items-center gap-2 px-4 py-2 bg-depth-surface/30 border border-depth-border rounded-lg backdrop-blur-sm">
                  <span className="font-medium text-text-secondary">Client:</span>
                  <span className="text-text-muted">{project.client_name}</span>
                </div>
              )}
              {project.origin && (
                <div className="flex items-center gap-2 px-4 py-2 bg-depth-surface/30 border border-depth-border rounded-lg backdrop-blur-sm">
                  <span className="font-medium text-text-secondary">Region:</span>
                  <span className="text-text-muted">{project.origin}</span>
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2 bg-depth-surface/30 border border-depth-border rounded-lg backdrop-blur-sm text-text-muted">
                <ClockIcon size={16} />
                <span>
                  {new Date(project.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-depth-surface/50 text-text-secondary text-sm rounded-lg border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Live Site Button */}
            {project.case_study_url && (
              <div className="mt-8">
                <a
                  href={project.case_study_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-radiance-gold text-depth-base font-medium rounded-lg hover:bg-radiance-gold/90 transition-colors shadow-[0_0_20px_rgba(232,184,74,0.3)]"
                >
                  <span>View Live Site</span>
                  <ExternalLinkIcon size={16} />
                </a>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="section-spacing relative overflow-hidden">
          <Container size="wide">
            <div className="relative group">
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
            </div>
          </Container>
        </section>
      )}

      </section>

      {/* Project Details */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide" className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
              Project Overview
            </h2>

            <div className="space-y-8">
              <p className="text-text-secondary text-lg leading-relaxed">
                This project demonstrates our approach to transforming complex business operations
                through intelligent automation. By leveraging cutting-edge AI technologies, we
                created a solution that not only addresses immediate operational challenges but
                also establishes a foundation for future growth and innovation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-radiance-gold transition-colors">
                      Challenge
                    </h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    The client faced significant challenges in processing and analyzing large
                    volumes of healthcare data, with manual processes taking weeks to complete
                    and creating bottlenecks in decision-making.
                  </p>
                </Card>

                <Card elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-radiance-gold transition-colors">Solution</h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    We developed an AI-powered analytics platform that processes data in
                    real-time, reduces analysis time by 95%, and ensures full compliance with
                    healthcare regulations.
                  </p>
                </Card>
              </div>

              <div className="mt-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-radiance-gold/30 to-transparent" />
                  <h3 className="text-xl font-semibold text-text-primary">Key Results</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-radiance-gold/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    '95% reduction in data processing time',
                    '100% HIPAA compliance maintained',
                    'Real-time analytics capabilities enabled',
                    'Scalable architecture for future growth',
                  ].map((result, index) => (
                    <div key={index} className="group flex items-start gap-3 p-5 bg-depth-surface/30 border border-depth-border rounded-xl backdrop-blur-sm hover:border-radiance-gold/30 transition-all">
                      <div className="w-6 h-6 rounded-lg bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-radiance-gold/30 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-text-secondary leading-relaxed font-medium">
                        {result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow" className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Let's discuss how we can help you achieve similar results with AI-powered solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => onNavigate('book')}
                className="shadow-[0_0_30px_rgba(232,184,74,0.25)] hover:shadow-[0_0_50px_rgba(232,184,74,0.4)] transition-all duration-500"
              >
                Start Your Project
              </Button>
              <Button variant="ghost" size="lg" onClick={() => onNavigate('portfolio')}>
                View More Projects
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
