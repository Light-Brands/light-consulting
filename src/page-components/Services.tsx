/**
 * Services Page
 * Light Brand Consulting
 *
 * Note: Per the offer architecture, only the front-end offers
 * (Diagnostic and Strategy) are publicly displayed.
 * Backend offers (Intelligence Engines, Architect Partnership)
 * are by invitation only after the diagnostic process.
 */

import React from 'react';
import {
  Button,
  Card,
  Tag,
  CheckIcon,
  ServicesFlowVisual,
  ApproachComparisonVisual,
  FAQVisual,
  CTAVisual,
} from '../components';
import { Container, Section, Badge, Heading, Text } from '../components/ui';
import { SERVICES, IMAGE_CONFIG } from '../lib/constants';
import { PageKey } from '../types';

// Service icons
const DiagnosticIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12h6M12 9v6M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
  </svg>
);

const StrategyIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

interface ServicesPageProps {
  onNavigate: (page: PageKey) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const diagnostic = SERVICES.diagnostic;
  const strategy = SERVICES.strategy;

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero */}
      <section
        className="section-spacing relative"
        style={{
          backgroundImage: `url(${IMAGE_CONFIG.heroes.services.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-depth-base/80" />

        <div
          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 14, 13, 0.5) 50%, rgba(15, 14, 13, 1) 100%)',
          }}
        />

        <Container size="wide" className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Tag variant="premium" className="mb-4">
              How We Work
            </Tag>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Clarity Before Commitment
            </h1>
            <p className="text-text-secondary text-lg mb-4">
              We don't sell packages. We don't pitch transformation.
            </p>
            <p className="text-text-muted">
              We start with clarity. If there's a real opportunity, we'll tell you.
              If there isn't, we'll tell you that too.
            </p>
          </div>
        </Container>
      </section>

      {/* The Flow */}
      <Section spacing="lg" background="elevated" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="default" size="md" className="mb-4">
              The Path to Clarity
            </Badge>
            <Heading level="h2" className="mb-4">
              Every engagement starts with understanding
            </Heading>
            <Text variant="large" className="max-w-2xl mx-auto text-text-secondary">
              Trust precedes selling. Clarity precedes commitment. Depth precedes price.
            </Text>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <ServicesFlowVisual
                steps={[
                  {
                    step: 1,
                    title: diagnostic.name,
                    description: diagnostic.description,
                    deliverables: diagnostic.deliverables,
                    investment: diagnostic.investment,
                    duration: diagnostic.duration,
                    color: 'gold',
                    icon: <DiagnosticIcon size={24} />,
                    available: true,
                    onAction: () => onNavigate('funnel'),
                  },
                  {
                    step: 2,
                    title: strategy.name,
                    description: strategy.description,
                    deliverables: strategy.deliverables,
                    investment: strategy.investment,
                    duration: strategy.duration,
                    color: 'amber',
                    icon: <StrategyIcon size={24} />,
                    available: false,
                  },
                  {
                    step: 3,
                    title: 'If Opportunity Exists',
                    description:
                      'Only after the Strategy artifact confirms development readiness do we discuss building. AI Intelligence Engines and deeper partnership work are by invitation only.',
                    deliverables: [
                      'No build recommended',
                      'Build possible, but not ready yet',
                      'Qualifies for development',
                    ],
                    investment: 'By invitation only',
                    duration: 'After Strategy',
                    color: 'muted',
                    icon: (
                      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    ),
                    available: false,
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Why This Approach */}
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="default" size="md" className="mb-4">
              Why This Approach
            </Badge>
            <Heading level="h2" className="mb-4">
              Most agencies skip the clarity step.
            </Heading>
            <Text variant="large" className="text-radiance-gold font-medium text-center block">
              That's why they build the wrong things.
            </Text>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <ApproachComparisonVisual
                others={{
                  label: 'What Others Do',
                  items: [
                    'Pitch transformation before understanding',
                    'Sell packages without diagnosing fit',
                    "Build systems that don't address real bottlenecks",
                    'Create motion without leverage',
                  ],
                  color: 'error',
                }}
                ours={{
                  label: 'What We Do',
                  items: [
                    'Start with clarity, not sales',
                    "Tell you when AI isn't the answer",
                    'Build only what the strategy justifies',
                    'Design systems that compound',
                  ],
                  color: 'gold',
                }}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section spacing="lg" background="elevated" className="relative overflow-hidden">
        <Container size="wide">
          <div className="text-center mb-12 relative z-10">
            <Badge variant="default" size="md" className="mb-4">
              Common Questions
            </Badge>
            <Heading level="h2">Common Questions</Heading>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-depth-base/20 border border-depth-border rounded-3xl overflow-hidden backdrop-blur-sm">
              <FAQVisual
                items={[
                  {
                    question: 'What if the diagnostic shows no opportunity?',
                    answer:
                      "Then you leave with clarity, which is valuable in itself. We'll tell you honestly if AI systems aren't the right move for your business right now. Zero reputational cost, trust built.",
                  },
                  {
                    question: 'Can I skip the diagnostic and go straight to building?',
                    answer:
                      "No. The diagnostic and strategy process ensures we're building the right things. Skipping it often leads to wasted investment on systems that don't address real bottlenecks.",
                  },
                  {
                    question: 'How much does the deeper work cost?',
                    answer:
                      'Investment for intelligence engines and partnership work is scoped based on the strategy artifact. We don\'t quote without understanding exactly what needs to be built and why.',
                  },
                  {
                    question: "Why isn't everything listed with prices?",
                    answer:
                      'Because premature selling collapses leverage. Trust must precede depth. The front-end offerings (diagnostic and strategy) provide the clarity needed before discussing backend work.',
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
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
      <section className="py-12 bg-depth-elevated border-t border-depth-border">
        <Container size="narrow" className="text-center">
          <p className="text-text-muted">
            <span className="text-radiance-gold">Light Brand</span> designs intelligence systems
            so businesses don't just use AI, they're built for it.
          </p>
        </Container>
      </section>
    </div>
  );
};

export default ServicesPage;
