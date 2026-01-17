/**
 * Assessment Confirm Stage
 * Booking confirmation after VSL completion
 * Mobile-optimized layout
 */

'use client';

import React from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';
import { ASSESSMENT_CONFIG } from '@/lib/constants';

interface AssessmentConfirmStageProps {
  formData: AssessmentFormData;
  onContinue: () => void;
  onBack: () => void;
}

export const AssessmentConfirmStage: React.FC<AssessmentConfirmStageProps> = ({
  formData,
  onContinue,
  onBack,
}) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Not scheduled';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3 px-2">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-radiance-gold/20 flex items-center justify-center mx-auto">
          <span className="text-radiance-gold text-2xl sm:text-3xl">&#10003;</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
          Confirm Your Assessment
        </h2>
        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          Review your details and proceed to payment.
        </p>
      </div>

      {/* Booking Summary - Card layout on mobile */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-4 sm:p-6 md:p-8">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-4 sm:mb-6">
          Your Assessment Details
        </h3>

        <div className="space-y-0">
          {/* Name */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-depth-border gap-1">
            <span className="text-text-muted text-xs sm:text-sm uppercase tracking-wide">Name</span>
            <span className="text-text-primary font-medium text-sm sm:text-base">{formData.name}</span>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-depth-border gap-1">
            <span className="text-text-muted text-xs sm:text-sm uppercase tracking-wide">Email</span>
            <span className="text-text-primary font-medium text-sm sm:text-base break-all">{formData.email}</span>
          </div>

          {/* Company */}
          {formData.company && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-depth-border gap-1">
              <span className="text-text-muted text-xs sm:text-sm uppercase tracking-wide">Company</span>
              <span className="text-text-primary font-medium text-sm sm:text-base">{formData.company}</span>
            </div>
          )}

          {/* Scheduled Call */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-depth-border gap-1">
            <span className="text-text-muted text-xs sm:text-sm uppercase tracking-wide">Verdict Call</span>
            <span className="text-text-primary font-medium text-sm sm:text-base">{formatDate(formData.bookedSlot)}</span>
          </div>

          {/* Investment - Highlighted */}
          <div className="flex items-center justify-between py-4 sm:py-5">
            <span className="text-text-muted text-xs sm:text-sm uppercase tracking-wide">Investment</span>
            <span className="text-radiance-gold font-bold text-xl sm:text-2xl">
              ${ASSESSMENT_CONFIG.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* What You're Getting - Compact on mobile */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">
          What You&apos;re Getting
        </h3>
        <ul className="space-y-2.5 sm:space-y-3">
          <li className="flex items-start gap-2 sm:gap-3">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Clear Verdict:</strong> GO, CONDITIONAL GO, or NO-GO decision
            </span>
          </li>
          <li className="flex items-start gap-2 sm:gap-3">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Judgment Call:</strong> Live verdict delivery with strategic context
            </span>
          </li>
          <li className="flex items-start gap-2 sm:gap-3">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">One-Page Report:</strong> Documentation of your assessment
            </span>
          </li>
          <li className="flex items-start gap-2 sm:gap-3">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Clean Exit:</strong> No automatic upsells. Just clarity.
            </span>
          </li>
        </ul>
      </div>

      {/* Important Notice - Collapsible on mobile */}
      <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-text-muted text-lg sm:text-xl flex-shrink-0">&#9432;</span>
          <div className="text-xs sm:text-sm text-text-muted space-y-1 leading-relaxed">
            <p>
              <strong className="text-text-secondary">Important:</strong> After payment, you&apos;ll complete a questionnaire and record a Loom walkthrough.
              <strong className="text-text-secondary"> Incomplete intake pauses your assessment.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation - Sticky CTA on mobile */}
      <div className="sticky bottom-0 bg-depth-base/95 backdrop-blur-sm -mx-4 px-4 py-3 sm:relative sm:mx-0 sm:px-0 sm:py-0 sm:bg-transparent sm:backdrop-blur-none border-t sm:border-t border-depth-border">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-3">
          <Button
            variant="ghost"
            onClick={onBack}
            className="min-h-[44px] text-sm sm:text-base order-2 sm:order-1"
          >
            <span className="mr-1">&#8592;</span> Back
          </Button>

          <Button
            onClick={onContinue}
            size="lg"
            className="min-h-[52px] text-base sm:text-lg order-1 sm:order-2 w-full sm:w-auto"
          >
            Pay ${ASSESSMENT_CONFIG.price.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentConfirmStage;
