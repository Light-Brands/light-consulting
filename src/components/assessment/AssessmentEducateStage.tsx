/**
 * Assessment Educate Stage
 * VSL video viewing with mandatory completion tracking
 * THIS IS WHERE PRICING IS REVEALED - $5,000 investment
 * Mobile-optimized with larger touch targets
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui';
import { AssessmentFormData } from '@/types';
import { ASSESSMENT_CONFIG } from '@/lib/constants';

interface AssessmentEducateStageProps {
  formData: AssessmentFormData;
  onVSLComplete: (watchPercentage: number) => void;
  onBack: () => void;
}

export const AssessmentEducateStage: React.FC<AssessmentEducateStageProps> = ({
  formData,
  onVSLComplete,
  onBack,
}) => {
  const [watchProgress, setWatchProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const requiredPercentage = ASSESSMENT_CONFIG.vsl.minimumWatchPercentage;

  // Simulate video progress tracking
  // In production, integrate with YouTube/Vimeo/Wistia API
  useEffect(() => {
    if (isPlaying && !canProceed) {
      progressIntervalRef.current = setInterval(() => {
        setWatchProgress((prev) => {
          const newProgress = Math.min(prev + 0.5, 100);
          if (newProgress >= requiredPercentage) {
            setCanProceed(true);
          }
          return newProgress;
        });
      }, 1000); // Update every second
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, canProceed, requiredPercentage]);

  const handlePlay = () => {
    setHasStarted(true);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleContinue = () => {
    if (canProceed) {
      onVSLComplete(watchProgress);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-tight">
          Learn About the Assessment
        </h2>
        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          This video explains exactly what the AI Go/No-Go Assessment delivers, the investment required, and what to expect on your call.
          <strong className="text-text-primary block sm:inline mt-1 sm:mt-0"> You must watch at least {requiredPercentage}% to continue.</strong>
        </p>
      </div>

      {/* Video Container - Full width on mobile */}
      <div className="bg-depth-surface border border-depth-border rounded-xl overflow-hidden -mx-4 sm:mx-0">
        <div className="aspect-video relative bg-depth-base">
          {/* Play Overlay - Larger touch target on mobile */}
          {!hasStarted && (
            <button
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-depth-base/80 z-10 w-full"
              onClick={handlePlay}
              aria-label="Play video"
            >
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-radiance-gold/20 flex items-center justify-center mx-auto hover:bg-radiance-gold/30 active:scale-95 transition-all">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-radiance-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-text-secondary text-sm sm:text-base">Tap to play</p>
                <p className="text-text-muted text-xs sm:text-sm">Duration: {ASSESSMENT_CONFIG.vsl.estimatedDuration}</p>
              </div>
            </button>
          )}

          {/* Video Embed - Replace with actual VSL embed */}
          <iframe
            src={hasStarted ? `${ASSESSMENT_CONFIG.vsl.url}?autoplay=1` : ASSESSMENT_CONFIG.vsl.url}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen"
            className="absolute inset-0"
            title="AI Go/No-Go Assessment Overview"
          />

          {/* Progress Bar Overlay */}
          {hasStarted && (
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-depth-base/95 to-transparent">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-text-muted">Progress</span>
                  <span className={`font-medium ${canProceed ? 'text-radiance-gold' : 'text-text-secondary'}`}>
                    {Math.round(watchProgress)}%
                  </span>
                </div>
                <div className="relative h-2 sm:h-2.5 bg-depth-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-radiance-gold to-radiance-amber transition-all duration-300"
                    style={{ width: `${watchProgress}%` }}
                  />
                  {/* Required threshold marker */}
                  <div
                    className="absolute top-0 h-full w-0.5 bg-text-secondary/50"
                    style={{ left: `${requiredPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Controls for Development */}
      {hasStarted && (
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={isPlaying ? handlePause : handlePlay}
            className="min-h-[44px] min-w-[80px]"
          >
            {isPlaying ? 'Pause' : 'Resume'}
          </Button>
          <span className="text-text-muted text-xs sm:text-sm">
            (Dev: Simulating progress)
          </span>
        </div>
      )}

      {/* Warning Message */}
      {hasStarted && !canProceed && (
        <div className="bg-radiance-gold/5 border border-radiance-gold/20 rounded-xl p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-radiance-gold text-lg sm:text-xl flex-shrink-0">&#9888;</span>
            <div>
              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                <strong className="text-text-primary">Keep watching:</strong> You need to watch at least {requiredPercentage}% of this video before you can proceed.
                This ensures you understand the assessment process and investment.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Message - Pricing revealed */}
      {canProceed && (
        <div className="bg-growth-emerald/5 border border-growth-emerald/20 rounded-xl p-4 sm:p-5">
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-growth-emerald text-lg sm:text-xl flex-shrink-0">&#10003;</span>
            <div className="space-y-2">
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                <strong className="text-text-primary">Video complete!</strong> You now understand what the AI Go/No-Go Assessment delivers.
              </p>
              <div className="bg-depth-base/50 rounded-lg p-3 sm:p-4 mt-2">
                <p className="text-radiance-gold text-lg sm:text-xl font-bold">
                  Investment: ${ASSESSMENT_CONFIG.price.toLocaleString()}
                </p>
                <p className="text-text-muted text-xs sm:text-sm mt-1">
                  You&apos;re now ready to schedule your assessment call. The investment will be discussed on the call.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation - Sticky on mobile */}
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
            onClick={handleContinue}
            disabled={!canProceed}
            className={`min-h-[44px] text-sm sm:text-base flex-1 sm:flex-initial max-w-[200px] sm:max-w-none ${!canProceed ? 'opacity-50' : ''}`}
          >
            {canProceed ? 'Schedule Your Call' : `${requiredPercentage - Math.round(watchProgress)}% more`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentEducateStage;
