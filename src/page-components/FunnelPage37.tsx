/**
 * Funnel Page 37: AI Intelligence Systems
 * Light Brand Consulting
 *
 * Page Function: High-converting funnel for 7-8 figure founders
 * - Target: 7-8 figure founders with lean teams, overwhelmed by AI rollout
 * - Hook: "Your Business Doesn't Need More AI Tools. It Needs an Intelligence System."
 * - Entry: AI Leverage Diagnostic
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage37Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage37: React.FC<FunnelPage37Props> = ({ onNavigate }) => {
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
                For 7-8 Figure Founders
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Your Business Doesn&apos;t Need More AI Tools.
              <span className="block text-radiance-gold mt-2 relative inline-block">
                It Needs an Intelligence System.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                You&apos;re a 7-8 figure founder with traction — but scaling feels harder, not easier.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                You&apos;ve got the tools, the team, and the ambition — but your systems are dragging.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300">
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  'Turn siloed data into decision power',
                  'Kill busywork with lean automation',
                  'Eliminate team friction',
                  'Get measurable ROI from AI — fast',
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
                Run Your AI Leverage Diagnostic
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              Get a custom AI Readiness Score + Execution Plan
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

      {/* The Problem Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Reality
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Still Frankenstein-ing
              <span className="block text-radiance-amber mt-2">Your Ops Stack?</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="p-8 rounded-2xl border border-depth-border bg-depth-surface/30 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-radiance-amber" />
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Current_State</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Your team is buried in tools',
                    'Your data is siloed',
                    'Your "AI rollout" is duct tape and Zapier',
                    'Decisions are slow',
                    'Ops are bloated',
                    'ROI is invisible',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-depth-elevated/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-amber flex-shrink-0"></div>
                      <span className="text-text-secondary text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-text-muted" />
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Industry_Stat</span>
                </div>
                <p className="text-4xl font-bold text-radiance-amber mb-2">74%</p>
                <p className="text-text-secondary">of AI projects are failing.</p>
              </div>
              <div className="p-6 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                  <span className="text-[10px] font-mono tracking-widest text-radiance-gold uppercase">Why_This_Happens</span>
                </div>
                <p className="text-text-primary italic">&ldquo;Most founders are paving cow paths — using expensive AI to patch broken systems.&rdquo;</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The Solution Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Shift
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              We Fix That. Fast.
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              We help lean teams replace complexity with <span className="text-radiance-gold font-semibold">intelligence architecture</span>.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Connected Workflows',
                  description: 'End the chaos of disconnected tools and manual handoffs',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                },
                {
                  title: 'Context-Aware AI Agents',
                  description: 'AI that understands your business, not just generic prompts',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: 'Centralized Data Pipelines',
                  description: 'Your data flowing where it needs to, when it needs to',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  ),
                },
                {
                  title: 'Real-Time Business Insight',
                  description: 'See what matters, when it matters, to decide faster',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <Card elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all h-full">
                    <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(232,184,74,0.2)] group-hover:shadow-[0_0_25px_rgba(232,184,74,0.3)] transition-shadow">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-radiance-gold transition-colors">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What We Deliver Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Blueprint grid background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Deliverables
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What We Actually Deliver
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              We design and deploy <span className="text-radiance-gold font-semibold">custom intelligence systems</span> that:
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            {[
              {
                title: 'Automate judgment-level tasks',
                desc: 'Not just data entry — actual decision support that frees your best people',
              },
              {
                title: 'Connect fragmented tools',
                desc: 'One system that makes everything work together, finally',
              },
              {
                title: 'Make your data AI-ready',
                desc: 'Structured, accessible, and actually useful for AI applications',
              },
              {
                title: 'Free up 30-50% of ops time',
                desc: 'Hours back every week for your team to focus on what matters',
              },
              {
                title: 'Deliver measurable ROI in 30 days',
                desc: 'Not promises — results you can see, track, and report',
              },
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Connecting line */}
                {idx < 4 && (
                  <div className="absolute left-5 top-14 w-px h-6 bg-gradient-to-b from-radiance-gold/30 to-transparent" />
                )}

                <div className="flex items-start gap-4 p-6 bg-depth-surface/30 border border-depth-border rounded-2xl backdrop-blur-sm hover:border-radiance-gold/30 transition-all group-hover:scale-[1.02]">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(232,184,74,0.2)] group-hover:shadow-[0_0_30px_rgba(232,184,74,0.4)] transition-shadow">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 relative z-10">
            <p className="text-xl text-radiance-gold font-semibold">
              No extra hires. No bloat. Just clean scale.
            </p>
          </div>
        </Container>
      </section>

      {/* This Is For Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-depth-border/50 to-transparent" />

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative z-10 items-start">
              {/* This is for */}
              <div className="space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-radiance-gold">This is for you if:</h3>
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                </div>

                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm flex-1 relative">
                  <ul className="space-y-3.5 relative z-10">
                    {[
                      'You\'re generating 7-8 figures with a lean team',
                      'You have a modern operational mindset',
                      'You\'re ambitious about scaling further',
                      'You already believe in AI — you\'re just stuck on rollout',
                      'You want clarity, execution, and ROI — not theory',
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
                      'Early-stage businesses still finding product-market fit',
                      'Companies looking for generic chatbot solutions',
                      'Teams that want AI "because everyone\'s doing it"',
                      'Organizations not ready to invest in real systems change',
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

      {/* The Offer Section */}
      <section className="section-spacing relative overflow-hidden">
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
              The Offer
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Escape AI Chaos
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              We help 7-8 figure founders escape AI chaos by architecting lean, intelligence-driven systems that reduce team drag, unlock scale, and deliver measurable ROI — <span className="text-radiance-gold font-semibold">in 30 days or less</span>.
            </p>
          </div>

          <div className="max-w-xl mx-auto relative z-10">
            <div className="p-8 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm relative">
              <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-radiance-gold/20 text-radiance-gold text-[10px] font-mono uppercase tracking-wider">
                30-Day Guarantee
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                <span className="text-[10px] font-mono tracking-widest text-radiance-gold uppercase">Intelligence_System</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">What You Get</h3>
              <ul className="space-y-3 mb-6">
                {[
                  'Custom intelligence architecture designed for your business',
                  'Connected workflows that eliminate manual friction',
                  'Context-aware AI agents that understand your operations',
                  'Centralized data pipelines for real-time insight',
                  'Measurable ROI within 30 days',
                  '30-50% ops time freed up for strategic work',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-text-secondary text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-radiance-gold"></span>
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
                Run Your AI Leverage Diagnostic
              </Button>
              <p className="text-text-muted text-xs text-center mt-4">
                Get a custom AI Readiness Score + Execution Plan
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="relative inline-block">
              <div className="absolute -inset-8 bg-radiance-gold/10 blur-3xl rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary relative z-10">
                Ready to stop drowning in AI chaos?
              </h2>
            </div>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              We help 7-8 figure founders eliminate ops drag and deploy AI that actually compounds — <span className="text-radiance-gold font-semibold">in 30 days or less</span>.
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
                Run Your AI Leverage Diagnostic
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> Custom AI Readiness Score <span className="opacity-40">·</span> Execution Plan <span className="opacity-40">·</span> Zero fluff <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Final Positioning Section */}
      <section className="section-spacing bg-depth-base relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow">
          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <p className="text-lg text-text-secondary">
              You&apos;re not alone. Most AI projects fail because they&apos;re patching broken systems.
            </p>
            <p className="text-xl text-text-primary font-medium">
              The answer isn&apos;t more tools. It&apos;s intelligence architecture.
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              Let&apos;s build the system your business actually needs.
            </p>
          </div>
        </Container>
      </section>

      {/* Closing Line */}
      <section className="py-12 bg-depth-base border-t border-depth-border relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-radial-gradient from-radiance-gold/5 to-transparent blur-3xl pointer-events-none" />

        <Container size="narrow" className="text-center">
          <div className="relative z-10 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
            <p className="text-text-muted">
              <span className="text-radiance-gold font-medium">Intelligence Systems</span> for
              7-8 figure founders ready to scale with AI.
            </p>
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
          </div>
        </Container>
      </section>
    </div>
  );
};
