/**
 * Booking Page - AI Readiness Diagnostic
 * Light Brand Consulting
 *
 * 3-step booking flow:
 * 1. Website URL + Contact Info (with manual trigger button)
 * 2. AI Analysis (shows progress with enhanced phases)
 * 3. Readiness Report + Book Call (with business intelligence)
 */

'use client';

import React, { useState, useCallback } from 'react';
import {
  BookProgressVisual,
  WebsiteInputVisual,
  AIAnalysisVisual,
  ReadinessReport,
} from '../components';
import { Container, Section, Button } from '../components/ui';
import { AIBookingFormData, WebsiteAnalysis, PageKey } from '../types';
import { isValidEmail } from '../lib/utils';
import type { BusinessIntelligence } from '@/types/business-intelligence';

interface BookPageProps {
  onNavigate: (page: PageKey) => void;
}

// Enhanced analysis phases for the UI
type AnalysisPhase =
  | 'scraping'
  | 'tech_detection'
  | 'business_analysis'
  | 'digital_presence'
  | 'technical_audit'
  | 'ai_readiness'
  | 'operations_analysis'
  | 'generating_report';

interface EnhancedFormData extends AIBookingFormData {
  businessIntelligence?: BusinessIntelligence;
  fullReadinessReport?: string;
}

export const BookPage: React.FC<BookPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EnhancedFormData>({
    websiteUrl: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [analysisPhase, setAnalysisPhase] = useState<AnalysisPhase>('scraping');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const stepLabels = [
    'Enter Website',
    'AI Analysis',
    'Your Assessment',
  ];

  const validateStep1 = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.websiteUrl?.trim()) {
      newErrors.websiteUrl = 'Website URL is required';
    } else {
      try {
        const testUrl = formData.websiteUrl.startsWith('http')
          ? formData.websiteUrl
          : `https://${formData.websiteUrl}`;
        new URL(testUrl);
      } catch {
        newErrors.websiteUrl = 'Please enter a valid website URL';
      }
    }
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.websiteUrl, formData.name, formData.email]);

  const updateFormData = useCallback((updates: Partial<EnhancedFormData>) => {
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

  const handleFieldChange = useCallback((field: string, value: string) => {
    updateFormData({ [field]: value });
  }, [updateFormData]);

  // Enhanced progress simulation with more phases
  const simulateProgress = (
    startProgress: number,
    endProgress: number,
    phase: AnalysisPhase,
    duration: number
  ): Promise<void> => {
    return new Promise((resolve) => {
      setAnalysisPhase(phase);
      const steps = 20;
      const stepDuration = duration / steps;
      const progressIncrement = (endProgress - startProgress) / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        setAnalysisProgress(startProgress + progressIncrement * currentStep);

        if (currentStep >= steps) {
          clearInterval(interval);
          resolve();
        }
      }, stepDuration);
    });
  };

  const handleGoBack = useCallback(() => {
    setStep(1);
    setAnalysisError(null);
    setAnalysisProgress(0);
    setIsAnalyzing(false);
    updateFormData({ isAnalyzing: false });
  }, [updateFormData]);

  const analyzeWebsite = useCallback(async () => {
    if (!validateStep1()) return;
    if (isAnalyzing) return;

    // Move to analysis step
    setIsAnalyzing(true);
    setStep(2);
    setAnalysisError(null);
    setAnalysisProgress(0);
    updateFormData({ isAnalyzing: true });

    try {
      // Normalize URL
      const websiteUrl = formData.websiteUrl?.startsWith('http')
        ? formData.websiteUrl
        : `https://${formData.websiteUrl}`;

      // Start enhanced progress simulation in parallel with API call
      const progressPromise = (async () => {
        await simulateProgress(0, 12, 'scraping', 3000);
        await simulateProgress(12, 25, 'tech_detection', 2000);
        await simulateProgress(25, 40, 'business_analysis', 4000);
        await simulateProgress(40, 55, 'digital_presence', 3000);
        await simulateProgress(55, 70, 'technical_audit', 2500);
        await simulateProgress(70, 85, 'ai_readiness', 3000);
        await simulateProgress(85, 95, 'operations_analysis', 2500);
        await simulateProgress(95, 98, 'generating_report', 2000);
      })();

      // Make API call
      const response = await fetch('/api/analyze-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteUrl,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
        }),
      });

      const result = await response.json();

      // Wait for progress animation to catch up
      await progressPromise;
      setAnalysisProgress(100);

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Analysis failed');
      }

      // Short delay to show 100% before transitioning
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update form data with enhanced analysis and move to final step
      updateFormData({
        websiteAnalysis: result.analysis as WebsiteAnalysis,
        businessIntelligence: result.analysis?.businessIntelligence,
        fullReadinessReport: result.analysis?.fullReadinessReport,
        isAnalyzing: false,
        isComplete: true,
        leadId: result.leadId,
      });

      setIsAnalyzing(false);
      setStep(3);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
      setIsAnalyzing(false);
      updateFormData({ isAnalyzing: false });
    }
  }, [validateStep1, isAnalyzing, formData.websiteUrl, formData.name, formData.email, formData.company, formData.phone, updateFormData]);

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <Section spacing="lg" className="relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-radiance-gold/3 to-transparent blur-[100px] pointer-events-none" />

        <Container size="narrow" className="relative z-10">
          {/* Progress */}
          <BookProgressVisual
            currentStep={step}
            totalSteps={3}
            stepLabels={stepLabels}
          />

          {/* Step Content */}
          <div className="relative min-h-[500px]">
            {/* Step 1: Website URL + Contact Info */}
            {step === 1 && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <WebsiteInputVisual
                  formData={{
                    websiteUrl: formData.websiteUrl,
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    phone: formData.phone,
                  }}
                  errors={errors}
                  onFieldChange={handleFieldChange}
                  onAnalyze={analyzeWebsite}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            )}

            {/* Step 2: AI Analysis with Enhanced Progress */}
            {step === 2 && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <AIAnalysisVisual
                  fileName={formData.websiteUrl}
                  progress={analysisProgress}
                  currentPhase={analysisPhase}
                  error={analysisError}
                  onGoBack={handleGoBack}
                  showDetailedProgress={true}
                />
              </div>
            )}

            {/* Step 3: Enhanced Readiness Report with Business Intelligence */}
            {step === 3 && formData.websiteAnalysis && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <ReadinessReport
                  readinessScore={formData.websiteAnalysis.readinessScore}
                  readinessBrief={formData.websiteAnalysis.readinessBrief}
                  capacityGapBrief={formData.websiteAnalysis.capacityGapBrief}
                  techStack={formData.websiteAnalysis.techStack}
                  businessIntelligence={formData.businessIntelligence}
                  websiteStory={formData.websiteAnalysis.websiteStory}
                  leadId={formData.leadId}
                  onBookCall={(calendlyLink) => {
                    // Handle booking callback
                    console.log('Booking call:', calendlyLink);
                  }}
                />
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default BookPage;
