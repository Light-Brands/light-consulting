/**
 * Assessment Commit Stage
 * Payment gateway for $5,000 assessment fee
 * Mobile-optimized with prominent CTA
 */

'use client';

import React, { useState } from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';
import { ASSESSMENT_CONFIG } from '@/lib/constants';

interface AssessmentCommitStageProps {
  formData: AssessmentFormData;
  onPaymentComplete: (sessionId: string) => void;
  onBack: () => void;
}

export const AssessmentCommitStage: React.FC<AssessmentCommitStageProps> = ({
  formData,
  onPaymentComplete,
  onBack,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!formData.assessmentId) {
      setError('Assessment ID not found. Please refresh and try again.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/assessment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessment_id: formData.assessmentId,
        }),
      });

      const result = await response.json();

      if (result.checkout_url) {
        // Redirect to Stripe checkout
        window.location.href = result.checkout_url;
      } else if (result.error) {
        if (result.already_paid) {
          // Payment already completed, proceed to intake
          onPaymentComplete(formData.assessmentId);
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Failed to initiate payment. Please try again.');
    }

    setIsProcessing(false);
  };

  // Handle payment success callback (called when returning from Stripe)
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    const sessionId = urlParams.get('session_id');

    if (paymentStatus === 'success' && sessionId) {
      onPaymentComplete(sessionId);
    }
  }, [onPaymentComplete]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
          Secure Your Assessment
        </h2>
        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          Complete payment to begin intake.{' '}
          {formData.bookingPending
            ? 'Your call time will be confirmed shortly.'
            : formData.bookedSlot
              ? `Your call is scheduled for ${new Date(formData.bookedSlot).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}.`
              : 'Your call is scheduled.'
          }
        </p>
      </div>

      {/* Payment Card */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-4 sm:p-6 md:p-8">
        {/* Price Display - Prominent on mobile */}
        <div className="text-center pb-5 sm:pb-6 border-b border-depth-border mb-5 sm:mb-6">
          <p className="text-text-muted text-xs sm:text-sm uppercase tracking-wide mb-1.5 sm:mb-2">Investment</p>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-radiance-gold">
            ${ASSESSMENT_CONFIG.price.toLocaleString()}
          </p>
          <p className="text-text-muted text-xs sm:text-sm mt-1.5 sm:mt-2">One-time payment. No hidden fees.</p>
        </div>

        {/* What's Included - Compact grid on mobile */}
        <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
          <h4 className="text-xs sm:text-sm font-semibold text-text-secondary uppercase tracking-wide">
            Includes
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <li className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
              <span className="text-radiance-gold flex-shrink-0">&#10003;</span>
              <span>AI readiness evaluation</span>
            </li>
            <li className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
              <span className="text-radiance-gold flex-shrink-0">&#10003;</span>
              <span>Async intake review</span>
            </li>
            <li className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
              <span className="text-radiance-gold flex-shrink-0">&#10003;</span>
              <span>Live verdict call</span>
            </li>
            <li className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
              <span className="text-radiance-gold flex-shrink-0">&#10003;</span>
              <span>Assessment report</span>
            </li>
          </ul>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-red-400 text-xs sm:text-sm">{error}</p>
          </div>
        )}

        {/* Payment Button - Large touch target */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full min-h-[52px] text-base sm:text-lg"
          size="lg"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-depth-base/30 border-t-depth-base rounded-full animate-spin" />
              <span>Processing...</span>
            </span>
          ) : (
            `Pay $${ASSESSMENT_CONFIG.price.toLocaleString()}`
          )}
        </Button>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-text-muted text-xs sm:text-sm">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secured by Stripe</span>
        </div>
      </div>

      {/* Refund Policy - Compact on mobile */}
      <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-text-muted text-lg sm:text-xl flex-shrink-0">&#9432;</span>
          <div className="text-xs sm:text-sm text-text-muted leading-relaxed">
            <p>
              <strong className="text-text-secondary">Refund Policy:</strong> This is a judgment-based service.
              A &quot;NO-GO&quot; verdict protects you from wasted AI investment. No refunds based on verdict outcome.
            </p>
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

          {/* Dev Skip Button */}
          <Button
            variant="outline"
            onClick={() => onPaymentComplete('dev-session-' + Date.now())}
            className="min-h-[44px] text-sm sm:text-base"
          >
            Skip (Dev)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCommitStage;
