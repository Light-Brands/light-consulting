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
  TestimonialCarousel,
  NewsletterCapture,
  LightbulbIcon,
  BlueprintIcon,
  BookIcon,
  SparkleIcon,
} from '../components';
import { SERVICES, TESTIMONIALS } from '../lib/constants';
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
      {/* Hero Section */}
      <section className="min-h-[90vh] relative overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-20">
        {/* Illumination glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-gradient from-radiance-gold/8 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-radiance-gold/5 blur-[100px] rounded-full pointer-events-none animate-float" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <Tag variant="premium" className="mb-6">
              AI Consulting
            </Tag>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary mb-8 animate-slide-up">
            Let us help you see your
            <span className="text-radiance-gold block md:inline"> fullest capacity</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl leading-relaxed animate-slide-up delay-200">
            Transform your business into an AI super intelligence.
            Light consulting creates capacity, not dependency.
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

            {/* Visual diagram */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-depth-surface border border-depth-border flex items-center justify-center mb-3">
                  <span className="text-text-muted text-2xl">?</span>
                </div>
                <p className="text-text-muted text-sm">Where You Are</p>
              </div>

              <div className="hidden md:block flex-1 h-1 gradient-capacity-bridge rounded-full max-w-[200px]" />
              <div className="md:hidden w-1 h-12 gradient-capacity-bridge rounded-full" />

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-radiance-gold to-radiance-amber flex items-center justify-center mb-3 shadow-illumination animate-illuminate">
                  <SparkleIcon className="text-depth-base" size={28} />
                </div>
                <p className="text-radiance-gold text-sm font-medium">The Bridge</p>
              </div>

              <div className="hidden md:block flex-1 h-1 gradient-capacity-bridge rounded-full max-w-[200px]" />
              <div className="md:hidden w-1 h-12 gradient-capacity-bridge rounded-full" />

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-clarity-cream/10 border border-clarity-cream/30 flex items-center justify-center mb-3 glow-clarity">
                  <span className="text-clarity-cream text-2xl">★</span>
                </div>
                <p className="text-clarity-cream text-sm">Fullest Capacity</p>
              </div>
            </div>

            <p className="text-text-secondary text-center max-w-2xl mx-auto">
              2024-2026 is the strategic moment. Like 1995 for the web, like 2008 for mobile.
              The question isn't if—it's how fast.
            </p>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-spacing">
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
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Start with a 90-minute Illumination Session. In one conversation,
            you'll see possibilities you've been blind to.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('book')}
          >
            Book Your Session
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
