/**
 * Funnel Page 39: AI Maturity Assessment
 * Light Brand Consulting
 *
 * Page Function: Interactive assessment that segments visitors by AI maturity level
 * - Target: Any business leader curious about their AI readiness
 * - Hook: "What's Your AI Maturity Score?"
 * - Entry: Free assessment quiz with personalized recommendations
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage39Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage39: React.FC<FunnelPage39Props> = ({ onNavigate }) => {
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

        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient from-radiance-gold/4 to-transparent blur-[100px] pointer-events-none z-[1]" />

        {/* Hero Content */}
        <Container size="wide" className="relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="animate-fade-in">
              <Tag variant="premium" className="mx-auto backdrop-blur-sm">
                Free Assessment - 3 Minutes
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              What&apos;s Your
              <span className="block text-radiance-gold mt-2 relative inline-block">
                AI Maturity Score?
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Only 7% of companies are truly AI-ready.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                Where does your organization stand?
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300">
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  'Discover your current AI maturity level',
                  'Identify gaps holding you back',
                  'Get stage-specific recommendations',
                  'Benchmark against industry peers',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-slide-up delay-400">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination hover:shadow-[0_0_40px_rgba(232,184,74,0.35)] transition-shadow duration-500"
              >
                Take the Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              Free - No credit card required - Results in 3 minutes
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

      {/* The Maturity Levels */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The 5 Levels
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Where Does Your Organization Fall?
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Based on research from Gartner and MIT, organizations progress through distinct AI maturity stages
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="space-y-4">
              {[
                {
                  level: 1,
                  name: 'Awareness',
                  percentage: '28%',
                  description: 'Talking about AI, but no pilots or production use',
                  characteristics: ['Leadership curious about AI', 'No formal AI strategy', 'Relying on individual experiments'],
                  color: 'text-text-muted',
                  bgColor: 'bg-depth-border/30',
                },
                {
                  level: 2,
                  name: 'Active',
                  percentage: '35%',
                  description: 'Running POCs and pilots, building knowledge',
                  characteristics: ['Multiple pilot projects underway', 'Some dedicated budget', 'Still learning what works'],
                  color: 'text-radiance-amber',
                  bgColor: 'bg-radiance-amber/10',
                },
                {
                  level: 3,
                  name: 'Operational',
                  percentage: '20%',
                  description: 'At least one AI solution in production',
                  characteristics: ['Dedicated AI budget', 'Production workloads running', 'Starting to see ROI'],
                  color: 'text-radiance-gold',
                  bgColor: 'bg-radiance-gold/10',
                },
                {
                  level: 4,
                  name: 'Systemic',
                  percentage: '10%',
                  description: 'AI embedded in most new initiatives',
                  characteristics: ['AI-first approach to new projects', 'Embedded in products/services', 'Clear governance framework'],
                  color: 'text-radiance-gold',
                  bgColor: 'bg-radiance-gold/15',
                },
                {
                  level: 5,
                  name: 'Transformational',
                  percentage: '7%',
                  description: 'AI is core to business DNA and market position',
                  characteristics: ['AI powers competitive advantage', 'Selling AI-enabled services', 'Industry leader in AI adoption'],
                  color: 'text-radiance-gold',
                  bgColor: 'bg-radiance-gold/20',
                },
              ].map((stage, index) => (
                <div key={index} className={`p-6 rounded-2xl border border-depth-border backdrop-blur-sm ${stage.bgColor}`}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-depth-elevated flex items-center justify-center text-xl font-bold ${stage.color}`}>
                        {stage.level}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${stage.color}`}>{stage.name}</h3>
                        <p className="text-text-muted text-sm">{stage.percentage} of companies</p>
                      </div>
                    </div>
                    <div className="flex-1 md:ml-4">
                      <p className="text-text-secondary mb-2">{stage.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {stage.characteristics.map((char, idx) => (
                          <span key={idx} className="px-2 py-1 rounded-full bg-depth-elevated/50 text-text-muted text-xs">
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why It Matters */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              Why It Matters
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Maturity Level = Business Performance
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-text-muted" />
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Levels_1-2</span>
                </div>
                <p className="text-2xl font-bold text-text-muted mb-2">Below Average</p>
                <p className="text-text-secondary">Companies at Level 1-2 consistently underperform their industry peers financially</p>
              </div>
              <div className="p-6 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                  <span className="text-[10px] font-mono tracking-widest text-radiance-gold uppercase">Levels_3-5</span>
                </div>
                <p className="text-2xl font-bold text-radiance-gold mb-2">Above Average</p>
                <p className="text-text-secondary">Companies at Level 3+ consistently outperform their industry peers financially</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm text-center">
              <p className="text-text-primary text-lg mb-4">
                The key insight from MIT&apos;s research:
              </p>
              <p className="text-2xl font-bold text-radiance-gold">
                &ldquo;The gap between AI leaders and laggards is widening every quarter.&rdquo;
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What You Get */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Your Results
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What You&apos;ll Discover
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Your Maturity Score',
                  desc: 'Precise level based on 5-point scale used by leading analysts',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
                {
                  title: 'Gap Analysis',
                  desc: 'Specific areas holding you back from the next level',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Level-Up Roadmap',
                  desc: 'Actionable steps to advance to the next maturity stage',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  ),
                },
                {
                  title: 'Industry Benchmark',
                  desc: 'See how you compare to peers in your sector',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Quick Wins',
                  desc: 'Immediate opportunities based on your current state',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                },
                {
                  title: 'Resource Guide',
                  desc: 'Curated resources for your specific maturity level',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <Card key={index} elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all">
                  <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Ready to Discover Your AI Maturity Level?
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Take the free 3-minute assessment and get your personalized roadmap.
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
                Take the Assessment Now
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-text-muted text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>3 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>100% confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
