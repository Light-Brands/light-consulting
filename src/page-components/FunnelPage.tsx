/**
 * AI Readiness Diagnostic Page
 * Light Brand Consulting
 *
 * Diagnostic Page Function: Sell clarity, not commitment
 * - Neutral positioning
 * - Honest about outcomes
 * - Non-salesy, decision-oriented
 * - "This may or may not lead to further work"
 */

import React from 'react';
import { Button, Card, Tag, FunnelReadinessVisual, DiagnosticDeliverablesVisual, MotionVsLeverageVisual } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { TESTIMONIALS, IMAGE_CONFIG, FIT_CRITERIA } from '../lib/constants';

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
                AI Readiness Diagnostic
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Discover how prepared your business
              <span className="block text-radiance-gold mt-2 relative inline-block">
                really is for the AI decade
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Most businesses think they're "using AI."
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                Very few are actually built for it.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300 space-y-4">
              <p className="text-text-muted leading-relaxed">
                AI is no longer a productivity tool. It's becoming the operating layer of modern businesses.
              </p>
              <div className="pt-4">
                <p className="text-text-secondary text-lg mb-3">
                  This diagnostic exists to answer one question:
                </p>
                <p className="text-radiance-gold text-xl font-semibold leading-relaxed">
                  Is your business structured to benefit from AI, or be disrupted by it?
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
                Start the AI Readiness Diagnostic
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              5–10 minutes · No fluff · No sales pitch
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

      {/* Why This Exists Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Why This Exists
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              AI doesn't fail businesses.
              <span className="block text-radiance-amber mt-2">Broken systems do.</span>
            </h2>
          </div>

          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-radiance-gold/5 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-radiance-gold/5 blur-3xl pointer-events-none rounded-full" />
            
            <div className="relative z-10 bg-depth-elevated/30 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <MotionVsLeverageVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* What This Is / What This Isn't Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <Container size="narrow">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto relative z-10 items-start">
            {/* What this is */}
            <div className="space-y-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-radiance-gold">What this is:</h3>
                <span className="px-2 py-0.5 rounded-full border border-radiance-gold/30 text-[8px] font-mono text-radiance-gold uppercase tracking-wider bg-radiance-gold/10">DIAGNOSTIC_TRUE</span>
              </div>
              
              <div className="p-6 rounded-2xl border border-radiance-gold/20 bg-radiance-gold/5 backdrop-blur-sm flex-1">
                <ul className="space-y-3.5">
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-secondary text-sm leading-relaxed">A strategic snapshot of your AI readiness</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-secondary text-sm leading-relaxed">A clear signal of where leverage is hiding</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-text-secondary text-sm leading-relaxed">A starting point for intelligent system design</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* What this is not */}
            <div className="space-y-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-text-muted">What this is not:</h3>
                <span className="px-2 py-0.5 rounded-full border border-depth-border text-[8px] font-mono text-text-muted uppercase tracking-wider bg-depth-elevated">DIAGNOSTIC_FALSE</span>
              </div>
              
              <div className="p-6 rounded-2xl border border-depth-border bg-depth-surface/30 backdrop-blur-sm flex-1">
                <ul className="space-y-3.5">
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-text-muted text-sm leading-relaxed">A personality quiz</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-text-muted text-sm leading-relaxed">A list of tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-text-muted text-sm leading-relaxed">A generic "AI assessment"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-text-muted text-sm leading-relaxed">A disguised sales funnel</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center mt-12 relative z-10 pt-8 border-t border-depth-border/30">
            <p className="text-text-secondary text-lg leading-relaxed">
              If there's a meaningful opportunity to move forward, we'll tell you.
            </p>
            <p className="text-text-primary font-medium mt-2">
              If there isn't, we'll tell you that too.
            </p>
          </div>
        </Container>
      </section>

      {/* The Frame Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Frame
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Every business sits somewhere on the AI readiness curve
            </h2>
          </div>

          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-radiance-gold/5 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-radiance-gold/5 blur-3xl pointer-events-none rounded-full" />
            
            <div className="relative z-10 bg-depth-elevated/30 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <FunnelReadinessVisual />
            </div>
          </div>

          <div className="mt-12 p-8 bg-depth-elevated/50 rounded-2xl border border-depth-border text-center backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <p className="text-text-secondary text-lg mb-4">
                Most companies believe they're further along than they are.
              </p>
              <p className="text-radiance-gold font-medium text-lg">
                This diagnostic reveals the truth: no hype, no pressure, no technical jargon.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What You'll Walk Away With Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="relative z-10">
            <div className="bg-depth-surface/30 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <DiagnosticDeliverablesVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* Who This Is For Section */}
      <section className="section-spacing relative overflow-hidden">
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
                  <h3 className="text-xl font-bold text-radiance-gold">This diagnostic is for founders who:</h3>
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                </div>
                
                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm flex-1 relative">
                  {/* Subtle accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-radiance-gold/20 rounded-l-2xl" />
                  
                  <ul className="space-y-3.5 relative z-10">
                    {FIT_CRITERIA.idealClients.map((item, index) => (
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
                    {FIT_CRITERIA.notAFit.map((item, index) => (
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

      {/* How It Works Section */}
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
              { step: 1, text: 'Answer a short set of focused questions' },
              { step: 2, text: 'We analyze your responses through our AI readiness framework' },
              { step: 3, text: 'You receive a clear snapshot of where you stand, and why' }
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
                    <p className="text-text-primary font-medium">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 relative z-10">
            <p className="text-text-muted border-t border-depth-border/50 pt-8 flex items-center justify-center gap-3">
              <span className="opacity-40 text-[10px] font-mono">//</span>
              <span>No obligation. No pressure. Just clarity.</span>
              <span className="opacity-40 text-[10px] font-mono">//</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Social Proof Section */}
      {TESTIMONIALS[0] && (
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
                      {TESTIMONIALS[0].quote}
                    </blockquote>
                  </div>

                  <div className="flex flex-col items-center gap-4 pt-6 border-t border-depth-border/30">
                    {TESTIMONIALS[0].avatar && (
                      <img
                        src={TESTIMONIALS[0].avatar}
                        alt={TESTIMONIALS[0].author}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-radiance-gold/30 shadow-[0_0_20px_rgba(232,184,74,0.2)]"
                      />
                    )}
                    <div className="text-center">
                      <p className="font-bold text-lg text-text-primary">{TESTIMONIALS[0].author}</p>
                      <p className="text-text-muted text-sm">{TESTIMONIALS[0].role}</p>
                      {TESTIMONIALS[0].company && (
                        <p className="text-text-muted text-sm">{TESTIMONIALS[0].company}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </section>
      )}

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
                Ready to see where you actually stand?
              </h2>
            </div>

            <p className="text-xl text-radiance-gold font-medium">
              One honest assessment can save you years of building the wrong thing.
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
                Start the AI Readiness Diagnostic
              </Button>
            </div>
            
            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> 5–10 minutes <span className="opacity-40">·</span> Strategic clarity <span className="opacity-40">·</span> Zero commitment <span className="opacity-40">//</span>
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
              <span className="text-radiance-gold font-medium">Light Brand</span> designs intelligence systems
              so businesses don't just use AI, they're built for it.
            </p>
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
          </div>
        </Container>
      </section>
    </div>
  );
};
