/**
 * Assessment Document Stage (Stage 9)
 * Report delivery - single-page with scores and implications
 * Mobile-optimized
 */

'use client';

import React from 'react';
import { Button } from '../ui';
import { AssessmentFormData, AssessmentVerdict } from '@/types';
import { DOCUMENT_STAGE_CONTENT, ASSESSMENT_FUNNEL_CONFIG } from '@/lib/constants';

interface AssessmentDocumentStageProps {
  formData: AssessmentFormData;
  onContinue: () => void;
  onBack: () => void;
}

export const AssessmentDocumentStage: React.FC<AssessmentDocumentStageProps> = ({
  formData,
  onContinue,
  onBack,
}) => {
  const verdict = formData.verdict as AssessmentVerdict;
  const verdictConfig = verdict === 'GO'
    ? ASSESSMENT_FUNNEL_CONFIG.verdicts.GO
    : verdict === 'NO_GO'
      ? ASSESSMENT_FUNNEL_CONFIG.verdicts.NO_GO
      : ASSESSMENT_FUNNEL_CONFIG.verdicts.NOT_YET;

  const getVerdictColor = () => {
    switch (verdict) {
      case 'GO': return 'text-growth-emerald';
      case 'NO_GO': return 'text-text-muted';
      default: return 'text-radiance-gold';
    }
  };

  const getVerdictBorderColor = () => {
    switch (verdict) {
      case 'GO': return 'border-growth-emerald/30';
      case 'NO_GO': return 'border-depth-border';
      default: return 'border-radiance-gold/30';
    }
  };

  const getVerdictBgColor = () => {
    switch (verdict) {
      case 'GO': return 'bg-growth-emerald/10';
      case 'NO_GO': return 'bg-depth-surface';
      default: return 'bg-radiance-gold/10';
    }
  };

  // Mock scores if not provided (in production these come from the assessment)
  const scores = formData.verdictScores || {
    decisionConcentration: 7,
    founderDependency: 5,
    decisionCodification: 8,
    leverageReadiness: 6,
  };

  const reasons = formData.verdictReasons || [
    'Reason point 1 from the verdict call',
    'Reason point 2 from the verdict call',
    'Reason point 3 from the verdict call',
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
          {DOCUMENT_STAGE_CONTENT.headline}
        </h2>
        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          {DOCUMENT_STAGE_CONTENT.subheadline}
        </p>
      </div>

      {/* Report Card */}
      <div className={`bg-depth-surface border ${getVerdictBorderColor()} rounded-xl overflow-hidden`}>
        {/* Verdict Header */}
        <div className={`${getVerdictBgColor()} p-5 sm:p-6 text-center border-b ${getVerdictBorderColor()}`}>
          <p className="text-text-muted text-xs uppercase tracking-wide mb-2">Your Verdict</p>
          <h3 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${getVerdictColor()}`}>
            {verdictConfig.label}
          </h3>
          <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-md mx-auto">
            {verdictConfig.description}
          </p>
        </div>

        {/* Scores Section */}
        <div className="p-5 sm:p-6 border-b border-depth-border">
          <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
            Assessment Scores
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(ASSESSMENT_FUNNEL_CONFIG.scoringDimensions).map(([key, dimension]) => {
              const score = scores[key as keyof typeof scores] || 0;
              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted text-xs sm:text-sm">{dimension.label}</span>
                    <span className="text-text-primary font-bold">{score}/10</span>
                  </div>
                  <div className="h-2 bg-depth-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        score >= 7 ? 'bg-growth-emerald' :
                        score >= 4 ? 'bg-radiance-gold' :
                        'bg-red-400'
                      }`}
                      style={{ width: `${score * 10}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reasoning Points */}
        <div className="p-5 sm:p-6 border-b border-depth-border">
          <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
            The 3 Reasons Behind Your Verdict
          </h4>
          <div className="space-y-3">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${getVerdictBgColor()} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className={`${getVerdictColor()} text-xs font-bold`}>{index + 1}</span>
                </div>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Implications */}
        <div className="p-5 sm:p-6">
          <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
            What This Means
          </h4>
          <p className={`text-sm sm:text-base ${getVerdictColor()} font-medium leading-relaxed`}>
            {verdictConfig.implication}
          </p>
        </div>
      </div>

      {/* Report Actions */}
      <div className="bg-depth-surface border border-depth-border rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-semibold text-text-primary">Your Assessment Report</h4>
            <p className="text-text-muted text-sm">Download your single-page report</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              // In production, this would download the PDF report
              alert('Report download will be implemented. Report URL: ' + (formData.reportUrl || 'pending'));
            }}
            className="min-h-[44px] w-full sm:w-auto"
          >
            <span className="mr-2">&#128196;</span>
            Download Report
          </Button>
        </div>
      </div>

      {/* What's Included Note */}
      <div className="bg-depth-surface/50 border border-depth-border rounded-xl p-4">
        <h4 className="text-sm font-semibold text-text-secondary mb-3">Report Includes:</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DOCUMENT_STAGE_CONTENT.reportIncludes.map((item, index) => (
            <li key={index} className="text-text-muted text-sm flex items-start gap-2">
              <span className="text-radiance-gold mt-0.5 flex-shrink-0">&#10003;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Note */}
      <div className="text-center">
        <p className="text-text-muted text-xs sm:text-sm italic">
          {DOCUMENT_STAGE_CONTENT.note}
        </p>
      </div>

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

          <Button
            onClick={onContinue}
            className="min-h-[44px] text-sm sm:text-base flex-1 sm:flex-initial max-w-[200px] sm:max-w-none"
          >
            Complete Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentDocumentStage;
