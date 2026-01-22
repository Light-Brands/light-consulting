/**
 * About Page
 * Light Brand Consulting
 */

import React, { useState } from 'react';
import {
  Button,
  Card,
  Tag,
  SparkleIcon,
  ValueIcon,
  IndustryIcon,
  OriginStoryVisual,
  FoundersVisual,
  ValuesVisual,
  DifferenceVisual,
  WorkingWithUsVisual,
  StewardshipVisual,
  StrategicMomentVisual,
  Level5CTAVisual,
} from '../components';
import { Container, Section, Badge, Heading, Text } from '../components/ui';
import { COMPANY_VALUES, INDUSTRIES_SERVED, IMAGE_CONFIG, FOUNDERS_INTRO, FOUNDER_FAMILIES, INDUSTRY_AI_INSIGHTS } from '../lib/constants';
import { PageKey } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageKey) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero */}
      <section 
        className="relative -mt-24 md:-mt-32 pt-24 md:pt-32 min-h-[60vh] flex items-center"
        style={{
          backgroundImage: `url(${IMAGE_CONFIG.heroes.about.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
        
        <Container size="wide" className="relative z-10">
          <div className="max-w-3xl">
            <Tag variant="premium" className="mb-4 text-white border-white/30">
              About Us
            </Tag>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              We Are{' '}
              <span className="text-radiance-gold">AI Architects</span>
            </h1>
            <p className="text-white/90 text-lg mb-4">
              Not "prompt engineers." Not "automation agencies." Not "AI builders."
              We design <span className="text-radiance-gold">how your business will function in an AI economy</span>.
            </p>
            <p className="text-white/80">
              Light Brand Consulting delivers enterprise-grade value through the AI Maturity Ladder framework,
              moving founders from wherever they are to Level 5, where AI becomes a structural advantage.
            </p>
          </div>
        </Container>
      </section>

      {/* Origin Story - Centered and Prominent */}
      <Section spacing="lg" background="elevated" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="default" size="md" className="mb-4">
              The Core Insight
            </Badge>
            <Heading level="h2" className="mb-6">
              Why the AI Maturity Ladder
            </Heading>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <OriginStoryVisual
                content={{
                  paragraphs: [
                    'AI adoption has shifted from "tools" to organizational maturity. The competitive advantage is not using AI. It\'s <span class="text-radiance-gold font-semibold">building structure that AI can amplify</span>.',
                    'Most companies remain stuck in early-stage adoption: experimenting, prompting, disconnected automations. The winners build systematized infrastructure and eventually owned intelligence.',
                    'Light Brand is already operating in that lane. The AI Maturity Ladder fixes the mismatch by: giving buyers a self-diagnostic map, turning vague AI "services" into measurable progression, and creating a clear narrative for premium, outcome-based engagements.',
                  ],
                  categoryTitle: 'AI Architect: The Category',
                  categorySubtitle: 'This is the correct category to own:',
                  claims: [
                    {
                      number: 1,
                      title: 'Operating Infrastructure',
                      description: 'Not "AI installs" but systems that compound',
                      color: 'gold',
                    },
                    {
                      number: 2,
                      title: 'Founder Independence',
                      description: 'Reducing dependence through systems',
                      color: 'amber',
                    },
                    {
                      number: 3,
                      title: 'Compounding Workflows',
                      description: 'Across revenue, delivery, and ops',
                      color: 'cream',
                    },
                  ],
                }}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Founders Section */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="premium" size="md" className="mb-4">
              Our Founders
            </Badge>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <FoundersVisual intro={FOUNDERS_INTRO} families={FOUNDER_FAMILIES} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Belief About This Moment */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
            <StrategicMomentVisual
              content={{
                title: 'The Strategic Moment',
                mainText:
                  '<span class="text-radiance-gold font-semibold">2024-2026 will be remembered the way we remember 1995 for the web, 2008 for mobile.</span> The businesses that move now, with clarity not chaos, will define the next decade.',
                quote:
                  "The businesses that win won't be the ones that did the most AI. They'll be the ones that did the right AI, at the right time, in the right places.",
              }}
            />
          </div>
        </Container>
      </Section>

      {/* Company Values */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="premium" size="md" className="mb-4">
              Our Values
            </Badge>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <ValuesVisual
                values={COMPANY_VALUES}
                intro={{
                  title: 'What We Stand For',
                  subtitle: "These aren't just words on a wall. They're how we make decisions, every day.",
                }}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* The Approach */}
      <Section spacing="lg" background="elevated" className="relative overflow-hidden">
        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="default" size="md" className="mb-4">
              What Makes Us Different
            </Badge>
            <Heading level="h2">What Makes Us Different</Heading>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-base/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <DifferenceVisual
                points={[
                  {
                    title: 'Business First, Technology Second',
                    description:
                      "We don't lead with AI jargon. We lead with your business reality, your challenges, your opportunities. AI is the tool. Your success is the goal. Every recommendation ties directly to business outcomes you care about.",
                  },
                  {
                    title: 'Clarity Over Complexity',
                    description:
                      'Every recommendation we make passes a simple test: "Will this make things clearer or more complicated?" We choose clarity every time. If we can\'t explain it in plain language, we don\'t recommend it.',
                  },
                  {
                    title: 'Speed With Intention',
                    description:
                      'The window is open now. We move fast, but with purpose. A 70% solution today beats a 100% solution in six months. We help you make progress while others are still planning.',
                  },
                  {
                    title: 'Independence as the Goal',
                    description:
                      "The best outcome isn't ongoing dependency on us. It's you seeing clearly, moving confidently, and building capacity that compounds. We want to become unnecessary as quickly as possible.",
                  },
                  {
                    title: 'Revelation, Not Imposition',
                    description:
                      "Your business already contains its own genius. We don't impose external frameworks. We reveal what's already there and show you how AI amplifies it. The best solutions feel obvious in hindsight.",
                  },
                  {
                    title: 'Quality Over Quantity',
                    description:
                      'We work with a limited number of clients at a time. This isn\'t about scale. It\'s about impact. Every engagement gets our full attention and best thinking.',
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Industries */}
      <section className="section-spacing">
        <Container size="wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Industries We Serve
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              AI opportunities exist in every industry. <span className="text-radiance-gold">Hover to see how AI transforms each.</span>
            </p>
          </div>

          {/* Industries Grid with Hover Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {INDUSTRIES_SERVED.map((industry, index) => {
              const industryKeyMap: Record<string, keyof typeof IMAGE_CONFIG.industries> = {
                'Healthcare & Life Sciences': 'healthcare',
                'Financial Services': 'finance',
                'E-commerce & Retail': 'ecommerce',
                'Professional Services': 'professional',
                'Manufacturing & Logistics': 'manufacturing',
                'Media & Entertainment': 'media',
                'Education & EdTech': 'education',
                'Real Estate & PropTech': 'realestate',
              };
              const iconKey = industryKeyMap[industry] || 'healthcare';
              const iconConfig = IMAGE_CONFIG.industries[iconKey];
              const insights = INDUSTRY_AI_INSIGHTS[industry];

              return (
                <div key={index} className="group relative">
                  {/* Base Card */}
                  <div className="relative cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:z-10">
                    <IndustryIcon
                      src={iconConfig?.src}
                      alt={iconConfig?.alt || industry}
                      label={industry}
                    />
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl bg-radiance-gold/0 group-hover:bg-radiance-gold/5 transition-colors duration-300 pointer-events-none" />
                  </div>
                  
                  {/* Hover Popover */}
                  {insights && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1E1C1A] border-l border-t border-radiance-gold/30 rotate-45" />
                      
                      {/* Card Content */}
                      <div 
                        className="relative bg-[#1E1C1A] border border-radiance-gold/30 rounded-xl p-5 shadow-2xl"
                        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(232, 184, 74, 0.15)' }}
                      >
                        {/* Headline */}
                        <p className="text-radiance-gold font-semibold text-sm mb-3">
                          {insights.headline}
                        </p>
                        
                        {/* Optimizations */}
                        <ul className="space-y-2">
                          {insights.optimizations.map((opt, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-radiance-gold mt-1 flex-shrink-0">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                              <span className="text-text-secondary text-xs leading-relaxed">{opt}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* Subtle CTA */}
                        <div className="mt-4 pt-3 border-t border-depth-border">
                          <p className="text-text-muted text-xs italic text-center">
                            Book an Illumination Session to explore your opportunities
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-text-muted text-sm text-center mt-12 max-w-2xl mx-auto">
            The specific AI opportunities vary by industry, but the approach is the same:
            understand your unique context, reveal the opportunities hiding in plain sight,
            and give you a clear path forward.
          </p>
        </Container>
      </section>

      {/* Working With Us */}
      <Section spacing="lg" background="elevated" className="relative overflow-hidden">
        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="default" size="md" className="mb-4">
              What It's Like Working With Us
            </Badge>
            <Heading level="h2">What It's Like Working With Us</Heading>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-base/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <WorkingWithUsVisual
                points={[
                  {
                    title: 'We listen first',
                    description:
                      'Before we offer any insights, we make sure we deeply understand your situation. Your context matters more than generic AI trends.',
                  },
                  {
                    title: 'We speak your language',
                    description:
                      'No technical jargon, no buzzwords. We explain everything in terms of business outcomes you care about.',
                  },
                  {
                    title: "We're honest about limits",
                    description:
                      "If AI isn't the right answer, we'll tell you. If you're not ready, we'll tell you that too. The truth serves you better.",
                  },
                  {
                    title: 'We move fast',
                    description:
                      'Our engagements are measured in hours, days, and weeks, not months. You\'ll have clarity quickly.',
                  },
                  {
                    title: 'We let go',
                    description:
                      'The goal is your independence. We give you everything you need to move forward without us.',
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Stewardship Council */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="premium" size="md" className="mb-4">
              Our Partnership Philosophy
            </Badge>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <StewardshipVisual
                content={{
                  title: 'The Stewardship Council',
                  paragraphs: [
                    "We don't want to work with everyone, and that's intentional. We believe those meant to work with us will come forward, equally excited as we are to greet them with open arms.",
                    'Our mission is to <span class="text-radiance-gold font-medium">steward light to the planet</span>. We only want to work with brands that share this mindset, those ready to step into the light.',
                    'For brands that align with our values, we offer <span class="text-radiance-gold font-medium">full implementation and Brand Development services</span>. This opportunity only becomes available after completing an AI Acceleration Blueprint, which is what empowers the development.',
                  ],
                  process: [
                    {
                      step: '01',
                      title: 'Comprehensive Review',
                      description:
                        'We evaluate your concept, business model, and overall approach to ensure alignment.',
                    },
                    {
                      step: '02',
                      title: 'Founder Interviews',
                      description:
                        'We conduct in-depth conversations with founders to understand vision and values.',
                    },
                    {
                      step: '03',
                      title: 'Mutual Alignment',
                      description:
                        'We ensure both parties are ready and excited to work together toward a shared mission.',
                    },
                    {
                      step: '04',
                      title: 'Brand Development',
                      description:
                        'Aligned partners gain access to full implementation and development services.',
                    },
                  ],
                  quote:
                    "We believe in working deeply with the right partners rather than broadly with anyone who asks.",
                }}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA - Special Level 5 Invitation */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="relative z-10 bg-depth-elevated/20 border border-radiance-gold/20 rounded-3xl overflow-hidden backdrop-blur-sm">
            <Level5CTAVisual
              onPrimaryAction={() => onNavigate('book')}
              onSecondaryAction={() => onNavigate('contact')}
            />
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default AboutPage;
