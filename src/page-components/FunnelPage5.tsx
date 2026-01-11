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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGE_CONFIG.heroes.home.src}
            alt={IMAGE_CONFIG.heroes.home.alt}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-depth-base/90 via-depth-base/70 to-depth-base"></div>
        </div>

        {/* Hero Content */}
        <Container size="wide" className="relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Tag variant="outline" className="mx-auto">
              For Light Workers & Conscious Entrepreneurs
            </Tag>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              You Have a Vision That Could Change Lives.
              <span className="block text-radiance-gold mt-2">
                Let's Build It With the Right People.
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                Good intentions deserve good systems.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                Your mission needs infrastructure to reach the world.
              </p>
              <p className="text-2xl md:text-3xl text-radiance-gold font-semibold">
                We help light workers build with integrity and impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Start Your Vision Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm max-w-xl mx-auto">
              Discover how to bring your idea to the planet with the right people, right systems, and right foundation.
            </p>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-radiance-gold" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* The Problem - Why Most Light Workers Struggle */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              The Challenge
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Your Vision Is Clear.
              <span className="block text-radiance-gold mt-2">The Path to Bring It to Life Isn't.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <Card elevation="elevated" className="p-8 md:p-10 border border-radiance-gold/30">
              <p className="text-lg text-text-secondary text-center mb-8">
                You know you're here to create something meaningful. But...
              </p>

              <div className="space-y-4">
                {[
                  { pain: 'You attract the wrong people', desc: "Partners who don't share your values, team members who drain your energy" },
                  { pain: 'Your ideas stay ideas', desc: "The vision is clear in your mind but translating it to reality feels overwhelming" },
                  { pain: 'You work harder, not smarter', desc: "No systems, no leverage - just endless effort that burns you out" },
                  { pain: 'You question if it's possible', desc: "Maybe this was meant to stay a dream? Maybe you're not cut out for this?" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-depth-surface rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">{item.pain}</p>
                      <p className="text-text-muted text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-depth-border mt-8">
                <p className="text-text-secondary text-center mb-2">
                  The problem isn't your vision.
                </p>
                <p className="text-radiance-gold font-semibold text-xl text-center">
                  It's that no one taught you how to build it.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* What Light Workers Actually Need */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="outline" className="mx-auto mb-6">
              The Truth
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What Light Workers Actually Need
            </h2>
            <p className="text-lg text-text-secondary">
              (That no one talks about)
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                title: 'Aligned People',
                desc: 'Team members and partners who share your values, understand your mission, and elevate your energy - not drain it.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                color: 'radiance-gold',
              },
              {
                title: 'Intelligent Systems',
                desc: 'Infrastructure that amplifies your impact without burning you out. AI and automation that works while you rest.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                ),
                color: 'wisdom-violet',
              },
              {
                title: 'Clear Strategy',
                desc: 'A roadmap that honors your values while being grounded in reality. No compromise on integrity, no delusion on execution.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                ),
                color: 'radiance-amber',
              },
              {
                title: 'Sustainable Foundation',
                desc: 'Revenue models that support your mission. Abundance is not anti-spiritual - it's fuel for greater impact.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                color: 'radiance-gold',
              },
            ].map((item, index) => (
              <Card key={index} elevation="subtle" className="p-6 border border-depth-border">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full bg-${item.color}/20 text-${item.color} flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-text-secondary">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}

            <div className="text-center pt-8">
              <p className="text-text-secondary mb-2">Good intentions alone don't create impact.</p>
              <p className="text-radiance-gold font-semibold text-xl">
                Good intentions + good systems + good people = transformation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Who This Is For */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              Is This You?
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              This Is For You If...
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* For You */}
              <Card elevation="elevated" className="p-6 border border-radiance-gold/30">
                <h3 className="text-lg font-bold text-radiance-gold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  This Is For You
                </h3>
                <ul className="space-y-3">
                  {[
                    'You have a vision that feels bigger than yourself',
                    'You care about impact more than just income',
                    'You want to work with people who share your values',
                    'You believe business can be a force for good',
                    'You\'re ready to build something that matters',
                    'You want systems that work without sacrificing soul',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-text-secondary text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Not For You */}
              <Card elevation="subtle" className="p-6 border border-depth-border">
                <h3 className="text-lg font-bold text-text-muted mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  This Is Not For You
                </h3>
                <ul className="space-y-3">
                  {[
                    'You\'re only motivated by profit',
                    'You want a get-rich-quick scheme',
                    'You\'re not willing to do the inner work',
                    'You expect results without effort',
                    'You see people as transactions',
                    'You\'re looking for someone else to do it for you',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-text-muted text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted/50 mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card elevation="subtle" className="p-6 border border-depth-border text-center">
              <p className="text-text-secondary mb-2">We work with light workers who are serious about bringing their vision to the world.</p>
              <p className="text-radiance-gold font-medium">If that's you, keep reading.</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* The Light Workers Path */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="outline" className="mx-auto mb-6">
              The Path Forward
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How We Help Light Workers Build
            </h2>
            <p className="text-lg text-text-secondary">
              A structured approach to bringing your vision to life
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                step: '1',
                title: 'Vision Clarity Session',
                desc: 'We start by understanding your vision, your values, and what you\'re truly here to create. No judgment, just clarity.',
                outcome: 'Clear articulation of your mission and the impact you want to create',
              },
              {
                step: '2',
                title: 'People & Alignment Mapping',
                desc: 'We identify who needs to be on this journey with you. What skills, values, and energy do you need? Where do you find them?',
                outcome: 'A clear picture of your ideal team and community',
              },
              {
                step: '3',
                title: 'System Design',
                desc: 'We build intelligent systems that amplify your work. AI-powered tools, automation, and infrastructure that works while you focus on what matters.',
                outcome: 'Sustainable systems that scale your impact without burning you out',
              },
              {
                step: '4',
                title: 'Launch & Iteration',
                desc: 'We help you launch, learn, and improve. Your vision meets reality, and we refine together.',
                outcome: 'A living, breathing manifestation of your vision in the world',
              },
            ].map((item, index) => (
              <Card key={index} elevation="elevated" className="p-6 border border-radiance-gold/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-text-secondary mb-4">{item.desc}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-text-muted">Outcome:</span>
                      <span className="text-radiance-gold">{item.outcome}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Core Principles */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="text-center mb-12">
            <Tag variant="primary" className="mx-auto mb-6">
              Our Principles
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How We Work
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6">
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
                <Card key={index} elevation="subtle" className="p-5 border border-depth-border">
                  <h3 className="text-text-primary font-bold mb-2">{item.principle}</h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonial/Social Proof Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="max-w-3xl mx-auto">
            <Card elevation="elevated" className="p-8 md:p-10 border border-radiance-gold/30">
              <div className="text-center space-y-6">
                <div className="text-4xl text-radiance-gold">"</div>
                <p className="text-xl md:text-2xl text-text-primary italic leading-relaxed">
                  The world doesn't need more businesses. It needs more light workers brave enough to build their vision into reality. We exist to help them do exactly that.
                </p>
                <div className="pt-4">
                  <p className="text-text-primary font-medium">Eyob</p>
                  <p className="text-text-muted text-sm">Founder, Light Brand Consulting</p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Ready to Bring Your Vision to the World?
            </h2>

            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Start with a Vision Assessment. Let's understand where you are, where you want to go, and how to build it with the right people and systems.
            </p>

            <div className="pt-4">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Start Your Vision Assessment
              </Button>
            </div>

            <p className="text-text-muted text-sm">
              This is for light workers who are serious about creating impact. If that's you, let's talk.
            </p>

            <Card elevation="subtle" className="p-8 border border-depth-border max-w-2xl mx-auto mt-8">
              <div className="space-y-4">
                <p className="text-text-secondary">
                  Your vision exists for a reason.
                </p>
                <p className="text-text-primary font-medium">
                  The world needs what you're here to create.
                </p>
                <p className="text-radiance-gold font-semibold text-lg">
                  Let's build it together.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Final Positioning Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg text-text-secondary">
              Most light workers try to go it alone or compromise their values to fit the business world.
            </p>
            <p className="text-xl text-text-primary font-medium">
              We help you build differently —
            </p>
            <p className="text-2xl text-radiance-gold font-semibold">
              with integrity, aligned people, and intelligent systems that amplify your impact.
            </p>
          </div>
        </Container>
      </section>

      {/* Closing Line */}
      <section className="py-12 bg-depth-base border-t border-depth-border">
        <Container size="narrow" className="text-center">
          <p className="text-text-muted">
            <span className="text-radiance-gold">Light Brand</span> helps light workers bring their vision to the planet
            with good people and intelligent systems.
          </p>
        </Container>
      </section>
    </div>
  );
};
