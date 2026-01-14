'use client';

/**
 * Iboga Life Change - Before/After Case Study
 * Light Brand Consulting
 *
 * A compelling case study showcasing the transformation from traditional
 * web development (weeks) to AI-powered rapid development (1 day).
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui';
import { Button, Card } from '@/components';
import { motion } from 'framer-motion';

// Icon components
const ArrowLeftIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ClockIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ZapIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const HeartIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ExternalLinkIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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

export default function IbogaLifeChangeCaseStudy() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');

  return (
    <div className="min-h-screen bg-depth-base">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-wisdom-violet/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-depth-base to-transparent pointer-events-none z-[1]" />

        <Container size="wide" className="relative z-10 py-12 md:py-20">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={() => router.push('/portfolio')}
              className="inline-flex items-center gap-2 text-text-muted hover:text-radiance-gold transition-colors group"
            >
              <ArrowLeftIcon size={18} />
              <span className="group-hover:underline">Back to Portfolio</span>
            </button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-radiance-gold/10 border border-radiance-gold/30 rounded-full text-radiance-gold text-sm font-medium">
                <ZapIcon size={14} />
                AI Transformation Case Study
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            >
              From Weeks to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-radiance-gold to-radiance-amber">
                One Day
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed"
            >
              How we transformed Iboga Life Change's web presence from a weeks-long
              traditional build to a soul-filled, modern experience—completed in just 24 hours.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6 md:gap-12"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <ClockIcon size={24} className="text-red-400" />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Traditional Build</p>
                  <p className="text-2xl font-bold text-text-primary">Weeks</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-radiance-gold/10 flex items-center justify-center">
                  <ZapIcon size={24} className="text-radiance-gold" />
                </div>
                <div>
                  <p className="text-text-muted text-sm">AI-Powered Build</p>
                  <p className="text-2xl font-bold text-radiance-gold">1 Day</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-wisdom-violet/10 flex items-center justify-center">
                  <HeartIcon size={24} className="text-wisdom-violet" />
                </div>
                <div>
                  <p className="text-text-muted text-sm">Result</p>
                  <p className="text-2xl font-bold text-text-primary">10x Better</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* The Story Section */}
      <section className="section-spacing">
        <Container size="wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              The Story
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Jay Nzingo runs Iboga Life Change, a sacred healing practice offering transformative
              Iboga ceremonies. His mission deserved a digital presence that matched the depth and
              authenticity of his work. Here's what happened.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-12 pb-12 border-l-2 border-red-500/30"
            >
              <div className="absolute left-0 top-0 w-6 h-6 -translate-x-1/2 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>
              <div className="bg-depth-elevated border border-depth-border rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-red-500/10 text-red-400 text-sm font-medium rounded-full">
                    Before
                  </span>
                  <span className="text-text-muted text-sm">ibogalifechange.com</span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  The Traditional Approach
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  The original website was built using traditional development methods. While
                  functional, it took <strong className="text-text-primary">weeks to complete</strong> and
                  the result, while technically sound, felt disconnected from Jay's healing mission.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-depth-surface/50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <XIcon size={12} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">Long Development Time</p>
                      <p className="text-text-muted text-sm">Weeks of back-and-forth</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-depth-surface/50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <XIcon size={12} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">Generic Feel</p>
                      <p className="text-text-muted text-sm">Missing personal touch</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-depth-surface/50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <XIcon size={12} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">Clunky Interface</p>
                      <p className="text-text-muted text-sm">Dated user experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-depth-surface/50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <XIcon size={12} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">No Soul</p>
                      <p className="text-text-muted text-sm">Didn't capture the essence</p>
                    </div>
                  </div>
                </div>

                {/* Screenshot placeholder for before */}
                <div className="mt-6 relative aspect-video bg-depth-surface rounded-xl border border-depth-border overflow-hidden group">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted">
                    <Image
                      src="/images/case-studies/iboga-before.jpg"
                      alt="Iboga Life Change - Before (ibogalifechange.com)"
                      fill
                      className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="relative z-10 text-center p-4">
                      <p className="text-sm font-medium">ibogalifechange.com</p>
                      <p className="text-xs opacity-60">Traditional development approach</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-red-500/80 text-white text-xs font-medium rounded backdrop-blur-sm">
                    BEFORE
                  </div>
                </div>
              </div>
            </motion.div>

            {/* The Transformation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative pl-8 md:pl-12 pb-12 border-l-2 border-radiance-gold/30"
            >
              <div className="absolute left-0 top-0 w-6 h-6 -translate-x-1/2 rounded-full bg-radiance-gold/20 border-2 border-radiance-gold flex items-center justify-center">
                <ZapIcon size={12} className="text-radiance-gold" />
              </div>
              <div className="bg-gradient-to-br from-radiance-gold/5 to-transparent border border-radiance-gold/20 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-radiance-gold/10 text-radiance-gold text-sm font-medium rounded-full">
                    The AI Approach
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  24 Hours. Complete Transformation.
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Using our AI-powered development process, we rebuilt the entire digital experience
                  in just <strong className="text-radiance-gold">one day</strong>. But speed wasn't
                  the only improvement—the new site captures Jay's authentic voice and the sacred
                  nature of his healing work.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-radiance-gold/10 text-radiance-gold text-sm rounded-lg border border-radiance-gold/20">
                    Claude AI
                  </span>
                  <span className="px-3 py-1.5 bg-radiance-gold/10 text-radiance-gold text-sm rounded-lg border border-radiance-gold/20">
                    Next.js
                  </span>
                  <span className="px-3 py-1.5 bg-radiance-gold/10 text-radiance-gold text-sm rounded-lg border border-radiance-gold/20">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-1.5 bg-radiance-gold/10 text-radiance-gold text-sm rounded-lg border border-radiance-gold/20">
                    Framer Motion
                  </span>
                </div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative pl-8 md:pl-12 border-l-2 border-green-500/30"
            >
              <div className="absolute left-0 top-0 w-6 h-6 -translate-x-1/2 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                <CheckIcon size={12} className="text-green-500" />
              </div>
              <div className="bg-depth-elevated border border-depth-border rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded-full">
                    After
                  </span>
                  <span className="text-text-muted text-sm">ibogalifechange.ca</span>
                  <a
                    href="https://www.ibogalifechange.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 text-radiance-gold hover:underline text-sm"
                  >
                    Visit Live Site <ExternalLinkIcon size={14} />
                  </a>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  A Site with Soul
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  The new website isn't just faster to build—it's fundamentally better. Modern,
                  responsive, and most importantly, it <strong className="text-text-primary">captures
                  the heart and soul</strong> of Jay's sacred healing practice.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-depth-surface/50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={12} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">Built in 1 Day</p>
                      <p className="text-text-muted text-sm">From concept to launch</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-depth-surface/50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={12} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">Modern Design</p>
                      <p className="text-text-muted text-sm">Clean, contemporary aesthetic</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-depth-surface/50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={12} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">Authentic Voice</p>
                      <p className="text-text-muted text-sm">True to Jay's mission</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-depth-surface/50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={12} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">10x Better Result</p>
                      <p className="text-text-muted text-sm">Quality that inspires</p>
                    </div>
                  </div>
                </div>

                {/* Screenshot placeholder for after */}
                <div className="mt-6 relative aspect-video bg-depth-surface rounded-xl border border-green-500/20 overflow-hidden group">
                  <Image
                    src="/images/case-studies/iboga-after.jpg"
                    alt="Iboga Life Change - After (ibogalifechange.ca)"
                    fill
                    className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted">
                    <div className="relative z-10 text-center p-4">
                      <p className="text-sm font-medium">ibogalifechange.ca</p>
                      <p className="text-xs opacity-60">AI-powered development</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-green-500/80 text-white text-xs font-medium rounded backdrop-blur-sm">
                    AFTER
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Comparison Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Side by Side Comparison
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Same business. Same mission. Dramatically different results.
            </p>
          </motion.div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-depth-surface rounded-xl border border-depth-border">
              <button
                onClick={() => setActiveTab('before')}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'before'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                Before (.com)
              </button>
              <button
                onClick={() => setActiveTab('after')}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'after'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                After (.ca)
              </button>
            </div>
          </div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-depth-surface/50 rounded-2xl border border-depth-border overflow-hidden">
              <div className="grid grid-cols-3 gap-4 p-4 md:p-6 border-b border-depth-border bg-depth-elevated/50">
                <div className="font-medium text-text-primary">Metric</div>
                <div className="font-medium text-red-400 text-center">Traditional</div>
                <div className="font-medium text-green-400 text-center">AI-Powered</div>
              </div>

              {[
                { metric: 'Development Time', before: 'Weeks', after: '1 Day' },
                { metric: 'Design Quality', before: 'Functional', after: 'Exceptional' },
                { metric: 'Brand Alignment', before: 'Generic', after: 'Authentic' },
                { metric: 'User Experience', before: 'Clunky', after: 'Seamless' },
                { metric: 'Emotional Impact', before: 'Minimal', after: 'Powerful' },
                { metric: 'Mobile Responsive', before: 'Basic', after: 'Fully Optimized' },
                { metric: 'Performance', before: 'Standard', after: 'Lightning Fast' },
                { metric: 'SEO Ready', before: 'Limited', after: 'Fully Optimized' },
              ].map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-4 p-4 md:p-6 ${
                    index !== 7 ? 'border-b border-depth-border' : ''
                  }`}
                >
                  <div className="text-text-secondary">{row.metric}</div>
                  <div className="text-center text-red-400/80">{row.before}</div>
                  <div className="text-center text-green-400 font-medium">{row.after}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Quote Section */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient from-radiance-gold/5 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-6xl md:text-8xl text-radiance-gold/20 font-serif mb-4">"</div>
            <blockquote className="text-2xl md:text-3xl text-text-primary font-medium leading-relaxed mb-6">
              The original site was good—full respect to the developer—but it didn't have heart or soul.
              With AI, we created something that truly represents who I am and what I do.
            </blockquote>
            <p className="text-text-muted">
              — Jay Nzingo, Iboga Life Change
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Key Takeaways */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Key Takeaways
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              What this transformation teaches us about AI-powered development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <ZapIcon size={28} />,
                title: 'Speed Without Compromise',
                description: 'AI doesn\'t just make development faster—it enables rapid iteration and refinement until the result is perfect.',
              },
              {
                icon: <HeartIcon size={28} />,
                title: 'Authenticity at Scale',
                description: 'AI-assisted development can capture brand voice and emotional resonance better than template-based approaches.',
              },
              {
                icon: <CheckIcon size={28} />,
                title: 'Quality is the Default',
                description: 'When AI handles the technical heavy lifting, more focus goes to what matters: the user experience and brand story.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-depth-surface/50 border border-depth-border rounded-2xl p-6 hover:border-radiance-gold/30 transition-colors group"
              >
                <div className="w-14 h-14 rounded-xl bg-radiance-gold/10 flex items-center justify-center text-radiance-gold mb-4 group-hover:bg-radiance-gold/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-radiance-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {item.description}
                </p>
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
              Ready for Your Transformation?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
              Your business deserves a digital presence that captures who you truly are.
              Let's build it together—faster than you ever thought possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/book')}
                className="shadow-[0_0_30px_rgba(232,184,74,0.25)] hover:shadow-[0_0_50px_rgba(232,184,74,0.4)] transition-all duration-500"
              >
                Start Your Project
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => router.push('/portfolio')}
              >
                View More Case Studies
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
