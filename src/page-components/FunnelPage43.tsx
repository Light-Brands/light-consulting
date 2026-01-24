/**
 * Funnel Page 43: The Shadow AI Audit
 * Light Brand Consulting
 *
 * Page Function: Security/risk-focused funnel targeting executives worried about unauthorized AI
 * - Target: CISOs, CTOs, CEOs concerned about AI governance and data risks
 * - Hook: "Your Employees Are Already Using AI. Do You Know Which Ones?"
 * - Entry: Shadow AI Risk Assessment
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage43Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage43: React.FC<FunnelPage43Props> = ({ onNavigate }) => {
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

        {/* Warning glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient from-radiance-amber/5 to-transparent blur-[100px] pointer-events-none z-[1]" />

        {/* Hero Content */}
        <Container size="wide" className="relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="animate-fade-in">
              <Tag variant="default" className="mx-auto backdrop-blur-sm border-radiance-amber/30 text-radiance-amber">
                Security Alert
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Your Employees Are Already Using AI.
              <span className="block text-radiance-amber mt-2 relative inline-block">
                Do You Know Which Ones?
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-amber/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                78% of employees use AI tools at work. Most without IT approval.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                What data is leaving your organization right now?
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300">
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  'Discover unauthorized AI tools in use',
                  'Identify data leakage risks',
                  'Map compliance exposure',
                  'Get a governance action plan',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-radiance-amber/20 text-radiance-amber flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
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
                Get Your Shadow AI Audit
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              Free risk assessment - Know your exposure before it&apos;s too late
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

      {/* The Hidden Risk */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-amber/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Hidden Risk
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              What&apos;s Happening Right Now
            </h2>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { stat: '78%', label: 'of employees use AI tools at work', risk: 'Without formal approval' },
                { stat: '$650K+', label: 'average cost per AI-related data breach', risk: 'Not including reputation damage' },
                { stat: '59', label: 'new AI regulations passed in 2024 alone', risk: 'More coming in 2025-2026' },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-2xl bg-depth-surface/30 border border-radiance-amber/20 backdrop-blur-sm text-center">
                  <p className="text-4xl font-bold text-radiance-amber mb-2">{item.stat}</p>
                  <p className="text-text-secondary text-sm mb-2">{item.label}</p>
                  <p className="text-text-muted text-xs">{item.risk}</p>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-radiance-amber" />
                <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Common_Shadow_AI_Tools</span>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { tool: 'ChatGPT', risk: 'Confidential data in prompts' },
                  { tool: 'Claude', risk: 'IP and strategy leakage' },
                  { tool: 'Copilot', risk: 'Code and architecture exposure' },
                  { tool: 'Midjourney', risk: 'Brand and design IP' },
                  { tool: 'Notion AI', risk: 'Internal documents' },
                  { tool: 'Otter.ai', risk: 'Meeting recordings' },
                  { tool: 'Grammarly', risk: 'All written content' },
                  { tool: 'Various APIs', risk: 'Direct data connections' },
                ].map((item, index) => (
                  <div key={index} className="p-3 rounded-xl bg-depth-elevated/50">
                    <p className="text-text-primary font-medium text-sm">{item.tool}</p>
                    <p className="text-radiance-amber text-xs">{item.risk}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The Risks */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Risk Categories
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What&apos;s Actually at Stake
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="space-y-6">
              {[
                {
                  category: 'Data Leakage',
                  icon: '🔓',
                  risks: [
                    'Customer PII in AI prompts',
                    'Financial data exposed to third parties',
                    'Trade secrets in training data',
                    'Strategic plans shared with AI providers',
                  ],
                },
                {
                  category: 'Compliance Exposure',
                  icon: '⚖️',
                  risks: [
                    'GDPR/CCPA violations from data processing',
                    'Industry-specific regulations (HIPAA, SOC2, etc.)',
                    'EU AI Act requirements',
                    'Emerging state-level AI laws',
                  ],
                },
                {
                  category: 'Operational Risk',
                  icon: '⚠️',
                  risks: [
                    'Inconsistent AI outputs affecting quality',
                    'Dependency on unapproved tools',
                    'No audit trail for AI-assisted decisions',
                    'Shadow spending on AI subscriptions',
                  ],
                },
                {
                  category: 'Reputational Risk',
                  icon: '📉',
                  risks: [
                    'Customer trust erosion if breach occurs',
                    'Media exposure of AI misuse',
                    'Investor/board concerns',
                    'Talent attraction challenges',
                  ],
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-6 p-6 bg-depth-surface/30 border border-depth-border rounded-2xl backdrop-blur-sm">
                  <div className="text-4xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-4">{item.category}</h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {item.risks.map((risk, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-text-secondary text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-radiance-amber"></span>
                          {risk}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* The Solution */}
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
              From Shadow AI to Governed AI
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              The path from risk to responsible AI adoption
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Discover',
                  desc: 'Identify all AI tools currently in use across your organization',
                },
                {
                  step: '2',
                  title: 'Assess',
                  desc: 'Evaluate risk level of each tool and use case',
                },
                {
                  step: '3',
                  title: 'Govern',
                  desc: 'Implement policies, controls, and approved alternatives',
                },
                {
                  step: '4',
                  title: 'Enable',
                  desc: 'Provide safe, productive AI tools your team can actually use',
                },
              ].map((item, index) => (
                <Card key={index} elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm text-center hover:border-radiance-gold/30 transition-all">
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

      {/* The Audit */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Audit
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Shadow AI Risk Assessment
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Know exactly what AI is in your organization - and what to do about it
            </p>
          </div>

          <div className="max-w-xl mx-auto relative z-10">
            <div className="p-8 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                <span className="text-[10px] font-mono tracking-widest text-radiance-gold uppercase">Audit_Includes</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Shadow AI discovery across your organization',
                  'Risk assessment by tool and use case',
                  'Compliance gap analysis',
                  'Data flow mapping',
                  'Governance framework recommendations',
                  'Approved alternatives and migration plan',
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
                Get Your Shadow AI Audit
              </Button>
              <p className="text-text-muted text-xs text-center mt-4">
                Confidential assessment - Results within 48 hours
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
              Don&apos;t Wait for the Breach
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Know your AI risk exposure before regulators - or attackers - find it first.
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
                Get Your Shadow AI Audit
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> Confidential <span className="opacity-40">+</span> 48-hour results <span className="opacity-40">+</span> Action plan <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};
