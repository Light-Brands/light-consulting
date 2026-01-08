/**
 * Home Page
 * Light Brand Consulting
 */

import React from 'react';
import {
  Button,
  Card,
  Tag,
  ServiceCard,
  NewsletterCapture,
  SparkleIcon,
  CheckIcon,
  MaturityLadder,
  LaborArbitrageHighlight,
} from '../components';
import { SERVICES, TESTIMONIALS, IMAGE_CONFIG, FIT_CRITERIA } from '../lib/constants';
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

interface HomePageProps {
  onNavigate: (page: PageKey) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const serviceIcons: Record<string, React.ReactNode> = {
    diagnostic: <DiagnosticIcon size={24} />,
    'command-center': <CommandCenterIcon size={24} />,
    'authority-engine': <AuthorityIcon size={24} />,
    ascension: <AscensionIcon size={24} />,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section
        className="min-h-[90vh] relative overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-20"
        style={{
          backgroundImage: `url(${IMAGE_CONFIG.heroes.home.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-depth-base/70" />

        {/* Bottom fade gradient - dissolves into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 14, 13, 0.5) 50%, rgba(15, 14, 13, 1) 100%)',
          }}
        />

        {/* Additional glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-gradient from-radiance-gold/8 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-radiance-gold/5 blur-[100px] rounded-full pointer-events-none animate-float" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <Tag variant="premium" className="mb-6">
              AI Architects
            </Tag>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary mb-8 animate-slide-up">
            Most businesses are stuck at{' '}
            <span className="text-text-muted">Levels 1–3</span> with AI.
            <span className="text-radiance-gold block mt-2">We move founders to Level 5.</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-6 max-w-2xl leading-relaxed animate-slide-up delay-200">
            Where AI becomes a structural advantage—not just another tool.
          </p>

          <p className="text-base text-text-muted mb-12 max-w-2xl leading-relaxed animate-slide-up delay-250">
            The AI economy will not reward tool usage. It will reward businesses with operating systems AI can amplify.
            We design how your business will run on AI—permanently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('book')}
            >
              Discover Your AI Level
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('services')}
            >
              Explore Services
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-text-muted/30 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* AI Maturity Ladder Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <Card elevation="elevated" className="p-8 md:p-12 overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <SparkleIcon className="text-radiance-gold" size={28} />
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                The AI Maturity Ladder
              </h2>
            </div>

            <p className="text-text-secondary mb-4 max-w-3xl">
              AI adoption is a maturity curve. Most companies adopt tools; few build infrastructure.
              The competitive advantage isn't using AI—it's building structure that AI can amplify.
            </p>

            {/* Interactive Maturity Ladder */}
            <MaturityLadder />

            <div className="border-t border-depth-border pt-8 mt-4">
              <p className="text-text-secondary text-center max-w-2xl mx-auto mb-6">
                <span className="text-radiance-gold font-semibold">Light Brand designs the systems</span> that move you up the curve—permanently.
              </p>
              <p className="text-text-muted text-center text-sm max-w-xl mx-auto">
                From: "We build AI systems." → To: "We design how your business will run on AI."
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Labor Arbitrage Highlight */}
      <section className="section-spacing">
        <div className="container-wide">
          <LaborArbitrageHighlight onLearnMore={() => onNavigate('insights/labor-arbitrage')} />
        </div>
      </section>

      {/* Services Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Tag variant="default" className="mb-4">
              The Light Brand Method
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Three Phases to Level 5
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Each phase builds on the last. Start with diagnosis, progress to infrastructure, ascend to authority.
              This is not consulting—it's the installation of operating infrastructure that compounds.
            </p>
          </div>

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

      {/* Category Claim Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Tag variant="premium" className="mb-4">
                Category Claim
              </Tag>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                We Are{' '}
                <span className="text-radiance-gold">AI Architects</span>
              </h2>
              <p className="text-text-secondary mb-4">
                Not "prompt engineers." Not "automation agencies." Not "AI builders."
              </p>
              <p className="text-text-secondary mb-8">
                We are the team that designs <span className="text-radiance-gold font-medium">how your business will function in an AI economy</span>.
                This removes us from agency comparison and supports enterprise-level outcomes.
              </p>

              <div className="space-y-4">
                {[
                  'We design operating infrastructure, not "AI installs"',
                  'We reduce founder-dependence through systems',
                  'We build compounding workflows across revenue, delivery, and ops',
                  'We create structural advantage, not tool collections',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={14} />
                    </div>
                    <span className="text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card elevation="elevated" className="p-8">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                The Core Insight
              </h3>
              <p className="text-text-secondary mb-6">
                Light Brand is delivering enterprise-grade value but often perceived as a small agency.
                The market interprets us as "AI implementation + brand studio"—that frame drives lower pricing ceilings, shallow engagements, and unnecessary friction.
              </p>
              <p className="text-text-secondary mb-6">
                <span className="text-radiance-gold font-semibold">The reality:</span> We're designing operating infrastructure that compounds.
                The AI Maturity Ladder fixes the mismatch by giving buyers a self-diagnostic map and turning vague "AI services" into measurable progression.
              </p>
              <div className="border-t border-depth-border pt-6">
                <p className="text-text-muted text-sm italic">
                  "Light Brand does not need additional services. It needs a strategic frame that matches the work it already does."
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Fit Criteria Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Is This For You?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card elevation="elevated" className="p-8">
              <h3 className="text-xl font-bold text-radiance-gold mb-6">Ideal Clients</h3>
              <ul className="space-y-4">
                {FIT_CRITERIA.idealClients.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={12} />
                    </div>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card elevation="subtle" className="p-8">
              <h3 className="text-xl font-bold text-text-muted mb-6">Not a Fit</h3>
              <ul className="space-y-4">
                {FIT_CRITERIA.notAFit.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-depth-border text-text-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Partnership Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-narrow">
          <div className="text-center">
            <Tag variant="premium" className="mb-6">
              Statement Project
            </Tag>
            
            {/* Featured Testimonial Card */}
            <Card elevation="elevated" className="p-8 md:p-12 relative overflow-hidden max-w-3xl mx-auto">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-radiance-gold/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-radiance-amber/10 blur-3xl pointer-events-none" />
              
              {/* Large Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-radiance-gold/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-radiance-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
              </div>
              
              {/* Quote */}
              <blockquote className="text-text-primary text-xl md:text-2xl font-medium leading-relaxed mb-8 relative z-10 text-center">
                "{TESTIMONIALS[0]?.quote}"
              </blockquote>
              
              {/* Author - Centered */}
              <div className="flex flex-col items-center gap-4 relative z-10">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-radiance-gold/30">
                  <img
                    src={TESTIMONIALS[0]?.avatar}
                    alt={TESTIMONIALS[0]?.author}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center text-depth-base font-bold text-2xl">${TESTIMONIALS[0]?.author?.charAt(0) || 'J'}</div>`;
                    }}
                  />
                </div>
                
                {/* Name and Company */}
                <div className="text-center">
                  <p className="text-text-primary font-semibold text-lg">{TESTIMONIALS[0]?.author}</p>
                  <p className="text-text-muted text-sm mb-3">
                    {TESTIMONIALS[0]?.role}
                  </p>
                  
                  {/* Company Link - Prominent */}
                  <a
                    href={TESTIMONIALS[0]?.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-radiance-gold/10 hover:bg-radiance-gold/20 border border-radiance-gold/30 rounded-full text-radiance-gold font-semibold transition-all duration-300 group"
                  >
                    <span>Visit {TESTIMONIALS[0]?.company}</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Divider */}
              <div className="border-t border-depth-border mt-8 pt-6">
                <p className="text-text-muted text-sm text-center">
                  See how we helped transform Growth Mastery AI into a leader in AI-powered business growth
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-spacing">
        <div className="container-narrow">
          <NewsletterCapture />
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready to Reach{' '}
            <span className="text-radiance-gold">Level 5</span>?
          </h2>
          <p className="text-text-secondary mb-4 max-w-xl mx-auto">
            Start with an AI Level Diagnostic. See exactly where you are on the maturity ladder
            and get a clear roadmap to structural advantage.
          </p>
          <p className="text-text-muted text-sm mb-8 max-w-lg mx-auto">
            This is not consulting. This is the installation of operating infrastructure that compounds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('book')}
            >
              Discover Your AI Level
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => onNavigate('services/ascension')}
            >
              Learn About Ascension
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
