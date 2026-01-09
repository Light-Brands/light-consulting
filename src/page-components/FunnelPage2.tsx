/**
 * Funnel Page 2: Web2 to AI-Native Transformation
 * Light Brand Consulting
 *
 * Page Function: Help clients understand the foundational shift
 * - From traditional website (Web2) to AI intelligence system
 * - Not an upgrade—a complete transformation of the foundation
 * - Everything built next becomes possible when the foundation changes
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage2Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage2: React.FC<FunnelPage2Props> = ({ onNavigate }) => {
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
              The Foundation Shift
            </Tag>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              Your website isn't holding you back.
              <span className="block text-radiance-gold mt-2">
                Your foundation is.
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Most businesses are building on Web2.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                We move you to AI-native.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto">
              <p className="text-text-muted">
                This isn't about redesigning your website or adding features.
              </p>
              <p className="text-radiance-gold mt-4 text-xl font-semibold">
                It's about transforming the foundation your entire online business is built on.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Explore the Transformation
              </Button>
            </div>

            <p className="text-text-muted text-sm">
              Understand what's possible when your foundation changes
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

      {/* The Problem Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-16">
            <Tag variant="outline" className="mx-auto mb-6">
              The Real Issue
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Everything you build
              <span className="block text-radiance-amber mt-2">depends on your foundation.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-text-secondary">
            <p>Most businesses today are operating on a traditional website foundation.</p>

            <p>Their website is the base of their online presence—and everything else they try to build depends on that foundation.</p>

            <Card elevation="elevated" className="p-8 mt-8 border border-depth-border">
              <p className="text-text-primary font-medium text-xl mb-4">
                If the foundation is limited, everything built on top of it is limited.
              </p>
              <div className="space-y-3 text-text-secondary">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                  <p>Automation hits walls</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                  <p>Personalization stays surface-level</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                  <p>Workflows remain manual</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                  <p>Every new feature requires workarounds</p>
                </div>
              </div>
            </Card>

            <p className="text-radiance-amber font-medium pt-4 text-center">
              The problem isn't your website. It's what your website is built on.
            </p>
          </div>
        </Container>
      </section>

      {/* The Shift Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              The Shift
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              This is not a website upgrade.
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              This is a complete transformation of your foundation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Web2 Foundation */}
              <Card elevation="subtle" className="p-8 border border-depth-border">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-depth-surface text-text-muted flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-muted">Web2 Foundation</h3>
                  <p className="text-text-muted text-sm mt-1">Traditional Website</p>
                </div>
                <ul className="space-y-3 text-text-muted">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-depth-border mt-2 flex-shrink-0"></div>
                    <span>Static pages and content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-depth-border mt-2 flex-shrink-0"></div>
                    <span>Plugin-based functionality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-depth-border mt-2 flex-shrink-0"></div>
                    <span>Manual workflows</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-depth-border mt-2 flex-shrink-0"></div>
                    <span>Limited by the platform</span>
                  </li>
                </ul>
              </Card>

              {/* AI-Native Foundation */}
              <Card elevation="elevated" className="p-8 border border-radiance-gold/30">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-radiance-gold">AI-Native Foundation</h3>
                  <p className="text-text-secondary text-sm mt-1">Intelligence System</p>
                </div>
                <ul className="space-y-3 text-text-secondary">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-radiance-gold mt-2 flex-shrink-0"></div>
                    <span>Dynamic, intelligent responses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-radiance-gold mt-2 flex-shrink-0"></div>
                    <span>Built-in intelligence layer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-radiance-gold mt-2 flex-shrink-0"></div>
                    <span>Automated workflows</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-radiance-gold mt-2 flex-shrink-0"></div>
                    <span>Unlimited by design</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-text-secondary text-lg">
                We move your business from a <span className="text-text-muted">static website</span>
              </p>
              <p className="text-text-primary font-medium text-lg mt-2">
                to an <span className="text-radiance-gold">AI intelligence layer</span> built on OpenAI.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What This Means Section */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="outline" className="mx-auto mb-6">
              What This Means
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              When the foundation changes,
              <span className="block text-radiance-gold mt-2">everything becomes possible.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-text-secondary text-center mb-10">
              With an AI intelligence system as your foundation, you can build:
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Automation',
                  description: 'Workflows that run themselves, learn, and improve',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                },
                {
                  title: 'Personalization',
                  description: 'Experiences that adapt to each user in real-time',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ),
                },
                {
                  title: 'Intelligent Workflows',
                  description: 'Processes that think, decide, and act on your behalf',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                },
                {
                  title: 'AI-Driven Products',
                  description: 'Offerings powered by intelligence, not just code',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                },
                {
                  title: 'Future Technologies',
                  description: 'Ready to integrate whatever comes next',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                },
                {
                  title: 'Business Intelligence',
                  description: 'Insights that compound and inform decisions',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <Card key={index} elevation="elevated" className="p-6">
                  <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What This Is Not Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              Be Clear
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              This is not about redesign, plugins, or features.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card elevation="subtle" className="p-8 border border-depth-border">
              <h3 className="text-xl font-bold text-text-muted mb-6">What this is NOT:</h3>
              <ul className="space-y-4">
                {[
                  'A website redesign',
                  'Adding AI plugins',
                  'New features on old foundation',
                  'A chatbot on your homepage',
                  'Incremental improvements',
                ].map((item, index) => (
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

            <Card elevation="elevated" className="p-8 border border-radiance-gold/30">
              <h3 className="text-xl font-bold text-radiance-gold mb-6">What this IS:</h3>
              <ul className="space-y-4">
                {[
                  'A total transformation of your foundation',
                  'Moving from Web2 to AI-native',
                  'Building on an intelligence layer',
                  'Future-proofing your entire business',
                  'Unlocking what was impossible before',
                ].map((item, index) => (
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
          </div>

          <div className="max-w-2xl mx-auto text-center mt-12">
            <p className="text-xl text-radiance-gold font-semibold">
              Everything you imagine building next becomes possible
            </p>
            <p className="text-text-secondary mt-2 text-lg">
              because the foundation has changed.
            </p>
          </div>
        </Container>
      </section>

      {/* The Transformation Visual */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="outline" className="mx-auto mb-6">
              The Transformation
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              From limited to limitless
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Transformation Steps */}
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 rounded-lg bg-depth-surface">
                <div className="w-14 h-14 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-secondary">Traditional Website</h3>
                  <p className="text-text-muted">Your online presence is a static foundation</p>
                </div>
              </div>

              <div className="flex justify-center">
                <svg className="w-6 h-12 text-radiance-gold" fill="none" viewBox="0 0 24 48" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v40m0 0l-6-6m6 6l6-6" />
                </svg>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-lg bg-depth-surface">
                <div className="w-14 h-14 rounded-full bg-radiance-gold/20 text-radiance-amber flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-radiance-amber">The Transformation</h3>
                  <p className="text-text-secondary">We rebuild your foundation on AI infrastructure</p>
                </div>
              </div>

              <div className="flex justify-center">
                <svg className="w-6 h-12 text-radiance-gold" fill="none" viewBox="0 0 24 48" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v40m0 0l-6-6m6 6l6-6" />
                </svg>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-lg bg-radiance-gold/10 border border-radiance-gold/30">
                <div className="w-14 h-14 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-radiance-gold">AI-Native Business</h3>
                  <p className="text-text-primary">Everything you build is now powered by intelligence</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-depth-elevated rounded-lg border border-depth-border text-center">
              <p className="text-text-secondary text-lg mb-4">
                Your business is no longer constrained by traditional website limitations.
              </p>
              <p className="text-radiance-gold font-medium text-lg">
                The foundation has changed. Build whatever you imagine.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Who This Is For Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              Who This Is For
            </Tag>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card elevation="elevated" className="p-8">
              <h3 className="text-xl font-bold text-radiance-gold mb-6">This transformation is for businesses who:</h3>
              <ul className="space-y-4">
                {[
                  'Feel limited by their current website',
                  'Know AI will reshape their industry',
                  'Want to build intelligent products and services',
                  'Are ready to invest in their foundation',
                  'Think long-term, not quick fixes',
                ].map((item, index) => (
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
              <h3 className="text-xl font-bold text-text-muted mb-6">This is NOT for:</h3>
              <ul className="space-y-4">
                {[
                  'Those looking for a quick website refresh',
                  'Businesses wanting to "add AI" superficially',
                  'Companies not ready to rethink their foundation',
                  'Those seeking the cheapest option',
                  'Businesses without real traction to scale',
                ].map((item, index) => (
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

      {/* Final CTA Section */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Ready to transform your foundation?
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Stop building on limitations. Start building on intelligence.
            </p>

            <p className="text-xl text-radiance-gold font-medium">
              The shift from Web2 to AI-native changes everything.
            </p>

            <div className="pt-6">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Begin the Transformation
              </Button>
            </div>

            <p className="text-text-muted text-sm pt-4">
              Let's discuss whether this transformation is right for your business
            </p>
          </div>
        </Container>
      </section>

      {/* Closing Line */}
      <section className="py-12 bg-depth-base border-t border-depth-border">
        <Container size="narrow" className="text-center">
          <p className="text-text-muted">
            <span className="text-radiance-gold">Light Brand</span> transforms businesses
            from Web2 foundations to AI-native intelligence systems.
          </p>
        </Container>
      </section>
    </div>
  );
};
