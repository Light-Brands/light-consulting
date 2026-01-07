/**
 * Service Detail Page
 * Light Brand Consulting
 */

import React from 'react';
import {
  Button,
  Card,
  Tag,
  Accordion,
  CheckIcon,
  XIcon,
  ClockIcon,
  DollarIcon,
  ArrowRightIcon,
} from '../components';
import { SERVICES } from '../lib/constants';
import { PageKey } from '../types';

interface ServiceDetailPageProps {
  serviceKey: string;
  onNavigate: (page: PageKey) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceKey,
  onNavigate,
}) => {
  const service = SERVICES[serviceKey];

  if (!service) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl text-text-primary">Service not found</h1>
        <Button
          variant="ghost"
          onClick={() => onNavigate('services')}
          className="mt-4"
        >
          Back to Services
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      {/* Hero */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="max-w-3xl">
            <button
              onClick={() => onNavigate('services')}
              className="text-text-muted hover:text-text-secondary text-sm mb-6 flex items-center gap-2 transition-colors"
            >
              ← Back to Services
            </button>

            <Tag variant="premium" className="mb-4">
              {service.duration}
            </Tag>

            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {service.name}
            </h1>

            <p className="text-xl text-radiance-gold font-medium mb-6">
              {service.tagline}
            </p>

            <p className="text-text-secondary text-lg mb-8">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <DollarIcon className="text-radiance-gold" size={20} />
                <span className="text-text-primary font-semibold">
                  {service.investment}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="text-radiance-gold" size={20} />
                <span className="text-text-primary">{service.duration}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('book')}
            >
              Book {service.name}
            </Button>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-text-primary mb-8">
            What You Get
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((deliverable, index) => (
              <Card key={index} elevation="subtle" className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-radiance-gold/20 text-radiance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon size={14} />
                  </div>
                  <span className="text-text-primary">{deliverable}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="section-spacing">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-text-primary mb-8">
            The Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {service.process.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {index < service.process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-depth-border -translate-x-1/2" />
                )}

                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-radiance-gold to-radiance-amber text-depth-base font-bold text-xl flex items-center justify-center mb-4 shadow-illumination">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Is This For You? */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-text-primary mb-8">
            Is This For You?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ideal For */}
            <Card elevation="subtle">
              <h3 className="text-lg font-semibold text-success mb-4 flex items-center gap-2">
                <CheckIcon size={20} />
                Ideal For
              </h3>
              <ul className="space-y-3">
                {service.idealFor.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-text-secondary"
                  >
                    <CheckIcon
                      size={16}
                      className="text-success mt-0.5 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Not For */}
            <Card elevation="subtle">
              <h3 className="text-lg font-semibold text-text-muted mb-4 flex items-center gap-2">
                <XIcon size={20} />
                Not For
              </h3>
              <ul className="space-y-3">
                {service.notFor.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-text-muted"
                  >
                    <XIcon size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <Accordion
            items={service.faq.map((item) => ({
              title: item.question,
              content: item.answer,
            }))}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-depth-elevated">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-text-secondary mb-8">
            Book your {service.name} today and take the first step toward your
            fullest capacity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('book')}
            >
              Book Now — {service.investment}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => onNavigate('contact')}
              icon={<ArrowRightIcon size={18} />}
            >
              Questions? Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
