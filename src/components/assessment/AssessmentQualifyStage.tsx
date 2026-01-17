/**
 * Assessment Qualify Stage
 * Self-qualification landing with disqualification messaging
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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
          {ASSESSMENT_CONFIG.name}
        </h1>
        <p className="text-xl text-radiance-gold font-medium">
          ${ASSESSMENT_CONFIG.price.toLocaleString()} Fixed Fee
        </p>
        <p className="text-text-secondary max-w-2xl mx-auto">
          {ASSESSMENT_CONFIG.tagline}
        </p>
        <p className="text-text-muted italic">
          {ASSESSMENT_CONFIG.description}
        </p>
      </div>

      {/* Disqualification Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Not For */}
        <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span className="text-red-400">&#10005;</span> This is NOT for you if:
          </h3>
          <ul className="space-y-2">
            {ASSESSMENT_DISQUALIFIERS.notFor.map((item, index) => (
              <li key={index} className="text-text-muted flex items-start gap-2">
                <span className="text-red-400 mt-1">&#8226;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ideal For */}
        <div className="bg-depth-surface/50 border border-radiance-gold/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span className="text-radiance-gold">&#10003;</span> This IS for you if:
          </h3>
          <ul className="space-y-2">
            {ASSESSMENT_DISQUALIFIERS.idealFor.map((item, index) => (
              <li key={index} className="text-text-secondary flex items-start gap-2">
                <span className="text-radiance-gold mt-1">&#8226;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-6 md:p-8">
        <h3 className="text-xl font-semibold text-text-primary mb-6">
          Ready to proceed? Enter your details.
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => onFieldChange('name', e.target.value)}
              placeholder="Your full name"
              className={`w-full px-4 py-3 bg-depth-base border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors ${
                errors.name ? 'border-red-400' : 'border-depth-border'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => onFieldChange('email', e.target.value)}
              placeholder="you@company.com"
              className={`w-full px-4 py-3 bg-depth-base border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors ${
                errors.email ? 'border-red-400' : 'border-depth-border'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              value={formData.company || ''}
              onChange={(e) => onFieldChange('company', e.target.value)}
              placeholder="Your company"
              className="w-full px-4 py-3 bg-depth-base border border-depth-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => onFieldChange('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 bg-depth-base border border-depth-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-radiance-gold/50 focus:border-radiance-gold transition-colors"
            />
          </div>
        </div>

        {/* Qualification Checkboxes */}
        <div className="space-y-4 mb-8">
          <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wide">
            Confirm your eligibility
          </h4>

          {/* Decision Maker */}
          <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg border transition-colors ${
            formData.isDecisionMaker
              ? 'border-radiance-gold/50 bg-radiance-gold/5'
              : errors.isDecisionMaker
                ? 'border-red-400/50'
                : 'border-depth-border'
          }`}>
            <input
              type="checkbox"
              checked={formData.isDecisionMaker || false}
              onChange={(e) => onFieldChange('isDecisionMaker', e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold/50"
            />
            <span className="text-text-secondary">
              I am a <strong className="text-text-primary">decision-maker</strong> with authority to invest $5,000 without requiring additional approval.
            </span>
          </label>
          {errors.isDecisionMaker && (
            <p className="text-sm text-red-400 ml-8">{errors.isDecisionMaker}</p>
          )}

          {/* Fixed Pricing */}
          <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg border transition-colors ${
            formData.acceptsFixedPricing
              ? 'border-radiance-gold/50 bg-radiance-gold/5'
              : errors.acceptsFixedPricing
                ? 'border-red-400/50'
                : 'border-depth-border'
          }`}>
            <input
              type="checkbox"
              checked={formData.acceptsFixedPricing || false}
              onChange={(e) => onFieldChange('acceptsFixedPricing', e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold/50"
            />
            <span className="text-text-secondary">
              I understand and accept the <strong className="text-text-primary">fixed $5,000 fee</strong>. No discounts. No payment plans.
            </span>
          </label>
          {errors.acceptsFixedPricing && (
            <p className="text-sm text-red-400 ml-8">{errors.acceptsFixedPricing}</p>
          )}

          {/* Open to Negative Verdict */}
          <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg border transition-colors ${
            formData.openToNegativeVerdict
              ? 'border-radiance-gold/50 bg-radiance-gold/5'
              : errors.openToNegativeVerdict
                ? 'border-red-400/50'
                : 'border-depth-border'
          }`}>
            <input
              type="checkbox"
              checked={formData.openToNegativeVerdict || false}
              onChange={(e) => onFieldChange('openToNegativeVerdict', e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-depth-border bg-depth-base text-radiance-gold focus:ring-radiance-gold/50"
            />
            <span className="text-text-secondary">
              I am <strong className="text-text-primary">open to receiving a "NO-GO" verdict</strong>. I understand that a "no" is a successful outcome that saves me from wasted investment.
            </span>
          </label>
          {errors.openToNegativeVerdict && (
            <p className="text-sm text-red-400 ml-8">{errors.openToNegativeVerdict}</p>
          )}
        </div>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? 'Processing...' : 'Continue to Schedule Call'}
        </Button>

        <p className="text-center text-text-muted text-sm mt-4">
          After scheduling, you&apos;ll watch a short video that explains exactly what to expect.
        </p>
      </div>
    </div>
  );
};

export default AssessmentQualifyStage;
