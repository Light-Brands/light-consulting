/**
 * Assessment Exit Stage (Stage 10)
 * Clean closure - no follow-ups unless client-initiated
 * Mobile-optimized
 */

'use client';

import React from 'react';
import { Button } from '../ui';
import { AssessmentFormData, AssessmentVerdict, PageKey } from '@/types';
import { EXIT_STAGE_CONTENT, ASSESSMENT_FUNNEL_CONFIG } from '@/lib/constants';

interface AssessmentExitStageProps {
  formData: AssessmentFormData;
  onNavigate: (page: PageKey) => void;
}

export const AssessmentExitStage: React.FC<AssessmentExitStageProps> = ({
  formData,
  onNavigate,
}) => {
  const verdict = formData.verdict as AssessmentVerdict;

  const getVerdictConfig = () => {
    switch (verdict) {
      case 'GO':
        return {
          icon: '&#10003;',
          iconBg: 'bg-growth-emerald/20',
          iconColor: 'text-growth-emerald',
          borderColor: 'border-growth-emerald/30',
          message: EXIT_STAGE_CONTENT.verdictOutcomes.GO.message,
        };
      case 'NO_GO':
        return {
          icon: '&#9744;',
          iconBg: 'bg-depth-surface',
          iconColor: 'text-text-muted',
          borderColor: 'border-depth-border',
          message: EXIT_STAGE_CONTENT.verdictOutcomes.NO_GO.message,
        };
      default: // NOT_YET or CONDITIONAL_GO
        return {
          icon: '&#8987;',
          iconBg: 'bg-radiance-gold/20',
          iconColor: 'text-radiance-gold',
          borderColor: 'border-radiance-gold/30',
          message: EXIT_STAGE_CONTENT.verdictOutcomes.NOT_YET.message,
        };
    }
  };

  const verdictDisplay = getVerdictConfig();
  const verdictLabel = verdict === 'GO' ? 'GO' :
                       verdict === 'NO_GO' ? 'NO-GO' :
                       'NOT YET';

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4 sm:space-y-5 px-2">
        <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full ${verdictDisplay.iconBg} flex items-center justify-center mx-auto`}>
          <span
            className={`${verdictDisplay.iconColor} text-5xl sm:text-6xl`}
            dangerouslySetInnerHTML={{ __html: verdictDisplay.icon }}
          />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
            {EXIT_STAGE_CONTENT.headline}
          </h1>
          <p className="text-sm sm:text-base text-text-secondary mt-2">
            {EXIT_STAGE_CONTENT.subheadline}
          </p>
        </div>
      </div>

      {/* Verdict Summary Card */}
      <div className={`bg-depth-surface border ${verdictDisplay.borderColor} rounded-xl p-5 sm:p-6 md:p-8`}>
        <div className="text-center space-y-4">
          <div>
            <p className="text-text-muted text-sm uppercase tracking-wide">Your Verdict</p>
            <p className={`text-3xl sm:text-4xl font-bold mt-1 ${verdictDisplay.iconColor}`}>
              {verdictLabel}
            </p>
          </div>

          <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            {verdictDisplay.message}
          </p>
        </div>
      </div>

      {/* Closure Statement */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="text-radiance-gold text-xl flex-shrink-0">&#9432;</span>
          <div>
            <p className="text-text-primary font-semibold text-sm sm:text-base">
              {EXIT_STAGE_CONTENT.closureStatement}
            </p>
            <p className="text-text-muted text-sm mt-2">
              Sales protects the product. We don&apos;t chase. If you want to explore further, the next move is yours.
            </p>
          </div>
        </div>
      </div>

      {/* What You Received */}
      <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-4">
          What You Received
        </h3>
        <ul className="space-y-2 sm:space-y-3">
          <li className="flex items-start gap-2 text-text-secondary text-sm sm:text-base">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span>A definitive verdict: <strong className={verdictDisplay.iconColor}>{verdictLabel}</strong></span>
          </li>
          <li className="flex items-start gap-2 text-text-secondary text-sm sm:text-base">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span>Exactly 3 reasoning points explaining why</span>
          </li>
          <li className="flex items-start gap-2 text-text-secondary text-sm sm:text-base">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span>Scores across 4 assessment dimensions</span>
          </li>
          <li className="flex items-start gap-2 text-text-secondary text-sm sm:text-base">
            <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
            <span>A single-page report you can reference anytime</span>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="text-center space-y-3">
        <p className="text-text-muted text-sm">
          {EXIT_STAGE_CONTENT.contactNote}
        </p>
        <a
          href="mailto:assessment@lightbrand.consulting"
          className="text-radiance-gold hover:underline text-sm"
        >
          assessment@lightbrand.consulting
        </a>
      </div>

      {/* Thank You Message */}
      <div className="text-center py-4">
        <p className="text-text-secondary text-sm sm:text-base">
          Thank you for trusting Light Brand with your assessment.
        </p>
        <p className="text-text-muted text-xs sm:text-sm mt-1 italic">
          &ldquo;{ASSESSMENT_FUNNEL_CONFIG.corePhilosophy}&rdquo;
        </p>
      </div>

      {/* Navigation */}
      <div className="text-center pt-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="min-h-[44px]"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default AssessmentExitStage;
