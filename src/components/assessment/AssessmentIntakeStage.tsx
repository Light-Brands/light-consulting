/**
 * Assessment Intake Stage
 * Structured questionnaire + Loom video requirement
 * Mobile-optimized with large touch targets and scrollable form
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
        newErrors[q.id] = 'Required';
      }
    });

    // Validate Loom URL
    if (!loomUrl.trim()) {
      newErrors.loomUrl = 'Loom video is required';
    } else if (!validateLoomUrl(loomUrl)) {
      newErrors.loomUrl = 'Enter a valid Loom URL';
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
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
          Complete Your Intake
        </h2>
        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          Answer thoroughly. Your responses inform your assessment.
          <strong className="text-text-primary block sm:inline mt-1 sm:mt-0"> Incomplete intake pauses your assessment.</strong>
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 sm:p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Questionnaire */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-4 sm:p-6 md:p-8">
        <div className="space-y-5 sm:space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} id={question.id} className="space-y-2">
              <label className="block">
                <span className="text-sm sm:text-base font-medium text-text-secondary leading-relaxed">
                  {index + 1}. {question.question}
                  {question.required && <span className="text-radiance-gold ml-1">*</span>}
                </span>
                {question.helpText && (
                  <span className="block text-xs text-text-muted mt-1 leading-relaxed">
                    {question.helpText}
                  </span>
                )}
              </label>

              {question.type === 'textarea' && (
                <textarea
                  value={responses[question.id] || ''}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  rows={3}
                  className={`w-full px-3 sm:px-4 py-3 bg-depth-base border rounded-lg text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors resize-none ${
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
                  className={`w-full px-3 sm:px-4 py-3.5 sm:py-3 bg-depth-base border rounded-lg text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors ${
                    validationErrors[question.id] ? 'border-red-400' : 'border-depth-border'
                  }`}
                  placeholder="Your answer..."
                />
              )}

              {question.type === 'select' && question.options && (
                <select
                  value={responses[question.id] || ''}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  className={`w-full px-3 sm:px-4 py-3.5 sm:py-3 bg-depth-base border rounded-lg text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors appearance-none ${
                    validationErrors[question.id] ? 'border-red-400' : 'border-depth-border'
                  }`}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem' }}
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
                <p className="text-xs sm:text-sm text-red-400">{validationErrors[question.id]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Loom Video Requirement */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-radiance-gold text-xl sm:text-2xl flex-shrink-0">&#127909;</span>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                Required: Loom Video
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm mt-1 leading-relaxed">
                Record a 5-10 min video walking through your business. Show tools, explain workflows, demonstrate pain points.
                <strong className="block mt-1">No video = no assessment.</strong>
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
              autoComplete="url"
              className={`w-full px-3 sm:px-4 py-3.5 sm:py-3 bg-depth-base border rounded-lg text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors ${
                validationErrors.loomUrl ? 'border-red-400' : 'border-depth-border'
              }`}
            />
            {validationErrors.loomUrl && (
              <p className="text-xs sm:text-sm text-red-400">{validationErrors.loomUrl}</p>
            )}
          </div>

          <div className="bg-depth-base/50 rounded-lg p-3">
            <p className="text-xs sm:text-sm text-text-muted">
              <strong className="text-text-secondary">Don&apos;t have Loom?</strong>{' '}
              <a
                href="https://www.loom.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-radiance-gold hover:underline"
              >
                Sign up for free
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button - Sticky on mobile */}
      <div className="sticky bottom-0 bg-depth-base/95 backdrop-blur-sm -mx-4 px-4 py-3 sm:relative sm:mx-0 sm:px-0 sm:py-4 sm:bg-transparent sm:backdrop-blur-none">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full min-h-[52px] text-base sm:text-lg"
          size="lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-depth-base/30 border-t-depth-base rounded-full animate-spin" />
              <span>Submitting...</span>
            </span>
          ) : (
            'Submit Intake'
          )}
        </Button>

        <p className="text-center text-text-muted text-xs sm:text-sm mt-3 leading-relaxed">
          Your assessment will be reviewed and verdict call will proceed as scheduled.
        </p>
      </div>
    </div>
  );
};

export default AssessmentIntakeStage;
