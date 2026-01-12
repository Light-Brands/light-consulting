/**
 * Funnel Page 5: Light Workers Funnel
 * Light Brand Consulting
 *
 * Page Function: For purpose-driven visionaries bringing their ideas to the planet
 * - Target: Light workers, conscious entrepreneurs, mission-driven founders
 * - Core Promise: Build your vision with the right people and right systems
 * - Focus: Good intentions + good people + intelligent systems = real impact
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';
import { IMAGE_CONFIG } from '../lib/constants';

interface FunnelPage5Props {
  onNavigate: (page: PageKey) => void;
}

export const FunnelPage5: React.FC<FunnelPage5Props> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Hero Section - The Calling */}
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
                For Light Workers & Conscious Entrepreneurs
              </Tag>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight animate-slide-up">
              You Have a Vision That Could Change Lives.
              <span className="block text-radiance-gold mt-2 relative inline-block">
                Let's Build It With the Right People.
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-radiance-gold/30" />
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4 animate-slide-up delay-200">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Good intentions deserve good systems.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                Your mission needs infrastructure to reach the world.
              </p>
            </div>

            <div className="pt-4 max-w-2xl mx-auto animate-slide-up delay-300 space-y-3">
              <p className="text-text-muted leading-relaxed">
                The world needs what you're here to create.
              </p>
              <div className="pt-2">
                <p className="text-radiance-gold text-xl font-semibold">
                  We help light workers build with integrity and impact.
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
                Start Your Vision Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm animate-fade-in delay-500">
              Clarity · Alignment · Purpose-driven systems
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

      {/* The Problem - Why Most Light Workers Struggle */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              The Challenge
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Your Vision Is Clear.
              <span className="block text-radiance-amber mt-2">The Path to Bring It to Life Isn't.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="p-8 md:p-10 bg-depth-elevated/30 border border-radiance-gold/30 backdrop-blur-sm rounded-3xl relative overflow-hidden">
              {/* Blueprint background */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E8B84A 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="relative z-10">
                <p className="text-lg text-text-secondary text-center mb-8">
                  You know you're here to create something meaningful. But...
                </p>

                <div className="space-y-4">
                  {[
                    { pain: 'You attract the wrong people', desc: "Partners who don't share your values, team members who drain your energy" },
                    { pain: 'Your ideas stay ideas', desc: "The vision is clear in your mind but translating it to reality feels overwhelming" },
                    { pain: 'You work harder, not smarter', desc: "No systems, no leverage - just endless effort that burns you out" },
                    { pain: "You question if it's possible", desc: "Maybe this was meant to stay a dream? Maybe you're not cut out for this?" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-depth-surface/50 rounded-xl border border-depth-border/50 hover:border-radiance-gold/30 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-radiance-amber/20 text-radiance-amber flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-text-primary font-medium text-sm">{item.pain}</p>
                        <p className="text-text-muted text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-depth-border/30 mt-8">
                  <p className="text-text-secondary text-center mb-2">
                    The problem isn't your vision.
                  </p>
                  <p className="text-radiance-gold font-semibold text-xl text-center">
                    It's that no one taught you how to build it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What Light Workers Actually Need */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Truth
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What Light Workers Actually Need
            </h2>
            <p className="text-lg text-text-secondary">
              (That no one talks about)
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            {[
              {
                title: 'Aligned People',
                desc: 'Team members and partners who share your values, understand your mission, and elevate your energy - not drain it.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                title: 'Intelligent Systems',
                desc: 'Infrastructure that amplifies your impact without burning you out. AI and automation that works while you rest.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                ),
              },
              {
                title: 'Clear Strategy',
                desc: 'A roadmap that honors your values while being grounded in reality. No compromise on integrity, no delusion on execution.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                ),
              },
              {
                title: 'Sustainable Foundation',
                desc: "Revenue models that support your mission. Abundance is not anti-spiritual - it's fuel for greater impact.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-depth-surface/30 border border-depth-border/50 backdrop-blur-sm rounded-2xl hover:border-radiance-gold/30 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(232,184,74,0.2)] group-hover:shadow-[0_0_25px_rgba(232,184,74,0.3)] transition-shadow">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-radiance-gold transition-colors">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-12 p-8 bg-depth-elevated/50 rounded-2xl border border-depth-border text-center backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-radial-gradient from-radiance-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <p className="text-text-secondary mb-2">Good intentions alone don't create impact.</p>
                <p className="text-radiance-gold font-semibold text-xl">
                  Good intentions + good systems + good people = transformation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Who This Is For */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Is This You?
            </Tag>
          </div>

          <div className="relative max-w-5xl mx-auto z-10">
            {/* Subtle divider line */}
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-depth-border/50 to-transparent" />

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative z-10 items-start">
              {/* For You */}
              <div className="space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-radiance-gold">This is for you if:</h3>
                  <span className="w-2 h-2 rounded-full bg-radiance-gold shadow-[0_0_8px_rgba(232,184,74,0.6)]" />
                </div>

                <div className="p-6 rounded-2xl border-l-2 border-radiance-gold/30 bg-radiance-gold/5 backdrop-blur-sm flex-1 relative">
                  <ul className="space-y-3.5 relative z-10">
                    {[
                      'You have a vision that feels bigger than yourself',
                      'You care about impact more than just income',
                      'You want to work with people who share your values',
                      'You believe business can be a force for good',
                      'You\'re ready to build something that matters',
                      'You want systems that work without sacrificing soul',
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

              {/* Not For You */}
              <div className="space-y-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-text-muted">This is not for:</h3>
                  <span className="px-2 py-0.5 rounded-full border border-depth-border text-[8px] font-mono text-text-muted uppercase tracking-wider bg-depth-elevated">NOT_A_FIT</span>
                </div>

                <div className="p-6 rounded-2xl border-l-2 border-depth-border/30 bg-depth-surface/30 backdrop-blur-sm flex-1">
                  <ul className="space-y-3.5">
                    {[
                      'You\'re only motivated by profit',
                      'You want a get-rich-quick scheme',
                      'You\'re not willing to do the inner work',
                      'You expect results without effort',
                      'You see people as transactions',
                      'You\'re looking for someone else to do it for you',
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

      {/* The Light Workers Path */}
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
            <Tag variant="premium" className="mx-auto mb-6 backdrop-blur-sm">
              The Path Forward
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How We Help Light Workers Build
            </h2>
            <p className="text-lg text-text-secondary">
              A structured approach to bringing your vision to life
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            {[
              {
                step: '1',
                title: 'Vision Clarity Session',
                desc: 'We start by understanding your vision, your values, and what you\'re truly here to create.',
                outcome: 'Clear articulation of your mission and impact',
              },
              {
                step: '2',
                title: 'People & Alignment Mapping',
                desc: 'We identify who needs to be on this journey with you. What skills, values, and energy do you need?',
                outcome: 'A clear picture of your ideal team and community',
              },
              {
                step: '3',
                title: 'System Design',
                desc: 'We build intelligent systems that amplify your work. AI-powered tools and infrastructure.',
                outcome: 'Sustainable systems that scale your impact',
              },
              {
                step: '4',
                title: 'Launch & Iteration',
                desc: 'We help you launch, learn, and improve. Your vision meets reality.',
                outcome: 'A living manifestation of your vision',
              },
            ].map((item, idx) => (
              <div key={item.step} className="relative group">
                {/* Connecting line */}
                {idx < 3 && (
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
                    <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-3">{item.desc}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-text-muted">Outcome:</span>
                      <span className="text-radiance-gold">{item.outcome}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Core Principles */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Tag variant="default" className="mx-auto mb-6 backdrop-blur-sm">
              Our Principles
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How We Work
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  principle: 'Integrity Over Profit',
                  desc: 'We\'ll tell you when something isn\'t right for you, even if it means less business for us.',
                },
                {
                  principle: 'Systems That Serve',
                  desc: 'Technology should amplify your humanity, not replace it. We build with soul.',
                },
                {
                  principle: 'People First',
                  desc: 'The right people make everything possible. The wrong people make everything difficult.',
                },
                {
                  principle: 'Sustainable Growth',
                  desc: 'No burnout strategies. We build for longevity and impact, not quick wins.',
                },
                {
                  principle: 'Aligned Action',
                  desc: 'Every strategy we recommend must align with your values and vision.',
                },
                {
                  principle: 'Honest Partnership',
                  desc: 'We\'re not yes-people. We\'ll challenge you when needed and support you always.',
                },
              ].map((item, index) => (
                <div key={index} className="p-5 bg-depth-surface/30 border border-depth-border/50 rounded-2xl backdrop-blur-sm hover:border-radiance-gold/30 transition-colors group">
                  <h3 className="text-text-primary font-bold mb-2 group-hover:text-radiance-gold transition-colors">{item.principle}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonial/Social Proof Section */}
      <section className="section-spacing bg-depth-elevated relative overflow-hidden">
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
                <div className="relative">
                  {/* Quote mark decoration */}
                  <div className="absolute -top-4 -left-2 text-6xl text-radiance-gold/20 font-serif leading-none">"</div>

                  <blockquote className="text-xl md:text-2xl text-text-primary leading-relaxed text-center font-medium relative z-10">
                    The world doesn't need more businesses. It needs more light workers brave enough to build their vision into reality. We exist to help them do exactly that.
                  </blockquote>
                </div>

                <div className="flex flex-col items-center gap-4 pt-6 border-t border-depth-border/30">
                  <div className="text-center">
                    <p className="font-bold text-lg text-text-primary">Eyob</p>
                    <p className="text-text-muted text-sm">Founder, Light Brand Consulting</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
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
                Ready to bring your vision to the world?
              </h2>
            </div>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Start with a Vision Assessment. Let's understand where you are, where you want to go, and how to build it with the right people and systems.
            </p>

            <p className="text-xl text-radiance-gold font-medium">
              Your vision exists for a reason.
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
                Start Your Vision Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm font-mono tracking-wider">
              <span className="opacity-40">//</span> Purpose-driven builders only <span className="opacity-40">·</span> Impact over income <span className="opacity-40">//</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Final Positioning Section */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow">
          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <p className="text-lg text-text-secondary">
              Most light workers try to go it alone or compromise their values to fit the business world.
            </p>
            <p className="text-xl text-text-primary font-medium">
              We help you build differently.
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              with integrity, aligned people, and intelligent systems that amplify your impact.
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
              <span className="text-radiance-gold font-medium">Light Brand</span> helps light workers bring their vision to the planet
              with good people and intelligent systems.
            </p>
            <span className="w-2 h-2 rounded-full bg-radiance-gold/30" />
          </div>
        </Container>
      </section>
    </div>
  );
};
