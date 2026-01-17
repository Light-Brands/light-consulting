/**
 * Assessment Status Stage
 * Confirmation and status display after intake submission
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
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(date);
  };

  // If verdict has been delivered
  if (formData.verdict) {
    const verdictConfig = ASSESSMENT_CONFIG.verdicts[formData.verdict];

    return (
      <div className="space-y-6">
        {/* Verdict Display */}
        <div className="text-center space-y-4">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
            formData.verdict === 'GO'
              ? 'bg-growth-emerald/20'
              : formData.verdict === 'CONDITIONAL_GO'
                ? 'bg-radiance-gold/20'
                : 'bg-depth-surface'
          }`}>
            <span className={`text-4xl ${
              formData.verdict === 'GO'
                ? 'text-growth-emerald'
                : formData.verdict === 'CONDITIONAL_GO'
                  ? 'text-radiance-gold'
                  : 'text-text-muted'
            }`}>
              {formData.verdict === 'GO' ? '&#10003;' : formData.verdict === 'CONDITIONAL_GO' ? '&#8776;' : '&#10005;'}
            </span>
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold ${
            formData.verdict === 'GO'
              ? 'text-growth-emerald'
              : formData.verdict === 'CONDITIONAL_GO'
                ? 'text-radiance-gold'
                : 'text-text-primary'
          }`}>
            {verdictConfig.label}
          </h1>

          <p className="text-text-secondary max-w-xl mx-auto">
            {verdictConfig.description}
          </p>

          {formData.verdictDeliveredAt && (
            <p className="text-text-muted text-sm">
              Delivered on {formatDate(formData.verdictDeliveredAt)}
            </p>
          )}
        </div>

        {/* Report Download */}
        <div className="bg-depth-surface border border-depth-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Your Assessment Report
          </h3>
          <p className="text-text-secondary mb-4">
            Your one-page assessment report documents the verdict and key findings.
          </p>
          <Button variant="outline">
            Download Report (PDF)
          </Button>
        </div>

        {/* Navigation */}
        <div className="text-center pt-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  // Pending status (intake submitted, awaiting verdict)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-radiance-gold/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-radiance-gold text-4xl">&#10003;</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
          Intake Complete
        </h1>

        <p className="text-text-secondary max-w-xl mx-auto">
          Your intake has been submitted successfully. Your assessment is now being prepared.
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-6 md:p-8">
        <h3 className="text-lg font-semibold text-text-primary mb-6">
          Assessment Status
        </h3>

        <div className="space-y-4">
          {/* Completed Steps */}
          <div className="flex items-center gap-3 p-3 bg-growth-emerald/5 border border-growth-emerald/20 rounded-lg">
            <span className="text-growth-emerald">&#10003;</span>
            <span className="text-text-secondary">Self-qualification complete</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-growth-emerald/5 border border-growth-emerald/20 rounded-lg">
            <span className="text-growth-emerald">&#10003;</span>
            <span className="text-text-secondary">VSL video watched</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-growth-emerald/5 border border-growth-emerald/20 rounded-lg">
            <span className="text-growth-emerald">&#10003;</span>
            <span className="text-text-secondary">Payment confirmed - ${ASSESSMENT_CONFIG.price.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-growth-emerald/5 border border-growth-emerald/20 rounded-lg">
            <span className="text-growth-emerald">&#10003;</span>
            <span className="text-text-secondary">Intake questionnaire submitted</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-growth-emerald/5 border border-growth-emerald/20 rounded-lg">
            <span className="text-growth-emerald">&#10003;</span>
            <span className="text-text-secondary">Loom video submitted</span>
          </div>

          {/* Pending Step */}
          <div className="flex items-center gap-3 p-3 bg-radiance-gold/5 border border-radiance-gold/20 rounded-lg">
            <div className="w-5 h-5 border-2 border-radiance-gold/50 border-t-radiance-gold rounded-full animate-spin" />
            <span className="text-text-primary font-medium">Verdict call pending</span>
          </div>
        </div>
      </div>

      {/* Scheduled Call Info */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-radiance-gold text-2xl">&#128197;</span>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Your Verdict Call
            </h3>
            <p className="text-text-secondary mt-1">
              {formatDate(formData.bookedSlot)}
            </p>
            <p className="text-text-muted text-sm mt-2">
              You&apos;ll receive an email reminder 24 hours before your call. Make sure to check your inbox (and spam folder).
            </p>
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          What to Expect
        </h3>
        <ul className="space-y-3 text-text-secondary">
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-1">&#8226;</span>
            We&apos;ll review your intake and Loom video before the call
          </li>
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-1">&#8226;</span>
            The call will deliver your GO, CONDITIONAL GO, or NO-GO verdict
          </li>
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-1">&#8226;</span>
            You&apos;ll receive a one-page report documenting the assessment
          </li>
          <li className="flex items-start gap-2">
            <span className="text-radiance-gold mt-1">&#8226;</span>
            There are no automatic upsells. This is a clean exit with clarity.
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="text-center text-text-muted text-sm">
        <p>
          Questions? Email us at{' '}
          <a href="mailto:assessment@lightbrand.com" className="text-radiance-gold hover:underline">
            assessment@lightbrand.com
          </a>
        </p>
      </div>

      {/* Navigation */}
      <div className="text-center pt-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default AssessmentStatusStage;
