/**
 * Assessment Intake Stage
 * Structured questionnaire + Loom video requirement
 */

'use client';

import React, { useState } from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';

interface IntakeQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox';
  options?: string[];
  required: boolean;
  helpText?: string;
}

interface AssessmentIntakeStageProps {
  formData: AssessmentFormData;
  questions: IntakeQuestion[];
  onSubmit: (responses: Record<string, string>, loomUrl: string) => void;
  isLoading: boolean;
  error?: string;
}

export const AssessmentIntakeStage: React.FC<AssessmentIntakeStageProps> = ({
  formData,
  questions,
  onSubmit,
  isLoading,
  error,
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loomUrl, setLoomUrl] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    // Clear error for this field
    if (validationErrors[questionId]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateLoomUrl = (url: string): boolean => {
    if (!url) return false;
    // Accept loom.com URLs
    return url.includes('loom.com/share/') || url.includes('loom.com/embed/');
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    // Validate required questions
    questions.forEach((q) => {
      if (q.required && !responses[q.id]?.trim()) {
        newErrors[q.id] = 'This field is required';
      }
    });

    // Validate Loom URL
    if (!loomUrl.trim()) {
      newErrors.loomUrl = 'Loom video is required';
    } else if (!validateLoomUrl(loomUrl)) {
      newErrors.loomUrl = 'Please enter a valid Loom share URL';
    }

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      // Scroll to first error
      const firstErrorId = Object.keys(newErrors)[0];
      document.getElementById(firstErrorId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    onSubmit(responses, loomUrl);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
          Complete Your Intake
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto">
          Answer these questions thoroughly. Your responses directly inform your assessment.
          <strong className="text-text-primary"> Incomplete intake pauses your assessment.</strong>
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Questionnaire */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-6 md:p-8">
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} id={question.id} className="space-y-2">
              <label className="block">
                <span className="text-sm font-medium text-text-secondary">
                  {index + 1}. {question.question}
                  {question.required && <span className="text-radiance-gold ml-1">*</span>}
                </span>
                {question.helpText && (
                  <span className="block text-xs text-text-muted mt-1">
                    {question.helpText}
                  </span>
                )}
              </label>

              {question.type === 'textarea' && (
                <textarea
                  value={responses[question.id] || ''}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 bg-depth-base border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors resize-none ${
                    validationErrors[question.id] ? 'border-red-400' : 'border-depth-border'
                  }`}
                  placeholder="Your answer..."
                />
              )}

              {question.type === 'text' && (
                <input
                  type="text"
                  value={responses[question.id] || ''}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  className={`w-full px-4 py-3 bg-depth-base border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors ${
                    validationErrors[question.id] ? 'border-red-400' : 'border-depth-border'
                  }`}
                  placeholder="Your answer..."
                />
              )}

              {question.type === 'select' && question.options && (
                <select
                  value={responses[question.id] || ''}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  className={`w-full px-4 py-3 bg-depth-base border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors ${
                    validationErrors[question.id] ? 'border-red-400' : 'border-depth-border'
                  }`}
                >
                  <option value="">Select an option...</option>
                  {question.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {validationErrors[question.id] && (
                <p className="text-sm text-red-400">{validationErrors[question.id]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Loom Video Requirement */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-6 md:p-8">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-radiance-gold text-2xl">&#127909;</span>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                Required: Loom Video Walkthrough
              </h3>
              <p className="text-text-secondary text-sm mt-1">
                Record a 5-10 minute Loom video walking us through your business. Show us your tools,
                explain your workflows, and demonstrate where you&apos;re stuck. <strong>No video = no assessment proceeds.</strong>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              Loom Share URL <span className="text-radiance-gold">*</span>
            </label>
            <input
              type="url"
              id="loomUrl"
              value={loomUrl}
              onChange={(e) => {
                setLoomUrl(e.target.value);
                if (validationErrors.loomUrl) {
                  setValidationErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.loomUrl;
                    return newErrors;
                  });
                }
              }}
              placeholder="https://www.loom.com/share/..."
              className={`w-full px-4 py-3 bg-depth-base border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors ${
                validationErrors.loomUrl ? 'border-red-400' : 'border-depth-border'
              }`}
            />
            {validationErrors.loomUrl && (
              <p className="text-sm text-red-400">{validationErrors.loomUrl}</p>
            )}
          </div>

          <div className="bg-depth-base/50 rounded-lg p-4">
            <p className="text-sm text-text-muted">
              <strong className="text-text-secondary">Don&apos;t have Loom?</strong>{' '}
              <a
                href="https://www.loom.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-radiance-gold hover:underline"
              >
                Sign up for free
              </a>{' '}
              and record your screen in minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-depth-base/30 border-t-depth-base rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            'Submit Intake & Finalize Assessment'
          )}
        </Button>

        <p className="text-center text-text-muted text-sm mt-4">
          Once submitted, your assessment will be reviewed and your verdict call will proceed as scheduled.
        </p>
      </div>
    </div>
  );
};

export default AssessmentIntakeStage;
