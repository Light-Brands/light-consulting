/**
 * Contact Info Form Visual
 * CONCEPT: "The Details"
 * Contact information form with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';
import { Input } from './';

interface ContactInfoFormVisualProps {
  formData: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
  };
  errors: Record<string, string>;
  onFieldChange: (field: string, value: string) => void;
}

export const ContactInfoFormVisual: React.FC<ContactInfoFormVisualProps> = ({
  formData,
  errors,
  onFieldChange,
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
          Your Information
        </h1>
        <p className="text-text-secondary">
          Tell us a bit about yourself so we can prepare for our conversation.
        </p>
      </div>

      {/* Form */}
      <div className="relative group">
        {/* Hover glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-b from-radiance-gold/5 to-transparent blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        {/* Styled container */}
        <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          {/* Technical header */}
          <div className="flex items-center gap-2 border-b border-depth-border pb-4 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Form::Contact_Information
            </span>
          </div>

          <div className="space-y-6">
            <Input
              label="Full Name"
              placeholder="John Smith"
              value={formData.name || ''}
              onChange={(e) => onFieldChange('name', e.target.value)}
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="john@company.com"
              value={formData.email || ''}
              onChange={(e) => onFieldChange('email', e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label="Company Name"
              placeholder="Acme Inc"
              value={formData.company || ''}
              onChange={(e) => onFieldChange('company', e.target.value)}
            />

            <Input
              label="Phone (Optional)"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone || ''}
              onChange={(e) => onFieldChange('phone', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoFormVisual;
