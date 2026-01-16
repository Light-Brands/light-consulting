/**
 * Service Selection Visual
 * CONCEPT: "The Choice"
 * Service selection cards with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

interface Service {
  key: string;
  name: string;
  tagline: string;
  investment: string;
  duration: string;
}

interface ServiceSelectionVisualProps {
  services: Service[];
  selectedService?: string;
  onSelect: (key: string) => void;
  error?: string;
}

export const ServiceSelectionVisual: React.FC<ServiceSelectionVisualProps> = ({
  services,
  selectedService,
  onSelect,
  error,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
          Choose Your Service
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          Select the service that best fits your needs.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-5">
        {services.map((service, index) => {
          const isSelected = selectedService === service.key;

          return (
            <div
              key={service.key}
              className="relative group"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Hover glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-b from-radiance-gold/5 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card */}
              <div
                className={cn(
                  'relative z-10 bg-depth-elevated/20 border rounded-2xl p-6 cursor-pointer backdrop-blur-sm transition-all duration-300',
                  'focus-within:outline-none focus-within:ring-2 focus-within:ring-radiance-gold/30 focus-within:ring-offset-2 focus-within:ring-offset-depth-base',
                  isSelected
                    ? 'border-radiance-gold/50 ring-1 ring-radiance-gold/20 bg-depth-elevated/30 shadow-[0_0_20px_rgba(232,184,74,0.1)]'
                    : 'border-depth-border group-hover:border-radiance-gold/30 group-hover:bg-depth-elevated/30'
                )}
                onClick={() => onSelect(service.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(service.key);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-1.5 group-hover:text-radiance-gold transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-2.5">
                      {service.tagline}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-text-muted">
                      <span>{service.investment}</span>
                      <span className="w-1 h-1 rounded-full bg-text-muted/40" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300',
                      isSelected
                        ? 'bg-radiance-gold border-radiance-gold scale-110 shadow-[0_0_12px_rgba(232,184,74,0.4)]'
                        : 'border-depth-border group-hover:border-radiance-gold/50 group-hover:scale-105'
                    )}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-depth-base transition-all duration-200" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mt-6 p-4 bg-error/10 border border-error/30 rounded-xl transition-all duration-200">
          <p className="text-error text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ServiceSelectionVisual;
