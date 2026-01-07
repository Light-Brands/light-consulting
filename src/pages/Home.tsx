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
  LightbulbIcon,
  BlueprintIcon,
  BookIcon,
  SparkleIcon,
  CheckIcon,
  CapacityGapVisual,
  LaborArbitrageHighlight,
} from '../components';
import { SERVICES, TESTIMONIALS, IMAGE_CONFIG } from '../lib/constants';
import { PageKey } from '../types';

interface HomePageProps {
  onNavigate: (page: PageKey) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const serviceIcons: Record<string, React.ReactNode> = {
    illumination: <LightbulbIcon size={24} />,
    blueprint: <BlueprintIcon size={24} />,
    story: <BookIcon size={24} />,
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
        
        {/* Additional glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-gradient from-radiance-gold/8 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-radiance-gold/5 blur-[100px] rounded-full pointer-events-none animate-float" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <Tag variant="premium" className="mb-6">
              AI Strategy Consulting
            </Tag>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary mb-8 animate-slide-up">
            Let us help you see your
            <span className="text-radiance-gold block md:inline"> fullest capacity</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-6 max-w-2xl leading-relaxed animate-slide-up delay-200">
            Transform your business into an AI super intelligence.
            Light consulting creates capacity, not dependency.
          </p>

          <p className="text-base text-text-muted mb-12 max-w-2xl leading-relaxed animate-slide-up delay-250">
            We don't do AI for you—we illuminate the path so you can move with clarity and confidence.
            In one conversation, see possibilities you've been blind to.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('book')}
            >
              Book Illumination Session
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

      {/* Capacity Gap Section - Interactive */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <Card elevation="elevated" className="p-8 md:p-12 overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <SparkleIcon className="text-radiance-gold" size={28} />
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                The Capacity Gap
              </h2>
            </div>

            <p className="text-text-secondary mb-4 max-w-3xl">
              Every business has untapped potential—opportunities hidden in plain sight. The gap between where you are and where AI can take you isn't about technology. It's about seeing clearly.
            </p>

            {/* Interactive Visualization */}
            <CapacityGapVisual />

            <div className="border-t border-depth-border pt-8 mt-4">
              <p className="text-text-secondary text-center max-w-2xl mx-auto mb-6">
                <span className="text-radiance-gold font-semibold">2024-2026 is the strategic moment.</span> Like 1995 for the web, like 2008 for mobile.
                The businesses that move now—with clarity, not chaos—will define the next decade.
              </p>
              <p className="text-text-muted text-center text-sm max-w-xl mx-auto">
                The question isn't if AI will transform your industry—it's whether you'll lead that transformation or react to it.
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
              Services
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Choose Your Path to Illumination
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Each service is designed to meet you where you are and take you where you need to go.
              No lock-in, no dependency—just clarity and actionable next steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(SERVICES).map(([key, service]) => (
              <ServiceCard
                key={key}
                service={service}
                featured={key === 'blueprint'}
                icon={serviceIcons[key]}
                onLearnMore={() => onNavigate(`services/${key}` as PageKey)}
                onBook={() => onNavigate('book')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Differently Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Tag variant="premium" className="mb-4">
                Our Approach
              </Tag>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                We Illuminate,{' '}
                <span className="text-radiance-gold">You Execute</span>
              </h2>
              <p className="text-text-secondary mb-8">
                Most AI consultants want to become your permanent dependency. We want to become unnecessary.
                Our job is to give you the clarity and confidence to move forward—on your own terms.
              </p>

              <div className="space-y-4">
                {[
                  'We speak business, not jargon',
                  'We reveal opportunities, not impose solutions',
                  'We build your capacity, not our recurring revenue',
                  'We move fast—the window is now',
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
                The Light Touch Principle
              </h3>
              <p className="text-text-secondary mb-6">
                Your business already contains its own genius. AI doesn't add something foreign—it amplifies what's already there. Our role is illumination: helping you see clearly what you couldn't see before.
              </p>
              <div className="border-t border-depth-border pt-6">
                <p className="text-text-muted text-sm italic">
                  "One clear decision, properly executed, outperforms a dozen confused ones."
                </p>
              </div>
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
            Ready to See Your{' '}
            <span className="text-radiance-gold">Fullest Capacity</span>?
          </h2>
          <p className="text-text-secondary mb-4 max-w-xl mx-auto">
            Start with a 90-minute Illumination Session. In one conversation,
            you'll see possibilities you've been blind to—and leave with a clear path forward.
          </p>
          <p className="text-text-muted text-sm mb-8 max-w-lg mx-auto">
            No pitch, no pressure, no jargon. Just clarity about what AI can actually do for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('book')}
            >
              Book Your Session — $500
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => onNavigate('services/illumination')}
            >
              Learn More First
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
