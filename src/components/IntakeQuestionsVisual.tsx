/**
 * Intake Questions Visual
 * CONCEPT: "The Preparation"
 * Intake questions form with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';
import { Input, Textarea } from './';

interface IntakeQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select';
  required: boolean;
  options?: string[];
}

interface IntakeQuestionsVisualProps {
  questions: IntakeQuestion[];
  answers: Record<string, string>;
  errors: Record<string, string>;
  onAnswerChange: (questionId: string, value: string) => void;
}

export const IntakeQuestionsVisual: React.FC<IntakeQuestionsVisualProps> = ({
  questions,
  answers,
  errors,
  onAnswerChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Help Us Prepare
        </h1>
        <p className="text-text-secondary">
          These questions help us make the most of our time together.
        </p>
      </div>

      {/* Questions */}
      <div className="relative">
        {/* Hover glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-b from-radiance-gold/5 to-transparent blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        {/* Styled container */}
        <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          {/* Technical header */}
          <div className="flex items-center gap-2 border-b border-depth-border pb-4 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase">
              Form::Intake_Questions
            </span>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <div
                key={question.id}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {question.type === 'select' ? (
                  <div>
                    <label className="block text-xs font-bold text-radiance-gold uppercase tracking-wider mb-2">
                      {question.question}
                      {question.required && <span className="text-error"> *</span>}
                    </label>
                    <select
                      className="block w-full bg-depth-base border border-depth-border rounded-brand-btn text-text-primary focus:outline-none focus:ring-2 focus:ring-radiance-gold/20 focus:border-radiance-gold transition-all duration-300 px-4 py-3.5 text-sm"
                      value={answers[question.id] || ''}
                      onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    >
                      <option value="">Select an option...</option>
                      {question.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors[question.id] && (
                      <p className="text-error text-xs mt-1">{errors[question.id]}</p>
                    )}
                  </div>
                ) : question.type === 'textarea' ? (
                  <Textarea
                    label={question.question + (question.required ? ' *' : '')}
                    value={answers[question.id] || ''}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    error={errors[question.id]}
                    rows={4}
                  />
                ) : (
                  <Input
                    label={question.question + (question.required ? ' *' : '')}
                    value={answers[question.id] || ''}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    error={errors[question.id]}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeQuestionsVisual;
