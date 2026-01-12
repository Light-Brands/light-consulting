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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Confirm Your Booking
        </h1>
        <p className="text-text-secondary">
          Review your information before submitting.
        </p>
      </div>

      {/* Summary Card */}
      <div className="relative mb-6">
        {/* Hover glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-b from-radiance-gold/10 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card */}
        <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-6 backdrop-blur-sm">
          {/* Technical header */}
          <div className="flex items-center gap-2 border-b border-depth-border pb-4 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Summary::Booking_Details
            </span>
          </div>

          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Booking Summary
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-depth-border">
              <span className="text-text-muted text-sm">Service</span>
              <span className="text-text-primary font-medium text-right">{serviceName}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-depth-border">
              <span className="text-text-muted text-sm">Investment</span>
              <span className="text-radiance-gold font-semibold">{investment}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-depth-border">
              <span className="text-text-muted text-sm">Name</span>
              <span className="text-text-primary text-right">{name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-depth-border">
              <span className="text-text-muted text-sm">Email</span>
              <span className="text-text-primary text-right break-all">{email}</span>
            </div>
            {company && (
              <div className="flex justify-between items-center py-3">
                <span className="text-text-muted text-sm">Company</span>
                <span className="text-text-primary text-right">{company}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="relative">
        {/* Hover glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-b from-radiance-gold/5 to-transparent blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card */}
        <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-xl p-4 backdrop-blur-sm">
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-radiance-gold/10 border border-radiance-gold/30 mb-3">
            <span className="text-[10px] font-semibold text-radiance-gold uppercase tracking-wider">
              What's Next
            </span>
          </div>
          <p className="text-text-secondary text-sm">
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
