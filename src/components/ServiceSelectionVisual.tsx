/**
 * Service Selection Visual
 * CONCEPT: "The Choice"
 * Service selection cards with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';
import { CheckIcon } from './Icons';
import { cn } from '../lib/utils';

interface Service {
  key: string;
  name: string;
  tagline: string;
  investment: string;
  duration: string;
  icon: React.ReactNode;
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Choose Your Service
        </h1>
        <p className="text-text-secondary">
          Select the service that best fits your needs.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-4">
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
                  isSelected
                    ? 'border-radiance-gold/50 ring-1 ring-radiance-gold/20 bg-depth-elevated/30'
                    : 'border-depth-border group-hover:border-radiance-gold/30 group-hover:bg-depth-elevated/30'
                )}
                onClick={() => onSelect(service.key)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300',
                      isSelected
                        ? 'bg-gradient-to-br from-radiance-gold to-radiance-amber text-depth-base'
                        : 'bg-depth-surface text-text-muted group-hover:text-radiance-gold'
                    )}
                  >
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-radiance-gold transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-2">
                      {service.tagline}
                    </p>
                    <div className="flex gap-4 text-sm text-text-muted">
                      <span>{service.investment}</span>
                      <span>•</span>
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300',
                      isSelected
                        ? 'bg-radiance-gold border-radiance-gold'
                        : 'border-depth-border group-hover:border-radiance-gold/50'
                    )}
                  >
                    {isSelected && <CheckIcon size={14} className="text-depth-base" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-error text-sm mt-4">{error}</p>
      )}
    </div>
  );
};

export default ServiceSelectionVisual;
