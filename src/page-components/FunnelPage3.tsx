/**
 * Funnel Page 3: AI Intelligent System
 * Light Brand Consulting
 *
 * Page Function: Position AI as a system that works for them
 * - Sell clarity, leverage, and execution - not AI theory
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
                Beyond Website Tactics
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Move Beyond Website Tactics.
              <span className="block text-radiance-gold mt-2 relative inline-block">
                Build an AI Intelligent System.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                You don't need more effort. You don't need more tools.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                You need a system that powers growth, automation, and leverage.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300 space-y-3">
              <p className="text-text-muted leading-relaxed">
                Most businesses are running modern operations on outdated infrastructure.
              </p>
              <div className="pt-2">
                <p className="text-radiance-gold text-xl font-semibold">
                  An AI Intelligent System changes the foundation itself.
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
                Book a Transformation Clarity Session
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              15 minutes · No obligation · Clarity first
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

      {/* This Is For You If Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
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
                  <h3 className="text-xl font-bold text-radiance-gold">This is for founders who:</h3>
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                </div>

                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm flex-1 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-radiance-gold/20 rounded-l-2xl" />

                  <ul className="space-y-3.5 relative z-10">
                    {[
                      "Have outgrown their current website, tools, or workflows",
                      "Rely too heavily on manual decisions and founder effort",
                      "Are experimenting with AI but seeing fragmented results",
                      "Want real leverage, not another tactic",
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
                      "Businesses not ready for systematic change",
                      "Template-driven businesses seeking quick fixes",
                      "Anyone looking for surface-level automation",
                      "Those seeking the cheapest option available",
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

      {/* The Real Problem Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Real Issue
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Your Website Isn't the Problem.
              <span className="block text-radiance-amber mt-2">Your Foundation Is.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <p className="text-lg text-text-secondary text-center">Most businesses believe they have:</p>

            <div className="relative group">
              <div className="p-8 rounded-2xl border border-depth-border bg-depth-surface/30 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-text-muted/50" />
                    <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Perceived_Problems</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-depth-elevated/50 border border-depth-border/50">
                      <p className="text-text-muted">a traffic problem</p>
                    </div>
                    <div className="p-4 rounded-xl bg-depth-elevated/50 border border-depth-border/50">
                      <p className="text-text-muted">a conversion problem</p>
                    </div>
                    <div className="p-4 rounded-xl bg-depth-elevated/50 border border-depth-border/50">
                      <p className="text-text-muted">a content problem</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-text-primary font-medium text-xl text-center">
              In reality, they have a <span className="text-radiance-gold">foundation problem.</span>
            </p>

            <div className="relative group">
              <div className="p-8 rounded-2xl border border-radiance-gold/20 bg-radiance-gold/5 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-radiance-amber" />
                    <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Foundation::Web2_Limitations</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      'Static websites',
                      'Disconnected tools',
                      'Manual decision-making',
                      'AI layered on after the fact',
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

            <p className="text-radiance-amber font-semibold text-xl text-center">
              No amount of plugins can fix a broken foundation.
            </p>
          </div>
        </Container>
      </section>

      {/* We Build AI Intelligent Systems Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              Our Approach
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              We Build AI Intelligent Systems
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              Not just websites.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <p className="text-lg text-text-secondary text-center">
              An AI Intelligent System means intelligence is <span className="text-radiance-gold font-medium">embedded beneath the business</span>, not bolted on top.
            </p>

            <div className="relative max-w-3xl mx-auto">
              {/* Subtle divider line */}
              <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-depth-border/50 to-transparent" />

              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="p-6 rounded-2xl border-l-2 border-depth-border/30 bg-depth-surface/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded-full border border-depth-border text-[8px] font-mono text-text-muted uppercase tracking-wider bg-depth-elevated">WRONG_QUESTION</span>
                  </div>
                  <p className="text-text-muted text-lg italic">"How do we use AI?"</p>
                </div>

                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                    <span className="px-2 py-0.5 rounded-full border border-radiance-gold/30 text-[8px] font-mono text-radiance-gold uppercase tracking-wider bg-radiance-gold/10">RIGHT_QUESTION</span>
                  </div>
                  <p className="text-text-primary text-lg italic">"Where should intelligence live inside this business?"</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-depth-elevated/50 rounded-2xl border border-depth-border text-center backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <p className="text-radiance-gold font-medium text-xl">
                  That shift changes everything.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* AI Foundation Infographic Section */}
      <section className="section-spacing bg-depth-elevated overflow-hidden relative">
        <Container size="wide">
          <div className="text-center mb-16 relative z-10">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-radiance-gold/10 border border-radiance-gold/30 backdrop-blur-sm mb-8">
              <span className="text-xs font-bold text-radiance-gold uppercase tracking-[0.2em]">The Foundation</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              <span className="block">One Core System.</span>
              <span className="block text-radiance-gold mt-2">Infinite Possibilities.</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Your AI Intelligence System sits at the center, and modules connect to unlock automation, personalization, and leverage.
            </p>
          </div>

          <div className="relative z-10">
            <AIFoundationInfographic />
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              What You Gain
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              With an AI Intelligent System,
              <span className="block text-radiance-gold mt-2">your business gains:</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Smart 2-3 layout: 2 items on top (centered), 3 items on bottom */}
            <div className="space-y-6">
              {/* First row: 2 items centered */}
              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {[
                  {
                    title: 'Automation',
                    description: 'That removes operational drag',
                  },
                  {
                    title: 'Personalization',
                    description: 'Across customer journeys',
                  },
                ].map((item, index) => (
                  <div key={index} className="p-5 bg-depth-surface/30 border border-depth-border/50 rounded-2xl backdrop-blur-sm hover:border-radiance-gold/30 transition-colors group">
                    <h3 className="text-text-primary font-bold mb-2 group-hover:text-radiance-gold transition-colors">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Second row: 3 items */}
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Intelligence',
                    description: 'That improves decisions over time',
                  },
                  {
                    title: 'Leverage',
                    description: 'Without hiring or burnout',
                  },
                  {
                    title: 'Scalability',
                    description: 'Without complexity',
                  },
                ].map((item, index) => (
                  <div key={index} className="p-5 bg-depth-surface/30 border border-depth-border/50 rounded-2xl backdrop-blur-sm hover:border-radiance-gold/30 transition-colors group">
                    <h3 className="text-text-primary font-bold mb-2 group-hover:text-radiance-gold transition-colors">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing statement */}
            <div className="mt-12 p-8 bg-depth-elevated/50 rounded-2xl border border-depth-border text-center backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <p className="text-text-muted text-lg mb-4">This isn't a redesign.</p>
                <p className="text-radiance-gold font-semibold text-xl">It's a structural upgrade.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Proof / Credibility Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow">
          <div className="max-w-3xl mx-auto relative group">
            {/* Hover glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <Card elevation="elevated" className="p-10 md:p-12 bg-depth-elevated/30 border border-radiance-gold/30 backdrop-blur-md rounded-3xl relative overflow-hidden">
              {/* Blueprint background */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent" />

              <div className="relative z-10 space-y-8">
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-radiance-gold fill-current drop-shadow-[0_0_8px_rgba(232,184,74,0.5)]" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                <div className="relative">
                  {/* Quote mark decoration */}
                  <div className="absolute -top-4 -left-2 text-6xl text-radiance-gold/20 font-serif leading-none">"</div>

                  <blockquote className="text-xl md:text-2xl text-text-primary leading-relaxed text-center font-medium relative z-10">
                    After implementing our AI Intelligent System, we reduced lead response time by 4× and automated workflows that used to take hours each week.
                  </blockquote>
                </div>

                <div className="flex flex-col items-center gap-4 pt-6 border-t border-depth-border/30">
                  <div className="text-center">
                    <p className="font-bold text-lg text-text-primary">Service Business Founder</p>
                    <p className="text-text-muted text-sm">B2B Services Industry</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
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
              How It Works
            </Tag>
          </div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            {[
              { step: 1, title: 'Transformation Clarity Session', text: 'We diagnose where your current foundation is leaking value, and where intelligence would actually help.' },
              { step: 2, title: 'AI System Blueprint', text: 'If there\'s leverage, we map a custom AI Intelligent System for your business.' },
              { step: 3, title: 'Strategic Support', text: 'Implementation guidance and optimization, so the system drives real ROI, not just ideas.' }
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
                    <div className="text-[8px] font-mono text-text-muted mb-1 uppercase tracking-[0.2em]">STEP_{item.step}</div>
                    <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 relative z-10">
            <p className="text-text-muted border-t border-depth-border/50 pt-8 flex items-center justify-center gap-3">
              <span className="opacity-40 text-[10px] font-mono">//</span>
              <span>No pressure. No pitchy calls. Just clarity.</span>
              <span className="opacity-40 text-[10px] font-mono">//</span>
            </p>
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
                Ready to see if your business is built to scale?
              </h2>
            </div>

            <p className="text-xl text-radiance-gold font-medium">
              One conversation can reveal years of hidden leverage.
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
                Book a Transformation Clarity Session
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> 15 minutes <span className="opacity-40">·</span> Limited availability <span className="opacity-40">·</span> Zero pressure <span className="opacity-40">//</span>
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
              Most businesses try to scale on top of broken foundations.
            </p>
            <p className="text-xl text-text-primary font-medium">
              We help you rebuild beneath the business.
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              so growth becomes simpler, smarter, and sustainable.
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
              <span className="text-radiance-gold font-medium">Light Brand</span> builds AI Intelligent Systems
              that power growth, automation, and leverage.
            </p>
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
          </div>
        </Container>
      </section>
    </div>
  );
};
