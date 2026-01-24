/**
 * Funnel Page 44: AI Without the Risk
 * Light Brand Consulting
 *
 * Page Function: Objection-handling funnel for security-conscious executives
 * - Target: Risk-averse leaders who want AI benefits without the downsides
 * - Hook: "Enterprise AI Without the Enterprise Risk"
 * - Entry: AI Risk Assessment
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage44Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage44: React.FC<FunnelPage44Props> = ({ onNavigate }) => {
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
                For Risk-Conscious Leaders
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Enterprise AI
              <span className="block text-radiance-gold mt-2 relative inline-block">
                Without the Enterprise Risk
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                You see the AI opportunity. But you also see the headlines about breaches, compliance failures, and runaway costs.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                What if you could capture AI&apos;s upside while managing the downside?
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300">
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  'Data stays private and compliant',
                  'Controlled, auditable AI usage',
                  'Predictable costs with clear ROI',
                  'Governance built in from day one',
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
                Get Your AI Risk Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              Free assessment - Understand your risk profile and safe path forward
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

      {/* The Concerns */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Legitimate Concerns
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Your Concerns Are Valid
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Smart leaders ask hard questions about AI. Here are the ones we hear most:
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  concern: 'Data Privacy',
                  question: 'Where does our data go? Who can access it?',
                  reality: '63% of executives cite this as their top AI barrier',
                },
                {
                  concern: 'Compliance',
                  question: 'How do we stay compliant with evolving regulations?',
                  reality: '59 new AI regulations passed in 2024 alone',
                },
                {
                  concern: 'Cost Control',
                  question: 'How do we prevent runaway AI spending?',
                  reality: 'Average AI initiative costs $250K-$1M',
                },
                {
                  concern: 'Quality & Accuracy',
                  question: 'How do we prevent AI errors from hurting the business?',
                  reality: 'AI hallucinations remain a real concern',
                },
                {
                  concern: 'Vendor Lock-in',
                  question: 'What if we bet on the wrong AI platform?',
                  reality: 'AI landscape is shifting rapidly',
                },
                {
                  concern: 'Team Adoption',
                  question: 'Will our team actually use it correctly?',
                  reality: 'Change management is often overlooked',
                },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                  <p className="text-radiance-gold text-xs uppercase tracking-wider font-mono mb-2">{item.concern}</p>
                  <p className="text-text-primary font-medium mb-2">&ldquo;{item.question}&rdquo;</p>
                  <p className="text-text-muted text-sm">{item.reality}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* The Framework */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Framework
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              The Responsible AI Framework
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              How we help organizations deploy AI with confidence
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  pillar: 'Privacy by Design',
                  icon: '🔒',
                  principles: [
                    'Data stays within your control perimeter',
                    'No training on your proprietary data',
                    'Audit trails for all AI interactions',
                    'Encryption at rest and in transit',
                  ],
                },
                {
                  pillar: 'Compliance Built-In',
                  icon: '✓',
                  principles: [
                    'Regulatory mapping (GDPR, CCPA, industry-specific)',
                    'Documentation for audits',
                    'Regular compliance reviews',
                    'Future-proof for emerging regulations',
                  ],
                },
                {
                  pillar: 'Predictable Economics',
                  icon: '📊',
                  principles: [
                    'Fixed costs, not usage surprises',
                    'Clear ROI metrics from day one',
                    'Staged implementation to prove value',
                    'Kill switches if not performing',
                  ],
                },
                {
                  pillar: 'Quality Guardrails',
                  icon: '🛡️',
                  principles: [
                    'Human-in-the-loop for critical decisions',
                    'Output validation and testing',
                    'Hallucination detection',
                    'Continuous monitoring and improvement',
                  ],
                },
              ].map((item, index) => (
                <Card key={index} elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">{item.icon}</span>
                    <h3 className="text-xl font-bold text-text-primary">{item.pillar}</h3>
                  </div>
                  <ul className="space-y-2">
                    {item.principles.map((principle, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-text-secondary text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-radiance-gold mt-2 flex-shrink-0"></span>
                        {principle}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Risk vs Reward */}
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
              The Balance
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Risk vs. Reward: The Real Calculation
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="p-6 rounded-2xl bg-radiance-amber/5 border border-radiance-amber/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-radiance-amber mb-4">Risk of Moving Fast (Uncontrolled)</h3>
                <ul className="space-y-3">
                  {[
                    'Data breaches: $650K+ average cost',
                    'Compliance fines: Can reach millions',
                    'Reputation damage: Immeasurable',
                    'Failed projects: Wasted resources',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-text-secondary text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-radiance-amber mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                <h3 className="text-lg font-bold text-text-muted mb-4">Risk of Not Moving (At All)</h3>
                <ul className="space-y-3">
                  {[
                    'Competitive disadvantage: Growing daily',
                    'Efficiency gap: 30-50% productivity difference',
                    'Talent flight: Top people want modern tools',
                    'Market share loss: To AI-enabled competitors',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-text-secondary text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm text-center">
              <h3 className="text-xl font-bold text-radiance-gold mb-2">The Third Option</h3>
              <p className="text-text-primary text-lg">
                Move forward with AI - but do it right. Capture the upside while managing the downside.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Deliver */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Deliverable
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              AI Risk Assessment
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Know your risk profile and safe path forward
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
                  'Current AI exposure analysis',
                  'Risk scoring across all dimensions',
                  'Compliance gap identification',
                  'Safe AI opportunity mapping',
                  'Governance framework recommendations',
                  'Phased implementation roadmap',
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
                Get Your AI Risk Assessment
              </Button>
              <p className="text-text-muted text-xs text-center mt-4">
                Confidential assessment - No obligation
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
              Ready to Move Forward - Safely?
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Get clarity on your risk profile and a path to responsible AI adoption.
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
                Get Your AI Risk Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> Capture the upside <span className="opacity-40">+</span> Manage the downside <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};
