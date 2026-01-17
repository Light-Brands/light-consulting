/**
 * Assessment Qualify Stage
 * Self-qualification landing with disqualification messaging
 * Mobile-optimized for touch interactions
 *
 * NOTE: Pricing is NOT shown here - it's revealed in the VSL (Educate stage)
 */

'use client';

import React from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';
import { ASSESSMENT_CONFIG, ASSESSMENT_DISQUALIFIERS } from '@/lib/constants';

interface AssessmentQualifyStageProps {
  formData: AssessmentFormData;
  errors: Record<string, string>;
  onFieldChange: (field: string, value: string | boolean) => void;
  onContinue: () => void;
  isLoading: boolean;
}

export const AssessmentQualifyStage: React.FC<AssessmentQualifyStageProps> = ({
  formData,
  errors,
  onFieldChange,
  onContinue,
  isLoading,
}) => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header - No pricing shown */}
      <div className="text-center space-y-3 md:space-y-4 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary leading-tight">
          {ASSESSMENT_CONFIG.name}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {ASSESSMENT_CONFIG.tagline}
        </p>
        <p className="text-xs sm:text-sm text-text-muted italic">
          {ASSESSMENT_CONFIG.description}
        </p>
      </div>

      {/* Disqualification Section - Stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Not For */}
        <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4 flex items-center gap-2">
            <span className="text-red-400 text-lg">&#10005;</span>
            <span>This is NOT for you if:</span>
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {ASSESSMENT_DISQUALIFIERS.notFor.map((item, index) => (
              <li key={index} className="text-sm sm:text-base text-text-muted flex items-start gap-2">
                <span className="text-red-400 mt-0.5 flex-shrink-0">&#8226;</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ideal For */}
        <div className="bg-depth-surface/50 border border-radiance-gold/20 rounded-xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4 flex items-center gap-2">
            <span className="text-radiance-gold text-lg">&#10003;</span>
            <span>This IS for you if:</span>
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {ASSESSMENT_DISQUALIFIERS.idealFor.map((item, index) => (
              <li key={index} className="text-sm sm:text-base text-text-secondary flex items-start gap-2">
                <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#8226;</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-4 sm:p-6 md:p-8">
        <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-4 sm:mb-6">
          Ready to proceed? Enter your details.
        </h3>

        {/* Form fields - single column on mobile */}
        <div className="space-y-4 mb-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => onFieldChange('name', e.target.value)}
              placeholder="Your full name"
              autoComplete="name"
              className={`w-full px-4 py-3.5 sm:py-3 bg-depth-base border rounded-lg text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors ${
                errors.name ? 'border-red-400' : 'border-depth-border'
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => onFieldChange('email', e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              className={`w-full px-4 py-3.5 sm:py-3 bg-depth-base border rounded-lg text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors ${
                errors.email ? 'border-red-400' : 'border-depth-border'
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Company & Phone - 2 columns on tablet+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => onFieldChange('company', e.target.value)}
                placeholder="Your company"
                autoComplete="organization"
                className="w-full px-4 py-3.5 sm:py-3 bg-depth-base border border-depth-border rounded-lg text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => onFieldChange('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                autoComplete="tel"
                className="w-full px-4 py-3.5 sm:py-3 bg-depth-base border border-depth-border rounded-lg text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Qualification Checkboxes - Touch-optimized (No pricing checkboxes) */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
            Confirm your eligibility
          </h4>

          {/* Decision Maker - Large touch target (No $ amount mentioned) */}
          <label className={`flex items-start gap-3 sm:gap-4 cursor-pointer p-4 rounded-xl border transition-colors active:scale-[0.99] ${
            formData.isDecisionMaker
              ? 'border-radiance-gold/50 bg-radiance-gold/5'
              : errors.isDecisionMaker
                ? 'border-red-400/50'
                : 'border-depth-border'
          }`}>
            <div className="flex-shrink-0 pt-0.5">
              <input
                type="checkbox"
                checked={formData.isDecisionMaker || false}
                onChange={(e) => onFieldChange('isDecisionMaker', e.target.checked)}
                className="w-6 h-6 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold/50 cursor-pointer"
              />
            </div>
            <span className="text-sm sm:text-base text-text-secondary leading-relaxed">
              I am a <strong className="text-text-primary">decision-maker</strong> with authority to make investment decisions for my business.
            </span>
          </label>
          {errors.isDecisionMaker && (
            <p className="text-sm text-red-400 ml-10">{errors.isDecisionMaker}</p>
          )}

          {/* Open to Negative Verdict - Large touch target */}
          <label className={`flex items-start gap-3 sm:gap-4 cursor-pointer p-4 rounded-xl border transition-colors active:scale-[0.99] ${
            formData.openToNegativeVerdict
              ? 'border-radiance-gold/50 bg-radiance-gold/5'
              : errors.openToNegativeVerdict
                ? 'border-red-400/50'
                : 'border-depth-border'
          }`}>
            <div className="flex-shrink-0 pt-0.5">
              <input
                type="checkbox"
                checked={formData.openToNegativeVerdict || false}
                onChange={(e) => onFieldChange('openToNegativeVerdict', e.target.checked)}
                className="w-6 h-6 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold/50 cursor-pointer"
              />
            </div>
            <span className="text-sm sm:text-base text-text-secondary leading-relaxed">
              I am <strong className="text-text-primary">open to receiving a &quot;NO-GO&quot; verdict</strong>. I understand that a &quot;no&quot; is a successful outcome that saves me from wasted investment.
            </span>
          </label>
          {errors.openToNegativeVerdict && (
            <p className="text-sm text-red-400 ml-10">{errors.openToNegativeVerdict}</p>
          )}
        </div>

        {/* Continue Button - Large touch target */}
        <Button
          onClick={onContinue}
          disabled={isLoading}
          className="w-full min-h-[52px] text-base sm:text-lg"
          size="lg"
        >
          {isLoading ? 'Processing...' : 'Continue to Learn More'}
        </Button>

        <p className="text-center text-text-muted text-xs sm:text-sm mt-4 leading-relaxed">
          Next, you&apos;ll watch a short video that explains the assessment process and investment.
        </p>
      </div>
    </div>
  );
};

export default AssessmentQualifyStage;
