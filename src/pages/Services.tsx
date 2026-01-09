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
} from '../components';
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

        <div className="container-wide relative z-10">
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
        </div>
      </section>

      {/* The Flow */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              The Path to Clarity
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Every engagement starts with understanding. Trust precedes selling.
              Clarity precedes commitment. Depth precedes price.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1: Diagnostic */}
            <Card elevation="elevated" className="p-8 border border-radiance-gold/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center">
                  <DiagnosticIcon size={24} />
                </div>
                <div>
                  <p className="text-radiance-gold text-sm font-medium">Step 1</p>
                  <h3 className="text-xl font-bold text-text-primary">{diagnostic.name}</h3>
                </div>
              </div>

              <p className="text-text-secondary mb-6">{diagnostic.description}</p>

              <div className="space-y-3 mb-6">
                <p className="text-text-muted text-sm font-medium">You'll receive:</p>
                {diagnostic.deliverables.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckIcon size={14} className="text-radiance-gold mt-1 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-depth-border">
                <p className="text-text-muted text-sm mb-4">{diagnostic.investment} · {diagnostic.duration}</p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate('funnel')}
                  className="w-full"
                >
                  Discover Your AI Readiness
                </Button>
              </div>
            </Card>

            {/* Step 2: Strategy */}
            <Card elevation="elevated" className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-radiance-amber/20 text-radiance-amber flex items-center justify-center">
                  <StrategyIcon size={24} />
                </div>
                <div>
                  <p className="text-radiance-amber text-sm font-medium">Step 2</p>
                  <h3 className="text-xl font-bold text-text-primary">{strategy.name}</h3>
                </div>
              </div>

              <p className="text-text-secondary mb-6">{strategy.description}</p>

              <div className="space-y-3 mb-6">
                <p className="text-text-muted text-sm font-medium">You'll receive:</p>
                {strategy.deliverables.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckIcon size={14} className="text-radiance-amber mt-1 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-depth-border">
                <p className="text-text-muted text-sm mb-4">{strategy.investment} · {strategy.duration}</p>
                <p className="text-text-muted text-xs italic">
                  Available after completing the Diagnostic
                </p>
              </div>
            </Card>

            {/* Step 3: Beyond */}
            <Card elevation="subtle" className="p-8 border border-depth-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-depth-surface text-text-muted flex items-center justify-center">
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-muted text-sm font-medium">Step 3</p>
                  <h3 className="text-xl font-bold text-text-primary">If Opportunity Exists</h3>
                </div>
              </div>

              <p className="text-text-secondary mb-6">
                Only after the Strategy artifact confirms development readiness do we discuss building.
                AI Intelligence Engines and deeper partnership work are by invitation only.
              </p>

              <div className="space-y-3 mb-6">
                <p className="text-text-muted text-sm font-medium">Possible outcomes:</p>
                <div className="flex items-start gap-2">
                  <span className="text-text-muted">❌</span>
                  <span className="text-text-secondary text-sm">No build recommended</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-radiance-amber">🟡</span>
                  <span className="text-text-secondary text-sm">Build possible, but not ready yet</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-success">✅</span>
                  <span className="text-text-secondary text-sm">Qualifies for development</span>
                </div>
              </div>

              <div className="pt-4 border-t border-depth-border">
                <p className="text-text-muted text-xs italic">
                  Only outcome #3 leads to system builds.
                  We'll be direct about which applies to you.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why This Approach */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Tag variant="outline" className="mb-4">
                Why This Approach
              </Tag>
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Most agencies skip the clarity step.
                <span className="block text-radiance-gold mt-2">That's why they build the wrong things.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card elevation="subtle" className="p-6 border-l-4 border-error">
                <h3 className="text-lg font-bold text-text-primary mb-3">What Others Do</h3>
                <ul className="space-y-3 text-text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-error">×</span>
                    <span>Pitch transformation before understanding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error">×</span>
                    <span>Sell packages without diagnosing fit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error">×</span>
                    <span>Build systems that don't address real bottlenecks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error">×</span>
                    <span>Create motion without leverage</span>
                  </li>
                </ul>
              </Card>

              <Card elevation="elevated" className="p-6 border-l-4 border-radiance-gold">
                <h3 className="text-lg font-bold text-text-primary mb-3">What We Do</h3>
                <ul className="space-y-3 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckIcon size={14} className="text-radiance-gold mt-1 flex-shrink-0" />
                    <span>Start with clarity, not sales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon size={14} className="text-radiance-gold mt-1 flex-shrink-0" />
                    <span>Tell you when AI isn't the answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon size={14} className="text-radiance-gold mt-1 flex-shrink-0" />
                    <span>Build only what the strategy justifies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon size={14} className="text-radiance-gold mt-1 flex-shrink-0" />
                    <span>Design systems that compound</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Common Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'What if the diagnostic shows no opportunity?',
                a: 'Then you leave with clarity—which is valuable in itself. We\'ll tell you honestly if AI systems aren\'t the right move for your business right now. Zero reputational cost, trust built.',
              },
              {
                q: 'Can I skip the diagnostic and go straight to building?',
                a: 'No. The diagnostic and strategy process ensures we\'re building the right things. Skipping it often leads to wasted investment on systems that don\'t address real bottlenecks.',
              },
              {
                q: 'How much does the deeper work cost?',
                a: 'Investment for intelligence engines and partnership work is scoped based on the strategy artifact. We don\'t quote without understanding exactly what needs to be built and why.',
              },
              {
                q: 'Why isn\'t everything listed with prices?',
                a: 'Because premature selling collapses leverage. Trust must precede depth. The front-end offerings (diagnostic and strategy) provide the clarity needed before discussing backend work.',
              },
            ].map((item, index) => (
              <Card key={index} elevation="subtle" className="p-6">
                <h4 className="text-text-primary font-semibold mb-2">{item.q}</h4>
                <p className="text-text-secondary text-sm">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Not sure where you stand?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Most founders think they're further along than they are.
            Start with the diagnostic to see where you actually are.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('funnel')}
          >
            Discover Your AI Readiness
          </Button>
        </div>
      </section>

      {/* Footer Line */}
      <section className="py-12 bg-depth-elevated border-t border-depth-border">
        <div className="container-narrow text-center">
          <p className="text-text-muted">
            <span className="text-radiance-gold">Light Brand</span> designs intelligence systems —
            so businesses don't just use AI, they're built for it.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
