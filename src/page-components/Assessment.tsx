/**
 * AI Go/No-Go Assessment Page
 * Light Brand Consulting
 *
 * Simplified assessment funnel:
 * 1. Qualify - Self-qualification (no pricing shown)
 * 2. Educate - VSL video (pricing revealed here)
 * 3. Book - Calendar booking (after VSL, price-aware)
 * 4. Status - Confirmation
 *
 * Creates a lead with source tracking when user completes qualification.
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Container, Section } from '../components/ui';
import { BookProgressVisual } from '../components';
import { AssessmentStage, AssessmentFormData, PageKey } from '../types';
import { ASSESSMENT_CONFIG } from '../lib/constants';
import { isValidEmail, scrollToTop } from '../lib/utils';

// Import assessment stage components
import { AssessmentQualifyStage } from '../components/assessment/AssessmentQualifyStage';
import { AssessmentBookStage } from '../components/assessment/AssessmentBookStage';
import { AssessmentEducateStage } from '../components/assessment/AssessmentEducateStage';
import { AssessmentStatusStage } from '../components/assessment/AssessmentStatusStage';

interface AssessmentPageProps {
  onNavigate: (page: PageKey) => void;
  initialStage?: AssessmentStage;
  leadId?: string;
  source?: string; // Track where the lead came from
}

// New simplified stage order
const STAGE_ORDER: AssessmentStage[] = ['qualify', 'educate', 'book', 'status'];

const getStepNumber = (stage: AssessmentStage): number => {
  return STAGE_ORDER.indexOf(stage) + 1;
};

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  onNavigate,
  initialStage = 'qualify',
  leadId,
  source = 'assessment', // Default source is the assessment funnel
}) => {
  const [stage, setStage] = useState<AssessmentStage>(initialStage);
  const [formData, setFormData] = useState<AssessmentFormData>({
    leadId,
    source,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Stage labels for progress indicator
  const stageLabels = STAGE_ORDER.map(s => ASSESSMENT_CONFIG.stageLabels[s]);

  // Update URL when stage changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('stage', stage);
    if (formData.leadId) {
      url.searchParams.set('lead_id', formData.leadId);
    }
    window.history.replaceState({}, '', url.toString());
  }, [stage, formData.leadId]);

  // Auto-scroll to top when stage changes
  useEffect(() => {
    scrollToTop();
  }, [stage]);

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

  // Validate qualification stage (simplified - no pricing acceptance required yet)
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

  // Handle proceeding to next stage
  const handleNextStage = useCallback(async () => {
    const currentIndex = STAGE_ORDER.indexOf(stage);

    // Validation per stage
    if (stage === 'qualify' && !validateQualify()) {
      return;
    }

    // Create lead when completing qualification
    if (stage === 'qualify') {
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
            source: formData.source || 'assessment',
          }),
        });

        const result = await response.json();
        if (result.success && result.leadId) {
          updateFormData({ leadId: result.leadId });
        }
      } catch (error) {
        console.error('Error creating lead:', error);
        // Continue anyway - lead creation shouldn't block the flow
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

  // Handle VSL completion - pricing is now revealed, proceed to booking
  const handleVSLComplete = useCallback((watchPercentage: number) => {
    updateFormData({
      vslCompletedAt: new Date(),
      vslWatchPercentage: watchPercentage,
    });
    // Proceed to booking stage after VSL is complete
    if (watchPercentage >= ASSESSMENT_CONFIG.vsl.minimumWatchPercentage) {
      setStage('book');
    }
  }, [updateFormData]);

  // Handle booking complete - this is the final action
  const handleBookingComplete = useCallback((bookingId: string, bookedSlot: Date) => {
    updateFormData({
      bookingId,
      bookedSlot,
      bookingConfirmed: true,
    });

    // Update lead with booking info
    if (formData.leadId) {
      fetch('/api/assessment/lead', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: formData.leadId,
          bookingId,
          bookedSlot: bookedSlot.toISOString(),
          vslCompleted: true,
          vslWatchPercentage: formData.vslWatchPercentage,
        }),
      }).catch(console.error);
    }

    // Move to status/confirmation
    setStage('status');
  }, [updateFormData, formData.leadId, formData.vslWatchPercentage]);

  return (
    <div className="min-h-screen pt-4 sm:pt-6">
      <Section spacing="lg" className="relative overflow-hidden px-4 sm:px-6">
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
          <div className="relative min-h-[400px] sm:min-h-[500px]">
            {/* Qualify Stage - No pricing shown */}
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

            {/* Educate Stage (VSL) - Pricing revealed here */}
            {stage === 'educate' && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <AssessmentEducateStage
                  formData={formData}
                  onVSLComplete={handleVSLComplete}
                  onBack={handleBack}
                />
              </div>
            )}

            {/* Book Stage - After VSL, user is price-aware */}
            {stage === 'book' && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <AssessmentBookStage
                  formData={formData}
                  onBookingComplete={handleBookingComplete}
                  onContinue={() => setStage('status')}
                  onBack={handleBack}
                />
              </div>
            )}

            {/* Status Stage - Confirmation */}
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
