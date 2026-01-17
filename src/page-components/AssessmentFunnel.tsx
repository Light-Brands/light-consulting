/**
 * AI Go/No-Go Assessment™ Funnel Page
 * 10-Stage Conversion Funnel based on AI-GO-NO-GO-ASSESSMENT-STRATEGY.md
 *
 * Stage Flow:
 * 1. Attract   - Entry landing, filter for founders with structural pain
 * 2. Qualify   - Self-qualification (decision-maker, accepts negative verdict)
 * 3. Book      - Calendar booking WITHOUT pricing disclosed
 * 4. Educate   - Mandatory VSL reveals scope and cost
 * 5. Confirm   - Call confirmation only if video completed
 * 6. Commit    - Payment collected before intake
 * 7. Intake    - Structured questionnaire + mandatory Loom video
 * 8. Deliver   - 30-minute verdict call with 3 reasoning points
 * 9. Document  - Single-page report with scores and implications
 * 10. Exit     - Clean closure, no follow-ups unless client-initiated
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Container, Section } from '../components/ui';
import { BookProgressVisual } from '../components';
import { AssessmentFunnelStage, AssessmentFormData, PageKey } from '../types';
import {
  ASSESSMENT_FUNNEL_CONFIG,
  ASSESSMENT_INTAKE_QUESTIONS,
} from '../lib/constants';
import { isValidEmail } from '../lib/utils';

// Import all assessment stage components
import { AssessmentAttractStage } from '../components/assessment/AssessmentAttractStage';
import { AssessmentQualifyStage } from '../components/assessment/AssessmentQualifyStage';
import { AssessmentBookStage } from '../components/assessment/AssessmentBookStage';
import { AssessmentEducateStage } from '../components/assessment/AssessmentEducateStage';
import { AssessmentConfirmStage } from '../components/assessment/AssessmentConfirmStage';
import { AssessmentCommitStage } from '../components/assessment/AssessmentCommitStage';
import { AssessmentIntakeStage } from '../components/assessment/AssessmentIntakeStage';
import { AssessmentDeliverStage } from '../components/assessment/AssessmentDeliverStage';
import { AssessmentDocumentStage } from '../components/assessment/AssessmentDocumentStage';
import { AssessmentExitStage } from '../components/assessment/AssessmentExitStage';

interface AssessmentFunnelPageProps {
  onNavigate: (page: PageKey) => void;
  initialStage?: AssessmentFunnelStage;
  leadId?: string;
  source?: string;
}

// 10-Stage funnel order
const STAGE_ORDER: AssessmentFunnelStage[] = [
  'attract',
  'qualify',
  'book',
  'educate',
  'confirm',
  'commit',
  'intake',
  'deliver',
  'document',
  'exit',
];

const getStepNumber = (stage: AssessmentFunnelStage): number => {
  return STAGE_ORDER.indexOf(stage) + 1;
};

export const AssessmentFunnelPage: React.FC<AssessmentFunnelPageProps> = ({
  onNavigate,
  initialStage = 'attract',
  leadId,
  source = 'assessment-funnel',
}) => {
  const [stage, setStage] = useState<AssessmentFunnelStage>(initialStage);
  const [formData, setFormData] = useState<AssessmentFormData>({
    leadId,
    source,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Stage labels for progress indicator
  const stageLabels = STAGE_ORDER.map((s) => ASSESSMENT_FUNNEL_CONFIG.stageLabels[s]);

  // Update URL when stage changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('stage', stage);
    if (formData.leadId) {
      url.searchParams.set('lead_id', formData.leadId);
    }
    if (formData.assessmentId) {
      url.searchParams.set('assessment_id', formData.assessmentId);
    }
    window.history.replaceState({}, '', url.toString());
  }, [stage, formData.leadId, formData.assessmentId]);

  // Parse URL params on mount to resume flow
  useEffect(() => {
    const url = new URL(window.location.href);
    const stageParam = url.searchParams.get('stage') as AssessmentFunnelStage | null;
    const leadIdParam = url.searchParams.get('lead_id');
    const assessmentIdParam = url.searchParams.get('assessment_id');
    const paymentStatus = url.searchParams.get('payment');
    const bookingComplete = url.searchParams.get('booking_complete');

    // Handle booking complete callback from LeadConnector
    if (bookingComplete === 'true') {
      // Generate a booking ID (in production, LeadConnector may pass this)
      const bookingId = url.searchParams.get('booking_id') || 'ghl-booking-' + Date.now();
      // Parse booked slot if provided, otherwise use a placeholder
      const bookedSlotParam = url.searchParams.get('booked_slot');
      const bookedSlot = bookedSlotParam ? new Date(bookedSlotParam) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      setFormData((prev) => ({
        ...prev,
        bookingId,
        bookedSlot,
        bookingConfirmed: true,
        ...(leadIdParam ? { leadId: leadIdParam } : {}),
      }));
      setStage('educate');

      // Clean up URL params
      url.searchParams.delete('booking_complete');
      url.searchParams.delete('booking_id');
      url.searchParams.delete('booked_slot');
      window.history.replaceState({}, '', url.toString());
      return;
    }

    if (stageParam && STAGE_ORDER.includes(stageParam)) {
      setStage(stageParam);
    }
    if (leadIdParam) {
      setFormData((prev) => ({ ...prev, leadId: leadIdParam }));
    }
    if (assessmentIdParam) {
      setFormData((prev) => ({ ...prev, assessmentId: assessmentIdParam }));
    }
    // Handle payment success callback
    if (paymentStatus === 'success') {
      setStage('intake');
      setFormData((prev) => ({ ...prev, paymentCompleted: true, paymentCompletedAt: new Date() }));
    }
  }, []);

  // Update form data
  const updateFormData = useCallback((updates: Partial<AssessmentFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Clear related errors
    Object.keys(updates).forEach((key) => {
      setErrors((prev) => {
        if (prev[key]) {
          const newErrors = { ...prev };
          delete newErrors[key];
          return newErrors;
        }
        return prev;
      });
    });
  }, []);

  // Handle field changes
  const handleFieldChange = useCallback(
    (field: string, value: string | boolean) => {
      updateFormData({ [field]: value });
    },
    [updateFormData]
  );

  // Validate qualification stage
  const validateQualify = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.isDecisionMaker) {
      newErrors.isDecisionMaker = 'You must confirm you are a decision-maker';
    }
    if (!formData.openToNegativeVerdict) {
      newErrors.openToNegativeVerdict = 'You must accept that a "no" is a valid outcome';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Navigate to next stage
  const goToNextStage = useCallback(() => {
    const currentIndex = STAGE_ORDER.indexOf(stage);
    if (currentIndex < STAGE_ORDER.length - 1) {
      setStage(STAGE_ORDER[currentIndex + 1]);
    }
  }, [stage]);

  // Navigate to previous stage
  const goToPreviousStage = useCallback(() => {
    const currentIndex = STAGE_ORDER.indexOf(stage);
    if (currentIndex > 0) {
      setStage(STAGE_ORDER[currentIndex - 1]);
    }
  }, [stage]);

  // Stage 1 -> 2: Attract to Qualify
  const handleAttractContinue = useCallback(() => {
    goToNextStage();
  }, [goToNextStage]);

  // Stage 2 -> 3: Qualify to Book (create lead)
  const handleQualifyContinue = useCallback(async () => {
    if (!validateQualify()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/assessment/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          source: formData.source || 'assessment-funnel',
        }),
      });

      const result = await response.json();
      if (result.success && result.leadId) {
        updateFormData({ leadId: result.leadId });
      }
    } catch (error) {
      console.error('Error creating lead:', error);
      // Continue anyway - lead creation shouldn't block flow
    }
    setIsLoading(false);
    goToNextStage();
  }, [validateQualify, formData, updateFormData, goToNextStage]);

  // Stage 3 -> 4: Book to Educate (booking complete)
  const handleBookingComplete = useCallback(
    (bookingId: string, bookedSlot: Date) => {
      updateFormData({
        bookingId,
        bookedSlot,
        bookingConfirmed: true,
      });
      goToNextStage();
    },
    [updateFormData, goToNextStage]
  );

  // Stage 4 -> 5: Educate to Confirm (VSL complete)
  const handleVSLComplete = useCallback(
    (watchPercentage: number) => {
      updateFormData({
        vslCompletedAt: new Date(),
        vslWatchPercentage: watchPercentage,
        priceAcknowledged: true,
      });

      // Update lead with VSL completion
      if (formData.leadId) {
        fetch('/api/assessment/lead', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId: formData.leadId,
            vslCompleted: true,
            vslWatchPercentage: watchPercentage,
          }),
        }).catch(console.error);
      }

      goToNextStage();
    },
    [updateFormData, formData.leadId, goToNextStage]
  );

  // Stage 5 -> 6: Confirm to Commit (confirmations complete)
  const handleConfirmContinue = useCallback(() => {
    updateFormData({
      callConfirmed: true,
      callConfirmedAt: new Date(),
    });
    goToNextStage();
  }, [updateFormData, goToNextStage]);

  // Stage 6 -> 7: Commit to Intake (payment complete)
  const handlePaymentComplete = useCallback(
    (sessionId: string) => {
      updateFormData({
        paymentSessionId: sessionId,
        paymentCompleted: true,
        paymentCompletedAt: new Date(),
      });
      goToNextStage();
    },
    [updateFormData, goToNextStage]
  );

  // Stage 7 -> 8: Intake to Deliver (intake submitted)
  const handleIntakeSubmit = useCallback(
    (responses: Record<string, string>, loomUrl: string) => {
      updateFormData({
        intakeResponses: responses,
        loomVideoUrl: loomUrl,
        intakeSubmittedAt: new Date(),
      });

      // In production, this would trigger an API call to save intake
      // and notify the assessment team

      goToNextStage();
    },
    [updateFormData, goToNextStage]
  );

  // Stage 8 -> 9: Deliver to Document (verdict received)
  const handleVerdictReceived = useCallback(
    (verdict: 'GO' | 'NO_GO' | 'NOT_YET', reasons: string[]) => {
      updateFormData({
        verdict: verdict === 'NOT_YET' ? 'CONDITIONAL_GO' : verdict,
        verdictReasons: reasons,
        verdictDeliveredAt: new Date(),
      });
      goToNextStage();
    },
    [updateFormData, goToNextStage]
  );

  // Stage 9 -> 10: Document to Exit
  const handleDocumentContinue = useCallback(() => {
    updateFormData({
      reportDeliveredAt: new Date(),
    });
    goToNextStage();
  }, [updateFormData, goToNextStage]);

  return (
    <div className="min-h-screen pt-4 sm:pt-6">
      <Section spacing="lg" className="relative overflow-hidden px-4 sm:px-6">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow" className="relative z-10">
          {/* Progress - Show after attract stage */}
          {stage !== 'attract' && (
            <BookProgressVisual
              currentStep={getStepNumber(stage)}
              totalSteps={STAGE_ORDER.length}
              stepLabels={stageLabels}
            />
          )}

          {/* Stage Content */}
          <div className="relative min-h-[400px] sm:min-h-[500px]">
            {/* Stage 1: Attract */}
            {stage === 'attract' && (
              <div
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
              >
                <AssessmentAttractStage formData={formData} onContinue={handleAttractContinue} />
              </div>
            )}

            {/* Stage 2: Qualify */}
            {stage === 'qualify' && (
              <div
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
              >
                <AssessmentQualifyStage
                  formData={formData}
                  errors={errors}
                  onFieldChange={handleFieldChange}
                  onContinue={handleQualifyContinue}
                  isLoading={isLoading}
                />
              </div>
            )}

            {/* Stage 3: Book (NO PRICING) */}
            {stage === 'book' && (
              <div
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
              >
                <AssessmentBookStage
                  formData={formData}
                  onBookingComplete={handleBookingComplete}
                  onContinue={goToNextStage}
                  onBack={goToPreviousStage}
                />
              </div>
            )}

            {/* Stage 4: Educate (PRICING REVEALED) */}
            {stage === 'educate' && (
              <div
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
              >
                <AssessmentEducateStage
                  formData={formData}
                  onVSLComplete={handleVSLComplete}
                  onBack={goToPreviousStage}
                />
              </div>
            )}

            {/* Stage 5: Confirm */}
            {stage === 'confirm' && (
              <div
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
              >
                <AssessmentConfirmStage
                  formData={formData}
                  onContinue={handleConfirmContinue}
                  onBack={goToPreviousStage}
                />
              </div>
            )}

            {/* Stage 6: Commit (Payment) */}
            {stage === 'commit' && (
              <div
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
              >
                <AssessmentCommitStage
                  formData={formData}
                  onPaymentComplete={handlePaymentComplete}
                  onBack={goToPreviousStage}
                />
              </div>
            )}

            {/* Stage 7: Intake */}
            {stage === 'intake' && (
              <div
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
              >
                <AssessmentIntakeStage
                  formData={formData}
                  questions={ASSESSMENT_INTAKE_QUESTIONS}
                  onSubmit={handleIntakeSubmit}
                  isLoading={isLoading}
                />
              </div>
            )}

            {/* Stage 8: Deliver (Verdict Call) */}
            {stage === 'deliver' && (
              <div
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
              >
                <AssessmentDeliverStage
                  formData={formData}
                  onVerdictReceived={handleVerdictReceived}
                  onBack={goToPreviousStage}
                />
              </div>
            )}

            {/* Stage 9: Document (Report) */}
            {stage === 'document' && (
              <div
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
              >
                <AssessmentDocumentStage
                  formData={formData}
                  onContinue={handleDocumentContinue}
                  onBack={goToPreviousStage}
                />
              </div>
            )}

            {/* Stage 10: Exit */}
            {stage === 'exit' && (
              <div
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
              >
                <AssessmentExitStage formData={formData} onNavigate={onNavigate} />
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default AssessmentFunnelPage;
