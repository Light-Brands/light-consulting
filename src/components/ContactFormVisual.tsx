/**
 * Contact Form Visual
 * CONCEPT: "The Connection"
 * Contact form with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';
import { Input, Textarea, Button } from './';
import { ContactFormData } from '../types';

interface ContactFormVisualProps {
  formData: ContactFormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  onFieldChange: (field: keyof ContactFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ContactFormVisual: React.FC<ContactFormVisualProps> = ({
  formData,
  errors,
  isSubmitting,
  onFieldChange,
  onSubmit,
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
      className={`relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Hover glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* Styled container */}
      <div className="relative z-10 bg-depth-elevated/30 border border-depth-border rounded-[3rem] overflow-hidden backdrop-blur-md">
        <div className="p-8 md:p-12">
          {/* Technical header */}
          <div className="flex items-center gap-2 border-b border-depth-border pb-4 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Form::Send_Message
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-text-primary mb-2">
            Send a Message
          </h2>
          <p className="text-text-muted text-sm mb-8">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            <Input
              label="Your Name"
              placeholder="John Smith"
              value={formData.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              error={errors.email}
              required
            />

            <Input
              label="Company (Optional)"
              placeholder="Acme Inc"
              value={formData.company || ''}
              onChange={(e) => onFieldChange('company', e.target.value)}
            />

            <Textarea
              label="Your Message"
              placeholder="Tell us about your business, what you're hoping AI might help with, and any questions you have..."
              value={formData.message}
              onChange={(e) => onFieldChange('message', e.target.value)}
              error={errors.message}
              rows={6}
              required
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
            >
              Send Message
            </Button>

            <p className="text-text-muted text-xs text-center">
              We read every message personally. Your information stays private.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactFormVisual;
