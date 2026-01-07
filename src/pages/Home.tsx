/**
 * Home Page
 * Light Brand Consulting
 */

import React, { useState } from 'react';
import {
  Button,
  Card,
  Tag,
  ServiceCard,
  TestimonialCarousel,
  NewsletterCapture,
  LightbulbIcon,
  BlueprintIcon,
  BookIcon,
  SparkleIcon,
  CheckIcon,
  ImagePlaceholder,
} from '../components';
import { SERVICES, TESTIMONIALS, SUCCESS_METRICS, IMAGE_CONFIG } from '../lib/constants';
import { PageKey } from '../types';

interface HomePageProps {
  onNavigate: (page: PageKey) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [showHeroPrompt, setShowHeroPrompt] = useState(false);

  const serviceIcons: Record<string, React.ReactNode> = {
    illumination: <LightbulbIcon size={24} />,
    blueprint: <BlueprintIcon size={24} />,
    story: <BookIcon size={24} />,
  };

  const heroImage = IMAGE_CONFIG.heroes.home;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[90vh] relative overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-20">
        {/* Hero Background Image Prompt Indicator */}
        <button
          onClick={() => setShowHeroPrompt(!showHeroPrompt)}
          className="absolute top-24 right-6 z-20 w-10 h-10 rounded-full bg-depth-base/80 border border-depth-border flex items-center justify-center hover:bg-depth-elevated transition-colors group"
          title="View hero background image prompt"
        >
          <svg
            className="w-5 h-5 text-radiance-gold group-hover:scale-110 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        {/* Hero Image Prompt Panel */}
        {showHeroPrompt && (
          <div className="absolute top-36 right-6 z-20 w-96 max-h-[70vh] overflow-auto p-5 bg-depth-base/95 border border-depth-border rounded-brand-card shadow-xl animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-radiance-gold/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-radiance-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-radiance-gold font-semibold">Hero Background</span>
              </div>
              <button onClick={() => setShowHeroPrompt(false)} className="text-text-muted hover:text-text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-text-muted text-sm mb-3">{heroImage.alt}</p>
            <div className="p-3 bg-depth-elevated rounded-lg mb-4">
              <p className="text-text-secondary text-sm leading-relaxed">{heroImage.prompt}</p>
            </div>
            <div className="flex items-center justify-between text-xs text-text-muted border-t border-depth-border pt-3">
              <span><span className="text-radiance-gold">Dimensions:</span> {heroImage.dimensions}</span>
              <span><span className="text-radiance-gold">File:</span> hero-home-bg.jpg</span>
            </div>
          </div>
        )}

        {/* Illumination glow effect */}
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

      {/* Capacity Gap Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <Card elevation="elevated" className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <SparkleIcon className="text-radiance-gold" size={28} />
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                The Capacity Gap
              </h2>
            </div>

            <p className="text-text-secondary mb-8 max-w-3xl">
              Every business has untapped potential—opportunities hidden in plain sight. The gap between where you are and where AI can take you isn't about technology. It's about seeing clearly.
            </p>

            {/* Visual diagram with Image Placeholder */}
            <div className="mb-8">
              <ImagePlaceholder
                src={IMAGE_CONFIG.capacityGap.src}
                alt={IMAGE_CONFIG.capacityGap.alt}
                prompt={IMAGE_CONFIG.capacityGap.prompt}
                dimensions={IMAGE_CONFIG.capacityGap.dimensions}
                aspectRatio="wide"
                className="mb-4"
              />

              {/* Fallback visual diagram (shown alongside placeholder) */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-depth-surface border border-depth-border flex items-center justify-center mb-2">
                    <span className="text-text-muted text-2xl">?</span>
                  </div>
                  <p className="text-text-muted text-xs font-medium">Where You Are</p>
                </div>

                <div className="hidden md:block flex-1 h-0.5 gradient-capacity-bridge rounded-full max-w-[120px]" />
                <div className="md:hidden w-0.5 h-8 gradient-capacity-bridge rounded-full" />

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center mb-2 shadow-illumination animate-illuminate">
                    <SparkleIcon className="text-depth-base" size={24} />
                  </div>
                  <p className="text-radiance-gold text-xs font-medium">The Bridge</p>
                </div>

                <div className="hidden md:block flex-1 h-0.5 gradient-capacity-bridge rounded-full max-w-[120px]" />
                <div className="md:hidden w-0.5 h-8 gradient-capacity-bridge rounded-full" />

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-clarity-cream/10 border border-clarity-cream/30 flex items-center justify-center mb-2 glow-clarity">
                    <span className="text-clarity-cream text-2xl">★</span>
                  </div>
                  <p className="text-clarity-cream text-xs font-medium">Fullest Capacity</p>
                </div>
              </div>
            </div>

            <div className="border-t border-depth-border pt-8">
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

      {/* Success Metrics Section */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Tag variant="default" className="mb-4">
              Results
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Clarity Creates Results
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Our clients don't just leave with insights—they leave with momentum.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SUCCESS_METRICS.map((item, index) => (
              <Card key={index} elevation="subtle" className="text-center p-6">
                <p className="text-3xl md:text-4xl font-black text-radiance-gold mb-2">
                  {item.metric}
                </p>
                <p className="text-text-primary font-semibold text-sm mb-1">
                  {item.label}
                </p>
                <p className="text-text-muted text-xs">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
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

      {/* Testimonials Section */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-12">
            <Tag variant="default" className="mb-4">
              Testimonials
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              What Our Clients Say
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Don't take our word for it—hear from business leaders who've experienced the transformation.
            </p>
          </div>

          <TestimonialCarousel testimonials={TESTIMONIALS} />
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
