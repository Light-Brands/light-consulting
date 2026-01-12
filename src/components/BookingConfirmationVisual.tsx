/**
 * Booking Confirmation Visual
 * CONCEPT: "The Review"
 * Booking confirmation summary with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';

interface BookingConfirmationVisualProps {
  serviceName: string;
  investment: string;
  name: string;
  email: string;
  company?: string;
}

export const BookingConfirmationVisual: React.FC<BookingConfirmationVisualProps> = ({
  serviceName,
  investment,
  name,
  email,
  company,
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
          Confirm Your Booking
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          Review your information before submitting.
        </p>
      </div>

      {/* Summary Card */}
      <div className="relative mb-6">
        {/* Card */}
        <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-radiance-gold/20">
          <h3 className="text-lg font-semibold text-text-primary mb-6">
            Booking Summary
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-start py-3 border-b border-depth-border/50">
              <span className="text-text-muted text-sm font-medium">Service</span>
              <span className="text-text-primary font-medium text-right ml-4">{serviceName}</span>
            </div>
            <div className="flex justify-between items-start py-3 border-b border-depth-border/50">
              <span className="text-text-muted text-sm font-medium">Investment</span>
              <span className="text-radiance-gold font-semibold text-right ml-4">{investment}</span>
            </div>
            <div className="flex justify-between items-start py-3 border-b border-depth-border/50">
              <span className="text-text-muted text-sm font-medium">Name</span>
              <span className="text-text-primary text-right ml-4">{name}</span>
            </div>
            <div className="flex justify-between items-start py-3 border-b border-depth-border/50">
              <span className="text-text-muted text-sm font-medium">Email</span>
              <span className="text-text-primary text-right break-all ml-4">{email}</span>
            </div>
            {company && (
              <div className="flex justify-between items-start py-3">
                <span className="text-text-muted text-sm font-medium">Company</span>
                <span className="text-text-primary text-right ml-4">{company}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="relative mt-6">
        {/* Card */}
        <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-xl p-5 backdrop-blur-sm transition-all duration-300 hover:border-radiance-gold/20">
          <p className="text-text-secondary text-sm leading-relaxed">
            After submitting, we'll reach out within 24 hours to schedule your session
            at a time that works for you. You'll also receive a confirmation email
            with preparation materials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationVisual;
