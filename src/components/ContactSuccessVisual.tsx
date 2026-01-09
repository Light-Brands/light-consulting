/**
 * Contact Success Visual
 * CONCEPT: "The Confirmation"
 * Success state after form submission
 */

import React, { useEffect, useRef, useState } from 'react';
import { CheckIcon } from './Icons';
import { Button } from './';

interface ContactSuccessVisualProps {
  onHomeClick: () => void;
  onInsightsClick: () => void;
}

export const ContactSuccessVisual: React.FC<ContactSuccessVisualProps> = ({
  onHomeClick,
  onInsightsClick,
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
      <div className="absolute -inset-4 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-2xl rounded-[3rem] opacity-100" />

      {/* Styled container */}
      <div className="relative z-10 bg-depth-elevated/30 border border-radiance-gold/20 rounded-[3rem] overflow-hidden backdrop-blur-md">
        <div className="p-8 md:p-12 text-center">
          {/* Technical header */}
          <div className="flex items-center justify-center border-b border-depth-border pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
                Success::Message_Sent
              </span>
            </div>
          </div>

          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-success/20 text-success mx-auto mb-6 flex items-center justify-center">
            <CheckIcon size={32} />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Message Sent!
          </h1>

          {/* Description */}
          <p className="text-text-secondary mb-4">
            Thank you for reaching out. We read every message personally.
          </p>
          <p className="text-text-muted text-sm mb-8">
            Expect a response within 24 hours during business days. If your inquiry is about booking,
            we'll include next steps and availability.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" onClick={onHomeClick}>
              Back to Home
            </Button>
            <Button variant="ghost" onClick={onInsightsClick}>
              Read Our Insights
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSuccessVisual;
