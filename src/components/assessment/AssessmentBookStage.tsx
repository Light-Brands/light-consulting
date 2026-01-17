/**
 * Assessment Book Stage
 * Calendar booking without pricing disclosure
 * Mobile-optimized with taller calendar embed
 */

'use client';

import React, { useState } from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';
import { ASSESSMENT_CONFIG } from '@/lib/constants';

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

  // Handle LeadConnector/GHL booking event
  const handleBookingEvent = (e: MessageEvent) => {
    // LeadConnector sends various message types
    // Check for booking confirmation events
    if (e.data && typeof e.data === 'object') {
      // GHL booking widget events
      if (e.data.type === 'booking_confirmed' || e.data.event === 'booking_confirmed') {
        const bookingId = e.data.bookingId || e.data.id || 'ghl-booking-' + Date.now();
        const startTime = e.data.startTime || e.data.selected_slot || Date.now();
        onBookingComplete(bookingId, new Date(startTime));
        onContinue();
      }
      // Alternative event format
      if (e.data.eventName === 'bookingConfirmed' || e.data.action === 'bookingSuccess') {
        const bookingId = e.data.bookingId || e.data.appointmentId || 'ghl-booking-' + Date.now();
        const startTime = e.data.startTime || e.data.appointmentTime || Date.now();
        onBookingComplete(bookingId, new Date(startTime));
        onContinue();
      }
    }
  };

  // Listen for booking messages from LeadConnector widget
  React.useEffect(() => {
    window.addEventListener('message', handleBookingEvent);
    return () => window.removeEventListener('message', handleBookingEvent);
  }, [onBookingComplete, onContinue]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
          Schedule Your Assessment Call
        </h2>
        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          Select a time for your AI Go/No-Go Assessment verdict call. This is where you&apos;ll receive your decision.
        </p>
      </div>

      {/* Calendar Embed Container - Taller on mobile for better usability */}
      <div className="bg-depth-surface border border-depth-border rounded-xl overflow-hidden">
        {/* Taller aspect ratio on mobile (3/4) vs desktop (4/3) */}
        <div className="aspect-[3/4] sm:aspect-[4/3] md:aspect-[4/3] relative min-h-[400px] sm:min-h-[500px]">
          {!isCalendarLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-depth-base">
              <div className="text-center space-y-4 px-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-radiance-gold/30 border-t-radiance-gold rounded-full animate-spin mx-auto" />
                <p className="text-text-muted text-sm sm:text-base">Loading calendar...</p>
              </div>
            </div>
          )}

          {/* LeadConnector/GHL Calendar Widget */}
          <iframe
            src={ASSESSMENT_CONFIG.calendar.url}
            width="100%"
            height="100%"
            frameBorder="0"
            className="absolute inset-0"
            onLoad={() => setIsCalendarLoaded(true)}
            title="Schedule Assessment Call"
            allow="payment"
          />
        </div>
      </div>

      {/* Info Box - Collapsible info on mobile */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-radiance-gold text-lg sm:text-xl flex-shrink-0">&#9432;</span>
          <div className="space-y-1 min-w-0">
            <p className="text-text-secondary text-xs sm:text-sm">
              <strong className="text-text-primary">What happens next:</strong>
            </p>
            <ol className="text-text-muted text-xs sm:text-sm space-y-0.5 sm:space-y-1 list-decimal list-inside">
              <li>Watch a mandatory video explaining the process</li>
              <li>Confirm your booking after watching</li>
              <li>Complete payment to secure your spot</li>
              <li>Fill out your intake questionnaire</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Navigation - Sticky on mobile */}
      <div className="sticky bottom-0 bg-depth-base/95 backdrop-blur-sm -mx-4 px-4 py-3 sm:relative sm:mx-0 sm:px-0 sm:py-0 sm:bg-transparent sm:backdrop-blur-none border-t sm:border-t border-depth-border">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={onBack}
            className="min-h-[44px] text-sm sm:text-base"
          >
            <span className="mr-1">&#8592;</span> Back
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              // Mock booking for development
              onBookingComplete('dev-booking-' + Date.now(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
              onContinue();
            }}
            className="min-h-[44px] text-sm sm:text-base"
          >
            Skip (Dev)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentBookStage;
