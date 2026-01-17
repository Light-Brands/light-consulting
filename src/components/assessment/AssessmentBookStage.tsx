/**
 * Assessment Book Stage
 * Calendar booking without pricing disclosure
 */

'use client';

import React, { useState } from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';

interface AssessmentBookStageProps {
  formData: AssessmentFormData;
  onBookingComplete: (bookingId: string, bookedSlot: Date) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const AssessmentBookStage: React.FC<AssessmentBookStageProps> = ({
  formData,
  onBookingComplete,
  onContinue,
  onBack,
}) => {
  const [isCalendarLoaded, setIsCalendarLoaded] = useState(false);

  // Handle Calendly event
  const handleCalendlyEvent = (e: MessageEvent) => {
    if (e.data.event && e.data.event === 'calendly.event_scheduled') {
      const payload = e.data.payload;
      onBookingComplete(
        payload.event?.uri || 'mock-booking-id',
        new Date(payload.event?.start_time || Date.now())
      );
      onContinue();
    }
  };

  // Listen for Calendly messages
  React.useEffect(() => {
    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          Schedule Your Assessment Call
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto">
          Select a time for your AI Go/No-Go Assessment verdict call. This is where you&apos;ll receive your decision.
        </p>
      </div>

      {/* Calendar Embed Container */}
      <div className="bg-depth-surface border border-depth-border rounded-xl overflow-hidden">
        {/* Placeholder Calendar UI - Replace with actual Calendly embed */}
        <div className="aspect-[4/3] relative">
          {!isCalendarLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-depth-base">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-2 border-radiance-gold/30 border-t-radiance-gold rounded-full animate-spin mx-auto" />
                <p className="text-text-muted">Loading calendar...</p>
              </div>
            </div>
          )}

          {/* Calendly Embed - Replace URL with actual Calendly link */}
          <iframe
            src="https://calendly.com/light-brand/assessment?hide_landing_page_details=1&hide_gdpr_banner=1"
            width="100%"
            height="100%"
            frameBorder="0"
            className="absolute inset-0"
            onLoad={() => setIsCalendarLoaded(true)}
            title="Schedule Assessment Call"
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-radiance-gold text-xl">&#9432;</span>
          <div className="space-y-1">
            <p className="text-text-secondary text-sm">
              <strong className="text-text-primary">What happens next:</strong>
            </p>
            <ul className="text-text-muted text-sm space-y-1">
              <li>1. Watch a mandatory video explaining the assessment process</li>
              <li>2. Confirm your booking after watching</li>
              <li>3. Complete payment to secure your spot</li>
              <li>4. Fill out your intake questionnaire</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Skip for Development - Remove in production */}
      <div className="flex items-center justify-between pt-4 border-t border-depth-border">
        <Button
          variant="ghost"
          onClick={onBack}
        >
          &#8592; Back
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            // Mock booking for development
            onBookingComplete('dev-booking-' + Date.now(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
            onContinue();
          }}
        >
          Skip (Dev Only)
        </Button>
      </div>
    </div>
  );
};

export default AssessmentBookStage;
