/**
 * Assessment Book Stage (Stage 3)
 * Calendar booking without pricing disclosure
 * Links out to LeadConnector for better booking experience
 * Redirects back to Educate stage after booking complete
 */

'use client';

import React from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';
import { ASSESSMENT_FUNNEL_CONFIG, BOOK_STAGE_CONTENT } from '@/lib/constants';

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
  // Build the booking URL with redirect back to funnel
  const buildBookingUrl = () => {
    // Get the base URL for redirect
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    // Build redirect URL to come back to educate stage with booking info
    // Include email so we can look up booking details from webhook data
    const redirectParams = new URLSearchParams({
      stage: 'educate',
      booking_complete: 'true',
    });

    if (formData.leadId) {
      redirectParams.set('lead_id', formData.leadId);
    }
    if (formData.email) {
      redirectParams.set('email', formData.email);
    }

    const redirectUrl = `${baseUrl}/assessment-funnel?${redirectParams.toString()}`;

    // LeadConnector calendar URL with redirect
    // The calendar URL format: base_url + ?redirect_url=encoded_url
    const calendarBaseUrl = ASSESSMENT_FUNNEL_CONFIG.calendar.url;

    // Build booking URL with redirect and pre-fill user info
    // LeadConnector supports pre-filling contact info via URL params
    const bookingParams = new URLSearchParams();
    bookingParams.set('redirect_url', redirectUrl);

    // Pre-fill contact info if available (LeadConnector will use these)
    if (formData.name) {
      // Split name into first and last name for LeadConnector
      const nameParts = formData.name.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Pass both formats for compatibility
      bookingParams.set('name', formData.name);
      bookingParams.set('first_name', firstName);
      bookingParams.set('last_name', lastName);
      // Also try camelCase variants
      bookingParams.set('firstName', firstName);
      bookingParams.set('lastName', lastName);
    }
    if (formData.email) {
      bookingParams.set('email', formData.email);
    }
    if (formData.phone) {
      bookingParams.set('phone', formData.phone);
    }

    const bookingUrl = `${calendarBaseUrl}?${bookingParams.toString()}`;

    return bookingUrl;
  };

  const handleBookNow = () => {
    const bookingUrl = buildBookingUrl();
    // Open in same window for seamless experience
    window.location.href = bookingUrl;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
          {BOOK_STAGE_CONTENT.headline}
        </h2>
        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          {BOOK_STAGE_CONTENT.subheadline}
        </p>
      </div>

      {/* Booking CTA Card */}
      <div className="bg-depth-surface border border-radiance-gold/30 rounded-xl p-6 sm:p-8 md:p-10">
        <div className="text-center space-y-6">
          {/* Calendar Icon */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-radiance-gold/10 flex items-center justify-center mx-auto">
            <span className="text-radiance-gold text-4xl sm:text-5xl">&#128197;</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary">
              Select Your Preferred Time
            </h3>
            <p className="text-text-muted text-sm sm:text-base max-w-md mx-auto">
              You&apos;ll be taken to our scheduling page to choose a time that works for you.
            </p>
          </div>

          {/* Main CTA */}
          <Button
            onClick={handleBookNow}
            size="lg"
            className="w-full sm:w-auto min-h-[56px] text-base sm:text-lg px-8 sm:px-12"
          >
            <span className="mr-2">&#128197;</span>
            Open Calendar &amp; Book Now
          </Button>

          <p className="text-text-muted text-xs sm:text-sm">
            After booking, you&apos;ll return here to continue.
          </p>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="text-radiance-gold text-lg sm:text-xl flex-shrink-0">&#9432;</span>
          <div className="space-y-2">
            <p className="text-text-primary font-medium text-sm sm:text-base">
              {BOOK_STAGE_CONTENT.note}
            </p>
            <ol className="text-text-muted text-xs sm:text-sm space-y-1 list-decimal list-inside">
              <li>Book your call on our scheduling page</li>
              <li>Watch a mandatory video explaining the assessment</li>
              <li>Confirm your understanding and proceed to payment</li>
              <li>Complete your intake questionnaire</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Pre-filled Info Display */}
      {(formData.name || formData.email) && (
        <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-4 sm:p-5">
          <p className="text-text-muted text-xs uppercase tracking-wide mb-3">Your Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {formData.name && (
              <div>
                <p className="text-text-muted text-xs">Name</p>
                <p className="text-text-primary font-medium text-sm">{formData.name}</p>
              </div>
            )}
            {formData.email && (
              <div>
                <p className="text-text-muted text-xs">Email</p>
                <p className="text-text-primary font-medium text-sm break-all">{formData.email}</p>
              </div>
            )}
          </div>
          <p className="text-text-muted text-xs mt-3">
            This information will be pre-filled on the booking page.
          </p>
        </div>
      )}

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
