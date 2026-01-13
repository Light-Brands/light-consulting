/**
 * Enhanced AI Analysis Visual
 * Animated visualization of AI analyzing the website with detailed progress
 */

'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Button } from './ui';
import { cn } from '../lib/utils';
import type { BusinessIntelligence } from '@/types/business-intelligence';

export type AnalysisPhaseId =
  | 'scraping'
  | 'tech_detection'
  | 'business_analysis'
  | 'digital_presence'
  | 'technical_audit'
  | 'ai_readiness'
  | 'operations_analysis'
  | 'generating_report';

interface AnalysisPhaseConfig {
  id: AnalysisPhaseId;
  label: string;
  description: string;
  icon: string;
}

const ANALYSIS_PHASES: AnalysisPhaseConfig[] = [
  { id: 'scraping', label: 'Scanning Website', description: 'Extracting content and structure', icon: '1' },
  { id: 'tech_detection', label: 'Detecting Tech Stack', description: 'Identifying platforms and frameworks', icon: '2' },
  { id: 'business_analysis', label: 'Business Model Analysis', description: 'Understanding industry and audience', icon: '3' },
  { id: 'digital_presence', label: 'Digital Presence', description: 'Evaluating content and marketing', icon: '4' },
  { id: 'technical_audit', label: 'Technical Assessment', description: 'Reviewing performance and security', icon: '5' },
  { id: 'ai_readiness', label: 'AI Readiness', description: 'Evaluating automation potential', icon: '6' },
  { id: 'operations_analysis', label: 'Operations Insights', description: 'Identifying opportunities', icon: '7' },
  { id: 'generating_report', label: 'Generating Report', description: 'Compiling comprehensive analysis', icon: '8' },
];

// Legacy phase mapping for backward compatibility
const LEGACY_PHASE_MAP: Record<string, AnalysisPhaseId> = {
  'scraping': 'scraping',
  'analyzing': 'business_analysis',
  'evaluating': 'ai_readiness',
  'generating': 'generating_report',
};

interface DiscoveredInsight {
  type: 'business' | 'tech' | 'opportunity' | 'score';
  label: string;
  value: string;
  timestamp: number;
}

interface AIAnalysisVisualProps {
  fileName?: string;
  progress?: number;
  currentPhase?: string;
  error?: string | null;
  onGoBack?: () => void;
  // Enhanced props for showing discovered insights
  discoveredInsights?: DiscoveredInsight[];
  businessIntelligence?: Partial<BusinessIntelligence>;
  showDetailedProgress?: boolean;
}

export const AIAnalysisVisual: React.FC<AIAnalysisVisualProps> = ({
  fileName,
  progress = 0,
  currentPhase = 'scraping',
  error,
  onGoBack,
  discoveredInsights = [],
  businessIntelligence,
  showDetailedProgress = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [displayedInsights, setDisplayedInsights] = useState<DiscoveredInsight[]>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  // Gradually reveal insights for visual effect
  useEffect(() => {
    if (discoveredInsights.length > displayedInsights.length) {
      const timer = setTimeout(() => {
        setDisplayedInsights(discoveredInsights.slice(0, displayedInsights.length + 1));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [discoveredInsights, displayedInsights.length]);

  // Map legacy phases to new phases
  const mappedPhase = useMemo(() => {
    return LEGACY_PHASE_MAP[currentPhase] || currentPhase as AnalysisPhaseId;
  }, [currentPhase]);

  const getCurrentPhaseIndex = () => {
    return ANALYSIS_PHASES.findIndex((p) => p.id === mappedPhase);
  };

  const currentPhaseData = ANALYSIS_PHASES.find((p) => p.id === mappedPhase) || ANALYSIS_PHASES[0];
  const currentPhaseIndex = getCurrentPhaseIndex();

  // Generate simulated insights based on progress
  const simulatedInsights = useMemo(() => {
    const insights: DiscoveredInsight[] = [];

    if (progress >= 15 && businessIntelligence?.digital_presence?.site_structure) {
      insights.push({
        type: 'tech',
        label: 'Site Structure',
        value: businessIntelligence.digital_presence.site_structure,
        timestamp: Date.now(),
      });
    }

    if (progress >= 30 && businessIntelligence?.business_model) {
      insights.push({
        type: 'business',
        label: 'Business Model',
        value: businessIntelligence.business_model,
        timestamp: Date.now(),
      });
    }

    if (progress >= 45 && businessIntelligence?.industry) {
      insights.push({
        type: 'business',
        label: 'Industry',
        value: businessIntelligence.industry,
        timestamp: Date.now(),
      });
    }

    if (progress >= 70 && businessIntelligence?.ai_readiness?.overall_score) {
      insights.push({
        type: 'score',
        label: 'AI Readiness',
        value: `${businessIntelligence.ai_readiness.overall_score}/100`,
        timestamp: Date.now(),
      });
    }

    return insights;
  }, [progress, businessIntelligence]);

  const allInsights = discoveredInsights.length > 0 ? displayedInsights : simulatedInsights;

  if (error) {
    return (
      <div
        className={cn(
          'transition-all duration-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-error/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Analysis failed
            </h2>
            <p className="text-error text-sm mb-4 font-mono">{error}</p>
            <p className="text-text-muted text-xs mb-6">
              Website may be inaccessible or taking too long to load.
            </p>
          </div>
          {onGoBack && (
            <Button onClick={onGoBack} variant="secondary" size="md">
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Analyzing Website
        </h2>
        {fileName && (
          <div className="flex items-center justify-center gap-2 text-sm text-text-muted font-mono">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="truncate max-w-md">{fileName}</span>
          </div>
        )}
      </div>

      {/* Main Progress Bar */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative h-2 bg-depth-surface rounded-full overflow-hidden mb-3">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-radiance-gold to-radiance-amber transition-all duration-500 ease-out rounded-full"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-xs text-text-muted">
          <span className="font-mono text-radiance-gold font-semibold">{Math.round(animatedProgress)}%</span>
          <span className="text-text-muted/80">{currentPhaseData.label}</span>
        </div>
      </div>

      {/* Discovered Insights */}
      {allInsights.length > 0 && (
        <div className="max-w-md mx-auto mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {allInsights.map((insight, index) => (
              <div
                key={`${insight.label}-${index}`}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium animate-fade-in',
                  insight.type === 'business' && 'bg-radiance-gold/20 text-radiance-gold',
                  insight.type === 'tech' && 'bg-wisdom-violet/20 text-wisdom-violet',
                  insight.type === 'opportunity' && 'bg-growth-emerald/20 text-growth-emerald',
                  insight.type === 'score' && 'bg-depth-elevated text-text-primary border border-radiance-gold/30'
                )}
              >
                <span className="text-text-muted mr-1">{insight.label}:</span>
                <span>{insight.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Progress Panel */}
      {showDetailedProgress && (
        <div className="max-w-lg mx-auto">
          <div className="bg-depth-elevated/50 border border-depth-border rounded-lg p-4">
            {/* Current Phase Status */}
            <div className="flex items-center justify-between text-sm mb-4 pb-3 border-b border-depth-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-radiance-gold rounded-full animate-pulse" />
                <span className="text-text-primary font-medium">{currentPhaseData.label}</span>
              </div>
              <span className="text-text-muted text-xs">{currentPhaseData.description}</span>
            </div>

            {/* Phase Steps */}
            <div className="space-y-2">
              {ANALYSIS_PHASES.map((phase, index) => {
                const isComplete = index < currentPhaseIndex;
                const isCurrent = index === currentPhaseIndex;
                const isPending = index > currentPhaseIndex;

                return (
                  <div
                    key={phase.id}
                    className={cn(
                      'flex items-center gap-3 text-xs transition-all duration-300',
                      isComplete && 'opacity-60',
                      isCurrent && 'opacity-100',
                      isPending && 'opacity-40'
                    )}
                  >
                    {/* Status Icon */}
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors',
                        isComplete && 'bg-success/20',
                        isCurrent && 'bg-radiance-gold/20',
                        isPending && 'bg-depth-surface'
                      )}
                    >
                      {isComplete ? (
                        <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : isCurrent ? (
                        <div className="w-2 h-2 bg-radiance-gold rounded-full animate-pulse" />
                      ) : (
                        <div className="w-1.5 h-1.5 bg-depth-border rounded-full" />
                      )}
                    </div>

                    {/* Phase Label */}
                    <span
                      className={cn(
                        'flex-1 transition-colors',
                        isComplete && 'text-success',
                        isCurrent && 'text-radiance-gold font-medium',
                        isPending && 'text-text-muted'
                      )}
                    >
                      {phase.label}
                    </span>

                    {/* Phase Status */}
                    <span
                      className={cn(
                        'text-xs',
                        isComplete && 'text-success/60',
                        isCurrent && 'text-radiance-gold/80',
                        isPending && 'text-text-muted/40'
                      )}
                    >
                      {isComplete ? 'Done' : isCurrent ? 'Processing...' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer Stats */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-depth-border text-xs text-text-muted">
              <span>Phase {currentPhaseIndex + 1} of {ANALYSIS_PHASES.length}</span>
              <span className="font-mono">ETA: ~{Math.max(5, Math.ceil((100 - animatedProgress) / 4))}s</span>
            </div>
          </div>
        </div>
      )}

      {/* Simple Progress (when detailed is disabled) */}
      {!showDetailedProgress && (
        <div className="max-w-md mx-auto">
          <div className="bg-depth-elevated/50 border border-depth-border rounded-lg p-4">
            <div className="flex items-center gap-3 text-sm">
              {ANALYSIS_PHASES.slice(0, 4).map((phase, index) => {
                const phaseProgress = (index + 1) * 25;
                const isComplete = animatedProgress >= phaseProgress;
                const isCurrent = animatedProgress >= phaseProgress - 25 && animatedProgress < phaseProgress;

                return (
                  <React.Fragment key={phase.id}>
                    <span
                      className={cn(
                        'w-2 h-2 rounded-full transition-colors',
                        isComplete && 'bg-success',
                        isCurrent && 'bg-radiance-gold animate-pulse',
                        !isComplete && !isCurrent && 'bg-depth-surface'
                      )}
                    />
                    {index < 3 && (
                      <div
                        className={cn(
                          'h-0.5 flex-1 transition-colors',
                          isComplete ? 'bg-success/30' : 'bg-depth-surface'
                        )}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-text-muted/60">
              <span>Phase {Math.min(Math.ceil(animatedProgress / 25), 4)}/4</span>
              <span className="font-mono">ETA: ~{Math.max(5, Math.ceil((100 - animatedProgress) / 3))}s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalysisVisual;
