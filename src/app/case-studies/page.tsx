'use client';

/**
 * Case Studies Index Page
 * Light Brand Consulting
 *
 * Lists all featured case studies showcasing AI transformation stories.
 */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui';
import { Button } from '@/components';
import { motion } from 'framer-motion';

// Icon components
const ArrowRightIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ZapIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Case studies data
const caseStudies = [
  {
    slug: 'iboga-life-change',
    title: 'From Weeks to One Day',
    subtitle: 'Iboga Life Change',
    description: 'How AI-powered development transformed a healing practice\'s digital presence—completing in 24 hours what traditionally took weeks.',
    metrics: [
      { label: 'Development Time', before: 'Weeks', after: '1 Day' },
      { label: 'Result', value: '10x Better' },
    ],
    tags: ['Healthcare & Wellness', 'AI Development', 'Rapid Transformation'],
    featured: true,
  },
];

export default function CaseStudiesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-depth-base">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-wisdom-violet/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="wide" className="relative z-10 py-12 md:py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-radiance-gold/10 border border-radiance-gold/30 rounded-full text-radiance-gold text-sm font-medium">
                <ZapIcon size={14} />
                AI Transformation Stories
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            >
              Case Studies
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-xl text-text-secondary leading-relaxed"
            >
              Real transformations. Real results. See how AI-powered development
              is changing what's possible for businesses like yours.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Case Studies Grid */}
      <section className="section-spacing">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/case-studies/${study.slug}`}>
                  <div className="group relative bg-depth-elevated border border-depth-border rounded-2xl p-6 md:p-8 hover:border-radiance-gold/30 transition-all duration-300 overflow-hidden">
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                          {study.featured && (
                            <span className="inline-block px-3 py-1 bg-radiance-gold/10 text-radiance-gold text-xs font-medium rounded-full mb-3">
                              Featured
                            </span>
                          )}
                          <h2 className="text-2xl md:text-3xl font-bold text-text-primary group-hover:text-radiance-gold transition-colors mb-2">
                            {study.title}
                          </h2>
                          <p className="text-text-muted">{study.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2 text-radiance-gold opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm font-medium">Read Case Study</span>
                          <ArrowRightIcon size={18} />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                        {study.description}
                      </p>

                      {/* Metrics */}
                      <div className="flex flex-wrap gap-4 md:gap-8 mb-6">
                        {study.metrics.map((metric, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-radiance-gold/10 flex items-center justify-center">
                              <ZapIcon size={18} className="text-radiance-gold" />
                            </div>
                            <div>
                              <p className="text-text-muted text-xs">{metric.label}</p>
                              {metric.before && metric.after ? (
                                <p className="text-text-primary font-semibold">
                                  <span className="text-red-400 line-through opacity-60">{metric.before}</span>
                                  {' → '}
                                  <span className="text-green-400">{metric.after}</span>
                                </p>
                              ) : (
                                <p className="text-text-primary font-semibold">{metric.value}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-depth-surface/50 text-text-muted text-sm rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-radiance-gold/5 to-transparent" />

        <Container size="narrow" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Your Story Could Be Next
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
              Every transformation starts with a conversation. Let's explore how AI
              can accelerate your business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/book')}
                className="shadow-[0_0_30px_rgba(232,184,74,0.25)] hover:shadow-[0_0_50px_rgba(232,184,74,0.4)] transition-all duration-500"
              >
                Start Your Transformation
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => router.push('/portfolio')}
              >
                View All Projects
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
