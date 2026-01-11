/**
 * Funnel Page 4: AI Intelligence Ascension Funnel
 * Light Brand Consulting
 *
 * Page Function: AI-powered client ascension system
 * - Step 0: Pre-frame belief via ad positioning (conceptual)
 * - Step 1: Free AI Readiness Diagnostic (Entry Point)
 * - Step 2: AI Readiness Executive Summary + System Preview (Sales Call)
 * - Step 3: Delivery Phase ($5K AI Intelligence System)
 * - Step 4: Expansion & Upsell (Modular SaaS upgrades)
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage4Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage4: React.FC<FunnelPage4Props> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Hero Section - Step 0 Positioning */}
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
              AI Intelligence Ascension
            </Tag>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              Your Business Doesn't Need More Effort.
              <span className="block text-radiance-gold mt-2">
                It Needs an AI Intelligence System.
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                AI is not an add-on. It's the foundation.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                See exactly how AI could support your business.
              </p>
              <p className="text-2xl md:text-3xl text-radiance-gold font-semibold">
                Relief from friction starts here.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Start Your Free AI Readiness Diagnostic
              </Button>
            </div>

            <p className="text-text-muted text-sm max-w-xl mx-auto">
              Discover where your business stands with AI — and unlock the path to automation, intelligence, and leverage.
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

      {/* Step 1 - Free AI Readiness Diagnostic */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              Step 1 — Entry Point
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Free AI Readiness Diagnostic
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              Your first step toward clarity
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card elevation="elevated" className="p-8 md:p-10 border border-radiance-gold/30">
              <div className="space-y-6">
                <p className="text-lg text-text-secondary text-center">
                  Complete a quick diagnostic to understand where your business stands with AI.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Business Details', desc: 'Your current setup and goals' },
                    { label: 'Key Bottlenecks', desc: 'Where friction lives' },
                    { label: 'Website URL', desc: 'Your digital presence' },
                    { label: 'Growth Challenges', desc: "What's holding you back" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-depth-surface rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-text-primary font-medium">{item.label}</p>
                        <p className="text-text-muted text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-depth-border">
                  <p className="text-text-secondary text-center mb-4">
                    Immediately after submission, book a call to review your diagnostic summary.
                  </p>
                  <div className="flex justify-center">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => onNavigate('book')}
                      className="shadow-illumination"
                    >
                      Start Your Diagnostic Now
                    </Button>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-text-muted text-sm">
                    At this point, you are no longer browsing.
                  </p>
                  <p className="text-radiance-gold font-medium">
                    You are engaged.
                  </p>
                </div>
              </div>
            </Card>

            {/* Purpose */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { title: 'Qualification', icon: '✓' },
                { title: 'Context', icon: '◎' },
                { title: 'Commitment', icon: '⚡' },
                { title: 'Authority', icon: '★' },
              ].map((item, index) => (
                <div key={index} className="text-center p-4 bg-depth-surface rounded-lg">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-text-secondary text-sm">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Step 2 - AI Readiness Executive Summary + System Preview */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="outline" className="mx-auto mb-6">
              Step 2 — The Conversion Engine
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              AI Readiness Executive Summary
              <span className="block text-radiance-gold mt-2">+ AI Intelligence System Preview</span>
            </h2>
            <p className="text-lg text-text-secondary">
              Your strategic call with Eyob
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Part 1: Executive Summary Review */}
            <Card elevation="elevated" className="p-8 border border-radiance-gold/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-radiance-gold">AI Readiness Executive Summary Review</h3>
              </div>
              <p className="text-text-secondary mb-6">
                Eyob walks you through your personalized analysis:
              </p>
              <ul className="space-y-4">
                {[
                  'Your current AI readiness level',
                  'Where time, money, and leverage are being lost',
                  'What systems are fragmented or missing',
                  'Why growth feels heavier than it should',
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
              <p className="text-radiance-amber font-medium text-center mt-6">
                This creates clarity + urgency.
              </p>
            </Card>

            {/* Part 2: System Preview */}
            <Card elevation="elevated" className="p-8 border border-wisdom-violet/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-wisdom-violet/20 text-wisdom-violet flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-wisdom-violet">AI Intelligence System Preview</h3>
              </div>
              <p className="text-text-secondary mb-6">
                A visual and experiential look at what's possible:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Automation Layers', desc: 'Eliminate operational drag' },
                  { title: 'Intelligence Layers', desc: 'Smart decision support' },
                  { title: 'Decision Support', desc: 'Data-driven insights' },
                  { title: 'Growth Leverage', desc: 'Scale without complexity' },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-depth-surface rounded-lg border border-depth-border">
                    <p className="text-text-primary font-medium">{item.title}</p>
                    <p className="text-text-muted text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-wisdom-violet font-medium text-center mt-6">
                This makes AI feel real, practical, and inevitable.
              </p>
              <p className="text-radiance-gold font-semibold text-center mt-2">
                This is where desire locks in.
              </p>
            </Card>

          </div>
        </Container>
      </section>

      {/* Step 3 - Delivery Phase */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              Step 3 — Delivery Phase
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Build + Strategy
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              Where value is delivered
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card elevation="elevated" className="p-8 md:p-10 border border-radiance-gold/30">
              <h3 className="text-xl font-bold text-text-primary mb-6 text-center">What You Receive</h3>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: 'AI Intelligence System',
                    desc: 'Your completed, custom-built system',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    ),
                  },
                  {
                    title: 'In-Depth AI Strategy',
                    desc: 'Comprehensive strategic roadmap',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Clear Documentation',
                    desc: 'Everything mapped and explained',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Full Visibility',
                    desc: 'See the complete picture',
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ),
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-depth-surface rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">{item.title}</p>
                      <p className="text-text-muted text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-depth-border pt-6">
                <h4 className="text-lg font-bold text-text-primary mb-4 text-center">Visibility Into:</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-depth-surface rounded-lg">
                    <p className="text-radiance-gold font-medium text-sm">Automation Pathways</p>
                  </div>
                  <div className="p-3 bg-depth-surface rounded-lg">
                    <p className="text-wisdom-violet font-medium text-sm">Intelligence Layers</p>
                  </div>
                  <div className="p-3 bg-depth-surface rounded-lg">
                    <p className="text-radiance-amber font-medium text-sm">Growth Expansion Points</p>
                  </div>
                </div>
              </div>

              <p className="text-radiance-gold font-semibold text-xl text-center mt-8">
                Trust is now fully established.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Step 4 - Expansion & Upsell */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="outline" className="mx-auto mb-6">
              Step 4 — Expansion & Upsell
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Second Call with Eyob
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              Leverage expansion opportunities
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <Card elevation="elevated" className="p-8 border border-radiance-gold/30">
              <h3 className="text-xl font-bold text-text-primary mb-6">After Delivery, We:</h3>
              <ul className="space-y-4">
                {[
                  'Review the completed AI Intelligence System together',
                  'Identify leverage expansion opportunities',
                  'Introduce modular SaaS upgrades that integrate seamlessly',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-text-secondary text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Upgrade Modules */}
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-6 text-center">Available Upgrade Modules</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Sales Intelligence Systems', color: 'radiance-gold' },
                  { title: 'Marketing Automation Engines', color: 'radiance-amber' },
                  { title: 'CRM Intelligence Layers', color: 'wisdom-violet' },
                  { title: 'Operations Optimization AI', color: 'radiance-gold' },
                  { title: 'Customer Intelligence Platforms', color: 'radiance-amber' },
                  { title: 'Content & Distribution AI', color: 'wisdom-violet' },
                ].map((item, index) => (
                  <Card key={index} elevation="subtle" className="p-4 border border-depth-border hover:border-radiance-gold/30 transition-colors">
                    <div className={`w-10 h-10 rounded-full bg-${item.color}/20 text-${item.color} flex items-center justify-center mb-3`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="text-text-primary font-medium text-sm">{item.title}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Benefits of Each Upgrade */}
            <Card elevation="subtle" className="p-6 border border-depth-border">
              <p className="text-text-secondary text-center mb-4">Each upgrade:</p>
              <ul className="space-y-3">
                {[
                  'Extends the existing AI Intelligence System',
                  'Feels logical and aligned',
                  'Increases lifetime value naturally',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 justify-center">
                    <div className="w-2 h-2 rounded-full bg-radiance-gold"></div>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Ready to Begin Your AI Intelligence Ascension?
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Start with the free AI Readiness Diagnostic. See where you stand. Get clarity on what's possible.
            </p>

            <div className="pt-4">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Start Your Free Diagnostic Now
              </Button>
            </div>

            <p className="text-text-muted text-sm">
              Limited availability. We only work with businesses ready for real transformation.
            </p>

            <Card elevation="subtle" className="p-8 border border-depth-border max-w-2xl mx-auto mt-8">
              <div className="space-y-4">
                <p className="text-text-primary font-medium">
                  You're seeking relief from friction.
                </p>
                <p className="text-radiance-gold font-semibold text-lg">
                  We help you find it.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Final Positioning Section */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg text-text-secondary">
              Most businesses try to add AI on top of broken systems.
            </p>
            <p className="text-xl text-text-primary font-medium">
              We help you build AI as the foundation —
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              so growth becomes automated, intelligent, and leveraged.
            </p>
          </div>
        </Container>
      </section>

      {/* Closing Line */}
      <section className="py-12 bg-depth-base border-t border-depth-border">
        <Container size="narrow" className="text-center">
          <p className="text-text-muted">
            <span className="text-radiance-gold">Light Brand</span> builds AI Intelligence Systems
            that power client ascension.
          </p>
        </Container>
      </section>
    </div>
  );
};
