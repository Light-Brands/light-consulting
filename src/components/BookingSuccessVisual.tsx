/**
 * Booking Success Visual
 * CONCEPT: "The Confirmation"
 * Success state after booking submission
 */

import React, { useEffect, useRef, useState } from 'react';
import { Button } from './';

interface BookingSuccessVisualProps {
  serviceName: string;
  onHomeClick: () => void;
  onServicesClick: () => void;
}

export const BookingSuccessVisual: React.FC<BookingSuccessVisualProps> = ({
  serviceName,
  onHomeClick,
  onServicesClick,
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
      <div className="relative z-10 bg-depth-elevated/30 border border-radiance-gold/20 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="p-8 md:p-12 text-center">

          {/* Success Indicator */}
          <div className="w-16 h-16 rounded-full bg-success/20 border-2 border-success/30 mx-auto mb-6 flex items-center justify-center relative">
            <div className="w-8 h-8 rounded-full bg-success animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Booking Request Received!
          </h1>

          {/* Description */}
          <p className="text-text-secondary mb-8">
            Thank you for your interest in {serviceName}.
            We'll be in touch within 24 hours to confirm your session.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" onClick={onHomeClick}>
              Back to Home
            </Button>
            <Button variant="ghost" onClick={onServicesClick}>
              Explore More Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessVisual;
