/**
 * Funnel Page 38: The 95% Problem - Why Most AI Projects Fail
 * Light Brand Consulting
 *
 * Page Function: Problem-aware funnel targeting executives who've heard AI failure stats
 * - Target: Business leaders skeptical of AI after failed pilots or hearing horror stories
 * - Hook: "95% of AI Projects Fail. Here's How to Be in the 5%."
 * - Entry: AI Failure Audit - Identify what's blocking your AI success
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage38Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage38: React.FC<FunnelPage38Props> = ({ onNavigate }) => {
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

        {/* Subtle warning glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient from-radiance-amber/5 to-transparent blur-[100px] pointer-events-none z-[1]" />

        {/* Hero Content */}
        <Container size="wide" className="relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="animate-fade-in">
              <Tag variant="default" className="mx-auto backdrop-blur-sm border-radiance-amber/30 text-radiance-amber">
                MIT Research 2025
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              <span className="text-radiance-amber">95%</span> of AI Projects Fail.
              <span className="block text-radiance-gold mt-2 relative inline-block">
                Here&apos;s How to Be in the 5%.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                You&apos;ve seen the headlines. Maybe you&apos;ve lived the failure.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                The problem isn&apos;t AI. It&apos;s how businesses approach it.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300">
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  'Discover why pilots never reach production',
                  'Identify the 5 failure patterns killing ROI',
                  'Learn the framework the 5% use',
                  'Get a custom success roadmap',
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
                Get Your AI Failure Audit
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              Free diagnostic - Identify what&apos;s actually blocking your AI success
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

      {/* The Data Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-amber/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Hard Truth
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              The Numbers Don&apos;t Lie
            </h2>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { stat: '95%', label: 'of GenAI pilots fail to deliver business impact', source: 'MIT 2025' },
                { stat: '74%', label: 'of companies see no real value from AI investments', source: 'BCG' },
                { stat: '42%', label: 'abandoned most of their AI projects in 2025', source: 'Industry Survey' },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm text-center">
                  <p className="text-4xl font-bold text-radiance-amber mb-2">{item.stat}</p>
                  <p className="text-text-secondary text-sm mb-2">{item.label}</p>
                  <p className="text-text-muted text-xs font-mono">{item.source}</p>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-radiance-amber/5 border border-radiance-amber/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-radiance-amber shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                <span className="text-[10px] font-mono tracking-widest text-radiance-amber uppercase">The_Pattern</span>
              </div>
              <p className="text-text-primary text-lg italic">
                &ldquo;Most failures share the same root causes. The companies that succeed aren&apos;t smarter - they just avoid the traps everyone else falls into.&rdquo;
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The 5 Failure Patterns */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Root Causes
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              The 5 Failure Patterns
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Which ones are killing your AI initiatives?
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            {[
              {
                number: '01',
                title: 'Technology-First Thinking',
                problem: 'Starting with tools instead of business problems',
                symptom: 'You bought AI tools, but nobody knows what to use them for',
                solution: 'Start with the $100K problem, not the shiny solution',
              },
              {
                number: '02',
                title: 'Data Denial',
                problem: 'Ignoring the foundation AI needs to work',
                symptom: 'Your data is siloed, inconsistent, or just not ready',
                solution: 'Fix data architecture before deploying AI',
              },
              {
                number: '03',
                title: 'Pilot Purgatory',
                problem: 'Endless experiments that never reach production',
                symptom: 'You have 10 POCs and zero deployed solutions',
                solution: 'Build for production from day one',
              },
              {
                number: '04',
                title: 'Skills Vacuum',
                problem: 'No internal capability to evaluate or manage AI',
                symptom: 'You rely 100% on vendors with no way to verify',
                solution: 'Develop internal AI literacy, not just tools',
              },
              {
                number: '05',
                title: 'Change Resistance',
                problem: 'Organization not ready for AI-driven workflows',
                symptom: 'AI is deployed but nobody uses it',
                solution: 'Treat AI as change management, not IT project',
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="flex items-start gap-6 p-6 bg-depth-surface/30 border border-depth-border rounded-2xl backdrop-blur-sm hover:border-radiance-gold/30 transition-all">
                  <div className="text-3xl font-bold text-radiance-gold/30 font-mono">{item.number}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-radiance-amber text-sm mb-2">{item.problem}</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="p-3 rounded-xl bg-depth-elevated/50">
                        <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Symptom</p>
                        <p className="text-text-secondary text-sm">{item.symptom}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-radiance-gold/5">
                        <p className="text-radiance-gold text-xs uppercase tracking-wider mb-1">Solution</p>
                        <p className="text-text-secondary text-sm">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The 5% Framework */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Solution
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How the 5% Succeed
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              The framework that separates AI leaders from AI casualties
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Problem First',
                  desc: 'Start with high-value business problems, not technology',
                },
                {
                  step: '2',
                  title: 'Data Ready',
                  desc: 'Build the data foundation AI needs before deploying',
                },
                {
                  step: '3',
                  title: 'Production Mindset',
                  desc: 'Design for scale from the first pilot',
                },
                {
                  step: '4',
                  title: 'Organization Ready',
                  desc: 'Change management alongside implementation',
                },
              ].map((item, index) => (
                <Card key={index} elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all text-center">
                  <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* What We Do */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              Our Approach
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              We Help You Join the 5%
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            {[
              { title: 'AI Failure Audit', desc: 'Identify which failure patterns are affecting your organization' },
              { title: 'Readiness Assessment', desc: 'Evaluate your data, team, and organizational readiness' },
              { title: 'Success Roadmap', desc: 'Custom plan that addresses your specific blockers' },
              { title: 'Implementation Support', desc: 'Hands-on guidance to avoid the 95% trap' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 bg-depth-surface/30 border border-depth-border rounded-2xl backdrop-blur-sm hover:border-radiance-gold/30 transition-all">
                <div className="w-10 h-10 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Ready to Stop Being a Statistic?
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Get your free AI Failure Audit and discover exactly what&apos;s blocking your success.
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
                Get Your AI Failure Audit
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> Free diagnosis <span className="opacity-40">+</span> Custom success roadmap <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};
