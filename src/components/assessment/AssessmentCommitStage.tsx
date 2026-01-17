/**
 * Assessment Commit Stage
 * Payment gateway for $5,000 assessment fee
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
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/assessment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId: formData.assessmentId,
          email: formData.email,
          name: formData.name,
          company: formData.company,
        }),
      });

      const result = await response.json();

      if (result.checkout_url) {
        // Redirect to Stripe checkout
        window.location.href = result.checkout_url;
      } else if (result.error) {
        setError(result.error);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          Secure Your Assessment
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto">
          Complete your payment to begin the intake process. Your verdict call is confirmed for {formData.bookedSlot ? new Date(formData.bookedSlot).toLocaleDateString() : 'your scheduled date'}.
        </p>
      </div>

      {/* Payment Card */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-6 md:p-8">
        {/* Price Display */}
        <div className="text-center pb-6 border-b border-depth-border mb-6">
          <p className="text-text-muted text-sm uppercase tracking-wide mb-2">Investment</p>
          <p className="text-4xl md:text-5xl font-bold text-radiance-gold">
            ${ASSESSMENT_CONFIG.price.toLocaleString()}
          </p>
          <p className="text-text-muted text-sm mt-2">One-time payment. No hidden fees.</p>
        </div>

        {/* What's Included */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
            Includes
          </h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-text-secondary">
              <span className="text-radiance-gold">&#10003;</span>
              Complete AI readiness evaluation
            </li>
            <li className="flex items-center gap-2 text-text-secondary">
              <span className="text-radiance-gold">&#10003;</span>
              Structured async intake review
            </li>
            <li className="flex items-center gap-2 text-text-secondary">
              <span className="text-radiance-gold">&#10003;</span>
              Live verdict delivery call
            </li>
            <li className="flex items-center gap-2 text-text-secondary">
              <span className="text-radiance-gold">&#10003;</span>
              One-page assessment report
            </li>
          </ul>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-depth-base/30 border-t-depth-base rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            `Pay $${ASSESSMENT_CONFIG.price.toLocaleString()} Now`
          )}
        </Button>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 mt-4 text-text-muted text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secured by Stripe</span>
        </div>
      </div>

      {/* Refund Policy */}
      <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-text-muted text-xl">&#9432;</span>
          <div className="text-sm text-text-muted">
            <p>
              <strong className="text-text-secondary">Refund Policy:</strong> This assessment is a judgment-based service.
              A "NO-GO" verdict is a successful outcome that protects you from wasted AI investment.
              No refunds are issued based on verdict outcome.
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex items-center justify-between pt-4 border-t border-depth-border">
        <Button
          variant="ghost"
          onClick={onBack}
        >
          &#8592; Back
        </Button>

        {/* Dev Skip Button */}
        <Button
          variant="outline"
          onClick={() => onPaymentComplete('dev-session-' + Date.now())}
        >
          Skip (Dev Only)
        </Button>
      </div>
    </div>
  );
};

export default AssessmentCommitStage;
