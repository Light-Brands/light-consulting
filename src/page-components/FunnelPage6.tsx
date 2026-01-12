/**
 * Funnel Page 6: AI Pilot Rescue
 * Light Brand Consulting
 *
 * Page Function: Rescue AI pilots stuck in purgatory
 * - Target: 67% of companies stuck between pilot and scaling
 * - Hook: "Your AI Pilot Isn't Broken. Your Scaling Strategy Is."
 * - Entry: Pilot Purgatory Assessment
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage6Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage6: React.FC<FunnelPage6Props> = ({ onNavigate }) => {
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
                AI Pilot Rescue
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Your AI Pilot Isn't Broken.
              <span className="block text-radiance-gold mt-2 relative inline-block">
                Your Scaling Strategy Is.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                67% of companies are stuck between pilot and production.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                The gap isn't technical. It's structural.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300 space-y-3">
              <p className="text-text-muted leading-relaxed">
                Your pilot worked. It proved the concept. But scaling requires a different kind of infrastructure.
              </p>
              <div className="pt-2">
                <p className="text-radiance-gold text-xl font-semibold">
                  We help you bridge the gap from experiment to enterprise.
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
                Take the Pilot Purgatory Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              5 minutes · Discover your scaling blockers · Free
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
              Pilot Purgatory
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              You've Proven AI Works.
              <span className="block text-radiance-amber mt-2">So Why Can't You Scale It?</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="relative group">
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
                    <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Common_Symptoms</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      'Pilot succeeded but hasn\'t expanded',
                      'Leadership excited but skeptical about ROI',
                      'IT bottlenecks blocking deployment',
                      'Data silos preventing integration',
                      'No clear ownership of AI initiatives',
                      'Fear of scaling costs and complexity',
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

            <p className="text-text-primary font-medium text-xl text-center">
              The truth? <span className="text-radiance-gold">Pilots prove concepts. Systems prove value.</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Why Pilots Stall Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Real Issue
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Why AI Pilots Stall
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              It's not the technology. It's the organization.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Isolated Success',
                  problem: 'Pilots built in silos',
                  solution: 'Integration architecture needed',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  ),
                },
                {
                  title: 'Missing Infrastructure',
                  problem: 'Legacy systems can\'t support AI',
                  solution: 'Foundation redesign required',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  ),
                },
                {
                  title: 'Organizational Friction',
                  problem: 'No clear ownership or budget',
                  solution: 'Governance framework needed',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <Card elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all h-full">
                    <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(232,184,74,0.2)] group-hover:shadow-[0_0_25px_rgba(232,184,74,0.3)] transition-shadow">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-radiance-gold transition-colors">{item.title}</h3>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-depth-elevated/50 border border-depth-border/50">
                        <span className="text-[8px] font-mono text-text-muted uppercase tracking-wider block mb-1">PROBLEM</span>
                        <p className="text-text-muted text-sm">{item.problem}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-radiance-gold/5 border border-radiance-gold/20">
                        <span className="text-[8px] font-mono text-radiance-gold uppercase tracking-wider block mb-1">SOLUTION</span>
                        <p className="text-text-secondary text-sm">{item.solution}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* This Is For Section */}
      <section className="section-spacing relative overflow-hidden">
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
                  <h3 className="text-xl font-bold text-radiance-gold">This is for you if:</h3>
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                </div>

                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm flex-1 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-radiance-gold/20 rounded-l-2xl" />

                  <ul className="space-y-3.5 relative z-10">
                    {[
                      "You have AI pilots that proved value but haven't scaled",
                      "Your team is frustrated with pilot purgatory",
                      "Leadership is asking 'why can't we scale this?'",
                      "You've invested in AI but aren't seeing enterprise-wide impact",
                      "You need a clear roadmap from pilot to production",
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
                      "Companies that haven't started any AI initiatives",
                      "Organizations looking for their first AI pilot",
                      "Teams seeking quick AI hacks or shortcuts",
                      "Businesses without executive sponsorship for AI",
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

      {/* The Rescue Process Section */}
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
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Rescue Process
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              From Pilot to Production
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A systematic approach to scaling AI that actually works
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            {[
              {
                step: 1,
                title: 'Pilot Purgatory Assessment',
                text: 'Identify what\'s actually blocking your scale: is it technical, organizational, or strategic?',
                price: 'Free',
              },
              {
                step: 2,
                title: 'Pilot-to-Production Roadmap',
                text: 'A detailed analysis of why your pilot hasn\'t scaled, with a clear 90-day scaling plan.',
                price: '$500-1,500',
              },
              {
                step: 3,
                title: 'Full AI Intelligence Strategy',
                text: 'Complete scaling implementation with organizational design, integration architecture, and change management.',
                price: 'Custom',
              }
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
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-[8px] font-mono text-text-muted uppercase tracking-[0.2em]">STEP_{item.step}</div>
                      <span className="text-radiance-gold text-xs font-medium">{item.price}</span>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Messaging Section */}
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
                <div className="text-center space-y-4">
                  <p className="text-xl text-text-secondary italic">
                    "Your pilot worked. Your organization didn't."
                  </p>
                  <div className="w-16 h-px bg-radiance-gold/30 mx-auto" />
                  <p className="text-xl text-text-secondary italic">
                    "Pilots prove concepts. Systems prove value."
                  </p>
                  <div className="w-16 h-px bg-radiance-gold/30 mx-auto" />
                  <p className="text-xl text-radiance-gold font-medium italic">
                    "The gap isn't technical. It's structural."
                  </p>
                </div>
              </div>
            </Card>
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
                Ready to escape pilot purgatory?
              </h2>
            </div>

            <p className="text-xl text-radiance-gold font-medium">
              Find out what's really blocking your AI from scaling.
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
                Take the Pilot Purgatory Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> Free assessment <span className="opacity-40">·</span> 5 minutes <span className="opacity-40">·</span> Actionable insights <span className="opacity-40">//</span>
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
              67% of AI initiatives are stuck in pilot purgatory.
            </p>
            <p className="text-xl text-text-primary font-medium">
              The difference between the 33% that scale and the rest?
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              They built systems, not experiments.
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
              <span className="text-radiance-gold font-medium">Light Brand</span> rescues AI pilots
              and turns them into enterprise-scale systems.
            </p>
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
          </div>
        </Container>
      </section>
    </div>
  );
};
