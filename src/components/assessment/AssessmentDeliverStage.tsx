/**
 * Assessment Deliver Stage (Stage 8)
 * Verdict call screen - displays call info and what to expect
 * This is a holding screen before/after the actual call
 * Mobile-optimized
 */

'use client';

import React from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';
import { DELIVER_STAGE_CONTENT, ASSESSMENT_FUNNEL_CONFIG } from '@/lib/constants';

interface AssessmentDeliverStageProps {
  formData: AssessmentFormData;
  onVerdictReceived: (verdict: 'GO' | 'NO_GO' | 'NOT_YET', reasons: string[]) => void;
  onBack: () => void;
}

export const AssessmentDeliverStage: React.FC<AssessmentDeliverStageProps> = ({
  formData,
  onVerdictReceived,
  onBack,
}) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Not scheduled';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const isCallCompleted = formData.verdict !== undefined && formData.verdict !== null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
          {DELIVER_STAGE_CONTENT.headline}
        </h2>
        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          {DELIVER_STAGE_CONTENT.subheadline}
        </p>
      </div>

      {/* Call Details Card */}
      <div className="bg-depth-surface border border-radiance-gold/30 rounded-xl p-4 sm:p-6 md:p-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-radiance-gold/10 text-radiance-gold px-4 py-2 rounded-full text-sm font-medium">
            <span>&#128222;</span>
            <span>{isCallCompleted ? 'Call Completed' : 'Upcoming Call'}</span>
          </div>

          <div>
            <p className="text-text-muted text-sm">Your Verdict Call</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary mt-1">
              {formatDate(formData.bookedSlot)}
            </p>
          </div>

          <div className="bg-depth-base rounded-lg p-4">
            <p className="text-text-muted text-sm">Duration</p>
            <p className="text-text-primary font-semibold">{DELIVER_STAGE_CONTENT.format.duration}</p>
          </div>
        </div>
      </div>

      {/* Call Structure */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-4">
          Call Structure
        </h3>
        <div className="space-y-3">
          {DELIVER_STAGE_CONTENT.format.structure.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-radiance-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-radiance-gold text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What's Included vs Not Included */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Included */}
        <div className="bg-growth-emerald/5 border border-growth-emerald/20 rounded-xl p-4 sm:p-5">
          <h4 className="text-sm font-semibold text-growth-emerald mb-3 flex items-center gap-2">
            <span>&#10003;</span>
            <span>Included in this call</span>
          </h4>
          <ul className="space-y-2">
            {DELIVER_STAGE_CONTENT.boundaries.included.map((item, index) => (
              <li key={index} className="text-text-secondary text-sm flex items-start gap-2">
                <span className="text-growth-emerald mt-0.5 flex-shrink-0">&#8226;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-4 sm:p-5">
          <h4 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
            <span>&#10005;</span>
            <span>NOT included in this call</span>
          </h4>
          <ul className="space-y-2">
            {DELIVER_STAGE_CONTENT.boundaries.notIncluded.map((item, index) => (
              <li key={index} className="text-text-muted text-sm flex items-start gap-2">
                <span className="text-red-400 mt-0.5 flex-shrink-0">&#8226;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scope Boundary Reminder */}
      <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-radiance-gold text-lg flex-shrink-0">&#9432;</span>
          <div>
            <p className="text-text-secondary text-sm leading-relaxed">
              <strong className="text-text-primary">Scope Boundary:</strong> If a question falls outside the assessment, we&apos;ll respond with:
            </p>
            <p className="text-radiance-gold font-medium text-sm mt-2 italic">
              {DELIVER_STAGE_CONTENT.scopePhrase}
            </p>
          </div>
        </div>
      </div>

      {/* Development: Simulate Verdict (will be replaced with actual call integration) */}
      {!isCallCompleted && (
        <div className="bg-depth-surface/30 border border-dashed border-depth-border rounded-xl p-4 sm:p-6">
          <h4 className="text-sm font-semibold text-text-muted mb-4 text-center">
            Development: Simulate Verdict Delivery
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => onVerdictReceived('GO', [
                'Strong decision codification across operations',
                'Documented processes ready for AI amplification',
                'Clear leverage opportunities identified'
              ])}
              className="min-h-[44px] border-growth-emerald/50 hover:bg-growth-emerald/10"
            >
              <span className="text-growth-emerald">Deliver GO</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => onVerdictReceived('NOT_YET', [
                'Founder dependency still too high',
                'Key processes not yet documented',
                'Structure needed before AI can amplify'
              ])}
              className="min-h-[44px] border-radiance-gold/50 hover:bg-radiance-gold/10"
            >
              <span className="text-radiance-gold">Deliver NOT YET</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => onVerdictReceived('NO_GO', [
                'Business model not suited for AI leverage',
                'Structural issues require non-AI solutions first',
                'Investment would not generate meaningful return'
              ])}
              className="min-h-[44px]"
            >
              <span className="text-text-muted">Deliver NO-GO</span>
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="sticky bottom-0 bg-depth-base/95 backdrop-blur-sm -mx-4 px-4 py-3 sm:relative sm:mx-0 sm:px-0 sm:py-0 sm:bg-transparent sm:backdrop-blur-none border-t sm:border-t border-depth-border">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={onBack}
            className="min-h-[44px] text-sm sm:text-base"
          >
            <span className="mr-1">&#8592;</span> Back
          </Button>

          <p className="text-text-muted text-xs sm:text-sm text-center flex-1">
            {isCallCompleted ? 'Call completed. Proceed to receive your report.' : 'Your verdict will be delivered on the scheduled call.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentDeliverStage;
