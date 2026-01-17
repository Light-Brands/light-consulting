/**
 * Assessment Attract Stage (Stage 1)
 * Entry landing page that filters for founders with structural pain
 * Repels tool-seekers and attracts decision-makers
 * Mobile-optimized with strong positioning
 */

'use client';

import React, { useState } from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';
import {
  ASSESSMENT_FUNNEL_CONFIG,
  ATTRACT_STAGE_CONTENT,
} from '@/lib/constants';

interface AssessmentAttractStageProps {
  formData: AssessmentFormData;
  onContinue: () => void;
}

export const AssessmentAttractStage: React.FC<AssessmentAttractStageProps> = ({
  formData,
  onContinue,
}) => {
  const [activeHook, setActiveHook] = useState(0);

  // Rotate hooks every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveHook((prev) => (prev + 1) % ATTRACT_STAGE_CONTENT.hooks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 md:space-y-6 px-2">
        {/* Product Name */}
        <div className="inline-flex items-center gap-2 bg-radiance-gold/10 text-radiance-gold px-4 py-2 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-radiance-gold rounded-full animate-pulse" />
          <span>{ASSESSMENT_FUNNEL_CONFIG.name}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
          {ATTRACT_STAGE_CONTENT.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {ATTRACT_STAGE_CONTENT.subheadline}
        </p>

        {/* Rotating Hooks */}
        <div className="h-12 sm:h-14 flex items-center justify-center">
          <p className="text-radiance-gold text-base sm:text-lg md:text-xl font-medium italic animate-fade-in">
            &ldquo;{ATTRACT_STAGE_CONTENT.hooks[activeHook]}&rdquo;
          </p>
        </div>
      </div>

      {/* Positioning Statement */}
      <div className="bg-depth-surface border border-radiance-gold/20 rounded-xl p-5 sm:p-6 md:p-8">
        <div className="text-center space-y-4">
          <p className="text-lg sm:text-xl md:text-2xl text-text-primary font-semibold">
            {ATTRACT_STAGE_CONTENT.positioning.what}
          </p>
          <p className="text-text-muted text-sm sm:text-base">
            {ATTRACT_STAGE_CONTENT.positioning.not}
          </p>
          <div className="inline-block bg-depth-base px-4 py-2 rounded-lg">
            <p className="text-radiance-gold font-medium text-sm sm:text-base">
              {ATTRACT_STAGE_CONTENT.positioning.outcome}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section - Who This Is / Is Not For */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* NOT For You */}
        <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-4 sm:p-6 order-2 md:order-1">
          <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4 flex items-center gap-2">
            <span className="text-red-400 text-lg">&#10005;</span>
            <span>This is NOT for you if:</span>
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {ATTRACT_STAGE_CONTENT.notForYou.map((item, index) => (
              <li key={index} className="text-sm sm:text-base text-text-muted flex items-start gap-2">
                <span className="text-red-400 mt-0.5 flex-shrink-0">&#8226;</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* IS For You */}
        <div className="bg-depth-surface/50 border border-radiance-gold/20 rounded-xl p-4 sm:p-6 order-1 md:order-2">
          <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4 flex items-center gap-2">
            <span className="text-radiance-gold text-lg">&#10003;</span>
            <span>This IS for you if:</span>
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {ATTRACT_STAGE_CONTENT.forYou.map((item, index) => (
              <li key={index} className="text-sm sm:text-base text-text-secondary flex items-start gap-2">
                <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#8226;</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Core Philosophy */}
      <div className="text-center space-y-3 py-4">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary">
          {ASSESSMENT_FUNNEL_CONFIG.corePhilosophy}
        </p>
        <p className="text-text-muted text-sm sm:text-base">
          {ASSESSMENT_FUNNEL_CONFIG.successStatement}
        </p>
      </div>

      {/* CTA Section */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-5 sm:p-6 md:p-8">
        <div className="text-center space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2">
              Ready to find out if AI is right for your business?
            </h3>
            <p className="text-text-muted text-sm sm:text-base">
              The next step: confirm you meet the qualification criteria.
            </p>
          </div>

          <Button
            onClick={onContinue}
            className="w-full sm:w-auto min-h-[52px] text-base sm:text-lg px-8 sm:px-12"
            size="lg"
          >
            Begin Qualification
          </Button>

          <p className="text-text-muted text-xs sm:text-sm">
            Takes 2 minutes. No credit card required to start.
          </p>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="text-center space-y-2">
        <p className="text-text-muted text-xs sm:text-sm">
          A $5,000 assessment that delivers judgment, not opinions.
        </p>
        <p className="text-text-muted text-xs">
          Pricing details revealed after you watch the required video.
        </p>
      </div>
    </div>
  );
};

export default AssessmentAttractStage;
