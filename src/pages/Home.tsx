/**
 * Home Page
 * Light Brand Consulting
 *
 * Homepage Function: Sell the frame, not the offer
 * - Establish category authority
 * - Create resonance ("this explains what I'm feeling")
 * - Filter out the wrong people
 * - Point to ONE action: Discover Your AI Readiness
 */

import React from 'react';
import {
  NewsletterCapture,
  CheckIcon,
  SparkleIcon,
  CapacityGapVisual,
  LaborArbitrageHighlight,
  IntelligenceOwnershipVisual,
  AIReadinessCurve,
  WhatWeDesignVisual,
  ProcessVisual,
  FitCriteriaVisual,
  ProblemVisual,
  TestimonialVisual,
  NewsletterVisual,
  CTAVisual,
  FooterVisual,
} from '../components';
import {
  Container,
  Section,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  Badge,
  Stack,
  Grid,
} from '../components/ui';
import { TESTIMONIALS, FIT_CRITERIA } from '../lib/constants';
import { PageKey } from '../types';

interface HomePageProps {
  onNavigate: (page: PageKey) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="min-h-[90vh] relative overflow-hidden flex flex-col justify-center pt-20"
        style={{
          backgroundImage: 'url(/images/light-brand-hero.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-depth-base/70" />

        {/* Bottom fade gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 14, 13, 0.5) 50%, rgba(15, 14, 13, 1) 100%)',
          }}
        />

        {/* Glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-gradient from-radiance-gold/8 to-transparent blur-3xl pointer-events-none" />

        <div className="w-full relative z-10">
          <Container size="wide">
            <div className="animate-fade-in">
              <Badge variant="premium" size="md" className="mb-6">
                AI Intelligence Systems
              </Badge>
            </div>

            <Heading level="h1" className="mb-8 animate-slide-up max-w-4xl">
              We design AI intelligence systems{' '}
              <span className="text-radiance-gold">
                for businesses that want to survive and lead the next decade.
              </span>
            </Heading>

            <Text variant="lead" className="mb-6 max-w-3xl animate-slide-up delay-200">
              Most companies are adding AI tools to broken systems.
            </Text>

            <Text variant="body" className="text-text-muted mb-12 max-w-3xl animate-slide-up delay-250">
              We redesign how your business actually thinks, operates, and compounds in an AI-driven world.
            </Text>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('funnel')}
              >
                Discover Your AI Readiness
              </Button>
            </div>
          </Container>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-text-muted/30 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="mb-12 relative z-10">
            <Badge variant="default" size="md" className="mb-6">
              The Problem
            </Badge>

            <Heading level="h2" className="mb-8">
              AI isn't just changing how work is done.{' '}
              <span className="text-radiance-gold">It's changing which businesses survive.</span>
            </Heading>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <ProblemVisual />
            </div>
          </div>
        </Container>
      </Section>

      {/* Capacity Gap Section - Interactive */}
      <Section spacing="lg" className="overflow-hidden">
        <Container size="wide">
          <div className="mb-12">
            <Badge variant="premium" size="md" className="mb-6">
              Strategic Insight
            </Badge>
            <Heading level="h2" className="mb-6">
              The Capacity Gap
            </Heading>
            <Text variant="large" className="max-w-3xl text-text-secondary leading-relaxed">
              Every business has untapped potential, opportunities hidden in plain sight. The gap between where you are and where AI can take you isn't about technology. It's about seeing clearly.
            </Text>
          </div>

          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-radiance-gold/5 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-radiance-gold/5 blur-3xl pointer-events-none rounded-full" />
            
            <div className="relative z-10 bg-depth-elevated/30 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <CapacityGapVisual />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-depth-border/50 pt-12">
            <div>
              <Text className="text-lg">
                <span className="text-radiance-gold font-semibold">2024-2026 is the strategic moment.</span> Like 1995 for the web, like 2008 for mobile.
                The businesses that move now, with clarity not chaos, will define the next decade.
              </Text>
            </div>
            <div>
              <Text variant="small" className="text-text-muted border-l-2 border-radiance-gold/20 pl-6 py-2">
                The question isn't if AI will transform your industry. It's whether you'll lead that transformation or react to it.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* Labor Arbitrage Highlight */}
      <Section spacing="lg" background="elevated" className="overflow-hidden">
        <Container size="wide">
          <div className="relative">
            {/* Background decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-error/5 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="relative z-10 bg-depth-base/40 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-md">
              <LaborArbitrageHighlight onLearnMore={() => onNavigate('insights/labor-arbitrage')} />
            </div>
          </div>
        </Container>
      </Section>

      {/* The Shift Section */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="wide">
          <div className="flex flex-col items-center text-center mb-16 space-y-6">
            <Badge variant="premium" size="md">
              The Shift
            </Badge>
            <Heading level="h2" className="max-w-4xl tracking-tight leading-tight">
              Using AI is not the advantage.{' '}
              <span className="text-radiance-gold text-glow-gold">Owning intelligence is.</span>
            </Heading>
            <Text variant="large" className="max-w-3xl text-text-secondary font-light leading-relaxed">
              Most founders are scaling chaos by adding tools to broken structures. 
              The future belongs to those who design an intentional architecture for intelligence.
            </Text>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10 bg-depth-elevated/30 border border-depth-border rounded-[3rem] overflow-hidden backdrop-blur-md">
              <IntelligenceOwnershipVisual />
            </div>
          </div>
        </Container>
      </Section>

      {/* The Frame Section - AI Readiness Curve */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/5 to-transparent blur-[120px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-16 relative z-10">
            <Badge variant="default" size="md" className="mb-6">
              The Frame
            </Badge>
            <Heading level="h2" className="max-w-3xl mx-auto">
              Every business sits somewhere on the AI readiness curve
            </Heading>
          </div>

          <div className="relative group">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-radiance-gold/5 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-radiance-gold/5 blur-3xl pointer-events-none rounded-full" />
            
            {/* Hover glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* Styled container */}
            <div className="relative z-10 bg-depth-elevated/30 border border-depth-border rounded-[3rem] overflow-hidden backdrop-blur-md">
              <AIReadinessCurve />
            </div>
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto relative z-10">
            <Text variant="large" className="text-text-primary font-medium mb-4">
              Most companies stall in the middle.
            </Text>
            <Text variant="large" className="text-radiance-gold font-light">
              We help you move to the top, where AI becomes a structural advantage, not a novelty.
            </Text>
          </div>
        </Container>
      </Section>

      {/* What We Design Section */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="premium" size="md" className="mb-4">
              What We Design
            </Badge>
            <Heading level="h2" className="mb-6">
              We don't sell websites. We don't install tools. We don't chase trends.
            </Heading>
            <Text variant="large" className="text-radiance-gold font-medium">
              We design AI intelligence systems that grow with your business.
            </Text>
          </div>

          <div className="relative">
            {/* Decorative glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-radiance-gold/5 blur-3xl pointer-events-none rounded-full" />
            
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <WhatWeDesignVisual />
            </div>
          </div>
        </Container>
      </Section>

      {/* How It Works Section */}
      <Section spacing="lg" background="elevated" className="relative overflow-hidden">
        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="default" size="md" className="mb-4">
              How It Works
            </Badge>
            <Heading level="h2">
              Our process is simple by design.
            </Heading>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-base/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <ProcessVisual />
            </div>
          </div>
        </Container>
      </Section>

      {/* Who This Is For Section */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="premium" size="md" className="mb-4">
              Who This Is For
            </Badge>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <FitCriteriaVisual idealClients={FIT_CRITERIA.idealClients} notAFit={FIT_CRITERIA.notAFit} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Testimonial Section */}
      {TESTIMONIALS[0] && (
        <Section spacing="lg" background="elevated" className="relative overflow-hidden">
          {/* Background atmosphere */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

          <Container size="wide">
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <TestimonialVisual testimonial={TESTIMONIALS[0]} />
            </div>
          </Container>
        </Section>
      )}

      {/* Newsletter Section */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
            <NewsletterVisual />
          </div>
        </Container>
      </Section>

      {/* Final CTA Section */}
      <Section spacing="lg" className="relative overflow-hidden bg-gradient-to-b from-depth-base to-depth-elevated">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
            <CTAVisual onNavigate={() => onNavigate('funnel')} />
          </div>
        </Container>
      </Section>

      {/* Footer Line */}
      <Section spacing="sm" background="elevated" className="border-t border-depth-border">
        <Container size="wide">
          <Text align="center" variant="muted">
            <span className="text-radiance-gold">Light Brand</span> designs intelligence systems
            so businesses don't just use AI, they're built for it.
          </Text>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;
