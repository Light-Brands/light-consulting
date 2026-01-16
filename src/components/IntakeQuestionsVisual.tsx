/**
 * Intake Questions Visual
 * CONCEPT: "The Preparation"
 * Intake questions form with minimalist design
 */

import React, { useEffect, useRef, useState } from 'react';
import { Input, Textarea } from './';
import { cn } from '../lib/utils';

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
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
          Help Us Prepare
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          These questions help us make the most of our time together.
        </p>
      </div>

      {/* Questions */}
      <div className="relative group">
        {/* Styled container */}
        <div className="relative z-10 bg-depth-elevated/20 border border-depth-border rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-radiance-gold/20">
          <div className="space-y-5">
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
                      className={cn(
                        "block w-full bg-depth-base border rounded-brand-btn text-text-primary focus:outline-none focus:ring-2 focus:ring-radiance-gold/20 focus:border-radiance-gold focus:bg-depth-elevated/30 transition-all duration-200 ease-out px-4 py-3.5 text-sm cursor-pointer",
                        "hover:border-radiance-gold/30 hover:bg-depth-elevated/10",
                        errors[question.id] ? 'border-error focus:ring-error/20 focus:border-error bg-error/5' : 'border-depth-border'
                      )}
                      value={answers[question.id] || ''}
                      onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    >
                      <option value="" disabled className="text-text-muted">Select an option...</option>
                      {question.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors[question.id] && (
                      <p className="text-error text-xs mt-1.5 font-medium">{errors[question.id]}</p>
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
