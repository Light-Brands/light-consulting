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
                AI Intelligence Ascension
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Your Business Doesn't Need More Effort.
              <span className="block text-radiance-gold mt-2 relative inline-block">
                It Needs an AI Intelligence System.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                AI is not an add-on. It's the foundation.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                See exactly how AI could run your business.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300 space-y-3">
              <p className="text-text-muted leading-relaxed">
                Most businesses experience friction from disconnected systems and manual processes.
              </p>
              <div className="pt-2">
                <p className="text-radiance-gold text-xl font-semibold">
                  Relief from friction starts here.
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
                Start Your Free AI Readiness Diagnostic
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              5-10 minutes · Strategic clarity · Zero commitment
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

      {/* Step 1 - Free AI Readiness Diagnostic */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Step 1: Entry Point
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Free AI Readiness Diagnostic
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              Your first step toward clarity
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <Card elevation="elevated" className="p-8 md:p-10 bg-depth-elevated/30 border border-radiance-gold/30 backdrop-blur-sm rounded-3xl relative overflow-hidden">
              {/* Blueprint background */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="relative z-10 space-y-6">
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
                    <div key={index} className="flex items-start gap-3 p-4 bg-depth-surface/50 rounded-xl border border-depth-border/50 hover:border-radiance-gold/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 font-bold text-sm font-mono shadow-[0_0_10px_rgba(232,184,74,0.2)]">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-text-primary font-medium text-sm">{item.label}</p>
                        <p className="text-text-muted text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-depth-border/30">
                  <p className="text-text-secondary text-center text-sm mb-4">
                    Immediately after submission, book a call to review your diagnostic summary.
                  </p>
                  <div className="flex justify-center">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => onNavigate('book')}
                      className="shadow-[0_0_20px_rgba(232,184,74,0.2)] hover:shadow-[0_0_30px_rgba(232,184,74,0.35)] transition-shadow duration-500"
                    >
                      Start Your Diagnostic Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Purpose indicators */}
            <div className="grid grid-cols-4 gap-3 mt-8">
              {[
                { title: 'Qualification', icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )},
                { title: 'Context', icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )},
                { title: 'Commitment', icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )},
                { title: 'Authority', icon: (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )},
              ].map((item, index) => (
                <div key={index} className="text-center p-3 bg-depth-surface/30 rounded-xl border border-depth-border/30 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-radiance-gold/10 text-radiance-gold flex items-center justify-center mx-auto mb-2">
                    {item.icon}
                  </div>
                  <p className="text-text-muted text-xs">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Step 2 - AI Readiness Executive Summary + System Preview */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              Step 2: The Conversion Engine
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              AI Readiness Executive Summary
              <span className="block text-radiance-gold mt-2">+ AI Intelligence System Preview</span>
            </h2>
            <p className="text-lg text-text-secondary">
              Your strategic call with Eyob
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            {/* Part 1: Executive Summary Review */}
            <div className="relative group">
              <div className="p-8 bg-depth-surface/30 border border-radiance-gold/30 backdrop-blur-sm rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center font-bold font-mono shadow-[0_0_20px_rgba(232,184,74,0.2)]">
                      1
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-text-muted uppercase tracking-[0.2em] block">PHASE_1</span>
                      <h3 className="text-lg font-bold text-radiance-gold">AI Readiness Executive Summary Review</h3>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm mb-6">
                    Eyob walks you through your personalized analysis:
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Your current AI readiness level',
                      'Where time, money, and leverage are being lost',
                      'What systems are fragmented or missing',
                      'Why growth feels heavier than it should',
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
                  <p className="text-radiance-amber font-medium text-center mt-6 text-sm">
                    This creates clarity + urgency.
                  </p>
                </div>
              </div>
            </div>

            {/* Part 2: System Preview */}
            <div className="relative group">
              <div className="p-8 bg-depth-surface/30 border border-wisdom-violet/30 backdrop-blur-sm rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #A78BFA 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-wisdom-violet/20 text-wisdom-violet flex items-center justify-center font-bold font-mono shadow-[0_0_20px_rgba(167,139,250,0.2)]">
                      2
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-text-muted uppercase tracking-[0.2em] block">PHASE_2</span>
                      <h3 className="text-lg font-bold text-wisdom-violet">AI Intelligence System Preview</h3>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm mb-6">
                    A visual and experiential look at what's possible:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { title: 'Automation Layers', desc: 'Eliminate operational drag' },
                      { title: 'Intelligence Layers', desc: 'Smart decision support' },
                      { title: 'Decision Support', desc: 'Data-driven insights' },
                      { title: 'Growth Leverage', desc: 'Scale without complexity' },
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-depth-elevated/50 rounded-xl border border-depth-border/50 hover:border-wisdom-violet/30 transition-colors">
                        <p className="text-text-primary font-medium text-sm">{item.title}</p>
                        <p className="text-text-muted text-xs">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-6 space-y-1">
                    <p className="text-wisdom-violet font-medium text-sm">
                      This makes AI feel real, practical, and inevitable.
                    </p>
                    <p className="text-radiance-gold font-semibold">
                      This is where desire locks in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Step 3 - Delivery Phase */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Step 3: Delivery Phase
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Build + Strategy
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              Where value is delivered
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="p-8 md:p-10 bg-depth-surface/30 border border-radiance-gold/30 backdrop-blur-sm rounded-3xl relative overflow-hidden">
              {/* Blueprint background */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-8">
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                  <h3 className="text-lg font-bold text-text-primary">What You Receive</h3>
                </div>

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
                    <div key={index} className="flex items-start gap-4 p-4 bg-depth-elevated/50 rounded-xl border border-depth-border/50 hover:border-radiance-gold/30 transition-colors group">
                      <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(232,184,74,0.2)] group-hover:shadow-[0_0_25px_rgba(232,184,74,0.3)] transition-shadow">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-text-primary font-medium text-sm">{item.title}</p>
                        <p className="text-text-muted text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-depth-border/30 pt-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-[8px] font-mono text-text-muted uppercase tracking-[0.2em]">VISIBILITY_INTO</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-depth-elevated/30 rounded-xl border border-depth-border/30">
                      <p className="text-radiance-gold font-medium text-xs">Automation Pathways</p>
                    </div>
                    <div className="p-3 bg-depth-elevated/30 rounded-xl border border-depth-border/30">
                      <p className="text-wisdom-violet font-medium text-xs">Intelligence Layers</p>
                    </div>
                    <div className="p-3 bg-depth-elevated/30 rounded-xl border border-depth-border/30">
                      <p className="text-radiance-amber font-medium text-xs">Growth Expansion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-depth-elevated/50 rounded-2xl border border-depth-border text-center backdrop-blur-sm">
              <p className="text-radiance-gold font-semibold text-lg">
                Trust is now fully established.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Step 4 - Expansion & Upsell */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              Step 4: Expansion & Upsell
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Second Call with Eyob
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              Leverage expansion opportunities
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="p-8 bg-depth-surface/30 border border-radiance-gold/30 backdrop-blur-sm rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[8px] font-mono text-text-muted uppercase tracking-[0.2em]">POST_DELIVERY</span>
                </div>
                <ul className="space-y-4">
                  {[
                    'Review the completed AI Intelligence System together',
                    'Identify leverage expansion opportunities',
                    'Introduce modular SaaS upgrades that integrate seamlessly',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 font-bold text-sm font-mono shadow-[0_0_10px_rgba(232,184,74,0.2)]">
                        {index + 1}
                      </div>
                      <span className="text-text-secondary text-sm leading-relaxed pt-1.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Upgrade Modules */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-[8px] font-mono text-text-muted uppercase tracking-[0.2em]">AVAILABLE_MODULES</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Sales Intelligence Systems' },
                  { title: 'Marketing Automation Engines' },
                  { title: 'CRM Intelligence Layers' },
                  { title: 'Operations Optimization AI' },
                  { title: 'Customer Intelligence Platforms' },
                  { title: 'Content & Distribution AI' },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-depth-surface/30 border border-depth-border/50 rounded-xl backdrop-blur-sm hover:border-radiance-gold/30 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-radiance-gold/10 text-radiance-gold flex items-center justify-center mb-3 group-hover:bg-radiance-gold/20 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="text-text-primary font-medium text-sm">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits of Each Upgrade */}
            <div className="p-6 bg-depth-elevated/50 rounded-2xl border border-depth-border backdrop-blur-sm">
              <p className="text-text-muted text-center text-sm mb-4">Each upgrade:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'Extends the existing system',
                  'Feels logical and aligned',
                  'Increases value naturally',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold"></div>
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
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
                Ready to begin your AI Intelligence Ascension?
              </h2>
            </div>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Start with the free AI Readiness Diagnostic. See where you stand. Get clarity on what's possible.
            </p>

            <p className="text-xl text-radiance-gold font-medium">
              Relief from friction is one conversation away.
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
                Start Your Free Diagnostic Now
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> Limited availability <span className="opacity-40">·</span> Real transformation only <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Final Positioning Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow">
          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <p className="text-lg text-text-secondary">
              Most businesses try to add AI on top of broken systems.
            </p>
            <p className="text-xl text-text-primary font-medium">
              We help you build AI as the foundation.
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              so growth becomes automated, intelligent, and leveraged.
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
              <span className="text-radiance-gold font-medium">Light Brand</span> builds AI Intelligence Systems
              that power client ascension.
            </p>
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
          </div>
        </Container>
      </section>
    </div>
  );
};
