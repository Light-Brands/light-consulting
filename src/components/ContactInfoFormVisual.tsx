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
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Your Information
        </h1>
        <p className="text-text-secondary text-base leading-relaxed max-w-2xl">
          We'll use this to personalize your session and send you preparation materials.
        </p>
      </div>

      {/* Form */}
      <div className="relative group">
        {/* Styled container */}
        <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-8 md:p-10 backdrop-blur-sm transition-all duration-300 group-hover:border-radiance-gold/20">
          <div className="space-y-6">
            {/* Required Fields Section */}
            <div className="space-y-6 pb-6 border-b border-depth-border/50">
              <div>
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name || ''}
                  onChange={(e) => onFieldChange('name', e.target.value)}
                  error={errors.name}
                  required
                  hint="How you'd like us to address you"
                />
              </div>

              <div>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData.email || ''}
                  onChange={(e) => onFieldChange('email', e.target.value)}
                  error={errors.email}
                  required
                  hint="We'll send confirmation and preparation materials here"
                />
              </div>
            </div>

            {/* Optional Fields Section */}
            <div className="space-y-6 pt-2">
              <div>
                <Input
                  label="Company Name"
                  placeholder="Your company or organization"
                  value={formData.company || ''}
                  onChange={(e) => onFieldChange('company', e.target.value)}
                  hint="Helps us understand your context"
                />
              </div>

              <div>
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone || ''}
                  onChange={(e) => onFieldChange('phone', e.target.value)}
                  hint="Optional - for urgent scheduling updates"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoFormVisual;
