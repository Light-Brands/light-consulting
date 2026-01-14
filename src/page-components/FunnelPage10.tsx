/**
 * Funnel Page 10: AI Data Readiness
 * Light Brand Consulting
 *
 * Page Function: Data quality and AI-readiness assessment
 * - Target: 57% say data isn't AI-ready; 60% of projects fail due to data
 * - Hook: "Your AI Is Only as Smart as Your Data Lets It Be"
 * - Entry: Data Readiness Score
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage10Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage10: React.FC<FunnelPage10Props> = ({ onNavigate }) => {
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
                AI Data Readiness
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Your AI Is Only as Smart
              <span className="block text-radiance-gold mt-2 relative inline-block">
                As Your Data Lets It Be.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Gartner predicts 60% of AI projects will fail due to data issues.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                Don't be the 60%.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300 space-y-3">
              <p className="text-text-muted leading-relaxed">
                57% of companies say their data isn't AI-ready. They're building intelligent systems on unintelligent foundations.
              </p>
              <div className="pt-2">
                <p className="text-radiance-gold text-xl font-semibold">
                  You don't have an AI problem. You have a data problem.
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
                Start the AI Readiness Diagnostic
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              5-10 minutes · Strategic clarity · No commitment
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

      {/* The Data Problem Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Hidden Blocker
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Most AI Failures Aren't AI Failures.
              <span className="block text-radiance-amber mt-2">They're Data Failures.</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { stat: '60%', label: 'of AI projects fail due to data' },
                { stat: '57%', label: 'say data isn\'t AI-ready' },
                { stat: '80%', label: 'of AI time spent on data prep' },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm text-center">
                  <p className="text-3xl font-bold text-radiance-gold mb-2">{item.stat}</p>
                  <p className="text-text-muted text-sm">{item.label}</p>
                </div>
              ))}
            </div>

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
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Common_Data_Issues</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Siloed data across departments',
                    'Inconsistent data formats',
                    'Missing or incomplete records',
                    'No single source of truth',
                    'Legacy system limitations',
                    'Poor data governance',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-depth-elevated/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-amber flex-shrink-0"></div>
                      <span className="text-text-secondary text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Assess Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              Data Readiness Audit
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              We Assess Your Data Foundation
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              Comprehensive analysis across all critical dimensions
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Data Quality',
                  description: 'Accuracy, completeness, consistency, and timeliness of your data',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ),
                },
                {
                  title: 'Data Architecture',
                  description: 'How your data is structured, stored, and accessed across systems',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  ),
                },
                {
                  title: 'Data Governance',
                  description: 'Policies, ownership, security, and compliance frameworks',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
                {
                  title: 'Integration Capability',
                  description: 'Ability to connect data sources for unified AI training',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: 'Labeling & Training',
                  description: 'Readiness for supervised learning and model training',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  ),
                },
                {
                  title: 'Real-Time Capability',
                  description: 'Infrastructure for streaming and real-time AI applications',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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

      {/* This Is For Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="relative max-w-5xl mx-auto">
            {/* Subtle divider line */}
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-depth-border/50 to-transparent" />

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative z-10 items-start">
              {/* This is for */}
              <div className="space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-radiance-gold">This is for you if:</h3>
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                </div>

                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm flex-1 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-radiance-gold/20 rounded-l-2xl" />

                  <ul className="space-y-3.5 relative z-10">
                    {[
                      "Your AI initiatives are stalling and you don't know why",
                      "You suspect data quality is limiting your AI potential",
                      "You're planning major AI investments and want to derisk them",
                      "Your data exists in silos across multiple systems",
                      "You've heard 'garbage in, garbage out' and want to fix it",
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
                      "Companies with no data to analyze",
                      "Businesses not planning any AI initiatives",
                      "Organizations looking for data engineering services",
                      "Teams seeking generic data warehouse solutions",
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

      {/* The Process Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
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
              How It Works
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              From Data Chaos to AI-Ready
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            {[
              {
                step: 1,
                title: 'Data Readiness Score',
                text: 'Quick assessment to identify your current data health and AI-readiness level.',
                price: 'Free',
              },
              {
                step: 2,
                title: 'AI Data Readiness Audit',
                text: 'Comprehensive review of data quality, architecture, governance, and integration capabilities.',
                price: '$3,000-7,500',
              },
              {
                step: 3,
                title: 'Foundation Shift with Data Layer',
                text: 'Full data infrastructure redesign for AI-native operations.',
                price: 'Custom',
              }
            ].map((item, idx) => (
              <div key={item.step} className="relative group">
                {/* Connecting line */}
                {idx < 2 && (
                  <div className="absolute left-5 top-10 w-px h-6 bg-gradient-to-b from-radiance-gold/30 to-transparent" />
                )}

                <div className="flex items-start gap-4 p-6 bg-depth-surface/30 border border-depth-border rounded-2xl backdrop-blur-sm hover:border-radiance-gold/30 transition-all group-hover:scale-[1.02]">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold flex-shrink-0 font-mono shadow-[0_0_20px_rgba(232,184,74,0.2)] group-hover:shadow-[0_0_30px_rgba(232,184,74,0.4)] transition-shadow">
                      {item.step}
                    </div>
                    {/* Pulse ring on hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-radiance-gold/30 animate-ping opacity-0 group-hover:opacity-75" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-[8px] font-mono text-text-muted uppercase tracking-[0.2em]">PHASE_{item.step}</div>
                      <span className="text-radiance-gold text-xs font-medium">{item.price}</span>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="relative inline-block">
              {/* Decorative glow around heading */}
              <div className="absolute -inset-8 bg-radiance-gold/10 blur-3xl rounded-full" />

              <h2 className="text-3xl md:text-4xl font-bold text-text-primary relative z-10">
                Is your data ready for AI?
              </h2>
            </div>

            <p className="text-xl text-radiance-gold font-medium">
              AI-ready data isn't about volume. It's about structure.
            </p>

            <div className="pt-6 relative">
              {/* Button glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-radiance-gold/10 blur-3xl rounded-full animate-pulse" />
              </div>

              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-[0_0_30px_rgba(232,184,74,0.25)] hover:shadow-[0_0_50px_rgba(232,184,74,0.4)] transition-all duration-500 relative z-10"
              >
                Start the AI Readiness Diagnostic
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> 5-10 minutes <span className="opacity-40">·</span> Strategic clarity <span className="opacity-40">·</span> Zero commitment <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Final Positioning Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow">
          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <p className="text-lg text-text-secondary">
              Gartner: 60% of AI projects will fail due to data.
            </p>
            <p className="text-xl text-text-primary font-medium">
              Don't be the 60%.
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              Fix your data foundation before investing in AI.
            </p>
          </div>
        </Container>
      </section>

      {/* Closing Line */}
      <section className="py-12 bg-depth-base border-t border-depth-border relative overflow-hidden">
        {/* Subtle glow at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-radial-gradient from-radiance-gold/5 to-transparent blur-3xl pointer-events-none" />

        <Container size="narrow" className="text-center">
          <div className="relative z-10 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
            <p className="text-text-muted">
              <span className="text-radiance-gold font-medium">Light Brand</span> builds AI-ready data foundations
              that power intelligent systems.
            </p>
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
          </div>
        </Container>
      </section>
    </div>
  );
};
