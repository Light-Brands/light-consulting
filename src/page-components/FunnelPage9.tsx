/**
 * Funnel Page 9: AI Team Enablement
 * Light Brand Consulting
 *
 * Page Function: AI fluency and team training
 * - Target: Companies with skill gaps (46% cite this as barrier)
 * - Hook: "Your Team Doesn't Need AI Tools. They Need AI Fluency."
 * - Entry: Team AI Readiness Assessment
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage9Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage9: React.FC<FunnelPage9Props> = ({ onNavigate }) => {
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
                AI Team Enablement
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              Your Team Doesn't Need AI Tools.
              <span className="block text-radiance-gold mt-2 relative inline-block">
                They Need AI Fluency.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                46% of companies cite skill gaps as a major AI barrier.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                40% of the workforce needs AI reskilling in the next 3 years.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300 space-y-3">
              <p className="text-text-muted leading-relaxed">
                AI tools without AI fluency is like giving everyone a piano and expecting a symphony.
              </p>
              <div className="pt-2">
                <p className="text-radiance-gold text-xl font-semibold">
                  The best AI investment isn't software. It's skills.
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
                Assess Your Team's AI Readiness
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              5 minutes · Identify skill gaps · Free assessment
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

      {/* The Skills Gap Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Reality
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              The AI Skills Gap Is
              <span className="block text-radiance-amber mt-2">Costing You Growth</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { stat: '46%', label: 'cite skill gaps as barrier' },
                { stat: '40%', label: 'need reskilling in 3 years' },
                { stat: '36%', label: 'say AI expertise is essential' },
                { stat: '33%', label: 'have training access' },
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-2xl bg-depth-surface/30 border border-depth-border backdrop-blur-sm text-center">
                  <p className="text-3xl font-bold text-radiance-gold mb-2">{item.stat}</p>
                  <p className="text-text-muted text-sm">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-depth-elevated/50 rounded-2xl border border-depth-border text-center backdrop-blur-sm">
              <p className="text-text-secondary text-lg">
                Citi, JPMorgan, and Bank of America are mandating AI training for employees.
              </p>
              <p className="text-radiance-gold font-semibold mt-2">
                Is your team keeping up?
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Teach Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              AI Fluency Program
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Build AI-Native Teams
            </h2>
            <p className="text-xl text-radiance-gold font-medium">
              Custom training for every level of your organization
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Executive AI Fluency',
                  description: 'Strategic thinking, AI investment decisions, and board-level AI understanding',
                  audience: 'C-Suite & Leadership',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                },
                {
                  title: 'Operational AI Mastery',
                  description: 'Workflow design, process automation, and AI integration for operations teams',
                  audience: 'Managers & Team Leads',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Prompt Engineering Excellence',
                  description: 'Master the art of communicating with AI to get consistent, high-quality outputs',
                  audience: 'All Team Members',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: 'AI Ethics & Governance',
                  description: 'Responsible AI use, bias awareness, and compliance fundamentals',
                  audience: 'Cross-Functional',
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <Card elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(232,184,74,0.2)] group-hover:shadow-[0_0_25px_rgba(232,184,74,0.3)] transition-shadow">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-text-primary group-hover:text-radiance-gold transition-colors">{item.title}</h3>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed mb-3">{item.description}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-radiance-gold/10 border border-radiance-gold/20">
                          <span className="text-radiance-gold text-xs font-medium">{item.audience}</span>
                        </div>
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
                      "Your team is using AI tools but not seeing consistent results",
                      "Leadership wants AI adoption but the team is hesitant",
                      "You've invested in AI tools that aren't being used well",
                      "Competitors are moving faster with AI implementation",
                      "You want to build internal AI champions",
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
                      "Teams not committed to learning new skills",
                      "Organizations expecting overnight transformation",
                      "Companies without AI tools or plans to adopt them",
                      "Businesses looking for technical AI development training",
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

      {/* The Process Section */}
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
              How It Works
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              From Skill Gaps to AI Fluency
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            {[
              {
                step: 1,
                title: 'Team AI Readiness Assessment',
                text: 'Understand current skill levels, gaps, and opportunities across your organization.',
                price: 'Free',
              },
              {
                step: 2,
                title: 'AI Fluency Program',
                text: 'Custom training curriculum, prompt engineering, and AI workflow mastery for your team.',
                price: '$5,000-15,000',
              },
              {
                step: 3,
                title: 'AI Coaching Partnership',
                text: 'Ongoing coaching and support to build and maintain AI-native capabilities.',
                price: 'Monthly Retainer',
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

      {/* Outcomes Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Outcomes
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              What Your Team Gains
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              {
                title: 'Confidence',
                description: 'Team members who know how to use AI effectively and consistently',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
              },
              {
                title: 'Productivity',
                description: 'Measurable time savings and efficiency gains across workflows',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
              },
              {
                title: 'Innovation',
                description: 'Teams that identify and implement new AI opportunities',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: 'Champions',
                description: 'Internal AI advocates who drive adoption across the organization',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
              },
              {
                title: 'Consistency',
                description: 'Standardized AI usage and quality across all team outputs',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
              },
              {
                title: 'Responsibility',
                description: 'Teams that use AI ethically and understand governance',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <Card key={index} elevation="elevated" className="p-6 bg-depth-surface/30 border border-depth-border backdrop-blur-sm hover:border-radiance-gold/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(232,184,74,0.2)] group-hover:shadow-[0_0_25px_rgba(232,184,74,0.3)] transition-shadow">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-radiance-gold transition-colors">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
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
                Ready to close your team's AI skill gap?
              </h2>
            </div>

            <p className="text-xl text-radiance-gold font-medium">
              The best AI investment isn't software. It's skills.
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
                Assess Your Team's AI Readiness
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> Free assessment <span className="opacity-40">·</span> 5 minutes <span className="opacity-40">·</span> Identify skill gaps <span className="opacity-40">//</span>
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
              36% say AI expertise is essential. Only 33% have training access.
            </p>
            <p className="text-xl text-text-primary font-medium">
              We close the gap.
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              Build AI-native teams. Not tool-dependent ones.
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
              <span className="text-radiance-gold font-medium">Light Brand</span> builds AI-fluent teams
              that drive real business results.
            </p>
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
          </div>
        </Container>
      </section>
    </div>
  );
};
