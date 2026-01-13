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
  const [pulseLines, setPulseLines] = useState<number[]>([]);

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

  // Create animated "reading" lines
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseLines((prev) => {
        const newLines = [...prev, Date.now()];
        return newLines.slice(-6);
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const getCurrentPhaseIndex = () => {
    return WEBSITE_PHASES.findIndex((p) => p.id === currentPhase);
  };

  if (error) {
    return (
      <div
        className={cn(
          'transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-error/20 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Analysis Error
            </h1>
            <p className="text-error text-lg mb-6">{error}</p>
            <p className="text-text-secondary mb-8">
              This could be due to the website being inaccessible, taking too long to load, or having restricted access.
            </p>
          </div>
          {onGoBack && (
            <Button onClick={onGoBack} variant="secondary" size="lg">
              Go Back & Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Analyzing Your Website
        </h1>
        <p className="text-text-secondary text-lg">
          Our AI is analyzing your website and assessing AI readiness
        </p>
      </div>

      {/* Main Visualization */}
      <div className="relative">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-radiance-gold/10 via-transparent to-transparent blur-3xl -z-10" />

        {/* Document Card */}
        <div className="relative bg-depth-elevated/30 border border-radiance-gold/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm overflow-hidden">
          {/* Animated Reading Lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {pulseLines.map((id, index) => (
              <div
                key={id}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-radiance-gold/40 to-transparent animate-pulse"
                style={{
                  top: `${15 + index * 15}%`,
                  animationDelay: `${index * 100}ms`,
                  opacity: 0.4 - index * 0.05,
                }}
              />
            ))}
          </div>

          {/* AI Brain Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-radiance-gold/20 flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12 text-radiance-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-radiance-gold/60" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-radiance-amber/60" />
              </div>
            </div>
          </div>

          {/* File Name */}
          {fileName && (
            <div className="flex items-center justify-center gap-3 mb-8">
              <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-text-secondary font-medium">{fileName}</span>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="relative h-2 bg-depth-surface rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-radiance-gold to-radiance-amber transition-all duration-700 ease-out rounded-full"
                style={{ width: `${animatedProgress}%` }}
              />
              {/* Shimmer Effect */}
              <div
                className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700"
                style={{ left: `${Math.max(0, animatedProgress - 15)}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-text-muted">
              <span>{Math.round(animatedProgress)}% complete</span>
              <span>Estimated time: ~30s</span>
            </div>
          </div>

          {/* Phase Steps */}
          <div className="space-y-4">
            {WEBSITE_PHASES.map((phase, index) => {
              const currentIndex = getCurrentPhaseIndex();
              const isComplete = index < currentIndex;
              const isCurrent = index === currentIndex;
              const isPending = index > currentIndex;

              return (
                <div
                  key={phase.id}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl transition-all duration-500',
                    isComplete && 'bg-success/10',
                    isCurrent && 'bg-radiance-gold/10 border border-radiance-gold/30',
                    isPending && 'opacity-40'
                  )}
                >
                  {/* Step Indicator */}
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                      isComplete && 'bg-success text-white',
                      isCurrent && 'bg-radiance-gold text-depth-base animate-pulse',
                      isPending && 'bg-depth-surface text-text-muted'
                    )}
                  >
                    {isComplete ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm font-semibold">{phase.icon}</span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      'font-medium transition-colors duration-300',
                      isComplete && 'text-success',
                      isCurrent && 'text-radiance-gold',
                      isPending && 'text-text-muted'
                    )}
                  >
                    {phase.label}
                  </span>

                  {/* Loading dots for current step */}
                  {isCurrent && (
                    <div className="flex gap-1 ml-auto">
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-radiance-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Message */}
      <p className="text-center text-sm text-text-muted mt-8">
        This typically takes 20-30 seconds. Please don't close this page.
      </p>
    </div>
  );
};

export default AIAnalysisVisual;
