/**
 * Assessment Confirm Stage
 * Booking confirmation after VSL completion
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
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-radiance-gold/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-radiance-gold text-3xl">&#10003;</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          Confirm Your Assessment
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto">
          You&apos;ve watched the video and understand what the AI Go/No-Go Assessment delivers.
          Review your details and proceed to payment.
        </p>
      </div>

      {/* Booking Summary */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-6 md:p-8">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Your Assessment Details
        </h3>

        <div className="space-y-4">
          {/* Name */}
          <div className="flex items-start justify-between py-3 border-b border-depth-border">
            <span className="text-text-muted">Name</span>
            <span className="text-text-primary font-medium">{formData.name}</span>
          </div>

          {/* Email */}
          <div className="flex items-start justify-between py-3 border-b border-depth-border">
            <span className="text-text-muted">Email</span>
            <span className="text-text-primary font-medium">{formData.email}</span>
          </div>

          {/* Company */}
          {formData.company && (
            <div className="flex items-start justify-between py-3 border-b border-depth-border">
              <span className="text-text-muted">Company</span>
              <span className="text-text-primary font-medium">{formData.company}</span>
            </div>
          )}

          {/* Scheduled Call */}
          <div className="flex items-start justify-between py-3 border-b border-depth-border">
            <span className="text-text-muted">Verdict Call</span>
            <span className="text-text-primary font-medium">{formatDate(formData.bookedSlot)}</span>
          </div>

          {/* Investment */}
          <div className="flex items-start justify-between py-3">
            <span className="text-text-muted">Investment</span>
            <span className="text-radiance-gold font-bold text-xl">
              ${ASSESSMENT_CONFIG.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* What You're Getting */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          What You&apos;re Getting
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-radiance-gold mt-0.5">&#10003;</span>
            <span className="text-text-secondary">
              <strong className="text-text-primary">Clear Verdict:</strong> GO, CONDITIONAL GO, or NO-GO decision on AI for your business
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-radiance-gold mt-0.5">&#10003;</span>
            <span className="text-text-secondary">
              <strong className="text-text-primary">Judgment Call:</strong> Live verdict delivery with strategic context
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-radiance-gold mt-0.5">&#10003;</span>
            <span className="text-text-secondary">
              <strong className="text-text-primary">One-Page Report:</strong> Documentation of your assessment and verdict
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-radiance-gold mt-0.5">&#10003;</span>
            <span className="text-text-secondary">
              <strong className="text-text-primary">Clean Exit:</strong> No automatic upsells. Just clarity.
            </span>
          </li>
        </ul>
      </div>

      {/* Important Notice */}
      <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-text-muted text-xl">&#9432;</span>
          <div className="text-sm text-text-muted space-y-1">
            <p>
              <strong className="text-text-secondary">Important:</strong> After payment, you&apos;ll complete a structured intake questionnaire and record a Loom walkthrough.
              <strong className="text-text-secondary"> Incomplete intake pauses your assessment.</strong>
            </p>
            <p>
              Your call will only proceed once all intake materials are submitted.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-depth-border">
        <Button
          variant="ghost"
          onClick={onBack}
        >
          &#8592; Back
        </Button>

        <Button
          onClick={onContinue}
          size="lg"
        >
          Proceed to Payment - ${ASSESSMENT_CONFIG.price.toLocaleString()}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentConfirmStage;
