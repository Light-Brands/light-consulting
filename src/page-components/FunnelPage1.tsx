/**
 * The Light Brand Consultant Engine Page
 * Light Brand Consulting
 *
 * A diagnostic-led brand and AI system that transforms consultants from
 * "service providers" into signal-carrying authorities in their market.
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage1Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage1: React.FC<FunnelPage1Props> = ({ onNavigate }) => {
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
              <Tag variant="premium" className="mx-auto backdrop-blur-sm">
                For Consultants Ready to Lead
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              The Light Brand
              <span className="block text-radiance-gold mt-2 relative inline-block">
                Consultant Engine&trade;
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                A diagnostic-led brand and AI system that transforms consultants from
                "service providers" into signal-carrying authorities in their market.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300 space-y-6">
              <div className="flex flex-col md:flex-row gap-4 justify-center text-text-muted">
                <span className="px-4 py-2 rounded-full border border-depth-border bg-depth-surface/30">This is not coaching.</span>
                <span className="px-4 py-2 rounded-full border border-depth-border bg-depth-surface/30">This is not content tips.</span>
              </div>
              <p className="text-radiance-gold text-xl font-semibold leading-relaxed">
                This is infrastructure for relevance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-slide-up delay-400">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination hover:shadow-[0_0_40px_rgba(232,184,74,0.35)] transition-shadow duration-500"
              >
                Book Your AI Readiness Diagnostic
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              The only entry point to the system
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

      {/* Who This Is For Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Who This Is For
            </Tag>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Subtle divider line */}
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-depth-border/50 to-transparent" />

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative z-10 items-start">
              {/* This is for */}
              <div className="space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-radiance-gold">This is for consultants who:</h3>
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                </div>

                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm flex-1 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-radiance-gold/20 rounded-l-2xl" />

                  <ul className="space-y-3.5 relative z-10">
                    {[
                      'Feel AI closing in on their current offer',
                      'Are tired of selling hours, decks, or deliverables',
                      'Know they\'re good - but struggle to clearly articulate why',
                      'Want clients who already trust them before the call',
                      'Are ready to operate as a category signal, not a commodity'
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

                <div className="p-6 rounded-2xl border-l-2 border-depth-border/30 bg-depth-surface/30 backdrop-blur-sm flex-1 relative">
                  <ul className="space-y-3.5">
                    {[
                      'Beginners looking for tactics',
                      'People chasing virality',
                      'Consultants who want AI to "do everything for them"'
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

      {/* The Core Shift Section */}
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
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Core Shift We Create
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Most consultants try to compete at the tool level.
              <span className="block text-radiance-amber mt-2">We move you to the identity + signal level.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto relative z-10">
            {/* You don't sell */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-text-muted flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-depth-border flex items-center justify-center text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                You don't sell:
              </h3>

              <div className="p-6 rounded-2xl border border-depth-border bg-depth-surface/30 backdrop-blur-sm">
                <ul className="space-y-4">
                  {['Research', 'Frameworks', 'Execution'].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-text-muted">
                      <span className="text-lg">&#10060;</span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* You become */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-radiance-gold flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-radiance-gold/20 flex items-center justify-center text-sm text-radiance-gold shadow-[0_0_12px_rgba(232,184,74,0.3)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                You become:
              </h3>

              <div className="p-6 rounded-2xl border border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm">
                <ul className="space-y-4">
                  {[
                    'The interpreter of complexity',
                    'The trusted lens for decision-making',
                    'The brand clients follow before they buy'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-text-primary">
                      <span className="text-lg text-radiance-gold">&#10003;</span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The System - How It Works */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-16 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The System
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              How It Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            {/* Phase 1 */}
            <div className="relative group">
              <div className="absolute left-8 top-20 w-px h-[calc(100%-5rem)] bg-gradient-to-b from-radiance-gold/30 to-transparent hidden md:block" />

              <Card elevation="elevated" className="p-8 bg-depth-elevated/30 border border-depth-border backdrop-blur-sm rounded-3xl relative overflow-hidden hover:border-radiance-gold/30 transition-colors">
                <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold text-xl flex-shrink-0 font-mono shadow-[0_0_20px_rgba(232,184,74,0.2)]">
                      01
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-radiance-gold mb-2 uppercase tracking-[0.2em]">Phase 1</div>
                      <h3 className="text-2xl font-bold text-text-primary">The AI Readiness & Brand Diagnostic</h3>
                      <p className="text-text-muted text-sm mt-1">(The Gate)</p>
                    </div>
                  </div>

                  <div className="pl-0 md:pl-22 space-y-6">
                    <div>
                      <p className="text-text-secondary font-medium mb-4">We map:</p>
                      <ul className="space-y-3">
                        {[
                          'Where AI is already replacing your current value',
                          'What part of your expertise cannot be automated',
                          'Where your signal is unclear, diluted, or invisible',
                          'How buyers currently perceive you vs. how they should'
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold mt-2 flex-shrink-0" />
                            <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-radiance-gold/10 border border-radiance-gold/20">
                      <p className="text-sm text-text-muted mb-1">Outcome:</p>
                      <p className="text-text-primary font-medium">Clarity on who you are in the new market - and who you are not.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Phase 2 */}
            <div className="relative group">
              <div className="absolute left-8 top-20 w-px h-[calc(100%-5rem)] bg-gradient-to-b from-radiance-gold/30 to-transparent hidden md:block" />

              <Card elevation="elevated" className="p-8 bg-depth-elevated/30 border border-depth-border backdrop-blur-sm rounded-3xl relative overflow-hidden hover:border-radiance-gold/30 transition-colors">
                <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold text-xl flex-shrink-0 font-mono shadow-[0_0_20px_rgba(232,184,74,0.2)]">
                      02
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-radiance-gold mb-2 uppercase tracking-[0.2em]">Phase 2</div>
                      <h3 className="text-2xl font-bold text-text-primary">Consultant Brand Architecture</h3>
                      <p className="text-text-muted text-sm mt-1">(Positioning & Signal)</p>
                    </div>
                  </div>

                  <div className="pl-0 md:pl-22 space-y-6">
                    <div>
                      <p className="text-text-secondary font-medium mb-4">We build:</p>
                      <ul className="space-y-3">
                        {[
                          'Your core market thesis (what you see that others don\'t)',
                          'Your consultant identity (operator, architect, translator, guide)',
                          'Your brand narrative (why clients should trust your lens)',
                          'A clear "why you" that AI tools cannot replicate'
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold mt-2 flex-shrink-0" />
                            <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-radiance-gold/10 border border-radiance-gold/20">
                      <p className="text-sm text-text-muted mb-1">Outcome:</p>
                      <p className="text-text-primary font-medium">A positioning that attracts the right clients - and repels the wrong ones.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Phase 3 */}
            <div className="relative group">
              <Card elevation="elevated" className="p-8 bg-depth-elevated/30 border border-depth-border backdrop-blur-sm rounded-3xl relative overflow-hidden hover:border-radiance-gold/30 transition-colors">
                <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold text-xl flex-shrink-0 font-mono shadow-[0_0_20px_rgba(232,184,74,0.2)]">
                      03
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-radiance-gold mb-2 uppercase tracking-[0.2em]">Phase 3</div>
                      <h3 className="text-2xl font-bold text-text-primary">AI-Powered Authority Engine</h3>
                      <p className="text-text-muted text-sm mt-1">(Leverage Without Replacement)</p>
                    </div>
                  </div>

                  <div className="pl-0 md:pl-22 space-y-6">
                    <div className="p-4 rounded-xl bg-depth-surface/50 border border-depth-border mb-6">
                      <p className="text-text-primary font-medium text-center">You don't fight AI. <span className="text-radiance-gold">You command it.</span></p>
                    </div>

                    <div>
                      <p className="text-text-secondary font-medium mb-4">We design:</p>
                      <ul className="space-y-3">
                        {[
                          'AI workflows that amplify your thinking',
                          'Insight systems that turn ideas into assets',
                          'Content engines that carry your signal consistently',
                          'Decision-support tools that reinforce your authority'
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold mt-2 flex-shrink-0" />
                            <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-radiance-gold/10 border border-radiance-gold/20">
                      <p className="text-sm text-text-muted mb-1">Outcome:</p>
                      <p className="text-text-primary font-medium">AI becomes your leverage - not your competition.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* What You Walk Away With */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              What You Walk Away With
            </Tag>
          </div>

          <div className="max-w-2xl mx-auto relative z-10">
            <div className="p-8 rounded-3xl border border-radiance-gold/20 bg-radiance-gold/5 backdrop-blur-sm">
              <ul className="space-y-5">
                {[
                  'A clear consultant identity in an AI-first economy',
                  'A differentiated position your market understands immediately',
                  'An authority system that compounds over time',
                  'Messaging that pre-sells clients before the call',
                  'Confidence that your work can\'t be replaced by prompts'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(232,184,74,0.3)]">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-primary text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Light Brand */}
      <section className="section-spacing relative overflow-hidden">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <Container size="narrow">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Why Light Brand
            </Tag>
          </div>

          <div className="max-w-2xl mx-auto relative z-10 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {['We don\'t build funnels.', 'We don\'t sell hacks.', 'We don\'t chase trends.', 'We build foundations.'].map((text, index) => (
                <div key={index} className={`p-4 rounded-xl border ${index === 3 ? 'border-radiance-gold/30 bg-radiance-gold/10 text-radiance-gold' : 'border-depth-border bg-depth-surface/30 text-text-muted'}`}>
                  <p className="text-sm font-medium">{text}</p>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl border border-depth-border bg-depth-elevated/50 backdrop-blur-sm">
              <p className="text-text-secondary text-center mb-6">Our work sits at the intersection of:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {['Brand', 'Identity', 'AI', 'Market Signal'].map((item, index) => (
                  <span key={index} className="px-4 py-2 rounded-full border border-radiance-gold/30 bg-radiance-gold/10 text-radiance-gold text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center pt-6 border-t border-depth-border/30">
              <p className="text-text-secondary text-lg leading-relaxed">
                We work with people who are done reacting
              </p>
              <p className="text-radiance-gold font-medium text-lg mt-2">
                and ready to architect their relevance.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How to Enter */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="narrow">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              How to Enter
            </Tag>
          </div>

          <div className="max-w-2xl mx-auto relative z-10 space-y-8">
            <div className="p-6 rounded-2xl border border-depth-border bg-depth-surface/30 text-center">
              <p className="text-text-primary font-medium text-lg">We don't sell this publicly.</p>
              <p className="text-text-secondary mt-2">The only entry point is the AI Readiness Diagnostic.</p>
            </div>

            <Card elevation="elevated" className="p-8 bg-depth-elevated/30 border border-radiance-gold/30 backdrop-blur-md rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent" />

              <div className="relative z-10 space-y-6">
                <p className="text-text-secondary text-center">
                  This is a paid, high-signal session designed to:
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  {['Assess fit', 'Create clarity', 'Decide if it makes sense to move forward'].map((item, index) => (
                    <span key={index} className="px-4 py-2 rounded-full border border-radiance-gold/20 bg-radiance-gold/5 text-text-primary text-sm">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-depth-border/30 space-y-3 text-center">
                  <p className="text-text-secondary">If there's alignment, we'll outline next steps.</p>
                  <p className="text-text-primary font-medium">If not, you'll still leave with clarity.</p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-elevated to-depth-base relative overflow-hidden">
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
                Book Your AI Readiness Diagnostic
              </h2>
            </div>

            <div className="max-w-xl mx-auto space-y-4 text-text-secondary">
              <p>If you feel the market shifting...</p>
              <p>If you sense your current model won't last...</p>
              <p>If you know you're meant to operate at a higher level...</p>
            </div>

            <p className="text-xl text-radiance-gold font-medium">
              This is your next move.
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
                Book Your AI Readiness Diagnostic
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing Line */}
      <section className="py-12 bg-depth-base border-t border-depth-border relative overflow-hidden">
        {/* Subtle glow at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-radial-gradient from-radiance-gold/5 to-transparent blur-3xl pointer-events-none" />

        <Container size="narrow" className="text-center">
          <div className="relative z-10 space-y-4">
            <p className="text-text-secondary text-lg">
              <span className="text-radiance-gold font-medium">Light Brand</span> is not about surviving AI.
            </p>
            <p className="text-text-primary font-semibold text-xl">
              It's about becoming undeniable because of it.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};
