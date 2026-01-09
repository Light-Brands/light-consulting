import React from 'react';
import { Button, Card, Tag } from '../components';
import { PageKey } from '../types';
import { TESTIMONIALS, IMAGE_CONFIG } from '../lib/constants';

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
            src={IMAGE_CONFIG.hero}
            alt="AI Transformation"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-depth-base/80 via-depth-base/60 to-depth-base"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-wide py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Tag variant="outline" className="mx-auto">
              The Foundation Transformation
            </Tag>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight">
              The Truth About Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-radiance-gold via-radiance-amber to-wisdom-violet mt-2">
                Online Business
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              When businesses talk to us about their website, what matters most is understanding the true shift that's happening.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Book Foundation Audit
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => {
                  const element = document.getElementById('the-shift');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Understand The Shift
              </Button>
            </div>
          </div>
        </div>

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
        <div className="container-narrow">
          <div className="text-center mb-16">
            <Tag variant="outline" className="mx-auto mb-6">
              The Current State
            </Tag>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Most Businesses Are Operating on a
              <span className="block text-radiance-amber mt-2">Limited Foundation</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card elevation="subtle" className="p-8 border border-depth-border">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-clarity-cream/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-clarity-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">Traditional Website Foundation</h3>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Today, your website is the base of your online presence. Everything you try to build—automation, personalization, advanced features—depends on that foundation.
                </p>
                <div className="pt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-radiance-amber mt-2 flex-shrink-0"></div>
                    <p className="text-text-secondary">Static pages with limited interactivity</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-radiance-amber mt-2 flex-shrink-0"></div>
                    <p className="text-text-secondary">Manual processes and workflows</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-radiance-amber mt-2 flex-shrink-0"></div>
                    <p className="text-text-secondary">Generic experience for all visitors</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-radiance-amber mt-2 flex-shrink-0"></div>
                    <p className="text-text-secondary">Constrained by platform limitations</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card elevation="subtle" className="p-8 border border-error/30 bg-error/5">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">The Real Problem</h3>
                <p className="text-text-secondary text-lg leading-relaxed font-semibold">
                  If the foundation is limited, everything built on top of it is limited as well.
                </p>
                <div className="pt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-error mt-2 flex-shrink-0"></div>
                    <p className="text-text-secondary">Can't scale personalization</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-error mt-2 flex-shrink-0"></div>
                    <p className="text-text-secondary">Can't automate intelligently</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-error mt-2 flex-shrink-0"></div>
                    <p className="text-text-secondary">Can't build AI-driven products</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-error mt-2 flex-shrink-0"></div>
                    <p className="text-text-secondary">Can't adapt to future technology</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* The Shift Section */}
      <section id="the-shift" className="section-spacing bg-depth-elevated">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <Tag variant="primary" className="mx-auto mb-6">
              This Changes Everything
            </Tag>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              This Is Not a Website Upgrade
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              What we are doing is fundamentally different.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card elevation="elevated" className="p-12 bg-gradient-to-br from-wisdom-violet/10 to-radiance-gold/10 border border-wisdom-violet/30">
              <div className="space-y-8">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="inline-block px-6 py-3 bg-depth-surface border border-depth-border rounded-brand-card">
                      <p className="text-sm text-text-muted uppercase tracking-wider mb-1">Old Foundation</p>
                      <p className="text-2xl font-bold text-text-primary">Web2 Website</p>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <svg className="w-12 h-12 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>

                  <div className="text-center">
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-wisdom-violet to-radiance-gold rounded-brand-card shadow-wisdom">
                      <p className="text-sm text-text-primary/80 uppercase tracking-wider mb-1">New Foundation</p>
                      <p className="text-2xl font-bold text-text-primary">AI Intelligence System</p>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4 pt-6">
                  <p className="text-2xl md:text-3xl font-bold text-text-primary leading-relaxed">
                    We are moving businesses from a <span className="text-clarity-cream">website</span> to an <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-violet to-radiance-gold">AI intelligence system</span>.
                  </p>
                  <p className="text-lg text-text-secondary">
                    By integrating AI, we completely change the foundation of your online business.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* The New Foundation Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-elevated to-depth-base">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <Tag variant="outline" className="mx-auto mb-6">
              Built on OpenAI
            </Tag>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Your New Foundation:
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-wisdom-violet via-radiance-gold to-radiance-amber mt-2">
                An AI Intelligence Layer
              </span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Instead of your foundation being a static website, your new foundation becomes an AI intelligence layer built on OpenAI.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card elevation="subtle" className="p-8 border-l-4 border-success">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">No More Constraints</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Your business is no longer constrained by traditional website limitations. The ceiling has been removed.
                  </p>
                </div>
              </div>
            </Card>

            <Card elevation="subtle" className="p-8 border-l-4 border-wisdom-violet">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-wisdom-violet/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-wisdom-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">Automation That Thinks</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Build intelligent automation that adapts, learns, and improves. Not just scheduled tasks—actual intelligence.
                  </p>
                </div>
              </div>
            </Card>

            <Card elevation="subtle" className="p-8 border-l-4 border-radiance-gold">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-radiance-gold/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">True Personalization</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Every visitor gets an experience tailored to them. Not segments. Not personas. Individuals.
                  </p>
                </div>
              </div>
            </Card>

            <Card elevation="subtle" className="p-8 border-l-4 border-info">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">AI-Driven Products</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Create products and services that were impossible before. Tools that understand, assist, and deliver value autonomously.
                  </p>
                </div>
              </div>
            </Card>

            <Card elevation="subtle" className="p-8 border-l-4 border-radiance-amber">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-radiance-amber/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-radiance-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3">Future-Ready Architecture</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    As AI technology evolves, your foundation evolves with it. You're not locked into today's limitations.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* What This Means Section */}
      <section className="section-spacing bg-depth-base">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto">
            <Card elevation="elevated" className="p-12 bg-gradient-to-br from-depth-elevated to-depth-surface border border-radiance-gold/30">
              <div className="space-y-8">
                <div className="text-center">
                  <Tag variant="primary" className="mx-auto mb-6">
                    The Reality
                  </Tag>
                  <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                    This Is Not About
                    <span className="block text-clarity-cream mt-2">Redesign, Plugins, or Features</span>
                  </h2>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-radiance-gold to-transparent"></div>

                <div className="text-center space-y-6">
                  <p className="text-2xl md:text-3xl font-bold text-text-primary leading-relaxed">
                    This is a total transformation of the foundation of your entire online business
                  </p>
                  <div className="flex items-center justify-center gap-4 text-xl font-semibold">
                    <span className="text-text-muted">From</span>
                    <span className="text-clarity-cream">Web2</span>
                    <svg className="w-8 h-8 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-wisdom-violet to-radiance-gold">AI-Native</span>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-radiance-gold to-transparent"></div>

                <div className="text-center">
                  <p className="text-xl text-text-secondary leading-relaxed">
                    Everything you imagine building next becomes possible because the foundation has changed.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              variant="primary"
              size="xl"
              onClick={() => onNavigate('book')}
              className="shadow-illumination"
            >
              Book Your Foundation Audit
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <Tag variant="outline" className="mx-auto mb-6">
              Results
            </Tag>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              What Businesses Experience
            </h2>
          </div>

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
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Tag variant="primary" className="mx-auto">
              No Hype. Pure Truth.
            </Tag>

            <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
              Ready to Transform
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-radiance-gold to-wisdom-violet mt-2">
                Your Foundation?
              </span>
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Book a Foundation Audit. We'll assess your current state, map the transformation path, and show you what becomes possible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Book Foundation Audit
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => onNavigate('services')}
              >
                View Our Services
              </Button>
            </div>

            <p className="text-sm text-text-muted pt-4">
              We speak from authority. Facts, not hype.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
