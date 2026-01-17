/**
 * Assessment Confirm Stage (Stage 5)
 * VSL completion confirmation - user confirms understanding before payment
 * Based on AI Go/No-Go Assessment Strategy
 * Mobile-optimized layout
 */

'use client';

import React, { useState } from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';
import { ASSESSMENT_FUNNEL_CONFIG, CONFIRM_STAGE_CONTENT } from '@/lib/constants';

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
  const [confirmations, setConfirmations] = useState<Record<number, boolean>>({});

  const allConfirmed = CONFIRM_STAGE_CONTENT.confirmations.every(
    (_, index) => confirmations[index]
  );

  const handleConfirmation = (index: number, checked: boolean) => {
    setConfirmations((prev) => ({ ...prev, [index]: checked }));
  };

  const formatDate = (date: Date | undefined, isPending?: boolean) => {
    if (isPending) return 'Confirming your booking...';
    if (!date) return 'Scheduled';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3 px-2">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-growth-emerald/20 flex items-center justify-center mx-auto">
          <span className="text-growth-emerald text-2xl sm:text-3xl">&#10003;</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
          {CONFIRM_STAGE_CONTENT.headline}
        </h2>
        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          {CONFIRM_STAGE_CONTENT.subheadline}
        </p>
      </div>

      {/* Scheduled Call Card */}
      <div className="bg-depth-surface border border-radiance-gold/30 rounded-xl p-4 sm:p-6">
        <div className="text-center space-y-3">
          <p className="text-text-muted text-xs uppercase tracking-wide">
            {CONFIRM_STAGE_CONTENT.callDetails.label}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-text-primary">
            {formatDate(formData.bookedSlot, formData.bookingPending)}
          </p>
          <p className="text-text-muted text-xs sm:text-sm">
            {CONFIRM_STAGE_CONTENT.callDetails.note}
          </p>
        </div>
      </div>

      {/* Confirmation Checkboxes */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-4">
          Confirm Your Understanding
        </h3>
        <div className="space-y-3">
          {CONFIRM_STAGE_CONTENT.confirmations.map((confirmation, index) => (
            <label
              key={index}
              className={`flex items-start gap-3 cursor-pointer p-3 sm:p-4 rounded-xl border transition-colors active:scale-[0.99] ${
                confirmations[index]
                  ? 'border-radiance-gold/50 bg-radiance-gold/5'
                  : 'border-depth-border hover:border-depth-border/80'
              }`}
            >
              <div className="flex-shrink-0 pt-0.5">
                <input
                  type="checkbox"
                  checked={confirmations[index] || false}
                  onChange={(e) => handleConfirmation(index, e.target.checked)}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold/50 cursor-pointer"
                />
              </div>
              <span className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {confirmation}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Your Details Summary */}
      <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
          Your Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-text-muted text-xs">Name</p>
            <p className="text-text-primary font-medium text-sm">{formData.name}</p>
          </div>
          <div>
            <p className="text-text-muted text-xs">Email</p>
            <p className="text-text-primary font-medium text-sm break-all">{formData.email}</p>
          </div>
          {formData.company && (
            <div>
              <p className="text-text-muted text-xs">Company</p>
              <p className="text-text-primary font-medium text-sm">{formData.company}</p>
            </div>
          )}
        </div>
      </div>

      {/* Investment Display */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary font-medium">Assessment Investment</span>
          <span className="text-radiance-gold font-bold text-xl sm:text-2xl">
            ${ASSESSMENT_FUNNEL_CONFIG.price.toLocaleString()}
          </span>
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
            disabled={!allConfirmed}
            size="lg"
            className={`min-h-[52px] text-base sm:text-lg order-1 sm:order-2 w-full sm:w-auto ${
              !allConfirmed ? 'opacity-50' : ''
            }`}
          >
            {allConfirmed
              ? `Proceed to Payment ($${ASSESSMENT_FUNNEL_CONFIG.price.toLocaleString()})`
              : 'Confirm All to Continue'
            }
          </Button>
        </div>

        {!allConfirmed && (
          <p className="text-center text-text-muted text-xs sm:text-sm mt-3">
            Please confirm all items above to proceed to payment.
          </p>
        )}
      </div>
    </div>
  );
};

export default AssessmentConfirmStage;
