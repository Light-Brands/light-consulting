/**
 * Booking Page - AI Document Analysis
 * Light Brand Consulting
 *
 * Ultra-frictionless 3-step booking flow:
 * 1. Upload Document + Contact Info (combined)
 * 2. AI Analysis (automatic)
 * 3. Report Display + Auto-Submit (combined)
 */

'use client';

import React, { useState, useCallback } from 'react';
import {
  BookProgressVisual,
  DocumentUploadVisual,
  AIAnalysisVisual,
  ValuePropositionReport,
} from '../components';
import { Container, Section } from '../components/ui';
import { AIBookingFormData, AIReport, PageKey } from '../types';
import { isValidEmail } from '../lib/utils';

interface BookPageProps {
  onNavigate: (page: PageKey) => void;
}

type AnalysisPhase = 'reading' | 'understanding' | 'identifying' | 'creating';

export const BookPage: React.FC<BookPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AIBookingFormData>({
    document: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [analysisPhase, setAnalysisPhase] = useState<AnalysisPhase>('reading');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const stepLabels = [
    'Upload Document',
    'AI Analysis',
    'Your Report',
  ];

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.document) {
      newErrors.document = 'Please upload a document';
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
  };

  const updateFormData = useCallback((updates: Partial<AIBookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    // Clear related errors
    Object.keys(updates).forEach((key) => {
      if (errors[key]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[key];
          return newErrors;
        });
      }
    });
  }, [errors]);

  const handleDocumentChange = useCallback((file: File | null) => {
    updateFormData({ document: file });
  }, [updateFormData]);

  const handleFieldChange = useCallback((field: string, value: string) => {
    if (field === 'documentError') {
      setErrors((prev) => ({ ...prev, document: value }));
    } else {
      updateFormData({ [field]: value });
    }
  }, [updateFormData]);

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

  const analyzeDocument = async () => {
    if (!validateStep1()) return;

    // Move to analysis step
    setStep(2);
    setAnalysisError(null);
    setAnalysisProgress(0);
    updateFormData({ isAnalyzing: true });

    try {
      // Create form data for upload
      const uploadData = new FormData();
      uploadData.append('file', formData.document!);
      uploadData.append('name', formData.name!);
      uploadData.append('email', formData.email!);
      if (formData.company) {
        uploadData.append('company', formData.company);
      }

      // Start progress simulation in parallel with API call
      const progressPromise = (async () => {
        await simulateProgress(0, 25, 'reading', 3000);
        await simulateProgress(25, 50, 'understanding', 4000);
        await simulateProgress(50, 75, 'identifying', 3000);
        await simulateProgress(75, 95, 'creating', 5000);
      })();

      // Make API call
      const response = await fetch('/api/analyze-documents', {
        method: 'POST',
        body: uploadData,
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

      // Update form data with report and move to final step
      updateFormData({
        aiReport: result.report as AIReport,
        isAnalyzing: false,
        isComplete: true,
        leadId: result.leadId,
      });

      setStep(3);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
      updateFormData({ isAnalyzing: false });
    }
  };

  const handleReadyToAnalyze = useCallback(() => {
    // Auto-trigger analysis when all fields are ready
    analyzeDocument();
  }, [formData]);

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
            {/* Step 1: Document Upload + Contact Info */}
            {step === 1 && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <DocumentUploadVisual
                  formData={{
                    document: formData.document,
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                  }}
                  errors={errors}
                  onDocumentChange={handleDocumentChange}
                  onFieldChange={handleFieldChange}
                  onReady={handleReadyToAnalyze}
                />
              </div>
            )}

            {/* Step 2: AI Analysis */}
            {step === 2 && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <AIAnalysisVisual
                  fileName={formData.document?.name}
                  progress={analysisProgress}
                  currentPhase={analysisPhase}
                  error={analysisError}
                />
              </div>
            )}

            {/* Step 3: Report Display */}
            {step === 3 && formData.aiReport && (
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <ValuePropositionReport
                  report={formData.aiReport}
                  userName={formData.name || 'Valued Client'}
                  onHomeClick={() => onNavigate('home')}
                  onContactClick={() => onNavigate('contact')}
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
