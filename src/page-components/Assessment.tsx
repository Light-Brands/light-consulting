/**
 * AI Go/No-Go Assessment Page
 * Light Brand Consulting
 *
 * Multi-stage assessment funnel based on the 10-stage strategy:
 * 1. Qualify - Self-qualification with disqualification messaging
 * 2. Book - Calendar booking (without pricing)
 * 3. Educate - VSL video (mandatory completion)
 * 4. Confirm - Booking confirmation
 * 5. Commit - Payment ($5,000)
 * 6. Intake - Questionnaire + Loom requirement
 * 7. Status - Assessment status/confirmation
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Container, Section, Button } from '../components/ui';
import { BookProgressVisual } from '../components';
import { AssessmentStage, AssessmentFormData, PageKey } from '../types';
import { ASSESSMENT_CONFIG, ASSESSMENT_INTAKE_QUESTIONS, ASSESSMENT_DISQUALIFIERS } from '../lib/constants';
import { isValidEmail } from '../lib/utils';

// Import assessment stage components
import { AssessmentQualifyStage } from '../components/assessment/AssessmentQualifyStage';
import { AssessmentBookStage } from '../components/assessment/AssessmentBookStage';
import { AssessmentEducateStage } from '../components/assessment/AssessmentEducateStage';
import { AssessmentConfirmStage } from '../components/assessment/AssessmentConfirmStage';
import { AssessmentCommitStage } from '../components/assessment/AssessmentCommitStage';
import { AssessmentIntakeStage } from '../components/assessment/AssessmentIntakeStage';
import { AssessmentStatusStage } from '../components/assessment/AssessmentStatusStage';

interface AssessmentPageProps {
  onNavigate: (page: PageKey) => void;
  initialStage?: AssessmentStage;
  assessmentId?: string;
}

// Map stages to step numbers for progress display
const STAGE_ORDER: AssessmentStage[] = ['qualify', 'book', 'educate', 'confirm', 'commit', 'intake', 'status'];

const getStepNumber = (stage: AssessmentStage): number => {
  return STAGE_ORDER.indexOf(stage) + 1;
};

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  onNavigate,
  initialStage = 'qualify',
  assessmentId,
}) => {
  const [stage, setStage] = useState<AssessmentStage>(initialStage);
  const [formData, setFormData] = useState<AssessmentFormData>({
    assessmentId,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Stage labels for progress indicator
  const stageLabels = STAGE_ORDER.map(s => ASSESSMENT_CONFIG.stageLabels[s]);

  // Update URL when stage changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('stage', stage);
    if (formData.assessmentId) {
      url.searchParams.set('id', formData.assessmentId);
    }
    window.history.replaceState({}, '', url.toString());
  }, [stage, formData.assessmentId]);

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
  const handleFieldChange = useCallback((field: string, value: string | boolean) => {
    updateFormData({ [field]: value });
  }, [updateFormData]);

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
    if (!formData.acceptsFixedPricing) {
      newErrors.acceptsFixedPricing = 'You must accept the fixed pricing';
    }
    if (!formData.openToNegativeVerdict) {
      newErrors.openToNegativeVerdict = 'You must accept that a "no" is a valid outcome';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle proceeding to next stage
  const handleNextStage = useCallback(async () => {
    const currentIndex = STAGE_ORDER.indexOf(stage);

    // Validation per stage
    if (stage === 'qualify' && !validateQualify()) {
      return;
    }

    // Create/update assessment submission
    if (stage === 'qualify') {
      setIsLoading(true);
      try {
        const response = await fetch('/api/assessment/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone,
          }),
        });

        const result = await response.json();
        if (result.success && result.assessmentId) {
          updateFormData({ assessmentId: result.assessmentId });
        }
      } catch (error) {
        console.error('Error creating assessment:', error);
        // Continue anyway for now
      }
      setIsLoading(false);
    }

    // Move to next stage
    if (currentIndex < STAGE_ORDER.length - 1) {
      setStage(STAGE_ORDER[currentIndex + 1]);
    }
  }, [stage, validateQualify, formData, updateFormData]);

  // Handle going back
  const handleBack = useCallback(() => {
    const currentIndex = STAGE_ORDER.indexOf(stage);
    if (currentIndex > 0) {
      setStage(STAGE_ORDER[currentIndex - 1]);
    }
  }, [stage]);

  // Handle VSL completion
  const handleVSLComplete = useCallback((watchPercentage: number) => {
    updateFormData({
      vslCompletedAt: new Date(),
      vslWatchPercentage: watchPercentage,
    });
    // Automatically proceed if VSL requirement is met
    if (watchPercentage >= ASSESSMENT_CONFIG.vsl.minimumWatchPercentage) {
      setStage('confirm');
    }
  }, [updateFormData]);

  // Handle booking complete
  const handleBookingComplete = useCallback((bookingId: string, bookedSlot: Date) => {
    updateFormData({
      bookingId,
      bookedSlot,
      bookingConfirmed: true,
    });
  }, [updateFormData]);

  // Handle payment complete
  const handlePaymentComplete = useCallback((sessionId: string) => {
    updateFormData({
      paymentSessionId: sessionId,
      paymentCompleted: true,
      paymentCompletedAt: new Date(),
    });
    setStage('intake');
  }, [updateFormData]);

  // Handle intake submission
  const handleIntakeSubmit = useCallback(async (responses: Record<string, string>, loomUrl: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/assessment/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId: formData.assessmentId,
          intakeResponses: responses,
          loomVideoUrl: loomUrl,
        }),
      });

      const result = await response.json();
      if (result.success) {
        updateFormData({
          intakeResponses: responses,
          loomVideoUrl: loomUrl,
          intakeSubmittedAt: new Date(),
        });
        setStage('status');
      }
    } catch (error) {
      console.error('Error submitting intake:', error);
      setErrors({ intake: 'Failed to submit intake. Please try again.' });
    }
    setIsLoading(false);
  }, [formData.assessmentId, updateFormData]);

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow" className="relative z-10">
          {/* Progress */}
          <BookProgressVisual
            currentStep={getStepNumber(stage)}
            totalSteps={STAGE_ORDER.length}
            stepLabels={stageLabels}
          />

          {/* Stage Content */}
          <div className="relative min-h-[500px]">
            {/* Qualify Stage */}
            {stage === 'qualify' && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <AssessmentQualifyStage
                  formData={formData}
                  errors={errors}
                  onFieldChange={handleFieldChange}
                  onContinue={handleNextStage}
                  isLoading={isLoading}
                />
              </div>
            )}

            {/* Book Stage */}
            {stage === 'book' && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <AssessmentBookStage
                  formData={formData}
                  onBookingComplete={handleBookingComplete}
                  onContinue={handleNextStage}
                  onBack={handleBack}
                />
              </div>
            )}

            {/* Educate Stage (VSL) */}
            {stage === 'educate' && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <AssessmentEducateStage
                  formData={formData}
                  onVSLComplete={handleVSLComplete}
                  onBack={handleBack}
                />
              </div>
            )}

            {/* Confirm Stage */}
            {stage === 'confirm' && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <AssessmentConfirmStage
                  formData={formData}
                  onContinue={handleNextStage}
                  onBack={handleBack}
                />
              </div>
            )}

            {/* Commit Stage (Payment) */}
            {stage === 'commit' && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <AssessmentCommitStage
                  formData={formData}
                  onPaymentComplete={handlePaymentComplete}
                  onBack={handleBack}
                />
              </div>
            )}

            {/* Intake Stage */}
            {stage === 'intake' && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <AssessmentIntakeStage
                  formData={formData}
                  questions={ASSESSMENT_INTAKE_QUESTIONS}
                  onSubmit={handleIntakeSubmit}
                  isLoading={isLoading}
                  error={errors.intake}
                />
              </div>
            )}

            {/* Status Stage */}
            {stage === 'status' && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <AssessmentStatusStage
                  formData={formData}
                  onNavigate={onNavigate}
                />
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default AssessmentPage;
