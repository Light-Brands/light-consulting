/**
 * Funnel Page 31: Business for Course Creators (Tier 3)
 * Light Brand Consulting
 *
 * Page Function: Modality-specific funnel for soulful course creators
 * - Target: Spiritual teachers, wellness educators, transformational course creators
 * - Hook: "Your Wisdom Deserves More Than a Udemy Course"
 * - Entry: Soulful Course Launch System ($3,000-$6,000)
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage31Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage31: React.FC<FunnelPage31Props> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGE_CONFIG.heroes.home.src}
            alt={IMAGE_CONFIG.heroes.home.alt}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-depth-base/90 via-depth-base/70 to-depth-base"></div>
        </div>

        {/* Single subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient from-radiance-gold/4 to-transparent blur-[100px] pointer-events-none z-[1]" />

        {/* Hero Content */}
        <Container size="wide" className="relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="animate-fade-in">
              <Tag variant="default" className="mx-auto backdrop-blur-sm">
                Business for Course Creators
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Your Wisdom Deserves More
              <span className="block text-radiance-gold mt-2 relative inline-block">
                Than a Udemy Course.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                97% of online courses never get completed.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                Because they&apos;re built for information transfer, not transformation.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300 space-y-3">
              <p className="text-text-muted leading-relaxed">
                You have teachings that change lives. But packaging them into a course that
                actually delivers transformation? That requires a different approach.
              </p>
              <div className="pt-2">
                <p className="text-radiance-gold text-xl font-semibold">
                  Create courses that transform, not just inform.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-slide-up delay-400">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination hover:shadow-[0_0_40px_rgba(232,184,74,0.35)] transition-shadow duration-500"
              >
                Build Your Transformational Course
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              High completion · Deep transformation · Premium pricing
            </p>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-text-muted/30 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Course Creator&apos;s Dilemma
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Most Courses Fail
              <span className="block text-radiance-amber mt-2">Because They&apos;re Built Wrong</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="p-8 rounded-2xl border border-depth-border bg-depth-surface/30 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-radiance-amber" />
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Course_Creator_Struggles</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Your course has great content but low completion rates',
                    'Students buy but don\'t engage or get results',
                    'Competing with $19 courses when your work is worth thousands',
                    'Launch fatigue from constant promotion without sustained sales',
                    'Testimonials are hard to get because transformation is hard to measure',
                    'You know your teaching changes lives but can\'t prove it at scale',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-depth-elevated/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-amber flex-shrink-0"></div>
                      <span className="text-text-secondary text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-text-muted" />
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Info_Course</span>
                </div>
                <p className="text-text-muted italic">&ldquo;Here&apos;s everything I know. Watch the videos and figure it out.&rdquo;</p>
              </div>
              <div className="p-6 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                  <span className="text-[10px] font-mono tracking-widest text-radiance-gold uppercase">Transformation_Course</span>
                </div>
                <p className="text-text-primary italic">&ldquo;Here&apos;s the journey. Each step builds on the last, and I&apos;m guiding you through.&rdquo;</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Help With Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              Soulful Course Launch System
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Build Courses That Actually Transform
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              From wisdom to scalable, premium course offerings
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Transformation Design',
                  description: 'Structure your course around the journey, not just the content',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                },
                {
                  title: 'Completion Architecture',
                  description: 'Design for high engagement and finish rates, not just enrollment',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Premium Positioning',
                  description: 'Price your transformation appropriately—not competing with info products',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Launch Strategy',
                  description: 'Sustainable launch models that don\'t require constant promotion',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                },
                {
                  title: 'Results Capture',
                  description: 'Systems to document and showcase student transformation',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
                {
                  title: 'Evergreen Model',
                  description: 'Build once, sell sustainably—without launch burnout',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <Card elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all h-full">
                    <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(232,184,74,0.2)] group-hover:shadow-[0_0_25px_rgba(232,184,74,0.3)] transition-shadow">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-radiance-gold transition-colors">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What You Get Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The System
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What You&apos;ll Build
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            {[
              {
                step: '1',
                title: 'Transformation Mapping',
                desc: 'Define the complete journey from where students start to where they\'ll end up',
              },
              {
                step: '2',
                title: 'Course Architecture',
                desc: 'Structure modules and lessons for maximum engagement and completion',
              },
              {
                step: '3',
                title: 'Premium Positioning',
                desc: 'Price and position your course as the premium transformation it is',
              },
              {
                step: '4',
                title: 'Sustainable Launch',
                desc: 'Build a launch model that works without constant promotion',
              },
            ].map((item, idx) => (
              <div key={item.step} className="relative group">
                {/* Connecting line */}
                {idx < 3 && (
                  <div className="absolute left-5 top-10 w-px h-6 bg-gradient-to-b from-radiance-gold/30 to-transparent" />
                )}

                <div className="flex items-start gap-4 p-6 bg-depth-surface/30 border border-depth-border rounded-2xl backdrop-blur-sm hover:border-radiance-gold/30 transition-all group-hover:scale-[1.02]">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold flex-shrink-0 font-mono shadow-[0_0_20px_rgba(232,184,74,0.2)] group-hover:shadow-[0_0_30px_rgba(232,184,74,0.4)] transition-shadow">
                      {item.step}
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-radiance-gold/30 animate-ping opacity-0 group-hover:opacity-75" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* This Is For Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-depth-border/50 to-transparent" />

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative z-10 items-start">
              {/* This is for */}
              <div className="space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-radiance-gold">This is for you if:</h3>
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                </div>

                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm flex-1 relative">
                  <ul className="space-y-3.5 relative z-10">
                    {[
                      'You have transformational teachings ready to scale',
                      'You want courses that actually get completed and create results',
                      'You\'re tired of competing with cheap info products',
                      'You believe your wisdom is worth premium pricing',
                      'You want sustainable income without constant launching',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* This is not for */}
              <div className="space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-text-muted">This is not for:</h3>
                  <span className="px-2 py-0.5 rounded-full border border-depth-border text-[8px] font-mono text-text-muted uppercase tracking-wider bg-depth-elevated">NOT_A_FIT</span>
                </div>

                <div className="p-6 rounded-2xl border-l-2 border-depth-border/30 bg-depth-surface/30 backdrop-blur-sm flex-1">
                  <ul className="space-y-3.5">
                    {[
                      'Those looking to create quick info products',
                      'Creators focused on volume over transformation',
                      'People who want to compete on price',
                      'Those unwilling to invest in quality course design',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="text-text-muted text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Investment Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Investment
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Soulful Course Launch System
            </h2>
          </div>

          <div className="max-w-xl mx-auto relative z-10">
            <div className="p-8 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm relative">
              <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-radiance-gold/20 text-radiance-gold text-[10px] font-mono uppercase tracking-wider">
                Complete System
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                <span className="text-[10px] font-mono tracking-widest text-radiance-gold uppercase">Launch_System</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">Soulful Course Launch System</h3>
              <p className="text-radiance-gold text-xl font-semibold mb-4">$3,000 - $6,000</p>
              <p className="text-text-secondary text-sm mb-6">8-12 week program to build and launch your transformational course</p>
              <ul className="space-y-3">
                {[
                  'Complete transformation mapping',
                  'Course architecture design',
                  'Premium pricing strategy',
                  'Launch plan development',
                  'Evergreen conversion system',
                  'Results capture framework',
                  'Ongoing launch support',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-text-secondary text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-radiance-gold"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="relative inline-block">
              <div className="absolute -inset-8 bg-radiance-gold/10 blur-3xl rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary relative z-10">
                Ready to build a course that transforms?
              </h2>
            </div>

            <p className="text-xl text-radiance-gold font-medium">
              Your wisdom deserves more than a course graveyard.
            </p>

            <div className="pt-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-radiance-gold/10 blur-3xl rounded-full animate-pulse" />
              </div>

              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-[0_0_30px_rgba(232,184,74,0.25)] hover:shadow-[0_0_50px_rgba(232,184,74,0.4)] transition-all duration-500 relative z-10"
              >
                Build Your Course System
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> High completion <span className="opacity-40">·</span> Deep transformation <span className="opacity-40">·</span> Premium pricing <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Final Positioning Section */}
      <section className="section-spacing bg-depth-base relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow">
          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <p className="text-lg text-text-secondary">
              97% of courses never get completed.
            </p>
            <p className="text-xl text-text-primary font-medium">
              Yours doesn&apos;t have to be one of them.
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              Build for transformation. Build for completion. Build for impact.
            </p>
          </div>
        </Container>
      </section>

      {/* Closing Line */}
      <section className="py-12 bg-depth-base border-t border-depth-border relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-radial-gradient from-radiance-gold/5 to-transparent blur-3xl pointer-events-none" />

        <Container size="narrow" className="text-center">
          <div className="relative z-10 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
            <p className="text-text-muted">
              <span className="text-radiance-gold font-medium">Light Brand</span> helps soulful course creators
              build transformational learning experiences.
            </p>
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
          </div>
        </Container>
      </section>
    </div>
  );
};
