/**
 * Assessment Status Stage
 * Booking confirmation - user is now price-aware and has scheduled their call
 * Mobile-optimized with clear confirmation
 */

'use client';

import React from 'react';
import { Button } from '../ui';
import { AssessmentFormData, PageKey } from '@/types';
import { ASSESSMENT_CONFIG } from '@/lib/constants';

interface AssessmentStatusStageProps {
  formData: AssessmentFormData;
  onNavigate: (page: PageKey) => void;
}

export const AssessmentStatusStage: React.FC<AssessmentStatusStageProps> = ({
  formData,
  onNavigate,
}) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Not scheduled';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-3 sm:space-y-4 px-2">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-growth-emerald/20 flex items-center justify-center mx-auto">
          <span className="text-growth-emerald text-4xl sm:text-5xl">&#10003;</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
          You&apos;re All Set!
        </h1>

        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          Your assessment call is booked. We look forward to speaking with you.
        </p>
      </div>

      {/* Booking Confirmation Card */}
      <div className="bg-depth-surface border border-growth-emerald/30 rounded-xl p-4 sm:p-6 md:p-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-growth-emerald/10 text-growth-emerald px-4 py-2 rounded-full text-sm font-medium">
            <span>&#128197;</span>
            <span>Call Confirmed</span>
          </div>

          <div>
            <p className="text-text-muted text-sm">Your Assessment Call</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary mt-1">
              {formatDate(formData.bookedSlot)}
            </p>
          </div>

          <div className="pt-2 border-t border-depth-border">
            <p className="text-text-muted text-xs sm:text-sm">
              A calendar invitation has been sent to{' '}
              <span className="text-text-secondary">{formData.email}</span>
            </p>
          </div>
        </div>
      </div>

      {/* What You Learned - Price Awareness Confirmation */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3">
          What to Expect on the Call
        </h3>
        <ul className="space-y-2.5 sm:space-y-3 text-text-secondary text-xs sm:text-sm">
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span className="leading-relaxed">
              We&apos;ll dive deep into your business and AI readiness
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span className="leading-relaxed">
              You&apos;ll learn whether AI is right for your business right now
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span className="leading-relaxed">
              Investment for the full assessment: <strong className="text-radiance-gold">${ASSESSMENT_CONFIG.price.toLocaleString()}</strong>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span className="leading-relaxed">
              A &quot;no-go&quot; verdict is still a successful outcome - it saves you from wasted investment
            </span>
          </li>
        </ul>
      </div>

      {/* Preparation Tips */}
      <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3">
          Before Your Call
        </h3>
        <ul className="space-y-2 text-text-muted text-xs sm:text-sm">
          <li className="flex items-start gap-2">
            <span className="text-text-secondary mt-0.5 flex-shrink-0">1.</span>
            <span className="leading-relaxed">Think about your biggest operational bottlenecks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-text-secondary mt-0.5 flex-shrink-0">2.</span>
            <span className="leading-relaxed">Consider which decisions you make repeatedly</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-text-secondary mt-0.5 flex-shrink-0">3.</span>
            <span className="leading-relaxed">Be ready to discuss your current processes honestly</span>
          </li>
        </ul>
      </div>

      {/* Reminder Info */}
      <div className="text-center space-y-3">
        <p className="text-text-muted text-xs sm:text-sm">
          You&apos;ll receive an email reminder 24 hours before your call.
        </p>
        <p className="text-text-muted text-xs sm:text-sm">
          Questions?{' '}
          <a href="mailto:assessment@lightbrand.com" className="text-radiance-gold hover:underline">
            assessment@lightbrand.com
          </a>
        </p>
      </div>

      {/* Navigation */}
      <div className="text-center pt-2 sm:pt-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="min-h-[44px]"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default AssessmentStatusStage;
