/**
 * AI Readiness Diagnostic Page
 * Light Brand Consulting
 *
 * Diagnostic Page Function: Sell clarity, not commitment
 * - Neutral positioning
 * - Honest about outcomes
 * - Non-salesy, decision-oriented
 * - "This may or may not lead to further work"
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { TESTIMONIALS, IMAGE_CONFIG, FIT_CRITERIA } from '../lib/constants';

interface FunnelPageProps {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage: React.FC<FunnelPageProps> = ({ onNavigate }) => {
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

        {/* Hero Content */}
        <Container size="wide" className="relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Tag variant="outline" className="mx-auto">
              AI Readiness Diagnostic
            </Tag>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              Discover how prepared your business
              <span className="block text-radiance-gold mt-2">
                really is for the AI decade
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Most businesses think they're "using AI."
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                Very few are actually built for it.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto">
              <p className="text-text-muted">
                AI is no longer a productivity tool. It's becoming the operating layer of modern businesses.
              </p>
              <p className="text-text-secondary mt-4 text-lg">
                This diagnostic exists to answer one question:
              </p>
              <p className="text-radiance-gold mt-2 text-xl font-semibold">
                Is your business structured to benefit from AI, or be disrupted by it?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Start the AI Readiness Diagnostic
              </Button>
            </div>

            <p className="text-text-muted text-sm">
              5–10 minutes · No fluff · No sales pitch
            </p>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-radiance-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Why This Exists Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-16">
            <Tag variant="outline" className="mx-auto mb-6">
              Why This Exists
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              AI doesn't fail businesses.
              <span className="block text-radiance-amber mt-2">Broken systems do.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-text-secondary">
            <p>Most founders are:</p>

            <div className="space-y-3 pl-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                <p>experimenting with tools</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                <p>automating isolated tasks</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                <p>adding AI on top of outdated workflows</p>
              </div>
            </div>

            <p className="text-radiance-amber font-medium pt-4">
              That creates motion, not leverage.
            </p>

            <Card elevation="elevated" className="p-8 mt-8">
              <p className="text-text-primary font-medium text-xl mb-4">
                This diagnostic helps you see:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-radiance-gold mt-2 flex-shrink-0"></div>
                  <p>where your business actually stands</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-radiance-gold mt-2 flex-shrink-0"></div>
                  <p>where AI can create real compounding advantage</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-radiance-gold mt-2 flex-shrink-0"></div>
                  <p>what not to waste time building</p>
                </div>
              </div>
              <p className="text-text-muted mt-6 italic">
                Clarity first. Decisions second.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* What This Is / What This Isn't Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card elevation="elevated" className="p-8 border border-radiance-gold/30">
              <h3 className="text-xl font-bold text-radiance-gold mb-6">What this is:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-text-secondary">A strategic snapshot of your AI readiness</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-text-secondary">A clear signal of where leverage is hiding</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-text-secondary">A starting point for intelligent system design</span>
                </li>
              </ul>
            </Card>

            <Card elevation="subtle" className="p-8 border border-depth-border">
              <h3 className="text-xl font-bold text-text-muted mb-6">What this is not:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-text-muted">A personality quiz</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-text-muted">A list of tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-text-muted">A generic "AI assessment"</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-text-muted">A disguised sales funnel</span>
                </li>
              </ul>
            </Card>
          </div>

          <div className="max-w-2xl mx-auto text-center mt-12">
            <p className="text-text-secondary text-lg">
              If there's a meaningful opportunity to move forward, we'll tell you.
            </p>
            <p className="text-text-primary font-medium mt-2">
              If there isn't, we'll tell you that too.
            </p>
          </div>
        </Container>
      </section>

      {/* The Frame Section */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              The Frame
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Every business sits somewhere on the AI readiness curve
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                { level: 1, label: 'Experimenting with tools', color: 'text-text-muted', bg: 'bg-depth-surface' },
                { level: 2, label: 'Automating tasks', color: 'text-text-muted', bg: 'bg-depth-surface' },
                { level: 3, label: 'Systematizing workflows', color: 'text-text-secondary', bg: 'bg-depth-surface' },
                { level: 4, label: 'Owning business intelligence', color: 'text-radiance-gold', bg: 'bg-radiance-gold/10' },
              ].map((item) => (
                <div key={item.level} className={`flex items-center gap-4 p-4 rounded-lg ${item.bg}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    item.level === 4
                      ? 'bg-radiance-gold/20 text-radiance-gold'
                      : 'bg-depth-border text-text-muted'
                  }`}>
                    {item.level}
                  </div>
                  <span className={`text-lg ${item.color}`}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-depth-elevated rounded-lg border border-depth-border text-center">
              <p className="text-text-secondary text-lg mb-4">
                Most companies believe they're further along than they are.
              </p>
              <p className="text-radiance-gold font-medium text-lg">
                This diagnostic reveals the truth: no hype, no pressure, no technical jargon.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What You'll Walk Away With Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="outline" className="mx-auto mb-6">
              What You'll Walk Away With
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              After completing the diagnostic, you'll receive:
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card elevation="elevated" className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Your AI Readiness Level</h3>
              <p className="text-text-secondary text-sm">
                A clear view of how prepared your business actually is.
              </p>
            </Card>

            <Card elevation="elevated" className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">A Leverage Snapshot</h3>
              <p className="text-text-secondary text-sm">
                Where effort is leaking, and where structure would compound results.
              </p>
            </Card>

            <Card elevation="elevated" className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Your Next Strategic Move</h3>
              <p className="text-text-secondary text-sm">
                What matters now, and what can safely be ignored.
              </p>
            </Card>
          </div>

          <p className="text-center text-text-muted mt-8">
            If it makes sense, we'll also let you know whether deeper system work is worth exploring.
          </p>
        </Container>
      </section>

      {/* Who This Is For Section */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              Who This Is For
            </Tag>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card elevation="elevated" className="p-8">
              <h3 className="text-xl font-bold text-radiance-gold mb-6">This diagnostic is for founders who:</h3>
              <ul className="space-y-4">
                {FIT_CRITERIA.idealClients.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card elevation="subtle" className="p-8">
              <h3 className="text-xl font-bold text-text-muted mb-6">This is not for:</h3>
              <ul className="space-y-4">
                {FIT_CRITERIA.notAFit.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="outline" className="mx-auto mb-6">
              How It Works
            </Tag>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-text-primary font-medium">Answer a short set of focused questions</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-text-primary font-medium">We analyze your responses through our AI readiness framework</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-text-primary font-medium">You receive a clear snapshot of where you stand, and why</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-text-muted">No obligation. No pressure. Just clarity.</p>
          </div>
        </Container>
      </section>

      {/* Social Proof Section */}
      {TESTIMONIALS[0] && (
        <section className="section-spacing">
          <Container size="narrow">
            <div className="max-w-3xl mx-auto">
              <Card elevation="elevated" className="p-10 md:p-12 bg-gradient-to-br from-depth-elevated to-depth-surface border border-radiance-gold/30">
                <div className="space-y-8">
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-radiance-gold fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-text-primary leading-relaxed text-center font-medium">
                    "{TESTIMONIALS[0].quote}"
                  </blockquote>

                  <div className="flex flex-col items-center gap-4 pt-6">
                    {TESTIMONIALS[0].avatar && (
                      <img
                        src={TESTIMONIALS[0].avatar}
                        alt={TESTIMONIALS[0].author}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-radiance-gold/30"
                      />
                    )}
                    <div className="text-center">
                      <p className="font-bold text-lg text-text-primary">{TESTIMONIALS[0].author}</p>
                      <p className="text-text-muted">{TESTIMONIALS[0].role}</p>
                      {TESTIMONIALS[0].company && (
                        <p className="text-text-muted">{TESTIMONIALS[0].company}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Ready to see where you actually stand?
            </h2>

            <p className="text-xl text-radiance-gold font-medium">
              One honest assessment can save you years of building the wrong thing.
            </p>

            <div className="pt-6">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Start the AI Readiness Diagnostic
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing Line */}
      <section className="py-12 bg-depth-base border-t border-depth-border">
        <Container size="narrow" className="text-center">
          <p className="text-text-muted">
            <span className="text-radiance-gold">Light Brand</span> designs intelligence systems
            so businesses don't just use AI, they're built for it.
          </p>
        </Container>
      </section>
    </div>
  );
};
