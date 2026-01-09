/**
 * Home Page
 * Light Brand Consulting
 *
 * Homepage Function: Sell the frame, not the offer
 * - Establish category authority
 * - Create resonance ("this explains what I'm feeling")
 * - Filter out the wrong people
 * - Point to ONE action: Discover Your AI Readiness
 */

import React from 'react';
import {
  Button,
  Card,
  Tag,
  NewsletterCapture,
  CheckIcon,
  SparkleIcon,
  CapacityGapVisual,
  LaborArbitrageHighlight,
} from '../components';
import { TESTIMONIALS, IMAGE_CONFIG, FIT_CRITERIA } from '../lib/constants';
import { PageKey } from '../types';

interface HomePageProps {
  onNavigate: (page: PageKey) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="min-h-[90vh] relative overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-20"
        style={{
          backgroundImage: `url(${IMAGE_CONFIG.heroes.home.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-depth-base/70" />

        {/* Bottom fade gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 14, 13, 0.5) 50%, rgba(15, 14, 13, 1) 100%)',
          }}
        />

        {/* Glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-gradient from-radiance-gold/8 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <Tag variant="premium" className="mb-6">
              AI Intelligence Systems
            </Tag>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary mb-8 animate-slide-up">
            We design AI intelligence systems
            <span className="text-radiance-gold block mt-2">
              for businesses that want to survive and lead the next decade.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-6 max-w-3xl leading-relaxed animate-slide-up delay-200">
            Most companies are adding AI tools to broken systems.
          </p>

          <p className="text-base text-text-muted mb-12 max-w-3xl leading-relaxed animate-slide-up delay-250">
            We redesign how your business actually thinks, operates, and compounds in an AI-driven world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('funnel')}
            >
              Discover Your AI Readiness
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-text-muted/30 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <Tag variant="outline" className="mb-6">
              The Problem
            </Tag>

            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
              AI isn't just changing how work is done.
              <span className="block text-radiance-gold mt-2">It's changing which businesses survive.</span>
            </h2>

            <div className="space-y-6 text-lg text-text-secondary">
              <p>
                For decades, companies scaled by hiring more people and adding more process.
              </p>
              <p className="text-radiance-amber font-semibold">
                AI has ended that model.
              </p>
              <p>
                Now there's a split happening:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <Card elevation="subtle" className="p-6 border border-depth-border">
                  <p className="text-text-muted">Some businesses will use AI to save time.</p>
                </Card>
                <Card elevation="elevated" className="p-6 border border-radiance-gold/30">
                  <p className="text-text-primary font-medium">Others will design intelligence into the foundation of how they operate.</p>
                </Card>
              </div>

              <p className="text-text-muted italic">
                Most founders don't realize which side they're on until it's too late.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capacity Gap Section - Interactive */}
      <section className="section-spacing">
        <div className="container-wide">
          <Card elevation="elevated" className="p-8 md:p-12 overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <SparkleIcon className="text-radiance-gold" size={28} />
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                The Capacity Gap
              </h2>
            </div>

            <p className="text-text-secondary mb-4 max-w-3xl">
              Every business has untapped potential, opportunities hidden in plain sight. The gap between where you are and where AI can take you isn't about technology. It's about seeing clearly.
            </p>

            {/* Interactive Visualization */}
            <CapacityGapVisual />

            <div className="border-t border-depth-border pt-8 mt-4">
              <p className="text-text-secondary text-center max-w-2xl mx-auto mb-6">
                <span className="text-radiance-gold font-semibold">2024-2026 is the strategic moment.</span> Like 1995 for the web, like 2008 for mobile.
                The businesses that move now, with clarity not chaos, will define the next decade.
              </p>
              <p className="text-text-muted text-center text-sm max-w-xl mx-auto">
                The question isn't if AI will transform your industry. It's whether you'll lead that transformation or react to it.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Labor Arbitrage Highlight */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <LaborArbitrageHighlight onLearnMore={() => onNavigate('insights/labor-arbitrage')} />
        </div>
      </section>

      {/* The Shift Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <Tag variant="primary" className="mb-6">
              The Shift
            </Tag>

            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
              Using AI is not the advantage.
              <span className="block text-radiance-gold mt-2">Owning intelligence is.</span>
            </h2>

            <div className="space-y-6 text-lg text-text-secondary">
              <p>
                AI amplifies whatever structure already exists underneath your business.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <Card elevation="subtle" className="p-6 border-l-4 border-error">
                  <p className="text-text-secondary">
                    If your systems are <span className="text-error font-semibold">fragmented</span>, AI scales chaos.
                  </p>
                </Card>
                <Card elevation="subtle" className="p-6 border-l-4 border-success">
                  <p className="text-text-secondary">
                    If your systems are <span className="text-success font-semibold">intentional</span>, AI becomes leverage.
                  </p>
                </Card>
              </div>

              <p className="text-xl text-text-primary font-medium">
                We exist to help founders move from tool usage to intelligence ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Frame Section - AI Readiness Curve */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <Tag variant="outline" className="mb-6">
              The Frame
            </Tag>

            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Every business sits somewhere on the AI readiness curve
            </h2>

            <div className="mt-12 space-y-4">
              {[
                { level: 1, label: 'Experimenting with tools', color: 'text-text-muted' },
                { level: 2, label: 'Automating tasks', color: 'text-text-muted' },
                { level: 3, label: 'Systematizing workflows', color: 'text-text-secondary' },
                { level: 4, label: 'Owning business intelligence', color: 'text-radiance-gold' },
              ].map((item) => (
                <div key={item.level} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    item.level === 4
                      ? 'bg-radiance-gold/20 text-radiance-gold'
                      : 'bg-depth-surface text-text-muted'
                  }`}>
                    {item.level}
                  </div>
                  <span className={`text-lg ${item.color}`}>{item.label}</span>
                  {item.level === 4 && (
                    <span className="text-sm text-radiance-gold ml-2">← Where AI becomes structural advantage</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-depth-surface rounded-lg border border-depth-border">
              <p className="text-text-secondary text-lg">
                <span className="text-text-primary font-semibold">Most companies stall in the middle.</span>
              </p>
              <p className="text-radiance-gold mt-4 text-lg font-medium">
                We help you move to the top, where AI becomes a structural advantage, not a novelty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Design Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Tag variant="premium" className="mb-4">
                What We Design
              </Tag>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                We don't sell websites. We don't install tools. We don't chase trends.
              </h2>
              <p className="text-xl text-radiance-gold font-medium">
                We design AI intelligence systems that grow with your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card elevation="elevated" className="p-8">
                <h3 className="text-xl font-bold text-text-primary mb-3">AI Intelligence Diagnostics</h3>
                <p className="text-text-secondary">
                  A clear picture of where your business stands, and where leverage is hiding.
                </p>
              </Card>

              <Card elevation="elevated" className="p-8">
                <h3 className="text-xl font-bold text-text-primary mb-3">Business-Specific AI Engines</h3>
                <p className="text-text-secondary">
                  Intelligence systems that power sales, operations, and decision-making.
                </p>
              </Card>

              <Card elevation="elevated" className="p-8">
                <h3 className="text-xl font-bold text-text-primary mb-3">Founder Leverage Systems</h3>
                <p className="text-text-secondary">
                  Infrastructure that removes you as the bottleneck.
                </p>
              </Card>

              <Card elevation="elevated" className="p-8">
                <h3 className="text-xl font-bold text-text-primary mb-3">Authority & Intelligence Platforms</h3>
                <p className="text-text-secondary">
                  Systems that turn insight, IP, and experience into long-term demand.
                </p>
              </Card>
            </div>

            <p className="text-center text-text-muted mt-8 italic">
              Each system is designed to compound, not just perform.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Tag variant="outline" className="mb-4">
                How It Works
              </Tag>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                Our process is simple by design.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: 'Intelligence Mapping',
                  description: 'We diagnose how your business currently operates, and where AI can create real leverage.',
                },
                {
                  step: 2,
                  title: 'System Architecture',
                  description: 'We design the intelligence layer your business actually needs.',
                },
                {
                  step: 3,
                  title: 'AI Engine Build',
                  description: 'We build and deploy systems that run alongside your team, and eventually ahead of it.',
                },
                {
                  step: 4,
                  title: 'Compounding Leverage',
                  description: 'Your business stops relying on effort and starts scaling through structure.',
                },
              ].map((item) => (
                <Card key={item.step} elevation="subtle" className="p-6">
                  <div className="w-10 h-10 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-text-muted">
                No endless consulting. <span className="text-text-primary">Clear outcomes. Clear progression.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mb-4">
              Who This Is For
            </Tag>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card elevation="elevated" className="p-8">
              <h3 className="text-xl font-bold text-radiance-gold mb-6">Light Brand is for founders who:</h3>
              <ul className="space-y-4">
                {FIT_CRITERIA.idealClients.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={12} />
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
        </div>
      </section>

      {/* Featured Testimonial Section */}
      {TESTIMONIALS[0] && (
        <section className="section-spacing bg-depth-elevated">
          <div className="container-narrow">
            <Card elevation="elevated" className="p-8 md:p-12 relative overflow-hidden max-w-3xl mx-auto">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-radiance-gold/10 blur-3xl pointer-events-none" />

              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-radiance-gold/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-radiance-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
              </div>

              <blockquote className="text-text-primary text-xl md:text-2xl font-medium leading-relaxed mb-8 relative z-10 text-center">
                "{TESTIMONIALS[0].quote}"
              </blockquote>

              <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-radiance-gold/30">
                  <img
                    src={TESTIMONIALS[0].avatar}
                    alt={TESTIMONIALS[0].author}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center text-depth-base font-bold text-2xl">${TESTIMONIALS[0]?.author?.charAt(0) || 'J'}</div>`;
                    }}
                  />
                </div>

                <div className="text-center">
                  <p className="text-text-primary font-semibold text-lg">{TESTIMONIALS[0].author}</p>
                  <p className="text-text-muted text-sm mb-3">{TESTIMONIALS[0].role}</p>

                  {TESTIMONIALS[0].companyUrl && (
                    <a
                      href={TESTIMONIALS[0].companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-radiance-gold/10 hover:bg-radiance-gold/20 border border-radiance-gold/30 rounded-full text-radiance-gold font-semibold transition-all duration-300 group"
                    >
                      <span>Visit {TESTIMONIALS[0].company}</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="section-spacing">
        <div className="container-narrow">
          <NewsletterCapture />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Not sure where you stand?
          </h2>
          <p className="text-text-secondary mb-4 max-w-xl mx-auto">
            Most founders think they're further along than they are.
          </p>
          <p className="text-text-muted text-sm mb-8 max-w-lg mx-auto">
            We start with a short, focused diagnostic to determine your AI readiness level,
            where leverage is leaking, and what systems actually matter next.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('funnel')}
          >
            Discover Your AI Readiness
          </Button>
        </div>
      </section>

      {/* Footer Line */}
      <section className="py-12 bg-depth-elevated border-t border-depth-border">
        <div className="container-narrow text-center">
          <p className="text-text-muted">
            <span className="text-radiance-gold">Light Brand</span> designs intelligence systems
            so businesses don't just use AI, they're built for it.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
