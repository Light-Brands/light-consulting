/**
 * Funnel Page 40: The CEO's AI Playbook
 * Light Brand Consulting
 *
 * Page Function: Role-specific funnel targeting CEOs
 * - Target: CEOs and founders who need to lead AI strategy
 * - Hook: "The CEO's Guide to AI That Actually Moves the Needle"
 * - Entry: Executive AI Strategy Session
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage40Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage40: React.FC<FunnelPage40Props> = ({ onNavigate }) => {
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
                For CEOs and Founders
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              The CEO&apos;s Guide to AI
              <span className="block text-radiance-gold mt-2 relative inline-block">
                That Actually Moves the Needle
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Your board is asking about AI. Your competitors are moving. Your team has questions.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                It&apos;s time to lead AI strategy - not delegate it.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300">
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  'Strategic AI positioning vs competitors',
                  'Board-ready AI narrative and metrics',
                  'High-ROI opportunities in your business',
                  'Governance framework that protects you',
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
                Book Executive Strategy Session
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              45-minute strategic briefing - Leave with a clear direction
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

      {/* The CEO's Dilemma */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Challenge
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              The CEO&apos;s AI Dilemma
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="p-8 rounded-2xl border border-depth-border bg-depth-surface/30 backdrop-blur-sm mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-radiance-amber">What you&apos;re hearing:</h3>
                  {[
                    '"We need an AI strategy"',
                    '"Our competitors are using AI"',
                    '"The board wants to know our AI plan"',
                    '"We should be doing more with AI"',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-depth-elevated/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-amber flex-shrink-0"></div>
                      <span className="text-text-secondary text-sm italic">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-text-muted">What you&apos;re thinking:</h3>
                  {[
                    '"I don\'t know what\'s hype vs reality"',
                    '"How do I evaluate AI investments?"',
                    '"What should I actually prioritize?"',
                    '"How do I lead this without getting burned?"',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-depth-elevated/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted flex-shrink-0"></div>
                      <span className="text-text-muted text-sm italic">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { stat: '22.8%', label: 'of AI decisions are made by CEOs', context: 'You\'re expected to lead this' },
                { stat: '44%', label: 'of boards now require AI expertise', context: 'Governance is essential' },
                { stat: '$3.70', label: 'ROI per dollar when done right', context: 'The opportunity is real' },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm text-center">
                  <p className="text-3xl font-bold text-radiance-gold mb-2">{item.stat}</p>
                  <p className="text-text-secondary text-sm mb-2">{item.label}</p>
                  <p className="text-text-muted text-xs">{item.context}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What CEOs Need to Know */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Framework
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              The 4 Pillars of CEO AI Leadership
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              What separates AI leaders from those watching from the sidelines
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  pillar: 'Strategic Vision',
                  title: 'AI as Competitive Moat',
                  points: [
                    'Where AI creates unfair advantages in your market',
                    'What competitors are actually doing (vs. PR)',
                    'Which opportunities have the highest strategic value',
                  ],
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
                {
                  pillar: 'Board Narrative',
                  title: 'Confident AI Communication',
                  points: [
                    'How to discuss AI strategy with confidence',
                    'Metrics that matter vs. vanity metrics',
                    'Risk framework that satisfies governance',
                  ],
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  ),
                },
                {
                  pillar: 'Investment Framework',
                  title: 'Smart AI Capital Allocation',
                  points: [
                    'How to evaluate AI investments vs. hype',
                    'Build vs. buy decisions that make sense',
                    'ROI timelines that are actually realistic',
                  ],
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  pillar: 'Governance',
                  title: 'Risk-Aware AI Deployment',
                  points: [
                    'Governance framework that protects the business',
                    'Regulatory landscape and what matters',
                    'Shadow AI risks you need to address now',
                  ],
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <Card key={index} elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-radiance-gold text-xs uppercase tracking-wider font-mono mb-1">{item.pillar}</p>
                      <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-text-secondary text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-radiance-gold/50 mt-2 flex-shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* The Session */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Offer
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Executive AI Strategy Session
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              45 minutes that will reshape how you think about AI
            </p>
          </div>

          <div className="max-w-xl mx-auto relative z-10">
            <div className="p-8 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                <span className="text-[10px] font-mono tracking-widest text-radiance-gold uppercase">What_You_Get</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Competitive analysis: What peers are actually doing with AI',
                  'Opportunity mapping: Highest-ROI AI applications for your business',
                  'Investment framework: How to evaluate AI spend',
                  'Board-ready narrative: How to communicate AI strategy',
                  'Risk assessment: Governance gaps to address',
                  '90-day action plan: Clear next steps',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-text-secondary">
                    <div className="w-5 h-5 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('book')}
                className="w-full shadow-illumination"
              >
                Book Your Strategy Session
              </Button>
              <p className="text-text-muted text-xs text-center mt-4">
                Limited to 4 sessions per week - Founders and CEOs only
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* This is for / not for */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-radiance-gold">This is for you if:</h3>
                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm">
                  <ul className="space-y-3">
                    {[
                      'You\'re a CEO or founder of a 7-8 figure business',
                      'Your board or investors are asking about AI',
                      'You need to lead AI strategy, not just approve it',
                      'You want to cut through the hype and get real answers',
                      'You\'re ready to make AI a strategic priority',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-text-secondary text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-text-muted">This is not for:</h3>
                <div className="p-6 rounded-2xl border-l-2 border-depth-border/30 bg-depth-surface/30 backdrop-blur-sm">
                  <ul className="space-y-3">
                    {[
                      'Executives looking for tactical implementation help',
                      'Companies not yet at product-market fit',
                      'Those who want to delegate AI entirely to IT',
                      'Leaders not ready to invest in AI infrastructure',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="text-text-muted text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
              Ready to Lead AI Strategy with Confidence?
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Get the strategic clarity you need to make AI decisions that move the needle.
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
                Book Executive Strategy Session
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> 45 minutes <span className="opacity-40">+</span> Strategic clarity <span className="opacity-40">+</span> Clear action plan <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};
