/**
 * Services Page
 * Light Brand Consulting
 */

import React from 'react';
import {
  Card,
  Tag,
  ServiceCard,
  CheckIcon,
  SparkleIcon,
  IconPlaceholder,
  MaturityLadder,
} from '../components';
import { SERVICES, IMAGE_CONFIG, LIGHT_BRAND_METHOD } from '../lib/constants';
import { PageKey } from '../types';

// Service icons for the new offerings
const DiagnosticIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12h6M12 9v6M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
  </svg>
);

const CommandCenterIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const AuthorityIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const AscensionIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

interface ServicesPageProps {
  onNavigate: (page: PageKey) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const serviceIcons: Record<string, React.ReactNode> = {
    diagnostic: <DiagnosticIcon size={24} />,
    'command-center': <CommandCenterIcon size={24} />,
    'authority-engine': <AuthorityIcon size={24} />,
    ascension: <AscensionIcon size={24} />,
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero with Background Image */}
      <section 
        className="section-spacing relative"
        style={{
          backgroundImage: `url(${IMAGE_CONFIG.heroes.services.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-depth-base/80" />
        
        {/* Bottom fade gradient - dissolves into next section */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 14, 13, 0.5) 50%, rgba(15, 14, 13, 1) 100%)',
          }}
        />

        <div className="container-wide relative z-10">
          <div className="text-center mb-16">
            <Tag variant="premium" className="mb-4">
              Services & Pricing Architecture
            </Tag>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              The Path to <span className="text-radiance-gold">AI Architect</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-4">
              Four offerings designed to move you up the AI Maturity Ladder—from wherever you are to Level 5.
            </p>
            <p className="text-text-muted max-w-xl mx-auto">
              This is not consulting. This is the installation of operating infrastructure that compounds.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {Object.entries(SERVICES).map(([key, service]) => (
              <ServiceCard
                key={key}
                service={service}
                featured={key === 'ascension'}
                icon={serviceIcons[key]}
                onLearnMore={() => onNavigate(`services/${key}` as PageKey)}
                onBook={() => onNavigate('book')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The Light Brand Method */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              The Light Brand Method
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Three phases that build on each other. Each phase moves you up the AI Maturity Ladder toward structural advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card elevation="elevated" className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-radiance-gold mb-3">
                {LIGHT_BRAND_METHOD.phase1.name}
              </h3>
              <p className="text-text-muted text-sm mb-4">
                {LIGHT_BRAND_METHOD.phase1.purpose}
              </p>
              <div className="text-left">
                <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Maps:</p>
                <ul className="text-text-secondary text-sm space-y-1 mb-4">
                  {LIGHT_BRAND_METHOD.phase1.maps.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon size={12} className="text-radiance-gold mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Outputs:</p>
                <ul className="text-text-secondary text-sm space-y-1">
                  {LIGHT_BRAND_METHOD.phase1.outputs.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon size={12} className="text-radiance-gold mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card elevation="elevated" className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-radiance-amber/20 text-radiance-amber flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-radiance-amber mb-3">
                {LIGHT_BRAND_METHOD.phase2.name}
              </h3>
              <p className="text-text-muted text-sm mb-4">
                {LIGHT_BRAND_METHOD.phase2.purpose}
              </p>
              <div className="text-left">
                <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Builds:</p>
                <ul className="text-text-secondary text-sm space-y-1 mb-4">
                  {LIGHT_BRAND_METHOD.phase2.builds.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon size={12} className="text-radiance-amber mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Outcome:</p>
                <p className="text-radiance-amber text-sm font-medium">{LIGHT_BRAND_METHOD.phase2.outcome}</p>
              </div>
            </Card>

            <Card elevation="elevated" className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-clarity-cream/20 text-clarity-cream flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-clarity-cream mb-3">
                {LIGHT_BRAND_METHOD.phase3.name}
              </h3>
              <p className="text-text-muted text-sm mb-4">
                {LIGHT_BRAND_METHOD.phase3.purpose}
              </p>
              <div className="text-left">
                <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Turns:</p>
                <ul className="text-text-secondary text-sm space-y-1 mb-4">
                  {LIGHT_BRAND_METHOD.phase3.turns.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon size={12} className="text-clarity-cream mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Into:</p>
                <ul className="text-text-secondary text-sm space-y-1">
                  {LIGHT_BRAND_METHOD.phase3.into.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon size={12} className="text-clarity-cream mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {/* Service Comparison Table */}
          <Card elevation="elevated" className="overflow-hidden">
            <div className="p-6 border-b border-depth-border">
              <h3 className="text-xl font-bold text-text-primary">
                Services & Pricing Architecture
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-depth-border">
                    <th className="p-4 text-left text-text-muted text-sm font-medium">Criteria</th>
                    <th className="p-4 text-center text-radiance-gold font-semibold">Diagnostic</th>
                    <th className="p-4 text-center text-radiance-amber font-semibold">Command Center</th>
                    <th className="p-4 text-center text-clarity-cream font-semibold">Authority Engine</th>
                    <th className="p-4 text-center text-radiance-gold font-semibold border-l border-depth-border">Ascension</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-depth-border/50">
                    <td className="p-4 text-text-secondary">Target Level</td>
                    <td className="p-4 text-center text-text-primary">Levels 1–3</td>
                    <td className="p-4 text-center text-text-primary">Level 3 → 4</td>
                    <td className="p-4 text-center text-text-primary">Level 4 → 5</td>
                    <td className="p-4 text-center text-text-primary border-l border-depth-border bg-radiance-gold/5">All → Level 5</td>
                  </tr>
                  <tr className="border-b border-depth-border/50">
                    <td className="p-4 text-text-secondary">Investment</td>
                    <td className="p-4 text-center text-text-primary">$1,500 – $15,000</td>
                    <td className="p-4 text-center text-text-primary">$20,000 – $80,000</td>
                    <td className="p-4 text-center text-text-primary">$50,000 – $150,000+</td>
                    <td className="p-4 text-center text-text-primary border-l border-depth-border bg-radiance-gold/5">$50,000 – $150,000</td>
                  </tr>
                  <tr className="border-b border-depth-border/50">
                    <td className="p-4 text-text-secondary">Duration</td>
                    <td className="p-4 text-center text-text-primary">1–2 weeks</td>
                    <td className="p-4 text-center text-text-primary">4–12 weeks</td>
                    <td className="p-4 text-center text-text-primary">8–16 weeks</td>
                    <td className="p-4 text-center text-text-primary border-l border-depth-border bg-radiance-gold/5">90 days</td>
                  </tr>
                  <tr className="border-b border-depth-border/50">
                    <td className="p-4 text-text-secondary">Primary Use</td>
                    <td className="p-4 text-center text-text-primary">Clarity + prioritization</td>
                    <td className="p-4 text-center text-text-primary">Infrastructure buildout</td>
                    <td className="p-4 text-center text-text-primary">Positioning + demand</td>
                    <td className="p-4 text-center text-text-primary border-l border-depth-border bg-radiance-gold/5">Complete transformation</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-text-secondary">Perfect If You're...</td>
                    <td className="p-4 text-center text-text-primary">Seeking clarity</td>
                    <td className="p-4 text-center text-text-primary">Ready to systematize</td>
                    <td className="p-4 text-center text-text-primary">Building authority</td>
                    <td className="p-4 text-center text-text-primary border-l border-depth-border bg-radiance-gold/5">All in on Level 5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Tag variant="premium" className="mb-4">
                AI Architects
              </Tag>
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                We Design How Your Business Will Run on AI
              </h2>
              <p className="text-text-secondary mb-6">
                We're not "prompt engineers," "automation agencies," or "AI builders." We are AI Architects—the team that designs how your business will function in an AI economy.
              </p>
              <p className="text-text-secondary mb-8">
                This removes us from agency comparison and supports enterprise-level outcomes. We're not building tools—we're building infrastructure that compounds.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Structure Over Tools', desc: 'AI doesn\'t create leverage—structure does' },
                  { title: 'Maturity Over Experiments', desc: 'Systematic progression, not random adoption' },
                  { title: 'Infrastructure Over Services', desc: 'Systems that run without you' },
                  { title: 'Compounding Over Linear', desc: 'Returns that grow over time' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={14} />
                    </div>
                    <div>
                      <span className="text-text-primary font-medium">{item.title}:</span>
                      <span className="text-text-secondary ml-1">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card elevation="elevated" className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <SparkleIcon className="text-radiance-gold" size={24} />
                <h3 className="text-xl font-bold text-text-primary">
                  The Ascension Path
                </h3>
              </div>

              <div className="space-y-6">
                <div className="relative pl-8 pb-6 border-l-2 border-depth-border">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-radiance-gold" />
                  <p className="text-text-primary font-medium">Phase 1: AI Level Diagnostic</p>
                  <p className="text-text-muted text-sm">Map your current maturity and identify leverage gaps</p>
                </div>

                <div className="relative pl-8 pb-6 border-l-2 border-depth-border">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-radiance-amber" />
                  <p className="text-text-primary font-medium">Phase 2: Command Center Build</p>
                  <p className="text-text-muted text-sm">Install operating infrastructure that removes founder dependence</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-clarity-cream" />
                  <p className="text-text-primary font-medium">Phase 3: Authority Engine</p>
                  <p className="text-text-muted text-sm">Convert expertise into market position and compounding demand</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-depth-border">
                <p className="text-text-muted text-sm italic">
                  Start with a Diagnostic to see where you are. Or commit to the full Ascension journey and reach Level 5 in 90 days.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Common Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'Which service should I start with?',
                a: 'Most clients start with the AI Level Diagnostic. It shows you exactly where you are on the maturity ladder and what to prioritize. If you\'re ready for full transformation, consider the Ascension program.',
              },
              {
                q: 'What\'s the difference between individual services and Ascension?',
                a: 'Individual services can be purchased separately for specific needs. Ascension is the complete 90-day transformation that includes all three phases designed as an integrated system from day one.',
              },
              {
                q: 'Do I need to complete each phase in order?',
                a: 'We strongly recommend starting with the Diagnostic—it ensures you\'re building the right things. Command Center requires the Diagnostic. Authority Engine works best with infrastructure in place.',
              },
              {
                q: 'What results can I expect?',
                a: 'Clients typically see: 40-60% reduction in founder time on operations, 2-3x increase in capacity without headcount, systematic lead generation, and positioning as a category authority.',
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

      {/* Not Sure? */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-narrow text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Move Up the Ladder?
          </h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            Start with an AI Level Diagnostic to see exactly where you are.
            Or commit to the full Ascension journey and reach Level 5 in 90 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('services/diagnostic')}
              className="text-radiance-gold hover:text-radiance-amber transition-colors font-medium"
            >
              Learn about the Diagnostic →
            </button>
            <span className="text-text-muted hidden sm:inline">|</span>
            <button
              onClick={() => onNavigate('services/ascension')}
              className="text-radiance-gold hover:text-radiance-amber transition-colors font-medium"
            >
              Explore Ascension →
            </button>
            <span className="text-text-muted hidden sm:inline">|</span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              Have questions? Contact us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
