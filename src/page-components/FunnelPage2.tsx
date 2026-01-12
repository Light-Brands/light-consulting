/**
 * Funnel Page 2: Web2 to AI-Native Transformation
 * Light Brand Consulting
 *
 * Page Function: Help clients understand the foundational shift
 * - From traditional website (Web2) to AI intelligence system
 * - Not an upgrade. A complete transformation of the foundation
 * - Everything built next becomes possible when the foundation changes
 */

import React from 'react';
import { Button, Card, Tag, FoundationComparisonVisual } from '../components';
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

        {/* Single subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient from-radiance-gold/4 to-transparent blur-[100px] pointer-events-none z-[1]" />

        {/* Hero Content */}
        <Container size="wide" className="relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="animate-fade-in">
              <Tag variant="default" className="mx-auto backdrop-blur-sm">
                The Foundation Shift
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Your website isn't holding you back.
              <span className="block text-radiance-gold mt-2 relative inline-block">
                Your foundation is.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Most businesses are building on Web2.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                We move you to AI-native.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300 space-y-3">
              <p className="text-text-muted leading-relaxed">
                This isn't about redesigning your website or adding features.
              </p>
              <div className="pt-2 border-t border-depth-border/30">
                <p className="text-radiance-gold text-xl font-semibold">
                  It's about transforming the foundation your entire online business is built on.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-up delay-400">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination hover:shadow-[0_0_40px_rgba(232,184,74,0.35)] transition-shadow duration-500"
              >
                Explore the Transformation
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              Understand what's possible when your foundation changes
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
              The Real Issue
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Everything you build
              <span className="block text-radiance-amber mt-2">depends on your foundation.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-lg text-text-secondary relative z-10 text-center">
            <p>Most businesses today are operating on a traditional website foundation.</p>

            <p>Their website is the base of their online presence, and everything else they try to build depends on that foundation.</p>

            <div className="relative mt-8 group">
              <div className="p-8 rounded-2xl border border-depth-border bg-depth-elevated/30 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                  style={{ 
                    backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)', 
                    backgroundSize: '24px 24px' 
                  }} 
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-radiance-amber" />
                    <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Foundation::Limitation_Analysis</span>
                  </div>
                  <p className="text-text-primary font-medium text-xl mb-4">
                    If the foundation is limited, everything built on top of it is limited.
                  </p>
                  <div className="space-y-3 text-text-secondary">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted flex-shrink-0"></div>
                      <p>Automation hits walls</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted flex-shrink-0"></div>
                      <p>Personalization stays surface-level</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted flex-shrink-0"></div>
                      <p>Workflows remain manual</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted flex-shrink-0"></div>
                      <p>Every new feature requires workarounds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-radiance-amber font-medium pt-4 text-center">
              The problem isn't your website. It's what your website is built on.
            </p>
          </div>
        </Container>
      </section>

      {/* The Shift Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Shift
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              This is not a website upgrade.
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              This is a complete transformation of your foundation.
            </p>
          </div>

          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-radiance-gold/5 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-radiance-gold/5 blur-3xl pointer-events-none rounded-full" />
            
            <div className="relative z-10 bg-depth-elevated/30 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <FoundationComparisonVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* What This Means Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              What This Means
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              When the foundation changes,
              <span className="block text-radiance-gold mt-2">everything becomes possible.</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
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

      {/* What This Is Not Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              Be Clear
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              This is not about redesign, plugins, or features.
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Subtle divider line */}
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-depth-border/50 to-transparent" />
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative z-10 items-start">
              {/* What this is NOT */}
              <div className="space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-text-muted">What this is NOT:</h3>
                  <span className="px-2 py-0.5 rounded-full border border-depth-border text-[8px] font-mono text-text-muted uppercase tracking-wider bg-depth-elevated">NOT_TRANSFORMATION</span>
                </div>
                
                <div className="p-6 rounded-2xl border-l-2 border-depth-border/30 bg-depth-surface/30 backdrop-blur-sm flex-1">
                  <ul className="space-y-3.5">
                    {[
                      'A website redesign',
                      'Adding AI plugins',
                      'New features on old foundation',
                      'A chatbot on your homepage',
                      'Incremental improvements',
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

              {/* What this IS */}
              <div className="space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-radiance-gold">What this IS:</h3>
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                </div>
                
                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm flex-1 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-radiance-gold/20 rounded-l-2xl" />
                  
                  <ul className="space-y-3.5 relative z-10">
                    {[
                      'A total transformation of your foundation',
                      'Moving from Web2 to AI-native',
                      'Building on an intelligence layer',
                      'Future-proofing your entire business',
                      'Unlocking what was impossible before',
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
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center mt-12 relative z-10 pt-8 border-t border-depth-border/30">
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
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Transformation
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              From limited to limitless
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Transformation Steps */}
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 font-bold font-mono text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-secondary mb-1">Traditional Website</h3>
                  <p className="text-text-muted text-sm">Your online presence is a static foundation</p>
                </div>
              </div>

              <div className="flex justify-center py-2">
                <div className="w-px h-8 bg-gradient-to-b from-depth-border via-radiance-gold/50 to-depth-border" />
              </div>

              <div className="flex items-center gap-6 p-6 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/20 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-amber flex items-center justify-center flex-shrink-0 font-bold font-mono text-lg shadow-[0_0_15px_rgba(232,184,74,0.3)]">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-radiance-amber mb-1">The Transformation</h3>
                  <p className="text-text-secondary text-sm">We rebuild your foundation on AI infrastructure</p>
                </div>
              </div>

              <div className="flex justify-center py-2">
                <div className="w-px h-8 bg-gradient-to-b from-depth-border via-radiance-gold/50 to-radiance-gold/30" />
              </div>

              <div className="flex items-center gap-6 p-6 rounded-2xl bg-radiance-gold/10 border border-radiance-gold/30 backdrop-blur-sm shadow-[0_0_30px_rgba(232,184,74,0.05)]">
                <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 font-bold font-mono text-lg shadow-[0_0_20px_rgba(232,184,74,0.4)]">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-radiance-gold mb-1">AI-Native Business</h3>
                  <p className="text-text-primary text-sm">Everything you build is now powered by intelligence</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-depth-elevated/50 rounded-2xl border border-depth-border text-center backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <p className="text-text-secondary text-lg mb-4 leading-relaxed">
                  Your business is no longer constrained by traditional website limitations.
                </p>
                <p className="text-radiance-gold font-medium text-lg">
                  The foundation has changed. Build whatever you imagine.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Who This Is For Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
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
                  <h3 className="text-xl font-bold text-radiance-gold">This transformation is for businesses who:</h3>
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                </div>
                
                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm flex-1 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-radiance-gold/20 rounded-l-2xl" />
                  
                  <ul className="space-y-3.5 relative z-10">
                    {[
                      'Feel limited by their current website',
                      'Know AI will reshape their industry',
                      'Want to build intelligent products and services',
                      'Are ready to invest in their foundation',
                      'Think long-term, not quick fixes',
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
                  <h3 className="text-xl font-bold text-text-muted">This is NOT for:</h3>
                  <span className="px-2 py-0.5 rounded-full border border-depth-border text-[8px] font-mono text-text-muted uppercase tracking-wider bg-depth-elevated">NOT_TRANSFORMATION</span>
                </div>
                
                <div className="p-6 rounded-2xl border-l-2 border-depth-border/30 bg-depth-surface/30 backdrop-blur-sm flex-1">
                  <ul className="space-y-3.5">
                    {[
                      'Those looking for a quick website refresh',
                      'Businesses wanting to "add AI" superficially',
                      'Companies not ready to rethink their foundation',
                      'Those seeking the cheapest option',
                      'Businesses without real traction to scale',
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

      {/* Final CTA Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-elevated to-depth-base relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="wide">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Ready to transform your foundation?
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
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
                className="shadow-[0_0_30px_rgba(232,184,74,0.25)] hover:shadow-[0_0_50px_rgba(232,184,74,0.4)] transition-all duration-500"
              >
                Begin the Transformation
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-60">//</span> Let's discuss whether this transformation is right for your business <span className="opacity-60">//</span>
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
              <span className="text-radiance-gold font-medium">Light Brand</span> transforms businesses
              from Web2 foundations to AI-native intelligence systems.
            </p>
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
          </div>
        </Container>
      </section>
    </div>
  );
};
