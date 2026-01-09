/**
 * Funnel 2 Page
 * Light Brand Consulting
 */

import React from 'react';
import { Button, Card, Tag } from '../components';
import { Container } from '../components/ui';
import { PageKey } from '../types';

interface Funnel2PageProps {
  onNavigate: (page: PageKey) => void;
}

export const Funnel2Page: React.FC<Funnel2PageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-depth-base via-depth-elevated to-depth-base"></div>
        </div>

        {/* Hero Content */}
        <Container size="wide" className="relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Tag variant="default" className="mx-auto">
              Funnel 2
            </Tag>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
              Funnel 2 Page
              <span className="block text-radiance-gold mt-2">
                Placeholder Content
              </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                This is a placeholder for the Funnel 2 page.
              </p>
              <p className="text-xl md:text-2xl text-text-primary font-medium">
                Customize this content as needed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => onNavigate('funnel')}
              >
                View Original Funnel
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="section-spacing bg-gradient-to-b from-depth-base to-depth-elevated">
        <Container size="narrow">
          <div className="text-center mb-16">
            <Tag variant="default" className="mx-auto mb-6">
              Content Section
            </Tag>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Add your content here
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card elevation="elevated" className="p-8">
              <p className="text-text-secondary text-lg text-center">
                This page is set up and ready for customization.
                Edit the Funnel2Page component to add your specific content.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-depth-elevated">
        <Container size="narrow">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Ready to take the next step?
            </h2>

            <div className="pt-6">
              <Button
                variant="primary"
                size="xl"
                onClick={() => onNavigate('book')}
                className="shadow-illumination"
              >
                Book a Call
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing Line */}
      <section className="py-12 bg-depth-base border-t border-depth-border">
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
