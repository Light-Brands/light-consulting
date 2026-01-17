/**
 * Assessment Status Stage
 * Confirmation and status display after intake submission
 * Mobile-optimized with clear status indicators
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
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  // If verdict has been delivered
  if (formData.verdict) {
    const verdictConfig = ASSESSMENT_CONFIG.verdicts[formData.verdict];

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Verdict Display */}
        <div className="text-center space-y-3 sm:space-y-4 px-2">
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto ${
            formData.verdict === 'GO'
              ? 'bg-growth-emerald/20'
              : formData.verdict === 'CONDITIONAL_GO'
                ? 'bg-radiance-gold/20'
                : 'bg-depth-surface'
          }`}>
            <span className={`text-3xl sm:text-4xl ${
              formData.verdict === 'GO'
                ? 'text-growth-emerald'
                : formData.verdict === 'CONDITIONAL_GO'
                  ? 'text-radiance-gold'
                  : 'text-text-muted'
            }`}>
              {formData.verdict === 'GO' ? '&#10003;' : formData.verdict === 'CONDITIONAL_GO' ? '&#8776;' : '&#10005;'}
            </span>
          </div>

          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
            formData.verdict === 'GO'
              ? 'text-growth-emerald'
              : formData.verdict === 'CONDITIONAL_GO'
                ? 'text-radiance-gold'
                : 'text-text-primary'
          }`}>
            {verdictConfig.label}
          </h1>

          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            {verdictConfig.description}
          </p>

          {formData.verdictDeliveredAt && (
            <p className="text-text-muted text-xs sm:text-sm">
              Delivered on {formatDate(formData.verdictDeliveredAt)}
            </p>
          )}
        </div>

        {/* Report Download */}
        <div className="bg-depth-surface border border-depth-border rounded-xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">
            Your Assessment Report
          </h3>
          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            Your one-page report documents the verdict and key findings.
          </p>
          <Button variant="outline" className="w-full sm:w-auto min-h-[44px]">
            Download Report (PDF)
          </Button>
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
  }

  // Pending status (intake submitted, awaiting verdict)
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4 px-2">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-radiance-gold/20 flex items-center justify-center mx-auto">
          <span className="text-radiance-gold text-3xl sm:text-4xl">&#10003;</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
          Intake Complete
        </h1>

        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          Your intake is submitted. Assessment is being prepared.
        </p>
      </div>

      {/* Status Card - Compact on mobile */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-4 sm:p-6 md:p-8">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-4 sm:mb-6">
          Assessment Status
        </h3>

        <div className="space-y-2.5 sm:space-y-3">
          {/* Completed Steps - Compact list on mobile */}
          {[
            'Self-qualification complete',
            'VSL video watched',
            `Payment confirmed - $${ASSESSMENT_CONFIG.price.toLocaleString()}`,
            'Intake submitted',
            'Loom video submitted',
          ].map((step, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-growth-emerald/5 border border-growth-emerald/20 rounded-lg">
              <span className="text-growth-emerald flex-shrink-0">&#10003;</span>
              <span className="text-text-secondary text-xs sm:text-sm">{step}</span>
            </div>
          ))}

          {/* Pending Step */}
          <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-radiance-gold/5 border border-radiance-gold/20 rounded-lg">
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-radiance-gold/50 border-t-radiance-gold rounded-full animate-spin flex-shrink-0" />
            <span className="text-text-primary font-medium text-xs sm:text-sm">Verdict call pending</span>
          </div>
        </div>
      </div>

      {/* Scheduled Call Info */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-4 sm:p-6">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-radiance-gold text-xl sm:text-2xl flex-shrink-0">&#128197;</span>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-text-primary">
              Your Verdict Call
            </h3>
            <p className="text-text-secondary text-sm sm:text-base mt-1">
              {formatDate(formData.bookedSlot)}
            </p>
            <p className="text-text-muted text-xs sm:text-sm mt-2 leading-relaxed">
              You&apos;ll get an email reminder 24 hours before. Check inbox and spam.
            </p>
          </div>
        </div>
      </div>

      {/* What to Expect - Compact on mobile */}
      <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">
          What to Expect
        </h3>
        <ul className="space-y-2 sm:space-y-3 text-text-secondary text-xs sm:text-sm">
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#8226;</span>
            <span className="leading-relaxed">We&apos;ll review your intake and Loom video before the call</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#8226;</span>
            <span className="leading-relaxed">The call delivers your GO, CONDITIONAL GO, or NO-GO verdict</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#8226;</span>
            <span className="leading-relaxed">You&apos;ll receive a one-page assessment report</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#8226;</span>
            <span className="leading-relaxed">No automatic upsells. Clean exit with clarity.</span>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="text-center text-text-muted text-xs sm:text-sm">
        <p>
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
