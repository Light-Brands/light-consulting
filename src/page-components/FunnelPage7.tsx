/**
 * Funnel Page 7: AI Governance Shield
 * Light Brand Consulting
 *
 * Page Function: AI compliance and governance positioning
 * - Target: Companies facing EU AI Act, state regulations
 * - Hook: "AI Compliance Isn't Coming. It's Here."
 * - Entry: AI Compliance Risk Score
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage7Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage7: React.FC<FunnelPage7Props> = ({ onNavigate }) => {
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
                AI Governance Shield
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              AI Compliance Isn't Coming.
              <span className="block text-radiance-gold mt-2 relative inline-block">
                It's Here.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                EU AI Act. Colorado AI Act. State regulations.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                67% of businesses are deploying AI without governance structures.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300 space-y-3">
              <p className="text-text-muted leading-relaxed">
                Fines up to 7% of global revenue. Reputational damage. Legal exposure.
              </p>
              <div className="pt-2">
                <p className="text-radiance-gold text-xl font-semibold">
                  Compliance isn't overhead. It's competitive advantage.
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
              5-10 minutes · Assess your AI readiness and exposure · No commitment
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

      {/* The Regulatory Landscape Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              2026 Regulatory Reality
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              The AI Compliance Wave
              <span className="block text-radiance-amber mt-2">Has Already Hit</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'EU AI Act',
                  status: 'Active',
                  impact: 'Affects any AI system serving EU citizens',
                  risk: 'Up to 7% global revenue in fines',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Colorado AI Act',
                  status: 'Effective 2026',
                  impact: 'High-risk AI decision systems',
                  risk: 'Consumer protection violations',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                },
                {
                  title: 'State Regulations',
                  status: 'Expanding',
                  impact: 'Texas, California, NY and more',
                  risk: 'Patchwork compliance burden',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-radiance-amber"></span>
                        <span className="text-radiance-amber text-xs font-medium">{item.status}</span>
                      </div>
                      <p className="text-text-secondary text-sm">{item.impact}</p>
                      <p className="text-text-muted text-xs italic">{item.risk}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-depth-elevated/50 rounded-2xl border border-depth-border text-center backdrop-blur-sm">
              <p className="text-radiance-gold font-semibold text-lg">
                71% have AI governance roles. 67% still lack the structures.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Risk Assessment Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              Your Exposure
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Are You at Risk?
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              Most companies don't know until it's too late
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
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
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">High_Risk_AI_Systems</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    'Hiring & recruitment AI',
                    'Credit & lending decisions',
                    'Insurance underwriting',
                    'Customer risk scoring',
                    'Content moderation',
                    'Healthcare recommendations',
                    'Educational assessment',
                    'Legal decision support',
                    'Biometric identification',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-depth-elevated/30 border border-depth-border/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-amber flex-shrink-0"></div>
                      <span className="text-text-secondary text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-text-primary font-medium text-lg text-center mt-8">
              If you use AI for any of these purposes, <span className="text-radiance-gold">you need governance now.</span>
            </p>
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
                      "You deploy AI that affects customer decisions",
                      "You serve EU citizens or operate in regulated states",
                      "Your board is asking about AI risk management",
                      "You're in financial services, healthcare, or HR tech",
                      "You want compliance to be a competitive advantage",
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
                      "Internal-only AI tools with no customer impact",
                      "Businesses with no AI in decision-making processes",
                      "Companies not serving regulated markets",
                      "Organizations with existing robust governance",
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

      {/* The Governance Process Section */}
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
              The Governance Shield
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              From Exposed to Protected
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A systematic approach to AI governance that protects and enables
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            {[
              {
                step: 1,
                title: 'AI Compliance Risk Score',
                text: 'Assess your current exposure across regulations, AI systems, and organizational gaps.',
                price: 'Free',
              },
              {
                step: 2,
                title: 'AI Governance Audit',
                text: 'Comprehensive gap analysis, risk assessment, and compliance roadmap for your specific situation.',
                price: '$2,500-5,000',
              },
              {
                step: 3,
                title: 'Governance Implementation',
                text: 'Full policies, documentation, training, and ongoing advisory to maintain compliance.',
                price: '$10,000+',
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
                      <div className="text-[8px] font-mono text-text-muted uppercase tracking-[0.2em]">PHASE_{item.step}</div>
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

      {/* Industry Focus Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Industry Focus
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Specialized for High-Stakes Industries
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 relative z-10">
            {[
              {
                title: 'Financial Services',
                desc: 'Highest regulatory scrutiny. Risk, fraud, and lending AI under intense examination.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Healthcare',
                desc: 'HIPAA + AI complexity. Clinical decisions, patient data, and diagnostic support.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
              {
                title: 'HR & Hiring',
                desc: 'Hiring AI under attack. Bias, discrimination, and decision transparency.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <Card key={index} elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(232,184,74,0.2)] group-hover:shadow-[0_0_25px_rgba(232,184,74,0.3)] transition-shadow">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-radiance-gold transition-colors">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
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
                Don't wait for the audit.
              </h2>
            </div>

            <p className="text-xl text-radiance-gold font-medium">
              The EU AI Act fines are real. Your governance shouldn't be theoretical.
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
              <span className="opacity-40">//</span> 5-10 minutes <span className="opacity-40">·</span> Strategic clarity <span className="opacity-40">·</span> Zero commitment <span className="opacity-40">//</span>
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
              AI compliance isn't about slowing down innovation.
            </p>
            <p className="text-xl text-text-primary font-medium">
              It's about building trust that scales.
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              Governance today. Competitive advantage tomorrow.
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
              <span className="text-radiance-gold font-medium">Light Brand</span> builds AI Governance Shields
              that protect and enable growth.
            </p>
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
          </div>
        </Container>
      </section>
    </div>
  );
};
