/**
 * Services Page
 * Light Brand Consulting
 */

import React from 'react';
import {
  Tag,
  ServiceCard,
  LightbulbIcon,
  BlueprintIcon,
  BookIcon,
} from '../components';
import { SERVICES } from '../lib/constants';
import { PageKey } from '../types';

interface ServicesPageProps {
  onNavigate: (page: PageKey) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const serviceIcons: Record<string, React.ReactNode> = {
    illumination: <LightbulbIcon size={24} />,
    blueprint: <BlueprintIcon size={24} />,
    story: <BookIcon size={24} />,
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-16">
            <Tag variant="premium" className="mb-4">
              Services
            </Tag>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Illuminate Your Path Forward
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Three distinct offerings, each designed to meet you where you are
              and take you where you need to go.
            </p>
          </div>

          {/* Services Grid */}
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

      {/* How We Work */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              How We Work
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Every engagement follows the Light Touch principle: reveal, don't impose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-radiance-gold/10 text-radiance-gold flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Discover
              </h3>
              <p className="text-text-secondary text-sm">
                We start by understanding your unique context, challenges, and aspirations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-radiance-amber/10 text-radiance-amber flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Illuminate
              </h3>
              <p className="text-text-secondary text-sm">
                We reveal the AI opportunities that already exist within your business.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-clarity-cream/10 text-clarity-cream flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Activate
              </h3>
              <p className="text-text-secondary text-sm">
                You leave with clear, actionable next steps—not dependency on us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Not Sure? */}
      <section className="section-spacing">
        <div className="container-narrow text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-text-secondary mb-6">
            Most clients begin with an Illumination Session. In 90 minutes,
            you'll know exactly what AI can do for your business.
          </p>
          <button
            onClick={() => onNavigate('services/illumination')}
            className="text-radiance-gold hover:text-radiance-amber transition-colors font-medium"
          >
            Learn about Illumination Sessions →
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
