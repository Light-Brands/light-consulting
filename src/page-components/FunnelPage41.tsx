/**
 * Funnel Page 41: The COO's Efficiency Engine
 * Light Brand Consulting
 *
 * Page Function: Role-specific funnel targeting COOs and operations leaders
 * - Target: COOs, VPs of Ops, and operations leaders focused on efficiency
 * - Hook: "The COO's Blueprint for AI-Powered Operations"
 * - Entry: Operations AI Assessment
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage41Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage41: React.FC<FunnelPage41Props> = ({ onNavigate }) => {
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

        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient from-radiance-gold/4 to-transparent blur-[100px] pointer-events-none z-[1]" />

        {/* Hero Content */}
        <Container size="wide" className="relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="animate-fade-in">
              <Tag variant="premium" className="mx-auto backdrop-blur-sm">
                For COOs and Operations Leaders
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              The COO&apos;s Blueprint for
              <span className="block text-radiance-gold mt-2 relative inline-block">
                AI-Powered Operations
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Your team is stretched. Processes are breaking. And everyone wants AI to fix it.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                But you know the real problem: AI without operational clarity is just expensive chaos.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300">
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  'Cut 30-50% of operational drag',
                  'Automate judgment-level decisions',
                  'Connect fragmented workflows',
                  'Measurable efficiency gains in 30 days',
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
                Get Your Operations AI Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              Free diagnostic - Identify your highest-ROI automation opportunities
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

      {/* The Ops Reality */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Reality
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Sound Familiar?
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: 'Manual Handoffs Everywhere',
                  desc: 'Information trapped in email chains, spreadsheets, and Slack threads',
                  stat: '40%',
                  statLabel: 'of ops time lost to manual coordination',
                },
                {
                  title: 'Disconnected Systems',
                  desc: 'CRM, ERP, project tools - all operating in silos',
                  stat: '56%',
                  statLabel: 'unsure if systems are AI-ready',
                },
                {
                  title: 'Firefighting Mode',
                  desc: 'Reactive problem-solving instead of strategic improvement',
                  stat: '3-4x',
                  statLabel: 'cost of reactive vs. preventive ops',
                },
                {
                  title: 'Scaling Without Scale',
                  desc: 'Headcount grows faster than revenue',
                  stat: '30-50%',
                  statLabel: 'efficiency gains possible with AI',
                },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-radiance-amber mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm mb-4">{item.desc}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-radiance-gold">{item.stat}</span>
                    <span className="text-text-muted text-xs">{item.statLabel}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm text-center">
              <p className="text-text-primary text-lg mb-2">The COO&apos;s AI paradox:</p>
              <p className="text-xl font-bold text-radiance-gold">
                &ldquo;You need AI to scale, but you can&apos;t deploy AI on broken processes.&rdquo;
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The Efficiency Engine */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Solution
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              The Operations AI Stack
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Four layers that transform ops from cost center to competitive advantage
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="space-y-6">
              {[
                {
                  layer: 'Layer 1',
                  title: 'Process Intelligence',
                  desc: 'Map and analyze your actual workflows - not how you think they work',
                  outcomes: ['Identify bottlenecks automatically', 'Quantify inefficiency costs', 'Prioritize automation candidates'],
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  ),
                },
                {
                  layer: 'Layer 2',
                  title: 'Workflow Automation',
                  desc: 'Connect systems and eliminate manual handoffs',
                  outcomes: ['Automated data flow between tools', 'Zero-touch routine processes', 'Exception-based human intervention'],
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                },
                {
                  layer: 'Layer 3',
                  title: 'AI Decision Support',
                  desc: 'Automate judgment calls that follow patterns',
                  outcomes: ['Intelligent routing and prioritization', 'Predictive issue detection', 'Automated approvals within parameters'],
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  layer: 'Layer 4',
                  title: 'Operational Intelligence',
                  desc: 'Real-time visibility and predictive insights',
                  outcomes: ['Live operational dashboards', 'Anomaly detection and alerts', 'Capacity and demand forecasting'],
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-6 p-6 bg-depth-surface/30 border border-depth-border rounded-2xl backdrop-blur-sm hover:border-radiance-gold/30 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-radiance-gold text-xs uppercase tracking-wider font-mono">{item.layer}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-text-secondary mb-4">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.outcomes.map((outcome, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-depth-elevated/50 text-text-secondary text-xs">
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Results
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What Operations AI Delivers
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { metric: '30-50%', label: 'Ops time freed up', detail: 'For strategic work, not firefighting' },
                { metric: '40%', label: 'Faster decisions', detail: 'With AI-powered insights' },
                { metric: '90 days', label: 'To positive ROI', detail: 'Not years of investment' },
                { metric: '3-4x', label: 'Team leverage', detail: 'Without headcount growth' },
              ].map((item, index) => (
                <Card key={index} elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm text-center">
                  <p className="text-3xl font-bold text-radiance-gold mb-2">{item.metric}</p>
                  <p className="text-text-primary font-medium mb-1">{item.label}</p>
                  <p className="text-text-muted text-xs">{item.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* The Assessment */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              Get Started
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Operations AI Assessment
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Identify your highest-ROI automation opportunities
            </p>
          </div>

          <div className="max-w-xl mx-auto relative z-10">
            <div className="p-8 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                <span className="text-[10px] font-mono tracking-widest text-radiance-gold uppercase">Assessment_Includes</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Process efficiency analysis across key workflows',
                  'Automation opportunity mapping with ROI estimates',
                  'System integration assessment',
                  'Quick wins you can implement immediately',
                  'Custom 90-day operations AI roadmap',
                  'Team impact and change management plan',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-text-secondary">
                    <div className="w-5 h-5 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
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
                Get Your Operations Assessment
              </Button>
              <p className="text-text-muted text-xs text-center mt-4">
                Free diagnostic for qualified operations leaders
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Ready to Transform Operations?
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Stop fighting fires. Start building operational leverage with AI.
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
                Get Your Operations Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> 30-50% efficiency gains <span className="opacity-40">+</span> 90-day ROI <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};
