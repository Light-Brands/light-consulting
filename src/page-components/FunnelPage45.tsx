/**
 * Funnel Page 45: The 90-Day AI Sprint
 * Light Brand Consulting
 *
 * Page Function: Urgency-based funnel targeting executives who want quick results
 * - Target: Leaders who need to show AI progress quickly
 * - Hook: "Your First AI Win in 90 Days - Guaranteed"
 * - Entry: AI Quick Win Assessment
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage45Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage45: React.FC<FunnelPage45Props> = ({ onNavigate }) => {
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
                90-Day Guarantee
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Your First AI Win
              <span className="block text-radiance-gold mt-2 relative inline-block">
                In 90 Days - Guaranteed
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                You don&apos;t have time for 18-month AI roadmaps. Your board wants progress. Your team needs direction.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                What if you could have a working AI solution delivering ROI in just 90 days?
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300">
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  'Working AI solution in production',
                  'Measurable business impact',
                  'Team trained and confident',
                  'Foundation for future expansion',
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
                Start Your 90-Day Sprint
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              Free assessment - Identify your highest-impact quick win
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

      {/* The Problem with Long Timelines */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Problem
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Why Most AI Projects Take Forever
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  trap: 'The Roadmap Trap',
                  desc: 'Spending 6 months planning before doing anything',
                  result: 'Analysis paralysis, zero results',
                },
                {
                  trap: 'The Platform Trap',
                  desc: 'Building infrastructure before proving value',
                  result: 'Huge investment, no ROI',
                },
                {
                  trap: 'The Perfection Trap',
                  desc: 'Waiting for perfect data or conditions',
                  result: 'Never getting started',
                },
                {
                  trap: 'The Enterprise Trap',
                  desc: 'Treating every project like a massive transformation',
                  result: 'Overwhelming scope, lost momentum',
                },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-radiance-amber mb-2">{item.trap}</h3>
                  <p className="text-text-secondary text-sm mb-2">{item.desc}</p>
                  <p className="text-text-muted text-xs italic">Result: {item.result}</p>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm text-center">
              <p className="text-text-primary text-lg mb-2">The traditional approach:</p>
              <p className="text-radiance-amber text-xl font-bold mb-4">
                12-18 months to first production AI. 50%+ chance of failure.
              </p>
              <p className="text-text-secondary">
                By the time you launch, the technology has changed and your team has moved on.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The Sprint Approach */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Sprint Approach
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              90 Days to Production AI
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              A focused sprint that delivers real results - fast
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="space-y-6">
              {[
                {
                  week: 'Weeks 1-2',
                  phase: 'Discovery',
                  activities: ['Identify highest-impact opportunity', 'Map existing data and systems', 'Define success metrics', 'Select the right use case'],
                  deliverable: 'Validated use case with clear ROI projection',
                },
                {
                  week: 'Weeks 3-4',
                  phase: 'Design',
                  activities: ['Solution architecture', 'Data preparation plan', 'Integration approach', 'User experience design'],
                  deliverable: 'Complete technical blueprint',
                },
                {
                  week: 'Weeks 5-8',
                  phase: 'Build',
                  activities: ['Core AI functionality', 'System integrations', 'User interface', 'Initial testing'],
                  deliverable: 'Working prototype in test environment',
                },
                {
                  week: 'Weeks 9-10',
                  phase: 'Pilot',
                  activities: ['Limited production deployment', 'Real user testing', 'Performance monitoring', 'Feedback collection'],
                  deliverable: 'Validated solution with real users',
                },
                {
                  week: 'Weeks 11-12',
                  phase: 'Launch',
                  activities: ['Full production deployment', 'Team training', 'Documentation', 'Success measurement'],
                  deliverable: 'Production AI solution delivering ROI',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-6 p-6 bg-depth-surface/30 border border-depth-border rounded-2xl backdrop-blur-sm hover:border-radiance-gold/30 transition-all">
                  <div className="text-center flex-shrink-0 w-24">
                    <p className="text-radiance-gold text-xs uppercase tracking-wider font-mono mb-1">{item.week}</p>
                    <p className="text-xl font-bold text-text-primary">{item.phase}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.activities.map((activity, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-full bg-depth-elevated/50 text-text-secondary text-xs">
                          {activity}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-radiance-gold"></span>
                      <p className="text-text-primary text-sm font-medium">{item.deliverable}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Win Categories */}
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
              Quick Wins
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What Can You Achieve in 90 Days?
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Real examples of 90-day AI sprints
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: 'Customer Service',
                  example: 'AI-powered ticket triage and routing',
                  impact: '40% faster resolution',
                  icon: '💬',
                },
                {
                  category: 'Operations',
                  example: 'Automated document processing',
                  impact: '70% time savings',
                  icon: '⚙️',
                },
                {
                  category: 'Sales',
                  example: 'AI lead scoring and prioritization',
                  impact: '25% more conversions',
                  icon: '📈',
                },
                {
                  category: 'Marketing',
                  example: 'Personalized content generation',
                  impact: '3x content output',
                  icon: '🎯',
                },
                {
                  category: 'Finance',
                  example: 'Automated expense categorization',
                  impact: '80% manual work eliminated',
                  icon: '💰',
                },
                {
                  category: 'HR',
                  example: 'AI-assisted resume screening',
                  impact: '60% faster hiring',
                  icon: '👥',
                },
              ].map((item, index) => (
                <Card key={index} elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="text-radiance-gold text-xs uppercase tracking-wider font-mono">{item.category}</p>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{item.example}</h3>
                  <p className="text-radiance-gold font-semibold">{item.impact}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* The Guarantee */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Guarantee
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Our 90-Day Commitment
            </h2>
          </div>

          <div className="max-w-xl mx-auto relative z-10">
            <div className="p-8 rounded-2xl bg-radiance-gold/5 border border-radiance-gold/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                <span className="text-[10px] font-mono tracking-widest text-radiance-gold uppercase">Guarantee</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">In 90 Days, You Get:</h3>
              <ul className="space-y-4 mb-6">
                {[
                  'A working AI solution in production',
                  'Measurable business impact you can report',
                  'Team trained and confident to maintain it',
                  'Clear roadmap for expansion',
                  'Full documentation and knowledge transfer',
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
              <div className="p-4 rounded-xl bg-depth-elevated/50 mb-6">
                <p className="text-text-primary text-center font-medium">
                  If we don&apos;t deliver a working solution with measurable impact in 90 days, we&apos;ll continue working for free until we do.
                </p>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('book')}
                className="w-full shadow-illumination"
              >
                Start Your 90-Day Sprint
              </Button>
              <p className="text-text-muted text-xs text-center mt-4">
                Free assessment to identify your quick win opportunity
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* This is for / not for */}
      <section className="section-spacing relative overflow-hidden">
        <Container size="wide">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-radiance-gold">The 90-Day Sprint is for you if:</h3>
                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm">
                  <ul className="space-y-3">
                    {[
                      'You need to show AI progress to stakeholders',
                      'You\'ve been planning for too long',
                      'You want to prove ROI before bigger investment',
                      'You have a team ready to embrace AI',
                      'You value speed without sacrificing quality',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-text-secondary text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-text-muted">This is not for:</h3>
                <div className="p-6 rounded-2xl border-l-2 border-depth-border/30 bg-depth-surface/30 backdrop-blur-sm">
                  <ul className="space-y-3">
                    {[
                      'Companies that need 12-month committee approvals',
                      'Organizations with no clear business problem to solve',
                      'Teams not willing to dedicate resources to the sprint',
                      'Those who want AI "just because everyone has it"',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="text-text-muted text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
              Ready for Your First AI Win?
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Stop planning. Start doing. Get a working AI solution in 90 days - guaranteed.
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
                Start Your 90-Day Sprint
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> 90 days <span className="opacity-40">+</span> Production AI <span className="opacity-40">+</span> Guaranteed results <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};
