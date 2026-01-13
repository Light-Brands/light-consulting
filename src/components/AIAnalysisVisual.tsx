/**
 * AI Analysis Visual
 * Animated visualization of AI analyzing the website
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui';
import { cn } from '../lib/utils';

interface AIAnalysisVisualProps {
  fileName?: string;
  progress?: number; // 0-100
  currentPhase?: string;
  error?: string | null;
  onGoBack?: () => void;
}

// Website analysis phases only
const WEBSITE_PHASES = [
  { id: 'scraping', label: 'Scraping your website...', icon: '1' },
  { id: 'analyzing', label: 'Analyzing your tech stack...', icon: '2' },
  { id: 'evaluating', label: 'Evaluating AI readiness...', icon: '3' },
  { id: 'generating', label: 'Generating your assessment...', icon: '4' },
];

export const AIAnalysisVisual: React.FC<AIAnalysisVisualProps> = ({
  fileName,
  progress = 0,
  currentPhase = 'scraping',
  error,
  onGoBack,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

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

  const getCurrentPhaseIndex = () => {
    return WEBSITE_PHASES.findIndex((p) => p.id === currentPhase);
  };

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

  const currentPhaseData = WEBSITE_PHASES.find((p) => p.id === currentPhase) || WEBSITE_PHASES[0];
  const currentPhaseIndex = getCurrentPhaseIndex();

  return (
    <div
      className={cn(
        'transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
    >
      {/* Minimal Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Analyzing website
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

      {/* Minimal Progress */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative h-1 bg-depth-surface rounded-full overflow-hidden mb-3">
          <div
            className="absolute top-0 left-0 h-full bg-radiance-gold transition-all duration-500 ease-out rounded-full"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-xs text-text-muted">
          <span className="font-mono">{Math.round(animatedProgress)}%</span>
          <span className="text-text-muted/60">{currentPhaseData.label}</span>
        </div>
      </div>

      {/* Developer Details */}
      <div className="max-w-md mx-auto">
        <div className="bg-depth-elevated/50 border border-depth-border rounded-lg p-4 space-y-3">
          {/* Current Phase */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Status</span>
            <span className="text-text-primary font-medium">{currentPhaseData.label}</span>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">Progress</span>
            <span className="text-radiance-gold font-mono">{Math.round(animatedProgress)}%</span>
          </div>

          {/* Phase Steps (minimal) */}
          <div className="pt-2 border-t border-depth-border">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              {WEBSITE_PHASES.map((phase, index) => {
                const isComplete = index < currentPhaseIndex;
                const isCurrent = index === currentPhaseIndex;
                return (
                  <React.Fragment key={phase.id}>
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full transition-colors',
                        isComplete && 'bg-success',
                        isCurrent && 'bg-radiance-gold animate-pulse',
                        !isComplete && !isCurrent && 'bg-depth-surface'
                      )}
                    />
                    {index < WEBSITE_PHASES.length - 1 && (
                      <div className={cn(
                        'h-0.5 flex-1 transition-colors',
                        isComplete ? 'bg-success/30' : 'bg-depth-surface'
                      )} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-text-muted/60">
              <span>Phase {currentPhaseIndex + 1}/{WEBSITE_PHASES.length}</span>
              <span className="font-mono">ETA: ~{Math.max(5, Math.ceil((100 - animatedProgress) / 3))}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisVisual;
