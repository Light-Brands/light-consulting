/**
 * Funnel Page 42: AI for Customer Service
 * Light Brand Consulting
 *
 * Page Function: Function-specific funnel targeting customer service transformation
 * - Target: Customer service leaders, VPs of CX, support directors
 * - Hook: "10X Your Customer Service Without 10X the Headcount"
 * - Entry: Customer Service AI Assessment
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage42Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage42: React.FC<FunnelPage42Props> = ({ onNavigate }) => {
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
                AI for Customer Service
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              <span className="text-radiance-gold">10X</span> Your Customer Service
              <span className="block mt-2 relative inline-block">
                Without 10X the Headcount
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Support tickets are exploding. Your team is drowning. Customers are waiting.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                AI can handle 70% of inquiries - if deployed correctly.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300">
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  'Instant resolution for routine queries',
                  '24/7 availability without night shifts',
                  'Consistent quality at any scale',
                  'Human agents for complex cases only',
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
                Get Your Service AI Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              Free analysis - See how much you can automate
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

      {/* The Service Crisis */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Challenge
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              The Customer Service Scaling Problem
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { problem: 'Volume Scaling', stat: '2-3x', context: 'ticket growth outpaces hiring capacity' },
                { problem: 'Response Times', stat: '47%', context: 'of customers won\'t wait more than 4 hours' },
                { problem: 'Agent Burnout', stat: '40%', context: 'annual turnover in support roles' },
                { problem: 'Cost Per Ticket', stat: '$15-25', context: 'average cost of human-handled tickets' },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-2">{item.problem}</p>
                  <p className="text-3xl font-bold text-radiance-amber mb-1">{item.stat}</p>
                  <p className="text-text-secondary text-sm">{item.context}</p>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-radiance-amber" />
                <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">The_Trap</span>
              </div>
              <p className="text-text-primary text-lg">
                The traditional solution: <span className="text-radiance-amber">Hire more agents. Train them. Watch them leave. Repeat.</span>
              </p>
              <p className="text-text-secondary mt-2">
                This doesn&apos;t scale. And it&apos;s getting more expensive every year.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The AI Solution */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Solution
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              The AI-Augmented Service Model
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Not chatbots. Intelligent service systems that actually work.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  tier: 'Tier 1: AI Resolution',
                  percentage: '60-70%',
                  desc: 'of tickets resolved without human touch',
                  examples: ['Password resets', 'Order status', 'FAQ responses', 'Basic troubleshooting'],
                },
                {
                  tier: 'Tier 2: AI-Assisted',
                  percentage: '20-25%',
                  desc: 'handled by agents with AI support',
                  examples: ['Complex questions', 'Multi-step issues', 'Policy exceptions', 'Technical problems'],
                },
                {
                  tier: 'Tier 3: Human Expert',
                  percentage: '10-15%',
                  desc: 'reserved for high-touch situations',
                  examples: ['Escalations', 'VIP customers', 'Complaints', 'Edge cases'],
                },
              ].map((item, index) => (
                <Card key={index} elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                  <p className="text-radiance-gold text-xs uppercase tracking-wider font-mono mb-2">{item.tier}</p>
                  <p className="text-3xl font-bold text-text-primary mb-2">{item.percentage}</p>
                  <p className="text-text-secondary text-sm mb-4">{item.desc}</p>
                  <div className="space-y-1">
                    {item.examples.map((ex, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-text-muted text-xs">
                        <span className="w-1 h-1 rounded-full bg-radiance-gold/50"></span>
                        {ex}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                <span className="text-[10px] font-mono tracking-widest text-radiance-gold uppercase">The_Difference</span>
              </div>
              <p className="text-text-primary text-lg">
                This isn&apos;t a chatbot that frustrates customers. It&apos;s an intelligent system that:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  'Understands context and customer history',
                  'Knows when to escalate vs. when to resolve',
                  'Gets smarter with every interaction',
                  'Seamlessly hands off to humans when needed',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-radiance-gold"></span>
                    {item}
                  </li>
                ))}
              </ul>
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
              What AI-Powered Service Delivers
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { metric: '70%', label: 'Reduction in ticket handling cost', icon: '💰' },
                { metric: '24/7', label: 'Availability without extra shifts', icon: '🕐' },
                { metric: '<30s', label: 'Average response time', icon: '⚡' },
                { metric: '40%', label: 'Improvement in CSAT scores', icon: '⭐' },
              ].map((item, index) => (
                <Card key={index} elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm text-center">
                  <p className="text-3xl mb-2">{item.icon}</p>
                  <p className="text-2xl font-bold text-radiance-gold mb-1">{item.metric}</p>
                  <p className="text-text-secondary text-sm">{item.label}</p>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                <h3 className="text-lg font-bold text-text-primary mb-4">For Your Customers:</h3>
                <ul className="space-y-2">
                  {[
                    'Instant answers to common questions',
                    'No more waiting on hold',
                    'Consistent experience every time',
                    'Seamless escalation when needed',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-text-secondary text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-radiance-gold"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                <h3 className="text-lg font-bold text-text-primary mb-4">For Your Team:</h3>
                <ul className="space-y-2">
                  {[
                    'Focus on complex, rewarding work',
                    'AI handles repetitive queries',
                    'Better work-life balance',
                    'Higher job satisfaction',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-text-secondary text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-radiance-gold"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
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
              Customer Service AI Assessment
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              See exactly how much you can automate
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
                  'Ticket volume and pattern analysis',
                  'Automation opportunity identification',
                  'Cost savings projection',
                  'Implementation timeline and approach',
                  'Technology stack recommendations',
                  'Change management considerations',
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
                Get Your Service AI Assessment
              </Button>
              <p className="text-text-muted text-xs text-center mt-4">
                Free analysis for qualified service leaders
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
              Ready to Transform Customer Service?
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Stop drowning in tickets. Start scaling with AI.
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
                Get Your Service AI Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> 70% automation <span className="opacity-40">+</span> 24/7 coverage <span className="opacity-40">+</span> Better CSAT <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};
