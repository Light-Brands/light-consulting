/**
 * Funnel Page 3: AI-Native Foundation
 * Light Brand Consulting
 *
 * Page Function: Position AI as the foundation, not an add-on
 * - Move beyond website tactics to AI-native infrastructure
 * - Build leverage through automation, personalization, and intelligence
 * - Target founders capped by outdated infrastructure
 */

import React from 'react';
import { Button, Card, Tag, AIFoundationInfographic } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage3Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage3: React.FC<FunnelPage3Props> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
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
              Beyond Website Tactics
            </Tag>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              Move Beyond Website Tactics.
              <span className="block text-radiance-gold mt-2">
                Build an AI-Native Foundation That Powers Growth, Automation, and Leverage.
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                For founders who know their business is capped by outdated infrastructure — not effort.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                AI isn't the add-on.
              </p>
              <p className="text-2xl md:text-3xl text-radiance-gold font-semibold">
                It's the foundation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                👉 Book a 15-Minute Transformation Clarity Session
              </Button>
            </div>

            <p className="text-text-muted text-sm max-w-xl mx-auto">
              See if an AI-native foundation can unlock automation, personalization, and smarter decision-making in your business.
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

      {/* This Is For You If Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated">
        <Container size="narrow">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card elevation="elevated" className="p-8 border border-radiance-gold/30">
              <h3 className="text-xl font-bold text-radiance-gold mb-6">This is for you if:</h3>
              <ul className="space-y-4">
                {[
                  "You've outgrown your current website, tools, or workflows",
                  'Your business relies too heavily on manual decisions and founder effort',
                  "You're experimenting with AI but seeing fragmented results",
                  'You want real leverage, not another tactic',
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

            <Card elevation="subtle" className="p-8 border border-depth-border">
              <h3 className="text-xl font-bold text-text-muted mb-6">This is not for:</h3>
              <ul className="space-y-4">
                {[
                  'DIY AI experiments',
                  'Template-driven businesses',
                  'Anyone looking for quick wins or surface-level automation',
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

      {/* The Real Problem Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              The Real Issue
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Your Website Isn't the Problem.
            </h2>
            <p className="text-2xl text-radiance-gold font-medium">
              Your Foundation Is.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-text-secondary">
            <p>Most businesses believe they have:</p>

            <Card elevation="subtle" className="p-6 border border-depth-border">
              <ul className="space-y-3 text-text-muted">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                  <span>a traffic problem</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                  <span>a conversion problem</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                  <span>a content problem</span>
                </li>
              </ul>
            </Card>

            <p className="text-text-primary font-medium text-xl text-center pt-4">
              In reality, they have a <span className="text-radiance-gold">foundation problem.</span>
            </p>

            <p className="text-center">They're running modern businesses on Web2 infrastructure:</p>

            <Card elevation="elevated" className="p-8 border border-depth-border">
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                  <span>Static websites</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                  <span>Disconnected tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                  <span>Manual decision-making</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-text-muted mt-3 flex-shrink-0"></div>
                  <span>AI layered on after the fact</span>
                </li>
              </ul>
            </Card>

            <p className="text-radiance-amber font-semibold text-xl text-center pt-4">
              No amount of plugins can fix a broken foundation.
            </p>
          </div>
        </Container>
      </section>

      {/* We Build AI-Native Foundations Section */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="outline" className="mx-auto mb-6">
              Our Approach
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              We Build AI-Native Foundations
            </h2>
            <p className="text-2xl text-radiance-gold font-medium">
              — Not Websites
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-lg text-text-secondary text-center">
              An AI-native foundation means intelligence is <span className="text-radiance-gold font-medium">embedded beneath the business</span>, not bolted on top.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card elevation="subtle" className="p-8 border border-depth-border">
                <h3 className="text-lg font-bold text-text-muted mb-4">Instead of asking:</h3>
                <p className="text-text-muted text-xl italic">"How do we use AI?"</p>
              </Card>

              <Card elevation="elevated" className="p-8 border border-radiance-gold/30">
                <h3 className="text-lg font-bold text-radiance-gold mb-4">We ask:</h3>
                <p className="text-text-primary text-xl italic">"Where should intelligence live inside this business?"</p>
              </Card>
            </div>

            <p className="text-radiance-gold font-semibold text-xl text-center pt-4">
              That shift changes everything.
            </p>
          </div>
        </Container>
      </section>

      {/* AI Foundation Infographic Section */}
      <section className="section-spacing bg-depth-elevated overflow-hidden">
        <Container size="wide">
          <div className="text-center mb-8">
            <Tag variant="primary" className="mx-auto mb-6">
              The Foundation
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              One Core System.
              <span className="block text-radiance-gold mt-2">Infinite Possibilities.</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Your AI Super Intelligence System sits at the center — and modules connect to unlock automation, personalization, and leverage.
            </p>
          </div>

          <AIFoundationInfographic />
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              What You Gain
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              With an AI-native foundation,
              <span className="block text-radiance-gold mt-2">your business gains:</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Automation',
                  description: 'That removes operational drag',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                },
                {
                  title: 'Personalization',
                  description: 'Across customer journeys',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ),
                },
                {
                  title: 'Intelligence',
                  description: 'That improves decisions over time',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                },
                {
                  title: 'Leverage',
                  description: 'Without hiring or burnout',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                },
                {
                  title: 'Scalability',
                  description: 'Without complexity',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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

            <div className="mt-12 text-center">
              <p className="text-text-muted text-lg">This isn't a redesign.</p>
              <p className="text-radiance-gold font-semibold text-xl mt-2">It's a structural upgrade.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Proof / Credibility Section */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="max-w-3xl mx-auto">
            <Card elevation="elevated" className="p-8 md:p-12 border border-radiance-gold/20">
              <div className="text-center space-y-6">
                {/* Star Rating */}
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-radiance-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-xl md:text-2xl text-text-primary italic leading-relaxed">
                  "After implementing our AI foundation, we reduced lead response time by 4× and automated workflows that used to take hours each week."
                </blockquote>

                {/* Attribution */}
                <div className="pt-4">
                  <p className="text-text-secondary font-medium">— Founder, Service Business</p>
                </div>

                {/* Trust Line */}
                <p className="text-text-muted text-sm pt-4">
                  Trusted by founders across service, tech, and advisory businesses.
                </p>

                {/* Logo Placeholder */}
                <div className="pt-4 border-t border-depth-border">
                  <p className="text-text-muted text-xs uppercase tracking-wide">
                    [Client Logos or Niche Names]
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              How It Works
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              A Simple 3-Step Process
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Step 1 */}
            <div className="flex items-start gap-6 p-6 rounded-lg bg-depth-surface mb-4">
              <div className="w-14 h-14 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-radiance-gold">Transformation Clarity Session</h3>
                <p className="text-text-secondary mt-2">We diagnose where your current foundation is leaking value — and where intelligence would actually help.</p>
              </div>
            </div>

            <div className="flex justify-center">
              <svg className="w-6 h-12 text-radiance-gold/50" fill="none" viewBox="0 0 24 48" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v40m0 0l-6-6m6 6l6-6" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-6 p-6 rounded-lg bg-depth-surface mb-4">
              <div className="w-14 h-14 rounded-full bg-radiance-gold/20 text-radiance-amber flex items-center justify-center flex-shrink-0 font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-radiance-amber">AI Foundation Blueprint</h3>
                <p className="text-text-secondary mt-2">If there's leverage, we map a custom AI-native architecture for your business.</p>
              </div>
            </div>

            <div className="flex justify-center">
              <svg className="w-6 h-12 text-radiance-gold/50" fill="none" viewBox="0 0 24 48" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v40m0 0l-6-6m6 6l6-6" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-6 p-6 rounded-lg bg-radiance-gold/10 border border-radiance-gold/30">
              <div className="w-14 h-14 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-radiance-gold">Strategic Support</h3>
                <p className="text-text-primary mt-2">Implementation guidance and optimization — so the system drives real ROI, not just ideas.</p>
              </div>
            </div>

            {/* Reassurance */}
            <div className="mt-10 text-center space-y-2">
              <p className="text-text-secondary">No pressure.</p>
              <p className="text-text-secondary">No pitchy calls.</p>
              <p className="text-radiance-gold font-medium text-lg">Clarity first.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Ready to See If Your Business Is Built to Scale?
            </h2>

            <div className="pt-4">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                👉 Book a 15-Minute Transformation Clarity Session
              </Button>
            </div>

            <p className="text-text-muted text-sm">
              Limited availability. We only take businesses where intelligence creates real leverage.
            </p>

            <Card elevation="subtle" className="p-8 border border-depth-border max-w-2xl mx-auto mt-8">
              <p className="text-text-secondary mb-4">
                We intentionally limit the number of clarity sessions each week.
              </p>
              <p className="text-text-muted mb-4">
                If it's not a fit, we'll tell you.
              </p>
              <p className="text-text-primary font-medium">
                If it is, you'll walk away with clear next steps — either way.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Final Positioning Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg text-text-secondary">
              Most businesses try to scale on top of broken foundations.
            </p>
            <p className="text-xl text-text-primary font-medium">
              We help you rebuild beneath the business —
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              so growth becomes simpler, smarter, and sustainable.
            </p>
          </div>
        </Container>
      </section>

      {/* Closing Line */}
      <section className="py-12 bg-depth-base border-t border-depth-border">
        <Container size="narrow" className="text-center">
          <p className="text-text-muted">
            <span className="text-radiance-gold">Light Brand</span> builds AI-native foundations
            that power growth, automation, and leverage.
          </p>
        </Container>
      </section>
    </div>
  );
};
